# Grimtoll - "where it stands", the long version (reference)

> **The narrative history of what shipped, as it accumulated in `README.md` section 3.**
> It had grown to 456 lines and duplicated [`CHANGELOG.md`](../CHANGELOG.md) and
> [`SHIPPED.md`](../SHIPPED.md). Moved here **2026-08-10** so the README could go back to being
> orientation.
>
> **History, never instructions.** For what is true today, run the game.

---

## 3. Where it stands

**Act 1 is feature-complete and playable end to end**, and every P0 defect from the outside review
is closed.

The run: tavern prologue → Blood on the Road (allied NPCs, pick a side) → three routes → the Ruined
Steading (an unavoidable dog ambush inside your own palisade) → the Black Fen (the Fen-Mother) →
Coldharrow village → the Muster Field → a back half of seven fights with road slots and a second
muster between them → the Snare → run summary → the wagon.

**Systems built:** hex combat on 15×13 with facing arcs, engagement and parting swings · two AI
brains (`aiTurn` for foes/allies, `autoStep` for player AUTO) with doctrine, cohesion and exposure ·
a five-rung nerve ladder with Battle Brothers situational morale · cooldowns · one-hand/two-hand
equipment · forced movement (push, pull, the ogre throw) · scars, two mutation chains, personalities
with race variants · provisions, wages and per-person unpaid-wage grievance · chained camp incidents
· mid-run save · a content linter · test mode.

**The game has a front door.** It boots into a **menu** — continue the road · a new company · the
**practice field** · **? RULES** · the wagon. The practice field fights any of the eight battles
against any of six companies (including a copy of your live one) with nothing riding on it: no
scars, no spoils, no day passing, and the save is never touched. `? RULES` is the standing
reference and closes backlog #14.

**The country has a shape now**, and the roads obey it: **the Fen** in the south-west and **the
Hunch**, a mountain in the east the road cannot cross except at one pass. That is what justifies
the act doubling back — you climb the north shoulder because there is no other way over, and come
back south-west because the Snare is at the southern foot. Node spacing is a linter rule, not a
judgement (and it checks the **name plate**, not the radius — a radial rule passed two places at
102px whose labels still overlapped).

**Two more shipped on 2026-07-31** (build log 8f.41): **bodies stay where they fall** — purely a
picture, no movement cost and nothing to click, so by round eight the board tells you where the
fight has been — and **line of fire**, four named states from one `losState()` that both AI brains
score with and the player reads off the hex. Neither brain will take a blocked shot, or an
obstructed one while a clean lane is open. **That unblocks #46**, whose ogre-throw AI needed
`losState` to know a boulder was worth removing.

**And the company has a voice now** (8f.42, #51): the **Captain calls the fight** from his own body
on the board — a comic balloon with his painted face and his roster name on it (`YOU “TALLOW”`,
nickname and all — a job title would have been the one place the game called a person by their
function), 2.2 seconds, no input pause and nothing to dismiss. Three tiers from one register:
**TEACH** a rule the first time it bites (riding on the existing whisper, one seen-set, so they can
never drift apart), **CALL** a state that just changed, **HEART** when it cost us somebody. Built
at twelve triggers and **cut to six by the user the same hour** — *"the 6 most important events,
for next I will craft manually"* — so: **six triggers, fourteen lines, no digit in any of them**,
two per job, all three tiers, with a HOW TO ADD ONE block above the register. One balloon a round,
five a battle, no line twice in a run, and heavier tiers take the round off lighter ones. **When the Captain is down, the
voice stops for the rest of the battle** — no substitute speaker, and it does not come back if he
is helped up. That absorbed backlog #41 whole. **`capBalloon` takes a *speaker*, not the Captain** —
face, label and anchor all come off whichever unit is handed in, and it is verified against
somebody who is not on the roster at all — **which is what closed #40 (the company reacting toward
the player) outright on 2026-08-01: *"it is done, delete."***

**And three Tier-4 leaves went the same day** (8f.43), at the user's request for *"3 smaller
steps"* — picked from the leaf tier because it is the one the backlog marks safe in any order, and
spread across three senses so they could not collide. **#8 — the verbs have voices.** Every verb
the game grew after the sound set was written had been borrowing somebody else's noise (the ogre's
throw played `rout`; the morale ladder had never made a sound in either direction), and the ogres'
camp fire is finally audible. **#15 — three battlefields instead of one.** `paintTerrain`'s
hardcoded palette lifted into a `GROUND{}` register: teal moved *verbatim* so the default could not
regress, Dust & Gold on the hill and the sling-line, and **the Bloom on the Fen-Mother** — which is
not a new claim, since her event card is already `art:'bloom'` and her node is `weird`; the
battlefield was the last screen that had not been told. It left a rule behind: **no state colour
may read worse on a new ground than on the one the game already ships** — the first, genuinely pale
Dust & Gold cost every state colour ~13% of its contrast, so the paleness moved off the base into
the tufts and the rock. **#44 — two ratkin, one aunt.** Claim → cost → return, with one return per
ruling so beat three lands however you ruled; three booleans and no genealogy. It brought
`castRace`/`castKeep` (gate a whole *card* on who is at the fire, not just a choice) and **taught
`LINT()` to read `CAMPS`** — the one content table it had never opened, and the one with the most
gates in it.

**And every race has a verb of its own now** (8f.49, #46): **KICK · PICK UP AND THROW · POISON THE
BLADE**, one per race, third in the action row, one action out of two — and **none of the three is
a damage button.** They exist to make somebody *else's* action better, which is what makes a mixed
company worth assembling rather than a stat spread worth optimising: *the ratkin poisons him, the
human kicks him into the ogre's reach, the ogre picks him up and throws him back through his own
line.* **No rule anywhere says those three combine** — they combine because of where the bodies are
standing. One `RACESKILL` register is read by the roster *and* by the enemy, so a clan ratkin
poisons exactly the way yours does. *(The poison is **+15% a cut**, stacking, uncapped — specified
at 25% and taken down by the user the same day. One constant, `VENOM_PER`; three cuts buy +45%.)*

It brought **one new word — SIZE** (`sizeOf`: great beast 3 · ogre 2 · everything else 1), which
buys one player-facing rule covering both displacing verbs: **an ogre is never moved by anything,
and only a great beast could lift one.** The refusal is an **offer withdrawn, never an action
wasted** — the hex is not lit, the click does nothing, nothing is spent. **The boulder is the
user's own ruling and the better one:** only an *independent* rock can be lifted, it goes 3 hexes
rather than 4, it hits hard and can miss, and **it comes back down on the ground** instead of
shattering. That makes the ogre the only body that can change what the map is — and "independent
only" is what keeps it safe, because a wall can never be dismantled.

> **It also made a pre-existing bug loud, and that is the transferable lesson.** Five sites tested
> `a.range` to decide "is this a shooter"; only two had learned to require `a.dmg`. HURL A RATKIN
> (range 4, no damage) had been the sole act shaped that way, so the error was quiet. Put a throw
> on *every* ogre and all four Steading-Line ogres started keeping station at bow range — in the
> one fight whose whole premise is that they hold their ground — and 9 rounds became 29 **without
> a single throw being taken.** The verbs were innocent; the targeting was not. **When a field
> gets a second user, grep every reader of it.**

**And the company has its first relationship** (8f.50, #38). A bond may now carry a **type**, and a
typed bond is a **tie** — which buys three things a bare shared line could not. It is
**directional**, so *"you carried me out"* reads as **LOOKS AFTER** on one sheet and **OWES** on the
other: one fact, two sentences, no number. It gates a card the deck cannot otherwise reach — a new
`castTie`, the same machinery #44 built for `castRace`, one turn further in — and **TWO SHADOWS**
is the only thing in the game that can *end* a tie, out loud, in front of the two people it is
about, because two people who will not be separated are one person's worth of frontage. And it does
one thing in a fight: **your tie goes down where you can see it, you take the grief doubled and you
will not rout again that battle.** A boon and a bill in one fact.

> **The entry's own AUTO rule was void, and that is the transferable part.** #38 asked for *"do not
> leave that person downed while withdrawal is still possible"* — but withdrawing has since learned
> to carry the downed out, so there is nothing left behind to go back for. The *reason* survived,
> moved out of the movement scorer and into **morale**: `noRout` is read at one place by
> everything, so **both AI brains and AUTO inherited the behaviour without being taught.** Before
> adding a battle rule to a scorer, check whether the ladder can carry it. It also found a
> pre-existing gap — **`G.bonds` had never been written to the save**, so every shared fact in the
> company silently vanished on a reload; it did not show because a bond was one italic line in a
> collapsed drawer, and a tie is load-bearing.

**And the game can now be handed to somebody else** (8f.51, #53). A **★ ▲ ▼ bar sits bottom-right of
every screen**, and what makes it worth anything is that a reaction attaches to the **exact** thing on
screen — the event card's own title, the fight's kind — never "the world map". Beside it the journal
records every decision, every road and every fight, and the report gives a run's length in days *and*
in time at the keyboard. **It exports as plain text**, so a friend's journal can travel home and be
read back in. ⚠ **Invariant #10 is the contract and is written into the code: it observes and never
acts.**

Three defects went with it. **The purse has one door and a floor** — nineteen sites wrote crowns and
provisions directly and only the wage loop clamped, so a costly ruling on an empty chest went
negative. **A longer road is more road**: a leg rolled the road *once whatever its length*, so the
long option at every fork was strictly dominated — it rolls once per day now, capped at three, with
one-day roads bit-for-bit unchanged. And **content now outranks chrome**: the event card sat at
z-index 12 while `? RULES`, `☰ MENU` and the tester's buttons sat at 50 and 60, so every card opened
underneath the furniture. There is a written layer ladder now.

> **The "constant map overlap" was the road labels, and the diagnosis is the transferable part.**
> Node-to-node spacing measured clean and was never the problem: the price label sat at the road's
> exact **midpoint**, which on a short edge is inside the name plate of *the node you are standing
> on* — ten of the twenty-one places you can stand. **The collision is a property of where you
> stand**, which is why looking at the map at rest never found it. `labelSpot` searches now and
> `labelViolations()` checks it from every node. Two traps re-learned: **a boot IIFE that reads
> `const EDGES` from above it is a TDZ crash that aborts the whole script** (the page came up with a
> working LINT and no EDGES), and **`getBoundingClientRect()` returns zeros in the hidden preview
> pane**, so a "measure the DOM for overlaps" check silently passes everything — compute, never
> measure.

**Round band:** 4–12, boss longest. *Brigand has been the standing exception, banked in #50's
parking lot at 14, then 12–15, then 9–18 — and on 2026-07-31 **twelve dedicated runs read 8–15
with a median of 10**, inside the band. Every one of those earlier numbers was a single sample of a
wide distribution with a long tail (21 and 26 both turned up in one session). The thing to park is
the tail, and **one regression line is not evidence about this fight.*** **Eight fights**, all clean. The Fen-Mother's never-ending
state is closed: she goes **DESPERATE** rather than breaking (she is over a child — 6% of her
health a turn, +50% damage, five actions down to three), and **every fight now gets hungry** from
round 11. She went from 21–30 rounds with a 1-in-40 tail at 835, to 12–14 with a max of 25.

The eighth is **the Thing in Armour** (backlog #18, the user's flagged build-first): a road ambush
with no arcs, a sweeping sword, flat damage soak and a five-hex stride, whose correct play is to
pin it with one body and shoot it with the rest. **One thing on it is still open** — the
"send somebody wide" answer is not balanced, and the arena structurally *cannot* balance it (the
thing it buys is only worth something to a side that chooses to hold ground, and the AI never
does). That is a question for the human playthrough, and it matters: per the pillar, spending a
person has to actually pay, or the choice is a trap.

**Five more went in from an annotated-screenshot review the same day (8f.46):** the travel card now
drops its road description on a corridor the same way the map label already did; event and camp
choices show their morale effect and confirm it after, a deliberate temporary exception to "the
score is hidden," at the user's explicit request for playtest clarity; the hit-chance readout's
`other` row no longer hides a silent contributor (an attacker's own shaken nerve); EMBER is capped
at once a turn instead of twice; and the character sheet lost its redundant header tags and section
labels, with NERVE moved up beside ARMOUR/HITPOINTS.

> **✅ #52 — the reported Coldharrow hard-lock — is CLOSED**, by the user on 2026-08-01: *"it
> works."* It was investigated across three sessions and never reproduced. **Its diagnosis is the
> part worth keeping and it lives in [`SHIPPED.md`](SHIPPED.md):** the hidden preview pane's
> `requestAnimationFrame` never fires, and a preview restart mid-session drops the harness's
> `MessageChannel` shim, producing a stuck `G.moving` with no dialog and no error — which looks
> *exactly* like the bug that was reported. **Check `window.__mcShim` before trusting any future
> stuck-map repro.**

**And two of the playthrough's own rulings went in on 2026-08-01** (8f.54). **The reward after a
battle is automatic** (#55): the loot menu is gone, the haul arrives and the screen reports it by
name. What it left behind is a line worth remembering — **a LOOT row was two different things wearing
one shape.** A row paying iron or coin is *arithmetic*; a row costing a day or the company's regard
(*bury what is left of them · drag her clear and leave her be*) is **the pillar in miniature**, and
automating one would be the game making a moral choice for the player. So the haul is drawn from the
spoils only and the rest becomes **one question** — the *"sometimes"* in the user's own sentence,
on four fights of eight. It uncovered a dead receipt: **`gems`, `morale` and `days` on a loot row had
never been applied at all**, so six rows were printing a price the game did not charge.

> **That question is on TWO fights of eight now, not four** *(2026-08-02, 8f.78. The user, on a
> screenshot: "To much choises... From loot after most of the events you don't have a choice")*. It
> survives on the **Fen-Mother** and on **Blood on the Road**, and it went from the dog pack and the
> sling-line, where it was housekeeping over bodies rather than a decision the pillar is about. The
> rule that came out of it is the useful half and it is written above `takeLoot`: **an automatic haul
> may never charge morale or days.** A price nobody chose is not a decision, it is a tax — and an
> invisible one, since the haul is drawn at random. So a decision row is never *simplified* into a
> haul by leaving its `fx` alone; the price is dropped along with the question.

**And the first battle teaches itself now** (8f.62 and 8f.63, #60). Ten lessons in the Captain's mouth, each
fired the first time its rule actually bites and then never again for the life of the save: *here is
us, here is them* · walk at them · the second action is tired · the archer · the caster · go round
the back · they broke · DISENGAGE · the zone · your own nerve. No tutorial mode, no pause, nothing to
dismiss, and a `skip tutorial` in the corner that silences **the voice and not the rules** (the
toasts and `? RULES` are untouched).

It is the first thing ever to ask #51's budget for an exception, and the shape of that exception is
the part worth keeping: **a lesson queues where a comment drops.** The drop rule was written because
*"a comment about a moment that has passed is worse than silence"*, and that reasoning simply does
not cover a rule, which is still true next round. For the same reason a lesson is the only thing that
**survives the Captain going down** (spoken by whoever is up, which cost one argument because
`capBalloon` has taken a *speaker* since #40), and the only balloon with something clickable on it.
`weBend` was deleted by the user in the same session, and its reason generalises: **it fired on two
or more of ours being off steady, which is most of the middle of most fights, so it was the one line
in the register that commented on the ordinary.** Its subject came back as teaching instead of
narration. Six moments are five.

**And the fight got four comfort fixes and the first battle stopped being a wall** (8f.84, from the
user's overnight list). The **hover readout waits about a second** before it opens and reopens
instantly once you are already reading, so crossing the board no longer throws a 240px panel over
the hexes you are aiming at, and it **stops getting stuck**, which was a real bug of the same shape
as 8f.82's map tooltip: `render()` deletes the hex under the cursor and a deleted element never
fires `mouseleave`. An enemy you are aiming at gets **74% more clickable area** from a transparent
pad, because `.hrow{margin-top:-10px}` means the bottom quarter of every hex belongs to the hex in
front of it, which is exactly where a token's legs are. The clash ogres went **54 armour to 20**,
measured before and after: helping the ratkin was **67% win at a median of 12 rounds** against 100%
at 6 and 8 on the other two doors, and is **92% at a median of 7** now. And **AUTO is a tester tool**
- *"I want to see how people would play without this shortcut"* - hidden behind `⚙ TEST` with the
placement and the code untouched, and turning test mode off mid-battle hands the fight back.

**And three more shipped the same night** (8f.85). **#75 double rations** is a door onto a mechanic
that already existed: `openProvisions` has sold them and `passDays` has doubled the mending for them
all along, and nothing ever mentioned it at the moment it was worth anything. It asks on the way to
a fight when somebody is wounded, it calls the same purchase rather than inventing a second way to
heal, and **it quotes what THIS road gives back** - mending is per day, so a one-day march buys one
day of it. **#76 send the run** puts seven open questions in the menu and sends the answers home in
the journal blob; the one that matters most is *name somebody from your company*, because a player
who cannot is the finding. **#77 the event book** is every authored word in the game -
[`content/events_book.html`](../content/events_book.html), 152 choices - regenerated from the running
build by [`tools/events_book.js`](../tools/events_book.js), with each beat's tag and rubric score and
a line under every choice saying what it actually does.

**And #76 sends now** (8f.86). ⛔ **A silent send is impossible from an artifact, for anybody, and
that is written into the code so nobody spends another hour on it**: the CSP refuses `fetch`, XHR,
WebSocket, `sendBeacon` and the image-pixel trick, and neither runtime capability helps - `downloads`
cannot upload, and `mcp` runs against *the viewer's* connectors and **a page declaring it cannot be
shared publicly**, which is the entire purpose here. So the send is a **navigation**: a real
`<a href="mailto:">` rather than a scripted `window.open`, because an anchor click is the most
permissive way out of a sandboxed frame. The letter carries the answers and the tally; **the journal
lands on the clipboard in the same gesture**, because a `mailto:` URL dies past about two kilobytes.
Over the limit it falls back to a short letter rather than a dead link, since **a send button that
opens nothing is worse than no send button**.

> 🚧 **#77's round trip is the one thing still open, and it is the next task.** The event doc
> carries the three rules that make it possible (keep the `[key]`, comment a deletion, leave the
> `{TOKENS}`), but **nothing reads an edited doc back into the prototype yet**.

> ⚑ **Two traps came out of it.** **`CAPTIER[E.tier]||1` promoted every lesson to TEACH**, because
> the new tier's value is `0` and `0||1` is 1: the first lesson of a round outranked all the others
> and they queued behind it. *A new tier whose value is falsy is a trap any `||` default will
> spring, and this file leans on that idiom everywhere.* And **lesson 9 had to be written against
> the game that exists**: there is no Zone of Control rule here, #29 is parked and was cut for
> making movement unaffordable, so the line describes a **price on leaving** and never a
> prohibition. *"You are pinned"* would make a player stop moving, which is the exact failure that
> got the hard rule cut.

> **And on 2026-08-02 it turned out to be firing every other time, which was literal** (8f.83, on the
> user's report: *"Онбординг - срабатывает через раз"*). **Four defects, and only the first one was
> about the tutorial.** Lesson 1 was asked for before the fight's first `render()`, so it drew
> nothing and marked itself seen anyway - and it looked intermittent because `#bGrid` still held the
> *previous* fight's hexes, so only the first battle after a page load lost it, which in a campaign
> is Blood on the Road. `capSay()` now refuses rather than reporting a success it did not have; a
> lesson riding a whisper no longer samples that whisper's single roll (**`w_rung` seen and
> `L_w_rung` never** was sitting in the user's live save, and the fix repairs it in place); and two
> lessons may no longer share a round, because there is one balloon and the second was wiping the
> first inside the same tick - *"Green rings are ours"* had been unreadable in every fight of the
> game. All four are in §5's trap list. **Ten lessons are eleven now:** the user asked for **armour
> before blood**, which was the one rule of the deleted `coach('fight')` card that #60 left behind in
> `? RULES`, and it is said the first time a harness takes the bigger half of a blow.



**And ★▲▼ reactions are continuous** (#54): every press is a moment rather than a verdict, the report
prints the sequence and **names a screen whose verdict changed**, and a mis-click survives as an
8-second grace window instead of a rule about the whole run. ⚑ **The reported half was a display
bug with a transferable shape** — `show()` refreshed the bar on a screen change and `mark()` did not,
so a card opened on top of the map with the map's verdict still lit underneath. *When two functions
can change what the player is looking at, both of them own the readout.*

**And the battlefield has a camera** (8f.65, #66): **FULL x1.30 · FIELD x1.80 · CLOSE x2.50**, three
words top-right of the field, a state rather than a slider, remembered across launches. The user
asked for *"3 states for battlefield… like in battle brothers"*, and **the measurement rewrote the
request**: the field is 980x544 and the board 596x416, so **41% of the battle screen was empty
gradient** and the people looked small because the board had never grown into the room it had. That
is why the lowest stop is **x1.30 and not x1.00**: at 1.30 the whole 15x13 board still fits, so the
shipping view was showing the same hexes only smaller, which is a control with no job. It is one CSS
transform on `#bGround`, and everything that floats above the board stayed correct **for free**,
because `#bFx` is anchored by `(hexRect − fieldRect) ÷ the #stage scale` and sits *outside* the
zoomed layer. ⚠ **Do not move that transform onto `#bField`, and never put `#bFx` inside `#bGround`.**

> **The two numbers worth remembering.** **x2.00 was the exact resolution ceiling and it was not an
> accident**: sprites were rendered at `2*TOKEN` and shown at `1*TOKEN`, which is precisely where the
> old board sat, so `OVER` is 3 now and the ground canvas is painted at 1200x880 and shown at
> 600x440. And the camera **only moves when the acting body leaves the middle 40% of the view**,
> because a camera that re-frames on every step of a walk slides the board under the player's cursor
> while they are choosing. **Drag to look around was specced and deliberately not built.**

**And the caster finally costs something to keep** (8f.68, #67). A **damaging** school is spoken
twice: the click pays the actions and the nerve, and the damage lands at the start of that caster's
**next** turn. Three things take it away, and each is somebody's answer: the target walks out of
range (it lands on the *person*, not the hex), the caster is put down, or the caster **breaks**.
EMBER, IRON-OATH and UNPICK stay instant on purpose, so the fast things are small and the big things
are slow. The other half is the targeting, and it is the user's own condition: **anything that can
reach a damage-caster this turn goes for the caster**, in both brains, round your line if it has to.
Two authored doctrines keep their own minds: the Thing in Armour still takes whatever is nearest,
and the dogs still take whoever is most alone.

> **Two lines out of it are worth more than the feature.** ⚑ **`gathers` is derived, not declared**
> (`arcane && dmg && not the cantrip`), so the ratkin warp-sniffer and the one-word ogre inherited
> the rule **without being told**, and anything that later gets a `dmg` pair on an arcane act is slow
> the day it is written. And ⚑ **the soft-target discount in `targetScore` had been −34 for months
> and never once mattered**: it is a tiebreak worth a third of a point of expected damage, against a
> movement scorer charging 6 a hex and 6 a place down the target list. **If a rule is supposed to
> decide something, write it as a rule.** A weight in a scorer is a preference, not a rule.

**And the road has been reshaped for its dramaturgy** (8f.73, #71). The run is now: tavern → Blood on
the Road → **a fork with two roads instead of three** (4 days with a slot, the Broken Men and a fire,
or 6 quiet days with three slots) → the Ruined Steading and the dogs → **the Muster Field, which has
moved in front of the Black Fen and brought the armourer's rack with it** → the Fen-Mother →
Coldharrow → **a fork that is a fight or not** (the Stone Field plus a refit at Bonepicker's, or a
quiet slot) → **the Thing in Armour**, on arrival at the Dead Company → **the Warm Spring** →
the last fork → the shrine → the Last Muster → the Snare. **17 to 21 days, eight routes, and eleven
beats that no road can skip.**

The shape of the argument is that the muster had to come before the monster: the dogs show you that
you are too few, the muster answers it, and the Fen spends what you bought. That only works if the
chest has something in it, so the wagon's purse went **48 to 90** — sized, not chosen, so that a hire
plus one cheap piece off the rack is affordable exactly once and empties you. **The pass was deleted**
at the user's call: two days with nothing on them, and it let a company reach the bells having missed
both the shrine and the last muster. That cost four days at the short end and the bigger purse buys
them back, so the act is no richer than it was.

**Road events are half as frequent** (`ROAD_EVENT` 0.28) **with a one-per-leg latch** — and that cut
is paid for on the map rather than absorbed: halving the rate halves how often the `CAMPS` deck comes
up, and that deck holds the only chains in the game that run all six links, so **THE ROADSIDE FIRE**
pins one of them down. **THE WARM SPRING** is the other new place, and its fourth choice is the user's
own: one named person asks for one more day, it costs a day, and it pays a permanent point of NERVE on
their sheet. Saying no is free today and remembered forever, which is the pillar stated for a body
instead of a purse.

> ⚑ **Three traps, and the first is the one to remember.** **A rule phrased against a node's PROGRESS
> breaks silently the day somebody reorders the run.** `armourDue` read `G.visited['hire']`, so moving
> the muster in front of the Fen would have fired the Thing in Armour *on top of the boss* — no crash,
> no warning, just two fights on one arrival. It is anchored to a computed **shape** now,
> `branchOf('vill').join`, and `LINT()` checks it, because both ways it can fail are silent. Second:
> **every scene in the map painter is a node lookup**, so deleting `o1` and `o2` left a gallows and a
> pedlar's table reading `N.o1.x` — a TypeError that takes the whole painting down. Remove a node,
> remove its scene in the same edit. Third: **a painting outlives the map it was drawn for.** The
> Bloom's glow was centred on "the one genuinely empty quarter of the new map", and the reshape put
> two new places straight through it.

**And the aftermath is two cards instead of four** (8f.68, #69 and #70). The character sheet shows
what a person **can do** rather than what their class could: everything taken, plus anything buyable
this second, with the rest behind one line that says how many. And after a fight there is **one card
you read and one card you decide on** - mercy, the field, the promotion, all settling *in place*,
with **Back to the road** as the only control that changes state.

> ⚑ **There was never a third screen in the code, and that is exactly why it read as a wasted one.**
> Beat two redrew *itself* after every pick: the buttons vanished, an italic sentence saying the same
> thing took their place, the card jumped to the top, and the player pressed one more button on a
> near-copy of what they had just read. **A screen that redraws itself into a summary of itself is a
> second screen to the person holding the mouse**, whatever the code thinks it is. The same reading
> is what moved mercy onto this card: it was a whole screen containing one paragraph and three
> buttons, which is the wrong *weight* for the one decision after a fight that is about people.

**And the Fen-Mother was rebuilt, because she had been assembled backwards the whole time** (8f.76).
Three complaints off one playthrough turned out to be a single bug: her two-hex body was placed from
the plan's column *before* `FOE_SHIFT`, so her hindquarters sat one hex **west** of her head instead
of east. Her painted halves only join head-west / hindquarters-east, so laid out that way the two
pieces faced away from each other, she read as two animals back to back, and **the thing the company
walked up to first was her tail.** With that fixed her face is toward you at the start of the fight,
and a `beastFlip()` keyed on the head-to-tail axis keeps the seam shut when she turns. Two things
were hiding underneath it: she could move **one hex a turn**, because her own THE FEN ANSWERS paves
two hexes with standing water and standing water cost her both a hex of stride and the hex's entry
price (`fenborn` exempts her, through one `wetproof()` that now also owns the gills rule); and her
back and flank existed in the maths while four separate places refused to draw or score them. **She
got harder and it was not a retune** — 30 runs each way: win rate 93% → 63%, median 9 → 13 rounds,
0.8 → 2.5 of yours put down. The counter-intuitive half is that **the long tail came in** (p90 24 →
19, max 29 → 25): a boss pinned in a bog cannot finish a fight either. Banked in #50's parking lot.
*Also that day: the Thing in Armour went to 342/162 at the user's call, and every token on the board
grew an armour bar above its health bar.*

**And the aftermath stopped asking so many questions** (8f.78). Only **people** beg for mercy now,
read off `!u.monster` rather than a hardcoded fight name, so the dog pack, which used to break and
then be offered the chance to be *stripped to the fur* under a paragraph about how it smelled of the
fen, simply scatters and the fight ends. The plea is spoken by whoever is actually kneeling. And the
**what-is-left-of-them** question went from four fights to two. What is worth carrying out of it is
in §5's trap list, because all four of its bugs were the same shape: **a rule that had been written
down correctly somewhere and implemented as a special case somewhere else.**

**And the build survived its first full outside-shaped playthrough** (2026-08-02, build log 8f.87
to 8f.91). One session played five campaign runs end to end through the real UI - twelve fights,
three full wipes, two withdrawals, a skipped boss, a fled road ambush - and **found no soft lock
and no uncaught error anywhere**; the report with all 27 findings is
[`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md). A second session fixed in parallel while
the first kept playing, and the two passes closed every bug-class finding the same day: the mercy
card's dead salvage receipt, the Captain-pronoun grammar fixed at the one right place
(`unitName`), reason text on every gated choice, a walk-away exit appended to any card with
nothing affordable (Bonepicker's was one gate away from a real soft lock), and nine more ungated
cost rows caught by a hand-run of the fx sweep. **The user ruled on the rest the same day:** the
under-hill tunnel is an intended secret · the dog pack stays as the keep-your-ground skill check ·
provisions stay heal-only, so arriving at the fen hungry is the pillar working · **the noble's
advance went up a third** (40/80/50/120 across the four tavern doors) as the one turn of the
economy knob. G1-11 and G1-12 of the gate plan closed with it. **Left before the friends playtest,
in the user's own words: the event-text pass (his side, then a session's), the remaining event art
(his, after the texts), and checking the send-run form (his).** Two one-line rulings still wait in
the plan file's open-decision block: the fled-path Dead Company beat, and the bells line on the
defeat card. *(The Snare VICTORY epilogue is the one path no run has yet reached - worth one
deliberate look before strangers get the build.)*

**And the event-text pass has started at the front door** (2026-08-02, build log **8f.92**). The
lord's brief is a **place** now rather than a rumour: **Skelbrook**, one of his own men, one
village, one hall, taken at the thaw, a letter arriving every week that he has been reading for a
season and doing nothing about. **He asks for a head and not for a village**, which is what lets
the act keep ending at the Snare, and the victory card now says the standard that comes down there
is the one that has been flying over Skelbrook. The three opening texts (the map card plus both
`COACH` pop-ups) are **one card**, the register is empty and its rows are deleted rather than left
dark, and the ground everything happens in is labelled **THE GRAUSEN VALLEY** on the map. See
[`03_WORLD_LORE.md`](03_WORLD_LORE.md) §9, which is canon and was rewritten with it.

**Then the pass reached the rest of the events, and one of them grew a system** (build log
**8f.92 to 8f.93**). **All 31 events and the camp cards are re-cut** on three rules: one idea per
sentence, concrete nouns with the ornament cut, more paragraphs so a card is scanned rather than
read. No cost, gate or reward moved. **And WHAT THEY DID BEFORE now pays a PLACE instead of an
adjective**: ask at the fire and the shares are promised out loud, ask aside and only two people
know, and either way **THE CACHE** appears on the long arm of a fork ahead of you, marked green
with a ✦, and pays coin or pays people when you get there. Its rules and its four edges are in the
block comment at `plantStash`; the one that generalises is **a card may never promise a place the
map cannot deliver**, which is why it has a paid fallback for a company with every long arm behind
it. ⚠ Two naming traps in that build are worth knowing before touching the save: **`G.stash` is the
company's item bag** (the cache is `G.cache`), and **`pay()` only ever writes `G.run`**, so camp
materials must go through the `fx` pass or the player gets a receipt for iron that never arrives.

**And it opens on a phone now, a bit** (8f.106, #83). The file had **no viewport tag at all**, so a
phone laid it out at 980px and shrank that on top of a stage `fit()` had already shrunk. With that
declared, **the game turns rather than the player**: portrait, under 700px, and a coarse pointer puts
a `rotate(90deg)` on `#stage` and takes it from **0.307 to 0.546**: the board 78% bigger and the
screen full whichever way the phone is held. The gate is three tests on purpose, and the pointer one
is what keeps a desktop window dragged tall and narrow from flipping the game sideways on a monitor.

> **The rotation was the easy half; every rect in the build was the hard half**, and that trap is in
> §5. It also turned up a live defect worth knowing: **`fit()` run once in a zero-sized frame
> computes `scale(0)`** and the whole game vanishes with no error and no way back, which is exactly
> what the hidden preview pane does on boot, and the stage was sitting at `scale(0)` while this was
> being measured. It is floored now. **Nothing was made bigger**. At 0.546 the mono labels render at
> 5px, hover is still the only way to read a breakdown, and a font-and-thumb pass is a separate entry.

---



---

## 8. Thoughts from the session that restructured the backlog

*Honest state of mind for whoever opens this next — not rules, judgement.*

**The real risk is not systems any more.** Fifty backlog entries, thirty of them specced to
build-level, and the thing the project actually lacks is **one human playing Act 1 start to
finish**. Every automated sweep this project has run found crashes; every human playthrough found
*meaning* — the wrong-feeling reward, the unread rule, the fight that reads as broken while being
technically correct. Do not let the size of the backlog seduce you into building instead of
watching somebody play. The playthrough outranks everything, including Tier 1.

**Combat is about to change shape — so do not tune against today's feel.** #46 (race skills) + #47
(the spear) are approved and will change what a *turn* is: from "two actions each" toward "set up,
deliver, follow up." Any balance work done before that batch lands — encounter compositions, damage
numbers, the round band itself — is tuning a game that is about to stop existing. Fix defects, yes.
Retune, no. Wait for the new shape. **The user acted on exactly this on 2026-07-31** by deferring
#45 and opening **#50** as the single place balance work is allowed to happen: the instinct was
already written here, and now there is somewhere to put the observations instead of acting on them.

**The pattern in the user's decisions is compression toward legibility.** Across the whole session:
one rule instead of a penalty table (#45), one verb instead of a skill list (#46's throw), one
picture instead of a corpse system (#48), one line of accuracy loss instead of a clinch subsystem
(#47). When you draft anything for this game, ask *"what is the one-sentence version"* first — it
is usually what they actually wanted, and it is usually also the better design.

**Two sessions keep working these files in parallel, and it keeps showing.** 2026-07-31: a number
collision (#32 twice) and a duplicated entry (#14). 2026-08-01: `SHIPPED.md` said *"next free
#57"* while `CHANGELOG.md` already said *"#58"*, because another session had spent #57 an hour
earlier. Later the same day **#67 was taken in the prototype's own comments** while all three doc
headers still said *"next free #67"*, so #68 was taken instead. **Before adding a numbered entry,
grep the headers of all three files AND the prototype.** *(That collision resolved cleanly the same
day: #67's row is written, the session that arrived second renumbered itself, and the two sessions
shipped four entries between them without touching each other's code. **The rule that made it
survivable is small edits with unique anchors** - neither session ever rewrote a region wholesale,
so nothing was clobbered.)* The next free number is **#74**, and [`SHIPPED.md`](SHIPPED.md) is the
registry that owns that answer. *(2026-08-01, once more, and this time it cost nothing: the build-log
row was written as 8f.72 and the number was already taken by the other session's morale re-tune while
this one was mid-edit. **Read the last row of the build log immediately before writing yours, not at
the start of the session** — the gap between the two is where the collision lives.)*

**And the backlog was cleaned on 2026-08-01, which is worth doing again when it drifts.** Eleven
shipped or closed entries were still sitting in the working file as stubs (#8 #15 #20 #31 #36 #38
#40 #41 #44 #46 #48 #52 — one of them with its heading duplicated), and **eighteen live entries had
drifted into being bold lines rather than headings**, so no link could reach them and the index
could not be checked against them. Both are now true again and are worth re-checking: **every index
row has exactly one `##` entry, and nothing shipped stays in that file at all.** It came out 12%
shorter, and every line of it is actionable — which is the only property that file has to have.

**And the thing worth saying plainly:** the outside review was good, but its best material only
became useful after the user filtered it — permadeath became an opt-in contract, a punishing rule
became a rewarding one, a builder's lab became the practice field. The review supplies structure;
**the taste lives here.** Trust the user's cuts over the packet's completeness, every time.
