"""Recompose the supplied Life Journey MP4 without changing its original file.

Requires Python + Pillow + NumPy and an ffmpeg executable. Example:
  python scripts/render-life-journey.py --source ORIGINAL.mp4 --ffmpeg ffmpeg
All editorial decisions are in CLIPS below; the supplied MP4 remains external.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
from functools import lru_cache

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FPS = 24
SIZE = 1080
CREAM = '#faf8ec'
INK = '#193e40'
MUTED = '#375c5c'
ACCENT = '#4e8e7d'

# Source in/out, final duration, place, period, chapter, institution/detail.
# Academic dates follow the existing Wenwu Xu website biography.
CLIPS = [
    (0, 10, 8, 'Yiyang', '1982–1996', 'Where the story begins', 'Growing up in Hunan, China'),
    (10, 18, 5, 'Xiangtan', '1996–1999', 'A new chapter in Hunan', 'School years in China'),
    (18, 26, 6, 'Jishou', '1999–2003', 'University years', 'Jishou University'),
    (26, 34, 6, 'Guilin', '2003–2006', 'Continuing my education', 'Guilin University of Technology'),
    (34, 41, 6, 'Beijing', '2006–2009', 'Doctoral studies', 'Beijing University of Technology'),
    (41, 49, 6, 'Jena', '2009', 'Visiting research in Germany', 'Friedrich Schiller University Jena'),
    (49, 58, 5, 'Beijing', 'PhD awarded · 2011', 'Completing my PhD', 'Beijing University of Technology'),
    (58, 68, 6, 'Jena', '2012', 'Postdoctoral research', 'Friedrich Schiller University Jena'),
    (68, 76, 6, 'Manchester', '2013–2015', 'Research in the United Kingdom', 'The University of Manchester'),
    (76, 83, 5, 'Berkeley', '2015', 'A California visit', 'University of California, Berkeley'),
    (83, 93, 5, 'Manchester', '2015', 'Back to Manchester', 'The University of Manchester'),
    (93, 101, 6, 'Merced', '2016–2017', 'Postdoctoral research and teaching', 'University of California, Merced'),
    (101, 114.416, 9, 'San Diego', '2017–present', 'Faculty · Mechanical Engineering', 'San Diego State University'),
]
END_DURATION = 6
COUNTRIES = ['China', 'China', 'China', 'China', 'China', 'Germany', 'China',
             'Germany', 'United Kingdom', 'United States', 'United Kingdom',
             'United States', 'United States']
ZH = [
    '益陽，湖南 · 1982–1996\n故事的起點：在中國成長。',
    '湘潭 · 1996–1999\n湖南的新篇章：求學時光。',
    '吉首 · 1999–2003\n大學時光：吉首大學。',
    '桂林 · 2003–2006\n繼續深造：桂林理工大學。',
    '北京 · 2006–2009\n博士研究：北京工業大學。',
    '耶拿 · 2009\n德國訪問研究：耶拿席勒大學。',
    '北京 · 2011 年取得博士學位\n北京工業大學。',
    '耶拿 · 2012\n博士後研究：耶拿席勒大學。',
    '曼徹斯特 · 2013–2015\n英國研究工作：曼徹斯特大學。',
    '柏克萊 · 2015\n加州訪問之旅：加州大學柏克萊分校。',
    '曼徹斯特 · 2015\n返回曼徹斯特大學。',
    '美熹德 · 2016–2017\n研究與教學：加州大學美熹德分校。',
    '聖地牙哥 · 2017 至今\n聖地牙哥州立大學機械工程學系。',
    '旅程仍在繼續\nWenwu Xu · 聖地牙哥州立大學 · 材料多尺度建模實驗室。',
]


@lru_cache(maxsize=32)
def font(size, bold=False):
    candidates = [Path('C:/Windows/Fonts') / ('segoeuib.ttf' if bold else 'segoeui.ttf'),
                  Path('/usr/share/fonts/truetype/dejavu') / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    raise RuntimeError('Segoe UI or DejaVu Sans is required')


def wrapped(draw, text, xy, size, width=984, bold=False, fill=INK):
    f = font(size, bold)
    words = text.split()
    lines, line = [], ''
    for word in words:
        trial = f'{line} {word}'.strip()
        if draw.textlength(trial, font=f) > width and line:
            lines.append(line)
            line = word
        else:
            line = trial
    if line:
        lines.append(line)
    for i, line in enumerate(lines):
        draw.text((xy[0], xy[1] + i * (size + 10)), line, font=f, fill=fill)
    return xy[1] + len(lines) * (size + 10)


def card(index, clip, closing=False):
    im = Image.new('RGB', (SIZE, SIZE), CREAM)
    d = ImageDraw.Draw(im)
    d.line((48, 550, 1032, 550), fill=ACCENT, width=4)
    if closing:
        d.text((48, 578), 'THE JOURNEY CONTINUES', font=font(32, True), fill=MUTED)
        d.text((48, 632), 'Wenwu Xu', font=font(70, True), fill=INK)
        y = wrapped(d, 'San Diego State University', (48, 736), 48, bold=True)
        wrapped(d, 'Multiscale Modeling of Materials Lab', (48, y + 16), 42)
        d.text((48, 943), 'At SDSU since 2017', font=font(34), fill=MUTED)
    else:
        _, _, _, place, period, chapter, institution = clip
        d.text((48, 579), period, font=font(38, True), fill=MUTED)
        d.text((48, 639), place, font=font(72, True), fill=INK)
        y = wrapped(d, chapter, (48, 749), 44)
        wrapped(d, institution, (48, y + 16), 44, bold=True)
    d.text((48, 1025), 'A LIFE IN MOTION', font=font(24, True), fill=MUTED)
    d.text((910, 1025), f'{index + 1:02d} / 14', font=font(24), fill=MUTED)
    return im


def map_color(r, g, b):
    """Grade the subdued map palette while retaining saturated character/route colors."""
    r, g, b = r * 255, g * 255, b * 255
    chroma = max(r, g, b) - min(r, g, b)
    luminance = .2126 * r + .7152 * g + .0722 * b
    strength = max(0, min(1, (80 - chroma) / 25)) * max(0, min(1, (luminance - 80) / 35))
    water = max(0, min(1, (b - r + 2) / 18))
    shade = (luminance - 243) * 1.55
    land, ocean = (218, 231, 195), (136, 185, 212)
    graded = [(land[c] * (1-water) + ocean[c] * water + shade) for c in range(3)]
    return tuple(max(0, min(255, old * (1-strength) + new * strength)) / 255
                 for old, new in zip((r, g, b), graded))


@lru_cache(maxsize=1)
def map_lut():
    return ImageFilter.Color3DLUT.generate(33, map_color)


def city_anchor(view):
    """Track the original character's yellow shirt, never infer a geographic position."""
    a = np.asarray(view).astype(np.int16)
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    mask = (r > 205) & (g > 145) & (g < 225) & (b < 130) & (r-g > 15) & (g-b > 45)
    mask[:140] = False
    ys, xs = np.nonzero(mask)
    if len(xs) < 12:
        return None
    # A small amount of codec noise should not cause the callout to jump.
    x = float(np.median(xs))
    y1, y2 = np.percentile(ys, [5, 95])
    return x, float(y2 + (y2-y1) * 1.45)


def frame(raw, background, clip, elapsed, total, closing=False, index=0, settled=True):
    im = background.copy()
    # Remove the original lower information panel and footer entirely.
    view = Image.frombytes('RGB', (1280, 800), raw).crop((0, 0, 1280, 610))
    view = view.resize((1080, 515), Image.Resampling.LANCZOS)
    anchor = city_anchor(view)
    view = view.filter(map_lut()).filter(ImageFilter.UnsharpMask(radius=.7, percent=55, threshold=3))
    im.paste(view, (0, 0))
    d = ImageDraw.Draw(im)
    # Replace old title and animated AGE counter in their existing overlay areas.
    d.rounded_rectangle((12, 12, 405, 115), radius=20, fill=CREAM)
    d.text((34, 25), 'WENWU XU', font=font(22, True), fill=MUTED)
    d.text((34, 57), 'A life in motion', font=font(38, True), fill=INK)
    # Replace the tiny original route banner with a readable destination/country.
    d.rounded_rectangle((420, 16, 909, 89), radius=18, fill=CREAM)
    context = COUNTRIES[index] if settled or closing else f'To {clip[3]}'
    context_font = font(36, True)
    context_width = d.textlength(context, font=context_font)
    d.text((664 - context_width / 2, 26), context, font=context_font, fill=INK)
    d.rounded_rectangle((925, 16, 1065, 142), radius=22, fill=INK)
    d.text((954, 34), 'HOME' if closing else 'YEAR', font=font(22, True), fill=CREAM)
    year = 'SDSU' if closing else ('2011' if 'PhD' in clip[4] else clip[4][:4])
    f = font(42, True)
    w = d.textlength(year, font=f)
    d.text((995 - w / 2, 70), year, font=f, fill=CREAM)
    # The original birth-place annotation is visible during the opening zoom.
    # Introduce the new callout after it fades, so the two labels never overlap.
    if anchor and (settled or closing) and (index != 0 or elapsed >= 3):
        city_font = font(50, True)
        width = d.textlength(clip[3], font=city_font) + 36
        x = max(18, min(1062-width, anchor[0] - width/2))
        y = max(155, min(425, anchor[1]))
        d.rounded_rectangle((x+2, y+5, x+width+2, y+83), radius=18, fill='#78918c')
        d.rounded_rectangle((x, y, x+width, y+78), radius=18, fill='#fffef6', outline=INK, width=3)
        d.text((x+18, y+4), clip[3], font=city_font, fill=INK)
    d.line((48, 1002, 1032, 1002), fill='#d7ded2', width=6)
    d.line((48, 1002, 48 + 984 * elapsed / total, 1002), fill=ACCENT, width=6)
    return im


def read_frame(stream, length):
    chunks = bytearray()
    while len(chunks) < length:
        part = stream.read(length - len(chunks))
        if not part:
            return None
        chunks.extend(part)
    return bytes(chunks)


def stamp(seconds):
    ms = round(seconds * 1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02}.{ms%1000:03}'


def chinese_track(output):
    cues, elapsed = ['WEBVTT\n'], 0
    for clip, text in zip(CLIPS, ZH):
        duration = clip[2]
        cues.append(f'{stamp(elapsed)} --> {stamp(elapsed+duration)}\n{text}\n')
        elapsed += duration
    cues.append(f'{stamp(elapsed)} --> {stamp(elapsed+END_DURATION)}\n{ZH[-1]}\n')
    (output / 'journey-zh-TW.vtt').write_text('\n'.join(cues), encoding='utf-8')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', type=Path)
    parser.add_argument('--ffmpeg')
    parser.add_argument('--tracks-only', action='store_true')
    parser.add_argument('--previews', type=Path, help='Render one settled sample per chapter instead of encoding')
    parser.add_argument('--output', type=Path, default=Path('public/media/life-journey'))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    if args.tracks_only:
        chinese_track(args.output)
        return
    if not args.source or not args.ffmpeg:
        parser.error('--source and --ffmpeg are required for rendering')
    output = args.output / 'wenwu-xu-journey-v3.mp4'
    total = sum(c[2] for c in CLIPS) + END_DURATION
    if args.previews:
        args.previews.mkdir(parents=True, exist_ok=True)
        elapsed = 0
        for i, clip in enumerate(CLIPS):
            source_time = clip[0] + (clip[1]-clip[0]) * .78
            raw = subprocess.check_output([args.ffmpeg, '-hide_banner', '-loglevel', 'error',
                '-ss', str(source_time), '-i', str(args.source), '-frames:v', '1',
                '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'])
            im = frame(raw, card(i, clip), clip, elapsed+clip[2]*.78, total, index=i)
            im.save(args.previews / f'{i+1:02d}-{clip[3]}.jpg', quality=94)
            elapsed += clip[2]
        return
    command = [args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-f', 'rawvideo',
               '-pix_fmt', 'rgb24', '-s', '1080x1080', '-r', str(FPS), '-i', 'pipe:0',
               '-i', str(args.source), '-map', '0:v:0', '-map', '1:a:0', '-t', str(total),
               '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p',
               '-c:a', 'aac', '-b:a', '128k', '-af', f'afade=t=in:d=0.5,afade=t=out:st={total-3}:d=3',
               '-movflags', '+faststart', '-metadata', 'title=Wenwu Xu — My journey to SDSU', str(output)]
    encoder = subprocess.Popen(command, stdin=subprocess.PIPE)
    elapsed = 0
    cues, chapters = ['WEBVTT\n'], []
    last_raw = None
    try:
        for i, clip in enumerate(CLIPS):
            start, end, duration, place, period, chapter, institution = clip
            speed = duration / (end - start)
            decoder = subprocess.Popen([args.ffmpeg, '-hide_banner', '-loglevel', 'error',
                '-ss', str(start), '-i', str(args.source), '-an', '-vf',
                f'trim=duration={end-start},setpts=(PTS-STARTPTS)*{speed},fps={FPS},tpad=stop_mode=clone:stop_duration=1',
                '-frames:v', str(duration * FPS), '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'], stdout=subprocess.PIPE)
            background = card(i, clip)
            for k in range(duration * FPS):
                raw = read_frame(decoder.stdout, 1280 * 800 * 3)
                if raw is None:
                    raise RuntimeError(f'Incomplete clip: {place}, frame {k}')
                last_raw = raw
                im = frame(raw, background, clip, elapsed + k / FPS, total,
                           index=i, settled=i == 0 or k >= duration * FPS * .55)
                encoder.stdin.write(im.tobytes())
                if i == 12 and k == 6 * FPS:
                    im.save(args.output / 'wenwu-xu-journey-poster-v3.webp', quality=90)
            decoder.stdout.close()
            if decoder.wait() != 0:
                raise RuntimeError(f'Decoder failed for {place}')
            cues.append(f'{stamp(elapsed)} --> {stamp(elapsed + duration)}\n{place} · {period}\n{chapter}. {institution}.\n')
            chapters.append({'start': elapsed, 'end': elapsed + duration, 'place': place, 'period': period,
                             'chapter': chapter, 'institution': institution})
            elapsed += duration
            print(f'{elapsed}/{total}s: {place}', flush=True)
        background = card(len(CLIPS), CLIPS[-1], closing=True)
        for k in range(END_DURATION * FPS):
            encoder.stdin.write(frame(last_raw, background, CLIPS[-1], elapsed + k / FPS, total, closing=True, index=12).tobytes())
        cues.append(f'{stamp(elapsed)} --> {stamp(total)}\nWenwu Xu · San Diego State University\nMultiscale Modeling of Materials Lab. The journey continues.\n')
    finally:
        encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError('Encoder failed')
    (args.output / 'journey-en.vtt').write_text('\n'.join(cues), encoding='utf-8')
    chinese_track(args.output)
    (args.output / 'journey.json').write_text(json.dumps({'title': 'My journey to SDSU', 'duration': total,
        'source_sha256': hashlib.sha256(args.source.read_bytes()).hexdigest(), 'chapters': chapters,
        'edition': 'v3', 'visual_style': 'Stronger blue water, sage land, darker boundaries, bold tracked city labels and country headings.',
        'editorial_note': 'Recomposed from the supplied animation. Academic dates aligned with the existing website biography. Original soundtrack retained with end fades.'}, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f'Created {output}: {output.stat().st_size} bytes', flush=True)


if __name__ == '__main__':
    main()
