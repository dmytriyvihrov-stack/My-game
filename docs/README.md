# Grimtoll - start here

**Read this first in a new session.** What the game is, what settles arguments, how to work here
without breaking it. **Then go to [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) for the work.**

---

## 1. What it is

**Grimtoll** is a dark medieval, low-magic tactical roguelike. Battle Brothers' combat and stat
model, Slay the Spire's node overworld, RimWorld's *things happen to named people*, and Caves of
Qud's deadpan strangeness.

You are the **Captain**, and you fight on the field yourself. You lead a company of named,
individually rolled people across an act of roads and battles, and the question the game keeps
asking is not *can you win the fight* but **who are you willing to spend to win it.**

| | |
|---|---|
| **The working file** | `prototype/grimtoll_slice.html`, one self-contained file, ~5.4 MB. **This is the one you change.** |
| **The build people play** | `index.html` at the repo root, **generated and never hand-edited.** ⚠ Its audio table is empty in the working file **on purpose**, so copying instead of building ships a game that is silent for everybody but you. One command, `deploy.ps1`, does the whole thing and refuses to push a silent page. **See [`DEPLOY.md`](DEPLOY.md) before touching any of this.** |
| **Production target** | Godot 4. HTML is for iteration speed; the scope lock happens after the systems stop moving |
| **Art** | painted, not pixel. "Ash & Iron" palette. **Line before noise:** silhouette, gesture and connected shapes do the work before texture. See [`02_ART_DIRECTION.md`](02_ART_DIRECTION.md) |

---

## 2. The pillar - this settles arguments

> ### You cannot afford to be good to everyone.

Not *"be evil for profit"* and not a karma meter. The company costs money every day, and the road
keeps offering you decency you cannot pay for. Everything gets costed against this:

1. **The good path exists, and it never gets everything.** Mercy is always available and always
   costs something real.
2. **Bad deeds actually pay.** If robbing the pedlar is not genuinely tempting, the choice is
   decoration.
3. **Good deeds must not secretly pay better.** The moment the kind option is also the optimal one,
   the pillar is gone.
4. **Consequences are personal, not a meter.** The world reacts through *named people*, prices and
   who will still travel with you, never through a score.

**The corollary that decides most UI arguments:** a choice label states an **intent**, never a
receipt. Prices stay, because a merchant names his price and the economy *is* the moral system. The
**score** is what is hidden: the game never tells you what a decision is worth before you make it.

> **Every body keeps the receipt. Every relationship remembers who paid.**
> **Every Rabble is different.**

### What a person is

> **Race body + Class job + Trait exception + Gear + Scars + History = Person**

Race is not a class; class is not a species destiny; the trait is what makes an unusual combination
*legible*; the history is what makes them worth keeping when the arithmetic says replace them.
Unusual combinations must be **viable and legible, never secretly optimal**.

### The unit of work is not "an event"

> **a named person → a witnessed choice → a mechanical act → a stored fact →
> a delayed consequence → a changed future encounter**

Six links. **Break any one and it collapses into either prose with no mechanics, or mechanics with
no memory**, and this game only has one thing to sell, which is *that happened to **my** company*.
Most of the road is allowed to be standalone; the chains that do return have to have all six.

### The filter for a new idea

**Accept** if it does at least one: named characters accumulate *specific* history · a tactical
choice *reveals* race/class/trait/relationship · a consequence returns later *through mechanics* ·
the player can read *why* a system did what it did · it can be tested without destabilising
something else.

**Reject or park** if it: adds a second source of truth · adds a control language with no job ·
hides an irreversible choice inside AUTO · replaces an authored moment with generation · needs
several unstable foundations at once · is spectacle with no encounter contract behind it.

### The other standing rules

- **Show a state, hide the number.** Every measure is a named state on the surface and a full scale
  on hover. No raw stat is printed anywhere.
- **Death is the end of a chain, never a roll.** The chain is **SCARRED → MAIMED → the next one is
  the last one.** Going down is still a **scar**: permanent, stacking, removable once a run, and a
  scarred body is always carried off. A **maimed** body is not.

  > **This does not reopen what permadeath broke.** No-death shipped for an arithmetic reason: a 12%
  > chance of deleting a character forces every encounter to be balanced against the worst possible
  > roll, so the numbers stay timid everywhere. **A chain is not a roll.** The player reads the rung
  > on the sheet, is warned before deploying somebody on their last one, and can leave them behind,
  > so a death is always something they **spent**. **The failure mode to watch is people who stop
  > forming attachments**; that is what killed it the first time, and it is the thing to measure.

  > ⚠ **AND IT IS NOT BUILT. NOTHING IN THIS BUILD KILLS ANYBODY ON YOUR ROSTER.**
  > `carryEverybodyOut()` says *"nobody is lost"*, `afterBattle()` never splices a body, and a lost
  > fight at THE CIRCLE scars. **Scars are the death system today.** There are exactly three ways a
  > person leaves for good and **`lostSoul()`** is the one place that knows them: you cut a returning
  > veteran down at a fire, the sinkhole took them, or you dismissed them. **The first is the only
  > real crew death in the game, and the player commits it deliberately.** *(Spec: #34.)*
- **No race is an enemy race.** Every species has friendly and hostile factions. The other side is
  always legible: mercy pleas, a deserter captain, a monster that is a mother.
- **Classes are a human idea.** A monster has a bestiary entry, not a profession.
- **A signature changes the shape of a fight, not the size of a number.**
- **Personalities, not traits.** *"There are no good or bad traits, there are personalities."* A
  trait is a modifier with a sign that players can rank; a personality is a way of behaving that
  costs something. **If you can name the best one, they are traits again.**

---

## 3. Where it stands

**Act 1 is feature-complete and playable end to end.** A full run: tavern prologue → the Falling
Star → Blood on the Road → a fork → the Ruined Steading and the dogs → the Muster Field and the
armourer → the Black Fen and the Fen-Mother → Coldharrow → a fork → the Thing in Armour → the Warm
Spring → the last fork → the shrine → the Last Muster → the Snare. **18 to 22 days, eight routes,
twelve beats no road can skip.**

**Built:** hex combat on 15x13 with facing arcs, engagement and parting swings · two AI brains
(`aiTurn`, `autoStep`) · a five-rung nerve ladder · cooldowns · one-hand/two-hand equipment · forced
movement · terrain as a register with eight grounds · obstacle height and the game's first cover ·
three camera stops · a board clock at x1.75 · scars, two mutation chains, personalities · race
skills · provisions, wages and per-person grievance · chained camp incidents · typed bonds · a
mid-run save · a content linter · a practice field · `? RULES` · the Captain's teaching balloon
*(four of its lessons deleted by #137, once the intro brawl began teaching the same rules ten
minutes earlier)* · ★▲▼ playtest reactions with an exportable journal · a run questionnaire ·
a phone layout · an intro brawl that teaches by being played · a company sheet on one screen ·
32 painted sights standing on the map nodes · an aftermath card on the Battle Brothers shape.

**It survived a five-run QA playthrough on 2026-08-02 with no soft locks and no uncaught errors.**
27 findings, all bug-class ones closed:
[`QA_PLAYTEST_2026-08-02.md`](QA_PLAYTEST_2026-08-02.md).

> ### ⚠ AND ON 2026-08-10 THE FEEDBACK CAME BACK: **"lack of clarity and too many options/systems from the start."**
>
> **That is the whole current focus and it is a subtraction job.** The slice is not too small, it is
> too much at once. See [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md), which opens with it.

**Where that pass has got to, on 2026-08-14.** Sixty-one entries since, #87 to #151, and the shape
of them is one sentence: **four of the five screens were rebuilt, and everything else was taken
away.** The battle screen took nine passes and the road screen ten; the company sheet went from
1241px of scroll to 678px with no scroll; the aftermath became one screen for half the fights.
Sixteen doors left the road events, then every card's prose was cut by a third (5,474 words to
3,652), with the outcome numbers moving out of the prose into the aftermath's own chips. The four
cards between the opening brawl and the map became one, and the opening now contains no decision at
all. **What the focus still owes is step 1: nobody has yet measured the opening.**

*The long narrative of everything that shipped and what each thing taught is in
[`archive/README_WHERE_IT_STOOD.md`](archive/README_WHERE_IT_STOOD.md). Per-entry rows with open
remainders are in [`SHIPPED.md`](SHIPPED.md).*

---

## 4. How to work on it without breaking it

> ## ⛔ NEVER USE AN EM DASH. ANYWHERE.
>
> **Hard rule, set by the user 2026-08-01.** It binds chat, these docs, code comments, and above all
> **the game's own player-facing text.** Use a full stop, a comma, a colon or a plain hyphen. If a
> sentence needs one to hold together, it is usually two sentences.
>
> **The existing files are full of them and have not been purged.** Roughly 1,300 in the prototype.
> A purge is a separate job. Everything written from 2026-08-01 on is dash-free.

> ## ⛔ ARE YOU THE SECOND SESSION? ASK FOR YOUR NUMBER, DO NOT PICK ONE
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 number
> ```
>
> **Working in two or three sessions at once is normal here and it is not the danger.** ⚑ **Since
> #139 each session takes its own desk** - `tools\branch.ps1 new <name>` gives it a branch and its
> own checkout under `%USERPROFILE%\grimtoll-desks\`, `branch.ps1 done <name>` merges it back, and
> nobody queues on the prototype. **The one thing a worktree cannot isolate is the number**, because
> git cannot merge a counter: the claim store is deliberately pointed at `--git-common-dir` so every
> desk draws from one. That was five collisions before the tool existed, because the number lived in
> a sentence that was written last. **`deploy.ps1` is the other shared thing** - it runs `git add -A`
> and **pushes**, so it now refuses to run anywhere but main.
> **On the main desk, if you are going to change the prototype, take it first:**
> `claim.ps1 lock -Title "..."`. Full rules in [`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md).

> ## ⛔ THE GATE: rules, then a picture, then code, then the test note
>
> Full version in [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md). In one line: **if it cannot be
> written down as rules, it is not ready to be code**, and **a picture is mandatory** because a
> hand-drawn mockup can quietly lie about a layout in a way the real screen cannot.

### Player-facing text: the nine rules

*The user's own doc pass, turned into rules. He writes intent rough and expects grammar polished
with the intent kept exactly.*

1. **BG3 narrator voice.** Second person, present tense, dry.
2. **Every line pays rent.** If it can be removed with nothing lost, remove it.
3. **Simple words.** 4. **Concrete over general.** A place, a name, a number of days.
5. **Max four options.** 6. **No duplicate options** that resolve the same way.
7. **A free door only where the others cost.** 8. **A battle cost line carries the exact tactical
receipt.** 9. **Salvage is the resource word.**

**And a tenth, measured rather than felt** *(2026-08-13, #143, the user: "reduce them 30-70% each
- easier to read, eseier to make choices")*: **10. A card is as long as its weight allows, and the
outcome does not narrate its own numbers.** The road runs at **LIGHT 45-90 words · MEDIUM 90-140 ·
HEAVY 140-175**, body and all outcomes counted together, measured in the running build. What a
choice paid is a **row of chips**, the same ones the aftermath uses, built off the payment rather
than off the label, so the prose never spends a sentence on a figure the receipt is already
holding. ⚠ **A percentage is not a goal**: four cards were cut under 30% because their remaining
lines were load-bearing, and cutting to a quota costs the joke or the fact. Full procedure, with
the counters and what must never be cut: [`.claude/rules/event-cards.md`](../.claude/rules/event-cards.md).

**And an eleventh, set 2026-08-14 by #151** *(the user: "on the global map crossroad never write a
clear '1 fith' or '0 fignts'. Write aprox 1-2 … It should be some unsertunty - keep it as a
rule.")*: **11. A SIGN IS NOT A READOUT. Anything the road tells you about what is ahead is an
estimate and must be written as a range, never as a count.** ⛔ **The reason is not flavour, it is
that the count was arithmetically honest and still lying.** The fork's fight number counted map
nodes typed `battle`; the Broken Men are one, and their first door is *"No."* while the other two
are four days of food or forty crowns, so the sign promised a battle on a road the player could pay
their way across. The sling-line and the steading are the same shape since #123. ⚑ **When a number
is right and reads wrong, ask what question the player thought it was answering.** A receipt (what
a thing just cost) stays exact; a forecast (what a road holds) carries its uncertainty on its face.

### Working with this user

- **They cut scope, and they are usually right.** Given a six-part system they will ask for the one
  part that matters. Propose the small version first. **A specification larger than the request is
  not thoroughness, it is rework waiting to happen.**
- **They give the *reason* behind a request; build the reason, not the literal request.** When the
  literal version would delete the thing they wanted, say so and do the better one.
- **The pattern in their decisions is compression toward legibility.** One rule instead of a penalty
  table, one verb instead of a skill list, one picture instead of a corpse system. Ask *"what is the
  one-sentence version"* first: it is usually what they wanted and usually the better design.
- **Docs long, chat short.** Long planning text is welcome; long aftermath reports are not. After a
  build, list what changed and what is open, and leave the reasoning in the changelog.
- **"A number changed" is a report, not a diagnosis.** Reproduce before redesigning.
- They want honest assessment, including of their own ideas. Their best calls have been the
  structurally harder ones.

---

## 5. Verification

- **Play it, do not read it.** Almost every real bug here was found by running the game. A
  regression that only checks *"the fight completed"* proves very little.
- Run the local server, never `file://`. `tools/serve.ps1` is in the repo and `.claude/launch.json`
  starts it: **preview_start `grimtoll`**, then
  `http://localhost:8777/prototype/grimtoll_slice.html`.
- After anything touching combat, run all eight fights: `clash · brigand · pack · slingline ·
  steading · snare · mother · armour`. The harness must call `checkEnd()` between turns.
- Run `LINT()` after touching content. It checks every class of content bug this project has shipped.
- **`tools/harness.js` is the test rig. Load it, do not rebuild it.**
  `fetch('/tools/harness.js').then(r=>r.text()).then(eval)` gives `regress()`, `runFight(kind,{probe})`,
  `stage(fight,comp)` and `shotBoard(name,caption,note)`.
- **The hidden preview pane breaks two things flatly, and both look like game bugs.**
  `requestAnimationFrame` never fires (travel animations stop dead, which reads exactly like a hang)
  and `setTimeout` is floored at ~1s. Routing timers through a **`MessageChannel`** port is not
  clamped; the harness does it. **Check `window.__mcShim` before trusting any stuck-map repro.**
- **A screenshot is impossible there.** The board serialises itself: `shotBoard()` posts the style
  block, the terrain canvas as a data URL, the hex DOM and `#bFx` to `POST /__shot/<name>`.
  - **Pass the name WITH `.html`.**
  - **A live `<canvas>` serialises as a blank box.** Anything that must appear in a shot is an
    `<img>` with a data URI. **When a picture disagrees with the running build, distrust the
    serialiser first.**
  - **Build the thing and shoot it in the SAME synchronous block**, because the harness ignores `ms`.
- **Reaching the aftermath card means starting a run, so it can clobber the user's save.** Snapshot
  every `gt_` key out of `localStorage` before driving it and write them back. **They have a live
  playthrough in there.**

---

## 6. The engine traps

*Every one of these has actually shipped here. They are cheap to avoid and expensive to find.*

**The shape that keeps repeating, and it is worth naming:** **one map was answering two questions.**
`BLOCKED{}` answered *can a body walk here* and *can a shot cross here* until the day the answers
differed. `walkable` answered *can I END here* and *can I CROSS here*. `a.range` answered *is this a
shooter*. **When a field gets a second user, grep every reader of it.**

- **There are two AI brains.** `aiTurn` and `autoStep`. Every behaviour change goes in both, or AUTO
  silently stays stupid. **This has bitten twice.**
- **Never use `window.confirm` / `prompt`.** Blocked in the published sandbox, so they silently do
  nothing *for the player only*. Use `ask()`.
- **Ownership of `B.busy` cannot outlive its turn.** `B.seq++` invalidates pending `later()`
  callbacks. This was the AUTO freeze.
- **Any new side-`you` non-roster unit** (pet, ally) must be excluded from the "is this mine" tests
  in `render()` and `inspect()`, or it crashes on `CLASSES[undefined]`.
- **A SIDE IS NOT A TEAM.** `disposition()` computes *hold* per side, and side `you` contains the
  clash allies, so helping the ratkin made the enemy's *"we have the bows"* refusal apply to the
  player's own board. Invisible in six bodies out of seven. Put the rule on the body, not the side.
- **Any new fight needs an `AFTER` entry** in the same edit, or it prints another fight's ending.
  Same for `LOOT`: a `LOOT[kind]||LOOT.snare` fallback is silent, and the Fen-Mother once offered you
  a ratkin chieftain's harness.
- **A capability test that reads an act's *shape*** (`range`, `reach`) is fooled by a utility act
  wearing the same field. **Test what it DOES** (`a.dmg`). This froze an ogre mid-battle.
- **`race` IS DERIVED, so a race test is not a test of what something is.** `build()` computes race
  from kind and falls back to ratkin, so **a dog comes out `race:'ratkin'`**, which is how ten dogs
  came to beg for mercy. Ask `monster`. **Test what a thing IS, never what its fields look like.**
- **A COMMENT THAT STATES THE RULE IS NOT THE RULE.** *"Beasts do not surrender, only people do"* sat
  above `G.battleKind!=='mother'` for months and every reader checked the comment and moved on.
  **A hardcoded name under a written general rule is a bug with a character reference.**
- **A `!big` / `!x.big` GUARD CAN SWITCH OFF A WHOLE FEATURE AND LOOK LIKE CAUTION.** Four places
  excluded great beasts from the facing arcs, so the Fen-Mother's back existed in the maths and
  nowhere anybody could see it. **Grep every reader before trusting that an exclusion is local.**
- **A hand-tuned boss must opt out of global balance passes** (`noTrim`).
- **THE FIGURE IN A STATBLOCK IS NOT THE FIGURE ON THE BOARD.** `build()` puts every foe through the
  armour and hitpoint trims, so a foe reading `armour:72` stands up with 54. A balance request
  phrased in what the player SAW has to be solved backwards through the trim.
- **Never swallow an exception around a persistence write.** A `catch` hid a renamed constant and the
  save simply never wrote, while "do you have a save?" cheerfully answered no.
- **Batch string replacement: sort longest-first.** `morale −2` ate the prefix of `morale −22`.
- **A movement scorer that closes on straight-line distance has a pocket.** Behind a boulder every
  hex that leads *round* it is further away, and `reachMap` deletes the hex you stand on, so the body
  oscillates forever. It took a 599-round arena game with nothing in the log to find. `closeOn()`
  walks the real path now.
- **A readout that does not apply a global multiplier is a lie that survives for months.** When a
  global knob goes in, grep everything that *predicts* the number, not just what computes it.
- **A HEX LINE BENDS**, so *"directly behind"* is not one sector. Any rule of that shape wants the
  **rear 180°**, or it will exist and never fire. *The mockup caught this before it shipped, which is
  the entire argument for the gate.*
- **A pure function called from `hitBreakdown` is in the innermost loop of both AI brains.** Adding
  `losState` there took a five-round clash from instant to **23 seconds**. Cache against a signature
  of where every body is standing, so it stays exact.
- **"Remember that this happened" and "make it happen" must not come apart.** **A one-shot flag is
  set from the return value of the thing that fires, never before it.** And **anything that can
  silently decline must say so in its return value**: `capSay()` returned `true` regardless, so a
  once-ever lesson marked itself seen while the player saw nothing.
- **A ONCE-EVER TRIGGER CANNOT CARRY A SECOND ONCE-EVER CONSUMER.** `w_rung` seen and `L_w_rung`
  never, in a save that had played the whole act. **If B rides A's trigger and both are once-ever, B
  is silently sampling A's single roll.**
- **A BUDGET EXPRESSED PER ROUND DOES NOT SPACE ANYTHING THAT FIRES IN ONE SYNCHRONOUS BLOCK.** There
  is one balloon, and the later line removes the earlier one before a frame is painted. **If a
  resource is a single slot, the rule has to name the slot, not the round.**
- **A STALE DOM SUBTREE MAKES A FIRST-RUN BUG LOOK INTERMITTENT.** `#bGrid` still holds the previous
  fight's hexes between fights, so a lookup succeeded against the wrong provenance and only the
  first battle after a page load broke. **When a bug is reported as intermittent, ask what is left
  over in the page from last time.**
- **The practice field can reach the campaign through the side door.** `SIM.on` exists to stop that,
  and every write to `LEGACY` or the run save has to check it: the leak was in a content function
  nobody thought of as persistence.
- **THE CAPTAIN'S ROSTER NAME IS THE WORD "You"**, so any third-person line about him is broken
  English. Fixed in **`capName`**, not at call sites. **Any new template that interpolates a name has
  to survive him.**
- **A CASTER DOES NOT HAVE THE SPELL YOUR TEST BENCH ASSUMES.** `rollSpells` deals two schools out of
  four, so `acts.find(a=>a.k==='wither')` is `undefined` on half of all staged fights and the click
  silently does nothing. **Never conclude a feature is broken from one staged run of a rolled
  loadout.**
- **A MULTI-HEX BODY IS TWO PICTURES THAT HAVE TO MEET, AND THE ART IS THE SPEC.** Derive the second
  hex from the same column the first one ended up on, and **mirror the halves off the head-to-tail
  axis, never off `facing`**.
- **A HELPER DECLARED INSIDE THE FIRST FUNCTION THAT NEEDED IT** is a helper the second caller
  crashes on. Hit twice in one session. **Before writing a second copy of a two-line helper, grep for
  the first one.**
- **A RULE THAT LOSES ON CSS SPECIFICITY FAILS SILENTLY AND LOOKS LIKE IT IS WORKING.** When a style
  gate does nothing, **read the computed value before re-reading your own logic.**
- **A CONSTANT INSIDE A LINTER ROTS LIKE ANY OTHER CONSTANT.** A route-length guard written to catch
  a broken map was broken by a map change. **Prefer a bound derived from the data.**
- **A rule phrased against a node's PROGRESS breaks silently the day somebody reorders the run.**
  Anchor to a computed **shape**, and have `LINT()` check it, because both ways it can fail are
  silent. **And remove a node, remove its scene in the same edit**: every scene in the map painter is
  a node lookup, so a deleted node takes the whole painting down with a TypeError.
- **A boot IIFE that reads a `const` from above it is a TDZ crash that aborts the whole script.**
- **`getBoundingClientRect()` returns zeros in the hidden preview pane.** Compute, never measure.
- **THE BATTLEFIELD CAMERA LIVES ON `#bGround` AND NOWHERE ELSE.** Everything floating over the board
  is anchored by `(hexRect − fieldRect) ÷ the #stage scale`, which is correct at any zoom **only
  because `#bFx` sits outside the transformed layer.** ⚠ Do not move the transform to `#bField` or
  `#bFx` inside `#bGround`.
- **AND A RECT IS AXIS-ALIGNED IN *SCREEN* SPACE, WHICH ON A PHONE IS NOT THE GAME'S SPACE.** The
  stage takes `rotate(90deg)` in portrait: **measured drift 1103px.** Everything positioning itself
  from a rect goes through **`relPt(inner,outer)`** or it is right on a desktop and a right angle out
  on a phone. *(`offsetLeft/offsetTop` are unaffected by rotation.)*
- **`fit()` run once in a zero-sized frame computes `scale(0)`** and the whole game vanishes with no
  error and no way back. It is floored now.

### The ten invariants

1. Campaign and any test harness share **one battle description and one engine**.
2. Application, legacy, run, battle, UI and telemetry state stay **distinct bands**.
3. Each resource has **one canonical mutation path.** *(Aliases may read; they must never write.
   Ignoring this made the wagon bank every haul twice.)*
4. **Each battle turn has one owner, and completion resolves once.**
5. **dead · downed · routed · fled · escaped · withdrawn stay distinct.**
6. **Race defines body, class defines job, trait bends expectation.**
7. **Location owns terrain, faction owns doctrine, encounter owns exceptions.**
8. Developer tools **cannot write** campaign or legacy progress.
9. Material UI changes pass the **visual gate**.
10. Telemetry **observes** outcomes and never silently balances the game.

**And two more:** decision makers choose commands, they never mutate state directly, so manual play,
AUTO, enemy AI and allied AI all go through the same legal actions. And **AUTO never makes an
irreversible decision**: no quest, sacrifice, surrender, retreat or unique item. It plays the fight,
not the run.

### The state bands

| Band | Lives | Owns | Must not own |
|---|---|---|---|
| settings | across launches | music, developer mode, accessibility | run resources, battle results |
| legacy | across runs | wagon fittings, banked salvage, meta-history | current wounds, location, battle state |
| run | one run | day, route, resources, roster, stash, quests, facts | DOM refs, animation callbacks |
| character | a life | stable id, race, class, trait, gear, scars, history | screen layout or HTML |
| battle | one fight | units, terrain, initiative, turn, morale, outcome | persistent rewards before resolution |
| UI | one interaction | open screen, selection, dialog, hover | canonical resources or quest truth |

> **A character has one stable ID. Names and nicknames are presentation, not identity.**

**The four layers everything collapses into.** When a new system feels tangled, two of these got
merged: **Facts** (what happened) · **Rules** (what that forbids or compensates) · **Presentation**
(the ledger, the portrait, the last page) · **Validation** (does it hold when the person is dead,
dismissed, absent, or loaded from a save written before the field existed).

**Presentation never becomes a second source of truth.** Which way the arrows point:

```
content → domain rules → state transitions → presentation models → screens
                                                    ↓
                                             telemetry observes
```

Every bug on the list above is one of those arrows pointing backwards.

### Before an event ships

`LINT()` covers the machine half: tokens, hardcoded names, impossible gates, unconsumed effects,
missing ids. It cannot cover the half that matters, so read the event once and answer these:

- What **decision** does this ask for, and is it a decision at all if one option is obviously right?
- What **weight** is this card: a two-second pickup, a look at the ledger, or a decision the player
  will retell? All three are legitimate, but a card must know which it is, and heavy cards must be
  rare. *(`01_GAME_CONCEPT.md` §5, "The choice economy".)*
- Does it work with **any legal party**: no ogre, no ratkin, four people, thirteen people, the person
  it wants dismissed or dead?
- Does it fire **twice** in a run, and is that intended?
- Does anything **remember** it afterwards, or does it evaporate?
- Does the good option quietly pay better than the bad one? *(If so it fails the pillar.)*
- **Was the thing in front of the company MADE BY PEOPLE, and does the card say so?** *(User's
  standing rule: "it is important for emotional inclusion and for the plot." The two are different
  kinds of dread.)*
- **How long is it, in words, measured?** LIGHT 45-90 · MEDIUM 90-140 · HEAVY 140-175, body and
  outcomes together. A card over its band is claiming to be heavier than the Dead Company.
- **Does the prose repeat a number the chip row is already holding?** If so, the prose loses it.
  *(Both from [`.claude/rules/event-cards.md`](../.claude/rules/event-cards.md).)*
- **Could this be removed with nothing lost?** If yes, remove it or rewrite it.

**That last question does the work.** A road that is mostly filler makes the events that *do* return
feel like filler too.

---

## 7. The files

| File | Job |
|---|---|
| **`README.md`** *(this)* | **Orientation.** What the game is, the pillar, the traps. Start here |
| [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) | **The work.** The current focus, then one line per entry. **Everything in it is actionable** |
| [`archive/BACKLOG_ENTRY_SPECS.md`](archive/BACKLOG_ENTRY_SPECS.md) | the full text of every unbuilt entry, for when a session picks one up. **199 KB: open the one entry, never the file** |
| [`SHIPPED.md`](SHIPPED.md) | **The registry.** One line per shipped entry, **every open remainder named**, which numbers are spent |
| [`CHANGELOG.md`](CHANGELOG.md) | **The record.** The build log with the reasoning, and shipped entries in full. **History, never instructions.** **877 KB: open one dated row, never the file** |
| [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) | **The test bench, and it is the USER'S file.** How to reach each new thing in three steps, what should happen, what would be a bug. A session **writes** to it and never takes instructions from it. **93 KB: open one section**, and it keeps 2026-08-12 onward |
| [`DEPLOY.md`](DEPLOY.md) | one command, and why the hosted page is generated rather than copied |
| [`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md) | **two sessions, two desks.** `tools\branch.ps1 new <name>` gives a session its own branch and its own checkout, so nobody waits on the prototype; `tools\branch.ps1 done <name>` merges it back. **Numbers are still claimed**, because git cannot merge a counter. Read it before running two sessions |
| [`DRAMATURGE.md`](DRAMATURGE.md) | the manual for `tools/dramaturge.html`. ⛔ **It live-reads the prototype: there must never be a second copy of the event data** |
| [`01_GAME_CONCEPT.md`](01_GAME_CONCEPT.md) | the accepted design. If the code and this disagree, one of them is a bug: decide which |
| [`02_ART_DIRECTION.md`](02_ART_DIRECTION.md) · [`03_WORLD_LORE.md`](03_WORLD_LORE.md) | painted direction · **the lore book, and it is canon.** When an event and the book disagree, one of them is a bug |
| [`10_ART_ASSET_BIBLE_AND_PROMPTS.md`](10_ART_ASSET_BIBLE_AND_PROMPTS.md) | the painted-art manifest and one prompt per picture |
| [`08_MUTATIONS.md`](08_MUTATIONS.md) · [`09_SETTLEMENTS_AND_LEGACY.md`](09_SETTLEMENTS_AND_LEGACY.md) | two designed systems, partly built |
| `content/` | authoring source. **`events_book.html` runs the other way**: every authored word generated OUT of the running build for the user to edit |
| [`../.claude/rules/`](../.claude/rules/) | **standing procedures for jobs that repeat.** Read the one that matches before touching that surface, or it gets re-derived: **`event-cards.md`** (how long a card's prose may be, and where the receipt lives) · **`world-map-sights.md`** (the icon on a map node) · **`static-event-art.md`** (stage-3 event art mapping) |
| `docs/archive/` | **three files, all of them live references**, and all three are linked from this table where they are wanted: `BACKLOG_ENTRY_SPECS.md`, `PLAN_REASONING.md`, `README_WHERE_IT_STOOD.md`. The six dated snapshots that used to sit beside them were deleted on 2026-08-14: see the note below |
| **the running build** | **what is actually true. It wins over every document.** |

### ⛔ Open the big files by section, never whole

`CHANGELOG.md` (877 KB), `archive/BACKLOG_ENTRY_SPECS.md` (199 KB) and `WHAT_TO_TEST.md` (93 KB) are
**records, not reading**. Grep for the entry number or the dated heading and read that range. A
session that reads any of them end to end spends a fifth of its context on history before it has
opened the game.

⚠ **Those three figures were 640, 152 and 63 until 2026-08-14, and every one of them had been wrong
for weeks.** A size written into prose is a counter that lives in a sentence, which is the same
shape as the entry number that cost five collisions. **Re-measure rather than trust the sentence:**
`ls -la docs/ docs/archive/`.

> **⚑ The 2026-08-14 cut, and the rule it leaves behind.** `archive/` held six dated snapshots
> nobody had to read, and the test bench had grown to 3,064 lines. All six snapshots are deleted and
> the bench keeps 2026-08-12 onward. ⛔ **Nothing was copied into a new file, because git is the
> archive that costs nothing**: `git show 5bb2bf2:docs/archive/<name>` returns any of them whole.
> **A superseded document does not need a shelf, it needs a commit hash.** What is left in
> `archive/` is the three files that are live references, and they are linked from this table.

---

## 8. The questions that are yours

*Nothing in the plan is blocked on these, but each changes what a later batch looks like.*

1. **The name.** *Grimtoll* or *Rabblebound*? The second comes with a whole identity, and it says
   nothing about tactics on its own, so a subtitle would have to carry that.
2. **AUTO doctrine.** One order for the whole company, or assignable per person? Per-person is more
   expressive and roughly triples the UI.
3. **Numbers in the chronicle.** The interface rule says hide them. Does the expanded record get an
   exemption, or does even that stay in words?
4. **The run contract.** Is today's no-death rule kept alongside the chain as a gentler contract, or
   is the chain simply how the game works? **#34 is written as the default rule.**
5. **Generated voice.** Acceptable as a labelled temporary track for timing, or not at all?

*(Three were answered on 2026-08-01 and became live entries: mortality → #34, grafts → #35, the
forest → #56, shipped. And **"not mercenaries, but rabble"**: the crew is strangers forced together
starting with one contract, the island goes on calling them mercenaries, and wages, contracts and
the Captain's authority stay exactly as built. [`03_WORLD_LORE.md`](03_WORLD_LORE.md) §7 carries it.)*
