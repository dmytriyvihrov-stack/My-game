# RabbleBound - the full entry specs (reference)

> **This is the SPEC SHELF, not the work list.** The work list is
> [`00_PLAN_AND_BACKLOG.md`](../00_PLAN_AND_BACKLOG.md), which holds one line per entry and the
> current focus. When a session picks an entry up, it comes here for the full text.
>
> Split out on **2026-08-10**, when the backlog was cut down after the playtest feedback
> (*"lack of clarity and too many options/systems from the start"*). Nothing was edited on the way
> across: every entry below is exactly as it was written. The pre-split file is
> [`2026-08-10_BACKLOG_before_cleanup.md`](2026-08-10_BACKLOG_before_cleanup.md).
>
> ⛔ **Nothing here gets built straight from the entry.** Rules first, then a picture, then code,
> then a `WHAT_TO_TEST.md` section. See the gate in [`README.md`](../README.md).

---

## 2 — Personalities that command the AI

> ⚔ **THE BATTLE BOARD** — also 🎒 the sheet (the personality is read there)
> **SYSTEMS** `TRAITS` · `doctrine()` · `tr(u,key)` · `aip()` · the movement scorer in **both**
> brains · `toggleAuto`  **RELATED** #25 (evolves these same fields) · #37 ⇠ sits on this ·
> #21 · #40 (personality picks whose line) · #32 (same scorer, morale side)

**The idea (user).** More personalities, and they should give the battle AI **extra orders and
priorities**. Their example: *"you can't put AUTO on a ratkin who charges ahead — but you can once
the fight is already joined."*

**Why it earns a place.** This is the missing half of the personality system. Personalities
currently change *numbers and rules* (Ambition's rage, Kind's aura, Does-not-run). They do not
change **how the body chooses**, which is where a personality is most visible — and it makes AUTO
a tool with a shape instead of a button that is either safe or not.

**The existing hooks — use these, do not invent new ones.**
- `doctrine(u)` already returns behaviour weights by race/class (`pack`, `arcW`, `lineSeek`,
  `herd`, `noChase`, `band`, `loner`, `fearless`).
- `aip(u)` gates each behaviour for A/B testing.
- `tr(u,key)` reads a personality field **through the carrier's race** — so every new AI field is
  race-aware for free.
- `autoStep` (player AUTO) and `aiTurn` (foes + allied NPCs) are **two separate brains**. Anything
  added here must be added to BOTH or AUTO stays stupid. This has bitten the project twice.

**What to add.** Personality fields the movement scorer reads:
- `eager` — heavy negative weight on cohesion, positive on closing. Charges.
- `wary` — the inverse: will not be the first into contact.
- `hunter` — retargets toward the softest enemy even at a positional cost.
- `stubborn` (exists as a name) — will not give ground; sets `fellBack` to its cap immediately.
- `shieldmate` — weights hexes adjacent to the most-wounded ally.
- `opportunist` — weights back arcs far above everything else.

**The AUTO rule the user described.** AUTO should refuse to move an `eager` unit forward while
`B.round===1` or while nobody is engaged — with a log line saying why (*"Skree will not be told to
wait, so AUTO is not going to try"*). Once contact is made, the same unit is fine on AUTO. That
single behaviour is the whole feature: **AUTO becomes a judgement about who you can trust with
which part of a fight.**

**Touch:** `TRAITS` (new fields + 4–6 new personalities, gated by `cls`/`race` as the others are),
`doctrine`, the movement scorer in **both** `aiTurn` and `autoStep`, and `toggleAuto` for the
refusal line.

**Verify:** an `eager` unit measurably closes further than a `wary` one from the same start; AUTO
declines to advance an eager unit on round 1 and does advance it on round 3; the seven-fight
regression, plus a check that fight lengths have not shifted more than a round or two.

---

## 3 — The clash recruit is already changed

> 🗺 **THE ROAD** (the clash, then a camp card) — also 🎒 the condition on their sheet ·
> ⚔ Blood on the Road
> **SYSTEMS** `clashAfter` · `CAMPS` + `needs:` · `EVENTS` · the condition→mutation clock
> **RELATED** #16 · #17 (it is the shop window for both) · #24 (the reveal wants a fact, not a
> boolean) · #26 (same claim → cost → return shape) · #22

**The idea (user).** Mutate one of the characters who joins at the **first big event** (Blood on
the Road). When the Captain starts asking about it, it turns out **that was what the fight was
about** — something had happened out there.

**Why it earns a place.** This is the best single idea in this file. It fixes three things at once:

1. **Mutations currently depend on the Fen-Mother or a late Bloom event**, so a whole run can end
   without the player learning the system exists. This puts one in front of them in the first hour.
2. **Blood on the Road has no explanation.** It is currently "a ratkin party and an ogre line found
   each other over what is probably a dead deer". Giving it a *cause* the player uncovers later
   turns the tutorial fight into the opening of a thread.
3. It demonstrates the **condition → decision → mutation** pipeline on somebody the player did not
   choose, which is exactly the RimWorld beat the whole design is aiming at.

**How it should work.**
- Skree / Nib / Bruht (whoever joins) arrives carrying a **condition**, not a finished mutation —
  so the player still gets the decision. `Colour Beneath the Nail` fits best: visible, cheap, and
  its resolution (`Blooming Hand`) collides with the two-handed weapon rule.
- They do not volunteer why. A **later camp incident** (use the `needs:` chain machinery in
  `CAMPS` — it already gates a card on a specific earlier ruling) opens the answer: the fight was
  over a thing found in the water / under the Bloom, both sides wanted it, and this one touched it.
- The reveal should offer a **choice with no clean option** — per the pillar. Something like: go
  back for it (days, and it is guarded), tell the other side's kin where it is (they stop hunting
  you, you get nothing), or say nothing and let them keep believing it was a deer.
- If the player cures the condition at Coldharrow before the reveal fires, the reveal should still
  happen — *"it stopped, and they still will not talk about what started it"*. The story must not
  be gated on the player choosing not to help somebody.

**Touch:** `clashAfter` (set `p.cond` on the recruit), a new `CAMPS` entry with `needs:` keyed on
the clash side, `EVENTS` if the reveal wants a full card.

**Verify:** the recruit arrives with the condition and it shows on their sheet; the reveal fires
2+ days later; curing early does not break it; the whole chain runs without the Fen-Mother being
fought at all.

---

## 4 — Body parts you can lose

> 🎒 **THE COMPANY** (the paper doll) — also ⚔ the rules · 📜 `injure()` in the aftermath
> **SYSTEMS** `PARTS` (new) · `SCARS` · `BODYPART` · `drawDoll` · `unitFrom` · `gearLine`/`handsFree`
> **RELATED** **#17 — build the painter API ONCE, both use it** · #35 ⇢ waits on that API ·
> #16 · #34 (a Maiming is this one notch heavier) · #46 (same size/limb vocabulary)

**The idea (user).** More body parts — at minimum eyes and ears — that characters can **lose**,
with the scar system reflecting it. *(Partially there already.)*

**What exists.** `BODYPART` maps a scar's name to one of six regions by regex (head / body / armR /
armL / legL / legR) and `drawDoll` marks it there. `SCARS` are stat modifiers with prose. The paper
doll is drawn from those two facts. So the *display* half is done; the *anatomy* half is not.

**What to build.**
- A **parts register**: `PARTS = {eyeL, eyeR, earL, earR, handL, handR, legL, legR, ...}` each with
  a name, the doll coordinates to mark, and what losing it costs.
- Scars gain an explicit `part:` instead of being matched by regex — the regex stays as the
  fallback for old content.
- **Losing** a part is a distinct, rarer outcome from scarring it: a scar is *damaged*, a loss is
  *gone*. Losing the second of a pair should be catastrophic and the game should know it (two eyes
  = blind; the doll shows it; they cannot be a shooter any more).
- **Cross-links that already exist and should be honoured:**
  - a lost hand should collide with `hands:2` exactly as the Blooming Hand does (drop the weapon
    to the stash, say so);
  - a lost eye should hurt ranged more than melee;
  - lost ears should interact with the Fen-Mother's scream and anything else that checks nerve at
    range — *she cannot hear it* is a real and darkly funny upside;
  - the **Medicine Chest** removes scars; it must never regrow a part.
- The doll should draw a missing part as an **outline with a cross**, not simply absent — absence
  reads as a rendering bug.

**The tone rule to keep.** Losing a part is not a death sentence and not a joke. It is a person who
now does one thing worse and occasionally one thing better, and who is still on the payroll. That
is the same rule as scars, one notch heavier.

**Touch:** new `PARTS` register near `SCARS`, `injure()`, `drawDoll`, `BODYPART` (fallback only),
`unitFrom` (part-derived penalties), `gearLine`/`handsFree` for the hand case, `killLine`-adjacent
sheet display.

**Verify:** a lost hand drops a two-handed weapon into the stash; a second lost eye applies the
blind case and the doll shows both; the Medicine Chest cannot restore a part; scars authored with
no `part:` still land in the right region via the old regex.

---

## 12 — Painted faces, pack 03

> 🎒 **THE COMPANY** (the sheet) — also ⚔ the battle panel · 📜 the who-card on promotion
> **SYSTEMS** `PORTRAIT` · `RACEPORTRAIT` · a stable per-person hash pick · `art/build_assets.ps1`
> → `art/inject.ps1`  **RELATED** #40 (a reaction needs a face worth looking at) · #51 built
> (`faceURI` already falls back to a procedural bust — do not add a second fallback) · #17 · #39

**The idea.** The starting four and the recruit pool still get procedural silhouette busts —
`PORTRAIT`/`RACEPORTRAIT` fall through for almost everyone. The painted pipeline exists and has
been through two packs (`art/build_assets.ps1` → `art/inject.ps1`, `KEY_Name.png` convention).

**Why.** The whole design says *characters are people*; the who-card on promotion and the battle
panel now both show the face, and for most of the company that face is a placeholder. Faces are
the single highest-leverage art spend left in the slice.

**How.** This is mostly the USER'S generator work — prepare a brief per the existing art-pack
conventions *(the pipeline is `art/build_assets.ps1` → `art/inject.ps1`, files named
`KEY_Name.png`, Ash & Iron palette from the style bible — the old `07_WORLD_MAP_ART_BRIEF.md` was
deleted on 2026-07-31 because its map geography predated the rebuild)*:
P-keys for the fixed cast (Captain variants ×3, Vesna, Marrow, Ilka, Skree, Nib,
Bruht, Gell, Pell, Wynn), plus 6 generic per race for the recruit pool, bust crop, Ash & Iron
palette, painted not pixel. Wire `PORTRAIT` for named people and extend `RACEPORTRAIT` to a small
pool with a stable per-person pick (hash the id, so a face never changes between screens).

**Verify:** every roster face resolves to a painting; the same person gets the same face on the
sheet, the who-card and the battle panel; the file-size cost of the pack stays under ~300 KB.

---

## 13 — The balance harness earns its keep

> ⚙ **NO SCREEN** (a tool) — it measures ⚔ the battle board and 🎒 the compositions that fight there
> **SYSTEMS** `window.ARENA` · `tools/harness.js` (`regress`, `runFight`, `stage`) · the eight fights
> **RELATED** **#50 ⇠ this is its entry condition** · #27 #29 #30 (all parked *waiting to be
> measured*) · #49 (the other instrument: one says *what*, the other says *why*)

**The idea.** `window.ARENA` exists (AI-vs-AI across scripted compositions) and retuned the Snare
once — then sat idle while race speeds, cooldowns, forced movement, morale rules and board size all
changed around it.

**Why.** Every combat change this session ended with the same hand-run seven-fight regression that
checks *completion*, not *balance*. The arena checks balance — win rates by composition and party
size — and it is already written.

**How.** Refresh its compositions for the current classes (halberd spearwoman, dirk archer, the
one-word ogre), add the camp and the 13-row board, and give it one command that prints a table:
fight × party-size (4/6/8) × win rate over N runs. Store the table in the production plan after
each combat-touching session — drift becomes visible instead of anecdotal.

**Verify:** the matrix runs headless without touching the visible game; results are stable enough
across two runs of N=20 to be readable; at least one number matches intuition (the snare should be
hard at 4, comfortable at 6+).

---

## 89 - The combat benchmark, and the three things it did not measure

> ⚙ **NO SCREEN** (a tool and a document) - it measures ⚔ the battle board
> **SYSTEMS** `tools/harness.js` (`runFight`, `measure`) · `paced()` / `PACE` · the eight fights ·
> `u.acts` · `actionsMax` · `moveBudget`
> **DOCUMENT** [`COMBAT_BENCHMARK_2026-08-11.md`](../COMBAT_BENCHMARK_2026-08-11.md) - **already
> written, this entry is the remainder**
> **RELATED** #13 (the other instrument: that one measures *win rates*, this one measures *shape*) ·
> #50 ⇠ feeds it · #47 (reading 5 argues for it) · #86 (reading 6 hands it one number) · #84 (its
> dodge regression is the nearest thing to the hit-rate gap below)
> **STATE** ✅ **part one and part two are done and saved.** ⛔ Part three's three gaps are open.

**Where it came from (user, 2026-08-11).** Two asks in a row, and the second is the one that made it
a document:

> *"Can you make analysys of battle system rewiws of: wildermyth, wartales, battle brothers. What is
> people like and dislike, specifically about the battle? Gather list of them"*

> *"Add also avarage number of turns / action of units / time for battle / skills in avarage per
> unit - for these games. So we can compare longness and speed and skills easily between that games
> and mint."*

And then, on filing it: *"Lets save this branch and this thing in backlog. I feel, this is important
one."*

**Why it earns a number.** It is #88's lesson applied one level up. ⛔ **Measure the box before you
argue about the font** became ⛔ **measure the fight before you argue about the combat.** RabbleBound
now has a row in a table beside its three nearest neighbours, so the next "is combat too long / too
thin / too samey" argument starts from **8.45 rounds, 71.4 unit-turns, 115 actions, 1.61 actions per
unit-turn, 4.6 skills per unit** instead of from somebody's feeling.

**What is already done.** The document holds three things, none of which needs redoing:

1. **What players like and dislike about all three neighbours**, per game, and **eight patterns that
   repeat across all three.** The patterns are the transferable part. A complaint in one game is
   that game's problem; a complaint in all three is a property of the genre.
2. **The comparison table**, measured for RabbleBound and community-sourced for the other three, plus
   the per-fight breakdown of all eight canonical fights over five runs each.
3. **Six readings**, of which the two that matter are `brigand` (2.4x the opener at an even 6 v 6,
   which is the exact shape of Wartales' *"longer, not harder"*) and the **2:1 enemy skill gap**
   (4.6 acts on your units against about 2 on theirs).

⚑ **And it closed an open question without setting out to.** #50's parking lot below carries the
line *"any read below that was about fight LENGTH needs re-measuring before it is trusted - the
brigand 14-round line especially"*, written after the morale rework. **This is that re-measure:
`brigand` was 9-11 rounds before #36, 14 after it, and it is 13.6 now.** The morale rework did not
bring it back down. The parking lot's instruction not to retune the line-of-fire penalties still
stands on its own terms: it waits on #46 (shipped) and **#47 (not shipped)**.

**The remainder.** *(a to c filed 2026-08-11. **c was TAKEN on 2026-08-13 during #146** and its
result is in the row in [`00_PLAN_AND_BACKLOG.md`](../00_PLAN_AND_BACKLOG.md), including the thing
nobody had asked about: **before that pass the enemy was the better-aiming side by three points**.
d and e were added 2026-08-18 by part four.)* **Four stay open: a, b, d, e.** ⛔ **All four are
measurements, not builds.** None of them adds a system, which is why this can sit in 🟡 NEXT
without arguing with the clarity pass.

| | what is missing | why it is the gap | done when |
|---|---|---|---|
| **a** | **The mop-up tail.** No number above isolates *rounds after the outcome was decided* | Patterns 4 and 5 both point at the **end** of a fight, and it is where all three neighbours bleed players. Battle Brothers never closed this wound and it is its second-loudest complaint | `measure()` reports, per fight, the round at which the loser's outcome became inevitable and how many rounds ran after it. **Start with `brigand`** |
| **b** | **A real stopwatch.** The minutes column is derived from `paced(240)`, not timed | ⚠ A timed AUTO run in the preview pane measures **the pane's throttle**, not the game: `setTimeout` is floored at ~1s there and `rAF` never fires, which is why `tools/harness.js` exists at all. The derivation is written out in the document so it can be argued with, but it is arithmetic | one human, a visible window, a stopwatch, three of the eight fights. Twenty minutes of work, worth more than any refinement of the formula |
| **c** ✅ | **Hit rates were not measured at all.** ✅ **TAKEN 2026-08-13 during #146** | ⚑ **The loudest single complaint in the loudest of the three games is that honest RNG reads as dishonest** (pattern 3), and RabbleBound's own hit numbers are absent from this document. #84's regression counted 51 dodges to 169 misses, which is the nearest existing data and was gathered for a different question | a distribution, not an average: the streak is what players judge, so what matters is how often a 70% shot misses three times running |
| **d** | **The forced-answer test, per fight.** *"What was I forced to do here that I did not do in the previous fight?"* | ⚑ **Added by part four, and it is a ROUTER not a verdict** - the same shape as #88's ⛔ measure the box before you argue about the font. **Same answer across two fights = the problem is MECHANICAL** (the fights are not asking different questions). **Different answers but the fights still feel alike = the problem is PRESENTATION** (art, animation, sound, how legible an act is). It decides which argument you are allowed to have next | a written answer for all eight fights. ⛔ **It needs a human, not the harness** |
| **e** | **Token legibility at the size actually drawn** | ⚠ Part four's research assumed most battle tokens were undrawn. **That is out of date and the check disproved it**: 50 painted tokens are embedded, 41 of them units, and `paintedSpriteKey` ends on `return k&&BATTLE_ART[k]?k:null` so nothing falls back to the procedural silhouette. **So the sharper question is the one nobody has asked: the art is distinct as a FILE, is it distinct as an OBJECT?** `TOKEN=1.13*0.90` draws a human at about **26x39 px** on a 37x42 hex, and #163 took 10% off every body for crowd navigation - **legibility and crowd-readability are already pulling against each other and the trade has never been measured** | the distance test from [`ui-scales.md`](../../.claude/rules/ui-scales.md) run on a token instead of on type: a foe spearman beside a foe swordsman beside a foe cutter, at 26x39, at the three camera stops |

**⚠ The trap in reading 5.** The 2:1 enemy skill gap must **not** be read as *give enemies more
skills*. Pattern 1 says the anti-repetition mechanic is **composition** variety, not per-unit skill
count: three enemy types that each demand a different formation beat one enemy type with three more
buttons. #47 (the spear becomes a zone) is already the right shape - a rework of what a lane means,
not an addition.

⚑ **PART FOUR ANSWERED THIS ONE, and its answer is the best thing in the document.** *"In Battle
Brothers the unit of variety is not the race, it is the combination of weapon, equipment, formation
and behaviour."* Ten humans there pose ten different problems because **the enemies run on almost
the same weapon rules the player does**: a spear is not a damage number, it is spearwall; a shield
can be split; a hook drags a man out; a hammer breaks armour. **That is what lets "one more man" be
a new tactical object.** ⛔ **So RabbleBound does not need new races or ten new monsters. It needs the
humans, ratkin and ogres it already has to force the player to change their answer, visibly, without
reading the panel.** On paper the eight fights already do this by design (`pack` gathers you up,
`slingline` makes you advance under fire, `steading` makes you kite, `mother` breaks your formation,
`armour` punishes surrounding, `snare` mixes all of it). **The open question is whether the build
sells the difference**, and item **d** above is the test that decides it.

**⚠ The trap in reading 3.** RabbleBound's 1.61 actions per unit-turn is the lowest of the four, and
Wildermyth's most-praised mechanic (**the swift action, a third thing for free**) is the cheapest
known fix, costing only a cost change on acts that already exist. ⛔ **It is still an addition and
the clarity pass forbids additions.** Written down here so it is not rediscovered as a new idea.

**Verify:** all three measurements land in
[`COMBAT_BENCHMARK_2026-08-11.md`](../COMBAT_BENCHMARK_2026-08-11.md) under part three, replacing
the "what this does not cover" section item by item; the derived minutes column is replaced with a
timed one and marked as measured; and the mop-up number for `brigand` is compared against `clash`.

---

## 32 — Routing needs help to come back from (the rally rule)

> ⚔ **THE BATTLE BOARD** — every fight that has routing in it, which is all of them
> **SYSTEMS** the nerve ladder · the quiet-turn recovery (+14) · `noRout` · rout-step and `fled` ·
> **both** AI brains
> **RELATED** **#38 built — copy its shape.** It put a battle rule on this exact ladder (`noRout`,
> set mid-fight) and **both brains plus AUTO inherited it without a scorer being touched** ·
> #2 (writes the same scorer, on the movement side) · #31 built · #50

> ### ⚑ THIS NUMBER USED TO BE A DEFECT, AND THE DEFECT IS CLOSED
> #32 was *"the Fen-Mother's never-ending state"* — roughly one boss fight in forty never resolved,
> once running 835 rounds. **It is closed and the mechanism is gone**: she goes **DESPERATE** rather
> than breaking (the user's own ruling — she is over a child), every fight gets hungry from round 11
> (**#31**, built with it), and the orbiting cub became `passive`. Measured 21–30 rounds with a
> 1-in-40 tail → **12–14 with a max of 25, zero stalls in 24 games.** Full history and numbers in
> [`CHANGELOG.md`](CHANGELOG.md) and [`SHIPPED.md`](SHIPPED.md).
>
> **What is left is the rule the investigation *found*, not the fix it needed.** The oscillation was
> never fixed and did not need to be — a body crossing the rout line repeatedly is now just a thing
> that happens in a fight that ends. **This entry is no longer load-bearing for any bug**, and it is
> here on its own merits.

**The rule.** A routed body's quiet-turn nerve recovery may lift its nerve, but **it may not
re-cross the rout threshold by itself.** Coming back into a fight needs a **rally source**: the
Captain alive within 3 hexes, or a steady ally adjacent.

**Why it is true and not merely tidy.** Nobody stops running because they had a quiet moment. They
stop because somebody catches them. It also gives the Captain's *position* a job for the first time,
and it makes *keep somebody steady near the end of the line* a real reason to shape a formation.

**What it costs the player, deliberately.** A lone routed survivor stays routed, and the existing
rout-step walks them off the field within a round or two — resolving through **`fled`**, a state the
game already understands. **No new outcome, and nothing in `checkEnd`.**

**Touch:** the morale-recovery site — *one condition* — and nothing else. `noRout`'s precedent is
the whole argument: a rule read at the one ladder site reaches both brains and AUTO for free.
**⚠ Do not put this in a movement scorer.**

**Verify:** a routed unit alone at the board edge never re-enters the fight and leaves within ~2
rounds; the same unit with the Captain three hexes away *does* re-enter; a rallied unit cannot
immediately re-rout and oscillate through the new door; all eight fights still inside the round band
— **the rule touches every fight with routing in it, so a length shift is the thing to watch**, and
a fight getting *shorter* is the expected direction; `LINT()` clean.
---

## 16 — The rest of the mutations

> 🎒 **THE COMPANY** (the sheet and the doll) — also 🗺 the origin events · ⚔ **each needs a real
> battle rule, never a stat**
> **SYSTEMS** `MUTS` · `CONDS` + the clock · the `e1`/`e2` road slots · `CAMPS` · the bone-setter
> **RELATED** #17 ⇠ this is what #17 draws · #3 (seeds the first one in the first hour) · #4 (same
> limb vocabulary) · #35 · #50 (every new body rule is a balance input)

**The idea (user).** More mutations. [08_MUTATIONS.md](08_MUTATIONS.md) has **16 authored and 2
built** (Gills of the Fen, Blooming Hand) plus 15 conditions with 2 built.

**Why now.** Two chains proved the pipeline works — condition → clock → decision → mutation or
scar, with an origin you can point at. It was parked as "content without a place to put it"; the
place now exists: the road has more event slots (`e1`/`e2`), the second Muster Field, the shrine,
and the camp incidents chain. And per **#3**, one mutation is about to be seeded in the first hour.

**How.** Take **three or four**, not all fourteen — each needs a real battle rule, not a stat:
- **The Talking Wound** — warns before an enemy's heavy action; sometimes speaks at the wrong
  moment and gives your position away. The best flavour in the file.
- **Bone Lantern** — reveals; cannot hide; certain things prioritise them.
- **Long Fingers** — swap gear without spending an action; reach 2 with knives; gloves do not fit
  and nobody trusts them near the baggage.
- **The Backward Knee** — leap over an occupied hex, strong disengage, slower forward. Pairs with
  the new forced-movement layer.

Each needs: an origin event in the existing pool, a condition that precedes it, a resolution that
can *also* be an ordinary scar, and a road consequence. Follow the two built chains exactly.

**Rule to keep:** frequency. 6–10 origins exist, a normal run should still meet **1–2**, and most
runs end with none. One carrier at a time is enforced already — do not relax it.

**Verify:** each chain runs end-to-end from its origin event; the battle rule fires; the sheet and
doll show it; the bone-setter can still cure the condition; a run with no origins triggered is
unaffected.

---

## 17 — Mutations you can see on the body

> 🎒 **THE COMPANY** (the paper doll) — also ⚔ the battle token
> **SYSTEMS** `MUTS[k].draw` (new) · `drawDoll` · `sprite()` + its cache key
> **RELATED** **#4 — one painter API, opposite directions**: a lost part is outline-plus-cross, a
> mutated part is *redrawn* · #16 (supplies what there is to draw) · #35 ⇢ waits on the API · #12

**The idea (user).** *"Mutations changing the look of the limbs."*

**Why it earns a place.** The mutation system's own rule says **a mutation must be visible** — and
right now the paper doll marks a mutation as a *teal glow on a region*, which is the same mark for
gills as for a hand made of flowering tendrils. The doll is the one place the change is supposed to
be legible at a glance, and it is currently a highlight rather than a shape.

**How.**
- `MUTS[k].draw(g,P,part)` — an optional painter per mutation, called by `drawDoll` after the base
  body, given the canvas context and the hit-box map it already computes. The base outline stays;
  the mutated part is **redrawn**, not decorated.
- **Blooming Hand** — the forearm ends in three splayed tendrils with a saturated magenta centre,
  and it is visibly *longer* than the other arm (it reaches two hexes; the doll should say so).
- **Gills of the Fen** — three teal slits at the neck, drawn on the head/body join, not a glow
  around the head.
- Whatever lands from **#16**: Long Fingers = an elongated hand; Backward Knee = the leg drawn
  bending the wrong way (this one is nearly free and extremely legible); Bone Lantern = a cold
  light source *inside* the ribs, lighting the torso outline from within.
- **Pairs with #4** (losable parts): a lost part draws as outline-plus-cross, a mutated part draws
  as a different shape. Same hook, opposite direction — build the painter API once and both use it.
- The battle **token** should follow where it is cheap: the gill strokes already exist as a sprite
  variant, so the Blooming Hand wants the same treatment (one magenta arm).

**Touch:** `MUTS` (add `draw`), `drawDoll` (call it), `sprite()` (an `opt` flag per visible
mutation, cache key extended as `gills` already is).

**Verify:** each built mutation renders a distinct silhouette on the doll; the doll still reads at
88×128; the sprite cache does not collide between a gilled and a bloom-handed version of the same
body; a character with both a scar and a mutation on the same limb shows both.

---

> ## ⚑ SIGNPOST — the entries pause here and resume at [#19](#19--desperation-contracts-at-the-muster-their-i02-and-the-strongest-idea-in-the-packet)
>
> The next two sections are the **outside review's harvest**, kept for the reasoning: the
> architecture rules it proposed, then the disposition of everything in its feature and idea
> indexes. **Then the numbered entries continue** — #19 onward, which are simply the ones that
> arrived from that review. They are ordinary entries and are built the ordinary way.
>
> *This is the file's one structural oddity and it is left alone on purpose: moving sixty lines of
> reasoning to tidy a table of contents is churn, and the reasoning is why the entries are worded
> the way they are.*

## The architecture rules worth keeping

*From the packet's system-relationship section. These are not features — they are the shape
decisions that stop the codebase becoming unworkable, and several already describe how this build
behaves. Keep them as the answer to "where should this live?"*

**One fact system, several consumers.** A chronicle, a relationship callback, quest eligibility,
race-specific presentation and the end-of-run summary are all *readers of the same facts*. **Do not
create a separate history store per consumer.** (This is backlog #24, and it is why #24 gates #22,
#23, #25 and #26.)

**One scenario contract, several sources.** A campaign event, a quest battle and any future test
harness must produce the *same* battle description → the same state → the same outcome.
**Generated battles and campaign battles must never diverge**, or balance data measures a game
nobody plays.

**One action system, several decision makers.** Manual play, player AUTO, enemy AI and allied AI all
choose from the *same legal commands*. **A decision maker never mutates a unit's position, health or
turn ownership outside the command lifecycle.** *(We violate this in places — the AI writes
positions directly in a few branches. Worth tidying when one of them next misbehaves.)*

**Character identity composes; it does not inherit.**
> Race body + Class job + Trait exception + Gear + Scars + History = Person
>
> *Race is not a class. Class is not a species destiny. The trait makes an unusual combination
> legible. The history makes it worth keeping.*

**Location, faction and encounter are separate owners.** Terrain and spawn topology belong to the
place; preferred tactical behaviour belongs to the faction; authored exceptions and objectives
belong to the encounter. Mixing them is why balance numbers stop meaning anything.

**AUTO never makes an irreversible decision.** No quest, sacrifice, surrender, retreat or resource
choice. AUTO plays the fight; it does not play the run.

### And the line that should be on the store page

> **Every body keeps the receipt. Every relationship remembers who paid.**
> **Every Rabble is different.**

*(Also from the packet: `Rabblebound` as a title candidate, and — usefully — the ruling that it is a
**positioning** idea, not an economy rewrite. The company stays legally a mercenary outfit that
everyone treats as rabble.)*

> **✅ The identity half was ruled on by the user, 2026-08-01:** *"heroes not merceneries, they
> just start with a contract. But rather forced together random crew."* Canon and prose now follow
> [`03_WORLD_LORE.md`](03_WORLD_LORE.md) §7: the crew are strangers with one contract, the island
> supplies the word "mercenary", and wages and contracts stay as built. **The title question
> (RabbleBound vs Rabblebound) is still open** and still the user's.

### The concept filter

The packet's accept/reject test, which is a sharper tool than "is it cool":

**Accept** when it strengthens at least one of: named characters accumulate *specific* history ·
tactical choices reveal race, class, trait or relationship · consequences return later through
*mechanics*, not a morality score · the player can read *why* a system produced its result · it can
be tested without destabilising unrelated systems.

**Reject or park** when it: adds a second source of truth · adds a control language with no clear
job · hides irreversible choices inside AUTO · replaces authored character moments with generic
generation · needs several unstable foundations at once · is spectacle with no reusable encounter
contract behind it.

## Harvested from the Codex packet

*The `CODEX_TEMP_*` files were an outside review. Everything worth keeping from them is below or
already built — **the files themselves were deleted on 2026-07-31.** Their P0 defect list is closed (see the table
above); this is the disposition of their feature and idea indexes.*

> **The two tables in this section are a disposition record — build nothing from them.** Everything
> that survived the review is a numbered entry, and the numbered entries resume immediately after
> them.

### Already built here — do not re-open

| Their ID | What it proposed | Where it lives now |
|---|---|---|
| I01 | payroll becomes character drama | **backlog #5, built** — per-person grievance, battlefield bite, somebody walks |
| F34 | provision attrition | **built differently and better** — the *wounded* eat, so the sink lands when you are worst off |
| F35 | race-specific kill presentation | **built** — the row of heads, one glyph per race |
| F07 | personal chronicle | **built** — road history + shared facts on the sheet, collapsed |
| F15 | attachment facts, not affinity bars | **built** — `bonds`, one fact per pair; the "reject a universal affinity bar" call matches ours |
| B01–B06 | the defect list | **all closed** |

### Accepted — added to the numbered backlog

## 19 — Desperation contracts at the Muster *(their I02, and the strongest idea in the packet)*

> 🗺 **THE ROAD** (the Muster Field) — also 📜 the loot order and the run summary · 🎒 the contract
> on their sheet · ⚔ *one fight only*
> **SYSTEMS** candidate roll · `finishRecruit` · `dismiss()` · the loot screen · the summary crowns
> line  **RELATED** **#24 ⇢ waits on it** (the sibling promise is a `promise_made` fact) · #5 built
> (unpaid wages make a broke company *more* likely, not less) · #23 · #22 · #26

A broke company can now reach both Muster Fields with every candidate greyed out — **and unpaid
wages made that more likely, not less.** One candidate per run may offer a non-cash contract:
*a share of the final purse* · *the equipment is mine* (see the ⚠ below) · *get my sibling
out* (creates a future obligation) · *one fight only*. **It is not a free recruit — it converts an
impossible present cost into a visible future one**, which is the pillar in a hiring screen. One
offer per run, and its expected cost should exceed the normal price.

**Build.** The offer appears only when it means something: at candidate roll, if
`G.run.crowns < the cheapest candidate's price`, exactly one candidate gets `p.contract={kind}` and
a **DESPERATION TERMS** ribbon on their card, price shown as `— · terms instead`. Each kind is one
hook into machinery that already exists: **purse share** deducts 10% at the run-summary crowns line
with its own receipt row · **the equipment is mine** — see the ⚠ below · **get my sibling out**
writes a `promise_made` fact (#24) that a road event later
calls due · **one fight only** auto-dismisses after the next battle through the normal `dismiss()`
path, with a farewell line instead of a grievance. The contract text lives on their sheet — a
person who is owed something should say so when you look at them.

> ### ⚠ *"The equipment is mine"* HAS NO PICKER TO POINT AT ANY MORE — re-expressed 2026-08-01
>
> The term was written as *they take the first loot pick, before you*. **[#55](CHANGELOG.md) removed
> the loot pick** — the haul now arrives automatically and the after-battle screen reports it.
>
> **Re-expressed as a share of the haul, and it is the better version anyway.** *"The equipment is
> mine"* now means: **whatever gear comes off a field goes to them first**, and it goes to their
> hands, not the stash — so a `gear`/`gear2` haul is silently theirs for as long as they are on the
> roster, and you find out what you gave away only when you go looking for that spear. Cash and
> salvage are untouched. It keeps the shape the term was written for (**you paid, and you feel it
> later, on a specific object**) without needing a screen that no longer exists — and it is *more*
> on-pillar than the original, because the cost lands on a named person's kit rather than on a menu
> position. **If they are dismissed or die, the gear stays theirs and leaves with them.**
>
> **The hook is `takeLoot()`**, which is now the one place a haul is applied — the same
> single-door shape as `pay()`. Do not add a second path.

**Verify.** A broke company always sees exactly one offer, a solvent one never does; each kind's
future cost actually fires (summary row, the gear going to their hands rather than the stash, road
event, departure); dismissing them early does not leave an orphaned obligation; LINT knows the
contract ids.

## 21 — What they did without you *(their I03)*

> 📜 **AFTER THE BATTLE** — also ⚔ AUTO is what it reports on
> **SYSTEMS** `afterBattle` · `autoStep` · authored templates + strict thresholds
> **RELATED** #2 (better after it — a personality is what makes a moment notable) · #46 (three new
> verbs, three new notable moments) · #42 (the same evidence, live on the board instead) · #37

AUTO hides its own best moments. Two or three authored lines on the after-battle card when something
genuinely notable happened — a back-arc kill, a rally from Breaking, an ogre throw, a shooter saved
by its screen. **Strict thresholds and authored templates; if nothing exceptional happened, show
nothing.** This is also how a player discovers advanced tactics without the AI performing them
constantly.

## 22 — The road reads the company *(their I11)*

> 🗺 **THE ROAD** (event and camp cards) — also 🎒 the roster's *shape* is the whole input
> **SYSTEMS** `EVENTS` · `CAMPS` · `castRace`/`castNeed`/`castKeep` · roster composition
> **RELATED** **#24 ⇢ waits on it** · **#44 built — its `cast*` gates are this entry's machinery,
> built early: they gate a whole CARD on who is at the fire** · #3 · #39 · #23

Floating events should sometimes vary by the *shape* of the roster, not just name a random member: a
mostly-ratkin company sleeps at several small fires; an ogre-heavy one has bridge and food problems;
two archers notice sightlines first; a company that keeps sparing people gets approached openly.
*"Every Rabble is different" should be visible in the prose, not only the stat screen.*

## 23 — The cost of command *(their I09)*

> 🎒 **THE COMPANY** (the Captain's sheet, and nowhere else) — also 🗺 the decisions are *made* there
> **SYSTEMS** `facts()` (#24) · the sheet's history block · **no new store of its own**
> **RELATED** **#24 ⇢ waits on it — this is its first pure reader** · #19 (a contract is a debt with
> a name on it) · #22 · pillar rule 4: *facts with names, never a morality score*

On the Captain's sheet only, the decisions that spent **people** rather than resources: allies
ordered into danger, prisoners killed, characters dismissed, retreats sounded with somebody down.
**Facts with names, never a morality score** — *"The captain ordered Skree left in the ring."*

## 24 — Provenance ledger *(their I08 — the one thing they called foundation)*

> ⚙ **NO SCREEN** — it *surfaces* on 🎒 #23 #25 #38 · 🗺 #22 #19 #26 · 📜 the run summary
> **SYSTEMS** `addFact`/`facts`/`latestFact` · `characterRef()` · `chronicle()` · the existing
> ad-hoc booleans (`clashDone`, `packDone`, `contact`, `campChose` — **they stay and keep working**)
> · `loadRun` · `LINT()`  **RELATED** it **gates #19 #22 #23 #25** and distant **#26**, and every
> chain in Act 2 · #3 (the first chain worth re-expressing through it)

Consequence chains currently accumulate ad-hoc booleans (`clashDone`, `packDone`, `contact`,
`campChose`…). A compact semantic fact-store — *who did what to whom, when, and what it is owed* —
before the count grows past where it can be reasoned about. **Worth doing before Act 2**, not after.

The packet's shape is small enough to build in an afternoon and is the right one:

```js
addFact(type, data)   // → {id:`${type}:${G.day}:${n}`, type, day, place:G.at, ...data}
facts(type, pred)     // every match, in order
latestFact(type,pred) // the last one
```

The load-bearing half is **how a fact points at a person**. Never the display name:

```js
characterRef(p) => ({characterId:p.id, nameAtTime:p.name,
                     raceAtTime:p.race, classAtTime:p.cls})
```

The id is the reference; the snapshot is so a **dead, dismissed, or renamed** person can still be
talked about correctly three hours later. Items use their stable gear key (`deadboots`), not a label.

Their starting vocabulary, which is worth adopting wholesale because it is the list of things this
game actually needs to remember: `item_claimed` · `character_joined` · `character_dismissed` ·
`character_offered` · `character_killed_by_company` · `character_escaped_company` ·
`character_witnessed` · `promise_made` · `promise_paid` · `recruit_betrayed` · `enemy_spared` ·
`boss_escaped`. **Every fact type needs an owning system and a retention rule** — otherwise the
ledger becomes the new pile of booleans, just with better syntax.

Alongside it, an append-only per-person record — `chronicle(person, {type, title, text})`, stamped
with day and place — **which survives removal from the roster.** That is what makes a company album
possible at all.

**Build — double-write first, migrate never.** `G.facts=G.facts||[]` in run init *and* in
`loadRun` (old saves arrive without it). Then the first writers, each one line at an existing call
site: recruiting (`finishRecruit`) · dismissal · a scar taken in the aftermath · the mercy choice ·
robbery events · promises. **The old booleans stay and keep working** — new code reads facts, old
code reads its flags, and nothing is converted retroactively; a boolean only gets retired when the
last thing reading it does. That is what makes this an afternoon instead of a migration. Plus one
LINT rule: any event gate that names a fact type must name one from the registry — the misspelled
gate that can never fire is precisely the class of bug this file exists to catch.

**Verify.** Save/load round-trips the ledger byte-identically; a dismissed and a dead character
both remain addressable through `characterRef` snapshots; one existing chain (the clash recruit's)
re-expressed through facts reads identically to its boolean version; LINT clean.

## 25 — Personalities that earn their evolution
*(their F36 — the one I first dismissed in a line, and it is the best fit for what we already have)*

> 🎒 **THE COMPANY** (the sheet) — also ⚔ the proof is earned in a fight
> **SYSTEMS** `TRAITS` · `tr(u,key)` · per-scene caps · fact counting (#24)
> **RELATED** **#24 ⇢ waits on it** (honest counting across a run) · #2 (the AI fields are what
> evolves) · #38 (both are *a person changed because of something that happened*) · #40

A personality currently arrives fixed and stays fixed. This makes it **something a person grows
into by proving it**: each personality owns a *proof condition*, a threshold, an evolved form, and
a per-scene cap. **Count qualified risky successes, not repeated actions** — landing three shots
while engaged is a proof; shooting a wall thirty times is not. **Evolution strengthens the positive
expression without deleting the personality**, so *Ambition* that has been proven does not stop
being nervous up close; it stops being *only* that. Prototype **two** before touching the rest.
Depends on #24 (provenance) for the counting to be honest across a run.

## 26 — The Smaller One *(their F23 — the reference consequence chain, and a very good one)*

> 🗺 **THE ROAD** (the offer, the camp, the recruit) — also ⚔ a 2–4 round hunt with **AUTO
> disabled** · 🎒 the victim's sheet is the selection screen · 📜 no XP, no loot, no kill tally
> **SYSTEMS** presets · `dismissed` · `bonds` · chained `CAMPS` · a light `SPECIAL_BATTLES`
> descriptor · **nine named facts, not a flag**  **RELATED** **#24 ⇢ waits on it** · #38 (a tie is
> what makes the victim cost something) · #3 · #19 · #16

> 🕰 **DISTANT FUTURE** — seven cards of content behind #24. First candidate to graduate back.
The thin chain, in order: **a hungry ogre → you offer it a named veteran ratkin → a manual
escape-or-execution battle → the ogre joins you → at least two shared fights → it betrays the
company, beside its brothers.** That is the pillar as a five-hour arc rather than a single choice,
and it uses the machinery we have (presets, `dismissed`, bonds, chained camp incidents). Optional
echoes only *after* the thin chain survives a save/load and both victim outcomes: the Hanged Man's
Boots, a surviving ratkin claiming them, and `[Victim]'s Cousin` turning up in a later recruit pool.
**Do not build the echoes first.** Depends on #24. *(Seven cards, not one session.)*

The line the whole chain is built to earn:

> The ogre learned exactly the rule the Captain demonstrated — **when your own people are hungry,
> feed them the smaller companion.**

**The offer.** It only appears if the ratkin is a **known** person: at minimum two completed battles
or one real remembered fact, plus a road segment, not downed, not a plot carrier. The selection
screen shows name, portrait, history, equipment, and ties — *"the player is not sacrificing 'one
ratkin'; they are deciding which known person has the lowest perceived future value."* If the roster
is too full, the ogre refuses **in world** — *"The ogre counts the bedrolls, then shakes his head.
'Too many mouths already.'"* — never by silently blowing the cap. **The confirmation names the
victim and states the physical intent.** Never `Trade companion`.

**A SHORT HUNT — the part that makes it work.** Deliberately *low* mechanical difficulty and *high*
emotional difficulty. **2–4 rounds.** A small board, almost no decoration, the ratkin near the
centre, your people at separated distances forming an **incomplete ring**, one clearly marked escape
edge, no other enemies, no loot, music dropped to nearly silence. *"The board should look like a
hunt, not a fair duel."* The opening shot into the leg is an **authored transition, not an accuracy
roll** — it cannot be allowed to miss and break the scene. The victim is `SHOT THROUGH THE LEG`
(short stride) and in `TERROR` (spends both actions escaping, one desperate burst), starts at
BREAKING, uses DISENGAGE only to open a route, and **does not attack unless cornered**. The
objective reads *"Stop [NAME] before they leave the field"* — the word *kill* need not appear.

> ⚠ **AUTO is disabled for this encounter.** *"Letting automation execute the former companion turns
> the decision into a cutscene disguised as a battle and permits the player to outsource
> responsibility."* This is the single most important implementation note in the chain.

**Killing pays nothing** — no XP, no level, no fanfare, no loot — and it **does not increment the
ordinary people-killed tally**; it writes its own fact instead: *"Helped put [NAME], who had marched
with them, in the ground."* The ogre joins at the **normal** recruit baseline, normal wages, normal
capacity cost. *"The ogre **is** the reward."*

**The escape branch is not optional.** If the victim reaches the edge or you withdraw, the ogre does
not join, the escapee becomes eligible as a later deserter or hostile witness, and the betrayal
spine never fires. *"This off-ramp is essential."*

**The turn** must come **before tactical control begins** — dialogue on the deployment screen, the
ogre walks over to the other side, you see the final sides and may redeploy normally. He keeps his
gear and it is recoverable on victory. Design the fight around **three** states (no ogre / ogre but
no sacrifice / fed-a-companion), because it is a **two-unit swing**. Recovery afterward is run
protection without a moral rebate — more recoverable equipment, a hazard premium, a closer muster —
**and the game never says the sacrifice paid off.**

> ⚠ **Guardrail:** *"This ogre and this band may eat people. Ogres as a playable race must not
> become 'the cannibal species.'"* Other ogres condemn him, mock him, refuse meat. The world does
> not treat ratkin as naturally disposable.

**State is nine named facts, not a flag.** *"Avoid a single flag such as `evil_ogre_route = true`."*
Boots taken (item + taker + place) · bargain offered · hunt result · final blow · ogre recruited ·
boots reclaimed · foreshadow fired · betrayal · cousin eligibility.

**The telemetry distinction that decides whether it shipped correctly:** *"I regretted what I
chose"* is the intended outcome. *"The game tricked me about what the choice meant"* is a failure.
**A high reload rate is not automatically failure.**

And a rule for the whole game, not just this chain — the **chain-density rule**: per act, guarantee
**one** complete returning consequence, seed **one** longer unresolved one, allow a few two-beat
callbacks, and keep many road vignettes genuinely standalone. *"The occasional truth that they do
**not** matter keeps the world from feeling like a quest machine."*

**Four implementation traps**, from their annex — each one would be found the hard way otherwise:

1. **Do not delete the victim to build the fight.** `splice` them out to a held reference and put
   them **back with gear, scars and memories intact** if they escape or you withdraw. Removing them
   up front and re-rolling on escape produces a different person wearing the same name.
2. **Reserve the party capacity before the offer is shown.** *"Never complete the execution and then
   say there is no room for the ogre."*
3. **The betrayer must be the same object** — the scars you gave him, the level, the gear you bought
   him, the nickname. *"That is the mechanical proof that this is the same person."* A lookalike from
   the bestiary destroys the beat.
4. **The boots can duplicate.** If the victim wore them and a ratkin inherits them, the old trinket
   goes to the stash and the item exists exactly once. A validator that counts `deadboots` across
   stash + every trinket slot catches it in one line.

And the way to disable AUTO is not to hide the button — **grey it out and let it say why**:

> *"This is your order. The company will not make it for you."*

A light `SPECIAL_BATTLES` descriptor covers everything this fight needs without another branch
threaded through combat: `{noAuto, noWithdrawPenalty, noExperience, noLoot, maxRounds:4,
objective:'kill_or_escape'}`. That is the practical, three-line version of their much larger
`ScenarioSpec` — and it is worth adding *for this fight* even though the full contract is parked.

**Six things to decide before writing any of it:** two prior fights or three · always a ratkin or
does the structure generalise later · late Act 1 or early Act 2 · is the cousin guaranteed, weighted,
or just seeded into a pool · does the slice support a sheet for a dead character · and does the
escaped victim ever come back.

## 28 — The Act 1 stinger *(their F31 — and it needs a naming decision from you)*

> 🗺 **THE ROAD** (a camp celebration) — also ⚔ a close-range ambush · 🚪 the thank-you screen
> **SYSTEMS** the run-complete hand-off · quest state (**not** equipment state) · a `LOOT`/armour
> claim flag  **RELATED** #34 (both decide what a *finished* run is allowed to lose) · #43 (its one
> reframing line is exactly the narrator's job) · the Act 2 half of #10

> 🕰 **DISTANT FUTURE** — demo-ending content, and the enemy still needs a real name.
After you **legitimately complete and bank** Act 1: a camp celebration, nobody sets a watch, and
several of *something* attack first at close range. It ends on **"It seems they found you."** Then
an optional thank-you and feedback screen, outside the fiction and never gating replay.

The hook is planted much earlier — claim a particular set of armour and you get a vague
**"I think someone is watching me"** status. The callback reads *quest state, not equipment state*:
claiming it is what counts, wearing it is irrelevant.

⚠ **The packet calls the enemy "Nazgul" and explicitly flags it as a working label, not lore** —
it is placeholder naming borrowed from elsewhere and needs a real name in this world before it
gets written. The design is sound; the word is not ours. **Hard rule from the packet, worth
keeping: the postscript must not be able to erase or corrupt the completed run.**

## 29 — Zone of Control, if it ever comes back

> ⚔ **THE BATTLE BOARD**
> **SYSTEMS** one query — `controlledHexes(unit,state)` — read by the preview, movement validation,
> reactions and **both brains**; facing arcs; rotation still pays its action
> **RELATED** **#13 ⇢ needs it to measure fight length before this is reopened** · #47 (a spear's
> reach-2 hex is exactly what ZOC re-prices) · #46 (facing + displacement) · #50

> 🕰 **DISTANT FUTURE** — cut once for making movement unaffordable; needs #13 to measure a return.
ZOC was **cut once** for making movement unaffordable, so this stays parked — but the packet's
version is better than the one we cut and the shape is worth recording. **A standard creature
controls only its three FRONT hexes** (front-left, front, front-right) — so facing decides control,
and walking round something is a real answer. Elite profiles are **authored per creature, never
inferred from a generic flag**: the Fen-Mother projects broad control across her head and front
while her rear and body keep flank and back counterplay. **ZOC does not change attack reach, attack
arc, or flank/back classification** — one derived set of controlled hexes feeds movement validation,
reactions, AI and the UI preview alike. Do not reopen without the arena (#13) able to measure what
it does to fight length.

| relative sector | ordinary creature | elite profile |
|---|---|---|
| front-left · front · front-right | controlled | controlled |
| flank-left · flank-right | **open** | controlled |
| exact rear | **open** | **open** |

The rear hex stays open for *everyone* — that is the counterplay, and it is why the wide profile is
authored per creature rather than switched on by an `elite` flag. Rotation moves the arcs with the
unit and **must keep paying the normal action cost**; the packet is explicit that this rule *"must
not smuggle in a free-turn rule."*

**One query, `controlledHexes(unit, state)`, and everything reads it** — preview, movement
validation, reactions, `aiTurn` and `autoStep`. *"The AI must not use a simplified full-adjacency
approximation. AUTO must not walk through a cell that manual movement treats as controlled."* That
is exactly the class of bug we have already shipped twice.

> ⚠ **The rear gap must be visible in the preview.** *"If the player learns it only by losing a
> unit, the rule will feel like an exception invented after the click."*

## 30 — The action-economy package *(their F30/F29/F32, which are one idea)*

> ⚔ **THE BATTLE BOARD** — also 🎒 the quiver is an item with a stated cost
> **SYSTEMS** a stable action key · the damage calculation · the preview label · cooldowns
> **RELATED** **#45 REVERSES its base rule — read that note first** · #13 (the survivors need
> measuring) · #50 (both survivors are banked in its parking lot) · #46

> 🕰 **DISTANT FUTURE** — what survives the supersession (quiver, slow mage) waits on #13.

> ### ➤ THE QUIVER'S NEW CONTRACT ARRIVED ON 2026-08-02 AND IT IS [#78](#78---a-good-thing-you-carry-takes-something-away).
> **This entry is down to one survivor.** The mage wind-up **shipped as #67** (a damaging school is
> slow, 8f.68) with the interruption rules below largely intact. The base repeat penalty was
> reversed by **#45**. That left the Oversized Quiver holding a benefit with nothing to buy, which
> the note directly below has said since the day it was superseded.
>
> **The user asked for that exact item again on 2026-08-02**, in almost these words, and #78 specs
> it with the collision written out and a ruling offered. **When #78's ① is built, strike this
> entry.** Everything below stays readable until then, because #78 leans on it: the stable
> action-key rule, the blanket-scalar trap and *"a generic 'second action is full strength'
> property would be an engine exception disguised as a quiver"* are all still the right answers.

> ### ⚠ SUPERSEDED IN PART — 2026-07-31
> **The user has reversed the base rule: do not punish repetition, reward combinations. Build
> [#45](#45) instead of the 50% penalty.** Everything below still stands *except* the repeat
> penalty itself — the Oversized Quiver and the mage wind-up survive on their own merits, but the
> quiver's contract has to be rewritten, because *"removes the repeat penalty"* no longer means
> anything once there is no penalty. Its cost (one agility tier) is fine; its benefit needs a new
> job. **Keep the detail below** — the action-key matching, the trap about blanket 50% scalars, and
> the wind-up interruption rules are all still the right answers to their own questions.
**The second use of the same action is worth 50%** — repeated attacks lose *damage*, repeated
movement gets *half its budget*, and **switching to a different action does not inherit the
penalty**. That single rule then makes two other things possible: an **Oversized Quiver** that costs
one tier of agility and removes the penalty *for the second basic shot only*, and **mage spells
that wind up** — a damaging spell telegraphs its target, the caster is visibly channeling, enemy AI
raises its threat priority accordingly, and it resolves next turn unless interrupted. *(Utility
spells are not delayed.)* **Prototype the base rule first and retest every class**; the artifact and
the mage identity are overrides on top of it, not separate systems.

**Keep accuracy untouched.** *"The second blow still connects, but it has less force. Hidden accuracy
loss would feel like the game changed the dice."* Match on a **stable action key**: `Strike→Strike`
is a repeat, `Move→Strike` is not, and `Strike→named special` is **not automatically** one. Apply the
multiplier once to a multi-hit total, not once per nested packet. Label the preview
`REPEAT — 50% DAMAGE` *before* the click, and for a second move show the halved reach before
commitment, always leaving at least one legal tile.

> ⚠ **The trap:** do **not** apply a blanket 50% to durations, displacement, buffs, or utility. Each
> such action must be declared explicitly — non-repeatable, given its own reduced rule, given a
> cooldown, or granted full effect because it already pays elsewhere. A generic scalar here silently
> breaks control classes.

Reaction attacks, parting shots and counters never count as the unit's repeat unless the reaction
consumes a normal action. **AI and AUTO must score post-penalty value**, or they will happily throw a
half-strength second swing at something a reposition would have solved. And the quiver's contract is
narrow on purpose: *"a generic 'second action is full strength' property would be an engine exception
disguised as a quiver."* Since agility is hidden, the card still has to say it in words —
**"Cumbersome: this character becomes one tier slower."**

For the mage wind-up, the interruption rules must be **deterministic and few**: death or downing
cancels, explicit stun or silence cancels, **ordinary damage does not**, and an area-locked spell
still hits the marked area even if the target walks off it — *"this avoids a hidden concentration
roll."* Enemy threat focus on a channelling mage is **conditional, not omniscient**: only if
something can actually reach them, can actually see the channel, and has no more urgent objective.
Keep one immediate low-impact cantrip so the class is not pure delay, and **AUTO must not channel
repeatedly into guaranteed death.**

## 49 — Make the AI explain itself
*(from their AI-doctrine contract — small, and unusually useful; renumbered from #32, which the Fen-Mother defect used to own)*

> ⚔ **THE BATTLE BOARD** (the log strip, in test mode) — also ⚙ it is a tool, not a feature
> **SYSTEMS** the movement scorer in **both** brains (it is a **COST** — lower wins) · `window.AIWHY`
> · the test-mode toggle  **RELATED** it is the debugging instrument for **#2 #46 #47 #37 #42** ·
> #13 (one says *what* is unbalanced, this says *why*) · #50 (which spends its time asking exactly
> this question)

> ### ⏸ DEFERRED BY THE USER — 2026-07-31
> **"This one I like — but maybe do it later. More extended for later."** Said of the finished
> mockup, not of the idea: the gate artifacts are **done and keep**, so picking this up is a
> build session and not a design one. **The rules are written below and the picture is at
> [`shots/49_ai_explains.html`](../shots/49_ai_explains.html)** — the button in all three states,
> the log strip with WHY off and on, and the edge cases (a long line wrapping, no runner-up, a
> refusal). Do not redesign it; extend it.
>
> **"More extended"** is the instruction for whoever takes it. The cheap version below prints one
> line per decision. The extended one it is asking for probably means: the *whole turn* rather
> than the single winning pick, a way to replay or step a decision, and the per-fight table
> `window.AIWHY` already collects being worth reading in its own right.
>
> **What the spec below already commits to, and which must not be quietly dropped:** the movement
> scorer is a **COST** — lower wins — and the line prints the engine's own signs and says so.
> Re-expressing it as "+18 reaches the gap" reads better and is a lie, and a tool that lies about
> the AI is worse than no tool. The **runner-up** is the feature: a lone winning score cannot
> answer *why didn't it go there*, which is the only question anybody asks the AI. And it must
> cost **nothing** when the toggle is off — terms captured only when a candidate improves on the
> best, the string assembled once after the loop, never per hex.

Every AI decision already comes from a score. **Print the terms** in test mode:
> `MOVE to 8,4 · +18 reaches the gap · +12 keeps formation · +7 flank preference · −9 exposure = 28`

Their line for it is the argument: ***"this makes AI criticism actionable."*** Right now when the AI
does something stupid the only options are to stare at it or to read the scorer; with this, a bad
decision names its own reason. It costs one debug string on a scoring function we already have, and
it would have found the frozen ogre in seconds.

**Named failure modes to score against** while we are in there: ratkin that **kite forever** (a
retreat needs a finite ground budget or an objective that forces commitment) · ogres as **stat
walls** (they need readable positional counters, not bigger numbers) · humans as **omniscient**
(discipline should not mean every unit shares all information) · a bandit faction that is
**"everything"** (it still needs composition bands and a clear threat structure).

## 27 — Balance: the optional fight is harder than the finale *(their T01/T03)*

> 🔚 **BANKED IN #50's PARKING LOT — it is a measurement, not a build.** Re-measuring it before
> #46 and #47 land would answer a question about a game that no longer exists.
> **⚑ It has no row in the index on purpose** — it is one of #50's parking-lot items, and #50's row
> names it. It keeps a body here because the numbers below are the evidence.
> ⚙ **NO SCREEN** · **SYSTEMS** `window.ARENA` · **RELATED** #13 ⇢ needs it · #50 · #18
Their arena runs found the **Hill Steading at 1 win in 30** for a prepared six while **the Snare
went 30/30** — the optional side-fight is brutal and the act's climax is a formality. The numbers
predate this session's morale and damage rework so they must be re-measured, but the *shape* of the
finding is a real risk. Also **T03: Fen-Mother AUTO reached 29 and 54 rounds** in outlier runs — a
fight can feel frozen long before it technically deadlocks. Do this with the arena (#13), not by
feel.

## 34 — The mortality chain: scarred → maimed → dead

> 🎒 **THE COMPANY** (the chain is read off the sheet) — also 📜 **the death is revealed in the
> aftermath and nowhere else** · ⚔ a warning before deployment, and **nothing on the board changes**
> · 🚪 what a dead company leaves behind
> **SYSTEMS** `SCARS` · `injure()` · the Medicine Chest · `PARTS` (**#4**, unbuilt) ·
> `consequences()` · `LEGACY.priorDied` · `#24`'s facts · **`lostSoul()`** (#85, shipped)

> ### ⚑ #85 ALREADY BUILT THE HOOK THIS ENTRY HAS TO FILL, 2026-08-04
> **THE DREAM** is a road card about somebody the run has lost, and writing it meant finding out
> that this rule is still in force everywhere: `carryEverybodyOut()` says *"nobody is lost"*,
> `afterBattle()` never splices a body, and `toBeaten` scars rather than buries. So the card asks
> **`lostSoul()`**, which today knows exactly three states and ranks them by fault - **`cut`** (you
> cut a returning veteran down at a fire, the build's only real crew death), **`hole`** (the
> sinkhole still has them), **`sent`** (dismissed, still out there).
>
> **When this entry ships, `lostSoul()` gains a fourth state and it outranks all three**, because a
> body that went down on your last rung is a heavier thing than a man you sent away. It is one row
> in that function and one sentence of evidence in the card's `tell{}` map - **the card is already
> written to take it**, and the sentence to write is what your eye cannot leave alone about somebody
> who died on a field, in the register of the three that are there. ⛔ **Do not change what the
> dream ASSERTS when you do it.** Nothing outside the dream ever states that anybody is dead, and
> that is deliberate: the sinkhole can still hand its man back four days later.
> **RELATED** ⇢ **waits on #4 + #17** (a maiming has to be a real, drawn thing before it can be a
> rung on a ladder) · wants **#24** (the chain is stored facts, never a count) · **#35** (a graft is
> the same anatomy pointing the other way) · **#38 shipped** (a tie is what makes a death cost
> something) · **#37** (AUTO may never spend somebody on their last rung) · **#26** · **#19**

> ### ✅ RULED BY THE USER, 2026-08-01
> **The question was:** *scars only — or ship The Iron Road as an opt-in run contract alongside it?*
> **The answer, verbatim: *"Mortality — yes — after get scars and maimed."***

**This reverses the oldest rule in the project, and the way it reverses it is the whole design.**
`README.md` §2 has said *"nobody on the roster dies in a fight"* since the beginning, and the reason
was never squeamishness — it was arithmetic. A 12% chance of deleting a character the player had
spent an hour making theirs forces **every encounter to be balanced against the worst possible
roll**, so the numbers have to be timid everywhere to compensate. That reason is still true.

**The ruling dodges it, because death is no longer a roll.** It is the **end of a chain the player
can see coming**, and every rung of that chain is something they already understand:

> ### SCARRED → MAIMED → the next one is the last one
>
> **Scarred** — what the game does today. Permanent, stacking, removable **once a run** at
> Coldharrow's medicine chest. A person who does one thing slightly worse.
> **Maimed** — a **part is gone**, not damaged: an eye, a hand, an ear. This is #4, and it is why
> #34 cannot ship before it. A maiming changes a *role*, not a stat line.
> **Dead** — only from here. A body that is already maimed and goes down again does not get
> carried off.

**What makes this safe where the old permadeath was not:** the player is never surprised. They can
read the rung on the sheet, they get an unmistakable warning before deploying somebody on their last
one, and **they can choose not to take that person to this fight.** A death is therefore always a
decision the player made — which is exactly the pillar (*you cannot afford to be good to everyone*)
applied to a body instead of a purse. Losing somebody becomes something you *spent*, not something
that *happened to you*.

**The rules that have to hold.**

- **The state is in words on the sheet, never a number.** The standing interface rule. Something
  like `SOUND · MAIMED · THE NEXT ONE IS THE LAST` — and the full chain on hover.
- **A warning before deployment**, not a confirmation dialog *(`ask()` — `confirm` is blocked in the
  published build)*. It says who, and it says it once.
- **The death is revealed in the aftermath — never as a mid-board cutscene.** The board keeps
  working the way it works; the fight does not stop for it. That is the packet's own ruling and it
  is the right one.
- **The Medicine Chest can never walk a rung back.** It removes a *scar*. It cannot restore a part
  and it cannot un-maim. Otherwise the chain is a currency.
- **AUTO may never spend somebody on their last rung.** It plays the fight, not the run — the
  existing AUTO safety contract, one line longer.
- **A run does not end because one person died.** The company ends when everybody of yours is down
  at once, as it does today.
- **The dead person's history survives them.** Ties (#38) already carry their own copy of both
  names, and *Misses* — the tie type that persists after death or departure — is suddenly the
  obvious second tie to build.

**⚠ The failure mode to measure, and it is the reason the rule was removed the first time:** players
who retire every scarred veteran and **stop forming attachments**. If the chain makes people
disposable rather than precious, the ruling has backfired and the compensation is the thing to
change — not the rule. Watch for it in the first playthrough after it ships.

**Still open, and it is a small question rather than a blocking one:** is this **the** rule, or is
`The Company Rule` (today's no-death) kept alongside it as a gentler run contract? The user answered
*"yes"* to mortality without naming a toggle, so **the entry is written as the default rule** — and
the opt-in version costs almost nothing to add later if the failure mode above shows up.

**Verify:** a scarred person who goes down is carried off, as today; a **maimed** person who goes
down does not; the sheet reads the rung in words at every stage; the pre-deployment warning fires
once and only for the last rung; the Medicine Chest cannot move anybody down the chain; AUTO refuses
to deploy or advance a last-rung body into a losing exchange; a death appears in the aftermath and in
no other screen; the run continues with the rest of the company; the dead person's ties and history
still read correctly on everybody else's sheets.

---

## 35 — Grafts: rare authored consequences

> 🎒 **THE COMPANY** (the doll shows it before any tooltip does) — also ⚔ the narrow compensating
> rule · 🗺 **the road can hand you one — that half is new**
> **SYSTEMS** the **#4 + #17 painter API** · `SCARS`/`PARTS` · `EVENTS`/`CAMPS` · a reaction hook
> **RELATED** ⇢ **waits on #4 + #17's painter API** · **#34** (the chain a graft interrupts) ·
> **#16** (its sibling system — same five-field contract shape) · **#3** (the road delivering a
> body change to somebody you did not choose)

> ### ✅ RULED BY THE USER, 2026-08-01
> **The question was:** *rare authored consequences of specific injuries — or a doctor's menu you
> can shop from?*
> **The answer, verbatim: *"Rare authored consequences of specific injuries or events on the
> road."***

**So: authored, rare, and never a shop.** The alternative — a menu of grafts you buy with crowns —
was the more replayable option and it is explicitly rejected. The reason is tone: a graft you
*chose from a list* is equipment, and a graft that *happened to you* is a story. The moment the
player can shop for a Hook-Hand, the whole system is a second equipment screen.

**And the ruling extended the entry.** The original design sourced a graft from *an injury*. The
user added **"or events on the road"** — so a graft is not only what a surgeon does after a bad
fight, it is also what the road does to somebody: a thing found under the Bloom, a bargain at a
shrine, a bone-setter in a village who is better than she should be. That is a real widening and it
is the more interesting half, because it puts a graft in front of a player who has not lost anything
yet.

**A graft is a consequence object attached to a body part**, not a second equipment system, and each
one needs exactly five things:

> **origin** (an injury *or* a road event) · **a visible silhouette change** ·
> **an ordinary restriction** · **a narrow compensating rule** · **a reaction hook**

Their examples are good enough to build from:
**Shield-Skull** (no headgear, poorer peripheral awareness / deflects the first ranged hit from the
covered side each battle) · **Hook-Hand** (no two-handers or bows / pull an adjacent target once a
fight) · **Pilgrim's Crutch** (shorter first move, no HURL / DISENGAGE costs less moving backward) ·
**Bell Ear** (worse at going unnoticed / immune to one fear-scream when rung).

> **No graft is a strict improvement over an intact body.** And the doll must show it *before* any
> tooltip does.

**Start with ONE — Shield-Skull — and give it both origins:** one authored injury path, one authored
road path. If a single graft with two doors is not interesting, four grafts will not be either.

**⚠ It now sits beside #34.** A graft is the *other* thing that can happen to an anatomy the game has
finally learned to model: mortality makes a body a countdown, a graft makes it a character. Building
either one without the other makes the paper doll say only one kind of thing.

Pairs directly with **#4** (losable parts) and **#17** (mutations you can see) — build the painter
API once and all three use it. Start with **one**: Shield-Skull, because it reads clearest.

## 37 — AUTO doctrines: PRESS · KEEP LINE · HOLD & SCREEN *(their F04)*
> ⚔ **THE BATTLE BOARD** (one control, chosen when AUTO starts)
> **SYSTEMS** `autoStep` · `doctrine()` · the safety contract (never a unique item, never a
> final-slot character, never an irreversible choice)
> **RELATED** **#2 ⇢ build it first — doctrine is an order, not mind control, and personality has
> to survive the order** · #42 (the flourish is a doctrine's showpiece) · #21 · #34 · #49

> 🕰 **DISTANT FUTURE** — wants a mature, trusted AUTO underneath it before adding orders on top.
One company-wide intention, chosen when AUTO starts and changeable on your turn. **Not** a
conditional rules editor — *"copying a full programmable-AI editor would create two competing
games,"* and in those games programming the units *is* the tactical act; here we already have hexes.

**PRESS** closes distance and finishes the wavering; opportunists hunt back arcs; eager personalities
may visibly overextend. **KEEP LINE** weights adjacency and never chases beyond one move from the
company centre — the right default for an unfamiliar fight. **HOLD & SCREEN** names one or two
ranged anchors and holds a shallow arc in front of them.

**Personality survives the order.** A wary unit follows HOLD well and hesitates under PRESS; an
eager one may refuse to sit still before contact; a shieldmate bends the line toward the most
wounded ally — and **AUTO explains a meaningful refusal once, in one log line.**

> **Doctrine is an order, not mind control.**

Their **safety contract** is the important half, and it generalises our existing rule: AUTO may never
spend a unique item, withdraw from a no-withdraw fight, fire through serious friendly risk,
**sacrifice a final-slot character**, resolve an irreversible mutation choice, or spend a
once-per-run resource. The player can interrupt at the next unit boundary, and *the game must never
conceal that AUTO is still on.*

## 39 — Meet the Rabble *(their F17 — the onboarding layer our #14 is missing)*

> 🚪 **THE FRONT DOOR** (the opening) — but **each card teaches the screen you are on**, so it
> lands on 🎒 the inventory, 🗺 the map and ⚔ the battle in turn
> **SYSTEMS** the arrival cards (**replace or enrich them — never a fourth modal on top**) ·
> `whisper()`/`LEGACY.seen` · `? RULES` · speakers as cast **ROLES**, never names
> **RELATED** #14 built (the three layers this extends) · #51 built (a voice on the field already
> exists — reuse `capBalloon`) · #40 · #43 · #12 (the faces it speaks with) · #22

The fourth beat of the opening is **personal**: one of your people looks out of the interface and
explains who they are and one rule you need now. Four beats — *Join the Rabble* (the run contract) →
*Meet the Captain* (contracts, wages, why anyone follows) → *Meet the bodies* (one line per race
present) → *How did we get here?* (a personal aside teaching the current screen).

**Speakers are cast ROLES, never hardcoded names** — `CAPTAIN`, `FIRST_RATKIN`, `FIRST_OGRE`, plus a
fallback. We have already shipped that bug once. The voice samples are worth keeping verbatim:

> *human, inventory:* "Two hands. Put something in both if you like."
> *ratkin, map:* "Road costs a day. Day costs food. Food costs coin. Coin costs something worse,
> eventually."
> *ogre, battle:* "Front is where they are looking. Bruht recommends not being there."

**Must replace or enrich our arrival cards, not add a fourth modal on top.** One actionable rule per
card; each leaves a searchable help entry behind.

## 42 — AUTO gets one flourish *(their F05)*
> ⚔ **THE BATTLE BOARD** — also 📜 it is worth reporting afterwards · 🚪 it earns a help entry
> **SYSTEMS** `autoStep` · the legal-action set (**it may only use something the current party
> could do manually**) · the help index
> **RELATED** **#37 ⇢ sits on its foundations** · #21 (the same evidence, reported instead of
> performed) · #46 (the three new verbs *are* the flourishes) · #2

> 🕰 **DISTANT FUTURE** — the teacher-AUTO idea; it sits on #37's foundations.
Each AUTO battle may spend **at most one** legal combination the player might not know exists — the
ogre hurls an ally into a back arc, a pull tears somebody out of a line, a shove puts an enemy in
the marsh, one break of nerve forces a surrender. Constraints that make it a teacher rather than a
show-off: it can only use something **the current party could do manually**, spends no unique
resource, risks nobody's last slot, must be materially better than the plain action, and gets a
short highlight — **never a tutorial interruption.** After the first time, it earns an entry in the
help under *company tricks*.

> **One flourish makes AUTO a teacher without making it the star.** Unlimited flourishes make the
> player feel the AI is playing the interesting part of their game.

Test: can half of first-time viewers **explain the combination afterwards**? If not, it was a
spectacle, not a lesson.

## 43 — Who is allowed to speak, and how often *(their F18 — a budget, not a feature)*
> ⚙ **NO SCREEN** — a budget every screen spends from: ⚔ barks · 🗺 hinges · 🚪 the prologue
> **SYSTEMS** the speaking budget #51 already set (one a round, five a battle, no line twice a run)
> · subtitles always · the audio spend ranking
> **RELATED** **#51 built · #40 · #39 — all four spend the SAME budget on the same field, and #51
> already chose the shape** · #8 built (the ranking's first tier is why it went before this)

> 🕰 **DISTANT FUTURE** — narrator production is far off. **The audio ranking inside applies today**:
> action readability → barks → narrator → ambience.
The company owns ordinary reactions. **The narrator owns only the transitions the characters cannot
frame themselves** — the prologue, the first sign the road is stranger than expected, the end of an
act, a run-ending death, one line that reframes a structure you have seen many times.

For a one-act demo the whole budget is **8–12 narrated hinge lines and 3–5 rare fourth-wall
moments.** No narration over routine attacks. Subtitles always.

And the ranking that decides where audio money goes, which is the actually useful part:

> **1.** action readability — impact, the throw, a pull, a rung dropping, fire, mud
> **2.** character barks · **3.** narrator hinges · **4.** ambient biome layers
>
> *"Do not spend the audio budget on narration while core combat verbs remain silent."*

> ### ⚑ ONE RULE INHERITED FROM #40, WHICH WAS CLOSED AND DELETED 2026-08-01
> #40 (portraits that look back) was closed by the user — *"it is done, delete"* — and its entry is
> gone from this file. **One line of it was still live and is kept here**, because it binds every
> speaker on the field and not just a portrait:
>
> > **A reaction must never reveal a "correct" moral answer.** The moment a face tells you which
> > option was the right one, it is a karma meter with a good haircut, and the pillar is gone.
>
> It applies to this entry, to **#39**, and to anything else that puts words near a decision.

A fourth-wall break only lands **after** the player already understands the in-world situation — a
portrait waiting for a second confirmation of an absurd order is good; a joke about a button during
a death is not, and neither is the narrator explaining something the interface should have shown.
Generated voice is acceptable **only** as a labelled temporary track for testing cadence.

---

## The 2026-07-31 batch — field control, race skills, and bodies

*Four entries from one conversation, and they are one idea: **the board should change during the
fight, and the interesting decisions should come from changing it.** #45 is the rule, #46–#47 are
the verbs, and #48 is the field remembering it happened.*

> **Read in this order now: #48 → #46 → #47, and #45 last, inside #50.** The user deferred the rule
> on 2026-07-31 and the verbs went ahead without it. That is not the batch breaking up — a verb that
> is weak alone and strong in sequence is *already* the design; #45 only adds the payout on top.

## 45 — ★ Reward the combination, not the repetition *(this REVERSES #30 — see the note there)*

> ⚔ **THE BATTLE BOARD** — ⏸ **and it is built INSIDE #50, not before it**
> **SYSTEMS** the **one** forced-movement block in `strike()` (`d.offBal=B.round`) · the damage
> calculation · a per-round struck-by array · `whisper()` for naming the combination · one scoring
> term in **both** brains
> **RELATED** #46 #47 (the verbs it pays — build them **plain**, the payout is added on top later)
> · #30 (this reverses its base rule) · #1 #7 built (push · pull · the hook-pole already resolve
> through that same block — **keep it that way**)

> ### ⏸ DEFERRED BY THE USER — 2026-07-31
> **"Mark is for later — it is too big one."** The system is still taking on new inputs: race
> skills (#46), the spear rework (#47), the remaining mutations (#16), losable parts (#4). A rule
> that every one of those plugs into should not be written while the things plugging into it are
> still arriving — it would be specified against a shape that is about to change, which is the
> exact rework the ⛔ gate exists to prevent.
>
> **What this changes for the entries that named it as a parent:** nothing blocking. **#46** (kick ·
> throw · poison) and **#47** (the spear) were only ever *enhanced* by marks, never dependent on
> them — a kick that displaces and a shove that buys a wasted enemy turn are complete verbs on
> their own. Build them plain. The follow-up payout is added on top later, and adding it later is
> **cheaper**, because by then there will be a full set of displacement verbs to write the rule
> against instead of three.
>
> **Where it comes back: inside #50, the balance pass** — it is a motivation rule, and motivation
> rules are what #50 is for. The design below stands as written; do not redesign it, and do not
> build it early because an entry mentions a mark.
>
> ⚠ **Anything built between now and then must still leave the hooks reachable** — all forced
> movement keeps resolving through the one block in `strike()`, and nothing may start writing its
> own bespoke displacement path. That single site is what makes #45 an afternoon later instead of
> an archaeology dig.

> **"Лучше не наказывать за повтор действий — а награждать за комбинации."**

The Codex proposal was: *the second use of the same action is worth 50%.* That is the right tactical
goal reached from the wrong end. **A penalty taxes the player who does not understand the system
yet; a bonus pays the player who does.** Same intended behaviour — stop spamming one button — with
the opposite emotional direction, and no tax on the AI, on new players, or on the fights where
repeating really was correct.

**The mechanism: a skill leaves a MARK, and other skills read marks.** Three marks cover everything
in this batch and everything already built:

| mark | left by | read by |
|---|---|---|
| **OFF BALANCE** | any displacement — kick, shove, hurl, pull, hook-pole | the next attacker |
| **TAINTED** | ratkin poison (#46) | everyone, automatically |
| **GROUND** | marsh, fire, and the gap where a thrown boulder used to be | movement and displacement |

A **follow-up** is one unit acting on a mark **another unit made**. That is the combination, and it
is the only thing that pays:

- strike a target displaced this round → **+15% damage** · *"caught off balance"*
- strike a target a different ally already struck this round → **the back-arc bonus regardless of
  arc**, because the target is busy · *"he was looking the other way"*
- push anybody into marsh or fire, or out of their own line → the ground does its work **and** they
  spend their next move walking back · *"put where they did not want to be"*

**One follow-up bonus per target per round.** Without that cap a six-body company turns one marked
enemy into a nova, and the fight stops being about position again.

**It must say the name.** The log prints *"caught off balance"* the first time it happens, once,
because a combination the player cannot name is a combination they cannot plan. This is the same
teaching rule as the whisper layer (#14) — the lesson fires when the rule first pays, not on a
tutorial screen.

**And repeated actions stay at full strength.** If someone wants to swing twice, that is a valid,
boring, correct choice — it should simply be worth less than the interesting one.

**Build.** All forced movement already resolves through one block in `strike()` — that single site
sets the mark: `d.offBal=B.round`. Struck-by tracking is a per-round array on the defender,
cleared when their own turn begins. The damage calculation then has two one-line checks: mark
present and attacker is not the one who made it → ×1.15; struck this round by a *different* ally →
back-arc bonus applies regardless of arc. The cap is one more field, `d.fuSpent=B.round`, checked
and set in the same place. Both brains get one scoring term — a marked target is worth more to
attack — which is what turns the rule from a payout into *behaviour*: the AI starts visibly
finishing what an ally started. First payout of each kind fires a whisper (`LEGACY.seen`, the #14
machinery) naming the combination.

**Verify.** Practice-field setups: kick-then-strike pays exactly once, the second follow-up on the
same target the same round does not; a unit cannot follow up its own mark; both brains measurably
prefer marked targets; the seven-fight regression band moves no more than ±1 round.

---

## 47 — The spear becomes a zone, not a poke *(rework, not an addition)*

> ⚔ **THE BATTLE BOARD** — also 🎒 it rewrites one class's whole contract on the sheet
> **SYSTEMS** the accuracy site that already prints `marsh −10` receipts · SPEAR WALL / BRACE AND
> SHOVE · **enemy** AI in both brains (most of the actual work)
> **RELATED** #46 (built together as the verb batch) · #45 (the shove's mark, later) · #29 (ZOC
> re-prices the reach-2 hex this entry is built around) · #50 ⇠ on its entry condition

Today the spear is reach 2 with two weapon-chosen signatures (`grimtoll_slice.html:3131`). The
missing half is the **weakness**, and the user's version is the right one:

> **A spear is a bad weapon in a clinch.** Standing adjacent to a spearman costs them accuracy —
> one full band. But **shove and strike still work perfectly**, and after the shove the enemy has to
> **spend a turn walking back in.**

That single rule turns the class from a poke into **field control**, because it gives it a complete
and legible contract:

| | |
|---|---|
| **strong** | at reach 2 — the hex nobody else threatens |
| **weak** | at reach 1 — the clinch it cannot fight in |
| **owns the answer** | the tool that converts reach 1 back into reach 2 |

The spearman is the only class whose *counter to its own weakness is a positioning action*. And it
composes upward: the shove leaves **OFF BALANCE** (#45), so whoever swings next is paid for it, and
the enemy's wasted return trip is a full round the line got for free. *(#45 is deferred to #50 — so
**build this entry without the mark**. The wasted return trip is the whole payoff on its own and
does not need it; the shove already resolves through the one forced-movement block in `strike()`,
which is where the mark will later be set, so nothing here has to be revisited when it lands.)*

It also fixes a quiet problem — SPEAR WALL and BRACE AND SHOVE currently read as two unrelated
weapon modes. Under this rule they are the same job answered twice: **wall** punishes the approach,
**shove** undoes an approach that already landed.

**Build.** One condition in the accuracy calculation (the site that already prints `marsh −10`
receipts): attacker's main weapon is spear-family *and* the target is adjacent → one accuracy band
down, receipt line **"too close for the spear."** The signature actions are exempt by construction
— shove and wall are separate `acts` with their own accuracy. Then the AI half, in both brains,
which is most of the actual work: a spear-carrier prefers targets at reach 2 over adjacent ones,
and *enemy* AI learns that closing to adjacent is how you fight a spearman — without the second
part the penalty exists but is never seen, and a rule nobody experiences is a rule that does not
exist.

**Verify.** The hover hit-chance drops exactly one band only for spear + adjacent; shove is
unaffected; enemy melee measurably closes on spear-carriers more than on swordsmen from the same
start; the regression, watching specifically that Vesna's fights do not lengthen past the band.

---

---

## 50 — 🔚 THE BALANCE PASS — deliberately last

> ⚙ **NO SCREEN** — it reaches ⚔ the board most of all, then 🎒 the bodies and 📜 the compositions
> **SYSTEMS** `window.ARENA` (#13) · every damage and accuracy site · `noTrim` bosses · the round
> band · the parking lot below
> **RELATED** ⇢ **entry condition: ~~#46~~ #13 · #47 · #16 · #4 — one down, four to go** · it **contains #45** (do not
> wait on it — it is the first thing built when this runs) · it **holds #27, #29, #30's survivors**
> · #49 (take it first anyway) · #18's open question is **excluded on purpose**

> **Set by the user, 2026-07-31:** *"We are shaping the system with many new inputs, skills and
> mutations. We would balance it and change the logic of motivation a bit later — when things are
> ready."*

**This entry is a place to put things, not a thing to build.** It exists so that every balance
observation made between now and then has somewhere to go **other than a session that stops to
retune**. When you notice a number that feels wrong while building something else: write it down
here and keep going.

**Why it is last, and why that is not procrastination.** The combat system is mid-change. Race
skills (#46) add three verbs that exist to make *somebody else's* action better. The spear rework
(#47) changes what a class is for. Mutations (#16) and losable parts (#4) change what a body is.
Marks (#45) change what a turn is. Tuning damage, encounter compositions or the round band against
today's feel is **tuning a game that is about to stop existing** — the README says this in §8 and
it is the same reasoning here. A balance pass run once, late, against a settled system is one
session. Run early, it is the same session repeated four times with the answers thrown away.

### Entry condition — do not start this before all of these exist

| | | why it must be in first |
|---|---|---|
| **#13** | the arena reports win rates | the pass is **measured, not felt** — without it this is somebody's opinion |
| **#46** | race skills | three new verbs change every composition's value |
| **#47** | the spear | changes one class's whole contract |
| **#16 / #4** | mutations + losable parts | they change bodies, so they change encounters |

**#45 is NOT on that list — it is *inside* this entry**, and confusing the two would make the pass
wait on itself. Marks are the first thing built when #50 runs, not a thing built before it.

**#49** (the AI explaining itself) is not strictly required, but a balance pass without it spends
most of its time asking *why did it do that* — take it first regardless; it is Tier 1 for this
reason among others.

### What is in scope when it runs

**1. The motivation layer — #45, and it is the headline.** Marks and follow-ups are a *balance and
motivation* rule, not a content feature: they change what a player is paid to do with a turn. That
is why the user moved it here rather than dropping it. By the time this runs there will be a full
set of displacement verbs (kick, shove, hurl, pull, hook-pole, throw) to write the rule against
instead of three — which makes it **cheaper to build here than it would have been in Tier 1**, not
merely later. Build it to the spec already written under #45; do not redesign it.

**2. The numbers, measured with the arena.** Win rate per fight × party size (4/6/8), the round
band (currently 4–12, boss longest), and per-class contribution. The known suspect is **#27** — the
Hill Steading measured at 1 win in 30 while the Snare went 30/30, an optional side-fight harder
than the act's climax. Those numbers predate two reworks and must be re-measured, not re-fixed.

**3. What the new verbs did to the shape of a turn.** Specifically: is a ratkin-heavy company now
better or worse than a mixed one, does the ogre's rock-throw make archers mandatory, and does the
spear's clinch penalty push players off the class entirely. Each is a composition question the
arena can answer and intuition cannot.

**4. Encounter compositions**, once and only once the above is known — this is the last thing to
touch, because it is downstream of everything else in the list.

### The rules this pass must not break

- **Show a state, hide the number.** A rebalance never becomes an excuse to print a stat.
- **The pillar is not a balance knob.** *Good deeds must not secretly pay better* — if a tuning
  change makes the merciful option optimal, the change is wrong, not the pillar.
- **A hand-tuned boss opts out** (`noTrim`). A general trim silently re-tuned the Fen-Mother once
  already.
- **Do not balance the Thing in Armour's "send somebody wide" in the arena.** The arena
  structurally cannot value it — it never chooses to hold ground, which is the entire thing that
  answer buys. That one is settled by the human playthrough and nothing else. *(See #18.)*
- **Telemetry observes; it never silently balances the game.** Invariant 10.

### The parking lot — add to this list, do not act on it

*Observations banked for the pass. A line here is a note, not a task.*

- **THE FEN-MOTHER GOT HARDER BY BEING FIXED, AND THE NUMBER IS BANKED HERE RATHER THAN COMPENSATED
  FOR** *(2026-08-02, build log 8f.76)*. She had been trapped at **one hex of movement a turn** by
  standing water — her stride is 3, water takes 1 off it and costs 2 to enter, and her own THE FEN
  ANSWERS paves two hexes around her with it. `fenborn` exempts her. A/B in one session with the
  flag toggled at runtime, **30 runs each arm**: win rate **28/30 → 19/30 (93% → 63%)**, median
  **9 → 13 rounds**, **0.8 → 2.5 of yours put down per fight**, and **the long tail came IN** —
  p90 **24 → 19**, max **29 → 25**, fights over 20 rounds **4 → 2**. ⚑ **The tail is the
  counter-intuitive part and the reason to read this as a defect closing rather than a difficulty
  decision:** a boss pinned in a bog cannot finish a fight either, so the survivors circled out of
  her one-hex reach and the round count ran away — the same shape as the 835-round stall #31 was
  built to fuse. Her template has always said *"tuned so she reliably puts one or two of yours on
  the ground"*, so **0.8 was under her own written spec and 2.5 is a shade over it** — that number
  is the one to watch, not the win rate. ⚠ **Four smaller samples (6, 12 and 14 runs) all read
  noisier and worse than the 30/30; this fight's distribution is wide enough that only the 30/30 is
  quotable.** **The thing to measure at the pass is whether a HUMAN feels it**, because the same
  build also gave her back arc a ring and the ✦ marks, and the arena's player brain scores arcs
  while a human *reads* them: the fix handed something to both sides at once and only one of those
  is represented above.

- ⚠ **EVERY ROUND COUNT BANKED BELOW PREDATES 8f.72, WHICH RE-TUNED MORALE ON THE USER'S OWN
  INSTRUCTION** *(2026-08-01, and yes, it broke this section's "do not retune before the pass"
  rule: it was asked for directly, so it was built)*. The start of a fight is now a magnet the
  nerve returns to, no per-turn effect lifts anybody above it, the flat +14 recovery became a
  proportional climb capped at +8, five penalties came down, and three rules were deleted outright
  (badly hurt, far more of them left, the line's morale). **A fight ending on a morale collapse is
  a rarer thing now, so any read below that was about fight LENGTH needs re-measuring before it is
  trusted** — the brigand 14-round line especially. The eight fights were run clean at the time
  and their outcomes did not move, but that is a smoke test, not a balance measurement.
  ✅ **RE-MEASURED 2026-08-11 by #89** ([`COMBAT_BENCHMARK_2026-08-11.md`](../COMBAT_BENCHMARK_2026-08-11.md)):
  **`brigand` reads 13.6 rounds over five runs, so the morale rework did NOT bring it back down**
  (9-11 before #36, 14 after it, 13.6 now). All eight fights have a current length in that document.
  ⛔ The instruction below not to retune the line-of-fire penalties for it is untouched by this and
  still stands: it waits on #46 (shipped) and **#47 (not shipped)**.
- **#27** — Hill Steading 1/30 vs Snare 30/30, pre-rework, needs re-measuring.
- **#30's survivors** — the Oversized Quiver and the mage wind-up outlived the repeat penalty that
  justified them; the quiver's contract needs a new job before it can be costed.
- **#29** — Zone of Control was cut for making movement unaffordable; it cannot be reconsidered
  until #13 can measure what it does to fight length.
- **#36 lengthened the brigand fight** *(banked 2026-07-31, deliberately not acted on)*. Line of
  fire charges archery in three new places at once — screened, obstructed, and the range bands
  that were always billed but never shown — and the fight most exposed to it went from a
  9–11 round read to **14** in the regression, with 10 OBSTRUCTED and 10 SCREENED shots in one
  game. Nothing else moved (the eight ran 4–14, all clean). **Do not retune the penalties for
  this**: #46 and #47 are about to change what a shooter's turn is worth in the first place, and
  the honest question — *is an archer now paying twice for the same crowd, once in the scrum
  penalty and once in the lane?* — can only be answered after they land.
- **Water costs a hex of stride, and it is the first movement rule in the game** *(banked
  2026-07-31, 8f.45, deliberately not acted on)*. Standing in a wet hex now takes 1 off the mover's
  budget on top of the 2 it already costs to wade in. **The centre did not move** — a 5×2 A/B on
  the sling-line read a median of **8 rounds either way** — but the water-on arm threw a **24** and
  the water-off arm did not. Five samples cannot separate that from the tail this file already
  knows about (brigand: median 10, excursions past 20 at roughly one run in ten). **Measure it with
  a sweep when this entry runs, not off a regression line** — that is the lesson #44 left and it
  applies here exactly. If it does turn out to be real, the cheap knobs are the wet-hex density per
  fight (`TF.marsh`) and exempting `big` bodies, not the rule.
- **The Fen-Mother's tail is still there, and it is the tail and not the centre** *(banked
  2026-07-31, 8f.50, deliberately not acted on)*. Six incidental regression reads across one
  session: **8 · 12 · 13 · 15 · 22 · 29**, median ~14, one of them ending `fled`. #32 measured her
  at 12–14 with a max of 25 after DESPERATE and the hunger clock closed the stall; the centre is
  where it was left and the 29 is above the max that pass recorded. **Nothing in 8f.50 can be the
  cause** — `G.bonds` was empty for every one of those runs, so the tie branch never evaluated
  true. This is the same shape as the brigand and water entries above: **a handful of regression
  lines is not evidence about a wide distribution.** Sweep her when this entry runs, and if the
  tail is real the question is whether her fuse should tighten, not whether her numbers should.
- *(next observation goes here)*

**Verify.** There is no "done" for this entry until it runs — but when it does: every number
changed is backed by an arena table stored in the build log below, the round band holds,
no fight is a formality and no optional fight is harder than the finale, and the seven-fight
regression is clean.

---

### Rejected or folded, with the reason

| | Why |
|---|---|
| **F20** unspecified minigame | No systemic job. Their own review rejects it too. |
| **F33** Steam-name fourth-wall address | Platform-specific, and the tone rules already say the game never winks at the player. |
| **F08–F10** catapults, ogre-launching into fortifications, city assault | Act 3+ scope. The ogre *throw* shipped in its playable form (#1). |
| **I05** rabble kit draft | Its problem (B06) is fixed; the draft version needs encounter retuning to be worth it. Revisit only if the opening still reads thin after a human playthrough. |
| **I06** current-road rail | Its problem was the crowded map — B04's clamp plus backlog #6 should solve it. Reconsider only if the map stays hard to read after #6. |
| **I12** failure-shaped onboarding | **Already the model** of our whisper layer (#14 layer 2) — every whisper fires on the mistake, not the screen. |
| **I07** persistent escaping boss | Directly contradicts B03's ruling: a set-piece ends when it is down. Would need the outcome taxonomy rebuilt first. |
| **F26** Battle Lab · **F25** dev menu · ScenarioSpec | Real systems, and genuinely useful — but they are **tools for the builder, not the game.** They sit behind the human playthrough and the settlements MVP. Test mode (`⚙ TEST`) and the linter already cover the immediate need. *Their contents were still harvested:* the faction doctrines and terrain identities went into #33, the point-budget-vs-wages separation into #13, the AI scoring explanation into #49. |
| **F14** the *Rabblebound* rename | A title decision is the user's, not mine — but the packet's resolution of the "not mercenaries, but rabble" conflict is worth keeping whatever the name: **layered language, not deletion.** Legally a company (the Captain signs contracts and owes wages); to employers, sellswords; to enemies, rabble; to themselves, eventually, the Rabble. And their honesty test — *"every rabble is different"* is a lie unless variation shows up in composition, scars, remembered ties and survivors, **not mainly in randomised item rolls.** *(Ruled 2026-08-01: the layering is now canon, lore book §7; the rename itself stays open.)* |
| **F22** archiving old builds · **F28** the screenshot-first gate · **F24** an architecture map | Process, not backlog. F28 is **already how we work** — the batched review sheets are that gate. F24's job is done by [README.md](docs/README.md) §5 and its ten invariants. F22 does not apply: there is one build. |
| **F03** the event audit · **F12** per-class balance cards · **F07** the chronicle | Folded into existing work rather than listed separately — F03 is what `LINT()` does (and its human half is the checklist in the README), F12's eight-field card is now the class contract in [01_GAME_CONCEPT.md](docs/01_GAME_CONCEPT.md), F07's *"evidence, not a verdict"* rule is why the aftermath has no power score. |

## 57 — 🚧 Event analytics — NOT SPECIFIED HERE

> ⚙ **NO SCREEN** — it lives in [`tools/dramaturge.html`](../tools/dramaturge.html), tab 2
> **RELATED** #53 · #54 shipped (its input is their export blob) · #50 (its first customer)

> ### ⛔ THIS ENTRY HAS NO SPEC IN THIS FILE, AND THAT IS DELIBERATE
> **It is a big independent task the user is running in a separate tab** — their instruction,
> 2026-08-01: *"mark event analytic as big independent task that I am doing in other tab."* **Its
> spec is written inside the tool, on the tab itself**, and that is its single source of truth.
>
> **Do not build it, do not re-spec it, and do not start it as a favour.** The number exists here
> only so that it is never reused and so that somebody searching for it lands somewhere.

**The one thing this file owes it: a stable input.** The journal export blob from #53/#54, currently
at **v2**. Its *row shape* is now a contract with a session outside this repo — if you change it,
bump `v` and say so in the ["Running elsewhere"](#-running-elsewhere--do-not-pick-it-up-here)
section of the plan. **Invariant #10 crosses the boundary with it**: the tab observes and never
acts, exactly as the journal does.

**If the tool asks for a field the game does not record, that is a numbered entry in this file.** A
reader asking for data is fine. A reader quietly changing what the game writes down is not.

---

## 59 — The woman from the cage comes back, and she is not a hire

> 🚪 **THE FRONT DOOR & BETWEEN RUNS** — also ⚔ the Snare board (she stands on it) · 🗺 The Last
> Muster (the new event) · 📜 nothing (she takes no spoils and leaves no sheet)
> **SYSTEMS** `LEGACY.ashmoor` · `clashAllies()`'s `ally:true` contract · `unitFrom()` · the
> TURNCOAT block in `startBattle` (line ~4675) · `EVENTS.wynn` · `PORTRAIT.wynn` → `POR09`
> **RELATED** #38 built (a tie is what makes a body cost something) · #34 (mortality — she is the
> one body on the field that can die today without touching that chain) · #24 (she wants to be a
> stored fact, not a boolean, the day facts exist) · #22 (the road reading the company)
> **MODEL** 🧠→🔧 SPLIT — the event's prose and the "not a hire" boundary are strong; the unit
> injection is mechanical and copies the turncoat almost line for line

**THE ASK.** User, 2026-08-01, on being told her portrait `POR09` is painted but unreachable:
*"you can create some event for her. and then if you seaved her she joins in the final fight of
act. She is an archer."* And immediately after, the clarification that decides the whole shape:
*"but she joints not a company - but fight itself."*

**THE PROBLEM THAT FORCED THE DESIGN.** Wynn's existing scene, `THE WOMAN IN THE CAGE`, fires from
`afterBattle` when `G.battleKind==='snare'` — and **the Snare is the act's last fight** (the map
says so at the node: *"Everything after this node is the Snare"*). So as the content stands you meet
her exactly one scene too late to ever fight beside her. That is not a bug to fix by moving her; it
is the thing that makes the entry good, because the only way she can stand in that fight is if the
mercy happened in **a previous run**.

**THE RULE.**
1. Free her **without a fee** — the third choice, the one that costs 60 crowns or 13 salvage and
   returns nothing — and `LEGACY.ashmoor` is set. *This already happens today.* Today it prints one
   line on the camp screen and does nothing else.
2. On a **later run**, with `LEGACY.ashmoor` true, a new event fires at **The Last Muster**
   (`hire2`) — the final quiet node before the Snare. She is waiting. She is not asking.
3. At the Snare she is on the field as `side:'you', ally:true`.

**SHE IS NOT A HIRE, AND THAT IS THE ENTRY.** She never enters `G.party`. No wage, no party slot, no
provisions, no sheet, no gear, no promotion, no dismissal, no share of the spoils. She exists inside
one fight and then she is gone. The `ally:true` contract that `clashAllies()` already defines does
all of this for free — `afterBattle()` is written never to look for an ally in `G.party`. **Do not
be tempted to make her a roster member with a zero price.** A body you can equip and keep is a
reward; a body that turns up, shoots, and leaves is a *debt being paid*, and only the second one is
this game.

**SHE IS THE TURNCOAT, MIRRORED.** `startBattle` already takes a person who is not on the roster,
runs `unitFrom()`, stamps an id and a side, and pushes them into a fight — that is the TURNCOAT
(line ~4675): somebody you paid off comes back to shoot **at** you. Wynn is the same machinery with
the sign flipped: somebody you spared comes back to shoot **for** you. Build her next to it, and say
so in the comment, so the two read as one idea.

**WHAT SHE IS.** Human **archer**, hunting bow (**range 5**), carrying **CRIPPLING SHOT** — all
existing class and weapon code, nothing new in combat. Stats around `str 7 · agi 10 · int 10 ·
mor 12`: the high nerve is the point, she is not frightened of these people any more. Her portrait
is **`POR09`**, which is the whole reason this entry exists — it is painted, embedded, and today
unreachable.

**WHY IT IS WORTH BUILDING.** It is the pillar stated once, cleanly: *you cannot afford to be good
to everyone*. The mercy costs real money at the moment the run can least afford it, promises
nothing, and pays back **a whole run later** — which is the only honest way a game can reward mercy
without making it arithmetic. It also turns the project's single cross-run *human* memory from a
sentence into a body on a board.

**IF SHE DIES** she is gone. No body to carry out, no sheet to bury, nothing in the spoils. The camp
screen still says the gate knows your colours — she talked before she died.

**REJECTED, WITH THE REASON.**
- *Move the cage event earlier so it pays off in the same run.* Offered and turned down. It relocates
  a written scene, and it collapses the delay from "a whole run" to about forty minutes, which is
  where a mercy stops being a gamble and starts being a purchase.
- *Both — early cage AND cross-run return.* Turned down as the most to build and test at once.
- *Let her join the roster for free.* See above. It is the difference between a reward and a debt.

**THE OPEN QUESTION FOR THE PLAYTEST.** A player who never starts a second run never sees this. That
is accepted — but it is the thing to watch, because it is also true of everything in the legacy
layer, and this is the first entry that makes the cost of that visible.

**GATE ARTIFACTS — DONE.** Rules above; picture from the real Snare board with her standing in it:
[`shots/59_wynn_at_the_snare.html`](../shots/59_wynn_at_the_snare.html). **Owes a
`WHAT_TO_TEST.md` section when it ships.**

---

## 78 - A good thing you carry takes something away

> 🎒 **THE COMPANY: roster · character sheet · stash** is where it is chosen and read. Also
> ⚔ **the battle board**, where all three of them actually bite (a damage term, an action pip, a
> second shot) · 📜 nothing
> **SYSTEMS** `GEAR{}` (the item table) · `dmgMul(a,d,act)` (the one damage site, and it already
> carries defender-side terms) · `beginTurn`'s `u.actions=u.actionsMax` · `spend()` and
> `u.used{}` (the repeat counter) · `moveBudget`'s `movesUsed` (the one repeat penalty that
> survives today) · `gearRows`/`gearSmall` (the hover text) · `bAp`/`bAPnum`/`bAPtxt` (the action
> pips) · both AI brains for the third item
> **RELATED** **#30, and this IS the new quiver contract that entry has been waiting for, read it
> first** · **#45** (it reversed the rule #30's quiver was buying an exemption from, and that
> collision is this entry's one open ruling) · **#13**/**#50** (two of these numbers want
> measuring, not choosing) · **#35 grafts** (worse in one ordinary way, better in one specific
> situation: the same shape, on a body instead of in a slot) · **#16 mutations** (same) ·
> **#72** (the last time the action economy was touched)
> **MODEL** 🧠 STRONG. It changes a combat rule, the action economy and item text, and the third
> item needs a rule taught to both brains

**THE ASK.** User, 2026-08-02, in one message, as three examples of one idea:

> *"Доп:*
> *1) Некоторые арты дают побочных эффект (большой колчан стрел). Минус уровен к ловкости - но
> второй выстрел без падения урона*
> *2) Artifacts (glases) - extra chane to heat, recived extra damage*
> *3) bottle red warg - trinket. Once per battle give you an option to restore 1 action. But have 1
> less action enxt turn"*

### THE CONCEPT, in one sentence

> ### The pillar says *you cannot afford to be good to everyone.* On a body it says **you cannot afford to be good at everything.**

A gear slot is another purse. The stash keeps offering capability the character cannot pay for, and
the interesting item is never the one that is better, it is the one that is **better at something
and worse at something else**, where the two things are not the same thing.

### WHY THIS IS NOT WHAT THE GAME ALREADY DOES

Two-sided gear exists here and has since the first pass: the Toll-Man's Boots (`agi:+3, mor:-6`),
The Cold Thing (`hit:+7, mor:-4`), foundry plate (`armour:96, agi:-2`), the wardrobe (`agi:-3`).
**So the shape is not new. What is new is that all three of the user's costs land somewhere the
existing ones never do**, and that difference is the entry:

| | today's two-sided gear | what the ask adds |
|---|---|---|
| **where the cost lands** | a second number on the same sheet, and it is nearly always **morale** | the enemy's turn (glasses) · **next** turn (bottle) · a compound stat that is three costs at once (quiver) |
| **when the player feels it** | never, in practice. `mor:-2` is a rounding error inside a five-rung ladder | the first time somebody dies wearing the glasses · the turn after the bottle |
| **what the decision is** | arithmetic. Add the pluses, subtract the minuses, one answer | **a judgement about the situation**, which is the only kind of decision worth a slot |

**The failure mode is a tax, not a trade.** `mor:-2` on an item with `hit:+9` is not a cost, it is
decoration on an upgrade, and every player works that out by the second run. The three below are
written so that the answer changes depending on who is wearing it and what fight they are in.

### THE FOUR RULES OF A SIDE EFFECT

These are the transferable part, and they should outlive the three items.

1. **THE COST IS PAID ON A DIFFERENT AXIS FROM THE BENEFIT.** Damage for damage can be computed and
   there is one right answer. Hitting harder for **being hit harder**, tempo **now** for tempo
   **next turn**, precision for **footing**: these cannot be computed without knowing the fight, so
   the player has to be the one who decides.
2. **THE COST HAS TO BITE AT A MOMENT, NOT SIT ON A SHEET.** If it cannot be pointed at when it
   happens, it is not a cost. It is a smaller plus. *(This is the standing rule "show a state, hide
   the number" pointed at gear: the player should learn the price by paying it, not by reading it.)*
3. **IF YOU CAN NAME THE BEST ONE, THEY ARE UPGRADES AGAIN.** Straight lift of the personalities
   rule, and it is the acceptance test for the set. For each item, name the company where taking it
   is a **mistake**, out loud, in the entry. If that sentence cannot be written, the item is not
   ready. All three are named below.
4. **A SIDE EFFECT IS NEVER A CURSE.** Every one of these comes off in the stash for free, between
   fights, no penalty. See REJECTED below.

### THE THREE ITEMS

---

**① THE OVERFULL QUIVER** *(new item, sits beside the existing `quiver`)*

> **What it does.** Your **second shot of a turn is at full strength.**
> **What it takes away.** **−2 AGI**, always, on everything.
> **Slot** `off` · **Size** any · **Where it is found** the armourer's rack at the Muster Field, or
> the Stone Field refit at Bonepicker's.

**Why −2 AGI is the right price and not a stat tax.** AGI drives **hit, movement budget and dodge**.
One number, three costs: the archer shoots slightly worse at everything, walks a shorter step, and
is easier to put down when something reaches them. That is a compound cost against a **rule
exemption**, which is exactly the asymmetry rule 1 asks for. A flat `−5 ranged damage` would have
been the same axis and therefore arithmetic.

> ### ⚠ THIS ITEM IS BLOCKED ON A RULING, AND THE RULING IS THE USER'S OWN
>
> **There is no damage falloff on a second shot in this game, so today this item buys nothing.**
> The only repeat penalties that exist are: the second **MOVE** of a turn is a hex shorter
> (`moveBudget`, `movesUsed`), a caster's second spell of a turn is halved (`castMul`), EMBER is
> once a turn, and cooldowns. A repeated **attack** costs nothing at all.
>
> **And that is not an oversight, it is a decision.** [#30](#30--the-action-economy-package-their-f30f29f32-which-are-one-idea)
> specified precisely this item, in almost these words: *"an **Oversized Quiver** that costs one
> tier of agility and removes the penalty for the second basic shot only."* It was superseded on
> **2026-07-31 by the user's own ruling** that became [#45](#45): **do not punish repetition, reward
> combinations.** #30's own note says it out loud: *"its cost (one agility tier) is fine; its
> benefit needs a new job."*
>
> **So the request has come back around to an idea the project already had and then invalidated**,
> which is worth knowing before anybody builds it. Two ways out, and this needs the user:
>
> **(a) RESTORE THE PENALTY, BUT ONLY FOR SHOOTING.** *(Recommended.)* This does **not** reopen #45.
> #45 reversed a **blanket** repeat penalty across every action in the game. A narrow one on the
> **bow alone** is a different animal, and there is a real argument for it: **the archer is the one
> body whose repeat costs nothing positionally.** A second swing means standing in somebody's reach
> for another beat. A second shot means nothing at all, from six hexes away, which is why "shoot
> twice" is the archer's answer to almost every board. A falloff on the second shot only
> (`×0.75` is the number to start from and it wants measuring, not choosing) makes the archer's turn
> a real question again: two weak shots, or one good one and a better hex. And then the quiver is
> the item that says *no, two.*
> **(b) GIVE THE QUIVER A DIFFERENT JOB.** Keep the −2 AGI and buy something that already exists:
> the **obstructed** line-of-fire state, or the **−35% to hit while engaged**. Cheaper, safer, and
> weaker: neither of those is the archer's actual decision, so the item stops being about the thing
> the user was pointing at.
>
> ⛔ **Do not build (a) as a general `secondActionMul` and then exempt the quiver.** #30 already
> wrote the reason and it is still right: *"a generic 'second action is full strength' property
> would be an engine exception disguised as a quiver."* It is a rule about **ranged attacks**, and
> the code should say so.

**Where it is a mistake:** a company with one archer who has to move every turn, and any board where
the bow is a third weapon rather than the plan. −2 AGI on somebody who only shoots once is a straight
loss with nothing bought.

**Not to be confused with the `quiver` already in the game** (`off`, `rangedDmg:+5`, "Twenty more,
fletched properly"). That one stays exactly as it is. This is the heavy one, and the two of them
competing for the same hand is the point.

> ⚑ **Found while reading for this entry, and it wants one line of somebody's time:** the comment
> above `quiver` says *"it needs a hand, and the bow uses both, so wearing it means fighting with a
> one-handed weapon"*, but the comment above `bow`, fifteen lines earlier, says the bow
> **deliberately does not take both hands**, and it does not (`bow` has no `hands:2`). One of those
> two comments is describing a game that was changed. The code is doing what the second one says.

---

**② THE GROUND-GLASS EYES, re-cut** *(the item already exists and ships today)*

> **What it does.** **+9 CHANCE TO HIT.** *(Unchanged. Plus the existing archer clause, +2 AGI more
> on an archer.)*
> **What it takes away.** **Every blow that lands on the wearer does 20% more damage.**
> **What goes:** the current `mor:-2`.

**The item's own description already specified this rule, and the numbers implemented a different
one.** It reads: *"Whoever wears them can suddenly count the rivets on a man at forty paces **and
cannot find their own feet**."* Cannot find their own feet is a defensive cost. It was charged as
morale, which is *sleeps badly*, and it is a different sentence about a different problem. So this
is not a new design, it is **the code being brought into line with the fiction that was already
written**.

> ⚑ **And that is the transferable half.** This project's trap list already carries **"a comment
> that states the rule is not the rule."** This is one level up: **a player-facing description that
> states a rule is not the rule either, and it is worse, because the player has read it and
> believes it.** When an item's prose and its stat line describe different costs, the prose is the
> spec and the stat line is the bug. **Grep the descriptions of every two-sided item in `GEAR{}`
> against what it actually charges, in the same session.**

**Why the morale cost has to GO rather than be joined.** Two costs on one item is a tax, not a
trade, and it fails rule 1: the player can no longer say what they gave up, only that the item is
"a bit worse than it looks". One benefit, one cost, one axis apart.

**Where it lands in the code.** `dmgMul(a,d,act)` is the **single** function that both `strike()`
and `dmgPreview()` call, and it already carries defender-side terms (`venomOn(d)`, `arcOn(a,d)`).
So this is **one term on `d`**, and the hover readout inherits it for free and cannot drift from the
blow. Put it on the outside of the bracket next to poison and the arc bonus, and the comment there
already explains why: **a fact about the defender is not a contribution from the attacker's arm.**

**+20% is a starting number, not a ruling.** It is the one figure in this entry that wants measuring
rather than choosing, and it belongs in #13's instrument and #50's parking lot. It has to be big
enough that somebody notices the turn the wearer goes down, and small enough that an archer standing
where an archer is supposed to stand never feels it at all.

**Where it is a mistake:** anybody who is going to be caught. On a front-line body it is close to
suicide, which is correct: it should read as an archer's item that a Brute is *allowed* to put on.

---

**③ THE RED-WARG BOTTLE** *(new trinket, and it is the one that earns this entry)*

> **What it does.** **Once per battle**, on the carrier's own turn: **+1 action, right now.**
> **What it takes away.** The carrier begins their **next turn with one fewer action.**
> **Slot** `trinket` · personal, never a company relic · costs **no action** to drink and does not
> count against the twice-a-turn cap.

**This is the only one of the three that is not a price. It is a debt.** The other two are paid at
the moment of purchase and then carried; this one is borrowed against a turn that has not happened,
which means the item is neither good nor bad. It is good **at the right moment** and genuinely bad
at the wrong one, and nothing in the game can tell the player which moment they are in. That is the
pillar applied to tempo instead of coin, and it is the reason to build this entry at all.

**The numbers, stated plainly, because the swing is large.** An ordinary body has **2** actions and
the Captain has **3**. So on a roster body the bottle buys a **3-action turn followed by a 1-action
turn.** That is close to trading a whole turn for half a turn, and it is meant to be: the price of
reaching somebody one round earlier is that they stand there and take it the round after.

**The rules that have to be written down before it is code:**
- **On the carrier only**, and only on their own turn. It is not a company button.
- **Once per battle**, per the ask. It resets between fights and is never consumed from the stash.
- **The debt is paid on that body's next turn**, tracked as `u.actionDebt`, applied at the one site
  that hands actions out: `beginTurn`'s `u.actions=u.actionsMax`. Not by lowering `actionsMax`,
  which would be a lie on the sheet and on the pips.
- **The pips have to show it before it bites.** At the start of the debt turn the missing action
  reads as **already spent**, not as a smaller maximum, and the log or a balloon says why. A player
  who opens a turn one action short with no explanation has met a bug, not a cost.
- **Interaction with DESPERATE** (`despActs`, which already lowers a boss's actions): the debt is
  subtracted **after** whatever sets the turn's allowance, and the result is **floored at 1**.
  Nobody ever gets a turn with zero actions. A turn you cannot act in is not a cost, it is a
  removed player.
- **AUTO never drinks it, and neither AI brain gets one.** Deliberate, and it matches the 8f.84
  ruling that made AUTO a tester tool: *"I want to see how people would play without this
  shortcut."* Knowing which round is the crisis is precisely the judgement this item exists to ask
  for, and handing it to a scorer both deletes the decision and gives the movement heuristics a new
  way to be wrong. If it later reads as an omission, the fix is an authored rule (*drink it only to
  reach a downed body, or to finish a body that would otherwise act*), never a weight.

> ### ⚠ THE HOLE, named rather than hidden
>
> **If the battle ends before the debt turn, the debt is never paid.** So the mathematically correct
> play is to hoard the bottle and drink it on the turn that wins the fight, where it is free. That
> is a real hole and the user should know about it before it ships rather than after.
>
> **It is still worth building as asked**, because the player usually cannot know which turn is the
> last one, and a gamble that always pays is not a gamble. **If the playtest shows people hoarding
> it, the cheap fix is one word: once per RUN instead of once per battle.** Then spending it on a
> turn that was free anyway is the whole charge gone, and the hoarding becomes the cost of hoarding.
> Do not fix it by making the debt survive into the next fight: there is no persistent fatigue in
> this game and inventing one for a trinket is a system pretending to be an item.

**Where it is a mistake:** a company that is winning. If there is no crisis to spend it on, it is a
trinket slot with nothing in it, and the Fingerbone would have been +3 MOR and +4 HP all fight.

> ### 📖 LORE. ✅ DONE 2026-08-02, the beast is canon: [`03_WORLD_LORE.md`](03_WORLD_LORE.md) §6
> **"Warg" appeared nowhere in the world, the lore book or the prototype**, and per the canon rule
> *(when an event and the book disagree, one of them is a bug)* it needed writing before an item
> could name it. The user's name was kept and the animal written, on the user's call: *"keep your
> name and write the beast."*
>
> **The one thing a builder needs from it: the fiction and the mechanic are the same sentence.**
> *"It does not tire when it should, and then it stops."* A warg runs a horse into the ground, holds
> the stride for as long again, and then lies down wherever it is for about a day. **That is borrow
> now, pay next turn**, in the animal, before it is in a bottle. So the item's hover text does not
> have to explain the debt: the beast already does. Two other rules are load-bearing for the item.
> **The blood stays the colour it came out**, which is the only reason it can be bottled and sold at
> all and is where the *red* comes from (the animal is grey). And **a mouthful buys one hard effort
> and then you take the animal's hour**, which is the drink stated in the world's own words.
> It obeys the book's style law: nothing anywhere says why, and it has been cut open.

---

### BUILD ORDER, and this is not one session

**② the glasses** is one term in `dmgMul`, one line in `GEAR{}` and two lines of hover text. **③ the
bottle** is a new field, one site in `beginTurn`, a pip state and a button. Those two share no code
and can go in one session. **① the quiver waits on the ruling above** and, if the ruling is (a), it
is a combat rule change that touches balance and both brains, which is a session of its own with a
regression over all eight fights.

**So: ② and ③ together, then ① separately once the user has ruled.** Splitting it that way also
means the concept is testable before the expensive third of it is built.

### REJECTED, WITH THE REASON

- **An item you cannot take off.** A curse. The game does delayed consequences everywhere, but a
  consequence with a name attached is not the same thing as a slot the player can no longer use, and
  the difference is whether they chose it knowing. Everything here comes off in the stash for free.
- **Durability, charges, or an item that breaks.** A second resource to manage on a screen whose
  whole design note reads *"deliberately small, enough that gear is a decision, not a spreadsheet."*
- **A stacking penalty for wearing two side-effect items.** Tempting and wrong: it makes the third
  item the one nobody takes, which is the same failure as a strictly best item wearing the other
  sign.
- **Giving the enemy the bottle.** It would be readable and it would be a good fight. It is also a
  second AI rule to teach, in both brains, for one item, and this entry has enough in it.

### WHAT IT UNBLOCKS

**#30's last survivor.** That entry is down to one thing now: the quiver. Its mage half shipped as
**#67** (a damaging school is slow, 8f.68) and its base rule was reversed by **#45**. If ① is built,
**#30 can be struck**, which is worth saying out loud because it has been sitting in the distant
tier since the packet was harvested.

**And it gives #35 and #16 a contract to copy.** A graft is *"worse in one ordinary way, strangely
better in one specific situation"*, which is the four rules above stated for a body instead of a
slot. Whatever this entry settles about **where a cost is allowed to land**, those two inherit.

### GATE ARTIFACTS. ⛔ NOT DONE: THE RULES ARE ABOVE, THE PICTURE IS STILL OWED.

Per the standing gate, **nothing here is code yet.** The picture wants to be made in the game and
kept to three panels: **the character sheet's trinket hover** with a cost line that is not a stat
row · **the action pips at the start of a debt turn**, which is the one state nothing on this screen
can currently draw · **the hit readout with the glasses' damage-taken term in it**, so it is visible
that the number the player reads is the number the blow uses. Stand a body up in the practice field
and `shotBoard()` it. **Owes a `WHAT_TO_TEST.md` section when it ships.**

---

## 80 - The weapon gets its half of the armour bands back

> ⚔ **THE BATTLE BOARD** is where every point of it is felt. Also 🎒 **the company**, where the
> weapon's shift has to be readable on the hover next to the band it moves · 📜 nothing
> **SYSTEMS** every `am`/`ft` pair in the file, and there are roughly sixty of them (10 weapons,
> both spells, every enemy act, the race skills, the improvised acts in `unitFrom`) ·
> `splitFor(d,act)` and `ARMOUR_BANDS`, both shipped in 8f.97 and both waiting for this ·
> `ignoresArmour(act)` · `gearLine()` (hover text) · `ARENA` (the sweep)
> **RELATED** **#79, which shipped in 8f.97 and is the half of this that already exists - read that
> code first, this entry is an addition to it and not a rewrite** · **#50 THE BALANCE PASS**, which
> this should land before · **#13** (the harness is how the retune gets measured)
> **MODEL** 🧠 STRONG. Sixty mechanical sites plus a sweep, but the design is settled and the
> numbers are already derived below.

**THE ASK.** User, 2026-08-02, choosing between three answers to *"what happens to the weapon's own
numbers?"* and picking the shift, then immediately scoping it out of the first build:

> *"Let put this advanced system in bavklog and for now focus only on main light, medium and heavy
> armor thing. With huge bonus and a small debuf to it"*

So **#79 shipped without this** and the bands alone decide the split today. This entry is the
refinement the user already ruled in favour of, parked on purpose.

### THE CONCEPT, in one sentence

> ### #79 made the ARMOUR decide how much of a blow reaches the body. This gives the WEAPON a stated say in it again, without taking the armour's decision away.

    through = BAND.through + WEAPON.pen        absorb = 1 - through

The band sets the baseline (light .50, medium .40, heavy .25 through) and each weapon moves it by a
named number of percentage points. The user's stated 50/60/75 stays exactly true of an ordinary
weapon, and blunt-versus-blade comes back as something the hover can say out loud.

### ⚑ THE NUMBERS ARE ALREADY IN THE FILE AND NOBODY HAS TO INVENT THEM

`ft` was always measured against an ordinary weapon at **0.30**, so `pen` is just
`(ft - 0.30) x 100`. **This is the whole reason `am` and `ft` were left on every act in 8f.97
instead of being tidied away** - they are this entry's input, and there is a comment at
`ARMOUR_BANDS` saying so.

| weapon | `ft` today | **`pen`** | reads as |
|---|---|---|---|
| Gut-knife | .45 | **+15** | it finds the gaps |
| Hunting bow | .42 | **+12** | it goes between the plates |
| A broom | .35 | **+5** | |
| Arming sword · Short sword | .30 | **0** | the ordinary weapon, and the baseline is true of it |
| Boar spear | .28 | **-2** | |
| Halberd | .26 | **-4** | |
| Fence-post cudgel · The Weeping Hammer | .22 | **-8** | |
| Warclub · The Wood-Stick | .20 | **-10** | |
| Two-hand maul | .18 | **-12** | it crushes rather than cuts |

**Every weapon keeps its exact relative identity** and only the ARMOUR side stays new. `am` is what
finally goes away: armour damage is `1 - through`, which still ranks the rack the same way (on a
medium body the maul absorbs .72 against the sword's .60 against the knife's .48) and still leaves
the maul about twice the armour-breaker the sword is once its bigger roll is counted.

### WHY IT IS WORTH DOING AT ALL, measured off the build before #79 shipped

> **Every melee weapon in the game did about the same damage to a BODY** - 6.0 to 7.4 on an average
> swing, knife to maul. They differed almost entirely in what they did to **ARMOUR**: 5.4 on the
> knife against 49.3 on the maul.

That was blunt-versus-blade, and it was the biggest reason to carry one weapon over another. **#79
flattened it**: every weapon now puts the same fraction through, so which blade you carry is a
question about raw damage. This entry is how that decision comes back. Full before/after table for
every weapon against every band is in
[`shots/79_armour_classes_proposal.html`](../shots/79_armour_classes_proposal.html), which was the
spec picture and is still the reference.

### THE FOUR THINGS THAT WILL BITE

1. ⛔ **The split goes in `splitFor()` and nowhere else.** `dmgPreview()` and `strike()` both call
   it and neither may grow a copy; those two have already drifted apart once here.
2. **`ignoresArmour(act)` already exists** and reads `am:0`. When `am` is deleted, that convention
   needs an explicit flag on the two or three acts that use it (spells, the ogre's throw), because
   "all of it, whatever you are wearing" is not a fraction.
3. **`through` must be clamped.** A knife at +15 against light (.50) is .65 and fine; nothing in
   the rack goes past 1 or under 0 today, but the clamp is one line and its absence is a silent
   negative-damage bug the first time somebody authors a `pen` of -60.
4. **The hover has to say both halves** - the band on the piece, the shift on the weapon - or the
   player is reading a number nobody told them about.

### ⚠ AND IT INHERITS #79'S OPEN BALANCE DEBT, which is the real reason to do it

8f.97 measured the bands over 8 runs per fight and found **the ordinary fights barely moved and both
BOSSES became winnable** (mother 5/8 to 8/8 wins with your dead 2.3 to 0.3; armour 5/8 to 8/8 with
3.8 to 1.6). **The mechanism is the armour POOL, not the split**: the old weapon `am` averaged
**0.945** across the melee rack and the new absorb is 0.50/0.60/0.75, so pools now drain at half to
four-fifths of the old rate and last **1.3 to 1.9 times longer**. The phase that kills people is the
one after a pool empties and the whole blow lands, and it now arrives much later.

**This entry moves that number back on its own**, because a maul at -12 against a medium body
absorbs .72 rather than .60 and a heavy body eats .87 of a maul. **So do the sweep AFTER this lands,
not before, or it gets done twice.** The knob if it is still wrong afterwards is **armour VALUES**,
never the 50/60/75 the user stated - and note that cutting values re-bands pieces, so it is a sweep
and not a knob-turn.

### GATE ARTIFACTS. ✅ RULES WRITTEN · ✅ PICTURE MADE · ✅ RULING GIVEN · ⛔ NOT CODE YET.

The picture is [`shots/79_armour_classes_proposal.html`](../shots/79_armour_classes_proposal.html)
and it is still exactly right for this entry: it was drawn to sell the bands and it happens to hold
the whole weapon comparison this one needs. **Owes a `WHAT_TO_TEST.md` section and a re-run of the
arena sweep when it ships, and the sweep is part of the entry rather than follow-up work.**

---


## 91 - The battle screen, redone to the user's seventeen points

> ⚔ **THE BATTLE BOARD**, the whole frame this time, not one panel
> **SYSTEMS** `render()` · `#bLeft` (dies) · `#bTop` · `#bLogWrap` · `#bTip` (dies) · `#bLegend`
> (merges) · the `.act` list (becomes cards) · `selectAct` · `clickHex` · the hover path ·
> `moveBudget` · `LADDER` / `umood` · `statusesOn` · the `CAM` default stop · `#bRead` (unchanged)
> **RELATED** #88 (the unit panel pass this supersedes in part; its open warmage-scroll remainder
> dissolves, a horizontal row fits all seven) · #86 (the clarity pass this belongs to) · #66 (camera
> stops) · #81 (PACE stays, as an icon) · #84 (the floats stay) · #87 (the verb animations are the
> other half of "the board explains itself") · #83 (the phone rotation must survive this)
> **STATE: ✅ SHIPPED 2026-08-11, build log 8f.121** - mocked, picked (A · THE FRAME with B's
> on-card damage) and built in one day. The record is the changelog row; the test bench section is
> in `WHAT_TO_TEST.md`; the pictures are `shots/91_before.html`, `shots/91_after.html` and the
> three-frame mockup page. **This section stays on the shelf, against its own convention, for one
> reason: it holds the user's seventeen points verbatim**, and the shared ruleset below is the
> reference for what each behaviour promised.

**The request, verbatim (2026-08-11), all seventeen points.** *Kept whole because every one is a
ruling; the numbers below refer back to these.*

> *"0) I want completly redo some of battle logic screen - so it is simplier and smoother and ui
> elements take less space. 1) Show active damage from main atack. 2) Show dagame recived or done
> (i think it works now?). 3) Skills on the bottom in the midle of the screen. Wildermyth style -
> picture and a name. Hower description and more details (still question about actions and damage
> direct). 4) basic movment is defalt action - so you don't need to click it 10 times. 5) When you
> hover on enemy and he is on your reach - defalt atack. 6) (while hovering on movment or enemy for
> that default actions highlight this choice of the screen). 7) Engagment and other statuses
> (poison, bleed) - show icon on top of character) more warteles style (still not sure, will we
> have enought space). 8) Left down / stats of character: actions left armor, health, chance to
> hit, dodge chance (battlebrothers / wyldermyth), hexes speed. Also Final Fantasy Tactics - could
> be inspiration for it. 9) Make descriptions of skills shorter and more specific. 10) Nerve - 100%
> make smaller taking space. 11) Combat log make smaller, adjusteble and with accordion - on high
> left up part or down right part. It takes small amount on screen (wyldermyth or battlebrothers).
> 12) undo movement if the movement hasn't changed the state of the game. 13) Only name of the
> trait, other on hover. 14) On the top ammount of your guys and enemies lef and turn. Like
> battlebrothers. 15) on default combat field a bit closer (it would happen when we will reduce
> noise abowe). 16) Mood state visible only when it gives buffs and debufs. Change icon as raised
> white flag when running. 17) Order of turns - without initative and make it a bit smaller itself,
> so it can be put also down. So as main result - ui takes less space and show the main information
> and battlfield. Less clutter, more importance. Create 2-3-4 possible placement of all this
> ellements and send me for aprove and pcik"*

**The measurement, before anything was drawn** *(the clarity-pass rule: measure the box first)*:
the stage is 1280x720 and the board gets **980x544 = 57.8%** of it; **42.2% is chrome**: the 300px
left column (23.4% of width, full height), the 72px order strip, the 104px log, plus a 330px legend
float and a 262px hover card. **262 words** are on screen at round I before the player has acted.
Skill rows are 270x38 in a scrolling column; the warmage overflows it by about one card (#88's open
remainder).

**What already exists and only needed confirming, not building:** damage floats on give and take
(point 2: `fx()` plus #84's six miss/dodge lines) · per-target hit % and the honest hitpoint range
drawn on the board when an attack is live (`hodds`/`hdmg`, points 1 and 5's numbers) · status and
formation badges stacked on the token edge with hover text (point 7: `statusesOn`, `stbadge`) · the
white flag on a routed body (point 16 half: `wflag`) · the trait clamped with full text on hover
(point 13 half, 8f.117) · the full nerve ladder as a hover (point 10 half: the `TIP` explainer).
**The redesign's job is the chrome, not the facts.**

### The shared ruleset (ships with any pick; behaviour, not placement)

1. **MOVE is the standing default** *(4)*. Nothing selected means a click on a reachable hex walks
   there; after every resolved act the selection returns to MOVE. The MOVE card stays visible as
   the lit DEFAULT card. Touch: `selectAct`/`clickHex`/`render` only. ⛔ **Not the brains**: `aiTurn`
   and `autoStep` never read the selection.
2. **Hover an enemy the current weapon can reach and the attack self-selects** *(5, 6)*: the
   weapon's card lights, the board prints the existing odds and range numbers on the target, the
   cursor says strike, click swings. Alternates (KICK, CRIPPLING SHOT) are still chosen by card or
   hotkey. The main weapon is `acts[k==='main']`.
3. **The card that would fire lights while its trigger is hovered** *(6)*, both directions: hover a
   hex, MOVE lights; hover a target, the weapon lights.
4. **UNDO MOVE** *(12)*, the entry's one genuinely new control, user-ordered. One undo per turn.
   Restores hex, facing and the spent move budget. **Forfeited the moment the move changed anything
   but position**: a parting swing taken, a body seen that was not visible before the step, a
   terrain trigger, any roll. AUTO never uses it.
5. **A card face is a glyph, a name, the hotkey and the cost pips** *(3)*. The receipt line
   (acts · range or reach · cooldown · nerve) plus **one effect sentence** live on hover *(9)*.
   KICK's paragraph is the test case: the paragraph stays in `? RULES`, the hover says one line.
6. **The plaque** *(8)*: portrait, name, class glyph, trait **name only** *(13)*, then the big
   numbers: actions left, hexes this move (the same `moveBudget` call, #88's rule), chance to hit,
   dodge, armour and hitpoint bars, the main weapon's damage range *(1)*, and **nerve as one
   colored word** *(10)* whose hover is the full ladder.
7. **The token mood face appears only on rungs that change numbers** *(16)*: 😄 +5/+5% · 😐 −8/−3 ·
   😟 −12/−5 · 💀 routed under the white flag. 🙂 is the only rung with no modifier and it
   disappears. *(Today's `loud` split already knows the extremes; the change is that quiet faces
   go, and 😐 joins the shown set because it does carry a penalty.)*
8. **The top capsule** *(14)*: standing bodies each side and the round, `⛊ 4 · ROUND I · ☠ 6`,
   plus whose turn. Routed bodies still count, they can rally.
9. **The order rail loses its initiative numbers and its printed names** *(17)*: heads only,
   current lit, name on hover. Where it sits is the pick.
10. **The log collapses to a live line or two with an accordion** *(11)*; the COMBAT LOGIC legend
    box dies as a float and becomes the **?** chip on the log header. `#bTip` dies: its act-note
    job moves to card hover, its ticker job was always the log's.
11. **The board draws one camera stop closer by default** *(15)*: the freed frame is exactly a
    ×1.306 linear gain (980 → 1280 of usable width), so the default stop moves one in and the
    stops themselves stay #66's.
12. **Unchanged, by name**: the hover readout card `#bRead` with the full to-hit breakdown, the
    floats, hotkeys 1-9, AUTO / WITHDRAW / PACE (as three icon buttons ▶ ⏱ ⚑), the verb
    animations, every game rule, both AI brains.

### The three frames sent *(the pick)*

- **A · THE FRAME** (closest to Battle Brothers): counts capsule top-center, the order rail as a
  34px strip of faces under it, plaque bottom-left, cards bottom-center with END TURN beside them,
  log collapsed bottom-right. Board ≈ 90%.
- **B · THE STAGE** (closest to Wildermyth): top edge empty but the capsule, END TURN top-right,
  log one line top-left, the order a vertical rail of faces down the right edge, bigger cards.
  **The weapon card carries its damage on its face**, which is one answer to the request's open
  "actions and damage direct" question; A answers it with the plaque chip, C with hover only.
  Board ≈ 90%.
- **C · THE DOCK**: one 98px bottom bar holding plaque, order film, cards, END TURN and log;
  **nothing ever floats over the board**. Board ≈ 86% and never covered. Tightest fit on a phone.

**The audit against the pass rule (nothing added, only cut, delay, merge):** cut - the 300px
sidebar as a surface, `#bTip`, the legend float, initiative numbers, printed order names, the
🙂 faces, and (flagged for the user) `#bFlavor`'s mood line, which the capsule does not carry and
the log could. Merged - seven sidebar readouts into one plaque, three buttons into three icons,
legend into the log header. Moved to hover - the nerve ladder, the trait sentence, skill prose,
order names. **Added: UNDO MOVE and the counts capsule, both ordered in the request itself.**

### Build notes for the session that gets the pick

- **Everything is presentation except rules 1, 2 and 4 of the shared set**, and those live in the
  click path (`selectAct`, `clickHex`, hover), never in `aiTurn`/`autoStep`. AUTO and enemy turns
  render through the same chrome untaught.
- ⚠ **The camera transform stays on `#bGround` and `#bFx` stays outside it** (the README trap).
  Floating chrome must not re-anchor the fx layer; everything positioned over the board goes
  through `relPt`.
- ⚠ **The phone rotation (#83) must be re-verified**: the dock and the floats are new rect readers,
  and a rect is axis-aligned in screen space. 393x852 portrait, `gt_rot` both ways.
- **The warmage fits**: seven cards in a row is about 470px against a 1280px band, so #88's
  scroll remainder dissolves instead of being solved.
- **Measure the card before the font** (#88's lesson): the longest of the 59 act names must
  survive the card width at two wrapped lines; three lines is a fail, widen the card.
- The mockups were built by serializing the live board out of the running game (the hidden pane
  composites no frames, so `shots/91_part_*.html` hold the field, order strip, log and styles as
  data; the assembly script pattern is in the session log). **When a picture disagrees with the
  running build, distrust the serialiser first.**

**Verify when built:** `LINT()` 0 · `regress()` all eight fights · the harness card sweep reads 0
overlaps and 0 clipped cards at all three camera stops · hotkeys 1-7 land visibly on archer,
Captain and warmage · word count at round I lands near 60 against 262 · board share ≥ 85% against
57.8% · UNDO restores hex+facing+budget exactly and refuses after a parting swing, a reveal and a
bloom trigger · default-move and hover-attack click paths on a reach weapon, a range weapon and
inside a scrum · the capsule counts track dead/fled/downed/routed correctly · the mood table shows
exactly the four modifier rungs · a routed body flies the flag on token and rail both.

---

## Standing rules for whoever picks these up

> ### ⛔ Nothing in this file gets built straight from the entry.
> **Every entry here is a specification, not an instruction.** Before writing code for any of them:
> **(1) write out the actual rules** — costs, targets, cooldowns, limits, what it takes away —
> and **(2) show a picture of where it lives on screen. The picture is mandatory.** Then build,
> and **(4) write its section in [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md).**
> Set by the user 2026-07-31: *"That way we keep it clean and don't do extra job."*
> **⚑ Make the picture in the game** (`shotBoard()` a real practice-field board) when the thing has
> a screen already; hand-draw only when there is nothing to photograph; **two or three panels, not
> seven.** Full version in [README.md](README.md) §5.

- **Two AI brains.** `aiTurn` and `autoStep` are separate. Every behaviour change goes in both.
- **A shipped feature is not finished until it has a `WHAT_TO_TEST.md` section** — how to reach it
  in three steps, what should happen, what would be a bug, what feedback is wanted. That file is
  the user's, read with the game running; a session writes to it and takes no instructions from it.
- **Anything that must appear in a `shotBoard()` picture is an `<img>` with a data URI**, never a
  live `<canvas>` — `innerHTML` copies the element and not its pixels, so a canvas serialises as a
  blank box. #51's portrait was blank in every gate picture while the running build drew it
  perfectly. **When a picture disagrees with the running build, distrust the serialiser first.**
- **A one-shot flag is set from the RETURN of the thing that fires it, never before.** "Remember
  that this happened" and "make it happen" must not be two statements that can come apart — #51's
  DESPERATE line marked itself spent, lost the round to a collision, and could never fire again.
- **Never use `window.confirm`/`prompt`** — they are blocked in the published artifact. Use `ask()`.
- **Any new side-`you` non-roster unit** must be excluded from the "is this one of mine" tests in
  `render()` and `inspect()` (`!u.ally && !u.pet`) or it will crash on `CLASSES[undefined]`.
- **Any new fight** needs an `AFTER` entry in the same edit, or it prints another fight's aftermath.
- **Show a state, hide the number.** New systems get a named state on the surface and the scale on
  hover — see the interface rule in the concept.
- **Cost every new choice against the pillar**: the good path exists but never gets everything; bad
  deeds actually pay; good deeds do not secretly pay better; consequences are personal, not a meter.
- **Run the seven-fight regression** after anything that touches combat, and remember the harness
  must call `checkEnd()` between turns or hold-disposition fights read several rounds long.

---

## 108 - The Three Bells brawl: the intro fight

> 🚪 **THE FRONT DOOR** and ⚔ **THE FIRST FIGHT** - a scripted tavern brawl between the prologue
> and the world map. **SYSTEMS** a new fight kind `tavern` · a walled 9x7 room on the 15x13 board ·
> new obstacle words (`bar`, `table`, `stool`, `door`) · a `drunk` status · mid-fight waves (the
> first in the game) · a spotlight teach layer (also the first) **RELATED** #86 (this IS its
> pacing fix) · #39 (covers its battle beat: the crew is met in action, not in a modal) ·
> #60 (its lessons stay in Blood on the Road, muted here) · #3 (parked: "gives the tutorial
> fight a cause" - this entry is that cause, without the mutation)
> **STATE** built this session (8f.135), by the user's direct order, working autonomously.

### The user's ask, 2026-08-12, verbatim (voice transcription, trimmed of filler)

> "create introduction ... like Banner Saga where it starts in the small environment like a tavern.
> So you will need to create a design for this tavern and maybe some tables and chairs as objects.
> And it should be definitely much, much smaller than current field. And first it starts 1v1, and
> your opponent is quite drunk. And then ... after kind of beating the point, he's running. So
> expand moral. And then his kind of friends arrive, to also disengage and put yourself in the
> corner where the only one opponent can get you. And at some moment your friends arrive, so we can
> build like nice and smooth showing how it works. ... It will teach you about some skills like
> kick and control, so it feels already a little bit different. From importance, I want to start
> with human. And then when friends arrive somewhere with the [ratkin], so we can introduce new
> race and maybe some class skills. So it will be a lot of introduction, but it's important:
> introduction moral, armor, skills, etcetera, diversified, quite a lot scripted. And also a lot of
> these education things: ideally not just the guy saying about moral, but maybe we can just
> highlight only this part of moral and say, hey, this is moral, it works like this, and this is
> armor, works like this. And their skills work like that. Not too much text, but short amount of
> text, but clear arrows: where is it and how it works."

**Two interpretation calls made while the user was away, both to be reviewed:**
1. The transcription says "the correct king". No korrigan race exists; the game's three peoples
   are human, ratkin, ogre, and the starting crew is deliberately four humans. Read as **the
   ratkin**. The new race arrives as **a one-off ratkin ally** (a Three Bells regular who joins
   the brawl and goes back to his drink), NOT a new crew member, so the canon "the crew is fresh
   humans and Blood on the Road is where the island corrects them" stays intact.
2. The other arriving friend is **Vesna Kolb**, deployed as her real roster self. The lore already
   names her: "a woman who was already standing". Receipts carry: blood she loses here she keeps.

### The collision with the clarity pass, named honestly

The pass rule says NOTHING IS ADDED. This entry adds a fight, a status, a teach layer. It is
built anyway because the user ordered it directly on 2026-08-12, and because it is the pacing fix
complaint B asked for: today the opening drops eleven lessons, allied NPCs, facing, engagement,
nerve, cooldowns and a side-pick into one four-round fight. This entry moves the teaching into a
1v1 that grows one system at a time, each introduced by the fight's own script. #86's measurement
still stands: Blood on the Road should get LIGHTER after this exists (its lessons stay live today;
cutting them is #86's own call, not this entry's).

### Where it sits in the run

`prologueEnd()`'s outcome card currently ends on one button, `go:enterWorld` (the only caller of
`enterWorld`). It becomes `go:()=>startBattle('tavern')`. The brawl's aftermath chain ends by
calling `enterWorld()`. So: prologue cards -> the joke -> the coin -> **the brawl** -> "Morning.
The east road." Nothing else moves. Continue-from-save never touches any of this.

**The cause:** the lord's coin is on the table. Harl, a carter deep in his cups, has watched a
ruined man in good iron take forty crowns for work Harl was not offered. He says so. He swings.
All three prologue outcomes (coin, good joke, bad joke) funnel here; the card bridges in one line.

### The room (the picture gate is paid with staged shots in shots/108_*.html)

15x13 board, walled to a 9x7 room, interior cols 4..10 x rows 4..8 plus the door notch. Outside
the walls: void (painted near-black, all `wall`). New terrain row `tavern` with a pinned seed and
`layout:'tavern'`; `makeObstacles` gets a hand-built branch, no pattern roll. New words, all
registered in BLOCKED and HEIGHT and painted in `paintTerrain`:

| word | walk | height | meaning |
|---|---|---|---|
| `bar` | no | TALL | the counter, top wall; stops arrows and reach-2 thrusts |
| `table` | no | MED | COVER (-14), same rule a lone boulder taught in #82 |
| `stool` | no | LOW | blocks a body, never a shot |
| `door` | yes | - | one gap in the east wall; Harl's exit, his friends' entrance |
| `fire` | (existing) | LOW | the hearth, west wall |

The southwest corner is the taught pocket: wall + hearth + a table + a stool leave a hex with
EXACTLY ONE open neighbour. Verified with the game's own `nbrs`, not by eye, in the staged shot.
`openPockets()` is skipped for the tavern layout (the room is not reachable from column 0 and must
not be flood-converted to rock). `terrainCheck`'s choke>=2 expectation does not apply: one
chokepoint is this board's entire lesson.

### The script, five phases

A tavern controller (`TUT` state object on `B`) advances on the `capTick()` seam plus explicit
hooks; every unit obeys the normal engine (`aiTurn` untouched apart from honouring the flags).

| phase | trigger | what happens | teaches |
|---|---|---|---|
| 1 | fight start | You (roster Captain, sword+jack) v Harl (drunk, club, low nerve). | move, swing, DRUNK status, armour soak |
| 2 | Harl at <=55% blood, or round 4 | forced nerve dump through `mor()`: the real ladder empties, he routs; controller steers his rout to the door, he yells, `fled` | NERVE: the bar visibly empties before the body gives |
| 3 | Harl exits | wave 1: Brakk, Osper, Tull spawn at the door (sober, clubs and fists, mid nerve). 3v1. | outnumbered; the corner pocket; KICK (human race skill, push 1) |
| 4 | start of round +2 after wave 1, or Captain <=45% blood | wave 2: Vesna stands up by the bar (roster, spear), Chitt stands up from his corner table (ratkin ally, knife). 3v3. | the crew arrives; new race (ratkin, POISON THE BLADE); class skill (BRACE AND SHOVE, push 2, no parting swing) |
| 5 | all foes fled or downed | small LOOT, AFTER card, then `enterWorld()` | - |

Waves use the mid-fight spawn recipe (the first in the game): `B.units.push`, splice into
`B.order` after `B.idx`, disposition refresh, `render()`. Spawn happens in the same tick Harl
exits so `checkEnd` never sees an empty foe side.

The `drunk` status: new STATUS register entry, badge on the head token; -12 to hit and -8 dodge
inside `hitBreakdown`, both AI brains get it free since they read hitBreakdown. Whole-fight
duration.

Mercy is off (`B.noMercy`, read where checkEnd's mercy branch fires): routed brawlers scramble
out the door as `fled` instead of begging, so the fight ends won, not in a MERCYASK card. No
withdraw (`NOWITHDRAW`), no ambush, normal battle music. Defeat is authored, not run-ending:
`BEATEN.tavern`, you wake on the floor, the coin is still there, east road anyway; no scar from
fists and floorboards.

### The teach layer (new, reusable): spotlight steps

A dim layer inside `#stage` (z 61: above battle chrome at 39-41 and card popovers at 60, below
the retired `.coach` at 70 and `#gtTip` at 99), with a bright cutout over one real element, a
short card in the BG3 voice, an arrow from card to cutout, click anywhere to advance. Positioning
via `relPt(target, stage)` so phone rotation and scaling are inherited; nothing measured in a
zero-size frame (guard and skip). Input while a step is up: the layer swallows pointer events;
`B.tut` is checked in `clickHex` and the keydown handler. NOT `B.busy` (the stall watchdog
force-clears it after 8s and logs a regression). Steps only open when it is a player unit's turn
and the board is quiet.

Eight steps, each 1-2 sentences, anchors in order:
`#bActions` (how to act) · Harl's hex (DRUNK) · `#bArm` row (armour soaks first) · `#bState`
(NERVE, fired as Harl breaks) · the pocket hexes (corners make them come one at a time) · the
KICK card (`#bActions .act` by act key) · the rail heads of the two arrivals (the crew) · Vesna's
BRACE AND SHOVE card on her first turn. The old learn/whisper tiers are muted for this one fight
(`B.tutMute` checked in `learn()` and `whisper()`), so the eleven Blood on the Road lessons stay
unconsumed and fire there as today.

### What a new fight kind owes the tables (all paid)

foe dispatch arm in `startBattle` · `FIELDS.tavern` + `TERRAIN.tavern` (pinned seed, no pool
roll) · `AFTER.tavern` · `LOOT.tavern` (>=1 haul row for LINT 9c) · `BEATEN.tavern` ·
`NOWITHDRAW` · deployment branch (Captain alone, fixed hex) · `SIM_FIGHTS` entry (practice field)
· LINT passes 14860/14876/14884/14902.

### Save shape

`G.tavernDone` in the flags blob (`saveRun`/`loadRun`). The aftermath's continue calls
`enterWorld()` when the world was never entered. A run saved mid-act never replays the brawl.
Practice-field replays run under `SIM.on` and touch nothing.

### Open remainders, on purpose

- #86 still owes the measurement and the cut of Blood on the Road's lesson load; this entry makes
  that cut safer, it does not perform it.
- The spotlight layer is built generic (anchor + text + trigger) but only the tavern uses it.
  Whether map/company screens want spotlight steps is a later ruling.
- Marrow and Ilka are named in the aftermath prose, not deployed; four bodies in that room is
  already the ceiling.
- The user reviews interpretation calls 1 and 2 above when back.

## 111 - The Three Bells brawl, round two: the user's nineteen points

> ⚔ **THE INTRO FIGHT** - the first correction round on #108, off the user's play of it
> (2026-08-12, two annotated screenshots). **STATE** built the same day, 8f.138.
> His points, near-verbatim and in his order; every one shipped unless marked:

1. When circled, show the option to disengage *(the CIRCLED spotlight, on the DISENGAGE card)*
2. Fix: got an opportunity attack even when disengaged *(resolved by point 8's redesign: clean
   movement now covers the WHOLE turn, and the teach says disengage first, then move)*
3. Show armour and health teach when YOU first receive damage, not the enemy: his bar blinks
   too fast
4. Add one more free row to the battlefield *(interior rows 3..8 now, bar against the new north wall)*
5. When the enemy is running, make his status clear: breaking means running *(the BROKEN
   spotlight on Harl's own hex)*
6. When circled 3-on-1, message: moving now pays opportunity attacks; use disengage first, then
   move *(the CIRCLED text)*
7. More 1:1 pockets: keep lower-left, add higher-right and lower-right *(three pockets now, each
   verified to exactly one open neighbour)*
8. **Change disengage: free of engagement and zone of control for the rest of this turn's
   movement, no bonus step; instead +1 hex of movement NEXT turn** *(global, all battles)*
9. When allies join: all three crew members join, they follow the journey after
10. When allies join: explain backstab and flanking, offer one free movement to get behind a
    thug *(THE WRONG SIDE spotlight + one extra action, granted at the Captain's next turn)*
11. Battle cursors: magic for a working, arrow for a shot *(cCast spark, cShot arrow)*
12. When captain and an ally both have an enemy in reach, teach KICK as the first synergy
13. The first skill spotlight says these are YOUR skills: move and fight, win with them
14. Delay the teammates' arrival one more turn *(wave two at wave-one round +3)*
15. **No ratkin allies** *(Chitt deleted; supersedes #108's interpretation call)*
16. Before allies join, the watchers beat: strangers exchanged looks and drew weapons; on this
    island most prefer watching unfairness to joining a lost fight *(polished, THE ROOM IS
    WATCHING)*
17. Only one ogre joins with the crew: the barman, saving his property, with a short race intro
18. 20% smaller font for chance-to-hit and damage *(9.5px to 7.6px, both)*
19. UNDO MOVE directly above END TURN *(bottom 102 to 72)*

**Found while building:** the round-two furniture let ONE body standing west of a broken Harl
seal his whole path to the door, and the straight-line flee paced in place for a fight-long
stall that ended in a forced hunger retreat (which would also have skipped enterWorld). Three
fixes: the mid-room east lane stays open (no table at 9,6), tavernFlee walks a real
door-distance field with a two-turn stuck-breaker, and the brawl is exempt from battle hunger.

---

## 122 - The after-battle screen, on the Battle Brothers shape

**STATE: ✅ SHIPPED 2026-08-12, build log 8f.149, after three user rounds on the mockup in one
day. The record is [`CHANGELOG.md`](../CHANGELOG.md) 8f.149; the test bench section is in
[`WHAT_TO_TEST.md`](../WHAT_TO_TEST.md). This spec stays as the reasoning and the verbatim
rounds.**

**The order, 2026-08-12, verbatim (with his Battle Brothers victory-screen screenshot attached):**

> *"Hey, I want rework after battle sreen*
>
> *a) The biggest block*
> *1) I love battle brotheres info. It gets you in one go - who did what (kills, damage dealt,
> damage recived, expirience gained)*
> *2) Who get ingjured (red bluddy squere)*
> *3) Who get lvld up*
> *4) Who died*
> *I like protraits here*
>
> *b) Try to put on the button on the sreen - what did we get. You can also even show picture of
> artifact, how it would be in inventory*
>
> *c) And as optional accordeon below - enemies, who we killed*
>
> *d) The things from second screen (like direct lvld upd delete) so far*
>
> *f) choice what to do with prisoners lets put as independent desigion on second screen. It is
> optional and only after some of fights"*

This is the 📜 **aftermath surface of the clarity pass's screen pass** (step 3 of the work order),
arriving as a user brief with a reference picture, the same door #91 came through for the battle
frame. The reference is Battle Brothers' victory screen: a grid of crew cards, portrait plus four
numbers each, with state told by the FRAME of the card (bloody border = injured, gold arrow =
levelled, greyed = dead), tabs for Statistics / Loot, one Continue.

### What the screen is today, so the rework knows what it replaces

Two beats inside `consequences()` (see the long comment "TWO BEATS, NOT ONE LEDGER"):

1. **Beat 1, WHAT HAPPENED**: the encounter's own aftermath prose (`AFTER[kind]`), then
   `battleReport()`: two text columns (YOUR COMPANY / AGAINST YOU), grouped rows, "N down /
   unhurt" plus "dealt" per row, then the CARRIED OFF list, one button through.
2. **Beat 2, WHAT YOU CARRY AWAY**: mercy (the begging enemy, `MERCYASK`, exists on some fights
   only), the haul receipt (auto since #55), the field choice when the fight has one, and the
   promotion block (one random hero levels every fight; stat pick or perk pick inline), the books
   line, the road button gated by `markGo`.

### The mapping, point by point

**(a) The crew grid.** Beat 1's two text columns become a grid of per-person cards, portraits on
them (the faces already exist for everybody: `faceURI()` / `bustFor()` paint the battle rail's
heads, painted portraits for the named cast, busts for hires). Per card, THREE numbers, not BB's
four, and the missing one is the honest one:

| BB column | RabbleBound | source |
|---|---|---|
| kills | ☠ kills | `u.killsShown` (the `notally` rule holds; men/beasts split stays on the sheet) |
| damage dealt | ⚔ dealt | `u.dealt`, rounded (body damage only, the #94-era rule) |
| damage received | 🩸 taken | ⚠ NOT TRACKED today. Add `d.taken` in `strike()` at the same line that feeds `a.dealt` (~9240), the one door both numbers already pass through. Downed bodies show their real accumulated number, not the 0.7 write-off |
| experience | (none) | ⛔ **RabbleBound has no XP.** Levelling is one random hero per fight. No fake column; the gold arrow badge carries "who got better" |

Card states, told by the frame exactly as in the reference: **red bloody frame** = carried off /
scarred (the scar's name printed small on the card; a fenwater condition marks here too), **gold
arrow badge** = the promoted one, greyed = nothing (⛔ crew cannot die in battle: a fall is a scar,
see the standing comment in `strike()`; the "who died" column of the reference belongs to the
ENEMY accordion below). The CARRIED OFF prose list and its italic "replacing him is cheap" line
fold into the frames; the carrier bond line (`#38`) still writes, it just is not read out here.

**(b) The loot strip.** "on the button" read as **on the bottom**: the haul receipt moves onto
beat 1 as a strip at the foot of the grid, name + effect + the books delta in the game's own
glyphs (◉ ❦ ▤ ◈). ⚠ **"show picture of artifact, how it would be in inventory": the inventory has
no item pictures anywhere in the build.** Phase 1 ships the strip with glyphs and the item's text
row exactly as the inventory writes it; item art is his optional follow-up ("can also even"), his
generator pipeline, and it lands in the strip's reserved square when it exists.

**(c) The enemy accordion.** Collapsed line under the loot strip: "THE FIELD THEY LEFT · N dead,
M fled". Open: the foe side of `battleReport()`'s grouped rows (name ×N, the BESTIARY tag or
class · race via `kindOf`, dead/fled split). Collapsed by default, remembered per session, and it
is the one place "who died" is a true sentence.

**(d) INTERPRETATION CALL ONE, and it decides the flow.** Read as: *the second screen's forced
blocks (the direct level-up pick) are deleted for now*. So: the promotion CHOICE leaves the
after-battle flow. The level still happens (arrow badge on the grid), the stat/perk pick moves to
the sheet/INVENTORY, where "Decide later" already banks perk points today; a stat level banks the
same way (small ▲ on the sheet until spent). **On the roughly half of fights with no mercy and no
field choice, the whole flow becomes ONE screen**, which is the kind of cut the clarity pass
exists for. ⚠ The other reading ("keep the second screen as is for now") is cheaper and also
consistent with (f); the mockup draws reading one, and the call is his.

**(f) The decisions screen.** Mercy (prisoners) stays an independent decision on the second
screen, exactly as gated today (`MERCYASK`, some fights only), alongside the field choice when
one exists. The second screen appears ONLY when at least one decision exists; otherwise Continue
on screen 1 goes straight to the road (`afterPromotion()` path unchanged, `markGo`'s
un-softlockable contract inherited).

**INTERPRETATION CALL TWO: the prose.** BB's screen has no story text; RabbleBound's aftermath prose
(`AFTER[kind]`, the spare line, the epilogue hooks) is canon voice and some of it is
load-bearing (#108's coat man, the cage). The mockup keeps the title plus ONE compressed
paragraph above the grid. If he wants the pure BB ledger, the paragraph goes and the epilogue
cards carry the story alone.

### What this entry must NOT do

- No XP system, no new resource, no new art dependency to ship (item art is a follow-up slot).
- `takeMercy` / `takeLoot` / the promotion arithmetic are appliers with one door each; the rework
  moves their SCREENS, never re-derives their logic.
- The tavern brawl's aftermath (`tavernAfter`, "one card, not an inventory pass") and defeat/
  epilogue paths are out of scope.
- `regress()` and the QA harness read nothing from these screens; nothing to migrate.

### The gate

Mockup: `shots/122_after_battle.html`, three panels on the game's own CSS: screen 1 with the
grid, strip and accordion (closed and open), screen 2 with the two decisions, and the one-screen
case. Numbers in the mockup are a real brigand-fight shape (6 crew, 16 rounds is his screenshot's
line, kills/dealt/taken sum sanely).

### Round two, 2026-08-12, the user on the first mockup, verbatim

> *"more yelowwish design as global map*
>
> *Don`t give choices about artifacts get - just give artefacts*
>
> *Show as accordion and proceed will work (as in real game - so i can actually click*
>
> *Add near recived xp - i will add it in the futrue - for current stuff you can just hide it*
>
> *you don`t need to show all your recorces at the end of battle screen*
>
> *And how it would look - as if someone is down and have a lvlup?*
>
> *When down - maybe more blood around*
>
> *Also, make if someone dead also spaesial design - it would work for future"*

**What each point rules, and the mockup was rebuilt to all seven:**

1. **The palette is the map's gold family** (`--g0..--g4`, ground `#100c06`), not the battle
   screen's teal. The whole card, the grid, the strips.
2. **⛔ LOOT IS GIVEN, NEVER CHOSEN.** This deletes the field choice ("AND WHAT IS LEFT OF
   THEM") from the flow entirely, which is bigger than a screen change: the decision rows in
   `LOOT{}` stop being questions. Build note: fold each fight's decision rows into its haul pool
   (they become hauls, drawn by the same `pickOne`) or retire them; the appended leave-it row
   dies with the question. `takeLoot` stays the one applier. Screen 1 shows the given items as
   strips (multiple strips are fine); the reserved ART SLOT square stays for his future item art.
3. **The mockup must CLICK like the game**: accordion toggles, proceed moves to screen two, a
   mercy pick settles in place (picked/notpicked, the road button lights), road loops back. Done
   in the rebuilt page; the build inherits `settle`/`markGo` semantics unchanged.
4. **An XP slot exists on every card and is HIDDEN** (`.x`, `display:none`): he will add XP
   himself in the future; the layout is ready and nothing shows today.
5. **No resource totals on the after-battle screen**: the `booksLine` (◉ crowns · ❦ provisions ·
   ▤ salvage · ◈ gems · mood) is CUT from this flow. The receipt shows only what was GAINED.
6. **Down + level-up stack on one card**: blood frame + gold arrow badge together (Skree in the
   mockup). The states are independent layers, not exclusive.
7. **More blood when down**: drips off the top edge, a pool behind the portrait, a smear low
   right, heavier inset. And **a DEAD state is designed now for the future**: ash-dark card,
   darkened face under a ☠, greyed name and numbers, "dead on the field". ⛔ Nothing in the
   build kills a roster member today (#34 owns that chain); the state ships as CSS waiting for
   its first corpse.

**Interpretation call one stands unchallenged through round two** (the promotion pick leaves the
flow for the sheet; the arrow badge is the after-battle's whole statement about a level), and
call two (the one compressed prose paragraph above the grid) survived the rebuild. Screen two is
now the prisoners and NOTHING else, so it exists on exactly the fights where `MERCYASK` fires.

### Round three, 2026-08-12, the approval and the build order, verbatim

> *"if you get resourses - show it simplier, nt as artifact*
>
> *Show name of your company*
>
> *Maybe text on the top a little bit less wide*
>
> *and everething else good - push it to a main build, when it is unlicked"*

Three fixes and a green light. **"when it is unlicked" is the prototype lock**: another session
held `claim.ps1 lock` for the choice-weight pass when the order arrived, so the build waits for
the lock, not for anything else.

1. **A resource haul is a plain receipt line** (mono, "◉ +45 crowns · their purses..."), no box
   and no art slot. The boxed strip with the reserved ART SLOT square is for GEAR only.
2. **The company name on the card**: `G.coName` (the #119 pick), mono caps kicker above the
   title.
3. **The top prose is narrower**: max-width ~540px, centered, on the paragraph only.

**Build rulings settled while implementing (the spec is the record):**

- `strike()` grows `d.taken` beside `a.dealt` at the one line both pass through: the 🩸 number
  is accumulated body damage, so a downed body shows what it actually took, not the 0.7
  write-off.
- The promotion pick leaves the flow: a perk level banks `perkPoints` (machinery exists), a stat
  level banks `p.statPoints`, and the sheet's WHO THIS IS tells become the spend buttons when
  points wait. The card keeps hover; a click spends.
- **The two remaining decision-row questions die with their prices, per the standing rule above
  ("drop the price with the question")**: clash's "Bury what is left" and mother's "Drag her
  clear" are retired (their −1 day was the question), mother's gem-cutting folds into the hauls
  with its morale tax dropped. `lootIsChoice` and linter 9c stay as the guard that no future row
  smuggles a tax into an automatic haul.
- The DEAD card state ships as CSS keyed on a field nothing sets (`p.deadBattle`), waiting for
  #34.


## 133 - The company sheet on the one-screen shape (the 🎒 company surface of the clarity pass)

**SHIPPED** 2026-08-13 (#133 / 8f.161), designed and built the same night. **STATE: IN THE GAME**,
with two named remainders at the foot of this entry. Round one was the template, by his order;
his second order the same night (*"so can you update it according of spec first as prototype - use
a lot references"*) built it. `shots/133_company_sheet.html` is the clickable template (his order mid-session: *"and of
course strart from building design tmmplare, as usssual, rather the updating mian file"*), with
`shots/133_current_capture.html` beside it, the live screen serialized out of the running build.
⛔ **The prototype is untouched. Nothing ships until he has looked at the template.**

### The brief, verbatim (voice transcript, 2026-08-13, errors his)

> *"The main problem too much information and not clear whic one is important and what means
> what. Good examples of screens: Urtuk [and Caves of Qud], I actually like that there is on one
> screen information about stats and characteristics and character and artifacts. And Battle
> Brothers, another example, I like clarity of information, using this to work with workspace
> quick ability to move many many things in one tab. mentally think we should spend less space
> for inventory because it will be just, like, in general, smaller and maybe a bit more space to
> the history of character. Yeah. But it's maybe nice to start screen with main studs [stats].
> And inventory, I think this current picture of character is too ugly. Maybe we can just paint
> very simplified picture of human or red [rat] or ogre and also place artifacts on top of it
> as, for example, inventory in case of good [Caves of Qud]. And, also, then I think it will be
> more manageable to show transformations or injuries. Like, this body part, they can do it,
> you know, red or maybe some kind of sticks on it or something, so it will be visually. Also, I
> think maybe it's nice to show small icon of this character, how it looks important and how it
> actually looks on battlefield. So person has a more clear understanding. choice of perks in
> separate tab because I feel we will have, like, quite proper perk tree. It's still in process.
> So it's, like, in other tab on character screen. So one could be always inventory, and the
> other could be with, like, inventory and character information. And another would be with,
> like, for example, tab with perks. Yeah. Or maybe character information. you've seen on both
> of the screen and then the active tab changes between inventory and perks. So I can actually
> choose passive development seeing all kind of stats. What I like from Battle Brothers and I
> see, like, active skills for a pers... character. I think it's nice. make SKF of good, case of
> good [like Caves of Qud]. And also make it like the shape of armor. So from the positioning, I
> understand what is what is happening versus belongs. And also add maybe one bag to inventory
> or one or maybe even, like, two slots for for for bags, like, for throwables or some other
> stuff. Maybe change weapons, maybe just one bag of it. And, yeah, Okay. Much shorter
> description of skills, like do it as in battle, kind of extended version as in battle when you
> hover, but not more. Maybe if... yeah. But what happened directly on on... in the bottom and
> also guardian options mutations and and injuries. And, definitely, it should be shown
> somewhere very simple, like, a small icon and what it does. And, also, if it's nice if it's
> showing on the body image. If not, it's also kinda fine. that they... there don't need extra
> extra space. Like, I mean, like, characters, descriptions right now, they're too big and
> taking that much space and not that much actually useful information. Find a way to make it
> more compact. I mean, I like button brothers in this case."*

He attached five reference screenshots: Wildermyth's gear screen, Battle Brothers' inventory,
Caves of Qud's paper-doll equipment tree, Wartales' companion sheet, Urtuk's roster screen.

### The measurement (taken in the running build, his day-1 save, restored after byte-identical)

The screen is `#inv`: roster 224px + sheet 756px + stash 300px, window 678px tall.

| what | measured |
|---|---|
| day-1 Captain's sheet | 880px tall, 309 words |
| L4 spearwoman, 2 scars, 1 change, 2 memories, banked level + perk point | **1241px tall (183% of the window), 564 words** |
| the SKILLS block alone (the battle says the same in a hover) | 281px, **230 words** |
| where the four stats sit for that character | ~520px down, below the history prose |
| gear | a 2x2 TEXT grid, 132-194px, nowhere near the body |
| the doll | 88x128 grey wireframe boxes, all knowledge hover-only |
| perks | inline cards + drawer, 173px, and the real tree still to come |

⚑ The sheet already starts stats-last: identity prose, history, scars, THEN the tells. His
*"start screen with main stats"* is a straight inversion of the current order.

### The design, as built in the template (one screen, no scroll, 676px measured)

CENTRE, top to bottom: **head** (name, three chips, one personality clause, ON THE FIELD tile =
the battle's own `sprite()` unchanged) → **stats band** (four tells + the battle's three bars +
the swing line; a banked level spends on a tell, as #122 shipped it) → **the body zone** (the
doll IS the gear map: race silhouette with four slots anchored to the parts, off hand SHOWS the
two-handed conflict; scars as red marks on the part + red chips beside, a change glows teal and
names the skill it grants, medicine chest under the chips) → **skills** (the battle's cards:
icon, damage, cost pips on the face, the battle's own pop on hover, receipt + one effect
sentence, nothing longer; MOVE stays off the sheet) → **the story** (two memories + the roads
walked, up from one line, accordion for the rest) → dismiss, small, last.

RIGHT PANE, tabbed: **🎒 THE STASH** (unchanged grammar: click item to equip, click worn slot to
strip) / **★ PERKS** (the whole tree by level rails: TAKEN · CLICK TO TAKE · NEEDS A PERK POINT
· LEVEL N; the future proper tree grows into this tab and nothing else moves that day). ⚑ The
★ tab carries a BADGE with the banked point count, visible from every tab, so the old
"invisible perk point reads as a broken screen" lesson survives the tab wall.

ROSTER RAIL: not in the brief, untouched except the trait line it said twice.

Race dolls: one anatomy per race (wide-low ogre, small hunched tailed ratkin), silhouette not
boxes, and **the battle sprite stands in the frame corner as calibration: the doll should rhyme
with the figure on the field.** Marks land on the part: red slashes = scars, teal glow = change,
dashed teal ring = condition still running.

### What deliberately does not move

The click grammar · the medicine chest and dismiss doors (address change only) · both
spend-a-point flows · every existing hover card (race, class, trait, tells, nerve ladder,
gear tips) · the Captain's PET slot (joins the doll as a fifth box, his sheet only) · the
roster rail · `drawInv()` remains the one renderer, `SLOTS`/`GEAR`/`effStats`/`unitFrom` remain
the one source; the reshape is presentation only, band-clean.

### ⏸ PARKED for his ruling: the bags

He said *"add maybe one bag... or maybe even two slots for bags, like, for throwables or some
other stuff. Maybe change weapons, maybe just one bag of it."* The honest finding: **the game
has no throwable and no mid-fight weapon swap rule**, so today a bag slot is furniture with
nothing to do, and the clarity pass forbids adding it as decoration. If he rules the bags in,
they come WITH their rule (swap in battle at an action's cost, Battle Brothers style) as their
own numbered entry. The template reserves the floor space under the OFF HAND box and says so.

### Open questions put to him on the template

1. Doll style: are the silhouettes the right amount of picture, or closer to painted?
2. Default tab: THE STASH always, or PERKS whenever a point is banked?
3. Should both spend moments (stat levels on the tells, perks in the tab) live in one place?

### For the build session, when he picks

- The build is a `drawInv()` rewrite plus CSS; no new state, no new rules. The doll painter
  (`drawDoll`) grows the race silhouettes and keeps `partOf`/`MUTPART` marks; slots become
  positioned children of the doll box; the skill row reuses the battle's `.act` card markup and
  `noteLine()`; the perks pane reuses the perk card builder with `TREEOPEN` retired.
- ⚠ `whisper('hands')` fires from the slot loop today: keep the teach line alive wherever the
  TAKEN state renders.
- ⚠ The sheet is also reached from the promotion flow and the "NEW KIT" nag (`iNag`); both must
  survive the tab wall (equip nag belongs to the STASH tab, a banked point to the ★ badge).
- Measure after: the target the template sets is **no scroll for a 2-scar, 1-change, L4 body**
  at 678px, and the fold rule for richer bodies is that STATS and the BODY never leave it.


---

### WHAT WAS ACTUALLY BUILT, 2026-08-13 (8f.161)

Everything in the design above shipped, verified in the running build with the user's save backed
up and restored byte-identical. **1241px / 564 words became 678px / 242 words, no scroll**, for the
identical character.

**Where the code is.** `drawDoll` is a parametric silhouette (`DOLLBODY{}`, one anatomy with a
per-race row) and **exports `cv._anchor`, the joints it actually drew** - that is what makes the
Qud layout honest, because a leader pointing at a hardcoded coordinate lies the moment the ogre is
wider than the human. `drawInv` renders head -> stats -> body -> skills -> story and then places
the slots as positioned children of `#iDollBox`, drawing the leaders into `#iWire` from the
anchors. `.iact` is `.act` re-cut for a parchment ground (deliberately NOT the class itself:
`.act` is 72x86 and tuned to the board's dark band). `ITAB` lives outside `drawInv` for the same
reason `TREEOPEN` did: buying a perk redraws the sheet.

**Two things arrived from his reference screenshots rather than from this spec, and both are
merges rather than additions:**

- **Wildermyth's before/after** (`gearDelta`): a stash item states what it CHANGES, ▲▼, off values
  already in `GEAR{}`, and only where something is being replaced. This is the direct answer to
  *"not clear whic one is important"*: the comparison was work the player was doing in their head
  between two cards.
- **A change names the skill it gave** (`MUTACT{}`, one line per mutation): the teal card says FROM
  THE CHANGE, because *"why does this one have a skill the others do not"* was answered nowhere.

**Open remainders, both small and both named:**

1. ⚠ **The fold rule is unapplied.** Two lines, and they are written out here so nobody has to
   re-derive them: `#iBody` needs `height:232px`, and `.ibars .statLine .pv` needs
   `color:#d8d5cc`. Without the height the ledger stretches that row instead of scrolling inside
   itself, so a body carrying a change AND a condition AND the circle AND three scars AND
   ill-fitting armour measures 743px and the sheet scrolls 65px. It was left because a parallel
   session took the prototype back mid-build.
2. ⏸ **The bags stay parked** on his ruling, for the reason in the spec above.

**And the process lesson, which is the expensive half of this entry:** the lock was taken
legitimately (expired at 8.2h) and taken back by the other session mid-build, which then committed
this work itself as *"in progress, carried from the parallel session"*. ⛔ **An expired lock is not
a free desk.** `claim.ps1 status` reports how old a lock is; it cannot report whether anybody is
coming back to it, and 8.2h at 00:40 means something different from 8.2h at 08:45. Worth a rule:
**before taking an expired lock, check whether that session's numbers are still unspent** - nine
build numbers and nine entry numbers were outstanding, which said plainly that the session was
mid-batch rather than gone.

**And a real bug fell out of the same minute, in `tools/claim.ps1`.** The pre-commit `verify` read
a six-digit CSS colour on a new panel as a claim on another session's entry number: its pattern
guards with `(?!\d)`, which the letter after the digits satisfies. `Get-UsedNumbers` had been
hardened against exactly that trap after it once issued a stylesheet value as a backlog number;
**the hardening never reached the verify side.** Six and eight digit colours are stripped before
the entry scan now. ⚑ **One fact, two readers, and only one of them was taught** - the same shape
as the trap list's *"one map was answering two questions"*, and the third time this project has
paid for it.

---

## 137 - The seven-item pack: the receipt, the step, the red door, the doubled lesson, the token

**STATE** ⛔ specced, not built. Numbers held: **#137 / 8f.165**. Its two opening-dramaturgy items
were split out to **#138** because they are #86's territory and this one is not.

**SYSTEMS** `consequences()` · `LOOT` + `takeLoot` · `RES_ICON` · DISENGAGE (`a.k==='dis'`,
`moveBudget`, `beginTurn`) · the event choice renderer in `openEvent` · `CAPLINE`'s `learn` tier ·
`TUTSTEPS` · `#wToken .tl`

**RELATED** #86 (the first fifteen minutes; the lesson cut here is one of its named debts) ·
#122 (the after-battle screen this reward line sits on) · #111 (DISENGAGE's current shape) ·
#123 (the choice-weight pass, which is why the fight doors are worth marking) · #118 (the name)

### The brief, verbatim (2026-08-13, errors his)

> *"pack of diverse changes / improvments:*
> *-bigger what you get + show curency or object icon (screen 1)*
> *-after disingage I don`t see +1 to movment this turn (so it makes sense and easier to esacape).
> You can/t use disngage again for this and next turn*
> *-If some of the choices in event leads to a fight - make it red*
> *-delete some education from capitan, that copies tutorial stuff*
> *-combine this and next screen (after battle + consiquence). "You got offer and people. It is the
> only thing left to do". It is on one screen then - so you see only one screen after the battle
> before you start"*

and, a minute later:

> *"Additional ones for this buthc*
> *put picked at the begining name of the company on the map, instaed of "the company"*
> *"Offer to choise name after you except contract, not befor"*

Two screenshots came with it: the road-battle aftermath with a red arrow drawn at the
`+30 crowns +2 provisions` line, and THE MAN IN THE CORNER.

### 1 · The haul is a receipt, and a receipt has icons on it

`consequences()` prints the haul from `haul.c`, which is **prose the loot table hand-wrote**:
`'+30 crowns +2 provisions'`, rendered by `.abres` at **11.5px mono**. That is smaller than the
crew cards above it and smaller than the accordion below it, on the one line of the screen that
answers *what did that fight pay*.

⛔ **DO NOT PARSE `haul.c`.** Every row also carries `haul.fx`, which is the machine-readable
version of the same fact and is what `takeLoot()` actually applies: `{crowns:30,food:2}`. Build the
strip from `fx`, one chip per resource, and the prose line survives underneath as the flavour it
always was. This is the same shape as the two lessons already written down here - a fact with two
readers, where one of them is a string somebody has to keep in step by hand. **Six rows of the LOOT
tables were caught printing a price the game did not charge** (see the note above `takeLoot`); a
receipt built off `fx` cannot ever repeat that, because the chip and the payment read one object.

The icons are **`RES_ICON`, unchanged** - ◉ crowns · ❦ food · ▤ salvage · ◈ gems - because that
is the vocabulary the top bar has used since #103 and a second set of resource glyphs on the
aftermath screen would be the "one row disagreeing with itself" failure #112 already paid for.
Gear hauls keep `.abloot` and its reserved art square; only the resource rows change.

### 2 · DISENGAGE pays now, and then it is gone for two turns

Current shape, from #111: costs one action, resolves on the spot, sets `safeMove` (clean movement
for the rest of this turn) and `disNext` - which `beginTurn` cashes into `disBonus` **on the
following turn**, where `moveBudget` reads it.

The user's report is *"after disingage I don't see +1 to movment this turn"*, and he is describing
the arithmetic correctly, not misreading the screen: **the hex arrives one turn after the action
that bought it, which is one turn after the moment it was needed.** You spend an action to break
off, so you have one action left to run with, and the compensation lands after the enemy has had
its turn. That is why nobody leaves a scrum - the same complaint #72 was written to fix, one layer
deeper.

So the hex moves to **this** turn: `u.disBonus=(u.disBonus||0)+1` at the moment of the act.
`beginTurn` already zeroes `disBonus` at the top of every turn, so it stays a this-turn-only
bonus with no new bookkeeping, and `disNext` is **deleted rather than left set** - an unused field
is a second source of truth.

⚑ **The visibility is free and that is the point.** `moveBudget` is the one function every mover
asks, so the MOVE card's own receipt line (`moveBudget(u)+' hexes · 1 act'`) ticks up the instant
the act resolves, and so do the lit hexes, `aiTurn` and AUTO. Nothing has to be taught. The
DISENGAGE card's own sub-line must change with it: `+1 hex next turn` → `+1 hex now`.

The lockout is `cool:2` and **nothing else**. `spend()` writes `u.cd[a.k]=a.cool`, `beginTurn`
decrements, `onCool` refuses, and the card paints `READY IN N TURNS` over itself. Set on turn N:
blocked on N (already used), blocked on N+1 (cd 1), free on N+2. That is *"you can't use disengage
again for this and next turn"* exactly, with no new state and no new readout.

⚠ **`TUTSTEPS.circled` says the old rule out loud** (*"next turn your legs get one extra hex"*) and
must be corrected in the same commit, or the brawl teaches a rule the brawl no longer has.

### 3 · A door that starts a fight is red, and it is one gate

`openEvent` renders `'<button class="choice'+(c.danger?' danger':'')+...`, so red is **hand-tagged
per option**, and five fight doors currently ship without it: `clash` ×2 (the ratkin side and the
ogre side - the *watch it happen* door has it and the two that actually wade in do not), `armour`,
`pack`, `brigand`.

The fix is `c.danger||c.battle` in that one expression. ⛔ **Not a sweep through the tables adding
`danger:true` to five rows** - that is the hand-kept second copy again, and the sixth fight door
written next month would ship un-marked. A choice that carries `battle:` **is** the red one; the
renderer can see that without being told twice.

`danger` keeps its other job (the morally dark door: killing prisoners, taking the coin), so red
means *this is the violent door*, which covers both.

#### ⚠ CORRECTION, FOUND BY MEASURING IN THE RUNNING BUILD, AND IT IS THE ENTRY'S ONE LESSON

The gate above was written from reading the tables and it was **wrong on three cards.** Counting
`battle:` doors in the live build returns **12, not 5**, and the three the reading missed are the
three that break the rule:

| card | its doors | what red would say |
|---|---|---|
| `snare` | *"Straight down the road. Let the bells ring."* · *"Through the marsh. Slower, but quiet."* | **both** carry `battle:true`. Same fight either way; the choice is whether they are ready or you strike first. Two red doors on a two-door card. |
| `armour` | *"Face it."* - the only door | an ambush. Red on the only way forward. |
| `packev` | *"Up. Get to the gaps."* - the only door | the same. |

⛔ **So the rule is not "a fight door is red". It is: A FIGHT DOOR IS RED WHERE THE CARD ALSO
OFFERS A WAY OUT.** Red is a contrast, and a mark that fires on every door on a card is furniture -
which is the same finding as #123's duplicate-option rule and #106's *"a number that is on screen
every day gets read as furniture"*, arriving for the third time on a third surface.

It stays ONE gate, just computed per CARD instead of per OPTION - the renderer already has
`visible` in hand, so the test is whether any door on it lacks `battle:`. `danger:true` is
unaffected and still marks its own door wherever an author put it, which is how the Fen-Mother and
the sling-line keep their red: those cards have a walk-away.

⚑ **And the general lesson, which is the reason this correction is written out rather than just
applied: the five-door figure came from grepping the source, and the real figure came from asking
the running build. A table you can enumerate at runtime should be enumerated at runtime.**

### 4 · The Captain stops teaching what the spotlight just taught

#108 gave the intro brawl a spotlight layer (`TUTSTEPS`), and `CAPLINE`'s `learn` tier predates it
by two months. Four of its lessons now say, in a speech balloon, what a dimmed screen with an arrow
on it said ten minutes earlier:

| CAPLINE lesson | the spotlight step that already said it |
|---|---|
| `learn_arm` *"Armour comes off before blood... the top bar is the harness and the one under it is the person"* | `armour` *"Iron soaks a blow before flesh does. The grey bar is the harness; the red one under it is the man inside."* |
| `learn_break` *"That one broke and ran, and he is not even wounded. Nerve runs out before blood does."* | `broken` + `nerve`, both of which are about Harl doing exactly that |
| `learn_step` *"DISENGAGE is how you get out of it..."* | `circled`, which spotlights the DISENGAGE card itself |
| `learn_zone` *"You are in their zone of control now..."* | `circled`, first sentence, plus `WHISPER.parting` |

⛔ **Delete the rows, do not leave them dark.** The table's own standing note says an unused entry
is a second source of truth and the next person to edit it will believe it.

⚠ **`learn_twice`, `learn_sides`, `learn_close`, `learn_bow`, `learn_cast` and `w_rung` STAY.**
`TUTSTEPS.act` says *"Two actions a turn"* and stops; `learn_twice` teaches the diminishing return
on the second one, which nothing else says anywhere. The other four are about a bow, a spell, the
ring colours and standing alone, and the brawl teaches none of them - the Captain is the only voice
that ever does.

### 5 · The company's own name on its own token

`#wToken` is the company walking the road, and its caption is the literal string
`<span class="tl">THE COMPANY</span>` in the markup. `G.coName` has existed since #118 and
`worldTick` already paints it into `#wName`, the signature along the bottom of the map. The token
takes the name; the bottom signature is then the same fact twice on one screen and goes.

⚠ Old saves have no `coName`. Fall back to `THE COMPANY` rather than to an empty caption.

---

## 138 - The opening's post-brawl chain: four screens become one, and the name comes last

**STATE** ⛔ specced, not built. Numbers held: **#138 / 8f.166**. Split out of the #137 pack because
this is **#86's territory** - it is the front door, and #86 holds the ruling that the opening is
crowded rather than empty.

**SYSTEMS** `tavernAfter()` · `tavernContract()` · `prologueEnd()` · `nameCard()` · `proCard()` ·
`PRO_ART` · `enterWorld()`

**RELATED** #86 (the first fifteen minutes) · #118 (which put the contract after the brawl and
wrote the name card) · #134 (which took the joke door out, leaving two) · #122 (the settle-in-place
pattern this borrows from the mercy screen)

### The brief, verbatim

> *"combine this and next screen (after battle + consiquence). "You got offer and people. It is the
> only thing left to do". It is on one screen then - so you see only one screen after the battle
> before you start"*
> *"Offer to choise name after you except contract, not befor"*

### What is actually there, counted

After the Three Bells brawl the player currently clicks through **four full-screen cards** before
the map exists:

1. `tavernAfter()` - the brawl's receipt: title, the kill line, `+8 crowns`, `+4 morale`, and one
   button, *"The corner table."*
2. `tavernContract()` - THE MAN IN THE CORNER: the painting, five paragraphs, two doors.
3. `prologueEnd()` - AND THAT IS THE CONTRACT: the outcome prose, the walking-wounded line, one
   button, *"Finish your drink."*
4. `nameCard()` - A NAME FOR THE LEDGER: 7 × 7 words, one button.

Card 1 and card 3 each carry **exactly one button that cannot be refused**, which is the same
defect #118's own comment describes killing once already (*"the middle card existed only to carry a
single 'Answer the call' button that nobody could refuse"*). It grew back, twice, on either side of
the decision.

### The shape

**One card.** The brawl's receipt is a strip at the top of the corner-table card, not a screen of
its own - *you got the offer and the people* is one moment, and the player has nothing to decide
between the two halves of it.

The pick then **settles in place**, exactly the way the mercy screen has since #122: the door you
chose keeps its colour and takes a tick, the other fades, and the outcome prose is inserted below
them. ⚠ The painting swap (`PRO_ART[fx.scene]`, EV00B for `coin`) has to happen on the card that is
already on screen, so `proCard`'s art canvas must be redrawable in place rather than rebuilt.

**Then, and only then, the naming strip appears.** That is the user's second line: the name is
offered *after you accept the contract*, and it now reads as the consequence of accepting one
rather than a form to fill in on the way out. The prose already assumes this order - *"The contract
wants a name over the marks. Companies sign."* - it was simply on the wrong side of a page break.

The road button lights last.

⛔ **Nothing in the chain is deleted except the two dead buttons.** All five paragraphs of the
corner-table card, both doors and both advances (40/80), the walking-wounded line, the verdict
banner machinery, `PRO_ART` and all 49 name combinations survive unchanged. This is the clarity
pass's own instruction - **cut, delay, merge** - and the move here is *merge*, not *cut*.

⚠ **`.claude/rules/static-event-art.md` binds.** `PRO_ART.coin` is `EV00B` and stays `EV00B`; the
outcome canvas is 460x190 and stays 460x190. Do not invent a scene name and do not resize the
canvas to fit the taller card.

⚠ **`G.tavernDone`, the hp receipts, `LOOT.tavern`'s payment and the `+4` morale all live in
`tavernAfter()`** and are campaign state, not presentation. They must keep happening at the same
moment even though the screen they used to draw is gone, and `SIM.on` must still fork to
`simResult('won')` before any of it - a practice-field brawl may never reach the campaign.
---

## 158 - The shot that always hits

> ➹ **THE BATTLE BOARD** - a PERK, and it lands in the archer's tree
> **SYSTEMS** `PERKS{}` · `CLASSES.archer.perks` · `hitBreakdown` · `strike` · `canUse` ·
> both AI brains (a certainty changes what an archer is FOR)
> **RELATED** #45 (reward the combination) · #78 (a good thing you carry takes something away) ·
> #30 (the action-economy remainder) · #50 (the balance pass this must not be built before)
> **STATE** ⛔ **SPECCED ONLY, AND DELIBERATELY UNBUILT.** The user's own framing, 2026-08-14:
> *"add a skill (for the future, into the perk branch which is under development) - a Shot that
> always hits."* It is written down here so the perk pass inherits a spec instead of a sentence.

**The idea (user).** An archer act that cannot miss.

**Why it is worth having, and it is not the damage.** Measured during #157: the average chance to
hit in this game is **65.6%**, and **19.4% of every swing is under fifty**. What an archer actually
lacks is not power, it is the ability to *promise* anything - so the fight where one enemy must
drop this turn (the caster mid-gather, the captain about to rally, the body one hit from down) has
no play in it that is a decision rather than a dice roll. A guaranteed shot is the archer's answer
to a specific board, which is what a signature is supposed to be.

⛔ **AND THAT IS EXACTLY WHY IT MUST NOT BE A BIG ONE.** A certainty that also hits hard is not a
tactic, it is the best button on the bar every turn. The rule this project already has for it is
`#78`: **the cost is paid on a different axis from the benefit.** Certainty is the benefit, so the
price is damage, tempo or reach, never accuracy.

### The rules, as they should be written

| | |
|---|---|
| **Name** | THE ARROW THAT KNOWS (working title; the register wants a verb, not a noun) |
| **Where** | `PERKS{}`, offered in `CLASSES.archer.perks` at tier 3 or 4. **A perk, not a base act** - the archer must not open the game holding a certainty |
| **Cost** | 2 actions. It is the whole turn |
| **Cooldown** | 3 |
| **Damage** | **55-60% of the bow.** The shot is a placement, not a kill |
| **What it ignores** | the roll, and only the roll |
| **What it does NOT ignore** | ⛔ **the lane.** `needsLane` still applies: a wall, a body or a boulder in the way still refuses it. *"Always hits"* must mean *"the arrow does not miss"*, never *"the arrow goes through things"* - the second one deletes #82's cover and #36's lane in one perk |
| **Range** | the bow's, with **no long-band bonus**: `SHOTBAND`'s far penalty is a roll penalty and a shot with no roll would silently gain the most at the range where aiming is hardest |

### The three traps, named now so they are not rediscovered as ideas

1. ⛔ **`hitBreakdown` IS THE INNER LOOP OF BOTH AI BRAINS** (README §6). A certainty must be a flag
   on the act that `strike` reads, not a special case inside the breakdown, or every scorer in the
   game pays for it on every candidate hex.
2. ⛔ **THE PREVIEW HAS TO SAY 100% AND MEAN IT.** The aiming card prints `total`, clamped to 5-95.
   A shot that cannot miss and reads *95%* is a readout printing the wrong unit, which is #102's
   rule. The card needs a state (**CERTAIN**), not a number at the top of its scale.
3. ⚠ **IT INTERACTS WITH DODGE-VS-MISS (#84).** `strike` decides between *dodged* and *missed* off
   the same roll. With no roll there is neither, and the six lines that narrate a miss must not be
   reachable. The defender's figure must also not play its evade.

### What has to be true before it is built

- **#50's balance pass, or at least #13's harness.** *"Always hits"* is the one kind of act whose
  value cannot be guessed from the statblock: it is worth exactly as much as the current hit rate
  is bad, which is a measured number and one this pass has already moved once (60.3% to 65.6%).
- **A read of #45.** A guaranteed shot is the strongest possible enabler for a combination
  (distract, then certainty), and #45 is the parked contract for what a combination may pay.

⚑ **The cheap version to measure first.** Before building a perk, set an existing AIMED SHOT to
`aim:999` in the practice field and run the eight fights through the harness. If the win rate does
not move, the perk is a *feel* change and can be priced generously; if it moves hard, the damage
figure above is the knob and it comes down before anything else does.

---
## 174 - Experience: the level is earned, half by the company and half by the hand

> ✦ **THE WHOLE RUN** - the aftermath, the company sheet, the muster wall, the road's event chips
> **SYSTEMS** `consequences()` (the one place a level happens today) · `afterBattle()` (the per-body
> ledger it will read) · `crewCards()` and the hidden `.abx` slot · `drawInv()` (`#iChips`, the
> roster row `.rmem`, the perks tab) · `rollRecruit()` / `openHire()` (the level-0 stranger) ·
> `perkPool` / `PERKTIERS` (the tree re-keyed) · `RACEMOD` (the INT lean the modifier reads) ·
> `EVFX_ROWS` + `evFxChips` (the ✦ chip on a door) · `runBlob` / `loadRun` (one new field)
> **RELATED** the research it stands on: [`XP_BENCHMARK_2026-08-17.md`](../XP_BENCHMARK_2026-08-17.md) ·
> #122 (the pick left the aftermath flow; this entry keeps that) · #133/#136 (the sheet it lands on)
> · #157 (the muster lost its paragraphs; the level-0 row must not bring them back) · #143/#154
> (chip receipts, built beside `pay()`) · #50/#13 (the harness that measures the curve)
> **STATE** ✅ **BUILT 2026-08-17 (#174 · 8f.202), the same day it was specced**, on the user's
> "sounds good - do it". The gate picture is `shots/174_xp_ring.html`, the built one
> `shots/174_after.html`; the record is `CHANGELOG.md` 8f.202 and `WHAT_TO_TEST.md`. It is a
> user-ordered addition, like #108 and #123, and it reverses one paragraph of the concept's canon
> (§8 *"Promotions, not XP bars"*), rewritten to match. ⚠ **Written against ONE act.** Every level
> past ~4 is a promise about acts 2-4 and rising enemy tiers, and this entry does not build those.
> ⚑ **What the build changed against the rules below**: `XP_PER_HP` is **1.5**, not 2 (rule 9's
> harness put 2 at 4.7 after the eight, 1.4 at 3.8, and 1.5 lands ~4.0 / ~4.6); the crest bonus is
> `XP_LEAD` 40 on `captain:true` (there is no `boss` flag; the Fen-Mother's hitpoints already pay);
> the roster ring is 42px INSIDE the bust's own box round a 35px round portrait, because 50px
> outside it wrapped a trait clause (65 → 91 a row) - measured against HEAD in a second tab; the
> stranger is `cls:'none'` with a `CLASSES.none` row rather than `null`, so every `CLASSES[p.cls].n`
> in the file keeps working; the tavern brawl pays through `tavernAfter` into a screen with no
> crew card. Rule 3's open call stands: **the archer finishes ~a level ahead of the spearwoman**
> over the act on damage + kills, exactly the shape the peers described.

### The brief, verbatim (2026-08-17, errors his)

> *"I want to explore idea of lvls. I think in my gane it would work better to give some
> expiriences, rather then 1 lvl per battle. I want my team to be able to grew strnger and give
> this stronfernes in 1st act already. I want 3-4 acts similar size. And characters to be able to
> get to 8-9 th lvls with battles, and extra events - items. I think around 9-10 lvls. Exp probably
> could be handled in smaller numbers, first lvl 100. I think, it could be also nice have 0 lvl,
> where character doesnt even have a class. So it gives option to a playr to oick himself. I think
> +-50% of expirience shared between party. And other for individual actions (damage deat and
> kills get). Also you will need it to add to charcter screen."*

**And his rulings on the six calls the research put to him, same day, verbatim:**

> *"1) founders in a tavern already lvl 1*
> *2) When you hire someone, 1 our of 3 has lvl 0 and a bit cheaper price. So you can choose his
> class later*
> *3) random promotions goe*
> *4) On the battlfield none - it shows only after and then in the inventory*
> *5) Not that sharp climb to hire lvl, I expect not that sharp power raise for characters*
> *6) I think also intelect have a modifier to xp. Also i am thinking a bit different amount
> needed for a rat (0.8) and human (1) and ogr (1.2)*
> *7) bar progression could be shown circle as in total war"*

Reading of 5: the curve to the high levels is gentle, and a level is a small step of power. That
is the shape the neighbours with a run this length use (Wildermyth's `10×n`), and it is what today's
promotion already pays (+1 stat, or one perk), so the per-level payment does not change.

### What it replaces, and the one thing that survives

Today `consequences()` does `pickOne(G.party).level++` after every won fight, alternating a perk
point and a stat point (perk first), and the concept doc calls the randomness the point. **The
random promotion goes** (ruling 3). What survives untouched: **the alternation, the perk/stat banks
(`perkPoints`/`statPoints`/`nextIsPerk`), the ★ debt on the road bar and the roster, spending on the
sheet, and *"a reward never evaporates"*** (`perksLeft` turning an empty-tree perk into a stat).
The level is still a level; only *who* gets it and *when* is new.

### The rules

**1. Every body carries `p.xp`, cumulative, and a level is a threshold on it.**

```js
/* cumulative XP to REACH each level, for a human. Level 0 is a stranger with no trade. */
const XP_TABLE=[0,100,250,450,700,1000,1350,1750,2200,2700,3300];
/*  deltas:    100 150 200 250 300  350  400  450  500  600  - Wildermyth's triangle, +50 a step,
    and the last step is the trophy: 10 costs 600 and pays a stat.                                */
const XP_RACE={ratkin:.8,human:1,ogre:1.2};                                        /* ruling 6 */
const xpNeed=(p,L)=>Math.round(XP_TABLE[Math.min(L,10)]*(XP_RACE[p.race]||1));
const XP_CAP=10;
```

`p.level` stays stored (it is read in forty places) and is *raised* by `xp`, never derived on the
fly: after any grant, `while(p.level<XP_CAP&&p.xp>=xpNeed(p,p.level+1))levelUp(p)`. `levelUp` is
today's promotion body lifted out of `consequences()`: `level++`, then the perk/stat alternation
exactly as written, so one function pays a level whether the XP came from a fight or a door.

- **Founders start at level 1 with `xp=xpNeed(p,1)`** (ruling 1): a full ring's worth behind them,
  an empty ring ahead. The tavern brawl teaches SPEAR WALL through Vesna's trade as before.
- **The cap stops accrual.** At 10 the body earns nothing and leaves the shared split (rule 3). No
  dead tail, no veteran levels: Into the Breach's stop, not Battle Brothers'.
- **Migration:** a save without `xp` gets `xp=xpNeed(p,p.level)` in `loadRun` (a level-3 body from
  an old save reads 450 with an empty ring). No stamp bump: `party` is serialised verbatim.

**2. Intellect is the learning rate, gently** (ruling 6):

```js
/* multiplies XP EARNED. int 9 is the human middle. 5 -> .88, 12 -> 1.09, 14 -> 1.15 */
D.learn = u => Math.min(1.25, Math.max(.8, 1 + (u.st.int - 9) * .03));
```

⚠ **The race multiplier and the INT lean overlap on purpose and must stay gentle for that reason.**
`RACEMOD` already leans human `int +2`, ogre `int −1`, ratkin `0`. With both in force a ratkin learns
about 1.25× a human's speed and an ogre about 0.8×, and that spread is what ruling 6 asks for. Push
either dial and the ogre pays three times for one thing (seat 3, wage 2, and the slow ring).

**3. A fight is worth what stood on the field, and it is paid half to the line and half to the hand.**

```js
/* fight value: what the enemy brought. Read off the bodies, never a hand table per fight. */
const XP_PER_HP=2, XP_BOSS=60;
const fightXP=()=>B.units.filter(u=>u.side==='foe'&&!u.pet)
  .reduce((s,u)=>s+Math.round(u.hpMax*XP_PER_HP)+(u.boss?XP_BOSS:0),0);
```

- The **line half** (50%) is split evenly among every roster body that stood in the fight and is
  below cap: deployed, downed or not, fled or not. **Standing in it is the contribution** (Wildermyth's
  below-cap filter is the one `if`).
- The **hand half** (50%) is split by contribution `c = dealt + 15 × kills`, off the unit's own
  ledger (`u.dealt`, `u.kills`, the same three numbers the crew card already prints). A kill is a
  flat bonus in hitpoint units, never a percentage of the enemy: the peers' kill-stealing threads all
  start with a percentage. If the sum of `c` is 0 (a fight talked out, an all-flee) the hand half
  joins the line half.
- Each body's take is then `× D.learn(u)`, rounded, and added to `p.xp` in `afterBattle()` beside
  `p.fights++`, which is where every other per-body ledger line is written.
- ⛔ **On the field, nothing** (ruling 4). No float, no ✦ over a kill, no counter on the token. The
  number exists after the fight and on the sheet, and nowhere else. This is XCOM's reason for hiding
  the number applied by order, and it is also the pillar (*show a state, hide the number*).

⚠ **Two things in the brief are deliberately NOT in the hand half, and the reasons are written down
so they are not rediscovered as ideas:** damage TAKEN and the class verb (a COMMAND, a wall held, a
body carried). The peers say a damage-and-kills half starves the body that holds the line (see the
benchmark §3), and the brief said damage and kills. 👤 **His call, when the harness shows what a
spearwoman's ring does over eight fights.** The formula has one line to change.

**4. The receipt is the aftermath's crew card, and the slot is already cut.** `crewCards()` prints
`☠ kills · ⚔ dealt · 🩸 taken · ✦ 0` with `.abx{display:none}` and the comment *"HIDDEN until XP
exists"*. Flip it, print `✦ +N` (the body's own take, after `D.learn`), and the level line and the
gold `.abcrew.up` frame that already exist do the rest. A body may take two levels off one fight
early (100 then 150); the line reads the level it reached. **The pick stays on the sheet** (#122):
the aftermath is a receipt.

**5. The ring** (ruling 7). One glyph, two sizes, Total War's:

- **On the sheet**, the `LEVEL <b>N</b>` chip in `#iChips` becomes a **26px ring** with the level
  number inside: track `--e1`, arc `--gold`, arc length `(xp − need(L)) / (need(L+1) − need(L))`.
  Hover: *"340 of 450 · 110 to level 4"*. At cap the ring is full and the hover says *"as far as
  they go"*.
- **In the roster**, a **44px ring around the 40px bust** on every `.rmem`, same arc, no number
  (the row's `L4` text stays where it is). The ★ debt badge is untouched and still the thing that
  says *spend it*.
- Both are inline SVG (`circle` + `stroke-dasharray`), on the CSS scale (`--fs1` for the number,
  `--e1`/`--gold`, no new px). ⛔ **The ring is progress and never a receipt**: it never prints
  what the last fight paid, the crew card does.
- ⛔ **A level-up must not depend on the ring being seen.** The ★ on the road bar and the roster is
  the pending signal (the peers' one UI complaint is a badge too subtle to notice); the ring is
  the answer to *how far*.

**6. The stranger with no trade** (ruling 2). Of the three on any muster wall, **one is level 0**:

```js
/* in rollRecruit: cls:null, level:0, xp:0, price × .75, kit ['rags','cudgel'] (START_GEAR's own
   fallback), kind by race (human -> 'human'), trait rolled by race only - traitFits already drops
   every class-gated trait when cls is null. */
```

- The muster row: *NAME "nick" - no trade yet, human · 41 crowns · 2 room · 2/day*, and one line
  under it: *picks up a trade at the first level*. Cheaper **because** he comes without a tool and
  without a trade; the discount is the kit he does not bring (#157: no paragraph about him).
- On the sheet: the class chip reads **NO TRADE YET**; the roster row `L0`; no signature act (`unitFrom`
  builds acts off the weapon and skips `sig` when `cls` is null); no perk tree; the ★ fires the moment
  `level>=1&&!cls` (`levelsWaiting` counts a trade owed as a level owed).
- **The pick is on the sheet, on the perks tab, and it is the level-1 payment.** The tab offers the
  trades of `CLS_BY_RACE[race]` (deduped) as cards: the tool glyph, the name, the `sig` line, the
  lore tip. Picking sets `cls`, hands `START_GEAR[cls]` into the stash (*he takes up the trade's
  tool*; the player equips it), sets `kind` by `KIND_BY_CLS`, and the alternation starts at level 2
  as for anybody. Nothing about it is random: XCOM 2 built a whole facility to turn its random roll
  into a choice, and this game has no facility to spend on that.
- ⛔ **The first level must arrive inside his first or second fight.** XP_TABLE[1]=100 against a
  fight value of ~250 at the choke split six ways plus his hand share does that for a human (~50-60
  a fight); it is one of the numbers rule 9 measures.

**7. The road pays XP too, but only the line half.** A door may carry `xp:N` in its `fx`; it is
paid to every roster body (each `× D.learn`), and it prints as a **✦ LEARNED** row in `EVFX_ROWS`,
built beside `pay()` like every chip since #143 (⛔ never off the `c:` string). ⏸ The camp's *Train*
verb (concept §9, unbuilt) and a gear `xpMul` (Battle Brothers' potions) are the hooks for *"extra
events - items"* and are **not built by this entry**: the field and the multiplier exist, no card
uses them until one is written.

**8. What a level pays, over the whole ladder.** Unchanged per level (ruling 5), re-keyed over ten:

| level | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| pays | the trade (a level-0 body) | perk | stat | perk | stat | perk | stat | perk | stat | stat |
| tree tier | | 1 | | 2 | | 3 | | 4 | | (empty → stat) |

The four tiers of two move from `2/3/4/5` to **`2/4/6/8`** (`PERKTIERS` and the keys in `CLASSES`),
**zero new perks**, and level 10's perk turn meets an empty tree and becomes a stat through the
fallback that already exists. Four perks and five stat points over a campaign against today's
lucky body at level 8: this is *"not that sharp"* in numbers.

**9. Pace, and it is measured before it ships.** Targets, per act, for a founder who stands in every
fight: **act 1 → level 4** (700; ~600 to earn over ~8 fights, ~75 a fight) · act 2 → 6 · act 3 → 8
· act 4 → 9, with the finisher who took the kills touching 10. Three acts: 4 / 7 / 9. `XP_PER_HP`
is the one dial and it is set by the harness, never by reading:

```js
/* the gate. Eight authored fights in order, a founder company, both brains, n >= 20 runs.
   Print each founder's level at the Snare; the reading is the FRACTION of runs where a founder
   ends under 3 or over 5, never the worst run (⛔ a minimum over n is not a measurement). Then:
   hire the level-0 stranger at the Muster and count the fights to his first level (target 1-2). */
```

⚠ **A fight talked out of pays nothing**, which is correct (Pillars pays *only* for objectives, this
game pays for the objective in coin and food on the door). ⚠ **The tavern brawl pays**: it is a won
fight and its value is small.

### The three traps, named now

1. ⛔ **`pickOne(G.party)` was unfiltered and this must not inherit that shape.** A body that stood
   in the fight is one on `B.units` at fight start (`side==='you'&&!u.pet`), not one on `G.party`.
   A recruit hired after the fight and a body dismissed before it get nothing.
2. ⛔ **`render()` destroys anything written onto a sprite** (#173) and the field is off limits by
   ruling anyway. Nothing about XP touches the board.
3. ⚠ **`levelsWaiting`, the ★ and `goParty` are the pending signal and they read banks, not
   levels.** A trade owed is a new kind of debt; it goes into `levelsWaiting` and `goParty` opens
   the perks tab on that body, or the level-0 stranger sits at level 1 with no class and nobody is
   told.

### What has to be true before it is built

- The picture is approved: `shots/174_xp_ring.html` (the sheet ring, the roster ring, the crew card's
  ✦, the muster's level-0 row, the trade pick).
- 👤 the hand-half ingredients (rule 3's open call) are ruled, or the brief's damage-and-kills is
  confirmed as the first cut to measure.
- The concept doc's §8 reads this way (done in the same commit as this spec).
- Then: `claim.ps1 lock`, `XP_TABLE`/`xpNeed`/`levelUp`/`fightXP` beside `consequences()`, the crew
  card slot flipped, the ring, the level-0 stranger, the tab pick, `EVFX_ROWS`, `loadRun` migration,
  the tiers re-keyed, `LINT()` 0, the rule-9 harness reading written into `WHAT_TO_TEST.md`.

---

## 193 - The mirehares: a doe that only leaps, a buck that only charges

**Status: IN THE BUILD.** `prototype/grimtoll_slice.html` and the generated `index.html` both carry
the pair, the road card and the art. The measuring rig is `tools/mirehare_bench.js`, which **defines
nothing**: an earlier cut of it carried its own statblocks and its own brain, which was right while
the pair were a proposal and became a lie the moment they landed. Two competing mirehare designs in
one repo is the drift this project has paid for before.

### What was asked

The user, 2026-08-18: *"I want to create and add monsters. Something between from [frog] and
rabbit"* · *"For femal i want it only jump option (I think 3 tiles away ecatly) - and it hits, when
it lands"* · *"And the male - only strait and vertical dash movment damage"* · *"generate it stats
and try them into battle - i am making design in separate tab"* · *"First create them in independent
prototype or test"*. Then 2026-08-19, with the art delivered and a full written spec: the creature
design, the two battle icons, **THE RED LIGHTS** verbatim, the event painting, and
*"Add it to a test battle and try to run it. **I want some damage, if player ignores logic of this
enemy**"*.

⚑ **THE LAST SENTENCE IS THE ONE THAT FOUND THE BUG**, and no win rate would have.

### The pair, as they ship

| | hp | armour | morale | skill | dodge | act | dice | armour mult |
|---|---|---|---|---|---|---|---|---|
| **doe** `mirehare_f` | 88 | 18 | 120 | 68 | 17 | THREE-HEX LANDING, cost 2, `leap:3` | 24-36 | 1.10 |
| **buck** `mirehare_m` | 68 | 10 | 105 | 72 | 22 | STRAIGHT CHARGE, cost 2, `dash:4` | 19-30 | .95 |

Authored figures; `build()` then applies its usual x0.9 hp, x0.75 armour and x0.9 dice. Both carry
**`noWalk:true`**, so `build()` gives them no MOVE act at all: the leap IS her move and the charge IS
his. The encounter is a fixed **2 does and 2 bucks**. Ground is `swamp`; the card is met between
locations on the water road, and the map node is `f2`.

⚑ **THE CHARGE IS AUTHORED IN CUBE SPACE AND THE COMMENT BESIDE IT SAYS WHY**: `DIR` is ordered
around each offset row, so repeating one of its diagonal indexes zig-zags as row parity changes. The
bench re-derives the same six vectors independently and checks them with the engine's own `hdist`
from four different origins and both parities, so the check cannot agree with the bug by sharing its
code. ⚠ **There is no screen-vertical lane on a hex board** - a column alternates NE and NW - so
*"strait and vertical"* is these six and only these six.

### ⛔ THE BUG: THE BUCK STOOD STILL FOR 85% OF THE FIGHT

Neither body has a walk to fall back on, and each one's single verb only fires when a target is
**already** sitting on a legal ring hex or a legal lane. `mirehareMove` returned `false` in every
other case and the turn simply ended. Measured over 10 arena fights, counting only turns where the
body could still afford its act:

| | turns it could act | acted | **wasted** |
|---|---|---|---|
| doe, before | 85 | 57 | **28 (33%)** |
| buck, before | 117 | 17 | **100 (85%)** |
| doe, after | 78 | 78 | **0** |
| buck, after | 107 | 107 | **0** |

So a creature whose whole rule is *block his lane* was teaching nothing, because the lane was never
threatened: he waited for the player to wander into one. **The fix is the second half of each verb,
not a new verb** - the same geometry, the same lengths, used to REPOSITION when it cannot be used to
strike, and paying no damage when it does. Statblocks, dice, costs, encounter size, the card and the
art are all untouched.

⚠ **AND THE FIRST MEASUREMENT OF THIS WAS WRONG IN A WAY WORTH RECORDING.** The naive counter said
*doe 59% idle, buck 90% idle* and it was counting the SECOND `aiTurn` call of every turn: both acts
cost 2 of 2 actions, so `canUse` correctly refuses the follow-up call, and a spent turn looks
identical to a wasted one from inside `mirehareMove`. **A turn is only wasted if the body could still
have paid for the act**, and the honest figures are the table above. ⛔ **Anything that wraps an AI
verb has to ask what the engine would have allowed, not merely what the verb returned.**

⚠ **A SECOND FALSE READING, SAME SESSION: THE BROWSER SERVED A CACHED 14 MB PROTOTYPE.** Three runs
of "after the patch" numbers were really the unpatched build, and they looked plausible (the idle
rate simply had not moved). The tell was cheap and is the standing check:
`mirehareMove.toString().indexOf('<a phrase from the new code>')`. **Verify the running page contains
the change before believing a single number off it.**

### What ignoring the logic now costs

The bench runs the SAME fight, the same company and the same brains, and only moves where your people
are standing when it opens. n=12 each, after the fix:

| | wins | rounds | of yours down | hp+armour taken | landings | charges |
|---|---|---|---|---|---|---|
| **stood off** in open ground (ignored) | 12/12 | 6.0 | **0.83** | **178** | 6.5 | 2.5 |
| **closed to contact** (answered) | 12/12 | 4.1 | **0.08** | **121** | 2.5 | 3.2 |
| standard deployment | 12/12 | 6.8 | 0.92 | 187 | 7.0 | 2.4 |

**Standing off costs ten times as many people.** ⚑ **And the honest mechanism is not the one the
design claims**: damage per round is almost identical either way (29.5 taken per round in contact,
29.7 stood off). What closing buys is a **shorter fight** - 4.1 rounds against 6.0 - because you
reach them instead of being visited. The creatures are not denied by contact; they simply get fewer
turns. That is a real and teachable answer to *"I want some damage if the player ignores the logic"*,
and it is worth knowing that it is a tempo answer rather than a counter.

⚠ **THE TWO LEVERS, IF THAT IS NOT ENOUGH**, both deliberately NOT taken here because the brief said
*"Do not redesign the Mirehares"*: make the doe's landing strike **every** body adjacent to where she
comes down rather than the single one she aimed at (which would punish clumping and give her a real
counter), or scale the buck's dice by the **length of the run** (x0 standing, x1 at three, x2 at six),
which would make *block the lane* worth something on its own. Either is a small change to
`mirehareMove` and neither touches a statblock.

### The road card: THE RED LIGHTS

His text, implemented verbatim, with the companion name coming off a live non-leader and falling back
to the Captain. Two doors only.

```
THE RED LIGHTS

You are still travelling after dusk, looking for dry ground in this forsaken swamp.

Several red lights appear ahead. At first you take them for fireflies.

Fireflies are not red.

[NAME] says it is a bad sign. Turn back. Take the long way around. Safer for everyone.

  ⚔️  Keep moving forward.   the red lights do not move
  👣  Make a detour.         −2 days · the journey takes two days longer
```

⚠ **THE SECOND DOOR PRINTS ITS PRICE TWICE, AND IT IS ON THE RECORD RATHER THAN QUIETLY FIXED.**
`fx:{days:2}` is rendered as the derived **−2 days** chip by `fxNote`, and the authored `c:` line then
says the same thing in words. That is the one-sentence rule at the top of
`.claude/rules/event-cards.md` (*the prose says what happened, the chips say what it cost, and a
number in both is a second receipt*). The sub-line is his authored text, so it stands until he says
otherwise; **dropping the `c:` is a one-word change** and leaves the door reading `−2 days`.

### Verified, in the running build

- both `prototype/grimtoll_slice.html` and the generated `index.html` parse with **0 JS errors**
- the code change **survived `inject.ps1`** (checked by string, in the loaded page, not by reading the file)
- `mirehare_doe` **48x52**, `mirehare_buck` **54x40**, both RGBA with real transparency
- `EVENTART.mirehares` is `EV32` and the browser decodes it at **586x212**
- the card opens on the road, prints both doors, and the detour moves the day counter **1 -> 3** and
  charges nothing else
- the six charge lanes are straight and collinear from four origins and both row parities; the doe's
  ring is **18 hexes at exactly 3**
- 12 fights, no stalls, no errors

### How to run it

```
fetch('/tools/harness.js').then(r=>r.text()).then(eval)
fetch('/tools/mirehare_bench.js').then(r=>r.text()).then(eval)
MB.axes()      the lane geometry, checked against the engine's own hdist
MB.run(12)     the shipped encounter, full AI both sides
MB.gap(12)     answered against ignored
MB.probe()     one fight, itemised
```

⚠ Keep a batch at 16 fights or fewer: more outruns a 30-second eval bridge.

### Still open

1. The duplicated sub-line on the detour door, above.
2. Whether *"strait and vertical"* really means the six hex lanes. There is no seventh straight line
   to give him on this grid, so the alternative is a different creature.
3. The two levers above, if ignoring the logic should cost more than tempo.

---

## 204 - STRENGTH and AGILITY become LADDERS: a rung is a number, and the number says what it gives

> 🎒 **THE COMPANY SHEET** (the four tells, their hover, the promotion click) · ⚔ **THE FIGHT**
> (hitpoints, the swing, to-hit, dodge) · 🏛 the muster wall (`tellLine` on a recruit)
> **SYSTEMS** `D{}` (hp/dmg/hit/dodge off a raw number) · `thews()` (the damage multiplier) ·
> `TELLS{}` + `tell()`/`tellNext()`/`tellLadderHTML()` (the words) · `effStats()` (gear, trait,
> injury and WRONGSIZE all add raw points) · `RACEMOD` (the race lean, raw points) · `rollRecruit()`
> (6-10 + lean) · `finishRecruit()` · the seven authored bodies (`makeParty`, `PRESET_SKREE`,
> `PRESET_ASH`, `PRESET_BRUHT`) · `build()` (every enemy is `str:6,agi:6`, and only `thews` reads
> it) · `STATHELP` · the stat click in `drawInv` (`p.st[k]++`)
> **RELATED** #132 (nine bands, "artifacts may move it later") · #146 (`HIT_EASE`, the dodge soft
> cap) · #174 (a promotion is one stat point) · #197 (permanent injuries are `−1 STR`, and with a
> ladder that is a whole rung) · #89 part four (the unit of variety is the WEAPON, which this does
> not change) · `.claude/rules/event-cards.md` (a receipt is derived, never typed)
> **STATE** 📐 **PROPOSED 2026-08-19, waiting for his ruling on the numbers.** Nothing in the
> prototype has changed. The arithmetic here was produced by a script copying the file's own
> formulas (`D`, `thews`, `swingOf`, `unitFrom`, `RACEMOD`, `TRAITS`), not by reading. ⛔ **Prototype
> only** (his words), and ⛔ **STR and AGI only in this iteration**: *"Хочу вначале силу и ловкость -
> как основа боевки... остальное выложим в след итерации на мораль и интелект."*

### His words, 2026-08-19

> *"Сейчас мы имеем уровни для каждой. Что я хочу - чтобы возле уровня показать, что он дает. Базовый
> уровень - условно средний для человека и обозначен 1 (давай добавим цифры возле написания). Я хочу -
> чтобы каждый уровень давал изменение к стату. Например - сила: 5 ... / 4 +15% здоровья / 3 +20% урона
> мечем, 10% луком / 2 +10% здоровья / 1 - база. (показатели не перемножаются, а добавляются)"*
>
> *"Так-же, на здоровье влияет размер. Большой и маленький дают коефициенты. Тоже самое - базовые
> [хп] чтобы привязаны к боди сайзу (ну или в данном случае к рассе). Тогда здоровье огра большое -
> потому-что он большой и много силы. И реткина маленькое, потому что он маленький и мало силы. Вот это
> уже перемножающиеся результаты. В первую очередь это будет применимо к нашим юнитам."*
>
> *"В идеале, чтобы после этой правки баланс юнитов сохранился похожий как сейчас - но их
> характеристики и прозрачность и скейлабильность станут сильно более управляемыми."*
>
> *"Ловкость, пусть отвечает - за % удара и % уворота только."*

### What the build does today, measured (so the proposal has something to be compared against)

A stat is a raw integer, about **4 to 16** on the roster, and the sheet prints a WORD for it off
nine bands two points wide (`TELLS`, #132: *Strong enough* is 9-10). What the number does:

| | formula | per band (2 points) |
|---|---|---|
| hitpoints | `25 + 3.5 × STR` (+16 `big`; ×0.9 bow/caster) | **+7 hp** (~12% at the human middle) |
| damage, melee | dice × `(1 + 0.055 × (STR − 8))` **+ round(0.3 × STR) flat** | **+11%** |
| damage, bow | dice × `(1 + 0.055 × (AGI − 8))` + the same STR flat | **+11%, off AGILITY** |
| to hit | `48 + 1.2 × AGI + 10` (`HIT_EASE.you`) | **+2.4** |
| dodge | `6 + AGI` (+5 ratkin, −5 ogre, then the harness band and the soft cap at 12) | **+2** |

⚑ **Three things that decide what "keep the balance similar" has to mean:**

1. **The enemy never reads a stat.** `build()` gives every foe `str:6, agi:6` and takes hp, skill
   and dodge off its template; the ONLY thing the stat does on that side is `thews` = −0.11, i.e.
   every enemy's dice are ×0.89. So the ladder can be a ROSTER change and the enemy can simply be
   told which rung it stands on.
2. **Body size does nothing to hitpoints today.** The ogre is big because Bruht's `big` trait adds
   16 and his STR is 13; a ratkin is small because its STR is 4. Size reaches the fight only as
   `RACEDODGE` (±5) and `SIZEHIT` (+6/+12 to hit a big target), both of which stay.
3. **The flat damage bonus is a second STR receipt**: Captain +3, Bruht +4, Skree +1. It is what
   makes an 11-16 knife and a 16-24 sword feel further apart than their dice say.

### The model

**Two multiplying halves, and inside each half the rungs ADD.**

```
HITPOINTS  =  BASE_HP[body size]  ×  (1 + Σ hp% of every STR rung held)      (+ trait hp; ×0.9 bow/caster)
DAMAGE     =  weapon dice + 2     ×  (1 + morale% + Σ dmg% of every STR rung held + perks…)
TO HIT     =  68 + Σ hit of every AGI rung held      (+ dirk, + trinket, + HIT_EASE already inside the 68)
DODGE      =  14 + Σ dodge of every AGI rung held    (+ race ±5, + harness band, soft cap as today)
```

- **The size is the multiplying half**: `BASE_HP = { small 42 · medium 56 · large 70 }`, i.e.
  ×0.75 / ×1 / ×1.25, keyed off the race today (`RACEMOD[r].size`) and off the body the day a
  human is `big`. This is the ogre's *"большой и много силы"* arriving as arithmetic: 70 × 1.10 at
  STR 3, against a ratkin's 42 × 0.90 at STR 0.
- **The rung is the adding half**, and it is the whole stat: `p.st.str` IS the level, 0-5, and a
  promotion, a trinket, an injury moves it one rung. No more 4-17 under the hood.
- **Rung 1 is the ordinary human**, and it is the weapon's own dice and 68 to hit. **Rung 0 exists
  and is the one rung below it**: he wrote *"1 - база"* and in the same breath *"реткина маленькое…
  мало силы"*, so there has to be a rung under base, and one is enough - the ratkin's smallness is
  mostly the SIZE half now, not the strength half.
- **The flat damage becomes one constant, +2, for every body on the field** - the enemy's
  `dmgBonus:2` already is. Otherwise the flat is a second STR receipt and the ladder is not the
  one place the stat speaks.

### The STRENGTH ladder

| rung | word (existing `TELLS` words, kept) | this rung gives | held in total |
|---|---|---|---|
| **0** | Weak | **−10% hitpoints · −10% melee damage** | −10% hp · −10% melee |
| **1** | Strong enough | the ordinary human arm: the weapon's own dice | none |
| **2** | Strong | **+10% hitpoints** | +10% hp |
| **3** | Very strong | **+20% melee · +10% bow** | +10% hp · +20% melee · +10% bow |
| **4** | Enormously strong | **+15% hitpoints** | +25% hp · +20% melee · +10% bow |
| **5** | Monstrously strong | **+20% melee · +10% bow** | +25% hp · +40% melee · +20% bow |

What that is on the three bodies and two weapons (morale left out; the arming sword 16-24 and the
hunting bow 14-21, both +2):

| rung | human hp | ratkin hp | ogre hp | sword | bow |
|---|---|---|---|---|---|
| 0 | 50 | 38 | 63 | 16-23 | 16-23 |
| 1 | 56 | 42 | 70 | 18-26 | 16-23 |
| 2 | 62 | 46 | 77 | 18-26 | 16-23 |
| 3 | 62 | 46 | 77 | 22-31 | 18-25 |
| 4 | 70 | 53 | 88 | 22-31 | 18-25 |
| 5 | 70 | 53 | 88 | 25-36 | 19-28 |

⚑ **The slope is today's slope.** Two rungs carry +20% melee where today two bands carry +22%; two
rungs carry +10/+15% hp where today two bands carry ~+24% - so the ladder spends a little less on
hitpoints and the same on the swing, which is the right direction for a game whose fights were
trimmed twice for outstaying their welcome. ⚠ **Bow damage moves from AGILITY to STRENGTH**, at
half the melee rate, because he put AGI on *"% удара и % уворота только"* and wrote the bow onto
the STR rungs himself. The archer pays for it (below).

### The AGILITY ladder

| rung | word | this rung gives | held in total | to hit · dodge (human) |
|---|---|---|---|---|
| **0** | Clumsy | **−5 to hit · −5 dodge** | −5 · −5 | 63 · 9 |
| **1** | Steady enough | the ordinary hand | none | 68 · 14 |
| **2** | Handy | **+5 to hit** | +5 · 0 | 73 · 14 |
| **3** | Quick | **+5 dodge** | +5 · +5 | 73 · 19 |
| **4** | Very quick | **+5 to hit** | +10 · +5 | 78 · 19 |
| **5** | Uncannily quick | **+5 dodge** | +10 · +10 | 78 · 24 |

Ratkin +5 dodge and ogre −5 sit on top as today, so a rung-3 ratkin is 24 before the soft cap and a
rung-0 ogre is 4. ⚑ **Hit first, then dodge, alternating** - the complaint behind #145/#146 was
whiffing, so the first thing a promotion on this axis buys is landing the blow; and the pair per two
rungs (+5/+5) is today's +4.8/+4 per two bands. *(The alternative - every rung +3 hit and +3 dodge -
is flatter and less legible; named here so it is not re-invented.)*

### The seven bodies, today against the proposal

Levels authored by hand for the presets (not mapped by formula), so each body lands where it is.
`swing` is `swingOf`'s lo-hi with morale in, as the sheet prints it. `dodge` is base + race, before
the harness band and the cap.

| body | STR/AGI today → rung | hitpoints | swing | to hit | dodge |
|---|---|---|---|---|---|
| Captain | 9/8 → **1/1** | 57 → **56** | 21-30 → **19-28** (−8%) | 68 → 68 | 14 → 14 |
| Vesna | 9/9 → **1/1** | 57 → **56** | 21-29 → **19-27** (−8%) | 69 → 68 | 15 → 14 |
| Marrow | 8/8 → **1/1** | 48 → **50** | 9-13 → 9-13 (stave; he casts) | 68 → 68 | 14 → 14 |
| Ilka | 7/11 → **1/2** | 45 → **50** | 20-29 → **18-25** (−12%) | 71 → 73 | 17 → 14 |
| Skree | 4/16 → **0/4** *(3 + twitchy)* | 39 → **38** | 10-14 → **12-17** (+21%) | 77 → 78 | 27 → 24 |
| Ash | 4/13 → **0/3** | 39 → **38** | 11-15 → **13-18** (+19%) | 80 → 79 | 24 → 24 |
| Bruht | 13/3 → **3/0** *(1 − big)* | 87 → **93** | 38-57 → **34-51** (−11%) | 62 → 63 | 4 → 4 |

**Hitpoints, to-hit and dodge are within a point or two everywhere.** The swing is where the
honest deltas are, and they come from exactly two sources:

- **the flat +3/+4 becoming +2, and the loss of the 5.5% a STR of 9 used to carry**: the Captain and
  Vesna at −8%, Bruht at −11% (he also gains 6 hitpoints);
- **rung 0 being −10% where STR 4 was −22%**: the two ratkin knives at +20%. A knife is the
  smallest dice in the game, so a flat +2 in place of +1 shows up here most;
- **the bow losing its AGI scaling**: Ilka −12%, and +5 hitpoints.

⚑ **One knob closes both race deltas at once, and it is the same sentence he wrote: the size also
multiplies melee damage.** `small ×0.9 · medium ×1 · large ×1.1` on the melee dice gives Skree
**11-15** (today 10-14) and Bruht **37-56** (today 38-57) with no other change; humans do not
move. He asked for size on hitpoints, not on damage, so it is offered and not built into the table
above - **recommended**, because it is the ogre's *"большой"* arriving on the arm as well as the
body, and it is one more row in one table rather than a special case.

The remaining −8% on the two human founders is the price of the flat going to +2. It is inside the
band the harness can see (`ARENA.match()` over the eight fights, n=50 a side, as #145 taught);
**the ruling is his**: accept it, or set the founders' flat to +3 and the enemy's to +2 (two
constants instead of one).

### The enemy in this iteration

Nothing on its sheet changes: hp, skill, dodge stay authored. **Every foe stands on STR rung 0 and
AGI rung 1**, so its dice are ×0.90 where today they are ×0.89, and `hitBreakdown` reads the same
`mskill`/`dodgeBase` it reads now. ⚠ The day the enemy is moved onto the ladder properly
(templates saying `str:3` instead of `hp:80`) is a separate entry - #89 part four's *"enemies run on
the same weapon rules the player does"* is the argument for it, and this entry does not open it.

### What shows, and where

1. **The tell on the sheet prints the rung beside the word**: `STRENGTH   1 · Strong enough`, the
   digit in the stat's colour at `--fs5`, the word at `--fs3` as now. *"давай добавим цифры возле
   написания."* `tellLine` (the muster card) the same: `1 · Strong enough. 2 · Handy.`
2. **The hover ladder gains a third column, the rung's own gift**: six rows, the held rung lit as
   today, and beside each word the line from the table above (*+10% hitpoints*, *+5 to hit*). The
   footer: *"Every rung keeps what the ones under it gave."* `STATHELP` text rewritten to match
   (STR: *"hitpoints and the swing, a rung at a time"*; AGI: *"landing a blow, and not being landed
   on. Nothing else."*).
3. **The promotion click says what it buys before it is spent**: the tell's `spend` state shows
   `→ 2 · Strong · +10% hitpoints` on hover; `tellNext` returns the rung and its gift.
4. **The battle plaque and the aiming card are untouched** - they already print the derived
   numbers, which is the rule: the rung is the cause and the card is the receipt, once each.

⚑ **Picture before code**: the gate picture is the sheet's stat band with the digits on, and the
hover open on STRENGTH, captured off the running build once the rungs render. Until then the
mockup page `shots/204_ladders.html` (the artifact published with this spec) is the shape, and
`tools/stat_ladder_calc.js` (`node tools/stat_ladder_calc.js`) is the arithmetic behind every number here.

### The migration, which is the real size of the work

Everything that adds raw points to a stat has to be re-said in rungs, and **a rung is worth about
two of today's points on STR and four on AGI**, so nothing can be carried over as-is:

| today | today's worth | in rungs |
|---|---|---|
| `RACEMOD` str/agi (human 0/0, ratkin −1/+1, ogre +2/−1) | half a band to a band | **ratkin −1 STR +1 AGI · ogre +2 STR −1 AGI · human 0**, floored at 0, capped at 5 |
| `rollRecruit` base 6-10 | Weak..Strong enough | **STR and AGI each roll 0/1/2 at 25/50/25**, then the race lean. A human wall is mostly 1s; an ogre 2-4 STR; a ratkin 1-3 AGI |
| `twitchy` +2 AGI · `big` −2 AGI · `vet` −1 AGI · two traits at −1/−2 STR | ~1 band | **±1 rung** each (twitchy +1, big −1, vet −1, both STR traits −1) |
| `tooth` +2 STR (+4 on an ogre) · `cubtooth` +1 to all four | | **tooth +1 STR (+2 on an ogre) · cubtooth: +1 STR +1 AGI** (INT/MOR untouched this iteration) |
| armour `agi:−1/−2/−3/+1` (planks, mail, plate, wardrobe, shroud) and `WRONGSIZE.agi −1` | −1.2 hit, −1 dodge each | ⚠ **the harness band already charges dodge for weight** (`ARMOUR_BANDS`), so these are a second penalty today. Proposal: **drop them**, keep the band; `shroud` +1 AGI stays as the one light piece that is genuinely nimble; `WRONGSIZE` keeps `mult`/`mor` and loses `agi` |
| injuries `str:−1` (five rows, #197) · `agi:−1` (one row) | 5% dmg, 3.5 hp | **−1 rung**, which is now a visible wound: *Weak* on the sheet and −10% hp/−10% melee. ⚑ This is what #197's *permanent injury* label was always promising |
| the Captain's `p.st[k]++` on a banked stat point | +1 point | **+1 rung, capped at 5** - a promotion becomes a whole visible step, which is the transparency he asked for. ⚠ Seven promotions a run today (#174 ~level 4-5 at the Snare, stat every second level) means one or two rungs over an act, against a five-rung ladder: **the cap is reachable and that is fine** (#132: *"17 is deliberately somewhere nobody starts"* becomes *"5 is somewhere you finish"*) |
| `tellNext`, `TELLS` thresholds, `tell()` | band lookup | the word is `TELLS[k].s[rung]`, six rows each; the three unused low words (*Feeble*, *No use lifting…*, *Heavy-handed*, *Hopeless*, *All thumbs*) retire |
| `thews()` | `(s−8)×0.055` | `STR_RUNG` sum; `act.range` reads the bow column |
| `D.hp/dmg/hit/dodge` | linear | `BASE_HP[size] × (1+Σ)`, constant 2, `68+Σ`, `14+Σ` |
| a saved run (`gt_run`) | raw 4-17 | **one-shot map on load**: ≤6→0, 7-10→1, 11-12→2, 13-14→3, 15-16→4, 17+→5, applied to `p.st` once and stamped |
| INT and MOR | raw numbers, unchanged | **untouched** - `D.flank/spell/moral/bonus/learn` and the caster's `arcSkill` keep reading the raw figure. The next iteration is theirs |

### Verification, before it ships

- `LINT()` 0 · the sheet overflow probe against a `git show HEAD:` tab (the digit widens the tell;
  `.itl .tv` is exactly full on the Captain, #200/#202)
- `ARENA.match()` over the eight authored fights, **n=50 a side**, before and after, read as win
  rate and as the fraction of runs under the 30%-Captain-hitpoints threshold (#145's rule about
  tails). The target is *"похожий"*, and the knobs if it is not: the flat (+2/+3), `BASE_HP`, the
  size-on-melee row, rung sizes
- every preset and every `rollRecruit` outcome lands on a rung in 0..5 (drive the muster wall 30
  times; nothing prints `−1` or `6`)
- the load map runs once on a saved run and never again

### Open, for his ruling

1. **Size on melee damage** (×0.9/×1/×1.1) - recommended above; his call, since he named hitpoints
   only.
2. **The founders' −8%**: accept, or flat +3 for the roster and +2 for the enemy.
3. **The archer's −12%**: accept as the cost of the bow moving to STRENGTH, or give the bow its
   +10% one rung earlier (rung 2 alongside the hitpoints).
4. **Armour `agi` penalties dropped in favour of the harness band** - or kept as −1 rung on plate
   alone.
5. **Rung 0's word**: *Weak* (kept from today's table) against *Not strong*, which is today's word
   for the human 7-8 that most random recruits roll.

### Round two, 2026-08-19, the same day: the body on the blow, the capstones, and the other two stats sketched

His seven points, verbatim where they decide something: *"also add negative things right (for
example strength of ratkins)"* · *"Размер умножает и ближний урон. И вероятность попасть (легче по
большому, чем по мелкому)"* · MORALE: *"Стартовый дух (мораль + мораль на карте) · Скорость
добавления / убавления морали"* · INTELLECT: *"Получаемый опыт · Дальность действия абилитис · Маг
урон"* · *"На максимальном или пред максимальном уровне хочется добавить что-то жесткое. Например
на уровне силы: Не падает, когда здоровье отрицательное - остается с 1 ХП. Ловкости: +1 Хекс.
Интеллект: Доп 2 перка (?). Мораль: Бонус морали к союзникам рядом в начале хода"* · *"урон в спину
- фланги - не уверен, куда это. Так-же, мне кажется, к морали можно добавить % не потратить действие
на своем ходу"* · *"Помоги, пожалуйста, грамотно развести эти вещи - добавить в баланс и чтобы катать
было интересно и приятно."* The page `shots/204_ladders.html` is the round-two picture.

**THE BODY IS ONE TABLE NOW, AND IT MULTIPLIES THREE THINGS.** Size on melee is taken (it was the
recommendation); the to-be-hit half ALREADY EXISTED as two rules in two places (`RACEDODGE` ratkin
+5 / ogre −5 and `SIZEHIT` +6 on a size-2 target, which together made the ogre 11 easier to hit than
a human) and becomes one column:

| body | hitpoints | melee dice | to be hit | replaces |
|---|---|---|---|---|
| small (ratkin) | ×0.75 = 42 | ×0.9 | −5 | `RACEDODGE.ratkin` +5 |
| medium (human) | ×1 = 56 | ×1 | 0 | |
| large (ogre) | ×1.25 = 70 | ×1.1 | +10 | `RACEDODGE.ogre` −5 and `SIZEHIT[2]` +6 |

The step stays the race's (`RACESTEP`) and is not on this table. A HUGE row (the Fen-Mother's +12)
is added when the enemy is moved onto it. **With the body on the blow the seven-body table closes on
both races**: Skree 11-15 (today 10-14), Ash 12-16 (11-15), Bruht 37-56 (38-57). What remains is
the two human founders at −8% (the flat) and the archer at −12% (the bow moved to STR); both still
his call, below. `tools/stat_ladder_calc.js` carries `SIZE_MELEE`.

**NEGATIVES ARE SHOWN, NOT IMPLIED.** Rung 0 prints its digit in red (`#c15d55`, the unpaid red)
and its minus figures; a ratkin's −1 STR lean lands most of them there, so *"мало силы"* is a line
on the sheet. The race hover lists `−1 STRENGTH` as a RUNG, not a lean. ⚠ The one gap: the floor is
0, so a −1 injury on a body already at 0 takes nothing. Accept (rare: ratkin + a STR wound), or let
the injury take its 10% of hitpoints directly when the rung cannot fall. Open item 8.

**RUNG 5 IS A CAPSTONE ON EVERY LADDER, AND RUNGS 2-4 STAY NUMBERS.** His four, made into rules:

| | capstone | the rule |
|---|---|---|
| STR 5 | **STANDS** | once a fight, the blow that would drop them leaves them at 1 hitpoint |
| AGI 5 | **FLEET** | +1 hex of step, every turn. ⚠ The one place AGI touches the stride, which `STATHELP` says belongs to the race; a capstone is allowed one exception and this is it (ratkin 6, human 5, ogre 4) |
| INT 5 | **TWICE-TAUGHT** | two perk points, now (his *"доп 2 перка (?)"*). The alternative that is not one-shot: +1 perk point and the tree's next tier opens one level early |
| MOR 5 | **STANDARD** | allies beside them gain +5 nerve at the start of their own turn |

Because rung 5 is the capstone, **STR's ceiling is +25% hp / +20% melee** (today's formula allowed
+55% melee at STR 18, which nobody reached). If that is too low, rung 4 becomes *+15% hitpoints ·
+10% melee*. AGI rung 4 becomes *+5 to hit · +5 dodge* so the held total at 4 is +10/+10.

**INTELLECT, SKETCHED FOR ITS OWN ITERATION** (*reach and growth*): 0 Slow-witted −10% experience ·
workings −10%, −5 to land · 1 Sensible base · 2 Quick to see it +10% experience · 3 Clever **the
opening: +5 to hit per extra body on your target** · workings +15% · 4 Sharp +1 range on workings
and shots · workings +15% · 5 TWICE-TAUGHT. ⚠ Today a working multiplies by `1 + 0.05 × INT`
(`D.spell`, Marrow at 14 is ×1.70) and aims at `38 + 3.4 × INT`: rung 1 means the spell dice get
RE-BASED to the rung-1 figure, not kept. `D.learn` (the XP rate, ±3%/pt) becomes the ±10% rungs.

**MORALE, SKETCHED** (*tempo and the line*): 0 Nervous −10 nerve · loses nerve ×1.25 · 1 Fairly
brave 90 nerve, starts HAPPY at 70, the road mood adds or takes as today · 2 Steady +10 nerve
(starts 8 higher with it) · 3 Brave loses nerve ×0.75 · 4 Fearless **carried: 10% of strikes cost no
action** (his idea; printed in the log when it fires, and it is the ONE random rung in the whole
system) · 5 STANDARD. The rate rungs hook the one nerve-change site (`u.morale=clamp(u.morale+amt…)`
at ~10473). ⛔ **TODAY MORALE ALSO ADDS UP TO +14% DAMAGE TO EVERYTHING** (`D.bonus` = MOR × 0.012,
the Captain +7%, Bruht +14%), silently, and `STATHELP.MOR` has to say so in prose. The ladder drops
that and **the nerve LADDER carries it instead** (HAPPY +5%, IT ROCKS +10% in place of today's +5%),
so the bonus is a thing on the plaque that can be lost. ⚠ That is the one sketch item that moves a
live number and it WAITS for the MOR iteration; until then `morBonus` stays and the STR/AGI build is
measured with it in.

**WHERE THE FLANK GOES (his 6).** Attacking from the side or back (`arcOn`) stays a rule of the
ground for everybody with no stat on it: it is what the first fight teaches, and a stat on it reads
"only clever people flank". Being SURROUNDED is where a stat already lives and nobody can see it:
`flankPow = 8 + INT` per extra body (~17 at INT 9). It becomes a base of 15 for everybody plus INT
rung 3's +5, which is `STATHELP.INT`'s *"finds the opening"* finally being true. AGI stays out by his
own rule.

**HOW IT READS (his 4 and 7), and the six rules that keep it interesting rather than merely clear:**

1. **A rung is a sentence**, and the hover is the rulebook, six lines, the same shape on four stats.
   The promotion card says what the next rung buys before it is pressed. Clearer, yes, by that
   mechanism and not by fewer numbers.
2. **Each stat's rungs are a different KIND of thing** - body (STR), dice (AGI), reach (INT), tempo
   (MOR) - so a stat point is a choice between kinds. Four ladders of +% would be one choice four
   times, and that is the failure to design against.
3. **One random rung in the whole system** (MOR 4), and it prints when it fires.
4. **Capstones stay rare.** One to two stat points an act (#174) means a specialist reaches 5 in act 3
   and a generalist never does; do not cheapen rung 5 to fix that, it IS the build choice.
5. **One gift a rung; two only when they are one idea** (+20% melee · +10% bow is one idea, the arm).
6. **Rung 1 is today's human everywhere**, so the harness is the gate and the only knobs are the
   flat, the body table and the rung sizes.

**The body table is also the road to the enemy**: an enemy plaque can later read `STR 3 · AGI 1` off
the same rows, which is his *"легче объяснить и союзников и врагов"* as a table rather than prose.
Not this entry.

### Open for his ruling, round two

1. ~~Size on melee~~ taken; to-be-hit folded into the body table (small −5, large +10).
2. The founders' −8%: accept, or flat +3 roster / +2 enemy.
3. The archer's −12%: accept, or the bow's +10% one rung earlier (rung 2).
4. Armour's AGI penalties: drop (the harness band already charges dodge for weight), or plate alone at −1.
5. Rung 0's word: *Weak* or *Not strong*.
6. The four capstones as drawn; and whether STR rung 4 also carries +10% melee.
7. Morale's hidden damage onto the nerve ladder, at the MOR iteration.
8. A wound on a rung-0 body.

### Round three, 2026-08-19: nine rungs, the race carries the body, one bracket, and "deep beats wide"

His points, verbatim where they decide: *"щас в прототипе вот стоко значений - нужно просчитать их
все тоже. За негативные должен идти дебаф. Местами, он может быть не настолько жесткий, как баф"*
(with the screenshot of the nine-word STRENGTH hover) · *"лучше статы даже не к размеру а к рассе
тоже привязать... или какие-то на рассу, какие-то на размер как лучше и понятнее"* · *"Слишком
сложная формула урона - нужно проще - максимально просто, пусть и это изменит часть текущих
механик. Это ж все на тесты"* · *"leave armor as it is now - lets focus on the logic now · Judge some
answers based on here"* · *"The more it is clear how the system works and why unit is stronger or
weaker and what it provides, the better experience"* · and mid-turn: *"I feel i don't want straight
easy progression in arithmetics as battle brothers - somehow this system feels encourages
specialisation more."* **THIS ROUND SUPERSEDES THE 0-5 LADDERS ABOVE.** The page
`shots/204_ladders.html` and `tools/stat_ladder_calc.js` are at round three.

**NINE RUNGS, −4..+4, 0 IS THE ORDINARY HUMAN, AND THE NUMBER IS SIGNED.** Every one of `TELLS`'
nine words keeps its place and gains a digit: STR *No use lifting anything −4 · Feeble −3 · Weak −2 ·
Not strong −1 · Strong enough 0 · Strong +1 · Very strong +2 · Enormously strong +3 · Monstrously
strong +4*; AGI *All thumbs −4 · Hopeless −3 · Clumsy −2 · Heavy-handed −1 · Steady enough 0 ·
Handy +1 · Quick +2 · Very quick +3 · Uncannily quick +4*. ⚠ This is the one departure from his
*"база обозначена 1"*, and the reason is his own point 0: with four rungs under the base a minus
sign IS the debuff, and `STRENGTH −2 Weak` needs no legend where `STRENGTH 3` (of 9, 5 ordinary)
would. The one-based alternative is 1-9 with 5 as ordinary and changes no table. **His call.**

**THE RACE TABLE CARRIES THE BODY (his а).** Today the size already comes off the race
(`RACEMOD[r].size`), so "size" is a second word for one fact. One table, one hover on the race chip:

| race | hitpoints | melee | to be hit | step | lean (rungs) | replaces |
|---|---|---|---|---|---|---|
| human | 56 | 0 | 0 | 4 | INT +1 | `RACEMOD` int +2 |
| ratkin | 42 (×0.75) | −10% | −5 | 5 | STR −1 · AGI +1 | `RACEMOD` str −1 agi +1 · `RACEDODGE` +5 |
| ogre | 70 (×1.25) | +10% | +10 | 3 | STR +1 · AGI −1 · INT −1 · MOR +1 | `RACEMOD` str +2 agi −1 int −1 mor +1 · `RACEDODGE` −5 and `SIZEHIT` +6 |

The `big` trait (+16, as today) and the monsters (the Fen-Mother's +12 to be hit) are the two
exceptions and keep their own row. ⚑ **Hitpoints are the MULTIPLYING column** (his first-message
sentence: big AND strong); melee and to-be-hit are lines in the bracket, because of (б).

**ONE BRACKET (his б).** `DAMAGE = weapon dice × (1 + Σ STR rungs + race + nerve + perks)`. **No
flat.** Today's `round(0.3×STR)` goes INTO the weapon row once (+2 both ends on every `GEAR` and
enemy act row, the enemy's `dmgBonus:2` folded the same way), so the arming sword reads **18-26** on
its own row and the bracket has nothing in it that is not a line on the aiming card. `HP = race hp ×
(1 + Σ STR rungs)`; `to hit = 68 + Σ AGI rungs + the target's race + the card`; `dodge = 14 + Σ AGI
rungs + harness + nerve`. Four lines, one multiplication.

**THE STR LADDER, this rung gives / held:** −4 −15% melee −8% bow (held −15% hp · −30% melee) · −3
−10% hp · −2 −15% melee −8% bow · −1 −5% hp · 0 base · +1 +10% hp · +2 +20% melee +10% bow · +3 +15% hp
· +4 +20% melee +10% bow **+ STANDS** (held +25% hp · +40% melee · +20% bow). Today's formula ran
+50%/−22% over the same span; **the debuff is softer than the buff on purpose.**
**THE AGI LADDER:** −4 −3 dodge · −3 −3 hit · −2 −3 dodge · −1 −3 hit · 0 base (68 · 14) · +1 +4 hit ·
+2 +4 dodge · +3 +4 hit · +4 +4 dodge **+ FLEET** (held +8 · +8, step +1). The roster's 7-point to-hit
spread is 7 again (62..76 before the race). **INT and MOR** are sketched on the same nine-rung shape
on the page (INT: experience ±, the opening +5/body at +2, +1 range at +3, workings %, TWICE-TAUGHT
at +4; MOR: nerve ±10, loss rate ×0.75/×1.25, a rung lower start at −3, his 10% free strike at +3,
STANDARD at +4) and are their own iteration.

**THE SEVEN BODIES, rungs read off today's WORDS** (the sheet's words do not change, they gain a
digit): Captain 0/−1 · Vesna 0/0 · Marrow −1/−1 · Ilka −1/+1 · Skree −3/+3 (+2, and +1 twitchy) · Ash −3/+2 ·
Bruht +2/−3 (−2, and −1 big). Measured: **Skree 10-14 → 10-14, Ash 11-15 → 11-15, Bruht 38-57 → 36-55**;
hitpoints and to-hit within three everywhere (the Captain hits at 65 instead of 68 because his
sheet says *Heavy-handed* and today's formula quietly treated his 8 as the middle); the founders'
swing −8% (the flat moving into the row) and the archer's −12% (the bow moved to STR) stand, inside
what the harness reads at n=50. The wound-at-the-floor question is closed by the four lower rungs.
The enemy: acts' dice +2, stands on STR −1, hp/skill/dodge authored as before.

**DEEP BEATS WIDE (his mid-turn note), and it is the lever to protect.** The rungs are not equal
steps: +1 is small (+10% hp), +2 real (+20% melee), +3 bigger, +4 the capstone nothing else buys; and
the negatives bend the other way (−1 nearly free, −4 a cost but softer than +4 is a gain). Four
points into four stats is four small things, four into one is a capstone - the curve bends upward,
which is the opposite of Battle Brothers' flat per-point arithmetic and is what he felt. ⚠ The
price: a promotion must be able to refuse (a stat at +4 has *no higher rung*, and the card offers
the other three), and one-to-two stat points an act keeps the capstone an act-3 thing for a body
that went all in - that pace is protected, not sped up.

**RULINGS TAKEN ON HIS WORD ("judge some answers based on here")**: armour untouched · all nine
words kept · the flat into the weapon row, the −8%/−12% accepted pending the harness · race carries
the body · capstones ride ±4 with their number · morale's hidden damage to the nerve ladder at the
MOR iteration · the flank: side/back a ground rule, "surrounded" = base 15 + INT +2's +5.
**Still his:** the signed 0-based numbering; whether INT/MOR's sketched KINDS are the right ones.

**The migration at nine rungs** (replaces the table above): `RACE{}` one table (hp, melee, tbh,
step, lean) replacing `RACEMOD`, `RACEDODGE`, `SIZEHIT[1..2]`, the `size` field · `rollRecruit`
rolls −1/0/+1 per stat at 25/50/25, then the lean · traits ±1 rung (twitchy +1 AGI, big −1 AGI,
vet −1 AGI, the two STR traits −1) · trinkets (tooth +1 STR, +2 on an ogre; cubtooth +1 STR +1 AGI)
· injuries −1 rung · `p.st[k]++` capped at +4 with the refusing card · `TELLS[k].s` indexed by rung
−4..+4 · `thews` → `STR_RUNG` held sum, `D.hp/hit/dodge` → the four lines · `GEAR` and enemy act dice
+2 once, `dmgBonus` 0 · saved runs mapped once by band (≤2 −4 · 3-4 −3 · 5-6 −2 · 7-8 −1 · 9-10 0 ·
11-12 +1 · 13-14 +2 · 15-16 +3 · 17+ +4) · armour `agi` rows LEFT AS THEY ARE at his word, and read as rungs they now weigh more: mail −1 =
−3 to hit, plate −2 = −3 to hit −3 dodge, wardrobe −3 = −6 to hit −3 dodge, against today's −1.2
hit / −1 dodge a point. Noted, not changed.

### Round four, 2026-08-19: INT and MOR off the engine's own dials, the class leans, the race leans all four, the givens, the full sheet, and no crit

His seven, verbatim where they decide: *"str and agi feel work quite decent"* · *"Lets add more decency
to morale and int (what is working, have no idea)"* · *"Class adds also something - to stng or agility
(battle mage ads to intl and morale)"* · *"Race have influence on morale and int also (so stats qud be
spread more equally)"* · *"What parameters as hit / dodge are we taking as for granted?"* · *"Not sure i
get first raw in the colum. Maybe you can show their full stats (and additional modefiers)"* · *"I am
thinking about critical damage - should i add it, how do you feel? Or backtab raplaces it..."* · and
mid-turn: *"i feel it is important to make this thing diferentible - i havent seen it like that and i
vant to play and bring some freshness to here."* The page `shots/204_ladders.html` and the FULL SHEET
block at the end of `tools/stat_ladder_calc.js` are at round four.

**WHAT INT AND MOR DO TODAY, WIRED (his "have no idea"):** INT: the opening `flankPow = 8 + INT` to hit
per extra body on the target (~17 at INT 9, and invisible), a working's damage `×(1 + 0.05×INT)`
(`D.spell`, Marrow ×1.70), a working lands at `38 + 3.4×INT` (`arcSkill`), experience ±3% a point
(`D.learn`); off the field nothing reads it. MOR: capacity `60 + 3×MOR` (`D.moral`), every fight
starts at 78% of it (`START_NERVE`), events `MORALE{ownKill +30, allyKill +10, tookHit −5, allyDied −14,
nearDeath −15}` weighted by `nearWeight`, a quiet turn climbs `MORALE.recover` 8 toward the start
(`mrec` traits add), `STATES` set the hit/dodge penalties per rung, and **silently `D.bonus` = MOR ×
0.012 damage on everything**. **The ladders keep exactly these dials and make them rungs.**

**INT (reach and growth):** −4 workings −15%, −5 to land, the opening −5 · −3 −10% experience · −2
workings −10%, −5 to land · −1 −5% experience · 0 experience ×1, the opening 15 a body, the working's
own dice at 38+ · +1 +10% experience · +2 the opening +5 a body, workings +15% +5 to land · +3 +1 range
on workings and shots · +4 workings +15% + **TWICE-TAUGHT** (two perk points). The working's dice get
RE-BASED so rung 0 is the dice.
**MOR (tempo and the line):** −4 never climbs back on its own · −3 starts the fight one rung lower ·
−2 loses nerve ×1.25 · −1 −10 nerve, climbs 6 · 0 90 nerve, starts HAPPY at 70, loses ×1, climbs 8 ·
+1 +10 nerve (starts 8 higher), climbs 12 · +2 loses ×0.75 · +3 **carried**: 10% of strikes cost no
action (his; logged when it fires; the one random rung) · +4 **STANDARD** (+5 nerve to adjacent allies
at their turn start). The hidden damage moves onto the nerve rung: HAPPY +5%, IT ROCKS +10%.

**THE CLASS LEANS (his 3), one rung each, two for the hybrid:** captain MOR +1 · spear STR +1 · archer
AGI +1 · mage INT +1 · warmage INT +1 MOR +1 (his example) · cutter AGI +1 · brute STR +1 · none 0 (the
stranger's rung arrives WITH the pick on the sheet, so the choice shows its number).
**THE RACE LEANS, ALL FOUR (his 4):** human INT +1 · ratkin STR −1 AGI +1 **INT +1 MOR −1** · ogre STR +1
AGI −1 INT −1 MOR +1. The ratkin as the cleverest and least brave race is what the clan cards already
say. Seats differ (14/20/33) so rows need not sum to zero.

**THE GIVENS (his 5), the ordinary human before any rung:** 56 hp (×0.9 bow/caster) · 68 to hit
(HIT_EASE inside) · 14 dodge · step 4 · 2 actions · 90 nerve, starts 70, climbs 8 · experience ×1 ·
the opening 15 · the weapon's dice · back +30/×1.25, flank +15/×1.10. A rung only ever moves one of
these by a stated amount; the plaque = givens + rungs + the card, no third source.

**THE FULL SHEET (his 6): `final = born + race + class + trait (+ gear)`**, four named lines per stat,
the founders AUTHORED so `born` lands them on today's word; a recruit rolls born −1/0/+1 a stat:
Captain STR 0 · AGI −1 · INT +1 (human) · MOR −2 (born −2, captain +1, stubborn −1) → 56 hp, 19-28,
65/14, nerve 80 · Vesna 0 (born −1, spear +1) / 0 / 0 (born −1, human +1) / 0 → 56, 19-27, 68/14, 90 ·
Marrow −1 / −1 / +2 (born 0, human +1, warmage +1) / −1 (born −1, warmage +1, wind-touched −1) → 48,
9-13, 65/14, 80 · Ilka −1 / +1 (archer) / 0 / 0 → 48, 18-25, 72/14, 90 · Skree −3 (born −2, ratkin −1)
/ +3 (ratkin, cutter, twitchy) / −1 (born −2, ratkin +1) / −3 (born −1, ratkin −1, twitchy −1) → 36,
10-14, 76/18+5, 80 starts OK · Ash −3 / +2 / 0 / 0 (born +1, ratkin −1) → 36, 11-15, 78/18+5, 90 ·
Bruht +2 (born 0, ogre +1, brute +1) / −3 (born −1, ogre −1, big −1) / −3 (born −2, ogre −1) / +1
(ogre) → 93, 36-55, 62/11−10, 100. ⚠ Two honest moves: the Captain IS *Easily frightened* today
(stubborn −5 on the old scale) and the card prints it; Skree's nerve 69 → 80 because −3 costs a lower
START, not capacity. Both are one number to re-author.

**NO CRIT STAT (his 7), and the reasoning is the pillar.** The back-stab IS the crit and the better
kind: +30 to hit and ×1.25 from behind, +15/×1.10 from the flank, on the aiming card BEFORE the swing,
with the red ring on the board saying where. A crit chance is a hidden roll the player learns about
after the blow; it would also put a second dice stat beside AGI and a second random rung beside MOR +3.
**If bigger moments are wanted: BACK ×1.5 instead of ×1.25, one number in `ARC`, called "a clean hit"
on the card.** Position over luck.

**WHAT MAKES IT DIFFERENT (his mid-turn note), and what to protect:** nobody in the genre does the
stat as a SENTENCE: BB/Wartales/Urtuk are a 20-120 number and a formula to look up; here the stat is
the word the sheet already prints, a small signed digit beside it, each rung one line read aloud, and
the four lines under it (born, race, class, trait) are the biography as arithmetic. ⛔ **If a rung ever
needs a formula to explain, it is wrong.** Three cheap extensions once it is in: a capstone is a
MOMENT (STANDS barks, logs, becomes a road memory; FLEET lights a sixth hex); the word is a TITLE the
road can speak (cards already read traits and race, they can read a rung: *the Monstrously strong
one*; a wall recruit is *Feeble, but Uncannily quick*); the enemy is written in the same sentence once
templates sit on the race table (*ogre · Very strong · Clumsy*), which is #89 part four's "why is this
unit stronger" with the same four-line answer on both sides. And NOT for freshness: a fifth stat, a
crit, a luck. Fresh here is fewer numbers that mean more.

**Order of build, his call pending:** STR + AGI + the race and class tables first (one migration
list), INT + MOR as the second pass on the same scaffolding; gate `ARENA.match()` eight fights n=50 a
side before/after. Still his: the class leans as listed, the ratkin INT +1 / MOR −1, the INT/MOR
ladders as drawn, BACK ×1.5 or not, the signed 0-based numbering.

### Round five, 2026-08-19: the page splits into FIXED and OPEN, the mage rename, and six ideas with a home each

His notes: *"Давай то что щас батл маг назовём 'маг', а старый маг удалить"* · *"Морально или
интеллект сопротивление ефыектам"* · *"Шов бекстеб модифаер"* · *"Капитан е бит беттер статс
(бекстори бонус)"*, later *"Капитан борн скорее сила +1 и ловкость +1"* · *"Джек оф олл трейтс -
когда не выбирал, по ходу учится у всех"* · *"Шов клеер модифаер оф муд на карте. Что оно даёт"* ·
*"Один из статов может разово добавить верхний модифаер к урону"* · *"Удали оттуда отработанное (как
про крит) - добавь конкретику про инт и мораль"* · *"Думаю еще добавить бекстори (и она сможет
расскрыться типа как в даркест данжне 2 по мере развития - и по мере развития дать бонус)"* ·
*"там можеш зафиксить вещи - которые точно да (сила и аджилити) и идеи / наброски и опции по
другим."*

⛔ **THE PAGE IS NOW TWO PARTS AND THAT IS ITS SHAPE FROM HERE.** Part I is FIXED (STR, AGI, the
race body table, the four class leans that touch them, the givens, the founders); Part II is IDEAS,
SKETCHES AND OPTIONS (INT, MOR, the mood chip, resistances, the heavy blow, the jack of all trades,
the backstory). The settled arguments were DELETED from the page rather than archived there - the
crit reasoning, the today-against-proposal deltas of rounds one to three, the taken rulings - and
they live in this file. **A decision page that keeps its own history stops being a decision page.**

**THE MAGE RENAME, and it is a deletion.** `CLASSES.warmage` becomes **`mage`** (INT +1 · MOR +1, the
working stave, stands in a line) and **the old `mage` row is deleted**. ⚠ Touch points to sweep:
`CLASSES.mage`/`.warmage`, `CLS_BY_RACE` (human lists both, ratkin lists warmage), `KIND_BY_CLS`
(both map to kind `mage`), `START_GEAR.mage` and `.warmage`, `isCaster()`, the `windtouched` trait's
`cls:['mage','warmage']` gate, `MUTACT`/perk pools keyed by class, and every save with
`cls:'warmage'` (map on load). Marrow's `cls` changes and nothing else about him does.

**THE CAPTAIN IS BORN BETTER, and it is the backstory paying.** born **STR +1 · AGI +1** → the sheet
reads *+1 Strong · +1 Handy*, 62 hitpoints, 72 to hit (he was 0 / −1). His MOR stays −2 (born −2 ·
captain +1 · stubborn −1), which is *Easily frightened* and honest: `stubborn` costs −5 on today's
scale. ⚑ **This is the first live use of the backstory idea below** and the reason to keep the
`born` field visible in the hover: a bonus with a story attached reads as a character, a bonus off
a formula reads as a buff.

**SHOW THE BACK-STAB MODIFIER.** `ARC` is `+30 / ×1.25` from behind and `+15 / ×1.10` from a flank,
on the aiming card as a line today. It joins the sheet's fixed row: `HIT 72 · DODGE 14 · STEP 4 ·
BACK +30`, so the rule is READ once off the field instead of DISCOVERED on it. (The `×1.5` option
from round four stands and is unrelated to the display.)

**RESISTANCE TO EFFECTS: THE STAT THAT AIMS A THING IS THE STAT THAT SHRUGS IT OFF.** Two kinds of
effect exist and each already runs through one door: a WORKING landing on a body goes through
`arcSkill`, and everything that hits the MIND (fear, the circle's −10, the fire at its back, drink)
goes through the one `mor(u, amt)` call. So `INT +2` gains *"workings against them land −5"* (the
mirror of its own +5) and `MOR +2`'s *"loses nerve ×0.75"* IS the mind's resistance, already drawn.
No new stat, no new screen, and the sentence a player learns is one line long.

**THE HEAVY BLOW (his "один из статов может разово добавить верхний модификатор к урону").** Home:
**`STR +3`**, beside the +15% hitpoints: *"HEAVY: once a fight, one blow at ×1.5, chosen."* It is a
BUTTON and not a roll, which is why it is not the crit this file already refused: the player spends
it. Options named so they are not re-invented: `INT +3` (the first blow into a back arc is ×1.5, the
opening SEEN) or `MOR +3` in place of the 10% free action. **Recommended STR +3.** ⚠ If it lands
there, STR +3 carries a number and a moment while +4 carries the capstone; that is deliberate
(depth pays twice) and it is the one rung with two gifts.

**THE MOOD ON THE MAP, SAID PLAINLY.** Today it is one-sided and unprinted: `unitFrom` adds
`Math.min(0, G.morale)` to the starting nerve, so a GOOD company mood gives a body nothing and a bad
one takes silently. Proposal: symmetric, and on the chip's hover, one line a rung: `😄 +8 nerve at
the start of every fight · 🙂 +4 · 😐 0 · 😟 −4 · 💀 −8 (and the fight starts one rung lower)`. The
number on the chip is then the number on the plaque, which is this project's one-receipt rule.

**JACK OF ALL TRADES (the stranger who never picked).** Sketch: no signature and no class lean; each
level he takes a perk from ANY class's tier-1 pool; and each act he gains +1 to the stat of the class
he stood beside most (adjacency is `udist`, already counted). Cheaper on the wall (today's −25%),
slow to matter, and by act 3 the one body that can be anything. ⚑ **It costs no new system**: the
perk pools and the adjacency both exist; what it needs is a rule for WHEN the +1 lands and a line on
the sheet saying who he has been learning from.

**THE BACKSTORY, UNFOLDING (DD2's shape).** Three chapters a body; a chapter opens on a trigger (a
level, a named fight, a road card that matches) and prints on the sheet as prose; the third pays a
rung or a named bonus. The Captain's is already spent (born +1/+1). Uses `p.mem` for triggers and the
sheet's ledger for display. ⚠ **It is a CONTENT system and needs its own entry**: three chapters ×
every body is a writing job, and the rule about which bodies get one (founders only? anybody who
survives an act?) is the first question.

**BUILD ORDER, so the fixed half does not wait:** pass one = STR + AGI rungs, the race body table,
the four class leans that touch them, the founders' `born`, the flat into the weapon rows, the sheet
digit and hover, the refusing promotion, the BACK +30 row; INT and MOR keep today's wiring. Gate:
`ARENA.match()` eight fights n=50 a side before/after, plus the sheet overflow probe against a
`git show HEAD:` tab. Pass two = INT and MOR onto the same scaffolding, the mood line, the mage
rename, the nerve-rung damage. Later, own entries: the jack of all trades, the backstory, the enemy
on the race table.

### Round six, 2026-08-19: the pixel arms, nine of them, one per Strength rung

His ask (Ukrainian): *"спробуй ще додати оці параметри сили до сили до кожного рівня - подивитись, як
воно буде. І онови частину статів картки капітана з ними - як вона буде виглядати (додав файл з
кодекса з руками). Вони повинні бути маленькими і давати швидке візальне читання харк-ки."*

⚑ **THE HANDOFF WAS ALREADY KEYED TO THIS ENTRY'S RUNGS, WHICH IS WHY IT COST NOTHING.**
`prototype/assets/strength-biceps-pixel-v7/` (GPT, the same evening) ships **nine icons at 16px and
nine at 24px**, RGBA with real alpha, plus `strength-levels.json` mapping **level −4..+4 to this
file's own nine words** (`level-minus-3-feeble.png`, `level-plus-2-very-strong.png`). Nothing had to
be sliced, renamed or re-keyed. ⚠ v1-v6 are earlier passes in the same folder and **v7 is the one**;
the sprite sheets at the top of `prototype/assets/` are previews, not the ship.

**Wired into the page** (`shots/204_ladders.html`, embedded as data URIs so the artifact stays
self-contained): a 24px arm under the digit on every rung of the STRENGTH ladder, the nine in a row
at real size, the hover with 16px arms in the number column, and the Captain's card in three
arrangements.

⚑ **THE SET WORKS BECAUSE IT IS A SEQUENCE, NOT NINE PICTURES.** The silhouette grows monotonically
and the colour climbs skin → orange → red with veins at the top, so a row sorts itself by eye and the
four negative rungs read as *less arm* rather than as a different icon. ⚠ **The bottom two are told
apart only by the hand and the bend at 24px, and at 16px −4 and −3 are nearly one shape.** That is
fine on a card being read and not enough in a list, which is the argument for the digit staying.

⛔ **THE THREE ARRANGEMENTS, AND THE ONE TO BUILD IS A:**
- **A · 24px, the icon in its own COLUMN before the value.** Same arrangement `.sart`/`.scol` already
  uses for the item pictures on this sheet (`.claude/rules/static-event-art.md`: *an item icon is a
  COLUMN, not a character on a line*), so it is a pattern the sheet has rather than a new one.
- **B · 16px inline** is the fallback. ⚠ **The stat rows are 16px in a column that measures exactly
  678 into 678** (#200), so a 24px icon adds ~8px a row and ~32px over four. **That measurement is
  taken in the running build before A ships**; if it costs the column, the art column carries the
  16px picture inside a 24px box rather than the row growing.
- **C · the picture INSTEAD of the digit is a trap.** It reads beautifully on one row and fails the
  moment two bodies are compared: the eye tells −3 from +2, never −3 from −4. **Picture and number
  together, always.**

⛔ **AND THE REAL DECISION IS WHAT IT COSTS THE OTHER THREE STATS.** Once Strength has a picture,
AGILITY, INTELLECT and MORALE look unfinished without one: **either all four get a nine-icon set in
the same pixel language and the same climb, or none does.** One illustrated stat beside three bare
words is #102's wrong-unit bug drawn in pictures. The brief for the other three (same 16/24px, same
alpha, same `strength-levels.json` shape): a HAND for agility, an EYE or a candle for intellect, a
HEART or a banner for morale.

⚠ **Two rules the icons obey when they are wired:** they are **decoration for the number and never
the source** (the rung is the fact; a missing icon falls back to the digit and the word, exactly as
`ITEM_ICON` falls back to `gGlyph`), and they are keyed **by RUNG, not by body**, so an ogre at +2
and a ratkin at +2 show the same arm. The picture says what the rung IS, never who is holding it.

⚠ **The pane could not composite** (the usual: a screenshot proves nothing here), so the page was
checked by its own markup and the icons by `PIL`: nine 24x24 and nine 16x16, RGBA, alpha 0..255,
496-1057 bytes each. The box measurement that matters is the sheet's, and it happens when pass one is
built.

### Round seven, 2026-08-21: the icons are IN THE PROTOTYPE, and the row grew for a reason nobody guessed

His ask: *"Чекни онови відповідно до оновленої гілки гри. Спробуй вбудувати оновлені руки і мозок в
інтелект (давай подивимось як спрацює) ... Пока работай токо с файлом прототипа нашего, не трогай
основной бюлд."* **Built, prototype only. `index.html` untouched, nothing injected, nothing deployed.**
The gate picture is `shots/204_stat_icons.html` (four live panels, the build's own CSS).

⚑ **THE V3 SET SUPERSEDES V7 AND IT LANDED WITH A BRAIN.** `prototype/assets/stat-icons-pixel-v3/`
carries nine STRENGTH arms and nine BRAIN icons at 16px and 24px with a `manifest.json` keyed
weakest-to-strongest. Its exporter is `prototype/export_stat_icons_v3.ps1`, committed as a bench in
`c02ba84` with the warning that it **cannot be re-run as it stands** (absolute paths into
`~/.codex/generated_images/`, and its output root is gitignored). ⚠ **So the eighteen PNGs are the
only copy and they are NOT in git.** They are now embedded in the prototype as data URIs, which is
also what makes them survive; the folder should still be backed up.

⛔ **THE ICON IS KEYED ON THE INDEX THE WORD IS KEYED ON, AND THAT IS THE WHOLE DESIGN.** `tellIdx(k,v)`
is the band index; `tell()` was rewritten to read it, `statIco()` reads it, and `tellLadderHTML` asks
for the icon **by position** rather than re-deriving it from a value. One lookup, two renderers, so a
picture cannot end up a band away from its own sentence. **Verified end to end by byte fingerprint**,
which is the only check that actually proves the ORDER: `STAT_ICON.str[0]` is 451 B = `grade-plus-4`
against *Monstrously strong*, `[4]` is 472 B = `grade-0` against *Strong enough*, `[8]` is 519 B =
`grade-minus-4` against *No use lifting anything*; the brain agrees at both ends (533 / 283).

⛔ **THE ROW GREW 3.9px AND THE NEGATIVE MARGIN WAS NOT THE FIX. IT TAKES TWO DECLARATIONS.**

| | row height, illustrated | bare row |
|---|---|---|
| `margin:-1px 0` alone | **20.8** | 16.9 |
| `align-self:center` alone | **18.5** | 16.9 |
| both | **16.9** | 16.9 |

⚑ **The cause is a rule about flex baselines nobody had hit here before: `.itl` is
`align-items:baseline`, and A FLEX CONTAINER TAKES ITS BASELINE FROM ITS FIRST ITEM** - which is now
an image, whose baseline is its bottom edge. So the row was hanging the whole value off the bottom of
a picture, and the margin (which does shrink the outer box, exactly as #202 used it for the
descenders) was fighting the wrong thing. ⛔ **And never "fix" it by setting `width/height:14`: that
RESAMPLES a 16px painting into 14px.** The 1px bleed either way is free because **every one of the
eighteen files carries at least 2px of transparent padding on every edge** - measured with PIL, not
assumed.

✅ **THE GATES, on the running build at `localhost:8834`:** `LINT()` **0 findings** · the ui-scales
overflow probe on the open sheet **[]** · nothing under the 10px floor **0** · `#iChar` **678 into
678** with no scroll, i.e. #200's exactly-full column is still exactly full · all four rows **17.4px,
identical** · **no word clipped at any band, probed 9 bands x 4 stats** · the ladder is 9 rungs, all
with a picture, the held one lit · **`agi`/`mor` render no `<img>` at all** (not an empty one).

⚠ **AND THE MEASUREMENT ALMOST HAPPENED ON SOMEBODY ELSE'S BUILD.** `serve.ps1` on 8791 refused to
bind (*"conflicts with an existing registration"*) and **exited 0 while printing the serving line**,
so the browser was answered by another session's server and reported `STAT_ICON is not defined` on a
file that plainly had it. The tell was arithmetic: the port returned **28,679,857 bytes** against the
patched file's **28,838,803**. ⛔ **Fetch the file the server actually serves and compare its LENGTH
before believing any measurement.** Moved to 8834, free, and everything above is from there.

⛔ **THE FINDING THAT IS ABOUT THE ART AND NOT THE CODE: V3 IS A COLOUR SEQUENCE, NOT A SIZE ONE.**
V7's arms grew monotonically, which is what made a row of them sort itself. Measured ink area out of
256 px, weakest to strongest:

- **strength** 93, 70, 63, 64, 93, 90, 87, 94, 102 - the bottom rung (a splayed broken hand) has MORE
  ink than the two above it, and the top five are flat within 15;
- **brain** 60, 83, 88, 88, 52, 67, 119, 55, 108 - **`+3` (55) is smaller than `+2` (119) and smaller
  than `-2` (88)**, so the silhouette actively reverses near the top.

So both sets read by the palette climb (skin → orange → red; white → pink → gold) and not by mass.
That is legible on a card being read and it is **weaker in a list**, which is the argument the digit
was already making. ⚠ **`+2` and `+3` of the brain are the pair to look at first** on the gate
picture: a gold ring against thin rays is the one place the ladder can be read backwards.

⏳ **STILL OPEN, and it is what the picture is for:** AGILITY and MORALE have no set, so the sheet is
now **two illustrated stats beside two bare ones**. This file's own rule from round six says *either
all four or none*; the build is the exception on purpose, so it can be LOOKED at rather than argued
about. If it reads badly, the fix is a hand and a heart in the same pixel language, not removing the
two that exist.

### Round eight, 2026-08-21: "a third bigger" was measured, and the answer is no

His ask: *"а якщо ми зробимо цю іконку на 33% більшою - стане вони більш інформативною з точки зору
іконок?"* Nothing in the prototype changed this round; `shots/204_stat_icons.html` was rebuilt from
the running build as the comparison (four panels: the same rows at 16 / 21 / 24, all nine bands at 16
against 24, the shapes magnified 5x, and the table).

⛔ **BIGGER IS NOT MORE INFORMATIVE, AND THE NUMBER SAYS SO.** "Informative" for an icon SET means one
thing: how much a step up the ladder changes the picture. Measured as the share of pixels that differ
between a rung and the one below it, over all eight pairs:

| | 16px | 24px | |
|---|---|---|---|
| the arm | **26.7%** | **27.5%** | +3% relative |
| the brain | **28.4%** | **28.9%** | +2% relative |

**The 24px export carries essentially the same distinguishing signal as the 16px one.** What size
buys is legibility on a stage that is itself scaled to the window; it adds nothing to what the set
can say. ⚑ **And the same table names the pairs that stay confusable at ANY size, because the two
drawings are genuinely alike**: brain −2→−1 (12.5%), brain 0→+1 (14.5%), brain −4→−3 (17.2%), arm
+1→+2 (17.2%), arm −2→−1 and 0→+1 (19.1%). Those are an ART problem and no zoom fixes them.

⛔ **AND 21px IS THE WORST OF THE THREE SIZES ON OFFER.** 16 x 1.33 = 21.3, so a 16px painting is
stretched by a fraction: **5 of every 16 pixel rows are doubled and 11 are not**, which is exactly
what a pixel icon may not survive. The three honest choices are **16 (shipped)**, **24 (a real
export, +50%)**, or **32 (an exact 2x of 16)**. ⚑ **The 24px files are NOT the 16px ones enlarged**:
only **316 of 576** pixels agree with a nearest-neighbour upscale of the 16px arm, and **445 of 576**
for the brain, so 24 is a genuine higher-detail render and costs no resampling at all.

⚠ **IF 24 IS TAKEN, THE ROW HAS TO BE RE-MEASURED AND IT WILL NOT SIMPLY FIT.** Round seven's trick
hides a 16px picture inside a 14px box because every file carries at least 2px of transparent
padding. **The 24px files carry 2px too, not 3** (measured), so a 24px icon in a 14px box would bleed
5px each way into the rows above and below rather than into its own empty border. The options are the
row growing (which breaks #200's exactly-full 678 column, four rows x ~7px) or the tells getting a
real art column with its own width, which is the arrangement `.sart`/`.scol` already uses for items.
**Not built; this is the arithmetic that decides it.**

---

## 216 - The practice field: points on both sides, a hand-picked crew, the campaign lock

*(2026-08-21, 8f.239. Asked and built the same day; this section is what a future session reads
before touching the scale. The full reasoning and the shipped numbers are in the changelog row.)*

**The ask, verbatim (2026-08-21):** *"And change in the practice field - when piking my crew - that
you can pick specific caracters, Also you can lvl up them and add artifacts from the pool. Each
character and artifact has its points value. And for each fight it is recomended point values for
easy, mid, hard. Not in the dev mod, important fights (like fen mother) or rabbits, or thing in the
arnor - locked, until you open it in the campeign. This one in the future would help both for AI
and manual balancing, and also for safely chickng the game and learning to fight."* And the second
half: *"And each fight has recomended points value (the points value we should calculate for each
fight in the game, so we can compare thread lvls later). But it is visible only in dev mod for
campeign. In the dev mod you can show this points for battls also on global map (so it would be
easier to balance the final route)."*

**The scale, and every dial in it** (all in the #216 block above `SIM_FIGHTS` in the prototype):

| dial | value | why |
|---|---|---|
| `PTS_SCALE` | 0.42 | calibrated so the four founders sum to exactly 100. Recalibrate against the founders, never against a fight |
| offence | best damage-per-round x (.35 + .011 x skill) | sweep x1.35, range x1.10, a caster floors at 26 x spellPow, drunk x0.7 |
| staying | (hp + 0.8 armour + 22/soak) x dodge weight | noRout x1.25; drunk costs 8 dodge |
| the mean | sqrt(offence x staying) | a glass cannon and an anvil are both worth less than their best half |
| level | +3% a level on a roster body | conditional perks price as nothing above; without this five levels measured two points |
| bands | easy 1.3x · even 1.0x · hard 0.75x of the fight's net | ⏳ FIRST CUT. They ignore the player's tactical edge (the hold patrol at even points measured 93% in #183). Refine against win rates |

**The structural rules, so they are not re-derived:** `fightPts` builds the REAL foe roster
through the same kind map startBattle uses and restores every borrowed `G` field in a finally;
allies subtract (clash, snarejoin); a LIST takes the worst door of a branchy fight while a door's
own dev chip prices its own side; the tavern is special-cased to the room's whole roster minus the
barman because its waves belong to the script; everything runs under `seededly` or the steading's
rolled wall makes the picker flicker. The locks are `FIGHT_LOCK` (armour · mother · mirehares ·
snare · circle · wedding) against the META store `gt_seen_fights`, marked in startBattle beside
the journal write under the same `!SIM.on` gate; TEST.on bypasses. The bench stores RECIPES
(source, level, eq) in `gt_simcrew` and rebuilds the person on every read; levels are paid through
`levelUp`'s own bank and spent by policy (`STAT_PRIO` per class, first open perk of each tier);
the Captain is row one and unremovable; twelve rows, because twelve is the deployment-slot count.

**What refines later:** the band multipliers against measured win rates; per-perk pricing if +3%
a level proves too blunt; showing a fight's points on the aftermath for post-fight comparison.

---

## §229 · The Gauntlet: the campaign battle bench (2026-08-21, built the same day, 8f.252)

**The user, verbatim:** *"Hey, how do we measure battles through campeign? I feel we need to
specifiacaly for it. To measure lengh and difficuly of each battle. And also, while you have
differnt points of your characters (it is important)"* · *"Also, it would change when i update
perks. So it would be nice to see this tool"* · *"Also to this tool and auto resolve we can add 3
strategies: agresciev - move all units in front the maximum to hit enemy, and mor steady - goes
slowly with formation"* · and, mid-session: *"put it all in inependent tool, that maximally
disconected from main build and could be easily updated from it after balance changes"*.

**What it is:** `tools/gauntlet.html`, a standalone page in the dramaturge's shape. It loads the
live `prototype/grimtoll_slice.html` into a hidden same-origin iframe and evals a bridge into it
(the same indirect-eval door `tools/harness.js` has always used), so the game's own tables,
builders and brains are the only source. **Nothing in the prototype changed for it**, and a
balance edit reaches the tool at the next RELOAD BUILD press.

**The instrument:** the `runFight`/`ARENA.match` loop verbatim - both sides driven by `aiTurn`
(mirror AI), `checkEnd()` between turns, render/fx/say/sfx/paintTerrain/`JOURNAL.put` stubbed and
restored in a finally. **Plus one stub the harness never needed: `SEENF.mark`** - it predates
#216, and a measurement may never unlock a spoiler fight. Every run is seeded (LCG, the game's
own `seededly` shape), so same seed = same crew and same dice, and a **Δ column** compares any
run against the previous completed run with the same setup: edit the prototype, reload, re-run,
and the delta is what the change did.

**The two modes.** THE BENCH: any `simComps()` company (including *"Your company, as it stands"*
off the save, and the #216 hand-picked bench) leveled to N via `simLevelTo`, against every fight.
THE CAMPAIGN WALK: the founders march the fight list in order; XP is paid by `payFightXP`, the
banked points are spent by the bench's own policy (`STAT_PRIO` + first open perk), everybody is
mended between fights, and the joins are editable (Asha default before the Broken Men, per #212's
Blood-on-the-Road join; Skree + Bruht plus the seasoned six's own armour step before the Snare).
Points are re-priced at every arrival, so the table answers "at the points you would actually
have there".

**The three strategies are `AIP.you` profiles and nothing else**, per AIP's own written contract
("All 1 = the real AI. All 0 = the pre-rework rush"): AGGRESSIVE keeps only `ev`
(flank/kite/fallback/cohere/hold/doct at 0 - everyone straight in, aim kept); STEADY is the brain
with `cohere:3, flank:.4, pile:1.3`; THE BRAIN is all 1. The enemy always plays FULL.

**Fixed shapes so runs are comparable:** clash fought with no side taken · SOMETHING IN ARMOUR
entered on FORM · mercy counts as a win (runFight's own rule) · THE THREE BELLS is priced but not
simulated (scripted waves around the tutorial).

**What refines later:** the in-game AUTO / auto-resolve strategy picker off the same three
profiles (one caller when wanted - the profiles are AIP rows; it waits on the prototype and on a
mockup, per the standing gate) · the band multipliers, now that the tool measures them against
win rates on demand (#216's named remainder) · the fifth-body and level non-monotonicity findings
(see the changelog row).
