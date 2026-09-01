---
name: grimtoll-245-eleven-ask-batch
description: "#245 the eleven-ask batch - LANDED + DEPLOYED 2026-08-25 (8f.269). THREE asks were things that were BUILT AND UNREACHABLE, and 'I have never seen X' is the only thing that can find that class of defect; a preference ('more enforcers') was a measured regression report; and the standing arena gate caught an 11x slowdown from ONE line in the wrong place"
metadata: 
  node_type: memory
  type: project
  originSessionId: 085a02dc-dc52-410e-a66c-eeb671ad24ed
  modified: 2026-08-25T12:22:29.013Z
---

**#245 · eleven asks · landed on main and deployed 2026-08-25 · build log 8f.269.**

## ⛔ THE FINDING WORTH KEEPING: THREE ASKS WERE FEATURES THAT WERE BUILT AND UNREACHABLE

Not bugs in the ordinary sense, not misremembering. The user said *"Where is rabits battle/event"*
and *"I have never seen a throvables and consumbles"*, and both times the thing existed in full and
nothing on any screen could ever show it.

- **The mirehares.** `f2` carried `ev:'mirehares'` since #193 AND was in `SLOTS_ON_MAP`, so
  `dealEvents()` overwrote the authored key at the top of every run. Measured: **0 survivals in 20
  deals**, and a booted game had **no node carrying the key at all**. The card, the fight, the
  arena field, the wide stage (`EVJ18`) and the map sight (`MAPEV34`) were all built.
- **`wynn`** was a `MAP_SIGHT` row whose card opens from inside the Snare, so no node could ever
  carry it. Found by the new check, on its first run.
- **#192's whole item pack.** `art/ITEM_PACK_01_TEXT.md` wrote five items in `GEAR{}`'s own shape
  *"so the row can be pasted"*, painted all five, embedded them as `ITEM01..ITEM05` - and **pasted
  none of them**. The BAG slot had been a documented empty promise since #140.

⛑ **THE TRANSFERABLE PART: THE GATE THAT WOULD HAVE CAUGHT ALL THREE ASKS THE WRONG QUESTION.**
`MAP_SIGHT`'s orphan check asks *does this key have ART*. Nothing asked *can a NODE ever hold it*.
**LINT 8h** asks the second question, and it was proved by putting `f2` back in the slot list and
watching it report. See [[grimtoll-invisible-feature-shape]] - this is that entry's third and
fourth instance, and the pattern now has a linter.

## ⛔ A PREFERENCE CAN BE A REGRESSION REPORT, AND ONLY THE ARENA SAYS WHICH

*"більше енфорсерсів"* read as taste. `holdHost`'s own note ends *"joining the clan must not
therefore be the EASY way to end the act"*, and measured at n=30 it was **53% against the honest
finale's 27%** - twenty-six points the wrong way round. The fight had not been touched; eight clan
bodies on your side have been getting better for two months while the line stood still.
⚡ **n=15 COULD NOT SEPARATE ANY OF THE ROWS** - it read the +2-bills row at 33% and its own
superset at 60%. n=30 read 53 / 40 / 40.
⚡ **AND SAY THE HONEST THING**: the champions did **not** move the win rate at n=30. The two bills
did all thirteen points. Writing the entry as if the epaulettes bought the difficulty would have
been easy and false.

## ⛔ THE STANDING ARENA GATE EARNED ITSELF BACK, ON THE MERGED BUILD

One `HIT GUARD` on the deserters after the merge. The baseline diff on the same 24 fights:
**4,558 ms before, 50,422 ms after - 11x**. One line: `surroundOn(d)` was evaluated on EVERY blow
in the game instead of on the four dogs' bounce, and it reaches `engagers`, which rebuilds
`alive()`. That is the same 11x this project already records against putting `losState` in
`hitBreakdown`, on a second surface.
⚠ **`strike` is not the AI's inner loop but it is close enough to one** - every swing of every body
of both sides.
⚠ **WARM BOTH BUILDS OR A FIX READS AS HALF A FIX.** The first re-measurement said 8,061 ms and
that was cold-start JIT on a freshly launched browser; warm, it is 3,277 against 3,403.

## What else shipped, one line each

- **A champion is a MULTIPLIER on a plan row**, never a statblock: `[10,5,'bill',38,'champ']` and
  five multipliers in `build()` (hp/armour/damage ×1.5, skill ×1.1, dodge ×1.05 - the one reading
  that makes the user's sentence uniform). A drawn CSS **epaulette** top-right, so it collides with
  no glyph by construction. ⚡ **The screenshot caught what the DOM did not**: the first champion
  photographed was a Hold CORPORAL, which carries `captain:true`, so the tag ranked behind
  `⚑ CHIEFTAIN` and the epaulette had nothing explaining it. The tag composes now.
- **A ringed body is not left alone.** *Bite twice* was not a second rule - a dog has two actions
  and SNAP costs one; the only reason it never bit twice is that the first bite teleported it out
  of its own reach. One condition on `bounce`, keyed on `surroundOn` so **the ⊛ SURROUNDED badge
  already on the board IS the warning**.
- **PROVISIONS → SUPPLIES off one `RES_NAME` table.** Renaming one resource meant finding **28
  player-facing sites** spelling it out by hand. `RES_WORDS`' glyph regexes are BUILT from the
  table now, with the old word kept as an alias.
- **The day chips sit on the road.** `edgeCtl`/`edgePt`/`edgeTan` give the painter and the placer
  one curve; a new pass ZERO offsets along the normal, **offset-outer** so *near the line* beats
  *near the middle*. Mean **62 → 37** design px. ⚠ The first cut nested it t-outer and made the map
  WORSE (13 chips over 30px became 18).
- Four BAG items to #192's own numbers · the muster and market re-open (⚠ the first cut keyed on
  `n.t`, and `t:'shop'` is a DEALT type - re-opening the pedlar would have paid its loot twice) ·
  a zone-of-control note through `groundNote`'s two existing renderers · Hoom costs six supplies.

## Still open, and said out loud in the record

- **The Thunder-fish Kris and the Fingerprint Stone Shield** are still unbuilt. The kris needs a
  BLEEDING status that does not exist (a 13th `STATUS` entry, a per-turn tick at 10% and 5% on a
  boss, refresh-not-stack, an armour gate).
- **8 of 30 road labels have no clean box within 44px of their line anywhere along it** - the
  crowded corridors, not the search. #197 already closed every other door on that.

Related: [[grimtoll-invisible-feature-shape]], [[grimtoll-244-sixteen-ask-batch]],
[[grimtoll-combat-benchmark]], [[grimtoll-measuring-the-running-build]].
