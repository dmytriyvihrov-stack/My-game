# Grimtoll - the plan and the backlog

> **This file is the WORK.** What we are doing now, what waits, and one line per entry.
> The full spec of any entry lives in [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md).
> ⛔ **Open the one entry's section there, never the file: it is 199 KB.**
>
> Orientation is [`README.md`](README.md) · the record is [`CHANGELOG.md`](CHANGELOG.md) ·
> what shipped is [`SHIPPED.md`](SHIPPED.md) · your test bench is [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md).

---

# 🔴 THE CURRENT FOCUS

> ## The feedback, 2026-08-10, in the user's words
>
> > *"The biggest thing: lack of clarity and too many options/systems from the start."*
>
> **And the ruling that came with it: *"I think this version we will work only on it."***
>
> ### The second round arrived the same day, with a screenshot of the battle panel
>
> > *"1) What is hard - understanding what is going on even in the menu - very small type and lots
> > of numbers everywhere. 2) It took me a very long time to see where to read a character's step
> > count - also hidden in small type. 3) Make the hot keys either smaller or not overlapping."*
>
> **#88 shipped against all three on 2026-08-10** *(8f.117, see [`CHANGELOG.md`](CHANGELOG.md))*, and
> the finding is worth carrying into the rest of the pass: **all three were one measurable cause.**
> The skill list was a two-column grid, a 133px column leaves a card 116px of inner width, and the
> longest skill name in the game wants 128px of it. **The card was structurally unable to show its
> own contents, so the type could not be raised - there was nowhere to put it.** One column gave it
> 213px and paid for all three fixes at once. ⚑ **The lesson: "the type is too small" was a
> SYMPTOM of a box that was too narrow. Measure the box before you argue about the font.**
>
> **⏳ MORE OF THE FEEDBACK MAY STILL COME.** Until it does, the two blocks above are the whole
> brief, and the work below is scoped to them.

## What that sentence actually says, and it is two complaints, not one

| | the complaint | what it means for the build |
|---|---|---|
| **A** | **lack of clarity** | the player does not know what is happening or why. This is a **legibility** problem, and it is fixed by explaining less at once, not by explaining more. |
| **B** | **too many options / systems from the start** | the player is handed the whole game in the first fifteen minutes. This is a **pacing** problem, and it is fixed by **taking things away from the opening**, not by adding a tutorial on top. |

**⛔ The rule for this whole pass, and it decides every argument in it:**

> ## NOTHING IS ADDED. THE ONLY MOVES ARE CUT, DELAY, AND MERGE.
>
> A new tutorial, a new hint layer, a new card explaining the cards: all three are the wrong
> direction, because the report is *too much at the start*. If a system cannot be cut, it gets
> **delayed** until the player has a reason to care about it. If two things say the same thing, they
> become one thing.

**Why this outranks everything else in the file.** The build is feature-complete for one act and has
survived a full QA playthrough with no soft locks. It does not need more. It needs the first
fifteen minutes to stop being a wall, and that is a subtraction job.

## What the pass has shipped, and what it taught

*One line per entry, newest first. **[`SHIPPED.md`](SHIPPED.md) is the registry** and it names every
open remainder; the reasoning is in [`CHANGELOG.md`](CHANGELOG.md) under the build-log number. This
section used to carry each entry in full, which made the work file a second changelog. Cut back on
2026-08-14.*

| | the subtraction | log |
|---|---|---|
| **#175** *(08-17)* | **the shake comes back a quarter, and four captions get four lines**: `--hitp` 2.5 → 1.875, one character for all fifteen impact durations · `fx()` gets a queue per hex at the one door, and the first cut broke twice in ways only `getBoundingClientRect()` could see (a mixed-size ladder collapsing to 5px, and an 18px row against a 20px box) · `forwards` → `both`, because nothing was describing what a staggered animation looks like before it starts | 8f.203 |
| **#173** *(08-17)* | **the fight slows down enough to be watched, and the hex grid finally interlocks**: the lunge had never once been seen because `render()` deleted it two statements later (third report, first two fixes aimed at the wrong half) · sprites stop eating the hexes behind them, 49 stolen probe points to 0 · the zone of control becomes the front three hexes in the RULE and the picture together, balance-neutral over 200 arena fights · `HEXOFF` 27 → 19, the shear #105 measured and then painted around | 8f.201 |
| **#164** *(08-16)* | **the designers' checklist out of the Turn-Based Games Discord, and the three scales that answered four of it**: 29 font sizes to 9 tokens, 7 near-identical border hexes to 5, 72 paddings to 7, and **a 10px floor** that raised 153 declarations. ⛔ **Four checklist failures were one cause** - no tokens for size, spacing or edge - so this is a merge, not an addition. ⚑ **The floor broke five boxes and the spacing broke none**, which is the opposite of the prediction: `.act` 72x86 → 80x90 because GUARDS ALLIES was being eaten by `text-overflow:clip`. Rule: `.claude/rules/ui-scales.md` | 8f.192 |
| **#157** *(08-14)* | thirteen of his notes, and the first three were **one bug**: the token's furniture is nailed to the hex and the painted bodies stopped fitting it, so a health bar vanished under whoever stood in front and a status badge was drawn across the face. Both hang off the sprite now. ⊛ **SURROUNDED** on the head at three-or-more, adding no rule; the caster starts with **one school**; **nothing eats the provisions by itself** any more; the Thing in Armour cannot be left (**QA-7 cashed**); the muster's intro 100 words to 32; **a lost fight can be taken again**; and **nobody chases a broken dog into a corner** | 8f.185 |
| **#156** *(08-14)* | twelve of his notes: **the step numbers and the terrain glyphs off the hexes**, the enemy's reach finally shown where your own preview was hiding it (with a blow picked too), the acting body wearing a hexagon instead of a smudge, **a tutorial spotlight stopping the fight it was explaining**, two actions on every body including six enemy captains, the front door down to labels and a loud pillar, the contract down to the head and the plate to 305x53, **a second company skipping the brawl**, and **the road grew the battlefield's own three-stop camera** | 8f.184 |
| **#155** *(08-14)* | the opening pass: **THE GRAUSEN ROAD card and the tour's THE DAY step both deleted**, the prologue card stops stretching to its own ceiling, ⚔️ lands on the first fight door in the game, the naming screen trades ♥ MENDING for ⛊ HEADS, Blood on the Road halves and grows portraits, *"the company stands taller for it"* out of 11 places - and **the archer's cursor stops being a sword** | 8f.183 |
| **#154** *(08-14)* | **every road door wears its intent**: eight glyphs measured down from ten, plus a race mark derived from `needRace`; and the Fen-Mother drops to two doors, the quiet one paying in days | 8f.182 |
| **#151** *(08-14)* | eight of his notes: a fourth door on the toll-man that takes the whole robbery, the menu's two playtest rows merged, *"it sits well with them"* out of 16 cards, cost lines in the game's own resource glyphs, one loot receipt per fight, and **the fork sign spans a range instead of counting** | 8f.179 |
| **#150** *(08-13)* | eleven notes: the opening loses a title, a sub-label and a whole screen; the receipt chips learn which glyph means what; *"it sits badly with them"* out of 24 cards; **the road bar grows the three signs it never had** | 8f.178 |
| **#145-#149** *(08-13)* | the brawl's second wave splits · the aiming pass, every summed row carrying its working · two finished grounds reach the campaign · #36's blocked lane joins the one gate · AUTO leaves `setInterval` | 8f.173-177 |
| **#143** *(08-13)* | **the road's prose cut by a third**: 5,474 words to 3,652 across 34 cards, and the outcome numbers leave the prose for the aftermath's own chips | 8f.171 |
| **#141 · #142** *(08-13)* | the coin is a one-door pickup that wears its loot on the card · the race box was saying everything twice | 8f.169-170 |
| **#124-#135** *(08-13)* | the overnight batch: one menu button and Esc everywhere, START NEW GAME starts one, six morale rungs instead of five, archers that advance and give ground, the spear line screening them, stat names people already have, every bow reaching 5 | 8f.152-163 |
| **#133 · #136 · #140** *(08-13)* | 🎒 **the company sheet, three rounds**: 1241px and 564 words down to 678px and 242, no scroll, stats first and the kit on the body | 8f.161-168 |
| **#137 · #138** *(08-13)* | the seven-item pack, and **four cards between the brawl and the map become one**, which leaves no decision in the opening at all | 8f.165-166 |
| **#123** *(08-12)* | **nine road events lose eleven doors**, then five more go 4 to 3: 48% of the multi-choice road, and the choice economy becomes concept §5 | 8f.150-151 |
| **#122** *(08-12)* | 📜 **the aftermath on the Battle Brothers shape**, so half the fights are one screen now | 8f.149 |
| **#108-#111 · #118-#120** *(08-12)* | 🚪 the front door: an intro brawl that teaches by being played, then fight first and contract after | 8f.135-147 |
| **#103-#107 · #112-#117 · #121** *(08-11/12)* | 🗺 **the road screen, ten rounds**, and 32 painted sights standing on the nodes | 8f.130-148 |
| **#88 · #91 · #94-#105** *(08-10/11)* | ⚔ **the battle screen, nine passes** | 8f.117-132 |
| **#90 · #93 · #99** *(08-11)* | the board is **drawn** per battle from a terrain-owned pool: four arrangements where there had only ever been one | 8f.118-127 |
| **#92 · #139 · #144** *(08-11/13)* | the desk itself: collision guards, a branch and a worktree per session, and a spent number that gives itself back | 8f.119-172 |
| **#87** *(08-10)* | every skill gets its own animation from eight primitives keyed on what an act does: **subtraction of reading, not addition of system** | 8f.116 |

### What it taught, and this is the part that decides the work still left

- ⛔ **Measure the box before you argue about the font** *(#88)*. All three of his battle-panel
  complaints had one cause: a 133px column leaves a card 116px of inner width and the longest skill
  name in the game wants 128. The type could not be raised because there was nowhere to put it.
- ⛔ **Budget three passes on a surface, not one: the second is finish, the third is corrections**
  *(#94, #95)*. The battle screen took nine. **And by the eighth pass, a complaint that sounds like
  taste is usually a constant that is wrong** *(#105)*: three of round nine's eight points were
  faults that had been shipping for weeks.
- ⛔ **By the third ask on a surface, look for the readout printing the wrong unit** *(#102)*, not for
  another box to move. SPEED counted in duration, so pressing toward the bigger number made the
  board slower.
- ⛔ **A rule that was complete when it was written breaks the day the screen grows a second kind of
  object** *(#113, #117, #121)*. When that happens, grep every placement rule that enumerates the old
  ones, and add the new candidates as a second pass rather than another rung in the first.
- ⛔ **A minimum over n is not a measurement, it is the unluckiest sample** *(#145)*, and it gets
  worse every time you look. Two nerfs were drafted against a worst case that n=50 said did not
  exist. **Measure a tail as the fraction of runs under a threshold.**
- ⛔ **Build the literal ask first when it is cheap, then measure it, then refuse it if it does
  nothing** *(#146)*. The measurement is what earns the right to ship the better version instead of
  arguing about it.
- ⛔ **Re-measure a remainder before scheduling work against it** *(#147-#149)*. #133's *"the sheet
  still scrolls 65px"* had already been closed by #136 and nobody noticed.
- ⛔ **A report's premise is a claim, and a claim about what was deleted is one `git log -S` away
  from being checked** *(#151, and #114 and #136 before it)*. Three reports now have described a
  build that does not exist.
- ⚑ **The signal usually exists already, inside the room it is about** *(#150)*. What ships is it
  being visible from where the player decides whether to open that room.
- ⚑ **A sign is not a readout** *(#151)*. A forecast carries its uncertainty on its face, a receipt
  stays exact. It is rule 11 in [`README.md`](README.md) §4 now.

> **⚑ #152 SHIPPED 2026-08-14 (8f.180): wages fall due every FOURTH day now, not daily.** He asked
> the design question first (*"how often do you think i need payments for crew? I am thinking once
> in 4-5 days +-"*), the analysis answered **4** (daily was Battle Brothers' cadence without its
> hundreds-of-days timescale; a ~22-day run wants the Wartales shape, a dated bill you can see
> coming; 4 gives one payday per fork branch and a bill one good find can cover), and he ruled
> *"ececute this new system of padayin 4 day"*. The bill **accrues silently** and the chest opens
> **loudly** on the day - a gold flash on the chip and the purse, the coin sound, a road line,
> never a card - and the new **PAYDAY chip** counts down to it, which is the "add this to global
> map more clear" half. **Every crown price came off the roads in the same order** (map labels,
> fork rows, travel buttons: days only now), which cashed #150's last open remainder, and is safe
> because accrual keeps a longer road costing more. Two wages changed hands with it: **the Captain
> draws 1** and **the ogre is paid 2**, ending the one-crown joke. The missed-payday grievance
> (#5/#114: 10 mood a day, nerve on the field, the five-day walkout) is untouched except for when
> it starts: the first short day is a payday now. **Under the pass's own rule this is a MERGE**:
> ~22 silent daily charges became 5-6 dated events, and the only new pixel is the chip that
> replaced UPKEEP. Full record: [`SHIPPED.md`](SHIPPED.md) #152 and [`CHANGELOG.md`](CHANGELOG.md)
> 8f.180.

## The work, in order

| | | done when |
|---|---|---|
| **1** | **Measure the opening before touching it.** Words shown, cards opened, clicks made, and systems introduced, from launch to the first decision that costs something. | there is a number, and it is written down here |
| **2** | **[#86 - the first fifteen minutes](#86--the-first-fifteen-minutes)** | the numbers from step 1 are cut hard, and the teaching survives the cut |
| **3** | **The screen pass**, five surfaces, one at a time, before-and-after shots | ✅ 🎒 **company** *(#133 · #136 · #140)* · ✅ 🗺 **road** *(ten rounds, #103-#107 · #112-#117 · #121)* · ✅ 📜 **aftermath** *(#122)* · ✅ ⚔ **battle** *(nine passes, #88 · #91 · #94-#105)* · ⏳ 🚪 **front door** - rebuilt by #108, #111, #118-#120, #138 and #150, and what it still owes is step 1's measurement · ⏳ **the practice field**, untouched. ⚑ **The target for what is left is a number: 61 declarations below 10px** outside the battle screen (2 at 7px · 5 at 7.5px · 9 at 8px · 16 at 8.5px · 13 at 9px · 16 at 9.5px). Each round's rules are in the focus section above; the rows are in [`SHIPPED.md`](SHIPPED.md) |
| **4** | **[#39 - Meet the Rabble](archive/BACKLOG_ENTRY_SPECS.md)** | the crew is introduced without a fourth modal. **It must replace or enrich the arrival cards, never add to them** |
| **5** | **Re-measure**, and hand it to the ten friends | step 1's numbers, run again |

---

## 86 · The first fifteen minutes

> 🚪 **THE FRONT DOOR** and 🗺 **THE ROAD** - also ⚔ the first fight
> **SYSTEMS** the tavern prologue · the arrival cards · `COACH` · `whisper()` · `? RULES` ·
> #60's ten Captain lessons · the fork card · the first battle's action row
> **RELATED** #39 (the crew's introduction) · #60 (its open remainder IS the per-round cap) ·
> #14 (the three onboarding layers, shipped) · #43 (the speaking budget)
> **STATE** ⛔ specced only. **The gate is unpaid: no picture yet, and no measurement yet.**

**The entry is the feedback, and the number exists so the pass has somewhere to live.**

**What the opening currently runs, in order,** and the length of this list is the finding:

the tavern prologue cards → the joke and its verdict → the lord's brief (Skelbrook) → the map card →
the arrival whispers → the first fork → **Blood on the Road**, which is a four-or-five round fight
carrying **eleven Captain lessons**, allied NPCs you do not command, a side to pick, facing arcs,
engagement, the nerve ladder, cooldowns, two actions a turn, and a race skill.

**Three candidate cuts, and none of them is decided.** They are written down so the measurement in
step 1 has something to argue with:

1. **Cap the lesson rate.** #60's own open remainder already says this: *"eight to nine lessons
   landed inside a four or five round clash... if it reads as narration rather than teaching, the
   fix is the per-round cap, not the lesson count."* ⚠ **The thing this must not delete is the
   teaching.** A lesson that fires when its rule first bites is the cheapest teaching in the build
   and the most expensive to rebuild if it goes out with the prose.
2. **Delay a system rather than explain it.** The first fight does not have to contain every rule
   the game owns. Anything that can first appear at the Ruined Steading instead of at Blood on the
   Road is one fewer thing in the fifteen minutes.
3. **Fewer options on the opening cards.** The style rule already caps a card at four options
   ([`README.md`](README.md) §4). The opening is where that is worth being stricter than the rule.

**⚠ The trap in this entry: the opening is crowded, not empty.** Every instinct to "make the opening
clearer" adds a screen. Read the complaint again before writing anything.

> ✅ **#108 SHIPPED against this entry (2026-08-12, 8f.135): the Three Bells brawl**, the user's
> direct order. The run now opens with a scripted tavern 1v1 that grows in waves and teaches
> morale, armour, kick, the corner, the ratkin and a class skill with spotlight callouts on the
> real UI, while Blood on the Road's eleven balloon lessons stay muted there and unspent. **What
> this changes for #86: the cut of the first fight's lesson load is now SAFE to make**, because the
> teaching has somewhere else to live. The measurement in step 1 still comes first. Full record:
> [`SHIPPED.md`](SHIPPED.md) #108 and [`CHANGELOG.md`](CHANGELOG.md) 8f.135.

> ⚠ **AND #112 ADDED A NODE TO THE OPENING ON 2026-08-12** *(8f.139, the user's direct order, the
> same door #108 came through)*. **The Falling Star** sits between the tavern brawl and Blood on
> the Road, which had been two fights back to back; the road east is two days where it was one, and
> the wagon starts with 17 more crowns to pay for it (his number, in his sentence).
>
> **What this means for the measurement in step 1, and it has to be said plainly: the opening is
> one card and one day LONGER than it was when the complaint arrived.** That is not a violation of
> the pass by accident, it is the user overruling it deliberately in two consecutive orders, and
> both orders point the same way: he is not asking for more systems, he is asking for the two
> fights at the start to stop being adjacent. **The Falling Star adds no system, no screen, no hint
> layer and no resource** - one card, four options, and what it teaches is the pillar, which is
> the one thing the opening is supposed to teach.
>
> ⛔ **So step 1 must measure the opening AS IT NOW IS**, including the brawl and the star, and the
> candidate cuts above are to be re-argued against that number rather than against the one in the
> complaint. Full record: [`SHIPPED.md`](SHIPPED.md) #112 and
> [`CHANGELOG.md`](CHANGELOG.md) 8f.139.
>
> ⚑ **AND ON 2026-08-13 THE STAR LEFT THAT SLOT AGAIN, WHICH IS THE FIRST TIME THIS PASS HAS
> SUBTRACTED FROM THE OPENING RATHER THAN ARGUED ABOUT IT** *(#141, 8f.169, the user: "after tavern
> fight - next event instead of faling star (it could be a random event somwhere)")*. **The node
> stays. The beat stays. The two days stay. The CARD changed**, and it changed from a four-door wish
> that spends a permanent stat to a two-door pickup that costs nothing to understand. The star went
> into `FLOATING`, so it still happens, later, somewhere nobody scheduled.
>
> ⛔ **The number step 1 has to carry forward is therefore not "the opening is one card longer" any
> more, it is "the opening is one card longer and that card is now LIGHT."** #123's choice-weight
> rules (`01_GAME_CONCEPT.md` §5) are what make that a measurable difference rather than a taste:
> the second node used to ask for a decision the player would retell and now asks for one they will
> make in two seconds. **Whether the opening still needs the beat AT ALL is the question step 1 was
> always going to answer, and it is now the only thing left to argue about here.**

> ✅ **AND #118 + #119 + #120 RESHAPED THE OPENING ON 2026-08-12** *(8f.145-147, the user's
> five-task batch, built autonomously - the same door as #108 and #112)*. **The opening is the
> user's script now: the fight FIRST, the contract as its consequence.** One backstory card (a
> failed nobleman-venturer, alone; his own pint over his head; draw your sword) → the brawl →
> the man in the corner makes the Skelbrook offer with the old three replies intact → the
> company picks its own two-word name (7×7, deliberately ugly, signed along the bottom of the
> map) → a SHORT map card → **five spotlight steps on the #108 sheet** teaching the contract,
> the chest, the company, the day and the road, each beside the real element. The menu's "How
> any of this works" row became **The tutorial fight** (the brawl as a free practice fight;
> `? RULES` still owns the reference).
>
> **What this does to this entry's ledger:** the long first map card is CUT (four paragraphs →
> two), its teaching moved next to the furniture it describes, and the lord's pre-fight card is
> GONE as a separate beat - the opening now runs card → fight → cards, not cards → cards →
> fight. **Step 1's measurement must be taken against THIS opening.** Full record:
> [`SHIPPED.md`](SHIPPED.md) #118-#120 and [`CHANGELOG.md`](CHANGELOG.md) 8f.145-147.

## 137 · The seven-item pack, and 138 · the opening's post-brawl chain

> ✅ **BOTH SHIPPED 2026-08-13** (8f.165, 8f.166) and both are on the live link. One brief from the
> user, split across two numbers because five of its items were ordinary surface work and two of
> them were the front door.
>
> ⚑ **#138 got smaller after the mockup, and that is the entry's best moment.** The drawn card was
> built to carry the two existing doors settling in place. He looked at it and cut one of them
> outright - *"delete option 'put him on the floor' it is irrelevant"* - and turned the other into
> *"Finish your drink and leave"* straight to the map. **So the opening now contains no decision at
> all**, which is further than the spec dared go and is right: the card hands over a contract, a
> crew and a name, and the first real decision becomes the fork on the road, in a game about the
> road. **The mockup earned its keep by being cheap enough to be overruled.**
>
> **[#137](archive/BACKLOG_ENTRY_SPECS.md)** *(8f.165)* - the aftermath's haul line rebuilt off
> `haul.fx` with the top bar's own `RES_ICON` glyphs instead of 11.5px prose · **DISENGAGE's extra
> hex moves from NEXT turn to THIS turn** and takes a `cool:2` lockout, which is his *"so it makes
> sense and easier to escape"* · every event door carrying `battle:` renders red from one gate in
> the renderer (five fight doors ship un-marked today) · **four `learn`-tier Captain lessons
> deleted** because the #108 spotlight now teaches the same four rules ten minutes earlier · the
> map token wears the company's own name.
>
> **[#138](archive/BACKLOG_ENTRY_SPECS.md)** *(8f.166)* - **four full-screen cards between the
> brawl and the map become one.** Two of the four carry a single button that cannot be refused,
> which is the exact defect #118's own comment describes killing once already, on either side of
> the decision. The receipt joins the corner-table card, the pick settles in place, and **the
> naming strip appears only after the contract is accepted** - his second line, and the order the
> name card's own prose already assumed. ⛔ Nothing is deleted but the two dead buttons.
>
> ⚑ **This is #86's measurement arriving as a bug report before the measurement was taken.** Step
> 1 above still owes a number, and #138 changes the thing step 1 is supposed to count, so **the
> count must be taken against the post-#138 opening.**

---

# 🟡 NEXT - after the clarity pass, still before the friends play

*Fairness and finish. **Nothing here adds a system either.** These wait because the feedback did not
name them, not because they stopped mattering.*

| # | what it is | why it waits here | full spec |
|---|---|---|---|
| ~~**101**~~ | ✅ **CASHED BY #126, 2026-08-13 (8f.155).** *"The archer that is not allowed to leave"* is closed from the enemy's side, and the two gates it named were exactly the two that were wrong: the kite's `!engaged(u)` (so it switched off at the moment it was for) and AUTO having no kite at all. `fallBack` charges the parting swing now, because `walkTo` is not `clickHex`. ⚠ **Its own measurement was NOT re-taken** - 26% of archer turns with a 20%-or-better shot spent walking, and 119 dry ENGAGED turns of 874 - so whether those numbers moved is still an open reading, and #99's instrument is still the harness for it. ⚠ AUTO's kite is emergent (it retreats because the band scores hexes that way) rather than an explicit rule, so a future band change moves it silently | see [`SHIPPED.md`](SHIPPED.md) #126 |
| **13** | **The balance harness earns its keep** | ⚑ **the instrument.** Without it every balance session below is somebody's opinion. `window.ARENA` exists and has gone stale around every combat change since | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **89** | **The combat benchmark, and the three things it did not measure** - ✅ the document is written: [`COMBAT_BENCHMARK_2026-08-11.md`](COMBAT_BENCHMARK_2026-08-11.md) | ⚑ **the second instrument.** #13 measures *win rates*, this one measures **shape**: Grimtoll now sits in a table beside Battle Brothers, Wildermyth and Wartales at **8.45 rounds · 71.4 unit-turns · 115 actions · 1.61 actions per unit-turn · 4.6 skills per unit**, all measured. ⛔ **The remainder was three MEASUREMENTS, not builds** - the mop-up tail, a real stopwatch, and hit-rate distribution - so it does not argue with the clarity pass. ✅ **HIT-RATE DISTRIBUTION IS NOW TAKEN** (2026-08-13, during #146, ~1,200 swings a side across all eight fights, probed at `hitBreakdown` inside `runFight`): **before the pass, mean 60.3% · yours 58.7% · theirs 61.8% · 30.5% of every swing in the game was a coin flip or worse.** After: **65.6% · 66.3% · 65.0% · 19.4% under fifty.** ⚑ **AND THE MEASUREMENT FOUND SOMETHING NOBODY HAD ASKED ABOUT: BEFORE THIS PASS THE ENEMY WAS THE BETTER-AIMING SIDE**, by three points, in every fight in the act. It is not in any statblock - it falls out of the penalties only the player's side pays (shooting in a scrum, their own nerve, cautious) against the flanking bonus a side with more bodies collects - which is **THE FIGURE IN A STATBLOCK IS NOT THE FIGURE ON THE BOARD** arriving on a quantity nobody had thought to point it at. ⏳ Two measurements still open: the mop-up tail and a real stopwatch. Two readings are already live: **`brigand` runs 2.4x the opener at an even 6 v 6**, which is the exact shape of Wartales' *"longer, not harder"*, and the **enemy skill gap is 2:1** in the player's favour, which is what "one strategy beats everything" looks like from the inside | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| - | **The class pass** - pick up each of the seven and adjust | the human test the arena cannot run: **can the class be said in one sentence.** A class that needs a paragraph is a balance problem wearing a UI problem's clothes | [reasoning](archive/PLAN_REASONING.md) |
| - | **The race pass** - three ways to play, not three stat blocks | three banked questions: the poison stack is uncapped · a gilled body reaches 62% further in the swamp · is an ogre's 3 stride a tax or a shape | [reasoning](archive/PLAN_REASONING.md) |
| **50** | **The balance pass, at playtest grade only** | make the eight fights survivable, readable and fair. **Not the terminal pass.** Order matters: classes, then races, then fights | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **27** | Balance: the optional fight is harder than the finale | inside #50's parking lot, and one of the few balance readings already written down | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **12** | Painted faces, pack 03 | mostly the user's generator work. A face is legibility, so it is arguably clarity work, but it is not a subtraction | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **158** | ➹ **The shot that always hits** | ⛔ **specced only, and deliberately unbuilt** - the user's own framing, 2026-08-14: *"add a skill (for the future, into the perk branch which is under development)."* An archer PERK, 2 actions, cool 3, **55-60% of the bow**, and it ignores the roll and only the roll: ⛔ the lane still refuses it, or *"always hits"* deletes #82's cover and #36's lane in one perk. ⚑ Its reason is measured rather than felt - the average chance to hit is 65.6% and 19.4% of swings are under fifty, so what an archer lacks is not power but the ability to **promise** anything. **It waits on #50 or at least #13**, because its value is exactly as large as the current hit rate is bad, and this pass has already moved that number once | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **47** | The spear becomes a zone | **a rework, not an addition**, which argues for earlier. It touches enemy AI in **both brains**, which is not what you destabilise the week before strangers arrive. **The trigger that pulls it forward:** the class pass finds the spearwoman unsayable in one sentence | [spec](archive/BACKLOG_ENTRY_SPECS.md) |

---

# ⚪ LATER - the depth pass, after the friends have played

*This is not a demotion. Most of it gets **cheaper** once the two foundations at the top exist.*

**Two foundations gate the rest, and the word gate means something else cannot start:**

| # | what it is | what is blocked behind it |
|---|---|---|
| **24** | **The provenance ledger** - `addFact` / `facts` / `latestFact` + `characterRef()`. The id is the reference; the snapshot is so a dead, dismissed or renamed person can still be talked about three hours later. **Double-write first, migrate never** | **#19 #22 #23 #25**, distant #26, #34's chain, and all of Act 2's memory. ⚑ **#38's typed bonds are its first real tenant** and currently live in their own store: absorb it rather than leaving two ledgers |
| **4+17** | **Body parts you can lose + mutations you can see.** One painter API, used in opposite directions: a lost part draws as outline-plus-cross, a mutated part is redrawn as a different shape | **#34 #35 #16** |

**Then, and the order inside is the tier order:**

| # | what it is | one line |
|---|---|---|
| **34** | ☠ **The mortality chain: scarred → maimed → dead** | ruled by the user 2026-08-01. **Death is the end of a visible chain, never a roll.** ⚠ Nothing in the build kills anybody on the roster today. Waits on #4+#17 |
| **32** | The rally rule | a routed body may not re-cross the rout line alone: it needs the Captain within 3 hexes or a steady ally adjacent |
| **2** | Personalities that command the AI | AUTO becomes a judgement about who you trust with which part of a fight |
| **35** | Grafts: rare authored consequences | of injuries **or of events on the road**. Not a doctor's menu. Start with one: Shield-Skull |
| **45** | ★ Reward the combination, not the repetition | the synergy rule. Deferred, and it returns as the first thing the terminal #50 builds |
| **78** | A good thing you carry takes something away | the gear side-effect contract. **The cost is paid on a different axis from the benefit.** ⚠ its quiver is blocked on a ruling that reopens #45 |
| **80** | The weapon gets its half of the armour bands back | ⛔ **hard order constraint: before the TERMINAL #50**, or the sweep gets done twice. #79 left a measured balance debt and this moves the number back |
| **16** | The rest of the mutations | 3 or 4 of the 14, never all. Each needs a real battle rule |
| **3** | The clash recruit is already changed | puts a mutation in front of the player in the first hour and gives the tutorial fight a cause |
| **22** | The road reads the company | waits on #24. *"Every Rabble is different"* should be visible in the prose, not only the stat screen |
| **19** | Desperation contracts at the Muster | waits on #24. ⚠ owes a rewrite: it promised a recruit *first pick of the loot* and there is no pick any more |
| **23** | The cost of command | waits on #24. The Captain's sheet only, and **facts with names, never a morality score** |
| **25** | Personalities that earn their evolution | waits on #24. Count qualified risky successes, never repeated actions |
| **59** | The woman from the cage comes back | spare Wynn, and in a **later run** she is waiting at the last quiet node and fights the Snare as an ally. She joins the fight, never the company |
| - | **Settlements & Legacy MVP** | the inheritance screen first. It is what makes a lost run mean something. [`09_SETTLEMENTS_AND_LEGACY.md`](09_SETTLEMENTS_AND_LEGACY.md) |
| **21** | What they did without you | strict thresholds and authored templates. If nothing exceptional happened, show nothing |

---

# ⏸ PARKED - with intent, never rejected

| # | what it is | why it waits |
|---|---|---|
| **134** | 🃏 **The joke at the man with paid swords** - the opening's cut third reply. *(Parked 2026-08-13 by the user: "make a joke option put from the opning to our ideas/things for future set.")* **"Agree with him. Cheerfully."** answered *"You scum"* with *"Scum, my lord, and cheap with it. You will not find better value in this county, and you have clearly been looking."* Then `Math.random()<0.5`: it lands and he pays **120** instead of 80, tells his swords this one can read, and leaves without shutting the door; or it does not, and the nearer sword puts a cudgel in your ribs for **50** and 16% of the Captain's hitpoints. | ⛔ **Why it was the right one of the three to cut**, and the note to argue with when it comes back: it put a **coin flip on the player's first real decision**. The other two are the pillar in one card (pride costs money, money costs pride) and a fifty-fifty beside them is not a third door, it is a lottery ticket nobody can reason about. **What it needs to return is a reason the player can read** - a stat gate, a trait, a personality, anything that makes the joke a judgement instead of a dice roll. ⚑ **Nothing was torn out:** `PRO_ART.joke_hit` still maps to EV00C (the rule file requires that mapping preserved and the painting is good), and the `verdict` banner machinery is intact. Full prose in [`CHANGELOG.md`](CHANGELOG.md) 8f.162, so this is a paste, not a rewrite |
| **49** | Make the AI explain itself | **deferred by the user.** The gate was paid: the rules are written and the picture was drawn, so it returns as a *build* session, not a design one. ⚠ **The picture itself is gone** - `shots/49_ai_explains.html` was deleted in the 2026-08-14 shots cleanup, and `shots/` was never in git. The written half survives in full at [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md) §49, so redrawing it is an hour, not a session |
| **26** | The Smaller One | seven cards of content. Needs #24 first. **First candidate to graduate back** |
| **28** | The Act 1 stinger | demo-ending content, and the enemy still needs a real name |
| **29** | Zone of Control, the better version | cut once for making movement unaffordable. Needs #13 to measure a return |
| **30** | Action economy remainder: quiver, slow mage | its base rule was superseded by #45; **#78 is the new contract it waits for** |
| **37** | AUTO doctrines: PRESS · KEEP LINE · HOLD & SCREEN | needs a mature, trusted AUTO, so it sits on #2 |
| **42** | AUTO gets one flourish | after #37 |
| **43** | The narrator's budget | production-stage. **The audio ranking applies today**: action readability → barks → narrator → ambience |
| - | **ACT 2** | parked by the user 2026-08-01: *"Delete act 2 for now as in plan."* Nothing about it is rejected. **Deeper beats longer**, and the feedback above is an argument for that, not against it |
| - | The ScenarioSpec / dev-menu half of the Battle Lab | tools for the builder, not the game. Test mode and the linter cover the need |
| - | The Godot port | still the production target. Scope-lock after the systems stop moving |

---

# 👤 YOURS - not a build session

*Running in parallel, and none of it consumes a session here.*

| | what it is | state |
|---|---|---|
| **#77's round trip** | you edit [`content/events_book.html`](../content/events_book.html), then a session reads your edits back into the prototype | ⏳ **the doc is generated; nothing reads it back yet.** The three rules that make it possible are in the doc: keep the `[key]`, comment a deletion, leave the `{TOKENS}` |
| **The event art** | no event card falls back to a placeholder. By your own order this waits on the texts | ⏳ |
| **The unit sprites** | a body still reads at **x2.50**, the closest camera stop. **The size target is a number now, not a guess** | ⏳ |
| **Music and sound** | #8 shipped a sound for every verb and both rungs of the nerve ladder, and **the builder cannot hear it.** Step one is you listening and ruling | ⏳ |
| **#76's form** | the mailto send shipped in 8f.86; you verify it from the published page | ⏳ |
| **#57 event analytics** | ⛔ **do not pick this up here.** Your own task in a separate tab, the ANALYTICS tab of [`tools/dramaturge.html`](../tools/dramaturge.html), and **its spec lives inside the tool.** What this repo owes it: a stable journal blob, currently **v3**. If a row's *shape* ever changes, bump `v` and say so here | 🚧 running |

---

# The gate: ten friends

**What the gate is for:** *does it survive somebody who is not you?* Friends forgive rough edges, so
this gate tests **understanding**, not tolerance. That is exactly what the 2026-08-10 feedback is
about, which is why the focus above replaced the old thirteen-step list.

**The collection instrument already exists and needs no work.** #53 and #54 shipped the ★▲▼ bar on
every screen, reactions attached to the exact screen, a decision log, a per-run report, and a
copy-paste blob so a friend's journal travels home. #76 added the questionnaire and the send. So the
gate needs a build, a link, and a sentence asking them to paste the blob back.

**Questions to ask them, written before they play, because a question nobody wrote down is a run
wasted.** Each one came from a shipped entry that said some version of *"the harness structurally
cannot answer this"*:

| the question | from |
|---|---|
| is **"send somebody wide"** on the Thing in Armour worth the person it costs? | #18 |
| does the **bloom flower** actually force you to move? *(that was its whole reason)* | #64 |
| should the **Fen-Mother** get flowers after all? 11-29 rounds with, 8-23 without | #64 |
| is **24% wet** enough to READ as a swamp? the honest lever is the painting, not more water | #63 |
| is the **forest** interesting, or merely slow? | #56 |
| do the **sounds** actually sound right? | #8 |
| does the **first-fight teaching** read as teaching, or as narration? | #60 |
| what is the **haul worth** now that it cannot be optimised against the stash? | #55 |
| the **four camera questions**: distances, default stop, claustrophobia, hex text | #66 |
| is **×1.75** the right board speed? | #81 |

**Split them.** Feel-over-a-whole-run goes to the friends. A single screen or a single number goes
to a playthrough here, which is cheaper and repeatable. **Do not spend a human on anything the arena
could have measured.**

*(Gate 2, twenty to thirty strangers, is deliberately unwritten. What is worth recording now is what
changes between ten and thirty: **a friend asks you what a screen means, a stranger closes it.**)*

---

# Two rulings still waiting on you

*Both are one line, neither blocks anything. From the QA day, details in
[`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md).*

- ~~**QA-7: fleeing the Thing in Armour deletes the Dead Company beat.**~~ ✅ **CASHED BY #157,
  2026-08-14 (8f.185), and by a fourth way nobody had listed: the fight cannot be fled at all now**
  (the user: *"you must not be able to leave the battle with the man in armour"*). No fled path, no
  seam, and nothing downstream needed a special case. ⚑ **The lesson is worth keeping: a ruling can
  be closed by a change made for another reason entirely**, so re-read the parking lot when a
  system it names is touched.
- **QA-27: the defeat epilogue opens with "The bells are still ringing"** wherever the company dies,
  including half a map from Grausen. Keep it placeless, or key one clause on where the run ended.

*(Five older open questions live in [`README.md`](README.md) §5: the name, AUTO doctrine, numbers in
the chronicle, the run contract, generated voice. Nothing is blocked on any of them.)*

---

# How this file works

**One list, one order, one truth.** ⛔ **There is no second priority system.** Tiers, date buckets,
screen groups and a thirteen-step gate plan used to sit on top of each other in this file, and four
overlapping orders is the same complaint the playtesters made about the game. They were collapsed
into the four headings above on 2026-08-10. The reasoning that produced them is kept in
[`archive/PLAN_REASONING.md`](archive/PLAN_REASONING.md).

**One entry per session.** Do not batch. Each touches combat or character systems that are easy to
disturb.

> ## ⛔ NOTHING HERE GETS BUILT STRAIGHT FROM THE ENTRY
>
> **1. Write out the actual rules** - costs, targets, cooldowns, limits, what it takes away.
> **2. Show a picture. Mandatory.** ⚑ **Make it IN THE GAME** whenever the thing has a screen
> already: stand the real board up in the practice field and `shotBoard()` it, annotated. Hand-draw
> only when there is nothing to photograph, and keep it to the **two or three panels that carry the
> decision**. **3. Then build it. 4. Write its section in
> [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md)** the same session it ships.
>
> Set by the user 2026-07-31: *"That way we keep it clean and don't do extra job."* Every time it
> has been skipped, work has been thrown away.
>
> Applies to any new ability, resource, screen, panel, overlay or player-facing rule. Does not apply
> to bug fixes, wording, or balance numbers on something that already exists.

**When an entry ships, four writes:** full text and a build-log row → [`CHANGELOG.md`](CHANGELOG.md)
· a one-line row → [`SHIPPED.md`](SHIPPED.md) · **strike it from this file entirely** · a section →
[`WHAT_TO_TEST.md`](WHAT_TO_TEST.md).

> ## ⛔ DO NOT PICK A NUMBER. ASK FOR ONE.
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 number
> ```
>
> **Run it before you write anything.** It scans the docs, the prototype and `shots/`, hands you a
> `#NN` and an `8f.NNN`, and reserves them in a file that cannot be created twice, so a session
> running beside you cannot be given the same ones. `claim.ps1 status` says who holds what.
> **`git commit` now refuses a change that spends a number somebody else is holding.**
>
> **This replaced a sentence in this document, and the sentence was the bug.** It said *next free
> #NN*, it was maintained by hand, and it was written **last**: the code and `shots/` get the number
> first. So at the moment the other session grepped, this line was already wrong. That cost **five
> collisions** and nearly two more on 2026-08-11, when both docs said *next free #89* while two
> sessions were both building #89. ⚑ **Neither tell was in a document.** `ls -t shots/` caught both,
> which is why the script reads `shots/` too.
>
> Full rules, and what else two sessions collide on: [`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md).
> **If you are going to change the prototype, take it first:** `claim.ps1 lock -Title "..."`.

**Which model builds it.** 🧠 **STRONG** for anything touching the two AI brains, morale, the save,
combat rules or the game's voice: every expensive bug here was subtle-systemic, and the tone is as
easy to get almost-right as the code. 🔧 **SONNET-OK** for mechanical, render-only or
schema-following work with an exact spec and a verifiable result. Either way **the strong model owns
the session** and may hand fenced mechanical sub-chunks down; the reverse is forbidden, because a
cheap model cannot escalate judgment it does not know it is missing.

---

# Where everything else lives

| | |
|---|---|
| [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md) | **the full text of every unbuilt entry.** Come here when you pick one up |
| [`archive/PLAN_REASONING.md`](archive/PLAN_REASONING.md) | why an entry waits, what was rejected and on what grounds. History, not instructions |
| [`README.md`](README.md) | what the game is, the pillar, the traps that keep biting |
| [`SHIPPED.md`](SHIPPED.md) | one line per shipped entry, and **every open remainder named** |
| [`CHANGELOG.md`](CHANGELOG.md) | the build log with the reasoning, and every shipped entry in full |
| [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) | **the user's file.** How to reach each new thing in three steps and what it should do |
| the running build | **what is actually true. It wins over every document.** |
