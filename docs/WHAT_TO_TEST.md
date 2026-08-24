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
> **⚑ Cut three times, on 2026-08-10, 2026-08-14 and 2026-08-19**, because a bench that runs to
> thousands of lines is longer than anybody reads with a game running. The first cut took everything
> from 2026-08-02 and earlier; the second took 2026-08-11 and earlier; the third took 2026-08-16 and
> earlier, most of which later rounds of the same screen had already replaced. **What is left below
> is the last three days of the build, newest first.**
> Nothing was copied into a second file: [Everything older](#everything-older) has the one command
> that brings any of it back out of git.
>
> **The other docs are unaffected.** [`README.md`](README.md) is orientation ·
> [`00_PLAN_AND_BACKLOG.md`](00_PLAN_AND_BACKLOG.md) is the work ·
> [`CHANGELOG.md`](CHANGELOG.md) is the record. This is the **test bench**, and it is the only one
> written to be read *while playing*.

---

## 🗺 THE GROUND GOES ON PAST THE FIELD  *(#241 · 2026-08-24 · build log 8f.264)*

**Three steps:** start any fight (the road, or ⚙ TEST > a battle) · press **CLOSE** top right ·
walk somebody down to the bottom rank and look at where the skill cards are.

**What it is.** The painted ground now runs one hex above the field, two below it and three either
side. That band is not marked out into hexes, nothing can be clicked there and nothing can walk
there: it is scenery, and it is what the floating chrome is meant to sit on from now on.

| | what should happen |
|---|---|
| **FULL** | exactly what it always did, to the pixel. The board is in the same place and the same size; what changed is that the empty gradient down both sides is ground now |
| **FIELD / CLOSE, a body at the bottom rank** | the last row of hexes sits **above** the skill cards instead of behind them. Measured: 41px clear at FIELD, 60 at CLOSE, against a 100px overlap before |
| **FIELD / CLOSE, a body at the left rank** | the order rail on the left stands on bare ground rather than on hexes |
| **dragging the board** | still refused at FULL (there is nothing to look around at), and at the two closer stops it now stops with the apron's outer edge on the screen edge rather than the field's |
| **a boulder shoved, ground changed mid-fight** | the band redraws identically. Grass and stones must not jump about |

**What would be a bug:** a hex you can stand on out in the band · the band ending in a hard line
rather than fading · the board jumping when you let go of a drag · anything on the field itself
having moved at FULL · the tap-room brawl showing grass around the floorboards (it should be the
same boards, going dark).

⚡ **One thing to judge and it is yours.** You asked for two things in one breath - *чуть
выходящие квадратики* (tiles sticking out past the field) and *они не размечены* (they are
not marked out). **Bare ground shipped**, on the second sentence. If you wanted to SEE the tiles
out there, say so: `APRON_LATTICE` is one number (0 now; .05 is a whisper, .10 a lattice) and it
draws the apron's hexes as outlines under the same fade. Still nothing to stand on either way.

---

## 🧾 NINETEEN SMALL THINGS, BY SCREEN  *(#240 · 2026-08-24 · build log 8f.263)*

*Your second list of the day, grouped by screen the way the last one was. **Two of them turned out
to be reports about something the build was not doing at all** and both are at the bottom.*

### THE BATTLE · reach it: any fight

- **A ring of bodies no longer helps an arrow.** The aiming card's `surrounded` row is gone from
  every SHOT and every working, because the bonus itself is gone from them: a crowd is worth
  something to the blades standing in it and nothing to somebody aiming from four hexes away.
  Nothing changed for a sword.
  *A bug would be:* the row still appearing on a bow, or disappearing on a melee swing.
- **A spear reaches round the corner of a tree.** Stand two hexes from somebody with an oak between
  you: if the tree is on ONE side of the bend the point gets there, and only a tree on both sides
  (or a tree straight between you) refuses it.
  *A bug would be:* the same board refusing the spear one turn and allowing it the next.
- **Standing in fire costs 6 and carrying it costs 3** (it was 4). And the enemy now goes round it:
  a foe will only end its turn in the fire when the fire is the only ground that reaches anybody.
- **In a big fight they hold on longer.** What a death costs the survivors is now a fraction of the
  line they started as, so an eight-dog pack or a seven-body sling-line feels each one less than a
  company of five does. **A company of five or fewer is exactly unchanged.** Measured over 16 runs a
  side: 1.25 fewer dogs run away, 1.25 fewer ratkin, and your own casualties within a quarter of a
  body of where they were.
- **The rat sling-line stops charging.** They now group up and wait where they were dealt, the two
  spearmen stand in front of the shooters and brace, and YOU cross the open ground. Driven: every
  slinger held at column 13 and both spears at 12, where before the whole line crossed three columns
  in the first two rounds.
  *A bug would be:* them standing still while you also stand still and nothing ever happening - they
  will still come at you once nothing of theirs can shoot.
- **One mood animation per blow.** Three separate morale charges from one hit now show as ONE arrow
  with the total on it, instead of three numbers stacking over the same head.
- **The ogre can throw one of yours AT somebody.** Pick up an ally, and an enemy's own hex is now a
  legal landing: the throw always connects, the enemy takes a bump, and your body comes down on the
  far side of them with its own turn still in hand.
  *A bug would be:* the enemy hex being offered when there is no free hex beside them to land on.
- **The Fen-Mother comes when you hurt the cub.** Hit it and she drops whatever she was walking
  toward and goes to it; once she is beside it she is a lindwurm again. Hurt it a second time and
  she comes a second time.
- **The enemy's hover card never runs under the row of skills.** It now uses the space beside the
  row instead of being squeezed above it, so even a body carrying every status in the game gets a
  card you can read.
- **Sound and music are two switches.** ♪ is the effects, ♫ is the recordings, and on the board they
  are a column above ⏱ SPEED. Each is remembered on its own.

### THE ROAD · reach it: the map

- **THE STEADING-LINE counts correctly.** The card says *four of them* to a company of five and
  *five of them* to a company of six or more, because the fight fields a fifth ogre at six. Both the
  paragraph and the door label read the same number the field will.
- **Three artifacts are event-only now.** The Bloom-Stem, the Pedlar's Charm and the Rosined String
  can only come from the card that hands them over - they are out of the find pool and out of both
  shop racks, the way the Fen-Mother's Tooth already was.
- **The ! on the sack only lights when something ARRIVES.** It used to be on for most of the run,
  because it was answering *is anything in the cart better than what somebody is wearing* - which
  stays true once it is true. Now it fires when the road hands you kit and goes out when you leave
  the sheet.

### THE COMPANY SHEET · reach it: the sack on the road bar

- ⚠ **Known, and it was there before today:** the ♪♫ pair sits in the bottom-right corner of the
  sheet, over the stash list. With a full cart it covers the right ~105px of the last row (the old
  single button covered ~50px of the same row). The row still opens from anywhere else along it.
  *If it gets in the way, say so* - the honest fix is moving the pair off that screen, which is a
  decision rather than a tidy-up.

- **The four stat rows say STR · AGI · INT · MOR.** The long words are gone and the three-letter
  label stays, which is your own correction after seeing them deleted outright. The column went 78px
  to **30** and the other 48 went to the word beside the picture: **Skree's and Bruht's tells were
  clipping on the shipped build and are not now.**
  *If you would rather have no label at all after all,* it is still one `false`
  (`SHEET_STAT_WORDS`).

### THE MUSTER · reach it: the muster field node

- **Every stranger shows their four stats as four pictures.** Three candidates side by side are
  twelve marks in three rows, which is a comparison you can make by eye; the words are still on the
  name's hover where #197 put them.

### THE CROSSBOW · reach it: put one on an archer

- **The winding pays for ONE discharge.** It starts the fight wound; a shot OR a skill empties it;
  winding costs one action. Before this, CRIPPLING SHOT did not empty it, so one crank fired twice.
- **And an archer holding a crossbow gets a different signature: PUNCH THROUGH** - half again the
  damage and it opens armour, on a two-turn cooldown, instead of CRIPPLING SHOT. Same rule as the
  spearwoman's halberd: the weapon decides the signature. With a bow, CRIPPLING SHOT is unchanged.

### BETWEEN RUNS · reach it: finish a run, or the menu

- **The end-of-run screen is THE OLD CAMP, not THE WAGON.** The wagon is a fact about the run you
  are in (#238), so the paragraph about the mule, the `Wagon bed` row and the empty `⚙ THE FITTINGS`
  station are gone. The bank, the forge and the roster are untouched. The menu row is *The old camp*.

---

### ⚑ THE TWO THAT WERE REPORTS ABOUT SOMETHING THAT WAS NOT THERE

- **"the flower stem is bloom-only, as it is now"** - it was not. Fourteen items are handed over by a
  card and only four were flagged as one-of-a-kind, so the stem, the charm and the fiddler's string
  could all be rolled into a shop rack or a battlefield find. They are flagged now. The other seven
  are ordinary kit a card happens to give you (mail, plate, a dirk) and they stay in the pool.
- **"at the start of the fight the crossbow is wound"** - it already was. What was missing was the
  other half of the same sentence: the skill was not spending the winding.

---

## 🧾 TWENTY SMALL THINGS, BY SCREEN  *(#239 · 2026-08-24 · build log 8f.262)*

*Your own list, in your own grouping. Three of them were **checks** and the answers are at the bottom.*

### THE MAP · reach it: start a run
- **The Snare** (the trophy node) is now **exactly as faded as every other place you have not been**,
  painting and name plate alike, and **the gold cup above it stays bright**. It lights up normally the
  moment a road actually runs to it.
- *A bug would be:* the cup dimming with the node, or the Snare still being the brightest thing on the map.

### THE BATTLE · reach it: any fight
- **Pick the spear (or any melee card) and the board shows its reach and nothing else.** The teal walk
  preview goes out while a blow is in hand - it was showing you ground a click would have refused anyway.
  This is why the bow "worked" and the spear did not: the bow's range simply covered the whole walk.
- **Dogs and beasts no longer wear a monster face** on the class line or over their heads. They still say
  PACK-BEAST, MIREHARE, FEN-THING. **The Fen-Mother and the Thing in Armour keep theirs.**
- **"They are all running" now waits a full round.** Everybody has to still be running on your NEXT turn.
  If one of them rallies, the clock starts over.
- **A body is drawn holding what it is holding.** Give an ogre spearwoman a warclub and the figure on the
  board AND on her sheet becomes the club-carrying ogre. Give anybody a bow and they draw as an archer.
  **The Captain, Asha and the casters never change** - that was your exclusion.
- *A bug would be:* a sword or an arrow glyph appearing over a dog · the running offer on the first turn
  they break · a body losing its picture entirely after a weapon swap.

### THE FIRST FIGHT · reach it: new run
- **When the barman comes over his bar, nobody else comes.** No knife off the street that round, and your
  three crew do not stand up the round after. You finish the room with the barman.
- Vesna, Marrow and Ilka are still in the company afterwards - they always were, they simply do not join
  the brawl any more.
- *A bug would be:* the fight not ending when the last carter goes down · a fourth enemy arriving.
- ⚠ **This is the one to tell me about.** Driven 50 times a side, the fight is the same length and leaves
  the Captain at the same fraction of his blood - but the machine loses it 7 times in 50 against 4 before.
  That is inside the noise at 50 runs. **If it feels harder, say so and it comes back to 3 waves.**

### AFTER A FIGHT · reach it: win one where somebody breaks and lives
- **The prisoners are worth what is actually kneeling there.** One ratling (the chase) pays **+8 crowns
  +1 salvage** to strip and **+15 +2** to finish, **and no gem**. Four of them pays +32/+2 and +60/+4 and
  a gem. Letting them go is +14 morale whoever they are - that price is about the decision, not the count.
- *A bug would be:* a gem on a single prisoner · the figures on the button disagreeing with the chips.

### THE PURSE · everywhere
- **Salvage above 3 pays half.** A card that says it will give you +12 gives 6; a card that gives 3 still
  gives 3. The button already says the halved figure, so what you read is what you get.
- **Measured: a run that takes salvage when it is offered now ends on about 23-24 instead of 42.**
  ⚠ **The wagon is still 6 / 12 / 24, on your call.** So the third seat tier is now something almost
  nobody reaches, and the second is a late-run goal. Say the word and it becomes 4/9/18 or 3/6/12.
- **Experience is 20% slower**, everywhere - fights, road cards, camps.
- **Every level is now worth something by itself: +5% hitpoints, +1 to hit, +1 dodge.** A level-4 body has
  +15% blood over a level-1 one before a single point is spent.
- **A cut gem gives exactly one level's worth of experience.** If you were 60% through the level, you come
  out 48% through the next one - your progress is no longer thrown away.
- ⚠ **Two hitpoint numbers on the sheet will look different to you and both are corrections.** The sheet
  was printing the bare stat curve and ignoring your gear, an open wound, and the 10% shooters and casters
  pay. Ilka now reads **45/45** on her sheet, which is what her battle plaque has always said.

### THE SHOPS · reach it: the quartermaster's cart at the muster, and Coldharrow
- **Both racks now roll three pieces: one common that is never a main-hand weapon, one rare, one epic.**
  Every price is derived, so anything in the game can turn up.
- **Coldharrow buys in one click.** All three pieces are on the card itself; clicking one buys it. He still
  only sells you ONE thing.
- **Every shop row now says `COMMON · OFF` or `EPIC · MAIN · TWO HANDS`**, and the name is in its tier's
  colour, the same as in the inventory.
- ⚠ **Coldharrow has lost its painting** and its opening paragraph now scrolls in a short box. Three
  pictured rows do not fit under it: with the picture the card overflowed by 165px and the prose was
  crushed to nothing. The picture it was showing was the old Ratkin Snare plate, which no card uses any
  more. It comes back the day Coldharrow gets its own.
- *A bug would be:* "Back to the road" not visible · a piece you cannot afford not saying so · the same
  piece on the rack twice.

### THE COMPANY SHEET · reach it: INVENTORY
- **The road bar's readouts are on this screen now**: bodies, seats, the sack, payday, the mood face, the
  blood, and the four resource figures, all live, all with their hovers, on the header you already had.
  They go back to the map when you leave.
- **A two-handed weapon and the off hand now actually fight over the hand.** Put a warclub on somebody
  wearing a shield and **the shield goes into the stash**. Put a shield on somebody holding a warclub and
  **the club goes into the stash**. Nothing is ever destroyed by this - it goes to the stash.
- **BREAK SOMETHING DOWN**, bottom right of the stash. It turns the list red; each row then shows what it
  would pay and asks before it does it. **Common: 10 crowns. Rare: 25 crowns + 2 salvage. Epic: 45 crowns
  + 3 salvage + 1 gem.** That is 10-16% of what the same piece costs in a shop, which is the point.
- *A bug would be:* the header wrapping or the two buttons being pushed off the right · a piece
  disappearing without the confirm · breaking something down not moving the figures in the header.

### THE THREE CHECKS YOU ASKED FOR
- **Do scars really cut stats?** **Yes, all the way to the field.** A gut-wound takes Vesna STR 9->8 and
  AGI 9->8, and that becomes hitpoints 57->53, to-hit 69->68, dodge 15->14, damage bonus 3->2.
- **Can a spear reach and a bow shoot across shallow water?** **Yes, and across the fen's deep water too.**
  Both read exactly like open ground; a tree is what refuses them.
- **Does picking a spear show its range?** It always drew one - and the walk preview was drawn on top of
  twice as much ground, brighter. Fixed, and the fix costs the bow nothing.

### AND
- **'Fairy Tail' is in the ratkin name pool.**

---

## 🛒 THE WAGON IS ON THE ROAD, AND SALVAGE HAS SOMEWHERE TO GO  *(#238 · 2026-08-23 · build log 8f.261)*

**Reach it in three steps:** start a run -> on the map, press the cart chip right of the chest (the ▤ salvage
figure and THE WAGON in the company sheet's header open the same card) -> the card.

**What changed, and what should happen**
- The card: a title, two lines, `SEATS · BOLTED IN`, and **five tiles**: THE FRAME across the top with three
  pips, then THE BED · THE MEDICINE CHEST · THE COOK-FIRE · THE RELIQUARY. Each tile is a picture box
  (the glyph until the icons land), the name, the price in ▤ and ◈, and one line of what it does. Hover a
  tile for the long version.
- Prices: the frame **6, then 12, then 24 ▤** for **+1, +2, +2 seats** (13 -> 14 -> 16 -> 18); the bed 8 ▤;
  the chest 5 ▤ 2 ◈; the fire 8 ▤; the reliquary 6 ▤ 2 ◈. A tile you cannot pay for is grey and says
  why. A bought tile is green-edged and says BOLTED IN. Everything on the card costs 69 ▤ and a run finds
  about 30, so you are meant to leave most of it.
- Buying the frame: the seats figure on the bar (8/13) moves at once, a pip fills, the card's prose becomes
  the note for what you bought.
- The **!** on the chip is lit when you can afford something you have not bought and have not looked at the
  card since the chest last changed; opening the card clears it. It never lights for a thing you cannot pay.
- **Gone:** the wheelwright row in Coldharrow, and the BOLTED IN and THE BED stations on the between-runs wagon
  screen. **The fittings no longer carry across runs**: a new company starts bare, and a fitting bolted in
  permanently by an earlier run is gone. The seat widening an old village purchase paid for is still honoured.
- The effects are the old ones, bought earlier: the bed mends the worst-hurt on every leg (the road names who
  had the cot), the fire pays +3 morale at every stop and one provision off a feast, the chest's one scar
  removal is on the sheet, the reliquary is +10 maximum morale in every fight.

**What would be a bug**
- the chip touching MENU or the chest on a full bar (many bodies, UNPAID, a pet, relics)
- the card scrolling, or a tile cut off
- the ! lit with nothing affordable, or still lit after you opened the card
- the seats figure not moving after a frame purchase, or moving back after a reload
- the wagon opening on top of a road card (it should do nothing while a card is open)
- the village still offering the wheelwright

**What I want from you:** whether the first frame feels like an unlock at the first muster, or whether you
never hit the seat cap anyway (then the lever is the base 13, not the wagon); and whether ~30 salvage a run
against 69 on the card reads as a choice or as starvation.

---

## 🗺 THE MAP IS REPAINTED, AND EVERY PLACE ON IT HAS A PICTURE  *(#237 · 2026-08-22 · build log 8f.260)*

**Reach it in three steps:** start a run -> you are on the map -> press ROAD to see the whole thing.

**What changed, and what should happen**

- **The ground is your new painting.** Same size as before, so nothing moved and nothing should be
  blurrier than it was.
- **Five places that used to wear an abstract mark are painted now**: Grausen Hold, the Roadside
  Fire, the Muster Field, Coldharrow, and the Last Muster. There should be **no abstract glyph left
  anywhere on the map**.
- **They are drawn smaller than an event on purpose** - 64px against 96 - because a place you pass
  through is not a thing that happens to you. If they read as too quiet, that number is one line.
- **A bug would be:** a place picture on a node that is not one of those five; a name plate sitting
  on top of a painting or on another node's; or the Last Muster looking different from the Muster
  Field, since both use the same picture.

---

## \u2694 THE BOARD SAYS ONE NUMBER PER BODY, AND THE BAR SAYS *AT LEAST THIS MUCH*  *(#236 \u00b7 2026-08-22 \u00b7 build log 8f.259)*

**Reach it in three steps:** start any fight \u2192 pick a skill (or just hover one) \u2192 move the pointer
across the enemies in reach.

**What changed, and what should happen**

- **No damage number on anybody, ever.** The red `20-29` over the body you were pointing at is gone.
- **The % moved down into that slot and is on every foe you can reach**, over the chest instead of
  over the head. This is your *"they look better there"* - tell me if a three-character figure ever
  runs into the weapon badge on the right of a hex.
- **The health bar under the body you are pointing at now shows the RANGE.** Solid = the damage you
  are certain of (the minimum roll), with the bright line marking where the bar ends if the dice go
  badly for you; hatched = the extra you might get, up to the maximum. If the whole bar goes solid,
  the swing kills whatever it rolls.
- **A bug would be:** a damage figure surviving anywhere on a body; the % sitting on the head again;
  a hatched band on a flat-damage weapon (there is nothing to be uncertain about, so there should be
  no hatch); or a band that reaches past the left end of the bar.

**And three off the board**

- **Hover any item, anywhere** - the stash, a worn slot, the shop, the aftermath. The card now opens
  with `COMMON \u00b7 ARMOUR`, `EPIC \u00b7 MAIN \u00b7 TWO HANDS`, `RARE \u00b7 MAIN`, in the tier's own colour. It said
  neither of those before, while the row you were hovering said both.
- **Nothing epic in armour, and no stave, can be FOUND until you are past Blood on the Road** - and
  not on that fight either. After it, both are back in the pool. Authored rewards are untouched: a
  card that hands you something still hands it to you.
- **Marrow starts with an empty off hand.** The chalk-and-cord rod is still in the game and still on
  Coldharrow's rack at 80 crowns; he just is not holding one before anybody has asked what it does.

---

## 🧰 NOTHING SHOULD LOOK DIFFERENT, AND THAT IS THE TEST  *(#235 · 2026-08-22 · build log 8f.258)*

**Reach it in three steps:** open the game → play a few minutes → look at the pictures.

**What changed, and what should happen**

- **The paintings moved out of the working file.** 88% of it was two generated blocks of base64;
  they are two files under `art/embed/` now and the build pours them back for the page you play.
- **So the answer to both of your questions is yes.** The page on the link is still ONE
  self-contained file - measured, 350 paintings in it, the same 350 as before - and the itch zip is
  built by the same script and is unchanged. Nothing about uploading or packaging is different.
- **What you should notice: nothing at all.** Same art, same map, same portraits, same item icons,
  same event stages.

**What would be a bug**

- **Any painting missing** - a blank event card, a flat-coloured map, a token with no picture, an
  item slot showing a glyph where a painting used to be. That is the one failure this change could
  cause, and it would be obvious rather than subtle.
- The MENU background not painted on the front door.
- Anything at all in the itch build that is not in the web build.

---

## ⚔ THE BOARD ANSWERS AGAIN, THE BLOW SHOWS ON THE BAR, AND THE SHEET'S HEADER IS REBUILT  *(#234 · 2026-08-22 · build log 8f.257)*

**Reach it in three steps:** start a run → walk into any fight for the board half → BACK TO THE ROAD
and open the company sheet for the rest.

**On the battlefield**

- **The hit % is back on every enemy you can already reach**, with MOVE standing and no card
  picked. It is still measured from the hex you are ON: a foe you would have to walk to first
  carries no figure, and never did.
- **Hover an enemy and the blow is drawn on their two bars.** The part of the shell and the part of
  the flesh that this swing would take goes *pale and warm*, with a lit line marking where the bar
  will end. The exact pair (`21-30`) stays on the hex; the band answers the other question, which
  is *does this finish it*. Only the one you are pointing at gets it.
- **The morale banner sits 3px further right** than it did, clear of the body.
- **SHAKEN now flies a flag too**, and the three that fly one are three different weights: Shaken is
  faint, Breaking is half-out, Broken is fully out. Ok and Happy are still bare on purpose.
- **When you hold the pointer over ground a step would be paid for**, the enemy who gets the free
  swing now *breathes red* the way your own acting body breathes ivory, and the `⚔ 60%` under your
  feet says what stepping off costs. Move the pointer off that ground and both go at once.
- **On the enemy's turn none of it is on screen** - no percentages, no bands, no red breathing.
  Same while anybody is mid-walk.
- **When something kicks, shoves or hooks you, the thing that did it says so.** `KICK` in dusty gold
  over the kicker, beside the `SHOVED` over you. Only forced movement does this; an ordinary sword
  swing still says nothing.

**In the fights themselves**

- **The chase (The Alder Cut, four out of the tap-room):** the ratkin carries a **short knife** now,
  reach 1. Nothing in that fight drags you out of your line any more. The pole is still waiting at
  the Snare, later.
- **The tap-room brawl:** when the barman comes over the bar, **the fifth man does not cross the
  room on that round.** He stops just inside the door and looks at it first, and the log says so.
  Walk up to him and he fights back at once.
- **Help the ratkin at Blood on the Road** and Skree joins as an **archer with a hunting bow**, not
  a knife. Asha is unchanged.

**On the company sheet**

- **The portrait is bigger** (104x80 where it was 94x74) and **the field figure has lost its box and
  its ON THE FIELD caption** and is 20% larger, standing in the air at the right of the header.
- **There is more air between the blocks.** Measured, every body has more room than it did, and the
  two states that used to scroll 15px now scroll 5.
- **The Captain's trait is `Experienced`, +1 STR and +1 MOR**, with no armour condition. His MORALE
  tell should read one band better than it used to while he is in the padded jack.
- **Every item name is in its rarity's colour**: white common, green rare, purple epic. Worn slots,
  the stash, the shop rack, the hover box, and what a fight hands you.
- **CUT A GEM is not on the sheet at all when you hold no gems.** Pick one up and it appears, live.
- **The three weakest INTELLECT pictures are smaller and flatter.** Hover INTELLECT to see the whole
  nine-rung ladder at once.

**What would be a bug**

- A percentage on an enemy you cannot actually reach from where you stand.
- The damage band on more than one enemy at a time, or on one you are not pointing at.
- The band reading as *empty bar* rather than as *this is about to go*.
- Anything red or any percentage still on screen while an enemy is taking its turn.
- `KICK` printing over an ordinary sword swing.
- The company sheet scrolling on a body with nothing special about it, or the figure in the doll
  box painting across the SKILLS caption.
- A common item name that is green or purple, or a name that stayed gold.
- The tap-room's fifth man standing there being hit and not swinging back.

---

## 🗺 A NEW WORLD MAP AND SEVEN NEW FACES  *(#233 · 2026-08-22 · build log 8f.256)*

**Reach it in three steps:** start a run → you are on the map → open the company sheet for the faces.

**What changed, and what should happen**

- **The world map is a new painting**, and it is the first one big enough for the screen: 2560x1276
  against a canvas that has been 2560 wide since #223. **At the NEAR and CLOSE camera stops it
  should look sharper than it ever has**, because the picture is finally being shrunk to fit
  instead of stretched. Cycle ROAD / NEAR / CLOSE top-right and compare.
- **Nothing moved.** Same aspect ratio, so every node, road and name plate is exactly where it was.
  The three map counters read 0 / 0 / 0 and no road crosses a painting.
- **The darkening is unchanged and that was a decision, not an oversight.** Measured on the live
  canvas, the new painting sits at median luminance 46 where the old one sat at 61 - and the name
  plates were designed against a ground of 48. **If the names are hard to read it will be because
  the new painting is busier under them, not because it is brighter.** Say so and the plate backing
  is the thing to change.
- **Seven portraits are repainted**: the Captain, Vesna Kolb, Skree, Bruht, Marrow, Ilka Renn and
  Wynn Aldreth. Look at them in the roster (48px), on the sheet (94px) and in a dialogue.
- **Asha is deliberately untouched**, along with the two retired portraits and the moustached
  ratkin. Verified byte-identical, not just looked at.

**What would be a bug**

- A face that is unrecognisable at the 48px roster bust, or two that read as the same person.
- Asha looking different from before.
- A name plate on the map that is now unreadable - worth reporting with the node name.
- The map looking *softer* than before at the CLOSE stop. That would mean the new file is not the
  one being drawn.

---

## 🙂 IT IS CALLED MOOD NOW, THE CAPTAIN HAS HIS OWN TRAIT, AND THE STAT BLOCK IS RE-LAID  *(#232 · 2026-08-22 · build log 8f.255)*

**Reach it in three steps:** start a run → open the company sheet (the roster on the left) → you are
looking at the whole of it. For the battle half: any fight, and read the plaque bottom-left.

**What changed, and what should happen**

- **The word is MOOD.** The sheet's third bar, the battle plaque, the aiming card's two rows, the
  ladder hover, every skill's cost line, the RULES page (*HOW MOOD WORKS*), the tavern's teaches.
  **A bug is any surface still saying NERVE.**
- **Hover the MOOD row on the sheet.** The ladder is five rungs and each one now says only what it
  costs. Under it, three lines: what it starts at, what puts it UP (+10 / +30), what puts it DOWN
  (−14 / −5). **Those figures are read off the game's own table**, so if one is wrong the game is
  wrong, not the caption.
- **The teal banner is on IT ROCKS alone.** Happy has no picture. The three white flags below are
  unchanged. On the battlefield nothing moved at all.
- **The Captain is ★ CAPTAIN**, the same star he wears on the board.
- **His trait is SLEEPS IN THE HARNESS**: +1 STR and +1 MOR, and **−2 MOR in anything under HEAVY**.
  He starts in a padded jack, so he starts at the penalty: MORALE reads *Fairly brave*. **Put plate
  on him and it should go to *Steady*.** That is the trait working.
- **The block under ARMOUR / HITPOINTS / MOOD** now holds ACTIONS, the weapon, TO HIT, DODGE and
  STEP, in the space that used to be empty. The four attribute icons and the four words should each
  start on one straight vertical line, on every body in the party.
- **THE BODY caption is gone**; **WHAT THEY CAN DO is SKILLS**. On a skill card the damage sits
  under the name, the way it does on the battle card - not in the corner on top of the icon.
- **The little battle figure moved** from under the portrait to the far right of the header.
- **The stash starts with the cook-pot only.** Marrow's short sword is not in it any more.

**What would be a bug**

- Any readout still saying NERVE, or a place where MOOD and morale read as the same number (they are
  not: MORALE is the capacity, MOOD is what is left of it).
- A skill card whose damage overlaps its icon, or whose role word is painted over.
- An attribute icon that does not line up with the three above it.
- The Captain's morale NOT changing when you move him between light and heavy armour.
- A sheet that scrolls on a plain level-1 body. It should not; the worst case measured 32px of room
  to spare.

---

## ⚑ EVERY STAT HAS A PICTURE NOW, AND IT CHANGES WITH THE WORD  *(#230 · 2026-08-21 · build log 8f.253)*

**How to reach it in three steps:** open THE COMPANY (the roster button on the road) → look at the four
stat lines on the right of the head → hover one of them.

**What it is.** The icons you sent, all four sets, wired to the nine bands each stat already had.

- **an arm for STRENGTH, boots for AGILITY, a brain for INTELLECT, a heart for MORALE**, at 32px beside
  the word. Two of the four had a 16px picture before and two had nothing.
- **nine steps per stat, and the picture is the word.** The boots go broken clogs → repaired → leather
  → winged with a yellow trail; the arm goes thin to red and swollen; the brain goes shut and grey to
  crowned; the heart goes cracked husk to gold.
- **hover a stat and you get the whole ladder**, all nine pictures with their words, the one you are
  standing on lit. That is the surface the art really pays on.

**What should happen.** The picture and the word always agree, on every body and every band. A strong
ogre and a strong ratkin show the same arm: the picture says what the RUNG is, never who is standing
on it.

**What would be a bug.** A picture one step off its word - the commonest way this breaks is the order,
because the files ship weakest-first and the sheet reads strongest-first. Anything blurry or smoothed:
these are pixel paintings drawn at exactly their own size and nothing may resample them.

**⚠ THE ONE THING TO JUDGE, BECAUSE IT COST SOMETHING.** At 32px the four rows are nearly twice as tall
as they were, and that column measures exactly its window with nothing spare. It was paid for by
tightening the gaps between the blocks on that screen. **Two states now scroll a few pixels** rather
than fit: a body with a promotion point banked (8px) and a body wearing THE CIRCLE (21px). Before this,
the sheet did not scroll - it silently painted the figure over the SKILLS label instead, which HEAD
still does on a CIRCLE body with a point banked. **If the tighter sheet reads worse to you than the
bigger icons read better, say so: 26px removes all of the pressure and 24px gives the old air back.**

## ⚑ THE FLAG MOVES OFF THE HEAD, AND THE NERVE LADDER LOSES A RUNG  *(#228 · 2026-08-21 · build log 8f.251)*

**How to reach it in three steps:** start any fight → click a body and look at the NERVE line, then hover it for the whole ladder → let somebody's nerve go and watch the flag over them.

**What it is.** Your four notes on the flag and the ladder.

- **the flag stands to the right of the body** instead of over its head. The pole sits on the body's centreline and the flag flies right from it.
- **it is see-through until it is all the way out.** Your colours fully up, or the white flag fully streaming, are solid; the half-out one is faded.
- **the nerve readouts all wear it now.** The NERVE line on the plaque, the whole ladder on its hover, the target's nerve row, the two nerve lines inside the chance-to-hit breakdown, and the promotion preview. The emoji faces are gone from all of them.
- **Ok is merged into Happy and neither costs anything.** One free band from 52% to 90% of a body's nerve. The first penalty is now Shaken.

**What should happen.** Most of a fight, most bodies have nothing over them. A solid teal flag means somebody is at the top and getting +5 to hit; a faded white one means Breaking; a solid white one means routed and running. The plaque and the flag over the same body must always agree. Nothing should take a penalty until the word says **SHAKEN**.

**What would be a bug.** A flag overlapping the captain's ★, or hanging over the next hex. The plaque saying HAPPY while the board shows a white flag on the same body. Any nerve readout still showing a face. ⚠ **Two things are deliberate:** the **world bar's mood face on the map is NOT the same ladder** and keeps its emoji - that is the company's road morale, not a body's nerve in a fight, and they are separate on purpose. And **the step into Shaken is now a bigger drop** than it was, because the small -5/-2 rung between them is what you merged away; if the fights feel like they turn too suddenly, that is the thing to say, and softening Shaken is a one-line answer.

**Measured:** eight fights x 16 runs either side of the merge, mean win **80.6% -> 79.8%** with 0 errors, so the difficulty did not move. ⚠ Sixteen runs cannot resolve a per-fight swing of ten points, so treat that as "nothing showed up" rather than proof.

---

## 🏳 WHAT THE ROAD HANDS YOU, WHAT A CHEAP HIRE COSTS, AND THE FLAG OVER A HEAD  *(#227 · 2026-08-21 · build log 8f.250)*

**How to reach it in three steps:** win two or three map fights and look at what lands in the cart → open a muster wall and find the one with no class → let somebody's nerve go in a fight.

**What it is.** Your three asks.

- **loot after a fight leans on what you do NOT have.** It will not hand you a second bow when somebody is already carrying one, and a weapon has to actually beat something you swing before it is offered. Armour got a real share of the roll: it was about 4% a fight and it is about 15%.
- **the level-0 stranger is half price and arrives with empty hands.** About 28 crowns for a human instead of 41. His row says `comes with no weapon` before you buy him.
- **the morale flag.** Your v5 art, over a body's head, and only at the two ends: your own teal colours when somebody is at the top of the ladder, the white flag half out when they are Breaking and fully out when they are Broken. The emoji face and the old 🏳 are both gone.

**What should happen.** Over about eight fights an act you should now see roughly three or four extra pieces rather than two, and none of them a repeat. **Arm the stranger before you field him**: with no weapon he has no attack at all and can only walk, which is deliberate and is the price of the discount - the tool for whatever trade he picks arrives in the stash at his first level. On the board, most bodies should have nothing over their heads most of the time; a flag appearing is news.

**What would be a bug.** A find that hands you something you already own, or a weapon plainly worse than what everyone carries. The muster wall never showing a no-class candidate, or showing one without the `comes with no weapon` clause. Two flags over one body, or a flag sitting on the captain's ★. ⚠ **And two things are deliberate, so they are not bugs**: **Ok and Shaken now show nothing at all** over a head, where they used to have a dim face - that is your "only when maximum or breaking", and the furled white flag is cut and mapped and simply not drawn, so it is one line to turn on if the board feels too quiet. And **late in a run the weapon finds will dry up**, because once you hold the club, the crossbow and the maul there is little left that is both new and better; it will hand over a duplicate rather than nothing at that point.

---

## 🧿 THE BUILD NAMES ITSELF, THE SEATS MARK, AND YOUR OLD ROADS STAY VISIBLE  *(#226 · 2026-08-21 · build log 8f.249)*

**How to reach it in three steps:** open the game and look at the top right corner → take the road and look at the world bar's first chip → walk two or three nodes and look back at where you came from.

**What it is.** Three of your asks plus one thing off the backlog.

- **a build stamp in the top right corner.** It reads **`dev`** in the working prototype and `8f.249 · 2026-08-21` in anything built and deployed, so a bug report can name the build it came from. On the map, in a fight and on the company sheet it sits one row lower, just under the top bar, because the corner itself is already the MENU / zoom / BACK button on those three.
- **the seats mark is two expands crossed** instead of one arrow, and it now stands against the seats figure rather than halfway between it and the headcount.
- **a road you have already walked is no longer transparent.** It was drawn at 55% and, against the painted map, that put it a hair away from the dashed road you *cannot* take. It is solid now, with the same dark casing the live gold road uses, one size down.
- **and three map nodes that had art nobody could see.** The wheel-rut road, the pursuers and the mirehares had their paintings finished and exported and were still drawing the plain type mark, because the last step of the pipeline had never been run. They are painted now, which also moves their own name plates down.
- **and off the backlog:** #222's leftover sweep, three places where a redirected `git` error could kill `deploy.ps1` or `merge.ps1` with a confusing message. Nothing you can see; it stops a tool failing strangely. `deploy.ps1` also refuses to run now if it cannot tell which branch it is on, which it used to treat as "we must be on main".

**What should happen.** The stamp should be there on every screen and easy to ignore: dim, tiny, and it must never take a click. On the world bar the first chip reads **portrait · 4 · ✦ 8/13**, with the crossed mark touching the 8 and a clear gap back to the 4; hovering it still says *seats spent* in words. Walking away from a node, the road behind you should stay plainly there: dimmer and thinner than the gold road you can take, but obviously a road, and obviously not the dotted one that means *not from here*.

**What would be a bug.** The stamp sitting on top of the ☰ MENU button, the zoom row or the BACK button, or reading `dev` on something you deployed - that would mean the build script did not stamp it. The crossed mark looking like a blob at that size, or heavier than the number next to it (it was measured to be the same weight as the digit `8`, so if it reads heavier, say so and it is one number). A name plate on one of the three newly painted nodes sitting on a neighbour's, or a road running through one of the new paintings - all three counters read 0 and the road check was made to fire on purpose before being trusted, but an eye beats a counter on a map. And the walked road reading as **available**: it must not start looking like the gold road, because gold is the only thing on that map allowed to say *you may go here*. ⚠ The dashed *not from here* road was left exactly as it was, on purpose - that is a refusal rather than a path you walked - so if you meant those too, that is a second change and a small one.

---
## 🧪 THE GAUNTLET: A TOOL PAGE, NOT A GAME SCREEN - EVERY FIGHT MEASURED  *(#229 · 2026-08-21 · build log 8f.252)*

**What it is:** the battle-balance bench you asked for. It runs every fight in the game through the
game's own AI, at the party you choose, under three strategies, and prints win% / rounds / bodies
down / hp lost per fight. It reads the live build, so after you change perks or stats: press
⟳ RELOAD BUILD, run again, and the Δ numbers beside win% and rounds are what your change did.

**How to reach it, three steps:**
1. `powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1` (if not already running)
2. open `http://localhost:8777/tools/gauntlet.html`
3. press **RUN THE GAUNTLET** (about 3-4 minutes for the full default grid; STOP works mid-run)

**What to try:**
- **The bench** with *"Your company, as it stands"* (only offered when you have a save): can YOUR
  crew take the Snare, and which strategy does it best with?
- **The campaign walk**: founders march the road in order, XP is paid fight by fight, Asha joins
  before the Broken Men, Skree + Bruht + an armour refit before the Snare (all three editable).
  The LVL and YOURS columns show what the road actually delivers at each gate.
- **The strategies**: AGGRESSIVE is "everyone straight in", STEADY is "the line advances
  together", THE BRAIN is the shipped AI. They genuinely split: steady holds the palisade,
  aggressive eats the Broken Men.
- **The Δ loop**: run once, change one perk in the prototype, RELOAD BUILD, run again with the
  same seed. Green/red deltas appear on every cell that moved.

**What would be a bug:** a FATAL/∞ mark in any cell (an engine error or a stalled fight) · the
founders pricing anything other than 100 pts · two runs with the same seed and build disagreeing ·
the tool changing anything in your real game (it must not touch saves, the journal, or the
practice-field unlocks).

**Worth knowing:** THE THREE BELLS is priced but not simulated (its waves are scripted around the
tutorial). The AI plays both sides, so a 30% here can still be a comfortable HUMAN win: read the
columns as "how hard the fight is for the brain", and trust the comparisons more than the
absolute numbers. **And keep the tab visible while it runs**: the browser starves a hidden tab of
CPU, so the same grid that takes 4 minutes in front can take 20 in the background (the run
survives it, it is only slow).

## 🧪 NINE SMALL ONES: THE CARD SCROLLS, THE HOVERS STOP BEING CUT, AND THE MAP GETS ITS CONTRAST BACK  *(#223 · 2026-08-21 · build log 8f.246)*

**How to reach it in three steps:** open the game → read the contract card to the end and try the wheel over the prose → then the world bar, then the company sheet.

**What it is.** Your batch of nine. Four of them turned out to be the same kind of fault - a thing that was built, wired and invisible - so they are grouped here:

- **the card scrolls.** The wheel over the prose and the scrollbar both work, and the bar is the thin gold one every other box in the game has rather than the white Windows one in your screenshot.
- **the ◎ THE CIRCLE chip has its hover.** It always had one, since #136; it lived in a 24px row and every pixel of it was cut off. Same for three popovers on the sheet that were being sliced 61px, 21px and 21px on the left and right - the ARMING SWORD card and the BAG and OFF HAND slots.
- **the map is darker and reads sharper.** Measured rather than eyeballed: the flat black wash it used was taking 44% of the picture's local contrast, which is what an eye calls soft. It is a brightness/contrast filter now - darker at the median than before AND a quarter more separation - and the canvas draws at twice the resolution.
- **☰ MENU and ♪ swap places** on the map: MENU into the top bar, the sound toggle under it.
- **the seat count is ⤢ 8/13** instead of the word SEATS. The word is still on the chip's hover, in full.
- **the payday hover names everybody.** Each body, what they draw a day, and the total under them.
- **the bag and the empty pet slot** stop printing *"throwables and potions, later"* and *"Found on the road, not bought."* on the face of the slot. Hover the bag and it still tells you what it is for.
- **negative feedback has a SEND IT button** again, on the 👎 branch only.

**What should happen.** On a card long enough to overflow (the contract card is the one that does) the wheel moves the prose and the top edge fades. On the sheet, mark somebody with THE CIRCLE and hover the chip: a box opens ABOVE it, whole, even though it hangs far outside the column - and the same for the leftmost ability card. The map should look like the same painting with the haze taken off. The payday hover should add up: each wage summed is the ◉ figure it prints, and that figure times the days left is the bill on the chip. SEND IT should say THANK YOU for a beat and close, and your words are kept either way - they are written as you type, exactly as before.

**What would be a bug.** A card that scrolls but whose beats stop advancing when you click the prose - that click is supposed to still step the card. A popover that now covers something you needed to read: it escapes its column on purpose, so say where. A map that has gone too dark, or too contrasty - both are one constant and one line to change. The bag hover saying nothing at all. And **the terrain will still be a little soft at the NEAR camera stop, and that one I cannot fix here**: the map paintings are 1280 wide and the default zoom shows them at 1562, so there is no more detail in the file. A wider master is the only thing that changes it.

---
## ✚ THE INJURY LADDER - A FALL COSTS MORE EVERY TIME  *(#225 · 2026-08-21 · build log 8f.248)*

**What it is.** Going down in a fight is no longer always a scar. It is a ladder, and every rung is
visible before you climb it:

| the body was | the fall costs |
|---|---|
| sound | a **temporary INJURY**, 7 to 14 days. One real penalty and a little blood |
| injured | a **SCAR**, forever, exactly as today - **and a fresh injury on top** |
| injured **and** scarred | **they do not get up.** The Captain gets one extra rung: two scars |

**The injury heals, and that is the whole second chance.** A scarred body whose clock has run out is
back on the bottom rung. The only way to reach the top of the ladder is to take somebody hurt into a
fight, which is a decision rather than a dice roll.

**How to reach it in three steps.** Take a fight you can nearly lose, let somebody go down, and read
the aftermath card. Then start the next fight and look under their feet.

**What should happen.**

- the **aftermath** card for that body turns amber with a strip reading `hurt · cracked ribs · 9d`,
  and the **first time it ever happens in a run** a spotlight explains the ladder;
- the **company sheet** shows `✚ 9d` on their roster row (red instead of amber once they are one fall
  from the end) and a ledger chip with the days left, what it costs, and what the next fall costs;
- **on the board** they wear a ✚ under their feet for the whole fight. Amber means the next fall is a
  scar; red means it is the last one. Hover it;
- **at the head of the fight** a dimmed card names them and says which it will be. It fires **once per
  body per rung**, so it does not stop every fight - and it fires again the day they climb a rung;
- the log says `Vesna (opened thigh) walks onto this field already hurt.` every fight;
- on the road, when the clock runs out: `Vesna is sound again. Opened thigh, mended.`

**The nine injuries**, one penalty each plus a little blood: cracked ribs (−2 STR) · turned ankle (−2
AGI) · head still ringing (−2 INT) · rattled (−2 MOR) · **dead arm (one action a turn)** · opened thigh
(−8 dodge) · blood in one eye (−12 to hit) · torn shoulder (−15% damage) · bled white (−18 hitpoints).

**What would be a bug.**

- a body dying who was not carrying **both** an injury and a scar;
- the warning card saying somebody is scarred when they are not, or naming somebody who is sound;
- the badge under the feet not matching what the aftermath then does;
- an injury that never mends, or one that mends the same day it lands;
- the intro brawl in the Three Bells injuring anybody. It may not: fists and floorboards do not scar.

**What is deliberately not there yet.** AUTO will still walk a last-rung body into a losing exchange,
and the road card that asks somebody to pull the Thing in Armour off the road now sends them up the
ladder without saying so. Both are named in #34 and both are the next work here.
## ⚔ THE SEVEN-ASK BATCH  *(#224 · 2026-08-21 · build log 8f.247)*

Seven separate things. They do not touch each other, so any one of them can be judged on its own.

### 1. The opportunity-attack % is on your cursor now

**How to reach it in three steps:** any fight → let an enemy or two get right up against one of
yours → with MOVE in hand, hover a green hex.

**What should happen.** A red chip on the hex under the pointer, reading `⚔ 68% · 83%`: what each
body holding you would land if you took that step. The enemies themselves still glow red (that is
WHO), and they no longer carry a number. Hover the chip and it names them one by one. With more
than three holding you it reads `⚔ 100% · 72% · 8% +3`, and the hover still names all of them.

**What would be a bug.** A number left on an enemy sprite. A chip that stays up when you move the
pointer off the green. A chip on a hex the click would not actually take you to.

### 2. The chase and Blood on the Road are fought on open ground

**How to reach it in three steps:** start a run → take the chase on the wheel-rut road → look at
the field before you move anybody.

**What should happen.** Open ground with room to walk: a thin stand of alder instead of a wood, no
burning scrub, almost no water. Blood on the Road the same, on the fen. Every other fight in the
game is untouched, including THE BROKEN MEN, which is still 26 trees.

**What would be a bug.** Fire on either of those two boards. A wall of stone across the middle.
**Or the opposite complaint, which is worth having:** if the alder cut now reads as *not a wood at
all*, say so - seven trunks is one number.

### 3. You can walk out of the wedding, until you have killed somebody

**How to reach it in three steps:** the wedding, take the door that starts the fight → look at
WITHDRAW before you swing at anybody → kill one of them and look again.

**What should happen.** Before any blood: WITHDRAW is live and it costs **nothing at all**. The
moment one of them is dead the button greys and reads *"Your hands are in blood already. Whatever
this was going to be, it is that now, and every one of you knows it has to be finished."* A body
knocked DOWN but still breathing does not shut the door - only a dead one does.

**What would be a bug.** A withdrawal that still charges mood. The button greying before anybody
has died. The old 22-point price appearing anywhere.

### 4. THE SECOND SHAPE - a trinket that puts another one of you on the board

**How to reach it in three steps:** find or buy the trinket (it is rare - Coldharrow's rack, or a
find after a fight) → put it on somebody → in a fight, press **CAST A SHAPE**.

**What should happen.** Another one of that body appears beside them, identical, and never moves.
It is very hard to hit. Anything that does land goes straight through it and it is gone - *"The
blow goes through X and there is nothing in it. There never was."* Untouched, it stands for two of
the caster's turns and then vanishes quietly. One at a time, and a three-turn cooldown.

**What would be a bug.** A shape that takes a turn on the rail. A shape that counts on the ⛊
capsule at the top of the screen. A shape whose death is announced as a kill, or which pays
anybody experience. **And the one to watch for:** if your whole company goes down while a shape is
standing, the fight must still END.

### 5. The kill tally, once, at the foot of the company sheet

**How to reach it in three steps:** company sheet → pick somebody who has killed people → look at
the top of the sheet and then at **WHAT HAPPENED TO THEM**.

**What should happen.** Nothing at the top any more. At the foot: `🧑 4  🐀 1  🐾 2` and then
`7 DEAD` - the same race marks the rest of the game uses, a paw for beasts, and a figure instead of
a row of repeated glyphs. Hover a pair for *"4 men"*.

**What would be a bug.** The old ◉ ⬩ ⬢ marks anywhere. A tally still up in the chip row.

### 6. What kind of company this was, at the end of the run

**How to reach it in three steps:** play a run → finish it, either way → read the end card.

**What should happen.** A row under **WHAT YOU DID ON THE ROAD** (or *WHAT THEY DID*, on a dead
company): the same eight door marks the cards use, each with how many times you took that kind of
door. `⚔️ FIGHT 3  ☠️ EVIL 1  👣 LEAVE 5  🙏 HONOR 2`. A door wearing two marks counts on both.

**What would be a bug.** A count that does not match what you remember doing. A row on a company
that never opened a card. Anything that reads as a SCORE rather than as a record.

### 7. The crossbow

**How to reach it in three steps:** buy it at Coldharrow (165) or find one after a fight → put it
on somebody → shoot something standing right next to them.

**What should happen.** It hits hard (24-34), it takes **both hands** so no quiver and no shield,
and it does not care in the least that somebody is on top of you - **31% adjacent against the
hunting bow's 5% on the same hex**. Anything man-sized it hits goes back a hex; an ogre does not.
Then the card greys and reads EMPTY: WIND IT FIRST, and **WIND IT** costs one action. The ordinary
turn is shoot · wind. Under AUTO the company does the same by itself.

**What would be a bug.** A crossbow that can be fired twice in a row. A WIND IT that is live on a
loaded weapon. A body under AUTO that fires once and then never shoots again for the whole fight -
that is the one thing this could get wrong and it would be quiet.

---

## 💰 THE PAYDAY GETS OUT OF THE CARD'S WAY, AND SAYS WHAT IT PAID  *(#221 · 2026-08-21 · build log 8f.244)*

**How to reach it in three steps:** walk the road until a day divisible by four → arrive somewhere with a card waiting → watch the order things happen in.

**What it is.** Your screenshot: the payday line lying across the middle of THE BROKEN MEN. Two changes:

- **they take turns now.** Payday first, then the card. If the payday lands while a card is already open - a door that costs you a day, for instance - the line waits and plays when you close it.
- **the payday is a receipt**: the crowns in big gold figures, one short line under them, and when the next payday falls. The word "Payday" is off the front of it, because the chip, the coin sound and the gold figure all already say so.

**What should happen.** On a payday arrival the map holds for about three and a half seconds while the receipt plays, then the card opens. During that hold the roads are locked, the same way they are while you are walking - that is deliberate, so you cannot walk off and lose the card that was about to open. An unpaid payday does the same thing in red, with what is still owed.

**What would be a bug.** Any line still lying across a card. A hold that feels long - say so, the number is one line to change. Roads that stay locked after the receipt has faded. And the one to watch for: **a card that never opens** after a payday arrival. That would be the hold not releasing, and it is the thing I would want to hear about first.

---

## 🧮 THE BAR SAYS HOW MANY OF YOU THERE ARE, THE MOOD IS JUST A FACE, AND THE MENU IS TOP RIGHT  *(#220 · 2026-08-21 · build log 8f.243)*

**How to reach it in three steps:** continue the road → look at the top-left group of the world bar → hover the first chip and the smiling one.

**What it is.** Three notes on the global map:

- **the company chip counts BODIES now.** It used to be a portrait of the Captain and one figure, and that figure is **seats**, not people - everybody takes room by size (ratkin 1, human 2, ogre 3), so four of you could read `8/13` and nothing anywhere said four. It reads **🧑 4 · SEATS 8/13**: the mark, how many of you there are, and how much room is left.
- **the mood chip is the face alone.** No STEADY, no AT EASE on the bar. The word, the sentence about why, and the "throw them a party" line are all on the hover, where they always were.
- **☰ MENU sits top right**, under the ROAD / NEAR / CLOSE row, instead of bottom left beside ? RULES.

**What should happen.** Recruit somebody and the bold number goes up by one and the seats go up by their size - a ratkin costs 1, an ogre 3. Hover the chip and the box opens with both figures written out in words before it explains anything. Hover the face and it still names the mood (😐 AT EASE, 🙂 STEADY, and so on) and still offers the feast; click it and the feast card still opens.

**What would be a bug.** The two numbers running together so the chip reads *48/13* - say so if it does, that was the thing I measured hardest. A mood chip that has lost its colour (the border is the mood's colour and always was). The MENU button sitting on top of the word CLOSE, or covering a place name on the map. And on the battle screen the menu should still be **bottom left** - it moved on the map only, because the battle's top-right corner is the sound button's.
## 🔔 THE OPENING AND THE CONTRACT ARE PAINTED CARDS NOW  *(#219 · 2026-08-21 · build log 8f.242)*

**How to reach it in three steps:** main menu → **A new company** → read THE THREE BELLS, take the fight, then read THE MAN IN THE CORNER.

**What it is.** The two cards that open the game were the last ones still drawn in the old narrow column, while every road card, fire card and vignette had already moved to the wide painted stage. They are on the stage now, and **not one word of either card changed** - who is speaking, whose face is on the plate, which door is dangerous and whether the picture is cropped are all worked out from the text that was already there.

**What should happen.** The card fills the screen with a painting, the title sits over it top left, and the prose arrives **one beat at a time**: click anywhere on the card to take the next beat. The doors are the last beat. On the contract card the lord's two quoted paragraphs come out as *him* and the narration as the room, the naming form appears only after the offer has been read to the end, and the fight door on the first card is red without having been told to be.

**What would be a bug.** A card that arrives with all its text at once, or one that will not step. Doors that appear before the last beat. On the contract card: a line sliced in half at the top edge instead of fading out, or a name button that steps a beat when you press it - it must not. Both cards should sit dead centre whatever else is on screen.

---

## 🕯 THE CARD UNFOLDS, AND A DOOR'S EDGE SAYS WHAT KIND OF ACT IT IS  *(#218 · 2026-08-21 · build log 8f.241)*

**How to reach it in three steps:** take the road · walk to any node with an event on it · watch the card arrive, then look
at the left edge of each door before you read the labels.

**What it is.** Two things.

**(1) The card opens instead of appearing.** The painting parts from a lit hairline at the middle, the frame opens with it,
and the title, the mark, the company's plates and the prose arrive behind them in reading order. When you click through to
the last beat, the doors come in one after another rather than all at once. It is **470ms** end to end and the first line of
prose starts arriving at 170. It is on the road deck, the fire and the vignettes - every card that opens on the painted
stage.

**(2) A door's left rail is coloured by what the door DOES.** The four-sided border is unchanged and still means what it
meant: dim gold at rest, red on a warning, green on a race door, lit gold under the pointer. The 2px strip on the LEFT is
new, and it is read off the intent glyph you are already looking at:

| | |
|---|---|
| ⚔️ fight | fresh blood red |
| ☠️ evil | deep, dried blood |
| 🤝 help | the approve green |
| 🧺 take | the salvage amber |
| ⚖️ trade | coin yellow |
| ⛺ rest | cold blue |
| 🙏 honor | grave-stone grey |
| 👣 leave | **nothing** - it stays the default |

**A door with two glyphs takes the moral colour.** ⚔️☠️ is blood, ⚔️🤝 is green. The Hanged Toll-Man is the card to look
at: three doors on grey and amber, and the fourth - *take all of it* - on the predator's blood even though its first glyph
is a basket.

**What should happen.** The unfold plays once per card and never again while you are reading it; clicking to advance a beat
does not replay it. Hovering a door slides it 4px, lights its outline and makes its own rail glow in its own colour.

**What would be a bug.** A card that arrives with no motion at all, or one whose picture never finishes opening · the doors
appearing before the prose · a door that stops sliding when you hover it · a rail whose colour disagrees with the glyph
beside it · the animation replaying every time you click to the next beat.

**What I want to know.** Two calls are yours, and both are one line to change: **honor on grave-stone grey** is the coldest
thing on a warm card, and **rest on cold blue** is a campfire in blue, justified only by it being the one door that ends the
day. And the pace: 470ms is quick in isolation and you will see it thirty-four times in a run.

---

## 🐕 A DOG IS A BEAST, NOT A RATKIN  *(#217 · 2026-08-21 · build log 8f.240)*

**How to reach it in three steps:** main menu → **The practice field** → pick **THE PACK** → take the field and hover a Lurcher, then move it.

**What it is.** The round before stopped the dogs *showing* a ratkin's face and class. This is the half underneath: every dog was literally filed as `ratkin` in the data, and things nobody meant were reading that. `beast` is a race of its own now.

**What should happen.** The dogs still swarm and still wear the ≋ badge for it - that is deliberate, the pack bonus is theirs as much as the clans'. Two numbers moved. **The Runt walks 6 hexes instead of 5**: its own statblock always said 6 and the race table had been quietly clipping it. And the dodge a dog used to get for being ratkin now sits on each dog's own statblock, so the shipped number did not change. Dogs and mirehares also sound like animals when they are hit, which they did not before.

**What would be a bug.** A dog that no longer swarms, or has lost the ≋ badge. A pack fight that feels clearly harder or easier than it used to: 200 seeded runs won 200/200 before and after, so a real swing would be news. Any people-sound on an animal. And any class or race word appearing on a dog's line - it should carry its bestiary line and nothing else.

---

## ⚖ THE PRACTICE FIELD PRICES EVERYTHING IN POINTS, AND YOU CAN HAND-PICK THE CREW  *(#216 · 2026-08-21 · build log 8f.239)*

**How to reach it in three steps:** main menu → The practice field → in WHO MEETS IT pick **Hand-picked** (bottom of the column).

**What it is.** One scale now prices both sides of every fight. Every company in WHO MEETS IT shows its points (the four you start with are **~100 pts** - that is the calibration). Every fight shows three recommended company-point values, `easy · even · hard`, recomputed against the size of the company you have picked. **Hand-picked** opens a bench under the columns: add the founders, Skree, Asha, Bruht, or stock hires of any race and class; step each body's level 1-10 (levels spend themselves - stats down the class's own priority, perks the first door of each tier, and the bench says so); hang armour, weapons and trinkets from the whole pool on them, and every piece in a dropdown is priced as what it adds to THAT body (+9 mail on Vesna, +1 "(wrong size)" door-planks on Bruht). The header keeps a running total and says how the picked fight should feel against it.

**The locks.** Six fights are LOCKED until a campaign has shown them to you: Something in Armour, the Fen-Mother, the Mirehares, the Snare, the Circle, the Wedding. Meet one on the road, in any run, and it opens here for good. Dev mode (⚙) opens all of them and marks those rows `dev-open`.

**Dev mode extras.** With ⚙ on: every fight door on a road card grows a `⚔ N pts · you M` chip, and every battle node on the world map wears its threat points, so the final route can be balanced off the map at a glance.

**What should happen.** The founders read ~100 and the ladder sorts the act: brawl 36 · chase ~51 · wedding ~60 · clash ~72 · snare ~146 against four and ~199 against six · the Circle 257 (you are not meant to win it, and now the number says so). Adding a level or a piece of kit moves a body's points immediately.

**What would be a bug.** A fight you have never met in any campaign standing open outside dev mode · points that flicker between two opens of the same screen · a practice fight unlocking anything · the map chips or door chips showing with dev mode off · a hand-picked crew arriving in the fight different from the bench that priced it.
## 🪞 THE MIRROR - A PRACTICE FIGHT WHERE YOUR HAND GOES THE OTHER WAY  *(#215 · 2026-08-21 · build log 8f.238)*

**How to reach it in three steps:** menu → THE PRACTICE FIELD → under the three columns there is a new row, **THE RULE**. Pick **The mirror**, then TAKE THE FIELD.

**What it is.** Every click you make on the board is folded across the vertical line through the body that is acting. Point at a hex to the left and you walk to the mirror of it on the right. Point at the enemy on your left and you swing at the one on your right. It is the whole board, not just movement: steps, swings, shots, workings, and both halves of a throw.

**Three things are there to keep it fair rather than cruel:**

- **a dashed line down the board**, through whoever is acting - that is the fold;
- **an ivory ring on the hex your click would actually land on**, the moment you point anywhere. It is the same ring the board already draws under the pointer, moved to the other side;
- **the cursor is a mirrored pair of boots**, on every hex, because the sword-and-arrow cursors describe the hex you are pointing at and in the mirror that is not the hex you will hit.

**What should happen.** Reading the board is honest - the odds on a hex, the hover card, the damage preview all describe the hex they are on. What is turned round is only your hand. If the fold lands off the edge of the board, the click does nothing, spends nothing, and the log says *"Your hand goes the other way, and there is nothing over there."* Standing near an edge therefore costs you options, which is the point: the middle of the board is where a mirrored company wants to be.

**What would be a bug.** Anything mirrored outside a practice fight with THE MIRROR picked - a campaign battle, or a practice fight on **Straight** - is a leak and I want to hear about it immediately. Also: a click landing anywhere other than the ring; the ring failing to appear while you sweep the pointer over the board; AUTO (developer tools on) playing badly, because AUTO is deliberately NOT mirrored; the dashed line not moving when the turn passes to your next body.

**What I want your ruling on.** Whether it is fun or merely annoying, and whether the landing ring gives too much away - the alternative is to hide it and make you work the fold out in your head, which is harder and more of a prank. It is one line to change either way.

---

## ⚔ THE OPPORTUNITY-ATTACK % ONLY SHOWS WHILE YOU ARE AIMING A STEP  *(#215 · 2026-08-21 · build log 8f.238)*

**How to reach it in three steps:** any fight → let an enemy get into contact with one of yours, front or shoulder → it is your turn, so just move the pointer around the board.

**What it is.** #213's red `⚔ NN%` plates used to stand on the board for the whole turn. Now they appear only while the pointer is on ground a step would actually take - the same hexes the red cursor appears on - and go out again the moment you point at anything else.

**What should happen.** The red glow on the enemies who would swing stays up all turn (that is *"these bodies have a hand on you"*). The percentage is the answer to *"and what does this particular step cost"*, so it comes with the red boots and leaves with them.

**What would be a bug.** A percentage still showing while you are pointing at your own body, at an enemy, or off the board. A percentage that does NOT show while the cursor is the red boots.

---

## 🐺 A BEAST IS NOT GIVEN A PEOPLE'S FACE  *(#215 · 2026-08-21 · build log 8f.238)*

**How to reach it in three steps:** practice field → **The Pack** (or **The Mirehares**) → hover any dog, and watch the left-hand panel when one of them takes its turn.

**What it is.** A Lurcher used to read `🐺 PACK-BEAST · 🐀 RATKIN`, with a ratkin's painting beside the word, and the plaque drew a ratkin foot-soldier's portrait on it (a ratkin CHIEFTAIN's, on The Bitch). Mirehares had the same. An animal now gets its bestiary line and nothing else, and no ratkin sheet.

**What should happen.** `🐺 PACK-BEAST` alone on a dog, `♞ MIREHARE` alone on a hare, `🐉 GREAT BEAST - LINDWURM` on the Fen-Mother. Ratkin, ogres and humans are untouched - they keep the race word and the mark.

**What would be a bug.** Any animal still showing a race word, or a rat's face on the plaque. And the one I already know about and left alone: **the Fen-Mother wears the cub's portrait.** That is a beast sheet on a beast, so it is honest about the kind of thing she is and wrong about which one - say if it bothers you and it gets its own art row.

---

## 😐 THE MOOD FACE ON A TOKEN IS DIMMER  *(#215 · 2026-08-21 · build log 8f.238)*

**How to reach it in three steps:** any fight with six or more bodies on the field → look at the top-right corner of the tokens.

**What it is.** The quiet faces (😐 Ok, 😕 Shaken) went from 66% to **40%** opacity and got greyer; the loud ones (😄 😟 💀) came down with them, 95% to **78%**.

**What should happen.** A board of steady people should read as a board of people, not as a row of yellow dots - but a face you go looking for should still be findable, and a body that is BREAKING should still stand out from one that is merely Ok.

**What would be a bug.** Not being able to tell 😟 from 😐 at a glance any more. That would mean the gap has gone rather than the volume, and the answer is to bring the loud rungs back up rather than the quiet ones.
## 🗺 FIFTEEN MORE ROAD CARDS GET THEIR WIDE STAGE  *(#214 · 2026-08-20 · build log 8f.237)*

**How to reach it in three steps:** open any of these cards on the road or at a camp: What Followed You Out, The Hollow Tree, The Dead Company, The Long Fire, The Ratkin Snare, The Warm Spring, Something in Armour, The Door-Shrine, The Woman in the Cage, The Red Lights, Bonepicker's Camp, The Sling-Line, The Steading-Line, Under the Bloom, The Salt-Wives, or They Come Over the Wall.

**What it is.** All sixteen now open on a full 1672x941 painted stage instead of the old 586x212 letterbox (or, for two of them, nothing at all - `packev` and most CAMPS cards had no wide art before this). ⛔ **AND ONE OF THEM WAS SHOWING THE WRONG PICTURE.** The Steading-Line (four ogres blocking a mountain road) had been wearing They Come Over the Wall's art (dogs pouring through a ruined steading) since the J-pack first shipped - the two events both use the word "steading" and the filename-based wiring caught the wrong one. If you saw ogres over a fire in that card before, this build fixes it.

**What should happen.** Each painting matches its card's own prose - ogres for the Steading-Line, dogs and a ruined wall for They Come Over the Wall, four boiling brine-pans for the Salt-Wives, and so on.

**What would be a bug.** Any of these sixteen still opening on the old narrow letterbox, or two different cards showing the same painting.

---

## ⚔ THE STEP THAT COSTS BLOOD SAYS SO ON THE CURSOR NOW  *(#213 · 2026-08-20 · build log 8f.236)*

**How to reach it in three steps:** any fight → let an enemy get into contact with one of yours (front or shoulder, not behind) → it is your turn, MOVE is already the standing selection, so just move the pointer over the walkable ground.

**What it is.** The ⊘⚔ that used to sit on your own body is gone. Instead:

- **the cursor turns red and grows a pair of crossed blades** over any hex a click would actually walk to;
- **every enemy who would take a free swing glows red** (that part shipped in #205) **and now wears a small red plate reading `⚔ NN%`** - the chance that swing lands on you;
- the red ring under your own feet stays: that is which hex is being paid for.

Hover the plate and it names the body and points at DISENGAGE.

**What should happen.** Press DISENGAGE and every one of those marks goes out at once - the cursor back to white boots, the plates gone, the glow off - because the step is clean now. Walk instead and the swing you were shown is the swing you get: the percentage is taken from the same roll, on the same hex, before you move.

**What would be a bug.** A red cursor on ground you cannot reach, or over an enemy (a click there is an attack, so it should be the blade or the arrow). A plate on a body that is behind you - the zone of control is the front arc and a body you walked round cannot swing. A percentage that does not match what the log says the swing rolled. A great beast wearing the plate twice (she is lit on head and tail; the number belongs on the head only). And the one that is a known trade: **a plate half-hidden behind a body standing in front of the swinger.** Say so if it happens - the foot of the hex was the only slot left and the fix is to move the other two numbers, not this one.

---

## 🗿 THE THREE RACES WEAR ONE PICTURE NOW  *(#211 · 2026-08-20 · build log 8f.234)*

**How to reach it in three steps:** open the company sheet (C, or the portrait on the world bar) → look at the roster down the left and at the race chip beside the name → then open the muster wall, a battle, and any event card with a race door.

**What it is.** #209 painted ratkin, ogre and human as three small portraits and used them on event doors only. Everywhere else was still 🐀 👹 🧑, i.e. the same fact wearing two different pictures on two screens you cross in a minute. Now there is one picture: the sheet's race chip and its roster rows, the battle rail's name line, the enemy inspect card, the muster wall, the tavern's roster strip, the recruits who join after a fight, the promotion card, and the race hover.

**What should happen.** Nothing moves. The words are exactly where they were - the mark still replaces the WORD only in a list you are scanning, and keeps it wherever one body is being studied - and no row got taller. Hovering a mark still opens the race box.

**What would be a bug.** A row that now wraps or clips, a mark you cannot tell apart from its neighbour at a glance, or an emoji still showing anywhere (that is the fallback, and it should never fire in a normal build).

---

## ⛔ WHAT FOLLOWED YOU OUT, AND TWO NEW NODES ON THE OPENING ROAD  *(#210 · 2026-08-20 · build log 8f.233)*

**How to reach it in three steps:** new company → win (or lose) the tap-room brawl → walk east.
The road is now **hold → The Wheel-Rut → The Alder Cut → The Hollow Tree → Blood on the Road**,
four days where it was two. The card is on The Alder Cut.

**What it is.** Four of them on the road behind you. Two of the faces were at the Three Bells, and
they are the men who ACTUALLY lived through your brawl - kill Harl and he is not there, kill
everybody and the card says so and the friends came anyway. One of the four is ratkin with a dock
hook. Two of them are still drunk.

**Three doors, three currencies:**

| door | costs | what happens |
|---|---|---|
| 👣 Cut the packs and run with freed hands | **3 provisions** | no fight, no day, nobody hurt |
| ⚖️ Ask what it would take. Pay it | **40 crowns** | no fight; they go back the way they came |
| ⚔️ Stand in the road | **free at the pick** | the fight, and you keep everything |

**What should happen**

- **Grausen Hold sits higher on the map** and out of the river channel it was standing in.
- The two men from the tap-room are **named on the card AND on the battlefield**, and they are the
  same two. If your brawl ended with nobody alive on their side, the card says *“Not one of these
  faces was at the Three Bells. They did not have to be.”*
- With an empty larder or under 40 crowns those doors go **grey with the reason on them**, before
  they are pressed. The fight door is always live, so you can never be stuck.
- The fight should be **won**, and end with the survivors on their knees: let them go, strip them,
  or no prisoners. It costs about a fifth of the company's blood, two days before Blood on the
  Road, which is the real price of the free door.
- **If you lose it** they take **40 crowns and 3 provisions and no more** - exactly what you would
  not pay them - and the run continues.
- Payday now falls on the fourth day, at The Hollow Tree, so you arrive at Blood on the Road with
  about **86 crowns instead of 107**. That is the two extra days, and the purse was deliberately
  not raised to cover them.

**What would be a bug**

- A name on the card that is not on the battlefield, or a man you killed in the tap-room walking
  the road.
- “One face was at the Three Bells” when two of them are standing there.
- Losing the fight ending the run, or emptying the whole chest instead of taking 40 and 3.
- Any node plate on the west end sitting on another one, or a road price landing on a name.
- The Alder Cut has **no painting on the map** yet, only the diamond mark. That is a shipping
  state and not a bug: the card has no art either and both are a request away.

---
## ⛩ EVERY CARD IS A PAINTED STAGE  *(#209 · 2026-08-20 · build log 8f.232)*

**What it is.** Your own style J out of `prototype/event_formats_sketch.html`, built for real, and
it is now the form of **every card in the game**: the road deck, the fire incidents and the little
vignettes. A card is no longer a 620px column with a letterbox picture on top. The painting is the
whole card, 1180x620 in the middle of the map, your people stand in it on the left, and the prose
arrives **one paragraph at a time** with the doors on the last one.

**How to reach it in three steps.** Take the road · walk to any node, or camp between two ·
click the card to advance a beat.

**What should happen.**

- **The card opens centred**, whatever corner of the map the node is in. Same place every time.
- **Click anywhere on the painting to advance.** The line you are on is bigger and brighter; the
  ones behind it stay readable, just quieter. `CLICK ▸` bottom left goes away on the last beat,
  and the dashes beside it fill as you go.
- **Three kinds of line, and they look different.** The road narrates in plain type. Somebody of
  yours speaks with a **blue** edge and a little arrow. Somebody who is not yours speaks **italic,
  indented right, with an amber edge**. Nothing was rewritten for this: THE BROKEN MEN, OUR CALIBRE
  OF FILTH and THE HOLD'S MEN have had spoken lines in them all along.
- **The left column is who the scene is about.** On the road: the Captain, plus whoever unlocks a
  race door standing behind him - and **hovering that door brings them forward** and changes the
  name on the plate. On THE COIN IN THE ROAD and THE FALLING STAR the person the card is actually
  about is in front. **At the fire it is the two people the card names**, which is the one thing the
  old fire card could say in words and never show.
- **The doors are the game's colours now.** Gold plate, gold edge, the fight door red, the race door
  green, and a painted mark in its own column instead of an emoji. There is more air between the
  last line of prose and the first door than between two lines. A card whose doors are all plain
  rulings has no mark column at all, which is most of the fire's cards and is correct.
- **Seven road cards have the new wide painting** - the sitting stone, the drowned chapel, blood on
  the road, the wedding, the fen-mother, the coin, the ruined steading - and those look composed:
  the scene on the right, the dark left where the words go.
- **After you press a door**, the outcome and its chips appear in the same column below the beats,
  and the card scrolls itself to them.

**What would be a bug.**

- A card that opens off-centre, or a MUSTER / SHOP / trade screen that opens as a wide stage. **Those
  four are still the old 620px card and that is correct** - the stage is for cards with prose and
  doors, which is the road deck, the fire and the vignettes.
- Text clipped or cut off anywhere, a chip row sliced in half, a door label with its end missing.
- A face on the left plate who has nothing to do with the card.
- A header that says the same thing twice (`ON THE ROAD - ON THE ROAD`), or a fire card still
  reading `AT THE FIRE - THE ARGUMENT` in its title instead of on the small line under it.
- A door whose mark is missing, or two marks where there should be one plus a small race badge.

**⏳ The cards that do not have new art yet.** Every card except those seven is still wearing the
old 586x212 letterbox, and a 2.76:1 picture cover-cropped into a 1.9:1 box throws away nearly half
its width. Those are dimmed and blurred to survive it, which is why they look murkier than the seven.
**That is expected and it is not the layout being wrong** - each one is a re-export at 1672x941 with
the left 45% left dark, plus one row in `JSTAGE`, and the game picks the lighter treatment up by
itself the moment the file lands.

---

## ⛨ THE CAPTAIN'S FIRST TOOL, AND THE WALL THAT REFUSES A SCRUM  *(#208 · 2026-08-20 · build log 8f.231)*

Three rulings from the skill-tree session that the battle could already express. The tree itself
is still a lab page, not the game: open `tools/skilltree_lab.html` in a browser to iterate it.

### 1. HOLD THE LINE is what a new captain opens with

**Three steps:** new run → first fight → look at the Captain's act row.
**Should happen:** HOLD THE LINE at ONE pip (+10 dodge to allies within 2 hexes), and NO
COMMAND anywhere on the row.
**A bug:** COMMAND on a level-1 or level-2 captain, or HOLD THE LINE still costing two.

### 2. COMMAND arrives at level 3, by itself

**Three steps:** level the Captain to 3 → any fight → the row again.
**Should happen:** COMMAND is simply there. Nothing was picked, no point was spent.
**A bug:** it asking to be chosen, or arriving before 3.

### 3. The wall refuses a scrum, and says why

**Three steps:** any fight with Vesna → walk her ADJACENT to an enemy → hover SPEAR WALL.
**Should happen:** the card is greyed and the hover reads NO ROOM: SOMETHING IS ALREADY
INSIDE YOUR REACH. Step one hex back: it lights again. Enemy spear-carriers obey the same
refusal.
**A bug:** the wall raisable point-blank, the greyed card silent on hover, or anything at
all changed for a body with BRACED WALL - that perk is the licence to raise it in contact.

*(NOT built on purpose: DISENGAGE stays a basic action. Your ruling moves it into the
general skill tree, but the tree is not in the game yet, and without it every scrum would
be a soft lock. It is drafted as GEN18 in the lab.)*

---

## 🧭 FIVE ON READING THE BATTLE  *(#206 · 2026-08-20 · build log 8f.228)*

*(Your five, after playing: the hovered slot, an enemy behind END TURN, scrolling, the range of a
skill that applies automatically, and the CLEAR SHOT / BLOCKED word under an archer's target.)*

### 1. The hex you are about to step on

**Three steps:** any fight → your turn → move the cursor over the lit ground.

The hex under the pointer now takes an **ivory ring and a brighter fill** - the same mark the acting
body's own hex wears, so the two read as one vocabulary. Everything else is unchanged.

⚠ **A bug would be**: the ring appearing on ground you cannot actually walk to, on an enemy, or on
a hex while you have an attack card selected rather than MOVE.

### 2. The chrome gets out of the way of a body

**Three steps:** any fight → wait until somebody stands in a corner → look at the control over them.

The board is 964x682 at the FULL stop in a 1280x720 window, and the clear band along the bottom
between the plaque and END TURN is 774px wide. **There is no way to slide a 964px board into 774px**,
so moving the camera could never have fixed this. Instead the CONTROL goes half-transparent while a
body is behind it, and comes straight back to full **the moment you point at it**.

Measured across five fights: the turn-order rail in three, the plaque in one, **END TURN in the
Snare**, and nothing at all in the tavern brawl (two bodies on the field).

⚠ **Tell me if it reads as flicker.** It fires whenever more than 8% of somebody is covered, which
is often, because that is how often the board is genuinely crowded. The dial is that percentage.

### 3. Scrolling

**Three steps:** the road → open any event card → wheel over the prose.

**What was wrong:** the event card lives inside the map, and the map's wheel handler was swallowing
every notch to step its own camera. So the card did not scroll and the map zoomed out behind it -
measured, one notch over the card's heading. And macOS hides its scrollbar until something scrolls,
so with the wheel dead there was nothing to grab either.

Now: the wheel over a card scrolls the card, the wheel over the MAP still steps the camera, every
scroller in the game has a visible bar, and **the card's second, outer scroller is gone** - it had
never once scrolled on any of the ten cards measured, and it was what made a wheel that ran past the
end of the prose drag the whole card, painting and buttons and all.

⚠ **A bug would be**: the buttons at the foot of a card coming unpinned, or a long card (try THE
CIRCLE) hiding its last line with no way to reach it.

### 4. What an order reaches

**Three steps:** any fight → the Captain's turn → **hover** COMMAND or HOLD THE LINE.

The card's sub-line now says the radius (**1 ACT · 3 HEXES**), and hovering the card **rings every
hex it reaches, including the ones with people standing on them** - an order is about WHO it lands
on, not where you can step. Move off the card and the ring goes.

⚠ It has to be the hover: these acts fire the instant you click them, so there is no moment when
one is "selected".
⚠ **SPEAR WALL deliberately shows nothing.** Its zone is the front arc at reach 2, not a circle, and
drawing it as a circle would be a picture of the wrong rule.

### 5. The archer's target says less

**Three steps:** any fight → an archer's turn → hover an enemy at range.

**CLEAR / SCREENED / OBSTRUCTED / BLOCKED is off the hex**, at your word. What remains is the
coloured, dashed line from the shooter to the body, the hex's own tint, and the percentage. The words
are still there in full on the hover readout, where the breakdown says *screened*, *a body in the
way*, *over a boulder*, *long shot*, *extreme range* next to what each one costs.

⚠ **The one to look at is BLOCKED**, because that is the state with no percentage at all - it is
carried by the dark red fill and the red dashed ray now. If that reads as ambiguous, say so and the
word comes back for that one state.

---

## 🩹 THE HEALTH BAR, THE WARNING BEFORE A SWING, AND THE BRAWL THAT COULD STOP  *(#205 · 2026-08-19 · build log 8f.227)*

*(Your three: "На мобильном устройстве (андроид) и мак буке шкала здоровья в бою почему-то не
отображается" · "Когда выбегаешь из зоны контроля - то давать какой-то ворнинг. Как минимум делать
иконку стоп красной и рядом меч и красным подсвечивать юнита - который будет бить" · "В начальном
бою твои солдаты не присоединяются. Токо бармен ... вы с барменом против 3х типов".)*

### 1. The bar over a head actually has red in it now

**Three steps:** menu → **The tutorial fight** → look at the two bars over anybody's head.

The **top** bar is armour and the **bottom** one is hitpoints. What should happen: the bottom bar is
a red strip that gets **shorter** as somebody is hurt, and the armour bar above it goes pale and
then dark. What it did before: nothing at all - the fill had between one pixel and **zero** pixels of
height depending on the camera stop, so on your phone and on the MacBook there was nothing to see
and on the desktop it looked like an empty bar that never moved.

**Test it on the phone**, because that is where it was reported. Also worth pressing the camera
stops (mouse wheel on the board): the bar has to stay readable at all three.

⚠ **A bug would be**: the pair sitting ON somebody's head instead of just above it, or the armour
bar looking thicker than the health bar. They are 3px and 4px and there is exactly 1px of air over
the tallest sprite in the game.

### 2. The board says what a step is about to cost

**Three steps:** any fight → let an enemy get right in front of one of yours → it is their turn,
MOVE is already selected.

What should happen: **⊘⚔ in red on the hex you are standing on**, that hex's ground goes red, and
**every enemy who would get a free swing at you glows red**. Hover the ⊘⚔ and it names them.

**Now press DISENGAGE.** The whole warning should vanish on the spot, because a disengaged step is
free - that is the card's entire job and this is the first time the board says so.

⚠ **A bug would be**: the warning showing when nobody can actually swing (somebody standing at your
BACK cannot - the zone of control has been the front arc since #173), or it showing while you have
an attack card selected rather than MOVE, or the ⊘⚔ swallowing a click.

### 3. The tap-room brawl always finishes its script

**Three steps:** menu → **The tutorial fight** → play it out.

The shape is fixed and it should never vary: Harl breaks and **runs for the door** → three carters
come in → two rounds later **the barman and the knife-man** → one round after that **Vesna, Marrow
and Ilka stand up from the bar**. Ten bodies on the field.

⚠ **What was wrong, so you know what to watch for**: Harl could talk himself back into the fight
after breaking (his nerve recovers a little every turn and it was four tenths of a percent over the
line), and **every wave in the brawl waits on him leaving the room** - so the whole tutorial stopped
and you fought one drunk forever. Driven with a Captain who never swings, it sat there to round 55.

⚠ **A bug would be**: anybody named in that sequence not appearing, or appearing and being
invisible - if the room is ever full the game now puts them further out rather than on top of
somebody. Or the fight ending the moment the knife-man walks in.

---

## 🕹 THE ITCH BUILD, AND WHAT IT FOUND  *(#203 · 2026-08-19 · build log 8f.225)*

*(Your ask: "подготовь билд на итч. И сделай описание проекта под итч (исходя из моих сообщений про
игру)".)*

**Everything for the itch page is in one folder:** `C:\Users\USER\grimtoll-itch\` holds
`rabblebound-itch.zip` (13 MB, the upload), `cover_630x500.png`, and `screenshots\` with five
1920x1080 pictures. The words to paste are [`ITCH_PAGE.md`](ITCH_PAGE.md), and it also lists the
four settings that matter on the itch form.

### 1. The build, if you want to check it before uploading

**How to reach it in three steps:** unzip `rabblebound-itch.zip` anywhere · open `index.html` ·
play. That is exactly what itch does with it.

**What should happen:** the game opens with no ⚙ cog in the corner, no WIN NOW, no LINT, no TEXT
tool, and no ⚙ Playtest notes row in the menu. Sound, art and the painted map are all in the one
file, and nothing is downloaded.

**What would be a bug:** a blank frame (that means index.html was not at the root of the zip, and
the build script refuses to produce that), silence, or any developer button showing up.

**To rebuild it yourself:**

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_itch.ps1
```

### 2. ⛔ The thing this entry actually found: a browser that blocks storage killed the game

itch does not serve your game from itch.io. It serves it from its own domain, inside a frame on
the page, and a browser set to block third-party storage does not give that frame an empty save
slot: **it makes asking for one an error**. Three lines near the top of the build asked for one
before anything else ran, and the whole script stopped there.

**What that looked like, measured, not guessed:** the title, YOU CANNOT AFFORD TO BE GOOD TO
EVERYONE under it, and **no buttons at all**. Not a crash a player could report. A front door that
looks like the game is simply badly made.

**What should happen now:** the game opens and plays normally, and the line under the menu buttons
reads *"this browser is blocking storage: the run will not survive the tab"* instead of *"vertical
slice · act one"*. **You can see it for yourself:** in Chrome, open the site settings for the page
(the icon left of the address bar), set Cookies and site data to blocked, and reload.

**What would be a bug:** the front door with no buttons on any browser or any embed, or that
warning line showing up in a browser where saving actually works.

### 3. The embed size is not a taste, and it is the one number to get right on the form

The whole game is one 1280x720 picture that scales as a unit, so the frame size on the itch page
multiplies **every letter in the game**. Measured: a 960-wide embed renders at 0.75, which puts the
10px floor we spent #164 establishing at 7.5px.

**Set the viewport to 1280 x 720 and tick the fullscreen button.** If your page theme is too narrow
for it, widen the theme rather than the frame.

### 4. What I did NOT fix, and why

Taking the screenshots turned up a real defect: on the after-battle screen, **with six or more crew,
a long nickname breaks in the middle of the word** ("Ilka "Weatherhe / ad" Renn"). I measured it
before touching it: the name column is 131px at four across and the longest nickname is 80px, so it
only bites when the card count goes to six. The property that causes it (`overflow-wrap:anywhere`)
is also what stops that card overflowing, and the alternative clips the name instead of wrapping
it, so the honest fix is a small piece of layout work on that card with its arithmetic in hand.
**It is written down in [`SHIPPED.md`](SHIPPED.md) under #203, and it is not in any of the five
screenshots.**

### 5. Two sentences for the page, if anybody asks

The build saves in the browser and installs nothing, and a run is act one: eighteen to twenty-two
days, eight routes, about an hour.

## 🔍 THE RUN-THROUGH OF 08-19, AND THE BUILD FOR YOUR BUDDY  *(#202 · 2026-08-19 · build log 8f.224)*

*(Your ask: "run game, check how it works, what is in the backlog - what is actual. If you find
smaller bugs - fix it immideatly ... prepare build and deploy in safe folder/place for my buddy
platester - actual build without dev.mode" and then "do it ... in the end after smaller things fixes
and only for tempr brunch".)*

The whole act was driven from the front door to a defeat at the Sling-Line (AUTO play, broke and
unpaid by day 13, which is what an AUTO company deserves), every screen probed for clipped boxes
and type under the 10px floor, and `LINT()` run. **No JS errors anywhere on the road.** What was
found and fixed is small and all of it is visible:

### 1. The two builds: yours keeps the cog, your buddy's has none

**How to reach it:** the branch `work/playtest-build` carries both. The root `index.html` is the
build you know. **`play/index.html` is the playtester build**: the same file, same sound, same
art, and the ⚙ cog in the bottom-right corner is not in it at all. Once the branch is on `main`,
the live link serves it at **`https://dmytriyvihrov-stack.github.io/My-game/play/`**; until then
the same page sits in **`C:\Users\USER\grimtoll-playtest-build\`** (outside Google Drive, like the
desks), ready to zip and send.

**What should happen:** in `play/` there is no cog in the corner, the menu has no ⚙ Playtest notes
row, no ✓ WIN NOW / ☰ LINT / ⌫ WIPE / ✎ TEXT appear anywhere, and **even a browser that already
had dev mode switched on** (the `gt_test` key from your own link) gets none of it, because the
player page does not read that key. Everything else is identical: the brawl, the map, the sound.

**What would be a bug:** any of the five dev buttons visible in `play/`; the cog visible there;
the root `index.html` LOSING its cog (the deploy guard reads both pages back and refuses either).

**Two new flags, if you want to run it yourself:** `deploy.ps1 -Player` builds and checks
`play\index.html` beside the normal page; `deploy.ps1 -Branch` lets it push a work branch (it then
says in yellow that the live link is unchanged, instead of printing a URL nobody can open).

### 2. The role line under a skill card fits again

**How to reach it:** open the company sheet (the party chip top-left) on the Captain, look at the
HOLD THE LINE card; or in any fight, the Captain's card row.

**What should happen:** the small line under the name reads **GUARD ALLIES**, whole. On a ratkin
cutter, DISTRACT reads **TURN IT AWAY** and an ogre's SWEEP reads **HIT ALL NEAR**. Before this
they were GUARDS ALLIES, OPENS ITS BACK and HITS ALL NEAR, and since the real JetBrains Mono landed
in #189 (it is wider than the fallback it replaced) all three were cut mid-word on both screens.
The cap is twelve characters now and `LINT()` refuses a thirteenth.

**What would be a bug:** any role line ending in a half letter, on the sheet or in the fight.

### 3. The tails of letters on the sheet and the battle plaque

**How to reach it:** company sheet, the four stat words ("Not strong", "Heavy-handed", "Easily
frightened"); in a fight, a body with a nickname on the plaque bottom-left.

**What should happen:** the g and y of those words have their tails. They were clipped by about a
pixel and a half, again since the real typefaces arrived. The rows did not grow - the column is
exactly full on the Captain - so look for the tail, not for a moved line.

### 4. The mercy screen speaks the road's language

**How to reach it:** beat a human or ratkin line where some of them break and kneel (the Broken
Men, the Sling-Line): after the fight, "Go and see what they want".

**What should happen:** the three answers wear the same sub-line every road door wears: **Let them
go · morale +14**, **Strip them · +◉30 +▤5 · morale +4**, **No prisoners · +◉60 +▤9 +◈1 · morale
−14**. Before this the middle one said *"+5 salvage +30 crowns · quietly approved of"* and the last
*"+9 salvage +60 crowns +1 gem · barely worth a word"* - the typed receipt and the mood phrase that
#176 deleted from every other door, which had survived here because this screen is not a road
card. (The killing door paid −14 and wore the ±2 phrase, so the echo was also wrong.) The Fen-
Mother's cub screen lost the same two phrases. The purse and the label agree: strip pays exactly
what it says.

**What would be a bug:** a mercy or cub row printing a figure in words ("+30 crowns") or a mood in
prose; the crowns paid not matching the chip.

### 5. Five doors stop saying "needs a ratkin" to a company that has one

**How to reach it:** the Clan Wedding, the Sitting Stone, What the Peat Kept, with a ratkin or an
ogre in the company.

**What should happen:** the race door wears its 🐀 or 👹 mark and nothing else under it except its
price. "needs a ratkin" / "needs an ogre" is gone: those doors are only ever SHOWN when the race is
present, so the words were a gate printed beside a company that had already passed it.

### 6. LINT grew two checks, and one of them had been written about for two days without existing

The rules file and the code both cited *"LINT 6f"* as the check that a door's `c:` may not carry a
figure `fx` already carries. **No such check was in `LINT()`.** It is now (and it covers the mercy
rows too), together with check 14 for the role-line cap. Both were proved by seeding a bad row and
watching them fire, then restoring and watching them go quiet. Nothing for you to test here; it is
in this file so the next "the docs say X holds it" gets checked against the build.

### What is deliberately NOT changed

- The epilogue still opens with *"The bells are still ringing"* wherever the company dies (QA-27,
  your ruling, still open).
- "no cost" still prints beside a morale price on two doors (THE DEBT's empty-chest branch and the
  Long Fire's refusal) - #197 and #198 chose that on purpose: the chest is not charged, the mood is.
- THE RED LIGHTS' detour door still prints its price twice (the derived `−2 days` and your own "the
  journey takes two days longer") - your text, standing until you say otherwise (#193).

## △ THE ARCHER'S OWN LINE NO LONGER STOPS THE ARROW  *(#212 · 2026-08-20 · build log 8f.235)*

**What changed.** Two of your own people standing between an archer and a target used to withdraw the
shot entirely. It costs accuracy now: a new lane state, **CROWDED, -20 to hit**, and the arrow always
leaves the bow.

**How to see it.** Any fight with a bow in it. Put Ilka behind two of your own, in a straight line to
an enemy inside her range, and hover the enemy.

| what you should see | |
|---|---|
| the target hex | still lit, still offering a percentage, washed pale sand |
| the ray | pale sand, tightly dashed |
| **every** one of your own in the lane | marked in the same sand |
| the hit readout | a row saying **your own in the way -20** |

**The five verdicts, so the ladder still reads in order.** Nothing between: **CLEAR**, no cost. One of
yours adjacent with his back to you: **SCREENED**, -8, unchanged. One or more of yours otherwise:
**CROWDED**, -20. One of theirs in the lane, whoever else is in it: **OBSTRUCTED**, -22 (the lane is
worth the worst thing in it and your own men never add to it). Two or more of theirs: **BLOCKED**, no
shot, and the board says *there are too many of them across the line*.

**What would be a bug.**

- A lane with only your own people in it refusing the shot at all.
- The board marking one man in the lane and not the others.
- AUTO or the enemy brain taking a crowded shot while a clean lane is on offer. It is a legal shot and
  it is still not the one to take.
- The refusal line saying *you would be shooting your own people*. Nothing can produce that now.

## ❤ THE HALF-RATKIN, AND THE FIRE CARD WHERE SHE TALKS  *(#201 · 2026-08-19 · build log 8f.223)*

**Who she is.** `Asha “Nobody’s”`, a ratkin cutter with a knife in each hand and the **Dutiful**
personality: **+8 dodge standing beside you, -4 anywhere else.** That is deliberate and it is the
character rather than a stat - she fights better next to you because that is the whole of what she
is looking for.

**How to reach her, in three steps.**

1. New run. Walk the first road to **Blood on the Road** (the clash).
2. Take **either** the door that helps the ratkin **or** the door that helps nobody. Helping the
   ratkin gives you Skree and her; standing back gives you her alone, out of the ditch.
   *(The ogre door is the one path that does not introduce her at all.)*
3. Walk on until **The Black Fen** is behind you (#212). **THE WRONG COLOUR** only enters the
   incident deck once you have been there, and like every incident it fires once per run.
   *(Before the Fen it must never be dealt, however many fires you build.)*

**What should happen at the fire.** Her painting at the top of the card, then three doors:

| the door | what it costs | what it should do |
|---|---|---|
| Put another stick on. Keep listening. | -1 provision, +10 morale | she talks till dawn. This is the romance door |
| Say it is late. Go to your blanket. | -5 morale | nothing breaks. She is exactly as friendly in the morning |
| Remind her what she is, and make it hurt. | -15 morale, an injury | **the injury lands on HER**, and it goes on your sin ledger |

**What would be a bug.**

- The third door bruising **somebody else**. The injury is supposed to be hers and nobody else's.
- The card arriving on a run where you took the **ogre** door at the clash. She is not in that
  company and the card should never be dealt.
- The card wearing **somebody else's painting** (the salt-wives, a cart, a standing stone). It is
  the only camp card in the game with art of its own.
- Her turning up on the battlefield as a **generic ratkin**, or at **twice the size** of the
  bodies beside her. She has her own 36x37 sprite and it should sit in the same band as Skree's.
- The first door charging **no provision** when the barrels have one, or charging one when the
  chip says otherwise.

⚠ **Nib and Gell are gone.** They were the two presets she replaced, so a run will not meet them
again. That is the change, not a missing character.

---
## ✎ YOUR TEXT LEDGER OF 08-19, APPLIED  *(#198 · 2026-08-19 · build log 8f.220)*

All 24 marks are in. **Four of them did not land exactly as written, and those are the four worth
your eye** - each is listed below with what it says now and why. Everything else is your text with
the typos out.

**How to reach it in three steps:** start a new run (the contract card is the second screen) →
walk the first road (the SECONDARY OBJECTIVE card is the first thing that speaks) → for the
Hold's Men, take two ☠ doors on the way east and keep walking; the patrol is three roads from
the bells.

### The four that changed on the way in

- **The purse is put down, not thrown.** You wrote *"He throws a bag of coint"*. The painting on
  that same card shows him setting a closed purse on the table, and the art rule locks it (*he
  never throws it*). So he **puts** it on the wood - in the place you moved it to, right before
  *"It appears you are a company now."* ⚠ **Also: you edited one of three versions of that
  opening.** The card has a different first paragraph depending on whether you won the brawl, lost
  it, or skipped it, and all three had the purse in them. All three lost it, or the purse would
  have landed twice.
- **Two doors asked for a `?` and cannot have one.** *Wait. Then finish the winners* keeps
  **"nobody beside you · 2 ogres against"**, because a `?` replaces the whole line and that
  line is how you compare the three doors. *Go down after them* keeps its **−1 day**, because a
  `?` is not allowed to hide a price. **Both lost the promise instead** - "both sides of the road
  are yours" and "opens a way under the hill" are gone, so both payoffs are now discovered rather
  than advertised. That is the same cut you made by hand on the deserters two marks later.
  **If you want a real `?` somewhere, say which door and it goes in.**
- **"Forget about your teammate" would be a lie.** The person who falls in the sinkhole has a
  **50% chance per leg of walking back out** - the game already built that. The door reads
  **"Leave them to find their own way out."** instead: blunt about the leaving, silent about the
  return.
- **The Hold's Men battle line is not bare "battle".** It was saying something false: it promised
  "the hounds" when the patrol brings **one**, and never mentioned the crossbow. It also **grows
  with your company** (six bodies at four of you, eight at six, nine at eight), so no fixed count
  can be right. It reads **"BATTLE · the whole patrol, and it grows with your company"**.

### And your note about the company name is built, not parked

You wrote *"instead of 'company' - here you can add dynamic name of company that person have
chosem"*. It is in. The serjeant now says **"That is The Crooked Orphans and we both know it."**
with whatever you named the company, on **both** versions of his accusation. ⚠ The narrator still
says "this company" in the card's first line and that is deliberate - the narrator has never known
you by your banner, only the man in the coat's people have.

### Three things swept that you did not mark

- **SECONDARY OBJECTIVE** is on all four surfaces, not just the card: the map plate row, the "done"
  cheer, and the contract hover.
- **The word BATTLE** is spelled one way across all eleven doors that use it. Six shouted it, five
  whispered it.
- **One more "and everybody notices"** was deleted from a fire door - the last survivor of the 63
  mood echoes cut in #176, which lived because that door is built in code rather than in the card
  table.

### What would be a bug

- The contract card **scrolling** (it sits about one pixel under its ceiling; it should not move).
  ⚠ It does overflow by 5px today, but it did that before this change too - that one is the
  prologue art re-export's job, not this entry's.
- **SECOND OBJECTIVE** appearing anywhere on screen.
- The purse being mentioned **twice** on the contract card.
- The serjeant saying **"this company"** where he should say your name, on either version.
- Any card whose sub-line now says nothing at all where it used to name a price or a gate.
## 🧍 THE COMPANY SHEET, ROUND FOUR  *(#200 · 2026-08-19 · build log 8f.222)*

Your nine notes, all on the one screen. **How to reach it in three steps:** load a run · click the
head or the sack on the road bar · click a body in the left rail.

**What should happen, one note at a time:**

1. **The rail says WHO, not what they do.** Under the race and level line each body now reads
   `Stubborn`, `Wind-touched`, `Does not run`. **Hover it and the full clause is still there**
   (`Nerve back twice as fast on a quiet turn · −5 MOR`), and the sheet on the right prints it in
   full the moment you click the row.
2. **The pools lead the band.** ARMOUR / HITPOINTS / NERVE are on the LEFT now and STRENGTH,
   AGILITY, INTELLECT, MORALE are on the right as **one column of four**. ⚡ Watch a low stat:
   `No use lifting anything` and `Hopeless with their hands` used to end in an ellipsis and should
   now print whole.
3. **The gem is a chip beside the name.** `◈ CUT A GEM`, one line, up next to the portrait, with
   `✚ MEND A SCAR` beside it when somebody has a scar and the chest is unopened. Both still open
   the same dialog, and **the sentence each used to print is on the hover**.
4. **The sheet is narrower and the right-hand pane is wider.** 450px to 530. The perk tab and the
   stash have the room; the figure and its six slots have not moved.
5. **A clean body has no ledger row.** Vesna at the start of a run should show the picture and
   nothing under it, where it used to say *"Nothing has happened to this one yet."* ⚠ The body
   PICTURE still says it on hover, which is deliberate: a hover that opens onto an empty box is
   worse than the sentence.
6. **The portraits are square and bigger** (35px round to 48px square), and the level ring became a
   **gold frame that fills clockwise round the picture**. It should read as the same progress it
   always was.
7. **The block that broke on some bodies.** Open **Marrow** (battle-mage, five cards) and **your
   Captain** (six cards): the ability cards should sit in ONE row, nothing should print through the
   `WHAT THEY CAN DO` label, and there should be no little scrollbar in the middle of the sheet.
8. **A worn item has ONE tooltip.** Hover the weapon on the body: one box, with the item's painting,
   the numbers as bullets, the flavour ONCE, and `CLICK TO TAKE IT OFF` at the foot. It used to open
   two boxes and one of them printed the description twice. ⚡ The **working stave now states its
   +2 spell range as a bullet**; that fact used to exist only in the last sentence of its story,
   which is why the sentence is gone.
9. **The amulet's lecture is deleted.** A trinket still says PERSONAL AMULET or COMPANY RELIC; only
   the relic keeps a sentence, because "it works with nobody wearing it" is the thing that tells
   the two apart.

**What would be a bug:** a slot box sitting ON the figure · an ability card row wrapping to two
lines on anybody · the sheet growing a scrollbar · a stat word cut off · two tooltips on one hover ·
the gem or the chest not opening its dialog · a tooltip that stays on screen after you click a
roster row.

⚠ **Known and NOT part of this entry:** the sheet takes about four seconds to draw with seven
bodies on the roster. That is #192's 128px item paintings being decoded on every draw, it is the
same on the build before this one, and it wants an entry of its own.
## ✒ THE EM DASH IS GONE FROM EVERYTHING YOU READ  *(#199 · 2026-08-19 · build log 8f.221)*

**Nothing here is a new feature.** 188 pieces of player-facing text carried an em dash and now
carry the punctuation their own sentence wanted. **What you are checking is that no sentence reads
worse than it did**, because that is the only thing a sweep like this can break.

**Reach it in three:** anywhere. It is on every screen. The four densest places are below.

### Where to look, in the order they are quickest to reach

* **⚔ the battle legend.** The **?** at the bottom-left of the battle screen. Its four lines used
  to be three em dashes and one hyphen; they now read as four of a kind:
  `2 actions a turn - move + strike` · `water - 2 hexes to enter` · `held - somebody is facing this
  hex` · `morale broken - white flag, and they run`. **The third one is unchanged**, and the point
  of the pass is that the other three now match it.
* **? RULES**, the whole help screen. Seven sentences changed here and they are the longest ones in
  the game. `Every body has two pools: armour, which is a shield you can strip, and hitpoints,
  which are the person.` · `days cost wages: one number on the travel card` · `Prices are honest: a
  merchant names his price, but nothing scores you.`
* **🎒 the company sheet**, and any promotion or hire card. The name line is now
  `Ummuk "Gatepost" - ogre, spearwoman`, and the trait under it `Slow to warm up - +8 to hit from
  round four onward`.
* **hover a trait or a perk.** These are the sentences that changed most: `CANNOT DISENGAGE: the
  option is not on their sheet` · `−2 STR: there is not much of them` · `Morale can never fall
  below 15%: you cannot rout` · and the one that became brackets,
  `−7 to hit at close range (nerves) and +9 morale every time they actually land one`.

### What is deliberately NOT changed, so it is not reported as a miss

* **The `–` in a number range stays**, because it is a range and not a dash: `BOAR SPEAR 22–30`,
  `1–9 fire the actions`. Only the long dash was the rule.
* **An empty readout now shows `–` rather than the long dash.** Before a fight starts, the counts
  capsule reads `⛊ – ↻ I ☠ –` and NERVE / hit / dodge each show `–`. **They must fill with real
  values the moment a battle begins** (`⛊ 6`, `🙂 HAPPY`, `58%`). A cell still showing a dash in a
  live fight is a bug.
* **The source comments still contain 1,141 of them** and that was your call. Nothing a player
  reads is among them.
* **The hosted `index.html` is still the old text.** It is generated, it was last built at #194,
  and it catches up on the next deploy.

### What would be a bug

A sentence that now reads wrong, a missing space, a doubled full stop, a lower-case word after a
full stop, or a label whose two halves have run together. **Anywhere a colon reads as heavy or a
hyphen reads as a bullet, say so and name the screen** - each one was a judgement and any of them
can be changed on its own.

---

## ✎ THE TEXT TOOL GROWS A HOVER MODE, AND CLASS AND RACE BECOME PICTURES  *(#196 · 2026-08-19 · build log 8f.218)*

Three separate things. The first two are yours only, in dev mode; the third is on every screen.

### 1. ✎ TEXT has room to write in now

**Reach it in three:** ⚙ in the bottom-right corner → **✎ TEXT** on the right-hand stack → click
any words on any screen.

* The panel is **460 wide instead of 370**, and the box you type in **grows with what is in it**
  instead of being three lines forever. A full-length card body arrives as fourteen lines, not as a
  slot the size of a tweet.
* **⇤⇥ in the panel's top-right doubles it to 860 wide**, about 112 characters a line, for
  a card body. It remembers which one you left it on.
* **A bug would be:** the panel running off the bottom of the screen, the wide panel covering the
  ✎ TEXT button so you cannot switch the mode off, or the box not growing for a long piece.

### 2. ⌁ HOVER: editing text that has no click

**Reach it in three:** arm ✎ TEXT → press **⌁ CLICK** in the panel's head so it reads
**⌁ HOVER** → rest the cursor on anything for about half a second.

* **This is the point of it.** A tooltip and a hover box die the moment you reach for them, so they
  could never be clicked and ✎ TEXT has been blind to all of that prose since it was built. Now
  the editor opens **where you stopped**, with the box still up, and catches it.
* When the thing under the cursor carries more than one string, the editor shows **targets** across
  the top: **✎ TEXT** (the words on the line), **🛈 HOVER BOX** (the big explainer that
  was showing), **🛈 TOOLTIP** (a small `title=` one). Press one to work on that string.
  The saved record says which, so the edit lands in the right place in the source.
* **A hover-box edit deliberately shows no preview** - the game rebuilds that box every time it
  opens, so a preview would be gone before you looked. A tooltip edit DOES preview.
* Clicking still picks, in either mode. Escape closes.
* **A bug would be:** the editor opening while you are just crossing the screen, the panel
  re-drawing under your hands while you type, or two tooltips appearing over one thing.

### 3. Class and race are pictures now

* On every screen where the company is **listed** - the roster down the left of the company sheet,
  the battle rail, the tavern strip, the recruits on the muster wall, the survivors after a fight -
  the words came off and the pair reads as two marks: 🧑 human · 🐀 ratkin
  · 👹 ogre, and ⚑ captain · 🔱 spear · 🏹 archer
  · 🔮 mage · 🗡🔮 battle-mage · 🗡 cutter ·
  🪓 brute · ○ no trade yet.
* **The word is one hover away, always.** Hovering either mark still opens the full lore box where
  the sheet and the muster field already had one, and shows the plain word everywhere else.
* **The word stayed** where you are studying ONE person rather than scanning a list: the promotion
  card, the trade you are picking at a level, the lore box itself, and the camp's news line.
* **The three races now use the same three marks as the event doors do**, which they did not before
  (the sheet said ◆ ▪ ⬢ and the doors have said 🐀 👹 🧑
  since the race-gated doors went in).
* **A bug would be:** a mark with no hover, two tooltips on one mark, a row that got taller, a mark
  cut off at the edge of its line, or a class you cannot tell from another at a glance.
* **Worth your opinion:** the human mark is the loudest thing on a roster row and it is also the
  least informative one, because most of the company is human. If it reads as too bright, say so -
  the marks can be tinted into the gold palette in one line without changing which pictures they
  are.
## 📜 THE SEVENTEEN ASKS OF 2026-08-19  *(#197 · build log 8f.219)*

All seventeen from that morning, in one build. Grouped by the screen you will be standing on
rather than by the number you gave them, because that is the order you will meet them in.

### On the road, on any card

1. **Every card now opens in the MIDDLE of the screen.** It used to be pinned near the node it was
   about, which on half the map meant it was clamped hard against an edge and the painting inside
   it landed wherever the node happened to be. *Bug if:* a card ever opens off-centre, or the art
   is cut on one side.
2. **A door that risks an injury says which kind: `permanent injury` or `temporary injury`.**
   This turned up something worth knowing: **nothing in the build was permanent.** Five injuries
   were written as permanent stat losses (*"−1 STR"*, *"−1 AGI"*, *"−1 INT"*) and the game was
   quietly charging hitpoints for all of them, and the text saying so was never on screen. They
   are real now: **Bad gut, Crushed foot, Pedlar's knife, Torn back and Bloom-touched cost the
   stat and stay on the sheet.** Split knuckles is the only temporary one left. *This makes the
   road harder - say so if it is too much.* The line after the choice is shorter to match: it no
   longer repeats what the label already said.
3. **A door that is not a decision has no small text under it.** *"Keep moving"*, *"Carry on"* and
   the objective card's button used to carry a caption whose whole content was that there was
   nothing to decide.
4. **THE DEBT charges no morale at all now** (the fire card about two of yours owing each other
   money). Paying out of the chest still buys +6. Letting them fight still costs blood, and ruling
   that debts do not exist is free and says so. **AND THEN - THE NINE SECONDS is gone**, so letting
   them fight ends its own story.
5. **Two cards are deleted:** *AN HOUR OF RAIN* and *AND THEN - THE NINE SECONDS*.
6. **THE LONG FIRE's second part is a third shorter.** Both halves of the ratkin's own speech are
   still there - that is your writing and it stays - but the stage directions, the sentence that
   repeated the card's own opening, and most of the paragraph explaining what CLAN buys are gone.
   *Bug if:* you cannot tell from it what being his clan actually does.
7. **The last fight has lost *"Through the marsh. Slower, but quiet."*** Two doors now: go in, or
   walk in with empty hands.
8. **THE SITTING STONE tells you there is no room BEFORE you press.** *"Ask him to come with you"*
   now reads `an ogre may join · no room left` and is greyed out on a full company. It was never
   missing; it just did not find out until after you had spent your choice. **The same fix reached
   the four other join doors** (Skree, Nib, Gell, Bruht) that nobody had reported.

### After a battle, and in the wagon

9. **Every one of the 51 pieces of kit now has a rarity: common, rare or epic.** 21 / 22 / 9.
10. **A won fight hands over a SECOND piece, on top of its own haul, 30% of the time** - 23% rare,
    7% epic. A cache pays **60%** (42 rare, 18 epic), because a buried bag you walked to on
    purpose should be worth the walk. The tier is printed as a word in its colour on the found
    row. *The white/green/purple frame round the slot is NOT in this build - that is a UI pass
    with its own picture, as agreed.*
    ⚠ **Fourteen pieces are marked `unique` and can never be found this way** - the Fen-Mother's
    tooth, Wynn's ledger-pin, the Cold Thing, the Roll of Names and the rest. They only ever come
    from the scene they belong to.
    ⚠ **A find is filtered by size**: a company with no ogre will not be handed ogre scale.
    ⚠ **Watch the balance here.** The Foundry plate and the Weeping Hammer are epic and findable,
    so a lucky early fight can hand over end-of-act kit. If that feels wrong, the dial is one
    line and it is the first thing to change.
11. **A TREASURE MAP** drops off the brigands, and off the Snare when you take it from inside the
    clan's line. **It puts a place on the map**: a node ahead becomes The Cache. It rides in the
    wagon and takes nobody's trinket slot. *It is not offered where there is nowhere left to bury
    anything*, which is why you will not see it on the very last node.

### The muster wall

12. **The four stat adjectives are off the row** (*"Not strong. Clumsy. Plain. Nervous."*). They
    are on the NAME's hover instead, beside the personality's. *Bug if:* you feel you are hiring
    blind - say so and they come back in some other form.
13. **The walk-away door wears 👣** like every walk-away on the road.
14. **The word is CLASS everywhere, not TRADE.** *no class yet*, *picks up a class at the first
    level*, *A CLASS TO PICK*, *NO CLASS YET* on the sheet.

### The map itself

15. **You can see the bottom of the map again.** Four captions at the foot (The Snare, the
    Door-Shrine, the Hill Steading, A Story Going Round) were hanging off the bottom edge. They
    each ride up by exactly as much as they were losing - 14 to 37px - so they now sit on the
    bottom of their own painting. *That is the trade: a bit of those four pictures is covered.*
    *Bug if:* any name is still cut, or a caption lands on a neighbour.
16. **Hovering a node no longer prints its type twice.** It used to read the name, then SWORDS FOR
    HIRE, then SWORDS FOR HIRE again.
17. **The green dev line along the foot of the map is gone** (*"spacing clean · 110px glyphs ·
    110×79 plates"*). The red warning that fires when two nodes are actually too close is
    untouched.
18. **Every chip on the top bar is the same height** (30px). They were 30 / 22 / 26 / 20 / 20 on
    the left and 26 on the right.

**What was measured rather than eyeballed**, in case you want to argue with a number: the map
overflow is 22px at the ROAD stop and 121px at NEAR (that one is the zoom, not the layout); the
find odds were counted over 20,000 rolls per source and come out at exactly 70/23/7 and 40/42/18;
`LINT()` is 0, the three map counters are 0/0/0, and the road-curve check is 0.
## 🎯 THE % TO HIT IS BACK, AND THE MIREHARES SHOW YOU WHERE THEY GO  *(#195 · 2026-08-19 · build log 8f.217)*

Two things, and the second one is a bug fix you should be able to feel.

### 1. The chance to hit, exactly as it was before

Everything #191 hid is back on. **Four places**, and if any one of them is missing, that is a bug:

- **on the enemy's hex**, with an attack in hand: the percentage, over the damage range;
- **on the aiming card** (hover an enemy you can reach): the big **CHANCE TO HIT** headline, and
  under it the signed terms that add up to it - `surrounded`, `your nerve`, `their nerve`, and
  `sure hand` after two misses in a row. The arc row carries its `+15 · ×1.25 dmg` again;
- **on the bottom plaque**, the acting body's own skill beside its dodge;
- **on the inspect card** for one of theirs: `SKILL / DODGE`.

**Reach it in three steps:** any battle -> pick a body with a melee weapon -> hover something of
theirs standing next to it.

⚠ **The ground notes and the `?` legend were never part of this** and did not move. Water still
says −10 on its own hover, because that is a rule of the world rather than this swing's odds.

### 2. The mirehares: hover one and you can now see where it can go

⛔ **This was drawn WRONG before, not merely missing.** Hovering the doe painted 24 hexes of which
**18 she can never reach**, and hovering the buck painted a blob with **none of his six lanes in
it**. Both were being drawn as if they walk, and neither of them walks.

**Reach it in three steps:** take the water road to **THE RED LIGHTS** -> in the fight, put your
cursor on a mirehare -> look at the board, not the card.

What you should see:

- **the doe**: a **ring of dots at exactly three hexes**, with the middle empty. Nothing inside it,
  because she cannot land closer than three. Where a landing would put her next to one of yours, a
  **curved arc** is drawn onto it - that is where she is going to come down.
- **the buck**: **six dashed lines** straight out from him, one per lane. If one of yours is standing
  on a lane with two or more hexes of run in front of him, that lane turns **solid and bright with an
  arrow-head** pointing into your man. That is the charge he is about to make.

**And the useful half is what is NOT lit.** Stand a body **right up against** either animal and it
goes out: the doe cannot land on somebody already beside her, and the buck needs two hexes of run.
That is the whole counter to the encounter and the board now says so.

**What would be a bug:**

- any tinted hex the creature cannot actually reach (count the dots: the doe's are all at three);
- a lane that bends, or a seventh lane;
- the overlay reverting to a blob **after something moves** while your cursor has not left the
  creature (this was real and is fixed: `render()` had a second copy of the rebuild);
- a bright arrow into a body the buck cannot actually charge, or no arrow onto one he can;
- anything lit next to a mirehare while your man is standing against it.

**Measured, so you know what to expect:** playing the contact rule perfectly is 20/20 fights,
0.00 of yours down and 46 hp+armour taken. Keeping your distance is 14/20, 2.50 down and 336 taken.
The pair land **8.5x fewer blows** on a company that stays in contact - so if it still feels
arbitrary once you can see the lanes, say so, because then it is the creature and not the readout.

---

## 🐇 THE MIREHARES, AND THE RED LIGHTS ON THE WATER ROAD  *(#193 · 2026-08-19 · build log 8f.212)*

Two animals that **cannot walk**. That is the whole encounter, and everything else follows from it.

- **The doe** moves only by clearing **exactly three hexes**, and she hits whatever she comes down
  beside. Not two, not four. Three.
- **The buck** moves only by **charging in a straight line**, up to four hexes, and he hits the first
  body in the line. He needs **two hexes of run** before he is allowed to charge at all, so he cannot
  simply nudge whoever is standing against him.

There are **six** straight lines on a hex board and no seventh: going "straight up" a column actually
zig-zags half a hex every step, so his lanes are E, NE, NW, W, SW and SE. If that is not what you
meant by *"strait and vertical"*, say so, because it changes the creature rather than a number.

### How to reach it, in three steps

1. ⚙ DEV.MODE → **TEST** → pick **The Mirehares** from the fight list. (In a real run they are the
   `f2` node on the flooded water road, between two safe places.)
2. Or open the card itself: the road event **THE RED LIGHTS**, which is what introduces them.
3. Press **AUTO** if you would rather watch than play it.

### What should happen

- **The card comes before the bodies.** Red lights ahead, you take them for fireflies, and fireflies
  are not red. One of your own, named, tells you to turn back. Two doors only: walk into it, or spend
  two days going around.
- **The doe never stands next to you and swings.** Every turn she is either three hexes away or she is
  landing on somebody. If she has nobody to land beside, she should still leap, and come down with
  nothing under her, rather than standing there.
- **The buck runs or he repositions.** He should never spend a turn doing nothing. If nobody is on one
  of his six lanes he drives down an empty one to put somebody on a lane next turn, and that run does
  no damage.
- **Closing the distance is the answer.** Measured over 12 fights: standing off in open ground costs
  **0.83 of your people and 178 hp+armour**; closing to contact costs **0.08 and 121**. Ten times the
  people. ⚠ Worth knowing exactly why, because it is not what it looks like: they do the **same damage
  per round** either way. What closing buys is a **4.1-round fight instead of a 6.0-round one**. You
  are not denying them, you are reaching them sooner.

### What would be a bug

- **Either animal standing still for a turn.** That was the real defect in this entry and it is what
  most of the work went on: the buck was doing nothing on **85%** of his turns, because his charge only
  fired when somebody was already sitting on a lane and he had no walk with which to go and arrange
  one. If you see one of them pass a turn with nothing happening, that has come back.
- A doe landing two or four hexes away.
- A buck charging somebody who is standing right against him, or turning a corner mid-charge.
- The detour door charging anything other than exactly two days.

### One thing I did not change, and want your word on

The detour door reads **`−2 days · the journey takes two days longer`**. It says its price twice: the
`−2 days` chip is generated by the game off the actual cost, and your subtext then repeats it in
words. Every other card in the game keeps the number on the chip only. It is **your** written text so
I left it exactly as you wrote it; deleting the sentence is a one-word change and leaves the door
reading `−2 days`.

### Also worth a look

The two battle icons and the event painting are yours, wired verbatim: doe **48x52**, buck **54x40**,
both transparent, and **THE RED LIGHTS** painting at **586x212**. Nothing was resized or recropped.

## 🖼 EVERY PIECE OF KIT HAS ITS OWN PAINTING NOW  *(#192 part two · 2026-08-19 · build log 8f.215)*

ChatGPT painted all 56 icons off the brief and they are wired in. **Nothing about
what any item DOES changed** - this is the picture layer and only the picture
layer, so if a number moved anywhere, that is a bug.

**How to reach it in three steps:** open the game → **Continue the road** →
**THE COMPANY**. The four gear slots and every row of THE STASH should be
carrying a painting.

**What should happen**

- **On the sheet.** Each filled slot shows a **40px painting on its left**, with
  the slot's label, the item's name and its short receipt stacked beside it. An
  EMPTY slot is unchanged (dashed, no picture). The BAG still says *"throwables
  and potions, later"* and has no picture, because it still cannot hold anything.
- **In the stash.** Same shape: picture left, name and numbers right.
- **On the hover tip.** The piece's picture heads the tip at 40px with the name
  beside it, where the little glyph used to be.
- **At the quartermaster's cart** (the Muster Field → *"The quartermaster's
  cart"*): the reserved square that has been empty since it was built now holds
  the piece at 56px.
- **When the road hands you something** (the pedlar's shield, any battle haul):
  the loot strip's square holds the picture instead of the words ART SLOT. **A
  haul of two things shows two squares**, one each.

**What would be a bug**

- Any slot or row **taller than it was**, so the sheet scrolls or two slots
  touch. This was the one real risk and it was measured: a filled slot is 63px
  against a 67px gap, so it should clear by 4px and no more.
- A picture that is **stretched or squashed** rather than square.
- A **white or grey box** behind a painting (they are cut-outs and should sit on
  the slot's own brown).
- The wrong picture on a thing. **56 keys were mapped by hand**, so a broom on
  the mail hauberk is possible and is worth reporting by name.
- Any number changing anywhere on the sheet.

**What is deliberately NOT here yet**

- **Rarity has no colour on screen.** The three tiers (white / green / purple)
  are decided and written down, but nothing carries a `rarity:` field yet, so
  there is no frame to see. That is the next piece of #192, not a miss.
- **The five new items** (pilum, shuriken, Time-Cube, Thunder-fish Kris,
  Fingerprint Stone Shield) have their paintings embedded and **do not exist in
  the game**. You cannot find them, and the BAG is still empty. Their pictures
  are in the build so the day the rows land there is nothing to wire.
## 🗺️ FOUR THINGS ON THE WORLD MAP  *(#194 · 2026-08-19 · build log 8f.216)*

Four separate asks in one batch. They do not touch each other, so test them
separately. Three are on the map screen and one is a road event.

### 1. Places you have walked through stay lit

**How to reach it:** start a run and walk three or four nodes east. Then look
back west at where you came from.

**What should happen**

- Every node you have stood in is **fully visible** - the painting, the ring
  and the name plate - with a **✓** in front of its name and the ring in a
  pale grey-brown rather than its type colour.
- It should read as **spent, not available**. A place you may walk to right now
  is the only thing on the map that **pulses gold**; a walked one is still and
  its colours are about half as strong.
- A node you have never been near is still a faint ghost, the way it was.
- The buried-cache node, once dug up, loses its green ✦ and joins the rest.

**What would be a bug**

- A walked node that **beats or glows**, or that you can click. Only gold ones
  are roads.
- A walked node that is still nearly invisible: that is the thing this changed.
- A walked node whose name plate has gone dark or lost its ✓.

### 2. The legend along the bottom of the map is gone

**How to reach it:** open the world map.

**What should happen**

- The bottom-left corner has **RULES** and **MENU** and nothing else. The row of
  coloured diamonds (`◆ battle · ◆ trade · ◆ strange ...`) is deleted.
- **Nothing replaced it.** Hovering any node still tells you what it is.

**What would be a bug** - the strip still showing after a reload, or an empty
bordered box where it used to be.

### 3. The clan wedding now happens on every run

**How to reach it:** play east until the dog attack at **The Ruined Steading**,
then the **Muster Field**. The next node is **THE CLAN WEDDING**.

**What should happen**

- It is a **named node with its own painting**, on the road between the muster
  and the Black Fen, and **you cannot route around it** - whichever fork you
  took at the start, this is the way through.
- The card is the one you have seen before: stay for a drink, cut them down
  (the `?` door), push politely through. With a **ratkin or an ogre** in the
  company you also get their door, and *push politely through* correctly
  **disappears** - a free door beats a walk-away, which is the existing rule.
- Whatever you do, the road on out of it goes **down into the fen**.

**What would be a bug**

- Meeting the wedding **twice** in one run (it should no longer turn up in a
  random "Something on the road" slot).
- A road that skips it, or the muster leading straight to the Black Fen.
- Its painting or name plate **sitting on top of** the Muster Field, Coldharrow
  or the Black Fen.

⚠ **This is one day longer than before.** The mandatory corridor gained a leg,
so a whole run is now 20 to 24 days instead of 19 to 23, and that is one more
day of wages. Say so if it feels like one day too many.

⚑ **It is one stop later than you sketched, and you chose that.** There is no
room between the dogs and the muster: they are 167px apart and the map's own
spacing rule needs 90, so anything between them lands 83px from each. The two
ways to force it there were to move The Muster Field or to let the wedding sit
under the road down to the fen; you picked the version where nothing else moves.

### 4. The day plaque no longer explains itself

**How to reach it:** on the world map, hover the **DAY 3 MIDDAY** plaque in the
middle of the top bar, and the little sun/moon disc beside it.

**What should happen**

- **Nothing.** No tooltip, and the cursor stays an ordinary arrow rather than
  turning into a question mark.
- Everything else on that bar still has its hover: the contract, the purse, the
  provisions, the mood, the health.

**What would be a bug** - the tooltip still appearing, the help cursor still
showing over the plaque, or one of the *other* chips having lost its hover.

---

## Everything older

**Everything that shipped on 2026-08-18 and before was cut on 2026-08-21**, the fourth cut of this
file, for the reason the first three give: a test bench nobody can get to the bottom of is not a
test bench. It had grown back to **2,322 lines** since the 2026-08-19 cut. What is left is the last
three days, **2026-08-19 to 2026-08-21**, which is what you have not yet played.

**Nothing was copied anywhere and nothing is lost.** Git holds every word of it, and one command
puts it back on your desk:

```powershell
git show 76b1e3c:docs/WHAT_TO_TEST.md > older_test_bench.md
```

⛔ **AND THIS FILE IS CUT THE OPPOSITE WAY FROM THE CHANGELOG, WHICH IS A DECISION AND NOT AN
INCONSISTENCY.** On the same day `CHANGELOG.md` was split at 1.26 MB and its old rows moved to
**files** under [`archive/`](archive/), not to a hash, because `.claude/rules/*` and the memory
index cite old entry numbers constantly and a rule pointing at reasoning `grep` cannot reach is
worse than a long file. **A played test has no such readers.** Once you have played it, it is
finished; the reasoning behind it lives in the changelog either way.

The earlier cuts are further back: `git show 1d2e1b3:docs/WHAT_TO_TEST.md` is the bench before
2026-08-19, `git show 5bb2bf2:docs/WHAT_TO_TEST.md` before 2026-08-14, and
`git show 5bb2bf2:docs/archive/WHAT_TO_TEST_OLDER.md` is 2026-08-02 and earlier.

## #231 - the battle readouts on demand (8f.254)

**Play one fight and watch the hexes rather than the numbers.** The point of the change is that the board is quiet until it is asked.

- with MOVE standing and the pointer nowhere, an enemy in reach should carry **no percentage and no damage range**. Pick a skill, or rest the pointer on its card, and every body that skill can reach lights up with its chance. Point at ONE of them and only that one quotes the blow.
- ⚠ **the thing to feel for is whether it is now too quiet.** The odds were on the board all turn and they are two states away; if picking a card to see a number reads as a chore rather than as a question, say so - it is one boolean.
- both figures are a fifth smaller. They are on a screen the camera magnifies, so they should still be readable at the FULL stop; **if they are not, the answer is dimmer or narrower and never bigger**, or the whole ask comes back.
- step away from a body two enemies are holding: the price is **one number under your own feet** now, not a plate on the ground you are aiming at, and it is the chance that ANY of them lands - so it reads higher than either of them separately. The hover names each one.
- rest on an enemy low on the field and read the card to the bottom: **WHAT IT CAN DO TO YOU should be fully visible above the row of skills.**

---

## Checked

*Move a section here when you have played it, with what you thought. That is what stops the same
thing being re-tested every session.*
