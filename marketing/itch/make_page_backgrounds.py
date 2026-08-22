# Page-background candidates cut from the event stages, plus a legibility sheet.
# A background is judged UNDER the content column, never on its own, so the sheet
# draws itch's own centre column over each one.
import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = r"C:\Users\USER\Google Диск\Clod code\Battle rothers + taletop"
J = os.path.join(ROOT, r"art\src\stage-6\j-stage")
KEY = os.path.join(ROOT, r"art\src\stage-2\key\KEY-01D_main-menu-engraved-slashlight.png")
OUT = os.path.join(ROOT, "marketing", "itch")
SCRATCH = r"C:\Users\USER\AppData\Local\Temp\claude\C--Users-USER-Google------Clod-code-Battle-rothers---taletop\72f7522a-4b39-43fe-9cb0-a1a3173966b6\scratchpad"

GW, GH = 1920, 1080

VARIANTS = [
    ("keyart",      KEY,                                          0.54, 6),
    ("fallingstar", os.path.join(J, "EV-J25_falling-star-stage.png"),   0.50, 5),
    # ⚠ this source is already near black, so the usual sink buries it: measured, the
    # tile came back as an empty rectangle. It gets a LIFT instead of a push-back.
    ("redlights",   os.path.join(J, "EV-J18_red-lights-stage.png"),     0.18, 5),
    ("bloom",       os.path.join(J, "EV-J22_under-the-bloom-stage.png"), 0.58, 6),
    # ⚠ the map is a LIGHT painting and the other four are dark ones, so the same sink
    # leaves it shouting: at 0.46 it lit the whole page up and fought the text column.
    ("worldmap",    os.path.join(ROOT, r"art\world-map-backgrounds\world-map-illustrated.webp"), 0.74, 3),
]


def vignette(size, strength=0.85, feather=0.35):
    w, h = size
    m = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(m)
    ix, iy = int(w * feather * 0.5), int(h * feather * 0.5)
    d.ellipse((-ix, -iy, w + ix, h + iy), fill=0)
    m = m.filter(ImageFilter.GaussianBlur(min(w, h) * 0.18))
    return m.point(lambda v: int(v * strength))


def cover(im, box):
    bw, bh = box
    s = max(bw / im.width, bh / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - bw) // 2, (im.height - bh) // 2
    return im.crop((x, y, x + bw, y + bh))


def build(path, sink, blur, lift=1.0):
    im = cover(Image.open(path).convert("RGB"), (GW, GH))
    im = im.filter(ImageFilter.GaussianBlur(blur))
    im = ImageEnhance.Color(im).enhance(COLOR.get(NAME[0], 0.72))
    if lift != 1.0:
        im = ImageEnhance.Brightness(im).enhance(lift)
    im = Image.blend(im, Image.new("RGB", (GW, GH), (8, 6, 8)), sink)
    return Image.composite(Image.new("RGB", (GW, GH), (5, 4, 5)), im, vignette((GW, GH)))


made = []
LIFT = {"redlights": 1.7}
COLOR = {"worldmap": 0.42}
NAME = [""]
for name, path, sink, blur in VARIANTS:
    if not os.path.exists(path):
        print("missing", path)
        continue
    NAME[0] = name
    img = build(path, sink, blur, LIFT.get(name, 1.0))
    p = os.path.join(OUT, "rabblebound-itch-bg-%s-1920x1080.jpg" % name)
    img.save(p, quality=86, subsampling=2)
    made.append((name, img, p))
    print(os.path.basename(p), "%.0f KB" % (os.path.getsize(p) / 1024))

# ── the legibility sheet: itch's centre column, drawn over each candidate ──────
TW, TH = 640, 360
rows = (len(made) + 1) // 2
sheet = Image.new("RGB", (TW * 2, (TH + 20) * rows), (10, 9, 10))
sd = ImageDraw.Draw(sheet)
for i, (name, img, _) in enumerate(made):
    t = img.resize((TW, TH), Image.LANCZOS).convert("RGBA")
    col_w = int(TW * 0.50)
    x0 = (TW - col_w) // 2
    panel = Image.new("RGBA", (col_w, TH), (30, 26, 29, 240))
    t.alpha_composite(panel, (x0, 0))
    d = ImageDraw.Draw(t)
    d.text((x0 + 14, 18), "RabbleBound", fill=(233, 226, 214, 255))
    for r in range(9):                       # body-copy stand-in
        w = col_w - 28 - (40 if r % 3 == 2 else 0)
        y = 44 + r * 13
        d.rectangle((x0 + 14, y, x0 + 14 + w, y + 5), fill=(150, 143, 136, 255))
    d.rectangle((x0 + 14, 190, x0 + col_w - 14, 300), fill=(16, 14, 16, 255))
    d.text((x0 + 22, 236), "game frame 1280x720", fill=(120, 114, 108, 255))
    px, py = (i % 2) * TW, (i // 2) * (TH + 20)
    sheet.paste(t.convert("RGB"), (px, py))
    sd.text((px + 8, py + TH + 4), name, fill=(220, 212, 200))
sp = os.path.join(SCRATCH, "bg_variants_sheet.png")
sheet.save(sp)
print(sp)
