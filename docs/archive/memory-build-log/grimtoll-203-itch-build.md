---
name: grimtoll-203-itch-build
description: "#203 (8f.225), 2026-08-19: the itch.io build. ⛔ THE FINDING: an itch game is a THIRD-PARTY IFRAME and a browser blocking storage makes localStorage THROW, which aborted the whole single inline script and gave a title screen with NO BUTTONS. One shim on the configurable window.localStorage accessor fixes all ~40 call sites. Also: the itch embed must be 1280x720 or fit() shrinks the 10px floor; Compress-Archive writes illegal backslash zip entries; and the cover already existed in marketing/itch"
metadata:
  type: project
  originSessionId: 5b2a5f55-13bd-49a9-afef-09fea4f268f0
  modified: 2026-08-19T15:25:47.021Z
---

**The ask (2026-08-19, in Russian):** *"подготовь билд на итч. И сделай описание проекта под итч
(исходя из моих сообщений про игру)"*, then mid-turn *"Hey, give me a build pls"*.

## What exists now

- **`tools\build_itch.ps1`** builds `%USERPROFILE%\grimtoll-itch\rabblebound-itch.zip` (13 MB): the
  player build (`build_site.ps1 -Player`) plus `icons/`, and it **reads the zip back** - index.html
  at the ROOT, 11+ cues, 100+ pictures, the player marker, no cog, the storage guard. `-Dev`
  packages the cog build instead; `-Out` moves the file.
- **`docs/ITCH_PAGE.md`**: the tagline, the body text, the tags and the four settings that matter,
  with **every number taken from the running build** (39 road cards, 19 fire incidents, 26 places,
  7 trades, 26 perks, 26 personalities, 13 seats at human 2 / ratkin 1 / ogre 3).
- Five 1920x1080 screenshots + the cover in the same folder. Shot from the **extracted zip** in a
  real headless Chrome at 2x through `tools/playtest/eyes.py`, because the preview pane composites
  no frames and `computer screenshot` fails outright there.

## ⛔ The finding, and it would have hit a real slice of itch players

**itch serves an HTML game from ITS OWN origin in an iframe on the page.** A browser set to block
third-party storage does not hand that iframe an empty `localStorage`: **accessing it THROWS
SecurityError.** The game is ONE inline script and three top-level statements read storage before
anything else (`AU.on` off `gt_mute`, `AUDIOPREF` off `gt_audio`, `TEST.on` off `gt_test`), so the
first throw aborted every line after it.

⚑ **Measured, not reasoned about**: `shots/203_itch_iframe.html` writes the built page into an
iframe with a throwing getter defined FIRST (a navigation resets the window and loses the
override). What rendered was the title, the pillar, and **no buttons at all** - not an error
anybody would report, a front door that reads as a badly made game.

⚑ **One shim, not forty call sites.** `window.localStorage` is a *configurable* own accessor, so it
is replaced wholesale with an in-memory object at the top of the script; every reader and writer is
untouched. ⚠ **The probe WRITES** (`setItem` + `removeItem`), because a browser can hand out a
readable store that refuses to keep anything, and a read-only probe passes and lets the save fail
silently later. `STORE_OFF` then puts the honest line on the front door: *"this browser is blocking
storage: the run will not survive the tab"*.

## Two more traps worth keeping

- ⛔ **The itch embed must be 1280x720.** `fit()` scales the whole stage by `min(w/1280,h/720)`, so
  the viewport multiplies every glyph: a 960-wide embed measured **0.75**, i.e. the 10px floor from
  `.claude/rules/ui-scales.md` rendering at **7.5px**. Widen the page theme, never the frame.
- ⛔ **Never `Compress-Archive` for a web upload.** PS 5.1 writes entry names with BACKSLASHES,
  which the zip spec forbids; unzippers then disagree and `icons/` becomes a file called
  `icons\favicon.ico`. Entries are written by hand with `ZipFile.Open` + forward slashes, and the
  check refuses a backslash.

## ⛑ And the thing I nearly duplicated

**`marketing\itch\` was already in the repo, untracked**, holding a purpose-made 630x500 cover with
the title set across it, its 1408x1117 source and the prompt that made it. I had already cropped my
own from the menu key art before finding it; his is better (the title, and the whole company
readable at thumbnail size) and is now the cover, committed. **Look in `marketing\` before making a
marketing asset.**

## Found and deliberately NOT fixed

The screenshot run caught the aftermath's crew card breaking a nickname mid-word (*"Weatherhe /
ad"*) at six or more crew. Measured first: the name column is **131px** at four across and the
longest nickname is **80px**, so it only bites once `fitAftermath` narrows to six columns.
`.abname`'s `overflow-wrap:anywhere` is what stops that card overflowing and the alternative clips,
and this is the card #187 and #189 were both burned on, so it is written into `SHIPPED.md` #203 and
kept out of the five screenshots instead.

⚠ **And a process failure to own: `deploy.ps1` swept another live session's files.** `git add -A`
picked up their #204 spec, a backlog row and an event-format sketch and pushed them under my commit
message. Docs only, so nothing half-built reached the playable page, but the memory
[[grimtoll-parallel-sessions]] warns about exactly this and the script even PRINTS the sweep list
before committing. **Read that list, and commit scoped paths yourself before running deploy when
another session is live.**

Related: [[grimtoll-202-runthrough-player-build]] (the player build this packages),
[[grimtoll-share-link]], [[grimtoll-measuring-the-running-build]], [[grimtoll-playtesters]].
