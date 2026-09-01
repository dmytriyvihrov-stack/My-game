---
name: grimtoll-244-sixteen-ask-batch
description: "#244 the sixteen-ask batch - LANDED + DEPLOYED 2026-08-25 (8f.268). The zone of control is the side a hex SHARES with the body holding it; blood goes INTO the sprite because an overlay comes apart the first time anything moves; and two asks were not bugs - the working's price was being said TWICE, and the road's mood drift is #161's and had never been printed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 816b1e09-c346-4ed2-826a-9b43bb2cc2fc
  modified: 2026-08-25T10:29:48.595Z
---

Sixteen asks the day after #243, plus a seventeenth arriving mid-session. Landed on main as
`11d28a0`, deployed as `01fbe7a`, build stamp **8f.268**.

## ⛔ ONE ASK PAID FOR THE NEXT, AND THE ORDER IS THE LESSON

*"highlight not full hext infront of enemy, but only first border of that hex connected to the
enemy"* → `drawZoc` picks the side facing each **CONTROLLER** instead of the side facing away from
the SET. **14 held hexes go from 44 segments to 17.** ⛑ **And that is what made ask 16 possible an
hour later**: *"if we are doing proper hex border in front, we can delete this thing"* - `.backer`,
a 22px part-circle with one side of its border painted, rotated to a body's facing, drawn UNDER a
33px sprite. He is right about why it was unreadable, and the front border now says the same fact on
the ground at hex size. ⚠ **The `back` whisper NAMED that arc** and was rewritten in the same edit;
`backRing()` is kept returning null because it is the only written record of how the arc was built.

## ⛔ BLOOD GOES INTO THE PICTURE, NOT ON TOP OF IT

The obvious build is an overlay masked to the sprite. It comes apart the first time anything moves:
`.usp` lunges, recoils, sways, shudders, flips on `--flip` and rotates when it routs - **six
animations a sibling layer would sit still through.** `spriteHurt` composites specks onto a copy of
the sprite with **`source-atop`, which is a free mask** (it keeps only pixels landing on something
already painted), three tiers off `woundTier`, cached per PICTURE so two lurchers at a tier share
one bitmap. ⚠ **Asynchronous**: a painted sprite is a data URI and has to go through an `Image`, so
the clean picture shows until the `onload` re-renders - the terrain's trees already work this way.
Measured: a lurcher 3310 bytes clean → 3938 bloodied.

## ⛔ TWO ASKS WERE NOT BUGS, AND ONE OF THEM WAS A DOUBLE RECEIPT

- *"i still don't see how mage morale decrease after magic use"* - the game **was** charging him
  (WILL-KICK: morale 58→53, nerve bar 71.6%→65.4%) and it was **saying it twice**: `mor()` floats
  its own `◠▼▼` for any drop of 5+, and `payStrain` floated `−5 mood` beside it. Two small marks in
  one frame under a spell's flight. ⛑ One float now, full size, caster pink, and the plaque's MOOD
  row flashes. `mor(u,amt,why,quiet)` has exactly one caller.
- *"Mood has option to normailise on global map too … 1 per day first distance, 2 per day second"* -
  **that is exactly what #161 built** and nothing on screen had ever said so. Driven from 70/30/−30/−70
  it walks 2/1/1/2 a day. The hover names the rate now, derived off the same arithmetic.

⚠ **AND ONE I COULD NOT REPRODUCE.** *"dogs pack bonus doesnt reset after dog use ability to bite and
run away"* - driven through a REAL `SNAP-AND-AWAY`, `aurasOn` recomputes on the spot (at d=5 the
bonus is 0). What makes it look stuck is that **the Bitch's aura reaches 3 and the bounce is 2**, so
a dog that bites and runs is almost always still inside it. That is a dial, not a defect; the user
has been asked which of the two numbers should move.

## What else, and the two traps worth keeping

- **`START_NERVE_YOU` .71 against the foes' .78.** #243 gave HIGH SPIRITS +15 and a fed company was
  opening every fight on `It rocks`, the rung the ladder says must be *earned*. ⚠ A separate const
  because `START_NERVE` is also what the foe templates build from.
- **The whole stride** (`moveBudget2`, which ASKS `moveBudget` with `movesUsed` set rather than
  computing `b-1` - the cutter's first-move hex goes too). ⚠ **The far wash is gated on
  `B.sel.move`, not on a cleared `B.reach2`**: eight places clear `B.reach` and only four were
  taught to clear the pair, so one test beats nine sites to keep in step.
- **The dev KIT bench**: 55 artifacts, 54 skills, the skills DERIVED from `SPELLS` + `RACESKILL` +
  every act every `FOE_BUILD` builder can field. ⚠ An act is JSON-copied, never shared (`cool`
  counts down on the object). ⚠ Gear goes through the ROSTER then `unitFrom`, and `KIT_KEEP` copies
  the DERIVED half back while position/hp/mood stay.
- ⛔ **AND THE PANEL SHIPPED 170px WIDE AND SAT OVER ONE PLAYABLE HEX AT EVERY CAMERA STOP.** Caught
  only because `ui-scales.md` §4d makes that a standing check after #240's audio box. 112 - the
  brush's own width, one rail - covers none. **Measure new chrome against the board, at all three
  stops, on more than one field.**
- the off-hand dirk is **+5 hit / +5 damage behind a blade and a CARD behind a bow**, never both ·
  `ARMOUR NONE` · `3 KILLED` shut and the race heads only when the accordion is open · `+2 TO A STAT
  · PICK A ROW` · no hover at all on a taken off hand · `Let them go.`
- ⚠ The crossbow was **already** `hands:2`.

Related: [[grimtoll-243-eighteen-ask-batch]], [[grimtoll-231-board-answers]], [[grimtoll-242-dev-bench]].
