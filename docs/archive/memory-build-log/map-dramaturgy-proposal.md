---
name: map-dramaturgy-proposal
description: "The world-map dramaturgy reshape, backlog #71, SHIPPED 2026-08-01, and the three lessons that outlive it"
metadata: 
  node_type: memory
  type: project
  originSessionId: ac3f2e03-0aac-4f64-9613-2c369efeaa8b
  modified: 2026-08-01T18:39:41.475Z
---

**✅ BUILT 2026-08-01, backlog #71, build log 8f.73.** The map was reshaped for its dramaturgy after
the user approved `tools/map_proposal_2026-08-01.html` item by item ("nice, impliment it"). That file
is marked shipped and is now history; the build wins over it. Picture:
`shots/map_reshape_2026-08-01.html`.

**The shipped shape:** hold → clash → FORK A (risky 4d: slot, Broken Men, **The Roadside Fire** /
safe 6d: three slots) → Ruined Steading → **Muster Field + the armourer's cart** → Black Fen →
Coldharrow → FORK B (Stone Field + **Bonepicker's, now fixed** 3d / quiet slot 4d) → Dead Company
(**the Thing in Armour lands here**) → **The Warm Spring** → FORK C (Hill Steading 3d / pilgrim path
4d) → shrine → Last Muster → Snare. **23 places, 25 roads, 8 routes, 17 to 21 days, 11 unskippable
beats.** Wagon purse 48 → 90. The empty 2-day pass deleted. `ROAD_EVENT` 0.28 plus a one-per-leg
latch. Slots: `b1 f1 f2 f3 q1 e1 p1`; `camp` left FLOATING (16 cards).

**⚑ Three lessons worth more than the feature:**
1. **A rule phrased against a node's PROGRESS breaks silently the day somebody reorders the run.**
   `armourDue` read `G.visited['hire']`; moving the muster in front of the Fen would have fired the
   Thing in Armour on top of the boss, with no crash and no warning. It is anchored to a computed
   SHAPE now (`branchOf('vill').join`, resolved lazily because `branchOf` reads `EDGES`), and `LINT()`
   check 8b watches it because both failure directions are silent.
2. **Every scene in the map painter is a node lookup**, so deleting a node is a TypeError that takes
   the whole painting down (`o1`/`o2` had a gallows and a pedlar's table drawn off them). Remove a
   node, remove its scene in the same edit.
3. **A painting outlives the map it was drawn for.** The Bloom's glow was centred on "the one
   genuinely empty quarter" and the reshape put two new places through it; the "the pass" caption
   named a road that no longer exists; a gallows ended up beside the Warm Spring.

**Also found, and still true for any economy work:** since #55 the post-battle haul auto-draws ONE
random non-choice row, and most rows pay in gear or salvage. Expected crowns per fight are only
clash 10 · brigand 11 · pack 15 · mother 30 · slingline 20 · steading 22 · snare 19 · armour 0, about
127 across the richest route. **Fights pay in iron, not coin; the purse is fed by the opening advance
and by events.** Do not size any economy change without this.

**New machinery this added, reusable:** `needHurt` (a choice only offered when somebody is wounded or
carrying a condition) · `springStay` (permanent `p.st.mor += 1` on a named person, which is how any
permanent stat bump should be written since `effStats` reads `p.st` and the roster already saves) ·
`openCamp(spot,next,atPlace)` · `SCREEN_EVENTS` in LINT for nodes whose `ev` is routed in `openEvent`
rather than living in `EVENTS`.

**Open remainder:** no existing event text was retuned, which is the user's own separate session. One
cosmetic pre-existing bug found and deliberately not fixed: a revealed slot whose title does not begin
"THE " or "A " prints on the map in full caps (WHAT THE PEAT KEPT).

See [[grimtoll-game-project]], [[grimtoll-big-steps-plan]], [[explain-and-mockup-before-building]].
