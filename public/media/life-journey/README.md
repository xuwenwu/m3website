# My journey to SDSU

85-second square edition of Wenwu Xu's supplied `Wenwu_Life_Journey (1).mp4`.
The original is preserved in the user's Google Drive. Published with the user's
authorization on 16 October 2026.

The current player uses **v3**, which strengthens the map's blue water, sage land,
boundaries, and small labels. Large city callouts track the original character
after arrival, and country/destination headings supply geographic context. These
callouts follow the character's position in the animation, not inferred map
coordinates. The previous v2 export is retained for existing direct links.

The edit retains the map animation, character, travel route, and original
soundtrack. It recomposes the lower chapter panel at a larger size, replaces
the age counter with year labels, shortens repeated travel transitions, adds
a six-second SDSU closing card, and fades the soundtrack at the end.

Academic dates follow `src/content/people/wenwu-xu.md`: PhD awarded in 2011,
Jena postdoctoral research in 2012, Manchester in 2013–2015, Merced in 2016,
and SDSU from 2017. Earlier personal/education stages and the 2009 and 2015
visits follow the supplied animation. `journey.json` records the chapter
timing and original file SHA-256.

The surrounding English and Traditional Chinese pages share this MP4, with
optional milestone subtitles and a localized HTML timeline. The subtitle
tracks describe visual milestones; they are not a transcription of audio.
Playback is user initiated (`preload="none"`, no autoplay, inline controls).

To render from the preserved original, install Pillow and NumPy in a Python environment
and provide an ffmpeg executable:

```text
python scripts/render-life-journey.py --source ORIGINAL.mp4 --ffmpeg FFMPEG
```

The renderer contains the editable chapter text, timing, layout, and subtitles.
