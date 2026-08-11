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

## The work, in order

| | | done when |
|---|---|---|
| **1** | **Measure the opening before touching it.** Words shown, cards opened, clicks made, and systems introduced, from launch to the first decision that costs something. | there is a number, and it is written down here |
| **2** | **[#86 - the first fifteen minutes](#86--the-first-fifteen-minutes)** | the numbers from step 1 are cut hard, and the teaching survives the cut |
| **3** | **The screen pass**, five surfaces, one at a time, before-and-after shots | 🗺 road · 🎒 company · 📜 aftermath · 🚪 front door · practice field. *(⚔ is DONE eight times over (#88, #91, #94, #95, #96, #98, #100, #102 - and ⛔ **the count is the finding: eight passes on one surface, seven of them inside seventy-two hours, and the user was right every time**): the board passed 8f.65, the unit panel as **#88**, the **whole battle frame as #91** (8f.121, 2026-08-11 - the user's own seventeen-point relayout, mocked, picked and built in a day, board 57.8% → 85.5%, words 262 → ~160), and its **rounds three, four and five as #94, #95 and #96**, all on the same day, **#98 the queue**, **#100 the furniture** and **#102 the furniture again, plus two readouts that were lying**. ⚑ **#102's finding is the one that generalises to the other four surfaces: ten of its twelve points were layout, and the two that were not were the same bug twice - a control that changed something and could not say what it had changed.** SPEED's label counted in the engine's units (a duration multiplier), so pressing toward the bigger number made the board slower; nerve was a coloured chip, so it could name the rung and never say how close the next one was. **When a surface is asked for a third time, look for the readout that is printing the wrong unit rather than for another box to move.** ⚑ **#100's finding is the one to budget for: three of its fourteen points were a single box measured wrong** - the rail was shrink-to-fit at exactly one head wide, so the ring on the acting head had been clipped since the day the rail turned, and the report blamed the battle log, which was innocent. **Ask what the BOX is doing before believing which object is at fault.** ⚑ **Two findings to carry into the other four surfaces.** From #94: **nothing was asked to move back** - nine of its twelve points were finish on a frame twenty-four hours old, and the three that were real work were all one complaint, *the board was answering questions with a hover or with nothing*. From #95: **two of its ten points were corrections to #94 shipped hours earlier, and both were the same mistake** - a change that looked like an answer and answered nothing (a sectioned bar whose section was not a fixed quantity; a number put in a better place and left in the old one too). ⛔ **So budget THREE passes on a surface, not one, and expect the second to be finish and the third to be corrections.** See `WHAT_TO_TEST.md`.)* ⚑ **The target for the rest is a number: 61 declarations below 10px** live outside the battle screen (2 at 7px · 5 at 7.5px · 9 at 8px · 16 at 8.5px · 13 at 9px · 16 at 9.5px). ⚠ And take #88's lesson with you: **measure the box before you argue about the font** |
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

---

# 🟡 NEXT - after the clarity pass, still before the friends play

*Fairness and finish. **Nothing here adds a system either.** These wait because the feedback did not
name them, not because they stopped mattering.*

| # | what it is | why it waits here | full spec |
|---|---|---|---|
| **101** | **The archer that is not allowed to leave** *(⚠ written into this row as #100 by the session that wrote it, without asking `claim.ps1`; #100 had already been issued to the battle screen's sixth round, which shipped. **Sixth number collision, and the first one caused by a doc rather than by code** - the row was numbered by hand while the tool was sitting there. Renumbered 2026-08-11, and #101 is claimed properly)* - a bow is off the table while something stands on you, and **AUTO has no kite at all**. `aiTurn`'s exists and is gated on `!engaged(u)`, so it never fires once contact is actually made; `autoStep` has no version of it. After #99, **ENGAGED is the single biggest reason your archer is silent (119 dry turns of 874)**, and a measured second: **26% of archer turns have a 20%-or-better shot available and spend the whole turn walking.** | ⚑ **the numbers are already taken** - #99's corrected instrument (`beginTurn` opens the record, `strike` attributes to it) is the harness this needs, and it exists. It waits because it is **new behaviour in both brains during the clarity pass**, and the pass only cuts, delays and merges. ⛔ **Not "give the archer a melee weapon"** - that is an addition and it is not the finding | written up in [`CHANGELOG.md`](CHANGELOG.md) 8f.127 and in this row |
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
