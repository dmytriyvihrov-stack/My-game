# -*- coding: utf-8 -*-
# #275 - the five writes.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
D = lambda *p: os.path.join(ROOT, *p)

# ── 1. CHANGELOG build-log row ─────────────────────────────────────────────
CH_ANCHOR = """| **NEXT** | **The plan lives in [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md). Nothing in this file is next.** |"""
CH_ROW = """| 8f.299 | **#275 - THE TWO STACKING CAPS, THE DISENGAGE THAT IS NOT THERE, AND A CLOAK.** ⛔ **`DODGE_SOFT` WAS 12 AND A STARTING BODY ALREADY DODGES 14**, so the cap was biting every body in the game on the day it was rolled: it was a flat tax on the stat rather than a ceiling on stacking it, and a player who spent a level, a shield and a trait on footwork was handed 60% of the third thing they bought. **25 is above what a fresh body brings and under what a built one reaches**, which is where a soft cap belongs. The to-hit side had no cap at all, which is why the ask names both in one breath: **`hitOf` is `dodgeOf`'s shape** - one function, a collector for the hover, the cap applied LAST to the sum - and the plaque, the enemy card, the company sheet and `hitBreakdown` all read it, so the figure a player sees is the figure the roll uses. `HIT_SOFT` is 100 and it is the BODY'S rating, not the whole roll: an act's `aim` is a fact about the weapon and is added after, the same way the target and the ground are. ⚠ The raw `u.mskill` stays raw, written by a dozen `+=` lines and read by `u.hitWhy`; capping it in place would leave the hover unable to say what it took off. ⛔ **AND THREE READOUTS PROMISED A CARD MOST BODIES HAVE NOT CARRIED SINCE #224.** DISENGAGE became a PERK and the brawl's CIRCLED lesson - the FIRST teaching card in the game, on a Captain who has not got it - still said *"DISENGAGE first"*, with its own spotlight falling through to the whole action row; so did HELD GROUND on every hex in a zone of control, and so did the ⚔ chip that prices a step off. `hasDis` asks the ACT ROW and all three read it: driven, the lesson now says *"Nobody here has learned to step out of a grip yet"* and the note says **Two ways out** where it said Three. ⛔ **THE TWICE-A-TURN TALLY WAS BEING READ AS A PENALTY AND THE CAPTAIN WAS CONFIRMING IT.** `learn_twice` said *"Doing the same thing twice in one turn is always the weaker half of it"*, which is true of MOVE (a hex shorter) and **of nothing else in the game** - `u.used[k]` is a CEILING. So a player swinging twice watched a card count 1/2 then 2/2 with the damage and the odds unchanged while being told something had got worse. The lesson says what the tally is, the card's own receipt line says `· 1 OF 2 THIS TURN` beside the cost and the cooldown, and **the register's own note - which defended that lesson on exactly the claim that turned out to be false - is corrected**. ⛑ **A HOVER BOX MAY NOT SIT ON THE LESSON.** `#tutDim` is z-index 61 and `#gtTip` is 99, and the tip lives on `document.body` (`moveTip` clamps it against the window), so a HELD GROUND or PALISADE box opened a second before a card fires paints over the dimmed sheet - reported as *"HELD GROUND repeatedly covered the central battlefield while tutorial cards were also active"*. One line in `tutPaint`, which is the ONE function that puts the sheet up and writes `B.tutLock`. ⛑ **AND THE VERY FIRST SWING OF THE GAME LANDS** (`TUT_FIRST_SURE`, one word to switch off). `SURE_AFTER` already exists for the player's frustration and cannot reach the first swing because two misses have to happen first; the brawl only, one body's first blow only, decided inside `hitBreakdown` for SURE_AFTER's own reason - the card reads 100%, the roll cannot miss, AUTO knows. ⚠ **THE FIRST CUT OF THAT TEST READ `a.hits` AND `a.misses` AND A DRIVEN PROBE CAUGHT IT**: both are incremented inside personality clauses (`hitLift`, the ogre's rage), so on an ordinary Captain both stay 0 all fight and **every landing swing in the brawl would have been a guaranteed 100%**. `a.swung`, set at the top of `strike`. ⛔ **THE DISGUISE CLOAK IS A BAG ROW AND FOUR NAMED EXITS.** Uncommon = `rare` (the vocabulary fact the draught's note already records), 70 crowns, in the rare-bag find pool beside the draught and the shuriken. One action, once a fight: **nothing on the other side may aim at it at all** - which is what makes it a second field rather than a second meaning on the lizards' `veil` (*cannot aim from further than a hex*). It comes off when you swing or anything lands on you (`strike`, the one blow door), when something with an INTELLECT rung of 2 or better ends up beside you (`spotAround`, off `beginTurn` AND `walkTo`, i.e. it was already there or it has just walked up), when something walks into the ground you are standing on, or after two ROUNDS (#46's own ruling on venom: a tick clock lasts a different length of time depending on how many bodies are on the field). ⛑ **THE WALK-INTO IS THE ONE THAT NEEDED ENGINE WORK, AND IT IS TWO LINES IN `reachMap` PLUS THE BUMP IN `walkTo`.** `passable` refuses an enemy body outright, so the hex had no `dist` to keep and *"triyng to take the place where your disgies character stands"* could not happen at all; it is entered as a destination and **not expanded from**, so a route never runs PAST the cloak, only ever ends on it - and `walkTo` refuses the last step, drops the mover on the last hex it actually crossed and reveals. **Driven, all six**: unaimable at 15 hexes, aimable at 1 hex from an INT +3 body, NOT aimable at 1 hex from an INT -1 body, holds no zone of control while still crowding, off on a swing, off on the bump with the mover moved, not on top, and **one body on the hex**. ⚠ **The dodge cap was NOT priced over the road matrix, at the user's word** (*"maybe dont do it that pricacly with dodge cup through battles - it is your unit stat"*); the baseline half had been taken and is in the session record if it is ever wanted. **Gates:** `LINT()` **0** · `gt.py check` 3 scripts 0 problems · floor `[]` and clip `[]` on the sheet, the documented `#bField`/`#bTrait`/`#bLog` on the battle · sheetOverlap `[]` · map 0/0/0 · emdash 0 prose · `regress.js` 8/8 no ERR, no FATAL, no HIT GUARD. **Eye check:** `shots/275_cloak.png`. | ⏳ the dodge cap is unpriced against the road (👤 **Y1**) · 👤 **Y2** the brawl's free first swing is a taste call · ⏳ a hidden body still counts as CROWDING for the surrounded bonus |
""" + CH_ANCHOR

# ── 2. SHIPPED row ─────────────────────────────────────────────────────────
SH_ANCHOR = """|---|---|---|
| **274** |"""
SH_ROW = """|---|---|---|
| **275** | **The two stacking caps, the DISENGAGE that is not there, and a cloak.** ⛔ **`DODGE_SOFT` was 12 and a starting body already dodges 14**, so the cap taxed every body in the game instead of capping a stacked one; **25** is above a fresh body and under a built one. The to-hit side had no cap: **`hitOf` is `dodgeOf`'s shape** (one function, a collector for the hover, the cap applied last to the sum) at `HIT_SOFT` **100**, read by the plaque, the enemy card, the sheet and `hitBreakdown` · ⛔ **three readouts promised a DISENGAGE card most bodies have not carried since #224** - the brawl's own first lesson, HELD GROUND, and the ⚔ step chip - and `hasDis` asks the act row for all three · ⛔ **the twice-a-turn tally is a CEILING and `learn_twice` called it a diminishing return**, which is true of MOVE and nothing else; the card's receipt says `· 1 OF 2 THIS TURN` and the register's own defending note is corrected · ⛑ **a hover box may not sit on the lesson** (`#gtTip` 99 over `#tutDim` 61, on `document.body`), one line in `tutPaint` · ⛑ **the brawl's first swing lands** (`TUT_FIRST_SURE`); ⚠ the first cut read `a.hits`/`a.misses`, **both personality-gated**, so every landing swing would have been 100% - caught by driving it · ⛔ **the Disguise Cloak**: bag row, uncommon, 70 crowns, one action once a fight, **unaimable at any range** for two rounds, with four named exits (your swing or a blow landing · anything INT 2+ beside you · anything walking into your hex · time). The walk-into needed `reachMap` to enter the hex and not expand from it, plus the bump in `walkTo`. All six driven. ⚠ **The dodge cap was not priced over the road at the user's word.** *(2026-08-31, 8f.299)* | ⏳ the dodge cap is unpriced against the road (👤 **Y1**) · 👤 **Y2** the brawl's free first swing is a taste call · ⏳ a hidden body still counts as CROWDING for the surrounded bonus |
| **274** |"""

# ── 3. WHAT_TO_TEST section ────────────────────────────────────────────────
WT_ANCHOR = """## 🧪 THE LIZARDS FIGHT NOW  *(#274 · 2026-08-31 · build log 8f.298)*"""
WT_NEW = """## 🧪 THE TWO CAPS, THE MISSING DISENGAGE, AND A CLOAK  *(#275 · 2026-08-31 · build log 8f.299)*

**Reach the caps in three steps:** company sheet → hover TO HIT, then hover DODGE.

**What should happen.** The DODGE hover's `hard to stack past 12` row is now `past 25`, and on an
ordinary body it **does not appear at all** - which was the bug. A starting body dodges 14, so every
body in the game was being taxed by a cap meant for a stacked one. TO HIT has the same row now at
**100**, and it will not appear until you have built somebody past it. ⚠ Both figures on the sheet
may read a point or two higher than you remember; that is the tax coming off.

**The DISENGAGE that is not there.** Since #224 it is a PERK, and three places went on telling you
to spend it. Open the tap-room brawl and let two of them get a hand on the Captain: the CIRCLED card
now says *"Nobody here has learned to step out of a grip yet"*. Hover any hex inside a red edge:
HELD GROUND says **two ways out** on a body without the card and **three** on one with it.

**The twice-a-turn tally.** Swing the same card twice and hover it: the receipt line now says
`· 1 OF 2 THIS TURN` beside the cost. Nothing is reduced by repeating an attack and nothing ever
was - only a second MOVE is shorter - and the Captain's lesson used to claim otherwise.

**The brawl's first swing.** Your first attack of the tap-room fight reads **100%** and cannot miss.
One swing, one fight, one run. Whether you want it at all is **Y2** in
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md).

**Reach the cloak in three steps:** find or buy a **Disguise Cloak** (70 crowns, uncommon, bag slot)
→ equip it on somebody → in a fight, press **PULL IT OVER YOU** (1 action, once a fight).

**What should happen.** A `▒` badge under their feet, and **nothing on the other side can aim at
them at all** for two rounds. It comes off when:

- **they swing, or anything lands on them.** Attacking gives you away, and so does a spell that
  catches you in passing;
- **anything clever ends up beside them.** An INTELLECT rung of 2 or better sees the shape under the
  rags. A dog or a drunk does not;
- **anything walks into the hex they are standing on.** The enemy does not know they are there, so
  it picks that ground like any other ground, walks into them, and stops one hex short;
- **or two rounds pass**, and the log says so rather than letting it end silently.

**What would be a bug:** two bodies on one hex after a bump · an enemy shooting a hidden body from
across the map · the cloak surviving your own attack · the badge showing on a body that can be aimed
at · a hidden body taking a free swing at somebody walking past it (it holds no ground while it is
hidden, on purpose).

---

## 🧪 THE LIZARDS FIGHT NOW  *(#274 · 2026-08-31 · build log 8f.298)*"""

# ── 4. OPEN_QUESTIONS ──────────────────────────────────────────────────────
OQ_ANCHOR = """## X · From #274"""
OQ_NEW = """## Y · From #275

| | the question | ⭐ mine |
|---|---|---|
| **Y1** | **The dodge cap went 12 to 25 and it is NOT priced against the road.** You said not to (*"maybe dont do it that pricacly with dodge cup through battles - it is your unit stat"*), and the reasoning is sound: what moved is a curve every body on both sides climbs, not a statblock. But it does move both sides - a foe's dodge averages 16.5 and was being taxed too, so **every enemy in the game also got a point or two harder to hit**. The baseline half of the matrix was taken before you said stop and it is in the session record; the other half is about twenty minutes. | **leave it unpriced and play it.** If the road feels slower to kill through, this is the number |
| **Y2** | **The brawl's first swing now cannot miss.** A playthrough report said an ~82% opening miss followed by two blows from the drunk made the tutorial feel harsher than intended. `SURE_AFTER` already exists for exactly that frustration and structurally cannot reach the FIRST swing. It is `TUT_FIRST_SURE`, one word, the tap-room only, one body's first blow only. | **keep it.** It is the first thing a new player ever does and it costs one swing in a whole run |
| **Y3** | **A hidden body still counts as CROWDING the enemy it is standing next to.** It holds no zone of control (nobody takes a free swing from a body they cannot see), but `engagers` still counts it, so your line gets the `surrounded` to-hit bonus from somebody the enemy does not know is there. That reads as an ambush working and it may read as a cheat. One clause either way. | **as built.** The body IS pressing on them; they simply do not know what it is |

---

## X · From #274"""

# CHANGELOG row written on the first run of this script.
patch([(SH_ANCHOR, SH_ROW)], path=D('docs', 'SHIPPED.md'))
patch([(WT_ANCHOR, WT_NEW)], path=D('docs', 'WHAT_TO_TEST.md'))
patch([(OQ_ANCHOR, OQ_NEW)], path=D('docs', 'OPEN_QUESTIONS.md'))
