---
name: grimtoll-197-seventeen-asks
description: "#197 (8f.219), 2026-08-19: seventeen asks in one morning, MERGED to main. Three of them were the build lying quietly - no injury was ever permanent, the ogre's join door was never missing, and rarity did not exist"
metadata: 
  node_type: memory
  type: project
  originSessionId: ecbbfeca-cb3b-4115-a934-28dc899a3021
  modified: 2026-08-19T11:00:52.980Z
---

**#197 / 8f.219, on `work/card-batch`, MERGED onto main 2026-08-19. NOT deployed.** Seventeen
numbered asks arriving across one morning in six screenshots, all seventeen built and verified.

⛔ **THREE OF THEM COULD NOT BE ANSWERED AS ASKED, BECAUSE THE BUILD WAS LYING QUIETLY, AND THAT IS
THE ONLY PART WORTH REMEMBERING.**

1. **"write permanent or temporary injury"** - **nothing in the game was permanent.** `pickChoice`
   had branched on `hurt.lasting` since it was written and NOT ONE CARD SET IT. Five injuries are
   authored as stat losses and say so in their own `d` (*"−1 STR"*), and **the player never saw
   that text**, because the temporary branch prints `hurt.n` alone. A promise nobody can read is
   dead rather than broken, and no reading of the tables finds it: only asking what the new label
   would SAY did. ⛑ And **the CAMPS picker had its own applier that never read `lasting` at all**,
   so a camp card marked permanent would have shown the label and charged hitpoints. `applyHurt`
   is the one applier now.
2. **"with ogres event you don't have option ogre to join - when your party is full"** - **the
   door was never missing.** It was live, said *an ogre may join*, and checked the room INSIDE
   `pickChoice`, so a full company spent its one choice and was told afterwards. **From the
   outside that is indistinguishable from the option not existing, which is how it was reported.**
   Deriving it off `recruit`/`recruitPreset` fixed four preset doors nobody had reported.
3. **"give more often rare and epic items"** - **rarity did not exist.** No `rarity:` field on any
   of the 51 rows, though the art rule had promised one since #192. Tiered on the row (21/22/9,
   14 `unique` and never drawn) and the RATE raised by ADDING a piece rather than re-weighting
   tables that are authored flavour about the body they came off: 30% after a fight, 60% from a
   cache, measured 70/23/7 and 40/42/18 over 20k rolls.

⚑ **AND THE FOURTH LESSON IS ABOUT MEASURING.** *"cant see down part of the map"* took **three
readings**: at the DEFAULT camera stop (NEAR, z 1.22) the overflow is 121px and six nodes, which
is a fact about the ZOOM; `b.style.top` is camera space and `getBoundingClientRect` is screen
space, and mixing them says a node's caption sits 81px below itself; **and `wcamApply()` is
transitioned, so a `getComputedStyle` in the same tick still returns the old matrix.** Pinned to
ROAD, zeroed, and waited on, the real number is 22px and three captions. See
[[grimtoll-measuring-the-running-build]].

⛔ **THE FIRST FIX FOR IT BROKE THE MAP AND THE MAP'S OWN GATE CAUGHT IT.** Hanging the caption
above the painting is 122 design px the other way and took `spacingViolations` 0 → 2 and
`labelViolations` 0 → 1 against a `git show HEAD:` baseline. Shipped version lifts each caption by
**its own overflow and nothing more** (`capLift`, `--lift`), and `plateBox` reads the same
function or the checker scores a plate that is not where it is drawn.

⚠ **AND THE DESK SHIPPED ONE BUG BECAUSE IT NEVER OPENED THE SCREEN IT CHANGED.**
`CHOICE_ICO.leave` is a RECORD `{g,n,d}`, not a string, so the muster's new walk-away glyph
rendered **`[object Object]`**. The builder is `choiceIco({ico:['leave']})` and two other
hand-built walk-aways already call it. Found on the MERGED build, in the muster, by driving it.

**The other thirteen:** THE DEBT's two morale prices deleted · THE NINE SECONDS and AN HOUR OF
RAIN deleted · every card centres (`placeDlg`; the node anchor was clamped against an edge for
half the map) · THE LONG FIRE's second part 151 words to 99 · the marsh door off the last fight ·
the map's dev readout silenced · the hover's duplicate type line deleted · TRADE became CLASS on
nine surfaces · the muster's stat line moved to the name's hover · a non-decision door lost its
sub-line **and its empty `<i>`** · one height for every world-bar chip (`--barChip`) · and
**A Treasure Map** that plants a cache, filtered out where there is nowhere left to bury.

⚠ **OPEN, and written into `docs/SHIPPED.md` rather than left here:** the epic pool is findable
from fight one (the Foundry plate, the Weeping Hammer); the white/green/purple FRAME is not drawn,
only the word; four map paintings lose their bottom 14-37px to their own caption; `tradeOwed`
still says trade in the identifier.

Rules updated: `.claude/rules/event-cards.md` (two derived sub-line rows, the room gate, the
centred card), `world-map-sights.md` (the caption at the foot), `ui-scales.md` (a shared box
height is geometry, not a `--p` step), `static-event-art.md` (the `rarity:` field exists now).

Related: [[grimtoll-event-card-rules]], [[grimtoll-parallel-sessions]],
[[grimtoll-measuring-the-running-build]].
