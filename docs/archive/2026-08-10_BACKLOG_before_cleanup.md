# Grimtoll — the plan and the backlog

> **New session? Read [`README.md`](README.md) first.** That file is the *orientation* — what the
> game is, the pillar that settles arguments, how to work on this codebase without breaking it, and
> the engine traps that keep biting. **This file is the *work*** — where the build stands, what to
> do next and why, and every specified-but-unbuilt entry written to be picked up cold.
> **[`CHANGELOG.md`](CHANGELOG.md) is the *record*** — the build log, the shipped entries in full,
> the playtest snapshots. History, never instructions.
> **[`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) is the *test bench*, and it is the user's** — how to reach
> each new thing in three steps and what it is supposed to do. A session **writes** to it and never
> takes instructions from it.
>
> *Four files, four jobs, no overlap. The plan and the backlog were merged on 2026-07-31
> ("so all context is in one place"), and the record was split back out the same day ("really
> split shipped and backlog — to process it easier"). Both moves serve the same rule: **everything
> in THIS file is actionable, and one list holds one truth.** The old `00_PRODUCTION_PLAN.md` and
> `10_BACKLOG.md` are gone — the plan's own copy of the backlog index had drifted to listing ten
> shipped features as open, which is the documentation version of the aliased-resource bug.
> The test bench was added the same day at the user's request and is a fourth **job**, not a fourth
> copy: the other three are written for whoever opens the project next, that one is written for the
> user with the game running.*
>
> **When an entry ships, FOUR writes:** move its full text to `CHANGELOG.md` and add a build-log row
> there · **add its one-line row to [`SHIPPED.md`](SHIPPED.md)**, naming any open remainder ·
> **strike it from this file entirely** · **add a section to `WHAT_TO_TEST.md`** — what it is, how to
> reach it in three steps, what should happen, what would be a bug, what feedback is wanted.
>
> *(There used to be three, and the shipped row lived here in a Done table. It moved to its own file
> on 2026-08-01 — "I feel shipped should be in independent file, just in case" — which is what makes
> the rule above simply **strike it**: nothing shipped stays in this file at all.)*

## Contents

| | |
|---|---|
| [**Where the build stands**](#where-the-build-stands) | what Act 1 contains today |
| [**The big steps**](#the-big-steps-the-road-out-of-the-prototype) | ★ **the human-scale roadmap above the backlog** - the two playtest gates, thirteen steps with a done-test each, and the progress table that shows the slope |
| [**The plan — what to do next**](#the-plan--what-to-do-next) | the accepted order, with the reasons |
| [**★ The three buckets**](#-priority-is-a-date-now-not-a-tier-the-three-buckets) | ★ **what a session picks up is decided here now** - before playtest 1 / before playtest 2 / later, plus the three critical gates. It outranks the tier strip |
| [**The backlog index**](#the-backlog-index) | Active, **grouped by SCREEN** (battle · road · company · aftermath · front door · no-screen), tiered inside each |
| **The entries** | every UNBUILT spec, in the order numbered — starts at [#2](#2--personalities-that-command-the-ai); built ones live in the changelog |
| **The standing rules** | architecture, the concept filter, what was rejected and why — after the last entry |
| [**`SHIPPED.md`**](SHIPPED.md) | the registry: one line per shipped entry, every open remainder named, which numbers are spent |
| [**`CHANGELOG.md`**](CHANGELOG.md) | the record: build log · shipped entries in full · playtests · the original phases |
| [**`WHAT_TO_TEST.md`**](WHAT_TO_TEST.md) | the test bench — **the user's file.** Write a section here the same session a feature ships |

> **A heading numbered `## 24 — Provenance ledger` is an ENTRY. A heading with a name is a section.**
> Entry numbers are stable identities and are never renumbered, so they are not in reading order and
> there are gaps — use the index or the browser's find, not the scrollbar.
>
> **Every entry is a real `##` heading, and every index row has exactly one** *(made true again
> 2026-08-01 — eighteen entries had drifted into being bold lines inside the harvested-packet
> section, which meant no link could reach them and the index could not be checked against them)*.
> **The one deliberate exception is [#27](#27--balance-the-optional-fight-is-harder-than-the-finale)**,
> which has a body and no row because it is one of #50's parking-lot items.

> ### ⛔ NOTHING IN THIS FILE GETS BUILT STRAIGHT FROM THE ENTRY.
> **Every entry is a specification, not an instruction.** Before writing code for any of them:
> **(1) write out the actual rules** — costs, targets, cooldowns, limits, what it takes away — and
> **(2) show a picture of where it lives on screen. The picture is mandatory.** Then build, and
> **(4) write its section in [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md)** the same session it ships.
> Set by the user 2026-07-31: *"That way we keep it clean and don't do extra job."*
>
> **⚑ Make the picture IN THE GAME** whenever the thing has a screen already — stand the real board
> up in the practice field and `shotBoard()` it, annotated. Hand-draw only when there is nothing to
> photograph yet, and keep it to the **two or three panels that carry the decision**: #51's mockup
> had seven and three did the work, and a picture bigger than the request is the same rework this
> gate exists to prevent. Full version in [`README.md`](README.md) §5.

**One entry per session.** Do not batch them — each touches combat or character systems that the
last several sessions have shown are easy to disturb. Build it, verify it, update
[`01_GAME_CONCEPT.md`](01_GAME_CONCEPT.md) and this file, then strike the entry.

---

## Where the build stands

**Act 1 is feature-complete and playable end to end**, and every P0 defect from the outside review
is closed.

A complete run: tavern prologue → Blood on the Road (allied NPCs, pick a side) → three routes →
the Ruined Steading (an unavoidable dog ambush inside your own palisade) → the Black Fen (the
Fen-Mother) → Coldharrow village → the Muster Field → a back half of seven fights with road slots
and a second muster between them → the Snare → run summary → the wagon.

Around it: no-death/scars, stats-and-nerve as states rather than numbers, race-based movement,
cooldowns, the ogre-throw synergy layer, two mutation chains, chained camp incidents, provisions
as a store, dismissal with consequences, a mid-run save, a content linter, a practice field, and
the *"you cannot afford to be good to everyone"* pillar as the costing rule for everything.

**Eight fights, all clean, round band 4–12 with the boss longest.** The country has a shape the
roads obey — the Fen in the south-west, the Hunch in the east — and node spacing is enforced in
code rather than by eye.

**The slice is feature-complete for one act. What it is not is *finished*,** and the difference is the plan below.

---

## The big steps: the road out of the prototype

> **Added 2026-08-01 at the user's request:** *"To backlog production file add more human bigger
> steps plan, that should be done. To see dynamic. You can extend and add details. And then when I
> ask you show me progress visually clear. Also at some moment we will use this high lvl plan to
> choose which ones to pick from the backlog."*
>
> **What this section is, and what it is not.** It is the layer **above** the backlog: a small number
> of big human steps, each with a done-test, so progress reads as *movement over days* instead of a
> list of numbers going quiet. **It is not a second backlog and nothing here is built directly.**
> Every step names the entries it consumes; an entry is still picked, gated (rules, then a picture)
> and built exactly as before. When the two disagree, **the entry wins on *how*, this section wins on
> *when*.** A step is a `###` heading with a `G1-n` label, so it can never be mistaken for a numbered
> `##` entry.

**Why it exists, in the user's own words:**

> *"I had some feedback and know things that doesn't work. I feel, if it is too raw for people to
> get. If you don't understand what is going on and everything is 'prototype', it is harder to trust
> the world and get engaged."*

That sentence is the whole brief, and it is worth reading twice, because **it is not a request for
features.** Every step in gate 1 is one of three things: making a thing **legible**, making a thing
**fair**, or making a thing **look finished**. Not one of them adds a system. The slice was declared
good on 2026-08-01; this is the separate job of making a stranger able to *see* that it is good.

### The gates

| | who plays it | what it is for | state |
|---|---|---|---|
| **G1** | **10 friends** | *does it survive somebody who is not you?* Friends forgive rough edges, so this gate tests **understanding**, not tolerance. Its thirteen steps are below | 🔵 **open, this is the current plan** |
| **G2** | **20–30 independent people** | *does it survive somebody with no reason to be kind?* A stranger will not ask what a screen means; they will close it. Frame written below, content is the user's to fill | ⚪ not started |
| **G3** | unwritten | the user's list ends at *"2) …"* and stops there on purpose. Left blank rather than invented | ⚪ not written |

### How to read the progress table

`☐` not started · `◐` in progress · `☑` done · `?` **the user's own question mark**, undecided on
purpose · `⏸` parked. **The MOVED column is the point of the whole table**: it records the date a
step last changed state, so a render of this section shows the *slope*, which is what "to see
dynamic" asked for. Update it in the same edit that changes a status, and never backdate.

### 🔵 GATE 1 - ten friends

> **⚑ THE USER'S OWN SHORT LIST, 2026-08-02, after the QA day** - *"I feel the only things left
> before playtest: update text of events - my side, and then yours · generate pictures to the
> remaining events (me - send request in chatgpt after update of texts) · check the form (still on
> me)."* Mapped onto this table: the text pass is **#77's event book round trip** (he edits
> [`content/events_book.html`](../content/events_book.html) first, a session reads his edits back
> and then does its own half) · the pictures are **G1-8** and wait on the texts by his own order ·
> the form is **#76's remainder** (the mailto send shipped in 8f.86; he verifies it from the
> published artifact). Everything else in this table either shipped, is covered by the 2026-08-02
> QA day (G1-11/G1-12 below), or was ruled to wait for the friends' journals.

| # | the step | done when | consumes from the backlog | status | moved |
|---|---|---|---|---|---|
| **G1-1** | **The instrument** - the arena earns its keep | one call prints per-class and per-race numbers over all eight fights, reproducible from a seed | **#13** | ☐ | - |
| **G1-2** | **Every class picked up and adjusted** | all seven can be named in one sentence each, and none is never-picked or always-picked | #50 parking lot · #47 · #16 | ☐ | - |
| **G1-3** | **Races: skills and modifiers** | the three play *differently*, not merely at different numbers; #46's uncapped poison and #63's gills are ruled | #46 remainder · #63 remainder · #50 | ☐ | - |
| **G1-4** | **Battle balance** - after G1-2 and G1-3, never before | eight fights inside their round bands with the boss longest, measured not felt | **#50** (pulled forward, playtest grade) · #27 · #36 remainder · #64 remainder | ☐ | - |
| **G1-5** | **The opening: less text, more engaging** | time and clicks to the first real decision are measured and cut; the teaching survives the cut | #60 remainder (the per-round cap) · #39 · #14 | ☐ | - |
| **G1-6** | **Dramaturgy and dynamic** | a run has named beats and no two adjacent screens of the same shape; the sag is found and fixed | `tools/dramaturge.html` · #22 · #43 | ☐ | - |
| **G1-7** | **Every screen cleaner** | one deliberate pass per screen, before/after shots, *show a state, hide the number* holds everywhere | ~~#66~~ **shipped 8f.65**, the board is done · five surfaces to go · #12 | ◐ | 2026-08-01 |
| **G1-8** | **Finish the event art** (ChatGPT) | no event card falls back to a placeholder | art pipeline, not an entry | ? | - |
| **G1-9** | **Update the unit sprites** (ChatGPT) | a body still reads at **x2.50**, the closest camera stop | **unblocked** by #66 - the size target is now a number, not a guess | ? | 2026-08-01 |
| **G1-10** | **Music and sound** | the user has *listened* to what #8 shipped and ruled on it | #8 remainder · #43's ranking | ? | - |
| **G1-11** | **The GPT run** - a model plays it all and reports | a written report exists, with the reaction bar on and the journal blob exported | #53 · #54 (already built for exactly this) | ☑ **done 2026-08-02, by Claude through the real UI**: five campaign runs, twelve fights, every ending shape reached, reactions pressed, journal recorded. Report: [`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md) | 2026-08-02 |
| **G1-12** | **Fix what the GPT run found** | every finding triaged *blocks / annoys / neither*, and the first two are closed | whatever it names | ☑ **27 findings triaged**: *blocks* - none found (no soft locks, zero uncaught errors) · *annoys* - closed across twin fix passes 8f.88-8f.91, including three real ones found while fixing (a near soft lock at Bonepicker's among them) · *neither* - ruled by the user same day: tunnel stays secret, dogs stay a skill check, provisions stay heal-only, the noble pays a third more | 2026-08-02 |
| **G1-13** | **The human run** (the user), feedback, fixes | the user finishes a run and nothing on their list would block a stranger | precedent: the 2026-08-01 run produced #55 and #54 same day | ☐ | - |
| **🚪** | **THE GATE: hand it to ten friends** | ten journals come home | #53/#54's copy-paste blob **is** this instrument, and it already exists | ☐ | - |

---

#### G1-1 · The instrument: the arena earns its keep

**This step is not on the user's list and it goes first anyway.** Three of their own bullets are the
words *balance*, *balance* and *balance*, and this file already has a standing rule that a balance
pass is *"measured with the arena (#13), not by feel"*, plus a written warning that a pass run by
feel is **"the same session repeated four times with the answers thrown away."** So G1-2, G1-3 and
G1-4 are either three measured sessions or three opinions, and the difference is one Tier-1 entry
that was already next-but-one in the plan.

**It is not new work.** #13 sits in the plan today. What changes is only its *reason*: it stops being
a multiplier for some later pass and becomes **the instrument gate 1 cannot start without.**

**What it has to measure, given what the steps after it ask:** rounds to resolve per fight · damage
taken and dealt per class per fight · how often each class is the one that ends up doing the work ·
stride-and-position outcomes per race · and it has to be re-runnable from a seed so a change can be
attributed. Consumes **#13**.

#### G1-2 · Every class picked up and adjusted

**The user's words:** *"clases balance (pick each class and ajust)"* - pick each one up in turn, not
tune a spreadsheet. **Seven exist** in `CLASSES`: CAPTAIN · SPEARWOMAN · ARCHER · BATTLE-MAGE ·
MAGE · CUTTER · BRUTE. Monsters are deliberately not classes and stay out of this step.

**The two tests together, because either alone lies.** The measured one: no class is never-picked
and none is always-picked; each has at least one of the eight fights where it is the answer and one
where it is a liability. The human one, which the arena cannot run: **can the class be said in one
sentence** - what it is for, and what it costs you to bring. A class that needs a paragraph is a
balance problem wearing a UI problem's clothes.

**Known live inputs:** the spear is only half-built (**#47** is what makes SPEARWOMAN a zone rather
than a stat line, and it is the last open half of the verb batch), and every perk tier is a balance
input the arena has never scored.

#### G1-3 · Races: their skills and modifiers

**The user's words:** *"races balance (their skills and modifiers)"*. Three races, and the whole
design claim is that they are **three ways to play**, not three stat blocks: stride `ratkin 5 ·
human 4 · ogre 3` set on the body rather than hidden in an agility formula, `sizeOf`/`maxSize` so an
ogre is never moved by anything, and one skill each - **KICK · PICK UP AND THROW · POISON THE
BLADE**.

**Three named questions are already banked and this is the step that answers them:**

- **the poison stack is uncapped** (#46's own remainder). At 15% a cut, three ratkin buy +45%, and
  the intended limiter is the three turns it cost rather than a ceiling. **No human has met it.** The
  failure to watch for is the *opposite* one: too small to be worth an action.
- **a gilled body reaches 62% further than anybody else in the swamp** (#63). A mutation that paid
  for nothing now has a terrain, and nobody has played it.
- **is an ogre's 3 stride a tax or a shape?** He is the only body that cannot cross the board, and
  the terrain cluster made distance cost more everywhere.

**Order matters and the user got it right:** classes before races before fights, because a fight is
*composed of* the other two, and retuning a fight to fix a class is how a balance pass eats itself.

#### G1-4 · Battle balance

**Only after G1-2 and G1-3.** This is **#50, pulled forward and run at playtest grade** - see the
open decision at the end of this section, because #50 is currently marked *deliberately last*.

**Playtest grade means a bounded scope:** make the eight fights survivable, readable and fair. It
does **not** mean the terminal pass. The things #50 holds that stay behind for the terminal run are
the ones that need systems that do not exist yet: **#45's motivation rule** (deferred, and it is the
first thing the terminal pass builds), **#29** ZOC, **#30**'s quiver survivors.

**What it can bank on already:** #27 (the optional fight is harder than the finale) · the brigand's
14-round tail from #36 · the Fen-Mother's flower ruling from #64, measured at 11–29 rounds median 16
with flowers against 8–23 median 13 without, which is one word in `FIELDS.mother.flowers` · whether
the swamp at 24% wet and the forest at 69–73% reach are *interesting* or merely *slow*, which no
measurement can answer and a friend can.

#### G1-5 · The opening: less text, more engaging

**The user's words:** *"Opening - less text more engeging."* **⚠ The trap in this step is that the
opening is crowded, not empty.** It currently runs: the prologue cards → the arrival cards → the
whispers → **#60's ten Captain lessons inside a four-or-five round first fight**. #60's own open
remainder says it out loud: *"eight to nine lessons landed inside a four or five round clash… if it
reads as narration rather than teaching, the fix is the per-round cap, not the lesson count."*

**So this step is subtraction, and the thing it must not delete is the teaching.** The order that
protects both: measure first (**how many words and how many clicks before the player makes a
decision that costs something**), then cut prose, then cap the lesson rate, then re-measure. A
lesson that fires when its rule first bites is the cheapest teaching in the build and the most
expensive to rebuild if it is thrown out with the text.

**Related:** **#39** (Meet the Rabble) is written to *replace or enrich* the arrival cards and
explicitly not to add a fourth modal, so it belongs to this step rather than to a content session.

#### G1-6 · Dramaturgy and dynamic

**The user's words:** *"Adjust dramaturgy and dynamic."* The instrument exists:
[`tools/dramaturge.html`](../tools/dramaturge.html) live-reads the prototype's event data, and
**survival pressure is the real ledger, not a score.** The second half of the instrument is
**#57, the analytics tab, which is the user's own job in a separate session** - this step is where
the two meet, and it is the reason this file owes that tab a stable journal blob and nothing else.

**What "dynamic" means concretely here:** a run should not put two screens of the same shape next to
each other, should not go more than a stretch without a decision that costs something, and should
have its hard beats where the player is still able to feel them. **The pillar is the ruler:** if a
stretch never makes you choose who to be good to, that stretch is the sag.

#### G1-7 · Every screen cleaner

**The user's words:** *"Go through all creens and make them cleener."* Six surfaces, and this file
is already grouped by exactly them: ⚔ the battle board · 🗺 the road · 🎒 the company · 📜 after the
battle · 🚪 the front door · plus the practice field. **One pass per screen, one screen at a time,
with a before-and-after shot**, because the last cleanup pass on the map found a real crowding
defect (road labels sitting inside the plate of the node you were standing on, 10 of 21 places).

**The single biggest readability win here already SHIPPED, on the day this section was written:
#66, three camera stops** (FULL x1.30 · FIELD x1.80 · CLOSE x2.50, build log 8f.65, row in
[`SHIPPED.md`](SHIPPED.md)). The measurement was the design: the field is 980x544 and the board
596x416, so **41% of the battle screen was empty gradient** and the people looked small because the
board had never grown into the room it had. **That is why the lowest stop is x1.30 and not x1.00.**
It closes the user's own *"units and action looks a bit bigger. Like in battle brothers."*

**⚔ THE BATTLE BOARD IS THEREFORE THE ONE SURFACE THIS STEP HAS ALREADY PASSED, and it did not come
back with nothing.** It came back with **four questions that are gate-1 work and are already written
into [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md)**, and they are answered by playing, not by another pass:

1. **Are the three distances right**, CLOSE especially. One line to change.
2. **Is FIELD the right default**, or should it open on FULL and step in.
3. **Does CLOSE feel claustrophobic?** If it does, the deliberately-cut half, **drag to look
   around**, goes in. It was left out because the follow rule may be enough on its own and a drag is
   a new way to send somebody to the wrong hex, so **a drag over 6px must suppress the click.**
4. **The hex text** - the reach numbers, hit odds and the CLEAR / SCREENED / OBSTRUCTED words are
   drawn at 7px and were sized for a board that has since grown.

**Whoever runs G1-11 or G1-13 should be told to answer those four**, because they are cheap during a
run and expensive to reconstruct after one. **The other five surfaces have had no pass at all.**

**Two standing rules to enforce while passing:** *show a state, hide the number*, and the written
z-index ladder (content outranks chrome, only a modal outranks content).

#### G1-8 · Finish the event art *(the user's `?`)*

**Kept as a question mark because the user marked it one.** Status as of 2026-08-01: the ChatGPT
stage-2 pack is **already built and injected** - 5 events, POR01–09, the menu cover, 59 keys
verified live. So this step is not "make art", it is **"find what is still bare"**: a coverage list
of event cards against art keys, then only the gap goes to ChatGPT.

**⛔ Art notes live in `art/src/stage-2/`, never in `docs/`** - that is the art handoff's own rule.
**⚑ And a live lesson from the last pack:** `PORTRAIT.wynn` was painted, embedded and **unreachable**,
because no person in the game has `id:'wynn'`. A statically-referenced art key can still be
dynamically dead, so a coverage list has to be checked against real ids, not against the key map.

#### G1-9 · Update the unit sprites *(the user's `?`)*

**Kept as a question mark, and it was unblocked the day this section was written.** The ordering
worry here was real and is now spent: `sprite()`'s oversample **is** the resolution ceiling, and a
body's largest on-screen size is set by the camera, so sprites painted before the camera was settled
would have been painted twice. **#66 settled it.** The stops are **x1.30 · x1.80 · x2.50**, and the
oversample went **2 to 3** in the same session precisely because x2.00 was the old ceiling.

**So the target is now a known number rather than a guess**, and that is the whole reason this step
can be handed out. Anything drawn for it has to survive being looked at at x2.50.

#### G1-10 · Music and sound *(the user's `?`)*

**Kept as a question mark, and it does not start with new assets.** #8 shipped sounds for every new
verb and both rungs of the nerve ladder, and its open remainder is blunt: **"the builder cannot hear
it"** - the code is verified to *fire*, and whether it *sounds* right is the user's ear and has never
been given. **So step one is the user listening and ruling.** The ranking to spend against is already
set by **#43**: action readability → barks → narrator → ambience.

#### G1-11 · The GPT run

**The user's words:** *"Make GPT run of all fixes and features."* A model plays the build end to end
and reports on everything that shipped. **Run it with the reaction bar on and export the journal
blob** - #53 and #54 exist for precisely this shape of test, the blob is at **v2**, and it is also
what #57's analytics tab eats.

**What makes this run worth its cost:** it is the only pass that can be *exhaustive* rather than
representative. It should reach every screen, every event card, every fight, and it should be told
to report **what it could not understand**, not only what broke, because "too raw to get" is the
brief and a model that has to guess is evidence.

#### G1-12 · Fix what the GPT run found

**Triage before building, into three buckets: *blocks a friend* · *annoys a friend* · *neither*.**
Only the first two are gate-1 work. The third is banked. This is the step where the temptation to
turn findings into features has to be refused: gate 1 adds no systems.

#### G1-13 · The human run, and the fixes after it

**The user's words:** *"Human run (me), feedback and fixes after it."* There is a precedent and it is
a good one: the 2026-08-01 playthrough produced two rulings that were built the same day (**#55**
automatic rewards, **#54** continuous reactions), and both were small, both were the user's own, and
both touched nothing in common. **That is the shape to expect here too.**

**The done-test is the gate's real entry condition:** the user can finish a run, and nothing on their
own list of complaints would *block* a stranger.

#### 🚪 The gate itself: hand it to ten friends

**The collection instrument already exists and this is worth saying plainly.** #53 and #54 shipped
the ★▲▼ bar on every screen, reactions attached to the exact screen, a decision log, a per-run
report with length in days and wall-clock, and **a copy-paste blob so a friend's journal travels
home.** So the ten-friend gate needs no new tooling: it needs a build, a link, and a sentence asking
them to paste the blob back.

**What to ask them** should be written *before* they play, not after. **And most of it is already
written**, scattered across shipped entries as open remainders that say some version of *"the
harness structurally cannot answer this."* Collected here, because a question nobody wrote down is a
run wasted:

| the question | from |
|---|---|
| is **"send somebody wide"** on the Thing in Armour worth the person it costs? | #18 |
| does the **bloom flower** actually force you to move? *(that was its whole reason)* | #64 |
| should the **Fen-Mother** get flowers after all? measured 11-29 rounds with, 8-23 without | #64 |
| is **24% wet** enough to READ as a swamp? the honest lever is the painting, not more water | #63 |
| is the **forest** interesting, or merely slow? 69-73% reach, an obstacle rather than a tax | #56 |
| do the **sounds** actually sound right? *"the builder cannot hear it"* | #8 |
| does the **first-fight teaching** read as teaching, or as narration? | #60 |
| what is the **haul worth** now that it cannot be optimised against the stash? | #55 |
| the **four camera questions** - distances, default stop, claustrophobia, hex text | #66 |

**A human is the instrument for exactly that class of question**, so do not spend one on anything
the arena could have measured. **Split them:** the ones about *feel over a whole run* go to the ten
friends, the ones about *a single screen or a single number* go to G1-11 and G1-13, which are
cheaper and repeatable.

---

### ⚪ GATE 2 - twenty to thirty independent people

**The user left this one as a heading and four dots**, and it stays that way: the content is theirs
to write. What is worth recording now is **what changes between ten and thirty**, because it decides
what gate 1 must not skip.

- **A friend asks you what a screen means. A stranger closes it.** Everything in gate 1 that is about
  legibility is really gate 2's entry condition.
- **A friend answers your questions. A stranger only leaves data.** Which makes **#57's analytics
  tab** the instrument for gate 2 the way the journal blob is the instrument for gate 1 - and #57 is
  the user's own job in a separate session, so its readiness is a gate-2 dependency this file does
  not control.
- **A friend tolerates a build you have to explain how to run.** Thirty people need it hosted, and
  they need the first-time experience to survive with nobody in the room.

*(Deliberately not listed here: content volume. Act 2 is parked by the user's own call - "deeper
beats longer" - and nothing about gate 2 argues with that. Thirty strangers testing one act is a
sharper instrument than thirty strangers testing two.)*

---

### The honest estimate

**The user's own guess:** *"Maybe, it is another 3-4-5 days of polishsing."* Held against this
file's own working rule of **one entry per session**, that is optimistic but not wildly so, and the
shape of it matters more than the number:

| | steps | note |
|---|---|---|
| **one session each** | G1-1 · G1-5 · G1-11 · G1-12 | bounded, and G1-11 is mostly the model's time rather than a build |
| **more than one session** | G1-2 · G1-3 · G1-4 · G1-7 | the three balance steps are the bulk of the gate, and the screen pass is six surfaces |
| **the user's, running in parallel** | G1-8 · G1-9 · G1-10 · G1-13 | art, audio and the human run do not consume build sessions |

**So 3–5 days holds only if two things are true:** the balance steps are **timeboxed and measured**
rather than open-ended (which is what G1-1 buys), and the three `?` steps run **in parallel** as the
user's own work rather than in the queue. **The honest risk is G1-4**, because a balance pass with no
stop condition is the one step in this list that can absorb a week on its own. Give it its band and
stop when the band is met.

---

### ⚖ The one open decision this section creates

**#50 is marked "deliberately last" in this file, and gate 1 wants it fourth.** That is a real
collision and it is the user's call, not a session's.

- **What #50 says today:** run it *once*, late, against a system that has stopped moving, and its
  entry condition is #13 #47 #16 #4. The reason is sound: *"a pass run early is the same session
  repeated four times with the answers thrown away."*
- **What gate 1 needs:** classes, races and fights fair enough that ten friends are not playing a
  broken thing. That is genuinely a *subset* of #50, not a competitor to it.
- **The recommendation:** treat **G1-2 / G1-3 / G1-4 as #50's parking lot drawn down to playtest
  grade**, keep the number and keep the terminal pass, and let #50 close after the deferred pieces
  it is holding (#45, #29, #30) actually exist. **Nothing gets renumbered** and nothing gets built
  twice, because the terminal pass was always going to re-measure anyway.
- **What still needs the user's word:** the plan below currently opens with **the Settlements &
  Legacy MVP** and then three Tier-1 foundations, and **none of that is inside gate 1.** Either the
  polish gate goes first and those wait, or they interleave. **This file does not assume**; the order
  below is unchanged until the user rules. The one exception taken on its own merits is **#13**,
  which is already in that list *and* is gate 1's first step, so it is next either way.

**Two small rulings joined this list on 2026-08-02, out of the QA report** (details in
[`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md), section QA-7 and QA-27; both are one-line
answers and neither blocks the playtest):

- **QA-7 - fleeing the Thing in Armour deletes the Dead Company beat.** Deliberate in code
  (`toRetreat` clears the queued scene, with a comment), but THE LONG FIRE one node later still
  says *"nine men in a ditch three miles back"* to a player who never met them. Three ways out:
  fire the beat on the fled path anyway · gate the Long Fire's clause on having seen it · accept
  the seam. **Worth deciding during the event-text pass**, since the second option is itself a
  text edit.
- **QA-27 - the defeat epilogue opens with "The bells are still ringing"** wherever the company
  dies, including half a map from Grausen. Keep as a placeless line, or key one clause on where
  the run ended.

---

## The plan — what to do next

> ### ⚠ READ [THE BIG STEPS](#the-big-steps-the-road-out-of-the-prototype) FIRST, AND KNOW WHAT IT DOES TO THIS LIST
>
> A human-scale roadmap was added above on **2026-08-01**: two playtest gates, and thirteen steps to
> reach the first one. **This list is unchanged and stays authoritative until the user rules**, but
> the two do not currently agree, and a session that reads only this list will not see it. In short:
>
> - **Gate 1 is polish, not features.** Balance the classes, then the races, then the fights; cut the
>   opening; clean every screen; a GPT run and a human run; then ten friends. **Nothing in it adds a
>   system.**
> - **Nothing in this list below is inside gate 1** except **#13**, which is both the second Tier-1
>   foundation here *and* gate 1's first step, so it is next either way and that is the safe pick.
> - **The unresolved call is the Settlements & Legacy MVP and the Tier-1 foundations**: do they go
>   first, or does the polish gate? See [the open decision](#-the-one-open-decision-this-section-creates).
> - **#50 is affected too.** It is marked *deliberately last* here and gate 1 wants a playtest-grade
>   subset of it fourth. The recommendation there keeps the number and keeps the terminal pass.

### Now, in this order

> ## ✅ THE PLAYTHROUGH IS DONE, AND THE VERDICT IS GOOD
>
> **User, 2026-08-01: *"Done — the game is good — I gave feedback already."*** The item that sat at
> the top of this list for weeks is closed. **#52, the reported Coldharrow hard-lock, is closed with
> it — *"it works"*** — and its diagnosis is kept in [`SHIPPED.md`](SHIPPED.md), because the hidden
> preview pane produces a stuck `G.moving` that looks exactly like that report and will fool the
> next person too.
>
> **What this changes about the order below.** The playthrough existed to answer *does this feel
> like anything*, and it did. The plan is no longer "prove the slice"; it is **deepen the slice**.
> The two rulings that arrived with the verdict — **mortality** and **automatic rewards** — are both
> about the *shape of a run* rather than about a screen, and they are why the order now puts a
> foundation and a loop change ahead of more content.

**1. Settlements & Legacy MVP** — [`09_SETTLEMENTS_AND_LEGACY.md`](09_SETTLEMENTS_AND_LEGACY.md).
Build the **inheritance screen first**: it is the piece that makes a lost run mean something, and
**that matters more now than it did yesterday** — [#34's mortality ruling](#34--the-mortality-chain--scarred--maimed--dead)
means a company can genuinely end, so what a dead company leaves behind stops being a nicety.

**2. The foundation sessions, in order: [#24](#24--provenance-ledger) →
[#13](#13--the-balance-harness-earns-its-keep) →
[#32](#32--routing-needs-help-to-come-back-from-the-rally-rule).** These are Tier 1 — the
multipliers. None is glamorous; together they are the difference between the next twenty entries
being cheap or expensive: consequences become findable (#24), balance becomes measurable (#13), and
routing becomes a thing you recover from rather than a state that decays back on its own (#32).
**Take them one per session, top down, before any Tier-3 entry.**
**#24 and #32 were confirmed by the user on 2026-07-31** ("do it — this good" / "also good — do
it"); **#13 was not named either way and keeps its place** between them until it is.

> **#32 moved to the back of the three on 2026-08-01, and it is a demotion in urgency only.** It was
> ordered second while it was still a *defect* — the Fen-Mother's never-ending fight. **That defect
> is closed** (she goes DESPERATE, every fight gets hungry, the cub is passive), so what is left is
> a good rule that nothing is waiting on, while **#13 is what makes #50 possible at all.**

> **#24 got a second job on 2026-08-01.** The mortality chain (#34) is *scarred → maimed → can die*,
> and that chain has to be **legible on the sheet and stored as facts**, not inferred from a count.
> #24 is where those facts live. It was already the next item; it is now also a dependency of the
> single biggest rule change the game has taken.

> *There were four. **#49 — make the AI explain itself — is deferred by the user, 2026-07-31**:
> "this one I like, but maybe do it later. More extended for later." **Its gate artifacts are
> done and keep** — the rules are on the entry and the picture is at
> [`shots/49_ai_explains.html`](../shots/49_ai_explains.html) — so it comes back as a build
> session, not a design one.*

> *There were five. **#45 — marks — is deferred by the user, 2026-07-31**: "too big" while skills
> and mutations are still arriving, and a rule everything plugs into should not be written while
> the things plugging into it are still landing. It returns inside **[#50](#50---the-balance-pass--deliberately-last), the balance pass**.
> **#46 and #47 do not wait for it** — they were enhanced by marks, never dependent on them.*

> *There were four steps. **The two rulings from the playthrough — #55 the automatic reward and #54
> continuous reactions — shipped 2026-08-01** (build log 8f.54), at the user's request: "take backlog
> 2-3 thing to work and do." Rows in [`SHIPPED.md`](SHIPPED.md), full text in
> [`CHANGELOG.md`](CHANGELOG.md).*

> **⚑ What #55 leaves behind for #34, and it is the reason #55 went first.** The after-battle screen
> now has a settled shape: **a receipt · sometimes one question about what is left on the field ·
> the promotion.** #34's death beat lands on that screen and **nowhere else**, so it is a third
> block in an established rhythm rather than a fourth thing competing with a shop.
>
> **And #19 has a debt to pay before it is built:** its desperation contract promised a recruit
> *first pick of the loot*, and there is no pick any more. Re-expressed on the entry as **a share of
> the haul** — the wording is on #19, unbuilt.

**3. Then Tier 2 and the combat batch** — #4+#17 the body painter API *(now load-bearing — **#34's
maiming is what it draws**, and #35's grafts wait on the same API)* · #2 personalities that command
the AI · then **#47 the spear**, which is now the only half of the verb batch still open.
*(#36, #48, #46 and #40 were in this list and have shipped — see [`SHIPPED.md`](SHIPPED.md).)*

> **#47 is the natural next combat session.** It was designed alongside #46 as one batch, it needs
> nothing #46 did not already put in place, and #50's entry condition now wants only **#13 #47 #16
> #4**. Its own gate still has to be walked — rules, then a picture — the same as this one did.

> **~~#82~~ SHIPPED 2026-08-04** (8f.108) and it is worth reading before #47, because it gave the
> spearwoman her first *cannot*: an oak or a group of rocks in the hex she thrusts over refuses the
> blow. Obstacles carry a HEIGHT now, and it is a register of its own that never merges with
> `BLOCKED`. See [`SHIPPED.md`](SHIPPED.md).

> **On "give me a few small steps" sessions**, which this project has now had twice. Take them from
> **Tier 4**, which is the tier this file marks safe in any order, and **spread them across systems
> that share no code** — 2026-07-31's batch was sound (#8), place (#15) and voice (#44) deliberately.
> **Taking one off Tier 1 instead spends a multiplier on a short session**, which is the whole
> reason the tiers exist. *(2026-08-01's pair, #55 and #54, were the exception that proves it: both
> were the user's own rulings, both were small, and they touched nothing in common.)*

### Then

**Deepen Act 1 rather than extend it.** The mortality chain (#34), the anatomy it needs (#4+#17),
and the grafts that hang off the same API (#35) all make the act the player already liked *mean
more*, and none of them needs a single new node. *(The forest was the fourth name on this line and
it **shipped 2026-08-01** inside the terrain cluster, along with the swamp, the tree, the bloom
flower, the outpost and the terrain validator. See `CHANGELOG.md` 8f.64.)*

### Last, deliberately

**[#50 — the balance pass.](#50---the-balance-pass--deliberately-last)** Numbers, encounter
compositions and the motivation layer, run **once**, late, against a system that has stopped
moving — measured with the arena (#13), not by feel. Until it runs, **bank balance observations in
its parking lot and keep going**; do not stop a build session to retune. A pass run early is the
same session repeated four times with the answers thrown away.

### 🚧 Running elsewhere — do not pick it up here

**[#57 — event analytics](#the-backlog-index) is the user's own, in a separate tab.** *(Their
instruction, 2026-08-01: "mark event analytic as big independent task that I am doing in other
tab.")* It is the ANALYTICS tab of [`tools/dramaturge.html`](../tools/dramaturge.html), and **its
spec lives inside the tool, on the tab** — that is its source of truth, not this file.

**What that means for a session working here.** Do not build it, do not spec it, and do not
"helpfully" start it. **The one thing this file owes it is a stable input**: the journal export blob
from #53/#54. So —

- **The blob's row shape is now a contract with another session.** It is at **v2**; the reader has
  never looked at `v` and must not start. If you ever change a row's *shape* (not its contents), bump
  `v`, say so here, and assume something outside this repo is already parsing the old one.
- **Invariant #10 crosses the boundary with it.** The analytics tab observes and never acts, exactly
  as the journal does. Nothing it computes may ever come back into the game as a balance input
  without a deliberate ruling.
- **If the tool needs a new field in the journal, that is a numbered entry in *this* file** — a
  reader asking for data is fine; a reader quietly changing what the game records is not.

### Deliberately parked

- **ACT 2 — parked by the user, 2026-08-01: *"Delete act 2 for now as in plan."*** It was step 5 of
  the order and it is out of the order entirely. **Nothing about it is rejected** — the world, the
  Ashmoor brass-token payoff (#10's open half) and the Act 1 stinger (#28) all still point at it —
  but it is not what the next sessions are for. **The reason it parks well:** Act 2 is *more nodes*,
  and the playthrough said the slice is good, which makes *deeper* worth more than *longer*. The
  work that was blocked behind "Act 2 needs it" — the settlements layer — is now step 1 on its own
  merits rather than as a prerequisite.
- The **ScenarioSpec / dev-menu** half of the outside review's Battle Lab cluster — still *tools for
  the builder, not the game*, and test mode plus the linter cover the immediate need. *(The other
  half of that cluster shipped as the practice field: same code, different feature. Worth
  remembering as a pattern — a parked builder tool is sometimes one reframing away from being
  content.)*
- The **remaining 14 mutations** — [#16](#16--the-rest-of-the-mutations) takes 3–4, not all of them.
- The **Godot port.** Still the production target. Do the MVP scope lock (Phase A step 5, in the record) once
  the systems stop moving — which is roughly after the settlements MVP.

### The open questions — three were answered on 2026-08-01

The outside design review ended by listing eight decisions it deliberately refused to make. **Three
of them are now ruled**, and each ruling turned into a live entry rather than a note:

| | The ruling, in the user's words | Where it lives now |
|---|---|---|
| **Mortality** | *"yes — after get scars and maimed"* | **[#34](#34--the-mortality-chain--scarred--maimed--dead)**, rewritten from an opt-in contract into **the** rule |
| **Grafts** | *"rare authored consequences of specific injuries **or events on the road**"* | **[#35](#35--grafts--rare-authored-consequences)** — authored, never a shop, and the road half is new |
| **Forest** | *"it is a lot of scattered trees. Check as Battle Brothers do"* | **#56 — SHIPPED 2026-08-01** (8f.64) inside the terrain cluster. It turned out to be one dial on #62's tree, which is the version the ruling was actually asking for |

**Five are still open** and still live in [`README.md`](README.md) §6 — the name (*Grimtoll* or
*Rabblebound*), AUTO doctrine (one order or per person), numbers in the chronicle, the run contract,
and generated voice. Nothing in the plan is blocked on any of them.

---

## The backlog index

**What this is.** Features the user has specified but that are not built. Each entry below is
written so a session can pick it up **cold**: what it is, why it earns its place, which existing
systems it plugs into, the files and functions to touch, and how to know it works.

**The list is split two ways** *(restructured 2026-07-31 at the user's request, twice — first into
tiers, then **grouped by screen**)*: **DONE** is a record, build nothing from it. **ACTIVE** is
what a session picks from, and it is **six screen sections** with tier and model as columns.

*There used to be a third list.* **The 🕰 distant-future entries now sit in their own screen
sections** carrying a 🕰 tier tag and their *why it waits* — parked with intent, never rejected, and
each still keeps its full entry below. They were pulled in so that a screen section answers the
whole question: **everything that will ever land here, near or far.**

### ✅ Done — ➤ moved to [`SHIPPED.md`](SHIPPED.md)

> **The Done table left this file on 2026-08-01**, at the user's request — *"I feel shipped should
> be in independent file (just in case)."* It is [`SHIPPED.md`](SHIPPED.md) now: one line per
> shipped entry, every open remainder named, and the registry of which numbers are spent.
>
> **Everything below this line is unbuilt and actionable.** That is the whole point of the split —
> a Done table at the top of the working file is the first thing to go stale and the last thing
> anybody rereads. **54 shipped, next free number #86** *(**#85, THE DREAM**, shipped 2026-08-04 in
> build log 8f.114 - a road card about somebody this run lost, and the entry is that **nothing in
> this build kills a crew member**: `carryEverybodyOut()` carries everybody out and scars are the
> death system, so the card had to be told who its corpse was. `lostSoul()` names the three states
> that mean gone. **Its open remainder is the picture**: all 19 camp cards share a hardcoded pool of
> four daylight paintings, so the dream is illustrated with a sunlit rock.)* *(**#84, a dodge and a miss are two different
> events**, shipped 2026-08-04 in build log 8f.113 - the field used to print "X misses." and float a
> green DODGE for the same roll; one roll now answers two questions and no new randomness was added.
> Its open remainder is that the hover odds are still one number.)* *(**#82, obstacle height**, shipped
> 2026-08-04 in build log 8f.108 - a tree or a group of rocks now refuses a spear thrust and an
> arrow crosses a fire; **#83, a bit mobile friendly**, was a parallel session the same day.
> ⚠ **THREE numbers were taken out from under this session in one day** - #83, 8f.106 and 8f.107.
> **Grep the build log AND all three docs at WRITE time, not at plan time.**)*
> *(**#81, the battle clock**, shipped
> 2026-08-03 in build log 8f.100 - the board runs at ×1.75 and the player can turn it; its one open
> remainder is that `strike()` still resolves a shot in the tick it is loosed, so the arrow's flight
> is the one duration off the clock.)* *(#78, the quiver's contract, and **#80, the
> weapon's half of the armour bands**, are both SPEC'D and active below - the numbers are spent even
> though nothing shipped under either. **#79 shipped the same evening it was written**, 8f.97)*. *(2026-08-02 was the QA
> day rather than an entry day: build log **8f.87 to 8f.93** - the five-run playthrough report
> [`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md), twin fix passes from two parallel
> sessions, the user's five rulings, the noble's advance up a third, **8f.92's opening pass**
> (the lord's brief becomes Skelbrook, the three opening texts become one card, the `COACH`
> register is emptied, the map is labelled THE GRAUSEN VALLEY) and **8f.93's event-text pass**
> (all 31 events and the camp cards re-cut shorter, plus THE CACHE - a place the road gives you,
> marked on the map, that pays coin or pays people depending on how you asked for it). No
> numbered entry shipped, so the count above is unchanged.)* *(#75 double rations, #76 send the run and
> #77 the event book all shipped 2026-08-02 from the user's overnight list, build log 8f.85, with
> four comfort fixes to the fight in 8f.84. **Two of them leave a piece that needs the user**, both
> named in [`SHIPPED.md`](SHIPPED.md): #76 has no real *sending* until there is a form URL or an
> address, and #77's round trip - reading his edited event doc back into the prototype - is unbuilt
> and is the task he said would need him.)*
> *(#74, THE CIRCLE, was specced, pictured
> AND BUILT on 2026-08-02, build log 8f.81. Pictures:
> [`shots/74_the_circle.html`](../shots/74_the_circle.html) then
> [`shots/74_the_circle_built.html`](../shots/74_the_circle_built.html).)*
> *(#73, THE LONG FIRE, was specced,
> pictured AND BUILT on 2026-08-02, build log 8f.79. Pictures:
> [`shots/73_long_fire.html`](../shots/73_long_fire.html) then
> [`shots/73_long_fire_built.html`](../shots/73_long_fire_built.html). It came straight from the
> user in one message.)*
> *(#72, the combat pass - dodge soft-capped
> at the top, ratkin/ogre dodge, the kick turned into a combo, the spear wall turned into a lane you
> have to keep clear, and DISENGAGE turned into the step itself - was filed AND BUILT on 2026-08-01,
> build log 8f.74. Pictures: [`shots/72_combat_dynamics.html`](../shots/72_combat_dynamics.html)
> then [`shots/72_combat_built.html`](../shots/72_combat_built.html). It came straight from the
> user in one message. **#50 should re-read every number in it.**)*
> *(#71, the world-map dramaturgy reshape,
> was proposed, approved item by item and BUILT on 2026-08-01, build log 8f.73. Proposal:
> [`tools/map_proposal_2026-08-01.html`](../tools/map_proposal_2026-08-01.html). Picture:
> [`shots/map_reshape_2026-08-01.html`](../shots/map_reshape_2026-08-01.html).)*
> *(#67 the slow working plus the enemy
> focusing a caster it can reach, #69 the character sheet's skill-tree drawer, and #70 the merged
> after-battle card with mercy folded into it, were filed AND BUILT on 2026-08-01, build log 8f.68.
> Pictures: [`shots/67_windup_built.html`](../shots/67_windup_built.html),
> [`shots/68_sheet_skill_tree.html`](../shots/68_sheet_skill_tree.html),
> [`shots/69_after_battle_one_screen.html`](../shots/69_after_battle_one_screen.html). All three
> came straight from the user rather than from this file, which is the ordinary way a number gets
> spent here.)* *(#68, the defended outpost gate plus
> pass-through-your-own movement, was specced and built on 2026-08-01, build log 8f.67, picture
> [`shots/68_outpost_gate.html`](../shots/68_outpost_gate.html). ⚠ **#67 was taken in the code by a
> parallel session while all three doc headers still said "next free #67"** - the third collision of
> this kind, so grep the prototype as well as the docs before numbering.)*
> *(#66, the three camera stops, was specced
> and built on 2026-08-01, build log 8f.65.)* *(#61 to #65 were filed AND BUILT on
> 2026-08-01, build log 8f.64, and they took **#56** and **#33** with them. Pictures:
> [`shots/61_terrain_built.html`](../shots/61_terrain_built.html).)*

### 🔨 Active — grouped by SCREEN, tiered by influence inside each

> **Restructured 2026-07-31 at the user's request: *"categorise things by screens… to each task add
> related tasks and systems."*** One entry appears in **exactly one** screen section — the screen
> where the player *meets* it — and every other screen it reaches is named in its **also touches**
> column. **There is no second table**: tier, model and dependencies are columns here, not a
> parallel list, because this file has already been bitten once by an index that drifted from the
> thing it indexed.
>
> **Read it two ways.** *"I am about to work on the battle board — what is coming to it, and what
> will it collide with?"* → read one section. *"What do I build next?"* → read the order strip
> below. Both are the same rows.

### ★ PRIORITY IS A DATE NOW, NOT A TIER: THE THREE BUCKETS

**Set by the user 2026-08-01:** *"You can also divede all backlog for: need to be done before first
play test / needs to be done before second playtest / could be done later"*, and the follow-up that
placed the hard cases: ***"bigger conceptual quastion (like sckills synergies) put to second one.
same metaprogression."***

**This outranks the tier strip below it.** Tier is still true and still useful *inside* a bucket, but
it answers *how much does this unlock*, and the question that now decides what a session picks up is
**when does this have to be true.** Ask these in order and stop at the first yes:

| | the question | what belongs |
|---|---|---|
| **Ⅰ** | **Does a friend need this to understand the game, or to be treated fairly by it?** | **Before the first playtest.** ⛔ **Nothing here may add a system.** |
| **Ⅱ** | **Does the depth pass need it before strangers arrive?** | **Before the second playtest.** Foundations, anatomy, rule changes, **and the bigger conceptual work by the user's own call.** |
| **Ⅲ** | everything else | **Later, and that is not a demotion.** Mostly consumers of the gates above, so they get *cheaper* the moment those exist. |

> ### Ⅰ · BEFORE THE FIRST PLAYTEST - five entries
> **#13** *(critical gate)* → **#50** at playtest grade → **#27** · **#12** · **#39**
>
> That is the whole list, and the short length is the finding, not an omission: **gate 1 is mostly
> unnumbered work** - the opening, the screens, two playthroughs, the three `?` items that are the
> user's own. Five backlog rows and thirteen steps.

> ### Ⅱ · BEFORE THE SECOND PLAYTEST - fifteen entries
> **#24** *(critical gate)* → **#4+#17** *(critical gate)* → **#80** *(before #50, see below)* →
> **#34** · **#32** · **#2** · **#47** ·
> **#45** · **#78** · **#16** · **#3** · **#22** · **#59** · **the Settlements & Legacy MVP** ·
> *(#57 runs elsewhere and is this bucket's instrument)*
>
> **~~#82~~ was placed here on 2026-08-03 as the bucket's borderline case and then SHIPPED the same
> session** (8f.108), which is the one useful thing about the argument: it was placed in Ⅱ because
> it adds a register and bucket Ⅰ may not add a system, while the thing it fixes (a spear reaching
> through an oak) is exactly what a friend reads as a bug rather than a rule. **When an entry is one
> session long, that argument costs more than the build.** Worth remembering the next time a small
> fairness fix is being sorted into a bucket.
>
> ⛔ **#80 has a hard ORDER constraint and it is the only one in this bucket that does.** #79
> shipped the damage split every statblock in the game had been tuned against, and it left a
> measured balance debt (both bosses became winnable; see 8f.97). **#80 moves that number back on
> its own**, so it has to land **before #50 THE BALANCE PASS** or the sweep gets done twice. It is
> bucket Ⅱ and not Ⅰ because it is a rule change on the floor of combat, which is the class the
> user assigned here.
>
> **#78 sits next to #45 on purpose**, and it is bucket Ⅱ rather than Ⅰ for one reason: its first
> item asks to bring back a repeat penalty that #45's ruling deleted. That is a conceptual question
> about the action economy, which is the exact class the user assigned to this bucket. Its other two
> items are small and could go earlier if the ruling drags.
>
> **#45 and #59 are here by the user's own ruling**, not by tier. **#45 is the synergy rule** - the
> "bigger conceptual question" named in their instruction - and it was deferred only because the
> skills and mutations plugging into it were still landing, which by this bucket they have.
> **#59 plus the settlements MVP are the metaprogression**, and #59 is the only piece of it already
> specced and shot.

> ### Ⅲ · LATER - thirteen entries
> #35 · #25 · #23 · #19 · #21 · #26 · #28 · #29 · #30 · #37 · #42 · #43 · #49

**⚑ THREE CRITICAL GATES, and the word means one thing here: something else cannot start.**
**#13** blocks the entire balance trio and #50/#29/#30 · **#24** blocks #19 #22 #23 #25 and the
distant #26 · **#4+#17** blocks #34 and #35. **Do not mark an entry critical because it is
important. Only because something is blocked behind it.**

**The one placement that is a judgement rather than a fact: #47.** It is a *rework* of an existing
class, not an addition, which argues for bucket Ⅰ, but it touches enemy AI in **both brains**, which
is not what you want destabilised the week before the build goes out. **The trigger that reverses
it:** if the class pass finds the spearwoman unsayable in one sentence, #47 comes forward.

**The visual view of all of this is the master board** - `.claude/skills/master-board/` in this repo,
published at <https://claude.ai/code/artifact/a6203c02-2946-4272-b3e5-83f7d5e691c2>. It is a **view,
never a source**: if it disagrees with this file, this file wins and the board is stale.

---

**The tier order still holds inside a bucket - ONE entry per session, top tier first:**

> **Tier 1** #24 → #13 → #32 *(⏸ #49 deferred)* ·
> **Tier 2** #4+#17 → **#34** → #35 · #2 ·
> **Tier 3** #47 · #19 · #25 · #22 · #23 ·
> **Tier 4** #3 · #12 · #16 · #21 · #39 ·
> **🔚 last** #50 *(⏸ #45 is inside it)*
>
> ⚠ **Read this strip through the buckets above, not instead of them.** It says #24 first; the
> buckets say #13 first, because #24 is bucket Ⅱ and #13 is the bucket Ⅰ gate. **When the two
> disagree, the bucket wins on *when* and the tier wins on *what order inside it*.**
>
> *Struck since the last revision: ~~#55~~ ~~#54~~ (both shipped 2026-08-01, 8f.54) ~~#46~~ ~~#38~~
> ~~#40~~ ~~#52~~ ~~#53 v1~~ — all in
> [`SHIPPED.md`](SHIPPED.md). **#34 moved from 🕰 distant-future to Tier 2** the day the user ruled
> on mortality, and it drags #4+#17 up in front of it because a maiming is what the paper doll has
> to be able to draw.*

**How to read a row.** **Tier** is influence — how many things below get cheaper, safer or possible
once it exists (**1** multiplier · **2** system · **3** consumer of a tier-1/2 parent · **4** leaf,
safe in any order · **🕰** distant future, parked with intent, not rejected · **⏸** deferred by the
user). **Also touches** is every *other* screen it changes — that column is the collision warning.
**Related** is the entries and systems it shares machinery, data or a rule with; **⇢ waits on** is a
hard dependency, everything else is a neighbour worth reading first.

**Which model builds it — the MODEL column** *(set with the user, 2026-07-31)*:

- 🧠 **STRONG** (Opus 5 / Fable) — the session is owned end to end by a strong model. For anything
  touching the **two AI brains, morale, the save, combat rules, or the game's voice** — every
  expensive bug in this project was subtle-systemic (the inverted `pull`, the `B.seq` lock, the
  silent catch), and the tone is as easy to get almost-right as the code.
- 🔧 **SONNET-OK** — mechanical, render-only, or schema-following, with an exact spec and a
  verifiable result (screenshot, regression). Precedent: 8f.12 was planned on Fable, executed by a
  Sonnet subagent, verified independently — and it was CSS with no logic, which is the point.
- 🧠→🔧 **SPLIT** — a strong model writes the gate artifacts (the rules + the picture) and any
  authored lines, then delegates the wiring; strong model reviews before it ships.

**The delegation rule, either way:** the strong model **owns the session** and may hand fenced
mechanical sub-chunks (CSS, wiring to an exact spec, running the regression) to Sonnet subagents
mid-session — that is cheaper and loses nothing. The reverse is forbidden: a cheap model must not
own a session on a 🧠 entry, because it cannot escalate judgment it does not know it is missing.
Tags mark the *riskiest* part of the entry; when in doubt, go stronger.

**A 🕰 distant-future row shows `—` for a model, and that is deliberate**: an entry gets its tag
when it graduates into a tier, judged against the codebase as it is *then*. *(Spoiler: almost all
of them are 🧠 — which is part of why they wait.)*

---

### ⚔ THE BATTLE BOARD

*The board, the unit panel, the action row, the fight log, AUTO. `#bLeft` + `#bMain`.*
**The most crowded screen in the backlog, and the one most able to break itself** — everything here
lands in **both AI brains** (`aiTurn` and `autoStep`) or AUTO silently stays stupid.

| # | | Tier | Also touches | Related entries · systems | Model |
|---|---|---|---|---|---|
| **32** | **The rally rule** — routing needs help to come back from | 1 | — | *(the Fen-Mother defect this number used to be is **closed** — see the entry.)* A routed body may not re-cross the rout line on a quiet turn alone: it needs the Captain within 3 hexes or a steady ally adjacent. Systems: the nerve ladder, the quiet-turn recovery, rout-step/`fled`. Related **#38 built** — ⚑ **it put a rule on this exact ladder without touching a scorer**: a tie sets `noRout` mid-fight and every brain reads it for free. **Read 8f.50 before writing this** · **#2** (same scorer, movement side) · #31 built | 🧠 STRONG — morale across every fight, both brains |
| **49** | ⏸ Make the AI explain itself | 1 ⏸ | ⚙ tools | **deferred by the user 2026-07-31** — gate artifacts DONE and keep (`shots/49_ai_explains.html`), so it returns as a *build* session. The debugging tool for every AI row on this screen: **#2 #46 #47 #37 #42**, and #50 spends its time asking *why did it do that* without it | 🧠 STRONG — reads both brains' scorers; misreading one term makes the tool lie |
| **2** | Personalities that command the AI | 2 | 🎒 the sheet (the personality is read there) | AUTO becomes a judgement about *who you can trust with which part of a fight*. Systems: `TRAITS`, `doctrine()`, `tr(u,key)`, `aip()`, the movement scorer ×2, `toggleAuto`. Related **#25** (evolution reads these same fields) · **#37** (doctrines sit on top) · **#21** (needs behaviour worth reporting) · **#40 shipped** (personality picked whose line; the plumbing is `capBalloon`) | 🧠 STRONG — the movement scorer in both brains |
| **47** | The spear becomes a zone | 3 | 🎒 the sheet (the class contract) | ⇢ waits on **nothing** — *#45 was deferred and does not block it.* Systems: the accuracy site that prints `marsh −10` receipts, SPEAR WALL / BRACE AND SHOVE, enemy AI in both brains. Related **#46** · **#45** (the shove's mark, later) · **#29** (ZOC would change what reach 2 is worth) | 🧠 STRONG — accuracy rule + enemy AI must learn to exploit it, both brains |
| **45** | ★ Reward the combination, not the repetition | ⏸ **inside #50** | — | **deferred by the user 2026-07-31** and it returns as the *first* thing #50 builds. ⚠ **Everything built before then must keep the hook reachable**: all forced movement resolves through the one block in `strike()`, and nothing may start writing its own displacement path. Related **#46 #47** (the verbs it will pay) · **#30** (it reverses that entry's base rule) | 🧠 STRONG |
| **37** | AUTO doctrines — PRESS · KEEP LINE · HOLD & SCREEN | 🕰 | — | waits on a mature, trusted AUTO to sit on ⇢ **#2** first. Related **#42** (the flourish is a doctrine's showpiece) · **#21** · **#34** (never sacrifice a final-slot character) | — |
| **42** | AUTO gets one flourish | 🕰 | 📜 the aftermath (it is worth reporting) | teacher-AUTO, after #37's foundations. Related **#21** (same evidence, different screen) · **#46** (the new verbs *are* the flourishes) | — |
| **29** | Zone of Control, the better version | 🕰 | — | cut once for making movement unaffordable ⇢ needs **#13** to measure a return. Related **#47** (a spear's reach-2 hex is exactly what ZOC re-prices) · **#46** (facing + displacement) | — |
| **30** | Action economy remainder — quiver · slow mage | 🕰 | 🎒 the item | its base rule was **superseded by #45**; the survivors need **#13** and a new contract for the quiver — banked in #50's parking lot | — |

> **Open remainders already on this screen** *(from shipped entries — not new work, but the next
> person to touch these files should know):*
> **#18** — is *"send somebody wide"* on the Thing in Armour worth the person it costs? **The arena
> structurally cannot answer this**; the human playthrough is the only instrument. ·
> **#1** — pushes as a reason to care about board edges. ·
> **#8** — the sounds are verified to *fire*; whether they *sound* right is the user's ear. ·
> **#46** — the **poison stack is uncapped** and no human has met it; at **15% a cut** (the user's
> call, taken down from 25% the same day) three ratkin buy **+45%**. The limiter is meant to be the
> three turns it cost, not a ceiling. Parked in **#50** — and the failure to watch for now is the
> opposite one: too small to be worth an action.
>
> **⚑ NEW ON THIS SCREEN 2026-07-31 (8f.49): AN OGRE CHANGES THE MAP, AND `a.range` IS NOT
> "IS AN ARCHER".** Two things this screen's future work has to know. **First**, the board is no
> longer fixed for the length of a fight — a boulder can be lifted and set down elsewhere — held
> safe by exactly two rules (**only an *independent* rock may be lifted**, and **none may be set
> down beside another**), which is what keeps every boulder independent for the whole fight and
> keeps every boulder safe to move. *(**#33's validation is no longer unwritten** — `terrainCheck()`
> shipped 2026-08-01. It still only runs at spawn, so the two rules above are still what keeps a
> mid-fight board legal; what changed is that there is now a function to call if you want to relax
> them.)* **Second**, and it will bite again:
> five sites tested `a.range` to decide "is this a shooter", and only two of them had learned to
> require `a.dmg`. A range-4 act with no damage made every ogre read as a bowman — targeting
> priority, doctrine's shooting band, both brains' movement. All five are fixed; **if you add an
> act with a `range` and no `dmg`, grep for `a.range` before you ship it.**
>
> **⚑ NEW ON THIS SCREEN 2026-07-31 (8f.45): WATER COSTS A HEX OF STRIDE.** A unit that *begins*
> a move standing in a wet hex has its budget cut by 1, on top of the 2 the hex already costs to
> enter. It lives in **`moveBudget`** — the one function every mover asks — so both brains got it
> without being taught. **Four entries below now touch it and none of them knew:** **#46**'s kick
> is explicitly *"kick somebody into the marsh"*, and that is now worth strictly more than it was
> when specified · **#47**'s shove has the same upgrade · **#45**'s **GROUND** mark was written
> against terrain that only charged on entry · **#33 shipped and does validate this** (8f.64).
> Nothing is blocked; each is one sentence better than its spec.
> The internal key is still `marsh` — only the player-facing wording changed.
>
> **⚑ NEW ON THIS SCREEN 2026-08-01 (8f.64): THE GROUND IS A REGISTER, AND THERE ARE THREE MORE
> KINDS OF HEX.** `TERRAIN{}` now names eight places and `FIELDS{}` says which fight is fought on
> which; a per-fight terrain row is one word plus a seed. Anything below that touches the
> battlefield should know four things. **First**, `BLOCKED` gained `tree` · `huge`/`hugeA` · `wall`
> · `flower`, and **`tree` and `wall` are deliberately not `rock`** — #46's `loneRock` tests
> `==='rock'` exactly, and that is the entire mechanism stopping an ogre uprooting a forest or
> dismantling a fort. **If you add a new impassable kind, decide on purpose whether an ogre may
> lift it.** **Second**, `deep` water is a hex you CAN stand in that costs 3 to enter and −2 stride
> to start in, so **#45**'s GROUND mark and **#47**'s shove are both worth more again, and
> **forced movement into deep water is now the cheapest way to take two hexes off somebody.**
> **Third**, `moveBudget` now carries three ground rules rather than one, and `nerveFrac()` is a
> new single site every ladder read goes through — **#32**'s rally rule wants that function, not
> `u.morale`. **Fourth**, `terrainCheck()` exists: call it before assuming a generated board is
> playable, and note it computes rather than measures, because `getBoundingClientRect()` returns
> zeros in the hidden pane.

---

### 🗺 THE ROAD — the map, travel, road & camp cards, the Muster Field

*`#wBar` + `#wMap` + `#wDlg`. Everything between fights: nodes, travel, event cards, camp
incidents, recruiting, the shrine.*

| # | | Tier | Also touches | Related entries · systems | Model |
|---|---|---|---|---|---|
| **19** | Desperation contracts at the Muster | 3 | 📜 loot order + the run summary · 🎒 the contract on their sheet · ⚔ *one fight only* | ⇢ waits on **#24** (the sibling promise is a `promise_made` fact). Systems: candidate roll, `finishRecruit`, `dismiss()`, the run-summary crowns line, the loot screen. Related **#5 built** (unpaid wages made a broke company *more* likely, not less) · **#23** (both are the cost of command) · **#22** | 🧠→🔧 SPLIT — contracts and their future costs are strong; the four wiring hooks are mechanical |
| **22** | The road reads the company | 3 | 🎒 the roster's *shape* is the input | ⇢ waits on **#24**. *"Every Rabble is different" should be visible in the prose, not only the stat screen.* Related **#44 built** (`castRace`/`castNeed`/`castKeep` **already gate a whole card on who is at the fire** — that is this entry's machinery, built early) · **#3** · **#39** | 🧠→🔧 SPLIT — strong writes the prose variants (tone!); gating on roster shape is mechanical |
| **3** | The clash recruit is already changed | 4 | 🎒 the condition on their sheet · ⚔ Blood on the Road | **the best single idea in this file** — it puts a mutation in front of the player in the first hour and gives the tutorial fight a *cause*. Systems: `clashAfter`, a `CAMPS` entry with `needs:`, `EVENTS`. Related **#16 / #17** (it is the shop window for both) · **#24** (the reveal wants a fact, not a boolean) · **#26** (same claim→cost→return shape) | 🧠 STRONG — the reveal's writing carries it |
| **26** | The Smaller One — the reference chain | 🕰 | ⚔ a special 2–4 round hunt (**AUTO disabled**) · 🎒 the victim's sheet · 📜 no XP, no loot, no tally | seven cards of content ⇢ needs **#24** first (nine named facts, *not* a flag). **First candidate to graduate back.** Related **#3** · **#38** (the tie makes the victim cost more) · **#19** | — |
| **28** | The Act 1 stinger | 🕰 | ⚔ a close-range ambush · 🚪 the thank-you screen | demo-ending content; **the enemy still needs a real name** (the packet's label is borrowed from elsewhere). Hard rule: the postscript must not corrupt the completed run | — |

---

### 🎒 THE COMPANY — roster · character sheet · stash

*`#iRoster` + `#iChar` + `#iStash`. The paper doll, scars, mutations, personalities, gear, history.
**This is the "inventory and character" screen**, and it is where a body's whole record lives.*

| # | | Tier | Also touches | Related entries · systems | Model |
|---|---|---|---|---|---|
| **4 + 17** | Body parts you can lose **+** mutations you can see | 2 | ⚔ the rules and the token · 📜 `injure()` in the aftermath | **Build the painter API once — both use it, in opposite directions**: a lost part draws as outline-plus-cross, a mutated part is *redrawn* as a different shape. Systems: `PARTS` (new), `SCARS`, `BODYPART`, `drawDoll`, `MUTS[k].draw`, `sprite()`, `unitFrom`, `handsFree`. Related **#35** ⇢ waits on this API · **#16** (supplies what there is to draw) · **#3** (delivers the first one) · **#34** (a maiming is the same anatomy one notch heavier) · **#12** (the other half of what a person looks like) | 🧠→🔧 SPLIT — the API and rules are strong; the per-mutation painters are mechanical |
| **25** | Personalities that earn their evolution | 3 | ⚔ the proof happens in a fight | ⇢ waits on **#24** (honest counting across a run). **Count qualified risky successes, not repeated actions.** Related **#2** (the AI fields are what evolves) · **#38** (both are "a person changed because of something that happened") | 🧠 STRONG — proof conditions are a design judgment; get them wrong and it is grinding |
| **23** | The cost of command | 3 | 🗺 the decisions were made there | ⇢ waits on **#24**. The Captain's sheet only, and **facts with names, never a morality score**. Related **#19** (a contract is a debt with a name on it) · **#24** (this is its first pure reader) · pillar rule 4 | 🔧 SONNET-OK — display only; strong model reviews the wording |
| **12** | Painted faces, pack 03 | 4 | ⚔ the battle panel · 📜 the who-card on promotion | mostly the **user's generator work**. Systems: `PORTRAIT`, `RACEPORTRAIT`, a stable per-person hash pick, `art/build_assets.ps1` → `art/inject.ps1`. Related **#40 shipped** (a reaction needs a face worth looking at — this is what supplies it) · **#51 built** (`faceURI` already falls back to a procedural bust) · **#17** | 🔧 SONNET-OK |
| **16** | The rest of the mutations | 4 | 🗺 the origin events · ⚔ each needs a **real battle rule** | 3–4 of the 14 authored, never all. Related **#17** ⇢ it is what #17 draws · **#3** (seeds the first one) · **#4** (same limb vocabulary) · **#50** (each new body rule is a balance input) | 🧠 STRONG — each needs a battle rule and the tone rule ("not a death sentence, not a joke") |
| **34** | ☠ **The mortality chain — scarred → maimed → dead** | **2** | ⚔ nothing on the board changes · 📜 the death is revealed here and **nowhere else** · 🚪 what a dead company leaves | **RULED BY THE USER 2026-08-01** — *"Mortality — yes — after get scars and maimed."* This reverses the single oldest rule in the project (*nobody on the roster dies in a fight*) and it reverses it **in the one way that keeps the reason the rule existed**: death is the *end of a visible chain*, never a roll. ⇢ **waits on #4+#17** (a maiming has to be a real, drawn thing) and wants **#24** (the chain is stored facts, not a count). Related **#35** (the same anatomy, the other direction) · **#38 built** (a tie is what makes a death cost) · **#37** (AUTO may never spend a last-body character) · **#26** | 🧠 STRONG — it is the game's oldest rule being deliberately broken |
| **78** | ★ **A good thing you carry takes something away** | 3 | ⚔ all three bite on the board (a damage term, an action pip, a second shot) | **The side-effect contract for gear**, from the user 2026-08-02, with three items: the **Overfull Quiver** (−2 AGI, second shot at full strength) · the **Ground-Glass Eyes** re-cut (+9 hit, **takes 20% more damage**, and its own description already said so) · the **Red-Warg Bottle** (+1 action now, one fewer next turn, once a battle). **Four rules, and the first one is the entry:** *the cost is paid on a different axis from the benefit.* ⚠ **The quiver is blocked on a ruling**: it is #30's Oversized Quiver, whose penalty #45 deleted. Systems: `GEAR{}` · `dmgMul` (one site, already carries defender terms) · `beginTurn`'s `actionsMax`. Related **#30** ⇢ **this is the new contract that entry is waiting for, and ① strikes it** · **#45** (the collision) · **#13**/**#50** (two numbers want measuring) · **#35** · **#16** | 🧠 STRONG. A combat rule, the action economy, and item text |
| **35** | **Grafts — rare authored consequences** | 3 | ⚔ the narrow compensating rule · 🗺 **the road half is new** | **RULED BY THE USER 2026-08-01** — *"rare authored consequences of specific injuries **or events on the road**."* So: **not a doctor's menu you shop from**, and **not only injuries** — the road can hand you one too. ⇢ waits on **#4 + #17**'s painter API. *Worse in one ordinary way, strangely better in one specific situation.* Start with **one**: Shield-Skull. Related **#34** (the chain a graft interrupts) · **#16** · **#3** | 🧠 STRONG — authored consequences are writing, not a table |

---

### 📜 AFTER THE BATTLE

*The two beats — "what happened", then "what you carry away" — loot, promotion, the run summary.
`afterBattle()`.*

| # | | Tier | Also touches | Related entries · systems | Model |
|---|---|---|---|---|---|
| **21** | What they did without you | 4 | ⚔ AUTO is what it reports on | better after **#2**, and richer after **#46** (three new verbs = three new notable moments). **Strict thresholds and authored templates — if nothing exceptional happened, show nothing.** Related **#42** (same evidence, live on the board instead) · **#37** | 🧠→🔧 SPLIT — strong writes the templates and sets thresholds; detection hooks are mechanical |

> **This screen is mostly consumed rather than owned.** Four entries write to it from elsewhere and
> the next person here should expect them: **#19** takes a share of the haul and adds a run-summary
> row *(it used to take the **first loot pick**; #55 removed the picker — see below)* · **#4** scars
> and losses land through `injure()` · **#38 built** — its rescue is detected here, and
> `afterBattle` now writes a *typed* bond ·
> **#34** reveals a last account here and **nowhere else**. Open remainder: **#10**'s Act 2 half.
>
> **⚑ THE SHAPE OF THIS SCREEN IS SETTLED NOW (#55 shipped 2026-08-01), and anything landing here
> has to fit it:** a **receipt** (what came off the field — arrived, not chosen) · **sometimes one
> question** about what is *left* on the field, which exists only where the fight's LOOT table holds
> a row costing a day or the company's regard (four of the eight) · **the promotion**. *"Back to the
> road"* waits on the question and the promotion, and **both are always answerable** — that gate is
> the softlock this screen is one edit away from at all times.

---

### 🚪 THE FRONT DOOR & BETWEEN RUNS

*The menu, `? RULES`, the practice field, the wagon — and the layer that does not exist yet.*

| # | | Tier | Also touches | Related entries · systems | Model |
|---|---|---|---|---|---|
| — | **Settlements & Legacy MVP** — *the inheritance screen first* | **plan item 2** | 🎒 who inherits what · 📜 the run summary hands off to it | not a numbered entry — it is [`09_SETTLEMENTS_AND_LEGACY.md`](09_SETTLEMENTS_AND_LEGACY.md), and **Act 2 structurally needs it** or it is just more nodes. It is the piece that makes a lost run mean something | 🧠 STRONG |
| **59** | **The woman from the cage comes back, and she is not a hire** | 3 | ⚔ she stands on the Snare board · 🗺 a new event at The Last Muster · 📜 nothing — she takes no spoils and leaves no sheet | **RULED BY THE USER 2026-08-01** — *"if you seaved her she joins in the final fight of act. She is an archer"* + *"she joints not a company - but fight itself."* Free Wynn without a fee → `LEGACY.ashmoor` → **a later run** she is waiting at the last quiet node and fights the Snare as `ally:true`. She is the **TURNCOAT mirrored** (a person you paid off returns as a foe; a person you spared returns as an ally) and reuses `clashAllies()`'s contract whole. Unblocks `POR09`, which is painted and today unreachable. Related **#38 built** · **#34** · **#24** | 🧠→🔧 SPLIT — the prose and the "not a hire" boundary are strong; the unit injection copies the turncoat |
| **39** | Meet the Rabble | 4 | **every screen** — one card teaches the screen you are on | **must replace or enrich the arrival cards, not add a fourth modal.** Speakers are cast **ROLES**, never hardcoded names — we have shipped that bug once. Related **#14 built** (the three onboarding layers it extends) · **#51 built** (the balloon is a voice on the field already) · **#40 shipped** · **#43** | 🧠→🔧 SPLIT — the voices are the feature; the card plumbing exists |

---

### ⚙ NO SCREEN — foundations, tools, and the rules under everything

*Nothing here is visible on its own. Each one is a multiplier, a measuring instrument, or a budget
every screen spends from.*

| # | | Tier | Surfaces on | Related entries · systems | Model |
|---|---|---|---|---|---|
| **24** | **Provenance ledger** ← **NEXT** | 1 | 🎒 #23 #25 · **#38 built and is its first real tenant** — ties are facts and they currently live in their own small store (`G.bonds`, typed, name-snapshotted, saved). Absorb it rather than leaving two ledgers · 🗺 #22 #19 #26 · 📜 the run summary | `addFact` / `facts` / `latestFact` + `characterRef()` — **the id is the reference, the snapshot is so a dead, dismissed or renamed person can still be talked about three hours later.** **Double-write first, migrate never**: the old booleans keep working. Gates **#19 #22 #23 #25**, distant **#26**, and all of Act 2's memory | 🧠 STRONG — architecture; every later consumer inherits its mistakes |
| **13** | The balance harness earns its keep | 1 | ⚔ what it measures | `window.ARENA` exists and has gone stale around every combat change since. **It is what makes #50 possible at all** — without it the balance pass is somebody's opinion. Related **#50** ⇠ its entry condition · **#29 #30 #27** (all parked *waiting to be measured*) · **#49** | 🧠→🔧 SPLIT — strong designs what is measured; the table plumbing is mechanical |
| **50** | 🔚 **The balance pass** | **last** | ⚔ mostly · 🎒 bodies · 📜 compositions | **a place to put things, not a thing to build.** ⇢ entry condition: ~~#46~~ **#13 #47 #16 #4** — one down, four to go. Scope, in order: **#45's motivation rule** → the arena numbers → what the new verbs did to a turn → compositions. **Bank observations in its parking lot; do not retune before it.** Holds **#27**, #30's survivors, #29, and the brigand round-tail | 🧠 **STRONG, highest effort** — judgment over the whole combat game; delegate only the arena runs |
| **43** | The narrator's budget — who may speak, how often | 🕰 | ⚔ barks · 🗺 hinges · 🚪 the prologue | production-stage, **but the audio *ranking* applies today**: action readability → barks → narrator → ambience. Related **#51 and #40 shipped** and **#39** — all four spend the *same* speaking budget on the same field, and #51 already set the shape (one a round, five a battle, no line twice a run) | — |
| **57** | 🚧 **EVENT ANALYTICS — the user's own, in another tab** | 🚧 | ⚙ `tools/dramaturge.html`, tab 2 · 🚪 it eats #53/#54's journal blob | **⛔ DO NOT PICK THIS UP. It is a big independent task the user is running in a separate session** *(their own words, 2026-08-01: "mark event analytic as big independent task that I am doing in other tab")*. Its spec lives **inside the tool, on the tab**, and that is the source of truth for it — not this file. **What this file owes it: nothing but a stable input.** Related **#53 · #54 shipped** — the export blob is its feed, and **invariant #10 binds it too: it observes and never acts** · **#50** (the balance pass is the customer for path-heat and choice-split) | — **not this file's to build** |

---

> ## Below this line: the entries themselves
>
> In **numbered** order — and numbers are stable identities, so the order has gaps and does not
> match any tier or screen. **Use the index above, or the browser's find.**
>
> **Every unbuilt entry opens with its own screen · systems · related header**, so an entry found
> by search reads cold without a trip back up here. `⇢ waits on` is a hard dependency; everything
> else on the RELATED line is a neighbour worth reading first.

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
> (Grimtoll vs Rabblebound) is still open** and still the user's.

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
