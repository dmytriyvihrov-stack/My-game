# The itch.io page: what to upload, what to paste, what to tick

> **The build is one command:**
>
> ```powershell
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_itch.ps1
> ```
>
> It writes `%USERPROFILE%\grimtoll-itch\rabblebound-itch.zip` (about 13 MB), reads the zip back,
> and refuses to hand it over if index.html is not at its root, if the sound or the art did not make
> it in, or if the developer tools are still in the page. The cover and the screenshots are in the
> same folder. **Everything below is text to paste and boxes to tick.**

---

## 1. The upload

| the box | what goes in it |
|---|---|
| **Title** | RabbleBound |
| **Project URL** | `rabblebound` |
| **Short description / tagline** | *Dark medieval hex tactics. You cannot afford to be good to everyone. Act one, in your browser.* |
| **Classification** | Games |
| **Kind of project** | **HTML** |
| **Release status** | Prototype / In development |
| **Pricing** | No payments *(a "Download / play" that costs nothing; leave donations off until you want them)* |
| **Uploads** | `rabblebound-itch.zip`, and tick **This file will be played in the browser** |
| **Embed options** | **Manually set size: 1280 x 720**, tick **Fullscreen button**, tick **Mobile friendly** *(landscape)*. Leave "automatically start on page load" OFF: the first click is what lets a browser play sound. |
| **Cover image** | `cover_630x500.png` |
| **Screenshots** | the five in `screenshots\`, in that order |
| **Genre** | Strategy |
| **Tags** | tactical, turn-based, roguelike, hex, dark-fantasy, party-based, singleplayer, story-rich, low-magic, mercenary |
| **Community** | Comments on |

> ⛔ **1280 x 720 IS NOT A PREFERENCE, IT IS THE TYPE FLOOR.** The whole game is one 1280x720 stage
> and `fit()` scales it as a unit, so the embed size multiplies every glyph in the build: measured,
> a 960-wide embed renders at **0.75** and the 10px floor that
> [`.claude/rules/ui-scales.md`](../.claude/rules/ui-scales.md) exists to protect lands at **7.5px**.
> If the itch page theme is too narrow for 1280, widen the page rather than shrinking the frame.

---

## 2. The page text, to paste

*(itch takes plain text with simple formatting. The horizontal rules are optional.)*

---

**You cannot afford to be good to everyone.**

You are the Captain of a company nobody chose. Strangers who were in the same room when the work
turned up, bound to one contract and to each other's debts, walking a road that is going to ask you
for money you do not have.

The island calls you mercenaries. You are the rabble.

**RabbleBound** is a dark medieval tactical roguelike: hex battles with facing, engagement and
nerve, a road of authored events between them, and named people who remember what you spent them
on. Low magic, no chosen ones, and a purse that empties every fourth day whether the week went well
or not.

**A run is act one:** eighteen to twenty-two days, eight routes through twenty-six places, and about
an hour. Every road misses something the other roads had.

### What you actually do

- **Fight on a hex field** where facing, reach, cover, the ground under you and the nerve of the
  person beside you all decide a swing before the dice do. Two actions each, everybody, including
  you.
- **Take the Captain onto the field yourself.** He is not a portrait in a corner. He can go down.
- **Answer thirty-nine road cards** written to be read once and remembered: a hanged toll-man, a
  clan wedding that has stopped the road, a company of the dead who are still holding formation.
  Nineteen more happen at the fire when the company talks to itself.
- **Spend people.** Thirteen seats in the wagon. A human takes two of them, a ratkin one, an ogre
  three, and every one of them eats and is owed wages on payday.
- **Watch them become somebody.** Seven trades, twenty-six perks, twenty-six personalities, and
  scars that do not wash off. *There are no good or bad personalities: there are ways of behaving
  that cost something.*

### What the game is actually about

Every door on the road is priced, and the kind one is never free. Mercy costs a day, or the coin
you needed for provisions, or the thing you were going to sell. Robbing the pedlar genuinely pays.
The game never tells you what a decision was worth, and it never gives you a score for it: what it
does is remember, in the prices people quote you and in who is still willing to travel with you.

> **Every body keeps the receipt. Every relationship remembers who paid.**

### This is a slice, and it is honest about it

Act one is finished and plays end to end. What is not in it yet: the acts after this one, the
mortality chain (today a body that goes down is scarred, not lost), and the settlements the wagon
is supposed to outlive you into.

**What it needs is you telling it where you stopped and why.** There is a ✉ FEEDBACK button in the
corner of every screen and a *Send the run* row in the menu: it puts your notes and a record of the
run on your clipboard and opens a mail already addressed. Two sentences are worth more than a
polite silence.

### Controls

Mouse for everything. **1 to 5** press the skill cards, **Esc** opens the menu, and the three
buttons in the top right of a fight (FULL / FIELD / CLOSE) move the camera. Hovering anything
tells you what it is, including the ground, and hovering an enemy shows what it can reach.

Runs in the browser, saves in the browser, installs nothing. Headphones are worth it: the music is
written for the road and the fight separately.

---

## 3. Two things worth saying on the page or in the first devlog

- **It saves in your browser.** Closing the tab is safe; clearing site data is not. If a browser is
  set to block storage for embedded games, the game says so on its own front door and still runs,
  and the run simply ends with the tab.
- **Play it in the itch fullscreen button** if the frame looks cramped: the game is drawn for
  1280x720 and scales as one piece.

---

## 4. Where the pictures came from, so they can be remade

`tools\build_itch.ps1` builds the zip. The five screenshots and the cover in
`%USERPROFILE%\grimtoll-itch\` were taken from the **extracted zip**, not from the working file, in
a real headless browser at 2x through `tools\playtest\eyes.py` (the preview pane composites no
frames, so it cannot take a picture). The cover is a 630x500 crop of the front door's key art
(`art/src/stage-1/key/KEY-01_main-menu-bloom.png`), tight on the company so it still reads at the
315x250 itch draws it at.

⚠ **The aftermath screen is deliberately not among the five.** At six or more crew the cards narrow
to the point where a long nickname breaks inside the word (measured: the name column is 131px at
four across and the longest nickname is 80px, so it only bites once `fitAftermath` goes to six
columns). It is a real defect and it is written down in `SHIPPED.md` under #203; it is not one to
put on a store page in the meantime.
