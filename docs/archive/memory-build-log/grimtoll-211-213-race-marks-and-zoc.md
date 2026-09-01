---
name: grimtoll-211-213-race-marks-and-zoc
description: "#211 + #213, 2026-08-20: one builder changed and nine screens followed; and there is no uncontested slot on a 37px hex, only the cheapest collision"
metadata: 
  node_type: memory
  type: project
  originSessionId: bda9ff68-f7c7-40e4-a6f7-302fce0fca93
  modified: 2026-08-20T16:17:48.755Z
---

**Both LANDED on main 2026-08-20, NOT deployed** (8f.234 and 8f.236). Two asks in one session, both
about a mark being in the wrong place.

## #211 - the race marks

⚑ **#209 painted ratkin / ogre / human as three 128px cards and wired them to ONE surface, the event
door.** Nine other screens went on printing the `RACE_ICON` emoji. Changing `rIcon` alone moved all
nine, because `rMark` / `rcMarks` / `bmk(rIcon())` all sit on top of it - the same shape as
[[grimtoll-196-hover-edit-and-pictograms]], where making `RACE_ICON` the one table fixed the last
split of this exact pair.

⛔ **`typeof` DOES NOT SAVE YOU FROM A `const` IN ITS OWN TDZ**, only from a name that was never
declared. `RACE_ART` is declared a thousand lines BELOW `rIcon`, so the read is `try{RACE_ART[r]}
catch`. Same guard `hasSight` carries for `MAP_SIGHT`, after the same crash.

⚡ **16px, and 17 is where it starts costing.** Driven against a `git show HEAD:` baseline in a
second tab: roster rows 68/68/68/70 (was 69x4), the sheet's race chip 21 (was 21), muster dialog 467
(was 473), `#iChar` 678 into 678. ⚑ **The CHIP is the tell rather than the row** - `.ichip` is the
one box on the sheet with nothing else in it to set its height, so it reports the mark's line box
directly. ⛑ And `vertical-align:middle` REMOVED a shipped clip: `#bClass` on the battle rail is a
15px `overflow:hidden;nowrap` box the EMOJI already overflowed by 2, an undocumented fifth member of
the ui-scales probe's known list.

## #213 - the zone-of-control warning

⛔ **#205's ⊘⚔ was the right fact in the wrong place.** While a move is being chosen the eye follows
the POINTER; the body it was drawn on is the one square the player has already stopped looking at.
It is `--curWalkZoc` now (red boots + crossed blades) on `#bGrid.cMove.zoc .hex.lit` - `.lit`
because that is #206's own test for ground a click would actually take.

⛔ **THE ⊘ DELIBERATELY DID NOT COME WITH IT.** ⊘ is what the three refusal cursors mean and this
step is LEGAL, it just costs blood. A refusal glyph on a legal move is one mark meaning two things
on the one surface where being wrong stops the click.

⚑ **The percentage is EXACT and the call order is why.** `partingShots(u)` fires BEFORE `walkTo`, so
the swing is rolled while the mover is still on this hex, which makes `hitBreakdown(e,u,atk)` taken
at render time the very roll the click will make. The 0.5 the swing carries is DAMAGE.

⛔ **AND THE PLACEMENT WAS A MEASUREMENT, WITH THE FIRST CUT WRONG.** Top-left came out **31px wide
in a 33px box**, straight across `.hodds`. Driven at the 2.2 camera stop, the 37x42 hex reads:

```
.hin       y  3..40      .hodds  y  7..17      .hdmg  y 19..29
sprite     y-12..33      row in FRONT paints later over y 32..42
```

**There is no uncontested slot on a 37px hex, only the cheapest collision.** It went to the FOOT
with an opaque plate and a red edge, because a plate survives a body standing there where a
text-shadow does not - and the two readouts it would otherwise cover are on screen every turn while
this one is on screen for one decision. That trade is written into `SHIPPED.md`'s open-remainder
column; if it bites in play the answer is to move `.hodds`/`.hdmg`, never a fifth entry on the
overflow list.

⚠ **`Firefox` refuses a cursor image over 32x32**, and the hotspot must not move between a cursor
and its variant or the pointer JUMPS on the boundary.

Related: [[grimtoll-token-furniture]], [[grimtoll-205-feedback-three]], [[grimtoll-209-event-stage]],
[[grimtoll-measuring-the-running-build]].
