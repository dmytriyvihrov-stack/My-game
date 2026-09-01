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

## #280 - The class lab: every class in one table, a body built by hand, and a fight to try it in

**Not in the game.** This is a tool and the game does not know it exists. It reads the game file
LIVE, so unlike `tools/artifacts.html` it needs a server: start one, then open the page.

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1
http://localhost:8777/tools/classes.html
```

**In three steps.** Wait for the status line to say *ready* (the game file is large; ten to thirty
seconds, longer in a background tab) · **THE CLASSES** is every class as the build holds it,
with the logic column - strength, weakness, archetype - at the top · **THE BUILDER** picks a
race, a class, a level, a personality and a harness, and **▶ FIGHT** drops that exact body onto
the practice field.

- **It should say what the build says, not what a document says.** Change a lean, a perk tier, a
  price or a `START_GEAR` row in the prototype, press **⟳ RELOAD BUILD**, and the tool shows the
  new figure. Nothing on the page is typed twice - the one exception is the STRENGTH / WEAKNESS /
  ARCHETYPE column, which says AUTHORED on itself wherever it is drawn.
- **The builder's figures should match the game's.** Put mail on a human spearwoman and the armour
  goes 2 to 19 and the dodge 14 to 11 (the hauberk is -1 AGI); tick THICK HIDE on a brute and the
  armour goes 0 to 5. Those are the game's own numbers through `HDA_CUT`, not the raw table.
- **The fight is a real fight.** Two Poachers in the tap-room against one level-3 spearwoman is
  about eleven rounds. **Leaving it must hand the company back**: press **LEAVE THE FIGHT** (or
  Escape) and the party behind the tool is You, Vesna, Marrow, Ilka again, exactly as it was.
- **The wrong harness goes on, and costs.** The armoury dims what does not fit but still lets
  you wear it, because the game does. Put the mail hauberk on an ogre: **19 armour becomes 13**
  (×0.70), AGI and MOR each drop, and the ladder names the row *the harness does not fit*.
- **What would be a bug.** A figure in the builder that disagrees with the same body on the
  company sheet in the game · a perk you can tick above your level · a wrong-size piece that
  goes on for free · anything you do in the practice fight following the company home · the
  status line stuck on *loading the build* after a minute with the server running.
- **Known and not a bug.** The CAPTAIN card says *nobody · not on any muster wall*: that is
  `CLS_BY_RACE`, and it has never contained the captain · tiers 6 and 8 are empty for every class
  · the arena bar calls the tap-room *24% walkable: a single mandatory corridor* - the shipped
  tap-room brawl measures 16% on the same reading, so the room is the room. Any other ground is one
  click away in **the ground**.

## #279 - The Armoury: every artifact, where it comes from, and who it is for

**Not in the game.** This is a tool, and the game does not know it exists. Open
`tools/artifacts.html` in a browser: no server, no build step, one file.

**In three steps.** Open the file · the table is every artifact in the game, grouped by slot
· the second tab, **WHERE THEY COME FROM**, is the same census asked the other way round: one
card per place a piece of kit can arrive from, plus one card per tier showing exactly what a shop
rack and a battle find can roll.

- **The header should say `60 artifacts · 55 painted · 4 nothing can reach`** and the
  four should be listed at the bottom of the page under WHAT NOTHING CAN REACH. Set the source
  filter to *nothing can reach it* and you should get exactly those four.
- **Every dotted cell is editable and every edit survives a reload.** They live in this browser
  only, they never touch the build, and EXPORT JSON hands back both the whole table and the raw
  edit map. RESET EDITS asks before it throws them away, and asks a SECOND time about drafts.
- **The redraw checkbox under each picture** is an edit like any other: tick a few, and EXPORT
  JSON carries a `redraw` list an artist can be handed straight.
- **+ NEW ARTIFACT** opens the drafting bench. Fill in a key and a name, pick a tier and a slot,
  and the price at the bottom right updates as you type - that figure is charged by the game's own
  `gearPrice()`, not by the tool. SAVE THE DRAFT and it appears in the table marked DRAFT, grouped
  under its own slot. EXPORT JSON then carries a `newArtifacts` block with the `GEAR{}` line ready
  to paste.
- **It would be a bug** if: a figure here disagrees with the same figure in the game (everything
  is derived, so a disagreement is a real defect, not a stale copy) · an artifact you know a
  card hands over is listed as unreachable · an edit or a draft disappears on reload ·
  the price on the drafting bench disagrees with what the shop charges once the row is in the
  build · the table scrolls the whole page sideways instead of scrolling inside itself.
- ⚠ **The armour and damage figures are POST-`HDA_CUT`**, which is what the board plays with,
  and the note at the top says so. A description still quoting the authored figure is listed at the
  bottom of the page as a defect - there are five today, all of them on the forge card.

## #278 - three vacuous checks, the table the linter never read, and two dead vignettes

**In the game.** Nothing changed that a player can see, and that is deliberate: this entry
is entirely gates and record. The one player-facing fact it establishes is a NEGATIVE one.

- **two vignettes will never come, and that is correct.** `VIGNETTES[8]` and `VIGNETTES[9]`
  are the two AT THE FIRE cards about a gilled body. Mutations are parked (#16), nobody can
  have gills, and both card bodies read the gilled body directly, so they would throw if they
  were shown. **If one ever appears on the road, that is the bug**: it means something started
  writing `p.mut` again with `MUTATIONS_ON` still false;
- the other eight vignettes and all nineteen camp incidents are untouched. Camp for a few
  nights in a row and you should still see the usual spread.

**On the bench**, which is where this entry actually lives:

```bash
python tools/dev/gt.py eval smoke.js
```

- **19 steps, `errors` empty.** It used to be 14, and two of them tested nothing. If the walk
  ever prints fewer than 19 steps, a step was lost;
- `village (the shop) ok 6 doors`, `provisions ok 6 doors`, `wagon ok 8 doors`. **A door count
  of 0 on any of those three is a finding**, and it usually means the previous card was left
  open in `#wDlg`;
- `enterWorld ok day 1 at hold` and the party count. **A step that says `ok` while naming
  nothing is the shape this entry was written about**: if a step ever reads `ok` with no
  figure behind it, check that the function it calls still exists.

```bash
python tools/dev/gt.py eval reach.js
```

- `deadGates.needMutGates` should read **exactly three rows**: `EVENTS:chapel#1`,
  `VIGNETTES[8] (card)` and `VIGNETTES[9] (card)`. **A fourth is new dead content**;
  **fewer than three means the scan broke**, not that something was fixed.

## #277 - one creature, its contexts, and the redraw flag

**In the game.** Nothing should look different, and that is the whole test:

- start Blood on the Road, the Snare, the sling-line, the pack, the deserters and the
  Hold's men. The cast, every number and the board are identical to the previous build:
  thirteen statblocks became five creatures plus ten deltas and **not one figure moved**;
- the ogre in the Snare is still OGRE, CLAN-HIRED with 64 armour and a 23-34 warclub, and
  the one at Blood on the Road is still OGRE, CLUB with 27 armour and 22-33. Same animal,
  two hand-made contexts, one entity behind them.

**In `tools/enemies.html`:**

- five rows now carry a teal **N MORE CONTEXTS** toggle. Open the Lurcher: three bodies
  fold out, each showing only what its fight tuned;
- tick the **redraw** box under any picture. The cell edges red, the header counts it, and
  EXPORT JSON carries a `redraw` list with the name, the variant, the sprite key and the
  fights it appears in. Reload: the ticks are still there. RESET EDITS clears them.

```bash
python tools/dev/gt.py eval tools/dev/probes/foeoracle263.js   # TWICE a build, then diff
```
⛔ Twice a build. `steading`, `snarejoin`, `ashdrakes` and `glassroad` roll their own cast,
so a single cross-build diff reports four findings that are not there.

## #276 - the foe dex, the grouped statblocks, and the threat price

**Open `tools/enemies.html` in a browser.** It is a loose file and needs no server.

- the ENEMIES tab opens grouped into **14 families**, threat-sorted, 60 bodies with 5
  champions folded in. Click a `CHAMPION` toggle: the better version appears under its base
  with a gold rail. Hold billman's toggle reads **2 rolls, 32/30 pts** because the perks are
  rolled;
- click any column header. **The groups switch off** - a header saying DOGS over a list
  ordered by hitpoints would be a claim the rows do not support;
- hover a skill chip for its own sentence, a `CHAMPION` perk chip for what the perk does, and
  a card chip for the door that starts the fight;
- edit any dotted cell. It marks green, survives a reload, and **EXPORT JSON** carries it;
  **RESET EDITS** throws them away;
- the FIGHTS tab: 20 cards, each with its cast, per-body pts and the easy/even/hard bands;
- the foot of the ENEMIES tab: **what was drawn and is never shown**, with the pictures.

**In the game**, and this is the half that could break something:

- open the practice field (⚙ dev mode). Every fight's `easy / even / hard` figures are
  about **3x what they were** and the RATIOS are unchanged. A starting company is ~100 points
  again, which is what "bring 100 points" was always supposed to mean;
- start each of the twenty fights. The cast, the numbers and the board are byte-identical to
  the previous build: the statblocks MOVED and not one figure changed.

```bash
python tools/dev/gt.py eval tools/dev/probes/foeoracle263.js   # twice a build, then diff
python tools/dev/gt.py eval tools/dev/probes/ptsprice.js       # every body, every fight
python tools/dev/gt.py eval tools/dev/probes/orphanart.js      # what nothing can reach
```

## 🧪 THE TWO CAPS, THE MISSING DISENGAGE, AND A CLOAK  *(#275 · 2026-08-31 · build log 8f.299)*

**Reach the caps in three steps:** company sheet → hover TO HIT, then hover DODGE.

**What should happen.** The DODGE hover's `hard to stack past 12` row is now `past 25`, and on an
ordinary body it **does not appear at all** - which was the bug. A starting body dodges 14, so every
body in the game was being taxed by a cap meant for a stacked one. TO HIT has the same row now at
**100**, and it will not appear until you have built somebody past it. ⚠ Both figures on the sheet
may read a point or two higher than you remember; that is the tax coming off.

**The DISENGAGE that is not there.** Since #224 it is a PERK, and three places went on telling you
to spend it. Open the tap-room brawl and let two of them get a hand on the Captain: the CIRCLED card
now says *"Nobody here has learned to step out of a grip yet"*. Hover any hex inside a red edge:
HELD GROUND says **two ways out** on a body without the card and **three** on one with it.

**The twice-a-turn tally.** Swing the same card twice and hover it: the receipt line now says
`· 1 OF 2 THIS TURN` beside the cost. Nothing is reduced by repeating an attack and nothing ever
was - only a second MOVE is shorter - and the Captain's lesson used to claim otherwise.

**The brawl's first swing.** Your first attack of the tap-room fight reads **100%** and cannot miss.
One swing, one fight, one run. Whether you want it at all is **Y2** in
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md).

**Reach the cloak in three steps:** find or buy a **Disguise Cloak** (70 crowns, uncommon, bag slot)
→ equip it on somebody → in a fight, press **PULL IT OVER YOU** (1 action, once a fight).

**What should happen.** A `▒` badge under their feet, and **nothing on the other side can aim at
them at all** for two rounds. It comes off when:

- **they swing, or anything lands on them.** Attacking gives you away, and so does a spell that
  catches you in passing;
- **anything clever ends up beside them.** An INTELLECT rung of 2 or better sees the shape under the
  rags. A dog or a drunk does not;
- **anything walks into the hex they are standing on.** The enemy does not know they are there, so
  it picks that ground like any other ground, walks into them, and stops one hex short;
- **or two rounds pass**, and the log says so rather than letting it end silently.

**What would be a bug:** two bodies on one hex after a bump · an enemy shooting a hidden body from
across the map · the cloak surviving your own attack · the badge showing on a body that can be aimed
at · a hidden body taking a free swing at somebody walking past it (it holds no ground while it is
hidden, on purpose).

---

## 🧪 THE LIZARDS FIGHT NOW  *(#274 · 2026-08-31 · build log 8f.298)*

**Reach it in three steps:** the road → any of the five lizard cards (THE WARM STONES, THE GLASS
ROAD, THE ASH-DRAKES, SOMETHING IN THE SCRUB, the Furnace) → open the fight.

**What should happen.** They come at you. Before this they counted as an archery line - a spit and a
tongue at three hexes each - decided you should cross the ground, and then stood at the far edge of
the map for the whole fight because nothing was ever in range of a weapon that short. Now:

- **the salamanders keep with the big ones.** They no longer run out in front on their own; they
  hang back toward the slag-hides and the drakes and spit from two hexes;
- **the slag-hides use the tongue.** It hauls somebody out of your line and drops them against its
  flank, and it is on a one-turn cooldown - on the cooling turn the animal now walks in and BITES
  instead of standing at two hexes doing nothing;
- **and the tongue's blow is drawn on the body, not on the hex it just emptied.** That is the one
  you reported as *attacking empty tiles*: the damage flash and the number were painted where the
  body HAD been, a fifth of a second before it was dragged somewhere else.

⚠ **THESE FIGHTS ARE HARDER AND THE FIGURES ARE IN THE RECORD.** Measured over 30 runs a cell:
the ash-drakes went 93% to 63% for a prepared six and the glass road 100% to 83%. That is the price
of them actually fighting, and whether it is the fight you wanted is **X1** in
[`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md).

**What would be a bug:** a lizard standing still with something inside three hexes · a salamander
alone at the front · any damage mark on a hex with nobody on it · a slag-hide that never uses
the tongue across a whole fight.

---

## 🧪 HOVER AN ENEMY, AND FOUR OTHER THINGS ON THE BOARD  *(#274)*

1. **Hover an enemy.** Two red areas as before, and they have **traded weight**: the STRONGER red is
   now the ring it can *hit*, the fainter is where it can *walk*. You asked for it that way round;
   the outer ring is the one you act on.
2. **Hover an enemy and read its card.** Under each act there is now a line saying what the act
   DOES - *"Three hexes, and it does not let go"* - instead of only its damage and range. Your own
   bodies do not get it: that sentence is already on the card you press.
3. **Take an archer or a mage and hover a hex you could step to.** The percentages on the enemies
   are now the ones you would have **from there**, in italic with a dotted underline. Move the
   pointer off and they go back to the figures from where you stand. ⚠ **A two-action stride shows
   none**, on purpose: it empties the body, so there is no shot to price.
4. **Make a two-action move.** The turn goes to the next body **at once** - the three-second wait is
   deleted - and the ⟲ button is still there. Press it and the mover steps back with both actions
   and the turn returns to it. ⚠ It only survives while the next body is one of YOURS: when the
   next in initiative is an enemy the offer goes with the hand-over, because an enemy's turn cannot
   be interrupted. That is **X3**.
5. **The armour bar** is divided every **5** points now, the same as the health bar, instead of
   every 3.

**What would be a bug:** a figure left on the board after the pointer moves off · two percentages
on one enemy at once · ⟲ giving a body a second full turn · an enemy's mood or poison
ticking twice after you press it.

---

## 🧪 THE COMPANY SHEET: SKILLS ARE BACK, PERKS ARE IN THE TAB  *(#274)*

**Reach it in three steps:** THE COMPANY → anybody → look under the gear slots.

**SKILLS is a row in the character column again**, where it was before #268, and it stays there
whichever tab is open. **The perk tree is only on the ★ PERKS tab.** ⛑ It was being drawn on
the STASH tab as well - the whole tree stacked under your items on every sheet in the game, since
#264 - which is what your screenshot showed.

**Also:** the **padded jack is UNCOMMON** now. It costs 70 rather than 45, breaks down for 25 crowns
and 2 salvage rather than 10 crowns, and it is found and stocked at the uncommon tier.

**What would be a bug:** the perk tree visible while THE STASH is selected · the character column
scrolling · the skill cards wrapping onto a second row on anybody.

---

## 🧪 THE ZOOM ROW IS GONE FROM THE MAP  *(#273 · 2026-08-31 · build log 8f.297)*

**The short version:** ROAD / NEAR / CLOSE has come off the map's top-right corner, and the road's
state chip is standing in its place. **Zooming still works exactly as before - on the wheel.**

| what to check | where | what should happen |
|---|---|---|
| **the wheel still zooms** | the map, wheel up and down anywhere on it | it steps between the same three stops it always did, and the stop is still remembered between sessions. Nothing else changed about them |
| **including over the chip** | wheel with the pointer directly on the arch | it still steps. The old button row swallowed the wheel; the chip must not, because the wheel is now the only zoom there is |
| **the drag still pans** | at NEAR or CLOSE, drag the map | it pans. Dragging **from the arch itself** should not start a pan - you are reaching for its tooltip |
| **the card still scrolls** | open a long event card and wheel over its prose | the card scrolls and the map does **not** zoom underneath it |
| **nothing is buried** | look at the corner at all three zoom stops | the arch covers no node and no name plate, and does not touch ☰ MENU |

⚠ **THE COMPANY SHEET NO LONGER SHOWS THE ROAD'S STATE.** That is the price of putting it on the
map: it is positioned against the map itself now, so it cannot travel onto the sheet's bar the way
the chest and the company chips do. If you want it back on both, say so - it is one line.

---

## 🧪 THE ROAD'S OWN STATE  *(#272 · 2026-08-31 · build log 8f.296)*

**The short version:** the map's top-right corner has a new chip, just under ☰ MENU, where the
ROAD / NEAR / CLOSE buttons used to be (see #273 above): a small arch with a skull at one end and a
handshake at the other. It is the state of the **ROAD**, not a score of you, and today it does
nothing whatsoever except say what it is.

⛔ **THE ONE THING TO JUDGE IS WHETHER ANYBODY NOTICES IT**, which was your own condition
(*"lets do it and see - do people recognise it"*). So the question to put to a playtester is not
whether they like it. It is whether they can say what it means **without being told**.

⚠ **AND IT IS DELIBERATELY WIRED TO NOTHING.** No door, price or fight behaves differently because
of it. Your concept doc refuses a karma meter in three separate lines, and the only reason this is
not one is that it scores the road rather than your company and pays nothing at all. There is a new
section next to that pillar in `01_GAME_CONCEPT.md` explaining what would have to change first.

| what to check | where | what should happen |
|---|---|---|
| **it is there from day one** | start a run, look at the map's top-right corner, under ☰ MENU | a stone-grey arch with one segment lit at the crown, skull left, handshake right. The hover says **A QUIET ROAD** |
| **a cruelty moves it** | take one ☠️ door - rob the pedlar, the toll-man, the wedding | the arch grows two segments to the LEFT and **stays grey**: one bad thing is a thing that happened, not a pattern. Take a second ☠️ door and the whole chip goes red: **A BLACK ROAD** |
| **a kindness moves it** | take two 🤝 or 🙏 doors | it grows to the RIGHT and goes green: **A CLEAN ROAD**. One is not enough, exactly as with cruelty |
| **the mixed case** | three cruelties and three kindnesses in the same run | **BLACK**, not grey. A cruelty is worth two kindnesses on this arc, on purpose |
| **it is on the map only** | open THE COMPANY | the arch is **not** there, and that is #273's known cost rather than a bug. It lives on the map, where it is positioned |
| **the hover tells the whole truth** | hover it after a few doors | it names the state, lists what you have actually done (`☠️ EVIL 2`, `🤝 HELP 1`), and ends with *"It changes nothing on the road. Not yet."* |

**What would be a bug:** a number anywhere on the chip · one single door flipping it black or white
· the chip sitting on top of the chest, the wagon or ☰ MENU · it not moving at all after two ☠️
doors · any door, price or fight behaving differently because of where the arch stands.

---

## 🧪 THE NINE-ASK BATCH  *(#270 · 2026-08-31 · build log 8f.295)*

**The short version:** nine points off four screenshots. **One of them is the soft lock you hit**,
and it turned out to be yesterday's own feature shipped without a button: #268's mid-road stop
held the map locked and the resume it built could only be reached by calling the function, never by
clicking anything. The rest is two caps (four ratkin, one hire a wall), two cuts on screens that
were saying things twice, the wagon growing a second ladder, and the top mood rung buying you a
payday.

⛔ **THE TWO TO ARGUE WITH ARE THE PAYDAY AND THE RACKS.** A company at HIGH SPIRITS now pays
**nothing at all** on a payday, which is about thirty crowns every fourth day, deterministically -
not a chance. And the wagon's fittings are capped at **two** until you buy racks, where before the
only cap was the money. Both are one constant if either feels wrong.

| what to check | where | what should happen |
|---|---|---|
| **the road unsticks** | take a road two or more days long, and answer whatever card stops you halfway | the column stops, a line says **"The column has stopped where it stands. Press <the place> again to go on."**, and the destination stays LIT with **· press to go on** under its name while every other node is dark. Pressing it walks the rest of the leg. Before today nothing on that map was clickable at all |
| **the menu opens from anywhere** | press ☰ MENU while a card is open, while the column is stopped mid-road, and on the after-battle report | it opens. On the report it ASKS first, because leaving there throws away the prisoners. It is also on the run's END screen now. The old *"Finish what you are standing in first"* refusal is gone |
| **the roster's lines** | open THE COMPANY and click down the left column | exactly ONE gold line, on the tile you have picked. The coloured race lines on every tile are gone, and the portrait no longer shifts sideways when you select it |
| **the report says less** | win a fight with somebody carried off | no pop-up explaining down-versus-killed. The crew card under it still says `hurt · 8d` / `carried off · <the scar>`, and the line over the grid still says `1 OF 4 CARRIED OFF`. The haul chips are `◉ +55` with **no words** |
| **four ratkin** | hire ratkin until you have four, then look at a ratkin door or a ratkin on a muster wall | the row is dead and says **four ratkin is as many as will share a fire** - not "no room left", which would be a lie with seats free. An ogre or a human on the same wall is unaffected |
| **one off the wall** | a muster field | the card says *They will let you take one of them*. After one hire all three go dead with **· one off this wall, and you took them**, and their prices do not move |
| **the free payday** | get the company to HIGH SPIRITS and walk into a payday | nothing leaves the chest and the line reads *"Nobody puts a hand out. Travelling with you is worth more than the money."* ⚠ It will NOT fire if anybody is already owed back wages, on purpose |
| **THE RACKS** | open THE WAGON | a second tiered row under the frame, three pips, **holds 2 → 3 bolted in**. With two things bolted in the rest of the tiles go grey saying **no room on the racks**. The header reads `SEATS n OF m · SLOTS n OF m` |
| **THE KEPT CRATE** | bolt the crate in, then press one of your other bolted fittings | that tile lights gold, says **BOLTED IN · ◆ KEPT** and *this is the one that rides on*; the crate says *keeping The Bed*. Finish the run and walk back to the wagon: the next company starts with that fitting already bolted in. ⚠ A company that DIES keeps nothing |
| **the holes** | any fight on the rocky ridge in the back half of a run (the Sling-Line, the Steading-Line, Something in Armour) | when there are pits there are **two or three** of them, never one, with a rock or two of spoil lying beside them. Nothing should ever be walled into a hole |

⏳ **What is unfinished:** the two new wagon tiles have no painting and fall back to a glyph
(`wagon_rack`, `wagon_crate`), the way every wagon tile did before the art landed.

---

## 🧪 THE TWENTY-FIVE-ASK BATCH  *(#269 · 2026-08-31 · build log 8f.294)*

**The short version:** twenty-five points off eleven screenshots. Two of them were bugs rather
than asks - **Coldharrow soft-locked on every single visit** and had done for eight days, and the
XP a fight pays had quietly fallen 3.5x when hitpoints did. The rest is one big rule change (all
armour stops 70%, the categories deleted), one big honesty pass (ten personalities were promising
stat figures the fight does not charge), and a long tail of small ones.

⛔ **THE ONE TO ARGUE WITH IS THE ARMOUR.** Every suit stopping 70% makes armoured enemies
noticeably harder: measured against yesterday's build, **THE HOLD'S MEN went 30% to 5% for the
starting four** and **THE CIRCLE 55% to 25% for the prepared six** (n=20 a side). Isolated one knob
at a time on the Hold: 70% absorb reads 0-5%, 60% reads 5%, **50% reads 25%** - i.e. that is the
whole of it, and it is one number (`ARMOUR_ABSORB`). Say the word and it moves.

| what to check | where | what should happen |
|---|---|---|
| **Coldharrow does not lock** | walk into Coldharrow | six buttons: bone-setter, market, the rack, and **Back to the road**. Before today there were **none at all** and the only way out was reloading |
| all armour stops 70% | battle card, hover the ⛨ mark | no LIGHT/MEDIUM/HEAVY word in the bar any more. The hover says 70% stops, 30% reaches the body. A stripped body still says **NONE** |
| the hitpoint hover | company sheet, hover the ♥ bar | every line that made the pool: build and race, how much of them there is, what they are carrying, their nature, what the levels bought, the shooter's tithe, an injury |
| the mood hover | company sheet, hover the ☺ bar | the ladder as before, and **under it** what put them on that rung: their own nature, the company's mood, their personality, the banner and the drum, what the road owes them |
| the capstone rung | sheet → hover AGILITY | the top rung now reads **FLEET · +1 hex of step, every turn**. Same on STANDS, UNREPEATABLE and TWO PERK POINTS |
| a trait's figures | sheet → hover **Twitchy** | **+1 AGI · −1 MOR**, matching the AGILITY column beside it, and a paragraph that is not the same line again. It said +2 and −3 |
| Asha | company sheet → Asha | personality **Half human**, +1 STR and +1 MOR, −1 AGI |
| an archer with no bow | strip Ilka's bow, open a fight | **no CRIPPLING SHOT**. Put the bow back and it returns. Same for a spearwoman without a pole and a brute with empty hands |
| XP | win any fight, read the aftermath | roughly three and a half times what it paid yesterday. Levels should arrive at about the old pace again |
| surrounded | aiming card, three bodies on one target | `surrounded +10` where it used to read +30 |
| the enemy card | hover any enemy | **⛨ / ♥ / ☺** instead of the words ARMOUR / HITPOINTS / MOOD, armour first |
| the step | your own battle card | a **⇢ 4** cell between ACTIONS and the two percentages |
| the zoom row | battle screen, top right | FULL / FIELD / CLOSE is gone. **The mouse wheel still steps between the three** |
| dogs and mirehares | THE PACK, THE MIREHARES | no armour bar on any of them; the points are in their hitpoints instead |
| CRIPPLING SHOT on a mirehare | shoot the buck, then watch his charge | one hex shorter than usual. It did literally nothing to them before |
| the buck | THE MIREHARES | he charges **through** the doe now instead of being stopped by her. This makes the fight harder: the prepared six went 100% to 70% |
| the pack aura | THE PACK | the ✵ mark comes and goes at **2 hexes** from The Bitch, not 3 |
| rarity | any item name or the found row | COMMON / **UNCOMMON** / **RARE** / **LEGENDARY** in gold. Four things are legendary: the Wood-Stick, the Stone Shield, the Unusual Coin, the Roll of Names |
| adjustable | hover rags, a cook-pot or the worn bucket | **adjustable: fits any body, no penalty**. It was always true and never said |
| the cub | kill the Fen-Mother | **two** doors, and taking the cub is **+2 morale** rather than −6 |
| the drum | any shop that stocks it, and the world bar | costs **120** and the bar chip shows the painted drum rather than ◍ |
| POISON | any ratkin's skill list | called **POISON**, on the battlefield and in the inventory |
| the working stave | Marrow's weapon hover | **reach 1**, and its spell range is still +2 |
| Everchanging Luck | perks tab | **+2** to your worst or best stat |

---

## 🧪 THE ELEVEN-ASK BATCH  *(#268 · 2026-08-31 · build log 8f.293)*

**The short version:** eleven small fixes off five screenshots - a mood number, a skill's own
honesty about its damage, three chips that stopped repeating a figure their own picture or hover
already carries, a guaranteed trophy off the first chase, a deleted rail, a sheet re-sized, a
third kind of hover the text editor can now reach, SKILLS moved into the PERKS tab, and a mid-road
event that now stops the walk for a deliberate click instead of resuming on its own.

| what to check | where | what should happen |
|---|---|---|
| HIGH SPIRITS dodge | company screen, a body at the top mood rung, hover MOOD | +5 dodge in the rung's own line, not +10 |
| KICK's description | any body's Perks tab → SKILLS → KICK | says "1 or 2 points" rather than just "almost no damage" |
| the blood chip | world bar, top left | a heart, no `%` beside it; hover it for the exact figure |
| the PAYDAY chip | world bar | `◉N IN Nd` with no "PAYDAY" word; hover for the word and the wage table |
| the chase trophy | fight the chase event (`travel` there, take the BATTLE door), win it | the aftermath's bonus-find strip shows a sword, maul or crossbow the first time, never on a repeat |
| the roster rail | company screen, click through the four portraits | no gold line on the left edge of the picked one, only the background change |
| the seats hover | world bar, hover the party chip (head + seat count) | lists every member by name, race and seat cost under the existing rule |
| the sheet's pools | company screen, ARMOUR/HITPOINTS/MOOD bars | visibly a touch shorter; TO HIT / DODGE / STEP figures a touch bigger |
| the text editor's third hover | ✎ TEXT → ⌁ HOVER, rest on a slot or a skill card | the kind-switcher offers a 🛈 POP CARD option alongside TEXT |
| SKILLS in the Perks tab | company screen → ★ PERKS | SKILLS is the first thing in the tab, above the tree; gone from the main column |
| the road pause | walk a multi-day leg until a camp/vignette card fires, answer it | the party stops there - click the destination node again to finish the leg |

**What would be a bug:** the party stuck mid-road with no node accepting a click (should only ever
be the SAME destination that unsticks it); the chase trophy landing twice on the same run; a
common-tier weapon as the chase trophy; the sheet clipping or overlapping on any body.

---

## 🧪 THE LIZARDS: A TRAIL OF FIRE, AND A BOSS FOUR HEXES LONG  *(#267 · 2026-08-30 · build log 8f.292)*

**The short version:** the road can now deal five new fights against four new creatures. They are
immune to fire and they use it as furniture. The practice field carries all five.

### The fastest way in: the practice field

⚙ TEST → THE PRACTICE FIELD. Five new rows, in the order the road deals them:

| row | what it is for |
|---|---|
| **Something in the Scrub** | three bodies. The smallest fight in the game |
| **The Warm Stones** | two spitters and two things you cannot see |
| **The Glass Road** | seven, one of them a champion |
| **The Ash-Drakes** | eight, three that breathe through you |
| **The Third Furnace** | the boss. Four hexes of her |

### What to look at, in order

1. **The salamander does almost no damage and that is not a bug.** 2 or 3 hitpoints. What it is
   for is the HEX: the ground under whoever it spat at catches, and burning ground is 2 through
   any armour to stand in or cross, plus the clock. Watch a fight turn into a floor problem.
2. **The slag-hide disappears at the top of its own turn** (a `GONE` mark). While it holds, you
   cannot target it from more than one hex: walk up to it and it is an ordinary body. ⛑ **Fire
   gives it away** - standing in or beside burning ground it cannot veil, and reads `SEEN`. That is
   deliberate: the vermin's own fire is a lantern on the hunter.
3. **The tongue costs its whole turn.** You are pulled on its turn and bitten on the NEXT one, so
   whoever gets reeled in always has a full turn standing next to a 15-hitpoint animal. Being
   dragged should read as an invitation, not as a turn taken off you. **If it ever feels like the
   Battle Brothers serpents, that is the thing that has broken.**
4. **The drake's breath goes through** the first body into whoever is directly behind, friend or
   foe, and chars both hexes. **Try baiting it into breathing through its own salamanders.** Do
   not stand in a file in front of it.
5. **The Third Furnace is four hexes long and the tail is two of them.** Where the tail is lying is
   where the sweep comes from. It hits everything it touches and throws them **two** hexes - and
   landing in burning ground lights you, so her own THE FURNACE DRAWS ring is what the tail is
   aiming you at.
6. **Nothing on their side minds the fire.** They will stand in it, walk through it and end their
   turn in it. Yours will not.

### On the road

The five cards are in the floating pool, so a run deals some of them and not others. **The three
story fights are dealt anywhere but always met in order** (the stones, then the glass, then the
drakes), so you can never meet the boss with nothing having explained her.

⚠ **THE ART IS TEMPORARY.** All four are flat drawn silhouettes while the painted pack is made;
the brief is `art/LIZARD_PACK_GPT_TASK.md`. The Furnace especially is a placeholder shape.

### What was measured, so a surprise is a finding

`ARENA.match`, n=15 a side. Starting four: **Something in the Scrub 100%, The Warm Stones 100%**
(5 to 9 rounds), **The Glass Road 40%**. Prepared six: **The Glass Road 100%, The Ash-Drakes 93%,
The Third Furnace 53%**. If the boss reads as easier than the drakes, or the stones as a real
fight for the starting four, say so.

---

## 🧪 THE COMPANY SHEET: A 100 POOL, A BAND CALLED STEADY, AND WHAT A THING ACTUALLY DOES  *(#266 · 2026-08-29 · build log 8f.291)*

**What it is.** Nine asks off one screen. The two that change the FIGHT are the mood pool and the
mood ladder; the other seven are about being able to read what is in front of you.

**How to reach it in three steps.**
1. THE COMPANY (the roster button on the road bar).
2. Look at the three bars, the row under the name, and the chips beside it.
3. Hover STR (or any of the four) for the ledger.

**What should happen.**

- **Everybody's mood pool is a round number now.** An ordinary body reads `/100`; the Captain reads
  `/120` because he leans +2 MOR, and every rung is worth 10 either way. Nothing reads `/90`.
- **The bar says STEADY, and that is where a fight opens.** The ladder is IT ROCKS · HAPPY · STEADY ·
  SHAKEN · BREAKING · BROKEN. Your people walk on at **57 of 100**, dead centre of STEADY, and the
  enemy walks on in the same band. Hover the row for the whole ladder.
  - A company at HIGH SPIRITS opens at **72** (the top edge of STEADY) and one ON THE BRINK at
    **42** (its bottom edge). That is the company's mood being worth exactly one rung.
  - **STEADY and HAPPY both cost nothing.** That is deliberate: what tells them apart is that one is
    a step from the bonus and the other a step from the first penalty.
- **All three bars are divided.** Armour and hitpoints in *blows* (a wide section is a tough body);
  the mood bar at the ladder's own rungs, so you can see how far the next word is. The same three
  rows on the battle card read identically.
- **The line under the name is just the personality.** `Experienced` and not
  `Experienced · +1 STR and +1 MOR` - the rungs are two columns over, where they add up.
- **The level is back on the chip row, with the experience on it**: the ring, the level inside it,
  and `0/150 XP` beside it. The exact wording is on its hover.
- **The stat ledger's total is the big thing in the box**, with what the rung BUYS under it in
  brighter type. `born` is gone from it entirely.
- **An off-hand piece says what it does.** A Round Shield row reads `RARE · OFF · +9 dodge`, an
  off-hand dirk `COMMON · OFF · +5 to hit in melee · +5 melee damage · reaches what a bow cannot`.
  The dirk's paragraph is half the length it was.
- **After a battle you are never handed a cheap weapon.** The extra piece on top of the haul refuses
  a common main-hand weapon, and the two hauls that handed over a Boar spear pay salvage instead.

**What would be a bug.**
- Any body reading `/90`, or a mood bar with no ticks on it.
- The battle card and the sheet disagreeing about the word or the dividers.
- A personality whose short form is a RULE losing it: DOES NOT RUN must still read
  `Cannot rout, ever`, HAS NO STOMACH FOR IT must still read its per-kill clause.
- A stat ledger row called `born`. (A row called **the road** is correct and rare: it is the warm
  spring's permanent +1 MOR or the falling star's wish, and nothing else can make one.)
- A Boar spear, a broom, a gut-knife or a short sword arriving as the extra piece after a fight.

**⚠ ONE FIGHT GOT HARDER AND IT IS THE FEN-MOTHER.** A prepared six wins **57% where it won 77%** (n=30, against the build with #265 and without this). It is not the mood pool: she is the one body in the game that does not rout but goes **DESPERATE** below 16% of her nerve, losing hitpoints a turn and hitting harder, so starting a fight lower on the ladder starts her nearer the state she is frightening in. **Play it before judging it** - a 57% boss for a prepared six is in the same band as the Circle and the Steading-Line, and this may simply be the fight finally being one. If it reads wrong, the lever is `START_NERVE` or her own `desperateAt`, not the ladder.

**What was measured, so you know what is NOT a bug.** The road was priced against the previous build
at n=15 a side over 14 fights and both companies: **starting four 56% → 55%, prepared six 87% → 86%**.
Four fights looked like they had moved 20 points or more and every one of them came back identical at
n=30. ⚠ **The Captain is one rung weaker** - he was carrying +1 STR and +1 AGI that nothing on the
sheet could explain, and that is the *No Born* ask. If he now feels thin, that is the one number to
argue about.
## 🧪 THE ENEMY HOLDS ITS NERVE LONGER, AND CHAMPIONS ARE A REAL STEP UP  *(#265 · 2026-08-28 · build log 8f.290)*

**What it is.** Two things you asked for, and one the sweep found.

**1. They break less easily.** Every enemy's mood pool went up a quarter. Against your six's
average pool they were 37.5% under; now they are 22% under - closer, still the lesser side. Nothing
about *how* they break changed, only how much it takes.

**2. A champion is a body four levels on.** The epaulette still means half again the meat, the
harness and the swing. On top of that it now carries **two perks rolled from its own race and
general lanes** and **one stat rung**, which is what level 4 buys one of your own people.

**How to reach it in three steps.**
1. Take the clan's side at the Snare, so the Hold host follows you east.
2. Find the three bodies with an epaulette - one corporal and two billmen.
3. Hover one. The four stat marks are on the card, and one of them is a rung higher than its
   plain twin standing beside it.

**What should happen.**
- A champion billman is noticeably harder than a plain one: about **59 hitpoints against 40, 65
  armour against 44**, and it swings for **16-26 where the plain one swings 11-17**.
- Its two perks differ run to run. Today a human champion draws from five: STANDFAST, COLOSSUS,
  TWO-HANDED, GOOD HAND, EVERCHANGING LUCK.
- Enemies should reach BREAKING later in a fight than they used to, and rout less often. Fights
  will run a round or two longer for that reason.

**3. And the sweep found the Hold host had gone unwinnable.** That fight is tuned to about 40%
and measured **0 wins in 20**. Three billmen came out of it and it is back to **8 in 20**. If it
now feels like a rout in either direction, that is the number to tell me about.

**What would be a bug.**
- An enemy that never breaks at all. The pool went up a quarter, not a third.
- The Fen-Mother or Something in Armour behaving differently. Both are hand-tuned and exempt.
- A champion with only one mark raised, or with a perk that plainly does nothing.
- The wedding guests standing and fighting. They are meant to break almost at once, and the
  multiplier was chosen so they still do.

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
