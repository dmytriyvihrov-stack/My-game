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
> **⚑ Cut down on 2026-08-10.** This file had grown to 3,822 lines, which is longer than anybody is
> going to read with a game running. **Everything from 2026-08-02 and earlier moved to
> [`archive/WHAT_TO_TEST_OLDER.md`](archive/WHAT_TO_TEST_OLDER.md)**, unedited. What is left below is
> the recent work, and it is short enough to get to the bottom of.
>
> **The other docs are unaffected.** [`README.md`](README.md) is orientation ·
> [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) is the work ·
> [`CHANGELOG.md`](CHANGELOG.md) is the record. This is the **test bench**, and it is the only one
> written to be read *while playing*.

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
open **`shots/121_new_sights.html`** - they are at their real 96px on the map's own ground colour,
with four already-live sights underneath for calibration.

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

## ⚔ THE BATTLE SCREEN, ROUND NINE  *(#105 · 2026-08-11 · build log 8f.132)*

**All eight of your points, and three of them turned out to be real bugs rather than taste.** Worth
knowing which, because it changes what you should be looking at.

**How to reach it.** Front door → **Continue the road** → walk into any fight. Or ⚙ DEV.MODE →
practice field, which is faster and does not touch your run.

**The black line at the top of the board (2) - this was a bug.** The hex grid starts ten pixels
above its own box and the painted ground started at zero, so the top rank of tiles was standing on
bare background. Gone. **But look at the ground itself too**: the same fix means every puddle,
tuft, stone and camp fire in the game has moved onto its own tile for the first time - they were
ten pixels low and, on every other row, eight pixels left. **If any battlefield now looks *worse*
laid out than you remember, that is the thing to report** - it is the change with the widest reach
in this build and it touches all six grounds.

**Moving the camera by hand (3).** Zoom to FIELD or CLOSE, then either **drag the ground** with the
left button, or **push the pointer into the outer edge of the field** and it scrolls, Battle
Brothers style. Clicking a hex still works - a press only becomes a drag past about 5px.
**It gives itself back on its own**: the moment the next body starts its turn the camera snaps back
to whoever is acting. That is deliberate (a camera you have to hand back is one you forget you
took), but **if it feels like it lets go too soon, say so** - it is one line.
⚠ **This is the one thing here that nobody has judged with a hand on a mouse.** The edge scroll
moves 11px every 32ms. Too fast, too slow, or too eager near the cards - all three are useful.

**Walking bodies (8) - this was a bug too.** A body that walked was being drawn at **40-45% of its
standing size** at the two closer camera stops, because the effects layer it walks in is outside
the zoom. It is 90% now, at every stop, with the feet on the same line the standing body's are.
**90% is my call, not yours** - it reads as "slightly further from the camera", which is what
walking looks like - but you asked for a number and 100% is one literal if you want it.

**The plaque is the other way up (6, 7).** Under the face: **ARMOUR / HITPOINTS / NERVE**, with what
is left at nearly double size and the pool it is out of small and quiet beside it. The hitpoint
number is now the same colour as its bar and the body's own bar on the board (blue yours, red
theirs, gold fighting beside you), so it brightens as they bleed. Along the bottom: the action
crystals, then a **drawn sword** and a **drawn foot** carrying the hit and dodge percentages, with
the explanation on hover. Those two are SVG rather than font glyphs on purpose - there is no
footprint character that does not come out as a colour emoji on Windows. **If either mark does not
read as what it is at that size, that is worth a line**; they are 12x14 and 11x14.

**The turn order (4).** Heads are **20% wider and 10% higher**, the rail starts 26px lower so it is
clear of the log, and **the acting head finally has all four sides of its gold frame** - the top
edge had been clipped since the rail turned vertical, which is exactly what you spotted. ⚠ **The
cost of the bigger heads is two of them: the queue shows 7 where it showed 9.** If you would rather
see more of the round than have them bigger, that is a trade I can put back.

**The cards and the words (1, 5).** Cards 60→72 wide, 82→86 tall, name 8→9px, and everything else on
the face up with it. The class line and the personality line under the portrait are 15% bigger.

**What would be a bug.** A card name clipped mid-word · the plaque's numbers spilling out of the
panel on the Fen-Mother or the Thing in Armour · a walking body sunk into the ground or floating ·
the camera stuck somewhere after a drag and refusing to follow the next body · a hex that will not
take a click · the ground looking misaligned on any of the six battlefields.

---

## 🗺 THE ROAD SCREEN, ROUND FOUR  *(#107 · 2026-08-11 · build log 8f.134)*

**Your four points.** Point 2 reverses your own #106 ask (the day went to the edge, now it is back
in the middle) — that is you seeing it built and changing your mind, which is the cheapest kind of
change there is. The dev buttons went back up with it.

**How to reach it.** Front door → **Continue the road**, then walk one road.

**The company on the road (1).** Every body is **20% taller** (22 → 26px) and they are **packed in
two rows**, front rank overlapping the back by 9px, **Captain in the front rank**. Four bodies
read as 2+2; eight read as 4+4.

**Day and time of day, in the middle (2).** The plaque says **DAY 1 MIDDAY** with the wheel beside
it. **Walk a road and watch the wheel**: it turns **one quarter per stretch of road**, MIDDAY →
DUSK → NIGHT → DAWN, and the word changes with it, because the word and the angle are the same
number read twice. Where it stops is the time you arrived, and it survives a reload.
⚠ **It is not a clock and nothing mechanical reads it** — no night penalty, no dawn bonus. If you
want the time to *do* something, that needs a rule about how long a day is, and that is your call.

**The rations offer went rare (3).** It used to appear before **any** battle node if anybody had a
scratch. Now all of these must be true: the road ends at **the Fen-Mother, the Snare, or the Thing
in Armour ambush**, and the **whole company averages 70% health or worse**. The card opens with
**"You feel danger."** ⚠ Measured: at 85% company health it stays silent even in front of the
Fen-Mother; at 65% it fires there and stays silent in front of the ordinary fights.
⚠ **The heart chip still sells rations any time you ask for it** — I gated the *offer* (the thing
that interrupts you), not the purchase, because the provisions chip is no longer a door and
gating both would leave no way to buy them at all. Say the word if you want the manual door gated
the same way.

**The health hover (4).** Every line now reads **name · race and class · hp** —
`Vesna human spearwoman 26/57`.

**What would be a bug:** the wheel turning while you stand still, or not turning as you walk · the
word disagreeing with where the sun is · the offer appearing before an ordinary fight or on a
healthy company · the Captain in the back row · the day plaque covering a node.

---

## 🗺 THE ROAD SCREEN, ROUND THREE  *(#106 · 2026-08-11 · build log 8f.133)*

**Your eight points, all in.** Two of them turned into more than they looked: point 4 was a real
bug, and point 8's heart was lying about how hurt the company was.

**How to reach it.** Front door → **Continue the road**. The two new doors are chips in the top
bar; the rest is the map itself.

**The quiet horizon (1).** The upkeep chip says **◉8/DAY** and nothing else while the chest is
healthy. At **three days or fewer** a red **"2 days left"** appears beside it. The full
arithmetic is still on the hover, every day. To see the red without spending a run: ⚙ DEV.MODE
console, `G.run.crowns=18;worldTick()`, then reload.

**The day, on the edge (2).** DAY and the sun-and-moon wheel are **one plaque, hard against the
map's top-right corner** now, so the middle of the sky is map again. The wheel still turns only
while you walk. ⚠ The developer column (⚙ DEV.MODE and the three tester buttons) **steps down
past it on this screen only** — that gap under DEV.MODE is deliberate.

**The contract (3).** Two lines now, **what it is over what it pays**, with a **golden trophy**
as the main-quest mark. It went from 451px of covered map to 235.

**The cut picture was your company (4).** Not spare art: `enterWorld` never placed the map token,
so on a **new** run the whole company sat half off the top-left corner with "THE COMPANY" clipped
to "MPANY". It places itself on every tick now. **Start a new company and check the token is
standing on Grausen Hold from the first frame.**

**The company on the road (5).** The single painted face is gone; the token is **every body in
the party as its own battle sprite**, shrunk to 22px, Captain first, and it trudges while walking.
A ratkin reads as a ratkin from the map.

**The barrels stopped being a button (6).** The provisions chip is a **readout**. What you spend
them on moved onto the two chips that name the effect:

**A party (7).** **Click the mood chip** → *Throw them a party*, **3 provisions**, the mood lifts
hard, once a day. ⚠ The cook-fire wagon fitting now makes it **2**, not 3 — I kept the fitting
meaningful rather than deleting its discount, and the card always states the price it charges.

**Double rations (8).** **Click the heart** → **3 provisions**, wounds mend twice as fast for
three days of road. **Hover the heart** and you get **every body, hp by hp** (`Vesna 17/57`).
⚠ **I corrected the heart while measuring it**: two scratches across four people used to paint it
fully EMPTY and call the company BLOODIED. Empty now means a third of all the blood is gone, or
somebody is under 45% and could fall in the next fight. Full → half → empty, honestly.

**What would be a bug:** the token anywhere but on the node at the start of a new run · the days
text visible when the purse is healthy · a party or rations card charging a price different from
the one it printed · the heart empty when everybody has a scratch and nobody is in danger · the
tester buttons under the day plaque.

---

## 🗺 THE ROAD SCREEN, ROUND TWO: THE BB DESIGN PASS  *(#104 · 2026-08-11 · build log 8f.131)*

**Your nine points off the annotated shot, all in.** This round supersedes half of the #103
section below it (the pawn, the pink pack, the "sun is an emblem" note, the second row).

**How to reach it.** Front door → **Continue the road**. Then click any open road once: half the
list only shows while the company walks.

**The chips (1, 2, 7, 8).** The party chip wears **the Captain's actual painted head** now, the
same portrait the map token wears. The sack is **drawn, leather-coloured**, no more pink emoji.
The mood chip speaks the **battle ladder's language**: same faces, same colours (😐 AT EASE is
the ladder's Ok, 💀 ON THE BRINK is Broken; road names, battle smiles). The company's blood is a
**painted heart**: full green when nobody is mending, **half amber** when somebody is, **empty
red** when it is a quarter of all hitpoints or half the bodies. Hover it for who and how much.

**The crown sign (6).** ◉ everywhere a crown amount shows on this screen: the upkeep chip
(**◉8/DAY**), the road labels (**1d · ◉8**), the TRAVEL button (**~◉8**). Same gold, same sign,
same meaning as the resource strip.

**The contract frame (3).** THE CONTRACT sits in a proper BB-style plaque now: badge, double
frame, floating over the map top left. Hover unchanged.

**The sun and the moon (4), and the slower road (5).** The black second row is **gone (9)**; the
day plaque hangs top centre over the map with a **round sky disc** under it. Standing still it
holds daylight. **Click a road and watch it: the sun sets behind the ground line, the moon comes
over, and it keeps turning until the company arrives.** The walk itself is **three times slower**
than yesterday, so a one-day leg is an actual journey and the disc gets its show. ⚠ The disc
turns only while walking, by design: the run still has no hours, so a standing sun that crept
would be a clock lying about a unit the game does not keep.

**The map got taller (9).** The 40px the dead row spent went to the map (638 → 678). Every node,
label, card and the walking token are re-mapped through one function; **if any node stands off
its painted road, that is the bug to report first.**

**What would be a bug:** a node off its road anywhere on the map · the disc turning while you
stand still, or holding still while you walk · the heart green while somebody mends · a bare
crown number without ◉ on this screen · the old ♟/🎒 glyphs anywhere · the contract plaque
covering a node or a road label.

---

## 🗺 THE ROAD SCREEN, ROUND ONE: THE TOP BAR  *(#103 · 2026-08-11 · build log 8f.130)*

**Your friends' "unclear what he is seeing", answered with your five points, on the Battle
Brothers shape.** All five are in.

**How to reach it.** Front door → **Continue the road** (or any run). Everything here is on the
map screen; no fight needed.

**The bar (1, 2).** Top LEFT is the company: **♟ seats** (click it: the company screen), a **🎒**
sack (click: the same screen), **UPKEEP N/DAY** with the horizon beside it in digits, the **mood**
word, and a new **✚ SOUND / MENDING / BLOODIED** word for the company's blood (hover it: who is
short how many hitpoints). Top RIGHT is what you own as one connected strip, mirrored off BB:
**◉ crowns · ❦ provisions · ▤ salvage · ◈ gems**, numbers first, names on hover. Provisions still
opens the barrels on click.

**The second row (2.5, 3).** Left: **✦ THE CONTRACT: the head out of Skelbrook's hall · pays on
delivery**. Hover it for the full brief. There is no secondary-quest line because there is no
secondary quest in this build; the slot only appears when something fills it. Centre: **☀ DAY N**
and the ground underfoot: the place you stand, or **"the road to X"** while the company walks.
⚠ The sun is an emblem, not a clock. The run has no hours to rotate it by, and I did not fake a
day cycle; if you want a real one, it needs your ruling on what an hour IS on this map.

**The deleted line and the red spot (4).** The italic sentence ("4 of you, 8 crowns a day...")
and the ◷ FUNDED chip are gone. The horizon rides the upkeep chip in digits now: dim **"14 days
of pay"** while it is nobody's problem, amber at five and under, **red "2 days left"** at two, and
a separate **red UNPAID N DAYS** chip the day wages are missed. To see the red without ruining a
run: ⚙ DEV.MODE console, `G.run.crowns=14;worldTick()`, look at the bar, then reload.

**The corner that collided (5).** Bottom left is one row now: **? RULES · ☰ MENU · the legend**,
no overlap. **♪ sits in the bar, top right**, on this screen only; everywhere else it stays where
it was.

**What would be a bug:** any node standing off its painted road (the map box must stay exactly
638px tall, and that is the thing this build protected hardest) · the plaque naming the place you
LEFT while the company walks · a chip with no hover · ♟ or 🎒 not opening the company · the legend
under MENU again · ♪ floating top right on the battle or menu screens.

---

## 🗡 THE BATTLE SCREEN, ROUND EIGHT  *(#102 · 2026-08-11 · build log 8f.129)*

**Your twelve points off the fifth annotated shot.** All twelve are in. Two of them turned out to
be more than furniture: **SPEED and NERVE were both telling you something that was not true**, and
those are the two worth a proper look.

**How to reach it.** ⚙ **DEV.MODE** → **PRACTICE FIELD** → **Blood on the Road**, which puts a
**spearwoman** and an **archer** in the same fight, so points 4 and 12 are both one click apart.

**⏱ SPEED, and why it "didn't work" (3).** It is at the **top right now**, under ♪ MUSIC, and
**the number is on its face**. It worked before: what it could not do was say so. The old label
counted in the engine's own unit, which is *how long a beat lasts*, so `PACE ×2.5` read like the
fastest setting in the game and was in fact the slowest one. It counts in **speed** now, the way
you meant it: **×1 is exactly the board you have been playing** and it cycles
**×1 → ×1.25 → ×1.5 → ×1.75 → ×0.7 → ×1**. **×0.7 is your "1.0, 30% slower"**. Press it mid-fight
and the very next blow should be visibly different.

**NERVE stopped being a green block (1).** Bottom left, it is the **third bar** now, in the same
shape as ARMOUR and HITPOINTS: the word in the rung's colour on the right, and a bar under it
saying where on the scale they are standing. **The four notches on that bar are the rung gates**
(Broken · Breaking · Ok · Happy · It rocks), so you can finally see *how close* somebody is to
slipping, which the chip never said. Hover it for the full ladder, exactly as before.

**The ? moved to the character panel (7).** It is the small square at the bottom right of the
plaque, beside the bars, and it **opens upward**. It cost no height: it took the slot the nerve
chip left.

**The two right-hand groups (2, 6).** Top right, one column: **FULL/FIELD/CLOSE · ⚙ DEV.MODE ·
♪ MUSIC · ⏱ SPEED**. Bottom right, one row: **END TURN with ⚑ WITHDRAW hard on its right**. The
withdraw button still goes dark red and refuses on the fights with no way out.

**The skill cards (4, 10, 12).** **KICK says PUSH. SPEAR WALL says AREA CONTROL.** COMMAND says
RALLY, HOLD THE LINE says GUARDS ALLIES, CRIPPLING SHOT says SLOWS THEM. **A plain weapon card
says nothing**, on purpose: its damage range is already the whole answer, and a tag under it
reading "damage" is the duplicate we have been cutting all week. The gap above the icon went from
10px to 3px and the card is 82px instead of 84.
⚠ **Be honest with me about point 10 when you see it: that is two pixels of board, not a row.**
The role line ate nine of the eleven the top gave back. If you want a real row back, the card has
to lose something, and I would want your ruling on what.

**The archer's two icons (12).** Her basic attack drew a **sword**, because in the code "main
weapon" is a *slot* and every slot got the sword glyph. It asks the weapon whether it shoots now.
**CRIPPLING SHOT is an arrow with a bar through it**, and the badge that lands on the target's head
is the same mark.

**The queue (9, 11).** The heads **fill their boxes** - a person now reaches top to bottom instead
of sitting in the bottom two thirds. A dog is still short, because a dog is short. And **rest on
any head for a moment and you get the same card the board gives you** when you hover that body out
there: same wait, same panel, same everything.

**The top of the board (8).** The shadow band is **gone**, not reduced. You asked twice and the
second time you said you were not sure what it was for, which was the answer: at the bottom it
sinks the ground under the cards, at the top it only ever dimmed the people standing up there.

**What would be a bug.** SPEED showing a number that does not match how fast the board actually
plays; the nerve bar and the nerve word disagreeing about which rung; the ? popover running off
the left edge or under the plaque; WITHDRAW and END TURN overlapping at any width; a queue head
clipped at the sides badly enough to lose a shoulder; the readout sticking after you leave a queue
head; a role line clipped mid-word.

⚠ **Still nobody has played this screen with a hand on a mouse.** Eight passes, all measured, none
played, and this round adds a **dwell** (rest on a queue head) which is exactly the kind of thing a
measurement cannot judge. That is the thing I would most like you to do with this build.

---

## 🗡 THE BATTLE SCREEN, ROUND SIX  *(#100 · 2026-08-11 · build log 8f.128)*

**Your fourteen points off the fourth annotated shot.** All fourteen are in. Open any fight and
look at four places: **the left column**, **the top right**, **the plaque**, **the top row of the
board**.

**How to reach it.** ⚙ **DEV.MODE** (it used to say TEST) → **PRACTICE FIELD** → **The Clash**,
which is the one fight with **allies** in it, so you can check point 6 in the same look.

**The left column (1, 2, 8, 10, 11).**

- The **shut** log now starts at the same left edge as the heads under it, so the two read as one
  column. Open, it is **300x300** instead of 360x380 and **steps to the right** so it never lies on
  the rail.
- The **queue hangs off the top** of its band instead of floating in the middle of it.
- The gold ring on the acting head is **whole**. ⚑ It was never the log cutting it: the rail's own
  box was exactly one head wide and clipping the ring's right-hand half in every state, log or no
  log. Check it with the log open and with it shut - that was your ask.

**The rail's colours (5, 6).** Your whole company is **one teal edge**, the Captain included, and
the ring is the only thing that says *acting now*. **Gold is an ALLY** - somebody fighting on your
side who is not yours to command. Hover any head for the name; an ally's hover says so.

**The top right (3, 4).** **FULL / FIELD / CLOSE** has the corner back. Under it: **♪ sound**, up
from beside END TURN, and **⚙ DEV.MODE**, down from the corner and renamed.

**The plaque (7, 9, 12).** The line reads **Lv 1 · ⌇ SPEARWOMAN · ◆ human**, in that order.
**Hover the class or the race** and you get the same explanation the character sheet has been
giving since 8f.117, including what is on *that person's* bar right now. Beside **ARMOUR** there is
now a weight: **LIGHT · MEDIUM · HEAVY**, and its hover says what that costs. It is read off the
size of the pool, so an enemy who was never handed a gear entry still gets an honest answer.

**The capsule (14).** **↻ II**, no word, the same glyph the rail's round divider uses.

**The board (13).** The top band of shadow was **solid black fading out over four hex rows**, so a
body standing on the top row was painted through it. It is a third of that now. Put somebody on the
top row and they should read like a body standing in the open.

**What would be a bug.** The log lying on the rail at any width; the ring on the acting head cut on
any edge; two gold edges in one rail; a tooltip on the class or race that names the wrong person's
skills; an armour weight that disagrees with what is on the body; the top of the board looking
*flat* rather than merely unshadowed.

⚠ **Still nobody has played this screen with a hand on a mouse.** Six passes, all measured, none
played. That is the thing I would most like you to do with this build.

## 🏹 THE ARCHER THAT WOULD NOT SHOOT  *(#99 · 2026-08-11 · build log 8f.127)*

**This is your bug.** *"found a bag - that sometimes archer don`t shoot (at least in autobattle)"*.

**How to reach it.** ⚙ TEST → **PRACTICE FIELD** → **The Pack** (that board improved most), then
press **▶ AUTO** and watch Ilka. Run it three or four times: the old behaviour was intermittent by
nature, so one clean fight proves nothing either way.

**What was wrong.** Both AI brains picked a shooter's hex on **distance alone**. The archer walked
to a textbook shooting distance, two to four hexes back, and never once asked whether an arrow
could actually leave that hex. Behind your own shieldwall, or behind an oak, the answer was no. So
it stood there. Next turn it scored the same hexes by the same rule and stood there again. **It was
never refusing to shoot. It was standing where shooting is impossible.**

**What should happen now.** The archer should **step sideways out from behind its own line** to
open a lane, and it should be willing to leave its perfect distance to do it. A hex it cannot shoot
from is now worth twelve hexes of walking to avoid, which is more than the whole distance band, so
having a shot beats standing at the ideal range.

**Measured**, 112 battles each way: turns where the archer had a target in range and every lane was
blocked went **82 → 17** (run twice: 72 → 22). It looses an arrow on slightly more of its turns
(0.99 → 1.04 per turn). **Win rate and fight length did not move**, which is the point: this was
meant to stop a body doing nothing, not to make the archer stronger.

⚠ **It will now sometimes stand somewhere more dangerous.** A hex with a clean lane is usually a
more exposed hex, and the numbers show the trade honestly: fifty fewer turns lost to a blocked
lane, twenty-six more turns where something has closed on the archer. I judged that worth taking.
**Tell me if the archer now feels reckless rather than useful** and I will price exposure higher.

⛔ **Three things I did NOT fix, all of them measured, none of them what you reported:**

- **An archer with something standing on it still does nothing at all.** That is now the single
  biggest reason it is silent. A bow is off the table while engaged, which is the design, but the
  step-away-and-shoot behaviour exists only in the enemy brain and even there it is switched off the
  moment contact is made. **AUTO has none of it.** This is the next one worth doing.
- **About a quarter of archer turns have a decent shot available and spend the whole turn walking.**
- The Fen-Mother fight barely improved. Her board is the one still pinned by hand.

**What would be a bug.** The archer walking into the middle of the enemy line to get a lane; the
archer oscillating between two hexes and never shooting; any fight where it stands still for three
rounds with an unobstructed enemy in front of it. All three would mean the weight is wrong, and the
weight is one number.

## ⚔ WHOSE BODY IS THAT  *(#96 · 2026-08-11 · build log 8f.124)*

**How to reach it.** ⚙ TEST → **PRACTICE FIELD** → **Blood on the Road**. That fight is the only
one in the act with all three sides on the board at once.

**⬢ The health bar says whose body it is.** **Blue is yours · red is theirs · gold is fighting
beside you.** The hue is the side and the lightness is the wound, so each keeps its own three-step
ramp and gets brighter as it drops - the alarm the old bar had is still there. The plaque's bar
takes the same colour off the same helper, so the two readings of one body cannot disagree.

⚠ **The armour bar stays steel on everybody.** It is the shell, not the person, it sits directly
above the health bar, and colouring both would be two marks saying one thing and neither saying its
own. **Tell me if that reads as an oversight rather than a decision.**

⚠ **The pet counts as an ally** (gold), not as yours. It is the company's but it is not on the
roster and you do not command it. Say if you want it blue.

**⬢ Resting on a head in the turn rail lights that body on the board.** A gold ring on the ground
and a gold glow on the sprite. The rail carries no names by design, so this is the thing that
answers *"which of the eleven out there is that"*. A great beast lights **both** her hexes.

**⬢ Statuses moved onto the head.** They were already drawn - stacked **down the left edge** of the
hex, which is the busiest strip on a token (the weapon badge, the formation marks and the sprite's
own shoulder all live there), so a real feature read as an absent one. They are a row **above the
head** now, clear of the crest and the mood face by measurement: the band is -15 to -4, the mood
face starts at -2. Up to four; the hover card still lists all of them with what they do.

### What would be a bug

- a status band overlapping the mood face or the ⚑ crest at any camera stop
- the rail highlight sticking after the cursor leaves, or surviving into the next fight
- a health bar in the wrong family - especially the **clash allies**, who are side `you` and must
  be **gold**, not blue
- the plaque's bar and the token's bar disagreeing about a colour

---

## ⚔ THE BATTLE SCREEN, ROUND FIVE - YOUR SEVEN POINTS  *(#98 · 2026-08-11 · build log 8f.126)*

**How to reach it.** ⚙ TEST → **PRACTICE FIELD** → any fight.

| | what you asked | what is there |
|---|---|---|
| 1 | *"a bit less space from the top and bottom"* | FULL went **×1.58 → ×1.64**: 49px above the board is now **31**, and 13 below is **7**. ⚠ **Half of that space was not the camera** - #95 moved the rail off the bottom and left the card row parked at `bottom:48`, so 38px of the floor was a hole where the rail used to be. The cards are on the floor now |
| 2 | *"move elements, align nicer"* | one right-hand column, right-aligned, read from the floor up: **FEEDBACK · END TURN · ♪ ⏱ ⚑ · UNDO** |
| 3 | *"bigger units order; hide who already moved"* | see below |
| 4 | *"log narrower shut, wider and taller open"* | **150px** shut - a button - and **360 × 426** open |
| 5 | *"hide the reactions behind a small FEEDBACK accordion"* | **68 × 19** folded. One press opens it, and it stays open for the session |
| 6 | *"a star for a leader, the flag is for morale"* | ★ on the token, the plaque, the readout card and the class line |
| 7 | *"smaller chance, and full damage regardless of armour"* | see below |

### The three worth actually playing

**⬢ The turn order is a queue, not a cast list.** Whoever is acting, then whoever is **still to
come**; anybody who has already had their turn is gone until the round turns over. Where it turns,
a **↻ II** divider marks it and everything under it is next round's order. Heads went **30×34 →
40×46**, which is the smallest size a ratkin and a poacher are actually told apart at.
**What to look for:** at the top of a round the rail should be the full queue; by the last body it
should be almost all divider-and-next-round. Verified live: with three bodies left to act it read
*slinger · warp-sniffer · ogre · **↻ II** · Ilka · chieftain · Vesna…*

**⬢ The damage on the board is the whole blow now.** It used to print only the **hitpoint** half,
so against 44 armour an arming sword read `7-9`. It reads **`16-23`** - the full swing, carrying
the weapon, your bonus and the arc, and ignoring what the target's plate happens to eat. That is
the number you compare two cards with; the armour/hitpoint split is still on the hover card, which
is where a breakdown belongs. The **chance dropped to 9.5px** in the same edit, because with the
damage now the larger figure the percentage had to give up the emphasis.
⚠ **This is a deliberate reversal of an older decision** which argued that a full number "reads as
a promise the target does not keep". Your reasoning wins: at the moment of choosing, `7-9` tells
you about the plate, and the armour bar already says that.

**⬢ FULL is 4% bigger than an hour ago and still does not crop.** Top-rank head sits at y=18 with
13px of overhang, so nothing is cut. If it now feels tight again, the number is one constant.

### What would be a bug

- a body appearing **twice** in the rail, or the ↻ divider showing when the round has not wrapped
- the rail overrunning the plaque (it is capped at 9 heads in a 490px band)
- END TURN, the icons, FEEDBACK or the cards touching each other (measured clean at all three
  stops, with the log open and with FEEDBACK open)
- the damage on a hex disagreeing with the same blow's card, allowing for your damage bonus and the
  arc multiplier
- **any part of the screen looking unstyled.** See below

### ⚑ A guard went in, and it is worth knowing about

**A stray comment terminator in the stylesheet silently deletes every rule after it.** Nothing
throws, the console stays clean, and the page renders with a hole that looks like a design opinion.
It has now happened **twice in three days** - #95 dropped the whole log box to `position:static`,
and this session dropped everything from the icon row down, including both hex readouts. Both were
found only by measuring a box whose numbers made no sense.

There is now a sentinel rule at the very bottom of the stylesheet and a boot check that asks the
**parser** whether it got there. If it did not, the console says so in plain words and
`window.__cssTail` is false. *(The first draft of that guard quoted the offending characters in its
own comment and took the entire script down with a SyntaxError, which is either funny or the best
possible argument for the guard.)*

---

## ⚔ THE BATTLE SCREEN, ROUND FOUR - YOUR TEN POINTS  *(#95 · 2026-08-11 · build log 8f.123)*

**How to reach it.** ⚙ TEST → **PRACTICE FIELD** → any fight. Or play.

| | what you asked | what is there |
|---|---|---|
| 1 | *"Combat log fully closed at the beginning of the fight"* | header only, and it re-shuts at the top of **every** fight. One click gives the full 300px |
| 2 | *"turn order to the left and vertically"* | a column down the left edge. The lit mark turned with it: it is the **left** border of a head now, not the top |
| 3 | *"delete character's name + turn from the top"* | the capsule says **⛊ 6 · ROUND III · ☠ 3** and nothing else |
| 4 | *"delete amount of movement from the character card"* | three cells now: **ACTIONS · TO HIT · DODGE**. The MOVE card's face keeps the hexes |
| 6 | *"move a bit speed and withdraw"* | **⏱ ⚑** and **♪** sit in a row directly above END TURN, right-aligned to it |
| 7 | *"fix collision of screen sizes and TEST"* | fixed - **and a second one you had not reported**: ♪ sound was sitting on top of END TURN |
| 9 | *"you hid how to play"* | **? RULES is the log's footer now.** Nobody hid it: it has been at bottom-left since before this screen was full-bleed, and #91 put the plaque on that exact corner |
| 10 | *"Lv 1"* | `➹ ARCHER · Lv 1 · ◆ human` |

### The two worth actually playing

**⬢ A section is now the same amount on everybody** *(point 5)*. **One hitpoint section = 15. One
armour section = 10.** Everywhere - the plaque and every bar on the field. So you can count notches
across six enemies and know who has what without hovering anything.

⛔ **#94 had this wrong and this is the correction.** It scaled the *count* and capped it, so a
section meant "about a blow" on a ratkin and something else entirely on a boss - prettier, and it
answered no question. **What to look for:** stand next to two different enemies and check that
"three sections" means the same thing on both.

⚠ **The two bosses are the only bodies that break the scale**, and they break it by an order of
magnitude - the Fen-Mother is **470 hitpoints and 170 armour**, which is 31 and 17 sections. Rather
than cap her (which would have broken the promise exactly where it matters most), **her bar gets
LONGER instead of finer**: 54px against everybody else's 26. The length itself should read as
*"this pool is enormous"* before you count a single notch. **Tell me if it reads as a bug instead.**

**⬢ FULL shows the top and bottom ranks again** *(point 8)*. FULL was `×1.73`, which fit the board
*exactly* - and exact was the bug: a body stands about 8px proud of its own hex, so **the top rank
was losing 14px of head** to the field's edge. It is `×1.58` now, with **49px clear above and 13
below** (deliberately uneven - only the top end can crop a body, and only the top end has the
counts capsule floating over it). A top-rank head lands at y=37 against a capsule that ends at 34.
**What to look for:** put somebody on the top row, press FULL, and check you can see all of them.
The trade is that everything at FULL is **9% smaller** than yesterday. If that is too much, the
number is one constant.

### What would be a bug

- the log open at the start of a fight, or after leaving and re-entering one
- the turn-order rail touching the plaque or running off the top or bottom (measured clean at
  **13 heads**, the widest legal board, but that was geometry)
- ? RULES not following the log when you open and close it
- the camera bar under ⚙ TEST again at any window size
- a bar's sections **moving** as the pool drains - they are computed from the maximum
- anything cropped at the top or bottom at FULL

### Still open

- **The order rail's cells are unchanged in size.** Turned vertical they are 30×34 each; at 13 heads
  the column is 478px of a 490px band. If a later fight ever fields more, the extra heads are
  clipped rather than laid over the plaque. Worth knowing, not worth building for yet.
- **Nobody has played this with a hand on a mouse** - unchanged from #91 and #94, and it is the
  caveat that matters most for the FULL zoom, which is a judgement about how big a body should look.

---

## ⚔ THE BATTLE SCREEN, ROUND THREE - YOUR TWELVE POINTS  *(#94 · 2026-08-11 · build log 8f.122)*

**What it is.** Your annotated screenshot, built. Twelve changes on top of #91's frame, nothing
else touched. Three of them are new *behaviour* and the rest are the screen doing what you drew.

**How to reach it in three steps.** ⚙ TEST → **PRACTICE FIELD** → pick any fight. Or just play: it
is every battle from now on.

### The nine on the panel

| | what you asked | what is there |
|---|---|---|
| 1 | *"Show disengage only when engaged"* | the DISENGAGE card is **gone from the row** until somebody actually has hold of you, and it comes back the instant they do. The hotkeys renumber with it, so the row always counts **1, 2, 3…** with no hole |
| 2 | *"Battle log - top left"* | it is top-left |
| 3 | *"...collapsed so far you cannot see details"* | **six whole lines** now instead of three-and-a-half (46px → 92px). Click the header for the full 300px as before |
| 4 | *"End turn a bit smaller and not that bright"* | **190×34** instead of 308×40, in a dark blood that **lights up to the old colour under the mouse** |
| 5 | *"Withdraw and speed near it"* | **⏱ PACE** and **⚑ WITHDRAW** now sit immediately left of END TURN. The **FULL / FIELD / CLOSE** camera stops took the top-right corner back |
| 6 | *"nickname same line as name"* | one line. On a very long name the **nickname** gives way first, never the name |
| 7 | *"Actions show as crystals (as wildermyth)"* | **◆ ◆** - filled for what is left, dark for what you have spent, and the numeral is gone |
| 8 | *"61% hit and 15% dodge"* | dodge carries its **%** now, and CHANCE TO HIT is **TO HIT** on one line |
| 9 | *"Turn order - maybe place under the skills?"* | the rail is under the card row, at the bottom edge. **This is the one I want you to rule on** - the alternative (rail *above* the cards, cards on the floor) is drawn as **FRAME B** in `shots/94_css_bench.html` and is a one-line switch |

### The three that are new behaviour - these are the ones worth playing

**⬢ Health and armour are cut into sections** *(your ARC Raiders shield note)*. Both bars on the
plaque **and every bar under every body on the field.** The bigger the pool the more sections and
the thinner each, so one section is roughly one blow's worth on anybody: a ratkin's 6 armour is
**3 fat sections**, your 45 hitpoints are **6**, a boss at 120 is **8**. **What to look for:** can
you now pick which of six enemies is closest to breaking without hovering any of them?

**⬢ The MOVE card shows how far.** *"4 HEXES"* on its face, where the attacks show their damage.
It is the same number as the plaque's HEXES cell and cannot disagree with it: watch it drop by one
when you move a second time in one turn, and watch it halve on a crippled body.

**⬢ Choosing a skill draws its reach on the ground.** Click **HUNTING BOW** and an amber wash
covers everything within 5. Click **KICK** and it is the six hexes around you. Click a spear and it
is a little further. **This only happens when you actually pick a card** - MOVE is the standing
default and paints its own teal walk preview, exactly as before. Press **ESC** and you are back to
MOVE and the walk numbers.

**⬢ A body crosses the ground instead of arriving on it.** Every walk in the game, yours and
theirs, now goes **tile by tile along the real route** - round the boulder, through the water,
whichever way the rules actually charged for. **The one worth watching is an enemy's**: you can now
see which way something came, which tells you where it can be next round. A long stride does not
take proportionally longer; the steps just get quicker.

### What would be a bug

- a hole in the hotkey numbers (1, 2, 3, **5**) on anybody, especially a **gilled** or
  **bloom-handed** body - they are the two whose extra cards sit *after* DISENGAGE on the sheet
- DISENGAGE missing while somebody is plainly engaging you
- a body **invisible** after a walk, or two of the same body on the board at once
- the amber reach wash still on the board after you press ESC, or appearing before you click a card
- END TURN, the log or the rail overlapping anything at **CLOSE** (measured clean at all three
  stops, but the measurement is geometry and your eye is the test)
- the sections on a bar **moving** as the pool drains. They are computed from the maximum and must
  stay nailed where they are

### Honest caveats

- **Nobody has played this with a hand on a mouse.** The preview pane composites no frames, so
  everything above is a DOM-and-geometry assertion plus eight AI-driven fights. The *feel* of the
  walk speed is yours to judge - it is one constant, `WALK_HEX`, currently 95ms a tile before the
  ×1.75 board clock.
- **The phone layout has not been exercised.** The chrome is stage-anchored so it turns with the
  stage by construction, but the log moving to the top left wants one real look in portrait.
- The board lost **2% of the screen** to the taller log (85.5% → 83.5%). That was the price of
  point 3 and it is worth naming.

---

## ⚔ THE BATTLE SCREEN, REDONE  *(#91 · 2026-08-11 · build log 8f.121)*

**What it is.** Your seventeen-point relayout, built to the frame you picked from the three
mockups: **A · THE FRAME, with B's on-card damage.** The 300px left panel, the 72px order strip and
the 104px log are gone; the battlefield is the whole screen and everything floats over it. The
board went from **57.8% of the screen to 85.5%**, the words on it at round I from **262 to about
160**, and the camera's default framing is **a third closer** because the chrome paid for it.

**Where everything lives now.** Counts capsule top-centre (**⛊ yours · ROUND · whose turn · ☠
theirs** - the routed still count, they can rally). Under it the **order rail**: faces only, in
turn order, gold ring on whoever acts, **no initiative numbers, name on hover**, white flag on the
broken. Top-right: **▶ ⏱ ⚑** icons (AUTO in test mode · PACE · WITHDRAW - words in the hover) and
the FULL/FIELD/CLOSE stops beside them. Bottom-left: **the plaque** - portrait, name, class, the
trait's **name only** (sentence on hover), four big numbers (**ACTIONS · HEXES · CHANCE TO HIT ·
DODGE**), the two bars, and **nerve as one coloured word** whose hover is the whole five-rung
ladder. Bottom-centre: **the cards** - glyph, name, hotkey, cost pips, **damage on the face**
(14-21 under HUNTING BOW); the receipt line and one effect sentence are the hover. Bottom-right:
**END TURN**, and under it the **log, collapsed to its last lines** - click the header to open the
whole fight, and the **? chip on it holds COMBAT LOGIC** now.

**The three new behaviours, and they are the point:**
1. **You never click MOVE again.** It is the standing selection: your reach is already lit when
   your turn starts, and after every act the selection returns to MOVE on its own.
2. **Click an enemy and you swing.** With MOVE standing, every enemy your weapon can reach is
   already ringed with its hit % and honest damage range. Click one: the weapon fires. KICK and
   the rest are still their cards and their number keys.
3. **⟲ UNDO MOVE.** Step somewhere that changed nothing but your position and a thin button
   appears over END TURN: one click puts you back, with the action and the hexes refunded. It
   refuses honestly: a parting swing taken, or any other act spent, and the step is permanent.

**How to reach it in three steps.** ⚙ **TEST** → **THE PRACTICE FIELD** → any fight. Or just play:
every battle uses it.

**What should happen.** The fight fills the screen. A turn reads left to right: who am I (plaque) →
what can I do (cards) → who is next (rail). Hover an enemy in reach: the weapon card lights, the
readout card with the full to-hit breakdown appears after its usual dwell. Mood faces on tokens
appear **only when the rung changes numbers** (😄 +5/+5% · 😐 −8/−3 · 😟 −12/−5 · 💀 routed);
a token with no face is simply steady - 🙂 is gone.

**What would be a bug.**
- Anything overlapping anything at any of the three camera stops *(swept clean at all three here,
  including the warmage's seven cards)*.
- A lit enemy that refuses the click, or an unlit one that accepts it - the ring, the odds and the
  click all run through one gate and must agree.
- UNDO appearing after a parting swing, or failing to refund exactly what the move spent.
- The undo button surviving into the next turn, or appearing on AUTO's moves.
- A move that spends your LAST action ends the turn as always, so no undo there - **that is the
  designed limit, tell me if it feels wrong in play.**
- The log ticker missing a line the old bottom box would have carried, or the accordion losing your
  scroll position.
- **On the phone** (this could not be exercised in the build harness): portrait rotation with the
  new chrome - anything anchored wrong will be a right angle out, instantly obvious.

**Also worth judging, not bugs:** whether ~160 words on screen still reads as too many · whether
the FULL/FIELD/CLOSE stops at their new sizes (1.73 / 2.20 / 2.50) feel right, since FULL is now
exactly the old default view a third bigger · whether the flavour line ("the fog is picking
sides") is missed - it was cut with the old header and can come back as a log line.

---

## 🎲 THE SAME FIGHT, A DIFFERENT FIELD  *(#93 · 2026-08-11 · build log 8f.120)*

**What it is.** Your note straight after the last one: *"make it so these diferent fields get into
drawn in every batle randomly (so if it is in the forrest or rock terrains - theres is more to drow
from). So if you have same battle different layout can give you an extra flavor."*

**You were correcting a real mistake in what I had just shipped.** #90 built four arrangements and
then handed each fight exactly one, pinned. So the boards were still frozen - just frozen at four
instead of at one - and replaying a fight gave you the same field for ever.

**Now a place owns a POOL, and the board is dealt from it every time you take the field.**

| the ground | draws from | why that many |
|---|---|---|
| **the ridge** *(rocky)* | **six** | stone does everything: it stacks into a wall, scatters into cover, piles into one mass, lies about as rubble, or leaves the ground bare |
| **the fen** | **five** | timber stands and scatters, but it does not do all six |
| **the forest** | **four** | |
| **the swamp · the plains** | **three** | a drowned channel and a dry plain are *already* an arrangement; a wall across either makes it somewhere else |

**⚑ Two dice, not one.** One picks the *arrangement*; the other picks **everything else** - where the
water lies, where each stone falls inside that arrangement, where the litter is. That is why the
Sling-Line still never looks the same twice even though it only ever draws open ground.

**How to reach it in three steps.** ⚙ **TEST** → **THE PRACTICE FIELD** → take the same fight three
or four times in a row. **The Ruined Steading** is the best one to sit on: it is on the ridge, so it
draws from all six. **The Snare** draws from five and is the best place to see the material rule -
in the fen a mass is **trees**, on the ridge the same shape is **boulders**.

**What should happen.** Replaying a fight should feel like arriving somewhere slightly different
rather than reloading a puzzle. Nothing about the fight itself changes: same enemies, same numbers.
**And a fight you flee and come back to is now on new ground**, which is a side effect I did not plan
and think is right - the old build let you learn a board by heart and reload onto it.

**What would be a bug.**
- The same fight giving you the **identical** field twice in a row *(except the two below, which are
  supposed to)*.
- An **empty ridge**. Actually - not a bug. `open` is a real member of the rocky pool, so a bare
  field is a hand you can be dealt about one time in six. Tell me if it feels like a mistake anyway.
- A board you cannot cross. *2,664 rolled boards were generated and validated, but that checks the
  shape, not the feel.*
- **Blood on the Road** feeling busy. It draws from three, not five, on purpose: the wall-with-gaps
  and the eleven-boulder field are held back to the second fight, because the first one is already
  teaching you eleven other things. If it still feels like a lot, that is worth knowing.

**👤 Two boards deliberately do NOT roll, and both are refusals rather than oversights.**

1. **The Fen-Mother is pinned** - hers is the only fixed board left in the game. Rolling it measured
   15.7 rounds (worst 27) against 11.5 (worst 17) pinned, and **#32 was originally filed against this
   exact fight for never ending.** Your ruling on re-tuning her is still open from last time.
2. **The Sling-Line always draws open ground**, and this one is not about difficulty: cover there
   does not make the fight harder or easier, it makes it a *different fight*, because "cross the
   open" is the whole brief.

**⚑ And a correction to what I told you an hour ago.** I said the Circle was 0-wins-in-8 on its
board. Re-run at 40 runs a side it is **5 to 10% winnable and always was** - eight runs just had not
seen one. The arrangement still matters enormously (on the wrong one it was 4-in-8), but **six runs
cannot tell 0% from 20%**, and I nearly made three decisions on that few.

**The picture:** `shots/93_pattern_draw.html` - thirteen real boards: the fen's whole hand of five on
one fight, four consecutive unpinned rolls of the ridge, and the two fixed points.

---

## 🚦 THE COLLISION GUARDS  *(#92 · 2026-08-11 · build log 8f.119)*

**⚠ Nothing in the game changed. There is nothing to play here.** This one is for you at the desk,
because you asked whether working in several parallel sessions is fine and whether the rule is not to
commit.

**The answer was no.** There is one working tree and one branch, so both sessions edit the same bytes
on the same disk and git separates nothing between them. Not committing does not isolate them, it
just leaves you without a restore point. What actually collides is the **number**, the **prototype**,
and **`deploy.ps1`**, which runs `git add -A` and pushes, so a deploy from one session was publishing
the other's half-finished file to the live link.

**What you do now, at the start of a session, before anything is written:**

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 number
```

It hands you a `#NN` and an `8f.NNN` that the other session cannot be given. If you are going to
change the prototype, add:

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 lock -Title "what you are doing"
```

**Three steps to see it work.** 1. Run `claim.ps1 status` in both sessions: the same picture, because
they read the same disk. 2. Take the lock in one, then ask the other to edit
`prototype/grimtoll_slice.html` - **it is refused**, and told who holds it and what they are doing.
3. `claim.ps1 release all` when you are done with a session.

**What should happen.**

- Two sessions asking for a number in the same minute get **different** numbers. This already
  happened for real on the day it shipped: session `38e9215b` got #93 while this one got #92.
- `deploy.ps1` **refuses** while another session owns the prototype, and when it does run it now
  **lists every file it is about to commit** before committing.
- `git commit` refuses a change that spends a number somebody else holds.
- A lock **expires after 4 hours**, so a session that closes without releasing does not block you.

**What would be a bug.**

- A number you are handed that is **already used** anywhere in the docs, the prototype or `shots/`.
  *(The first cut had exactly this: it read `#373` out of a CSS colour. Tell me if you see a jump.)*
- A refusal you cannot get past. Every guard has a way through on purpose: `claim.ps1 lock -Steal`,
  `claim.ps1 release all`, `git commit --no-verify`. **If a guard ever blocks you with no exit, that
  is the bug**, because a guard you cannot escape is a guard that gets deleted.
- Being blocked from editing a file **no session is holding**, or `status` showing a lock you know is
  from a session you closed hours ago as still live.

**Where it is written down.** [`PARALLEL_SESSIONS.md`](PARALLEL_SESSIONS.md).

---

## 🏔 FOUR BATTLEFIELDS INSTEAD OF ONE  *(#90 · 2026-08-11 · build log 8f.118)*

**What it is.** Your ask: *"create 3-4 different battfield patterns for fields using in a fights in
the first act (diffrent position of rocks, trees and other objects)."*

**Before touching it I dumped the nine boards the act was actually generating, and the dump is worse
than the request implies.** Seven of the nine fights ran the *same* code - two to four random blobs
of rock, and the only thing that differed between fights was how many blobs. **Not one act-1 fight
contained a single tree** (the setting was called `scat:'trees'` but it only ever meant "three
clumps"; six fights carried the name of an object none of them had). **And the blobs landed where
nothing happens:** you deploy on the left, they deploy on the right, the two lines meet in the
middle - and across the nine boards the rock sat along the bottom edge on five of them, and on the
Thing in Armour it sat *behind you*, in your own deployment, before the fight started.

**So there are four arrangements now, and each one is named for the question it asks you.**

| | what you will see | the question |
|---|---|---|
| **ANVIL** | one big mass in the middle, sitting one row high of centre so the two ways round are **not** the same length | which side of it do you go round |
| **SPINE** | a wall straight down the middle, two hexes thick, **ends walled** and **two gaps in it** - one high, one low, about two turns' walk apart | which gap do you take, and can you afford to change your mind |
| **BROKEN** | eleven boulders scattered about, and **no two of them touching** | is there a stone between you and the shot |
| **FLANKS** | mass along the top and the bottom, the middle deliberately left open | the short way in the open, or the long way out of sight |
| **OPEN** | nothing at all | *(the Sling-Line keeps this on purpose - cover on that board deletes the fight)* |

**⚑ The same shape is made of different stuff depending on where you are.** A spine is a **line of
trees** in the fen and a **run of boulders** on the ridge. That is not decoration: a lone boulder is
something you shoot over and thrust over from behind (and an ogre can pick it up), while a *group*
of rocks, or any tree, stops an arrow dead. So **BROKEN is the only board where every obstacle is
cover rather than a wall**, and it is always stone.

**⚠ READ THE #93 SECTION ABOVE THIS ONE BEFORE TESTING.** It shipped an hour later, on your next
note, and it **replaced the one-arrangement-per-fight table that used to be here**: a fight no longer
carries an arrangement, it draws one per battle. The four arrangements and the rules about them are
all still exactly as described below - only the *assignment* changed.

**How to reach it in three steps.** ⚙ **TEST** → **THE PRACTICE FIELD** → pick any fight, and take
it more than once.

**What should happen.** The middle of the board should now be **worth thinking about**. On the
spine, committing to the near gap and finding them massed at it should feel like a decision you have
to live with. On broken ground you should catch yourself stepping *behind* a stone before shooting.
On the flanks, crossing the open middle should feel fast and exposed, and going through a wood
should feel slow and safe. **Nothing was added to your screen** - no card, no option, no hint, not
one word of text. This is the same game on ground that means something.

**What would be a bug.**
- A board you cannot cross, or one where the two sides never meet *(135 boards were generated across
  every fight × every pattern × every practice-field ground and all pass the validator - but the
  validator checks the shape, not how it feels)*.
- A gap in the spine with a tree or a pool of water sitting in it. Those hexes are reserved and
  nothing is allowed to fill them.
- Two boulders touching each other on **BROKEN**. They are supposed to be independent, and a pair of
  them quietly stops being cover and starts being a wall.
- Any fight feeling markedly longer or shorter than you remember. Every fight was measured ten times
  a side against the old generator and all of them came back inside the noise - but ten runs of a
  robot is not you playing it.

**👤 TWO THINGS THAT NEED YOUR RULING, and neither is a bug.**

1. **The Fen-Mother did not get a new board, and I want you to decide whether she should.** Hers is
   byte-identical to what it always was. When I gave her a real arrangement her fight ran **half
   again as long** (10.6 rounds → 15.8) for the same win rate, and lengthening a boss you hand-tuned
   is a balance change, not a terrain change. ⚑ **But chasing that turned up something worth more
   than the row it saved: a mass in the middle of the board taxes whoever needs to *shoot*.** The
   same obstacle moved to the top edge costs almost nothing. Her old board was never neutral - its
   blob happened to sit **on her approach lane** - which means the 12-14 round band we have all been
   quoting is partly an accident of the random seed. Leave her, or re-ground her and re-tune the
   band around it. Your call.
2. **The Circle** *(the fight you are not meant to win)* was nearly shipped **winnable**. Written as
   ANVIL it went to 4 wins in 8; the reason is one sentence - **against ten bodies any wall is a
   chokepoint, and a chokepoint is exactly how six beat ten.** It is on BROKEN instead, which gives
   cover without giving a line to hold, and it now holds at 0 wins in 10. Worth confirming it still
   feels hopeless in the right way rather than merely hopeless.

**The picture:** `shots/90_battlefield_patterns.html` - six boards, the old roll beside the new one
for the same fight, all of it photographed out of the running game rather than drawn.

---

## 🔎 THE UNIT PANEL, REBUILT AROUND YOUR THREE NOTES  *(#88 · 2026-08-10 · build log 8f.117)*

**What it is.** Your three notes, with the screenshot: *"very small type and lots of numbers
everywhere"*, *"it took me a very long time to see where to read a character's step count"*, and
*"make the hot keys either smaller or not overlapping"*.

**All three turned out to be one thing, and it was measurable rather than a matter of taste.** The
skill list was two columns. Two columns of 133px leave a card **116px of inner width** - and the
longest skill name in the game, POISON THE BLADE, needs **128px** of that with its icon. Any skill
with a cooldown wrapped its cost line onto a second line, so KICK and CRIPPLING SHOT were holding
**48px of content in a 46px box**. And the hotkey was pinned to the exact corner the icon sits in,
so it was **on** the icon on every card. The card physically could not show what was in it, which is
why nothing could be made bigger.

**So the list is one column now**, which gives each card **213px** instead of 116px - and that one
move paid for all three fixes at once.

| your note | what changed |
|---|---|
| **3 · hotkeys overlap** | the key has a **25px column of its own** down the left of every card and nothing else may enter it. It also got **bigger**, not smaller: 8.5 → 10.5px. A hotkey you cannot read is not a hotkey - the overlap was the real fault. The cooldown number got the matching column on the right |
| **1 · very small type** | skill name 11 → **12.5px** · cost line 9 → **10.5px** and no longer watermark-grey · icon 12 → **13.5px** · the stat rows under the bars 9.5 → **11.5px** · the class line 9 → **10px** · **the hover card you read before every swing** 9.5 → **11px**, and it is 22px wider so it stops wrapping |
| **1 · numbers everywhere** | **five integers under the bars are three.** INIT is gone - the ORDER strip along the top of the field already shows initiative for *everybody*, which is the only way that number means anything, and it got bigger. The three action pips are gone - the numeral beside them already said "3 OF 3" in words |
| **2 · where is the step count** | it is now **the second big number in the box at the top**, beside ACTIONS: *the two things a turn spends, one box, one size*. It was buried in the small grey grid at the foot of the panel, which is exactly why you could not find it |

**How to reach it in three steps.** ⚙ TEST → **PRACTICE FIELD** → start any fight. The panel is the
whole left side. (Or just play - it is every fight.)

**What should happen.**

1. **No hotkey ever touches a word or an icon**, on any body, with any skill, in any state.
2. **The box at the top of the panel reads `3 OF 3 ACTIONS` and `4 HEXES THIS MOVE`.** Move once,
   then look again: the hex number **drops by one**, because a second move in a turn is shorter.
   Stand in water or beside an open bloom and it drops further. That is the number teaching its own
   rule instead of a note explaining it.
3. **Every skill name sits on one line** and every cost line reads without squinting.
4. Press **1-7**. The card lights up, and if the list is long enough to scroll, **the card you
   picked comes into view by itself**.

**What would be a bug.**

- A hotkey sitting on an icon or a letter. That is the thing this entry exists to make impossible,
  so one instance is a real failure and not a nitpick.
- The hex number in the top box disagreeing with the hexes the board lights up when you pick MOVE.
  They come off the same call, so they cannot drift - if they ever do, something else broke.
- The panel jumping or the skill list moving as you hover along the cards.

**⚠ The one thing I already know is imperfect, so you do not have to find it.** **Marrow the warmage
has seven skills and her list is about one card too tall** - it scrolls by 47-58px. Everybody else
(archer 5, Captain 6, rabble 3) fits with room. The selected card scrolls itself into view so no
hotkey can pick something off-screen, but **a skill you have to scroll to is still a skill you might
not know you have.** Two things would close it and **both are your call, not mine**:

- **cut the three-stat block under the bars** (CHANCE TO HIT · DODGE · ENGAGED, 41px). All three
  exist somewhere better - the hover card gives you the real, target-specific chance to hit, which
  the panel's figure never was;
- **or put the ARMOUR / HITPOINTS labels on top of their own bars** instead of above them (26px).

**⚠ And this is the battle screen only.** Your screenshot and all three notes were that screen, so
that is what I changed. The rest of the game still carries **61 pieces of type below 10px** - the
road, the company screen, the aftermath, the front door. Say the word and that is the next pass; the
count is written down so it is a target and not an impression.

**Pictures.** `shots/88_panel_before.html` and `shots/88_panel_after.html` - the same two bodies, the
same fight, the same badge states. Open them side by side.

---

## 💥 EVERY SKILL HAS ITS OWN ANIMATION NOW  *(#87 · 2026-08-10 · build log 8f.116)*

**What it is.** Your request: *"proper animation for all skill moves... small but distinct. If push
or kick - kind of wind in that direction. If sweep or scare - to show that it has impact."*

Before this there were **three** animations for **thirty** verbs. The attacker leaned in, the
defender reeled, there was a flash. That is it. So a KICK looked exactly like a sword, a SWEEP
played *one sword-swing per neighbour* (four separate lunges in four directions, for what is one
action), and **six verbs put nothing on the board at all** - ROAR, COMMAND, HOLD THE LINE, SPEAR
WALL, THE FEN ANSWERS and SHE CALLS THEM IN only ever printed a line of text.

**Eight shapes now, and each one means something:**

| the shape | what it says | where you will see it |
|---|---|---|
| **GUST** - chevrons blowing along the line of the blow | somebody else decided where you are standing | KICK · BRACE AND SHOVE · HOOK-POLE *(blows the other way)* · DRAG UNDER · CRIPPLING SHOT *(low, at the feet)* |
| **ARC** - a crescent all the way round the swinger | one swing, everybody in reach | SWEEP · TAIL-LASH · STONE MAUL · THE SWORD COMES ROUND · DISTRACT *(small, on the target)* |
| **RING** - expands to the **real reach in hexes** | a radius, spoken out loud | ROAR · THE SOUND SHE MAKES · COMMAND · HOLD THE LINE · SHE CALLS THEM IN · THE FEN ANSWERS · BLIGHT-WIND |
| **TETHER** - a line snapping taut between two bodies | one body has hold of another | ROOTING GRASP · DRAG UNDER · UNPICK · a caster starting WITHER or BLIGHT-WIND |
| **MOTES** - drops that fall and settle | something landed on them and stayed | POISON THE BLADE · UNPICK's armour coming off |
| **PLATE** - a ring that snaps **inward** | something closed over you | IRON-OATH · SPEAR WALL · HOLD THE LINE |
| **SHUDDER** - the body shakes without moving | it reached you where you stand | anybody caught by ROAR or THE SOUND SHE MAKES |
| **GHOST** - the sprite left behind, fading | the body was here and is not | SINK BELOW · DISENGAGE · SNAP-AND-AWAY · a thrown body |

**Two of those are a matched pair on purpose, and it is the bit I would most like your read on.**
A **ring travels outward** and means *this went out from me*. A **plate snaps inward** and means
*this closed over you*. That is the only difference between **COMMAND** (a gold ring, nothing else)
and **HOLD THE LINE** (a green ring, and then a plate on each person it reached) - two captain
orders that used to look identical because neither of them looked like anything.

**How to reach it in three steps.** ① Menu → **the practice field**. ② Pick **Blood on the Road**
against any company. ③ Take a body with a race verb or a signature and use it. The fastest tour is
a **brute** (SWEEP, then ROAR) and a **human** (KICK) in the same fight.

*(For the boss shapes: practice field → **The Fen-Mother**. She has four of the eight - TAIL-LASH,
DRAG UNDER, THE FEN ANSWERS and THE SOUND SHE MAKES - and she uses them unprompted.)*

**⚑ There is also a sheet of all 23 side by side**, looping, with a speed switch:
[`shots/87_skill_animations.html`](../shots/87_skill_animations.html). Open it in a browser. It
holds the same CSS the game uses, so if something looks wrong there it is wrong in the game too,
and it is far quicker to judge than hunting the verb down in a fight.

**What should happen.**

- **A SWEEP is now ONE picture.** One crescent going round, and every body it caught reels. It used
  to be four sword-swings.
- **The ring is the actual reach.** ROAR's ring is 2 hexes across the radius, the Fen-Mother's
  scream is 5, and they should look obviously different. **This is meant to teach the reach without
  you reading the note** - tell me if it does not.
- **The gust reverses for a pull.** A KICK blows away from you, a HOOK-POLE blows back toward the
  man with the pole. Same three chevrons, opposite direction.
- **Everything is on the ⏱ PACE clock**, so it all slows down together if you change the speed.
- **Nothing new makes a sound.** This pass did not touch audio.

**What would be a bug.**

- **An animation still playing when the next body acts.** That is the one thing the pace clock
  exists to prevent, and it is what I would watch for at **×2.50**.
- **A shape on the wrong body.** DISTRACT's arc belongs on the *target* (something spun them round),
  not on the cutter, who never swung. Same for the ring on BLIGHT-WIND: it goes off where it lands.
- **A ring the wrong size at a different camera stop.** Switch FULL / FIELD / CLOSE and roar again;
  the ring should still cover exactly 2 hexes. I could not test this in my environment.
- **A mirrored body flipping** for the length of an animation and flipping back.
- **The old three still doing their job**: a normal sword swing should look exactly as it did
  yesterday. If a plain attack grew a new effect, that is a bug.

**Feedback I want, in order of how much it would change.**

1. **Is it too much?** Your playtesters said *too many systems from the start*, and this is one more
   thing moving. **A brute's turn can now be a ring, a shudder on three bodies and an arc.** If a
   round reads as busy, the fix is a cap on how many of these can play at once, and I would rather
   hear it than guess.
2. **Is any one of them illegible at the shipped x1.75?** They are tuned small on purpose.
3. **Does the ring/plate pair actually read** as *outward = an order* and *inward = a guard*, or is
   it a distinction only I can see because I wrote it?

**Two things I deliberately did not build**, both named in
[`SHIPPED.md`](SHIPPED.md): a **held** spell does not keep its tether drawn for the whole round (it
flashes once), and **ROAR's 2, COMMAND's 3 and HOLD THE LINE's 2** are written into the animation by
hand because those numbers only exist as literals inside their own handlers - so if you retune one,
tell me, or the ring will keep drawing the old size.

---

## 💀 THE DREAM - the road event about somebody you lost  *(#85 · 2026-08-04 · build log 8f.114)*

**What it is.** Your event, built as you wrote it. On a night between two places, somebody this
company no longer has walks into your sleep with their face fallen in and two empty sockets, tells
you flatly that you could have saved them and did not, and waits for an answer you cannot give.
You wake soaked through. Whoever has the watch has been watching you and says nothing about it.

**⛔ First, the thing you should know before you test it, because it changed the design.** I went
looking for the dead man and there is no such person: **nothing in this build kills anybody on your
roster.** Downed in a battle → a scar and back at 30% health. Withdraw → the same. Lose a fight at
THE CIRCLE → the same. `carryEverybodyOut()` literally says *"nobody is lost."* Scars are the death
system. So the card is about the three ways somebody genuinely leaves for good, and it ranks them
by how much of it was your doing:

| how you lost them | where it comes from | the one sentence the dream adds |
|---|---|---|
| **you cut them down** | a dismissed veteran of 3+ fights walks back to your fire and you take the third door - *"They know the roads, the watch-words, the strongbox"* | *"There is not a mark on them. Not where you put it, not anywhere, and you cannot stop checking."* |
| **the ground took them** | THE GROUND OPENS, the sinkhole, and they have not walked back out yet | *"There is no dirt on them. Nothing under the nails."* |
| **you sent them away** | you dismissed them and the road has not finished with them | *"They still have the bundle on their shoulder, roped the way it was roped the morning you sent them off with it."* |

The **cut-down** one is the real one. It is the only place in the whole game where a member of your
company actually dies, and you are the one holding the knife.

**How to reach it in three steps.** ① Open the company screen and **dismiss** somebody who has been
in three or more fights with you. ② Keep travelling - two days later they turn up at a fire asking
for their place back. ③ Take the **third** door and cut them down. The dream is now in the deck and
will come up at some fire on the road. *(Faster if you are only checking the words: open the
console and run* `G.killedOwn=G.party[1]; G.party.splice(1,1); G.campSeen={}; CAMPS.forEach(c=>{if(c.id!=='dream')G.campSeen[c.id]=true}); openCamp({x:620,y:330},()=>{})` *.)*

**What should happen.**

- **On a clean run you never see it.** A company that has lost nobody is not offered the card at
  all. It also fires **once a run**, like every camp incident.
- **The dream itself has no answer in it**, on purpose - that is your text. It plays, it ends, and
  the decision is what you do in the morning. Three doors:

| | costs | what you are buying |
|---|---|---|
| **Say their name at the fire. Say what you dreamed.** | **−1 day**, mood +10 | nobody marches; nobody tells you it was not your fault, because that would be a lie; by midday somebody has told a story about them you had never heard |
| **Count out their share and put it back in the chest.** | **−30 crowns**, mood +6 | a bag with their name on it in charcoal and nowhere for it to go. That is the whole of what it is |
| **Nothing. Kick the fire out and march.** | free tonight, mood −7 | **it comes back on the fourth night**, you know exactly what is coming, and it makes no difference at all |

- **The free door is the expensive one**, and its price is in its own aftermath rather than in a
  later card. That is the thing I most want your read on.
- Under 30 crowns the middle door greys out and says **cannot afford**; the other two stay live.

**What would be a bug.**

- The dead person **also being the one on watch** at the end of the card, or being named as though
  they were still in the company. They should appear in exactly one place: the far side of the fire.
- The card turning up on a run where you have lost nobody.
- The dream naming somebody who then turns out to be sitting in your inventory screen.
- **One case that is NOT a bug and I want to say so plainly:** the sinkhole rolls 50% every leg to
  hand its man back. So you can dream someone dead and then watch them walk out of the treeline
  four days later. That is deliberate. **The dream is a dream, and nothing outside it ever states
  that anybody died.**

**Known and not fixed.** The picture on the card is wrong for it - a sunlit rock. All 19 camp
incidents draw from one hardcoded pool of four daylight paintings, so this is not specific to the
dream and fixing it properly means deciding whether camp cards get their own art. Say the word and
it becomes an entry.

**Also fixed on the way past, and it was a real bug older than this card.** `G.stranded` - the
person the sinkhole swallows - **was never written to the save**. Close the tab while somebody is
down that hole and they were gone for good; the roll that walks them back out had nobody left to
walk. It is saved now, along with the one you cut down.

---

## ⚔ A dodge and a miss are different things now  *(#84 · 2026-08-04 · build log 8f.113)*

**What it is.** Until today every attack that failed printed *"Ilka Renn misses."* and floated a
green **DODGE** over the target, at the same time, for the same roll. Those two statements
contradict each other and only one of them can be true per swing. Now the game decides which.

**How to reach it in three steps.** ⚙ TEST → any fight → attack something. Watch the log strip and
the word that floats over the target.

**What should happen.**

| | the log says | the floater says |
|---|---|---|
| **You swung badly** | *"Ilka Renn swings wide."* / *"shoots wide."* / *"her working comes apart."* | **MISS**, dull grey-green |
| **They got out of the way** | *"Lurcher leans back out of it."* / *"twists, and the shot goes past."* / *"is not where it lands."* | **DODGE**, green |

The rule is the honest one and it costs no extra dice: **it is a DODGE only if the blow would have
landed on a target that never moved.** If it would have missed a fence post, it is a MISS and the
defender gets no credit for standing there. A target with no dodge to speak of can never produce a
dodge line.

**The board says it too, without the log.** On a dodge the defender's figure gets out of the way,
the way it always did. On a plain miss **it does not move at all** now, because nothing happened to
it. That difference is the fastest read on the field.

**What is worth judging.** The split is not even, on purpose: an ogre has 3 dodge against your ~55
skill and a lurcher has 26, so **the ogre fights should now read as "I keep swinging badly" and the
dog and ratkin fights as "they will not stand still"**. Across a full regression it came out 51
dodges to 169 misses, with 10-12 dodges in the fast fights and **2 in the whole steading fight and 0
against the Fen-Mother**. That is the stat block finally being visible. Tell me if it reads as
flavour instead of information.

**What would be a bug.** An ogre or the Fen-Mother dodging often · a lurcher or a slinger never
dodging · the word MISS over a figure that visibly ducks · *"swings wide"* on a bow or a working ·
the same failed swing printing both words. **Nothing about the odds changed** - if a fight feels
harder or easier than yesterday, that is not this.

**Not built, and say if you want it:** the hover odds still show one number. A player who wants to
know how much of their 45% failure is *the target moving* has to read the dodge row and work it out.
A split preview (*"55 fails: 12 of them it dodges"*) is a separate job.

---

## 🔗 The link you send to friends  *(2026-08-04 · build log 8f.111 · **four clicks left, and they are yours**)*

**The repo exists, the build is committed, and for the first time the shareable file HAS SOUND IN
IT.** That is the part worth saying twice. Every version anyone outside this machine has ever heard
was silent, because the music lived in an `audio/` folder that never travelled with the page. It
travels now: the eleven approved cues are inside `index.html` as AAC, 79MB of WAV squeezed to 3.7MB,
and the whole page is 10.3MB with nothing to fetch and nothing to install.

**What is done:** git repo created, `.gitignore` written, everything committed on `main`, and
`index.html` built and checked in a real browser. **What is not done: the repo is only on this
laptop.** GitHub does not exist yet, so there is no link yet.

### The four clicks

1. Go to **github.com/new**. Name it `grimtoll`. **Public.** Do **not** tick "add a README", the
   repo already has one.
2. Copy the URL it shows you and hand it back to this chat, or run the two lines GitHub prints
   under *"push an existing repository"*.
3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
4. Wait about a minute. The link is **`https://<your-name>.github.io/grimtoll/`**.

Send that link. It works on a phone, it needs no account, and closing the tab does not lose the run.

### What to listen for, since this has never been heard by anybody but you

- **Sound starts on the FIRST CLICK, never on load.** Every browser blocks autoplay. If the menu is
  silent until you touch something, that is correct.
- The **main menu** has its own track. The **road** has two that alternate. **Battle** and **boss**
  are separate. Speaker button is bottom right.
- **This is a 64k AAC copy, not the master.** It should be indistinguishable through a phone or a
  laptop speaker. If something sounds thin or swirly on good headphones, say which cue and it gets
  re-encoded higher; that is one number in one script.
- ⚠ **A bug worth watching for: sound that works here and not there.** That failure is the entire
  reason this entry exists, so if a friend says "no music", ask what they clicked first.

### Updating it later: one command

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1
```

Builds the page, **refuses to push it if the sound did not make it in**, commits, pushes, prints
the URL. About twenty seconds. **The link never changes**, so one you sent last week is the build
you pushed a minute ago; if a friend sees the old one, that is their cache, Ctrl+F5.

Add `-Audio` only on a day something in `audio/` changed. Full card in
[`DEPLOY.md`](DEPLOY.md).

*The old artifact links still hold an older, silent build:
[the original](https://claude.ai/code/artifact/0263fef0-f753-477e-a90e-ed329f724226) ·
[backup](https://claude.ai/code/artifact/a76483cd-cc32-48fe-ac43-d1bce1ae0338). They are private, and
they are no longer the thing you send.* **On a real host the `window.claude` ban evaporates**, so the
save-as-a-file row that 8f.104 cost you can come back whenever you want it.

---

## How to get to anything fast

**The practice field is the way to test a fight without spending a road to reach it.**

1. Boot the game → **THE PRACTICE FIELD** on the menu.
2. Pick the fight and the company. *(A copy of your live company is one of the choices.)*
3. Play it.

**Nothing in a practice fight touches your run** - no scars, no spoils, no day passing, and the
save is never written. It is the right place for everything below unless a section says otherwise.

`⚙ TEST` (top right) turns on the tester tools: **✓ WIN NOW** ends a fight instantly, **☰ LINT**
reads every content table and reports. Neither is needed for anything below, but WIN NOW is handy
for skipping to the end of a fight you have already seen what you wanted from.

---

## 🌲 HOW TALL IS IT - a spear stops reaching through trees, an arrow crosses a fire  *(#82, 2026-08-04 · build log 8f.108)*

**What it is.** Your note: *"Spearmen can't hit through the tall objects (tree, group o rocks).
Independent rock medium-small. But archers can shoot through smaller objects (like fire)."* Both
halves were true and both were wrong in the build: **every obstacle stopped an arrow dead, including
a campfire**, and **nothing at all stopped a spear**, so a spearwoman could put a boar spear through
an oak. Obstacles now have a **height**, and it is a separate thing from whether you can walk on
them. You still cannot walk into a fire. You can now shoot over it.

| how tall | what it is | an arrow | a spear thrust over it |
|---|---|---|---|
| **tall** | a tree, a big tree, a palisade or hut wall, **and a rock with another rock beside it** | no shot at all | refused |
| **medium** | **a boulder standing on its own** | offered, and it costs **−14** (a new state, **COVER**) | fine, no penalty |
| **low** | a fire, a bloom flower | nothing at all, same as open ground | fine, no penalty |

**The thing to look at is the middle row.** A boulder on its own is now **cover**, which the game
has never had: standing behind one makes you harder to shoot. A rock with a neighbour is a spine,
and a spine is a wall.

**How to reach it in three steps.**

1. Practice field → any fight on wooded or rocky ground (**the clash** is the quickest, and rocks
   and trees are generated on most boards).
2. Take **Ilka** (bow) and select HUNTING BOW. Look at every enemy in range and read the word on
   the hex: **CLEAR · COVER · LONG · FAR · SCREENED · OBSTRUCTED · BLOCKED**.
3. Take **Vesna** (boar spear, reach 2) and select BOAR SPEAR. Look at enemies two hexes away with
   something in between.

**What should happen.**

- **An enemy across a fire is a normal shot.** Same number as open ground, no penalty line.
- **An enemy across one boulder says COVER**, the hex edge goes bronze, and the hit readout carries
  a line reading **"over a boulder −14"**.
- **An enemy across a tree, a wall, or two touching rocks says BLOCKED** and shows no number at all.
  There is no shot, so there is no percentage.
- **A spear target with a tree or a rock group in between is not offered.** The hex is not lit and
  carries no odds. This is the same behaviour as trying to kick an ogre: the offer is simply not
  there, rather than being there and refusing you.
- **A spear target across a fire or a lone boulder is offered exactly as before.** No penalty.
- **A body in the way still never stops a spear.** Vesna fighting over the person in front of her is
  the entire class, and that has not changed.
- **The enemy plays by the same rule.** Their pikes and long spears, and the Fen-Mother's reach-2
  attacks, are refused by an oak the same way yours are.
- **The spear wall too.** Something walking into reach round the far side of a tree should not be
  caught by the wall.

**What would be a bug.**

- A hex that lights up for a spear and then refuses the click with a line in the log. It should
  never have been lit.
- Two penalties added together on one shot. A boulder **and** a body in the same lane should charge
  **−22** (the worse of the two), not −36.
- A rock that changes what it does mid-fight without anything happening to it. **Except one case,
  which is correct:** if an ogre picks up one boulder of a touching pair, the other one is a lone
  rock afterwards, so a lane that was BLOCKED becomes COVER. That is the rule, not a bug.
- The ogre's PICK UP AND THROW offering you a rock that is part of a group. It may only ever lift
  one standing on its own.

**What I want to know.** **Is −14 the right price for a boulder?** It sits between shooting past
your own braced man (−8) and shooting past an enemy body (−22), which is where it belongs in the
order, but the size of it is a guess and you are the one who will feel it. And **is cover worth
using** - do you find yourself putting the archer behind a rock, or does it never come up because
the boards do not have rocks in the right places?

---

## 📱 A BIT MOBILE FRIENDLY - the game turns itself on a phone  *(#83, 2026-08-03 · build log 8f.106)*

**What it is.** You asked for a bit of mobile friendliness, not full. This is the bit: the game now
fills a phone screen instead of sitting in the middle of one. **Nothing about the game changed** -
no rule, no screen, no text. Only how much of your phone it gets.

**The one thing you will notice, and it is deliberate: in portrait, the game turns sideways.** Held
upright, a phone gave the game a third of its screen (a board 393 pixels wide with 74% of the phone
black). Turned, it gets 55% - the board is **78% bigger** and the screen is full. So rather than ask
you to rotate the phone, the game rotates itself, and you hold the phone however you like. You chose
this over a "please turn your phone" message, because rotation lock would have left somebody stuck.

**How to reach it in three steps.**

1. Open the shared link on your phone (or on a laptop, narrow the browser window - see the note
   below about why a laptop will *not* turn).
2. Hold it upright. The game should be sideways and filling the screen.
3. Turn the phone sideways. The game should turn back upright, the same size, without reloading.

**What should happen.**

- **Portrait:** the game lies across the screen, top-of-game to the right, and fills it corner to
  corner. **Landscape:** the game is upright and fills it. Both are the same size.
- **Turning the phone swaps between them smoothly**, mid-battle, mid-card, mid-anything, with no
  reload and nothing lost.
- **Taps land where you aim**, in both orientations. No 300ms lag before a hex responds, and no grey
  box flashing over the thing you just touched.
- **Pinch to zoom still works.** This is on purpose: the small mono labels are genuinely small on a
  phone and pinch is the only way to read them. Double-tap-to-zoom is off, so pinching does not
  fight you while you play.
- **Dragging on the board does not pull the page down into a refresh.**
- **Damage numbers, the hover readout, the Captain's balloons and the impact lines all sit exactly
  where they belong** in both orientations. This is the part most likely to have gone wrong, so it
  is worth a deliberate look: put somebody down and watch where the red figure appears.
- **On a laptop or desktop, nothing at all should change**, however you drag the window. The turn
  needs a touch screen, on purpose - a window dragged tall and narrow would otherwise flip the game
  sideways on a monitor.
- **A tablet held upright stays upright**, also on purpose: it is already readable, and a sideways
  game in two hands is wrong.

**What would be a bug.**

- A damage figure, the hover card or a Captain's balloon appearing **at a right angle** to where it
  belongs, or far off the board. *(Measured to 0.0001px in both orientations, but this is the seam.)*
- A tap that lands on the wrong hex, or a button that will not take a tap.
- The game turning on your **laptop**.
- A black screen, or the game shrinking to nothing, after turning the phone or after the address bar
  slides away.
- The game **not** turning in portrait on a phone. If that happens, tell me the phone and browser.

**What is honestly still bad, and I want to know whether it matters.**

1. **Everything is small.** At 55%, the small grey mono labels render at about 5px. Zoom reads them,
   but nothing was made *bigger* - that is a separate job and it is the one that decides whether a
   friend can really play this on a phone or only look at it. **Tell me if it is unreadable rather
   than merely small.**
2. **Hover does not exist on a finger.** The hit-chance breakdown, the gear tooltips and the nerve
   ladder all open on hover. A tap usually raises them on a phone and nothing guarantees it. **If
   tapping an enemy does not show you the readout, say so** - that is the next thing to fix.
3. **The small chrome** (⚙ TEST, ☰ MENU, the ★▲▼ bar) was sized for a mouse, not a thumb.

*Everything here was measured in a 393x852 window on a desktop with the turn forced on. **It has
never run on a real phone.** You are the first.*

---

## 📜 YOUR DOC PASS IS IN THE GAME - eleven road events re-cut  *(2026-08-03 · build log 8f.103)*

**What it is.** Everything you changed in the Google Doc (Part 1, the road and node events) is now
in the build, including the quiet cuts you made without a star: every event was diffed word against
word, so Bonepicker's lost "Nobody asks twice", the Long Fire lost the feast paragraph, the shrine
woman lost her "Bells that way" line, and so on. The starred items were polished in your style
rules (simple words, concrete details, every line pays rent). Twenty-one events you did not touch
were verified word-identical and left alone.

**The two things that are more than wording:**

- **THE STEADING-LINE pays in people now.** Both peaceful doors (pay the 120 toll, or send your
  ogre for 40) end with a young ogre, **Osk**, asking to walk with you: **90 crowns, only if there
  is room in the company.** You priced the toll door at 90 and left the parley door blank, so 90 is
  on both for now - one word from you moves it.
- **The pedlar sells one shield, not two.** 40 crowns. The barrel lid stays on his table as a joke
  instead of a purchase. His pay-properly door is gone (your maximum-four rule), so the card is:
  shield · gems · rob · walk away.

**How to reach it in three steps.**

1. Boot the game → new company (or continue) → walk the road. THE STEADING-LINE sits on the road
   to the Muster Field; the pedlar, chapel, toll-man and the rest deal from the road deck.
2. On the Steading-Line, pay the toll (or send your ogre) with 200+ crowns in the chest and room
   in the company.
3. Read the card end to end: the ask ("Ninety crowns, if there is room in the company"), then the
   receipt line naming what actually happened.

**What should happen.**

- Osk joins with his own rolled trait, a club, and the receipt says **"joins the company for 90
  crowns"**. With a full company he refuses by room; with under 90 in the chest after the toll he
  refuses by coin, and each refusal says which it was.
- SOMETHING IN ARMOUR now ends: *you stop, because stopping is the only thing left. **It does
  not.*** The old forty-paces-waiting beat is gone. FACE IT is still the only button.
- THE CIRCLE: more than ten shadows move wide of the fire in the intro, the mark option reads
  "Take the mark now", and the needle line is in the result. The fight door says plainly:
  **you will not win**.
- UNDER THE BLOOM opens on concrete things: pink light off the ground, black moss, a deer nothing
  will eat, a map four years old.
- Pedlar, chapel, Bonepicker's and the Warm Spring all show **four options at most**.

**What would be a bug.** Any card still showing a deleted option (pay-properly, the lead roof, the
rest day, "It is water. We have a road."). Osk joining without the 90 leaving the chest, or the
join charging 90 and NOT adding him. A receipt for the shield naming two items. Any of the six
quiet cuts still on screen (the feast paragraph is the easiest to spot-check).

**Feedback wanted.** Two of your rules are half-applied and wait on you: THE SITTING STONE and
A WEDDING ON THE ROAD still hold **five** options each (race-gated, so most companies see four or
fewer) - do the gated ones count against your maximum of four? And is 90 right for the parley-door
join, or should the courtesy discount it?

---

## 🖼 THE EVENT CARD - wider box, taller picture  *(2026-08-03 · build log 8f.102)*

**What it is.** Your note: *"for events texts - for texts itslef - can you make box a bit wider, so
it took les space. And make a picturre space 20-30% taller - so I ee more fully picture."* The event
card is now **620px wide instead of 560**, and the painting on it is **586x212 instead of 528x176**.

**The one thing worth knowing before you look at it,** because it decides whether you think the
numbers are right. The painting is *cropped to fit* its window, not squeezed into it. So how much of
the scene you get is set by the window's **shape**, not its height - and making the card wider makes
the window wider too. Widening the card and leaving the picture at 176px would have shown you
**less** of the painting than before, not more. **196px was break-even.** It shipped at **212px**,
so the real gain is the 16px above break-even: you now see **64% of each painting instead of 59%**,
in a box that is a fifth taller on screen.

**How to reach it in three steps.**

1. Boot the game → start a run → walk to any node with a ⬥ event on it.
2. Read the card. The picture is the strip under the title.
3. Compare against `shots/event_card_wider_2026-08-03.html` (open it in a browser) - it holds three
   events side by side, before and after, at real size.

**What should happen.**

- The painting should be **sharp**, not stretched or squashed. Faces, wheels and barrels are the
  giveaway - a wheel that reads as an oval is a bug. This was checked on all 32 events, the road
  camp and Coldharrow, but you have a better eye for it than a measurement does.
- The card should still sit **on** the node it belongs to and never hang off the edge of the map.
- Long events should still scroll their **prose only** - the choice buttons stay pinned in view.

**The judgement call I want your reading on, because it is a trade and not a bug.**

The card has a hard **618px** of height to spend and the picture just took 36 more of them. On most
events that changed nothing - the middle card shows the same 7 lines of prose it always did. But on
the crowded cards it costs a line or two before you have to scroll. **The two worst are the pedlar
and the road camp** (five options each, 283px of buttons) and **Coldharrow is the worst in the
game** - it opened on about 2.5 lines of its 9 before this change and opens on about 2.2 now.

So: **look at Coldharrow and the pedlar specifically, and tell me if the prose window feels too
thin.** Three ways out, and I did not pick one for you:

- **Leave it.** Those cards already scrolled; this made them slightly worse, not newly broken.
- **Give the picture back 16px** (212 → 196). You keep the wider box and the same slice of painting
  you had before, and the crowded cards go back to roughly where they were.
- **Fix the real cause instead,** which is not the picture: a five-option card spends **297px of the
  618** on buttons. Tightening the choice rows would buy every card back a line or two and cost the
  painting nothing. Nobody has picked this up; say the word and it becomes a backlog entry.

There is one number for the first two: `DLGART_H` in the slice, right under `DLGW`, with the
measured table of what each value buys sitting in the comment above it.

---

## ⏱ THE BATTLE CLOCK - the board plays 75% slower, and you can change it mid-fight  *(#81, 2026-08-03 · build log 8f.100)*

**What it is.** Your note: *"make actions on battlfild 50-100% slower. so player have more info to
understend what have happened."* Everything on the battlefield that takes time now runs through one
multiplier, shipped at **×1.75** - the middle of the range you asked for. That is the pause between
one enemy acting and the next, the lunge and the recoil, the flash and the sparks, and how long a
damage number hangs in the air. **Nothing about the fight itself changed** - not a hit chance, not a
number, not an AI decision. Only how long you get to watch it.

**A button under WITHDRAW cycles it**: ×1 → ×1.25 → ×1.5 → **×1.75** → ×2 → ×2.5 and back round.
It goes gold whenever it is off the default, it changes the fight you are already in on the next
blow, and it is remembered.

**How to reach it in three steps.**

1. Boot the game → **THE PRACTICE FIELD** on the menu → any fight (the pack or the sling-line show
   it best - they have the most bodies acting per round).
2. Watch one full enemy round without touching anything.
3. Press **⏱ PACE** at the bottom left until it says ×1, watch another round, then put it back.

**What should happen.**

- At ×1.75 an enemy round should feel like a sequence of separate events. You should be able to
  say, after the fact, *who* moved, *who* swung at *whom*, and what it cost - without reading the
  log to find out.
- The blow and the number should still land together. **A hit that flashes before the animation, or
  a number that vanishes while the body is still reeling, is a bug** - every duration is supposed to
  stretch by the same amount, so the pieces of one blow stay glued together at every setting.
- ×1 should be exactly the old game. If ×1 feels different from how it used to feel, that is a bug.
- The setting should survive closing the tab.

**Two things I want your reading on, because they are judgement calls and not bugs.**

1. **Is ×1.75 the right default, or is it now too slow?** Measured across the eight fights, the
   scheduled pauses in a fight go from 43-113 seconds to 75-198. The long ones are the Snare and the
   Fen-Mother: the Snare's pauses go from about **1:53 to 3:18**. That is real time added to a fight
   you are already losing patience with, and if it drags, ×1.5 is one press away and I will move the
   default to whatever you land on.
2. **The archer's shot was deliberately left at its old speed.** The game resolves a shot the
   instant it is loosed, so the arrow is still crossing the ground while the damage is already on
   the target. At the old speed the arrow arrived *after* the target had finished flinching, which
   was backwards; leaving it alone while everything else slowed puts it back inside the flinch. It
   is a patch over a real defect - **the impact should wait for the arrow to land** - and that is
   named as the open remainder on this entry rather than fixed here.

**Known and deliberate:** the Captain's balloons still hold for 2.2s (a comment) and 4.5s (a
lesson). Those are reading time, not action time, and they were tuned on their own.

---

## ✉ SEND THE RUN, re-cut for the ten friends  *(your changes, 2026-08-03 · build log 8f.99)*

**What it is.** The questionnaire and the notes screen #76 built, with your edits to the questions
and a re-ordered send screen. Shot of all three states: `shots/80_send_the_run_recut.html`.

**How to reach it in three steps.**

1. Boot the game and play a little, or just open the menu (☰ top left).
2. **SEND THE RUN** on the menu → the seven questions.
3. **Done - send it** → the notes screen.

**What should happen.**

- **The questions are these seven, in this order:** where did you stop · name or describe someone
  from the team · which decision did you remember · a moment in a fight you did not understand ·
  **what did you like** · **what did you dislike** · anything else. *"What did you want and not be
  able to pay for?"* and *"What would you cut?"* are gone.
- **The bottom row is `Back` on the left and a green `Done - send it` on the right**, and Done is
  wider, bordered heavier and faintly glowing. It is the only coloured thing on the card.
- **The notes screen opens with SEND IT BACK, not with your statistics.** In order: the line about
  how many questions you answered, then a big green **✉ SEND IT TO ME**, then the fallback text and
  the copy box - and only then **WHAT IS IN IT** with the run tallies and every decision.
- **`Clear my journal` and `Read somebody else's` are not on the screen at all.** Turn `⚙ TEST` on
  (top right) and a **⚙ TESTER TOOLS** section appears low down, above `Back`, holding both. Turn it
  off again and it disappears while you are looking at it. `Back` is on its own, centred, at the
  bottom either way.
- **Pressing ✉ SEND IT TO ME** opens your mail client addressed to `dmytriyvihrov@gmail.com` with
  the answers already written, and puts the full journal on your clipboard in the same click. The
  button's own subtitle changes to say so.

**What would be a bug.**

- The old `afford` or `cut` questions showing up anywhere, including in the mail.
- `Clear my journal` visible with `⚙ TEST` off - **that one matters most**, it is the button that
  destroys the thing the screen is collecting.
- The screen not re-drawing when you flip `⚙ TEST` while it is open.
- Anything on this screen changing anything in the game. It has never been allowed to and still is
  not; it only watches.

> ⚠ **One thing I chose, so overrule it if you disagree:** I fixed the grammar in your two new
> question lines ("someone from the team. Who was it?" / "built some connection with"), because a
> stranger reading the form should not be reading through a typo. The meaning is untouched.

---

## Everything older

**Everything that shipped on 2026-08-02 and before now lives in
[`archive/WHAT_TO_TEST_OLDER.md`](archive/WHAT_TO_TEST_OLDER.md)** - 3,294 lines of it, unedited.
Most of it has already been through the QA playthrough or through your own runs.

It was moved on 2026-08-10 for the same reason the backlog was cut down that day: **a test bench
nobody can get to the bottom of is not a test bench.** If something down there still bothers you,
it reads exactly as it did.

---

## Checked

*Move a section here when you have played it, with what you thought. That is what stops the same
thing being re-tested every session.*
