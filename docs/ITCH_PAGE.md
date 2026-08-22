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
[`marketing/STEAM_COPY_REFERENCES.md`](../marketing/STEAM_COPY_REFERENCES.md), then cut again the
same day on the user's own note: *"shorter sentences. Add about clases, races and artifacts with
strangness. Check to the best in the ganre"*.

⛔ **THE SENTENCE LENGTH WAS NOT A TASTE CALL, IT WAS THE ONE THING THE SHELF RANKS BY.** Mean words
per sentence, measured over the same fifteen pages, against their review scores: **Shogun Showdown
9.2 at 95% · Slay the Spire 10.2 at 97% · The Last Spell 10.6 at 91% · Our Adventurer Guild 13.3 at
95% · Path of Achra 16.1 at 98%**, and at the other end **Wartales 26.8 at 86% · Battle Brothers
32.9 at 88%**. The corpus median is 14. ⚠ **This is an association across fifteen pages and not a
law**: what is safe to say is that no page above 94% carries a mean over 19, and the two
longest-winded pages in the set sit at 88% and 86%. **This page now runs a mean of 6.7 words a sentence over 53 of them, and its longest is 15
words**, against a corpus 90th percentile of 35. That is shorter than every page on the shelf,
including Shogun Showdown. ⚠ **Three of the lists are deliberate fragments** - the trade verbs, the
race verbs and the four named objects - and they are what carries the rhythm. If the page ever
reads as a telegram, join the utility lines back up and leave those three alone.

⚑ **AND THE THREE THINGS THAT WERE MISSING ARE THE THREE THE SHELF SELLS HARDEST.** Pattern 7 of
that file is that countable content is the proof, and the page was printing counts for cards and
seats while saying nothing about **what a body can BE**. Added: the seven trades with their
signature verbs, the three playable races with the skill each one owns (`RACESKILL`: humans KICK,
ratkin POISON THE BLADE, ogres PICK UP AND THROW), and the gear, which is where the strangeness
lives. `GEAR{}` holds **54 pieces, 21 common · 24 rare · 9 epic, and 15 of them `unique:true`**, one
of a kind, out of one scene, never handed out by a random find.

⛔ **FOUR FACTS HAD GONE STALE IN THE BUILD, WHICH ONLY RE-COUNTING FOUND.** The page said
thirty-nine road cards and `EVENTS{}` holds **forty**; twenty-six places against `NODES{}`'s
**twenty-eight**, all of which lie on a route; twenty-six personalities against `TRAITS{}`'s
**twenty-seven**; and it still said **nerve**, which #232 renamed to **MOOD** everywhere the player
can see it. ⚠ **The day range is gone rather than corrected.** Summed over `EDGES`, the eight routes
cost 22, 23, 23, 24, 24, 25, 25 and 26 days of TRAVEL, which is not what the old "eighteen to
twenty-two days" was counting and is not a number a player can check either. A run is sold as
**about an hour**, which they can time.

---

**You cannot afford to be good to everyone.**

RabbleBound is a dark medieval tactical roguelike. You are the Captain of a company nobody chose.
Strangers, one contract, and each other's debts. The road ahead will ask you for money you do not
have. The island calls you mercenaries. You are the rabble.

**Fight on the field, not from a portrait.**
Hex battles. Facing, reach, cover, and the ground under your boots. The mood of the person beside
you counts too. Two actions each, everybody. The Captain goes out there himself. He can go down.

**Seven trades. Three races.**
Spear wall. Aimed shot. Backstab. Sweep and roar. The battle-mage holds one school and a line. The
mage holds two schools and almost nothing else. Humans kick. Ratkin poison the blade. Ogres pick a
body up and throw it.

**Spend people.**
Thirteen seats in the wagon. A human takes two, a ratkin one, an ogre three. Everybody eats.
Everybody is owed wages. The purse empties every fourth day, good week or bad.

**Nobody stays the same.**
Twenty-six perks, twenty-seven personalities, and scars that do not wash off. No personality here
is good or bad. Each one is a way of behaving that costs something.

**Carry strange things.**
Fifty-four pieces of gear, and fifteen of them are one of a kind. The Cold Thing. The Ground-Glass
Eyes. The Mirrored Sphere. Fen-Mother's Tooth. This is a low-magic island. A strange object is an
event, not a stat.

**Answer forty road cards.**
Written to be read once and remembered. A hanged toll-man. A clan wedding that has stopped the road.
A company of the dead, still holding formation. Nineteen more happen at the fire.

**Pay for the kind door.**
Mercy costs a day, or the coin you needed for provisions. Robbing the pedlar genuinely pays. Nothing
scores you for it. The game remembers instead. It remembers in the prices people quote you, and in
who still travels with you.

**A run is act one.** Eight roads out of the Hold, twenty-eight places, about an hour. Every road
misses something the other roads had. Not in yet: the later acts, and the mortality chain. A body
that goes down today is scarred, not lost.

Mouse for everything, Esc for the menu. Hover anything and it tells you what it is, the ground
included. Free, saves in your browser, installs nothing.

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
