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
