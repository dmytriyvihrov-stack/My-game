#!/usr/bin/env python3
# ============================================================================
# export_brains_fullheight_32.py - #230, 2026-08-21.
#
#   "5 and 6 very bad readible" / "brains - make them more full height"
#
# The BRAINS family came out of `export_final_stat_icons_32.ps1` as a straight
# 24 -> 32 nearest-neighbour blow-up of the v4 masters, which preserved a fault
# the masters already had: MEASURED on the shipped 32px files, content heights
# ran 14 16 18 17 / 14 15 / 24 23 24 while HANDS ran 18..26 and BOOTS 21..30.
# Grades 5 and 6 (grade-0 and grade-plus-1) were the worst of it at 18x14 and
# 18x15 - a small narrow brain in a 32px box, beside a 30x30 boot.
#
# ⛔ AND THEY CARRIED A DETACHED SPECK. 4 orphan pixels on grade-0 and 10 on
# grade-plus-1, orange, sitting at the very bottom of the canvas with nothing
# touching them - exactly where the gold ring's stem hangs on grades 7-9, so it
# reads as what was left when the ring was taken off those two. It is dropped
# here. ⚠ It is also why a bounding box could not be trusted to size these:
# grade-0 measures 26px tall as a BOX and 14px as a BRAIN.
#
# ⛔ THE TARGET IS A HEIGHT, NOT A BOX, AND THAT IS WHAT KEEPS THE LADDER.
# Filling 30x30 with every grade would have made the small bare brain the
# BIGGEST picture in the family, above the crowned ones. So: scale to a common
# content height of 26, capped by a 30px width. Measured result: the four flat
# lumps hit the width cap and stay flat (they are drawn flat) at 15-21 tall,
# the two bare brains come up from 14 to 22, and the crowned three land on
# 24-26. So the ladder still reads flat lump -> bare brain -> crowned brain by
# size as well as by colour, which is the thing normalising could have cost.
#
# ⛔ ONE RESAMPLE, FROM THE 24px MASTER, NEVER FROM THE 32px FILE. The shipped
# 32s are already a 4:3 stretch; scaling those again would be a stretch of a
# stretch. NEAREST throughout: these are pixel paintings.
#
# ⚠ EVERY FILE KEEPS EXACTLY ONE TRANSPARENT PIXEL OF BORDER, because the
# sheet draws these with `margin:-1px 0` and `.claude/rules/ui-scales.md`
# records that -1 is free and -2 would eat a drawn edge. Content is therefore
# fitted to 30x30 inside a 32x32 canvas and the outer ring is cleared, the
# same contract as `Clear-OuterPixel` in the PowerShell exporter.
#
#   python prototype/export_brains_fullheight_32.py
#
# Run it AFTER `export_final_stat_icons_32.ps1`, which is what writes the other
# three families; this overwrites BRAINS/pixel-32px and its two sheets, the way
# `export_reworked_boots_32.ps1` overwrites BOOTS.
# ============================================================================
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'assets', 'stat-icons-pixel-v4-24px', 'brain', 'pixel-24px')
OUT = os.path.join(HERE, 'assets', 'stat-icons-final-32px', 'BRAINS')

GRADES = ['grade-minus-4', 'grade-minus-3', 'grade-minus-2', 'grade-minus-1',
          'grade-0', 'grade-plus-1', 'grade-plus-2', 'grade-plus-3', 'grade-plus-4']

CANVAS = 32          # the box the game reserves
FIT = 30             # content may fill this much of it: one clear pixel each side
TARGET_H = 26        # the common content height the family is normalised to
ORPHAN = 0.20        # a component under this share of the main one is a speck


def components(img):
    """every 8-connected run of opaque pixels, biggest first"""
    w, h = img.size
    px = img.load()
    seen = [[False] * w for _ in range(h)]
    out = []
    for y in range(h):
        for x in range(w):
            if px[x, y][3] == 0 or seen[y][x]:
                continue
            stack, cur = [(x, y)], []
            seen[y][x] = True
            while stack:
                a, b = stack.pop()
                cur.append((a, b))
                for dx in (-1, 0, 1):
                    for dy in (-1, 0, 1):
                        u, v = a + dx, b + dy
                        if 0 <= u < w and 0 <= v < h and not seen[v][u] and px[u, v][3] > 0:
                            seen[v][u] = True
                            stack.append((u, v))
            out.append(cur)
    out.sort(key=len, reverse=True)
    return out


def rebuild(name):
    src = Image.open(os.path.join(SRC, name + '.png')).convert('RGBA')
    comps = components(src)
    if not comps:
        raise SystemExit('%s is empty' % name)
    keep = [c for c in comps if len(c) >= len(comps[0]) * ORPHAN]
    dropped = sum(len(c) for c in comps if c not in keep)

    # blank the specks, then trim to what is left
    px = src.load()
    live = set()
    for c in keep:
        live.update(c)
    for y in range(src.size[1]):
        for x in range(src.size[0]):
            if px[x, y][3] and (x, y) not in live:
                px[x, y] = (0, 0, 0, 0)
    box = src.getbbox()
    art = src.crop(box)
    w, h = art.size

    # ⛔ AN INTEGER FACTOR IF ONE FITS, AND THE FRACTIONAL FIT ONLY IF NONE
    # DOES. A whole-number nearest-neighbour scale turns every source pixel
    # into an exact square block; 2.14 turns some into 2 and some into 3, and
    # on a 14px-wide painting that wobble is visible at 32. Compared at 14x
    # before this was written: 2x is clean and 2.14x is not, for 2px of height.
    # Only the two bare brains can take an integer - everything else in this
    # family is 20-21px wide at the master, so 2x would be 40 in a 30px box.
    fit = min(TARGET_H / h, FIT / w)
    whole = int(fit)
    scale = whole if whole >= 2 else fit
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    art = art.resize((nw, nh), Image.NEAREST)

    out = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    out.paste(art, ((CANVAS - nw) // 2, (CANVAS - nh) // 2))

    # the guaranteed transparent ring
    op = out.load()
    for i in range(CANVAS):
        for j in (0, CANVAS - 1):
            op[i, j] = (0, 0, 0, 0)
            op[j, i] = (0, 0, 0, 0)
    out.save(os.path.join(OUT, 'pixel-32px', name + '.png'))
    return w, h, nw, nh, dropped


def sheets():
    """the 3x3 sprite and the 4x preview, same shapes the .ps1 writes"""
    sprite = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    preview = Image.new('RGB', (480, 480), (0x17, 0x12, 0x08))
    for i, n in enumerate(GRADES):
        im = Image.open(os.path.join(OUT, 'pixel-32px', n + '.png')).convert('RGBA')
        sprite.paste(im, (i % 3 * 32, i // 3 * 32))
        preview.paste(im.resize((128, 128), Image.NEAREST),
                      (i % 3 * 160 + 16, i // 3 * 160 + 16), im.resize((128, 128), Image.NEAREST))
    sprite.save(os.path.join(OUT, 'sprite-3x3-32px.png'))
    preview.save(os.path.join(OUT, 'preview-actual-32px-4x.png'))


def main():
    print('%-14s %-11s %-11s %s' % ('grade', '24px art', '-> 32px', 'specks dropped'))
    for n in GRADES:
        w, h, nw, nh, dropped = rebuild(n)
        print('%-14s %2dx%-2d       %2dx%-2d       %s' % (n, w, h, nw, nh, dropped or '-'))
    sheets()
    print('\nwrote %s' % OUT)


main()
