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
| **Banner** *(Edit theme)* | **`marketing\itch\rabblebound-itch-banner-1920x800.jpg`**, 1920x800. The engraved key art with the cover's own RABBLEBOUND lifted onto it. itch asks for 960x400 and this is that at 2x, so it stays sharp on a retina screen. |
| **Background** *(Edit theme)* | **`marketing\itch\rabblebound-itch-background-1920x1080.jpg`**, 1920x1080, 72 KB. The same painting blurred, desaturated and pushed most of the way to black. Set it to **cover / no repeat**, and keep the page's own text panel dark. |

> ⛔ **1280 x 720 IS NOT A PREFERENCE, IT IS THE TYPE FLOOR.** The whole game is one 1280x720 stage
> and `fit()` scales it as a unit, so the embed size multiplies every glyph in the build: measured,
> a 960-wide embed renders at **0.75** and the 10px floor that
> [`.claude/rules/ui-scales.md`](../.claude/rules/ui-scales.md) exists to protect lands at **7.5px**.
> If the itch page theme is too narrow for 1280, widen the page rather than shrinking the frame.

---

## 2. The page text, to paste

*(itch takes plain text with simple formatting. The horizontal rules are optional.)*

⚑ **REWRITTEN 2026-08-22 ON THE MEASURED SHELF** in
[`marketing/STEAM_COPY_REFERENCES.md`](../marketing/STEAM_COPY_REFERENCES.md), then cut for sentence
length, then rewritten again in **the user's own voice**, from the post he had already written to a
dev community: *"make it more human as from indy dev"*.

⛔ **THE VOICE MODEL IS HIS POST AND NOT THE GAME'S NARRATOR, AND THE TWO ARE DIFFERENT JOBS.** The
nine rules in `docs/README.md` §4 govern what a CARD says: second person, dry, no contractions
needed. A store page has a person standing behind it, and his own post is warm, first person, names
its influences out loud, admits the AI art before anybody asks, and ends by offering to play
somebody else's build in return. **So the page keeps the dry voice for what the GAME is and hands
the last block to him.** Contractions are allowed in the product copy now for the same reason: a
page that will not say *"you're"* does not sound like a person wrote it.

⚑ **THE INFLUENCES MOVED INTO THE PERSONAL BLOCK ON PURPOSE.** Naming your references is normal on
this shelf (pattern 10: Path of Achra names two roguelikes in its body, Slay the Spire states its
formula), but *"battles like Battle Brothers, weirdness like Caves of Qud"* reads as a boast in
product copy and as an honest map in a dev's own sentence. **Warhammer is named as an influence and
never as a comparison**, and only in his voice.

⛔ **TWO THINGS FROM HIS POST ARE NOT ON THE PAGE, BECAUSE THE BUILD DOES NOT DO THEM.** *"Eat your
party member for a dinner"* has **no card in the game**: `EVENTS{}` and `CAMPS[]` contain no
cannibalism door, and SOMETHING IN THE PORK is about bad salt pork rather than a person. *"Bring
peace between the races"* has no arc either: there is no truce, no faction standing, and no ending
that turns on it. ⚠ **A store page may sell an ambition, and it may not sell a feature.** The line
that replaced them says what act one really offers, which is a moral RANGE with prices on it: the
kind door costs days or coin, Asha is a half-ratkin nobody on either side wants and she can be
travelled with, and `G.sins` holds **fifteen** named atrocities, in the game's own words, with the
Hold's men arriving on `needSins` when the list gets long.

⚑ **AND THE THREE CONTENT BLOCKS ARE STILL COUNTED FROM THE BUILD.** Seven trades with their real
signatures out of `CLASSES{}`; the three race skills out of `RACESKILL{}` (humans KICK, ratkin
POISON THE BLADE, ogres PICK UP AND THROW); `GEAR{}`'s **54 pieces, 21 common · 24 rare · 9 epic,
15 of them `unique:true`**, with the four strangest named as the game spells them.

⛔ **FOUR FACTS HAD GONE STALE IN THE BUILD, WHICH ONLY RE-COUNTING FOUND.** The page said
thirty-nine road cards and `EVENTS{}` holds **forty**; twenty-six places against `NODES{}`'s
**twenty-eight**, all of which lie on a route; twenty-six personalities against `TRAITS{}`'s
**twenty-seven**; and it still said **nerve**, which #232 renamed to **MOOD** everywhere the player
can see it. ⚠ **The day range is gone rather than corrected.** Summed over `EDGES`, the eight routes
cost 22 to 26 days of TRAVEL, which is not what the old "eighteen to twenty-two days" was counting
and is not a number a player can check either. A run is sold as **about an hour**, which they can
time.

⚠ **ON SENTENCE LENGTH, MEASURED THE SAME WAY AS BEFORE.** Mean words per sentence across the
fifteen reference pages, beside their review scores: Shogun Showdown 9.2 at 95% · Slay the Spire
10.2 at 97% · The Last Spell 10.6 at 91% · Our Adventurer Guild 13.3 at 95%, against Wartales 26.8
at 86% and Battle Brothers 32.9 at 88%. **This page runs 10.6 words a sentence over 52 of them**, with a
longest of 24. That is the band the best-reviewed short pages sit in. The previous cut ran 6.7 and
read like a telegram; the warmth cost four words a sentence and it was worth it.

---

**You cannot afford to be good to everyone.**

RabbleBound is a dark medieval tactical roguelike. You're the Captain of a company nobody chose. Strangers who
happened to be in the room when the work turned up, bound to one contract and to each other's
debts. The road ahead is going to ask you for money you do not have. The island calls you
mercenaries. You're the rabble.

**Fight on the field, not from a portrait.**
Hex battles, where facing, reach, cover and the ground under your boots all matter. So does the
mood of the person beside you. Two actions each, everybody. The Captain goes out there himself, and
he can go down.

**Seven trades. Three races.**
Spear wall. Aimed shot. Backstab. Sweep and roar. The battle-mage holds one school and a line; the
mage holds two schools and almost nothing else. Humans kick, ratkin poison the blade, and ogres pick
a body up and throw it.

**Spend people.**
Thirteen seats in the wagon. A human takes two, a ratkin one, an ogre three. Everybody eats and
everybody is owed wages. The purse empties every fourth day, good week or bad.

**Be decent, or be the thing they send men after.**
You can take the kind door every time and pay for it in days and coin. You can travel with a
half-ratkin albino that neither side wants, and see where that goes. Or you can rob the collector on his
round, strip the shrine, and cut down the Hold's own men on the lord's own road. Fifteen of those are written down by name, in the game's words rather than yours, and the Hold
reads that list too.

**Carry strange things.**
Fifty-four pieces of gear, and fifteen of them are one of a kind. The Cold Thing. The Ground-Glass
Eyes. The Mirrored Sphere. Fen-Mother's Tooth. It's a low-magic island, so a strange object is an
event and not a stat.

**Answer forty road cards.**
They're written to be read once and remembered. A hanged toll-man. A clan wedding that has stopped
the road. A company of the dead, still holding formation. Nineteen more happen at the fire, and
twenty-six perks and twenty-seven personalities decide who your people turn into.

**A run is act one.** Eight roads out of the Hold, twenty-eight places, about an hour. Every road
misses something the other roads had. Not in yet: the later acts, and the mortality chain, so a body
that goes down today is scarred and not lost.

Mouse for everything, Esc for the menu. Hover anything and it tells you what it is, the ground
included. It's free, it saves in your browser, and it installs nothing.

**A word from me**

This is my first real attempt at a game. I tried to move into gamedev seven years ago and it did
not work out. The battles are what I wanted out of Battle Brothers. The world has the grime of the
old Warhammer books. The road is trying for the weirdness and the choices of Caves of Qud.

The art is AI for now. It's a placeholder while I find out whether the game itself works. If it ever
pays its own way, I would much rather spend that money on real artists.

Act one is finished and I need people to break it. There's a ✉ FEEDBACK button in the corner of
every screen: tell me where you stopped and why. Two sentences beat a polite silence, and if you're
building something too, send it over and I'll play yours and write you notes back.

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

⚑ **THE BANNER AND THE BACKGROUND ARE BUILT, NOT COMMISSIONED, AND THE RECIPE IS BESIDE THEM.**
`marketing\itch\make_page_art.py` reads the two paintings that already exist - the engraved key art
at `art\src\stage-2\key\KEY-01D_main-menu-engraved-slashlight.png` and the cover source that
carries the wordmark - and writes both files in one run. Re-run it after either painting changes.

⛔ **THE WORDMARK IS KEYED OUT OF THE COVER PAINTING, AND THE OBVIOUS WAY TO CLEAN THE KEY DESTROYS
IT.** The letters are bone-coloured stone with dark speckles baked into them, so a luminance
threshold punches holes in the strokes: those close up fine (dilate then erode). The stray specks
elsewhere in the band are the problem, and an OPENING removes them by eating the serifs with them,
which was built, looked at, and thrown away - the wordmark came back ghosted and broken. **The fix
is a support mask**: blur the alpha, keep only what still has neighbours, multiply the sharp alpha
back through it. Specks have no neighbours and letters do.

⚠ **The banner is composed around the painting's own weight.** The company stands bottom left and
the lit road runs off to the right, so the type sits right of centre in the dark canopy, with a
graded wash under it and a soft drop shadow. **Any new banner has to leave the bottom left alone**,
because that is where the five figures are and they are the reason the picture works.

⚠ **The aftermath screen is deliberately not among the five.** At six or more crew the cards narrow
to the point where a long nickname breaks inside the word (measured: the name column is 131px at
four across and the longest nickname is 80px, so it only bites once `fitAftermath` goes to six
columns). It is a real defect and it is written down in `SHIPPED.md` under #203; it is not one to
put on a store page in the meantime.
