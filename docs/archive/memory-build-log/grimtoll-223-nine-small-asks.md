---
name: grimtoll-223-nine-small-asks
description: "#223 nine small asks - COMMITTED on desk work/smallbatch 2026-08-21 (8f.246), NOT landed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 354bb154-fa4f-4a69-b510-1a54363737d4
  modified: 2026-08-21T16:39:02.221Z
---

Nine notes from the user on 2026-08-21. **Four of them were the same defect: a thing that was
built, wired, and invisible.** Committed as `b66762b` on `work/smallbatch`; **not landed**, because
`work/sevenask` (#224) and `work/injury-ladder` (#225) were mid-edit with uncommitted trees when
this finished. Run the [[grimtoll-parallel-sessions]] landing when they stop.

⛔ **A `pointer-events:none` ON A SCROLLING BOX IS A SCROLLER WITH NO HIT TARGET.** #219 put it on
`.evflow` so a click on the prose would step the beat - and the advance listens on `.evstage`, so
the click reaches it **by bubbling** and never needed the declaration. What it bought was: the
wheel's target resolves to `.evstage`, which is not a scroll container and is not an ancestor of the
flow, so a notch scrolled nothing, and the browser's own scrollbar could not be grabbed. **The map's
wheel handler was NOT the other half** - #206 already taught it to skip `#wDlg`, so the notch was
being spent on nothing rather than on the camera. Two faults, one symptom, only driving tells them
apart. See [[grimtoll-invisible-feature-shape]].

⛔ **A HOVER CAN BE 100% CLIPPED AND IT GETS REPORTED AS "DOESN'T HAVE HOVER".** THE CIRCLE's `◎`
ledger chip has had a popover since #136; its clipper is `#iLedger`, a **24px** row, and the box is
117px hanging above it - **121px cut, i.e. none of it ever on screen**. Three more on the same sheet
were cut 61/21/21px by `#iChar`. ⚑ **`.lowpop` was this same bug patched for one host, on one axis,
with a hand-written 70px threshold**, and it could never have saved a chip whose clipper is 24px
tall. Deleted with it.

⚠ **AND THE CONTAINING BLOCK FOR `position:fixed` HERE IS `#stage`, NOT THE VIEWPORT** - `#stage`
carries a transform and an **identity** matrix still establishes one. A pop written to `left:0;top:0`
lands at viewport `0,40`. So a placer must divide every `getBoundingClientRect` delta by `fit()`'s
scale, or it is right on a 1280x720 window and wrong on every other. Same class of mistake as
[[grimtoll-prologue-art-stretch]].

⛑ **"BLURRY" AND "TOO LIGHT" WERE ONE MEASUREMENT, AND THE ANSWER WAS THE OPPOSITE OF THE ASK.**
The map's flat black wash (`globalAlpha .45` over the painting) compresses the range, and low local
contrast is exactly what an eye calls soft. Luminance p10/median/p90 with the spread between ends:
raw `77/125/176 spread 99` · wash .45 `46/73/101 **55**` · wash .58 `37/58/79 **42**` ·
`brightness(.58) contrast(1.2) saturate(.9)` `27/61/96 **69**`. **Darkening further would have made
the blur complaint worse.** ⚠ The canvas was also a 1280x638 store rendering at **1562x827** (box
1280x678 × `#wCam` 1.22 at the default NEAR stop); it is 2x now with `setTransform` keeping every
coordinate in design space. ⏳ **The terrain still cannot get sharper** - the three sources in
`art/world-map-backgrounds/` are 1280x638, exactly the design box.

⚑ **A DELETED BUTTON CAME BACK AND THE REVERSAL IS THE LESSON.** #191 deleted the feedback SEND at
this user's own order and its reasoning was correct (the face IS the submission, the reason is
written as it is typed). #223 puts it back on the 👎 branch only, because **the engineering was
right and the silence was the bug**: from the outside a thing you cannot confirm and a thing that
did not happen are the same thing. It files nothing; it only says so and closes.

⚠ **MOVING A BUTTON INTO A RESERVED SLOT MEANS RE-MEASURING THE RESERVATION.** `☰ MENU` is **71px**
against `♪ ON`'s 46 and `#wBar` reserved 64, so `#wRes` was overrun by 17px and the gem count
printed under the M. Also: the reservation's own comment and `#audioBtn`'s disagreed about what the
64 was for, and the screen settled it (the day plaque is at x 566..713, nowhere near that edge).

⚑ **A GLYPH IS PICKED BY RENDERING IT AT THE REAL SIZE.** `⤢` for the seat count, after `↔`/`⇔` went
to thin ticks at 10px, `⧉` read as "copy", `⤡` pointed the wrong way and `⛶` means expand the VIEW.
See [[grimtoll-text-style]] and the 10px floor.
