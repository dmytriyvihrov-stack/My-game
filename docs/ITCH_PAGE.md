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
| **Cover image** | `cover_630x500.png` in the delivery folder, which is a copy of **`marketing\itch\rabblebound-itch-cover-630x500.png`** - the painted cover with RABBLEBOUND set across it, made against the engraved key art and already the right 630x500. *(A second file, `cover_keyart_630x500.png`, is a plain crop of the menu painting with no lettering, kept only as the fallback if the type on the first one ever reads badly at thumbnail size.)* |
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

⚑ **REWRITTEN 2026-08-22 ON THE MEASURED SHELF** in
[`marketing/STEAM_COPY_REFERENCES.md`](../marketing/STEAM_COPY_REFERENCES.md). Three changes and
they are all somebody else's evidence rather than taste: **the genre sentence moved into the first
paragraph** (13 of the 15 reference pages name it in sentence one), **seven sections became six
verb-phrase headings of one paragraph each** (The Iron Oath's architecture, the closest on the shelf
to this game, at 302 words), and the body came down from about 600 words to **366**, which sits
between The Banner Saga (310) and Wartales (375) on the same shelf.

⛔ **AND FOUR FACTS HAD GONE STALE IN THE BUILD, WHICH ONLY RE-COUNTING FOUND.** The page said
thirty-nine road cards and `EVENTS{}` holds **forty**; twenty-six places against `NODES{}`'s
**twenty-eight**, all of which lie on a route; twenty-six personalities against `TRAITS{}`'s
**twenty-seven**; and it still said **nerve**, which #232 renamed to **MOOD** everywhere the player
can see it. ⚠ **The day range is gone rather than corrected.** Summed over `EDGES`, the eight routes
cost 22, 23, 23, 24, 24, 25, 25 and 26 days of TRAVEL, which is not what the old "eighteen to
twenty-two days" was counting and is not a number a player can check either. A run is sold as
**about an hour**, which they can time.

---

**You cannot afford to be good to everyone.**

RabbleBound is a dark medieval tactical roguelike. You are the Captain of a company nobody chose:
strangers who were in the same room when the work turned up, bound to one contract and to each
other's debts, walking a road that is going to ask you for money you do not have. The island calls
you mercenaries. You are the rabble.

**Fight on the field, not from a portrait.**
Hex battles where facing, reach, cover, the ground under you and the mood of the person beside you
decide a swing before the dice do. Two actions each, everybody. The Captain goes out there himself,
and he can go down.

**Answer forty road cards.**
Written to be read once and remembered: a hanged toll-man, a clan wedding that has stopped the road,
a company of the dead still holding formation. Nineteen more happen at the fire, when the company
talks about itself.

**Spend people.**
Thirteen seats in the wagon. A human takes two of them, a ratkin one, an ogre three. Everybody eats,
everybody is owed wages, and the purse empties every fourth day whether the week went well or not.

**Watch them become somebody.**
Seven trades, twenty-six perks, twenty-seven personalities, and scars that do not wash off. There
are no good or bad personalities, only ways of behaving that cost something.

**Pay for the kind door.**
Mercy costs a day, or the coin you needed for provisions. Robbing the pedlar genuinely pays.
Nothing scores you for it. The game remembers instead, in the prices people quote you and in who
is still willing to travel with you.

**A run is act one:** eight roads out of the Hold, twenty-eight places, about an hour. Every road
misses something the other roads had. What is not in it yet: the acts after this one, and the
mortality chain: a body that goes down today is scarred, not lost.

Mouse for everything, Esc for the menu, and hovering anything tells you what it is, including the
ground. Free, saves in your browser, installs nothing.

**There is a ✉ FEEDBACK button in the corner of every screen. Two sentences beat a polite silence.**

---

## 3. Two things worth saying on the page or in the first devlog

- **It saves in your browser.** Closing the tab is safe; clearing site data is not. If a browser is
  set to block storage for embedded games, the game says so on its own front door and still runs,
  and the run simply ends with the tab.
- **Play it in the itch fullscreen button** if the frame looks cramped: the game is drawn for
  1280x720 and scales as one piece.

---

## 4. Where the pictures came from, so they can be remade

`tools\build_itch.ps1` builds the zip. The five screenshots in `%USERPROFILE%\grimtoll-itch\` were
taken from the **extracted zip**, not from the working file, in a real headless browser at 2x
through `tools\playtest\eyes.py` (the preview pane composites no frames, so it cannot take a
picture).

⚑ **The cover was already made and was nearly missed.** `marketing\itch\` was sitting untracked in
the repo with a purpose-built 630x500 cover in it, its 1408x1117 source, and the prompt that
produced it, against `art/src/stage-2/key/KEY-01D_main-menu-engraved-slashlight.png`. It has the
title set across it and the whole company readable at thumbnail size, which a crop of the menu
painting cannot have, so **that is the cover** and the crop is the fallback. It is committed now
rather than left loose. **Look in `marketing\` before making a marketing asset.**

⚠ **The aftermath screen is deliberately not among the five.** At six or more crew the cards narrow
to the point where a long nickname breaks inside the word (measured: the name column is 131px at
four across and the longest nickname is 80px, so it only bites once `fitAftermath` goes to six
columns). It is a real defect and it is written down in `SHIPPED.md` under #203; it is not one to
put on a store page in the meantime.
