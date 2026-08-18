# What to test - the new things, and what they are supposed to do

> **This file is yours, not a session's.** It exists so that after a build session you can open the
> game, go straight to the new thing, and know what it is *supposed* to do before you judge whether
> it does. Set up on 2026-07-31 at your request: *"create independent file for me - new features and
> what to test and how it is supposed to work, so I would go for a test and check all newly added
> things with precise feedback."*
>
> **The rule that keeps it alive:** every feature that ships gets a section here in the same
> session that builds it - what it is, **how to reach it in three steps**, what should happen, and
> what would be a bug. Newest at the top. When you have been through one, move it down to
> **[Checked](#checked)** with whatever you thought.
>
> **⚑ Cut twice, on 2026-08-10 and again on 2026-08-14**, because a bench that runs to thousands of
> lines is longer than anybody reads with a game running. The first cut took everything from
> 2026-08-02 and earlier; the second took 2026-08-11 and earlier, most of which later rounds of the
> same screen had already replaced. **What is left below is the current build, newest first.**
> Nothing was copied into a second file: [Everything older](#everything-older) has the one command
> that brings any of it back out of git.
>
> **The other docs are unaffected.** [`README.md`](README.md) is orientation ·
> [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) is the work ·
> [`CHANGELOG.md`](CHANGELOG.md) is the record. This is the **test bench**, and it is the only one
> written to be read *while playing*.

---

## ✉ THE FEEDBACK POPUP, THE ADDRESS, AND A COG IN THE CORNER  *(#188 · 2026-08-18 · build log 8f.208)*

**Where it came from.** Your seven notes of 2026-08-18. All seven are built. The two dials you may
want to move are named at the end.

### 1. The popup, and it arrives by itself

**Three steps.** New game → win any fight → press **Back to the road**. About a second after the map
comes back, a card lands on it.

**What should happen.** A small card: **HOW WAS THAT?**, under it the name of the thing you are
rating in small caps - **FIGHT: BRIGAND**, not "the road (map)" - then three faces, 🙁 *no* ·
😊 *good* · 🤩 *loved it*. Pick one and SEND lights. **Only 🙁 opens a second step**, a box headed
*WHAT WENT WRONG?* Press SEND and it is filed against that fight, with whatever you typed.
**It asks once a run.** Win a second fight in the same run and it must stay silent.

**The same card is what the FEEDBACK button opens**, bottom right, on any screen - there it names
whatever you are looking at.

**What would be a bug.** The card naming *the road (map)* after a fight. It asking twice in one run.
The reason box opening off the happy faces. **Esc, the backdrop or NOT NOW filing anything** - all
three must close it and record nothing. It appearing on top of a yes/no question.

### 2. The three corner buttons are gone

★ ▲ ▼ no longer exist as buttons and the FEEDBACK word no longer unfolds - it opens the card. The
small ×N counter beside it still shows how many times you have said something about the screen you
are on, and shows nothing when that is none.

### 3. Sending it: the mail button and the address

**Three steps.** ☰ MENU → the playtest notes → **✉ SEND IT AS AN EMAIL**.

**What should happen.** Your mail app opens, addressed to **dmytriyvihrov@gmail.com**, already
carrying your answers and anything you typed into the popup - and **the same press puts the whole
thing, journal included, on your clipboard**, so the mail says *paste it under this line*. At the
foot of the screen, beside **Back**, sits **⧉ COPY IT ALL** with the address printed under it.

⚠ **The mail is deliberately the SHORT half.** A `mailto:` is a URL and mail clients cut a long one
without saying so, so the letter is trimmed to fit and says it was trimmed. The clipboard is always
the whole thing. **If the mail app does not open at all, tell me** - that is the one thing this
build cannot prove from here.

⛔ **Your GitHub question, answered: no, not automatically.** A published page is blocked from
making any outbound request at all, so it cannot post to GitHub, a Google Form or anything else.
A page CAN open a pre-filled GitHub *issue* by link, the same way it opens mail - but that needs a
public repo and a logged-in GitHub account per tester, and the journal is too big for the link
either way. **Say the word and I will add the issue link beside the mail one.** A Discord is one
line whenever you give me the invite: the field is already there and empty.

### 4. What was deleted

Gone by name: *so I know whose run I am reading. A nickname is plenty* · *the one thing I cannot
read off the journal* · the **YOUR RUN** title · *What the game wrote down while you played. It only
ever watched.* · and the small line under **Back** on the notes, questionnaire **and rules** screens.

⚠ **A journal a friend pasted in KEEPS its title and caption** (*NOTES FROM ...*). That is on
purpose: whose it is and that it does not touch your own are the two things that screen cannot be
read without.

### 5. The cog

**⚙ is now one dim glyph in the bottom-right corner**, at 30% opacity, with FEEDBACK just inboard of
it. Hovering brings it up; switching it on turns it green and solid. The four tools it reveals
(WIN NOW, LINT, WIPE, ✎ TEXT) **did not move** - they are still the top-right column.

**What would be a bug.** The cog covering or touching FEEDBACK, in either state. The tools not
appearing when it is on.

### The dials, if you want them moved

- **How often the popup arrives.** Today: once a run, after a won fight. Easy to make it every
  fight, or once a session, or never automatic.
- **The three faces.** 🙁 😊 🤩 were chosen to stay clear of the morale faces (💀 😟 😐 🙂 😄), which
  the game already uses to mean something else. If you want the exact ones from your screenshot,
  say so and I will find a set that still cannot be confused with morale.

## 🔥 THE SIX-POINT BATCH: "ONE OF US", THE BURNING GROUND, A GEM FOR A LEVEL, THE SURE HAND  *(#186 · 2026-08-18 · build log 8f.206)*

**Where it came from.** Your six numbered notes of 2026-08-18. Every one is built; the two that
have dials you may want to move are named at the end.

### 1. The objective's cheer

**Three steps.** New game → through the brawl → the road's first card issues the SECOND OBJECTIVE
→ recruit anybody (Blood on the Road's ally, or the muster).

**What should happen.** One short gold strip at the foot of the map: *✦ SECOND OBJECTIVE DONE ·
morale +10 · more of you at the fire.* Nine words and the receipt. It fades on its own; the row
under the contract closes. On a phone it is one line, not a paragraph across the map.

**What would be a bug.** The old 41-word paragraph. The strip staying gold on the NEXT road line
(it goes back to italic). The morale not moving +10.

### 2. "One of us": the road sends two when you are down to two

**Three steps.** Take the ring at THE CIRCLE (or let your ratkin toast / your ogre dance at the
wedding). Then, in a LATER fight, lose people until only two of your own stand while enemies
still do. Fastest honest way: ⚙ TEST → a real run → any fight, fight badly. It is a coin (50%),
rolled once a fight, so expect it about every second time you get that low.

**What should happen.** Two bodies appear on free hexes beside a survivor, on your side, and each
of them mutters *"One of us"* over its head. The log opens on the word **Luck** and says who they
are: two ring-eyed strangers (the Circle) or two clan-cousins from the wedding (a spear and a
sling). They fight for you for that fight, take no wages, take no spoils, and are not on the
roster afterwards. **Each source fires ONCE per run.** If you have both, one of the two is picked.

**What would be a bug.** The pair arriving in the FIRST round of a fight you walked into with two
(somebody of yours has to have gone down or run first). The Circle's men arriving IN the Circle
fight, or cousins at the wedding you are cutting down. Anybody arriving in the tap-room brawl or
on the practice field. The pair standing on top of somebody. A second rescue from the same source
later in the run. The fight NOT ending when your last two go down while the pair still stands (it
should end - they are allies, not you).

### 3. Ember: the burning ground

**Three steps.** ⚙ DEV.MODE → practice field → ground **rocky** (or a run: the Steading-Line, the
Sling-Line, the Thing in Armour; the Broken Men's wood at lower odds). About half the rocky boards
carry it; re-take the field until you see black scorched patches with small flames. Walk somebody
through one, or KICK an enemy into one.

**What should happen.** A patch is two to four hexes, off both deployment ends. Hover one: *"Burning
ground. Costs 2 to step into. Cross it or stand in it and you are alight: 6 now, 4 a turn after.
Water puts it out."* Stepping into or across it: **BURNING** floats, 6 off the body (armour does
not help), a 🔥 badge under the feet with a 2 on it, and 4 more at the start of each of that
body's next two turns, then *OUT*. Standing in it at the top of your turn: 6 again and the clock
resets. Ending a walk in the marsh while alight: *PUT OUT*, and the log says so. A KICK or a hook
that lands somebody in it lights them the same way. Enemies walk **round** it when there is a way
round and cross it when there is not; nobody chooses to END a move standing in it.

**What would be a bug.** Fire on the wedding's plains, in the camp, the outpost, the tap-room, or
under the Fen-Mother. A body starting the fight already in it. A patch touching another patch.
Damage with no BURNING word and no badge. The AI parking a body in the fire turn after turn.
Anybody dying twice (two DOWN lines) when kicked into it. The fire spreading (it must not).

### 4. A gem for a level

**Three steps.** 🎒 the company → click a person → the ledger column under the stats. If the wagon
holds a gem, the button *"◈ Cut a gem for a level"* is live; with none it sits greyed and says so.

**What should happen.** A confirm card; *Do it* takes one gem, the person goes up **one level**, and
they get exactly what a fought level gives (a perk point or a stat point, or the trade if they are
a level-0 stranger). The ring reads a fresh level. **The button is then gone for the whole run**,
on every sheet. It comes back on the next run.

**What would be a bug.** The button live with no gems. Two levels for one gem. The button still
there after use, or usable on a second person. The ring drawing negative or empty on the new
level. It surviving into a new game.

### 5. The sure hand: two wide, the third lands

**Three steps.** Any fight, your own body. Miss twice in a row with the same body (any weapon,
bow or spell included).

**What should happen.** On the second miss, *NEXT ONE LANDS* floats over that body. Hover any
target: the aiming card reads **100%** with a **sure hand** row *(two wide · this one lands)*. The
swing lands. After it lands the streak is over and the odds are ordinary again. AUTO will spend
the sure swing too. **The enemy never gets this**: it is your side only.

**What would be a bug.** A third miss in a row on your side. The card reading 100% while the
swing misses (they are one function). An enemy body wearing 100%. The streak carrying across a
landed blow.

### 6. Two more mutters

**Three steps.** Watch a ratkin of yours (or theirs) kill somebody; watch an ogre kill somebody.
Rare by design (a kill wins the round's one line about half the time, and only after three rounds
of silence).

**What should happen.** *"You ugly and you know it."* over the ratkin, *"I'm loving it."* over the
ogre. Both are your own words and are unchanged.

**What would be a bug.** Either line through a face; either on a dog or a monster; either in the log.

### The dials, and they are yours

`REINF_ODDS` (.5) · `EMBER_HIT`/`BURN_TICK`/`BURN_TURNS` (6/4/2) · `blazeOdds` on `rocky` (.5) and
`forest` (.35) · `SURE_AFTER` (2; 0 switches it off). Each is one constant with the rule beside it.

---

## 🗣 THE BODIES MUTTER, THE CAPTAIN GETS A FACE, AND EVERY PERSONALITY COSTS SOMETHING  *(#185 · 2026-08-17 · build log 8f.205)*

**Where it came from.** Your three voice notes in one paste: the units shouting something small,
the tutorial coming from your own character instead of a black screen, and every personality
needing a downside stated without blah-blah words.

### 1. The mutter: a second voice on the field

**Three steps.** ⚙ DEV.MODE → the practice field → any fight, any company → take the field. Then
just watch a fight through.

**What should happen.** Two or three times in a fight, somebody says something small in italic
quotes above their own head. It is **never an instruction** - it names nobody, gives no number,
asks for nothing. The voice is the **race**, not the class: a ratkin is loud and hungry
(*"Let me see his guts."*, which is your line), an ogre is slow and literal (*"Ow. That was
rude."*), a human is tired and professional (*"Nothing personal, friend."*).

Roughly **2.74 lines a fight**, spread evenly across the rounds rather than bunched at the start -
there are at least three rounds of silence between any two. One line per body per fight, and it
never repeats a line it has already used. The four moments are ranked, so the heaviest thing that
happened in a round is what gets said: a kill, then somebody dropping near death, then taking a
fifth of their body in one blow, and an ordinary landed blow last and rarest.

**What would be a bug.** A line printed **through somebody's face** (this was real and was fixed:
the first cut cleared a ratkin and went straight through every ogre). More than about four in one
fight, or all of them in the opening two rounds. A **dog or a monster** talking. A mutter appearing
in the fight log on the left. Anything with a name, a number, or a place in it. Two of them at
once, or one on top of a Captain's card.

### 2. The Captain's lines use the tutorial card now, and they stop the fight

**Three steps.** Play the tap-room brawl, then a second and a third battle. Watch what happens when
the Captain has something to say.

**What should happen.** **The parchment speech bubble is gone.** Every Captain's line now arrives on
the same card the first battle's lessons use: the screen dims, a ring lands on **the thing being
talked about**, and **the fight stops until you click**. Your own portrait is on the card, and the
words are exactly the words they always were - nothing was rewritten, it just has a face on it now.

This is the three things you named. The bubble hung off whichever hex the Captain was standing on,
which is the *"random places"*; it ran for 2.2 seconds while the enemy kept moving underneath it,
which is the *"strange"*; and it never stopped the clock, which is the *"it should stop other
actions until you press anything"*. All three were one defect.

A heavier line wears a thin coloured stripe down its left edge. You are not meant to read the
taxonomy, only to feel that some are weightier. SKIP TUTORIAL appears only on actual lessons.

**What would be a bug.** A speech bubble anywhere. A card with **no face**, or the **wrong person's**
face after you start a new company. The fight carrying on underneath a card. A ring pointing at the
Captain when the line is about somebody else. A SKIP TUTORIAL button on a line that is not a lesson.
A card left on screen after a fight ends.

### 3. Every personality states what it gives and what it costs

**Three steps.** Open the company sheet (🎒), then the inventory, then hover a body mid-battle.

**What should happen.** One line per person, in **mechanics and not mood**, with the upside and the
downside split by a `·`:

```
veteran   | +4 to hit, +4 dodge · −1 AGI, −8 hitpoints
courage   | +14% melee damage · CANNOT DISENGAGE
grudge    | +20% damage against whatever last hurt them · −6 to hit against anything that has not
```

The old lines (*"Finishes the wounded."*, *"Old hand. Bad knees."*) are gone - they read nicely and
told you nothing about what the person did. The **flavour paragraph is untouched** and is still what
the hover shows; this is the decision, that is the character.

**Four personalities had no downside at all** and now do. There are **five new ones**:
**Frightening** (−6 morale to everyone within 2 hexes, *including yours*), **Owes somebody** (half
wages, but takes a missed payday twice as hard), **Slow to warm up** (bad for two rounds, good from
the fourth), **Keeps a list** (+20% against whoever last hurt them, worse against everybody else),
and **Cannot be quiet** (+4 to hit for every ally beside them, and the enemy comes for them first).

**What would be a bug.** A personality whose line is a sentence of mood rather than numbers. A line
that says a number the fight does not then use - every one of them prints its own row in the hit
breakdown, so you can check. A trait with no downside. The three screens disagreeing with each other.

---

## ⚖ THE SUB-LINE IS A RECEIPT, AND EIGHT MORE OF YOUR NOTES  *(#176-#184 · 2026-08-17 · build log 8f.204)*

**Where it came from.** Your eleven-item batch the same day, against four screenshots with the
offending lines boxed in red. Everything below is one of those eleven.

### 1. A door's sub-line says what it costs, and nothing else  *(#176, #176's other half is item 7)*

**Three steps.** Play to any road card with more than one door. THE COLLECTOR is the one in your
screenshot.

**What should happen.** Every sub-line is now **the price, then the mood, then the gate**, and
nothing else: `−◉4 · morale +10` · `+◉25 · morale −7` · `no cost`. *they think better of you*,
*they will remember this*, *quietly approved of* and sixty more clauses like them are gone from
every card, every camp ruling and the shop's walk-away.

**⚑ The part worth knowing, because it changes what you can trust.** Deleting those clauses
literally would have deleted four PRICES: THE HANGED TOLL-MAN charges a day and pays 38 crowns on
its four doors, and its four labels read *"it will cost you the afternoon"*, *"he has no further
use for either"*, *"good wood · tired men"* and *"nothing is left standing here"*. On that card the
prose **was** the receipt. So the cost is no longer typed by hand at all: it is read off the same
`fx` object the game charges. **The first thing that did was catch a lie** - THE RATKIN WATERWORKS'
second door said `+1 salvage` and the game has always paid **2**.

**What would be a bug.** A door whose sub-line shows a number the top bar does not then move by.
A door that now shows nothing where it used to say a price. A gate (*needs a ratkin*, *cannot
afford*) that stopped printing. A piece of gear that vanished from a door's line (*a shield*, *a
two-hand maul*, *an off-hand dirk* all still print).

### 2. The second objective is one recruit, and it closes itself  *(#177)*

**Three steps.** Start a run. The card fires on the first road, before Blood on the Road.

**What should happen.** It reads *"Recruit at least someone else to your party."* The plate row
counts *"You are 4 of 5."* The moment anybody joins - the muster wall, the clash, a fire - you get
**morale +10**, a line at the bottom of the screen, and **the row disappears from the plate**.

**⚠ One trade you should know about.** Taking a side at Blood on the Road hands you a body for
free, so this will often be paid by the very next card. That is deliberate now: it is the first
thing the game asks and its job is to be finished. If you would rather it asked for something,
say so and it goes back to two.

**What would be a bug.** The row still there after it is paid. The row saying · DONE. No +10.

### 3. The road interrupts less, and less often about a boot  *(#178)*

**Three steps.** Walk three or four long legs and count what stops the wagon.

**What should happen.** About **a third fewer** interruptions, and the drop lands on the small
stuff rather than the rulings: a vignette is down 42% on a first stop and 37% on a later one, while
the camp rulings are within noise of where they were. FOUND and LOST were **7 of the 12** ungated
vignettes and are now 4 of 9. The horseshoe, the wheel of cheese and the lost knife are gone; the
purse with a milk tooth in it, the cart-spring, the theatrical limp and the bread in the bog stay.

**What would be a bug.** A whole road with nothing on it at all. The debt / kin / fiddler chains
never coming up (they were protected on purpose - the split moved as well as the rate).

### 4. A thing for sale shows the thing  *(#179)*

**Three steps.** Reach the muster field, open the quartermaster's cart. Then Coldharrow's armourer.

**What should happen.** Each row is a **card**: a 60px picture box on the left, the name, the
price, and **what it actually does** in the open - `+9 dodge`, `Hits for 15-22, and reaches 2
hexes`, `Stops 96 damage. HEAVY: 75% of every blow stops in it and 25% reaches the body, and it
costs 10 dodge.` The box holds the item's glyph today and is sized so a **painting** drops into it
later without anything around it moving.

**⚠ This reverses half of #157 on purpose.** That note said *"under the shop choice do not give a
lot of small text"* and the fix took the numbers off with the atmosphere, so a buckler and a round
shield were the same word and the same money on screen. The atmosphere is still last and still one
clause; the arithmetic is first.

**What would be a bug.** Three rows showing the same glyph when the items are different KINDS. A
description running under the box instead of beside it. A price that disagrees with the chest.

### 5. "Back to the road" says nothing underneath it  *(#176)*

**Three steps.** Win a fight, lose a fight, withdraw from one, finish any road card.

**What should happen.** The button is just **Back to the road**. Five captions went (*the company
can move again*, *you are still on it, which is the whole of the good news*, and three more).

**The two that survive, and why.** The greyed one on the mercy screen keeps *"there is still
something to settle"*, because a dead button owes the click an answer - and it loses the line the
moment the question is answered. Coldharrow's keeps *"2 roads out of here, 1 day or 3 days to the
next stop"*, which is a fact about leaving and not a mood.

### 6. The aftermath stops at the fact  *(#180)*

**Three steps.** Beat the Thing in Armour. Then the tavern brawl, then any ordinary fight.

**What should happen.** IT COMES APART is **two paragraphs, 58 words** where it was four and 128.
It keeps the plates sitting in the shape of a person, the smell, and nothing to bury; what went is
the sentence explaining how to feel about them. The band is now written down: **14-60 words for an
ordinary fight, up to 90 for the three that carry an act** (the brawl, and the two endings).
Measured before: 15 cards, 867 words. After: 702.

**What would be a bug.** A card that lost the one detail it is remembered by. NINE COATS IN THE
ROAD is now **COATS IN THE ROAD** on purpose - it was counting bodies and item 10 changed the count.

### 7. Real numbers on the fork, and a picture of each road  *(#181)*

**Three steps.** Walk to any crossroads. There are three on the map.

**What should happen.** Each road is a **Hades-style boon card**: the node's own painting at 64px,
its name, one line of `N days · ~lo-hi fights`, and the danger word. The footnote under the title
is gone - the join moved **into** the title, so it now reads **TWO ROADS TO THE DOOR-SHRINE**.

**⛔ And the numbers changed, because the old ones were wrong.** The sign counted map nodes typed
`battle` and printed floor-to-floor+1. Measured across all three forks: **not one road on this map
holds a fight the company cannot refuse.** The Broken Men open with *"No."*, the Stone Field can be
walked around, the Hill Steading has three doors before the fourth. Three roads were reading
*"~1-2 fights"* and three *"~0-1"*, and the honest answer on all six was **0 forced**. It asks the
cards now: every door a fight means no way through, some doors a fight means one you can take or
refuse. It also sees the Fen-Mother, who is typed `weird` and was invisible to the old count.

**⚑ It moves with the run.** On a run that dealt the wedding onto a road, that road went from
*"~0-1 fights, PEACEFUL"* to *"~0-2 fights, TROUBLE"* - which is your own *"sometimes some events
have battle of your choice"* arriving as arithmetic. Your rule 11 is intact: still always a span,
never a bare count.

**What would be a bug.** Two roads out of one fork reading identically. A road with a painting on
the map showing an empty frame here. BLOOD appearing on a fork (nothing on today's map can earn it).

### 8. Nobody starts a fight already routed  *(#182)*

**Three steps.** Run the provisions to **zero**, let the mood fall, then take a fight.

**⛔ What was happening.** Driven against the last shipped build in a second tab: an empty larder
with the mood at the bottom started **4 of 4 of your line on the BROKEN rung** - white flag,
running for the edge, before a single action. With the Circle in the company it reached .004 of a
nerve bar. The clamp that was supposed to stop this ran in `unitFrom`; the hunger penalty runs
*after* it and floors at an absolute 10 against a nerve ceiling of 81-93.

**What should happen now.** The same company opens at **BREAKING** - one rung up, one bad turn from
going, which is the *"possible almost broken"* half of your note. A fed company and a merely
miserable one are **byte-identical to before**: the floor only ever fires under the last rung.

**What would be a bug.** Anybody on 💀 Broken on round one. A fight where a hungry company feels
*better* than a fed one.

### 9. The first Hold patrol comes one crest short  *(#183)*

**Three steps.** Get the enforcers' road stop and take the fight.

**What should happen.** Two crests instead of three (the serjeant and one corporal), which takes
the pole-axes from two to one and leaves the bill line, the bow and the hound alone. The door's own
receipt says *"two crests"* now, and the aftermath stopped counting bodies.

**⚠ It is a bigger move than it sounds and the numbers are here so you can call it.**
`ARENA.match('prepared','hold',15)`, a seasoned six, one variable at a time:

| the line | wins | of yours down |
|---|---|---|
| serj + 2 corp + 2 bill *(shipped)* | 9/15 | 3.9 |
| **serj + 1 corp + 2 bill** *(this)* | **14/15** | **2.6** |
| serj + 1 corp + 3 bill | 11/15 | 2.9 |
| serj + 2 corp + 1 bill | 12/15 | 3.0 |

**If it now reads as a walkover, say so** - the third row is one line in `holdFoes` and it sits at
73%. ⚠ And it does nothing for a small company: the starting four lose 1/15 before and after,
because that fight was never theirs to win.

### 10. The survey is three questions and the report is yours  *(#184)*

**Three steps.** Menu → the playtest notes. Then "Answer the questions".

**What should happen.** **Three** questions (where you stopped, what you liked, what you disliked)
instead of seven, plus your name and the difficulty picker. The report is titled **YOUR RUN** and
shows six facts: days, time at the keyboard, how it ended, and what you loved / liked / disliked.
One button. **The raw JSON blob and EVERY DECISION IN ORDER are gone from your view** - they still
travel in the copy, and they still show under ⚙ TEST or when you paste a friend's journal in.

**What would be a bug.** The copy button copying less than it used to (it should still carry the
letter *and* the whole journal). Anything you typed into the four retired questions being lost -
it is still exported, just not quoted.

---

## ✦ EXPERIENCE - THE LEVEL IS EARNED, HALF BY THE COMPANY AND HALF BY THE HAND  *(#174 · 2026-08-17 · build log 8f.202)*

**Where it came from.** Your brief the same day: *"give some expiriences, rather then 1 lvl per
battle ... first lvl 100 ... 0 lvl, where character doesnt even have a class ... +-50% of
expirience shared between party"*, then your seven rulings on the research
([`XP_BENCHMARK_2026-08-17.md`](XP_BENCHMARK_2026-08-17.md)). **The random promotion after a fight is
gone.** Every body carries experience, a won fight pays it, and a level is a threshold on it.

**How to reach it in three steps.** New run → win the tavern brawl and Blood on the Road → open
🎒 the company. Then hire at **The Muster Field** and look at the third face on the wall.

**The picture:** `shots/174_after.html` (live captures of the aftermath, the sheet, the stranger).

### 1 · After a fight, every crew card prints ✦ +N

The fight is worth **1.5 × the enemy's hitpoints** (+40 for a body wearing the crest). **Half is
split evenly over everyone who stood in it** (down or fled or not), **half by damage dealt + 15 a
kill**, then × the body's own learning rate (intellect: 5 → ×.88, 9 → ×1, 14 → ×1.15). Cumulative;
a human needs **100 · 250 · 450 · 700 · 1000 · 1350 · 1750 · 2200 · 2700 · 3300** to reach levels
1-10, a ratkin ×.8 of that, an ogre ×1.2. Ten is the cap and it stops accruing.

- **Should happen:** the ✦ on each card is that body's own take; the gold frame and *level N ·
  spend it on the sheet* appear on **whoever crossed a threshold** - none, one, or several. The
  Pack, measured: You +67, Vesna +100 (three kills), Marrow +66, Ilka +96 → level 2.
- **A bug:** any ✦ number on the battlefield itself (you ruled *"on the battlefield none"*), a body
  that stood in the fight with no ✦, or a ✦ on somebody hired after it.
- ⚠ **The tavern brawl pays too**, but that screen is a strip since #138 and has no crew card: the
  ring on the sheet is where you see it.

### 2 · The level is a ring, on the sheet and round every roster bust

Where the LEVEL chip was: a **26px ring with the level inside it**, the gold arc is how far to the
next, hover reads *"110 of 300 · 190 to level 5"*. Every roster bust wears the same ring at 42px
with no number (the row still says `L4`). At the cap the ring is full and the hover says *"as far as
they go"*.

- **Should happen:** the ring is progress and never a receipt - it never says what the last fight
  paid, the crew card does. The ★ (unspent level) is untouched and still the thing that says
  *spend it*.
- **A bug:** a ring that reads over full or backwards; a roster row that got taller (measured
  65/63/77/65 for the four, identical to before).

### 3 · Perks sit at levels 2 · 4 · 6 · 8 now, not 2 · 3 · 4 · 5

Same eight perks a class, spaced over the whole run. Level 2 perk, 3 stat, 4 perk ... 10 pays a
stat (its perk turn meets an empty tier and becomes a stat, the rule that already existed).

- **Should happen:** the ★ PERKS tab shows LEVEL 2 / 4 / 6 / 8 headings; a body at 3 has one perk
  and one stat point spent.
- **A bug:** a level whose point evaporates.

### 4 · One of the three on every muster wall has no trade

The row reads *NAME "nick" - ○ no trade yet, human · 41 crowns · 2 room · 2/day · picks up a trade
at the first level*: **a quarter cheaper**, because he brings a cudgel and no trade. On the sheet his
chip says **NO TRADE YET**, the roster says `L0`, he has no signature and no perk tree, and he
fights with what he holds.

- **Should happen:** his first level (100 XP; the Fen alone pays him ~100, two ordinary fights
  ~93% of the time) puts a ★ on him and *A TRADE TO PICK. THE ★ PERKS TAB* on his sheet; the tab
  offers **the trades of his race** as cards; picking one sets it for good and **puts the trade's
  tool in the stash** for you to hand over. The road bar's ★ chip counts him and clicking it opens
  his tab.
- **A bug:** two strangers on one wall (measured exactly one on 30 walls); a stranger from an event
  (Pell, the Sitting Stone ogre) - those always arrive with a trade; a level-1 stranger with no ★.

### 5 · A door may pay experience

`xp:N` in a door's fx pays every body on the roster (each × their learning rate) and prints a
**✦ LEARNED** chip beside the others. **No card uses it yet** - the hook exists for *"extra events -
items"*, the camp's *Train* verb and a gear multiplier are still unbuilt.

### The measurement, so you can argue with the dial

`XP_PER_HP` was set by the harness, n=20 runs × the eight authored fights, both brains: at the
spec's first guess of 2 a six-body company's founders finished at **4.7** and one of them was over
level 5 in a quarter of runs; at 1.4, **3.8** with nobody under 3 or over 5. **1.5 lands ~4.0 for the
six-body company and ~4.6 for the bare four**, which is the act-1 target (level 4 ± 1 at the Snare).
⚠ **The hand half favours the archer and the caster and starves the spearwoman**: over the eight,
Ilka finishes about a level ahead of Vesna. That is the brief's *"damage dealt and kills"* doing
exactly what the peers said it would, and it is your call whether the hand half should also count
damage TAKEN and the class verb (one line in `payFightXP`).

⚠ **Only act 1 exists.** Levels 5-10 are a promise about acts 2-4 and rising enemy tiers; nothing
here builds them.
## ⏱ THE SHAKE COMES BACK A QUARTER, AND FOUR CAPTIONS GET FOUR LINES  *(#175 · 2026-08-17 · build log 8f.203)*

**Where it came from.** Your two notes the morning after #173: the icon shaking after a strike is
too long, take 25% off; and when a couple of effects land together (backstab and damage) they print
on top of each other.

**How to reach it.** Front door → **The practice field** → any fight → hit somebody in the back.

### 1 · Everything about the impact is a quarter faster

`--hitp` went 2.5 → **1.875**, which moves all fifteen impact durations at once. The recoil is
**1.44s** (was 1.93) and the lunge **1.12s** (was 1.49). Both are still nearly double what they were
before yesterday, so the blow is still watchable, just not lingering.

- **A bug:** it going back to feeling like a flicker. One number, say the word.
- ⚠ The **floating caption is unchanged** (`--fxp`, 3.5s). You asked about the *shaking*, so only
  the bodies and the burst moved. If the number now feels like it outstays the blow, that is a
  separate knob and worth telling me.

### 2 · A backstab and its damage now read as a list

Hit somebody in the back with armour still on and you get four things at once: **BACKSTAB!**, the
hitpoint figure, the armour figure and a morale pip. They used to be drawn at exactly the same
point. Now they stack down the hex in the order they happen, each one arriving about an eighth of a
second after the last, so it reads as a sequence.

- **Should happen:** four separate lines, headline on top, nothing touching.
- **A bug:** any two lines overlapping, a line appearing at full brightness and then blinking out
  before its turn (that was a real defect in the first cut), or the column running so far down the
  board that it covers the body in front.
- *Measured on a real backstab: 0 overlapping pairs, smallest gap 3.0px, whole sequence opens inside
  0.37s.*

---

## 🩸 THE FIGHT SLOWS DOWN, AND THE HEXES STICK TOGETHER  *(#173 · 2026-08-17 · build log 8f.201)*

**Where it came from.** Your ten-item batch on 2026-08-17. Nine were about the fight reading badly;
the tenth arrived mid-session (*"somehow hexes get broken and scattered across the field"*) and
turned out to be a real grid bug that has been in the build since before #105.

**How to reach it in three steps.** Front door → **The practice field** → start any fight. Every
item below is on that one screen except where it says otherwise.

### 1 · The blow is twice as slow, and the number hangs

A hit and a skill now run at **base × PACE × 2.5**. At the shipped speed a lunge is ~1.5s and a
recoil ~1.9s, where they were 0.6 and 0.8. The damage number climbs fast and then **holds still for
two thirds of its life** instead of drifting the whole way up.

- **Should happen:** you can watch a single blow and see who hit whom without replaying it.
- **A bug:** the fight feels like it is *waiting* rather than *swinging*. The knob is `--hitp` in
  `:root` and it is one number - tell me and I move it. The caption has its own (`--fxp`).
- ⚠ The **turn hand-over and AUTO are untouched** on purpose. If the whole game feels slower rather
  than the blows, that is a bug and not the setting.

### 2 · The attacker's model actually moves now (this is the third attempt)

You have reported this twice before and both fixes were aimed at the wrong thing. **It was never
too small - it was being deleted.** The board redraws one statement after the blow starts, and the
animation was going onto an element that no longer existed. It survives the redraw now.

- **Should happen:** on **your own** turn, your body leans into the target and comes back; the
  target is knocked along the same line and rattles to a stop.
- **A bug:** any body that snaps, jumps, or plays the first frame twice.

### 3 · More blood, and pools that run into the next hex

Six to thirteen drops a hit (was three to seven), bigger, with a fat gobbet every fourth one. The
floor stain is wider than its own hex so two stained tiles read as **one puddle**, and a hex that
takes three blows **runs off into a neighbour** - downhill, one hex per blow, never a flood.

- **Should happen:** after a long scrum the board shows you where the fighting was.
- **A bug:** the pool spreading faster than the fighting, or a tile going so dark it looks like a
  hole in the ground.

### 4 · Big models no longer own the ground behind them

This was your *"прям большая проблема"*. Creature sprites overhang their own tile, and the sprite
was **eating the clicks and hovers** on the hexes behind and beside it - which are exactly the
hexes you walk to get round to somebody's back.

- **Should happen:** every hex around an ogre or a great beast takes your cursor, gives you the
  boots, and walks you there. The body itself is still clicked and still hovered, on its own tile.
- **A bug:** any hex you cannot reach with the mouse, or an enemy that has become hard to click.
- *Measured: the sprite was stealing 49 of 1305 probe points board-wide and 12 of 54 around the
  ogre. Both are zero now.*

### 5 · The zone of control is the front three hexes ⚠ THIS IS A RULE CHANGE

You said control does not work from behind, and you were describing something the game did not do
yet - so the **rule** moved, not just the picture. A body now holds the **three hexes it faces**.
Its flanks and its back are free: step round to a shoulder and you can walk away for nothing.

- **Should happen:** the red-edged hexes are only in front of each enemy. Walking off one costs
  half a blow; walking off the other three costs nothing. **DISENGAGE only appears when somebody is
  actually facing you.**
- **A bug:** a free swing from a hex that was not red, or a red hex behind somebody.
- ⚠ **Being surrounded is unchanged** - a body at your back still counts against you for the
  flanking bonus and for nerve. It just cannot stop you leaving. That is deliberate.
- *Balance: 100 arena fights each way, 66 wins against the old build's 67. It does not make the
  game easier or harder; it makes going round somebody worth doing.*

### 6 · The enemy's reach shows the instant you point at them

The stat card still waits its 2.2 seconds. The **reach and threat wash does not** - it is on the
board on the first frame of the hover, like the shot lane already was.

- **A bug:** the big stat panel appearing instantly (it should still wait), or the wash lagging.

### 7 · A skill that cannot reach says so in the cursor

Pick a blow, then move over ground it cannot touch: the hand goes **dim with a red ⊘ over it**. The
sword, the arrow and the working each keep their own picture, so you can still tell which skill is
being refused.

- **A bug:** the pointer jumping when you cross the boundary (the hotspot is deliberately identical
  on both), or the ⊘ appearing on ground that IS in range.
- ⚠ It is about **distance only**. A hex in range with no line of fire still says OBSTRUCTED /
  BLOCKED on the hex, which is a different refusal.

### 8 · The arrow flies slower

420ms → up to 760ms. It now lands **while** the target is still reeling instead of after it, which
is a note #81 left open and could not fix until the recoil got longer.

### 9 · The surround badge lost its number

The ⊛ under a surrounded body is bare. The count is in the hover: *"Surrounded ×4 · Each one swings
at +51 to +66…"*. **×4 and not (4)** on purpose - every other number on that row is a countdown.

### 10 · The hexes interlock ⚠ LOOK AT THIS ONE FIRST

Odd rows were indented **27px where the geometry wants 19**, so the points never landed in the
valleys and the board was two grids laid over each other. #105 found this exact number in 2026, wrote
down that 19 was correct, and then taught the ground-painter to match the mistake instead.

- **Should happen:** a clean honeycomb, everywhere, at all three camera stops.
- **A bug:** any seam, or terrain that has come unstuck from its tile.
- *The board is 8px narrower now (588, was 596). If anything ever looks cut off at the right edge of
  the field, that is where to look.*

---

## 🔤 NOTHING SMALLER THAN 10px, AND THREE SCALES BEHIND IT  *(#164 · 2026-08-16 · build log 8f.192)*

**Where it came from.** You brought the Turn-Based Games Discord `#dev-feedback` channel and asked
for the standard notes as a checklist. Four different developers there got told the same three
things in one week: standardise your outlines, standardise your fonts, standardise your padding.
Grimtoll failed all three by measurement: **29 font sizes** (including a `7.6px`), **7 near-identical
border hexes** at 88 sites, **72 paddings**, and **77 declarations at 9px or smaller, down to 7px**.
Your call on the floor: *"Minimum font i feel, nice to be 10"*.

**How to reach it in three steps.** There is no new screen. Open **any** screen and read the small
print: the role line under a name on an action card, the slot labels on the company sheet, the
odds and damage on a hex, the round counter in the battle log. **Every one of them is 10px now**,
and the whole checklist plus the standing rule is in
[`.claude/rules/ui-scales.md`](../.claude/rules/ui-scales.md).

**What should happen.**

- Nothing on any screen is smaller than 10px. Step back from the monitor: the channel's own test.
- Panels edges are five colours, not seven. Nothing should look *different*, because two of the old
  pairs were indistinguishable anyway.
- **Five boxes were grown to pay for the bigger text** and these are the ones to actually look at:
  - the **action card** in battle, 72x86 to **80x90**. The role line under a skill name (GUARDS
    ALLIES, and the like) was being cut off mid-word at 10px and now fits. Nine cards still sit
    inside the band with room.
  - the **damage figure on a hex** dropped 3px so it stops printing through the odds above it.
  - the **count badges** on a company chip and on a sheet tab, 14px disc to **16px**.
  - the **reaction row's label column**, 78px to **86px**.
  - the **speaker name** in a road call-out bubble: tighter tracking, wider clamp.

**What would be a bug.**

- Any text that reads cut off, ellipsised where it did not use to be, or wrapped onto a line that
  overlaps something. That is a box that needed growing and did not get it.
- A number on a hex touching another number on the same hex.
- ⚠ **And the one place this may have cost you something.** #111 took the hex odds and damage
  *"a fifth smaller at your word"*, because at the CLOSE camera stop the pair was shouting over the
  bodies they describe. The floor puts them back up. **If they shout again at the close stop, say
  so**: the fix is dimmer or narrower, never smaller.

**What was measured, so you know what is already proved.** In the running build, against a second
tab serving the previous commit: elements rendering under 10px went **58 to 0** in battle, **43 to 0**
on the skirmish setup, and 0 on the menu, the map, the prologue and all three company-sheet tabs.
Clipping overflow held at its pre-existing 2. `LINT()` 0 findings, and the map's three counters 0.
**Not proved:** the road event card and the camp, because the walk animation between map nodes never
finishes in the preview pane. Those two screens are worth your eye first.
## 🩸 THE FIGHT HAS WEIGHT - EIGHT SMALLER FIXES  *(#165 · #169 · #170 · #171 · 2026-08-16 · build logs 8f.193 · 8f.197 · 8f.198 · 8f.199)*

**Your list of eight, in one session.** Everything below is on the battle screen except item 4,
which is the tap-room brawl. Fastest way in: **⚙ TEST → AUTO → any fight** for 1-3 and 5-8, and a
**fresh run** for 4.

⚑ **Two of these were already built and reading as missing**, which is worth knowing before you
judge them: the attacker's lunge and the defender's recoil have been in the game since #87, and the
default red edge has always been the parting-swing zone. What changed is that they are now loud
enough to be seen. If they still read as absent, that is a real finding and not a repeat.

### 1 · A BLOW LANDS AND THE BODY SAYS SO  *(1.1, 1.2)*

**Reach it in three steps:** any fight → walk up to somebody → swing.

**What should happen.** On a **hit**: the attacker leans into it, and the target is **knocked back
along the line of the blow and then rattles back to true** - two beats, not one. On a **dodge**:
the target leans clear, 8px, with a rotation and a slight fade. On a **plain miss**: the target
gives a small 3.5px flinch and nothing else. **All three are meant to look different from each
other**; that is the whole point of the change, and the dodge/whiff pair is a rule from #84 that
this entry kept rather than deleted.

**What would be a bug.** A body that snaps back to true mid-rattle (that is the class being
stripped early) · a dodge and a whiff that look the same · an archer *lunging* across the board on
a missed shot · nothing at all on the target of a missed **shot** (it should flinch too).

### 2 · BLOOD, AND IT STAYS ON THE FLOOR  *(1.3)*

**Reach it in three steps:** any fight → land three or four blows on the same body → look at the
ground where it was standing.

**What should happen.** A landed blow throws **3 to 7 drops** that fly out along the swing and
**fall** (they are not sparks; they have gravity). The hex keeps a **dark stain at the feet**, it
**darkens as more blood is spilt there** (four blows is the ceiling), and it **stays for the rest
of the fight** - so by the last round the board shows where the line actually held. The man who
bled walks out of it and the stain stays where it was.

⚠ **Armour that turns a blow leaves nothing.** White ring, brighter sparks, no drops and no stain.
That is deliberate: the floor only records wounds that reached flesh.

**What would be a bug.** A stain that vanishes on the next redraw · a stain that **moves with the
body** · blood under somebody whose armour held · a stain painted *over* the token instead of under
its feet · stains still on the board in the next fight.

### 3 · WILL-KICK  *(2)*

**Reach it in three steps:** start a run → look at Marrow's cards → the cantrip.

**What should happen.** The spell called **EMBER** is now **WILL-KICK**. Nothing about it changed:
cost 1, 5 nerve, range 2 in the bare hand and 4 with the working stave, 10-16 damage that mostly
ignores armour, once a turn, and it still does not count against your one working a turn. The ✸
mark is unchanged. **The word "EMBER" should appear nowhere in the game.**

### 4 · A CAPTAIN IS A STAR AND NOTHING ELSE  *(3)*

**Reach it in three steps:** any fight → look at your Captain → look at the enemy chieftain.

**What should happen.** The **star that used to float above the head is gone**. The star is now in
the **corner badge**, where the class glyph used to be - so a captain wears **one** mark instead of
two. Yours is **larger and pale gold with a glow**; an enemy captain is **smaller and dimmer gold**.
Everybody else keeps their class glyph (⚔ sword · ➹ bow · ⌇ spear · ✷ caster · ⬢ great beast).

⚠ **A broken captain now shows BOTH** the white flag above the head and the star in the corner.
That is new and intended: they used to share one anchor, so a routed captain stopped being
identifiable at exactly the moment you most wanted to know who was running.

### 5 · THE TUTORIAL BRAWL KEEPS FIGHTING  *(4)*

**Reach it in three steps:** wipe the save → start a new run → play the tap-room brawl to the point
where Harl breaks and runs for the door.

**What should happen.** **Nothing interrupts.** The card headed **"THEY ARE ALL RUNNING"**, which
offers to end the fight, **must not appear during the brawl**. Harl runs, goes out of the door, and
**the barman and the knife come in, then the crew** - the script carries on to its own ending.

**What would be a bug.** The card appearing at all · the fight ending when Harl leaves the room ·
the waves not arriving. ⚠ **Outside the tutorial the card is unchanged** and still fires when a
field of beasts is all running, which is worth checking once so you know it was scoped and not
deleted.

### 6 · STACKS COUNT IN FRONT  *(5)*

**Reach it in three steps:** any fight with ratkin → let two of them poison the same body → look at
the badge over its head.

**What should happen.** **`2☣`**, not `☣2`. One stack is still a bare `☣` with no number. The
badge's hover still says how many.

### 7 · A STATUS SAYS WHAT IT DOES AND STOPS  *(6)*

**Reach it in three steps:** any fight → hover any status badge over any head.

**What should happen.** Every one of them now **opens on a number or a rule**. *Poisoned* is
"+15% damage taken per cut, two rounds. Nothing caps it." *Crippled* is "Half movement, −10 dodge."
The scene-setting ("An arrow through the leg", "Deep in his cups", "A ring cut round the left eye")
is gone. **230 words to 143 across the eleven written notes, and not one number, gate or condition
was cut.** If a status now fails to tell you something you need, that is the finding.

### 8 · THE THREAT OVERLAY, AND WHAT A HOVER IS FOR  *(7)*

**Reach it in three steps:** any fight → look at the board with nothing hovered → then rest the
cursor on one enemy.

**What should happen.** **By default** the only enemy marking on the board is the **red edge on
hexes a parting swing would cost you** - the opportunity-attack zone, and nothing else. It is a
little stronger than it was.

**On hovering one enemy**, that body's whole envelope appears in two shades: the **darker red is
where he can get to**, and the **lighter band around it is the extra ring his arm adds** - where he
can reach you from somewhere he could walk to. The lighter band is drawn **through your own
people's hexes too**, which is the useful half: it answers "can he reach the man I am about to
stand next to".

⚠ **A bow does not paint the board, and that is on purpose.** The strike band is built from melee
**reach** only. An archer with a stride of 4 and a range of 5 threatens nearly every hex, so
painting that says nothing at all; the game's own AI scores danger the same way. The bow's range
stays on its card and on the lane.

**What would be a bug.** The bands not clearing when the cursor leaves · the bands going stale
after somebody moves · the light band missing from occupied hexes · a hovered *friendly* not
showing the same thing in teal.

### 9 · IT IS EASIER TO WALK AROUND SOMEBODY  *(8)*

**Reach it in three steps:** any fight → get your line right up against an enemy → try to click the
hexes **all around** him.

**What should happen.** The enemy's click pad is now **exactly his own hexagon** rather than a
rectangle a few pixels larger on every side, so the six hexes around him give you their whole
ground back. **Clicking a neighbour to walk there should no longer catch the enemy instead.**

⚠ **He should still be easy to hit.** That was the 2026-08-02 request that put the pad there and it
has not been reverted - measured, the enemy's own sprite is still 18 of 18 sample points his. If a
crowded target has become hard to click, that is a regression worth reporting straight away.

---

## ⚔ THE BATTLE SCREEN, CLEARED OFF  *(#163 · 2026-08-16 · build log 8f.191)*
## ✎ THE TEXT EDITOR IN DEV.MODE  *(#172 · 2026-08-16 · build log 8f.200)*

**Your ask, verbatim:** *"add a tool in dev mod, so if i togled it on i can eddit text on any
screen. I have options: 1) Delete 2) Change + save 3) Add note to AI (to update in future)... so i
can do fast update in the file on my laptop... and then you check it, add your updates where needed
and then push."*

**Reach it in three steps:** ⚙ DEV.MODE on → the stack has a fifth button, **✎ TEXT** → click it.

**What should happen.** The button goes dashed and reads **✎ TEXT ON**, a ledger card opens under
it, and from that moment **every click anywhere lands on the text instead of the game**: the thing
under your cursor wears a dashed gold ring, and clicking opens an editor card with the original
text, a rewrite box, **💾 SAVE CHANGE · 🗑 DELETE**, a note box, and **🗒 NOTE TO AI**. The game
does not act - a door you click on does not open, a fight does not start. The dev chrome still
works (that is how you switch it off), and so do the buttons of any confirm dialog.

**The one idea to hold while judging it:** **what you see change on screen is only a preview; the
RECORD is the deliverable.** Nearly every word is painted from the string tables, so the next
redraw of a screen takes your preview back. That is correct. The ledger (the ☰ button counts it,
and it survives reloads AND ⌫ WIPE HISTORY) is what you hand to me: **⇩ EXPORT** shows the JSON,
**⇩ DOWNLOAD .JSON** drops it in your Downloads on the laptop build, **⧉ COPY** is for claude.ai
where the sandbox blocks downloads. Put the file anywhere in the repo (or just paste the JSON in
chat) and tell me to apply it - I find each `orig` in the source, land it under the card rules,
and push.

**Small print that is deliberate:** Escape steps back (editor → ledger → off). Each ledger row has
a ✕ to drop just that one. A note can ride along with a change in the same save. The mode never
survives a reload; the ledger always does.

**What would be a bug.** A click that reaches the game while armed. Text that cannot be picked
anywhere. The ring on one element and the editor opening on another. An exported `orig` that is
not exactly what the screen showed. The ledger shrinking on reload or after WIPE HISTORY. A
confirm dialog you cannot answer while armed.

---

**Your six, and three of them were one thing.** The token was carrying about 26px of furniture
above its head on a board whose rows are 32px apart, so in a crowd you were mostly looking at other
people's luggage. Everything below is on the battle screen; the fastest way in is **⚙ TEST → AUTO
→ any fight**, or the intro brawl.

### 1 · THE BODIES ARE SMALLER AND THE BARS SIT ON THE HEAD

**Reach it in three steps:** start a run → play to any fight → look at a crowded rank.

**What should happen.** Every body on the board is **10% smaller** than it was, and the health and
armour bars sit **1px above the head** instead of 3. Nothing else in the game changes size: the
order rail at the top, the face on the company sheet and the party token on the road all refit
themselves and should look exactly as they did.

**What would be a bug.** A body that has grown or shrunk *anywhere but the battle board*. A bar
touching or overlapping the head. A bar that is hard to find on a body standing behind two others -
that one is the thing this is protecting and it should still be perfect.

### 2 · THE STATUSES MOVED TO THE FEET

**Reach it in three steps:** any fight → get somebody poisoned, drunk or surrounded → look under
their boots.

**What should happen.** The 🍺 ⇸ ⊛ marks are now in a row **under the body**, on the feet line, and
they are drawn **over** whoever is standing in front. They should never be hidden, however jammed
the board is.

> ⚠ **This one is a deliberate trade and it is the thing to judge.** I measured the naive version
> first: with the badges tucked behind the rank in front, **20 of 40 went more than half hidden in a
> jam, and a single badge 58% of the time** - so there is no legible spot below a head at all. They
> are lifted above every body to fix it, which means **a back-rank body's badges can sit across a
> front-rank body's chest.** If that reads as busy, say so: the alternative is putting them back
> above the head, which costs the footprint you asked to get rid of.

**What would be a bug.** A badge disappearing behind a body. A badge sitting over another body's
*face*. Bodies suddenly painting in the wrong order - the rank in front must still overlap the rank
behind, exactly as before.

### 3 · THE HIT CARD OPENS AWAY FROM YOUR OWN UNIT

**Reach it in three steps:** any fight → stand next to an enemy → rest the cursor on that enemy.

**What should happen.** The card opens on the **far side of the enemy from your attacker**. Stand to
their right and it opens left; stand to their left and it opens right. It never covers the unit you
are swinging with, and it keeps a clear gap from the enemy's own picture. At the edge of the board
it takes whichever side actually fits rather than sliding back over the body.

**What would be a bug.** The card landing on top of your own unit. The card touching the enemy
sprite. The card flickering between sides while you hold still.

### 4 · THE HIT CARD ITSELF, HALF THE ROWS

**Reach it in three steps:** as above → wait for it → read it.

**What should happen.** It waits **2.2 seconds** now instead of 1.2 (but the *second* body you rest
on still opens instantly - that grace is deliberate). It is narrower, and it reads:

```
Harl the carter
95%  CHANCE TO HIT
ARMOUR DAMAGE            14–19
HITPOINT DAMAGE           9–13
──────────────
attack arc     BACK +30 · ×1.25 dmg
surrounded                 +38
your nerve                😐 −5
their nerve               😕 +4
⊛3 Surrounded (3) · 🍺 Drunk
```

**Damage is now directly under the chance.** `your skill`, `their dodge`, `other`, their two caption
lines and the old NERVE row at the foot are **gone**. A modifier worth nothing is not printed at
all, so a plain one-on-one swing shows no `surrounded` row and no nerve rows.

> ⛔ **The rows deliberately do not add up to the percentage any more**, and that is the design
> rather than something missing. What is left is only what you can *change*: where you stand, how
> many of you are on it, and whose nerve is going.

**What would be a bug.** A face that disagrees with its number - 🙂 should never appear on a nerve
row at all (it is the no-penalty rung, so the row hides), and 😐 is always −5, 😕 −9, 😟 −12, 😄 +5.
A row wrapping onto two lines. A row appearing with `+0` or a bare dash in it.

### 5 · THE ENEMY STAT CARD

**Reach it in three steps:** any fight → hover an enemy you are *not* in reach of → read it.

**What should happen.** Same narrower box. On a body with **no personality** there is now **no
italic line at all** - the old *"Its blue overlay is where it can reach next turn"* is gone, because
it was showing on most of the roster and teaching nothing after the first time. A body that HAS a
personality still names it and explains it. The `WHAT IT CAN DO TO YOU` heading only appears when
there is something under it.

**What would be a bug.** A heading with nothing beneath it. A trait line that has lost its
explanation.

---

## ⊛ THE THREE-ITEM BATCH - THE STAVE, THE MOOD, THE SECOND OBJECTIVE  *(#161 · 2026-08-16 · build log 8f.189)*

**Your three, and the first one is the biggest.** A caster's reach used to be decided by his spell
list and by nothing you owned. Now every school is two hexes shorter and there is a stick that
hands them back, so what the caster is HOLDING is the decision.

### 1 · ✷ THE WORKING STAVE, and what a sword costs a caster

**Reach it in three steps:** start a run → 🎒 the company sheet → Marrow.

**What should happen.** He is holding a **Working stave** and not the short sword. Read his act
cards:

| holding | the jab | EMBER | BLIGHT-WIND (or whichever school he rolled) |
|---|---|---|---|
| **Working stave** | 6-10 | range 4 | range 5 |
| **Short sword** | 13-19 | range 2 | range 3 |

**The short sword is in the wagon**, so swap it onto him and watch every arcane card lose two
hexes, then swap it back. That is the whole point of the change: reach, or something you can
defend yourself with when the reach runs out. Bare-handed a caster is at **EMBER 2 · UNPICK 2 ·
BLIGHT-WIND 3 · WITHER 1 · IRON-OATH 1**, which is the floor you set.

**What would be a bug.** A range figure printed inside the note paragraph as well as on the
`RANGE N` receipt line (they would disagree the moment you swapped hands, so all of them were
deleted from the prose). A recruited **mage** off the muster wall who is not carrying a stave. A
caster with the **Magpie-minded** personality whose re-rolled spells come back two hexes short at
the top of a round.

**Worth your judgement, and I could not settle it for you.** IRON-OATH is the one figure that went
UP: it was range 2 and it is 3 with the stave, because 1 is the floor and it had only 2 to give.
And the battle-mage's whole identity was *"a sword and one school"*, so Marrow starting on the
stave is a deliberate call rather than an obvious one - if you want him back on steel by default,
it is one line.

### 2 · 😐 THE MOOD COMES HOME BY ITSELF

**Reach it in three steps:** get the mood off AT EASE (a feast, or a bad card) → walk a long road →
watch the mood chip.

**What should happen.** Every DAY of road pulls the company one step toward **AT EASE**, and the
step is measured in faces, not points: **one face out pays 1 a day, two or more pays 2.** So 😄
HIGH SPIRITS at 45 comes down 43, 41, 39, then 38, 37, 36 once it is only one face out. 💀 ON THE
BRINK climbs the same way.

**⚑ It stops at the EDGE of AT EASE and never walks to zero.** A mood you paid for is not erased:
it settles to the top of neutral (14) or the bottom of it (-15) and stays there. Standing still in
AT EASE, nothing happens at all.

**What would be a bug.** The mood crawling to exactly 0. A day that both fines you 10 for unpaid
wages and hands 2 back in the same tick (the settle runs FIRST in the day, so what you read on the
payday card is what you paid). Anything moving while the company is not on the road.

### 3 · 🏆 THE SECOND OBJECTIVE

**Reach it in three steps:** start a new run → take the only road east out of Grausen Hold → the
card comes up on the way to The Wheel-Rut.

**What should happen.** One card, one button: **HOW FEW YOU ARE**. It asks for **two more bodies
than you started with** (six, from four) and promises **morale +10**. It then lives as a second row
under the contract on the plate top-left, counting up - *"Be 6 on this road. You are 4."* - and the
plate's hover explains it. The moment the sixth body joins, by any door (the muster wall, an ally
at Blood on the Road, somebody walking back in at a fire), the row goes green and reads **DONE**,
the road says a line about the watch splitting into shifts, and the mood jumps 10.

**What would be a bug.** It paying twice, or paying on the practice field. The card firing on any
road but the first. It never arriving on a save you had already started - that one is deliberate:
an older save gets the card on its next road, because a company that has not been told has not
been told.

**Worth your judgement.** Two more bodies is the ask, and +10 is the pay. If it feels like a
freebie the target goes up; if it feels like homework the number comes down. It is also the only
objective of its kind in the run - whether there should be a second one is your call.
## ☠️ THE WEDDING, AND THE FIRST `?` ON THE ROAD  *(#159 · 2026-08-16 · build log 8f.187)*

**Your three asks, built: a fifth door on the wedding that says nothing about what it pays, the
massacre behind it, and the `?` as a standing convention for any door you point at later.**

### 1 · The door, and the question mark

**Reach it in three steps:** walk the road until **A WEDDING ON THE ROAD** is dealt (it is a
floating card, so it lands on a different node every run) → read the doors → look at the fourth.

**What should happen.** ⚔️☠️ **"Cut them all down. Take what they brought."** The sub-line under it
is a single **?** instead of a price. Hover it: *"Nobody here knows what this pays. You find out by
doing it."* The door is red, because a battle door on a card that has another way out always is.

**The rule behind the `?`, since you said you would call the doors that get one.** It hides what a
door **pays** and never what it **charges**: a door you cannot afford still says so, `danger` still
paints it red, and a `?` door is forbidden from taking a day, a coin or a mood point at the moment
you press it. Whatever it costs, it costs on the far side. `LINT` refuses to let a future card
break either half. **Today there is exactly one in the game**, and it is worth keeping rare - three
or four across the road reads as "this one is a gamble", one on every second door is just a font.

⛔ **Would be a bug:** a `?` with a number beside it, or a `?` on a door that took something from
you before the fight started.

### 2 · The fight: ten drunk ratkin and not one weapon

**Reach it in three steps:** take that door → the board → look at the heads.

**What should happen.** **Ten of them.** Five guests with fists, two with a jug, the aunt with the
roasting spit, and behind all of them **the groom** and **the bride**. Every single head wears
🍺 **DRUNK** (-12 to hit, -8 dodge). **Round one, nothing on their side moves** - the log says
*"has not heard you yet"* over each of them, because you started it. Nobody breaks and nobody runs:
you cut down all ten, which is what the door said.

**The groom is the only one who fights.** He carries the crest, he is the only body on the field
still taking two actions a turn, and he is standing in front of her. The bride does 2 to 5 damage
with her nails and does not leave. The aunt's spit is the only thing on the field with reach.

**It is meant to be easy and it was measured.** Mirror-AI, both sides played by the machine: the
**four you start the run with win 20 out of 20** (8.5 rounds, 0.7 of yours carried off), a prepared
six wins 10 of 10 in 5.3 rounds with nobody down. A human plays this better than the AI does.

⛔ **Would be a bug:** anybody at this wedding drawing a real weapon, anybody fleeing, or your
company actually being in danger. ⚠ **It is on the practice field too** (*A Wedding on the Road*),
where the free first round does not happen - that flag rides on the road door, not on the fight.

### 3 · What it costs, and where the bill arrives

**Reach it in three steps:** win the fight → read the aftermath card → look at the chips.

**What should happen.** The haul, drawn from four (the gift-table at +80 crowns, the barrels and
the roast, the clan-silver, or the carts broken down), **and beside it a MORALE chip reading -30**
with the company's own face on it. That is new: **this is the first fight in the game that charges
you for winning it.** The card is called **THE ROAD IS CLEAR**, it says where the two of them are
lying, and it does not tell you how to feel about it.

**Everybody on the roster also keeps a line about it** - *"Was on the road the day the company cut
down a wedding"* - on their sheet for the rest of the run.

**The arithmetic to feel:** the drink door on the same card pays **+16 morale**, so the two answers
are about fifty points apart, which is a mood band and a half. Walking out mid-fight costs 22 and
gets you nothing.

⛔ **Would be a bug:** the morale chip wearing a heart instead of a face, the haul charging morale
on top of the -30, or the fight asking for mercy - nobody at this one is left standing to ask.

### 4 · One race door at a time, and the ratkin's wins

**Reach it in three steps:** have both a ratkin and an ogre in the company → open the wedding →
count the doors.

**What should happen.** **Four, never five.** The ratkin toast is there and the ogre dance is not.
With only an ogre, the dance is there as it always was; with neither, neither. **It is a priority
and not a deletion** - every race door still exists and still fires, the rule only decides which one
is offered when both could be.

⚠ **It applies to the whole deck, so it changes one other card**: on THE SITTING STONE, a company
holding both now sees *"Your ratkin asks him what he is actually waiting for"* and not *"Let your
own ogre do the talking"*. That card had the same five-door problem and nobody had noticed. **If you
want the ogre to win on that one specific card, say so** - the order lives in one list.

⛔ **Would be a bug:** five doors anywhere, or a race door vanishing for a company that has only
that race.
## ⚑ THE HOLD'S MEN, THE PARCEL, AND THE DOOR INTO THE BANDIT CAMP  *(#160 · 2026-08-16 · build log 8f.188)*

**What it is.** The road now keeps a note of the cruel things you do, and two different people catch
up with you near the end of the act depending on what is on it. Then the last camp has a third door.

**The one thing to know before you play it:** the game counts **evil doors** - the ones wearing ☠ -
and nothing else. Lying, robbing nobody, and paying bribes do not count. There are eleven of them
on the road plus two new ones.

### 1. The stop on the road - THE HOLD'S MEN

**How to reach it in three steps.** ① Take at least one ☠ door anywhere on the road (the pedlar's
cart, the tax collector, the salt-wives, the clan cart, the milestone, the war grave, the
waterworks, the toll-post, the shrine door, the warm spring, or finishing the winners at Blood on
the Road). ② Play on to the last fork, past the Warm Spring. ③ Arrive at the quiet slot node between
the fork and the Door-Shrine - **whichever arm you took**. They are standing in the road.

**What should happen.** Riders in one coat, Grausen Hold's mark, three of them crested.

- **With exactly one deed on you** he ASKS: *"Word came west. About &lt;the thing you did&gt;. Was that
  this company?"* Three doors: **lie** (costs mood), **pay 40 crowns**, or **fight**.
- **With two or more** he does not ask, he RECITES the first two by name and the hounds come off the
  ring. Two doors: **pay 100 crowns**, or **fight**.

**What would be a bug.** The card naming a deed you did not do, or naming *"something nobody will
put a name to"*. It firing on a node with a fight on it, or on the node right before one. It firing
twice. It firing at all on a company that has done nothing. The bribe being the only door when you
cannot afford it (it should grey out and leave the fight live).

### 2. The parcel - A RIDER CATCHES UP

**How to reach it in three steps.** ① Play a run taking **no** ☠ doors at all. ② Get to the
Door-Shrine, two roads from the Snare. ③ A boy catches up with the column before the shrine card.

**What should happen.** A parcel with no sender, and *"they said to say thank you. For the road."*
Inside is **The Roll of Names** - the only trinket in the game with no downside (+4 nerve, +8 hp,
+4 to hit). It should show on the card itself before you click, the way the coin does.

**What would be a bug.** Getting it after doing something cruel. Not getting it on a clean run. The
shrine's own card never turning up afterwards.

### 3. The third door at the Snare - ASK TO JOIN THEM

**How to reach it in three steps.** ① Get to the Snare. ② Read the card - there is a third door now.
③ Take it. **What happens depends entirely on the ledger:**

| what you have done | what they say |
|---|---|
| nothing | they laugh at you, and reach for the maul |
| one thing | *"We heard."* Something almost warm in his face, and it does not move. *"Once is a bad night. It is not a life."* |
| two or more | *"You are our calibre of filth. Come in. Eat something."* - and then an arrow goes into the back of the man holding the bell-line |

**If they take you in**, the last fight changes completely: **the clan fights beside you** (their
whole line minus one body) against a Hold host of seventeen. It is meant to be sweaty. It is
measured at roughly a coin-flip, with about three of six carried off and the clan close to wiped.

⚠ **The cage is NOT opened on that path, deliberately.** Wynn Aldreth stays in it, you do not get the
brass token or the Ashmoor contact, and the act ends with the contract unfulfilled. **That is the
price of the door and I want to know whether it reads as a price or as a missing feature.**

**What would be a bug.** The clan fighting you as well as the Hold. Two bodies on one hex. Winning
and landing back on the map instead of on END OF SLICE. Any answer that does not match the table.

**What I would like your call on.** Whether joining them should be **harder** than the honest
finale rather than about the same. Right now bringing eight friends makes it slightly easier, and
what pays for that is losing Wynn - I think that is the right trade, but it is a taste call and it
is yours.

---

## ⊛ THE PLAYTEST BATCH - THIRTEEN NOTES  *(#157 · 2026-08-14 · build log 8f.185)*

**Your thirteen notes, and the first three turned out to be one bug.** The health bar, the status
badges and "show me when somebody is surrounded" were the same fault seen from three sides: the
furniture on a token is nailed to the HEX, and the painted bodies stopped fitting the hex.

### 1 · ⊛ SURROUNDED, above the head

**Reach it in three steps:** any fight → let three enemies get onto one of yours (the Ruined
Steading or the dog pack does it by itself) → look at the top of that body.

**What should happen.** A red **⊛3** appears in the badge row over the head, and the number is how
many are on them. Hover it: *"Three of them on it, and none of them has to watch its own back.
Each one swings at +20. Its nerve pays 5 a turn for every one past the first."* The **+20 is read
off the actual bodies standing there**, so it changes with who is in the ring - a beast gives less
than a clever soldier, and a mixed ring reads as a range.

**It fires at three and not at two, and that is arithmetic rather than taste.** Measured over 2,769
swings across all eight fights: the average chance to hit a body runs **60% with one on it, 72%
with two, 77% with three, 88% with four**, and **17.7% of every swing in the act already lands on
somebody with three or more**. Three is also where the nerve rule hits its own ceiling, so a fourth
body cannot make their nerve any worse.

**It works on THEIR people too**, which is the half worth using: a badge over an enemy means your
line has them, and everyone swinging at them is getting that bonus.

⛔ **Would be a bug:** the badge on the Thing in Armour. It takes no flanking bonus at all - ringing
it is the play that fight exists to punish - so it must stay bare.

### 2 · Health and armour above the head, and thinner

**Reach it in three steps:** any fight → stand one of yours directly behind an enemy → look at the
back one's bars.

**What should happen.** Both bars sit **above** the head, not under the feet, and they are 5px
where they were 6. **The point is that they can no longer be covered.** Before this, a body's bars
were painted into the row in front of it, so whoever stood there hid them - which meant the bar
disappeared exactly when somebody was surrounded.

**Also fixed in the same number:** the status badges used to be drawn **across the face** of every
painted body. They were positioned in #96 against a 43px sprite and the painted ones are 46-56px.

⛔ **Would be a bug:** bars at different heights on the same body between turns, bars overlapping
the head, or a badge back on a face. All three hang off one value now (`--head`), so if one is
wrong they will all be wrong together.

### 3 · The caster starts with two spells

**Reach it in three steps:** new run → first fight → click Marrow.

**What should happen.** **EMBER and one other**, where it used to be EMBER and two. Marrow is the
BATTLE-mage, which is the caster you actually start with, so this is your note applied where you
meet it.

**The pure MAGE class keeps two schools**, and this is the one place I did not do the literal
thing: its whole signature is a **second casting each turn**, and every school has a 2-3 turn
cooldown, so a mage with one school would spend that second casting on nothing, every turn, all
game. If you want it at one anyway, it is one number.

**It does not make fights harder.** A/B'd through the harness, 32 fights a side: **7.0 rounds and
25/32 won with two schools, 6.7 rounds and 27/32 with one.** No detectable difference - the
battle-mage only ever casts once a turn, so the second school was variety, not power.

### 4 · The ! on the sack opens on the person it means

**Reach it in three steps:** pick up any armour or weapon → look for the **!** on the sack chip →
click it.

**What should happen.** The sheet opens **on the person the ! is about**, with the stash in front
of them, instead of on whoever you looked at last.

⛑ **The ★ you asked for in the same breath was already built** (#150). I checked it rather than
rebuilding it: the star chip opens on the person holding the point, with the perks tab open.

### 5 · The Thing in Armour cannot be left

**Reach it in three steps:** take the road that meets it → start the fight → hover WITHDRAW.

**What should happen.** The control is struck through and says **"NO WAY OUT - You feel there is no
running from this one."** Your sentence, on the control.

⛑ **This also closes QA-7**, one of the two rulings that were waiting on you: fleeing this fight
used to delete the Dead Company beat, so THE LONG FIRE one node later talked about *"nine men in a
ditch three miles back"* to somebody who never met them. No fled path, no seam.

⛑ And it found a wrong line: the **tavern brawl** was being told *"the bells are behind you as
well"*, in a tap-room, an act away from the bells.

### 6 · Provisions are never spent behind your back

**Reach it in three steps:** get somebody wounded → walk three or four days → watch the ❦ count.

**What should happen.** **It does not move.** Before this, any day anybody was carrying a wound
cost one provision automatically, and on an empty barrel the mending halved and the mood dropped.
Now the wounded mend for free, and **double rations still costs 3 to mend twice as fast** - so
provisions buy speed rather than paying a fine for being hurt.

⚠ **One automatic drain is left and I kept it on purpose:** a fight that runs past round 11 eats
one provision every second round. It is not a timer, it is the **fuse** that stops a fight running
forever - it was put in after a Fen-Mother stalemate ran 835 rounds in the arena. Your rule would
delete it too. **That one is your call, and I did not take it quietly.**

⚠ **And the thing to watch.** That daily cost was the only guaranteed sink, put there after a
playtest where *a 22-day route never touched the provisions once*. If a whole run now ends with
full barrels, the fix is a better reason to spend them, not the tax back.

### 7 · The chest tutorial says what each one is for

**Reach it in three steps:** new run → get to the map → the first spotlight step.

**What should happen.** Four lines, one per glyph, in the order the bar draws them: crowns,
provisions, salvage, gems. Then one sentence about payday. It used to point at four glyphs and
spend the whole card on the arithmetic of one of them.

### 8 · The muster field, cut down

**Reach it in three steps:** walk to the Muster Field → read the card → hover a stranger's
personality.

**What should happen.** **The intro is one sentence** (it was 100 words, it is 32). Each stranger
shows their **personality as a name only** - hover the dotted underline for what it means. The
quartermaster's cart reads **THE SHOP · 1 of 3**, and the three items show a price and nothing
else, with the description on hover.

👤 **One thing I left and you may want to cut next:** the four-sentence description of each
stranger's stats. Measured live, all three candidates read *"Steady enough"* and *"Easily
frightened"* - so twelve sentences are being spent on something that often does not tell them
apart.

### 9 · The run starts with one bit of junk

**Reach it in three steps:** new run → open the company → the stash.

**What should happen.** **The cook-pot and straps, and nothing else.** The cudgel and the broom are
gone. (The cook-pot IS the "cook pot and straps" - one item, and the only one of the three worth
putting on anybody.)

### 10 · A lost fight can be taken again

**Reach it in three steps:** lose a battle badly enough to wipe the company → read THE COMPANY ENDS
HERE → press **Take it again**.

**What should happen.** You are back at the start of that same fight, with the company, the day,
the purse and the road **exactly as they stood when it began**. Driven end to end here: day 9 went
back to 7, three crowns back to 91, and the fight stood up again with four on their feet.

⚠ **The offer lives for the session only.** Close the tab and the dead company is dead - a replay
is about the fight you just lost, not a save you can come back to next week.

### 11 · Nobody chases a broken dog into a corner

**Reach it in three steps:** the dog pack (or any fight) → break every enemy left so they are all
running → **your next turn**.

**What should happen.** A card: **THEY ARE ALL RUNNING**, and two doors - *Let them go. The field is
ours.* (the fight ends, the haul is the same) or *No. Run them down.* Asked **once** per fight.

**Why it did not already work.** The mercy screen has always ended a fight where everyone routs -
but only where there are **people** among them, because only people surrender. A field of routed
**beasts** had no ending but killing every last one. That was your dog.

⚠ **AUTO is never offered it** - AUTO plays the fight, never the run - so on AUTO the chase still
happens. Take the reins and the card appears.

---

**Verified here before it shipped:** LINT 0 · no em dash in the events · every road door still
wearing its intent · **all eight fights through the regression three times, every one clean** ·
the furniture measured across a live board from a 35px body to a 54px one · the rout card and the
replay both driven end to end in a real campaign fight. **Your save was taken out of localStorage
and written back afterwards, twice.**

**Pictures:** `shots/157_before.html` and `shots/157_after.html`, the same board before and after,
on the build's own CSS.

---

## ⚔ THE PLAYTEST BATCH - TWELVE NOTES  *(#156 · 2026-08-14 · build log 8f.184)*

Your twelve notes from the playthrough. Six of them are on the battlefield, four on the front door
and the map, two on the opening. **Two of these change what you already know**, so read 6 and 8
before you judge them.

Eye check, if you want the before/after in one page:
[`shots/156_playtest_batch.html`](../shots/156_playtest_batch.html).

### 1 · No numbers on the hexes

**Reach it in three steps:** any battle → your turn → look at the teal hexes.

**What should happen.** The wash says where you can walk and **nothing is written on any of them**.
How far you actually go is on the **MOVE card** (`4 HEXES`) and on the plaque, and both read the
same figure the hexes are drawn from, so they cannot disagree.

**Would be a bug:** a digit anywhere on the ground; the MOVE card's hex count disagreeing with how
far you can actually click.

### 2 · Hover an enemy and see where HE can get to

**Reach it in three steps:** any battle → your turn → rest the cursor on an enemy.

**What should happen.** Every hex **he** could reach on his next turn goes **dark red**, including
the ones your own teal preview was covering. That overlap is the point: it is the answer to *can he
reach me where I am about to stand*. Take the cursor off and the board is back instantly.

Now **pick a weapon card first** and hover him again. His reach still shows, **on top of** the gold
footprint the weapon just drew, and his hex keeps the **% to hit and the damage**. That is the
second half of your note: with a blow picked, the board shows where he goes and what the swing
costs, and takes the rest away.

**This one was half-built and invisible.** The tint has existed for a while, but it only ever
painted hexes that had nothing on them - and since MOVE is always selected, everything near you
already had your own preview on it. So it was drawn only where it did not matter.

**Would be a bug:** hovering **yourself** repainting your own reach in a second colour (it should
not); a lit target, a shot lane or the ogre's landing spot being overpainted by a hover; the red
staying behind after the cursor leaves.

### 3 · The front door

**Reach it in three steps:** ☰ MENU (any screen) → look.

**What should happen.** Every row is **one label, larger**, with **no small grey caption under it**.
`YOU CANNOT AFFORD TO BE GOOD TO EVERYONE` is now large display type under the title instead of
11px of spaced-out mono.

**One row still carries figures and it is deliberate:** `Continue the road` says `day 5 · 6 of you ·
Coldharrow` on its own line, at label size, because starting a new company leaves that one for good
and you should not have to press it blind. The old captions all survive as **hovers**.

**Would be a bug:** a second line of small type anywhere in the menu; the rows or the footer running
off the bottom of the screen.

### 4 · Whose turn it is, on the ground

**Reach it in three steps:** any battle → look at the board, not the panel.

**What should happen.** The acting body's **hex** wears a bright hexagon ring that breathes: **ivory
for one of yours**, gold for an ally or the pet, **red for whoever is coming at you**. The sprite
still glows as before.

It used to paint a pale rectangle **behind** the hexagon, so what actually lit up was the seams
between tiles. Against the painted grounds that read as a smudge.

**Would be a bug:** two rings at once; the ring surviving on a body whose turn has ended.

### 5 · A tutorial hint stops the fight

**Reach it in three steps:** MENU → **The tutorial fight** → play until a gold spotlight card
appears.

**What should happen.** **Nothing else moves.** No enemy takes a turn, no round advances, until you
click. Then the fight picks up exactly where it was.

**This was a real bug and worth knowing why:** the spotlight is often raised at the *end* of your
turn, and the code that raised it carried straight on into the next body's turn. You were reading
while a brigand walked.

**Would be a bug:** anything moving under the dim sheet; the fight not resuming after the last card
is dismissed; a card sitting over the after-battle screen.

### 6 · Two actions, everybody, including you ⚠ THIS CHANGES THE FIGHT

**Reach it in three steps:** any battle → look at the ◆ crystals on the plaque, yours and theirs.

**What should happen.** **Two, always.** The two exceptions are the two set-piece monsters that
declare their own count and always did: the Thing in Armour (3) and the Fen-Mother (5).

**Two things went to make this true.** Your Captain used to be handed a **third action once** in the
tap-room brawl, which is the three crystals you saw. And **six enemy bosses took three** - the
ratkin chieftain, the broken captain, the Snare's elder, the Bitch, the Sling-master and the
Steading-elder.

⚠ **This makes the act easier and I measured it rather than guessing.** Sixteen AI-vs-AI runs of
each of the five captain fights: **53 wins out of 80 before, 59 out of 80 after**. Almost all of the
shift is the **Ruined Steading**, which went from 2 wins in 16 to 6. If that fight now feels soft,
say so - it is one line to put the third action back, or to re-tune that fight on its own.

### 7 · No terrain glyph while you are moving

**Reach it in three steps:** any battle → select MOVE → look at a rock, a tree or the fire.

**What should happen.** You see the **painted object** and nothing stamped on it. Hovering it still
tells you what it is (*"A tree. Nobody gets through it, and nobody shoots through it."*), and the
hex is still dark with a hard border, which is what says you cannot walk there.

**The one mark left is the ogre's:** a boulder he could pick up and throw still wears a gold ▲,
because that is an offer rather than a label.

**Would be a bug:** the ▲ ♣ ▮ ✿ ♨ coming back on any hex you are not being offered.

### 8 · A second company does not fight the brawl again ⚠ READ THIS ONE

**Reach it in three steps:** finish or lose a run → MENU → **A new company**.

**What should happen.** You land **straight on THE MAN IN THE CORNER**: the offer, the three who
joined, the name picker, one door to the map. **No tap-room brawl.** The card's first paragraph is
written for this: he crosses to your table because he has been watching you, not because he is
stepping over wreckage.

**The condition is "you have played it through once", not "you died".** You asked for it after a
loss, but somebody who *wins* and starts again would have been sat back down in the tap-room too,
which is the same complaint.

**It is still one click away whenever you want it:** `The tutorial fight` on the front door.

⚠ **You start with the same money and mood as if you had fought** (the brawl's 8 crowns and +4 are
paid for you) but **nobody arrives hurt**, where fighting usually costs the Captain something. That
is a shade kinder than playing it. Say if you would rather it cost you.

### 10 · The road zooms, and starts closer

**Reach it in three steps:** get to the map → look at the top-right corner → press a stop, or roll
the wheel over the map.

**What should happen.** Three stops, `ROAD · NEAR · CLOSE`, exactly like the battlefield's camera.
**You start on NEAR**, one step in from the whole map. `ROAD` is the whole thing at once and it is
the furthest out you can go, on purpose: the painting is exactly the size of its box, so anything
wider would show you the ground where the map stops.

**The wheel steps between them.** Zoomed in, **drag the map** to look somewhere else. The stop you
leave it on is remembered next time you launch, like the battle camera and the sound toggle.

**The camera follows the company** and only when it has to: it re-frames when you are getting near
an edge, not on every step, or the map would slide under your cursor while you were reading a fork.
If you have dragged away to look at something, it stays where you put it **until the company sets
off**, and then it comes back on its own.

**What does NOT move:** the contract plate, the zoom bar, the legend, the event card, the company
name along the bottom, the road news. Those are captions, and a caption that zooms is a caption
that walks off the screen. ⚑ **An event card still opens beside its own node at every stop** — that
one took a bit of work and is the thing most likely to be subtly wrong, so it is worth a look.

**Would be a bug:** the painting's edge showing at any stop or after any drag; a drag that ends on
a node walking the company there; the card opening in the wrong corner; the contract plate or the
legend scaling with the map.

### 9 · THE CONTRACT is out of the map tutorial

**Reach it in three steps:** start a new company → take the door to the map → count the spotlight
steps.

**What should happen.** **Two steps: THE CHEST, then THE COMPANY, then THE ROAD.** The one that
pointed at the contract plate and explained that it was a contract plate is gone.

### 10 · The contract is a head, and the plate is half the size

**Reach it in three steps:** on the map → look at the top-left corner.

**What should happen.** Three short lines, none of them wrapping:

```
THE CONTRACT · SKELBROOK
Bring back the head out of the hall's chair.
◉80 paid, the rest on delivery
```

**The letter is gone as a job** - it was a second objective you could never actually discharge - and
so is the line about where the road ends, because the map already draws that: the goal node wears
the same trophy the plate opens with.

**The weekly letter is still in the man's mouth** in the tavern, and deliberately: he has been
reading them since the thaw and doing nothing, and a company at forty crowns is the cheapest thing
that counts as doing something. Hover the plate for the whole job in full.

**Measured: 400x77 down to 305x53.**

**Would be a bug:** either line wrapping to two; the plate growing back down the map when a longer
sentence is put in it.

---

## 🚪 THE OPENING PASS - TWO SCREENS GONE, AND THE ARCHER'S HAND FIXED  *(#155 · 2026-08-14 · build log 8f.183)*

Nine of your notes from the playthrough. **Start a NEW company for this one** - most of it is in the
first four minutes.

### 1 · The archer hovers an ARROW now, not a sword

**Reach it in three steps:** any battle → an archer's turn → hover an enemy inside bow range.

**What should happen.** The mouse cursor is a **fletched arrow**. A spear or a cutter hovering the
same body still gets **crossed blades**. This was a real bug, not a preference: since the board
started letting you click an enemy directly, the cursor rule under that click only knew about
swords, so an archer was promised a blade and loosed an arrow.

**What would be a bug.** A sword over a body an archer is about to shoot. A boot (the walk cursor)
over a body either of them can reach. An arrow over a body a *melee* fighter is hovering.

### 2 · THE GRAUSEN ROAD card is gone

**Reach it in three steps:** menu → **A new company** → win the brawl → take the purse.

**What should happen.** You land on the map and the **tour starts immediately** - the contract
spotlight first. No card in the middle of the screen before it.

**Nothing it said was lost, and this is the part to check.** The job is on the contract plate top
left (Skelbrook, the head in the chair, ◉80 paid, the road east). The money is the crown chip. The
line about not being able to be good to everyone is what the road's own priced doors have been
saying since the choice-weight pass. **If you find you have lost the thread of what you are doing,
that is the thing to report** - it means the plate is not carrying it.

### 3 · THE DAY tour step is gone

The spotlight on the DAY 1 MIDDAY plaque is deleted. The tour is now **four steps**: the contract,
the resources, the company, the road. The plaque still sits there and still counts.

### 4 · The opening card no longer stretches

**Reach it:** menu → **A new company**.

**What should happen.** The card is **centred on the screen** with an even band of dark above and
below it, and it ends just under the button. Before, it was pinned to the top and grew to its
maximum height whatever the prose measured, so there was a large dead area under **Draw your
sword.** inside the card's own border.

**What would be a bug.** A scrollbar on the right of the card. Text clipped at the bottom. The card
sitting off-centre.

### 5 · ⚔️ on **Draw your sword.**

Same glyphs as the road doors. It was the only battle door in the game without one - the pass that
added them walked the road and camp decks, and the prologue is neither. Hover it and it says
**FIGHT · starts a battle**.

### 6 · The naming screen counts HEADS, not hearts

**Reach it in three steps:** new company → win the brawl → read the strip at the top of the contract
card.

**What should happen.** It reads **◉ +88 CROWNS** and **⛊ 4 HEADS**, then the three faces of the
people who stood up for you. The **♥ MENDING** chip is gone.

⚠ **Two notes on this one, because your instruction moved.** You first said the road bar and then
corrected it to this screen, so **the road bar is untouched** - it still wears 😐 AT EASE and the
health percentage. And there was **no morale readout on this screen to delete**; it had already gone
in an earlier round. The heart is what came off in its place, by your pick.

⚠ **⛊ counts BODIES.** The road bar's ⛊ 8/13 is a different number on purpose - that one is wagon
room, where a human takes 2 seats and an ogre 3. Four humans are **4 HEADS** here and **8/13** there,
and both are right.

### 7 · BLOOD ON THE ROAD is half as long, and the joiners have faces

**Reach it in three steps:** new company → the road east → **Blood on the Road**, then help either
side or stand back.

**What should happen.** Every branch of the card is roughly half what it was, and whoever joins you
appears as a **painted head with one line beside it**: name, race and job, then a short trait line.
The long trait paragraph still exists - it is on the character sheet, one click away.

**What would be a bug.** A blank or grey box where a face should be. A trait line that runs to three
lines. The card losing a fact you cared about: the ratkin picking up their spears, the ogres winning
it *easily* if you stood back, or the thing alive in the ditch that watched you wait. All three are
supposed to have survived.

### 8 · "the company stands taller for it" is deleted

**11 places**, across the road cards, the camp fire and the vignettes. Same treatment as the two
phrases before it. Every one of those doors still has its **mood chip**, which is where the change
belongs.

**What would be a bug.** A choice line that starts or ends with a floating **·** dot. A choice with
no sub-line at all where you expect a price (the price should still be there - only the phrase went).

### 9 · Two lines of wording

- The man in the corner says **"You lot,"** instead of "You scum,". Everything else about the line
  is as you quoted it back.
- The ogre spotlight in the tutorial brawl now opens with **"The room is his, and so is the
  furniture you are breaking."** before the race facts.

---

## ⚔️ THE DOORS WEAR THEIR INTENT  *(#154 · 2026-08-14 · build log 8f.182)*

**Reach it in three steps:** menu → **Continue the road** → walk onto any event node. Every choice
button on the road now opens with **one or two emoji** saying what that door *does*.

**The eight, and they were counted rather than guessed.** I read every door in the game before
proposing the set. Your four were right; the build needed four more to cover what the road actually
offers:

| ⚔️ FIGHT | 🤝 HELP | ☠️ EVIL | 👣 LEAVE | ⚖️ TRADE | 🧺 TAKE | ⛺ REST | 🙏 HONOR |
|---|---|---|---|---|---|---|---|
| starts a battle | somebody is helped | kill, rob, or worse | walk away | buy, sell, pay | take what lies there | stay a while | bury, pray, respect |

**Plus a race mark when a door is race-gated: 🐀 ratkin · 👹 ogre · 🧑 human.**

**What should happen**
- **The verb comes first, the moral colour second.** BLOOD ON THE ROAD reads exactly as you wrote
  it: ⚔️🤝, ⚔️🤝, ⚔️☠️.
- **Hover any glyph and it names itself** ("EVIL · kill, rob, or worse"). That was your ask, and it
  is a plain tooltip, so give it about a second.
- **Never three glyphs.** A race-gated door shows one intent plus its race: THE SITTING STONE's
  ratkin door is 🤝🐀, the wedding's ogre door is ⛺👹.
- **THE FEN-MOTHER now has two doors, not three.** The back-away door is gone; the quiet door costs
  **2 days** and pays the tooth, and the fight is the other answer. **The kill door has no ☠️** on
  it, by your ruling: hunting a beast for its hide is a hunt, not villainy.
- **The camp fire's rulings have NO glyph, and that is deliberate.** THE DEBT, THE AUNT, THE NINE
  SECONDS are judgments rather than actions, and a mark on every door of a card is furniture. Bare
  should read as *this is you deciding, not doing*.

**What would be a bug**
- Three or more glyphs on one button, or a glyph on a door that does something else entirely.
- 💀 appearing anywhere on a choice. That face belongs to the morale chips and must never mean two
  things; ☠️ is the villainy mark.
- A door that starts a fight without ⚔️, or a race-gated door with no race mark.
- A glyph that looks like a *price* rather than an *intent*. What a door costs stays on the chips
  and the small line underneath; the emoji never says how much.

⚠ **One honest limitation on 🧺.** You asked for an open sack and Unicode has not got one: 💰 is a
sack tied shut, so this is the open basket that loot goes into. If it reads wrong to you in play it
is a one-line swap.

**Two things I also fixed while in there:** the em-dash rule had been broken for months in two camp
cards (THE SECOND DEBT's sequel about the knife, and THE TUNE COMES BACK) because the standing
check only ever read the road's table and not the fire's. Both are gone.
## ◉ PAYDAY EVERY FOURTH DAY  *(#152 · 2026-08-14 · build log 8f.180)*

**Reach it in three steps:** A new company → take the contract → walk the first two roads east.
Day 4 is the first payday, and it lands right around the first fork.

**What it is now.** Wages are not taken daily any more. The bill quietly runs up as you walk
(ratkin 1, human 2, ogre 2 a day - and **you draw 1**, whatever the books say a human costs), and
**every fourth day the chest opens and pays the whole thing at once**. Your starting four cost
7 a day, so the first payday takes about 21.

**What to look at:**

1. **The PAYDAY chip** (top bar, left side, where UPKEEP used to be). Paid up, it reads
   `PAYDAY ◉21 IN 3D`: that is the bill *as it will be on the due day*, counting down. It sits
   bone-coloured while the chest covers it, goes amber when the chest only covers what has
   already run up, red when it cannot even do that. Hover it: the arithmetic, and who costs what.
2. **The payment being loud.** On the payday, the chip and the crowns purse **flash gold**, the
   coin sound plays, and the road line says "Payday. The chest opens...". No card, no screen,
   nothing to click away. If you *miss* the flash because you were reading something else, that
   is a real finding - say so.
3. **The roads lost their crown prices.** The label on a road is now just `1d`; the fork rows
   are `4 days · ~1-2 fights · TROUBLE` with no ◉ anywhere; the fork footer names where the
   roads meet. The money question moved to the chip. Does a fork still read as a fair trade
   without a price on it?
4. **Miss a payday on purpose.** Spend down to nothing before day 8 (the muster is good at
   this). The payday line turns hard ("Payday, and the chest cannot cover it..."), the chip goes
   `◉N OVERDUE` red, the red UNPAID chip appears beside it, and the mood drops 10 **every day it
   stands**. Earn coin and the chest settles itself at day's end without you doing anything.
5. **The ogre costs 2 now and the Captain 1.** Check the muster hover and his race card: the
   one-crown joke is gone, the new line explains the parity.

**What would be a bug:** the chip's number disagreeing with what the payday actually takes off
the purse · a payday flash on a day the chest did NOT fully pay · wages charged daily anywhere ·
a crown price still printed on any road label, fork row or travel button · the OVERDUE amount not
shrinking when coin comes in · morale draining between paydays while nothing is owed.

**The balance question this opens (yours):** is 4 days the right beat, or does it want 5? And
with the ogre at 3 seats AND 2/day, is he ever still the right hire?

---

## 🧭 YOUR EIGHT NOTES FROM THE CITY  *(#151 · 2026-08-14 · build log 8f.179)*

**Reach it in three steps:** menu → **Continue the road** (or A new company) → the first fork.
Six of the eight are on the road; two are on the menu and the top bar and are visible at once.

**⛔ READ POINT 1 FIRST, BECAUSE IT DID NOT HAPPEN THE WAY THE NOTE ASSUMED.**

1. **THE HANGED TOLL-MAN now has FOUR doors, and the fourth is new.** Your note said the
   take-all-and-boots option had been deleted. **It had not** - "Take the purse. And the boots."
   is in every commit of this repo back to the first one, and the generated events book agrees.
   What was missing is the door you were *describing*: not the purse **or** the bridge but both.
   So the new one is **"Take all of it. Purse, boots, beams."**, in red.

   **What should happen:** it pays **◉+38, ▤+5, ◐−1 day, 😐−6 morale**, the boots find a wearer on
   their own, and the fourth beam comes down on somebody. The label says only *"nothing is left
   standing here"* - this card is the reference event and its prices are stated as intent, never
   as a receipt, so the chips at the bottom of the outcome are where the numbers live.
   **A bug would be:** a number on the button, or the injury being warned about before you pick.

   **The judgement I want back from you:** this is a four-door HEAVY card early on the road, and
   #123 spent a whole pass cutting the road down to three. If it reads as one door too many, say
   so and the bridge-only door is the one to fold into it.

2. **The menu has ONE playtest row.** As a player you see **Send the run** and nothing else; press
   it and the questions lead to the notes, exactly as before. **Turn on ⚙ DEV.MODE (top right) and
   a second row appears immediately** - ⚙ Playtest notes - with **Read somebody else's** and Clear
   my journal inside it. Turn it off and the row goes, under your hand, without reopening the menu.
   *(Your bracketed question - separate tool or not - you answered: keep it in dev mode.)*
   **A bug would be:** having to leave the menu and come back for the row to appear or disappear.

3. **"It sits well with them" is gone from every card.** It was on **16**, not the 6 the last note
   said - that count had been taken over the road events only and missed the camp cards.
   **A bug would be:** a button whose sub-line starts or ends with a floating " · ".

4. **Every crossroad now says `~1-2 fights` or `~0-1 fights`, never a flat number.** The first fork
   reads **4 days · ~1-2 fights · TROUBLE** and **6 days · ~0-1 fights · PEACEFUL**, which are the
   two numbers in your own note. **The reason it was wrong is worth a sentence:** the old sign
   counted nodes typed *battle*, and the Broken Men are one - but their first door is "No." and the
   other two are four days of food or forty crowns, so the sign was promising a fight on a road you
   could pay your way across. It is a rumour now and it always spans two numbers.
   **A bug would be:** any fork row showing a single figure.

5. **Costs on choice buttons count in the game's own glyphs.** "−30 crowns · +2 provisions" is now
   **−◉30 · +❦2**, the same four marks the top bar and every loot chip use. It fires on the number,
   so prose keeps its words: *"Pay the toll. It is four crowns"* is untouched.
   ⚠ **I included salvage ▤ and gems ◈ although you named only currency and provisions** - a line
   reading "−◉30 · +6 salvage" is worse than either version. Say the word and either goes back.
   ⚠ It covers the road cards, the camp cards, the yes/no dialogs and the village rows. **It does
   NOT cover the battle screen or the muster**, which still say "crowns" in words. Tell me if you
   want the vocabulary total.

6. **Blood on the Road has ONE loot receipt, not two.** Take **"Wait. Then finish the winners."**
   The first card (the narrative one) no longer carries a chip row; the aftermath card after it
   shows **one** TAKEN OFF THE FIELD block carrying both what the ditch paid and what the field
   did. If the field row also pays coin the two are **added**, so you will see one ◉ chip and not
   two. **A bug would be:** two chip rows on two screens, or the purse moving by more than the
   chips say.

7. **THE BROKEN MEN's "No." door reads `BATTLE · 4 men and 2 dogs against`.** The dogs are the half
   of that fight people do not expect, and the door had never mentioned them.

8. **Clicking the company chip on the road bar (the one with the ★) opens the PERKS tab** on the
   person holding the point, not the stash on whoever you looked at last. If the waiting point is a
   **stat** point instead, it picks that person and leaves the tab alone - stat points are spent on
   the WHO THIS IS tells on the left, which light up on their own. The sack chip beside it is
   unchanged and still opens the stash.

**And one thing you did not ask for, found while testing point 1:** the toll-man's boots pick their
own wearer, and when there is no ratkin in the company they could pick **you** - whose roster name
is the literal word "You", so the line read *"Of course it is You."* Fixed. It now says your
nickname, and the sentence after it stopped guessing at the wearer's gender.

**The audit you asked for is in [`SHIPPED.md`](SHIPPED.md) #151 and the changelog.** Short version:
**nothing was lost in the merges** - all three work branches are level with main and the loose
commits in the repo are pre-amend copies with identical contents. Thirty entries were checked by
running the build, not by reading the docs. Three of them (#117, #137, #138) had shipped without
ever getting their row in the registry; the rows are written now, and their code was verified live
before the rows were.

---

## 🧭 THE OPENING, THE EVENT CARDS AND THE ROAD BAR  *(#150 · 2026-08-13 · build log 8f.178)*

**Reach it in three steps:** menu → **A new company** → play the brawl and read the card after it.
Everything below is on the way from there to the second fork.

**Your eleven, and what each one should now do:**

1. **The Three Bells card** has no title in the corner and no small line under DRAW YOUR SWORD.
   The prose is 170 words, down from 191; the money-and-killing point is made once, in the first
   paragraph.
2. **The man in the corner is now ONE screen.** The strip at the top says **◉ +88 CROWNS** (the
   whole purse, brawl plus advance, not the old +8), the three who joined show their **painted
   faces**, there is no morale chip, the **name picker is on that same card**, and the one button
   says the name you picked: *"Chalk THE SOUR DOGS on the wagon, and go."* Clicking it goes
   straight to the map. **A bug would be:** having to scroll the card, or a second screen.
3. **Event outcome chips.** A morale chip wears the company's **face** (😐 🙂 😄 😟 💀) for the mood
   the choice lands you in. **♥ is healing only** now: the Door-Shrine's rest door prints
   `♥ +2 MENDED`.
4. **The coin** goes into the **wagon**, not round somebody's neck, and the whole company feels
   better. Open the kit and it is there to put on.
5. **Choice consequence lines are bigger** (12.5px, was 10.5).
6. **Blood on the Road** reads `3 spears beside you · 3 ogres against · 2 may join after`, and the
   third door is now **"Wait. Then finish the winners."** Take it and the aftermath pays
   **+55 crowns +5 salvage +2 provisions** on top of the usual haul. ⚠ The fight is *not* easier
   for it: two ogres, nobody beside you, and they are not wounded. That is deliberate.
7. **The contract plate** (top left) says Skelbrook, what is to be done there, that you carry the
   letter, that 80 is paid and the rest is on delivery, and that **the road east ends at The
   Snare**.
8. **The Snare wears a gold trophy** from the first screen. Hover it: *"THE CONTRACT ENDS HERE."*
   It goes away once you have stood in it.
9. **The heart chip is a percentage** of the whole company, not the worst body. One badly hurt
   spearman in a company of four now reads **79%** with a small **red pip** on the corner (that is
   the "somebody could go down next fight" alarm, given its own mark). Everybody scratched reads
   91% and no pip.
10. **The party chip wears a gold ★** with the number of unspent levels; **the sack wears a green
    !** when something in the wagon beats what somebody is wearing or fits an empty slot. Hover
    either for the sentence. Equip the thing and the ! clears.
11. **The fork card is one line a road:** `4 days · 1-2 fights · ~◉32 · TROUBLE` over
    `6 days · 0-1 fights · ~◉48 · PEACEFUL` over `Not yet`. No small print under any of them. The
    days are the **whole road** to where the two roads meet again (named in the line under the
    heading), not the first leg. Hover a row for which place comes first and whether there is
    anywhere to stop.
12. **"It sits badly with them" is gone from all 24 cards it was on.** The peat-cutting card now
    reads `−1 day · +7 salvage +1 gem · it is a clan grave · morale -5`.

**What would be a bug:** any choice line starting with a floating " · " · a card you have to
scroll · the trophy on a node you have already walked through · the ! badge that will not clear
after you kit everybody out · the fork card promising fewer fights than the road holds.

**One thing I left in that you may want out:** the fork row still carries the road's **wage bill**
(`~◉32`). You listed three things to keep and that was not one of them, but it is the only place
the purse is warned about before you commit to a six-day road. Say the word and it goes.

**One thing I did NOT do, on purpose:** *"it sits well with them"*, the positive twin of the phrase
you boxed, is still on 6 cards. You pointed at the negative one; deleting its mirror is a one-line
change if you want it.
## 🎟 A SPENT NUMBER GIVES ITSELF BACK  *(#144 · 2026-08-13 · build log 8f.172)*

**Nothing in the game changed. This is the tool that hands out `#NN` and `8f.NNN`,** and it is here
because it was quietly refusing honest commits.

### What was wrong

A session was blocked from committing its own #143 work because the changelog row it was writing
**mentioned** #141 and 8f.169: numbers another session had shipped hours earlier and never released.
That is not a collision, it is a footnote. Six more dead claims were sitting behind it, ready to do
the same to whoever cited them next.

### Reach it in three steps

1. Open a terminal in the repo folder.
2. Run it:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 status
```

3. Read the **NUMBERS HELD** block at the bottom.

### What is supposed to happen

- Any number in that block is **work somebody is doing right now**. Shipped numbers clear themselves
  the next time anybody runs `number`, `status` or `verify`, and the tool prints one grey line
  saying which ones it swept and where it found them.
- **You never run `release` again** for normal work. The old instruction was "release once it is in
  the docs", and in three weeks it was followed zero times, which is a fact about the instruction
  rather than about the sessions.
- Committing a changelog row that **cites** old numbers just works.
- Committing a row that spends a number somebody is still holding is **still refused**, and the
  message now ends with a line telling you that anything listed has not shipped.

**Would be a bug:** a number vanishing from NUMBERS HELD while that work is still unfinished (say
so loudly, that is somebody's seat) · a commit refused for citing something already in
`SHIPPED.md` · two sessions issued the same number, which is the failure this whole file exists to
prevent. **The one case that still needs you:** work finished on a desk whose branch was never
merged into `main` is invisible to this, on purpose, because it is not shared yet. Merge it.

### The bigger thing this turned up, which you should know about

Building the above found that **the commit guard had been switched off inside every branch desk
since #139, and was printing the word "clear" every time it ran.** It was reading a private, empty
list of claimed numbers instead of the shared one, because the hook runs under a different shell
whose text encoding mangles this repo's folder path (`Google Диск`). It is fixed, and it now
complains loudly instead of going quiet if it ever cannot find the shared list again.

**Nothing was lost by it** and no numbers were duplicated: the part that hands out numbers was
always reading the right list. Only the last-line commit check was blind.

**The tell, if you ever want to check:** a folder called `.grimtoll` appearing *inside* a desk
means the guard is reading the wrong list. There should only ever be one, in the main project
folder.
## ⚔ THE BRAWL GETS AN OGRE AND A MAN YOU CANNOT HIT  *(#145 · 2026-08-13 · build log 8f.173)*

**Reach it in three steps:** menu → **Take the road** → **Draw your sword.** (Or menu → **The
tutorial fight**, which is the same brawl with nothing riding on it.)

### What changed

The wave that used to bring your whole future crew AND the barman up at once is now **two waves,
one round apart**. First the **barman comes over his own bar** and **Weft** comes in off the
street on the same turn - and Weft is the new thug: *Very nimble*, and very hard to touch. **The
three at the bar stand up the round after that, exactly when they always did.** The fight is not
longer; the ogre moved forward rather than the crew moving back.

### Weft, and what he is for

Hover him: **Very nimble - Never where the blade goes.** Swing at his face and you will land it
about **four times in ten**. Take his flank and it is about six; take his back and it is about
seven. He has almost no hitpoints and almost no armour, so once you solve him he goes down in two
blows.

**Miss him twice and the room tells you why**, on the spotlight sheet: *TOO QUICK TO HIT*. It
names the two things that actually work - **come at his flank or his back**, and **get a second
body on him**, because every extra man on one target makes him easier for everybody. The spare
step and THE WRONG SIDE lesson now arrive on the same turn he does, so there is one obvious thing
to spend the step on.

**Would be a bug:** the crew arriving on the same turn as the barman (they should be one round
behind) · the lesson firing when you have not missed him twice, or firing twice · Weft appearing
anywhere but the door · walking out of the brawl on almost no hitpoints **more often than
before** - it measured identical over fifty runs a side, so if it feels harsher, say so and I will
re-measure rather than argue.

---

## 🎯 THE AIMING CARD EXPLAINS ITS OWN NUMBERS, AND EVERYBODY HITS MORE  *(#146 · 2026-08-13 · build log 8f.174)*

**Reach it in three steps:** any fight → pick somebody of yours → hover an enemy in reach.

### What changed

**Everyone hits more.** Your people gained **10 points** of chance to hit and the other side
gained **5**, so the net is five in your favour and both sides' turns get shorter - the point was
to stop the whiffing, and only speeding up your own half would have left theirs exactly as long.

**And the two rows that were a lump now say what is in them.** Under **their dodge** and under
**other** there is a small line naming every contributor: *their footwork +20 · very nimble +16 ·
hard to stack past 12 −10*, or *back +30 · a big body +6*. It appears only when there is something
to say - a plain swing at a plain body is still five short rows.

### The bit that is not what you asked for, and why

You asked for **dodge** to fall on bigger targets. That was built first and measured, and it did
almost nothing: **every big body in the game already sits on zero dodge** - Bruht, the steading
elder and both snare ogres read 0 with the rule and 0 without it, and the Fen-Mother reads 3
because her heavy plates have already taken ten of her thirteen. Subtracting from zero is a rule
that never fires. So it is a **bonus to hit** instead: **a big body +6, a great deal of it +12**,
and because it lives in `other` it is a **named line you can read** rather than a silent
subtraction. Same intent, and now visible.

**Would be a bug:** a caption whose numbers do not add to the row above it · the dodge caption
appearing when the only thing in it is footwork · the SKILL/DODGE line on the hover card
disagreeing with the aiming card · fights that now end too fast to be interesting (measured: the
snare and the steading got slightly easier, the Fen-Mother went 11.8 rounds to 10.3 and is still
won every time - **if she feels soft now, that is the one number worth your ruling**).

---

## 🗺 TWO BATTLEFIELDS YOU HAVE NEVER SEEN  *(#147 · 2026-08-13 · build log 8f.175)*

**Reach it in three steps:** **THE BROKEN MEN** on the north road → *"No."* · and **THE SNARE**
at the end of any route.

### What changed

Two painted grounds were finished long ago and **no campaign fight had ever used them** - you
could only reach them from the practice field. Both fights' own cards already described the ground
they did not have:

- **THE BROKEN MEN** opens *"Four of them out of the treeline"* and one of the four is a poacher,
  and it was fought on open water-meadow with **no trees at all**. It is a **forest** now.
- **THE SNARE**'s second door is *"Through the marsh. Slower, but quiet."* It wears the **swamp**
  palette now: the wettest base and the heaviest fog in the game.

### What was deliberately NOT done

The swamp's **deep-water channel is switched off** on the Snare. With it, the act finale got a
third easier (six losses in sixteen against ten), because a channel is a wall and against ten
bodies a wall is how six beat ten. **You get the look and not the softening.** If you want the
harder-to-cross version, it is one line - say so.

**Would be a bug:** anything unreadable on the new grounds - the state colours (wavering,
breaking, routed) and the blue reach overlay were checked against them, but they were checked by
me and not by an eye · the Broken Men becoming a slog (measured: 7.6 rounds to 6.3, no losses
either way) · the Snare feeling different in difficulty (it measured identical).

---

## 🔧 TWO THINGS FOUND BY PLAYING IT  *(#148 · #149 · 2026-08-13 · build log 8f.176, 8f.177)*

**Reach it in three steps:** start any fight → press **▶ AUTO**.

**AUTO was broken in the preview pane and only there.** It ran on a timer that browsers stop
firing in a hidden tab, so a fight would simply sit still. It runs on the right kind of timer now.
**In a normal browser tab you would never have seen this** - but it also means AUTO now keeps
working if you switch tabs mid-fight, and it picks up a change to **SPEED** immediately instead of
on the next time you toggle it.

**And a shot with your own people in the way** was refused by the click while the rules layer
underneath thought it was legal. Nothing was visibly wrong - the board never lit the hex - but the
rule was written out in four separate places, and four copies is four chances for the fifth one to
be wrong. It is one rule in one place now.

**Would be a bug:** AUTO stopping mid-fight · AUTO continuing after a fight ends · pressing SPEED
while AUTO is running and the board not changing pace · a shot the board lights and then refuses,
or refuses and then lights.

---

## 📜 EVERY ROAD CARD IS SHORTER, AND THE OUTCOME PAYS IN CHIPS  *(#143 · 2026-08-13 · build log 8f.171)*

**Reach it in three steps:** menu → **A new company** → play to the map and walk onto any event.
The second node is the quickest proof: it is the coin.

### What changed

Your brief, executed across all 34 road cards: **the prose is a third shorter overall** (the fat
cards lost 34-48% each), the outcome text stopped narrating numbers, and **what a choice paid now
shows as the after-battle screen's own loot chips**: ◉ crowns, ❦ provisions, ▤ salvage, ◈ gems,
plus two new ones, **♥ morale (green up, red down) and ◐ days**. A piece of kit arrives as a loot
strip with its own glyph, the way an artifact does after a fight. Camp-fire incidents and the
small road vignettes speak the same chips.

### The coin, your example, exactly

Walk onto **THE COIN IN THE ROAD**: three short lines, the coin already ON the card as a loot
strip with the finder's name, **♥ +8 MORALE** beside it, and **one button: "Keep walking."** One
click and you are back on the road, the finder wearing it. No second screen.

### The rule that protects the game

**A card with a real decision still shows no chips before you pick.** The chips appear on the
outcome, after the click: prices stay on the buttons, the score stays hidden, which is the
pillar's own corollary. Only one-door pickups (the coin, the cache, the chapel) wear their loot
up front, because with one door there is nothing to hide.

**Would be a bug:** a chip that disagrees with the top bar's actual change (they are built off
the same payment now, so this should be impossible: say so loudly if you catch one) · chips
visible on a card that still has two or more doors · an outcome screen that is an empty box with
a button · any event text that lost a FACT you needed for the choice (the words were cut, the
facts and every price line were kept: if a cut went too deep anywhere, name the card and I
restore that line).

**Reach it in three steps:** menu → **A new company** → play the tavern brawl to the end.

### What changed

You used to click through **four full screens** between the last swing of the brawl and the map:
*the room settles* → *the man in the corner* → *and that is the contract* → *a name for the ledger*.
**Two of those four had a single button on them that you could not refuse**, which is not a choice,
it is a page break with a button on it.

It is **one card** now. The brawl's receipt is a strip along the top of it - the eight crowns, the
four morale, and the three who stood up drawn as three faces, because *you got people* is a fact
about people. Then the man, then his offer, then one door.

### The door you asked for

**"Put him on the floor" is gone.** Your word for it was the right one - it was a decision about a
man the game never sees again, paid for in hitpoints that heal by the second stop.

What is left is **"Finish your drink and leave."** → **+80 crowns**, the advance in full. When you
click it the card *turns over* rather than handing you a new one: the painting changes to the one
of you taking the purse, his speech is replaced by what happened, and **then** the naming strip
appears underneath - so the name is offered after you take the contract, not before it.

Chalk it on the wagon and the next thing you see is **the map**.

**Would be a bug:** any second screen between that button and the map. Any point where the painting
squashes to a sliver. The naming strip appearing before you have clicked the door.

⚠ **One honest measurement.** On arrival the card is **56px taller than the window**, so it scrolls
a little - the door is pinned to the bottom and always clickable. Once you have answered it, it
fits exactly with 2px to spare. If the scroll annoys you the next thing to cut is one of the lord's
three paragraphs, and I would want you to pick which.

⚠ **I dropped the −5 morale** that the old "say nothing" door charged. That was the price of
*choosing* to swallow it while a prouder door sat next to it; with only one door left, charging it
is billing you for something you were never given the chance to refuse. Say the word and it goes
back.

### And the red doors got their correction

The thing I flagged last time is fixed. Red now means **"this is the fight, and there is another
way"**. On the three cards where *every* door is a fight - the Snare's two roads, and the two
ambushes you cannot walk away from - nothing is red any more, because red on everything says
nothing. Verified across all nine fight cards: no card is all-red.

---

## ⊚ THE COIN IN THE ROAD, AND WHAT IT WILL NOT TELL YOU  *(#141 · 2026-08-13 · build log 8f.169)*

**Your ask:** *"after tavern fight - next event instead of faling star (it could be a random event
somwhere) - add event - you found an unusial coin. 'It feels goood to keep in the hand, but you
don`t know why'. It is trinket and it increses dodge and hit chane by 7%, but never writes about it
openly in the item description (but stat changes noticibly)."*

The node after the tavern brawl is now **The Wheel-Rut** and it deals **THE COIN IN THE ROAD**. The
Falling Star is not gone: it went into the floating deck, so it turns up on a road slot somewhere,
in a different place every run.

### How to reach it, in three steps

1. New company → the Three Bells brawl → the corner table → the road.
2. Walk east one leg. The first node is **The Wheel-Rut**.
3. Pick a door. **Both doors give you the coin**, so you cannot miss it by choosing wrong.

### What is supposed to happen

- Somebody in the company, **by name**, comes up out of the mud with it. The same name carries
  through the rest of the card.
- **"Into the wagon"** puts it in the stash (−4 mood) and forces the inventory open, so **you**
  choose who wears it. **"Whoever found it, keeps it"** puts it round that person's neck on the spot
  (+8 mood) and you do not get a say. It also goes into their history, which the company sheet shows.
- **The item says nothing about what it does.** Hover it in the inventory and you get
  *"It feels good to keep in the hand. Nobody can say why."* and the standard PERSONAL AMULET note
  telling you it only works on the one person wearing it. **No numbers, no bullet list.** That is
  deliberate and it is the whole point of the item.
- **The body says everything.** Put it on somebody, start any fight, click them, and read the
  plaque. **Measured live on Ilka Renn: CHANCE TO HIT 61% → 68%. DODGE 15% → 19%.**

### The one number that will look wrong, and is not

**Hit moves the full +7. Dodge often moves less than 7.** The coin gives +7 to both, but dodge runs
through a soft cap at the very end (`softDodge`, from #79) that every contributor pays, a shield's
+9 included. On Ilka the raw dodge went 17 → 24 and the cap printed 19. **Nothing to fix; a shield
behaves the same way.** Written down here so it is not reported as the coin being broken.

### What would be a bug

- The inventory or the hover listing **"+7 to hit"** or **"+7 dodge"** anywhere. That is the one
  thing this item must never do.
- Wearing it and seeing the plaque's **CHANCE TO HIT not move at all** *(dodge moving by less than
  7 is the cap above and is fine)*.
- The card naming **two different people** in the body and in the outcome.
- **The Falling Star never turning up across three or four runs.** It is one card in an eighteen-card
  deck across seven slots, so missing it in one run is normal and missing it in four is worth saying.
- The Wheel-Rut's map plate **overlapping a neighbour**. It lost its painting when it stopped being
  the star, which moves the plate up 33px. The counters read zero, but the eye is yours.

👤 **Two calls that are yours.** The mood numbers (−4 for taking it, +8 for letting them keep it)
are a guess at what the moment is worth. And **The Wheel-Rut has no map painting** - the star took
its picture into the deck with it, so the node shows the plain event mark until an icon is made.

---

## ◆ THE RACE BOX GOT SHORTER AND SAYS MORE  *(#142 · 2026-08-13 · build log 8f.170)*

**Your ask:** *"shorten description of race (now it is huge thing with too little info)."*

### How to reach it, in three steps

1. Open the company sheet (🎒) on anybody.
2. Hover the **race** word beside their name.
3. Do it for a human, a ratkin and an ogre. Also hover the race names on the **muster field**, which
   is where it changed most.

### What is supposed to happen

**Measured, the same three boxes:** human **125 → 62 words**, ratkin **116 → 69**, ogre **159 → 94**.
And each one now carries **numbers it did not carry before**:

```
STEP 4 · 2 seats · 2 crowns a day
+2 INTELLECT
THE LINE   3 of anyone, in a row · +5 dodge to each of them
```

- **The prose that went was prose already printed underneath it.** The old text spelled out the step,
  the seats, the wage and the race's own skill in sentences, and the block below the text prints all
  four off the tables that own them.
- **On the muster field the numbers are new.** The old box only ever showed them for somebody you had
  already hired, which is the wrong way round: the muster field is where the numbers decide a purchase.
- **The lean is exact now.** It used to be *"slightly quicker, slightly weaker"*.
- ⛔ **One thing the old text said was simply wrong.** The human box read *"No lean either way"*.
  Humans are **+2 INTELLECT** and always have been. So the "too little info" half of your sentence
  had a real cause, and it was not taste.
- **The ogre's wage joke survives the cut** *("paid one crown a day, like the smallest ratkin,
  because nobody has told him otherwise")*, because it is the one sentence that made a number
  legible rather than repeating one.

### What would be a bug

- A race box showing **`undefined`**, or a formation line with **no number in it**.
- The numbers in the box **disagreeing with the skill card below it**, or with the muster field's price.
- A box that still **repeats its own skill in a sentence**.

**The picture:** `shots/142_race_box.html` showed all three before and after, at the tooltip's real
290px width. ⚠ It was deleted in the 2026-08-14 shots cleanup; the box itself is in the game, so
hover a body in the muster instead.

---

## 🎁 FIVE OF YOUR SEVEN  *(#137 · 2026-08-13 · build log 8f.165)*

Five items of the pack you sent with the two screenshots. **Two are NOT built** - see the bottom of
this section.

### 1 · What the fight paid, at a size you can read

**Reach it in three steps:** start a run · win any road battle · look under **TAKEN OFF THE FIELD**.

The line your red arrow pointed at was 11.5px of grey text. It is now **one chip per resource**:
the coin, barrel, salvage and gem icons from the top bar, with the number at **20px**. A haul that
gives you a thing *and* coin (the Snare's bells: timber and 25 crowns) now shows **both** - the old
line could only ever print one of them.

**Would be a bug:** a chip showing a number the purse did not actually change. The chips are built
off the same object the game pays out from, so if you ever see one disagree with the top bar, that
is worth telling me immediately.

### 2 · DISENGAGE actually gets you out now

**Reach it in three steps:** any battle · let two of them get a hand on somebody · click DISENGAGE.

It used to give you the extra hex **next** turn, which is one turn after you needed it - you paid
an action to break off and then had less movement to run with. **The hex is yours the moment you
press it.** Watch the MOVE card: it goes from *4 HEXES* to *5 HEXES* on the click.

The price: **you cannot use it again this turn or the next.** The card greys itself and says
`READY IN 2 TURNS`.

**Worth your judgement:** whether escaping is now *too* easy. This is the lever - if it is, the
cooldown goes to 3 or the hex goes away and the action gets cheaper instead.

### 3 · Doors that start a fight are red

**Reach it in three steps:** walk the road · open any event card with a fight on it · look at the
options.

Five fight doors had never been marked, including **both** of the Blood on the Road doors that put
you in it. Red is also stronger than it was: it was a thin dark border you had to already be
looking for, and it is now a red ground with a red title.

⚠ **This one is half-done on purpose and I want your eye on it.** Measuring in the running game
found **12** fight doors, not 5, and three of them make red meaningless: the Snare card's two doors
are *both* fights (same fight, you just arrive differently), and the ambush cards have exactly one
door. **Red on every door of a card says nothing.** The fix is *red only where the card also offers
a way out*, and it is specced but not in the code. So on those three cards you will currently see
red everywhere. Tell me if you disagree with the fix before I build it.

### 4 · The Captain stops repeating the tutorial

**Reach it in three steps:** new company · play the tavern brawl · then play the next two fights.

Four of his lessons said exactly what the brawl's spotlight had already said with an arrow pointing
at it - armour before blood, nerve running out, zone of control, and DISENGAGE. **Those four are
gone.** He still teaches the ring colours, reach, the bow, the spell, the back arc, standing alone,
and the cost of doing the same thing twice in a turn - the brawl teaches none of those.

**Would be a bug:** a rule you meet in a fight that nobody ever explains anywhere. If that happens,
name it and I will put a voice back on it.

### 5 · The company's name is on the company

**Reach it in three steps:** get through the opening and name your company · look at the map · look
at the little marching column.

The caption under it said THE COMPANY for every company that has ever played. It says **your
name** now, and the duplicate signature that was floating along the bottom of the map is gone.

⚠ **Eye check wanted:** a long name (THE HALFPENNY COUSINS) is roughly twice as wide as the old
caption. Tell me if it crowds the nodes it walks past.

### ⛔ Not built: the two about the opening

*"Combine after battle + consequence"* and *"offer to choose the name after you accept the
contract"* are **#138**, and they are specced and drawn but not in the game. The drawing is
`shots/138_opening_one_card.html` - **open it and click a door.** Today the brawl is followed by
**four** full screens before the map, two of which carry a single button you cannot refuse. The
mockup is one screen: the receipt for the brawl, the man, his two doors, and then - only after you
answer - the naming strip.

Measuring it turned up the thing worth knowing: **the contract card already fills 674px of the
684px a card is allowed**, so the merge had to pay for itself. It does, and one sentence of the
card's prose is cut to buy it (*"Behind you, the woman with the spear has not left..."*) because
the new receipt strip shows those three people as three faces, which is the same sentence.

---

## 🪑 TWO SESSIONS, TWO DESKS  *(#139 · 2026-08-13 · build log 8f.167)*

**This one is not in the game, it is in how we work.** You asked for parallel work on the file in
several branches instead of the lock. Nothing about the game changed.

### How to reach it, in three steps

1. In the **main** folder: `powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 new battle-panel -t "what it is"`
2. It prints a folder, something like `C:\Users\USER\grimtoll-desks\battle-panel`. **Open a Claude
   session with that folder as its working directory.** That session has its own copy of everything.
3. When it is done, back in the **main** folder:
   `powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 done battle-panel`

### What is supposed to happen

- **Two sessions can edit `prototype/grimtoll_slice.html` at the same second.** No lock, no waiting,
  no "another session owns this file".
- **Numbers still cannot collide.** `claim.ps1 number` from a desk sees every number every other desk
  is holding. This is the part most worth trying: run `claim.ps1 status` in two desks and compare.
- **`branch.ps1 list`** shows every desk, how many commits it is ahead, and whether it has
  uncommitted work.
- **`done` merges and then removes the desk and its branch.** If the two desks changed the same
  lines, it stops and says which files, and nothing is lost either way.
- **Deploy still happens only from the main folder on `main`.** From a desk it refuses.

### What would be a bug, and is worth telling me about

- Two desks being handed **the same `#NN` or `8f.NNN`**. That is the one failure this change could
  cause and it is the thing I would most want to hear about immediately.
- `done` reporting a conflict in **`index.html`** or **`art/embed/art_data.js`**. Those are generated
  and are supposed to never conflict.
- A merge quietly **reverting** something you know landed. Check `git log --oneline -5` on main.
- `branch.ps1 done` saying the desk is closed while `git branch --list` still shows `work/<name>`.
  That exact bug existed for one hour today and is fixed, so it would mean the fix regressed.

> ⚠ **One thing I did NOT do, and it is the honest limit of this.** The painted art is still a 4.4 MB
> base64 block **inside** the prototype. Two desks that each rebuild the art produce a conflict in
> that block that nobody can resolve by hand. Everything is pre-wired to move it out to
> `art/embed/art_data.js`, but that edit needs the prototype free, and it was held all day. **Until
> then: do not run `art\inject.ps1` on two desks at once.** Normal code edits are unaffected.

---

## 🏹 EVERY BOW AND SLING REACHES 5  *(#135 · 2026-08-13 · build log 8f.163)*

You said unify them, so they are unified. Four enemies went from 4 tiles to 5: the **snare slinger**,
the **brigand poacher**, the **clash ratsling** and the **sling-line slinger**. The Marked, the
circle and the Sling-master were already 5. **There is no range-4 bow or sling left in the game.**
Spells and the ogre's thrown rock are untouched, because they are not bows.

⛔ **AND HERE IS THE THING I DID NOT EXPECT, SO READ THIS BEFORE YOU PLAY IT: giving the enemy more
range made those fights EASIER, not harder.**

| fight | rounds | your people down | where they shoot from |
|---|---|---|---|
| brigand | 6.5 → **5.2** | 2.1 → **0.9** | 2.6 → **3.5** |
| sling-line | 7.2 → **6.4** | 1.3 → 1.3 | 3.2 → **3.4** |
| clash | 5.0 → 4.8 | 1.0 → 0.9 | flat |
| snare | 8.3 → **9.2** | 4.8 → 4.9 | 3.0 → 3.2 |

**Two losses in ten on the brigand fight became none.**

**Why.** A shooter stands at `range − 1`. At range 4 that was hex 3, which is free. At range 5 it is
hex 4, which costs it **−8 to hit**. So they now stand one hex further away, shoot less accurately,
and are one hex further from ever reaching you with a blade. **Range on this board turns out to be a
positioning stat, not a power stat** - it buys standoff and it is paid for in accuracy.

👤 **I did not compensate for this, deliberately.** You asked for range 5, not for a difficulty
change, and quietly rebalancing behind a request is exactly what the project's tenth invariant
forbids. **If those fights now feel too soft, that is a separate call and it is yours** - and the
honest lever is their damage or their numbers, not their range.

⚠ Ten runs per fight, which the project's own rule says is enough to trust the *direction* and not
the *sizes*. The direction is trustworthy here mainly because the mechanism explains it.

---

## 🃏 THE JOKE IS OUT OF THE OPENING  *(#134 · 2026-08-13 · build log 8f.162)*

1. New game → the Three Bells → the brawl → **THE MAN IN THE CORNER**.
2. **Two replies now, not three.** "Put him on the floor." and "Say nothing. Take the purse."

**"Agree with him. Cheerfully." is gone and parked**, with all its text kept, as backlog #134.

⛔ **Why that one.** It was resolved on a coin flip: 50/50 for either 120 crowns and his respect, or
50 and a cudgel in your ribs. That is **a lottery ticket on the player's first real decision**. The
two that remain are the pillar in one card: **40 crowns and a beating for your pride, 80 crowns and
no pride for the purse.** Nothing is lost - the prose, both purses and the painting are all kept, so
it comes back as a paste the day it has a reason a player can *read* (a stat, a trait, a
personality) instead of a dice roll.

👤 **Your eye:** does the card feel thin at two doors, or sharper? I think sharper, but that is a
judgement and it is yours.

### Two small fixes that came out of looking at it

**The enemy card was speaking a different language from the plaque.** Hover an enemy in a fight: it
used to say **"47 · WAVERING"** while that same body's own plaque said **"😐 Ok"** - the raw morale
pool plus the engine's internal word, and three of the five names are called something else on the
ladder. Both now say exactly what the plaque says, and both rows are labelled **NERVE**, because
#132 gave the word MORALE to the stat. *Nothing to do here but notice it stopped being confusing.*

**A latent bug closed before it fired.** The board's shot colour and the hit receipt each worked out
the range bands separately, agreeing only because both were typed the same way. #127 made those
bands load-bearing days ago, so the fuse was shorter than it looked. One rule now. *Verified as
identical maths, not a change: same numbers at every range and distance.*

---

## 🌙 THE OVERNIGHT BATCH: NINE THINGS YOU ASKED FOR  *(#124-#132 · 2026-08-13 · build logs 8f.152-155)*

**Your nine-item voice batch, built in one go. Take them in this order: the first four are thirty
seconds each, the last two need a fight.**

### 1. START NEW GAME actually starts one  *(#124)*

1. Have a run in progress, then open the menu and press **A new company**.
2. Confirm **Start again anyway**.
3. **You should land on the first card of a new run** (the Three Bells backstory), not back on the
   menu having to press it a second time.

Also: from the wagon after a run ends, **Take the road again** goes straight into a new run.
⚠ **A bug would be:** opening the wagon from the menu *mid-run* and pressing it throwing your live
company away. It should land back on the menu with **Continue the road** still there.

### 2. A reload mid-battle gives you the fight back  *(#131)*

1. Walk onto a node with a fight and take the fight choice.
2. **Once the battle screen is up, refresh the page** (F5).
3. Menu → **Continue the road**. The event card should re-open and you take the fight **from the
   beginning**.

⛔ **This was the bug you reported and it was real.** Before this, the road marked the node done and
walked straight past it: the fight, its loot, its XP and its scars were gone. The node hovered
*"Done with. The road remembers, and so do you."*
⚠ **A bug now would be:** a fight you have already WON re-offering itself after a reload. It should
not.

### 3. The menu button, and Esc  *(#130)*

1. Press **Esc** on the map, on the roster, in the wagon, in a fight.
2. The **☰ MENU** button sits in the same place (bottom left, next to ? RULES) on all of them.
3. In a fight, Esc should **first** clear whatever action you have picked, exactly as before. Press
   it again with nothing selected and the menu opens.

Leaving a fight **asks first** and tells you the price: the road is saved, the fight starts over.
Esc also closes the confirm box now, and it always takes the **safe** answer.
⚠ **A bug would be:** Esc committing a dangerous choice, or the button appearing on a screen that is
mid-transaction (the after-battle screens, the promotion, the endings).

### 4. The stats have normal names  *(#132)*

Open the roster. **STRENGTH · AGILITY · INTELLECT · MORALE**, and hovering each one shows **nine**
bands instead of seven.

⚑ **Why MORALE and not NERVE:** the sheet used to print "NERVE" twice, from two different scales.
**MORALE is how much nerve this person has. NERVE, on the battle plaque, is how much is left right
now.**
👤 **One thing I want your ruling on.** You said "two other levels between them" and also "eight". I
read it as one new band at the top and one at the bottom, which is nine, and **kept every existing
threshold exactly where it was** so nobody in your save changed. If you meant *finer steps in the
middle*, say so and the whole scale gets re-cut.

### 5. Morale slides instead of falling off  *(#129)*

Take a beating in any fight and watch the nerve plaque. Six rungs now, not five:
**It rocks → Happy → Ok → Shaken → Breaking → Broken.**

- **Ok** costs 5 to hit and 2 dodge *(was 8 and 3)*
- **Shaken** is new, at 9 and 4
- **Breaking** and **Broken** are exactly as they were

⚠ **What to judge:** whether the slide now feels gradual or merely fiddly. It reads better on paper;
only playing it settles that.

### 6. The archers  *(#126 · #127)* - **the sling-line is the fight to take**

1. Practice field → **The Sling-Line**.
2. Walk at them.

**They should now:** advance if they have nothing in range instead of standing still all fight, and
**back off when you close**, paying you a parting swing to do it.

⛔ **Two things worth knowing, because one of them is not what you asked for.**

**Your bow was already 5 tiles, with the outermost tile at −18 and the one inside it at −8.** It has
been since the first build. The reason it never felt like it: **both AI brains parked every shooter
at 3 hexes** whatever it was carrying, so that range was never used by anybody. Shooters now stand
at range−1, which for the bow is hex 4. Measured over six runs: **hex 4 is now the commonest place a
shot is fired from**, where it used to pile up at 3 and below.

**And 3 was inside your reach anyway** - a body crosses 4 and strikes, so 5 total. That is why I did
**not** raise the bow to 6: it would clear a plain human and still lose to a ratkin, a spear, a dog,
any captain and the Thing in Armour. Distance gets held by *moving*, not by standing further off.

👤 **YOUR CALL:** enemy slings are still **4**, and I left them there on purpose. The chaff slings
are 4 and the good shooters (the Sling-master, the Marked, the circle) are already 5, which looks
like a gradient you designed rather than an oversight. **Say the word and they all go to 5.**

### 7. The spear line  *(#128)* - same fight

Watch the two **Ratkin, long spear** in front of the slingers.

**They should plant the spear and brace**, and anything of yours stepping into that reach takes the
point of it. They should **stand in front of the archers** rather than running at you.

⛔ **This formation already existed in that fight and its spear wall had never once fired** - not in
any battle, ever. Three separate reasons, all of them "only the player's click could raise a wall".
**And your own spearwoman under AUTO could not raise one either.** She can now.

Measured over six runs: walls raised **0 → 12**, bodies caught stepping into one **0 → 16**.

### 8. Feedback at the end of a run  *(#125)*

Win or lose, the ending card now has **two** buttons: the wagon, and **Say how it went**, which opens
the questionnaire. Back returns you to the ending card.

⚠ Nothing about it *sends* anywhere - it copies to your clipboard, as it always has. That was a
deliberate decision back in 8f.105 and it has not changed.

---

## 🎒 THE COMPANY SHEET, ROUND THREE  *(#140 · 2026-08-13 · build log 8f.168)*

**Your twelve points off the stats-band screenshot.** Same three steps: continue the run, open the
company screen, click anybody.

| # | your words | what to look for |
|---|---|---|
| 1 | *"reorginise this block - probably a bit mor info about damage"* | the damage is its own big gold cell with the reach beside it. **Hover it**: the dice the weapon rolls, what their arm adds, what build and nerve add as a percentage, and what it therefore lands for |
| 2 | *"put it while hovering on 'light'"* | ARMOUR STOPS is out of that row. **Hover the LIGHT / MEDIUM / HEAVY word** in the armour bar instead: it gives the absorb rule, the split, and how many points there are to chew through |
| 3 | *"at least 50% more space for perks / inventory"* | the right pane is 450px where it was 300 |
| 4 | *"could be written below figure"* | the scars and changes are a row of chips **under** the figure now, not a column beside it |
| 5 | *"Portrain and icon feel better at the left sied"* | portrait and battlefield token lead the top row from the left |
| 6 | *"delete phrase"* | the label is just THE BODY |
| 7 | *"Add one more item slot - a bag"* | bottom left of the figure, wired to the hip. **It is deliberately empty and says so**: nothing in the game can go in it yet, and it is there so the first throwable has somewhere to land |
| 8 | *"Main hand = right hand. Right now is left"* | the weapon is drawn on **your** left, which is the figure's right hand, and the MAIN HAND box moved to that side with it |
| 9 | *"more space between hand and body"* | there is daylight between each arm and the torso |
| 10, 11 | *"Delete WHO THIS IS" · "Delete click a stash item..."* | both gone |
| 12 | *"Use the name of company"* | the top-left title is the two words you picked at the Three Bells |

**What would be a bug:** the damage hover disagreeing with the number beside it · the weapon drawn
on the wrong side for one race but not another · the bag accepting an item · a wire crossing the
body · the company name missing on an old save (it should fall back to THE COMPANY, not go blank).

**One correction to what round two told you:** that note said the ACTIONS crystals would show a
three-action Captain. **They will not, because no such body exists** - every person on your roster
has two actions, and the three-action line in the code belongs to enemy statblocks. The row is
still worth having for exactly the reason you gave (later builds, stronger characters); it just is
not doing anything for the Captain today.

**Numbers:** 678px with **zero scroll on all three races and the Captain**, across four kits.
Shot: `shots/140_company_sheet_round3.html`.

---

## 🎒 THE COMPANY SHEET, ROUND TWO  *(#136 · 2026-08-13 · build log 8f.164)*

**Your eleven points, all of them in the build.** Same three steps to reach it: continue the run,
open the company screen, click anybody in the left rail.

| # | your words | what to look for |
|---|---|---|
| 1 | *"the middle part take a bit smaller space"* | the body block is 196px where it was 232, and the doll box 362 where it was 400 |
| 2 | *"More proper char image... like caves of qud"* | **the kit is worn now.** Put mail on somebody and the torso goes steel with shoulder caps; put plate on and they get a helm; leather goes brown. The weapon is in the hand: a bow is an arc, a spear a long shaft, a two-hander a heavy head, anything else a blade. A shield or a quiver shows in the off hand |
| 3 | *"Taking too much space now... like in battle logic"* | armour, hitpoints and nerve are stacked in a narrow column, exactly the battle plaque's shape, and the four attributes take the width that frees up |
| 4 | *"Delete: hover for the rest"* | gone |
| 5 | *"Picture on the field closer to a portarait"* | top right is a painted portrait, with the battlefield token under it |
| 6 | *"follow the showing of battle"* | hover a **gear slot** or a **scar/change chip**, not just a skill: same dark popover, same name / receipt / one sentence |
| 7 | *"You still need to show action"* | ACTIONS sits first on the stats line, drawn as the battle's crystals. The Captain shows three |
| 8 | *"Icon of stush also consistent with global map"* | the stash tab wears the road bar's drawn leather sack, not the emoji |
| 9 | *"More classical rename"* | STRENGTH / AGILITY / INTELLECT / MORALE. **This one was already done** in another session's #134 before your note arrived; nothing was changed for it |
| 10 | *"accordion. And I 100% want number of kills (with heads)"* | WHAT HAPPENED TO THEM is one clickable line, and **its head carries the heads and the count** (◉◉◉ ⬩⬩⬩⬩⬩ · 8 DEAD) |
| 11 | *"Make it very clear, when i have perk to spend"* | four signals: the tab turns gold and pulses and reads **SPEND IT**, a badge counts them, a banner under the tabs jumps you there, and **a ★ appears in the roster rail** so you can see who is owed without opening them |

**What would be a bug:** a weapon drawn that is not the one equipped · armour drawn on a body
wearing none · a slot's leader line pointing at the wrong body part on an ogre or ratkin · the
kill heads disagreeing with the after-battle screen · the perk star staying after you spend.

**Numbers:** still **678px, no scroll**, now including a body carrying a change, a condition, the
circle, three scars and ill-fitting armour all at once (that case used to scroll; the marks list
scrolls inside itself instead). Shot of both tabs: `shots/136_company_sheet_round2.html`.

---

## 🎒 THE COMPANY SHEET, REBUILT  *(#133 · 2026-08-13 · build log 8f.161 · IT IS IN THE GAME NOW)*

**Your ask, the voice note with five screenshots** (Urtuk, Battle Brothers, Caves of Qud, Wartales,
Wildermyth): *"too much information and not clear whic one is important and what means what"* ·
*"it's maybe nice to start screen with main studs"* · *"paint very simplified picture of human or
red or ogre and also place artifacts on top of it as in case of good [Caves of Qud]"* · *"choice of
perks in separate tab"* · *"Much shorter description of skills, like do it as in battle... when you
hover, but not more"* · *"characters descriptions right now, they're too big... I like button
brothers in this case."*

**How to reach it in three steps:** continue your run → press the company/inventory button on the
road bar → click anybody in the left rail.

**What should happen.** The sheet is **one screen with no scrolling**. Top left: the name, three
chips (race · class · level, each with its old hover) and ONE line of personality. Top right: a
small picture of that person **as they look on the battlefield**. Under it, first, the stats: the
four tells, then armour, hitpoints and nerve as the same bars the fight uses, then one line for
swing, to-hit, dodge, step and what the armour stops.

Then **the body**. It is a real silhouette now, and it is different for a human, a ratkin and an
ogre. **The four gear slots sit around it with a line drawn to the part they hang on.** Click a
slot to strip it, click a thing in the stash to put it on. Scars are red marks on the part they
happened to; a change glows teal; both are also named in the list to the right of the body, and a
change says which skill it gave you. The Captain's pet slot is there too, on his sheet only.

Then **the skills, as the battle draws them**: one small card each, with the damage on its face and
the cost as diamonds, and **hovering gives you the same receipt and one sentence the battle gives
you**. The long written-out list is gone.

Then **what happened to them**, which now has room for two memories and the roads walked.

**The right-hand pane has two tabs: 🎒 THE STASH and ★ PERKS.** The perk tree is the whole tree,
grouped by the level that opens each rung. **The green badge on the ★ tab is a banked perk point**,
and it shows from either tab. Spending a point keeps you on the perks tab.

**Numbers, if you want them:** the same character (level 4, two scars, the gills, two memories, a
banked level and a banked perk point) was **1241px of scrolling sheet and 564 words**. It is now
**678px, no scroll, 242 words**.

**What would be a bug:** a slot's line pointing at the wrong part of the body · a scar drawn
somewhere it did not happen · the perks tab losing your place after you spend a point · a stash
item's ▲▼ comparison disagreeing with what actually happens when you equip it · anything from the
old sheet you can no longer find (medicine chest, let-them-go, the nerve ladder hover, the stat
ladders).

**Still open, and small:** a body carrying *everything at once* (a change AND a condition AND the
circle AND three scars AND ill-fitting armour) makes the marks list 65px taller than the window, so
that one case still scrolls a little. The fix is written down and takes a minute; it was left
because a second session took the file mid-build.

**The design template that produced this is still there** if you want to compare what was proposed
against what was built: `shots/133_company_sheet.html`. The build's own shot, both tabs, is
`shots/133_company_sheet_built.html`.

---

## 🎒 THE COMPANY SHEET TEMPLATE - THE PICTURE THIS WAS JUDGED FROM  *(#133 · 2026-08-13)*

**Your ask, the voice note with five screenshots:** *"too much information and not clear which
one is important"* · *"start screen with main stats"* · *"paint very simplified picture of human
or rat or ogre and place artifacts on top of it as in Caves of Qud"* · *"choice of perks in
separate tab"* · *"skills... as in battle when you hover, but not more"* · and mid-session:
*"start from building design template, as usual, rather than updating main file."* So this is a
template to pick at, and the game is untouched.

**How to reach it in two steps:** start the local server if it is not running (`tools\serve.ps1`
or the usual preview) → open **`http://localhost:8777/shots/133_company_sheet.html`**. (Opening
the file straight from disk also works, except the frozen current-screen frame stays empty:
that frame needs the server.)

**What you are looking at, top to bottom:** the measured numbers (your current sheet is 1241px
of scroll in a 678px window, 564 words) → **the current screen, frozen from the running build**
(scroll inside it, that is the finding) → **the proposal, live**: hover the five skill cards,
switch THE STASH / ★ PERKS tabs, click a perk to spend the banked point, open the story
accordion. Gold pins quote your own words at the zone that answers them → the three race
silhouettes close up, with the battle sprite in the corner as calibration → what deliberately
did not move, the parked bags, and **three questions for you** at the bottom.

**What would be a "bug" here:** any zone where the template answers a different sentence than
the one you said · the doll silhouettes reading as the wrong amount of picture · a thing you
use today (medicine chest, dismiss, strip-to-stash, the perk point) that you cannot find on the
new shape. Say it in any order; the next session builds the picked version into the prototype.

---

## ⚔ THE AFTER-BATTLE SCREEN, ON THE BATTLE BROTHERS SHAPE  *(#122 · 2026-08-12 · build log 8f.149)*

**Your ask, three rounds in one day with your BB screenshot:** *"I love battle brotheres info. It
gets you in one go - who did what"* · *"Don`t give choices about artifacts get - just give
artefacts"* · *"Show name of your company"* · *"push it to a main build, when it is unlicked."*

**How to reach it in three steps:** continue or start a run → walk into any road fight (Blood on
the Road is two nodes in) → win it. The tavern brawl and the clash keep their own aftermath prose
cards first; every fight then lands on the new report.

**What should happen, screen one:** your company's name over the outcome title, one narrow
paragraph of prose, then **a card per person**: their painted face, ☠ kills · ⚔ damage dealt ·
🩸 damage taken. Somebody carried off wears a **bloody frame with the scar named on the card**;
the one who levelled wears a **gold arrow and "level N · spend it on the sheet"**; both can sit
on one card at once. Below: **the loot arrives by itself, no question** - a gear haul is a boxed
strip with an empty dashed square (that square is where your item art will land), a plain
resource haul is one mono line. Then a collapsed line "▸ THE FIELD THEY LEFT · N dead" that
opens into who they were. **No crowns/provisions/salvage total on this screen any more.**

**Screen two exists only when somebody is begging** and holds ONLY that decision. The pick
settles in place and the road button lights. On a fight with no prisoners the first screen's
button is already "Back to the road": one screen, done.

**The level-up choice moved to the sheet.** After a stat level, open INVENTORY → that person:
the WHO THIS IS label says **"1 LEVEL TO SPEND. CLICK A TRAIT"** and the four trait words are
outlined green; click one and it spends. A perk level banks a perk point exactly as "Decide
later" always did.

**What would be a bug:** a levelled or scarred person with no mark on their card · numbers that
look like floats · the accordion opening on its own · a resource haul drawn in the boxed strip ·
any resource total at the foot of the screen · a mercy fight whose road button lights before the
pick · a stat point that cannot be spent from the sheet · the company name missing on a run that
has one (a save from before the naming card correctly shows none).

---

## 🃏 THE CHOICE-WEIGHT PASS: NINE EVENTS GOT SIMPLER  *(#123 · 2026-08-12 · build log 8f.150)*

**Your ask, off the ChatGPT conversation about decision fatigue:** *"for 30%-40% of events it
could be done of simplifieng: battle with rats: fight or go around · Broken church - just get
resources from it (salvage) - no other choices · with fen mother 1 less choice · and etc."*
The conversation's rules are in `01_GAME_CONCEPT.md` §5 now ("The choice economy"); nine events
were cut against them.

### How to reach it in three steps

1. Menu → **Take the road** (a run; the changed cards are road events).
2. Your three named ones: **The Stone Field** (sling-line) and **The Fen-Mother** are on every
   run's road; **The Drowned Chapel** is a floating card, so it may take a run or two to draw.
3. The other six are also floating: the Sunken Wain, the Hollow Tree, the Collector, the Wedding,
   the Waterworks, the Last Ship.

### What should happen

- **THE SLING-LINE has exactly two doors: fight, or pay to go around.** The "answer them, ours
  shoot too" door is gone (it started the identical battle).
- **THE DROWNED CHAPEL is one button: wade in, take the salvage.** No praying, no sending anybody
  under the altar. It should read in two seconds and feel like a pickup, not a question.
- **THE FEN-MOTHER has three doors: back away · take the tooth · kill it.** The "go round the
  back" ambush door is gone.
- The Wain offers the risky strongbox or one merged safe door (salvage AND the maul together).
  The Hollow Tree lost "sleep in it", the Collector lost "explain kindly", the Wedding lost its
  trade door, the Waterworks lost "camp under it", the Last Ship lost the bell.
- **Round two (your "additional 20%", build log 8f.151), five more, each down to three doors:**
  the Bonepicker's Camp lost "sell him a gem" (the pedlar keeps the road's one gem trade), the
  Salt-Wives fold the road gossip INTO the honest purchase (buy the salt properly and they also
  tell you what is ahead; the separate paid question is gone), the Clan Cart lost the crossbow
  purchase, the Door-Shrine lost the coin offering, and the peat grave lost "take the blade".
- The rhythm this is buying: light cards answered instantly, so the heavy ones (the star, the
  toll-man, the fire) get your full attention when they land.

### What would be a bug

- Any of the nine cards still showing its cut door, or a card with zero clickable doors.
- A dead button, a battle that will not start from the remaining doors, or the maul not arriving
  with the wain's salvage.
- **One judgement call to veto if you meant it literally:** a company with the gills mutation
  still gets a fourth chapel door ("send the gilled one down"). Everybody else sees one button.
  If "no other choices" meant that one too, say so and it goes.

---

## 🗺 THE LAST NINE MAP SIGHTS  *(#121 · 2026-08-12 · build log 8f.148)*

**Your ask: "more events icons - add them to a global map".** GPT's nine remaining icons are in.
**Every event that has art now has it on the map** - 32 sights embedded, 31 mapped.

### How to reach it in three steps

1. Menu → **Continue the road** (or **Take the road** for a fresh run).
2. Look at the map. Nothing to click.
3. The five new fixed ones are **The Falling Star** (far west, the first stop), **The Broken Men**
   (north), **The Snare** (south), and on the east side **The Long Fire** and **The Warm Spring**.

### What should happen

- Those five nodes are **paintings**, not the old abstract diamond. Same 96px as the ones you
  already approved, same silhouette ring, same foot caption.
- Four more (**a stranded ship** · **a hole opening in the peat** · **a woman in a broken cage** ·
  **a hooded circle round a fire**) belong to floating slots, so they show up **only when a run
  deals them**. You may need more than one run to see all four.
- **The price chips on the two roads down the east side moved 64px west.** That is deliberate and
  it is the only layout change in this build. Everything else on the map is exactly where it was
  this morning.

### What would be a bug

- A **blank gap** or a broken-image mark where a painting should be.
- A **price chip sitting on a painting or on a name**, anywhere on the map, from any place you
  stand. This was the thing that broke when the nine went in, and it is fixed, but it is the
  first thing to look at.
- A price chip so far from its road that you cannot tell **which road it is pricing**. It is
  capped at one name-plate's width, but that cap is my judgement and not a measurement.
- One of the nine reading as **a pile of stuff rather than a place**. If one does, say which: the
  fix is a new source from GPT, not a code change.

### What nobody has done yet

**Looked at it.** The preview pane composites no frames again, so this build was verified by
counters and by measuring the DOM, not by eye. If you want the nine on their own before you play,
the page that showed the nine on their own (`shots/121_new_sights.html`) was deleted in the
2026-08-14 shots cleanup. They are all on the map from the first screen, which is the better look
at them anyway.

---

## 🍺⚔🏷 THE NEW OPENING: FIGHT FIRST, CONTRACT AFTER, A NAME, AND A MAP TOUR  *(#118 + #119 + #120 · 2026-08-12 · build logs 8f.145-147)*

**Your five-task batch, built autonomously.** The whole opening is reordered to your script, so
this one is best tested as a single fresh run: menu → **Take the road**.

### The new order of the opening (#118)

1. **One card, no lord yet.** You are a nobleman-venturer whose far-shore trade came to nothing,
   who will not kill for money, alone with one ale. Harl needles you, his friends step out, he
   tips YOUR pint over your head. One option: **Draw your sword.**
2. **The brawl** - unchanged from #108/#111, spotlights and waves and all.
3. **After you win:** THE ROOM SETTLES now ends at **The corner table** - the rich man who watched
   from the corner with his two hired swords crosses over, drops the purse, and makes the
   Skelbrook offer. **The three replies are still there** (floor him / take the purse / joke), same
   money, same paintings, same verdict banner.
4. **If you LOSE the brawl:** same offer, different arrival prose. Losing still opens the world.
5. **Then the name** (see below), then the map.

### The company name (#118)

- After the contract's outcome card, **A NAME FOR THE LEDGER**: seven first words, seven second
  words, a big preview, all combinations deliberately a bit ugly (THE HALFPENNY ORPHANS, THE
  DROWNED COUSINS). Pick both halves, **Chalk it on the wagon**.
- **The name is then written along the bottom of the world map**, small, centred, and it survives
  save/reload.

### The map tour (#120)

- The first map card is SHORT now: the wagon, the letter, the pillar. Dismissing it starts
  **five spotlights in the first-battle format**: the contract plaque · crowns and provisions
  (with the real daily wage number) · the company strip · the day disc · the company token with
  "click a place to see what it costs". Click anywhere to advance; after the fifth the map is
  yours. **Once per run** - reloading and continuing must NOT replay it.

### The menu (#119)

- "How any of this works" is gone from the menu. In its place: **The tutorial fight** - the
  brawl as a free practice fight, spotlights included, no run touched, losing costs nothing.
  The rules themselves still live behind **? RULES**, bottom-left, on every screen.

### What would be a bug

- The old lord-insult card appearing anywhere before the brawl.
- Reaching the map without being asked for a name, or a map with no name along the bottom.
- The name signature blocking clicks on a node near the bottom edge (it must be click-through).
- The map tour replaying on a continued run, or a spotlight pointing at empty space.
- The tutorial fight from the menu touching your real save in any way.
- Prices: floor 40 · silent purse 80 · failed joke 50 · landed joke 120, all after the brawl.

---

## 🗺🏷 ROUND NINE: NAMES UNDER THE PAINTING, PRICES OUT OF ITS WAY  *(#117 · 2026-08-12 · build log 8f.144)*

**Your three points off the round-eight screenshot.**

### What should happen

- **The whole painting is visible.** The name sits below the art's bottom edge now (it used to
  lie across the last 24px of it), so nothing covers the picture.
- **No road price sits on a painting any more.** The label that lands the days and coins on the
  map used to know only about the name plates - it had never been told the paintings exist,
  which is why it parked itself on the wain and on the pedlar. It avoids both now. I did not
  check this at the one spot in your screenshot: I drew the map from **all 24 places you can
  stand** and measured every label against every painting and every name. Zero collisions.
- **The price label is small: just `2d · ◉20`.** The character line under it ("longer, wet the
  whole way") is gone from the map.
- **That line is not lost.** It still appears on the card that opens when you pick a road at a
  fork: *"This road: longer, wet the whole way."* That is the place where you are actually
  weighing one road against another, which is the only place a description means anything.

### What would be a bug

- A price label touching a painting or a name anywhere on the map.
- A name that still overlaps its own picture.
- The fork card losing its "This road: ..." line.

## 🗺🧼 ROUND EIGHT: CLEAN CUT-OUTS, FOOT CAPTIONS, NO MORE HIDDEN SIGHTS  *(#116 · 2026-08-12 · build log 8f.143)*

**Your three points off the round-seven screenshots.** Reload the page first: the art bytes
changed again.

### What was actually wrong with the "background"

The tinted square behind most paintings was not a background I drew. The source images carry a
nearly invisible haze across their whole canvas, and the coloured outline effect lit it up as a
solid slab. The pedlar never had the haze (he is one of the three chroma-cleaned icons), which is
why he was the one that looked right. The build now scrubs that haze out of every icon, so **they
are all made like the pedlar now**, exactly as asked.

### What should happen

- **No tinted square behind any painting.** Just the cut-out, its thin coloured outline, and a
  soft ground shadow. If you still see a slab behind one specific icon, name it.
- **20% smaller**: the landmarks are 96px now, down from 120.
- **The name is a caption at the landmark's foot**, laid across the painting's bottom edge, not
  floating in its middle.
- **Every road slot that has a painting shows it from the start of the run.** The pedlar's cart,
  the wedding awning, the toll frame: visible from minute one, permanently. What stays hidden
  until you arrive is the NAME: an unvisited slot still calls itself *"Word of something ahead"*
  under its own painting, and the hover still refuses details. Standing in it swaps the rumour
  for the real title.

### What would be a bug

- A tinted slab behind a painting (one icon escaping the scrub).
- A caption you cannot read against its own painting.
- A slot whose painting appears only AFTER arrival: that is the old rule leaking back.
- The map giving away an event's TITLE before you stand in it. The picture is free now; the words
  are not.

## 🗺🖼 ROUND SEVEN: THE SIGHTS AT 250%, THE CAPTAIN ON THE RIGHT  *(#115 · 2026-08-12 · build log 8f.142)*

**Your two corrections to #114, shipped the same hour.**

### How to reach it in three steps

1. Reload the page (the art data changed, a stale tab shows the old size).
2. Look at the map: the paintings are two and a half times the size, standing on their
   node points like landmarks, each with a thin coloured outline. They come from the sharper
   128px masters now, not the small files stretched.
3. Find the company token: the Captain is the RIGHTMOST figure of the front rank, the way the
   column faces. The named people stand to his left, the hired fill the ranks behind.

### What should happen

- **The name plates did not move and stay readable.** The painting towers over its own name.
  Measured: no painting sits on any name plate on the current map. The Warm Spring moved 12px
  east so the Hill Steading's painting clears its name.
- **On the tightest pairs the paintings themselves may touch or overlap** (the Dead Company and
  Bonepicker's Camp share a band). That is the price of 250% and mostly invisible in the
  cut-outs' transparent padding. If a specific pair reads wrong on your screen, name it: the fix
  is a small coordinate move, not shrinking everything.
- **Clicking and hovering the painting works**: the whole landmark is part of its node's button.

### What would be a bug

- A blurry painting (would mean the old 48px files are still embedded; they are not).
- The Captain anywhere but the right edge of the front rank, or not the tallest.
- A painting covering a name so it cannot be read.

## 🗺👣 THE MAP POLISH: BIGGER SIGHTS, A DEEPER COLUMN, UNPAID BITES  *(#114 · 2026-08-12 · build log 8f.141)*

⚠ *Round seven above resizes this round's icons 48 -> 120px and moves the Captain to the right
edge of the front rank. The rest of this section (ranks, UNPAID, the reveal rule) still stands.*

**Your six map fixes.** The paintings left their boxes and grew to their full 48px, the company
marches in ranks with the Captain and the named people at the head, and an unpaid day now costs
real mood instead of printing a counter.

**One point first, about "use icons for events that you know": that was already in.** All 22
usable icons of the 23 went onto the nodes earlier today as #113. Your screenshot shows Blood on
the Road as an outline X, which the current build does not do - it draws the ogre-and-ratkin
painting there. That screenshot almost certainly came from a tab opened before #113 finished.
⛔ **Reload the page first. If Blood on the Road still shows an X after a reload, that is a real
bug and I need to know.**

### How to reach it in three steps

1. Continue (or start) a run and look at the map.
2. Find the company token. Then hire past ten bodies (the two muster fields) and look again.
3. Let the chest run dry and walk one leg of road with 0 crowns in it. Watch the mood chip.

### What should happen

- **A painted sight has no box any more.** The cut-out stands straight on the map at its full
  48px (a third more painting than the boxed 36), with a thin coloured outline drawn around the
  painting itself. The
  outline speaks the old border's language: red on a battle place, gold when the road there is
  open for you, blood-red under your cursor and where you stand. The soft pulse on a reachable
  node is still there, behind the picture.
- **The plain shapes keep their boxes.** A diamond or an X without a frame is a speck, so the
  places with no painting (Grausen Hold, the Falling Star, the unrevealed road slots, the Snare
  and the rest of #113's honest fallbacks) look as they did.
- **Two road slots moved a few pixels** (one on the water road, and the Warm Spring) so the taller
  paintings keep clean air between name plates. The spacing rule was re-run and returns zero.
- **The company reads as a column with a head now.** The Captain stands in the front rank, first
  in it, a head taller than everybody (10% on top of everybody's own 10% growth). Vesna, Skree,
  Bruht, Marrow and the other named people stand in the front rank with him; hired spears fill
  the ranks behind. Five to a rank: four people are one line, eight are two, thirteen are three
  (5+4+4, and the fullest rank is the front one).
- **UNPAID is one word now.** No day count on the chip. Instead, **every day the chest cannot pay
  costs the company 10 mood**, which is roughly a rung a day on the ladder: three unpaid days walk
  you from AT EASE to the edge of ON THE BRINK, and the mood chip is where you read it. The hover
  on the chip explains all of it.
- **What did not change about being unpaid:** the owed still lose nerve on the field (4 a day
  each, personalities disagreeing), somebody may still walk at five days, and filling the chest
  still settles everything at day's end.

### What would be a bug

- ~~A painting on a road slot you have never stood in.~~ *Reversed by your order in #116 (round
  eight above): the painting shows from minute one now; only the name waits for arrival.*
- The Captain not in the front rank, or drawn level with a recruit.
- A mood drop that is not 10 on a day the wages went unpaid (a walkout costs 6 more on top, and
  that one announces itself).
- Any node's name plate sitting on another's after the two nudges. The check says they cannot.



## 🗺🖼 THE SIGHTS ON THE ROAD  *(#113 · 2026-08-12 · build log 8f.140)*

**Your icons are on the map.** Twenty-three of them, each on the node its event belongs to. No
setup: start a run and look at the map.

### How to reach it in three steps

1. Start a run (or Continue).
2. Look at the map. Eight nodes are already carrying a painted icon instead of the old outline
   shape: **Blood on the Road · The Ruined Steading · The Black Fen · The Stone Field ·
   Bonepicker's Camp · The Dead Company · The Hill Steading · The Door-Shrine**.
3. Walk into any node called *"Something on the road"*. When you arrive, it puts up its real name
   **and its icon at the same moment**.

### What should happen

- **The icon box is a little bigger than it was** - 40px instead of 33 - and its border is a little
  thinner (2px instead of 3). The border colour still says what kind of place it is, and the legend
  under the map still reads the same way.
- **Nothing on the map moved.** Not one node coordinate changed. If two places look closer than
  they used to, that is worth telling me, because the check says they are not.
- ~~**A road slot keeps its secret.** Before you stand in it, a *"Something on the road"* node
  draws the plain diamond it always drew - **no picture**.~~ *You reversed this in #116 (round
  eight above): the painting shows from minute one; only the NAME waits for arrival.*
- **A fixed, named place shows its sight from the start.** The Black Fen has the Fen-Mother on it
  from the first screen. That is deliberate - the map has always printed the name, so there is
  nothing left to hide.
- **Some nodes still have the old outline shape, and that is not a gap.** Grausen Hold, The Falling
  Star, The Broken Men, The Roadside Fire, The Muster Field, Coldharrow, The Long Fire, The Warm
  Spring, The Last Muster and The Snare have no icon in this pack. Three of the floating cards have
  none either (**The Circle**, **The Ground Opens** and **the shipwreck**), so a revealed slot that
  drew one of those three keeps the outline shape. They fall back to the shape and always will
  until somebody paints them.

### What I could not check, and would like your eye on

**I never saw the built map.** The screenshot path was not available this session, so everything
above was verified by measuring the page rather than looking at it. Two questions only you can
answer:

1. **Does a 36px painted cut-out read against the painted ground underneath it?** These are
   transparent cut-outs on a dark chip, sitting on a map that already has trees and hills on it.
2. **Is the map busier than you want it?** Eight icons now, up to thirteen by the end of a run.

If either answer is no, the fix is cheap and the number to move is the chip size - but it has a
hard ceiling at 41px before two pairs of nodes start overlapping, so the real lever would be
dropping the dark chip behind the art, not growing it.

### What would be a bug

- A node showing a picture that has nothing to do with it (an icon on the wrong event).
- A broken-image mark, or an empty chip where an icon should be.
- A node name plate landing on a neighbouring node, or a road price label landing on a name plate.
  Both checks return clean, so if you see one, the checks are measuring the wrong thing.
- An icon that stays bright when the rest of its node has gone dim (done, or too far).

---

## 🗺✨ THE ROAD SCREEN ROUND FIVE, AND THE FALLING STAR  *(#112 · 2026-08-12 · build log 8f.139)*

**Your four map fixes, plus the new event.** Four of the five are on the first screen you see, so
this one needs no setup: start a run and look at the top of the map.

### The four map fixes

- **The day came up out of the map.** DAY / time-of-day / where-you-are was a box hanging 36px
  over the top of the painting; it is inside the top bar now, still dead centre. The map got 36px
  back. Nothing about what it says changed.
- **The company on the road is 10% bigger** (each body 26 → 29px).
- **You are 10% bigger again, at the head of the pack** (32px, front rank, first place). Before
  this, "the leader is first" was true of the code and invisible on the screen, because thirteen
  bodies at one height have no head to them. **Look for the tallest figure in the front-left.**
- **The mood chip and the heart chip now say they are doors.** ⛔ This was a real bug and not a
  preference: both have opened a card since #106 and both were rendering with the *help* cursor
  and no hover state, because the `click` class they carry was never given a CSS rule. Hovering
  either now also draws a ruled **▸ CLICK: ...** line at the bottom of the tooltip, saying what it
  will cost (a party is N provisions, double rations are 3). The party and kit chips got the same
  row, since they had the same sentence buried in dim italic.

**What would be a bug:** the day plaque overlapping the contract plaque or the ♪ button · the
walking pack looking like a grid rather than a pack (the foot-overlap now tracks body height, so
if the two rows separate, that is this) · a chip with the pointer cursor that opens nothing.

### ✨ THE FALLING STAR - the new event

**How to reach it: start a run, finish the tavern, click the one road east.** It is the first stop
now, one day out of Grausen Hold, and every road runs through it.

- **The opening is now: tavern brawl → one night → THE FALLING STAR → one day → Blood on the
  Road.** Two fights with a decision between them instead of back to back.
- **The road is two days where it was one, and the wagon starts with 17 more crowns for it**
  (65 / 107 depending on whether your last company died). You should arrive at Blood on the Road
  *with more* in the chest than before, not less: measured, day 3 with 49 crowns where it used to
  be day 2 with 40.
- **One wish, four ways to spend it, and they are four different currencies:** the company's mood,
  the chest, one of *them* permanently, or *you* permanently. Nothing here is free.
- **The two permanent doors give one point of the person's WEAKEST stat**, and the line they
  speak is written from that stat. That is deliberate: a wish is for the thing you have not got,
  so a battle-mage asks to be able to hold a door shut and an archer asks for their hands. **It is
  written into their history and shows on their sheet for the rest of the run.**
- *"Give it to whoever needs it most"* does not let you pick. It goes to whoever is carrying a
  strange condition, then whoever is worst hurt, then whoever has gone longest unpaid.
- **The game never says the star did any of it.** The silver is a cart that came off the road in
  some other year. Low magic, and a wish is a thing people do, not a thing that works.

**What would be a bug:** the person who explains the custom in the body being a different person
from the one the outcome talks about · the outcome talking about you in the third person · a
permanent point that is gone after a save and reload · the map saying anything other than 1 day
for each of the two legs.

---

## 🚪⚔ THE BRAWL, ROUND TWO - your nineteen points  *(#111 · 2026-08-12 · build log 8f.138)*

**All nineteen shipped.** What to re-test, in the order you will meet it (the #108 section below
is superseded where it disagrees):

- **The room is a row taller** and there are **three corner pockets** now: your lower-left by the
  hearth, plus top-right and bottom-right. Each takes exactly one attacker at a time (verified
  with the game's own adjacency, not by eye).
- **The first spotlight says these are YOUR skills.** ARMOUR now fires when YOU first take a
  dent, on your own plaque, not on his blinking bar.
- **When Harl breaks, BROKEN gets its own spotlight on him**: breaking means running.
- **When two of them get a hand on you: CIRCLED**, holed on the DISENGAGE card, teaching the
  order: disengage first, then move.
- ⚑ **DISENGAGE is redesigned, in every battle**: one action buys clean movement for the REST of
  this turn (no parting swings, no zone of control) and one extra hex of movement NEXT turn. No
  bonus step of its own any more. The card's cost line and note say all of it.
- **The watchers beat** fires a round before the arrivals, with your line polished: on this
  island most would rather watch an unfairness than join a fight that already looks lost.
- **Wave two is a turn later and it is everybody**: Vesna, Marrow and Ilka (they walk out of the
  room as your crew) **plus the ogre barman**, who comes over his own bar with a club and gets
  the race intro spotlight. **No ratkin** anywhere on your side, per your ruling.
- **THE WRONG SIDE**: when they arrive you get a backstab and flanking spotlight and ONE free
  action that turn ("the legs for one more thing"). ⚠ Spend it on a STEP: a third swing with the
  same weapon is refused by the twice-a-turn ceiling.
- **KICK is taught as the first synergy** now: the moment an enemy has your blade and a friend's
  on him at once.
- **Cursors**: an arrow when a shot is aimed, a magenta spark when a working is, blade for melee,
  boots for moving. The over-target hit% and damage are a fifth smaller. **UNDO MOVE sits
  directly above END TURN.**

**What would be a bug:** Harl failing to reach the door once broken (his path is a real
pathfind now, and he scrambles even if you block his lane for two turns) · the brawl eating
provisions or ending in a hunger retreat (both are off here) · any spotlight in the wrong order
or on the wrong element · the free action arriving on any turn but the one after the crew stands
up.

---

## 🖱 THE CURSOR NAMES THE ACT  *(#109 · 2026-08-12 · build log 8f.136)*

**Your order:** the cursor follows the skill in battle (movement or strike) and shows travel on
the world map. Two drawn cursors now: **boots** and **a blade**, in the game's own gold and steel.

**How to reach it (three steps):** 1. Open the map: the cursor over the map, the nodes and the
road labels is boots. 2. Any fight, your turn: with MOVE selected the floor shows boots, and an
enemy body shows the blade **only when clicking them would actually swing** (the same gate that
lights the hex; corrected in 8f.137 - it used to show over out-of-reach enemies too). 3. Select
your weapon: the blade everywhere you could stand to swing.

**What should happen:** blocked hexes still show the barred circle · buttons and cards keep the
ordinary pointer · allies' turns and enemy turns change nothing. **What would be a bug:** a boot
cursor during an enemy turn, a blade over an empty hex while MOVE is up, or either cursor drawing
as a blurry or invisible smudge at real size. **The one thing only your eye can judge: do the two
drawings READ at cursor size?** They were verified to decode and to be applied, but nobody has
looked at them at 100% on a real screen.

---

## 🚪⚔ THE THREE BELLS BRAWL - the intro fight  *(#108 · 2026-08-12 · build log 8f.135)*

**Your order, built while you were out:** the run now opens with a scripted tavern brawl between
the prologue and the map, Banner Saga shaped. Small room, tables and stools, 1v1 against a drunk,
and the game teaches itself with **spotlight callouts on the real UI** instead of the Captain's
balloon (his eleven lessons stay in Blood on the Road, untouched and unspent).

**How to reach it (three steps):** 1. Menu -> **A new company** (your live save was snapshotted and
restored during the build; starting fresh is still a real wipe, so use a second browser profile if
you want to keep the current run). 2. Answer the lord any way you like -> **"Finish your drink."**
-> **"Stand up."** 3. You are in the tap-room. *(Safe replay any time: the practice field's first
row, **The Three Bells**.)*

**What should happen, in order:**
- A dim screen with a bright hole on the skill row: **THE ROOM**. Click anywhere to go on; a second
  hole lands on Harl's own hex: **DRUNK** (he carries a 🍺 badge, -12 to hit, -8 dodge).
- Trade blows. The first time iron soaks a hit: **ARMOUR**, holed on the plaque's armour bar.
- At about half blood Harl's nerve empties **on the real ladder**, he routs, runs for the door in
  two visible stages, yells, and is gone. **NERVE** spotlights the plaque's nerve row as he breaks.
  ⚠ If you kill him instead, his friends come through the door at that same instant: the waves
  cannot be skipped by winning fast.
- **Three carters come through the door.** Two spotlights: **THREE ON ONE** (the corner pocket by
  the hearth, bottom-left: it has exactly one open neighbour, so they queue) and **KICK** (your own
  race skill's card: push one hex straight back).
- Two rounds later, or sooner if you are hurt: **Vesna stands up at the bar** (her real roster
  self: blood she loses here she keeps) and **Chitt, a ratkin regular, picks your side** (ally,
  gold ring, poisons his knife: the race skill working for you). Spotlight: **NOT ALONE** on the
  turn rail. On Vesna's first turn: **HER TRADE**, holed on SPEAR WALL's card.
- Their nerve is soft: expect them to break and scramble out of the door rather than die. Win card:
  **THE ROOM SETTLES** (+8 crowns, +4 morale), then "Morning. The east road." and the map exactly
  as before. Losing is safe: **THE FLOOR OF THE THREE BELLS**, no scar, the world opens anyway.

**What would be a bug:** a spotlight holed on empty space or the wrong element · the balloon
lessons or a whisper toast firing during the brawl (both muted here) · a beg-for-mercy card in the
tavern · a live WITHDRAW button · a scar or injury from this fight, win or lose · the fight ending
with no wave ever arriving · Blood on the Road later arriving SILENT (its lessons must still fire
there; they are only muted inside the brawl).

**Three calls made without you, flagged for your review** *(spec #108 in the archive)*: the
transcription said "correct king"; no korrigan race exists, so the new-race friend is **the
ratkin**, and he is a one-off ally rather than a crew member, keeping the all-human-crew canon
until Blood on the Road. Vesna is the human friend who stands up (the lore's "woman who was
already standing"). And her spear's real signature is **SPEAR WALL**, so that is the class trick
taught, not BRACE AND SHOVE (the halberd's).

---

## Everything older

**Everything that shipped on 2026-08-11 and before was cut on 2026-08-14**, for the reason the
2026-08-10 cut above gives: a test bench nobody can get to the bottom of is not a test bench. Most
of it was superseded anyway, by later rounds of the same surface. The battle screen's rounds three
to eight were replaced by round nine, the road screen's rounds one to four by rounds five to ten,
and the company sheet's first draft by its third. Testing a round that no longer exists is worse
than not testing.

**Nothing was copied anywhere and nothing is lost.** Git holds every word of it, and one command
puts it back on your desk:

```powershell
git show 5bb2bf2:docs/WHAT_TO_TEST.md > older_test_bench.md
```

The same commit still holds the 2026-08-02-and-earlier bench, at
`git show 5bb2bf2:docs/archive/WHAT_TO_TEST_OLDER.md`, which the 2026-08-10 cut had moved into the
archive and which was deleted on 2026-08-14 for the same reason.

---

## Checked

*Move a section here when you have played it, with what you thought. That is what stops the same
thing being re-tested every session.*
