# Video placeholders

Add gradient-loop.mp4 here (H.264, 3–5s, 1920x1080).

```bash
ffmpeg -f lavfi -i color=c=0x0A0A0B:s=1920x1080:d=5 -pix_fmt yuv420p gradient-loop.mp4
```
