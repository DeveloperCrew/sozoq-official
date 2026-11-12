"""Stitch the two Figma raw images (image 181 = top 173px, image 182 = 822px)
into public/assets/images/cat-sprite.png (860x995).
Usage: python3 scripts/make-cat-sprite.py raw_image_1.png raw_image_2.png
(raw_1 = image 181 / top strip, raw_2 = image 182 / main). If the result is
not transparent, the flat grey background is keyed out automatically."""
import sys
from PIL import Image
top, main = (Image.open(p).convert("RGBA") for p in sys.argv[1:3])
if top.height > main.height: top, main = main, top
W = max(top.width, main.width)
sheet = Image.new("RGBA", (W, top.height + main.height), (0, 0, 0, 0))
sheet.paste(top, (0, 0)); sheet.paste(main, (0, top.height))
bg = sheet.getpixel((2, 2))
if bg[3] == 255:  # opaque background -> make transparent
    px = sheet.load()
    for y in range(sheet.height):
        for x in range(sheet.width):
            r, g, b, a = px[x, y]
            if abs(r-bg[0]) < 6 and abs(g-bg[1]) < 6 and abs(b-bg[2]) < 6:
                px[x, y] = (r, g, b, 0)
sheet.save("public/assets/images/cat-sprite.png")
print("saved", sheet.size)
