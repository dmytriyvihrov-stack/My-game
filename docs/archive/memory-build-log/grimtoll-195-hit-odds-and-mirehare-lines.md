---
name: grimtoll-195-hit-odds-and-mirehare-lines
description: "#195 the % to hit returns + the mirehare movement overlay - BUILT on desk work/hit-odds-mirehare 2026-08-19 (8f.217), NOT merged: he was editing main's texts live"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7f0f3454-7e1b-4277-8fb9-e62528f7209f
  modified: 2026-08-19T09:21:01.112Z
---

Three asks in one message (2026-08-19): return the % to hit on enemy hover and in the extended hit
window; show the mirehares' line of movement more clearly; run test fights to confirm it reads and
that the fight gets easier once the movement rules are understood.

**⛔ NOT ON MAIN.** Four commits on desk `work/hit-odds-mirehare`. Mid-session he said *"be carefull
with main file - i am aslo working with texts in it right now"*, so I moved off the main desk to a
worktree and released the prototype lock. **His `prototype/grimtoll_slice.html` still has
uncommitted changes**, so `branch.ps1 done hit-odds-mirehare` has to wait for him to commit the
text edits. See [[grimtoll-parallel-sessions]] - every failure of that system is a LANDING failure.

**Part 1 was one boolean.** `SHOW_HIT_ODDS` false -> true. He confirmed the scope unprompted:
*"with hit chances showing - basically return, how it was before"*. ⚑ **It is one flag and not two
surgical edits because #191's own rule runs both ways**: hiding a total means hiding its signed
parts, so showing a total means showing them too. #191's whole reading is left above the flag
because it is what makes this a reversal rather than a revert. See [[grimtoll-191-six-batch]].

⚑ **The odds/damage stack on the hex clears by 4.4px at the 10px floor** - #164 re-measured that
pair (`.hdmg` top 13 -> 16) and then #191 hid the odds a day later, so the corrected stack had never
actually been seen on screen until now.

**⛔ THE BIG ONE: THE MIREHARE HOVER OVERLAY WAS A LIE, AND I MEASURED IT BEFORE FIXING IT.**
`peekOn` built `reachMap(t,t.speed)` - a cost-based flood fill - for two creatures with
`noWalk:true` and no MOVE act. Hovering the shipped pair:

- **doe: 24 hexes painted, 18 UNREACHABLE** (everything at distance 1-2; she cannot land closer
  than three) **and 8 legal landings unpainted**;
- **buck: 40 painted, 22 unreachable, and his six straight lanes not drawn at all.** A blob.

#102's wrong-unit rule arriving on the overlay, and **doubly wrong for a leap, which does not pay
for the ground it crosses while a flood fill can only** - so a budget of 3 that charges for marsh
reached a fraction of her real ring. Fixed with three builders: `CUBE_AXIS` (the six lanes, declared
once, previously `mirehareMove`'s private array), `chargeLanes()` (path/blocker/n - the brain's three
hand-rolled copies of that walk are now three calls), `moveEnvelope()` (ring / lanes / reachMap).
Walkers deliberately untouched. `drawMoveLines()` draws it on `drawLosRay`'s pattern, because **a
wash says WHICH hexes and only a line says STRAIGHT**.

**⛔ AND `peekThreat` HAD BOTH COUNTERS BACKWARDS.** A movement-only creature threatens from its
LANDINGS, never from where it stands: no hex at distance 1 is adjacent to a hex at distance 3, and
`n>=2` is the charge's own rule, so **standing against either animal is safety** - the documented
counter to the whole encounter, and it had never once been on screen.

**⛔ THE FILE WARNED ME IN WRITING AND I SHIPPED THE BUG ANYWAY.** `render()` holds a SECOND
peek-rebuild site whose own comment reads *"a map rebuilt in one and not the other is the bug #171's
own overlay would have shipped"*. I taught `peekOn` and not that, so the honest overlay **survived
exactly one frame** before the flood fill came back under a cursor that had not moved. ⚑ **Found by
making the live-charge branch fire ON PURPOSE** - this repo's own rule that a check which has only
returned nothing is indistinguishable from a broken one, applied to my own work. Grep for
`B.peekReach=reachMap` and expect **0**.

**⛔ AND `MB.gap()` MEASURES DEPLOYMENT, NOT THE COUNTER - IT REPORTS THE GAP BACKWARDS.**
`arrange()` fires once at `setup`, and both counters are **per-turn** facts (she moves every turn,
so contact must be RE-MADE every turn). Added `MB.rules(n)` to `tools/mirehare_bench.js`, which
varies only where our bodies stand when a mirehare acts, re-imposed every turn by wrapping
`window.mirehareMove`:

| n=20 a side | wins | rounds | down | hp+armour | blows landed |
|---|---|---|---|---|---|
| CONTACT (the rule played) | 20/20 | 2.8 | 0.00 | 46 | 2.1 |
| NAIVE (keep your distance) | 14/20 | 12.3 | 2.50 | 336 | 17.8 |

**Knowing the movement is worth 2.5 bodies and 289 hp+armour, and takes the fight 70% -> 100%.** His
third point is confirmed as written. ⚠ CONTACT is an **upper bound on skill**, not the expected
experience; the shipped fight with AUTO both sides sits between the arms at 6.6rd / 0.8 down.

**Regression, because the brain was refactored:** 4 x n=20 per build against `35227a4` in the same
browser. Baseline 6.54rd / 0.84 down / 181.0 taken; #195 6.63 / 0.81 / 181.8. Every delta far inside
each build's own spread (rounds swing 0.75 within one build). ⚑ **Run the same build twice before
calling a delta real** - that is what turned "rounds went up 0.45" into noise.

**Gates:** LINT 0 · clipped-box probe 3 (`#bField`/`#bTrait`/`#bLog`, all documented) with **`#bFx`
at 0/0 so the new SVG made no scroller** · 0 under the 10px floor · three scales still closed · map
counters 0/0/0 · a full real AUTO fight, 11 rounds and **139 renders with the overlay parked on a
mirehare, 0 errors**.

⚠ **OPEN:** `exposureAt` still scores a mirehare's envelope as a **disc** via `moveBudget`, not a
ring or lanes. AI-internal, both brains read it, moving it changes difficulty - listed as an open
remainder rather than smuggled in. Also **#187-#194 have no `SHIPPED.md` row**, which I deliberately
did not backfill: writing eight other sessions' rows out of the changelog would record work I never
verified.

⚠ **The line weights were set by a SCREENSHOT, not by taste**: at .50 alpha / r=2.4 the doe's
eighteen landing dots vanished into her own wash. The DOM said "drawn"; the picture said "invisible".

See [[grimtoll-193-mirehares]] for the creatures, [[grimtoll-safe-file-patching]] for the patch
discipline, [[grimtoll-token-furniture]] for the same one-fact-two-readers shape.
