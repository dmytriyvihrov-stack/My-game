---
name: grimtoll-241-board-apron
description: "#241 + 8f.266 the ground goes on past the field - LANDED and DEPLOYED (the live page is 8f.271+; the '8f.264 carries the bug' warning is spent). ⛔ ROUND ONE SHIPPED THE PAINT ONE APRON OFF ITS TILES and every gate in the project read clean, because nothing measured the paint against the tile. The apron is PADDING plus paint, never hexes, because the cheapest way to say 'you cannot stand here' is to put nothing there; and the camera now reads TWO boxes, clamping to one and resting on the other, which is how a board grows without any stop changing what it promises"
metadata: 
  node_type: memory
  type: project
  originSessionId: 3229142e-a80f-49b7-a6e5-7d0ca584edce
  modified: 2026-08-24T15:09:10.338Z
---

**The ask** (2026-08-24): *"Хочу, чтобы ты сделал чуть более широко карту - чем реальная площадь
боя. Чтобы не закрывали навыки и там были чуть выходящие квадратики - но уже без возможности
ходить ... в размере одного гекса вверху, 2х гексов внизу и 2-3 гекса справа слева. Они не
размечены и на них нельзя становиться."*

## ⛔ THE THING THAT COULD NOT BE STOOD ON WAS BUILT BY NOT BUILDING IT

The obvious cut is sixty more `.hex` buttons with a `notWalkable` flag. A hex in this build is a
BUTTON with `data-k`, a hexagon of tint, a cursor, a hover card and a row in `B.hexEls`, so that
version writes *"you cannot stand here"* into pathing, `at()`, `reachMap`, the AI's target lists
and every counter that says 195. **The apron is `padding` on `#bGround` (t 32 / b 64 / l 76 / r 152 board px,
derived from `APRON={t:1,b:2,l:2,r:4}` through HEXW/HEXH - it was 114/114 until the user asked for
less left and more right) plus a canvas derived from the same numbers, 912x618 today.**
Nothing can stand there because there is nothing there. `COLS`, `ROWS`, 195 hexes, 195 `data-k`:
all untouched, and the diff is 230 lines of which most are comment.

⚠ **The vertical unit is the ROW PITCH (32) and never the hex (42)**, because rows overlap by ten:
"two hexes below" means the room two more ranks of bodies would have taken.

## ⛔ THE CAMERA READS TWO BOXES, AND WHICH ONE ANSWERS WHICH QUESTION IS THE WHOLE ENTRY

Growing `#bGround` grows what `camApply` measures, and at FULL (z 1.64) that would have started
the camera PANNING at the one stop whose promise is *"the whole board, nothing moves"*.

- **the GROUND box (apron and all) is what the view is CLAMPED to** - that is what buys a body on
  the bottom rank the room to sit clear of the cards;
- **the PLAY box decides whether an axis pans and where the board RESTS when it does not** - so
  FULL is pixel-identical to HEAD, 964.3x682.2 at 157.8,70.9, whatever the apron is, and #206's arithmetic still holds.

`camRest(V,P,ap,z)` is the one writer of the resting position because `camApply` AND `camNudge`
both need it; `camPans` takes the play box too, or a drag would jump when the player let go.
⛑ **And the apron is READ off the element (`apronOf`, computed padding) rather than taken from the
constant**, so the harness and the arena - where `paintTerrain` never runs - measure 0 on all four
sides and every line of that arithmetic collapses to what it was.

## ⛔ ROUND TWO, THE SAME DAY: THE PAINT WAS ONE APRON OFF ITS TILES

*(8f.266. The user: **"the bigest problems - async of textures of map and acutal options of turn fix
it (maybe, it was hardcodd before, it should be softer kind of)"**.)*

⛔ **AN ABSOLUTELY POSITIONED CHILD IS LAID OUT AGAINST ITS CONTAINING BLOCK'S PADDING BOX, AND A
PADDING BOX INCLUDES THE PADDING.** Round one read that as *"the canvas has to step back over the
apron"* and wrote `left:calc(var(--aprL) * -1)`, which put the ground one apron OUTSIDE the box:
**every tree, rock, puddle and scorch drawn 114px left and 32px up of the hex it belongs to.**

⛑ **AND EVERY GATE THIS PROJECT HAS READ CLEAN WHILE IT SHIPPED.** `LINT()` 0, both `ui-scales`
counters 0, the map counters 0, the eight arena fights clean, and FULL measured pixel-identical -
because **the hexes were right and the camera was right**. The one relationship nothing measures is
between the PAINT and the TILE, and it is invisible in a screenshot: scattered ground just looks
like it is on the tile next door. **A player found it in a day.**

⛑ **THE CHECK EXISTS NOW AND IT IS ONE LINE**: `tools/dev/probes/align243.js` - the drawing
coordinate of a hex's DOM centre against the `hexCentre()` the painter placed that hex from, which
must be **0,0**. Proved by making it fire: against `git show d0358c5:` it reports **114.00,32.00 on
all nine sampled hexes**. ⚠ **Its own first cut re-derived the offset by hand and got it wrong by
exactly one apron** - a probe that reproduces the bug it is testing for calls a fixed build broken.
It reads `apronCv().ox/oy`, the one number the element and the painter both use.

⚠ **AND THE DETERMINISM PROBE WAS WRONG FOR AN HOUR IN THE SAME WAY A SCREENSHOT IS**: it sampled a
band a HUGE tree on column 0 bleeds into, and those trees arrive as IMAGES whose `onload` repaints
the ground, so it read *unstable* on a build a full-canvas pixel diff called identical. Warm up with
a paint before the first sample.

## ⚠ A SHARED `rnd` STREAM MEANS ANY NEW DRAW MOVES EVERY OLD ONE

`paintTerrain` runs ONE seeded sequence in draw order, so scattering a single tuft in the apron
with it would move every puddle, stone and reed on the board. `apronDress` has its own stream off
`B.terrSeed`, which also makes a mid-fight repaint (`terrMoved`, a shoved boulder) redraw the band
identically. ⚠ **And a hash over the WHOLE canvas reports "unstable" for a reason that is not
yours**: the play area's trees are IMAGES and every `onload` calls `paintTerrain` again. Sample a
band no sprite can reach.

## The numbers, and what is still open

Hexes under floating chrome, acting body driven to each rim, HEAD -> new: **FIELD 54/47/53/52 ->
47/25/35/44 · CLOSE 57/49/47/49 -> 47/25/27/39**. At the bottom rim the skill cards go **10 -> 0**
and **9 -> 0**, and the gap between the last rank and the card band **-100 -> +40.8 / +60**.

⏳ **FULL is unchanged and cannot be otherwise**: 588x416 at z1.64 is 964x682 in 1280x720, so the
cards still float over the bottom two ranks there and #206's *the chrome yields instead* is still
the answer at that stop.
⏳ **`APRON_LATTICE` ships at 0.** The ask contains both *чуть выходящие квадратики* and *они не
размечены*; the second is the sentence about how it looks, so bare ground shipped and one value
(.05 a whisper, .10 a lattice) draws the band's hexes as outlines. Proved by making it fire and
turning it back, which is [[grimtoll-session-toolkit]]'s standing rule for a new switch.
⏳ **The tint layer is 33x37 inside a 37x42 tile** (`.hfill` in `.hin`), i.e. the wash that says
what the turn can do is inset 2 / 2.5 board px on every hex. Pre-existing and deliberate-looking;
it is the next thing to look at if the highlight still reads as not quite fitting its tile.
⏳ **The furniture the ask was really about goes in `apronDress`**, in board coordinates, outside
`0..PLAY_W / 0..PLAY_H`. That is the one place, and it is commented as such.

Related: [[grimtoll-206-battle-readability]], [[grimtoll-234-battle-and-sheet-batch]],
[[grimtoll-measuring-the-running-build]].
