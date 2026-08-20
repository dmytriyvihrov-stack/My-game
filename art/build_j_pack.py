#!/usr/bin/env python
r"""Builds the #209 J PACK: the door marks and the wide stage paintings.

    python art\build_j_pack.py
    powershell -NoProfile -ExecutionPolicy Bypass -File art\inject_j_pack.ps1

Reads  art/src/intent-icons/*.png      the eight intent marks, the three races
       art/src/stage-6/j-stage/*.png   the wide event stages, 1672x941
Writes art/out/j_pack.js               INTENT_ART + RACE_ART + JSTAGE_ART
       art/out/icons/<key>.png         the exact icon bytes that were embedded

WHY THIS IS ITS OWN PIPELINE AND NOT A GROUP INSIDE build_assets.ps1
--------------------------------------------------------------------
build_assets.ps1 rewrites the whole 10 MB `/*__ART_DATA__*/` block, and two
desks that both run it produce a conflict nothing can resolve - the open item at
the foot of grimtoll-parallel-sessions. This pack is ~2.4 MB, it is the half of
the build that is still being redrawn (user, 2026-08-20: *"even arts are not
ready - we will replace them slovly"*), and it will therefore be rebuilt far
more often than the paintings. Its own marker means re-running it can never
touch them, and re-running theirs can never touch this.

THE THREE RULES IT OBEYS, ALL THREE LIFTED FROM RULES THAT ALREADY EXIST
------------------------------------------------------------------------
1. A MARK IS PNG AND A STAGE IS JPEG, and that is not a preference. The marks
   are cut-outs that sit on a button's own ground, and a JPEG has no alpha
   (.claude/rules/static-event-art.md, the item icons). A stage is a full-bleed
   photograph of a scene with no transparency anywhere in it, and a PNG of one
   is 2 MB against 180 KB. q82 is build_assets.ps1's own setting; the house
   number is used rather than a second one.
2. A STAGE IS EMBEDDED AT ITS NATIVE 1672x941. The card draws it into 1180x620
   and the 1280x720 stage is SCALED to the window, so a downscale here would be
   an upscale on any monitor wider than about 1400. Nothing is resampled: the
   day the art is re-exported at another size, this file does not change.
3. ALPHA UNDER 40 IS ZEROED ON A MARK THAT HAS TO BE RESIZED. A door draws
   `drop-shadow()` on these and a drop-shadow lights up EVERY non-zero pixel, so
   a near-invisible wash - which the v1 sheets carry - prints as a glowing
   rectangle behind the glyph. Same pass build_assets.ps1 already runs on the
   map sights, after the same bug. See PICK for what this does NOT touch.
"""
import base64, io, os, sys
from PIL import Image

HERE  = os.path.dirname(os.path.abspath(__file__))
ICONS = os.path.join(HERE, 'src', 'intent-icons')
STAGE = os.path.join(HERE, 'src', 'stage-6', 'j-stage')
OUT   = os.path.join(HERE, 'out')
PNGS  = os.path.join(OUT, 'icons')

# ⚠ THE KEY IS THE FILENAME WITHOUT ITS VERSION SUFFIX, so redrawing a mark is a
#   new file and a one-line edit here, never a rename of the thing the game asks
#   for. The renderer only ever says `fight`.
INTENT = ['fight', 'help', 'evil', 'leave', 'trade', 'take', 'rest', 'honor']
RACE   = ['ratkin', 'ogre', 'human']

# ⚑ WHAT EACH MARK SHIPS AT, AND WHETHER IT IS COOKED OR EMBEDDED AS DELIVERED.
#   `as-delivered` means the source is ALREADY the exact box the game wants, cut
#   out and optimised outside this repo - so it goes in verbatim and this script
#   does not touch a pixel of it. That is the same rule
#   .claude/rules/static-event-art.md states for the item icons and the map
#   sights: embed verbatim, never re-cook a file somebody already composed.
#   ⚠ AND IT IS A DECLARATION, NOT A MEASUREMENT. The first cut of this script
#   gated the alpha floor on "how much of the canvas is faint", and that number
#   cannot tell the two cases apart: the v1 intents read 2-8% because they carry
#   a real wash across a 384x512 canvas, and the v3 race cards read 2.7-4.4%
#   because a one-pixel ANTIALIASING ring is a big share of a 128px box. Same
#   number, opposite meanings. What actually differs is whether the file still
#   has to be resized, and only the pipeline knows that.
PICK = {'fight':('v1', 'cook'), 'help': ('v1', 'cook'), 'evil': ('v1', 'cook'),
        'leave':('v3', 'cook'), 'trade':('v1', 'cook'), 'take': ('v3', 'cook'),
        'rest': ('v1', 'cook'), 'honor':('v1', 'cook'),
        # 2026-08-20, mid-build, the user: "here is optimised pack for race icon".
        # race-*-v3-card.png arrive at 128x128 with the cut already made.
        'ratkin':('v3-card','as-delivered'), 'ogre':('v3-card','as-delivered'),
        'human': ('v3-card','as-delivered')}

# ⚑ THE BOX IS ~4x THE BIGGEST PLACE THE MARK IS DRAWN, AND THAT IS THE REASON.
#   An intent is drawn in a 44px cell on a door and the 1280x720 stage is SCALED
#   to the window, so on a 2560-wide monitor those 40 CSS px are 80 real ones.
#   120x160 is another doubling of headroom and costs ~20 KB a mark.
INTENT_BOX = (120, 160)   # the sources are 3:4 and the door's glyph cell is 30x40
RACE_BOX   = (128, 128)   # drawn at 19x19 in the corner of that cell
ALPHA_FLOOR = 40
AIR = 0.04                # keep a little air or a trimmed glyph touches its edges
JPEG_Q = 82               # build_assets.ps1's own quality. One house number.


def build_mark(path, box, mode):
    im = Image.open(path).convert('RGBA')

    if mode == 'as-delivered':
        # ⛔ NOTHING HAPPENS HERE ON PURPOSE. A file delivered at the target box
        #    is the composition somebody approved; trimming it would re-centre
        #    it and the alpha floor would eat its antialiasing ring, which on a
        #    128px cut-out is the difference between a drawn edge and a jagged
        #    one. The only thing worth checking is that it IS the box.
        if im.size != box:
            sys.exit('%s is %s and the box is %s: either re-export it or '
                     'mark it cook' % (os.path.basename(path), im.size, box))
        return im

    a = im.getchannel('A').point(lambda v: 0 if v < ALPHA_FLOOR else v)
    im.putalpha(a)                                   # the wash, before trimming
    bb = im.getbbox()
    if bb:
        im = im.crop(bb)                             # trim to what is painted

    bw, bh = box                                     # fit, keeping aspect
    tw, th = int(bw * (1 - AIR * 2)), int(bh * (1 - AIR * 2))
    s = min(tw / im.width, th / im.height)
    im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))),
                   Image.LANCZOS)

    plate = Image.new('RGBA', box, (0, 0, 0, 0))     # centre on the exact box
    plate.paste(im, ((bw - im.width) // 2, (bh - im.height) // 2), im)
    return plate


def png_bytes(img):
    b = io.BytesIO()
    img.save(b, 'PNG', optimize=True)
    return b.getvalue()


def jpeg_bytes(img):
    b = io.BytesIO()
    img.convert('RGB').save(b, 'JPEG', quality=JPEG_Q, optimize=True, progressive=True)
    return b.getvalue()


def main():
    for d in (ICONS, STAGE):
        if not os.path.isdir(d):
            sys.exit('no such folder: ' + d)
    os.makedirs(PNGS, exist_ok=True)

    groups, total = {'INTENT_ART': [], 'RACE_ART': [], 'JSTAGE_ART': []}, 0

    for group, keys, box, prefix in (('INTENT_ART', INTENT, INTENT_BOX, 'intent'),
                                     ('RACE_ART', RACE, RACE_BOX, 'race')):
        for k in keys:
            ver, mode = PICK[k]
            f = os.path.join(ICONS, '%s-%s-%s.png' % (prefix, k, ver))
            if not os.path.exists(f):
                sys.exit('missing source: ' + f)
            img = build_mark(f, box, mode)
            b = png_bytes(img)
            with open(os.path.join(PNGS, '%s-%s.png' % (prefix, k)), 'wb') as fh:
                fh.write(b)
            groups[group].append((k, 'png', base64.b64encode(b).decode('ascii')))
            total += len(b)
            print('%-28s %-12s %-9s %6.1f KB'
                  % (os.path.basename(f), mode, '%dx%d' % img.size, len(b) / 1024))

    # ── the stages. The key is the filename prefix with hyphens removed,
    #    `EV-J4_clan-wedding-stage.png` -> `EVJ4`, which is the rule
    #    .claude/rules/static-event-art.md already states for MAP-EV and the
    #    stage packs. Everything in the folder ships; which key a CARD uses is
    #    decided by `JSTAGE{}` in the prototype and nowhere else.
    for f in sorted(os.listdir(STAGE)):
        if not f.lower().endswith('.png'):
            continue
        img = Image.open(os.path.join(STAGE, f))
        key = f.split('_')[0].replace('-', '')
        b = jpeg_bytes(img)
        groups['JSTAGE_ART'].append((key, 'jpeg', base64.b64encode(b).decode('ascii')))
        total += len(b)
        print('%-28s %-12s %-9s %6.1f KB'
              % (f, 'native q%d' % JPEG_Q, '%dx%d' % img.size, len(b) / 1024))

    js = ['/* #209 - THE J PACK: the door marks and the wide event stages.',
          '   Built by art/build_j_pack.py, injected by art/inject_j_pack.ps1.',
          '   Do not hand-edit, and do not fold this into the paintings block. */']
    for group in ('INTENT_ART', 'RACE_ART', 'JSTAGE_ART'):
        js.append('const %s={' % group)
        js.append(',\n'.join("%s:'data:image/%s;base64,%s'" % (k, kind, b)
                             for k, kind, b in groups[group]))
        js.append('};')
    out = os.path.join(OUT, 'j_pack.js')
    with open(out + '.tmp', 'wb') as fh:              # bytes first, then replace
        fh.write('\n'.join(js).encode('utf-8'))
    os.replace(out + '.tmp', out)
    n = sum(len(v) for v in groups.values())
    print('\n%d assets, %.1f KB of image -> %.1f KB of base64 in %s'
          % (n, total / 1024, os.path.getsize(out) / 1024, out))


if __name__ == '__main__':
    main()
