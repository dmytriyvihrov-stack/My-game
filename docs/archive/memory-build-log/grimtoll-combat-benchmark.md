---
name: grimtoll-combat-benchmark
description: "#89, 2026-08-11: Grimtoll's fight measured against Battle Brothers, Wildermyth and Wartales, plus what reviewers of all three praise and hate about combat. Holds the numbers and the three gaps left open."
metadata: 
  node_type: memory
  type: project
  originSessionId: 91e482d9-96a4-4afe-a743-3efc1a9bdf4f
  modified: 2026-08-18T12:39:39.377Z
---

**#89 THE COMBAT BENCHMARK, 2026-08-11.** Document is
`docs/COMBAT_BENCHMARK_2026-08-11.md`, spec in `docs/archive/BACKLOG_ENTRY_SPECS.md`, row in
🟡 NEXT beside [[grimtoll-game-project]]'s #13. **Read the document before re-measuring anything.**

**Why:** the user asked for a review analysis of the three neighbours *"specifically about the
battle"*, then for turns / actions / time / skills *"so we can compare longness and speed and skills
easily between that games and mint"*, then *"I feel, this is important one"*. It is
[[grimtoll-clarity-pass]]'s #88 lesson one level up: ⛔ **measure the box before you argue about the
font** became ⛔ **measure the fight before you argue about the combat.**

**The measured Grimtoll numbers** (five runs of each of the eight fights through `tools/harness.js`,
both brains at full disposition): **8.45 rounds · 71.4 unit-turns · 115.0 actions · 1.61 actions per
unit-turn · 4.6 skills per unit · 2 actions a turn** (captain 3, boss 5). Shortest battle of the
four by a wide margin, which is a strength worth defending: Battle Brothers runs ~15 rounds and
~500 actions and its loudest structural complaint is length.

**⚑ The single most useful thing it did was accidental.** #50's parking lot carried an explicit open
question, *"any read about fight LENGTH needs re-measuring - the brigand 14-round line especially"*,
written after the morale rework. This answered it: **`brigand` was 9-11 rounds before #36, 14 after
it, and reads 13.6 now, so the morale rework did NOT bring it down.** The lesson is that **a
benchmark run for a general question will close specific ones that were parked waiting for
somebody**, so grep the parking lots before deciding a measurement is new.

**⚑ PART FOUR, ADDED 2026-08-18** (the user's own GPT pass, saved verbatim in the doc): **the unit
of variety is not the race, it is the weapon.** Battle Brothers gets ten problems out of ten humans
because **its enemies run on almost the same weapon rules the player does** - a spear is spearwall,
a shield splits, a hook drags, a hammer breaks armour - so *"one more man"* can be a new tactical
object. ⛔ **Therefore Grimtoll does not need new races or ten monsters: it needs the humans, ratkin
and ogres it already has to force a different answer, VISIBLY.** Its test is a **router, not a
verdict**, the same shape as #88's measure-the-box rule: *"what was I forced to do here that I did
not do in the previous fight?"* - **same answer = MECHANICAL problem · different answers but the
same feel = PRESENTATION problem.**

⚠ **And one fact in that research was stale, which is the reusable lesson.** It assumed most battle
tokens were undrawn. **They are not: 50 painted tokens are embedded, 41 of them units, and
`paintedSpriteKey` ends on `return k&&BATTLE_ART[k]?k:null`, so nothing falls back to the procedural
silhouette** (`DIM{}` is dead code for every race). Correcting it made the conclusion SHARPER, not
weaker: it closes the "not drawn" branch and leaves the measurable question **is the art distinct as
an OBJECT at the 26x39 px a human is drawn at (`TOKEN=1.13*0.90`), not just distinct as a FILE?**
[[grimtoll-token-furniture]]'s #163 took 10% off every body for crowd navigation, so **legibility
and crowd-readability already pull against each other and the trade has never been measured.**

**Gaps left open, all MEASUREMENTS not builds** (which is why the entry does not
argue with the clarity pass's ⛔ nothing-is-added rule). ✅ **(c) was TAKEN on 2026-08-13 during
#146** and found something nobody had asked about: **before that pass the ENEMY was the
better-aiming side by three points in every fight**, which falls out of penalties only the player
pays against a flanking bonus the bigger side collects. **Four stay open: (a) (b) and part four's
(d) the forced-answer test and (e) token legibility.** In full: **(a) the mop-up tail** - no number isolates
rounds after the outcome was decided, and that is where all three neighbours bleed players; **(b) a
real stopwatch** - the minutes column is derived from `paced(240)` because ⚠ **a timed AUTO run in
the hidden preview pane measures the pane's throttle, not the game**, which is the whole reason
`tools/harness.js` exists; **(c) hit-rate distribution** - never measured, and the loudest complaint
in the loudest of the three games is that honest RNG reads as dishonest.

**Two traps written into the entry so they are not rediscovered as fresh ideas:**
- ⛔ The **2:1 enemy skill gap** (4.6 acts yours vs ~2 theirs) must NOT be read as *give enemies more
  skills*. The anti-repetition mechanic across all three games is **composition** variety, not
  per-unit skill count. **Part four above is the positive form of this and supersedes the warning.** Three enemy types demanding different formations beat one type with three
  more buttons. #47 (the spear becomes a zone) is already the right shape.
- ⛔ Grimtoll's **1.61 actions per unit-turn is the lowest of the four**, and Wildermyth's
  most-praised mechanic (the swift action, a third thing for free) is the cheapest known fix. **It
  is still an addition and the clarity pass forbids it.**

**The eight cross-game patterns** are the transferable half, and the rule for reading them is: a
complaint in one game is that game's problem, a complaint in all three is a property of the genre.
The three that bite hardest here: **length is not difficulty** (the end of a fight is the tax) ·
**honest RNG reads as dishonest** (if the number is visible, players judge the streak, not the math)
· **a dominant strategy is a death sentence** (it killed combat for reviewers of Wildermyth and
Wartales at around hour ten).
