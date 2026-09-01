---
name: grimtoll-215-mirror-battle
description: "#215 the mirror + three battlefield readability asks - COMMITTED on desk `work/mirror-battle` 2026-08-21 (8f.238), NOT landed. The fold sits on the POINTER, so AUTO plays straight; a beast was wearing a ratkin's face and the class rule had only ever covered half the line"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2ef84142-503b-4247-b4d7-f7a41d20705d
  modified: 2026-08-21T09:00:28.611Z
---

**2026-08-21. Four asks in one message**, and the fourth is a new system:

> *"show % of opportunity atack only if i am triyng to move from the enemy (when cursor of movment
> hovers red). Otherwise don`t show"* · *"Don`t show class for beasts animals on the battlfield"* ·
> *"Morale more transparent on the batlfield"* · *"And also, i want you design mirrored battle. When
> all of your actions mirrored. You chosing to move left - and moving right, etc. Put it in the
> practie field so far. Same with hitting"*

⚠ **STATE: committed on the desk `work/mirror-battle` at `7ee21a1`, 1 ahead of main, NOT landed and
NOT deployed.** Main's working tree was dirty with another live session's prototype edits the whole
time (a `hirestage` J-stage muster wall, later a `work/practice-points` desk / #216), and
`merge.ps1` refuses a merge that would overwrite an uncommitted file. That is the correct refusal,
not a failure. See [[grimtoll-parallel-sessions]].

## ⛔ THE MIRROR: THE FOLD SITS BETWEEN THE POINTER AND THE BOARD

**`SIM.rule` is a fourth picker on the practice field (`straight` | `mirror`)** and `mirrorOn()`
asks `SIM.on` FIRST, so `simRestore` fences it exactly the way `SIM.ground` has been fenced since
#61.

⛑ **THAT ONE DECISION IS WHY IT IS FOUR FUNCTIONS AND NOT A PASS OVER THE ENGINE.** `clickHex` was
already the ONE door every board click goes through - a step, a swing, a shot, a working, both
halves of a throw - so folding its ARGUMENT answered *"same with hitting"* for free and can never
fall out of step with a rule it does not know about. And the fold is applied at `hx.onclick`
(`handHex`), never inside `clickHex`, so **AUTO and both AI brains call `clickHex` directly and play
straight: the mirror is a fact about the player, not about the game.**

⛔ **ACROSS THE ACTOR, NEVER ACROSS THE BOARD.** Reflecting in the board's centre line was the first
idea and it is unplayable - the acting body does not move, so a hex one step away lands eleven
columns off.

⛑ **IN CUBE SPACE IT IS AN X/Y SWAP AND THE ROW NEVER MOVES.** Take the delta from the actor,
exchange x and y, add it back: `x+y+z=0` survives the exchange and z IS the row. So a mirrored hex
is on its own row with its column folded about the actor's, which is a true vertical mirror in
SCREEN pixels including the half-row offset (checked against `hexCentre`: an east neighbour is +38px
and its fold -38; an up-right one +19 and its fold -19). Written in `DIR` terms it would have needed
a per-parity table, i.e. the second copy of the geometry #173 spent a whole entry deleting.

⚠ **OFF THE BOARD IS A REFUSAL THAT SPENDS NOTHING**, the same contract a blocked lane already has -
and it is the mode's one tactical consequence: in the mirror the middle of the board is where your
options are, and a body backed into a corner has half of them folded into nothing.

⚠ **READING THE BOARD IS NOT FOLDED, AND THAT IS THE DESIGN, NOT A GAP.** Odds, damage, the readout
card and the lore boxes all answer about the hex they are on; what is folded is the hand.
`paintHand` marks the LANDING hex with the same ivory ring `.lit:hover` already draws, so no click
is ever silently dead. **It is an inverted mouse, not a blindfold.** ⏳ The open question the user
was asked to rule on: whether that ring gives too much away. Hiding it is one line.

⛔ **THE FOUR ACT-CURSORS COME OFF IN THE MIRROR.** `--curStrike` over an enemy means *this click
swings at THAT body*, and in the mirror it does not - #102's wrong-unit rule with the pointer as the
unit. render() strips `cMove`/`cStrike`/`cShot`/`cCast` so one mirrored pair of boots is the only
cursor rule left that can match; out-specifying them in the stylesheet would have needed to beat
`(1,4,0)`.

## ⛑ THE ASK THAT COULD ONLY BE ANSWERED BY WIDENING IT

**"Don't show class for beasts" named a defect that did not exist and pointed straight at two that
did.** No beast anywhere on the battlefield printed a CLASS - the file already says *"classes are a
human idea"* on the plaque and *"a monster is never a profession"* on the token badge. **Both rules
are about the class and neither had ever covered the RACE or the PORTRAIT**, so:

- a Lurcher's hover readout said `🐺 PACK-BEAST · 🐀 RATKIN`, with #211's ratkin painting beside it;
- the battle plaque drew `C1_Ratkin_Rank_and_File` on every dog and every mirehare, and
  `C2_Ratkin_Chieftain` on The Bitch.

⚠ **AND THE `race` FIELD IS NOT THE BUG TO FIX.** `build()` derives race from kind and a dog falls
through to `'ratkin'`, which `ringOf` (the SWARM), the AI's weights and the barks all read - shipped
balance, and not what was asked about. **The display changed; the fact stayed.**

⛔ **CLOSED BY #217 THE NEXT DAY, AND THE "THREE READERS" ABOVE WERE FIVE.** See
[[grimtoll-217-beast-race]]. Two of the three listed here needed NOTHING (`bark()` gates on
`u.monster`, and `doctrine()` returns early for a dog before `rat` is ever applied), and two that
are not listed here are STATS: `RACESTEP` was clipping the Runt's authored stride of 6 to 5, and
`RACEDODGE` was handing every dog a silent +5. **A grep says three readers; the branch says one.**
#217's desk `work/beast-race` is STACKED on this one, so this must land first.

⛑ **`BEAST_KIND` IS `build()`'s OWN `ANIMAL` LIST, HOISTED.** It was already inside that function
deciding who gets a personality (*"a dog is a dog"*), which is the same question - one array, two
readers, the move #195 made with `CUBE_AXIS`. **Three readers since #217**, which made the race
derivation read it too. ⚠ A fen-thing is deliberately NOT on it: its `kind` IS
'ratkin' and it is a twisted one.

## ⚑ TWO HOVER MECHANISMS FOR ONE POINTER IS A DEFECT, EVEN WHEN BOTH WORK

The opportunity-% gate shipped first as `#bGrid.cMove.zoc:has(.hex.lit:hover)` - one selector, no
state, measured working. **It was then replaced by a JS pointer tracker anyway**, because the mirror
needs one (the hex the click LANDS on is not the hex the pointer is over) and *one fact, two
implementations* is the shape this file has deleted four times (`choiceNote` #150, `raceDoorPick`
#159, the mood echo #176, `applyHurt` #197). `handOn`/`paintHand` stamps `#bGrid.aiming`, the state
lives on `B`, and render() repaints it.

⚠ **AND THE `:has()` VERSION FAILED SILENTLY FIRST, FOR A REASON THAT HAD NOTHING TO DO WITH
`:has()`.** The patch closed its comment with `*/`, appended more prose, and closed it again - CSS
skipped to recover and swallowed the rule under it. **`getComputedStyle` on the chip said `none`
while the class was correctly on the grid**, which is the only reason it was caught. See
[[grimtoll-safe-file-patching]]: a patch that inserts prose next to a `*/` needs the whole comment
rewritten, not appended to.

## The other two, briefly

- **the opportunity `⚔NN%`** now shows only while the pointer is on `.lit` ground (the same hexes
  `--curWalkZoc` appears on). The red GLOW on the swinger stays: *these bodies have a hand on you* is
  true all turn; *and this one lands 41 times in a hundred* is an answer only a destination asks for.
- **the token mood face** went .66 → **.40** (grayscale .35 → .55) and the loud rungs .95 → **.78**,
  because what has to survive is the GAP between a rung that is news and one that is not. ⚑ The
  paragraph directly above it in the CSS is #164 answering this exact complaint once already, which
  is [[grimtoll-battle-screen-round-three]]'s rule arriving again: by the second report, a note that
  sounds like taste is a number that is wrong.
- ⚠ adding the fourth picker took `.pcard` to **683 against its 684px ceiling** - one pixel of
  overflow and a scrollbar on a card that never had one - so `.simpick`'s max-height went 352 → 336.
  All three lists already scroll, so nothing visible was lost.

## Gates, all in the running build

`LINT()` 0 · 0 font-size literals, 1 padding literal (`#wBar`'s documented 64px), 0 hardcoded
structural edges · nothing under the 10px floor on either screen in either mode · the clipped-box
probe **identical to a `git show HEAD:` baseline driven to the same two screens** (picker 0/0,
battle 3/3) · map counters 0/0/0 · em dash 1118 before and after · all eight `regress()` fights
`ok`, and unchanged with `SIM.rule='mirror'` set. **Driven, not read**: pointing right walked left
onto the exact fold; pointing at the left ogre put 17hp into the right one; an off-board fold moved
nothing and spent nothing; the landing mark survives a render and clears on leaving the grid.

Gate picture: `shots/215_mirror.html` in the desk (gitignored), two `grabStage` captures - the same
arrangement mirrored and straight.

Related: [[grimtoll-harness-render-stub-trap]] (found here, cost half an hour),
[[grimtoll-211-213-race-marks-and-zoc]] (what this is the second round of),
[[grimtoll-render-destroys-dom-state]] (why `B.hand` and not a class on the hex).
