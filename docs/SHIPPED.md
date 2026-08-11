# Grimtoll - what is shipped

> **A registry, not instructions. Build nothing from this file.**
>
> One line per shipped entry, so a number is never reused and **no open remainder is lost.**
> The **full text** of every entry is in [`CHANGELOG.md`](CHANGELOG.md), with the build-log row that
> carries the reasoning. The **work** is [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md).
>
> **When an entry ships, four writes:** full text and a build-log row → `CHANGELOG.md` · a one-line
> row here · strike it from the backlog · a section → [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md).
>
> *Rows were cut down to one line each on **2026-08-10**. The long versions are in the changelog and
> in [`archive/2026-08-10_SHIPPED_before_cleanup.md`](archive/2026-08-10_SHIPPED_before_cleanup.md).*

---

## ⚠ THE NEXT FREE NUMBER IS NOT WRITTEN DOWN ANY MORE. ASK FOR IT.

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 number
```

*This heading used to carry the number by hand and it was wrong every time two sessions ran, because
**the code and `shots/` get the number before any document does.** Five collisions, and on
2026-08-11 two sessions were each nearly the sixth: the battle-screen redo was written as #89 and
renamed twice at write time, the battlefield patterns were written as #89 and renumbered to #90
mid-session, and while both were in flight both docs still said "next free #89". `ls -t shots/`
caught them; the script reads `shots/` for that reason. Rules:
[`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md).*

*Standing state, for reading rather than for picking from: **#86** is claimed by the clarity pass in
the backlog. **#89** was released unused by the session that held it and then **taken back the same
day by the combat benchmark**, which shipped. **#87, #88 and #90** shipped 2026-08-10 and
2026-08-11. **#91** is the battle-screen redo,
**shipped 2026-08-11 the same day it was mocked, picked and built** (A · THE FRAME with B's on-card
damage). **#92** is the collision guards and **#93** is the pattern draw, both shipped 2026-08-11 -
and **#93 was the first number issued by `claim.ps1` rather than grepped for**, which is the guards
working the hour they landed. **8f.121 (#91) waited out the other session's prototype lock rather
than stealing it, which is the other half of the same machinery working.***

**Shipped or closed:** 1 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · 14 · 15 · 18 · 20 · 31 · 33 · 36 · 38 · 40 ·
41 · 44 · 46 · 48 · 51 · 52 · 53 · 54 · 55 · 56 · 58 · 60 · 61 · 62 · 63 · 64 · 65 · 66 · 67 · 68 ·
69 · 70 · 71 · 72 · 73 · 74 · 75 · 76 · 77 · 79 · 81 · 82 · 83 · 84 · 85 · 87 · 88 · 90 · 91 · 92 · 93

| # | one line | open remainder |
|---|---|---|
| **91** | **The battle screen, redone to the user's seventeen points** *(2026-08-11, 8f.121)*, in the frame they picked from three live-board mockups the same morning: **A · THE FRAME, with B's on-card damage.** The 300px panel, the 72px strip and the 104px log are gone; the field is the whole screen, the chrome floats: counts capsule + heads-only order rail up top, plaque with four big numbers and a one-word nerve chip bottom-left, cards with **damage on their faces** bottom-centre, END TURN + accordion log (with the ? = COMBAT LOGIC chip) bottom-right. **Board 57.8% → 85.5% · 262 words → ~160 · camera a third closer** (stops re-derived: FULL 1.73 = whole board exactly, FIELD 2.20, CLOSE 2.50 = sprite size). ⚑ **MOVE is the standing selection and a click on a priced enemy swings**: one offer variable through one gate (`offerAtk`) feeds the lit hex, the odds, the preview, the readout and the click, so nothing is lit and then refused. ⚑ **UNDO MOVE is decided before the step** (could a parting swing even happen?) and `spend()` - the one door every paid act uses, #87's lesson recashed - closes the window in one line. Mood faces only on rungs that change numbers; 🙂 is gone. #88's warmage scroll dissolved sideways: seven cards are 450px in a 1280px row | ⚠ **Nobody has played it with a hand on a mouse**: the pane composites no frames, so feel (readout dwell, popover timing, undo discoverability) is the user's to judge off `WHAT_TO_TEST.md`. ⚠ **The phone rotation was unverifiable in the harness** - chrome is stage-anchored by construction, but 393x852 portrait wants one real look. ⚠ **No undo on a last-action move** (the turn auto-ends 140ms later) - designed, flagged for the user's verdict. ⚠ The flavour line ("the fog is picking sides") was cut with the old header; it can return as a log line if missed |
| **93** | **The board is drawn, not assigned** *(2026-08-11, 8f.120)*. #90 gave the act four arrangements and then handed each fight exactly one, so the boards were still fixed - just fixed at four instead of one. A place now owns a **pool** and the board is rolled per battle from **two independent dice: the POOL draw picks the arrangement, the SEED draw picks everything else.** ⚑ **The pool is what that terrain can plausibly build out of what is lying around** - the ridge draws from six because stone stacks, scatters, piles and lies about; the fen from five, the swamp from three. **`strewn` stops being an embarrassment**: the retired random-blob generator is an honest member of the pool once variety is the point. ⚠ **The forest's masses moved to STONE**, because a stand of six trees among twenty-six trees is not an arrangement, it is more forest | ⚠ **Two fixed points, and both are refusals.** The **Fen-Mother** is the only pinned seed left in the table (rolled: 15.7rd worst 27 won 5/6, against 11.5rd worst 17 won 6/6 pinned - and **#32 was filed against this fight for never ending**). The **Sling-Line** draws from a pool of one, because cover does not make that fight harder or easier, it makes it a different fight. ⚑ **And a correction to #90's own table: the "0/8" rows were never 0.** At n=40 the Circle is 5-10% winnable by AUTO and always was. **n=6 cannot tell 0% from 20%**, and three decisions in these two entries were nearly taken on eight runs. 👤 Still yours: whether to re-tune the Fen-Mother onto a rolled board |

| # | one line | open remainder |
|---|---|---|
| **92** | **The collision guards** *(2026-08-11, 8f.119)*. The next free number stopped being a sentence in a document. `tools/claim.ps1` reserves `#NN` and `8f.NNN` with an **atomic `CreateNew`**, one session **locks** the prototype, and `.git/hooks/pre-commit` **refuses a commit that spends a number somebody else holds**. Found two worse surfaces on the way: `inject.ps1` rewrites the whole prototype, and **`deploy.ps1` runs `git add -A` and pushes**, so a deploy published the other session's half-finished file to the live link. Both gated; deploy now prints what `-A` sweeps. ⚑ **A counter that lives in prose is not a counter.** Fired for real the same afternoon: session `38e9215b` got #93 while this one got #92. Rules: [`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md) | **A lock is only as good as the session that takes it.** Nothing forces a session to run `claim.ps1 lock` before editing, so the hook only protects a file somebody declared. Making the lock automatic on first edit was left out deliberately: it would take the prototype every time any session so much as touched it |
| **90** | **Four battlefields, and the measurement that said there had only ever been one** *(2026-08-11, 8f.118)*. Seven of nine act-1 fights ran one random-blob generator, **no act-1 fight contained a single tree**, and the mass landed at rows 9-12 or behind you while the lines meet in columns 5-9. Four arrangements now, each named for the question it forces: **ANVIL** · **SPINE** · **BROKEN** · **FLANKS**, plus **OPEN** which the Sling-Line keeps on purpose. ⚑ **A pattern is a decision the ground forces; a density is not a pattern** - and **the material is the terrain's, not the pattern's**, so one spine is boulders on the ridge and trees in the fen | ⚠ **The Fen-Mother is the one fight not re-grounded**, on #64's precedent: her old roll survives as the named pattern `strewn`, live for one row, and her board is byte-identical to the one she was tuned on. 👤 **The ruling is yours** - leave her, or move her onto a real arrangement and re-tune the band. The finding that came out of it stands either way: **a centred mass taxes whoever needs range**, so her 12-14 band is partly an accident of seed 29. ⚠ **The Sling-Line now has zero liftable boulders** for an ogre - as it did before, where its clump was all touching stone, but it is now true by design rather than by luck |

**Live in the backlog:** 2 · 3 · 4 · 12 · 13 · 16 · 17 · 19 · 21 · 22 · 23 · 24 · 25 · 26 · 27 · 28 ·
29 · 30 · **32*** · 34 · 35 · 37 · 39 · 42 · 43 · 45 · 47 · 49 · 50 · 59 · 78 · 80 · **86**

**🚧 Running elsewhere, not this repo's to build:** 57, event analytics, the user's own, in a
separate tab. Its spec lives inside `tools/dramaturge.html`, on the tab.

> ***#32 is in both lists on purpose, and it is the only number that is.** The *defect* it was filed
> as, the Fen-Mother's never-ending fight, is closed. The *rule* the investigation found is a live
> entry: **routing needs help to come back from.** If you are looking for a bug there is not one; if
> you are looking for work, there is.

---

## 2026-08-10

| # | what it bought | open remainder |
|---|---|---|
| **88** | **The panel you read a turn off.** All three of the day's complaints - small type, numbers everywhere, hotkeys on top of the icons - were **one measurable cause**: the skill list was a two-column grid, and a 133px column leaves a card **116px of inner width** while the longest skill name in the game wants 128px of it. **The card could not show its own contents, so the type could not be raised.** ⚑ **One column gives it 213px**, so every name fits on one line and the type went **up** (name 11 → 12.5px, cost 9 → 10.5px, hotkey 8.5 → 10.5px). ⚑ **The hotkey has a reserved 25px gutter, not a nudged offset** - a moved badge is correct until the next long name; a column nothing else may enter is correct always. Its twin on the right holds the cooldown. ⚑ **STEP got a home, not a label**: it is the second big number in the budget box at the top, off the same `moveBudget()` call the MOVE button and both AI brains make, so it cannot drift - and it drops 4 → 3 on your second move, teaching its own rule. **The three action pips paid for the room, and INIT left the panel** to the ORDER strip that already shows the whole ranking. **Five integers became three, and nothing was added.** *(8f.117)* | **the warmage scrolls, and it is measured**: seven acts want 317px in a 259-270px box, so Marrow overflows by **47-58px, about one card**. Everyone else fits. The list scrolls and the selected card scrolls itself into view, so no hotkey selects something off-screen - but a skill you must scroll to is a skill you may not know you have. **Two cuts would close it and both are the user's call:** `#bDerived` (41px, all three numbers exist somewhere better) or merging the ARMOUR/HITPOINTS labels onto their bars (26px). **And the other screens were not touched**: the style block still holds **61 declarations below 10px** outside the battle screen |
| **87** | **The verb has a shape.** Thirty skills used to share three animations, so a KICK looked like a sword, a SWEEP played one sword-swing per neighbour, and six verbs put **nothing on the board at all**. **Eight primitives now** - GUST · ARC · RING · TETHER · MOTES · PLATE · SHUDDER · GHOST - picked from **what an act DOES** (`push`, `sweep`, `fear`, `buff`), never from its name, so a future verb inherits its picture untold. ⚑ **Two doors, not thirty handlers**: `spend()` for actor-centred shapes and `strike()` for blow-borne ones, which is why both AI brains and AUTO got it free. ⚑ **A ring travels outward and means broadcast, a plate snaps inward and means protection** - that single opposition tells COMMAND from HOLD THE LINE with no word on screen, and it is why the scare verbs were never allowed to borrow the recoil. **The ring is drawn at the act's real hex radius** (ROAR 2, THE SOUND SHE MAKES 5), measured off the live DOM by `hexSpan()` so it is correct at all three camera stops. *(8f.116)* | **the held working is a flash, not a line.** #67's GATHERING tether fires once at the moment it is begun; a line held for the whole round would make *"walk out of range and it is gone"* visible, and it needs to survive `render()`, the camera and the victim moving, and be torn down on all four ways it is lost. **Three radii are named rather than derived** - ROAR's 2, COMMAND's 3, HOLD THE LINE's 2 exist only as literals inside their handlers, so a retune would leave the ring drawing the old number; the fix is those handlers taking the radius off the act. **Untested on real hardware and never seen animating by a human**: the hidden pane composites no frames, so every claim here is a DOM-and-duration assertion plus the standalone sheet |

## 2026-08-04

| # | what it bought | open remainder |
|---|---|---|
| **85** | **THE DREAM.** A camp incident about somebody this run lost, with the ruling carried by the morning rather than the dream. ⛔ Its first cost was learning that **nobody on the roster ever dies**: `lostSoul()` names the three states that mean gone, and cutting a returning veteran down at a fire is the build's only real crew death. Also closed a save bug: `G.stranded` had never been written. *(8f.114)* | **the picture.** All 19 camp cards share a pool of four daylight paintings, so the dream is illustrated with a sunlit rock |
| **84** | **A dodge and a miss are two different events.** The field used to print *"X misses."* and float a green DODGE for the same roll. ⚑ **One roll, two readings, no new randomness**: `total` is skill minus dodge, so *"would this have landed on somebody who never moved?"* is free. Six lines, three weapons each way, and the defender's figure only moves when the defender is the reason. *(8f.113)* | **the odds readout is still one number.** A split preview (*"55 fails: 12 of them it dodges"*) is a real entry and was not built. And `a.misses` still counts both |
| **82** | **Obstacle height.** ⛔ **One map was answering two questions**: `BLOCKED{}` meant both *can a body walk here* and *can a shot cross here*, so a campfire stopped an arrow as hard as an oak and nothing stopped a spear. `heightAt()` is a second register: TALL · MED · LOW. **MED is the game's first cover, at −14.** ⚑ The lane is worth the worst thing in it, never the sum. *(8f.108)* | **it demotes a line of #46**: what the thrown boulder buys now is removing cover, so re-price the throw when #46 is next touched. **−14 is chosen, not measured.** The bloom flower was filed LOW without an argument |
| **83** | **A bit mobile friendly.** The file had **no viewport tag at all**, so a phone shrank the game twice. Portrait + under 700px + a coarse pointer rotates `#stage` and takes it 0.307 → 0.546. ⚑ **The real hazard was every rect in the build**: a rect is axis-aligned in *screen* space, measured drift 1103px, so everything anchoring to the board goes through `relPt()`. *(8f.106)* | **nothing was made bigger.** At 0.546 the mono labels render at 5px, hover is still the only way to read a breakdown, and the chrome was never sized for a thumb. **Untested on real hardware** |
| **81** | **The battle clock.** Every duration on the board through one multiplier, `paced()` in JS and `--pace` in CSS, shipped at **×1.75** with a player-facing ⏱ PACE button. ⚑ A set of durations tuned against each other is one object; the call sites keep their literals. *(8f.100)* | **`strike()` resolves a shot in the tick it is loosed**, so the arrow's flight is the one duration off the clock. And ×1.75 is a guess inside the range the user gave |

## 2026-08-02

| # | what it bought | open remainder |
|---|---|---|
| **79** | **Armour is light, medium or heavy.** The band decides how much of a blow reaches the body (50/50, 60/40, 75/25) and the dodge cost is its price. One threshold bands the gear and the enemy statblocks through the same function. *(8f.97)* | ⚠ **a named balance debt**: both bosses became winnable (5/8 to 8/8 each). **The knob is armour VALUES, never the 50/60/75**, and **#80 moves the number back**, so the sweep waits for it |
| **77** | **The event book.** Every authored word generated OUT of the running build into `content/events_book.html`: 31 events, 18 camp cards, 14 vignettes, 152 choices, each with its tag, rubric score and a line saying what it actually does. ⛔ No second copy of the event data. *(8f.85)* | **the round trip is UNBUILT.** Nothing reads an edited doc back into the prototype, and that is the task the user said would need him |
| **76** | **Send the run.** Seven questions in the menu, leading with what the journal cannot infer. ⛔ **A silent send is impossible from an artifact for anybody**, so it is a real `<a href="mailto:">` navigation with the journal on the clipboard in the same gesture. *(8f.85, 8f.86)* | **the address is published to everyone who plays.** A form link would be the safer shape. The `downloads` row is untested against a real published page |
| **75** | **Double rations, offered.** ⚑ Not a new system: `openProvisions` already sold them and `passDays` already doubled the mending. It calls the same purchase and **quotes what THIS road gives back.** *(8f.85)* | **it only ever asks on the way to a FIGHT.** Defensible, and also the sort of rule a playtester reads as a bug |
| **74** | **THE CIRCLE.** Three ways to pay a toll: your face, six provisions, or your blood. ⚑ **The mark is not a bonus**: every body adjacent to the marked Captain, friend or foe, reads 10 morale lower, and the sect is never corrected or confirmed. The fight is ten who never break, and losing it is a beating, not a defeat. *(8f.81)* | **the mark has exactly one reader.** No road event, muster price or merchant looks at a permanent visible thing on the player's face. **#22** is where that belongs. And is a 5% win rate the right amount of hope? |
| **73** | **THE LONG FIRE.** A ratkin wants the barrels opened, and tells you why ratkin are still on this island. ⚑ **It sits BEFORE the Warm Spring for a mechanical reason**: the spring closes every wound, so provisions charged after it cost nothing. *A cost is only a cost where the sink is still running.* *(8f.79)* | **the act is one day longer** and that was not costed against #71's sizing or the 90-crown purse. And **no existing card has been re-read** against the made-by-people rule it arrived with |

## 2026-08-01

| # | what it bought | open remainder |
|---|---|---|
| **72** | **The combat pass.** Dodge soft-capped · ratkin +5 / ogre −5 · the kick provokes and slips round · opportunity swings at half a blow · SPEAR WALL stops the moment somebody is inside her reach · **DISENGAGE is the hex itself.** Measured 9.5 → 8.7 rounds, +12% swings *(8f.74)* | **the enemy never braces a wall and never disengages**, so both new rules are player-side in practice. None of it was tuned against #50 |
| **70** | **After a battle: one card you read, one card you decide on.** ⚑ **There was never a third screen in the code, which is exactly why it read as a wasted one**: beat two redrew itself into a summary of itself. Mercy folded in as the top section. *(8f.68)* | **the promotion-only card got thinner** (8f.78 took the field question to two fights of eight), so the question is whether it still earns a stop |
| **69** | **The character sheet shows what they can do, not what the class could.** Everything TAKEN plus anything buyable this second; the rest behind one line saying how many. ⚑ The "plus buyable" clause is an old lesson kept intact: a perk point with nothing visible to spend it on reads as a broken screen. *(8f.68)* | none |
| **67** | **The slow working.** A damaging school is spoken twice: the click pays, the damage lands at the start of the caster's next turn. ⚑ **`gathers` is derived, not declared**, so the ratkin sniffer and the one-word ogre inherited it untold. ⚑ The old −34 soft-target discount had never once mattered: **a rule has to be written as a rule.** *(8f.68)* | ⚠ **THE WORD is slow too, and that is the user's to overrule.** Also: is one round the right price, and does the enemy focus read as smart or unfair? |
| **68** | **The outpost gate is defended, and you may walk through your own.** ⚑ **The front rank is the frontier, not a row**: a formation drawn by eye on a hex grid is a guess, take it off `nbrs()`. ⚑ **`walkable` was answering two questions**: `passable()` is the crossing test. *(8f.67)* | **a `bows` company ran the fort to 29 rounds and withdrew.** Parked in #50. And is the door worth attacking, or is "go round" always right? |
| **66** | **Three camera stops: FULL x1.30 · FIELD x1.80 · CLOSE x2.50.** ⚑ **The measurement rewrote the request**: 41% of the battle screen was empty gradient, which is why the lowest stop is x1.30 and not x1.00. ⚠ Do not move the transform off `#bGround`. *(8f.65)* | **drag to look around was deliberately not built.** If CLOSE reads as claustrophobic that is the thing to add, and a drag over 6px must suppress the click |
| **61** | **Terrain became one word.** `TERRAIN{}` replaces two knobs that did not know about each other. ⚑ **A terrain type is a place with its own rule; a dial is not a type.** All eight fights verified to reproduce their old seed exactly *(8f.64)* | **`plains` may still be what the fen should be.** One line per fight in `FIELDS`, deliberately not decided |
| **62** | **The tree.** A new `BLOCKED` kind, **deliberately not `rock`**, because #46's `loneRock` tests `==='rock'` exactly and keeping them apart *is* the mechanism that stops an ogre uprooting a forest *(8f.64)* | none |
| **63** | **The swamp: deep water.** ⚑ **The first cut FAILED its own rule**: at 35% wet a company reached 51% of its plains distance against a 60% floor. Shipped at 24%. A gilled body reaches 62% further there *(8f.64)* | **is 24% enough to READ as a swamp?** The honest lever is the painting, not more water |
| **64** | **The bloom flower.** Asleep, opens the round after a body ends beside it, never closes. Both sides: nerve +50%, stride −2, damage ×0.6. ⚑ Radius 2 was rejected because an ogre could not leave it in one turn, breaking the point *(8f.64)* | ⚠ **the Fen-Mother does not get flowers, and that is the user's to overrule.** With: 11-29 rounds. Without: 8-23. And does it actually force movement? |
| **65** | **The outpost.** ⚑ **The first draft had a choke of ONE and was rewritten before it ran.** Three ways in, and the rotten runs are **`rock` rather than `wall`**, so #46 offers them to an ogre and the siege engine needed no new verb *(8f.64)* | **it has no road event yet.** The fight exists; the encounter that takes you to one is unwritten |
| **33** | **Terrain that has to pass a test.** `terrainCheck()` reports components, sealed forces, walkable ratio and the narrowest column cut. ⚑ **It earned itself on its first run**: one outpost seed in 24 had a tree in the gate *(8f.64)* | **it runs at spawn only**, so a board that changes mid-fight is still governed by #46's two rules |
| **60** | **The first battle teaches itself.** Ten lessons in the Captain's mouth, each fired the first time its rule bites. ⚑ **A lesson QUEUES where a comment DROPS**, because a rule is still true next round and a comment is not. ⚑ `CAPTIER[E.tier]||1` promoted every lesson, because the new tier is 0 *(8f.62, 8f.63)* | **eight or nine lessons landed inside a four-round clash.** If it reads as narration, **the fix is the per-round cap, not the lesson count.** ⚑ **This is now the heart of #86** |
| **58** | **The fork card.** The travel window only opens at a crossroads, and it compares the roads: the leg, the branch, and danger as a state (NOTHING HEARD · TROUBLE · BLOOD). Fixed a lie: 3·2·2 days at crossroad A was really 7·5·7 | **BLOOD is unreachable on today's map.** And a count of *things on the road* was specced and not built |
| **55** | **The reward after a battle is automatic.** ⚑ **A LOOT row was two things wearing one shape**: arithmetic, or the pillar in miniature. Found a dead receipt: `gems`, `morale` and `days` had never been applied at all | **the haul's worth** now that it cannot be optimised against the stash. And **#19's "first pick of the loot" promise** needs rewriting |
| **54** | **Reactions are continuous, ★▲▼ v2.** Every press is a moment rather than a verdict, and the report names a screen whose verdict changed. ⚑ **When two functions can change what the player is looking at, both own the readout** | none. The invariant is written into the code: **it observes and never acts** |
| **40** | **Portraits that look back.** Closed by the user: *"it is done, delete."* Its machinery shipped inside #51: `capBalloon` takes a **speaker**, not the Captain | none |
| **52** | 🐛 **Coldharrow hard-lock: NOT A DEFECT.** Closed by the user: *"it works."* | none. ⚑ **Keep the diagnosis**: the hidden pane's `requestAnimationFrame` never fires and produces a stuck `G.moving` that looks exactly like this report |

## 2026-07-31

| # | what it bought | open remainder |
|---|---|---|
| **53** | **Playtest notes: ★▲▼ on every screen**, attached to the **exact** screen, a decision log, a per-run report, and a copy-paste blob so a friend's journal travels home | superseded by #54 |
| **38** | **One tie: "you carried me out."** A typed bond is **directional**, so one fact reads LOOKS AFTER on one sheet and OWES on the other. ⚑ **A battle rule went on the MORALE ladder, not a scorer**, so both brains and AUTO inherited it. Found that **`G.bonds` had never been saved** | the **second tie type**. Vocabulary banked; **Misses** would test the outlives-the-pair path hardest |
| **46** | **One skill per race: KICK · PICK UP AND THROW · POISON THE BLADE.** ⚑ **None of the three is a damage button**; they make somebody else's action better. One `RACESKILL` register read by both sides. Exposed the `a.range`-without-`a.dmg` bug in four places | the **poison stack is uncapped** and no human has met it. At 15% a cut, three ratkin buy +45%. Parked in #50 |
| **51** | **The Captain's call.** A balloon from his own body with his painted face and roster name: TEACH · CALL · HEART, six triggers, fourteen lines, **no digit in any of them.** When the Captain is down the voice stops for the fight. Absorbed #41 | none |
| **44** | **Ratkin argue about who is related to whom.** Claim → cost → return. Brought `castRace`/`castKeep`, gating a whole *card* on who is at the fire, and **taught `LINT()` to read `CAMPS`** | the default company has **one** ratkin, so it cannot fire until a second is recruited. That is the card being honest, not a defect |
| **15** | **Second and third battlefield styles.** Teal moved *verbatim* so the default could not regress | left a rule behind: **no state colour may read worse on a new ground than on the one the game already ships** |
| **8** | **Audio for the new verbs**, plus both rungs of the nerve ladder and the camp fire | **the builder cannot hear it.** Whether it *sounds* right is the user's ear |
| **48** | **Bodies on the ground.** Purely a picture, so by round eight the board tells you where the fight has been | none. The extras were cut on purpose |
| **36** | **Line of fire the player can read.** One `losState()`: CLEAR · SCREENED · OBSTRUCTED · BLOCKED, folded into `hitBreakdown` so **both AI brains changed behaviour without either being taught** | it lengthened the brigand fight. Banked in #50 |

## Earlier

| # | what it bought | open remainder |
|---|---|---|
| **32*** | ⚠ **The Fen-Mother's never-ending state.** She goes DESPERATE rather than breaking, and every fight gets hungry from round 11. 21-30 rounds → 12-14 | **the number is still live.** The rally rule is a backlog entry. **Do not read this row as spent** |
| **31** | **Long fights get hungry.** Round 11, one provision every second round. Every fight has a fuse now | none |
| **20** | **Route solvency: "about four funded days."** Words, not digits, and **never a gate**: debt is a legitimate way for a run to go | none |
| **6** | **The map rebuilt.** The country got a *shape* first, and the roads obey it, which is what justifies the act doubling back | none |
| **18** | ★ **The Thing in Armour.** A road ambush with no arcs, whose correct play is to pin it with one body and shoot it with the rest | **is "send somebody wide" worth the person it costs?** The arena cannot answer this |
| **14** | **Onboarding, all three layers**: arrival cards · whispers · `? RULES`. Absorbed #11 | none |
| **10** | **Ashmoor: the brass token pays off** | the **Act 2 half** stays open, and Act 2 is parked |
| **9** | **Mid-run save.** Never mid-battle; a battle is regenerated, never restored | none |
| **7** | **The hook-pole, the enemy's pull.** Building it exposed the inverted `pull` | none |
| **5** | **Unpaid wages break the company.** Per-person grievance; it compounds and it reaches the battlefield | none |
| **1** | **Forced movement: push and pull.** The game's first weapon-defined signature | **pushes as a reason to care about board edges** |
| **-** | **The front door.** Menu · a new company · the practice field · `? RULES` · the wagon | none |
| **11** | Teach the new verbs | → merged into **#14** |
| **41** | The first one down | → merged into **#51** as the HEART tier |
