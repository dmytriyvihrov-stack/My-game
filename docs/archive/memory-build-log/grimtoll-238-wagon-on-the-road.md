---
name: grimtoll-238-wagon-on-the-road
description: "#238 the wagon comes on the road - BUILT 2026-08-23 (8f.261) on desk work/wagon, landed on main and DEPLOYED (3acbd5f); salvage had no in-run use at all, the five upgrades are the four shipped fittings plus the frame (seats), prices set against a measured salvage curve; three rulings pending (per-run vs permanent, +2 vs +1 seats, the mule's ladder)"
metadata: 
  node_type: memory
  type: project
  originSessionId: df39a2f7-f552-4adc-b4d3-1bdc39be50d0
  modified: 2026-08-22T21:34:53.404Z
---

**2026-08-23: BUILT (8f.261).** Rulings: per-run; seats +1/+2/+2 (13 -> 14 -> 16 -> 18); no pack animal; the card is a grid of picture tiles on the shop's `.gart` box ("more visuals"). The same hour the user lifted the clarity pass's "nothing is added" rule (7 of 10 feedbacks in, "need to finish build"). Open: the six pictures (`art/WAGON_ART_BRIEF.md`), the mule ladder, a full-bar measurement, and the weak joint named in the changelog row: a seat upgrade is only candy when the cap binds, and the lever is `PARTYBASE`, not the wagon.

**2026-08-22. The user asked for a Battle-Brothers-style wagon reachable from anywhere: up to 5
upgrades, a repeatable capacity track ("корпус/основа", 3 tiers, rising cost: I in the first half,
II before the last fight, III "не успел"), the rest one-time, a forge later, a button right of the
chest on the road bar and one in the sheet header, and a draught animal slot that only road events
can change. Spec written as #238 in `docs/archive/BACKLOG_ENTRY_SPECS.md` §238 with a row in the
NEXT table; mock probes and captures in `shots/238_wagon_mock_*`; nothing built, nothing committed
at the time of writing (the two docs are modified in the main working tree, #238 claimed by this
session).**

**The finding that makes it fit rather than add:** `G.camp.salvage` has NO in-run use in the
shipped build. It is banked at the epilogue and spent on the between-runs `#camp` screen
(`FITTINGS{}`, `FIT_SLOTS=3`, `LEGACY.built`) and on one village row (`wag`, -7 ▤, +1 seat
permanent via `LEGACY.yard`). Dima's playtest sat on ▤0 and read it as "for later". All four
fittings are already wired in-run (`feastCost`, the stop's +3, the bed's mend, `moraleMax+10`,
`G.aidLeft`), so the five upgrades are the frame (seats) plus those four, and the build is a
screen, a save field and `hasFit` reading `G.wagon.built`. No fight changes.

**Prices come off a measurement, not taste:** `shots/238_salvage_curve.js` walks `allRoads` and
sums each node's salvage (a fight's haul is ONE random `LOOT` row, so a battle door is worth its
table's mean). A salvage-taking player holds ~12 by the Fen (d12) and 30-34 at the Door-Shrine;
greedy 39 / 57-77. Frame 6 / 12 / 24 ▤ and +2 seats a tier; the fittings keep 8, 5+2◈, 8, 6+2◈.

**Two layout facts measured on the mock:** the chip fits in `#wBar`'s 8px gap right of `#wRes`
(x 1156..1194) before the 86px MENU reservation; and the column card with `artTag()` is 658 into
684 and scrolls 85px, without it 569 - the shop and the muster carry no painting either, so the
wagon card has no art slot.

**Why:** the gate (rules, then a picture, then code) and the user's own question "what do you
think, does it fit the loop?" - the deliverable was the assessment plus the spec, not a build.

**How to apply:** when the user rules on the three questions, build on a desk (`branch.ps1 new
wagon`), reuse `drawVillage`'s row renderer, delete the village `wag` row and the BOLTED IN
station, rewrite the chest hover's "outlives the run" line, and make the mule a PLATE (grey on
that card means *cannot afford*, so a greyed mule row is one colour meaning two things). Run the
full gates and measure the bar at a FULL company before shipping. Related:
[[grimtoll-clarity-pass]], [[explain-and-mockup-before-building]], [[grimtoll-session-toolkit]],
[[grimtoll-event-card-rules]].
