# -*- coding: utf-8 -*-
"""#266 - #265's measured sentence is a claim about a build, and this entry
   moved one half of it. Re-measured rather than left standing."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

R = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                 '..', '..', '..', '.claude', 'rules'))

patch([(
 "⚡ **Measured both sides BUILT, 2026-08-28: your six average a 101.7 pool against the road's\n"
 "63.6, which is -37.5%; at 1.25 the road reads 79.4, which is -21.9%.** Closer, and still the\n"
 "lesser side, which is *\"a little bit harder\"* read exactly rather than *the same*.",
 "⚡ **Measured both sides BUILT, 2026-08-28: your six average a 101.7 pool against the road's\n"
 "63.6, which is -37.5%; at 1.25 the road reads 79.4, which is -21.9%.** Closer, and still the\n"
 "lesser side, which is *\"a little bit harder\"* read exactly rather than *the same*.\n"
 "⚡ **AND #266 MOVED THE FIRST FIGURE THE NEXT DAY, WHICH IS THE TABLE ABOVE'S OWN INSTRUCTION\n"
 "BEING OBEYED RATHER THAN A CONTRADICTION** *(2026-08-29)*. `GIVEN.nerve` 90 -> 100 adds exactly\n"
 "10 to every body on your side and nothing at all to theirs, so **your six read 111.7 and the road\n"
 "is unchanged**: the gap is **-43.1%** against the authored 63.6 and **-28.9%** against the 79.4\n"
 "this knob makes of it. `probes/m266_gap.js` is that reading, and it re-derives the 101.7 exactly\n"
 "on the pre-#266 build, which is what makes it the same measurement rather than a second one.\n"
 "⚠ **ITS POPULATION IS THE 55-TEMPLATE ONE AND THE SCOPING IS LOAD-BEARING**: an unfiltered sweep\n"
 "over `FOE_BUILD` puts the Fen-Mother's 300 and the Warden's 460 into the mean and reads 84 where\n"
 "this reads 70.3, i.e. it answers a different question in the same words.\n"
 "⚠ **AND #266 TOOK THE OPENING FRACTION DOWN IN THE SAME EDIT** (`START_NERVE` .78 -> .64), which\n"
 "pulls the other way: a foe still carries the bigger pool this entry bought it and now walks on\n"
 "with 64% of it rather than 78%. **The two were priced together** - `ARENA.match` n=15 a side over\n"
 "14 fights x 2 comps, this build against main - and the road did not move. If *\"a little bit\n"
 "harder to break them\"* ever stops reading true, `START_NERVE` is the number that eroded it and\n"
 "`FOE_NERVE` is not.")],
 path=os.path.join(R, 'enemy-stats.md'))
print('gap note ok')
