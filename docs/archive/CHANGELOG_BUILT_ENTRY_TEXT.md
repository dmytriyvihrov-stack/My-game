# RabbleBound - the full text of built backlog entries

> **Split out of [`../CHANGELOG.md`](../CHANGELOG.md) on 2026-08-21.** These are the long-form entries for work built between 2026-07 and 2026-08-13, roughly #1 to #123, every one of them shipped and none of them a task.
>
> **The one-line registry is [`../SHIPPED.md`](../SHIPPED.md)** and the specs that were never built are [`BACKLOG_ENTRY_SPECS.md`](BACKLOG_ENTRY_SPECS.md). This file is only the reasoning, kept greppable for the same reason the build-log archive is.

## Built backlog entries - the full text

*Moved here when they shipped. Their one-line rows stay in the Done table of
[`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md); open remainders are noted there too.
**#32 (the Fen-Mother defect, closed) stays in the working file** — its details block holds
the rally-rule spec that Tier 1 still points at.*

## 123 - THE CHOICE-WEIGHT PASS ✅ BUILT

> **SHIPPED 2026-08-12, build log 8f.150.** Two halves in one order: the user's ChatGPT design
> conversation on decision fatigue written into the concept as standing event rules, then those
> rules applied to the road - nine events simplified, eleven doors cut or merged.

**The user's order, verbatim:** *"You can summirise it and Add it to a game concpet and rule /
recomendation for events and update concept. After do it - check events - and for 30%-40% of
events it could be done of simplifieng: For example battle with rats : fight or go around ·
Broken church - just get resources from it (salvage) - no other choices · with fen mother 1 less
choice · and etc. After file from other session free - do it."*

**What the conversation actually concluded** (now `01_GAME_CONCEPT.md` §5, "What the loop is
really selling" + "The choice economy"):

1. The loop the player lives is **Choose → Fight → Suffer → Adapt → Choose**, and the Suffer →
   Adapt half is the identity none of the reference games own. The axis is Wartales (world
   management) → Battle Brothers (company management) → Urtuk (buildcraft) → **RabbleBound
   (character consequences)**, and the game must not drift left by growing systems.
2. **The principle: do not give the player more things to manage; give fewer things more
   consequences.**
3. Decision fatigue does not come from the number of events. It comes from **constant, uniform
   decision density**. So a card carries one of three weights - LIGHT (a two-second pickup),
   MEDIUM (a look at the ledger), HEAVY (a decision the player retells) - and the road mixes
   them. Heavy stays rare, because if everything is important nothing is.
4. **The route pick is already a decision**; a card that re-asks "enter / scout / leave" behind
   the click asks the same question twice. The fight is the climax of a small chapter, not
   another node.
5. 2-4 options is the right band. A card fatigues through **bookkeeping labels**, not breadth -
   which is §7's intent-not-receipt rule doing pacing work.
6. **The playtest measurement:** find the event at which the player stops reading options and
   starts clicking the first acceptable one. That event, not the event count, is where fatigue
   begins - and the fix is demoting cards to LIGHT, not deleting events.

**The nine events, and why each cut is the rule and not taste:**

| Event | Was → is | The reason |
|---|---|---|
| slingline | 3 → 2 | user's example, "fight or go around". Both battle doors sent the identical `battle:'slingline'`, no distinguishing flag: a duplicate, style rule 6 |
| chapel | 4 → 1 visible | user's example, "just get resources - no other choices". Pious door and under-altar door cut; the card is the act's first deliberate LIGHT node |
| mother | 4 → 3 | user's example, "1 less choice". The ambush door was a second button onto the same fight - #18 (the Thing in Armour, three answers to one) already ruled on that shape |
| wain | 3 → 2 | wheels and maul MERGED: two flavours of "take the safe thing" is one answer. Both rewards kept on the merged door |
| hollow | 3 → 2 | the sleep door only ever cost (−6 mood, nothing back): a trap with a label, not a decision |
| taxman | 4 → 3 | explain-kindly resolved exactly like the free walk-past, with a mood fee on top: a duplicate wearing a price tag |
| wedding | 5 → 4 | the trade door was a shop bolted onto a mood card |
| aqueduct | 3 → 2 | camp-under-it neither cost nor revealed anything; the card is the pair it was about (break the thing or learn from it) |
| shipwreck | 3 → 2 | the free bell beside the search door was a smaller copy of it; brass keeps its real home on Wynn's card |

Nine of the 29 multi-choice road events is **31%**, inside the asked 30-40%.

**👤 One interpretation call, flagged for the user:** the chapel keeps its `needMut:'gills'` door.
"No other choices" could mean cutting it too, but the door is invisible to any company without the
mutation (so it adds zero reading to the card the complaint is about), it is the one place a
mutation pays rent outside combat, and the conversation itself praises state-gated doors as the
fast-reading kind. Cheap to remove if he wants the literal version. Fenwater was verified to keep
its battle origin (swamp pools, `d.fenwater` → `p.cond`), so no mutation chain was orphaned.

**Deliberately untouched:** every authored set piece (star, toll, oasis, bonfire, circle, deadco,
broken, wynn - each is a designed HEAVY or a reference card), every shop with its free door
(pedlar, camp, saltwives, ratcart - a shop must stay a place you can walk out of), the race-gated
doors everywhere (they are the personality gold), and ogrestone (its five doors are mostly gated,
so at most four show; its leave door is load-bearing for a broke, full company).

**Verified in the running page:** LINT 0 · zero console errors · per-event choice counts read out
of the live `EVENTS` object and matched the table above.

**ROUND TWO, same day (8f.151), on the user's "maybe do same for additional 20% events":** five
more events, all 4→3 - camp (sell-a-gem cut, one gem outlet on the road is enough), saltwives
(the intel door merged into the buy door, `scout` rides the purchase), ratcart (the crossbow
shop line cut off the moral card), shrine (the coin offering cut; "that was not a trade" was the
card telling on itself), bogbody (the blade half-measure cut). **Running total 14 of 29 (48%),
sixteen doors gone or merged.** The sixth candidate was refused on purpose: everything left on
milestone, pedlar, bloom, deadco, sinkhole, steading, ogrestone and wynn is a distinct decision
class, and cutting one would have taken a real decision with it.

## 113 - THE SIGHTS ON THE ROAD ✅ BUILT

> **SHIPPED 2026-08-12, build log 8f.140.** Twenty-three painted map icons put on the nodes they
> belong to, in one session. Picture: [`shots/113_map_sights.html`](../shots/113_map_sights.html) -
> every node at its real coordinate and its shipping size.

> 🗺 **THE ROAD ONLY.** No battle, no card, no new system, no new player-facing text.
> **SYSTEMS** `art/build_assets.ps1` (a fourth asset pass) · `MAP_ART` / `MAP_SIGHT` / `sightFor()` ·
> `.node .glyph` · `NODE_PLATE_H` / `NAME_H` / `NAME_DY` and both map linters ·
> `tools/dramaturge.html`'s hand-kept copy of the same numbers.

**What he asked for.** *"Chat gpt create icons to show on global map. Can you please put them on
global map near related events. Here is instructions:
art/src/world-map-sites/CLAUDE_INSTRUCTIONS.md. They are already in the folder."*

**The brief is the interesting half, and it is not mine.** Its governing rule: *show what the
company notices from the road; do not illustrate a choice, reward, loot table, possible outcome, or
inventory of event nouns.* One dominant landmark, at most one supporting shape, one colour accent,
and *if a detail disappears at 48px, delete it - do not sharpen it.* That is why the icons are a
chapel half under fen water and an ogre calmly sitting on a small rock, and not a heap of swords and
coins. It also rules two things OUT on purpose, and both rulings were kept.

**The pipeline, which is the part that must not be special.** The 23 runtime files already existed
at 48x48 with transparent backgrounds, built by `art/src/world-map-sites/build_event_sites.py`. A
fourth pass in `art/build_assets.ps1` embeds them **verbatim** as `MAP_ART`, keyed by the same
filename-prefix rule every other pass uses (`MAP-EV04_drowned-chapel-48.png` -> `MAPEV04`). They do
**not** go through the stage-2 resize/JPEG path: a JPEG has no alpha channel and these are cut-outs
that sit on a painted map. 87KB for the set. The pass asserts 48x48 on every file, and that
assertion earned its keep on the first run by refusing `contact-sheet-48.png` - a 480x320 proof
sheet that lives in the same folder and matched a `*-48.png` filter.

`MAP_SIGHT{}` in the prototype is the one place an event key meets a picture, and `sightFor(n)` is
the one gate. Everything else about a node - the chip, the type-coloured border, and every state
class (here / live / done / far / locked / walking / mark) - is untouched, per the brief's own line
that discovery and state are gameplay information and must not be baked into art.

⛔ **THE CHIP GREW 33px -> 40px, AND THAT NUMBER IS MEASURED, NOT CHOSEN.** The brief asks for 48px
and the map cannot pay for 48px. A `.node` is a flex column - 3 padding + glyph + 2 gap + name plate
+ 3 padding - so every pixel on the glyph is a pixel on the node, and `spacingViolations()` tests
node against node with `NODE_PLATE_H`. Computed over the shipped `NODES` table, **the tightest
vertical pair on this map is f2/snare at 80px apart**, then oasis/steadn at 82. The node was 69px
tall against a 72px rule: 3px of deliberate slack. So:

| glyph | node height | rule | violations |
|---|---|---|---|
| 33 (before) | 69 | 72 | 0 |
| **40 (shipped)** | **76** | **79** | **0** |
| 42 | 78 | 81 | 1 - f2/snare |
| 48 (the brief's number) | 84 | 87 | 2 - f2/snare, oasis/steadn |

40px keeps the same 3px of slack and **moves no coordinate**, which is what the brief asked for in
its other sentence: *preserve click target size and map coordinates; this asset pass does not
authorize map redesign.* The border went 3px -> 2px at the same time for a reason that is pure
`box-sizing:border-box` arithmetic - the ring is subtracted from the picture, so 2px buys the art
36px of actual painting instead of 34.

⚑ **THE FINDING: A CONSTANT DERIVED FROM ANOTHER BOX'S SIZE IS A BUG WITH A DELAY ON IT - AND THIS
TIME THE DELAY HAD ALREADY EXPIRED IN A SECOND FILE.** `NODE_PLATE_H`, `NAME_W`, `NAME_H` and
`NAME_DY` are duplicated by hand in `tools/dramaturge.html`, which is **the tool the map is edited
in**. Everything else on that page live-reads the prototype through `grab()`; these six do not,
because they are plain `const a=1, b=2` declarators rather than a literal `grab()` can slice. For as
long as the two copies disagreed, the map editor would have approved layouts the running game
flags - and a linter that is wrong in the permissive direction is worse than no linter. Updated
there too, with the prototype named as the source of truth in a comment, and the permanent fix
(extract them by name during the live read) is spun off rather than done here.

⚠ **`NAME_DY` WAS LEFT AT 21 AFTER THE ARITHMETIC SAID 25, AND THE REASON IS WHICH WAY A LINTER
SHOULD BE WRONG.** The name plate's centre sits at `glyph/2 + 1` below the node's centre (the
plate's own height cancels out of the column arithmetic), so the true offset went 19 -> 21: the old
constant carried 2px of slack and is now exact. Restoring that slack by moving the constant to 25
pushes the *assumed* plate 4px below the *real* one, so a road label grazing the top of a name plate
stops being reported. Slack in a bounding-box check belongs in the box's HEIGHT, never in its
centre - so `NAME_H` went 28 -> 30 and `NAME_DY` stayed put. Both linters return empty at the
shipped numbers.

⚑ **A PICTURE IS A LOUDER SPOILER THAN A TITLE, so the reveal gate is the one the road already
had.** The seven floating slots hide their real name behind `n.real` until the company stands in
them (`dealEvents` sets it, arrival in `confirmTravel` clears it), and `sightFor()` reads exactly
that flag - no second rule, no new state, and it round-trips through the save for free because
`saveRun` already stores `real`. A slot that is still a rumour draws the plain diamond it has always
drawn; the painting goes up on arrival, with the name. A **fixed** node has no `real` and is named
on the map from the first minute, so the Black Fen shows the Fen-Mother from four miles off. That
was never a secret: the map has printed "The Black Fen" since the first screen of every run.

**What is deliberately not on the map.** `cache` (ruled out by the brief - a buried bag does not
read at this size), `armour` (painted as MAPEV10 and kept on disk, but the Thing in Armour is an
ambush that lands wherever fork B rejoins, and a permanent node would announce it), and the three
floating cards with no art in this pack: `circle`, `shipwreck`, `sinkhole`. All of them fall back to
the abstract type mark the map has always drawn. **A missing key is a fallback, never a hole** - and
`sightFor()` also guards on `MAP_ART` being defined at all, so a prototype opened with the art block
stripped still draws a map.

**Verified in the running page**, not in the source: 23 sights in `MAP_ART` · 8 fixed nodes drawing
one, 13 once every slot is revealed · `spacingViolations()` 0 and `labelViolations()` 0 at the new
constants · the two-line node measured at 104 x 76.4 against the 79 rule · every `<img>` decoded
(`naturalWidth > 0`) · one slot driven BOTH ways, no picture as a rumour and the toll-man after
arrival · the reveal round-tripped through the exact JSON `saveRun` writes · zero console errors.

**Open, and said out loud: nobody has looked at the built map with an eye on it.** The screenshot
path was unavailable in this session, so the picture is
[`shots/113_map_sights.html`](../shots/113_map_sights.html), which draws every node at its real
coordinate and its shipping size on a flat ground instead of the painting. The two things it cannot
answer are whether a 36px cut-out reads against the painted terrain underneath it, and whether the
map now looks busy. Both are the user's call and both are one look.

## 112 - THE ROAD SCREEN, ROUND FIVE, AND THE FALLING STAR ✅ BUILT

> **SHIPPED 2026-08-12, build log 8f.139.** Four map fixes and one ordered event, in one session.
> Pictures: [`shots/112_map_before.html`](../shots/112_map_before.html) (the before),
> [`shots/112_map_graph.html`](../shots/112_map_graph.html) (the new node against the old road) and
> [`shots/112_after.html`](../shots/112_after.html) (the after, plus the card).

> 🗺 **THE ROAD** and ✨ **one new event**. No battle, no sheet, no aftermath.
> **SYSTEMS** `#wPlaque` / `#wBar` · `TOKEN_H` and the two-row pack in `worldTick` · `.bcchip` and
> the `click` class · `WTIPS` and `bindW` · `NODES` / `EDGES` and the two spacing linters ·
> `EVENTS` · `pickChoice`'s effect chain · the boot purse
> **RELATED** #103 / #104 / #106 / #107 (the road's first four rounds) · #105 (its rule, sixth
> sighting) · #108 (the intro fight this event now follows) · #86 (the first fifteen minutes)

### The request, verbatim

> *"Another fixes on global map:*
> *-DAys up*
> *-10% bigger party size*
> *-Leader first and his size 10% bigger of restyour char*
> *-When mouse hover on mood or health it show show also, that it is actionable*
>
> *Between first part add an event "faling star" - where characters can make a wish (take
> inspiration from wildermyth). So we have at least one event between intro fight and ratkin save
> fight. The travel distance according to this events is 2 days. So you can add 17 crons to the
> starting game budget"*

### ⚠ It is an addition, during a pass whose rule is that nothing is added

The clarity pass's standing rule is **cut, delay, merge**. The Falling Star is none of those: it is
a new node, a new card and a new day of road. **It ships because the user ordered it directly**,
which is the same door #108 came through, and it is worth writing down that the two orders point
the same way: he is not asking for more systems, he is asking for the two fights at the start to
stop being back to back. The event adds **no system, no screen, no hint layer and no new resource**
- it is one card of the kind the road is already full of, and the thing it teaches is the pillar,
which is the one thing the opening is supposed to teach.

### 1. "DAys up"

`#wPlaque` had been a child of `#wMap` since #104, floating over the painting. #106 put it at the
top-right edge; #107 sent it back to the middle. Both left it **on** the map.

**Measured, not argued about:** the plaque is 144x36 and was sitting at y=42, which is the map's
first pixel. The bar above it is 1280 wide, with `#wCompany` ending at x=363 and `#wRes` starting at
x=1027: **664px of empty middle, with the one readout that wants the middle floating just below
it.** It is a child of `#wBar` now at `left:50%; top:50%`, which required `position:relative` on the
bar - load-bearing, and commented as such, because without it the plaque would centre on `#stage`,
which is the same 1280 today and would silently stop being so the day anything insets the bar.

The map got 36px back and #107's "days and time of the day in the midle" is still honoured.

### 2 and 3. The pack grew, and it got a head

`TOKEN_H` 26 -> 29 (the 10%), and a new `TOKEN_H_LEAD` at 32 (10% again, on the leader only). Two
constants because it is two asks: everybody grew, and then the Captain grew **relative to them**.

⚠ **The -9px foot-overlap between the two ranks was chosen by #107 against a 26px body and did not
know this had changed.** It rides on `--tokLap` now, written from `TOKEN_H` in the one place that
knows the pack was just rebuilt, so the pack keeps the proportion it was tuned at instead of
flattening as the bodies grow. That is #105's second rule (**a constant derived from another box's
size is a bug with a delay on it**) paid before it could bite.

**"Leader first" was already true and was invisible.** `marching` has led with the Captain since
#106, and the front rank takes the odd body so he stands in it. Thirteen bodies at one height have
no head to them, so the ORDER said one thing and the SCREEN said nothing. The size is what says it.
⚠ `.wRow` is `align-items:flex-end`, so the taller leader grows upward off the same groundline and
does not float.

### 4. ⛔ The find: a class that was written and never styled

**This is #105's rule landing for a sixth time, and it is the reason to keep measuring complaints
that sound like preferences.**

#106 points 7 and 8 made the mood chip and the heart into doors and wired `onclick` on both. Both
have carried `class="bcchip click"` ever since. **`.click` only ever had a rule under `.cchip`.**

Measured in the running build: `cursor: help`, no hover state, on the two chips in that row that
actually do something - sitting immediately beside two chips that do the same thing and have had
the pointer since #103. **The player was being told, by the only two signals a chip owns, that
these were readouts**, and the row was internally inconsistent about what a click means.

`.bcchip.click` now has the pointer and a hover lift. And the hover **says** it: the
`CLICK: throw them a party - 3 provisions` half of four tooltips was buried in the dim italic aside
`x`, in the same style as `the sun holds still while you decide` - a sentence that changes the
company dressed identically to one that changes nothing. It is a separate `act` field now, drawn
last as its own ruled gold row with a `▸`. **Nothing new is said.** The words were already there,
hiding behind the ones they shared a style with, which makes this a merge rather than an addition.

### 5. ✨ THE FALLING STAR

**The Wildermyth thing worth taking is not the wish, it is who it lands on.** Wildermyth's hooks are
small, personal and permanent: a night, a name, one line that follows that character for the rest of
the story. The wish is the excuse.

**One wish, four doors, and the four are four CURRENCIES rather than four flavours:**

| door | what it buys | what it costs |
|---|---|---|
| *"All of us home."* | +12 company mood | the wish, spent broad and gone by Coldharrow |
| *"Silver."* | +45 crowns | -9 mood, and they all heard what you asked a star for |
| *Give it to whoever needs it most.* | one of THEM, one stat, permanently | you do not get to pick which |
| *Say it for yourself.* | YOU, one stat, permanently | -6 mood, in front of every one of them |

None of them is free and none is a better version of another. **The selfish door genuinely pays**,
because the Captain does the most fighting, and that is the point of it rather than a balance
oversight: the pillar says a bad deed has to be actually tempting.

⚠ **Which stat is not authored.** A wish is for the thing you have not got, so the card takes the
person's **lowest** stat and gives them one of it. No table of wishes: a table would be four
authored lines that go stale the day a class is retuned, and the roster already knows what each
person is short of. It also means the same option reads differently on a warmage and on a spearman
without a word being written twice. Ties go to nerve on purpose, because `Math.min` over four
numbers will happily hand back two winners and picking the first key of an object literal is an
order nobody chose.

Storage is `p.st`, which is the base `effStats` reads and which the save already serialises whole:
**the same write `springStay` makes**, so no new field and no migration. `remember()` puts what they
asked for on their sheet for the rest of the run.

⚠ **The game never says the star did any of it.** The silver is a cart that came off the road in
some other year and nobody came back for. This is a low-magic world and a wish is a thing people
do, not a thing that works.

**The card casts its speaker once** into `G.fireTeller` (the #73 mechanism), because `{ANY}` is
re-picked on every `cast()` call and body / after / effect prose are three separate calls - the
body would introduce one person and the outcome would be about another. Not the Captain: his name
is literally "You", and *"You knows the custom"* is not a sentence.

### The map, and why the node is off the straight line

⚠ **Arithmetic, not taste.** `hold` and `clash` were 128px apart and the plate rule wants 110px of
horizontal clearance between any two nodes sharing a band of y - so a third glyph on y=330 was
impossible without shoving the whole west end of the map about. Dropping it to **168,424** buys the
clearance on the cheap axis (94px of y). `hold` does not move; `clash` moves twelve pixels.

Checked rather than eyeballed: `spacingViolations()` and `labelViolations()` both empty, LINT 0, and
the built plates measured in the running page (43px of air under Grausen Hold's plate, no overlap
with Blood on the Road or with the water road's first slot).

**Both legs are one day**, which is the user's "2 days" for the stretch, and he paid for it in the
sentence that asked for it: the wagon starts on **65 / 107** instead of 48 / 90. ⚠ **The number is
also written in the prose, in words, in both branches.** It was already stale-able and has now been
changed once; if it moves again, both halves move or the strongbox and the bar disagree on the
first screen of the run.

Measured end to end: the company reaches Blood on the Road on **day 3 with 49 crowns** where it used
to arrive on day 2 with 40. The beat is added, not taxed.

### Two corrections caught by reading the BUILT CARD rather than the source

Both would have shipped from a source review:

1. The selfish door opened *"You say it plainly"* and closed *"Bootstrap is handier"* - `capName()`
   is the right door for every other line in the build and hands back the Captain's given name.
   The narrator does not change person halfway through its own sentence.
2. The silver door restated *"Forty-five crowns"* in prose, three lines under a receipt that
   `pay()` runs through `lootMul()`. A company carrying anything that skims would have taken more
   than 45 and read a sentence saying otherwise. The button says what it costs; the story says what
   happened.

### Open remainders

- Nobody has played it with a hand on a mouse.
- **No painted art.** It falls back to the procedural `teal` night painter. The static-event-art
  rule governs any future pass.
- **The card is links 1 to 4 of the six** (a named person, a witnessed choice, a mechanical act, a
  stored fact) and deliberately has **no delayed consequence**. A wish that pays off later is a
  good idea and a separate one.
- `moraleTag` prints an em dash on every card in the game, this one included. The ~1,300-dash purge
  is still its own job.

---

## 82 - HOW TALL IS IT? OBSTACLES GET A HEIGHT ✅ BUILT

> **SHIPPED 2026-08-04, build log 8f.108.** Asked, specced, pictured, ruled on and built in one
> session. The gate picture is [`shots/82_obstacle_height.html`](../shots/82_obstacle_height.html)
> (the before) and the verification is
> [`shots/82_obstacle_height_after.html`](../shots/82_obstacle_height_after.html) (the after, same
> two boards with the rule in). **The spec below is kept as it was written**, with one thing
> settled: the user ruled the independent rock gives **COVER at -14** rather than blocking, which
> is option (a) of the open decision.

> ⚔ **THE BATTLE BOARD** and nothing else. No sheet, no road, no aftermath.
> **SYSTEMS** `BLOCKED{}` (the one map that answers two questions today) · `losState()` and its
> `LOS{}` verdict table · `needsLane(act)` · `shotState()`/`SHOT{}` (the word on the hex) ·
> `hitBreakdown`'s `#36` lane block, which is where the receipt line is printed ·
> `mayAim(u,a,t)` and the matching gate in `clickHex` · the spear wall's trigger
> (`grimtoll_slice.html:9542`) · `loneRock(c,r)` · both AI brains, for free, if the rule lands in
> `mayAim` and `hitBreakdown` rather than in the UI
> **RELATED** **#36** (line of fire: this entry is the second half of it, and the first half's
> comment about the ogre's boulder has to be rewritten) · **#46** (only an INDEPENDENT rock may be
> lifted, and a thrown one always lands independent: that rule is what makes a height tier for the
> lone rock safe) · **#61/#64** (the terrain register and the flower, which is where the kinds come
> from) · **#47** (the spear rework: this entry gives the class its first thing it cannot do, and
> #47 gives it the second, so read them together) · **#50** (an archer that can shoot over a fire
> is worth more than one that cannot, and that is a balance number nobody has measured)
> **MODEL** 🧠 STRONG. It is a combat rule that lands in both brains and it touches the one
> function every shot in the game passes through.

**THE ASK.** User, 2026-08-03, in one message:

> *"Spearmen can't hit through the tall objects (tree, group o rocks). Independent rock
> medium-small. But archers can shoot through smaller objects (like fire)"*

### WHAT THE ENGINE DOES TODAY, WITH RECEIPTS

There is **one map**, `BLOCKED = {rock, fire, tree, huge, hugeA, wall, flower}`, and it is asked
**two different questions**: *can a body walk here* and *can a shot cross here*. It gives the same
answer to both, so:

- **Every obstacle stops an arrow dead.** Photographed on the practice field: an archer at 4,6 with
  three ogres all exactly 3 hexes away, one tree, one lone rock and one fire on the three traced
  lanes. All three read **BLOCKED**. A campfire stops an arrow exactly as hard as an oak does.
- **No obstacle stops a spear.** `needsLane(act)` reads `act.range`, and a reach-2 melee act carries
  `act.reach` and no `range`, so a thrust never asks about the hex it crosses. Photographed:
  Vesna with the boar spear, four bodies each exactly 2 hexes away, a tree in one lane and two
  touching rocks in another, and **all four are offered with the odds printed on them: 52% through
  the tree, 56% through the rock group.**

Both pictures are in [`shots/82_obstacle_height.html`](../shots/82_obstacle_height.html).

### THE RULE: THREE HEIGHTS, AND HEIGHT IS A PROPERTY OF A KIND

| height | what it is | an arrow | a reach-2 thrust |
|---|---|---|---|
| **TALL** | `tree` · `huge`/`hugeA` · `wall` (palisade, hut) · **a rock that touches another rock** | **BLOCKED**, unchanged | **refused**, the offer is withdrawn |
| **MEDIUM** | **an independent rock**, which is `loneRock(c,r)` and already exists | **COVER**: the shot is offered and costs accuracy | **allowed**, no penalty |
| **LOW** | `fire` · `flower` | **CLEAR**, nothing at all | **allowed**, no penalty |

Three things are worth saying plainly about that table.

**A GROUP OF ROCKS IS TALLER THAN A ROCK, and the code already knows which is which.** `loneRock`
was written for #46 so an ogre could only lift a boulder standing on its own, and it is exactly the
test this entry needs: a rock with a neighbour is a spine you go round, a rock on its own is a thing
you shoot over. **No new terrain kind is added.** That matters, because #61 says a terrain kind is a
place with its own rule and a dial is not a kind, and height is a dial.

**HEIGHT IS NOT WALKABILITY, AND THEY MUST NOT SHARE A MAP.** You still cannot walk into the fire,
and after this you can shoot over it. `BLOCKED` keeps its job (movement, `walkable`, `reachMap`,
`terrainCheck`, the throw's landing) and a new `HEIGHT{}` answers the shot. **The transferable
lesson of this entry is that one map was answering two questions, and the day the two answers had to
differ it could not.**

**BODIES NEVER REFUSE A SPEAR.** The lane test for a thrust asks about **terrain only**. A
spearwoman fighting over the person in front of her is the entire class (`grimtoll_slice.html:3152`),
and a version of this rule that read bodies would delete it in one line. This is the single most
likely way to get this entry wrong.

### THE ONE OPEN DECISION: WHAT AN INDEPENDENT ROCK DOES TO AN ARROW

The user's sentence settles the spear (medium-small, so she thrusts over it) and settles the fire
(an arrow crosses it). It does not settle the arrow over a boulder, and there are two honest
readings:

- **(a) COVER, the recommendation.** The shot is offered at **-14**, between `SCREENED` -8 (your own
  man, braced, cooperating) and `OBSTRUCTED` -22 (an enemy body across the lane). It gives the game
  its **first piece of real cover**: standing behind a boulder is now worth doing, and the ogre
  putting one down (#46) creates cover rather than only removing a lane. New word on the hex, new
  colour, slots into the `SHOT{}` ladder between `FAR` -18 and `LONG` -8, which is already sorted by
  cost.
- **(b) still BLOCKED.** A waist-high boulder stops the shot outright. Cheaper, changes nothing
  about archer value, and **keeps #46 exactly as written**: lifting a lone rock is still the only way
  to turn a blocked lane back into a shooting lane. The cost is that the MEDIUM tier then behaves
  identically to TALL for one of the two verbs and only exists for the spear.

**⚠ (a) demotes a line of #46 and the entry has to say so rather than smuggle it.** The comment at
the top of `losState` reads *"this is exactly what makes the ogre's thrown boulder worth a whole
action: it is the only way to turn a BLOCKED lane back into a shooting lane."* Under (a) that
sentence becomes *removes cover*, which is a smaller thing. It is still not nothing, and the throw
was never only about the lane, but the comment is wrong the moment this ships and must be rewritten
in the same edit.

### BUILD, AND EVERY SITE IS NAMED

1. **`HEIGHT{}` beside `BLOCKED{}`.** A function, not a table, because one kind is computed:
   `heightAt(c,r)` returns `TALL` / `MED` / `LOW` / `null`, and rock asks `loneRock`.
2. **`losState` reads `heightAt` instead of `BLOCKED`.** TALL returns `BLOCKED` as it does now, MED
   raises a cover flag, LOW is invisible to it. **The lane is worth the worst thing in it**: cover
   and a body in the same lane take the larger penalty, never the sum.
3. **`LOS.COVER`** with its own word, colour and one-line description, and **`SHOT.COVER`** in the
   verdict ladder between `FAR` and `LONG`.
4. **`hitBreakdown`'s #36 block** prints the receipt. Its current line is hardcoded
   `'a body in the way '` and cover needs its own wording: *"shooting over a boulder -14"*.
5. **The thrust asks.** A new `reachLane(act)` (`act.reach >= 2 && !act.arcane`), tested inside
   **`mayAim`** so both brains inherit it, plus the matching refusal in `clickHex`. ⛔ The comment
   above `mayAim` already says every no-op-and-return gate in `clickHex` must be repeated there,
   and this is the gate that will prove it.
6. **The spear wall's trigger** (`grimtoll_slice.html:9542`) asks the same question, or a body
   walking round the far side of an oak gets speared through it.
7. **The hex the player hovers.** A refused thrust must be **unlit**, not lit and then refused
   (#46's rule, and B05). The reason belongs on the aiming card in one word.

### WHAT WILL BITE

- **Both brains, or neither.** `aiTurn` and `autoStep` both reach the rule through `mayAim` and
  `hitBreakdown` if it is put there, and both diverge the moment it is put in `clickHex` alone.
  This file has been bitten by that four times.
- **`losState` is memoised on where the bodies are standing, not on the terrain.** The cache key is
  a signature of every unit's position, and terrain changes mid-fight (an ogre lifts a rock, a
  bog-working floods a hex, a wall comes down). Lifting the one rock in a lane must invalidate the
  cache. Check this before shipping: it may already be safe because the lift also moves a body, and
  *may already be safe* is not the same as safe.
- **A rock's height depends on its neighbours**, so a rock is TALL until the ogre beside it is
  lifted away. That is correct and it is also the first time a hex's height can change without that
  hex changing. Say it in `WHAT_TO_TEST.md`.
- **Every enemy with `reach:2` inherits the refusal**: the pikes, the felling pike, the hook-pole,
  the great beast's ANVIL-HEAD and DRAG UNDER. That is the point (one rule, both sides) and it also
  means the enemy line loses reach it used to have through a wood. Watch the Snare and the two
  bosses in the regression.
- **Board generation was tuned when everything blocked a shot.** Making fire and lone rocks
  shootable-over raises the archer's value on every generated field. Not a blocker, a number for
  **#50** to measure.

### VERIFY

`LINT()` at 0 and `regress()` over all eight fights with no new guard hits and no fight moving
outside its round band. Then, in the practice field, the two photographed boards again with the rule
in: the archer's three lanes read **BLOCKED / COVER / CLEAR**, the fire lane's hit chance is
identical to an empty lane, and the cover lane's receipt prints the exact number. Vesna's four lanes
offer two and refuse two, and **the two refusals are unlit hexes rather than lit-and-refused**.
One AUTO fight on a wooded board that does not stall, which is the failure mode a new
offer-withdrawn gate produces.

### GATE ARTIFACTS. ✅ RULES WRITTEN · ✅ PICTURE MADE · ⛔ ONE DECISION OPEN · ⛔ NOT CODE YET.

The picture is [`shots/82_obstacle_height.html`](../shots/82_obstacle_height.html), two panels, both
photographed off the running build with `grabUI`/`shotUI`: the archer's three lanes and the
spearwoman's four. It shows the **before**, which is what a picture can show for a rule that refuses
things, with each lane's new verdict written on it. **Owes a `WHAT_TO_TEST.md` section when it
ships.**

---

## 81 - THE BATTLE CLOCK ✅ BUILT

> **SHIPPED 2026-08-03, build log 8f.100.** Specced and built in one session. No gate picture: the
> thing being changed is *duration*, and there is nothing in a still frame to photograph. The gate
> was paid in **measurement** instead, which is the honest substitute for a picture when the change
> is temporal - the numbers are at the foot of this entry.

> ⚔ **THE BOARD** (every fight, always) - one multiplier on every duration on the battlefield,
> shipped at ×1.75, with a player-facing control
> **SYSTEMS** `PACE` · `paced()` · `--pace` · `later()` · `endLater()` · `animClash` · `animShot` ·
> `fx()` · `strike()`'s ranged branch · `toggleAuto`'s interval · `#bOpts`
> **RELATED** #60 built (the Captain's lessons are the *other* answer to "the player did not
> understand what happened", and they are deliberately not on this clock) · #43 (the narrator's
> budget ranks **action readability** first, and this is that) · #13 (gate 1 is legibility)

**The user, verbatim** *(2026-08-03)*:

> "make actions on battlfild 50-100% slower. so player have more info to understend what have
> happened"

### The rules

**1. There is one number and everything goes through it.** `PACE`, default **1.75** - the middle of
the range asked for. Two doors: **`paced(ms)`** for every JS timer on the board, and the CSS
variable **`--pace`** for every keyframe, each duration written as `calc(base * var(--pace))`.

**2. The literals stay literal.** Every call site still says the number it always said. `380` in
`later(step,380)` means *the beat after a blow*, and its job is to say how this beat compares to its
neighbours - not how long it is in wall time. That translation happens in exactly one place.

**3. Nothing about the fight changes.** Not a hit chance, not a damage number, not an AI decision,
not a round count. This is the reason the control is not gated behind `⚙ TEST` the way AUTO is:
**how much time a person needs to read a blow is a fact about the person**, and no setting behind
this button can change how a fight comes out.

**4. What is on the clock, and what is not.**

| On it | Not on it |
|---|---|
| every `later()` beat - AI steps, turn hand-off, rout movement | the Captain's balloons (2.2s comment, 4.5s lesson) |
| `endLater()`, the hand-off to the spoils screen | the opening side labels (4.5s) |
| lunge · recoil · evade · hitflash · sparks | the arrow's flight - see the remainder below |
| the damage figure's rise, and the timer that deletes it | the camera's 0.22s pan |
| AUTO's step interval | anything off the battlefield |

The line between the columns is **action time versus reading time**. A balloon is text you are
reading; it was tuned on its own and stretching it with the board would make a lesson hold for eight
seconds.

**5. The control.** ⏱ PACE under WITHDRAW, cycling ×1 · ×1.25 · ×1.5 · **×1.75** · ×2 · ×2.5,
remembered in `gt_pace`, gold whenever it is off the default, and it retimes the fight you are
already in on the next blow. It cycles rather than opening a settings panel because there is no
settings screen to put it on, and because **the only way to know which speed you want is to press it
during a fight and watch the next blow.**

### ⚑ The three things worth carrying out of it

- ⚑ **A SET OF DURATIONS TUNED AGAINST EACH OTHER IS A SINGLE OBJECT, AND SCALING HALF OF IT BREAKS
  IT.** Both obvious readings of "make it slower" are wrong here: pause-only opens a dead gap in the
  middle of every beat, animation-only leaves a blow still playing when the next unit swings. The
  test for any future timing knob is whether **every** duration in the relationship passes through
  it. This is written into the `--pace` comment, where the next person to add a board animation will
  read it.
- ⚑ **THE ARROW EXPOSED A DEFECT THAT WAS INVISIBLE UNTIL THINGS SLOWED DOWN.** `strike()` looses
  the shot and resolves the damage in the same tick, so the flash and the figure are already on the
  target while the arrow is still in the air - at ×1 it arrives at ~420ms, **after** a 340ms recoil
  has finished. Pacing the flight would have widened that to 735ms and made it obvious. Leaving it
  alone puts the arrow back *inside* the reel, which is right by accident and wrong by construction.
  **It is a patch, it is labelled as one in the code, and the fix is the remainder.**
- ⚑ **A TEMPORAL CHANGE PAYS ITS GATE IN MEASUREMENT.** There is no picture of a duration. Tallying
  every `later()` call through all eight fights took one instrumented `regress()` and turned "it
  feels slower" into a number the user can argue with - including the one that deserves arguing
  with, the Snare's extra 85 seconds.

### Measured

Scheduled pause time per fight, every `later()` call tallied, ×1 → ×1.75:

| clash | brigand | pack | slingline | steading | snare | mother | armour |
|---|---|---|---|---|---|---|---|
| 42.9→75.0s | 56.9→99.6s | 57.8→101.2s | 50.9→89.1s | 72.0→125.9s | **113.1→197.9s** | 92.9→162.6s | 52.1→91.2s |

**The Snare adds 85 seconds** to a fight that is already the longest in the game. That is the number
this entry is least sure about, so it went into `WHAT_TO_TEST.md` as a question rather than being
left for the user to discover by getting bored.

**The harness pays nothing:** `runFight` drives `aiTurn`/`nextTurn` itself and shims timers to
microtasks, so the full `regress()` still runs in **817ms** at ×1.75.

### Verified

`LINT()` 0 · `regress()` all eight fights resolve, 0 errors, no guard hits · computed animation
durations read back off the live DOM at ×1.75 (fx 1.75s, lunge .595s, recoil .525s, evade .56s,
flash .525s, spark .735s) and at ×1 (lunge .34s, fx 1s) · the button cycles, persists and tints
through a full lap · `#bPace`'s `grid-column` reads `1 / -1` with AUTO shown, `auto` with it hidden
· the user's localStorage backed up before anything ran and every key byte-identical afterwards
(`gt_run_v4` 3681, `gt_journal_v1` 1215).

### 🚧 Open remainder

**The impact should wait for the arrow to land.** `strike()` resolves the shot in the tick it is
loosed; it should defer the damage, the flash and the figure by the flight time, at which point the
flight joins the clock like everything else. Left out on purpose: it is a change to how a blow
resolves, not to a multiplier, and it wants its own entry and its own verification.

## 74 - THE CIRCLE ✅ BUILT

> **SHIPPED 2026-08-02, build log 8f.81.** Specced, pictured and built in one session. The one thing
> the build changed about the spec below is at the foot of this entry, and it is the statblocks.

> 🗺 **THE ROAD** (a floating card, any slot, once a run) - also ⚔ a new fight of ten who never
> break · 🎒 the mark on the Captain's sheet · 📜 an authored loss that is not a defeat
> **SYSTEMS** `EVENTS` · `FLOATING` · `nerveFrac()` · `startBattle`'s foe dispatch · `FIELDS` ·
> `AFTER` · `LOOT` · `FLEECOST` · `checkEnd`'s loss branch · `toRetreat` · `LINT`
> **RELATED** #64 built (the bloom flower's aura is this rule's exact shape, and its lessons apply
> line for line) · #73 built (the other half of "a permanent mark on one named person") · #34 (an
> authored beating is the gentle sibling of the mortality chain) · #22
> **PICTURES** [`shots/74_the_circle.html`](../shots/74_the_circle.html) (the gate) then
> [`shots/74_the_circle_built.html`](../shots/74_the_circle_built.html) (as built).

**The user, verbatim** *(2026-08-02)*:

> *"Добавь еще событие - когда ты встречаешь странных сектантов. И они предлагают сделать тебе тату
> лица - на лице. Чтобы войти в их круг и получить бонусы. Вы подсели к их костру. Но оказалось что
> это не маленькая группа из 3 людей.. Вы поели и попили. И оказалось - что большая банда из 10ти.
> И даются выборы: Сделать тату лица на своем лице · Заплатить провизией (много провизии отдашь) ·
> Начать сражатся (и приписка - очень не рекомендуем. Их в разы больше и они вас отделают). Ну и
> если выберешь этот вариант бой - где невозможно победить."*

**And the two rulings that shaped it, both given after the gate picture:**

> **On losing the fight: *"They beat you and mark you anyway."*** All three doors end with a toll
> paid, and the fight is the worst way to arrive at the same place.
>
> **On what the mark buys: *"just ugly. Both enemies and friends feels shakier near you - morale
> -10 to adjacent units."*** ⚑ **This is the entry.** It was specced as a bonus and the user cut the
> bonus out. **The sect promises that the mark lets you into the circle and gets you bonuses, and
> the game never once corrects them.** What you actually bought is that nobody wants to stand next
> to you. It is free tonight and it is a tax on every fight for the rest of the run.

**The canon hook, and it is the reason this card is worth a number.**
[`03_WORLD_LORE.md`](03_WORLD_LORE.md) §2 already says it: *"passage is never free; when it looks
free, the price has simply not been named yet."* This card **is** that sentence played as a scene -
you sat down, you ate, it looked free, and now the price is being named. A clan cuts its mark on a
milestone; these people own no road, so they cut it into faces.

### The rules

**Where.** A **floating** card (`FLOATING`), so it can land in any of the seven road slots, at most
once a run. ⚠ **A floating card may never name a specific character** (`LINT`'s `scanNames`), so the
only person it speaks about is `{CAPTAIN}`, who is always present.

**The body, three beats.** Three of them at a fire wave you over. There is bread better than yours
and nobody asks who you are. You are most of the way through the second bowl when the other seven
come in out of the dark. Every one of them wears a ring cut round the left eye, badly. Nobody has
drawn anything; the oldest says that passage is never free, that you have eaten, and that nobody has
ever left this fire without settling.

**There is no fourth option and there is not supposed to be.** You already ate. That is what the
second bowl is in the prose for, and it is why "walk away" is not on the card.

**The three choices.**

| | label | costs | leaves |
|---|---|---|---|
| 1 | *Sit back down. Do it now, while the fire is hot.* | nothing you can count tonight | **THE CIRCLE** on the Captain, permanently |
| 2 | *Pay them. Whatever is in the cart that they will take.* | **−6 provisions** (`need:{food:6}`, so it greys out) | nothing |
| 3 | *No. Stand up.* | **BATTLE**, and the label says *"we do not recommend it. There are ten of them and you will not win."* | a beating, and the mark anyway |

⚑ **The provisions gate is the pillar and not a nicety.** When the cart is under six barrels the
paying door is shut, and the only currencies left are your face and your blood. **Do not soften it
by scaling the price to what the player happens to have** - a price that always fits is not a price.

**THE CIRCLE - one rule, symmetric, no exceptions.** `p.mark='circle'` on the Captain.

> **Every unit standing adjacent to the marked Captain, friend or foe, reads 10 morale lower.**

- It is a **modifier in `nerveFrac()`**, exactly where the bloom flower's lift lives, and ⚠ **it is
  never written into `u.morale`** - #64's lesson word for word: writing it in would clamp against
  `moraleMax` and would not be given back when the body steps away.
- **Radius 1**, adjacency, measured with the one `udist` call `B.marked` makes affordable, because
  `nerveFrac` is read from inside both movement scorers and that is the inner loop of both AI
  brains. ⚠ **`at()` must never appear there** - it rebuilds `alive()` on every call.
- **It does not take a side.** The precedent is the Kind personality's `auraAll` and the flower's.
- **It does not touch the Captain himself.** He is used to his own face.
- It shows up in `statusesOn()` on both ends, the way #67's ✷/◎ pair does, so a player can see why
  their own line is sagging.

⚑ **What makes it a tool rather than only a tax is where you stand him.** Keep him off your own
line and drive him into theirs and the same rule is a weapon. Nothing in the game says so; the
positions do. That is the project's filter satisfied: *a tactical choice reveals something.*

**The fight - ten, and none of them break.** `noRout` on every one of the ten. ⚑ **That is what
makes it unwinnable without rigging a single number:** you cannot rout a circle, so the fight ends
when you are down or when you withdraw. Withdrawal stays available through the normal `FLEECOST`
door - *they wanted a member, not a chase.*

**Losing it is a BEATING, and this is the part that must not be got wrong.**
`checkEnd`'s `!you.length` branch calls `toDefeat()`, which **ends the run and wipes the save**. A
floating card that can land in any slot must never be able to do that.

- A `BEATEN{}` register - data, the same shape as `NOWITHDRAW` - routes the loss to `toBeaten()`:
  everybody comes back up, the downed carrying a scar, which is **exactly what `toRetreat()` already
  did**, so the body pass was **pulled out into `carryEverybodyOut()` and shared** rather than
  copied. Two ways to turn a downed body into a scar is two rules to keep in step.
- They take **the provisions and the purse**, and they cut the ring into your face anyway.
- ⚑ **README §7 records that "a written outcome instead of an unwinnable fight" was one of the
  user's best calls.** This does not reverse it - it is that ruling applied *to* an unwinnable
  fight: the fight is real, and its outcome is written.
- **Winning is left possible.** A fight labelled *"you will not win"* that cannot be won even in
  principle is a cutscene wearing a battle's clothes, so it has its own `AFTER` and `LOOT`.

### ⚑ What the build changed about the spec above

**The statblocks, and the label nearly shipped as a lie.** The ten were written as rabble - 32
hitpoints, 20 armour - and **lost 4 fights out of 5**. `noRout` had made them *easier*, not harder:
nothing fled, so all ten stood there and were farmed for the loot table, and a seasoned six walked
through them without losing anybody. Tuned against the arena rather than against taste, in four
passes, and the shipped numbers give **0 wins in 60** (twelve runs against each of the five arena
companies, 4 to 16 rounds); over 20 runs the seasoned six - the strongest thing this act produces -
takes 1, which is the 5% the spec deliberately left open.

> **A button that says "you will not win" is a promise, and the arena has to be asked about it
> before it ships.**

**And two LINT checks the spec did not ask for, one of which paid for itself the same hour.**

1. **`startBattle`'s foe dispatch has a silent fallback.** It is a hardcoded
   `kind==='x'?xFoes():` chain ending in `:foes()`, which is the Snare's ratkin - so a fight kind
   missing from the chain quietly fights the Snare's army. Not hypothetical: **this fight served
   nine ratkin the first time it was stood up on the board.** Same shape as
   `LOOT[kind]||LOOT.snare`, one layer further in. The check reads the function's own source.
2. ⚑ **A DUPLICATE KEY IN A REGISTER LITERAL IS COMPLETELY SILENT.** The new status was called
   `marked`, which #67 had already taken further down the same `STATUS` literal. **The later one
   simply wins and the earlier one never existed** - nothing warns, both features look fine in
   isolation, and only the one defined *first* is gone. Renamed `ringed`/`nearring`, with the
   warning written where the next status will be added, because neither the linter nor the console
   can see it.

**And two prose bugs caught by driving it.** The receipt shipped as *"a black ring round You's left
eye"* - the Captain's roster name is literally `You`, which this file already warns about once, on
`cast()`. It is second person now, with the generic branch kept. And the em dash in the
confiscation line went.

## 73 - THE LONG FIRE ✅ BUILT

> **SHIPPED 2026-08-02, build log 8f.79.** Built the same session it was specced, to the spec below, with two changes recorded at the foot of this entry.

> 🗺 **THE ROAD** (a new camp node on the corridor after the Thing in Armour) - also 🎒 the fact and
> the rule on one person's sheet · ⚔ he does not break the first time it comes for him · ⚙ one new
> node, two new edges, one new cast token, one new choice gate
> **SYSTEMS** `NODES` · `EDGES` · `EVENTS` · `cast()` · `openEvent`'s choice filter · `pickChoice` ·
> `restate()` · the walkout branch in `passDays` · `LINT`
> **RELATED** #44 built (`castRace`/`castNeed` is the gate this reuses) · #38 built (one fact
> producing two rules, one in a fight and one out of it) · #71 built (the corridor it lands on) ·
> #22 (the road reading the company) · #34 (a person who will not leave is a person you can spend)
> **PICTURE** [`shots/73_long_fire.html`](../shots/73_long_fire.html) - three panels, shot from the
> running build with the draft card injected: the ask, the story, and where the node sits.

**The user, verbatim** *(2026-08-02, and the Russian is kept because the story is in it)*:

> *"After battle with huge monster 'thing in armor' add node with event. 'Near fire'. New one. Idea
> and concept of event: событие. После большого события (битвы с фен мозер или синг). На карте кемпа
> скри просит провизии, что сделать праздноване. Если ты соглашаешься - то он рассказывает историю.
> Вы знаете, почему крысолюды выжили? Хотя они самые маленькие и слабые - они держатся кланов. Мы
> тоже держались и эта штука нас не сломала. Но клан тоже должен заботиться. Его хотели принести в
> жертву на бездумній убой - и когда он отаказался, его сключили из клана. Ему важно - чтобы клан о
> нем заботился, и он стоял до конца. Его клан. Мне очень нравится малыш скри - я бы хотел с ним
> дружить."*

**What it is.** A camp node, **The Long Fire**, standing on the corridor between the Dead Company
and the Warm Spring. A ratkin has built a fire far bigger than a fire needs to be and wants the
barrels opened on it, tonight, because this company walked away from the thing in the armour and the
nine men in the ditch three miles back did not. If you open them, he tells the story: first why
ratkin are still on this island (**clan**, and holding on with both hands), and then, quieter, what
his own clan did to him when he refused to be spent on a slaughter that was about a milestone.

**Why it is not a vignette.** It runs all six links. A named person → a choice the whole fire
watches → a mechanical act (four provisions, in the stretch where provisions are the mending clock)
→ a stored fact → a delayed consequence → a body that behaves differently at the Snare.

### The rules

**Placement.** `bonfire :{x:1216,y:400,n:'The Long Fire',t:'camp',ev:'bonfire'}`, splitting the
existing `dead → oasis` edge into `dead → bonfire → oasis`, one day each. **Measured, not eyeballed:
`spacingViolations()` reports nothing on the new node and `labelViolations()` reports 0 over the
whole map at those coordinates.** The act goes one day longer, which is one more day of wages, and
that is the price of the beat.

> **⚑ WHY BEFORE THE WARM SPRING AND NOT AFTER IT, and it is a mechanical reason rather than a
> taste one.** The spring's first choice closes every wound in the company. Provisions are only
> spent on a day when somebody is carrying a wound (see `passDays`), so a four-provision cost
> **placed after the spring costs nothing at all** - the barrels would stop draining the same night
> they were opened. Before it, the company is at its most chewed-up and four provisions is four days
> of mending walked into the Snare. The order is also the better dramaturgy: the fight, then nine
> men who did not make it, then the night we did, then the water. Spirit, then body.

**The cast.** `castRace:'ratkin'`, `castNeed:1`. Prefer the person with id `skree` if he is on the
roster, otherwise any ratkin, chosen once when the card opens and stored as `G.fireTeller`.
**If there is no ratkin in the company at all, the node deals a card off the `CAMPS` deck instead**,
exactly the way The Roadside Fire does (`openCamp(node,()=>{},true)`) - one line, no second card to
write, and the node is never an empty stop.

> **⚑ IT NEEDS A NEW CAST TOKEN, and the gap is pre-existing.** `cast()` re-picks its `{RATKIN}`
> on every call, so the body and the `after` text of the same card can name two different people -
> which is why every card that needs a stable subject today either hardcodes a name (the thing the
> comment above `CASTFALL` warns against) or is a `CAMPS` card with `body:(a,b)=>`. Add **`{TELLER}`
> / `{TELLER1}`** to `cast()`, resolving off `G.fireTeller` (full `who()` form and bare first name),
> set when the card opens and cleared when it closes. One place knows the rule, and body, `after`
> and the effect prose cannot drift apart. **Any later authored card about one specific person wants
> this and there is nothing else to reach for.**

**The three choices.**

| | label | costs | pays |
|---|---|---|---|
| 1 | *Open the barrels. All of them.* | −4 provisions (`need:{food:4}`), so it greys out on an empty cart | +14 company mood · **the story** · **HIS CLAN** on his sheet, permanently |
| 2 | *Open them. And while they are full and loud, tell them the wage is short.* | −4 provisions · **and he works out what the fire was for** | +10 company mood · **every unpaid day in the company is wiped** (`p.unpaid=0`) · he tells the first half of the story and stops · **no HIS CLAN, ever** |
| 3 | *No. Four days to the bells, and that food is the road.* | nothing tonight | −8 company mood · he agrees with you out loud, in front of everybody, and goes and sits where he always sits |

**Choice 2 only exists when it can bite.** A new choice gate `needUnpaid`, the same shape as the
existing `needHurt`: it is drawn only when somebody in the company is actually owed wages. It is the
cynical option and it is **supposed to pay better tonight** - mood and a wiped grievance for the
same four provisions - while costing the one permanent thing in the card. That is the pillar with
the sign the right way round: the generous option is available, it is never free, and it does not
secretly pay better.

**HIS CLAN - one fact, two rules.** `p.clan=true`, plus a `remember()` line, plus a line on the
sheet. It buys exactly two things and both are stated in words, never numbers:

1. **In a fight:** the first time his nerve would take him to ROUTED, it does not. Implemented in
   `restate()` as `if(u.clan&&!u.clanHeld&&frac<0.15){u.clanHeld=true;u.noRout=true;}` - **the same
   shape as `desperateAt`, caught before the `noRout` floor lifts him back up, and at the one site
   both AI brains and AUTO already read.** Once per battle, for the rest of his life.
2. **Off it:** he is never in the `goers` list in `passDays`. He does not walk out over money. That
   is the second half of the user's own sentence - *"a clan must also care"* - stated in the one
   currency the game already argues in.

**What refusing does.** Nothing tonight, a line on his sheet, and he does not get the rule - so at
the Snare he breaks like anybody else. Deliberately **not** a punishment clock: a refusal that
quietly makes him more likely to walk out later is a karma meter with better manners, and it would
make the generous option the only correct one. Same shape as the Warm Spring's fourth choice, which
the user wrote: *free today, remembered forever.*

> ### ⚑ THE STANDING RULE THIS EVENT CAME WITH - apply it to every card, not just this one
>
> **The user, same message:** *"На каждом из собыитй важно вынести - оно сделано человеком или нет.
> Это да - и оно важно для эмоционального включеня и сюжета."* - **every event should make legible
> whether the thing in front of the company was made by people or not**, because the two are
> different kinds of dread and the difference is what the player attaches to.
>
> The lore book already has the axis and has never been asked to carry it on the card: the **Old
> Work** is dressed stone nobody living made and it is still doing its job; the **Bloom** is not
> anybody's doing at all; the **Thing in Armour** is the question stated as a monster, because the
> armour was certainly made by people and what is inside it was not. **This card is the other end of
> the scale, and that is why the fire is the subject rather than the meal**: it is the one thing in
> the back half of the act that people built themselves, out of nothing, on purpose, for a night
> that feeds nobody tomorrow.
>
> **It belongs in the "before an event ships" checklist in [`README.md`](README.md) §5** as a
> seventh question, and it is worth one added line in the Thing in Armour's own aftermath. Neither is
> part of building this entry; both are cheap and should be done while the reason is fresh.

### Build

1. `NODES.bonfire` + swap the `dead→oasis` edge for two. Re-run `spacingViolations()` and
   `labelViolations()` after, and **remember that every scene in the map painter is a node lookup**
   - this adds one rather than removing one, so nothing there breaks, but the painter should get the
   fire drawn on it.
2. `{TELLER}` / `{TELLER1}` in `cast()`; `G.fireTeller` set in `openEvent` and saved with the run.
3. `EVENTS.bonfire` - the card, three choices, the ratkin fallback to `openCamp`.
4. `needUnpaid` in `openEvent`'s `visible` filter; `clanFeast` / `clanBuy` in `pickChoice`, writing
   `hurtLine` the way `springStay` already does.
5. `restate()`'s one line; the `goers` filter in `passDays`; `p.clan` on the character sheet.
6. Teach `LINT()` the three new keys, and add the node to whatever it checks about the graph.

**Verify.** A company with no ratkin gets a camp card and never a broken node · the same person is
named in the body, the `after` and the story · choice 2 is invisible to a company that is paid up ·
choice 1 greys out under four provisions · `p.clan` survives a save and reload (⚠ **`G.bonds` was
never written to the save until #38 caught it** - check this one the same way) · he holds exactly
once per battle and not once per run · he is skipped by the walkout roll at five days unpaid · the
card cannot fire twice · `LINT()` clean · `regress()` over all eight fights unchanged.

### ⚑ Two things the build changed about the spec above

**1. HIS CLAN is not a one-tick reprieve, and the words were changed to match the rule rather than
the rule softened to match the words.** The spec said *"the first time his nerve would take him to
ROUTED, it does not"*, which reads as one saved tick. What `restate()` actually does - and what
#38's `tieHeld` has always done - is set `noRout` for **the rest of that battle**, so once his nerve
goes he cannot leave that field at all. That is his own sentence in the story (*"I will stand in it
until it is over"*), and it is a bill as well as a boon: BREAKING is −12 to hit on a ratkin cutter
who now has to stand in it. **Three texts say it in those words - the story, the sheet and the code
comment. Soften one and you have to soften all three.**

**2. LINT gained a check the spec did not ask for.** An uncast `{TELLER}` does not render a raw
brace, it renders *"the smallest of you"* - so a future card that writes the token and forgets to
set `G.fireTeller` would read as slightly odd writing and never be reported. The check reads
`openEvent`'s own source, because that is the only place a card is allowed to cast itself.

**And one trap re-learned from the wrong side.** `LINT()` reported *"no route from the hold to the
Snare"* on a graph with eight good routes, because the page in the browser was **one edit stale**: a
parallel session was mid-fix on that very check while this one was testing. **When a check disagrees
with the file, reload before you debug.**

## 72 - The combat pass: dodge, the kick combo, the spear wall, the step back ✅ BUILT

> ⚔ **THE BATTLE BOARD**, and nowhere else.
> **SHIPPED 2026-08-01, build log 8f.74.** Pictures: the gate
> [`shots/72_combat_dynamics.html`](../shots/72_combat_dynamics.html), drawn on a real practice
> board before any code, then [`shots/72_combat_built.html`](../shots/72_combat_built.html), the
> same three rules driven through the engine afterwards.
> **SYSTEMS** `dodgeOf()` · `hitBreakdown()` · `forceDest()` · the one forced-movement block in
> `strike()` · `partingShots()` · `selectAct`/`clickHex` · `raceVerb` (both brains) · `STATUS`.
> **RELATED** #46 (the race skills, whose KICK this rewrites) · #47 (the spearwoman rework, which
> now inherits a class with an actual job) · #50 (the balance pass - **nothing here was tuned
> against its numbers, and it should re-read all of them**) · #29 (hard zone of control, still cut).

**The ask, verbatim** *(user, 2026-08-01, one message, while walking)*: combat 10-15% more dynamic ·
lower the dodge chance a little, *"especially when dodge is already high"* · ratling +5% dodge, ogre
-5% · opportunity attacks at half normal damage · *"when you disengage you step one hex out of the
zone of control without damage"* · the kick activates opportunity attacks, *"this gives the human a
fun combo"*, and if somebody stands right behind the enemy you kick, they are pushed left or right
around them · spear wall costs 1 ability, deals 75% in the zone, has a 50% chance to push the
attacker back, *"but if somebody has already come right up to one hex, the zone of control stops
working"*.

**THE ONE JUDGEMENT CALL, RECORDED BECAUSE IT WENT AGAINST THE REASON GIVEN.** The opportunity swing
was **0.75** of a blow, not the "very little" the request assumed, so obeying the number *lowered*
it. It was obeyed anyway - the number was explicit, the user was away, and it is one line to put
back - and the intent behind it is served by the two rules that make the swing *fire* far more
often: the kick now provokes, and DISENGAGE is cheap enough that bodies actually leave a scrum.

**FOUR THINGS WORTH KEEPING FROM THE BUILD.**

**(a) A soft cap is the arithmetic of "especially when it is already high."** A flat trim takes the
same points off everybody, which is the opposite of what was asked. `softDodge` leaves the first 12
alone and prices everything above it at 0.6 - so an ogre at 8 is untouched, a lurcher at 26 loses
five, and the stack cases lose the most. It is applied **last, to the sum**, which is the only place
it can be applied without every contributor to `dodgeOf` needing to know it exists.

**(b) A rule that is a fact about the ground beats a flag a body carries.** `spearwall` was a
boolean she held; `wallLive()` asks the board. That one change is what turns the spearwoman from
somebody who taxes anyone who comes near, alone and forever, into somebody the line has to *keep
clear* - and it did it without a single new number. ⚠ Its `ignore` parameter is the trap: the
trigger asks the question *after* the mover has been put down, so without it anybody who walked all
the way in turned the wall off **by arriving**, and 50 test approaches were caught zero times.

**(c) When a verb's value is a hex, the AI must be able to ask for that hex before it commits.**
`forceDest` gained `slip`, and the tie-break between the two flanking hexes had to stay
*deterministic* for exactly that reason - `raceVerb` calls `forceDest` to score the kick, and a coin
flip inside it would make both brains score a destination the blow then does not use.

**(d) The cheap door was added, the old door was left open.** DISENGAGE still sets `safeMove`, so
"step out, then walk properly" costs the same two actions it always did. Nothing was taken away;
a one-action version was put beside it.

**OPEN.** The enemy AI never braces a wall and never disengages, so both of those rules are
player-side in practice - that is pre-existing, and it is the obvious next thing if the wall is
supposed to be a threat as well as a tool. And the enemy's spear wall does not exist at all: no foe
statblock carries `k:'wall'`.

## 66 - Three camera stops on the battle board ✅ BUILT

> ⚔ **THE BATTLE BOARD** and ⚙ settings (the stop is remembered across launches).
> **SHIPPED 2026-08-01, build log 8f.65.** Pictures: the gate mockup
> [`shots/66_camera_stops.html`](../shots/66_camera_stops.html) and the built board
> [`shots/66_camera_built.html`](../shots/66_camera_built.html).
> **SYSTEMS** `#bField` / `#bGround` layout · the `#bFx` overlay and everything anchored in it
> (`fx`, `hexPt`, the LOS ray, `capBalloon`) · `sprite()`'s oversample · `paintTerrain` · `render()`

> **WHAT CHANGED BETWEEN THE SPEC AND THE BUILD.** Nothing in the design. The four questions the
> spec left open were ruled by the user with *"good, i like it - do it"*, so the recommendations
> stood: **1.30 / 1.80 / 2.50**, hex text **scales with the board** (free, and a legibility win at
> FULL), **FIELD is the default**, and **drag to look around was NOT built** because it was written
> as the cuttable half. The built transforms match the mockup's to the tenth of a pixel, which is
> the strongest argument this project has yet produced for making the picture in the game.

**The user's own words, 2026-08-01:**

> *"And maybe some simple close further on battlefield? so units and action looks a bit bigger. Like
> in battle brothers."*
> *"Maybe 3 states for battlefield: full - smaller units, medium - camera comes a bit closer - and
> close - you see how units can hit each other."*

### The measurement that changed the design

Measured off the running build, practice field, the clash: **the battle field is 980 x 544 and the
board is 596 x 416.** The board is centred in it, so **41% of the field was empty gradient**, with
1.64x of horizontal slack and 1.31x of vertical.

That single fact rewrote the request. The people looked small **not because the camera was far away
but because the board never grew into the space it was given.** Which means:

> ### The lowest stop is x1.30, not x1.00.
> A stop that shows exactly the same 15 x 13 hexes, only smaller, is **a control with no job**. The
> old view was dominated by x1.30 in every respect: same information, nothing cropped, no camera to
> move, everything 30% larger. So it was replaced rather than kept as a fourth option.

### The three stops as built

| | scale | what you see | the camera |
|---|---|---|---|
| **FULL** | **x1.30** | all 15 x 13 hexes, filling the field's height | **none needed.** The whole board fits. |
| **FIELD** | **x1.80** | 14.3 cols x 9.4 rows | follows the acting body, clamped to the board |
| **CLOSE** | **x2.50** | 10.3 cols x 6.8 rows | follows the acting body, clamped to the board |

**FULL is the planning view**, **FIELD is the working view** and is the default, **CLOSE is the
watching view** and is deliberately not a planning view.

### The rules

1. **The camera is presentation and nothing else.** No rule, no hit chance, no reachable hex, no AI
   decision. Switching stop mid-turn cannot change an outcome. *(Invariant 9.)*
2. **It never hides something you need in order to act.** Everything cropped at CLOSE is board you
   can bring back with one click.
3. **Where it points, at FIELD and CLOSE only:** the body whose turn it is, **clamped to the board**
   so the view never shows off-board emptiness, with a 220ms glide. One rule, both sides.
4. **It only moves when the subject leaves the middle 40% of the view**, so the board does not slide
   under the cursor on every step of a walk.
5. **The stop is a setting** (`gt_cam`), remembered across launches like the audio toggle. Not run
   state, not battle state.
6. **The control** is three segmented words at the top-right of the field, current one lit, plus the
   mouse wheel. A state, not a number: no slider, no percentage, no free zoom.

### What made it cheap, and the two things that would break it

The mechanism is **one CSS transform on `#bGround`** plus `#bField{overflow:hidden}`. `fx()` and
`hexPt()` compute positions as `(hexRect - fieldRect) / the #stage scale`, and **`#bFx` stays outside
the transform**, so every effect, floating number, LOS ray and Captain's balloon lands correctly at
any stop with no edit. Verified numerically: the same body's derived board point is **identical to
two decimals at all three stops**.

> ⚠ **Do not move the transform onto `#bField`, and do not move `#bFx` inside `#bGround`.** Either
> one breaks all of that in the same instant, and silently.

**The resolution ceiling was exactly x2.00 and it was not an accident.** Sprites were rendered at
`2*TOKEN` and displayed at `1*TOKEN`, which is precisely where the old board sat. `OVER` is 3 now,
and the ground canvas is painted at 1200x880 and shown at 600x440. ⚠ **`setTransform`, never
`scale()`** in `paintTerrain`, which runs again on every battlefield.

### Deliberately not built

**Drag to look around.** Specced as the cuttable half and left out: the follow rule may be enough,
and a drag is a new way to send somebody to the wrong hex. If CLOSE reads as claustrophobic in a real
playthrough, this is the thing to add, and the rule it needs is that a drag of more than 6px
suppresses the click.

---

## 60 - The first battle teaches itself ✅ BUILT

> ⚔ **THE BATTLE BOARD** and 🚪 the front door.
> **SHIPPED 2026-08-01, build log 8f.62, re-cut in 8f.63.** Picture, shot from the running build:
> [`shots/60_first_battle_onboarding.html`](../shots/60_first_battle_onboarding.html)

> **WHAT CHANGED BETWEEN THE SPEC BELOW AND THE BUILD.** Nothing in the design, and one thing in
> the code that is worth carrying forward. **`CAPTIER[E.tier]||1` silently promoted every lesson
> to TEACH**, because the tutorial tier's value is **0** and `0||1` is 1. The first lesson of a
> round then outranked every other lesson and they all queued behind it, so the tutorial dribbled
> out one line a round instead of two. Found on the first staged fight, in the first minute.
> ⚑ **A new tier whose value is falsy is a trap that any `||` default will spring**, and this file
> uses that idiom in a lot of places.

> **All three open questions were answered by the user with *"looks good"*, so the spec's own
> recommendations shipped as written:** a `learn` tier below everything that queues rather than
> drops · lessons survive the Captain going down, spoken by whoever is up · rings under the feet.

> ### AND THEN THE LINES WERE RE-CUT, WHICH IS THE PART TO READ IF YOU EVER WRITE MORE OF THEM
> Three instructions from the user in the hour after it shipped, and together they settle how this
> register is written from now on:
>
> 1. ***"make it clearer. For example - You are in enemy zone of control. to move you need to
>    disingage, or other wise you will be hit."*** Lesson 9's first version was *"standing next to
>    them is standing in a fight"*, which is flavour: it describes the situation and does not tell
>    anybody what to do. **Naming the mechanic out loud is the right call in a lesson**, because a
>    player who does not know the word cannot look it up.
> 2. ***"you can update also other teachings. For me important - that people understand. And then
>    the regular capitan comands more in a vibe of game."*** So **all ten lessons were rewritten
>    plainer**, and the CALL and HEART lines were deliberately left atmospheric. The register now
>    has **two voices and the tier is which one you are in**, which is written into the code above
>    `CAPLINES` with a test for each: a lesson must still teach with the balloon deleted; a comment
>    must still work as a line of dialogue in a film.
> 3. ***"I prefer tutorial as capitan says, rather than in unit card."*** **The `coach('fight')`
>    card is deleted**, register entry and call site. It was a card with a GOT IT button carrying
>    four rules at the moment the player had least reason to read them, and three of the four are
>    lessons now. The `map` and `inv` cards stay: they teach screens #60 never visits.
>
> ⚑ **And re-cutting lesson 9 forced lesson 8 to be re-cut with it.** Once 9 said *"they get a free
> hit"*, 8's *"he gets a free swing"* was the same rule twice. **9 is the problem, 8 is the
> answer** (DISENGAGE, plus the one-swing-each-a-turn clause that stops it reading as a rule against
> ever moving). *When you sharpen one line in a register, check the line that fires next to it.*


> ⚔ **THE BATTLE BOARD**. Also 🚪 **the front door** (it is onboarding's last beat) and
> ⚙ it amends one rule inside `capSay()` that every future speaker inherits.
> **SYSTEMS** `capSay` / `capBalloon` / `capTick` / `CAPLINES` (#51 built all four) ·
> `whisper()` + `LEGACY.seen` (#14's layer 2, and the once-ever persistence this reuses) ·
> `moveBudget` · `canUse` / `onCool` / `castCap` / `castMul` · `losState` / `shotState` (#36) ·
> `arcOn` · `engaged` / `partingShots` · the nerve ladder and `rungOf` ·
> `SIM.on` (the practice field must not spend the tutorial)
> **RELATED** **#51 built. This is its sixth through fifteenth triggers, and the first thing ever
> to ask for an exception to its budget** · **#39** shares a border and does not block: #39 owns the
> beats **before you can act** (the arrival cards), this owns **while you act** ·
> **#43** (the speaking budget. The amendment below is what that entry will inherit) ·
> **#29** (Zone of Control, parked. ⚠ lesson 9 teaches what the game does TODAY, not that entry) ·
> #14 built (three layers, this is layer 2 with a mouth) · #40 closed (`capBalloon` already takes a
> **speaker**, which is what makes lesson 1 and the mute exception cheap) · #36 built (the archer
> lesson is only worth saying because the lane states already exist) · #46 built (the race verbs are
> **not** taught here, see *what is deliberately left out*)

> **GATE ARTIFACTS: rules below, plus the picture at `shots/60_first_battle_onboarding.html`,**
> three panels built in the game on the real Blood-on-the-Road board. Nothing is coded.

**The request, verbatim** *(user, 2026-08-01)*:

> *"then we need good step by step onboarding for the batle:*
> *- here is you wariors - here is enemy*
> *- to hit enemy with regular fighter you need to move closer. Move forvard*
> *- you have two action per round - second repeated action (run, hit) - ussually less efective
> then first. (explain it, after second move of same unit)*
> *- when selecting archer - explain how it works*
> *- when taking mage - explain how it works*
> *- When in close compbat and some unit has enough movment - explain flanjing and back*
> *- when enemy breaks - explain morale*
> *(you can make it as capitan says this in the first battle. When the triger is right)"*

**Three additions the same day, all theirs:** *"add also explanation about disingage"*, *"Add also
about control zone - for education"*, and *"morale for education - how it works. It could be 2
sentences from a capitan"*. **And one deletion:** *"weBend - delete"*, which was done immediately
and is not part of this entry. See build log 8f.56.

**The shape.** Ten lessons, spoken by the Captain from his own body, each fired **at the moment the
rule first bites**, which is the whisper contract (#14 layer 2) with a mouth on it, and the
machinery for it shipped whole in #51. **No new panel, no modal, no pause.** One new control: a
`skip tutorial` in the corner of the balloon.

> **The one-sentence version: the first fight is the tutorial, and it does not know it is one.**

### The ten triggers, and the actual rule behind each

*The rule is what is **true in the build today**, checked against the code rather than assumed. The
line is what the Captain says, and it carries **no digits**, because "show a state, hide the number"
is not suspended because a person is saying it.*

> ### ⚑ THE VOICE RULE FOR THIS ENTRY, SET BY THE USER 2026-08-01: ***"a bit less epic, more clear he says."***
> Every other line in `CAPLINES` is a **comment**, and may be atmospheric, because its job is that a
> person is watching. **A lesson's job is that the player understands the rule**, so the tutorial
> tier is written flatter than the rest of the register on purpose. Rewrite test: *if you deleted
> the balloon and printed the line as a help entry, would it still teach?* If not, it is atmosphere
> wearing a tutorial's hat.
>
> **Two of them must be role-generic, not cast.** The first drafts of 4 and 5 named *Ilka* and
> *Marrow*, which is wrong the moment the archer is a ratkin recruit or the caster was hired at the
> Muster. `{N}` or nobody. **A tutorial line may never assume the starting roster.**
>
> **And no em dash, anywhere, in any of them.** *(User's hard rule, 2026-08-01: "never use "—"
> anywhere.")* Note that the five shipped `CAPLINES` still contain them, which is a separate job.

**1 · `learn_sides`. Here is us, here is them.**
*Fires:* once, on the **first battle of a run**, after the board is drawn and **before the first
turn begins**.
*Rule:* three rings, not two. **The first fight puts ratkin allies on your side who are not on your
roster**, and the game has never said so out loud. Ours green, allies gold, theirs red, drawn under
the feet, lasting as long as the line and then gone for good.
*Line:* **"Green rings are ours. Red are theirs. Gold are fighting with us today, but they are not
ours to command."**
*(alt: "Ours wear green. Theirs wear red. The gold ones are on our side and take their own
orders.")*
> ⚠ **This is the only new pixel in the whole entry.** Everything else is a balloon over machinery
> that already exists. If the rings are cut, the entry still works, it just opens with words.

**2 · `learn_close`. Walk at them.**
*Fires:* the first time one of yours is the current unit, has an action, and **no enemy is inside
its weapon's reach** (`reach`, so a spear is 2 and a sword is 1. The lesson must not lie to Vesna).
*Rule:* moving is one of your two actions, the lit hexes are how far this body gets, ground is free
and blood is not.
*Line:* **"Nothing is close enough to hit. Move first, then swing with the other action."**
*(alt: "Too far to reach anybody. The lit hexes are as far as this one gets this turn.")*

**3 · `learn_twice`. The second one is always worse.**
*Fires:* the moment **the same unit spends its second action on the same kind of thing**, a second
MOVE or the same act key twice. *(The user's own trigger: "explain it, after second move of same
unit".)*
*Rule, and it is genuinely three rules wearing one idea, all already in the build:*
> · **a second move is one hex shorter.** `moveBudget`: `movesUsed>0` costs 1, and a **cutter loses
>   its +1**, which only ever applied to the first move
> · **the strong things go cold for a round.** `onCool`, so the good idea *cannot* be repeated
> · **nothing may be used more than twice a turn at all.** `canUse`, and **EMBER only once**
*Line:* **"Two actions a turn. The second move is a hex shorter, and the strong things need a round
before you can use them again."**
*(alt: "Doing the same thing twice in one turn is always the weaker half of it. Move, then swing.")*

**4 · `learn_bow`. The archer.**
*Fires:* the first time the player **selects a body carrying a bow**.
*Rule:* range 5 with the hunting bow. The **lane** has to be there and the board already says so in
one word on the hex: BLOCKED · OBSTRUCTED · SCREENED · FAR · LONG · CLEAR (#36). Shooting from
inside a scrum is a wreck (−35, or −18 with a braced spear beside her, −15 with SURE SHOT).
**Point blank (−40) is worse than extreme range (−18).** And CRIPPLING SHOT takes the target's
**legs, not its life**: half damage, half its movement, 10 dodge, until it next acts.
*Line:* **"A bow is worst up close and it needs a clear line. Keep {N} back, with one of ours in
front of them, not three."**
*(alt: "Read the word on the hex before shooting. CLEAR is a good shot and everything else is a
worse one.")*

**5 · `learn_cast`. The caster.**
*Fires:* the first time the player selects a **battle-mage or mage**.
*Rule:* **one working a turn** (`castCap` is 1 for the battle-mage, 2 for the mage with **the second
at half**, `castMul`). **EMBER once a turn**, cheap, mostly ignores armour, and costs **his own
nerve** rather than an arrow (`strain:5`). And **a working is not an arrow**: `needsLane` exempts
arcane, so no lane, no screen, no point-blank penalty. *That last one is the only thing keeping the
battle-mage distinct from the archer, and no screen has ever said it.*
*Line:* **"One spell a turn, and it costs {N} their own nerve rather than an arrow. Bodies and walls
do not block it."**
*(alt: "Only one spell a turn, so spend it on what a sword cannot reach. It needs no clear line to
anybody.")*

**6 · `learn_round`. Flanking, as an offer.**
*Fires:* one of yours is **adjacent to an enemy** and **still has movement enough to reach a hex in
that enemy's rear 180°** *(sectors 2 to 4. ⚠ **not** the single BACK sector. A hex line bends, and
#36 already shipped that bug once.)*
*Rule:* the back arc is drawn in red under every body, standing there is **+30 to hit and a quarter
more damage**, the side is worth less, the front is worth nothing, and **some things have no back at
all**, which the readout says.
*Line:* **"The red arc under him is his back. Stand in it and you hit him harder and more often."**
*(alt: "Walk round behind him. His front is worth nothing to us, his back is worth the walk.")*
> ⚠ **THIS COLLIDES WITH A SHIPPED LINE AND THE COLLISION IS THE INTERESTING PART.**
> `CAPLINES.w_back` already exists and says *"Behind them. That is where a fight gets cheap."* But it
> rides `whisper('back')`, which fires **when a blow has already landed in a back**. That is a
> **receipt**. The user asked for an **offer**, one turn earlier, while the movement is still
> unspent. **They must not both exist**, or the Captain teaches one rule twice, which is exactly the
> nag that got #51 cut from twelve triggers to six. **Recommendation: `learn_round` replaces
> `w_back` as the Captain's line. The whisper toast keeps its precise wording unchanged.**
>
> **This line no longer mentions the parting swing.** It used to, and that made it teach two rules
> at once while lesson 8 taught one of them again. **One rule, one line.**

**7 · `learn_theirnerve`. When they break.**
*Fires:* the **first enemy to rout or flee**, on either side of the field.
*Rule:* nerve is not health. Five rungs, **Broken · Breaking · Ok · Happy · It rocks**. It decides
whether a body **keeps standing there at all**, which is how most fights actually end, and **a
routed body comes back if it survives.**
*Line, two sentences:* **"That one broke and ran, and he is not even wounded. Nerve runs out before
blood does."**
*(alt: "He is finished without being hurt. Frighten enough of them and we do not have to kill any of
them.")*
> ⚠ **This collides with a shipped line too, and more gently.** `theyRun` is a **CALL** and outranks
> a lesson by tier, so on the very first break the CALL would win and the lesson would be lost
> forever. **The first break gives its round to the lesson.** Every break after that belongs to
> `theyRun`.

**8 · `learn_step`. DISENGAGE.** *(added by the user mid-spec: "add also explanation about
disingage")*
*Fires:* the first time one of yours is **engaged**, meaning an enemy is inside its reach, **and the
player selects MOVE.** That is the exact moment the choice exists and the exact moment before it is
paid for. A line after the swing has landed is a receipt, and `whisper('parting')` is already that.
*Rule:* walking out of somebody's reach lets them **swing at you for free**. **DISENGAGE costs an
action and prevents it.** And the part that stops this being a rule against ever moving:
**each enemy only gets one parting swing a turn**, so walking through a line is expensive rather
than suicidal.
*Line:* **"DISENGAGE is how you get out of it. It costs an action, and they only get one free swing
each a turn."**
*(alt: "Break off with DISENGAGE and nobody swings at you. Just walking is quicker and it costs
blood.")*
> **Re-cut when lesson 9 was rewritten.** It used to lead with *"he gets a free swing"*, which is
> what lesson 9 now says one tick earlier, so the two were teaching one rule twice. **9 is the
> problem, 8 is the answer**, and the one-swing-each-a-turn clause moved into the line because it is
> what stops this reading as a rule against ever moving.

**9 · `learn_zone`. The zone of control.** *(added by the user: "Add also about control zone - for
education")*
*Fires:* the first time one of yours **becomes engaged**, whoever closed the distance. That is one
tick after lesson 2 in almost every first battle, which is the right order: *go to them*, then
*this is what being there means.*
> ### ⚠ TEACH WHAT THE GAME DOES TODAY, NOT WHAT #29 WOULD DO
> **RabbleBound has no Zone of Control rule.** #29 is parked, and its entry says why: it was cut once
> for making movement unaffordable. What the game has instead is **engagement plus parting swings**,
> which is a soft zone: standing next to an enemy does not forbid anything, it puts a **price** on
> leaving. **The lesson must describe the price, never a prohibition**, or a player will believe
> they are pinned and stop moving, which is precisely the failure that got the hard rule cut. If
> #29 is ever built, this line is one of the things it has to rewrite.
*Rule:* adjacency is what "in a fight" means. It is what makes a parting swing possible (lesson 8),
what the flanking arcs are measured from (lesson 6), what wrecks a bow (lesson 4), and what
**being surrounded** is counted from for nerve (lesson 10).
*Line:* **"You are in their zone of control now. Move out of it and they get a free hit at you."**
*(alt: "That is their reach you are standing in. Walk out of it and they swing at you for nothing.")*
> **Rewritten after the first build, by the user: *"make it clearer. For example - You are in enemy
> zone of control. to move you need to disingage, or other wise you will be hit."*** The first
> version said *"standing next to them is standing in a fight"*, which is flavour and does not tell
> anybody what to do. **It names the term on purpose:** "zone of control" is a wargamer's phrase and
> that is exactly why it works, because it is the phrase the player has probably already met.
> ⚠ **One deliberate difference from the user's own sentence:** you do NOT need DISENGAGE in order
> to move, you need it in order to move **without being hit**, and their second clause says as much.

**10 · `learn_ournerve`. Morale, from your own side.** *(added by the user: "morale for education -
how it works. It could be 2 sentences from a capitan")*
*Fires:* the first time **one of yours drops a rung**. It rides the existing `whisper('rung')`,
which has fired since #14 and **has never had a voice**, exactly the way lesson 6 rides
`whisper('back')`.
*Rule, and this is the half the game has never taught:* what **moves** the ladder is being hit,
watching somebody drop, being surrounded, and **standing on your own, which is the worst of them**.
What **restores** it is a quiet turn, shoulder to shoulder, and the Captain nearby. That is why a
shove or a hook that drags somebody out of the line is an attack on their nerve rather than their
body, and it is the single most useful thing a new player can know about this game.
*Line, two sentences:* **"{N} is losing their nerve, and standing alone is what does it fastest. Put
somebody beside them and it comes back."**
*(alt: "Nerve is not health. {N} can walk off this field untouched and still be no use to us, so
keep them shoulder to shoulder.")*
> **This is what `weBend` should have been.** The deleted CALL narrated the same subject every fight
> and told you nothing. This says it **once, ever**, and says what to do about it.

### ⏭ THE SKIP, in the corner of the balloon

*User, 2026-08-01: **"for this tutorial you can add on the ottom left conner of his mesege 'skip
tutorial'"***

**A small `skip tutorial` bottom-left of the balloon, on `learn` lines only.** Nothing else in the
register grows one. A CALL is a comment and there is nothing to skip.

- **What it does:** marks **every remaining `learn_*` id as seen** in `LEGACY.seen`, clears the
  queue and drops the current balloon. **Permanent and per save**, not per battle. Somebody who
  skips has said *I know this game*, and asking again next fight is the nag.
- **What it does NOT do, which is what makes it safe to press:** the **whisper toasts keep firing.**
  They are the layer with the precise numbers in them, they were never the tutorial, and `? RULES`
  stays where it is. Skipping silences a *voice*, not the *rules*.
- **It is the first clickable thing the Captain has ever had**, and that is the implementation trap:
  ⚠ **`#bFx` is `pointer-events:none`** so a balloon can never eat a click meant for a hex. The skip
  needs `pointer-events:auto` **on itself and nothing else**, or this feature breaks the board it is
  teaching.
- **Styling:** `--mono`, about 8px, letter-spaced, the muted ink already used by `.ccall .who`, no
  border, underline on hover. It must read as an exit and not a button. **Nothing on this balloon
  may look like the thing the lesson is telling you to press.**
- **Reachability:** on screen for the balloon's dwell and no longer. At 4.5s (below) that is enough
  for a deliberate click and short enough that nobody hits it by accident. **A skip that paused the
  fight to be pressed would be worse than no skip.**

### The three rules this entry needs changed, and they are the whole design question

**(a) THE BUDGET.** `capSay()` allows **one line a round and five a battle**, deliberately. Ten
lessons do not fit, and the fight has its own CALLs and HEARTs to make. **Proposal: a fourth tier,
`learn`, ranked BELOW `teach`**, so it may never take a round off a CALL or a HEART, with **its own
counter of at most two a round and no battle cap**. Every lesson is once ever, so the second fight
inherits only leftovers and the third is silent.

**(b) A LESSON QUEUES. A COMMENT DROPS.** #51's drop rule exists for a stated reason: *"a comment
about a moment that has passed is worse than silence."* **That reason does not cover a rule.** A
CALL is about a moment and expires with it. **A lesson is about how the game works and is still true
next round.** So `learn` is the one tier that **queues** when it loses a round, and everything else
keeps dropping. *This is the amendment #43 will inherit, so it is worth getting right once.*

**(c) THE MUTE EXCEPTION.** When the Captain is down the voice stops for the fight, the best free
thing in #51, and it would silently **delete the tutorial** if he goes down in fight one.
**Proposal: `learn` lines survive the mute and are spoken by the current unit instead.**
`capBalloon` already takes a *speaker*, so it costs one argument, and it is defensible in fiction: a
rule is not the Captain's opinion. **This is the one place I would break #51's silence, and it is
the user's call.**

**And one knob:** a balloon lives **2.2 seconds** and cannot be dismissed. Right for a comment,
short for a lesson. **Proposal: `learn` dwells 4.5s**, still with no input pause, and every line is
already mirrored into the fight log by `capLog`, so it can be re-read.

### What is deliberately left out

**The race verbs (#46), the throw, poison, the kick, SPEAR WALL, provisions, the loot screen.** Every
one already has a `whisper()` that fires at the right moment, and **ten balloons in one fight is by
some distance the most this game has ever talked.** The skip in the corner exists precisely because
that is a lot. If the first fight needs more, it is the user's to add: the register has a HOW TO ADD
ONE block above it and a new lesson is one row. *This entry is the smallest thing that answers the
request.*

### The test

Not *"did the lines fire"*. The harness can answer that and it proves nothing. **Watch somebody who
has never played reach round the back of an ogre on purpose, and then say why.** If they can explain
the second-action rule afterwards without being asked, lesson 3 worked. If they cannot, it was
narration. *(The same test as #42's, and it is the right one.)*

### Traps this one will hit

- **`SIM.on`.** The practice field must not spend a lesson on a fight that never happened.
  `whisper()` already has this guard and it was a real bug once. Every `LEGACY.seen` write here
  inherits it, or the tutorial is gone before the campaign starts.
- **`capTick` is the only place triggers are read**, once a turn, outside every scorer. Lessons 2,
  4, 5, 6 and 8 are about the *selected* unit rather than the turn, so they need a second hook at
  selection. **It must not go inside `hitBreakdown` or a movement scorer.** `losState` there took a
  five-round clash to 23 seconds.
- **A one-shot flag is set from the return value of the thing that fires**, never before it. Written
  into #51's own comments after DESPERATE silently disappeared for a whole fight.
- **`a.range` is not "is a shooter".** Lesson 4 must test `a.dmg` too, or KICK and HURL A RATKIN make
  everybody an archer.
- **Lesson 9 must not describe a rule the game does not have.** See the box under it.



## 68 - The outpost gate is defended, and you may walk through your own ✅ BUILT

> ⚔ **THE BATTLE BOARD** - the outpost layout, enemy deployment, the enemy AI, and pathfinding
> **SHIPPED 2026-08-01, build log 8f.67.** Picture:
> [`shots/68_outpost_gate.html`](../shots/68_outpost_gate.html)
> **SYSTEMS** new `OUTPOST` register + `formUpAtGate()` + `outpostTurned()` · `makeObstacles`'
> outpost layout · `startBattle` deployment · `B.outpost` battle state · one hold branch in
> `aiTurn` · new `passable()` beside `walkable()` · `reachMap`
> **RELATED** #65 built the outpost and left it a garrison rather than a defence · #33's
> single-mandatory-corridor rule is what forced the second gate hex · #46 is why the rotten run
> stays `rock` · #50 is where any balance reading from this goes

> ### THE REQUEST, IN FULL
> ***"outpost have 2 open tiles on the entry. And enemies build the line before the entry of
> outpost (you can script it for ai logic) - to defend it better. And changes position only if
> player enter the camp from one of the sides"*** and ***"Update movment logic. You can pass
> through your allies and team mates, but cant through enemies"*** - user, 2026-08-01.

### 1 - THE ENTRY IS TWO HEXES, AND THAT IS A RULE RATHER THAN A TWEAK

A one-hex door and a two-hex door are different fights. Through one hex you arrive alone, every
time, forever, which is #33's queue with a gate painted on it. Through two you may arrive
**together**, which is the first move that makes the door worth arguing over. It is also what makes
the line below mean anything, because a line drawn across a one-hex hole is just a man standing in
a doorway. The column cut at the wall went from **2 to 3** and `terrainCheck()` stays ok.

### 2 - THE FRONT RANK IS NOT A ROW, AND THAT IS THE ENTRY'S ONE REAL LESSON

⚑ The first cut was a straight rank at column 11, which **looks** like a line and seals nothing.
The wall only bulges out to column 10 on every third row, so **column 10 is an open corridor
running the whole height of the fort behind it**. The very first test walked a ratkin in the door,
turned it north up that corridor and put a knife in the enemy mage six hexes away, **past four men
who were all still facing the gate**. THE HOLE WAS INVISIBLE ON THE PICTURE AND OBVIOUS IN THE
PATH, and the general form of that is worth keeping: *a formation drawn by eye on a hex grid is a
guess; take it off `nbrs()`.*

So the front rank is the **frontier**: every hex reachable in one step from the three doorway
hexes, which on this wall is exactly four. Occupy those and the door is shut by bodies. It is still
not the queue #33 forbids, because the doorway is three hexes wide and three of yours can be
swinging at once, which is a fight at a gate and is the whole point of putting a gate there.
Everything after the fourth post is the second rank, and **a front post left empty by a death is
handed to the nearest body still standing further back** - shooters never, because a slinger
dragged into the front rank is two mistakes rather than one.

### 3 - WHERE THE HOLD SITS IN `aiTurn` IS THE DESIGN

It goes **below every attack decision**, so holding can never mean "standing there with a swing
available" - anything a defender can reach, it has already hit. That is the same rule the shipped
`disp.hold` stance had to learn. Holding means only *I do not walk out to find you*.

It goes **above the kiting and the wounded pull-back**, because a line whose hurt men trickle
backwards out of it is not a line, and the gate is the only thing these four are worth anything at.

### 4 - IT IS TURNED BY GOING ROUND, AND IT NEVER RE-FORMS

The whole entry is one trade. Hitting the gate head-on means fighting a formed line at the one
place they are strongest; the breach at the top or an ogre pulling down the rotten run at the
bottom costs a long walk and several rounds, and what it buys is that the line **stops being a
line**. A decision with a price on both sides of it.

⚠ The release is **one-way**, and the posts are cleared rather than merely ignored, so no later
reader can mistake a stale post for a live one. Soldiers who have broken formation to chase
somebody through their own camp do not tidily fall back in.

The flank test is measured as **rows**, and the rows are derived from the side entries rather than
written down, so moving the breach moves the test with it. A body that walked in the front door and
then fought its way north is deliberately **not** this: the door rows are wide enough to hold a
fight, and calling that "over the wall" would put the wrong sentence in the log at the one moment
the player is actually reading it.

**A second release the user's sentence did not name, because it is that sentence's own
consequence:** a line that has been **bled with nobody coming** breaks and comes out. Without it a
company with two bows beats this fort by standing outside it and the gate never gets used at all.
⚑ The threshold is **three hexes and not one**, and the first gate picture is what settled that: at
one hex the rule fired in round three of a head-on assault, because the company was standing in the
doorway about to swing and had not touched anybody yet. *Nobody is coming* has to mean nobody is
coming.

### 5 - YOU MAY PATH THROUGH YOUR OWN AND NEVER THROUGH THEIRS

⚑ **Two different questions were being answered by one function, and that is the whole of the bug.**
`walkable` means "I can END here"; a pathfinder needs "I can CROSS here", and once a friend is
standing in the way those are not the same word. A four-man line used to seal its own flank: the
man behind it had to walk the long way round his own shield.

`passable(c,r,u)` is the crossing test and `walkable` stays the standing one. The two are kept
honest in one place: **`reachMap` paths with the first, then deletes every occupied hex from its
`dist`**, so `dist` still means exactly what it has always meant - the hexes I may end this move on
- and **not one of its eight consumers had to be told anything changed**. `prev` keeps the
crossing, so `pathTo()` still walks the real route.

⚠ **A great beast is exempt and it is not a special case, it is two hexes.** A tailed body walks
its path hop by hop and drags the tail into the hex the head just left, so a path crossing a friend
would park the tail inside them. A thing that size does not squeeze past anybody anyway.

**Measured rather than asserted**, over every body on four boards at the opening of a fight, new
rule against a strict re-implementation of the old one: clash **+7%** reachable hexes, pack **+8%**,
snare **+17%**, armour **+17%**, and 44 of 51 bodies gained something. Meaningful, and not a
rewrite of movement.

### VERIFIED BY DRIVING IT

All eight fights through `regress()` twice (4 to 20 rounds, nothing thrown, no guard hits), `LINT()`
**0 findings**, 0 console errors. The outpost run head-to-head across five companies and four
fights: the line holds to the last round in most of them, breaks by flank or by bleeding in the
rest, **every fight resolves and none stalls**. `terrainCheck()` ok on the outpost with choke 3.
A head-on assault verified to leave 5 of 9 defenders standing on their exact starting hex after
three rounds; two bodies placed through the breach verified to clear every post inside one round
and log the right sentence.

**Open, and parked for #50 rather than tuned now:** a shooting company (`bows`) ran the outpost to
29 rounds and withdrew. Nothing stalled and the withdrawal is a real outcome, but a fort that
out-waits archers for 29 rounds is a balance reading, and balance readings go in #50's parking lot.

⚠ **#67 was taken in code by a parallel session while all three docs still said "next free #67"** -
the third such collision on this project. This entry is **#68**. Grep the code AND all three doc
headers before numbering.


## 58 — The fork card: the travel window only opens at a crossroads ✅ BUILT

> 🗺 **THE ROAD / MAP** — the travel confirmation and the node click
> **SHIPPED 2026-08-01, build log 8f.57.** Picture:
> [`shots/58_fork_card.html`](../shots/58_fork_card.html)
> **SYSTEMS** `confirmTravel` (split into `forkCard` + `legCard`) · new `branchOf` ·
> `dealEvents`' hint pass · `LINT()` map rules · `.dang` / `.rd` in the stylesheet
> **RELATED** #20 shipped — its horizon sentence became a colour on the figure · #6 the map
> rebuild, which the new LINT rule protects this against · #50, where any balance reading goes

> ### THE REQUEST, IN FULL
> ***"show this window choice only on crossroads with estime how long it take days/money. And how
> dangerous is each road. You can calculate it automatically."*** — user, 2026-08-01, with an
> annotated screenshot of the old single-road travel card on the world map.
>
> It extends their own ruling of 2026-07-31 — *"this thing shows only on crossroads — otherwise it
> doesn't make sense if the player can only move forward"* — which at the time was applied to the
> road **description** only. This applies it to the whole card.

**THE RULES AS BUILT**

1. **One road out → no card.** The click walks. The price is not lost: the map's road label reads
   `1d · 8c` on the live road, under the cursor.
2. **Two or more → one card listing every road**, headed `TWO/THREE ROADS FROM HERE`, anchored on
   the **centroid of the destinations** rather than on where you stand (anchoring on `G.at` pinned
   it to the left edge at crossroad A with all three destinations underneath it).
3. **Each row carries two different numbers.** On the button, **the leg** — what this click buys,
   with the crowns coloured by `fundedCol` of the purse after it. Under it, **the branch** — days
   to the join, and the join's name.
4. **Danger is a state, never a number:** `NOTHING HEARD` · `TROUBLE` · `BLOOD`, from the count of
   `t:'battle'` nodes on the branch, join excluded.
5. **Places to stop** — `town`/`shop`/`camp`/`hire` on the branch, join excluded. An event node is
   not a place to stop.
6. **Fallbacks:** `branchOf` returns null for a corridor *and* for a fork whose roads never rejoin;
   the second case falls back to the old single-road card, and `LINT()` warns about it.

**WHY THE BRANCH AND NOT THE LEG.** The card used to price the first leg — 3 · 2 · 2 days at
crossroad A — which is not the decision being made. The decision is 7 · 5 · 7 days to The Ruined
Steading with a fight on the middle one, and the old card actively made the long roads look cheap.

**WHY THE DANGER READING CANNOT LEAK.** It counts battle-type nodes, which are the ✕ glyphs already
drawn on the map, so it aggregates what is on screen and reveals nothing new. That is deliberate and
it is why the card says *what the road has heard*: the reading is **hearsay, not a promise**, and
the armour ambush (a rule about arrivals, and meant to be a surprise) is allowed to break it.

**WHY `nowhere to stop` IS LOAD-BEARING.** The pass out of The Dead Company reads NOTHING HEARD and
that is true — nothing stands between you and the bells. Its price is that you arrive having stopped
nowhere: no shrine, no last muster, nobody replaced before the Snare. **A cheap option that reads as
a free one is the pillar's own trap**, and without the stops clause the danger chip would have
mis-sold the most dangerous road in the act.

**OPEN.** `BLOOD` is unreachable on today's map — no branch carries two fights — and is kept for the
map rebuild rather than tuned away. A count of *things on the road* (event glyphs) was specified and
**not built**: it would separate the two long roads at crossroad A, which currently read identically
apart from their character line.

## 54 — Reactions update and re-save continuously on every screen ✅ BUILT

> 🚪 **EVERY SCREEN** (the bar is on all twelve) — also ⚙ the journal itself
> **SHIPPED 2026-08-01, build log 8f.54.** Picture:
> [`shots/54_55_reactions_and_reward.html`](../shots/54_55_reactions_and_reward.html)
> **SYSTEMS** `JOURNAL.put`/`react`/`syncReact`/`where()` · `JOURNAL.CAP`/`trim` · `mark()` ·
> `drawNotes()` · the export blob's shape
> **RELATED** #53 shipped — this was its v2 · #50 (a ▼ on a fight is a balance observation)

> ### ✅ RULED BY THE USER, 2026-08-01 — the day after v1 shipped
> ***"That like and dislikes updates and saves automatically for every screen (it isn't one time
> action)."***
> **And reported again the next day, which is what set this session's order:** *"You can start with
> how analytics (like) show. It saves good, just need to refresh counter each screen."*

**The report was the more useful half of the ruling, and it named a real defect the entry had not.**
The bar was refreshed by `show()` on a screen change and by nothing else — but `mark()`, which is
what every event card, camp incident, village, muster and travel card goes through, never touched
it. A card opening on top of the map is *exactly* the moment what-you-are-reacting-to changes, and
the bar kept showing the verdict left on the map underneath. **It saved correctly the whole time**,
which is why the user's diagnosis was right to the line: it was a display that never re-read itself.

**What shipped, in five parts.**

1. **`mark()` refreshes the bar.** One line, at the one place `JOURNAL.card` is ever set.
2. **Every press records.** A ▲ on the map at day 3 and a ▼ on the map at day 14 are two rows and
   both survive. v1 replaced or deleted, which threw the earlier moment away.
3. **The mis-click case survives as a grace window, not as a rule about the run.** Inside 8 seconds
   of your own last press on this same screen, the same button takes it back and a different button
   corrects it. After that, the same button again means *still true*, and it is a second row.
   ⚑ **Measured on the wall clock, never from the row's `ms`** — `ms` is 0 for every row filed
   before a run starts, so a row-based window would treat every menu press as a correction.
4. **The counter.** `×N` beside the buttons, tinted to the latest verdict, drawn only when this
   screen carries something. It is the visible proof that the bar re-reads itself.
5. **One row per screen in the report, not one per press** — with the sequence printed
   (`▲ d3 · ▼ d14 · ▲ d19`) and **a changed mind called out in words**. The tallies still count
   presses; *"eleven dislikes"* and *"dislikes on four screens"* are different facts.

**The cap, decided deliberately as the entry asked.** 600 → **1500**, and the rule is written down:
**not reactions-first and not decisions-first** — plain oldest-first, *skipping `run-start` and
`run-end`*, because dropping a run's frame does not lose a row, it makes every surviving row of that
run unreadable. Blob bumped to **v2**; the row shape is unchanged so a friend's v1 blob still reads,
and the reader has never looked at `v`.

**⚠ The invariant is unchanged and is still the whole contract: it observes and never acts.**

---

## 55 — The reward after a battle is automatic ✅ BUILT

> 📜 **AFTER THE BATTLE** — also 🎒 the stash receives it · 🚪 the loop the player feels most
> **SHIPPED 2026-08-01, build log 8f.54.** Picture:
> [`shots/54_55_reactions_and_reward.html`](../shots/54_55_reactions_and_reward.html)
> **SYSTEMS** `LOOT[kind]` · `lootIsChoice`/`takeLoot` (new) · `consequences()` · the `st.field` gate
> **RELATED** #19 (its *first pick of the loot* promise has no picker to point at any more) ·
> #34 (the death beat lands on this same screen) · #50 (the haul's worth is banked there)

> ### ✅ RULED BY THE USER, 2026-08-01, from the playthrough
> ***"Reward after battle automatical (you don't need to choose. You chose only lvl and sometimes
> what to do with prisoners)."***

**The haul arrives and the screen reports it.** One row, drawn and applied *before* the card draws,
printed by name — the removal is of the question, not of the receipt. Random from the pool **is**
"roughly what an average pick was worth" by construction, so nothing was tuned; if it reads generous
or mean, that number belongs to **#50**.

### The line the entry did not draw, and the reason it matters

A `LOOT` row was two different things wearing one shape.

- A **haul** — iron, coin, a hide, a spear. Arithmetic. There is nearly always a right answer, it
  depends on the stash rather than on the story, and the player learns to click it without reading.
  That is precisely what the ruling removes.
- A **decision** — *bury what is left of them · burn the lot and stand upwind · drag her clear and
  leave her be · cut out whatever the light under her skin was coming from.* These cost a day or
  cost you the company's regard and pay nothing you can spend. **They are the pillar in miniature**,
  and automating one would be the game making a moral choice on the player's behalf — the one thing
  AUTO is forbidden from doing everywhere else in this build.

So the haul is drawn from the hauls only, and what is left becomes **one question — "AND WHAT IS
LEFT OF THEM"** — which is the ***sometimes*** in the user's own sentence, sitting in the same
category as the prisoners. **Four of the eight fights have one; four ask nothing at all.**

**The test is the `fx` block and not a new field**: a row carrying `morale` or `days` is a decision.
It reads off content that is already written, so it cannot drift out of step with it.

### The dead receipt this uncovered

The old picker applied `payFx` plus salvage/iron/wood **and nothing else**. So `gems`, `morale` and
`days` on a loot row had never done anything since the tables were written — the steading's *"+90
crowns +1 gem"* paid ninety crowns and no gem; clash's *"−1 day · they think better of you"* cost
nothing and bought nothing. **Six rows were printing a price the game did not charge.** There is one
applier now, `takeLoot()`, used by the automatic haul and the question alike.

### The softlock, designed out rather than tested out

*"Back to the road"* used to wait on **loot and promotion**; the named risk was that it would wait
forever on a picker that no longer exists. `st.field` starts **true** on a fight with no question,
and every question that does exist carries an appended **"Leave it. The road is waiting."** — so
both halves of the gate are always answerable. `LINT` now also requires every LOOT table to hold at
least one row that is spoils rather than a decision, so the haul's fallback can never quietly take a
moral choice.

**⚠ #19 inherits a debt.** Desperation contracts promise a recruit *first pick of the loot*. There is
no pick to be first at. Re-expressed on that entry as **a share of the haul** — see the backlog.

---

## 38 — One tie, built from something that happened ✅ BUILT

> 🎒 **THE COMPANY** (both sheets, in different words) — also 📜 the rescue that causes it is
> detected there · ⚔ one battle rule · 🗺 one camp card
> **SHIPPED 2026-07-31, build log 8f.50.** Picture: [`shots/38_one_tie.html`](../shots/38_one_tie.html)

**The entry asked for exactly one relationship, and one is what shipped.** *"You carried me out"* —
created by an actual rescue, shown on both sheets **in different words**, changing one camp line and
granting one battle behaviour. The vocabulary the entry banked for later ties (**Owes · Keeps close ·
Trusts with fear · Looks after · Shares a secret · Misses**) is untouched and unbuilt; `LOOKS AFTER`
and `OWES` are the **two faces of one tie**, not two ties.

**What a tie is.** A bond may now carry a `t`, and a bond with a `t` is a tie. The type buys three
things a bare shared line cannot:

1. **Direction.** `a` went back, `b` was carried. That is what lets the two sheets say different
   sentences about one fact.
2. **A gate the camp deck can read.** `castTie` — see below.
3. **Something the battle can read.** `tiedIds(i,j)` takes ids, because the battle asks this about
   *units* and a unit is not a roster entry.

`t` is **optional on purpose**. Every bond written before this keeps working, every later one that is
only a shared memory stays untyped, and `TIES` is the only place in the file that knows what a type
means. The register is four strings and four sentence-builders; adding the second tie is adding one
key to it.

**The cause was already built.** `afterBattle` has always found the least-hurt person still standing
and written a `bond()` for who they went back for. The only change at that site is the fourth
argument.

**On the sheet.** Between the personality and WHAT HAPPENED TO THEM, because *a tie is who somebody
is with, and that belongs beside who they are.* The album takes the **untyped** bonds only — left in,
the shared third-person line would say the same thing again nine lines lower, in the one voice the
tie was written to replace. **A tie outlives the pair:** it carries its own copy of both names and
the place, so a dismissal or a walkout cannot make the surviving sheet print a raw id. The words go
to past tense; the name stays.

**One camp line — TWO SHADOWS, gated by `castTie`.** The same machinery #44 built for `castRace`, one
turn further in: `castRace` asks *are there two ratkin at this fire*, `castTie` asks *are these two
particular people here, and does one of them owe the other*. Not `castKeep`'s rule (at least one of
them) — **a card about two people who will not be separated cannot be played by one of them.**

It is deliberately **not a warm card.** A tie that only ever pays is an affinity bar with better
writing. The cost is the pillar exactly: two people who will not be separated are one person's worth
of frontage, and the middle option lets you buy that frontage back by **ending the tie, out loud, in
front of the two people it is about.** That is the only thing in the game that can end one, and the
memory that it happened stays in the album afterwards where it can no longer hold anybody on a field.

**One battle rule — and the entry's own version of it was void.** #38 asked for *"one safe AUTO
behaviour — do not leave that person downed while withdrawal is still possible."* Withdrawing has
since learned to carry the downed out, so there is nothing left behind to go back for. The reason
survives, moved out of the movement scorer and into **morale**:

> **When your tie goes down where you can see it, you take the grief doubled — and then you will not
> rout for the rest of the battle.**

A boon and a bill in one fact: a body that holds the line, and a body that will very likely be
carried off it as well. Three reasons this is the right shape and not a compromise:

- **`noRout` is read at one place by everything**, so both AI brains *and* AUTO inherit it without
  being taught. The project has been bitten twice by a behaviour that went into `aiTurn` and not
  `autoStep`.
- **It cannot oscillate.** It only ever stops a body crossing the rout line *downward*, and a unit
  that will not rout can still be put down — so if it changes fight length at all, it shortens it.
- **The doubling multiplies the grief they were already going to take**, so somebody with `noGrief`
  still takes none. The tie holds them anyway; it does not manufacture a feeling.

**What it does NOT do** — the entry's explicit bans, kept: no affinity bar, no number anywhere on
either sheet, and **nothing but a real rescue can write a tie.** No proximity, no travel tick, no
gift, no invisible roll.

**Open remainders:** the second tie type (the vocabulary is banked above, and **Misses** — which
persists after death or departure — is the one that would exercise the outlives-the-pair path
hardest). The entry's own scoping rule still applies: *expand only if players remember the pair two
battles later.* And #24's provenance ledger will want to own this eventually — a tie is a fact, and
it is currently its own small store.

## 1 — Forced movement: push and pull ✅ BUILT

> **Done.** `push`/`pull` resolve in `strike()` beside `bounce`/`drag`: no parting swings, `big`
> immune, and a shove that runs into a wall deals the unspent distance as damage. The **halberd**
> shipped with it and introduced the game's first **weapon-defined signature** — boar spear →
> SPEAR WALL, halberd → BRACE AND SHOVE (push 2). The shove names what it achieved (into water,
> into a fire's reach, *"and away from anybody of theirs"*), so the existing *alone* morale rule
> does the real damage.
>
> **Still open from this entry:** an enemy with a **pull** so the player meets the idea from the
> other side (the Fen-Mother's DRAG UNDER is one, but a ratkin **hook-pole** in the Snare would
> teach it earlier), and pushes as a reason to care about board edges.

<details><summary>Original spec (kept for the unbuilt parts)</summary>

**The idea (user).** Skills that move somebody else on the board. A **halberd** as the spearwoman's
alternative to the boar spear: same two-handed reach 2, but its signature *shoves*.

**Why it earns a place.** RabbleBound's hex layer already rewards position — arcs, engagement, parting
swings, formations, the camp's fire, the marsh. Every one of those is currently something you
arrange *for yourself*. Forced movement lets you arrange it **for them**, and it is the cleanest
possible synergy engine because it multiplies systems that already exist rather than adding a new
one:

- **Push into terrain** — into marsh (movement 2, −10 to hit), into the camp fire's adjacency
  (−8 morale a turn), off a rock ledge into the open.
- **Pull somebody out of their line** — and the *alone* morale rule (−9 for having nobody of
  yours within two hexes while somebody is on you) does the rest. This is the good one: it makes
  a pull a *morale attack* without a single new number.
- **Push to break an arc** — shove a unit past you and its back is to your line.
- **Push out of a spear wall / off the gap** in the camp fight.
- **Pull them off the archer.**

**How it should work.**
- `push:N` / `pull:N` on an act, resolved in `strike()` alongside the existing `bounce` and `drag`
  (both already move units after damage — copy that shape).
- The target slides along the attacker→target axis. If the destination is blocked (`BLOCKED`,
  occupied, off-board) it stops and **takes the difference as damage** — a shove into a boulder
  should be worth doing on purpose.
- Forced movement provokes **no parting swings** (it is not their choice), same as `bounce`.
- Great beasts (`big`) are immune, as they are to DISTRACT.

**Content to add.**
- `halberd` in `GEAR` — `slot:'main'`, `hands:2`, reach 2, damage a little under the boar spear.
- A spearwoman signature branch: with a halberd her signature becomes **BRACE AND SHOVE**
  (1 action, half damage, push 1) instead of SPEAR WALL. Weapon-defined signatures are a pattern
  the game does not use yet and should.
- One enemy with a pull so the player meets the idea from the other side — the Fen-Mother's DRAG
  UNDER is already a pull; give a ratkin a **hook-pole** in the Snare.

**Touch:** `GEAR`, `unitFrom` (the `sig` block), `strike` (after the damage/`bounce` section),
`clickHex` if the push needs targeting UI (it should not — it resolves off the attack).

**Verify:** push into marsh changes the victim's `moveBudget`; push into a wall deals the extra
damage; a pulled unit that ends up isolated takes the *alone* penalty on its next turn; no parting
swings fire; `big` units do not move. Then the seven-fight regression.

</details>

---

## 5 — Unpaid wages break the company ✅ BUILT

> **Done in 8f.31.** `p.unpaid` accrues per person, costs nerve on the battlefield (capped, and
> announced in the log), personalities disagree via `unpaidMod`, and after five broke days somebody
> walks — never the Captain, never below three bodies.

**The idea (user).** *"If there is no money — morale drops for the units."*

**Why it earns a place.** This is the missing tooth in the economy. Wages already fall due every
day and already drain the chest, but running out currently costs a flat −4 company mood in
`passDays` and nothing else — so the wage bill is an inconvenience, not a threat. It should be the
thing that makes the pedlar start looking like a target, which is exactly what the pillar says the
money is *for*.

**How it should work.**
- **A missed payday is per-person, not company-wide.** Company mood is a temperature; unpaid
  wages are a grievance somebody holds. Track `p.unpaid` — days since they were last paid in full.
- **It compounds.** One missed day is grumbling; four is a company that has noticed you keep
  promising. Something like −4 starting nerve per unpaid day, capped.
- **It lands in the fight** through the same door hunger uses (`startBattle`'s provisions block) —
  one clear log line naming the number, because the player must be able to connect the empty chest
  to the bad round.
- **The personalities should disagree about it.** *Light-fingered* barely minds — they were always
  going to take a cut anyway. *Kind* minds on somebody else's behalf. *Ambition* minds most: they
  came here to get on, and not getting paid is the opposite of getting on. Use `tr(u,'unpaidMod')`
  so it reads through the race variants for free.
- **Give it a road consequence, not just a battle one.** After N unpaid days somebody should
  *leave* — walk off at a camp, with a line, and go onto `G.dismissed` so the returner/turncoat
  machinery already built can pick them up later. That is the real cost: not a debuff, a person.
- **And an out that costs something.** A camp choice: *"Open the strongbox and split what is
  left"* (clears the grievance, empties the chest), or *"Promise them the next contract"* (clears
  it now, doubles it if you miss again).

**Touch:** `passDays` (accrue `p.unpaid`), `unitFrom`/`startBattle` (starting nerve), a `CAMPS`
entry gated on unpaid days, `dismiss()` for the walk-off, `TRAITS` for `unpaidMod`.

**Verify:** wages missed for three days measurably lowers starting nerve; the log names it; a
personality with `unpaidMod` differs from one without; somebody eventually leaves and can return
via the existing arc; paying up clears it. Seven-fight regression afterwards (the starting-nerve
change touches every battle).

---

## 6 — The map rebuilt ✅ BUILT

> **Built, and then rebuilt once more on the user's note** — which was the note that mattered:
> *"we are going right, and then we are going left. We need some justification for it."* A route
> that doubles back for no reason is a diagram, not a road.
>
> **So the country was designed before the roads.** Two pieces of land the graph has to obey:
> **THE FEN** in the south-west (water, the causeway, the Black Fen at its head) and **THE
> HUNCH**, a mountain in the east that the road cannot cross except at one pass. Every direction
> change in the act is now a fact about the ground: you climb the north shoulder because there is
> no other way over, you come back south-west because the Snare is at the southern foot, the Hill
> Steading is high on the east flank — which is *why* four ogres are sitting on that road — and
> the hurry road is the pass itself.
>
> **Forks read long-and-light against short-and-costly**, and the edge labels say so instead of
> describing scenery. Crossroad A: 7 days quiet or **5 with the Broken Men on it**. Crossroad B:
> 3 quiet or **2 over the shooting ridge**. The last fork: 4 days of pilgrim path, 3 past the
> ogres, or **2 over the pass, arriving with no shrine and no muster**.
>
> **SPACING IS ENFORCED IN CODE — and the first version of the rule was wrong.** A radial 90px
> check passed The Sunken Wain against The Snare at 102px while their name plates overlapped,
> because a `.node` is 104×69 and the separation was nearly all horizontal. It tests the **plate**
> now, warns at boot, draws the offending pair in red in test mode, and is a linter rule. The
> linter also checks reachability from the hold, that every route still passes the four spine
> nodes, and that no fork offers the same days on both branches.
>
> **Where the pass road crosses the ridge was solved numerically**, not by eye — The Old Milestone
> kept sitting on the line at 7px and is 63px clear now — and the col is drawn where the road
> actually crosses rather than where it looked tidy.
>
> **Verified:** 18 routes, 13–20 days, every one through the Ruined Steading, the Black Fen,
> Coldharrow and the Muster Field. No road within 50px of a place it does not touch. Zero plate
> overlaps measured off the real DOM, nothing off-stage.

<details><summary>Original spec</summary>

## 6 — The map rebuilt: proportional scatter, honest routes

**The idea (user, twice now).** *"Definitely the map and an update of the routes, so it's scattered
more proportionally."* And from the earlier full-run feedback, which was parked and belongs here:
*"at least two crossroads with fights, exploration between; usually one road is longer but with
fewer/optional fights, the other shorter in days but with a mandatory fight."*

**Why it earns a place.** The map grew by accretion — every new node was wedged into whatever space
was left, which is why the right-hand side needed emergency respacing twice and the front half is
still three parallel corridors into one choke point. A Slay-the-Spire-style act lives or dies on
whether the *route* choice reads at a glance; ours currently reads as geography first and choice
second.

**How it should work.**
- **Design the graph before the pixels.** Write the act as a diagram first: START → crossroad A
  (fight on one branch) → exploration belt → choke (the Ruined Steading, keep) → the Fen →
  village/muster belt → crossroad B (fight on one branch) → shrine/muster → SNARE. *Then* place
  coordinates.
- **The route archetype, everywhere a road forks:** one branch **longer in days but lighter**
  (optional fight, more exploration slots), one branch **shorter but with a mandatory fight or a
  toll**. The edge labels already carry prose — make them carry the archetype honestly ("two days
  round the hill, nothing on it" vs "one day, and something is sitting on it").
- **Spacing rules, enforced in code, not by eye:** minimum distance between any two nodes (~90px),
  labels never overlapping another node's glyph, and a debug overlay (test mode) that draws the
  violation pairs in red so future node additions cannot silently recrowd the map.
- **Keep the fixed spine fixed**: clash → steading-camp → mother → village → muster → … → snare
  are structural. Scatter the floating slots so each *belt* between spine nodes gets a
  proportional share instead of whatever was left.
- The map painting (`drawMap`'s vignettes, hills, river) needs re-anchoring to the new positions —
  budget for that; it is most of the work.

**Touch:** `NODES`, `EDGES`, `dealEvents`/`SLOTS_ON_MAP`, the map-painting scene anchors, and a new
test-mode overlay in `drawNodes`.

**Verify:** flood-fill reachability of every node; all routes still pass the steading and the fen;
no two nodes within the minimum distance (assert it in the test overlay); each fork offers the
long-light vs short-costly pair; and the 18-route count is recomputed and sane.

</details>

---

## 7 — The hook-pole: the enemy's pull ✅ BUILT

> **Done in 8f.31.** A Snare ratkin pulls one of yours out of the line at reach 2, so the *alone*
> morale rule finally fires on your side. Building it exposed that `pull` had been **inverted since
> it was written** — src/dst swapped *and* the sector reversed, two flips cancelling.

**The idea.** The open remainder of #1: a ratkin **hook-pole** in the Snare that PULLS one of yours
out of the line, so the player meets forced movement from the receiving end early enough for it to
teach.

**Why.** Every trick the player owns should be pointed back at them once — that is what made the
enemy ogre's HURL work. A pull is scarier than a shove: it takes your person *toward* them, into
the pile, away from the spear wall — and the *alone* penalty fires on your side for once.

**How.** `hooker` template in the Snare's `T`: reach 2, low damage, `pull:1`, and the AI already
prioritises soft targets — a pull that lands on the archer is the lesson working. One log line that
names what just happened. AI gating: only pull when it actually detaches the target from its line
(reuse the *alone* check), otherwise swing normally.

**Touch:** `foes()` in the Snare, nothing else — `pull` already resolves in `strike`.

**Verify:** the archer gets hooked out of the line in an AUTO run within a few rounds; the pull
respects `big`; seven-fight regression.

---

## 9 — Mid-run save ✅ BUILT

> **Done in 8f.32.** Saves at coherent moments only — arrival, event resolution, battle hand-off —
> and **never mid-battle: a battle is regenerated, not restored.** Two bugs found while building it:
> a `try/catch` silently swallowed a renamed constant so the save never wrote at all, and
> *"start a new company"* cleared the save without resetting live state.

**The idea.** The run only lives in memory: close the tab mid-act and everything is gone. Act 1 is
now over an hour with a full playthrough, and playtesting keeps being interrupted exactly this way.

**Why now.** Every future playtest gets cheaper. And the human playthrough — priority #2 in the
plan — becomes resumable, which makes it far more likely to actually finish.

**How.**
- Serialize `G` + `PARTYCAP` + the RNG-free bits to `localStorage` (`gt_run`) on every arrival,
  battle end, and event resolution — the moments the state is coherent. **Never mid-battle**:
  a battle is regenerated, not restored; on load with a pending battle node, re-enter it fresh
  (the withdraw-softlock re-entry path already exists).
- `G` contains functions nowhere, but `p.cond`/`mem`/`bonds` etc. must round-trip — write one
  `serializeRun()`/`restoreRun()` pair with an explicit field list rather than blind
  JSON.stringify of `G` (the log alone is huge; cap it).
- Boot: if `gt_run` exists, the tavern screen offers **CONTINUE THE ROAD** above NEW COMPANY.
  Defeat and epilogue both clear it.
- Version-stamp the save; a stamp mismatch discards it silently (the format will change often).

**Verify:** save at a node → reload → same day/party/stash/map state; reload with a pending battle
re-enters it; defeat clears the save; an old-stamp save is discarded without a crash.

---

## 10 — Ashmoor: the brass token pays off ✅ BUILT

> **Done in 8f.31.** The game's one explicit promise about the future now closes the slice both
> ways and persists to the wagon as `LEGACY.ashmoor` — a *name that knows you*, which is the
> possibility-not-power legacy `09_SETTLEMENTS_AND_LEGACY.md` asks for.

**The idea.** Wynn Aldreth's thread is live and dangling: free her without a fee and *"at Ashmoor
they will know your banner before you reach the gate"* — `G.contact`, the brass token, the run
summary even reports `Ashmoor: yes/no`. Nothing ever comes of it.

**Why.** It is the game's one explicit promise about the future, and a promise the epilogue
currently breaks. It is also the natural **Act 2 seed** — and per the settlements design (docs/09),
a *known name* is exactly the kind of legacy that should cross runs.

**How (small now, bigger later).**
- Now: the **epilogue** branches on `G.contact` — a paragraph where the road to Ashmoor is open
  and somebody is waiting at the gate, versus the standard ending. The **wagon screen** records
  "Ashmoor knows the banner" as a legacy line.
- Later (Act 2): Ashmoor is the act-2 starting settlement when the token was earned — arrival
  scene differs, first prices differ, one recruit is free.

**Touch:** `toEpilogue`, the camp screen, `LEGACY` (persist `contact` as `LEGACY.ashmoor`).

**Verify:** both epilogue branches render; the legacy line survives a new run; nothing references
Ashmoor when the token was never earned.

---

## 11 — Teach the new verbs → **merged into #14**

The one-line in-context whispers (first two-handed weapon, first cooldown, first dropped rung,
first provisions click, first HURL) belong to the same job as the onboarding layer below. Build
them together — see **#14**, "The whisper layer".

---

## 14 — Onboarding for somebody new to the genre ✅ BUILT

> **All three layers are in.** Layer 1 (the arrival cards) and layer 2 (the seven whispers, plus
> `sweep` added with the Thing in Armour) shipped earlier. **Layer 3 — the standing reference — is
> now `? RULES`, bottom-left on every screen and an entry on the main menu.** Five sections written
> once and shown only when asked: how a turn works · how a hit works · how nerve works · **nobody
> dies in a fight** · what the road costs.
>
> The fourth section was not in the original spec and earns its place: *nobody on the roster is
> ever killed* is the rule most players will not expect, it is the reason the fights are allowed to
> be dangerous, and there was nowhere in the game that said it out loud.
>
> The **practice field** (see the front-door entry below) is the other half of this: layer 3 tells
> you the rules exist, and the practice field lets you lose to them for free.

<details><summary>Original spec</summary>

## 14 — Onboarding for somebody who has never played one of these

**The idea (user).** *"Simple onboarding for both battles, map, and inventory/character screen — so
a player new to the genre can get it."*

**Why it earns a place.** The current onboarding is three cards that **name the screen and refuse
to teach rules** — a deliberate choice made when the only audience was somebody who had watched it
being built. That audience has changed. A tactics newcomer meeting this slice has to work out hex
facing, two actions a turn, engagement and parting swings, a nerve ladder, armour-before-hitpoints,
cooldowns, hands, and a map that charges wages per day — with no help at all. **Almost nobody
bounces off this game because it is hard; they bounce off because nothing told them the rules
exist.**

**The rule that must survive.** Do not turn it into a wall of text or a forced tutorial mission.
The design's own instinct — *name the screen, do not lecture* — was right, it was just applied to
too little. Three layers instead:

**Layer 1 — the arrival card (once per screen, expanded).** The existing `COACH{}` cards stay but
get the two or three sentences that actually matter:
- **Map:** every road costs days, and days cost wages. Where you go is the whole game.
- **Inventory:** everybody carries what you put on them; two hands, and some things take both.
- **Fight:** two actions each. Armour comes off before blood. Standing behind somebody is worth
  more than standing in front of them, and walking away from an enemy lets them swing.

**Layer 2 — the whisper layer (absorbed #11).** One sentence, once ever, at the moment the thing
first happens rather than up front: first two-handed weapon blanking an off-hand · first cooldown ·
first dropped rung on the ladder · first provisions click · first HURL · first back-arc kill
(*"that landed in his back — that is what the red arc is for"*) · first parting swing taken.
Machinery exists: `COACH{}` + `LEGACY.seen`.

**Layer 3 — the standing reference.** A **?** in the corner opening one scrollable card:
"how a turn works / how a hit works / how nerve works / what the road costs". Written once, never
shown unless asked. This is what a returning player wants and what a confused one reaches for, and
it costs nothing to leave in.

**Touch:** `COACH{}` (expand), `coach()` call sites, `LEGACY.seen`, a new help overlay reusing the
`ask()` modal shell.

**Verify:** a fresh `localStorage` sees each arrival card exactly once and each whisper exactly
once; nothing fires twice across two runs; nothing interrupts an AUTO battle; the reference opens
and closes from every screen.

</details>

---

## THE FRONT DOOR — menu · practice field · standing reference ✅ BUILT

**The idea (user).** *"Maybe it is nice to start from menu + battle simulator + something else."*

**Why it earned its place, beyond being asked for.** The game booted straight into the tavern, and
that one fact caused three separate problems: a saved company could only be picked up by
**reloading the page**; there was nowhere to read the rules, so the only way to learn what a
parting swing was, was to lose to one; and the only way to see a fight was to spend a road getting
to it — which made the eight fights the least-tested part of the build.

**What is in it.**
- **A main menu** (`#menu`, `openMenu()`), which the game now boots into. Continue the road ·
  a new company (confirmed, and only ever via a reload — see the note in `enterWorld`) · the
  practice field · how any of this works · the wagon, once there is one. **The duplicate
  continue/start-again dialog inside `enterWorld` was DELETED, not left as a fallback** — this
  project has already paid for one pair of rules covering the same ground.
- **`☰ MENU`** on the world screen only. Mid-battle is not a coherent moment to save at; a battle
  is regenerated, never restored, so walking out of one would silently discard it.
- **The practice field** (`#sim`) — any of the eight fights, against any of six companies,
  including **a copy of your live company** read out of the save. The road card's own questions are
  asked here too (which side at Blood on the Road, which deployment against the Thing in Armour),
  because on the practice field the deployment is part of what you came to try.
- **The standing reference** — see #14, which this closes.

**The safety property, and how it is enforced.** A practice fight borrows `G` wholesale rather than
teaching fifty call sites about a practice mode: `simStart()` snapshots the whole object (it is
plain data — the save code relies on the same fact) and `simResult()` puts it back before drawing
anything. Four engine guards do the rest, and they are the whole feature:

| where | what it stops |
|---|---|
| `saveRun` | writing a scratch company over a real one |
| `clearRun` | a practice defeat deleting the run |
| `checkEnd` ×3 | spoils (which recruit), defeat (which wipes), mercy (which sets `G.spared`) |
| `withdraw` | the two fights that refuse withdrawal in a run refusing it here |

`SIM` is declared beside `TEST`, with the engine, **not** beside the screen that uses it — those
four guards are consulted during boot and a `const` declared later would sit in the temporal dead
zone. This project has shipped one temporal-dead-zone crash already.

**Verified:** all eight fights run start-to-finish through the practice field; `G`, `PARTYCAP` and
the save file come back byte-identical every time; a practice wipe leaves the save intact and does
not set `LEGACY.priorDied`; the menu round-trips world → menu → world.

**Note on the parked Battle Lab.** The outside review's `F26` proposed this and it stayed parked
because it was *a tool for the builder, not the game*. That reasoning was right and it still is —
what changed is the framing: this is **a place in the game where you can lose without it costing
anything**, which is a different feature that happens to share the code. The builder's version
(ScenarioSpec, arbitrary compositions) stays parked.

---

## 18 — ★ THE THING IN ARMOUR ✅ BUILT

> **Done, and it works.** `noArc` (its own flag, not a reuse of `big`) cancels the back arc, the
> flank bonus **and the surrounded bonus** — "no flanking penalty" has to mean the numbers one too,
> or a ring pays +30 a head and ringing it is correct after all. `soak:4` comes off body damage
> after the armour split, floored at 1. Its sword is a one-cost sweep and it has three actions, so
> it closes five hexes and cuts, every round. Step 5. `noRout` + mor 460 so it does not react to
> being hurt. It melts: no corpse, no race, **and the kill tally records nothing** (`notally`) —
> the company cannot say what it killed. The aftermath gives a smell and **The Cold Thing**.
>
> Fires once per run on arrival at the first ordinary road node past the first Muster Field
> (`armourDue()` — written as a rule, not a node id, so the map rebuild in #6 cannot delete it),
> and **queues the node's own event** rather than eating it.
>
> **The one thing still open.** The three answers are not balanced yet: the arena puts
> **"send somebody wide" last of the three, every time**, and it is not about the enemy's strength
> — halving its durability barely moved the win rate. Losing a body is unconditional; the thing it
> buys (ground, and distance to shoot across) is only worth something to a side that CHOOSES to
> hold, and the mirror-AI walks straight at it instead. So the instrument cannot value that option
> and further compensation would be tuning to a broken measurement. **It needs the human
> playthrough**, and it matters: per the pillar, spending a person has to actually pay, and if it
> does not, that choice is a trap. Current compensation: spacing-of-two deployment, the back edge,
> and the Thing arrives at half armour.
>
> **The other thing worth knowing:** deployment barely moves an AI-driven party, because the AI
> re-forms immediately. It moves a *player* a great deal. Read the arena's deployment table as a
> lower bound, not a verdict.

<details><summary>Original spec (kept — the build follows it, and the reasoning is still the reason)</summary>

**★ The user's flagged priority: "maybe one of the most important things."** Build this before the
other content entries.

**The idea (user).** Something in armour comes at you between two places. You do not know what it
is. **Surrounding it does not work** — it takes no flanking penalty and its sword sweeps, so a ring
of your people is the *worst* possible formation. It is fast, heavily armoured, shrugs a flat
amount off every blow, and it will take a company apart if you meet it head-on. **The fight is to
skirmish it**: pin it with one body, shoot it with everybody else, and accept what happens to the
one you pinned it with. When it dies it **melts**, and you never find out what was inside.

**Why it earns a place — this is the missing lesson.** Each fight in the act sets a different
tactical problem, and there is a hole in the set:

| Fight | The lesson |
|---|---|
| Fen-Mother | surround it, swarm it, take the arcs |
| The Pack | do not spread — hold the gap, make them come |
| The Sling-Line | cross open ground under fire |
| The Hill Steading | kite four things that will not chase |
| **The Thing in Armour** | **do not engage it. Fix it with one, shoot it with the rest, and pay for it.** |

It is also the first fight whose correct answer is **a sacrifice** — the ogre goes in front because
he is the only one who might survive being the anchor, and he might not. That is the pillar
(*you cannot afford to be good to everyone*) expressed as a tactical decision instead of an event
choice, which is exactly where the design has not yet put it.

### The creature

- **Fast.** Step 5 — at least a ratkin's. It closes whether you like it or not; running is buying
  time, not escaping.
- **Huge sword, sweeping.** Its main attack hits every adjacent enemy (`sweep:true`, which already
  exists — the brute and the ogre maul use it). **This is what punishes the ring.**
- **No arcs.** Flanking and backstabs do nothing to it. `big:true` already grants immunity to arcs
  and DISTRACT — but `big` also means *two hexes and a tail*, which this is not. **Add a separate
  `noArc:true`** and have `arcOn`/DISTRACT/the AI's arc weighting honour either flag.
- **Flat damage reduction.** `soak:2` or `3` — subtracted from every blow *after* the armour split,
  floored at 1. This is what makes chip damage pointless and a committed line pointless: it rewards
  the few big shots a skirmish produces over the many small ones a scrum does.
- **Heavy armour and a lot of hitpoints**, but *not* Fen-Mother numbers — she is 470/170 and a
  set-piece; this should be beatable by a clever four and brutal to a careless six.
- **Its AI throws everything at whatever is nearest**, which is correct for it and is what makes
  the anchor plan work: it fixes on the body in front of it.

### The unknown

- Its class line reads as a **monster with nothing legible in it** — a new `MONSTERS` entry whose
  tag deliberately refuses to identify it (*"⚔ SOMETHING IN ARMOUR"*), and a `nature` line saying
  you cannot tell what is inside.
- **On death it melts.** No corpse, no loot table, no race revealed. The aftermath card gives you
  the **artifact** it was carrying and one sensory detail — a smell — and nothing else.
- **This is a hook for a later act, and it should stay a hook.** Do not answer it anywhere in the
  slice. The run summary should not mention it either.

### The road event

Fires **on arrival at a node, framed as having happened on the last stretch** — *not* mid-travel.

> ⚠ **Do not fire this from `rollCampAt`.** Jumping to a battle mid-journey strands the party
> token: only `travel()`'s `arrive` clears `G.moving` and moves `G.at`. The dog ambush was moved to
> arrival for exactly this reason and reads fine — "you had made camp / you were an hour short of
> the place when…".

Three choices, and **all three end in the same fight** — what changes is the state you enter it in:

- **Run for it.** You reach broken ground, but strung out: **scattered deployment**, everybody
  further apart and further from each other. Costs you the line you would have had.
- **Form up and meet it.** **Concentrated deployment** — a tight line, which is exactly the
  formation its sweep is designed to punish. The obvious choice, and the wrong one, and the game
  must not say so.
- **Send somebody to draw it off.** A ratkin volunteers or is chosen. They **start the fight downed
  and take a scar for it** — but the rest of you get the ground you wanted: good spacing *and*
  distance. The cost is a person, up front, before a blow is struck.

Deployment variation per choice is already supported — `startBattle`'s `slots` table is chosen per
battle kind (the camp does exactly this). Use `G.armourChoice` to pick the slot set.

### What to touch

`EVENTS` (the road card) · `NODES`/`arrive` (the arrival hook, once per run, gated like `packDone`)
· a new `armour()` foe builder · `MONSTERS` (the unidentifiable entry) · `strike` (`soak`) ·
`arcOn` + DISTRACT + the AI arc weighting (`noArc`) · `startBattle`'s `slots` (three deployments) ·
`AFTER` (the melt) · `LOOT`/`GEAR` (the artifact) · the aftermath card.

### Verify

- Circling it produces **no** arc bonus and DISTRACT refuses; a ring of four takes sweep damage
  every one of its turns.
- `soak` measurably flattens small hits and barely touches big ones — check an archer's chip
  damage against a maul.
- Each of the three choices produces a visibly different starting formation; the distract option
  begins with one of yours already down and scarred.
- It melts: no corpse, no race in any log line, the artifact arrives, and nothing anywhere names
  what it was.
- **Balance it deliberately**: a careful four should win with one person carried off; a careless
  six that surrounds it should lose people. Use the arena (#13) rather than a single AUTO run —
  this is the one fight in the act where "it completed" tells you almost nothing.

</details>

---

## 48 — Bodies on the ground ✅ BUILT

*Shipped 2026-07-31 (build log 8f.41). Pulled up from Tier 4 to Tier 2 by the user on the day it
was written, and built the day after.*

`at()` reads `alive()`, so the moment somebody died the hex came clean again and the field forgot
the fight had ever been there.

> **Leave the body where it fell. That is the whole entry.**

**Built.** One canonical `dropBody(u)` writing `B.bodies[K(col,row)] = {kind, side, race, round, n,
rot}`, called from **every place a unit actually dies** — the strike resolution, the Fen-Mother
bleeding out, and the test-mode clear. *The entry named two write sites; there were three, which is
precisely why this is a function and nobody has to find the fourth.* Two on one hex keep a **count**
rather than a second entry. `rot` is rolled once and stored, because `render()` runs many times a
turn and a fresh angle per frame would make the dead twitch.

**~~Not for the DOWNED.~~ REVERSED 2026-08-02 (build log 8f.80), see below.** The original rule
was: a roster member is dragged out of the line still breathing, so leaving their body on the field
would say the opposite of the rule the entire scar system exists to state.

**One read site** in `render()`, after the state tint and before the token — DOM order alone puts a
standing figure over the one it is standing on, so it needs no `z-index` and cannot fight the
back-arc ring or the hover ring. The figure is the unit's **own sprite**, laid over and shaded:
the race sizes it and the side palette tints it, so *whose* body it is reads at a glance without a
second art pass. `pointer-events:none` is what makes "nothing to click" true — a body that
swallowed a click on the hex under it would be a rule by accident.

**The user's two corrections, both of which made it better.** *"Player corpses and enemy corpses
has same colors as main creatures"* — the first version darkened them almost to silhouettes, which
threw away the one thing the picture is for; only enough shade to read as ground now. *"Ratkin
corpses a bit bigger"* — one flat scale looked right on a human and vanished on a ratkin, whose
sprite is 21×29 against a human's 26×38, so a small body lying down was a smudge. `BODYSCALE` is
per-kind, and every race lands at roughly the same weight on the ground.

**Everything deliberately NOT in scope stayed out**, so a later session does not re-add them
thinking they are new ideas: difficult ground · stumbling when shoved onto one · nerve for standing
beside your own dead · throwing them · monsters eating them · salvage depending on where somebody
fell.

**Verified.** All eight fights: every dead unit produced exactly one body, every fight started with
zero (a battle is regenerated, never restored, so this never reaches the save); graves stay
walkable at their bare terrain cost and `at()` returns empty on them; the body layer computes
`pointer-events: none` and the hex under it keeps its own click handler.

### AMENDED 2026-08-02 (build log 8f.80): your own crew leave a body too

*(User: "куда-то пропали тела раненых моей команды… вернуть опцию раненых от команды и моей и
противника", then, on whether a downed body should be told apart from a dead one: "ok, but wounded
and dead could look same on battlefield of my team - body on the ground. on this lvl it isnt that
important.")*

**The complaint was not a regression.** The enemy half was verified still working in the running
game before anything was changed: `B.bodies` written, `.bmark`/`.bfig` in the DOM, the sprite
data-URL decoding, nothing above clipping it. The player's side had simply never been switched on:
the exclusion above was deliberate and it was **wrong in play**.

**Why the original argument failed.** It reasoned about what a body *says* and ignored what an
empty hex says. With the downed excluded, your crew fell and the hex came **clean**. The enemy
dead were lying all over the right of the board and your side looked like it had walked off the
field. That is a worse lie than the one the rule was avoiding, and it is invisible from the source:
you only see it by looking at the board after somebody of yours goes down.

**Built.** `dropBody(d)` is now called on the downed branch too, from the same one site. The user
was offered an amber pool and ring to keep down and dead apart and **declined it**, so it is
literally the same picture on both sides. The distinction was never carried by the body anyway: the
`DOWN` float, the log line and the aftermath scar all still say it, and each of them says it better
than a second palette on a 37px hex.

**One thing NOT changed:** the road sacrifice at `startBattle` (#18, the armour fight) sets
`downed` without a body on purpose: that person went wide off the road and is *not on the field*,
so a body in your starting line would be the picture contradicting the prose.

**A pre-existing #48 bug found by the regression sweep and fixed here.** A corpse can be struck
again (a cleave, a simultaneous blow, an act already in flight) and the kill branch runs a second
time on somebody already dead. `pack` produced **three** `dropBody` calls for one dog (`foe7`), and
the hex count went to two, which the two-figure render drew as a small pile where one animal had
fallen. Guarded with a `u.bodied` flag **on the unit, not the hex**, because the hex count is the
thing that must keep working when two *different* people fall on the same ground. Units are rebuilt
per battle (`G.party.map(unitFrom)`), so the flag cannot leak into the next fight.

**Verified in the running game, all eight fights, zero thrown errors:** summed body count equals the
number of units that fell **exactly** in every fight (it was 12-for-10 in `pack` before the guard);
duplicate `dropBody` calls still occur and are now rejected rather than counted; a downed crew
member's hex returns empty from `at()`, stays walkable and stays clickable, and the body layer
computes `pointer-events: none`. Picture: [`shots/bodies_fixed.html`](../shots/bodies_fixed.html),
against the two that framed it: [`shots/bodies_now.html`](../shots/bodies_now.html) (the gap) and
[`shots/bodies_proposal.html`](../shots/bodies_proposal.html) (the amber variant, declined).

**The transferable lesson.** *A rule about what the board SAYS has to be checked against what the
board LOOKS LIKE, and #48 was argued entirely in prose.* The exclusion reads perfectly in the
changelog and is obviously wrong in one screenshot. Anything that decides not to draw something
needs a picture of the not-drawn case before it ships, not just a sentence about it.

---

## 36 — Line of fire the player can read ✅ BUILT

*Shipped 2026-07-31 (build log 8f.41). Built ahead of #46, which needed it.*

The engine had **no line trace at all** — range was pure distance, so an archer could put an arrow
through two of his own and a boulder and never know.

**Four states**, resolved by tracing the actual hex line: **CLEAR** · **SCREENED** (exactly one
body, yours, adjacent, its front turned away) · **OBSTRUCTED** (a body across the lane that is not
standing there for you) · **BLOCKED** (rock, fire, palisade, or more than one body). `hit:null` on
BLOCKED is load-bearing: it is not a very large penalty, it is **the absence of an offer**, and
every consumer tests for it rather than adding it.

**The one function is the whole feature.** `losState(a,d)` traces the standard cube-lerp line and
classifies what it crosses. It is folded into `hitBreakdown` rather than bolted onto the UI, which
is what makes **both AI brains change behaviour without either being taught anything** — the same
function prints the player's preview and scores the AI's expected damage. On top of that, one hard
filter in both brains: BLOCKED is never on the table, and OBSTRUCTED is off the table *while a
clean lane exists*. "Usually prefers" was not the contract — an archer who occasionally puts one
through his own shieldman reads as broken however good the arithmetic was.

**Rock stops an arrow**, which is what makes the ogre's thrown boulder in #46 worth a whole action:
it is the only way to turn a BLOCKED lane back into a shooting lane.

**A working is not an arrow.** Casters are exempt by design — a blight-wind is aimed with the wits
and goes where it is sent. That exemption is also the only thing keeping the battle-mage distinct
from the archer once screening exists.

### Three things the work itself taught

**1 — The gate picture caught a real bug before it shipped.** The first SCREENED rule asked for
`arcOn(a,s).n === 'BACK'`: one sector out of six. Drawing the mockup measured the textbook
formation — archer at 3,6, shield at 3,5 standing *on the traced lane* facing the enemy at 6,4 — as
**FLANK**, because a hex line **bends**: the sector from the shield to the archer need not be the
exact opposite of the sector from the shield to the target. A one-sector rule would have made
SCREENED almost impossible to form on purpose, and the feature would have existed and never fired,
which is worse than not building it. It reads the **rear 180°** (sectors 2–4) now, and *"his back is
to you"* is what that means.

**2 — A pure function in the innermost loop is not free.** `losState` called `at()` for every hex it
crossed, `at()` rebuilds `alive()` on every call, and a five-round clash that used to resolve
instantly took **23 seconds**. That is not a harness inconvenience — it is the AI's turn, and the
player waits through it. Two caches keyed on a signature of where every body is standing (**exact**,
not merely fast: the instant anything moves, dies, flees or goes down both are thrown away) took it
to **2.0s**. 11×.

**3 — The user's two corrections.** *"Make it streight"* — the ray traced the polyline the hex maths
walks, which is honest about the **algorithm** and wrong about the **fiction**: an arrow flies from
the bow to the body, it does not stagger from hex centre to hex centre. Straight line now, with a
dot on every hex it has to cross and a fat dot on whatever is in the way. *"If the range is not
optimal (too long) — yellow"* — the lane was only **half** of what makes a shot bad. A perfectly
clear line at the edge of the bow is still a poor shot, and the board was drawing it in confident
green while `extreme range −18` and `long shot −8` were charged invisibly. One verdict per shot now,
worst-thing-first — **BLOCKED** red · **OBSTRUCTED** amber · **FAR/LONG** yellow · **SCREENED** gold
· **CLEAR** green — and the range bands are not new numbers, they are penalties the bow has always
paid and the board never showed.

**Verified.** Six planted lanes produce all six verdicts from one archer; the trace is symmetric
read from either end and connected hex-to-hex; a controlled A/B (one shooter, one target, only the
lane changing) reads 28% clear → 20% screened → 6% obstructed → no offer at all through rock, and
turning the screen round to face the archer correctly drops it to OBSTRUCTED; across all eight
fights **zero BLOCKED shots ever resolved** and **zero** cases of any unit taking an obstructed shot
while a clean lane was available.

**Banked for #50, not acted on:** the brigand fight went from a 9–11 round read to **14**, the fight
most exposed to lane costs. Not retuned, because #46 and #47 are about to change what a shooter's
turn is worth.

---

## 51 — The Captain's call ✅ BUILT

*Shipped 2026-07-31 (build log 8f.42). The user's own idea, asked for and built the same day —
and the first entry whose gate mockup was drawn before a single line of it existed.*

> **The ask, in the user's words:** *"When main hero character comics style comments things
> happening on battlefields. Say phrases and sentences. It should be for tutorial or important
> battle moments — they are running, we lost a man, fen mother is desperate. Tool to explain what
> is happening, give hints on possible actions or emotional layer."*

**What it is.** One speech balloon from the Captain's own body on the field — tail pointing at
her, portrait at the left, 2.2 seconds, **no input pause, no click, nothing to dismiss.** It does
three jobs and no others: says what just happened, teaches a rule the first time it bites, and
lets the company be a company when it costs somebody.

**Why the Captain and not a narrator.** She is the player's own body on the board, so a musing
voice-over would be the player talking to themselves. A *leader calling the fight* is a different
sentence entirely — "They are going, let them" is order-shaped, and a captain shouting a read of
the field is simply what a captain does.

**The three tiers.** The tier is invisible to the player except as a hairline on the balloon's
left edge; its real job is deciding who wins a collision.

| | fires | example |
|---|---|---|
| **TEACH** | a rule, the first time it ever bites, once per save | *"Behind them. That is where a fight gets cheap."* |
| **CALL** | a state on the field just changed | *"The Fen-Mother has stopped guarding. Whatever happens now happens fast."* |
| **HEART** | it cost us somebody | *"That is Vesna. Close over them — now."* |

**Six triggers, fourteen lines, and not one digit in any of them** — *show a state, hide the
number* is not suspended because a person is saying it.

> **It was twelve, and the user halved it the same hour:** *"Start with less triggers. Make only 6
> the most important events — for next I will craft manually."* Kept: **they are running · one of
> ours is down · something has gone DESPERATE** (the three they named when they asked for the
> feature) plus **two or more of ours lose their nerve · one of ours is surrounded by three · the
> first back-arc hit ever.** That is two per job — explain, hint, feel — and all three tiers.
>
> **Six is a design number, not a limit in the code:** a seventh is one row, and nothing counts
> them. What does *not* grow is the budget — thirty triggers would still speak five times a
> battle, each one just more rarely, which is a quieter game rather than a busier one. There is a
> **HOW TO ADD ONE** block above the register, and the six cut lines are kept paste-ready in
> [`WHAT_TO_TEST.md`](WHAT_TO_TEST.md) in case a real playthrough finds the field too silent.

**The budget is the design, and it is what separates a voice from a nag.**
One balloon per round · five per battle · **HEART > CALL > TEACH**, and the loser is **dropped,
never queued**, because a comment about a moment that has passed is worse than silence · **a line
never repeats in a run**, and when every variant of a trigger is spent it says nothing at all.

> **When the Captain is down, dead, fled, or not in this fight, the voice stops for the rest of
> the battle.** No substitute speaker, no handover, and it does not come back if he is helped up.
> It cost nothing to build and it is the loudest thing the system can do: the running commentary
> you have had all fight simply *stops*, and you notice before you have worked out why. **Losing
> the voice is the mechanical consequence of losing the Captain**, delivered without a line of prose.

**TEACH rides on `whisper()` rather than duplicating it.** One call, two voices, **one seen-set**,
so they can never drift apart or fire on different occasions: the Captain says the human half on
the field and never a number; the existing bottom-of-screen toast carries the exact rule, which is
the one place a number is allowed. The six whispers already in the build got a voice for free.

**Where it must never go.** Tactical reads only — a hint about arcs is a rule, a hint about whether
to spare somebody is a karma meter and the pillar forbids it. Never `#bTip`, which is the game's
voice. Never `G.log`, which is written into the save. And **triggers are read once per turn in
`capTick()`, never inside a scorer** — 8f.41 lost twenty-three seconds to one innocent function
call in `hitBreakdown`, and nothing else gets to make that mistake.

### Three things the work itself taught

**1. A one-shot flag set *before* the line is said is a trigger that silently disappears.** The
first version marked `C.desp=true` and then called `capSay`. On the Fen-Mother, DESPERATE collided
with another CALL in the same round, correctly lost the round to it — and could then never fire
again for the rest of the fight, because the flag said it already had. `capSay` returns whether it
actually spoke, and every one-shot flag is now set from that return. **The general shape:
"remember that this happened" and "make it happen" must not be two statements that can come apart.**

**2. Flip on the actual overflow, not on which half of the field you are standing in.** The board
is narrower than `#bField` and sits inside it, so *past the middle of the field* and *would this
run off the edge* are different questions. The first version asked the first one and the balloon
never flipped.

**3. A pre-existing bug that only this entry's rule exposed.** `whisper()` wrote `LEGACY.seen`
unconditionally — so **practising the Snare spent the back-arc tutorial on a fight that never
happened**, which is the practice field reaching the campaign, and `SIM.on` exists precisely to
stop that. It is now shown, capped to once per practice fight, and never persisted. The Captain's
teaching lines needed exactly that rule and could not have had it on their own.

**And one small one.** A unit's `name` is `name + surname`; *"That is Vesna Kolb, close over her"*
is a clerk reading a roll, not a captain shouting. `capName()` takes the roster first name for our
own people and leaves everything else untouched — splitting on the space would have turned
*"The Fen-Mother"* into *"The"*.

### The follow-up the user asked for the same hour, and why it mattered

> *"The phrase adjusted to captain unit (so he says it) and his photo connected to the empty
> square — so it feels more personal. And then it would feel more personal for different heroes."*

**Two fixes and one shape.**

**1. It says who he is, not what he does.** The label read `THE CAPTAIN` — a job title, on a game
whose whole pitch is that these are people. It now reads the roster's own `fullName()`, so a run
gets **`YOU “TALLOW”`** and the nickname (rolled per run) is what makes it a person, given that the
Captain's literal name is *"You"*. Because it goes through `fullName`, it can never drift from the
character sheet. The mirrored log line is attributed too — an unattributed quotation is the game
talking rather than a person.

**2. The empty square was real, and it was in the pictures rather than the game.** The face was
drawn into a live `<canvas>` — and **canvas pixels do not survive `innerHTML`**, which is exactly
how `shotBoard()` serialises the `#bFx` overlay. So every gate picture showed a blank square while
the running build drew the portrait correctly. It is an `<img>` carrying a data URI now: `P1`, the
same painted bust the battle panel and the sheet use, with the procedural bust rendered once and
handed over the same way so there is a single code path. *(A general one, worth keeping: **the
serialiser is the thing to distrust when a picture disagrees with the running build**, not the
build.)*

**3. "Different heroes" cost one argument, not a rewrite.** `capBalloon` takes a **speaker**, and
nothing below `capSay` knows the Captain exists — face, label and anchor all come off whichever
unit is handed in. Verified against somebody who is *not on the roster at all*: they get a name and
a procedural bust with no painting and no roster entry, which is precisely what a second speaker
will be. **That is [#40](00_PLAN_AND_BACKLOG.md) — the company reacting toward the player — already
holding its half of the machinery**, without a line of speculative code being written for it.

### What it absorbed and what it did not

**#41 — the first one down** is the HEART tier, folded in rather than left as a duplicate entry.
**#40 — portraits that look back** stays separate and unbuilt: that is the *company* reacting
toward the player, a different speaker and a different job. #41's slow-down of the action was
deliberately **not** built — the user asked for comments, not cutscenes.

**Verified.** All eight fights twice through both brains with `checkEnd()` between turns — 4–19
rounds, no stalls, nothing thrown, `LINT()` 0 findings. Every rule in the contract asserted on a
live practice board: a lighter tier dropped in a taken round · a heavier one taking the round off
it · **the dropped-then-retried path** · variants exhausting into silence rather than repeating ·
the five-per-battle cap holding at exactly five · the Captain going down muting the voice
permanently, including after she is helped back up. `G.capSaid` round-trips the save, arrives
absent from a pre-#51 save without a migration, and **a practice fight leaves it empty**. Three
gate pictures taken off live boards: `shots/51_heart.html` · `51_call_flip.html` · `51_teach.html`,
all three carrying the painted face in the serialised markup.

**Banked for #50, not acted on:** brigand read 12–15 rounds and the Thing in Armour 9–21 across
the two regression passes. Same parking lot, same reason.

---

## 8 — Audio for the new verbs ✅ BUILT

**The state as found.** The sound set predates most of the current game. Shove, hurl, SINK BELOW,
ROOTING GRASP, the camp fire and the morale ladder had no voice — and the ones that *seemed* to
have a voice were the worse problem: **they were borrowing somebody else's.**

| the verb | what it played | why that is wrong |
|---|---|---|
| the ogre's HURL | `rout` | the sound of somebody's nerve breaking, for a thrown ally |
| ROOTING GRASP | `back` | the bright two-note back-arc sting, for a wet hand closing |
| SINK BELOW | `dodge` | a dry whiff of air, for going under water |
| a rung of the ladder | *nothing, in either direction* | the ladder has been silent since it was built |

A sound that belongs to another act does not read as "no sound". It reads as **the wrong thing
having happened**, which is worse than silence and much harder to notice you are being taught.

**Built.** Seven registry entries and one loop, all WebAudio (CSP forbids files):

- **`shove`** — boots losing the ground, then weight arriving. **`hook`** — the pull's own sound,
  a scrape *then* the arrival, because a pull and a push are not the same event from the receiving
  end and #7 built them as two verbs.
- **`hurl`** — air rising, then something landing, with the landing delayed to where it lands.
- **`sink`** — the water swallowing *and* giving back, one sound with two gestures, because SINK
  BELOW resolves as a single act.
- **`grasp`** — a wet creak closing, with two small clicks in it.
- **`rung_up` / `rung_down`** — the same gesture, down a third and duller. `rung_up` did not exist
  either.
- **the camp fire** — a looped brown-noise bed through a lowpass, with sparse crackle on its own
  interval. Distance-independent on purpose: it is the room, not an object.

**Two things that are load-bearing and would not be obvious later.**

**The rung tick is throttled, and it has to be.** `mor()` is called across a whole side at once —
the kind one's aura at deployment, a rout sweeping a line — and eight ticks inside one frame is a
machine gun, not a rung. One tick per event, whoever moved: the news is that the line's nerve
changed, not whose.

**The fire is started from `startBattle` and only ever *stopped* from `setMusicMode`.** Every exit
from a battle passes through a `show()`, and every `show()` calls `setMusicMode`, so the stop is
guaranteed by a path that already exists. The start is not put there because `FIREPIT` is declared
with the obstacle code far below and reading it from a function that runs during boot is a
temporal-dead-zone crash — **this project has already shipped one of those** (`hurtLine` in
`pickChoice`) and it cost a whole event branch.

**Mute is free**: everything hangs off `AU.master`, whose gain the mute button zeroes, so the fire
is silenced by a control that does not know it exists.

**Verified.** Every case fires with no console error against a real AudioContext; the fire loop
starts in the ogres' camp (`FIREPIT` set) and **not** in a fight without one, stops on any screen
change, cannot double-start, and its stop is idempotent; all eight fights clean through the
harness.

**The standing caveat, carried from every audio session: the builder cannot hear the output.** The
code is verified to run and the synthesis is written to a described gesture. Whether it *sounds*
right is the user's judgement, and it ships behind the existing mute.

---

## 15 — Second and third battlefield styles ✅ BUILT

**The idea (user).** *"Second and third style hex for battles."*

**Why it earned its place.** Every fight was the same wet ground with different props. The style
bible had locked **four atmosphere keys for exactly this** and one of them was in use — the art
direction was written and unspent.

**Built.** `paintTerrain`'s hardcoded literals lifted into a `GROUND{}` register — base tones,
damp patches, water/pool/glint/reed, rock in three tones, bare ground, tuft colours and density,
the six clutter kinds, cart ruts, the low-lying layer, and **the surround and the vignette**, which
were CSS and are now owned by the same table. One place decides what a battlefield looks like.

- **Fogbound Teal** — the fen. **Moved verbatim**, so the default could not regress.
- **Dust & Gold** — the ogres' hill, the sling-line, the Thing in Armour's broken ground. Pale rock
  shelves, dry stalks, and heat instead of fog: fewer low bands, warmer, much weaker, because the
  point of that ground is *that you can see across it*.
- **The Bloom** — the Fen-Mother. Magenta light with no source, near-black moss, wrong-coloured
  water, and flowers in `#e05fa8` — **the Blooming Hand's own magenta**, so the ground and the
  mutation are visibly the same thing.

**Why the Fen-Mother, when the entry said the fen keeps teal.** Because the rest of the build
already calls her a Bloom place and only the battlefield had not been told: her event card is
`art:'bloom'`, her node is `weird` on the map, and the aftermath talks about *the bloom-light going
out under her hide*. Assigning the third palette to nothing would have left it exactly as unspent
as the entry was written to complain about.

### The measurement, which is the whole lesson

**The hex tint and the state colours were tuned against teal, so a new base is not free.** The
first Dust & Gold was the genuinely pale ridge the bible describes, and it cost **every** state
colour about 13% of its contrast against the shipped ground — ROUTED fell from 2.71 to 2.37.

> **The rule this settled on, and the next palette inherits it: no state colour may read worse on
> a new ground than on the one the game already ships.**

The fix was not to give up the look. **The paleness moved off the base and into the tufts and the
rock**, which is where it belonged anyway — bright detail on darker ground reads *more* like hard
sunlight, not less.

| ground | STEADY | WAVERING | BREAKING | ROUTED |
|---|---|---|---|---|
| teal *(shipped baseline)* | 4.10 | 4.74 | 3.31 | 2.71 |
| dust *(first pass — rejected)* | 3.58 | 4.14 | 2.89 | **2.37** |
| **dust (shipped)** | 3.99 | 4.62 | 3.22 | **2.64** |
| **bloom** | 6.02 | 6.97 | 4.87 | 3.99 |

**And the proof the refactor itself was clean is a number rather than a reading:** teal's mean
ground samples **byte-identically at (48,60,57)** before and after the lift, so the default palette
provably did not drift while 40-odd colour literals were moved.

**Verified.** All three assigned and rendering at 15×13 with no console error; the camp keeps its
fire-lit treatment on top of teal; gate pictures at `shots/15_ground_teal.html` ·
`15_ground_dust.html` · `15_ground_bloom.html`, each with three of yours set to WAVERING, BREAKING
and ROUTED and one selected, so the badges, the odds, the arcs and the reach overlay are all being
read over the new ground rather than over the one they were drawn for. Eight fights clean.

---

## 44 — Ratkin argue about who is related to whom ✅ BUILT

> **Ratkin do not merely have large families. They have aggressive, contradictory, politically
> useful definitions of family.**

**Three beats, exactly as the entry specified them.**

**CLAIM.** Two ratkin have established, between the pot and the second watch, that they share an
aunt. One aunt is older than the bridge at Coldharrow, owns a boat, and is owed respect. The other
is twelve, has been dead six years, and is owed four crowns. They are describing the same woman;
they agree on her name, her teeth, and nothing else. *Ratkin do not settle family between
themselves — they settle it in front of somebody who was not there.*

**COST.** Three rulings, none of them free:

| the ruling | what it costs | what it buys |
|---|---|---|
| the older claim stands | free, immediate, and one of them remembers it | the argument ends tonight |
| the dead one was owed four crowns — **pay it** | −4 crowns, and the whole fire watched | the best-spent money in the chest — *and* proof that the chest opens for a good enough story |
| neither — produce her or stop saying her name | the most morale of the three | you were exactly fair, and it bought you nothing |

**RETURN.** One card per ruling, all carrying the same evidence — **neither of them was right** —
and each with a warm door and a cold one. The boatman knows the woman and says she never had a
sister. The dead twelve-year-old was real and was a debtor's daughter whose name got borrowed. Or
she turns up at the crossing selling eels, entirely real, somebody's aunt, and does not recognise
anybody. **How the company ruled becomes the shared fact**, written through `bond()` and
`remember()`.

**The guardrail, and it was the real risk.** The first beat has to be funny without lore, and **at
least one outcome has to create attachment rather than only friction** — otherwise ratkin quietly
become the comic-relief species, which is the failure mode. Every return has a door that makes the
two of them co-conspirators, and none of those doors is free.

**Mechanically tiny, as specified. No genealogy, no family tree, no spawned relatives.** Three
booleans on two people — `claimsKin` · `kinDebt` · `kinInsult` — carry the entire chain. **They
live on the person**, which is what makes the entry's one hard requirement work: one of the pair
leaves the company and the other still remembers the ruling alone.

### The machinery it needed, which is small and reusable

- **`castRace` / `castNeed`** gate a whole *card* on who is at the fire. `needRace` has always
  gated a *choice* — "feed it to the ogre" needs an ogre — and this is the same rule one level up:
  two ratkin arguing about an aunt is not a scene two humans can play.
- **`castKeep`** requires at least one of the original pair still on the roster. Both gone and the
  card never comes, because there is nobody left for it to be about, and naming a departed person
  as though they were still at the fire is *presentation becoming a second source of truth*, in
  prose.
- **`body` and `after` get a third argument** — is this still a scene with two people in it — so
  the writing can never claim two people have not spoken when one of them left. Every card written
  before this ignores it.
- **`after` may now be a function**, for the same reason `body` always was: a card about two named
  people has to be able to name them on the way out too.
- **`fst()`**, because `who()` is right for an introduction and unreadable on the third use. It was
  producing *"(ratkin cutter)'s aunt is older than the bridge"*. Cards introduce with `who()` and
  use first names after.

### And LINT learned to read CAMPS

**It was the one content table the linter had never opened, and it is the table with the most
gates in it.** A sequel keyed on `needs:{id,opt}` with a misspelled id or an off-by-one option
**does not crash and does not warn — it simply never appears, for the whole life of the project.**
That is precisely the class of bug the linter exists to catch, and the camp chain doubled in size
the day this rule went in.

The rule checks: duplicate incident ids · a `needs` pointing at a missing card · a `needs` option
index the parent card does not have · `castRace` that is not a race · `castKeep` with no `needs` ·
unknown `fx` keys · missing gear ids · and a choice gated on a race that the card's own cast
excludes. **It was proved by deliberately breaking the chain four ways and confirming each break
was caught**, then confirming clean again — a lint rule that has never fired is indistinguishable
from one that cannot.

**Verified.** `LINT()` 0 findings; all eight fights clean before and after. The chain driven end to
end through the real `openCamp` path: the cast drawn only from ratkin across 40 shuffles, tags
landing on the correct two people, crowns and morale applied, `bond()` and `remember()` written.
Each of the three rulings opens **exactly one** return and only after the two-day ripening.
`castKeep` verified at both-present, one-left and both-gone. Every body and every `after` rendered
in **both** voices — two present and one departed — which caught two grammar bugs in the
one-departed branch (*"the sort of people"* for one person, and *"an eel each"* for one person).
The tags round-trip the save.

**Found and deliberately not fixed:** the default company has **one** ratkin, so the aunt cannot
fire until a second is recruited. That is the card being honest about its own cast, not a defect —
and it is written up in `WHAT_TO_TEST.md` so the user is not left waiting for a card that is
correctly refusing to appear.

---

### Codex packet — status

The `docs/CODEX_TEMP_*` files were **non-canonical proposals** from the outside review — fully
harvested, and **deleted on 2026-07-31**. Status of their P0 list:

| | | Status |
|---|---|---|
| **B01** Banking doubles all Salvage | banked the aliased pool twice | **INTEGRATED** |
| **B02** AUTO busy-state deadlock | `beginTurn` invalidated callbacks without releasing the lock they held | **INTEGRATED** — cause fixed, not masked; watchdog demoted to a reporter |
| **B03** Fen-Mother flees but is reported dead | set-pieces now cannot rout (`noRout`) | **INTEGRATED** |
| **B04** Late-route node clipped off the right edge | pulled inside + `clampNodes()` guard at boot | **INTEGRATED** |
| **B05** Nodes look clickable while travel rejects input | everything locks; the destination shows a `walking` state | **INTEGRATED** |
| **B06** Prologue text contradicts the starting loadout | the junk is spares; the line points at the free off-hand | **INTEGRATED** |

**All six P0 items are closed.** Everything past them (ScenarioSpec, Battle Lab, ZOC, combat roles,
the independent ideas) is **STILL OPEN** and deliberately untouched — the packet's own rule is one
thin package at a time, and its dependency order puts all of it behind the P0 list. The next
packet ticket by its own order is the **shared ScenarioSpec**, then the **Battle Lab thin slice**.

### Playtest #6 (GPT) — what was fixed on 2026-07-31

Done, so nobody re-opens them: the **AUTO/AI hang** (watchdog), **fights ending in 3–5 rounds**
(it was `tookHit`, not damage — see the plan entry), **the tutorial fight teaching nothing**
(three tougher ogres), **the post-battle tax return** (split into two beats), **provisions having
no sink** (the wounded eat), **the map printing event titles before you arrive**, **raw floats in
the report**, **the wood/iron/salvage vocabulary**, and **the emoji being the loudest thing on the
field** (turned down; painted state icons are still #25).

Still open from that playtest, and folded into the entries below: the **map's visual weakness**
(→ #6 — dark, uniform, tiny labels, microscopic legend, the centre card covering the geography)
and **painted morale states** to replace the placeholder emoji (→ #25).

---


## Snapshots kept for the reasoning

#### Combat model as built (v2 — historical; see the concept for what is true now)

> **This section is a snapshot of build v2, kept for the record.** Five of its rules have since
> changed: actions went **3 → 2** per turn (reactions made three impossible to balance); movement
> left the stat block entirely and became **race-based** (ratkin 5 / human 4 / ogre 3 on the first
> move, −1 on the second); **Winds of Magic was cut**; strong abilities now carry **cooldowns**; and
> **nobody on the roster dies** — going down is a scar.

- **3 actions per turn, max 2 of the same.** Replaced AP + fatigue. Heavy abilities cost 2. *(Now 2 actions; captains 3, great beasts declare their own.)*
- **Rabble get 2 actions, your veterans get 3** — the swarm/elite dial.
- **Morale, not fatigue**: Steady → Wavering → Breaking → Routed. Routed units flee the field. *(Still true.)*
- Hex grid, six-way flanking (+15% each), marsh 2 hexes/−10%. *(The ZoC rule mentioned here in v2 was later cut for the engagement/parting-swing model — see the concept.)*
- Armour absorbs before hitpoints. *(Still true.)* ~~Winds of Magic is a per-side pool that ebbs each round.~~ **Cut — casting now costs the caster's own morale.**
- **Verified by automated playthrough**, not by eye: full loop world → travel → event → battle → dialog → epilogue.
- Two real concurrency bugs were found and fixed this way: deferred turn-advances could double-fire and skip a unit's turn, and stale callbacks from a finished battle could fire into a new one. Both are guarded now by stamping every deferred callback with its battle *and* its turn.

#### Note on the browser prototype

The slice is HTML/JS so it is playable instantly with no install, and so design rules can be
changed in seconds rather than in an engine. **Godot 4 is still the production target** — the
prototype exists to find out which rules are wrong while that is cheap. Nothing in it is
intended to be ported line-by-line; the *numbers and the feel* are the deliverable.

#### Open design tension worth watching

**Morale ends fights earlier than a hitpoint-attrition model does** — that is what morale is *for*, but it fights the 6–12 round target. In testing, fights kept resolving at 4–5 rounds by mass rout until enemy Resolve was raised and the surrender trigger was gated (round ≥ 5, and enemies reduced below a third). Worth deciding explicitly: **is the 6–12 band still the goal, or is "the fight ends when a side breaks" the better rule and the band should follow it?** Recommend the latter for standard encounters and a hard band only for bosses, who should not rout.

#### Playtest #2 — outside read of the built slice (2026-07-29)

An external reviewer played the current HTML end to end and compared it against these docs.
Verdict: **~8/10 as a prototype, ~4–5/10 as a public demo** — the systems and the voice are
there, the first twenty minutes are not. The praise worth keeping: the game's strongest asset
is *not the combat*, it is the feeling that specific named people keep having things happen to
them on the road. Sell that, not the system count.

**Fixed in 8f.2:**
- `Cannot access 'hurtLine' before initialization` — THE GROUND OPENS' "leave them" branch was a
  hard crash (temporal dead zone: the strand branch wrote into `hurtLine` above its own `let`).

**Fixed in 8f.3:**
- Literal `{A}` reaching the screen, and ~24 events naming Skree/Bruht/Vesna/Marrow who may be
  absent or dead — both solved structurally by the `cast()` token layer, not by hand-editing.
- Long event cards pushed their own answer buttons below the fold with no visible scroll hint.

**Still open — this is the 8g work list, in priority order:**
1. **Consequence numbers destroy the moral ambiguity.** Showing `+150 crowns · morale −22 · injury`
   before a choice turns a moral decision into an arithmetic one, which directly contradicts the
   §4 rule that the cost is stated *as intent, not as a receipt*. Keep guaranteed material prices
   visible ("Pay 45 crowns"); hide morale, injury and human consequences behind intent-language
   ("The company will remember this").
2. **Travel needs a confirmation step.** First click selects a route, second click moves, and
   nothing says so — a genuine first-minute failure. Show an explicit `TRAVEL — 1 DAY · 1 FOOD`
   button so the player sees the price and commits to it.
3. **Readability.** 8–10px text, brown-on-brown, node labels lost in the map, tiny battle
   figures. Desaturation is a rule for the *world*, not for interactive information — buttons,
   the selected path, the active unit and legal targets need far more contrast.
4. **The stat wall contradicts "people, not stat blocks."** First inventory shows a dozen derived
   values before the player has any reason to care about Vesna. Open with HP, armour, morale,
   weapon accuracy/damage, one signature ability and the personality; move the rest to tooltips.
5. **No random camp incident before Blood on the Road.** A fiddler landing before the reveal
   blunts it. Suppress incidents on the first leg.
6. **Content validation sweep** — a real linter, run over every event against every possible party:
   - literal `{A}` placeholders reaching the screen (seen in THE GROUND OPENS);
   - options that require a race nobody has ("Feed it to the ogre" with no ogre, then text
     claiming Bruht ate it);
   - hardcoded names for people who may not be in the company (Bruht, Skree);
   - hardcoded party sizes ("two of the six", "the fifth") when the company may be 3 or 7;
   - nicknames drawn from the wrong race pool (Vesna "Smallest" Kolb — an ogre nickname);
   - every option executing without an exception.
   With this many combinations this cannot be held by hand any more.
7. **The first battle should sell one unique thing** — a legible backstab, a morale break, a
   surrender — rather than reading as "many rules, like Battle Brothers."

**Positioning note from the same read:** "Slay the Spire structure + Battle Brothers combat" is
clear but not distinctive. The stronger hook is *"Battle Brothers, but every campaign is a
compact roguelike story about the people who survived it"* — ugly memorable faces, heavy road
decisions, personal consequences, and stories the player retells afterwards.

#### Playtest #1 verdicts (user, 2026-07-29)

- Wyrm difficulty: **fine**. Music with chords: **good**. Forced-inventory beat: **feels ok**.
- Fights end **a bit earlier than wanted** → `allyDied` softened −22 → −18. Watch again.
- The final battle (the Snare) is deliberately **no-withdraw** — life or death. All other fights allow WITHDRAW (spoils lost, −20 mood, downed people abandoned permanently).
- Company **MOOD** (map-level) now also matters in battle: a negative mood lowers everyone's starting morale (floor 30% of pool). Per-unit morale remains its own system.

### Reference note — RimWorld

The user has 1000+ hours in RimWorld and named what they want from it: *"stories, world,
interaction — each time unpredictable development."* That is a **systems** target, not a content
target. It is served by: camp incidents naming real party members, randomly rolled recruits,
random promotions, injuries attached to specific people by greedy choices, and a roster that
keeps changing shape. It is *not* served by writing more set-piece prose. When in doubt, add
another thing that can happen to a named person, not another paragraph.
<!-- (steps 9 and 10 were folded into 8b–8d long ago: the character sheet,
     inventory, sfx and hit feedback all shipped there. Rows removed — they
     were orphaned mid-document and read as still-open work.) -->


## The original phase plan

### Phase C — MVP ("Act 1" of the game)

| Step | Deliverable |
|------|-------------|
| 10 | Full Act 1 map (~30-40 nodes, 3 regions) |
| 11 | 6 classes + multiclass rules, levels 1-6 |
| 12 | 12-15 enemy types (ratkin swarms → ogre/cyclops elites) |
| 13 | 10 events + 2 quest-lines + NPC dialogs |
| 14 | Metaprogression v1 (unlocks between runs) |
| 15 | Balance pass + closed playtest |

### Rules we agreed on

- **Small batches.** Max 6-8 assets per art session.
- **Paper before code.** Every system gets a one-page design before implementation.
- **Battles must stay compact**: target 6-12 player turns (skirmish ~4-5, boss ~15), decided by positioning and ability choices, not attrition.

### Reference map (what we steal from where)

- Overworld structure → Slay the Spire / Void Wars (node map), but with quest-lines and non-combat places
- Combat feel → Battle Brothers / Wildermyth (compact, deadly, readable)
- Party & inventory → Battle Brothers
- Classes & multiclass → Wartales
- Metaprogression → Wartales
- Lore/weirdness/artifacts → Caves of Qud
- Story delivery, tone → The Banner Saga
- Art → pixel art between Battle Brothers and Caves of Qud, Banner Saga palette

---

**#46 — One skill per race, and each one is a setup** *(the point is that they change behaviour)*

> ⚔ **THE BATTLE BOARD** — also 🎒 three new acts on the sheet · the token (poison needs a count)
> **SYSTEMS** the `acts` builder (`grimtoll_slice.html:3126`) · the forced-movement block in
> `strike()` · `B.terr`/`BLOCKED` · `losState()` · both brains' scorers · cooldown render
> **RELATED** **#36 built ⇠ supplies `losState()`, which is how the throw's AI knows a rock is
> worth removing** · #47 (the other half of the verb batch) · #45 (adds the payout later — do NOT
> build it early) · #33 (a thrown rock changes the topology *mid-fight*) · #4 (same size/limb
> vocabulary) · #50 ⇠ it is on its entry condition

> ### ⛔ GATE ARTIFACTS — DONE 2026-07-31, and they keep
> **The rules are written out in the block below** (*The rules, settled* — costs, targets,
> cooldowns, the size vocabulary, what each takes away, both brains, the four open scope cuts).
> **The picture is [`shots/46_race_skills.html`](../shots/46_race_skills.html)** — made *in the
> game*, four panels: the three action rows with their cooldown states · the size rule refusing
> an ogre · a boulder thrown and a BLOCKED lane becoming CLEAR · the whole chain in one still.
> The three acts were stubbed into the **live** action row on a real practice-field board, so the
> panel in the picture is the panel that would ship.
>
> **What the picture cost, and it is worth knowing:** `shotBoard()` photographs the field and
> nothing else, which is useless for a gate about a **button**. `tools/harness.js` grew
> **`shotUI()` / `grabUI()`** — the same serialiser plus `#bLeft`, several panels to a file, and
> **every `<canvas>` swapped for an `<img>` before serialising**, because `outerHTML` copies the
> element and not its pixels (the trap that made four of #51's gate pictures wrong). Any later
> gate about a control gets it for free.

---

Race currently decides the body and little else in the verbs list. Each race gets **one signature
action**, and — deliberately — **none of the three is a damage button**. All three exist to make
somebody *else's* action better, which is what makes a mixed company worth assembling.

Definitions in the existing `acts` shape, alongside `hurl` at `prototype/grimtoll_slice.html:3214`:

**HUMANS — KICK.** `cost:1, reach:1, push:1, cool:1`, damage negligible.
Pushes a **human- or ratkin-sized** body one hex. **It does not move an ogre** — the size rule has
to bite somewhere visible, and an ogre shrugging off a kick is the cheapest way to teach it.
Cooldown **1**, so it is available nearly every round: this is a *verb*, not an event. It is the
cheapest displacement in the game and therefore the default setup — kick somebody into the marsh,
out of your spearman's face, **into reach of your ogre so it can pick them up**, or off a friend who
is down.

**OGRES — THROW.** `cost:1, cool:2`. Not a rock-throwing skill — **one general verb.**

> **Pick up anything on an adjacent tile and throw it.** A unit or a rock.

That is the whole rule. The **source must be adjacent**; the destination is the usual throw range.
It absorbs the existing `HURL A RATKIN` (`grimtoll_slice.html:3214`), which stops being its own
action and becomes the case where the thing you grabbed happens to be an ally.

What it can grab: **an allied ratkin** (as today) · **an enemy small enough to lift** · **a rock —
the impassable ones already on the field.** No new terrain type is needed; the boulders are already
there, already in `BLOCKED`, already generated in clumps.

And that last case is the good one: **throwing a rock removes it from the board.** The ogre is the
only unit that can *open a lane* — take out the boulder your archers cannot shoot past, or the one
funnelling the enemy into your line, and the map is a different map afterwards. One body on the
field can rearrange the terrain, which is the most ogre-shaped ability available.

**Size rule:** an ogre cannot throw another ogre. Same rule as the kick, one tier up.

**RATKIN — POISON.** `cost:1, reach:1, cool:2`.
The target takes **+25% damage for two rounds, and it stacks.** Two ratkin make it +50%.

> ⚑ **SHIPPED AT 15%, NOT 25% — the user's call on the day (2026-07-31), after the build.** One
> constant, `VENOM_PER`. Three cuts buy **+45%** rather than +75%. The paragraph below still reads
> as specified; the number it argues about is the one that moved, and the argument holds either
> way — the limiter is the three turns, not a ceiling.

This is the purest synergy skill in the game and it defines the race: individually the weakest body
on the field, and what they contribute is **making somebody else's hit matter.** A ratkin-heavy
company plays completely differently — it spends its early actions buying a single enormous one.

> ⚠ **The stack must be self-limiting, and the honest limiter is the action cost, not a cap.**
> Three stacks means three ratkin spent their whole turn before anyone hit anything. If the target
> moves, dies to someone else, or the line breaks first, all of it is wasted. Let the risk do the
> balancing; only add a hard cap if testing shows +75% deleting bosses.

**Why these three and not three attacks.** Each is weak alone and strong in sequence, and the
sequence falls out of the constraints rather than being scripted. **The ogre can only grab from an
adjacent tile** — so somebody has to *deliver* the target, and the human's kick is exactly the tool
that does it:

> *the ratkin poisons him → the human kicks him into the ogre's reach → the ogre picks him up and
> throws him back through his own line.*

Three races, three turns, one round of setup, and nobody in that chain dealt meaningful damage
except the last one. That is the shape the fights should have — and note that **no rule anywhere
says those three actions combine.** They combine because of where the bodies are.

**Build.** All three go into the `acts` builder beside the class signatures
(`grimtoll_slice.html:3126`), and each reuses a resolver that already exists. **KICK** is the
forced-move block with force 1 and a size gate (`big` targets ignore it, with the receipt line
saying so). **THROW** replaces the `hurl` definition: targeting becomes two clicks — an adjacent
*thing* (small unit, ally or enemy, or a `rock` hex), then a destination in range; the rock case
deletes the terrain entry and lands as a single-target hit. The unit case is `hurl`'s existing
flight-and-landing code untouched. **POISON** is a stack array on the target,
`d.venom.push({until:B.round+2})`, and one multiplier line in the damage calculation,
`×(1+0.25·live stacks)` — plus a green count on the token, because a stacking debuff nobody can
see is a spreadsheet. AI, in both brains: kick scores by what it delivers (hazard adjacency, or
adjacency to a friendly ogre); throw-a-rock scores when the rock stands between own shooters and
their targets (#36's `losState` is the measure, which is why that ships first); poison scores on
high-HP targets early. **Per the gate: one mockup of all three buttons with cooldown states before
any code.**

**Verify.** Size gates hold (kicked ogre does not move, thrown ogre is refused); a thrown rock is
gone from `B.terr` and pathing reflows; poison stacks sum and expire on schedule; both brains use
all three at least once across the regression; cooldowns render.

---

### #46 — THE RULES, SETTLED *(gate step 1, written 2026-07-31; picture: [`shots/46_race_skills.html`](../shots/46_race_skills.html))*

*Everything above is the design. This is the contract — what a session builds, with the numbers,
the edges and the four places scope was deliberately cut.*

**What all three share.** Built in `unitFrom()` beside the class signatures, gated on `p.race`.
**Every race gets exactly one; nobody gets two.** Each is **1 action out of 2** — taking one is
half your turn, and that is the whole price. Each sits **third in the row** (under the weapon,
above the class signature), so it is always the **3** key. **Enemies get them too, by race**, or
the trick is a player toy — enemy ratkin poison you, and enemy ogres already throw.

**SIZE — one new word, and it is the only one.**

| | |
|---|---|
| `sizeOf(u)` | **3** great beast (`u.big`) · **2** ogre (`race==='ogre'\|\|kind==='ogre'`) · **1** everything else |
| both new acts carry | `maxSize:1` |
| the player-facing rule | **an ogre is never moved by anything, and only a great beast could lift one** |

Great beasts are already immovable — the forced-movement block has read `!d.big` since push and
pull shipped. **The refusal is an offer withdrawn, never an action wasted:** the target is not
highlighted, the click does nothing, and the hover readout says why — the same contract as a
BLOCKED lane (*"it is not a very large penalty, it is the absence of an offer"*). Spending an
action to be told a rule punishes the player for not knowing it yet, and this game teaches on
hover. One `whisper()` the first time it comes up.

**1 · HUMANS — KICK.** `{k:'kick', cost:1, reach:1, push:1, cool:1, maxSize:1, aim:10,
dmg:[2,4], am:.15, ft:.35}` — *confirmed unchanged by the user, 2026-07-31: "small damage, one
tile push."*

- **It rolls to hit** — it resolves through `strike()`, which is where the one forced-movement
  block lives, and that block only runs on a hit. A kick can miss, and on a 1-turn cooldown it
  has to be able to. `aim:+10`: it is a boot, not a weapon, and it does not care what is in your
  hands.
- **No destination picker.** The existing block computes the direction from target→attacker and
  walks the opposite way, so **a kick always goes straight back, away from you.** You aim it by
  walking round first — *that is the whole skill of it*, and it is why the cheapest verb in the
  game is still a decision.
- Hex behind them blocked or occupied → they do not move and take the existing wall damage
  (`(want−stepped)×7`). **A kick into a boulder is worth doing**, and that rule already exists.
- Cooldown **1**: use it, warm one turn, ready the next. With the twice-a-turn cap it cannot be
  spammed. This is a *verb*, not an event.
- **Enemies only.** *(Scope cut 1 — the entry's "kick somebody off a friend who is down" opens
  friendly-fire targeting for one line of flavour. Bodies on the ground are decoration, per #48.)*

**2 · OGRES — THROW.** `{k:'throw', cost:1, cool:2, range:4, rockRange:3, maxSize:1}` — **replaces
`hurl` entirely**, along with its AI branch, its whisper key and its `? RULES` line. *Two ranges,
because a body and a boulder do not fly the same distance.*

> **Pick up anything on an adjacent tile and throw it.** Source must be **adjacent**; destination
> is the usual range. Two clicks, exactly as `hurl` reads today.

| what you grabbed | what happens |
|---|---|
| **a size-1 ally** | today's `hurl` flight, untouched: lands, **keeps its own turn**, takes `hpMax×0.06+2` and −6 nerve. *Widened from ratkin-only — a human is size 1, so an ogre can throw Vesna. The size rule already answers it and it is funnier than the exception.* |
| **a size-1 enemy** | thrown as a weapon. **Double the landing knock** (nobody is being careful) and it does **not** get a turn out of it — it is not their turn. Throw them out of their line, or into your own line's teeth. |
| **an INDEPENDENT `rock` hex** | **range 3, not 4.** The boulder leaves where it was (`B.terr[k]='field'`) and **comes back down on the ground somewhere else.** Rolls to hit; decent damage. See the block below — this case has its own rules. |

**THE ROCK — the user's ruling, 2026-07-31.** *(This reverses the first draft of this entry, which
had the boulder shatter. The user's version is better, and the reason it is safe is the first
line.)*

> *"Throwing rock — works only if it is independent rock. It puts it to the ground on adjacent
> tile. Has decent damage and chance to miss. Works when you are near. Has limited reach for
> rock — 3 tiles."*

- **Only an INDEPENDENT rock can be lifted** — a `rock` hex with **no `rock` hex adjacent to it.**
  A lone boulder, never a stone out of a spine or a clump. This is the rule that makes everything
  else safe: **a wall can never be dismantled**, so the connectivity `makeObstacles` flood-filled
  at spawn cannot be opened up into something it validated against.
- **It must be adjacent to the ogre** to be picked up — the same "works when you are near" as
  every other thing it can grab.
- **Range 3, not 4.** A body is thrown further than a stone, which is the right way round: the
  ratkin is aerodynamic and cooperative, the boulder is neither.
- **It rolls to hit, and it hits hard** — `dmg:[22,34], am:1.15, ft:.30`, roughly a warclub, which
  is what it should be. **A miss is a real outcome**, so this is not a guaranteed anything.
- **It always ends up on the ground.** Target a hex within 3:
  - **hex is free** → the boulder lands there. No roll — this is the *rearrange the map* use.
  - **somebody is standing there** → roll to hit them for the damage above, then the boulder
    **comes to rest on the nearest free hex beside them, on the far side from the ogre** — it
    landed past them. Hit or miss, it comes down.
  - **no free hex beside them at all** → the boulder shatters. One edge case, one line, and it is
    the only way a rock ever leaves the board.
- ⚠ **PROPOSED, not asked for — cut it if you disagree:** *a boulder may not be set down adjacent
  to another rock.* That keeps the user's own rule true for the whole fight instead of only at
  spawn — every boulder on the field stays independent, so the ogre can never build the wall it is
  forbidden to take apart, and one placed hex can never seal a corridor the generator validated.
  Without it, "independent rock" is a condition that decays as the fight goes on.
- **So the ogre rearranges the map, in both directions**, which is the most ogre-shaped ability
  available and was the entry's own claim. It opens the lane your archers cannot shoot past **and**
  drops the stone where it will be in somebody's way.
- **This is the case #36 shipped for.** `losState()` is how the AI knows *which* rock is worth an
  action — and now, also, *where putting one down is worth it*.

**3 · RATKIN — POISON.** `{k:'venom', cost:1, reach:1, cool:2, venom:2, dmg:[2,5], am:.10, ft:.50}`

- **It rolls to hit.** It is a cut; a miss wastes the action. *The risk is the balance* — the
  entry's own instruction.
- On a hit: `d.venom.push({until:B.round+2})` → **+15% damage taken per live stack, two full
  rounds, stacking, no cap** *(specified at 25%, **shipped at 15%** — the user's call the same
  day; `VENOM_PER`)*. Two ratkin make it +30%, three +45%. The limiter is the action cost and the
  clock: three stacks means three ratkin spent their whole turn before anybody hit anything, and
  if he dies to somebody else first, all of it was wasted.
- **It is not a damage-over-time.** One idea, one rule.
- **It raises what EVERYBODY does to that body** — including the ratkin's own next swing, and
  including their own side's sweep catching a poisoned friend. That is correct, and it is a good
  detail.
- **One line in `dmgMul(a,d,act)`** — the function `strike()` *and* `dmgPreview()` both call.
  ⚠ Anywhere else and the readout starts lying: *"a readout that does not apply a global
  multiplier is a lie that survives for months."*
- **It shows on the token**: a green **☣ with the live stack count**, declared once in the
  `STATUS` register so the badge, the unit panel and the hover readout cannot drift apart. The
  badge needs one small change — a status may now carry a **count**. It ticks on the poisoned
  body's own turn, by round number, like `crippled` and `rooted`.

**What each takes away.** Nothing is removed from any class. **The cost is the action**, which in
a two-action game is half a turn, plus the cooldown. A ratkin who poisoned did not attack; a human
who kicked did not swing; an ogre who threw a rock did not club anybody. *That is why all three
have to be worth more in sequence than alone* — and they are, without a single rule saying they
combine.

**Both brains — `aiTurn` AND `autoStep`, or AUTO silently stays stupid.**

- **KICK** scores on what it *delivers*, never on its damage: large when the hex behind the target
  is marsh or beside a fire · large when that hex is adjacent to a friendly ogre with THROW ready ·
  moderate when it strands the target away from its own line (the `pull` scorer's `wouldStrand`
  logic, same shape, opposite sign) · moderate when the hex behind is blocked (the wall damage).
  Otherwise ~0, so a bored AI does not shove people about for nothing.
- **THROW** scores three ways: a **rock** when `losState()` says it blocks a lane from one of my
  shooters to one of their targets · an **ally** as today (lands where it could not have walked,
  beside something soft) · an **enemy** when the landing takes them out of their line or into my
  line's reach.
- **POISON** scores on high-HP/high-armour targets early, ~0 on something dying this round, and
  refuses a target already carrying 2+ stacks unless nothing else is on offer.

**Two more scope cuts, named so they are not rediscovered.** *(2)* No new terrain type, no new
`? RULES` page — the throw absorbs `hurl`'s. *(3)* **No marks and no follow-up bonus** — #45 is
deferred into #50 and these three verbs were only ever *enhanced* by it. Build them plain; all
forced movement keeps resolving through the one block in `strike()`, which is where the mark will
later be set, so nothing here has to be revisited when it lands.

**Two icons want adding to `ICON`** — KICK and POISON both fall through to the generic `⚔` today,
which the gate picture shows.

---
