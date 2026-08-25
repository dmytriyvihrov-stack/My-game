# RabbleBound - the long-form plan reasoning (reference)

> **History and argument, not instructions.** Kept because the REASONS here are the expensive part:
> why an entry waits, what was rejected and on what grounds, what the user actually said.
>
> Split out of `00_PLAN_AND_BACKLOG.md` on **2026-08-10**. The working plan is now short and lives
> in [`00_PLAN_AND_BACKLOG.md`](../00_PLAN_AND_BACKLOG.md). Where the two disagree, **the working
> file wins** - this one is a snapshot of the thinking as of 2026-08-04.

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
| **G1-11** | **The GPT run** - a model plays it all and reports | a written report exists, with the reaction bar on and the journal blob exported | #53 · #54 (already built for exactly this) | ☑ **done 2026-08-02, by Claude through the real UI**: five campaign runs, twelve fights, every ending shape reached, reactions pressed, journal recorded. Report: [`QA_PLAYTEST_2026-08-02.md`](../QA_PLAYTEST_2026-08-02.md) | 2026-08-02 |
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
[`SHIPPED.md`](../SHIPPED.md)). The measurement was the design: the field is 980x544 and the board
596x416, so **41% of the battle screen was empty gradient** and the people looked small because the
board had never grown into the room it had. **That is why the lowest stop is x1.30 and not x1.00.**
It closes the user's own *"units and action looks a bit bigger. Like in battle brothers."*

**⚔ THE BATTLE BOARD IS THEREFORE THE ONE SURFACE THIS STEP HAS ALREADY PASSED, and it did not come
back with nothing.** It came back with **four questions that are gate-1 work and are already written
into [`WHAT_TO_TEST.md`](../WHAT_TO_TEST.md)**, and they are answered by playing, not by another pass:

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
[`QA_PLAYTEST_2026-08-02.md`](../QA_PLAYTEST_2026-08-02.md), section QA-7 and QA-27; both are one-line
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
> it — *"it works"*** — and its diagnosis is kept in [`SHIPPED.md`](../SHIPPED.md), because the hidden
> preview pane produces a stuck `G.moving` that looks exactly like that report and will fool the
> next person too.
>
> **What this changes about the order below.** The playthrough existed to answer *does this feel
> like anything*, and it did. The plan is no longer "prove the slice"; it is **deepen the slice**.
> The two rulings that arrived with the verdict — **mortality** and **automatic rewards** — are both
> about the *shape of a run* rather than about a screen, and they are why the order now puts a
> foundation and a loop change ahead of more content.

**1. Settlements & Legacy MVP** — [`09_SETTLEMENTS_AND_LEGACY.md`](../09_SETTLEMENTS_AND_LEGACY.md).
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
> 2-3 thing to work and do." Rows in [`SHIPPED.md`](../SHIPPED.md), full text in
> [`CHANGELOG.md`](../CHANGELOG.md).*

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
*(#36, #48, #46 and #40 were in this list and have shipped — see [`SHIPPED.md`](../SHIPPED.md).)*

> **#47 is the natural next combat session.** It was designed alongside #46 as one batch, it needs
> nothing #46 did not already put in place, and #50's entry condition now wants only **#13 #47 #16
> #4**. Its own gate still has to be walked — rules, then a picture — the same as this one did.

> **~~#82~~ SHIPPED 2026-08-04** (8f.108) and it is worth reading before #47, because it gave the
> spearwoman her first *cannot*: an oak or a group of rocks in the hex she thrusts over refuses the
> blow. Obstacles carry a HEIGHT now, and it is a register of its own that never merges with
> `BLOCKED`. See [`SHIPPED.md`](../SHIPPED.md).

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

**Five are still open** and still live in [`README.md`](../README.md) §6 — the name (*RabbleBound* or
*Rabblebound*), AUTO doctrine (one order or per person), numbers in the chronicle, the run contract,
and generated voice. Nothing in the plan is blocked on any of them.

---

