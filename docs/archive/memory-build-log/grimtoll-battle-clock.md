---
name: grimtoll-battle-clock
description: "#81 the battle clock, shipped 2026-08-03 (8f.100): one PACE multiplier at x1.75 over every duration on the board, plus the lesson about scaling only half a set of tuned timings"
metadata: 
  node_type: memory
  type: project
  originSessionId: e3a9652c-eeee-435c-855a-9d2d0d930e04
  modified: 2026-08-02T22:34:19.208Z
---

**#81 SHIPPED 2026-08-03, build log 8f.100. Next free backlog number is #82.**
*(User: "make actions on battlfild 50-100% slower. so player have more info to understend what have
happened".)* Full text in `docs/CHANGELOG.md`, registry line in `docs/SHIPPED.md`, test section in
`docs/WHAT_TO_TEST.md`.

**What it is:** one multiplier, default **x1.75**, applied at exactly two doors - **`paced(ms)`** in
JS and the CSS variable **`--pace`** (every keyframe written `calc(base * var(--pace))`). Player
control `⏱ PACE` under WITHDRAW cycles x1 to x2.5, saved in `gt_pace`, deliberately NOT gated behind
`⚙ TEST` the way AUTO is.

**The three things worth carrying to another feature:**

- ⚑ **A SET OF DURATIONS TUNED AGAINST EACH OTHER IS ONE OBJECT, AND SCALING HALF OF IT BREAKS IT.**
  Both obvious readings of "make it slower" fail here: pause-only opens a dead gap in every beat,
  animation-only leaves a blow still playing when the next unit swings. Before scaling any timing,
  list every duration in the relationship and check they all pass through the knob.
- ⚑ **THE LITERALS STAY LITERAL.** `later(step,380)` still says 380. The number's job is to say how
  this beat compares to its neighbours, not how long it is in wall time. Baking the multiplier into
  the call sites makes the next retune a division done twenty-three times in someone's head.
- ⚑ **A TEMPORAL CHANGE PAYS THE PICTURE GATE IN MEASUREMENT** (see
  [[explain-and-mockup-before-building]]): there is nothing in a still frame to photograph. One
  instrumented `regress()` tallying every `later()` turned "it feels slower" into per-fight seconds
  the user can argue with - including the Snare's extra 85s, which went into `WHAT_TO_TEST.md` as a
  question rather than being left to be discovered as boredom.

**The open remainder, and it is a real defect the slowdown exposed:** `strike()` looses a shot and
resolves the damage in the SAME tick, so the flash and the figure are on the target while the arrow
is still crossing. The arrow's flight is therefore the one duration deliberately left off the clock
(pacing it would widen the mismatch; leaving it puts the arrow back inside the recoil). **The fix is
to defer the impact by the flight time**, which is a change to how a blow resolves, not a
multiplier.

**Not on the clock, on purpose:** the Captain's balloons (2.2s comment, 4.5s lesson) and the opening
side labels. The line is **action time versus reading time**. See [[grimtoll-game-project]] and
[[grimtoll-qa-workflow]] (its two new entries came out of verifying this one).
