# Build the itch page banner and background out of the two approved paintings.
# Sources: the main-menu key art (1672x941) and the cover source (1408x1117, carries the wordmark).
import os
from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageDraw

ROOT = r"C:\Users\USER\Google Диск\Clod code\Battle rothers + taletop"
KEY = os.path.join(ROOT, r"art\src\stage-2\key\KEY-01D_main-menu-engraved-slashlight.png")
COVER = os.path.join(ROOT, r"marketing\itch\rabblebound-cover-source.png")
OUT = os.path.join(ROOT, "marketing", "itch")


def wordmark(src, pad=8):
    """Cut RABBLEBOUND out of the cover painting as an RGBA cut-out.

    The letters are bone-white stone on a near-black canopy, so the key is
    luminance. The stone TEXTURE is what breaks a naive threshold: the speckles
    inside a letter read as background and punch holes, so the mask is closed
    (dilate then erode) before it is softened.
    """
    im = Image.open(src).convert("RGB")
    W, H = im.size
    band = im.crop((0, int(H * 0.24), W, int(H * 0.52)))
    g = band.convert("L")
    # bbox of everything clearly brighter than the painting
    hard = g.point(lambda v: 255 if v > 150 else 0)
    hard = hard.filter(ImageFilter.MaxFilter(5))
    bb = hard.getbbox()
    if not bb:
        raise SystemExit("no wordmark found")
    x0, y0, x1, y1 = bb
    cut = band.crop((max(0, x0 - pad), max(0, y0 - pad), min(band.width, x1 + pad), min(band.height, y1 + pad)))
    cg = cut.convert("L")
    lo, hi = 85, 175
    a = cg.point(lambda v: 0 if v <= lo else (255 if v >= hi else int(255 * (v - lo) / (hi - lo))))
    a = a.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))   # close: fill the stone holes
    # ⛔ an OPENING would kill the loose specks and eat the serifs with them, measured.
    # A support mask does it without touching the letters: blur the alpha, keep only
    # what still has neighbours, and multiply the sharp alpha back through it.
    support = a.filter(ImageFilter.GaussianBlur(6)).point(lambda v: 255 if v > 70 else 0)
    support = support.filter(ImageFilter.GaussianBlur(1.5))
    a = ImageChops.multiply(a, support)
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    out = cut.convert("RGBA")
    out.putalpha(a)
    return out


def vignette(size, strength=0.75, feather=0.55):
    w, h = size
    m = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(m)
    inset_x, inset_y = int(w * feather * 0.5), int(h * feather * 0.5)
    d.ellipse((-inset_x, -inset_y, w + inset_x, h + inset_y), fill=0)
    m = m.filter(ImageFilter.GaussianBlur(min(w, h) * 0.18))
    return m.point(lambda v: int(v * strength))


def cover_fit(im, box):
    bw, bh = box
    s = max(bw / im.width, bh / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    return im


# ─── BANNER 1920x800 ──────────────────────────────────────────────────────────
BW, BH = 1920, 800
key = Image.open(KEY).convert("RGB")
b = cover_fit(key, (BW, BH))
# keep the bottom of the painting: the company stands there and the road runs off it
b = b.crop((0, b.height - BH, BW, b.height))

# a dark wash across the top third so the wordmark has ground to sit on
wash = Image.new("L", (BW, BH), 0)
wd = ImageDraw.Draw(wash)
for y in range(BH):
    t = max(0.0, 1.0 - y / (BH * 0.62))
    wd.line([(0, y), (BW, y)], fill=int(150 * t * t))
b = Image.composite(Image.new("RGB", (BW, BH), (6, 4, 6)), b, wash)

# vignette the corners
v = vignette((BW, BH), strength=0.72)
b = Image.composite(Image.new("RGB", (BW, BH), (5, 3, 5)), b, v)

wm = wordmark(COVER)
target_w = int(BW * 0.55)
wm = wm.resize((target_w, round(wm.height * target_w / wm.width)), Image.LANCZOS)
wx = int(BW * 0.335)
wy = int(BH * 0.14)
glow = Image.new("RGBA", (BW, BH), (0, 0, 0, 0))
glow.paste(wm, (wx, wy), wm)
shadow = glow.split()[3].filter(ImageFilter.GaussianBlur(18)).point(lambda v: int(v * 0.85))
b = Image.composite(Image.new("RGB", (BW, BH), (0, 0, 0)), b, shadow)
b = Image.alpha_composite(b.convert("RGBA"), glow).convert("RGB")

b = ImageEnhance.Contrast(b).enhance(1.04)
banner_path = os.path.join(OUT, "rabblebound-itch-banner-1920x800.jpg")
b.save(banner_path, quality=90, subsampling=1)

# ─── BACKGROUND 1920x1080 ─────────────────────────────────────────────────────
GW, GH = 1920, 1080
g = cover_fit(key, (GW, GH))
g = g.crop(((g.width - GW) // 2, (g.height - GH) // 2, (g.width - GW) // 2 + GW, (g.height - GH) // 2 + GH))
g = g.filter(ImageFilter.GaussianBlur(6))
g = ImageEnhance.Color(g).enhance(0.72)
g = Image.blend(g, Image.new("RGB", (GW, GH), (8, 6, 8)), 0.54)      # push it back behind the text
gv = vignette((GW, GH), strength=0.85, feather=0.35)
g = Image.composite(Image.new("RGB", (GW, GH), (5, 4, 5)), g, gv)
bg_path = os.path.join(OUT, "rabblebound-itch-background-1920x1080.jpg")
g.save(bg_path, quality=86, subsampling=2)

for p in (banner_path, bg_path):
    print(os.path.basename(p), Image.open(p).size, "%.0f KB" % (os.path.getsize(p) / 1024))
