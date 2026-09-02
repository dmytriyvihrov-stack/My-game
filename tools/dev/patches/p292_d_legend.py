# -*- coding: utf-8 -*-
"""#292 part D - THE `?` ON THE BATTLE CARD IS A CELL IN THE ROW IT STANDS IN.

Measured: `#bLegend` is a direct child of `#bStats`, whose four other children
are 35px tall (`align-items:stretch`). It was 19x19 hung off the bottom edge -
a fifth box in a row of five, at half the height of the other four, and the
first thing the eye finds wrong on that card.

`align-self:stretch` + `height:100%` costs nothing: the row's height is set by
the four cells, the chip is `flex:none` at 19px wide, and the legend body it
opens is absolutely positioned off it.

Run:  python tools/dev/patches/p292_d_legend.py
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = [(
    "#bLegend{position:relative;flex:none;align-self:flex-end;margin-bottom:1px}\n"
    "#bLegend>.lbl{display:flex;align-items:center;justify-content:center;cursor:pointer;\n"
    "  border:1px solid var(--e5);background:#16211f;width:19px;height:19px;color:#8fa5a2;font-size:var(--fs2)}",

    "/* ⛔ #292 - IT IS THE FIFTH CELL IN A ROW OF FIVE AND IT WAS HALF THEIR HEIGHT.\n"
    "   `#bStats` is `align-items:stretch` and its four `.pcell` children measure 35px;\n"
    "   this one was 19 and hung off the bottom edge. Stretching it costs no width (it is\n"
    "   `flex:none` at 19px) and no height (the four cells set the row), and the popover it\n"
    "   opens is absolute off this box, so the panel is unmoved. */\n"
    "#bLegend{position:relative;flex:none;align-self:stretch}\n"
    "#bLegend>.lbl{display:flex;align-items:center;justify-content:center;cursor:pointer;\n"
    "  border:1px solid var(--e5);background:#16211f;width:19px;height:100%;color:#8fa5a2;font-size:var(--fs2)}")]

patch(E)
print('p292_d: %d edits applied' % len(E))
