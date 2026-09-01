---
name: grimtoll-201-ratkin-romance
description: "#201 the albino half-ratkin companion Ash and her fire card - COMMITTED on work/ratkin-romance (8f.223), NOT landed: another desk held the prototype"
metadata: 
  node_type: memory
  type: project
  originSessionId: 19af6b8e-6dab-4f47-ad42-d104ae3e965f
  modified: 2026-08-19T10:58:42.803Z
---

**#201, 2026-08-19, commit `ce9edd3` on `work/ratkin-romance`. Built, fully verified, NOT MERGED.**
The user asked for a romance companion: an albino half-ratkin who joins with the ratkin, plus a
campfire card with three doors he wrote out himself.

⛔ **IT WAS NOT LANDED AND THE REASON IS THE ONLY THING TO RE-CHECK BEFORE MERGING.** Session
`9ee02431` held `prototype/grimtoll_slice.html` doing the **em dash sweep (8f.221): 1,338 em dashes
across the whole file**. That is the maximally-conflicting neighbour for a 150-line prototype
change. Land only after that lock clears, and expect to merge, not fast-forward. See
[[grimtoll-parallel-sessions]].

## What she is, and the one decision that was mine

**`Ash "Nobody's"`, ratkin cutter, trait `dutiful`, knife + off-hand dirk.** The user named neither
her nor the join model, and refused the clarifying question with *"keep working"*, so both were
called and flagged: **she REPLACES `PRESET_NIB` and `PRESET_HALF`.** The clash has exactly two doors
that yield ratkin, so *"1 or 2 ratkins joins (she is one of them)"* is only true on every ratkin
path if she is on both. `PRESET_HALF` (Gell) was already named for the concept - the half, the one
nobody claimed - so it reads as that slot finally being drawn rather than a deletion.

⚑ **`dutiful` ALREADY WAS THE CHARACTER.** +8 dodge beside the Captain, -4 away from him is
mechanically *"she was always finding her flok"*. The trait existed, nothing else in `TRAITS` says
it, and the character therefore cost **no new mechanic**. Look through `TRAITS` before writing one.

## ⛔ The camp handler injures a RANDOM body

`openCamp`'s `o.hurt` does `pickOne(G.party)`. A card whose whole point is that you hurt *her* would
have said so in prose while the receipt bruised Marrow - the sentence-and-payment disagreement the
event-card rules exist to stop, arriving through a door nobody would re-read. Added `hurtCast:true`,
which lands it on `pa`. **Any future card that names who it hurts needs that flag.**

Two other one-line mechanisms this needed, both now general: **`castMember`** (the first `campPool`
gate that names an id; with her absent the pool empties and `openCamp` falls back to a vignette,
which already worked) and **`c.art`** (a camp card may own its painting instead of dealing one of
four at random).

## ⛔ A battle sprite's size is decided by the FIELD, not by the art handoff

The handoff called the **70x72 "detail"** export preferred. It is wrong and its own acceptance check
says so. Measured in the build: allied ratkin are **35x37 / 36x36 / 33x39 / 39x37**, allied humans
**39-47 by 45-49**. The **36x37** "legacy fallback" is the one that ships. Same shape as the map
sights: display size is the screen's arithmetic, never which file looks better alone.

⚠ **And `build_final.py` CLEANS `art/out/battle`**, so a companion sprite copied in by hand is one
the next atlas rebuild silently deletes - and `paintedSpriteKey` returns null on a missing key, so
the failure is a quiet downgrade to a drawn body, not an error. Hers is re-derived by
`art/src/ratkin-romance-companion/build_companion.py`, the same pattern as `build_mirehares.py`.
⚠ Those scripts are under gitignored `art/src/`, so they live in Drive and not in git.

## ⚠ `pay()` writes `G.run.food`, not `G.camp.food`

A probe read `G.camp.food` and reported the card charging no provision. It charges correctly;
`canAfford` reads `(r in G.run)?G.run[r]:G.camp[r]`. **A receipt that looks wrong is a reason to
check which store the reader is reading before it is a reason to change the game.**

## ⚠ The preview pane serves MAIN, not the desk

`preview_start` reads `.claude/launch.json` from the primary working directory, so it served main's
tree and reported my own edits missing (the same trap #194 hit). `.claude/launch.json` is TRACKED,
so do not edit it for a desk. **The clean workaround: copy the desk's prototype into main's
gitignored `shots/` and load it from there** - zero tracked-file changes, no interference with the
other session. Only the favicons 404.

See [[grimtoll-event-card-rules]] for the bands the card was measured against and
[[grimtoll-safe-file-patching]] for how the 14 edits were applied.
