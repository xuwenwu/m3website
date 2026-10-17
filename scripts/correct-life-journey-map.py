"""Apply the requested Taiwan/mainland color match to the existing journey video.

Video processing uses a tracked geographic region and the original coastline,
retaining the baked-in labels,
original route, chapter timings, and the unchanged audio stream. The v3 input is
preserved. Requires NumPy, OpenCV and FFmpeg; see the media README.
"""
from pathlib import Path
import argparse
import hashlib
import json
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--ffmpeg', required=True)
    parser.add_argument('--opencv-path', type=Path)
    parser.add_argument('--preview-only', action='store_true')
    parser.add_argument('--diagnostics', type=Path)
    args = parser.parse_args()
    if args.opencv_path:
        sys.path.insert(0, str(args.opencv_path))
    import cv2 as cv
    import numpy as np

    expected = 'b5ad99b9df786953d3534514cdbf867ebcf5e9e2961a2e80ef8a42f950810084'
    if hashlib.sha256(args.source.read_bytes()).hexdigest() != expected:
        raise ValueError('The map geometry is calibrated to the preserved v3 edition')
    if args.source.resolve() == args.output.resolve():
        raise ValueError('Preserve the source video')
    geometry = json.loads((Path(__file__).parent/'data/journey-map-geometry.json').read_text())
    polygon = np.array(geometry['taiwan'], dtype=np.float32)
    capture = cv.VideoCapture(str(args.source))
    fps = capture.get(cv.CAP_PROP_FPS)
    if abs(fps-24) > .01 or capture.get(cv.CAP_PROP_FRAME_WIDTH) != 1080:
        raise ValueError('Unexpected input format')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    command = [args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(args.source),
        '-f', 'rawvideo', '-pixel_format', 'rgba', '-video_size', '1080x515', '-framerate', '24', '-i', 'pipe:0',
        '-filter_complex', '[0:v][1:v]overlay=0:0:eof_action=pass:format=auto[v]',
        '-map', '[v]', '-map', '0:a:0', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
        '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart',
        '-metadata', 'title=Wenwu Xu — My journey to SDSU (updated map edition)']
    if args.preview_only:
        command += ['-t', '4']
    command += [str(args.output)]
    encoder = subprocess.Popen(command, stdin=subprocess.PIPE)
    previous = None
    ref_points = points = None
    logs = []
    land = np.array([218, 230, 194], dtype=np.float32)
    base_country = np.array([190, 202, 166], dtype=np.float32)
    reference_target = np.array([500, 350], dtype=np.float32)
    warp = np.eye(2, 3, dtype=np.float64)
    label_warp = warp.copy()
    label_points = label_refs = None
    label_box = np.array([[642,410],[892,410],[892,465],[642,465]],dtype=np.float32)
    label_sample = np.array([860,453],dtype=np.float32)
    label_color = None
    try:
        for k in range(96):
            ok, full = capture.read()
            if not ok:
                raise RuntimeError('Incomplete opening video')
            bgr = full[:515]
            rgb = cv.cvtColor(bgr, cv.COLOR_BGR2RGB).astype(np.float32)
            gray = cv.cvtColor(bgr, cv.COLOR_BGR2GRAY)
            if previous is None:
                mask = np.full(gray.shape, 255, np.uint8)
                mask[:150] = 0
                mask[290:345,410:560] = 0
                mask[300:430,565:640] = 0
                mask[395:485,625:915] = 0
                points = cv.goodFeaturesToTrack(gray, maxCorners=500, qualityLevel=.012, minDistance=9, mask=mask)
                ref_points = points.copy()
                label_mask = np.zeros(gray.shape,np.uint8)
                label_mask[412:463,646:888]=255
                label_points=cv.goodFeaturesToTrack(gray,maxCorners=100,qualityLevel=.02,minDistance=5,mask=label_mask)
                label_refs=label_points.copy()
                label_color=np.median(rgb[450:456,857:863],axis=(0,1))
            else:
                if len(points)<150:
                    feature_mask=np.full(gray.shape,255,np.uint8)
                    feature_mask[:150]=0
                    feature_mask[250:515,500:940]=0
                    points=cv.goodFeaturesToTrack(previous,maxCorners=500,qualityLevel=.008,minDistance=8,mask=feature_mask)
                    ref_points=cv.transform(points,cv.invertAffineTransform(warp))
                if len(label_points)>5:
                    moved_label, label_status, label_error = cv.calcOpticalFlowPyrLK(previous,gray,label_points,None,winSize=(21,21),maxLevel=3)
                    label_keep=(label_status[:,0]==1)&(label_error[:,0]<30)
                    label_points,label_refs=moved_label[label_keep],label_refs[label_keep]
                    if len(label_points)>5:
                        candidate,label_inliers=cv.estimateAffinePartial2D(label_refs,label_points,method=cv.RANSAC,ransacReprojThreshold=1.5)
                        if candidate is not None and .9<np.hypot(candidate[0,0],candidate[1,0])<1.1:
                            label_warp=candidate
                            label_points,label_refs=label_points[label_inliers[:,0]==1],label_refs[label_inliers[:,0]==1]
                old_points=points.copy()
                moved, status, error = cv.calcOpticalFlowPyrLK(previous, gray, points, None,
                    winSize=(31,31), maxLevel=4, criteria=(cv.TERM_CRITERIA_EPS|cv.TERM_CRITERIA_COUNT,30,.005))
                keep = (status[:,0] == 1) & (error[:,0] < 25)
                old_points=old_points[keep]
                points, ref_points = moved[keep], ref_points[keep]
                increment, inliers = cv.estimateAffine2D(old_points, points, method=cv.RANSAC,
                    ransacReprojThreshold=1.5, maxIters=3000)
                if increment is None or int(inliers.sum()) < 12:
                    raise RuntimeError(f'Camera tracking lost at frame {k}; points={len(points)}, inliers={None if inliers is None else int(inliers.sum())}')
                warp=(np.vstack([increment,[0,0,1]])@np.vstack([warp,[0,0,1]]))[:2]
                points, ref_points = points[inliers[:,0] == 1], ref_points[inliers[:,0] == 1]
            previous = gray
            current = cv.transform(polygon[None,:,:], warp)[0]
            if k>60 and current[:,1].min()>515:
                break
            sample = cv.transform(reference_target[None,None,:], warp)[0,0]
            sx, sy = np.round(sample).astype(int)
            if 20 < sx < 1060 and 165 < sy < 495:
                patch = rgb[sy-10:sy+11,sx-10:sx+11]
                candidates = patch[(patch[:,:,0]>165)&(patch[:,:,1]>180)&(patch[:,:,2]>135)]
                country = np.median(candidates,axis=0) if len(candidates) > 100 else base_country
            else:
                country = base_country
            strength = float(np.clip(np.mean(land-country)/28,0,1))
            scale = float(np.hypot(warp[0,0],warp[1,0]))
            # The annotation is a separately animated foreground overlay. Track
            # its movement and measure its fade over a plain ocean patch, then
            # change only the underlying map contribution, including under text.
            panel=cv.transform(label_box[None,:,:],label_warp)[0]
            point=cv.transform(label_sample[None,None,:],label_warp)[0,0]
            px,py=np.round(point).astype(int)
            water=np.median(rgb[py-2:py+3,px+55:px+60],axis=(0,1))
            composite=np.median(rgb[py-2:py+3,px-2:px+3],axis=(0,1))
            label_delta=label_color-water
            opacity=float(np.clip(np.dot(composite-water,label_delta)/np.dot(label_delta,label_delta),0,1))
            visibility=np.ones((515,1080),np.float32)
            panel_mask=np.zeros((515,1080),np.uint8)
            cv.fillPoly(panel_mask,[np.round(panel).astype(np.int32)],255)
            visibility[panel_mask>0]=1-opacity
            # The geographic polygon identifies the island's neighborhood only.
            # Recover its actual coastline from each source frame so the edit
            # cannot introduce a replacement coastline or spill onto the sea.
            margin=6*scale
            x0=max(0,int(current[:,0].min()-margin));x1=min(1080,int(current[:,0].max()+margin)+1)
            y0=max(150,int(current[:,1].min()-margin));y1=min(515,int(current[:,1].max()+margin)+1)
            uncomposited=rgb.copy()
            if opacity<.97:
                inside=panel_mask>0
                uncomposited[inside]=(rgb[inside]-opacity*label_color)/(1-opacity)
            island=np.zeros((515,1080),np.uint8)
            region=uncomposited[y0:y1,x0:x1]
            possible=(np.max(np.abs(region-land),axis=2)<17)
            if opacity>=.97:
                possible &= panel_mask[y0:y1,x0:x1]==0
            island[y0:y1,x0:x1]=np.uint8(possible)*255
            island=cv.morphologyEx(island,cv.MORPH_CLOSE,np.ones((3,3),np.uint8))
            contours,_=cv.findContours(island,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
            fill_mask=np.zeros_like(island);edge_mask=np.zeros_like(island)
            if contours:
                contour=max(contours,key=cv.contourArea)
                if cv.contourArea(contour)>5:
                    cv.drawContours(fill_mask,[contour],-1,255,-1,cv.LINE_AA)
                    cv.polylines(edge_mask,[contour],True,255,1,cv.LINE_AA)
                    edge_mask[-2:]=0
            fill=fill_mask.astype(np.float32)/255
            edge=edge_mask.astype(np.float32)/255
            alpha = np.maximum(fill,edge) * visibility
            ink = np.array([29,48,29],dtype=np.float32)
            delta = (country-land)[None,None,:] * fill[:,:,None]
            delta = delta*(1-edge[:,:,None]) + (ink-land)[None,None,:]*edge[:,:,None]*strength
            corrected = np.clip(rgb + delta * visibility[:,:,None],0,255).astype(np.uint8)
            rgba = np.dstack([corrected,np.uint8(alpha*255)])
            # RGB already includes opacity preservation; use a binary coverage
            # alpha to avoid applying that preservation a second time.
            rgba[:,:,3] = np.uint8(np.maximum(fill,edge)>.003)*255
            encoder.stdin.write(rgba.tobytes())
            logs.append({'frame':k,'time':k/fps,'trackedPoints':len(points),'scale':scale,
                'bounds':[float(current[:,0].min()),float(current[:,1].min()),float(current[:,0].max()),float(current[:,1].max())],
                'countryColor':country.tolist(),'highlightStrength':strength,'affectedPixels':int(np.sum(alpha>.01)),
                'annotationOpacity':opacity,'annotationBounds':panel.tolist()})
    finally:
        capture.release()
        encoder.stdin.close()
        if args.diagnostics:
            args.diagnostics.write_text(json.dumps(logs,indent=2))
    if encoder.wait() != 0:
        raise RuntimeError('Video encoding failed')
    if args.diagnostics:
        args.diagnostics.write_text(json.dumps(logs,indent=2))
    print(json.dumps({'video':str(args.output),'bytes':args.output.stat().st_size,'processedOpeningFrames':len(logs),
        'sha256':hashlib.sha256(args.output.read_bytes()).hexdigest()}))


if __name__ == '__main__':
    main()
