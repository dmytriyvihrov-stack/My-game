# Grimtoll - the plan and the backlog

> **This file is the WORK.** What we are doing now, what waits, and one line per entry.
> The full spec of any entry lives in [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md).
> ⛔ **Open the one entry's section there, never the file: it is 152 KB.**
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

> **⚑ #87 shipped against complaint A on 2026-08-10, and the reason it is allowed under the rule
> above is worth stating.** Every skill in the game now has its own animation, from **eight
> primitives keyed on what an act does**. It adds **no card, no option, no hint layer and no word of
> text** - it makes a verb legible at the moment it happens, so the board explains itself instead of
> a note explaining the board. **That is subtraction of reading, not addition of system.** ⚠ The
> honest caveat: it is one more thing moving on a screen the report already called crowded, and the
> per-round motion budget is a real question for the measurement in step 1. See
> [`SHIPPED.md`](SHIPPED.md) and [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md).

> **⚑ #123 SHIPPED against complaint B on 2026-08-12 (8f.150), and it is the pass's cleanest
> subtraction so far: nine road events lost eleven doors.** The user's ChatGPT conversation on
> decision fatigue became standing rules in `01_GAME_CONCEPT.md` §5 ("The choice economy": a card
> is LIGHT / MEDIUM / HEAVY and the road mixes them; uniform decision density, not event count,
> is what numbs a player), and then the rules were applied: the sling-line is "fight or go
> around", the Drowned Chapel is a one-button salvage pickup, the Fen-Mother lost her duplicate
> battle door, and six more cards each lost the door that was not a decision. 31% of the
> multi-choice road events, inside his asked 30-40%. **Round two landed the same day (8f.151, his
> "additional 20%"): five more events at 4→3 (camp · saltwives · ratcart · shrine · bogbody),
> running total 14 of 29 (48%) and sixteen doors gone or merged.** 👤 One call awaits him (the
> chapel's mutation-gated door stayed, see [`SHIPPED.md`](SHIPPED.md) #123), and the measurement
> §5 now names - *the event at which a player stops reading options* - belongs to the next
> playtest.

## The work, in order

| | | done when |
|---|---|---|
| **1** | **Measure the opening before touching it.** Words shown, cards opened, clicks made, and systems introduced, from launch to the first decision that costs something. | there is a number, and it is written down here |
| **2** | **[#86 - the first fifteen minutes](#86--the-first-fifteen-minutes)** | the numbers from step 1 are cut hard, and the teaching survives the cut |
| **3** | **The screen pass**, five surfaces, one at a time, before-and-after shots | 🎒 company *(✅ **DONE as #133, 2026-08-13, 8f.161: designed AND built in one night.** The user's five-screenshot voice brief (Urtuk's one screen, Qud's slots-on-the-body, BB's compactness, Wildermyth's before/after) went to a clickable template first by his order - *"start from building design template, as usual, rather than updating main file"* - and then, on his second order the same night, into the prototype. ⚑ **It opened the way #88 taught, with a measurement, and the measurement is the entry**: a level-4 body with two scars, a change and banked points was **1241px of sheet in a 678px window, 564 words**, with the SKILLS block alone spending 230 words re-typing what the battle's hover already says and the four stats sitting ~520px down, UNDER the prose. **The complaint was not that the sheet was ugly, it was that the sheet's ORDER argued the history mattered most and the numbers least.** Shipped at **678px, no scroll, 242 words**: identity in three lines, then the stats band, then the body with its four gear slots hung beside the part they belong to and wired to it, then the skills as the battle's own cards, then the history in the room the gear gave back, with the stash and the whole perk tree behind tabs and a ★ badge carrying a banked point across the wall. ⏸ **The bags he floated are PARKED**: no throwable and no mid-fight swap rule exist, so a bag slot today is furniture, and it returns WITH its rule or not at all. ⚠ Open and small: the fold rule (`#iBody{height:232px}`) is unapplied, so a body carrying every kind of mark at once still scrolls 65px. ⛔ **Its lesson belongs to the parallel-session rule, not to the screen: an expired lock is not a free desk.** `claim.ps1 status` says a lock is 8.2h old; it does not say whether anybody is coming back to it, and the other session took the file back mid-build and committed this work itself. **A second reader of the same fact went unfixed for months and surfaced in the same minute**: the pre-commit `verify` read a six-digit CSS colour as a claim on another session's entry number, a trap `Get-UsedNumbers` had been hardened against and `Verb-Verify` never was. Both the sheet and the tool fix are in [`SHIPPED.md`](SHIPPED.md) #133. **ROUND TWO IS #136, the same day** (8f.164, eleven points): the middle band shrank, **the kit went ONTO the body** (armour classified off its value, the weapon off what it does, so new gear arrives wearing the right silhouette with no list to update), the three pools stack in the battle plaque's own column **after measuring that the row was never tall but 704px wide for three fifteen-character readouts**, the tile became a portrait, one popover now serves the whole sheet, ACTIONS reached the sheet through `apPips`, the stash tab took the road bar's drawn sack, the story became an accordion whose head carries the kill heads, and a waiting perk point says so four times **including a ★ on the roster rail, the only signal visible without opening that person**. ⚑ **And one of his eleven had already shipped**: the classical stat names landed hours earlier in another session's #134, so the note was written against a build one commit old. **Third time a report has arrived carrying an already-fixed point (see #114 point 1), and the check is one grep**)* · 🗺 road *(rounds one AND two are DONE as **#103 + #104**, 8f.130/131, both 2026-08-11: the top bar on the Battle Brothers shape off the friends' "unclear what he is seeing", then the user's nine-point design pass the same day - the Captain's painted head on the party chip, drawn sack/heart/paw, the battle ladder's faces on the mood chip, ◉ everywhere, a framed contract, a turning sun-and-moon disc, the walk x3 slower, and the dead second row deleted with the map re-mapped 638 -> 678 through one vy(). and **#106 is round three, the same day**, which is the budget rule landing on the nose: eight points, seven of them corrections, and **the one real bug arrived described as a spare asset** - *"a cutted picture that doesnt work"* was the company token itself, unplaced, because `enterWorld` never called `placeToken` while the menu's Continue did. ⛔ **Test the path the PLAYER takes first, not the path the harness takes.** Its other finding: **a state that fires on a COUNT of people rather than on a QUANTITY will always lie at one end** (two scratches across four bodies painted the heart fully empty) - **and #107 hit the same shape a fourth time**, replacing the rations offer's *anybody is hurt* with the company's average blood. **#107 also cashed #104's own open remainder**: the sun/moon wheel became a real time of day by being driven off the WALK (the one thing here that reliably takes time) rather than a CSS loop, and ⛔ **nothing mechanical is allowed to read it** until somebody rules how long a day is)* · 📜 aftermath *(✅ **DONE as #122, 2026-08-12, 8f.149** - the user's Battle Brothers brief, three rounds and a clickable mockup in one day, then built and verified on the player's own path. Screen one is the whole report (crew grid off the rail's painted faces, ☠ ⚔ 🩸 with `taken` new in `strike()`, state on the FRAME: blood, gold arrow, both stacking, an ash DEAD state banked for #34), loot GIVEN never chosen, the enemy roll behind an accordion, no resource totals; screen two is the prisoners only, so half the fights are one screen, which is this pass's kind of arithmetic. The promotion pick moved to the sheet (perk points as before, the new `statPoints` spent on the WHO THIS IS tells). See [`SHIPPED.md`](SHIPPED.md) #122)* · 🚪 front door · practice field. *(⚔ is DONE nine times over (#88, #91, #94, #95, #96, #98, #100, #102, #105 - and ⛔ **the count is the finding: nine passes on one surface, eight of them inside seventy-two hours, and the user was right every time**. ⚑ **#105 is the one that changes what the count MEANS.** Rounds three to eight were furniture; round nine's list read like taste - *delete this line*, *make the walker bigger*, *give the picked soldier a border* - and **three of its eight points were faults that had been shipping for weeks**: a ten-pixel disagreement between the hex grid and the canvas painted under it (which was both the black line AND every puddle in the game sitting off its own tile), a walking body drawn at 40-61% of a standing one because #bFx sits outside the zoomed layer, and #100 point 11's clipped ring reappearing on the top edge because only the right edge was ever fixed. ⛔ **SO THE RULE THE OTHER FOUR SURFACES INHERIT IS: BY THE EIGHTH PASS, A COMPLAINT THAT SOUNDS LIKE TASTE IS PROBABLY A CONSTANT THAT IS WRONG.** Measure the thing before agreeing with it or arguing with it): the board passed 8f.65, the unit panel as **#88**, the **whole battle frame as #91** (8f.121, 2026-08-11 - the user's own seventeen-point relayout, mocked, picked and built in a day, board 57.8% → 85.5%, words 262 → ~160), and its **rounds three, four and five as #94, #95 and #96**, all on the same day, **#98 the queue**, **#100 the furniture** and **#102 the furniture again, plus two readouts that were lying**. ⚑ **#102's finding is the one that generalises to the other four surfaces: ten of its twelve points were layout, and the two that were not were the same bug twice - a control that changed something and could not say what it had changed.** SPEED's label counted in the engine's units (a duration multiplier), so pressing toward the bigger number made the board slower; nerve was a coloured chip, so it could name the rung and never say how close the next one was. **When a surface is asked for a third time, look for the readout that is printing the wrong unit rather than for another box to move.** ⚑ **#100's finding is the one to budget for: three of its fourteen points were a single box measured wrong** - the rail was shrink-to-fit at exactly one head wide, so the ring on the acting head had been clipped since the day the rail turned, and the report blamed the battle log, which was innocent. **Ask what the BOX is doing before believing which object is at fault.** ⚑ **Two findings to carry into the other four surfaces.** From #94: **nothing was asked to move back** - nine of its twelve points were finish on a frame twenty-four hours old, and the three that were real work were all one complaint, *the board was answering questions with a hover or with nothing*. From #95: **two of its ten points were corrections to #94 shipped hours earlier, and both were the same mistake** - a change that looked like an answer and answered nothing (a sectioned bar whose section was not a fixed quantity; a number put in a better place and left in the old one too). ⛔ **So budget THREE passes on a surface, not one, and expect the second to be finish and the third to be corrections.** See `WHAT_TO_TEST.md`.)* ⚑ **The target for the rest is a number: 61 declarations below 10px** live outside the battle screen (2 at 7px · 5 at 7.5px · 9 at 8px · 16 at 8.5px · 13 at 9px · 16 at 9.5px). ⚠ And take #88's lesson with you: **measure the box before you argue about the font**. **⚑ ROUND FIVE IS #112, 2026-08-12** (8f.139): the day plaque came up out of the map into the bar's 664px of measured empty middle, the walking company grew 10% and the Captain 10% again so that *"leader first"* is finally visible, and ⛔ **the fourth point is #105's rule for the SIXTH time, on a different surface: the complaint that read as taste was a class written and never styled.** The mood chip and the heart have opened cards since #106, both carry `class="bcchip click"`, and `.click` only ever had a rule under `.cchip` - so the two chips in that row that DO something rendered with `cursor:help` and no hover, beside two chips that do the same thing and have had the pointer since #103. **A row of chips disagreeing with itself about what a click means.** ⚑ **So the rule now has a shape worth carrying to the last two surfaces: when a report says a control does not feel clickable, grep for the class on it before touching the design.** **⛔ AND #113 PUT THE ART ON IT, 2026-08-12** (8f.140, the user's order: *"Chat gpt create icons to show on global map. Can you please put them on global map near related events"*): twenty-three painted cut-outs onto the nodes, and **the whole engineering content was one number** - the chip had to grow 33px -> 40px to hold a picture, and the brief asked for 48. ⛔ **THE ROAD SCREEN'S OWN LESSON, ARRIVING AS A CEILING RATHER THAN AS A BUG: this map is px-load-bearing and it has three pixels of slack in it.** The tightest vertical pair is f2/snare at 80px, the node was 69 tall against a 72 rule, so 40 lands at 76/79 and moves nothing while 42 breaks a pair and 48 breaks two. ⛑ **And the constant that had already drifted was in the OTHER file** - `NODE_PLATE_H`/`NAME_H`/`NAME_DY` are hand-copied into `tools/dramaturge.html`, **the tool this map is edited in**, so for the length of this change the editor would have approved a layout the game flags. **When a surface has a linter, grep for the second copy of its constants before trusting it.** **⚑ AND ROUND SIX IS #114, 2026-08-12** (8f.141, six user points off a screenshot): the sights left their chips and stand at their authored 48px with a silhouette ring carrying the old border's state colours, the company packs five to a rank up to three ranks with the Captain and the named cast in the front one (13 bodies = 5+4+4), and the UNPAID chip lost its day-counter: every unpaid day fines the shared mood 10 points, so the mood ladder IS the counter. ⛔ **#113's "40px measured ceiling" fell the same day it was written, and HOW it fell is the lesson: the ceiling belonged to the CHIP, not to the art.** Delete the box and the same map takes 48 with two coordinate nudges. **When a size rule blocks an ask, name the piece of furniture the rule is actually protecting before repeating the number.** ⚠ And point 1 of the six ("use icons for events that you know") was already shipped in 8f.140 when it arrived - the screenshot was a stale tab. **On a day when three sessions ship into one file, ask WHICH build a screenshot is of before reading it as a bug list.** **⚑ ROUND SEVEN IS #115, THE SAME HOUR** (8f.142, the user correcting #114: *"first on the right - it is front in the direction of movement"* · *"Increase size of icon on global map on 250%"*): the sights are **120px landmarks off the 128px masters** and had to leave the layout column to get there (`position:absolute` on the node point; an in-flow 120 drops the south row's plates off the bottom of the view), which **unwound all of #114's constant churn** - the chip-era numbers are true again because the art no longer participates in layout. One new coordinate: oasis 12px east, off the Hill Steading's painting. And the Captain leads from the RIGHT of the front rank, because the sprites face right. ⚑ **"First" is a direction, not an array index, when the column has a facing.** ⚠ Open, and it is the user's eye: whether 120px art crowds the painted terrain, and whether a revealed slot's painting lapping a fixed neighbour's reads wrong (the fix is that slot's coordinate, never the size). **⚑ AND ROUND EIGHT IS #116, STILL THE SAME DAY** (8f.143): ⛔ **the "background" the user asked to make transparent was NOT a background - the hazy masters carry an alpha-1..39 wash across their whole canvas, invisible at 48px, and the silhouette ring's drop-shadows lit it into a type-coloured slab at 96+.** The pedlar was clean because he is chroma-keyed, which is why the user pointed at him ("i want all of them like that"); the build pass now scrubs alpha under 40 before embedding. ⚑ **When an artifact appears only after a scale-up, suspect data the old size was hiding - and diff the good icon's pipeline against the rest before touching the renderer.** Also from the round: sights 120 -> 96px, the name a foot caption on the painting's bottom edge, and **the reveal rule lost its picture half by user order** ("he should be visible permanently"): a dealt slot shows its painting from minute one, the TITLE still hides behind `n.real` until arrival. If a pre-arrival painting ever reads as a spoiler in play, the lever is per-event (pull the key from MAP_SIGHT), never the gate. **⚑ ROUND NINE IS #117** (8f.144, three more points the same day): ⛔ **the price label landing on the paintings was not a placement bug but a RULE THAT HAD GONE OUT OF DATE - `labelSpot` had scored against name plates only since the day it was written, which was the whole truth until a node became a 96px painting.** ⚑ **A rule that was complete when written, against a screen that grew a second kind of object: when a surface gets a new class of thing, grep every placement rule that enumerates the old ones.** Also the caption dropped to the art's exact bottom edge so the full painting shows, and the description line came off the map label (a fork label was a 132x32 slab, every label is 49x17 now) while staying in the fork card, **because it was being printed in the one place with nothing to compare it against**. ⚠ Two documented traps bit within ten minutes and both were caught by LOADING THE PAGE, not by reading: a helper named `dv` collided with an existing top-level const (whole-script SyntaxError), and the new geometry calls `sightFor` from boot IIFEs that run before `MAP_SIGHT` exists (TDZ, aborts everything). **Verified by drawing the map from all 24 stands and measuring in the DOM: 0 label-on-painting, 0 label-on-name, 0 label-on-label.** **⚑ AND ROUND TEN IS #121, THE SAME DAY** (8f.148, the user: *"more events icons - add them to a global map"*): GPT's last nine icons went in **without a line of pipeline change**, which is what #113's fourth pass was built for - 32 sights embedded, 31 mapped, and #113's own remainder (circle, shipwreck and sinkhole having no art) is closed. ⛔ **The finding is #117 one turn deeper, and it is worth carrying to any surface with a search in it: `labelSpot` has two axes and on a VERTICAL road they are the same axis.** `t` walks along the road, `off` lifts vertically, so on dead → bonfir all 63 candidates sat on a line sixteen pixels wide, straight down the column of paintings it was dodging; the search had no escape to find and the linter reported a collision nobody could place. The comment above it ("the cheap axis is up and down") was **true for a horizontal road and false for this one** - a plate hangs below its glyph, so east-west the empty map is above and north-south it is to the SIDE. ⚑ **And the care is in HOW the sideways family was added: as a second PASS, not another rung in the first.** Inline it re-placed nine labels that were already clean; run after the shipped search it moves exactly the two that were broken. **When a search starts failing, add the new candidates AFTER the old ones and count how many placements move - a fix that moves things which were not broken is a second change wearing the first one's clothes.** The whole procedure is a standing rule now (`.claude/rules/world-map-sights.md`) so the next pack does not re-derive the 128-not-48 rule, the alpha-40 scrub, the TDZ trap or the three counters that must read zero. |
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
| **89** | **The combat benchmark, and the three things it did not measure** - ✅ the document is written: [`COMBAT_BENCHMARK_2026-08-11.md`](COMBAT_BENCHMARK_2026-08-11.md) | ⚑ **the second instrument.** #13 measures *win rates*, this one measures **shape**: Grimtoll now sits in a table beside Battle Brothers, Wildermyth and Wartales at **8.45 rounds · 71.4 unit-turns · 115 actions · 1.61 actions per unit-turn · 4.6 skills per unit**, all measured. ⛔ **The remainder is three MEASUREMENTS, not builds** - the mop-up tail, a real stopwatch, and hit-rate distribution - so it does not argue with the clarity pass. Two readings are already live: **`brigand` runs 2.4x the opener at an even 6 v 6**, which is the exact shape of Wartales' *"longer, not harder"*, and the **enemy skill gap is 2:1** in the player's favour, which is what "one strategy beats everything" looks like from the inside | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| - | **The class pass** - pick up each of the seven and adjust | the human test the arena cannot run: **can the class be said in one sentence.** A class that needs a paragraph is a balance problem wearing a UI problem's clothes | [reasoning](archive/PLAN_REASONING.md) |
| - | **The race pass** - three ways to play, not three stat blocks | three banked questions: the poison stack is uncapped · a gilled body reaches 62% further in the swamp · is an ogre's 3 stride a tax or a shape | [reasoning](archive/PLAN_REASONING.md) |
| **50** | **The balance pass, at playtest grade only** | make the eight fights survivable, readable and fair. **Not the terminal pass.** Order matters: classes, then races, then fights | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **27** | Balance: the optional fight is harder than the finale | inside #50's parking lot, and one of the few balance readings already written down | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
| **12** | Painted faces, pack 03 | mostly the user's generator work. A face is legibility, so it is arguably clarity work, but it is not a subtraction | [spec](archive/BACKLOG_ENTRY_SPECS.md) |
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
| **49** | Make the AI explain itself | **deferred by the user.** Gate artifacts are DONE and keep (`shots/49_ai_explains.html`), so it returns as a *build* session, not a design one |
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

- **QA-7: fleeing the Thing in Armour deletes the Dead Company beat.** Deliberate in code, but THE
  LONG FIRE one node later still says *"nine men in a ditch three miles back"* to a player who never
  met them. Three ways out: fire the beat on the fled path anyway · gate the Long Fire's clause on
  having seen it · accept the seam.
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
