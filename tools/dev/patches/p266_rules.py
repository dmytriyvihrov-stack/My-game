# -*- coding: utf-8 -*-
"""#266 - the two standing rules this entry moved a number in."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

R = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                 '..', '..', '..', '.claude', 'rules'))

# ── enemy-stats.md: the measured gap table moved, because YOUR nerve moved ──
patch([(
 "| hitpoints | 49.1 | 60 | **-18%** |\n"
 "| to hit | 53.3 | 70 | **-16.7** |\n"
 "| nerve | 62.7 | 90 | **-27.3** |\n"
 "| dodge | 16.5 | 14 | +2.5 |",
 "| hitpoints | 49.1 | 60 | **-18%** |\n"
 "| to hit | 53.3 | 70 | **-16.7** |\n"
 "| nerve | 62.7 | **100** | **-37.3** |\n"
 "| dodge | 16.5 | 14 | +2.5 |\n"
 "\n"
 "⚡ **THE NERVE ROW MOVED ON 2026-08-29 (#266) AND THE FOE COLUMN DID NOT, WHICH IS THIS SECTION\n"
 "WORKING RATHER THAN ROTTING.** `GIVEN.nerve` went 90 to 100 at the user's word (*\"basic start is\n"
 "100%\"*); a foe's pool is `t.mor` off its own statblock and has never come through `GIVEN`, so the\n"
 "gap widened by 10 points and nothing on the other side was touched. ⚠ **The widening is smaller\n"
 "than it looks**, because `START_NERVE` came down .78 to .64 in the same edit and both sides open in\n"
 "the same band as they always did. **Priced with `ARENA.match` n=15 a side over 14 fights x 2 comps:\n"
 "starting four 56% -> 55%, prepared six 87% -> 86%**, and every cell that moved 20 points came back\n"
 "identical at n=30 on both builds.\n"
 "⛔ **RE-MEASURE THIS TABLE WHENEVER EITHER SIDE'S GIVENS MOVE.** A gap written down once is a claim\n"
 "about a build, and this row was one edit away from being a wrong one.")],
 path=os.path.join(R, 'enemy-stats.md'))

# ── ui-scales.md §3c: the pool grew a fourth part, and it is DIVIDED ──
patch([(
 "| the frame | a `box-shadow` on `.sbt`, never on `.sbb` *(#249, and see below)* |",
 "| the frame | a `box-shadow` on `.sbt`, never on `.sbb` *(#249, and see below)* |\n"
 "| **the dividers** | **`::after` on the `.bar`, on all three rows** *(#266)* |\n"
 "\n"
 "⛔ **#266 · A POOL IS DIVIDED, AND THE THREE ROWS DIVIDE IN ONE LAYER.** (User: *\"Bars with\n"
 "health do more in style of the game - and feel free to add some dividers (like in battle)\"*.)\n"
 "Armour and hitpoints are sectioned in BLOWS (`--seg`, off `SEG()` and the plaque's own `SEG_HP` /\n"
 "`SEG_ARM` - #94's rule, and a renderer owes them nothing but the count); the mood bar is ticked at\n"
 "**the ladder's own gates**, because its scale is not even and an evenly sectioned bar would draw a\n"
 "ladder this game does not have. All three rules are `:is(#bPlq,.ibars)`, which is #219's arithmetic:\n"
 "`:is()` takes the specificity of its most specific argument, so they keep the 1-1-0 they had and\n"
 "`.ibars .sbar .bar` still wins on height and border.\n"
 "⛔ **AND THE TICKS ARE DERIVED FROM `LADDER`, BECAUSE FOR TWO ENTRIES THEY WERE NOT.** The rule\n"
 "read `15 / 40 / 70 / 90` as CSS literals and the gates have been `15 / 34 / 52 / 90` since #129\n"
 "inserted SHAKEN and #228 merged Ok into Happy - so the battle card drew dividers at rungs that do\n"
 "not exist, out by up to 18% of the pool, and nothing said so because a stylesheet cannot ask a JS\n"
 "table anything. `--nrvticks` is built beside `LADDER` and set on `:root`. **A number a stylesheet\n"
 "copies out of a table is a number that goes stale silently.**\n"
 "⛔ **`::after` AND NEVER `::before`, AND ONLY A SCREENSHOT COULD HAVE FOUND IT.** A generated\n"
 "`::before` is the FIRST child and the `<i>` fill is a real one, so ticks drawn there paint UNDER the\n"
 "fill while the blows hatch paints over it - three bars in one column, two divided end to end and the\n"
 "third divided only in its empty half. ⚠ **No probe in this project can tell the two apart**: both\n"
 "are `background:<a gradient>` on a `pointer-events:none` pseudo covering the same box, with the same\n"
 "computed `display`. `shots/266_bars.png` is what said so, which is #234's own lesson (*two probes\n"
 "said the geometry was right and the screenshot said the meaning was wrong*) on a third surface.")],
 path=os.path.join(R, 'ui-scales.md'))

# ── ui-scales.md §5: the counters have a blind spot, and it is the hover ──
patch([(
 "**Known and pre-existing, on the shipped build, so do not chase them**: `#wMap` (the map is bigger",
 "⛔ **AND BOTH COUNTERS WALK `#stage *`, SO THE HOVER TIP IS INVISIBLE TO THEM** *(#266,\n"
 "2026-08-29)*. `TIP` is appended to `document.body` - it has to be, or `moveTip` could not clamp it\n"
 "against the window - so **`#gtTip` is not inside `#stage` and never has been.** #266 raised the stat\n"
 "ledger's total from `--fs4` to `--fs6` and widened its column, i.e. it made bigger the one box in\n"
 "the build that neither gate can see. **Measure a hover by hand, on every state that opens one:**\n"
 "\n"
 "```js\n"
 "/* the stat tip, on all four stats and on a body carrying a scar and a banked level */\n"
 "(()=>{const t=document.getElementById('gtTip');return ['str','agi','int','mor'].map(k=>{\n"
 "  const el=$('iChar').querySelector('[data-tell=\"'+k+'\"]');\n"
 "  el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true,clientX:400,clientY:300}));\n"
 "  const r=t.getBoundingClientRect();\n"
 "  return k+' '+Math.round(r.width)+'x'+Math.round(r.height)+\n"
 "    ' over '+(t.scrollWidth-t.clientWidth)+','+(t.scrollHeight-t.clientHeight)+\n"
 "    ' offscreen '+(r.right>innerWidth||r.bottom>innerHeight);});})()   // expect 0,0 and false\n"
 "```\n"
 "\n"
 "⚠ **`offscreen` IS THE HALF THE OVERFLOW NUMBER CANNOT SAY.** #252 records this box hanging off the\n"
 "bottom of the board with 0 overflow inside it, because `moveTip` clamps against `innerHeight` and not\n"
 "against `#stage`. A tip that fits and is in the wrong place reads the same to both counters.\n"
 "\n"
 "**Known and pre-existing, on the shipped build, so do not chase them**: `#wMap` (the map is bigger")],
 path=os.path.join(R, 'ui-scales.md'))

print('rules ok')
