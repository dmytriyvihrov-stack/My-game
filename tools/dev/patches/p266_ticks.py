# -*- coding: utf-8 -*-
"""#266 - three bars, one layer. The mood ticks were drawn under the fill."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

patch([(
 ":is(#bPlq,.ibars) .bar.nrv::after{display:none}\n"
 ":is(#bPlq,.ibars) .bar.nrv::before{content:'';position:absolute;inset:0;\n"
 "  pointer-events:none;background:var(--nrvticks,none)}",
 "/* ⛔ #266 - AND THE TICKS GO IN `::after` WITH THE OTHER TWO ROWS' DIVIDERS,\n"
 "   WHICH IS A LAYER FIX AND ONLY THE PICTURE FOUND IT. A generated `::before` is\n"
 "   the FIRST child and the `<i>` fill is a real one, so the mood ticks painted\n"
 "   UNDER the fill while the blows hatch - `::after`, the last child - paints OVER\n"
 "   it. Three bars in one column, two of them divided end to end and the third\n"
 "   divided only in its empty half: that is #102's wrong-unit rule with the LAYERS\n"
 "   as the units, and it has been on the battle card since #102 wrote the rule.\n"
 "   ⛑ The `display:none` was only ever there to get the blows hatch off a pool\n"
 "   that is not spent in blows. Overriding the BACKGROUND does that and keeps the\n"
 "   layer, so one declaration replaces two rules.\n"
 "   ⚠ MEASURED ON THE PICTURE AND NOT ON THE DOM: both readings are `background:\n"
 "   <a gradient>` on a `pointer-events:none` pseudo covering the same box, and no\n"
 "   probe in this file can tell them apart. `shots/266_bars.png` is what said so. */\n"
 ":is(#bPlq,.ibars) .bar.nrv::after{background:var(--nrvticks,none)}")])
print('ticks ok')
