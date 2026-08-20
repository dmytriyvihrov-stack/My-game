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

## ❤ THE HALF-RATKIN, AND THE FIRE CARD WHERE SHE TALKS  *(#201 · 2026-08-19 · build log 8f.223)*

**Who she is.** `Ash “Nobody’s”`, a ratkin cutter with a knife in each hand and the **Dutiful**
personality: **+8 dodge standing beside you, -4 anywhere else.** That is deliberate and it is the
character rather than a stat - she fights better next to you because that is the whole of what she
is looking for.

**How to reach her, in three steps.**

1. New run. Walk the first road to **Blood on the Road** (the clash).
2. Take **either** the door that helps the ratkin **or** the door that helps nobody. Helping the
   ratkin gives you Skree and her; standing back gives you her alone, out of the ditch.
   *(The ogre door is the one path that does not introduce her at all.)*
3. Camp on the road. **THE WRONG COLOUR** is in the incident deck from then on, and like every
   incident it fires once per run.

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

## 🎲 SIX THINGS: THE GROUND SPEAKS, THE ODDS GO QUIET, AND THE GAME HAS A NAME  *(#191 · 2026-08-18 · build log 8f.211)*

Six separate asks in one batch. They do not touch each other, so test them
separately and judge them separately.

### 1. The game is called RabbleBound

**How to reach it:** open the game.

**What should happen**

- The browser tab says **RabbleBound — Vertical Slice** and the front door says
  **RABBLEBOUND** in the big Cinzel.
- ⚠ **The ISLAND is still called Grimtoll, and that is deliberate.** You chose
  "game only" when I asked. The lore book still has it *"named twice in one
  word"* and the toll runs through the content — the hanged toll-man, the tolls,
  *"everything here charges for passage"*. If you want the island renamed too,
  that is a separate job and it means rewriting the naming passage in
  `03_WORLD_LORE.md`.
- Every file path is still `grimtoll_*` on purpose (`prototype/grimtoll_slice.html`,
  the desks folder, the lock store). **Your saves are also untouched** — the
  storage keys are still `gt_*`, and renaming those would have wiped every run
  you have going, including the one on the live link.

**What would be a bug:** the title overflowing the front door. It is 43% wider
than GRIMTOLL was (482px → 687px measured in real Cinzel) and it clears the
1280 stage by 593px, so it should not — but that is the number that ran down.

### 2. Hover a tile in a fight and it tells you what the ground does

**How to reach it in three steps:** any battle → move the cursor over water,
burning ground, a boulder, a bloom → the tooltip.

**What should happen**

- **Every kind with a rule now says its rule**, in the game's own tooltip rather
  than the browser's slow grey one. Shallow water, deep water, burning ground,
  a lone boulder (liftable, shootable over) versus a group of rocks, a tree, the
  fire, the wall, the tavern furniture.
- ⚑ **Two things that never said anything before now do**: shallow **marsh**,
  which is three separate penalties and had no tooltip at all, and **the six
  hexes around an open bloom**, which is the strongest effect in the game and
  was only ever a tint.
- **Plain field says nothing.** That is on purpose — a tooltip that fires on all
  195 hexes is furniture.
- **The answer is per body.** Point at deep water with an ogre selected and it
  says something your size wades; with a gilled body it says it costs nothing.
- **A hex somebody is STANDING on** cannot show the ground's own hover, because
  the sprite is over it. Instead the card that opens for that body carries a
  **GROUND** row saying the same thing. Check this on somebody standing in fire.

**What would be a bug:** the tooltip failing to appear on an empty hex, or the
old browser tooltip still turning up a second and a half later underneath it.

### 3. The fight stopped telling you the odds

**How to reach it in three steps:** any battle → select an attack → point at an
enemy.

**What should happen**

- **No percentage anywhere in the fight.** The chip on the hex is gone, the
  plaque's CHANCE TO HIT cell is gone, and the aiming card no longer opens with
  a big number.
- **NEXT ONE LANDS is gone** off the board. The rule still fires — two misses in
  a row still makes the third land — it just stops announcing itself.
- **The damage stayed, and moved up.** The hex now shows only the damage range,
  in the slot the percentage used to hold.
- **The attack arc still says FRONT / FLANK / BACK** — but without its `+15` and
  its damage multiplier. The word is a place to stand; the figures were the
  receipt coming back in through the one row left standing.
- ⛔ **Nothing about the fight itself changed.** Same maths, same AI, same rolls.
  This is a readout switch and it is one line — `SHOW_HIT_ODDS` — so if you hate
  it, it is `true` and everything comes back.
- **The company sheet still shows TO HIT.** You said *"из битвы"*, and between
  fights that number is how a gear or perk choice gets judged.

**What would be a bug:** a stray `%` anywhere on the battle screen, or the
damage range sitting too low on the hex now that it is alone.

### 4. Three new perks

**How to reach it in three steps:** company sheet → PERKS tab → a body with a
point to spend. (Fastest: ⚙ dev mode → level somebody up.)

- **Patient** *(captain 4 · spearwoman 6 · archer 6 · brute 6)* — end a turn
  with an action unspent and the next turn opens with an extra one. **One, and
  it does not compound**: spare two actions and you still only get one back, and
  three patient turns in a row still cap at three actions, never four. A green
  **+1 ACTION** floats over them when it pays.
- **Ground-Wise** *(spearwoman 8 · archer 8 · cutter 4)* — no ground slows you
  (every terrain costs one hex to enter, no stride penalty for standing in
  water) and **anything the ground itself does to you is halved** — fire is 6
  and 4 instead of 12 and 8. ⚠ **The bloom is deliberately NOT included.** It is
  an aura, not ground, and it is the strongest thing on the board.
- **Elemental Weapon** *(mage, level 6 — your gate)* — the mage's weapon arrives
  carrying **FIRE, FROST or VENOM**, rolled fresh **every battle**, passive, no
  choice. Every blow that lands delivers it: fire sets them alight, frost takes
  half their movement and 10 dodge, venom stacks. A **❖ Charged weapon** badge
  sits over their head and the hover names which one you got today.
  - ⛑ **Mage only, and that is the design.** I raised the battle-mage as the
    obvious alternative and you settled it: *"it ads melee - so you mage could be
    a glass canon. And use him for melee could be a decent trade off"*. The point
    is that it is aimed at the class that is BAD at melee — it does not make him
    good in a scrum, it makes stepping into one a real choice with a price. **So
    the thing to feel when you test it** is whether walking your mage into reach
    is ever tempting, and whether it hurts when it goes wrong.

**What would be a bug:** Patient stacking past one extra action; the element
changing mid-fight (it should not) or staying the same across two fights (it
should not); the element appearing on a spell instead of the weapon.

### 5. Important news arrives in the middle of the screen

**How to reach it in three steps:** walk the road → reach a payday (every 4th
day) → or finish the second objective.

**What should happen**

- **The second objective completing** and **the chest opening on payday** now
  pop **in the middle of the map**, bigger, instead of the small italic line at
  the bottom.
- **So does the bad half**: a payday the chest cannot cover, three days unpaid,
  and somebody walking out over it. Those are red.
- **Ordinary road narration still sits at the bottom** in italic, exactly as
  before. Only the handful of lines that change the run got promoted.
- It still fades by itself, there is nothing to click, and the road underneath
  stays clickable the whole time.

**What would be a bug:** an ordinary line stuck across the middle of the map, or
a centred line that will not go away.

### 6. The feedback popup

**How to reach it in three steps:** finish a fight (it opens once a run), or
press FEEDBACK bottom-right.

**What should happen**

- **👎 bad · 🤷 so-so · 👍 good**, in that order, worst on the left.
- It sits **lower on the screen** than dead centre now, so it stops landing on
  the thing it is asking you about.
- **SEND and NOT NOW are gone.** Pressing a face IS sending it: 👍 and 🤷 file
  and close on their own, 👎 files and opens the reason box.
- **Nothing can be lost.** The reason is written onto the same record as you
  type, so closing mid-sentence keeps what you wrote. Esc and clicking outside
  both just close it.
- **Changing your mind rewrites one record, it does not file two.** Press 👎,
  type a complaint, then press 👍 — the complaint is dropped with it, because a
  record saying "liked" with a complaint attached is a record saying two
  opposite things.

**What would be a bug:** two entries in the report from one ask, or a reason
surviving onto a 👍.


## 🗺 THE WORLD MAP HAS A PAINTED GROUND  *(#190 · 2026-08-18 · build log 8f.210)*

The map you walk the company across is a painting now instead of a procedurally
drawn one. **Only the ground changed.** The roads, the event sights, the name
plates, the company token, the ROAD/NEAR/CLOSE stops and the drag are all the
same code drawing the same things at the same coordinates.

**How to reach it in three steps:** new game → through the tap-room → the map is
the next screen.

**What should happen**

- The valley, the mountains down the east, the water in the south-west and the
  pink Bloom in the north are one continuous painting rather than shapes.
- **Every node still reads.** The sights and their name plates sit on a ground
  that has been dimmed to the darkness the old one had, on purpose: the plates
  were coloured for a dark map and the painting is 2.5x brighter than it.
- `THE BLOOM`, `THE HUNCH` and `THE GRAUSEN VALLEY` are all still there and all
  still readable. The valley one is the quietest of the three by design.
- The road out of Grausen Hold and every other route lies exactly where it did.
  Walking a leg should not shift the company off the line.
- **Nothing should ever be a black frame.** If the picture is slow, you see the
  old procedural map for an instant and then the painting.

**What would be a bug**

- A name plate or a sight you cannot read against the ground.
- The company walking beside the road instead of on it, or a node that has moved.
- The map going flat/procedural and staying that way (that is the fallback, and
  on a working build you should never sit in it).
- Any wobble when an event card opens and closes over the map.

**⚠ The one thing I would ask you to judge:** the dim is a single number and it
is currently `.45`, chosen by measurement rather than taste. If the map feels too
dark, it is a one-word change; the two candidates either side are `.30` (prettier,
plates start to wash out) and `.58` (matches the old map exactly, noticeably
darker). The other two painted candidates are still in `art/world-map-backgrounds/`
if you want to see them in the game instead.

---

## 🔤 THE REAL TYPEFACES, AND NO WINDOW SCROLLS  *(#189 · 2026-08-18 · build log 8f.209)*

**⚠ Read this first, because it changes what you were looking at.** The fonts you called
beautiful **were not Cinzel, Spectral and JetBrains Mono.** Those three names have been in the
stylesheet since the first slice and none of them was ever actually in the build, so the game has
always been drawing in **Palatino Linotype, Georgia and Consolas** - the fallbacks. I measured it
rather than guessed (a canvas width probe; `document.fonts.check()` lies about this).

So this entry does what you asked - the three real faces are embedded now - and the honest warning
is that **the game will not look the same as the screenshot you liked.** Cinzel is an inscriptional
Roman whose lowercase is drawn as small capitals, so every name, heading and button reads in a
different voice from the Palatino it replaced. **If you prefer what you had, say so and it comes
back out in one command** - nothing else in the build depends on it.

### 1. The fonts

**Three steps.** Open the game → look at any heading, then any body paragraph, then any label.

**What should happen.** Headings and names in **Cinzel** (monumental, small-cap lowercase). Prose in
**Spectral** (a sharper, narrower book serif than Georgia). Labels, chips and numbers in **JetBrains
Mono**. Nothing is fetched from the network: pull your wifi out and it still renders.

**What would be a bug.** A heading that is still Palatino while its neighbour is Cinzel. Text that
flashes one face then jumps to another and re-wraps. A place-name on the world map painted in a
different serif from the rest of the game (those are drawn on a canvas and used to hand-copy the
font stack; they read it from the same variable now). Any accented or Cyrillic name rendering half
in one face and half in another - **except** a Cyrillic company name in a HEADING, which correctly
falls back, because Cinzel has no Cyrillic at all.

### 2. No scrollbar on the whole window

**Three steps.** Win a fight with a company of five or more → look at the right-hand edge of the
after-battle card.

**What should happen.** No scrollbar. Not a short one, not a full-height one. The company sits in
**one row up to six**, and past six in **two rows at most**. If the whole thing genuinely cannot
fit - a company of ten or thirteen after THE SNARE, which carries the longest aftermath text in the
game - then the **story paragraph** gets its own small scroll and the window still does not, which
is the exception you allowed.

**What would be a bug.** A scrollbar on the card itself, anywhere, at any company size. The story
box scrolling on a company of four (it should not need to). The story box collapsing to nothing.
A crew card wrapping onto a third row.

**What was actually wrong.** Two things wearing one scrollbar. The 8px one you photographed was a
**phantom** - a padding mismatch fixed for the opening screen back in August and never applied to
the other card screens; it has nothing to scroll to, and it is invisible on some browsers and a
full-height bar on others, which is why it survived so long. The other is real arithmetic: a
thirteen-body company needs more room than the longest aftermath leaves.

---

## ✉ THE FEEDBACK POPUP, THE ADDRESS, AND A COG IN THE CORNER  *(#188 · 2026-08-18 · build log 8f.208)*

**Where it came from.** Your seven notes of 2026-08-18. All seven are built. The two dials you may
want to move are named at the end.

### 1. The popup, and it arrives by itself

**Three steps.** New game → win any fight → press **Back to the road**. About a second after the map
comes back, a card lands on it.

**What should happen.** A small card: **HOW WAS THAT?**, under it the name of the thing you are
rating in small caps - **FIGHT: BRIGAND**, not "the road (map)" - then three doors,
👍 *good* · 🤷 *so-so* · 👎 *bad*. Pick one and SEND lights. **Only 👎 opens a second step**, a box
headed *WHAT WENT WRONG?* Press SEND and it is filed against that fight, with whatever you typed.
**It asks once a run.** Win a second fight in the same run and it must stay silent.

**The same card is what the FEEDBACK button opens**, bottom right, on any screen - there it names
whatever you are looking at.

**What would be a bug.** The card naming *the road (map)* after a fight. It asking twice in one run.
The reason box opening off 👍 or 🤷. **Esc, the backdrop or NOT NOW filing anything** - all three must
close it and record nothing. It appearing on top of a yes/no question.

⚠ **In the playtest notes, so-so is its own row and its own word.** The report counts
**liked / so-so / disliked**, and a shrug prints as ▬ *so-so* - it is NOT folded into "liked",
because a tally that calls a shrug a like is a tally that lies. A **loved** column still appears if
your journal carries ★ rows from before this change; a fresh run shows three.

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
- **The three doors.** 👍 🤷 👎, your second pick. ⚠ 🤷 is the only one that is not a hand and it
  is a busier picture than the two thumbs beside it - there is no hand that reads "so-so" on its
  own (👌 means good), and 🙂 😐 belong to the company's morale. **🫤 is a one-line swap** if you
  would rather the middle be a face.
## 🏆 THE AFTER-BATTLE SCREEN, ON THE HYBRID YOU APPROVED  *(#187 · 2026-08-18 · build log 8f.207)*

**Where it came from.** `CLAUDE_AFTERMATH_IMPLEMENTATION.md`, written against the hybrid mockup:
*"Это не приглашение заново придумывать экран. Композиция уже утверждена."* So this is the
approved composition put into the game, and **nothing underneath it moved** - not a payment, not a
number, not a line of prose.

**Three steps.** New game → win any fight → you are on it. (Fastest: ⚙ TEST → the practice field →
any fight → win.)

### What should happen, top to bottom

- **An emblem** (⚔ in a ring, with a hairline running out either side), then your **company name**,
  then the outcome title, then **one line of metadata**: `VICTORY · N ROUNDS · N DOWN · X OF Y
  CARRIED OFF`. Behind all of it, **gold rays** spreading from behind the emblem, almost invisible
  at the edges. They are CSS, not a picture, so they cost the build nothing.
- **The prose** stays a narrow centred column and ends on a small gold rule.
- **THOSE WHO STOOD** - **four cards in a row** (three if you are three: the row fills itself).
  Portrait left, name and role right, the four numbers across the bottom: ☠ kills · ⚔ dealt ·
  🩸 taken · ✦ experience. Dark layered card, thin brass edge, a hairline just inside it.
- **Somebody carried off**: the card goes bloody - red frame, blood running off the top edge, a
  pool low, a smear across it - and a **red strip along the very bottom** reading
  `CARRIED OFF · <the injury>` in full. This is the old treatment kept on purpose, plus the strip.
- **Somebody promoted**: gold frame, gold portrait edge, and a small **gold `▲ N` plate in the
  top-left corner** carrying the new level, with *spend it on the sheet* (or *pick a trade on the
  sheet*) underneath. **One body can be both** - blood and gold on the same card.
- **A body with nothing to report shows no strip at all**, which is the point of the strip.
- **TAKEN OFF THE FIELD** - the haul on one tray: big receipt tiles (round medallion, the number
  large, the resource named under it) with the **flavour line beside them**, behind a hairline,
  never mixed into the figures. A gear haul keeps its strip with the dashed ART SLOT square, and a
  haul that is both (the clash's spear and salvage) shows both in the one tray.
- **THE FIELD THEY LEFT** - still an accordion, still shut, still the same count and dead/fled.
- One centred **`👣 Back to the road`**, with no small print under it.

### What would be a bug

- The 👣 missing, doubled, or drawn as anything other than the road's own walk-away mark. It is the
  same glyph every LEAVE door on the road wears and it comes from the same place.
- Any small print under `Back to the road`. There is none, by your own ruling in #176.
- Two little decorative feet or supports under the button. Those were in the mockup and are
  deliberately not here.
- The words **"The company can move again"** anywhere. That line is gone and stays gone.
- A name, a class or an injury running out of its card. A card getting a second empty strip.
- The level number printed twice (on the plate AND in the line under it).
- **The mercy fight**: `Go and see what they want` should NOT wear the 👣 - it opens another
  screen, it does not leave. Screen two is unchanged: pick, the choice settles in place with a
  tick, the others fade, the road button lights and its caption disappears.
- The screen needing a scroll before you have opened the accordion. The longest one in the game is
  THE SNARE HOLDS NOTHING NOW and it was measured to fit with room.

### One thing you may want to overrule

The mockup puts the promotion mark on a **diagonal ribbon cropped by the card's corner**. It is
here as a **corner plate** instead, and the reason is mechanical rather than aesthetic: a ribbon
only reads as a ribbon if the corner cuts it, that cut IS layout overflow, and it would have shown
up on the clipped-text counter for every promoted body from now on. Sized to fit flush instead it
stops looking like a ribbon and lies across the name. **If you want the diagonal back anyway, say
so** - it is four lines of CSS and one accepted entry on the counter.

### And one thing that is still missing, on purpose

**The three fonts are still not in the build.** `--display`, `--body` and `--mono` name Cinzel,
Spectral and JetBrains Mono, and none of the three is actually present, so the whole game (not
just this screen) renders in Georgia and Consolas. This screen uses the three tokens exactly as
your brief asks, so the day the real files are embedded it changes with everything else. Doing
that needs the font binaries embedded as base64 and touches every screen, which your brief calls
*"отдельно и глобально"* - so it is its own job, not this one.

---

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

## Everything older

**Everything that shipped on 2026-08-16 and before was cut on 2026-08-19**, the third cut of this
file, for the reason the first two give: a test bench nobody can get to the bottom of is not a
test bench. The bench had grown back to 4,240 lines since the 2026-08-14 cut, and most of what
went was superseded by later rounds of the same surface (the sheet's rounds one to three by round
four, the sub-line by its derivation, the battle screen by #173's slow-down). What is left is the
last three days, 2026-08-17 to 2026-08-19, which is what you have not yet played.

**Nothing was copied anywhere and nothing is lost.** Git holds every word of it, and one command
puts it back on your desk:

```powershell
git show 1d2e1b3:docs/WHAT_TO_TEST.md > older_test_bench.md
```

The earlier cuts are one hash further back: `git show 5bb2bf2:docs/WHAT_TO_TEST.md` is the bench as
it stood before 2026-08-14 (2026-08-11 and earlier inside it), and
`git show 5bb2bf2:docs/archive/WHAT_TO_TEST_OLDER.md` is 2026-08-02 and earlier.

---

## Checked

*Move a section here when you have played it, with what you thought. That is what stops the same
thing being re-tested every session.*
