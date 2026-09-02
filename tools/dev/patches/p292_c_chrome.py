# -*- coding: utf-8 -*-
"""#292 part C - THE REST OF THE CHROME FAMILY JOINS THE TWO CORNERS.

The re-audit after part B named three boxes that were left behind, all of them
the same species as `? RULES` / `☰ MENU` / `FEEDBACK` and all of them now the
only `--e1` box on a screen where everything else moved:

  · `#bPace` - the battle's ×1 speed knob. Same ground, same `#8a7449` face,
    and it stands DIRECTLY UNDER `☰ MENU` in the same column, 19px against 24.
  · `#reactWhat` - the echo that opens off FEEDBACK's own left edge.
  · `#iBar button` - the sheet bar's two doors at 25px beside `☰ MENU`'s 24 on
    the same bar.

Run:  python tools/dev/patches/p292_c_chrome.py
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

E.append((
    "#helpBtn:not(.inlog),#menuBtn:not(.inlog),#reactTog{display:flex;align-items:center;",
    "#helpBtn:not(.inlog),#menuBtn:not(.inlog),#reactTog,#bPace{display:flex;align-items:center;"))

E.append((
    "  font-size:var(--fs1);color:#8a7449;background:rgba(16,12,6,.92);\n"
    "  border:1px solid var(--e1);padding:var(--p2) var(--p3);max-width:250px;white-space:nowrap;",
    "  font-size:var(--fs1);color:#8a7449;background:rgba(16,12,6,.88);\n"
    "  border:1px solid var(--e2);padding:var(--p2) var(--p3);max-width:250px;white-space:nowrap;"))

E.append((
    "#iBar button{font-family:var(--display);font-size:var(--fs2);color:var(--g4);border:1px solid var(--e2);\n"
    "             padding:var(--p2) var(--p5);background:#2a2114;letter-spacing:.08em}",
    "/* #292 - `--chromeChip`, so the two doors on this bar and the `☰ MENU` floating over\n"
    "   the same bar are one height. They were 25 and 24. */\n"
    "#iBar button{font-family:var(--display);font-size:var(--fs2);color:var(--g4);border:1px solid var(--e2);\n"
    "             padding:var(--p2) var(--p5);background:#2a2114;letter-spacing:.08em;\n"
    "             min-height:var(--chromeChip);display:flex;align-items:center}"))

patch(E)
print('p292_c: %d edits applied' % len(E))
