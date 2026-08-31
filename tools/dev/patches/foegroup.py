# -*- coding: utf-8 -*-
"""Bring the seven remaining enemy statblocks into the one block.

(User, 2026-08-31: "could be good to group enemy data in the build - so it is
grouped, rather then thrown through everething".)

#263 built FOE_T and moved eight tables out of eight plan functions; the seven
that already had module-level names were REFERENCED and left where they stood,
scattered over 2,100 lines. This finishes it: the seven `const` declarations
move, verbatim, into one contiguous statblock region ending in FOE_LEAN /
FOE_T / FOE_BUILD.

WHAT DOES NOT MOVE: every authored comment stays exactly where it is. Those
essays are about the FIGHT - its fiction, its script, its playtest history -
and they sit above the plan function that reads them. Only the table travels,
and a one-line pointer stands where each table used to be.

Re-runnable and idempotent: it refuses a second run.
"""
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import read, write            # noqa: E402

# const name -> (which fight fields it, who reads it)
MOVE = [('WED_T',    'wedding',            'weddingFoes'),
        ('CLASH_T',  'clash',              'clashFoes and clashAllies'),
        ('REINF_T',  'reinforcements',     'the reinforcement pair'),
        ('TAVERN_T', 'tavern',             'tavernFoes and the scripted waves'),
        ('CHASE_T',  'chase',              'chaseFoes'),
        ('HOLD_T',   'hold and snarejoin', 'holdFoes and holdHost'),
        ('WARDEN',   'armour',             'armourFoe')]

ANCHOR = 'const SNARE_T={'
MARK = 'THE SEVEN THAT WERE STILL SCATTERED'

E = u'═'          # box rule
HEAD = (u'/* ' + E * 3 + u' ⛔ ' + MARK + u' ' + E * 20 + u'\n'
        u'   (User, 2026-08-31: *"could be good to group enemy data in the build - so it\n'
        u'   is grouped, rather then thrown through everething"*.)\n'
        u'\n'
        u'   #263 answered the same ask for the eight tables that were a `const T={}` inside\n'
        u'   their own plan function, and left these seven where they stood because they\n'
        u'   already had module-level names and were therefore already single copies. That\n'
        u'   was true and it was not the ask: they sat over 2,100 lines of file, so *what\n'
        u'   does the other side look like* still meant scrolling through seven of them.\n'
        u'\n'
        u'   ⛔ THE TABLES MOVED AND NOT ONE FIGURE CHANGED. The oracle is what says so:\n'
        u'   `tools/dev/probes/foeoracle263.js` builds every `FOE_BUILD[k]()` side on this\n'
        u'   build and on the previous one and compares 19 fields a body.\n'
        u'\n'
        u'   ⚠ THE COMMENTS DELIBERATELY DID NOT COME WITH THEM. Each of these seven\n'
        u'   carried an essay about its FIGHT: the massacre brief on the wedding, the\n'
        u'   fiction on Blood on the Road, the teach script on the brawl, the lore on the\n'
        u'   Hold. Those belong\n'
        u'   above the plan function that reads them, which is where they still are. A\n'
        u'   one-line pointer stands at each old site.\n'
        u'\n'
        u'   ⚠ THEY ARE DECLARED ABOVE `FOE_T` AND THAT IS LOAD-BEARING, NOT TIDINESS. A\n'
        u'   `const` read from above its own declaration is the temporal-dead-zone throw\n'
        u'   that aborts the whole script, and `FOE_T` reads all seven by name.\n'
        u'   ' + E * 69 + u' */\n')


def span(text, name):
    """the whole `const NAME = { ... };` declaration, by brace depth.

    It has to skip STRINGS and COMMENTS both. The first cut skipped only
    strings, and an ordinary apostrophe inside a comment ("it doesn't") opened
    a string that never closed: CHASE_T measured 43 KB and HOLD_T 107 KB, and
    only the balance guard below stopped either of them being written.
    """
    m = re.search(r'^const %s\s*=' % re.escape(name), text, re.M)
    if not m:
        return None
    start = m.start()
    d, i, n = 0, m.end(), len(text)
    instr = None                       # "'" or '"' while inside a string
    incom = None                       # 'line' or 'block' while inside a comment
    while i < n:
        c = text[i]
        if incom == 'line':
            if c == '\n':
                incom = None
        elif incom == 'block':
            if c == '*' and text[i + 1:i + 2] == '/':
                incom = None
                i += 1
        elif instr:
            if c == '\\':
                i += 2
                continue
            if c == instr:
                instr = None
        elif c == '/' and text[i + 1:i + 2] == '/':
            incom = 'line'
            i += 1
        elif c == '/' and text[i + 1:i + 2] == '*':
            incom = 'block'
            i += 1
        elif c == "'" or c == '"':
            instr = c
        elif c in '{[':
            d += 1
        elif c in '}]':
            d -= 1
        elif c == ';' and d == 0:
            i += 1
            break
        i += 1
    if i < n and text[i] == '\n':
        i += 1
    return start, i


def main():
    s, crlf = read()
    if MARK in s:
        print('already grouped; nothing to do')
        return

    blocks = []
    for name, fight, reader in MOVE:
        sp = span(s, name)
        if not sp:
            raise SystemExit('REFUSED: %s not found' % name)
        a, b = sp
        body = s[a:b]
        # sanity: the cut has to be balanced, or the file is being mangled
        if body.count('{') != body.count('}'):
            raise SystemExit('REFUSED: %s cut is unbalanced' % name)
        note = ('/* %s lives in the one statblock block beside FOE_T now (2026-08-31).\n'
                '   %s still reads it; the note above stays with the fight. */\n'
                % (name, reader))
        s = s[:a] + note + s[b:]
        blocks.append('/* --- %s : the %s fight --- */\n%s' % (name, fight, body.rstrip('\n')))

    i = s.index(ANCHOR)
    s = s[:i] + HEAD + '\n'.join(blocks) + '\n' + s[i:]
    write(s, crlf)
    print('moved %d tables into one block' % len(blocks))


if __name__ == '__main__':
    main()
