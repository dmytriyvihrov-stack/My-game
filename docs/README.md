# Grimtoll — start here

**Read this file first in a new session.** It is the whole context: what the game is, what decides
arguments, where it stands, how to work on it without breaking it, and what to do next.

*(The temporary `CODEX_TEMP_*` handoff packet was fully harvested into the canonical docs and
**deleted on 2026-07-31**. Its disposition is recorded in `CHANGELOG.md`.)*

---

## 1. What it is

**Grimtoll** — a dark medieval, low-magic tactical roguelike. Battle Brothers' combat and stat
model, Slay the Spire's node overworld, RimWorld's *things happen to named people*, and Caves of
Qud's deadpan strangeness.

You are the **Captain**, and you fight on the field yourself. You lead a company of named,
individually rolled people across an act of roads and battles, and the question the game keeps
asking is not *can you win the fight* but **who are you willing to spend to win it.**

- **The build:** `prototype/grimtoll_slice.html` — one self-contained file, ~1 MB, no build step,
  no external assets. Published as a static artifact, which is how the user plays it.
- **Production target:** Godot 4. HTML is for iteration speed; the scope lock happens after the
  systems stop moving.
- **Art:** painted, not pixel. "Ash & Iron" palette. **Line before noise:** silhouette, gesture and
  connected shapes do the work before texture. Detail must follow form and survive the live crop;
  random dots, all-over scratches and uniform micro-detail are rejected. Deliberate abstraction
  leaves the unstated detail for the player's imagination. See `02_ART_DIRECTION.md`.

---

## 2. The pillar — this settles arguments

> ### You cannot afford to be good to everyone.

Not *"be evil for profit"* and not a karma meter. The company costs money every day, and the road
keeps offering you decency you cannot pay for. Everything that gets built is costed against this:

1. **The good path exists, and it never gets everything.** Mercy is always available and always
   costs something real.
2. **Bad deeds actually pay.** If robbing the pedlar is not genuinely tempting, the choice is
   decoration.
3. **Good deeds must not secretly pay better.** The moment the kind option is also the optimal one,
   the pillar is gone.
4. **Consequences are personal, not a meter.** The world reacts through *named people*, prices and
   who will still travel with you — never through a score.

**The corollary that decides most UI arguments:** a choice label states an **intent**, never a
receipt. Prices stay (a merchant names his price; the economy *is* the moral system). The **score**
is what's hidden — the game never tells you what a decision is worth before you make it.

### The promise, in three lines

> **Every body keeps the receipt. Every relationship remembers who paid.**
> **Every Rabble is different.**

### What a person is

> **Race body + Class job + Trait exception + Gear + Scars + History = Person**

Race is not a class; class is not a species destiny; the trait is what makes an unusual combination
*legible*; the history is what makes them worth keeping when the arithmetic says replace them.
Unusual combinations must be **viable and legible, never secretly optimal**.

### The filter for a new idea

**Accept** if it does at least one: named characters accumulate *specific* history · a tactical
choice *reveals* race/class/trait/relationship · a consequence returns later *through mechanics* ·
the player can read *why* a system did what it did · it can be tested without destabilising
something else.

**Reject or park** if it: adds a second source of truth · adds a control language with no job ·
hides an irreversible choice inside AUTO · replaces an authored moment with generation · needs
several unstable foundations at once · is spectacle with no encounter contract behind it.

### The unit of work is not "an event"

> **a named person → a witnessed choice → a mechanical act → a stored fact →
> a delayed consequence → a changed future encounter**

Six links. **Break any one and it collapses into either prose with no mechanics, or mechanics with
no memory** — and this game only has one thing to sell, which is *that happened to **my** company*.
Most of the road is allowed to be standalone; the chains that do return have to have all six.

### The other standing rules

- **Show a state, hide the number.** Every measure is a named state on the surface and a full scale
  on hover. No raw stat is printed anywhere; the arithmetic drawer was deleted on purpose.
- **Death is the end of a chain, never a roll** — ***changed 2026-08-01 by the user's ruling on
  mortality, and it is the biggest rule change the project has taken.*** The chain is
  **SCARRED → MAIMED → the next one is the last one**. Going down is still a **scar** — permanent,
  stacking, removable once a run — and a scarred body is still always carried off. A **maimed** body
  is not. *(Spec: [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) #34, which waits on #4.)*

  > **This does not reopen what permadeath broke.** The reason no-death shipped was arithmetic: a 12%
  > chance of deleting a character forces every encounter to be balanced against the worst possible
  > roll, so the numbers stay timid everywhere. **A chain is not a roll.** The player reads the rung
  > on the sheet, is warned before deploying somebody on their last one, and can leave them behind —
  > so a death is always something they **spent**, which is the pillar applied to a body instead of a
  > purse. **The failure mode to watch is people who stop forming attachments**; that is what killed
  > it the first time, and it is the thing to measure, not the rule.
- **No race is an enemy race.** Every species has friendly and hostile factions. The other side is
  always legible — mercy pleas, a deserter captain, a monster that is a mother.
- **Classes are a human idea.** A monster has a bestiary entry, not a profession.
- **A signature changes the shape of a fight, not the size of a number.**
- **Personalities, not traits.** "There are no good or bad traits — there are personalities." A
  trait is a modifier with a sign that players can rank; a personality is a way of behaving that
  costs something. *If you can name the best one, they are traits again.*

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

## 4. The files

**Five files carry the project; the split is by job, and each file holds its whole job.** Four are
for whoever opens the project next. **`WHAT_TO_TEST.md` is for the user, with the game running.**
*(A sixth, [`DRAMATURGE.md`](DRAMATURGE.md), is the manual for one standalone tool rather than a
job of the project — see the row at the bottom of the table.)*

| File | Job |
|---|---|
| **`README.md`** *(this)* | **Orientation.** What the game is, the pillar, how to work here, the traps. Start here. |
| **`00_PLAN_AND_BACKLOG.md`** | **The work.** Where the build stands · what to do next and why · every UNBUILT entry, written to be picked up cold · the standing rules. **Everything in it is actionable.** Its index is **grouped by SCREEN** — ⚔ battle board · 🗺 road · 🎒 company (roster/sheet/stash) · 📜 after the battle · 🚪 front door & between runs · ⚙ no screen — with tier, model, *also touches* and *related* as columns, and **each entry repeats its own screen/systems/related header** so it can be read cold. |
| **`SHIPPED.md`** | **The registry — added 2026-08-01** *(user: "I feel shipped should be in independent file, just in case")*. One line per shipped entry, **every open remainder named**, and which numbers are spent. It left the backlog so that file holds only what a session can act on. |
| **`CHANGELOG.md`** | **The record.** The build log (one row per sub-build, with the reasoning) · shipped backlog entries in full · playtest snapshots · the original phases. **History, never instructions.** |
| **`WHAT_TO_TEST.md`** | **The test bench — the USER'S file, added 2026-07-31.** Every shipped feature: what it is, how to reach it in three steps, what should happen, what would be a bug, and what feedback is wanted. **The only doc written to be read while playing.** A session *writes* to it and does not take instructions from it. |
| **`DRAMATURGE.md`** | **A manual, not a project job — added 2026-08-01.** How `tools/dramaturge.html` works: the map editor, choosing a road at each crossroad, the four curves, the rubric, the findings, the event commissioner. ⛔ Its one load-bearing rule: **the tool live-reads `prototype/grimtoll_slice.html` — there must never be a second copy of the event data.** Backlog **#57** is its one unbuilt piece. |

*(Three of these were four files until 2026-07-31: plan + backlog merged because the plan's copy of
the backlog index had drifted to listing ten shipped features as open; then shipped split from
unbuilt so the working file stays all-actionable. When an entry ships, its full text moves to the
changelog and its one-line row stays in the Done table. **`WHAT_TO_TEST.md` was added the same day
and is a fourth job, not a fourth copy** — the other three are written for whoever opens the
project next; that one is written for the user, mid-game, with the controller in their hands.)*

**The rest:**

| File | Owns |
|---|---|
| `01_GAME_CONCEPT.md` | The accepted design. If the code and this disagree, one of them is a bug — decide which. |
| `02_ART_DIRECTION.md` · `03_WORLD_LORE.md` | Painted direction; **the lore book** (canon since 2026-08-01: the name, the bells, the timeline, the Bloom, the identity ruling; events lean on it, and when an event and the book disagree one of them is a bug). |
| `10_ART_ASSET_BIBLE_AND_PROMPTS.md` | Complete painted-art manifest: existing assets, missing assets, production specs and one prompt per picture. |
| `05_BUDGET_AND_TIMELINE.md` | Art money and timing. Its reasoning holds; its asset counts are early-days. |
| `08_MUTATIONS.md` · `09_SETTLEMENTS_AND_LEGACY.md` | Two designed systems, partly built. |
| `content/` | Authoring source for events, names, personalities. Mirrored into the single HTML file. **`events_book.html` is new (#77) and is the opposite direction**: every authored word GENERATED out of the running build for the user to edit, regenerated by `tools/events_book.js`. Nothing reads his edits back yet. |
| **the running build** | What is actually true. It wins over every document. |

---

## 5. How to work on it without breaking it

These are all mistakes that have actually shipped here. They are cheap to avoid and expensive to find.

> ## ⛔ NEVER USE AN EM DASH. ANYWHERE.
>
> **Hard rule, set by the user 2026-08-01: *"never use "—" anywhere"*.** It binds chat, these docs,
> code comments, and above all **the game's own player-facing text**. Use a full stop, a comma, a
> colon or a plain hyphen. If a sentence needs one to hold together, it is usually two sentences.
>
> **The existing files are full of them and have not been purged** — roughly 1,300 in the prototype
> and 1,000 across these docs, including five shipped `CAPLINES`. A purge was offered and is a
> separate job. Everything written or edited from 2026-08-01 on is dash-free.

> ## ⛔ THE GATE — do this before building any new system or skill
>
> **Set by the user, 2026-07-31. It is not optional and it is not a suggestion.**
>
> **1. Explain it first, in detail.** Not the idea — **the actual rules.** What it costs, what it
> targets, what it cannot do, the cooldown, the numbers, what happens at the edges, what it takes
> away from the character who has it. If it cannot be written down as rules, it is not ready to be
> code.
>
> **2. Show a picture. Mandatory.** Where it lives on screen, what moves to make room for it, what
> it looks like disabled, and what it looks like when the text is too long. A screenshot or a
> mockup — but *something to look at*, before the implementation exists.
>
> > **⚑ MAKE THE PICTURE IN THE GAME WHENEVER YOU CAN.** *(User, 2026-07-31: "so do mockup in the
> > game.")* If the thing sits on a screen that already exists, **stand the real board up in the
> > practice field and `shotBoard()` it** — annotated, with the new element stubbed in if it has
> > to be. It costs one function call, and a hand-drawn mockup can quietly lie about a layout in
> > a way the real screen cannot. Hand-draw it **only when there is nothing to photograph yet** —
> > a new screen, a new panel, something with no home on the board.
> >
> > **And keep it to the two or three panels that carry the decision.** #51's mockup had seven and
> > three did the work. A picture bigger than the request is the same rework this gate exists to
> > prevent — see §7, *they cut scope and they are usually right*.
>
> **3. Only then build it.**
>
> **4. When it ships, write the test note.** Every shipped feature gets a section in
> **[`WHAT_TO_TEST.md`](WHAT_TO_TEST.md)** — what it is, *how to reach it in three steps*, what
> should happen, and what would be a bug. *(User's standing request, 2026-07-31: "create
> independent file for me — new features and what to test and how it is supposed to work, so I
> would go for a test and check all newly added things with precise feedback.")* That file is
> **for the user to play against**, not for a session to read. One feature, one section, newest
> first; sections move to CHECKED once they have been through a real playthrough.
>
> **The reason, in the user's words: *"That way we keep it clean and don't do extra job."*** Every
> time this has been skipped, work has been thrown away — a system built to the wrong scope, a skill
> that turned out to be three skills, a screen nobody could place. Two entries in the backlog were
> rewritten on the day this rule was set, for exactly that reason.
>
> Applies to: any new ability, resource, screen, panel, overlay, or player-facing rule. Does not
> apply to: bug fixes, wording, balance numbers on something that already exists.

**Verification**
- **Play it, don't read it.** Almost every real bug in this project was found by running the game,
  not by reading the code. The regression that only checks "the fight completed" proves very little.
- Run the local server, never `file://` — the preview pane will not truly reload this path.
  `tools/serve.ps1` is in the repo now (it used to be rewritten from scratch in the scratchpad every
  session), and `.claude/launch.json` starts it: **preview_start `grimtoll`**, then open
  `http://localhost:8777/prototype/grimtoll_slice.html`. `$env:GT_PORT` / `$env:GT_ROOT` override.
- After anything touching combat, run all seven fights: `clash · brigand · pack · slingline ·
  steading · snare · mother`. The harness must call `checkEnd()` between turns or hold-disposition
  fights read several rounds long.
- Run `LINT()` after touching content. It checks every class of content bug this project has shipped.
- **`tools/harness.js` is the test rig — load it, don't rebuild it.**
  `fetch('/tools/harness.js').then(r=>r.text()).then(eval)` gives you `regress()` over all eight
  fights (with `checkEnd()` between turns), `runFight(kind,{probe})` for per-strike assertions,
  `stage(fight,comp)` to stand a practice fight up, and `shotBoard(name,caption,note)`.
- **The hidden pane does not just "throttle" timers — two things are flatly broken in it, and both
  look like game bugs.** `requestAnimationFrame` never fires (travel animations stop dead mid-walk,
  which reads exactly like a hang), and `setTimeout` is floored at ~1s (a rendered battle takes ten
  minutes). Routing timers through a **`MessageChannel`** port is not clamped; the harness does it.
- **A screenshot is impossible there** — the pane never composites a frame. The board serialises
  **itself** instead: `shotBoard()` posts the style block, the terrain canvas as a data URL, the live
  hex DOM and the `#bFx` overlay to `POST /__shot/<name>` in `tools/serve.ps1`, which writes it to
  `shots/`. That is how the gate's "show a picture" is satisfied in this environment.
  - **Pass the name WITH `.html`** — the handler writes exactly what it is given, and a file with
    no extension will not open as a page.
  - **A live `<canvas>` serialises as a blank box**, because `innerHTML` copies the element and not
    its pixels. #51's portrait was drawn into one and every gate picture showed an empty square
    while the running build drew the face perfectly. Anything that has to appear in a shot is an
    `<img>` with a data URI. **When a picture disagrees with the running build, distrust the
    serialiser first.**
  - **Build the thing and shoot it in the SAME synchronous block.** The harness replaces
    `setTimeout` with a `MessageChannel` pump that ignores `ms` entirely, so a 2.2-second balloon
    is already gone by the next tool call.

**Engine traps**
- **There are two AI brains.** `aiTurn` and `autoStep`. Every behaviour change goes in both, or AUTO
  silently stays stupid. This has bitten twice.
- **Never use `window.confirm` / `prompt`** — blocked in the published sandbox, so they silently do
  nothing *for the player only*. Use `ask()`.
- **Ownership of `B.busy` cannot outlive its turn.** `B.seq++` invalidates pending `later()`
  callbacks; `beginTurn` releases the lock because of it. This was the AUTO freeze.
- **Any new side-`you` non-roster unit** (pet, ally) must be excluded from the "is this mine" tests
  in `render()` and `inspect()`, or it crashes on `CLASSES[undefined]`.
- **Any new fight needs an `AFTER` entry** in the same edit, or it prints another fight's ending.
- **A capability test that reads an act's *shape*** (`range`, `reach`) will be fooled by a utility
  act wearing the same field — test what it *does* (`a.dmg`). This froze an ogre mid-battle.
- **A hand-tuned boss must opt out of global balance passes** (`noTrim`). A general trim silently
  re-tuned the Fen-Mother once.
- **Never swallow an exception around a persistence write.** A `catch` hid a renamed constant and
  the save simply never wrote, while the "do you have a save?" check cheerfully answered no.
- **Batch string replacement: sort longest-first**, most-specific-first, then grep for the malformed
  shape. `morale −2` ate the prefix of `morale −22`.
- **When normalising a data vocabulary, grep the *consumers* of the old keys in the same edit.**
- **A movement scorer that closes on straight-line distance has a pocket.** Both AI brains used to
  pick "the reachable hex nearest the target as the crow flies"; behind a boulder stand every hex
  that leads *round* it is further away, and `reachMap` deletes the hex you are standing on, so the
  body cannot even hold still — it oscillates between two hexes forever. It took a 599-round arena
  game with **nothing in the log** to find. `closeOn()` walks the real path now.
- **A readout that does not apply a global multiplier is a lie that survives for months.** The
  damage preview missed the ×0.8 added in playtest #6 and read 25% high on every attack in the
  game. When a global knob goes in, grep for everything that *predicts* the number, not just
  everything that computes it.
- **A HEX LINE BENDS, so "directly behind" is not one sector.** #36's screening rule first asked for
  the single BACK arc, and the textbook formation — archer, shieldman on the traced lane in front of
  him, enemy beyond — measured **FLANK**: the sector from the screen to the archer need not be the
  exact opposite of the sector from the screen to the target. Any rule of the form *"X is directly
  behind Y"* wants the **rear 180°** (sectors 2–4), or it will exist and never fire. *The mockup
  caught this before it shipped, which is the entire argument for the gate.*
- **A pure function called from `hitBreakdown` is in the innermost loop of both AI brains.** Adding
  `losState` there — which called `at()` per hex, and `at()` rebuilds `alive()` every call — took a
  five-round clash from instant to **23 seconds**. That is the AI's turn, and the player waits
  through it. Cache against a signature of where every body is standing, so it stays exact.
- **"Remember that this happened" and "make it happen" must not be two statements that can come
  apart.** #51's triggers set a one-shot flag and *then* asked for the line. On the Fen-Mother,
  DESPERATE collided with another line in the same round, correctly lost the round to it — and
  could then never fire again for the rest of the fight, because the flag said it already had.
  **A one-shot flag is set from the return value of the thing that fires, never before it.**
- **The practice field can reach the campaign through the side door.** `whisper()` wrote
  `LEGACY.seen` unconditionally, so practising the Snare *spent the back-arc tutorial on a fight
  that never happened*. `SIM.on` exists exactly to stop that, and every write to `LEGACY` or the
  run save has to check it — the guard on `checkEnd`/`saveRun` is not enough on its own, because
  the leak was in a content function nobody thought of as persistence.
- **The battlefield camera lives on `#bGround` and nowhere else** (#66). Every effect, floating
  number, LOS ray and Captain's balloon is anchored by `(hexRect − fieldRect) ÷ the #stage scale`,
  which is correct at any zoom **only because `#bFx` sits outside the transformed layer**. Moving the
  transform up to `#bField`, or moving `#bFx` inside `#bGround`, breaks all of them at once and
  silently. A dev tool that photographs the board wants `offsetLeft/offsetTop`, not the rect, since
  the rect now moves with the zoom.
- **AND A RECT IS AXIS-ALIGNED IN *SCREEN* SPACE, WHICH ON A PHONE IS NOT THE GAME'S SPACE** (#83).
  Since the stage takes a `rotate(90deg)` in portrait, `(hexRect − fieldRect)` is rotated with it and
  every floating number lands at a right angle to the body it belongs to: **measured drift 1103px**.
  Everything anchoring to the board goes through **`relPt(inner,outer)`**, which returns the offset
  and size in the stage's own axes; `relPt` and `moveTip` are the only two readers of `ROT`, and the
  comment above `fit()` says so. **If you add anything that positions itself from a rect, use
  `relPt` or it will be right on a desktop and a right angle out on a phone.** The maths is written
  above the function, because it is not guessable. `rotate(90deg)` sends a layout point (x,y) to
  screen (−y, x), so reading a layout **top** edge back off a turned rect needs the rects' **right**
  edges. *(`offsetLeft/offsetTop` are unaffected by rotation and stay correct. `camApply` reads
  only those, which is why the camera needed no change at all.)*
- **A CASTER DOES NOT HAVE THE SPELL YOUR TEST BENCH ASSUMES.** `rollSpells` deals the battle-mage
  **two schools out of four** and the mage three, so `acts.find(a=>a.k==='wither')` is `undefined`
  on roughly half of all staged fights, `B.sel` is set to nothing, and the click silently does
  nothing. It looks *exactly* like a broken feature and it cost this session three false negatives
  in a row. Find the act by what it **does** (`u.acts.find(gathers)`), or re-stage until the school
  you want turns up - and never conclude a feature is broken from one staged run of a rolled loadout.
- **A `LOOT[kind]||LOOT.snare` fallback is silent.** Two fights had no table and were quietly
  serving the Snare's — the Fen-Mother offered you a ratkin chieftain's harness. Same class of bug
  as the shared `AFTER` title, one screen later. The linter now checks both.
- **A MULTI-HEX BODY IS TWO PICTURES THAT HAVE TO MEET, AND THE ART IS THE SPEC.** The Fen-Mother's
  head is painted facing west with the neck opening east and her hindquarters carry the tail away
  east, so the pair is only correct while her body lies **east of her head** — and `build()` was
  computing her tail from the plan's column *before* `FOE_SHIFT` while her head used the shifted
  one, putting the body on the wrong side for the life of the project. Two rules for the next great
  beast: **derive the second hex from the same column the first one ended up on**, and **mirror the
  halves off the head-to-tail axis, never off `facing`** — facing is what the arcs are measured
  from, and a seam that can disagree with itself will.
- **`race` IS DERIVED, SO A RACE TEST IS NOT A TEST OF WHAT SOMETHING IS.** `build()` computes race
  from kind and the fallback is ratkin, so **a dog comes out `race:'ratkin'`**. A gate written as
  "is this one of the people?" in terms of race lets the entire dog pack through — which is how ten
  dogs came to beg for mercy and be offered the chance to be *stripped to the fur*. Ask `monster`,
  which every beast and every authored monster actually carries. Same family as the `a.range` trap
  above: **test what a thing IS, never what its fields happen to look like.**
- **A COMMENT THAT STATES THE RULE IS NOT THE RULE.** That same line had carried *"beasts do not
  surrender and do not ask for anything, only people do"* directly above `G.battleKind!=='mother'`
  for months. The comment was right, the code named one fight, and every reader since had checked
  the comment and moved on. **When a comment states a general rule, check that the line under it is
  general** — a hardcoded name sitting under a written rule is a bug with a character reference.
- **A `!big` / `!x.big` GUARD CAN SWITCH OFF A WHOLE FEATURE AND LOOK LIKE CAUTION.** Four separate
  places excluded great beasts from the facing arcs, so the Fen-Mother's back existed in the maths
  and nowhere the player or either AI brain could see it — in the fight this README calls the one
  that teaches you to surround something. **Grep every reader before trusting that an exclusion is
  local.**
- **A CONSTANT INSIDE A LINTER ROTS LIKE ANY OTHER CONSTANT.** `LINT()`'s route walk carried
  `path.length>14` as a runaway guard; #71's reshape made every route 17 to 19 nodes long, so it
  gave up before reaching the Snare and reported *"no route from the hold to the Snare"* on a graph
  with eight good ones. **A check written to catch a broken map, broken by a map change.** Bound to
  `Object.keys(NODES).length` now, which is exact and cannot go stale. *Prefer a bound that is
  derived from the data over a number that was true once.*
- **A HELPER DECLARED INSIDE THE FIRST FUNCTION THAT NEEDED IT IS A HELPER THE SECOND CALLER
  CRASHES ON.** Hit twice in one session: `num()` (small counts as words) was a local inside
  `forkCard`, and `esc()` was a local inside `drawNotes`. Both were invisible to the new code that
  obviously wanted them, and neither failure is visible until the new screen is actually opened —
  a card that throws on render looks like a dead button. Both are module-level now. **Before
  writing a second copy of a two-line helper, grep for the first one.**
- **A RULE THAT LOSES ON CSS SPECIFICITY FAILS SILENTLY AND LOOKS LIKE IT IS WORKING.** `#bOpts
  button{display:flex}` is an id PLUS a type, so a later `#bAuto{display:none}` never applied and
  the button sat there exactly as though the gate were live. The tell was that a *different* rule
  in the same edit (`:has()` on the grid) DID take effect, so the layout changed and the control
  did not. **When a style gate does nothing, read the computed value before re-reading your own
  logic**, and scope the rule to at least the specificity of what it is overriding.
- **THE FIGURE IN A STATBLOCK IS NOT THE FIGURE ON THE BOARD.** `build()` puts every foe through
  the playtest-#4 armour trim (`ARM=.75`) and a hitpoint trim, so the clash ogres read `armour:72`
  in the table and stand up with 54. A balance request phrased in what the player SAW ("make it
  20") has to be solved backwards through the trim, and anything tuned by eye off that table is
  tuning three quarters of a number.
- **A STALE DOM SUBTREE MAKES A FIRST-RUN BUG LOOK INTERMITTENT, and that is why "it works every
  other time" is a diagnosis and not a complaint.** `#bGrid` is only emptied at the *top* of
  `render()`, so between fights it still holds the **previous** fight's hexes, at the same
  coordinates on the same 15x13 board. `learnSides()` was called before the first `render()` of a
  fight and every `hexPt()` returned null - so the first battle after a page load drew no rings and
  no balloon, and the second and every later one worked perfectly, because it was measuring the
  *last* fight's board. **A lookup that succeeds against the wrong provenance is worse than one that
  fails**, and it hides the failure everywhere except the very first run. When a bug is reported as
  intermittent, ask what is left over in the page from last time.
- **"DID IT APPEAR" HAS TO COME BACK FROM THE CODE THAT DRAWS IT, never be assumed by the code that
  asked.** `capBalloon()` no-ops safely when there is no board to hang on - which is correct - and
  `capSay()` returned `true` regardless, so the caller marked the line spent and a *once-ever*
  lesson marked itself seen while the player saw nothing. Same family as the one-shot-flag trap
  above: **anything that can silently decline must say so in its return value**, and the caller must
  check before it burns a flag. The cheap general form is a pre-flight test *before any state is
  mutated*, rather than a rollback afterwards.
- **A ONCE-EVER TRIGGER CANNOT CARRY A SECOND ONCE-EVER CONSUMER.** `whisper()` fires once per save
  and burnt its flag whether or not the Captain's half of the same lesson got a round - and `learn()`
  refuses outright once `B.won!==null`, which is exactly when nerve drops happen, since the blow that
  ends a fight is the one that breaks a line. Result: **`w_rung` seen, `L_w_rung` never**, in a save
  that had played the whole act. Two consumers, two gates: the toast keeps its single occurrence, and
  the lesson is re-offered on every later occurrence until it is actually said. **If B rides A's
  trigger and both are once-ever, B is silently sampling A's single roll.**
- **A BUDGET EXPRESSED PER ROUND DOES NOT SPACE ANYTHING THAT FIRES IN ONE SYNCHRONOUS BLOCK.** #60
  allowed two lessons a round, which is true of the round and false of the screen: there is one
  balloon and the later line removes the earlier one on sight. `startBattle()` and `beginTurn()` run
  in a single tick, so lesson one was drawn and replaced **before a frame was painted** - unreadable
  in every fight of the game, and invisible in the code because the rule looked like pacing. **If a
  resource is a single slot, the rule has to name the slot** (`if(C.el)return false`), not the round.
- **THE CAPTAIN'S ROSTER NAME IS THE WORD "You", so any third-person line about him is broken
  English.** *"You is losing their nerve."* Found three times now in three different places (an
  event receipt in 8f.81, a note on `cast()`, and the whole `{N}` register), which is the argument
  for fixing it in **`capName`** rather than at the call site: he is named by his nickname, which is
  what the balloon's own header has done since #51. **He is the one person on the roster whose name
  is a pronoun** - any new template that interpolates a name has to survive him.
- **A STANCE DECIDED PER SIDE IS ALSO DECIDED FOR EVERY NPC STANDING ON THAT SIDE, AND ONE OF THEM
  IS NOT YOURS.** `disposition()` computes *hold* per side, and side `you` contains the clash allies.
  Help the ratkin and your archer plus their slinger is two shooters against three ogres with none,
  so **`B.disp.you.hold` came out `true`** and the enemy's *"we have the bows, you can come to us"*
  refusal was applied to the player's own half of the board. It was invisible in seven bodies out of
  seven: your own people are not driven by `aiTurn` at all, and the two spear allies fail the
  `iShoot` test, so **the only body that could show it was the one shooter that is not yours** - and
  it sat on its deployment hex for four rounds, seven hexes from a sling that reaches four, without
  once firing. **A side is not a team.** Anything computed for `you` gets read by pets, by clash
  allies, and by #59's archer when she lands, so before writing a rule against a side, ask which
  bodies on it are actually driven by a brain. The fix belongs on the body (`!u.ally`, because an
  ally is *what it is* regardless of where it stands) and not in `disposition`, which is still
  correct for the player's own line under AUTO.
- **REACHING THE AFTERMATH CARD AT ALL MEANS STARTING A RUN, so it can clobber the user's save.**
  There is no practice-field route to it (`SIM.on` resolves to a report and stops). Snapshot every
  `gt_`-prefixed key out of `localStorage` before driving it and write them back afterwards, then
  verify the run key is byte-identical. The user has a live playthrough in there.

**Where things belong — the ten invariants**
*From the outside review, and the best thing in it. These hold today or are worth holding to.*

1. Campaign and any test harness share **one battle description and one engine**.
2. Application, legacy, run, battle, UI and telemetry state stay **distinct bands**.
3. Each resource has **one canonical mutation path**. *(Aliases may read it; they must never write.
   Ignoring this is what made the wagon bank every haul twice.)*
4. **Each battle turn has one owner, and completion resolves once.** *(This is B02 and the
   double-resolve bug, stated as a rule.)*
5. **dead · downed · routed · fled · escaped · withdrawn stay distinct.** *(This is B03.)*
6. **Race defines body, class defines job, trait bends expectation.**
7. **Location owns terrain, faction owns doctrine, encounter owns exceptions.**
8. Developer tools **cannot write** campaign or legacy progress.
9. Material UI changes pass the **visual gate**.
10. Telemetry **observes** outcomes and never silently balances the game.

**And two more worth saying out loud:**
- **Decision makers choose commands; they never mutate state directly.** Manual play, AUTO, enemy
  AI and allied AI all go through the same legal actions. *(We break this in a few AI branches —
  positions are written directly. Worth tidying when one next misbehaves.)*
- **AUTO never makes an irreversible decision** — no quest, sacrifice, surrender, retreat or unique
  item. It plays the fight, not the run. *A stall watchdog may report a stall; it must never invent
  an outcome.*

**The state bands** — what each owns, and what it must **not**:

| Band | Lives | Owns | Must not own |
|---|---|---|---|
| settings | across launches | music, developer mode, accessibility | run resources, battle results |
| legacy | across runs | wagon fittings, banked salvage, meta-history | current wounds, location, battle state |
| run | one run | day, route, resources, roster, stash, quests, facts | DOM refs, animation callbacks |
| character | a life | stable id, race, class, trait, gear, scars, history | screen layout or HTML |
| battle | one fight | units, terrain, initiative, turn, morale, outcome | persistent rewards before resolution |
| UI | one interaction | open screen, selection, dialog, hover | canonical resources or quest truth |

> **A character has one stable ID. Names and nicknames are presentation, not identity.**

**The four layers everything collapses into.** When a new system feels tangled, it is almost always
because two of these got merged:

> **Facts** — fought at a place, killed a person or a beast, carried somebody out, took a scar, lost
> a part, claimed kin, made a choice.
> **Rules** — what a missing hand forbids, what a graft compensates, what a tie makes AUTO refuse,
> how a doctrine weights a move, what a body blocks in a firing line.
> **Presentation** — the human ledger, the ogre's heads, the ratkin's debt marks, the portrait's
> reaction, the run's last page.
> **Validation** — does all of the above still hold when the person is dead, dismissed, absent, or
> loaded from a save written before the field existed.

**Presentation never becomes a second source of truth.** Every fact and every rule has to survive an
absent character, a different race mix, a dismissal, a death, a save/load, AUTO and manual agreeing,
a second run, and old content that predates a new field.

**Which way the arrows point.** Not a file layout — a direction, and every bug on the list below is
one of these arrows pointing backwards:

```
content → domain rules → state transitions → presentation models → screens
                                                    ↓
                                             telemetry observes
```

- a screen callback writing several state bands at once
- AI moving a unit without going through a battle command
- the aftermath inferring the outcome from prose or a unit's name
- a second combat engine anywhere
- developer settings reaching a run save
- combat cost reusing campaign upkeep

**Process**
- One thin, testable package at a time. Do not batch roadmap phases into one refactor.
- **Visuals before material UI.** The user wants a batched review sheet — 4–7 changes at once, not
  one at a time — published as its own artifact, separate from the game.
- After a change lands, not before: update `01_GAME_CONCEPT.md` if a rule changed, strike the
  entry in `00_PLAN_AND_BACKLOG.md` (its full text moves to `CHANGELOG.md`), and add one
  build-log row to `CHANGELOG.md` with the *reasoning*, not just the change.
- Comments explain **why**, especially the constraint that is not visible in the code. That is what
  makes this codebase re-enterable.

**Before an event ships.** `LINT()` covers the machine half — tokens, hardcoded names, impossible
gates, unconsumed effects, missing ids. It cannot cover the half that matters, so read the event
once and answer these:

- What **decision** does this ask for, and is it a decision at all if one option is obviously right?
- Does it work with **any legal party** — no ogre, no ratkin, four people, thirteen people, the
  person it wants dismissed or dead?
- Does it fire **twice** in a run, and is that intended?
- Does anything **remember** it afterwards, or does it evaporate?
- Does the good option quietly pay better than the bad one? *(If so it fails the pillar.)*
- **Was the thing in front of the company MADE BY PEOPLE, or not - and does the card say so?**
  *(User's standing rule, 2026-08-02, filed with [#73](00_PLAN_AND_BACKLOG.md): "on each of the
  events it is important to bring out whether it was made by a person or not... it is important for
  emotional inclusion and for the plot." The two are different kinds of dread. The lore book already
  carries the axis - the **Old Work** was made by nobody living and still works, the **Bloom** is
  not anybody's doing, the **Thing in Armour** is the question itself - and the card is where the
  player meets it.)*
- **Could this be removed with nothing lost?** If yes, remove it or rewrite it.

That last question is the one that does the work. A road that is mostly filler makes the events that
*do* return feel like filler too.

---

## 6. The plan

> ### ➜ The plan lives in [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md), not here.
> **That file owns the order, the reasons, and every entry.** This section is a pointer and a
> summary — deliberately too short to drift. *(It used to be a full second copy, and on
> 2026-07-31 that copy was found still calling the map rebuild a priority months after it
> shipped. One list, one truth.)*

> **✅ The playthrough is done and the verdict is good** *(user, 2026-08-01: "Done — the game is
> good — I gave feedback already")*, and **#52, the Coldharrow hard-lock, is closed with it —
> *"it works."*** The plan is no longer *prove the slice*; it is **deepen the slice**.

**Now, in this order:**

1. **Settlements & Legacy MVP** — the inheritance screen first. It matters more than it did: with
   mortality ruled in, what a dead company leaves behind stops being a nicety.
2. **The Tier-1 foundations, one per session: #24 → #13 → #32.** *(#24 and #32 confirmed by the
   user 2026-07-31; #13 keeps its place until it is named either way. **#49 is deferred** — the
   user liked the mockup and wants it "more extended, later", so its gate artifacts keep and it
   returns as a build session.)* **#24 now also carries the mortality chain's facts**, and **#32 is
   no longer a defect** — the Fen-Mother's never-ending fight is closed, and the number now carries
   the *rally rule* the investigation found: **routing needs help to come back from.**
3. **Then the anatomy batch** — **#4+#17** the body painter API, which is now load-bearing, then
   **#34** the mortality chain and **#35** grafts, which both draw on it. Then **#2**, then **#47**.

*(The two rulings that used to sit at step 2 — **#55** the automatic reward and **#54** continuous
reactions — **shipped 2026-08-01**, build log 8f.54.)*

> ### 🚧 One thing is running outside this repo: **#57, event analytics.**
> **The user is building it in a separate tab** *(2026-08-01: "mark event analytic as big
> independent task that I am doing in other tab")* — the ANALYTICS tab of
> [`tools/dramaturge.html`](../tools/dramaturge.html), whose spec lives inside the tool itself.
> **Do not pick it up here.** The only thing this repo owes it is a stable input: the journal
> export blob from #53/#54, currently **v2**. If a row's shape ever changes, bump `v` and say so —
> something outside this repo is already parsing it.

**Then deepen Act 1 rather than extend it** — #56 the forest, the rest of the mutations. **And last,
deliberately, #50 — the balance pass**, which is also where the deferred #45 (marks) returns. Until
it runs, bank balance observations in its parking lot rather than stopping a session to retune.

**Parked:** **ACT 2** *(user, 2026-08-01: "Delete act 2 for now as in plan" — nothing about it is
rejected; it is just not what the next sessions are for, because the slice is good and deeper beats
longer)*, the ScenarioSpec / dev-menu half of the Battle Lab cluster *(the other half shipped as
the practice field — worth remembering as a pattern: a parked builder tool is sometimes one
reframing away from being content)*, the remaining 14 mutations, and the Godot scope lock until
the systems stop moving.

### The questions that are yours — three answered, five open

The outside design review ends by listing decisions it deliberately refused to make on its own.
Nothing in the plan above is blocked on them, but each one changes what a later batch looks like,
so they are worth deciding while they are cheap.

**✅ Answered 2026-08-01, and each is now a live entry rather than a note:**

- **Mortality — *"yes, after get scars and maimed."*** Death is the end of a visible chain, never a
  roll. Rewrote the pillar rule in §2 and turned **#34** from an opt-in contract into *the* rule.
- **Grafts — *"rare authored consequences of specific injuries or events on the road."*** Authored,
  never a shop you buy from — and the *road* half is new, which widens **#35** from "what a surgeon
  did after a bad fight" to "what the road did to somebody".
- **Forest — *"it is a lot of scattered trees. Check as Battle Brothers do."*** A tactical rule and
  not a repaint: **#56**, a new entry. Scattered individual trees break the firing lanes that #36
  already models, so the wood changes what a shooter is worth without changing a rule of combat.

**Still open:**

1. **The name.** *Grimtoll* or *Rabblebound*? The second comes with a whole identity — "join the
   rabble," and a company that the world calls a rabble until they adopt the word themselves. It
   also says nothing about tactics on its own, so the subtitle would have to carry that.
2. **AUTO doctrine** — one order for the whole company, or assignable per person? Per-person is more
   expressive and roughly triples the UI.
3. **Numbers in the chronicle.** The interface rule says hide them. Does the expanded record get an
   exemption, or does even that stay in words?
4. **The run contract** — now a *smaller* question than it was, because mortality is ruled. What is
   left of it: is today's no-death rule kept alongside the chain as a gentler contract, or is the
   chain simply how the game works? **#34 is written as the default rule** on the reading that
   *"yes"* meant yes; say so if it should be a toggle.
5. **Generated voice** — acceptable as a labelled temporary track for timing, or not at all?

And **the "not mercenaries, but rabble" question was ruled on by the user on 2026-08-01**:
*"heroes not merceneries, they just start with a contract. But rather forced together random
crew."* The resolution is the layering the review itself proposed: **identity changed, mechanics
did not.** The crew is strangers forced together, starting with one contract; the island goes on
calling them mercenaries, and wages, contracts and the Captain's authority stay exactly as built.
[`03_WORLD_LORE.md`](03_WORLD_LORE.md) §7 carries the ruling in full: that file is **the lore
book** now, canon rather than soft, rewritten the same day. *(The other contradiction was
death reversing the no-death rule; the user ruled on it 2026-08-01 and §2 now carries the chain.)*

---

## 7. Working with this user

- **⛔ Rules first, then a picture, then code.** See the gate at the top of §5. This is their
  explicit standing instruction, and the most common way to waste their time is to skip it.
- **They cut scope, and they are usually right.** Given a six-part system they will ask for the one
  part that matters — *"just put bodies on the ground, that's all."* Propose the small version
  first; if it earns more, it can grow. A specification that is larger than the request is not
  thoroughness, it is rework waiting to happen.
- They iterate fast and often mid-turn. Take the correction and keep moving.
- They give the *reason* behind a request; build the reason, not the literal request. When the
  literal version would delete the thing they wanted, say so and do the better one.
- **"A number changed" is a report, not a diagnosis.** Reproduce before redesigning — a permanent
  purchase working correctly once got misread as save contamination.
- They want honest assessment, including of their own ideas and of work already shipped. Their best
  calls have been the structurally harder ones: a written outcome instead of an unwinnable fight,
  states instead of numbers, scars instead of death.

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
