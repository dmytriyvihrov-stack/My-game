#!/usr/bin/env python3
"""
build_fonts.py - the three typefaces, fetched once and turned into one CSS block.

    python art/fonts/build_fonts.py            # use the cache, rebuild the CSS
    python art/fonts/build_fonts.py --fetch    # go to the network first

Writes `art/out/fonts.css`. `art/inject_fonts.ps1` puts that between the
`/*__FONT_DATA__*/` markers in the prototype. Nothing here runs at play time.

WHY THIS EXISTS. `:root` has named Cinzel, Spectral and JetBrains Mono since the
first slice and **none of the three was ever in the build**, so every screen has
been rendering in whatever the fallback chain found - measured on 2026-08-18 as
Palatino Linotype, Georgia and Consolas. The names were a wish.

⛔ THE BUILD MAY NOT DEPEND ON THE NETWORK AT PLAY TIME. That is why this is a
BUILD step that emits base64 rather than a `@import` or a `<link>`: the shipped
page is one file and has to work from a memory stick. This script is the only
thing in the project that talks to fonts.google.com, and it only does so when
asked with --fetch.

⚠ SUBSETS ARE CHOSEN, NOT TAKEN. Google serves a dozen unicode-range slices per
family; we keep latin, latin-ext and cyrillic. Cyrillic is not decoration: the
company name is typed by the player and this player types Russian. Cinzel has no
cyrillic subset at all, so a Cyrillic company name falls through Cinzel to the
next face in the stack, which is the correct and automatic behaviour.
"""
import argparse
import base64
import os
import re
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
CACHE = os.path.join(HERE, 'src')
OUT = os.path.join(ROOT, 'art', 'out', 'fonts.css')

# A browser UA is required or the API serves ttf instead of woff2.
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

KEEP = ('latin', 'latin-ext', 'cyrillic')

# ⛔ THIS LIST WAS MEASURED, NOT GUESSED, AND THE FIRST DRAFT WAS 860 KB.
# Counting `font-weight:` in the stylesheet says 400/500/600/700 are all used
# and suggests fetching every one of them for all three families. Walking the
# ten screens in the running build and recording the computed
# (family, weight, style) of every element that has its OWN text says something
# much narrower - these eight triples and nothing else:
#
#     Cinzel         400 x70    600 x400   700 x30
#     JetBrains Mono 400 x793   600 x10    700 x180
#     Spectral       400 x310   400italic x50
#
# So no 500 is fetched for anything: six of those declarations sit on families
# that never render at that weight. **Spectral 700 is the one face here that the
# sweep did NOT see and that is fetched anyway**, because a `<b>` inside event
# prose is the likeliest thing the sweep missed and a browser's faux-bold on a
# serif is visibly worse than the real thing. Everything else is measured.
#
# ⚠ ALL THREE SUBSETS ARE KEPT ON PURPOSE. latin-ext costs ~14-20KB a face and
# buys accented names that would otherwise render half in one face and half in
# another. Cyrillic is on Spectral and JetBrains Mono because the company name
# is typed by the player, this player types Russian, and `.abco` renders that
# name in the MONO face. Cinzel has no cyrillic subset, so a Cyrillic name falls
# cleanly through to the next face in the stack instead of mixing.
FAMILIES = [
    # (family, css2 spec, note)
    ('Cinzel', 'Cinzel:wght@400;600;700',
     'display. No italic exists for this face and none is used.'),
    ('Spectral', 'Spectral:ital,wght@0,400;0,700;1,400',
     'body. One italic: the flavour lines and the whispers.'),
    ('JetBrains Mono', 'JetBrains+Mono:ital,wght@0,400;0,600;0,700;1,400',
     'labels, chips, receipts. Italic for the one mono aside.'),
]


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode('utf-8')


def faces_from_css(css):
    """Every @font-face block, tagged with the subset comment above it."""
    out = []
    # Google writes `/* latin */` immediately before each block.
    for m in re.finditer(r'/\*\s*([a-z0-9-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})', css):
        subset, block = m.group(1), m.group(2)
        url = re.search(r'url\((https://[^)]+\.woff2)\)', block)
        if not url:
            continue
        style = re.search(r'font-style:\s*([a-z]+)', block)
        weight = re.search(r'font-weight:\s*(\d+)', block)
        rng = re.search(r'unicode-range:\s*([^;]+);', block)
        out.append(dict(subset=subset, url=url.group(1),
                        style=style.group(1) if style else 'normal',
                        weight=weight.group(1) if weight else '400',
                        range=rng.group(1).strip() if rng else ''))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--fetch', action='store_true',
                    help='download from fonts.googleapis.com before building')
    args = ap.parse_args()

    os.makedirs(CACHE, exist_ok=True)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)

    wanted = []
    for family, spec, _note in FAMILIES:
        css_path = os.path.join(CACHE, spec.split(':')[0] + '.css')
        if args.fetch:
            url = 'https://fonts.googleapis.com/css2?family=%s&display=swap' % spec
            css = fetch(url)
            with open(css_path, 'w', encoding='utf-8') as fh:
                fh.write(css)
            print('css   %-16s %5d bytes' % (family, len(css)))
        if not os.path.exists(css_path):
            sys.exit('no cached css for %s - run once with --fetch' % family)
        with open(css_path, encoding='utf-8') as fh:
            css = fh.read()
        for face in faces_from_css(css):
            if face['subset'] not in KEEP:
                continue
            face['family'] = family
            face['file'] = os.path.join(CACHE, '%s-%s-%s-%s.woff2' % (
                family.replace(' ', ''), face['weight'], face['style'], face['subset']))
            wanted.append(face)

    total = 0
    for face in wanted:
        if args.fetch or not os.path.exists(face['file']):
            blob = fetch(face['url'], binary=True)
            # ⛔ A downloaded binary is verified before it is embedded. `wOF2` is
            # the magic; anything else means we were served an error page.
            if blob[:4] != b'wOF2':
                sys.exit('not a woff2: %s (%r)' % (face['url'], blob[:16]))
            with open(face['file'], 'wb') as fh:
                fh.write(blob)
        total += os.path.getsize(face['file'])

    lines = [
        '/* ═══ THE THREE TYPEFACES, EMBEDDED ═══════════════════════════════════',
        '   GENERATED by art/fonts/build_fonts.py. Do not hand-edit: the next run',
        '   of art/inject_fonts.ps1 replaces everything between the markers.',
        '',
        '   Cinzel and Spectral are SIL Open Font License 1.1; JetBrains Mono is',
        '   the SIL OFL 1.1 as well. All three may be embedded and redistributed',
        '   in a work like this one; none may be sold on its own.',
        '',
        '   ⚠ `font-display:swap` is deliberate even though nothing is fetched at',
        '   run time: a data: URI still decodes asynchronously, and swap means the',
        '   fallback paints first rather than the text being invisible while it',
        '   does. The fallback chains in `:root` are the same ones as before, so',
        '   that first paint is what the build looked like until today.',
        '   ═══════════════════════════════════════════════════════════════════ */',
    ]
    for face in wanted:
        with open(face['file'], 'rb') as fh:
            b64 = base64.b64encode(fh.read()).decode('ascii')
        lines.append('@font-face{font-family:\'%s\';font-style:%s;font-weight:%s;'
                     'font-display:swap;src:url(data:font/woff2;base64,%s) format(\'woff2\');'
                     '%s}' % (face['family'], face['style'], face['weight'], b64,
                              ('unicode-range:%s;' % face['range']) if face['range'] else ''))

    with open(OUT, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines) + '\n')

    print('\n%d faces, %.1f KB of woff2 -> %.1f KB of css' % (
        len(wanted), total / 1024.0, os.path.getsize(OUT) / 1024.0))
    for face in wanted:
        print('  %-16s %s %-6s %-10s %6.1f KB' % (
            face['family'], face['weight'], face['style'], face['subset'],
            os.path.getsize(face['file']) / 1024.0))


if __name__ == '__main__':
    main()
