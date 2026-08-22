# The art queue: every picture still wanted, where its brief is, and where the file goes

> **This file is yours.** One row per asset, in the order worth making them, with the size, the
> filename and key the pipeline expects, and the brief to paste. Work down it as the generator's
> limits allow; nothing here blocks anything else, and a partial delivery is a shipping state
> everywhere (every surface has a fallback: a glyph, a silhouette, a letterbox).
>
> **The rule that keeps it honest:** a session that wires an asset flips its row to ✅ the same
> session and names the key, because *an asset sitting on disk unbuilt is the silent-failure shape*
> (#190, #226, #237 all found one). Re-measure with `shots/238_art_census.js` and
> `shots/238_art_census_fire.js` in the running build rather than trusting the status column.
>
> Set up 2026-08-23 at your word: *"Собери отдельную табличку, куда складывать все арты и брифы,
> которую сделать на будущее. Я буду постетепнно как лимиты отпустят таскать."*

---

## 0. Where the build stands, measured 2026-08-23

| family | painted | bare | note |
|---|---|---|---|
| road cards, wide stages 1672x941 | **40 of 40** | 0 | 63 keys mapped, 65 embedded. The old note about "seven road cards" is stale |
| fire cards (CAMPS), wide stages | **19 of 19** | 0 | |
| vignettes, wide stages | 0 of 10 | 10 | one-liners shown for seconds; see E below, low |
| world map: events and places | **28 of 28** | 0 | #237; `cache` and `armour` unpainted on purpose |
| named portraits | 10 of 10 + 3 race plates | 0 | but every *unnamed* recruit shares the race plate: D below |
| enemy faces on the battle plaque | 5 sheets | see A | the cascade hands the wrong sheet to three kinds of foe |
| battle tokens | 53 keys, nothing falls to the silhouette | 0 | #89 part four |
| item icons, 128px | 53 of 56 `GEAR` keys | 3 | C below |
| the wagon card | 0 of 6 | 6 | B below: the card ships with glyphs |
| prologue plates | 5 of 5 | 0 | the 750x190 re-export is retired, F |
| the 586x212 event letterboxes | fallback only | - | every road card draws its wide stage now; nothing to make |

---

## 1. The queue, in the order I would make them

Status: ⏳ wanted · 🎨 file delivered, not yet built · ✅ in the build.

### A. Enemy faces: the battle plaque, seen in every fight

The plaque (`#bPortrait`) picks a sheet by elimination: big or passive beast → C5 (the cub's sheet),
leader → C2, caster → C3, human → C4, **everything else → C1, the ratkin rank-and-file**. So today an
ogre foe wears a ratkin's face, the Fen-Mother wears her own cub's, and a dog or a mirehare falls to
the blank silhouette. A new sheet is a drop-in file at `art/src/` plus one row in that cascade.

| # | asset | size / format | file → key | brief | status |
|---|---|---|---|---|---|
| A1 | **C1 redrawn**: the common ratkin soldier, one face, not a three-panel sheet | same box as the file it replaces; the plaque cover-crops | `art/src/C1_Ratkin_Rank_and_File.png` → `C1` (unchanged) | [`C1_REPLACEMENT_BRIEF.md`](C1_REPLACEMENT_BRIEF.md) | ⏳ |
| A2 | **an ogre foe**: grey-skinned, huge, a club or a maul over the shoulder, the Sitting Stone's kind | as A1 | `art/src/C6_Ogre_Foe.png` → `C6` | §3 below | ⏳ + one cascade row |
| A3 | **the pack**: one dog of the Snare clan's pack, wet, ribs showing, a bell on a cord | as A1 | `art/src/C7_The_Pack.png` → `C7` | §3 | ⏳ + one cascade row |
| A4 | **the mirehares**: the doe (long legs, folded) and the buck (head down, the run) on one sheet or two | as A1 | `art/src/C8_Mirehares.png` → `C8` | §3; the bodies are in `art/src/stage-5/mirehare-concepts` | ⏳ + one cascade row |
| A5 | **the Fen-Mother's own face** | as A1 | `art/src/C9_The_Fen_Mother.png` → `C9` | §3; `E2_The_Fen_Mother.png` may hold a croppable head | ⏳ + one cascade row |

*Not wanted:* the Thing in Armour (`noFace`, by design: its whole content is that you cannot tell).

### B. The wagon card (#238): shipped with glyphs, wired for these

| # | asset | size / format | file → key | brief | status |
|---|---|---|---|---|---|
| B1 | the cart on the road, nobody in it, the mule looking back | **586x212** PNG | `art/src/stage-4/events/EV-40_the-wagon.png` → `EV40` (`WAGON_ART` reads it) | [`WAGON_ART_BRIEF.md`](WAGON_ART_BRIEF.md) | ⏳ |
| B2 | THE FRAME: a wheel with a fresh spoke and a length of new bench timber | 128x128 alpha PNG | `art/src/items/ITEM-57_the-frame.png` → `ITEM57` | same | ⏳ |
| B3 | THE BED: a folded cot with one strap | 128x128 alpha | `ITEM-58_the-bed.png` → `ITEM58` | same | ⏳ |
| B4 | THE MEDICINE CHEST: a small iron-bound chest, lid half open | 128x128 alpha | `ITEM-59_the-medicine-chest.png` → `ITEM59` | same | ⏳ |
| B5 | THE COOK-FIRE: a squat iron fire-box, light in the slots | 128x128 alpha | `ITEM-60_the-cook-fire.png` → `ITEM60` | same | ⏳ |
| B6 | THE RELIQUARY: a narrow shelf, a dark curtain half drawn | 128x128 alpha | `ITEM-61_the-reliquary.png` → `ITEM61` | same | ⏳ |

`ITEM_ICON` already maps `wagon_frame`, `wagon_bed`, `wagon_aid`, `wagon_fire`, `wagon_shrine`; no code
when these land, only the build.

### C. Item icons: the three `GEAR` rows still drawn as a glyph

| # | asset | size / format | file → key | brief | status |
|---|---|---|---|---|---|
| C1 | **Crossbow**: a wound crossbow with a stirrup and a hook, slow and ugly | 128x128 alpha | `art/src/items/ITEM-62_crossbow.png` → `ITEM62` | [`ITEM_ICONS_GPT_TASK.md`](ITEM_ICONS_GPT_TASK.md) §3 suffix + this line | ⏳ + one `ITEM_ICON` row |
| C2 | **The Second Shape** (trinket): a palm-sized hollow figure of twisted dark wire in the rough shape of a person, nothing inside it | 128x128 alpha | `ITEM-63_the-second-shape.png` → `ITEM63` | same | ⏳ + one row |
| C3 | **A Treasure Map** (trinket): charcoal on the back of a tally-sheet, two roads, a bend in a river and a cross | 128x128 alpha | `ITEM-64_a-treasure-map.png` → `ITEM64` | same | ⏳ + one row |

### D. Recruit faces, "pack 03" (backlog #12)

Every muster stranger and every unnamed event recruit wears the race plate (`P6`/`P7`/`P8`), so the
second human you hire has the first one's face, on the roster, the rail and the sheet. Wanted: a
**pool** the game deals from, one face per body for the life of the run.

| # | asset | size / format | file → key | brief | status |
|---|---|---|---|---|---|
| D1 | six human faces, men and women, road-worn, no two alike | vertical masters, cropped to the live 220x220 by `build_assets.ps1` | `art/src/stage-2/portraits/POR-H01..H06_*.png` → `PORH01..06` | §3; the format is [`stage-2/portrait-refresh-2026-08-22/CLAUDE_INSTRUCTIONS.md`](src/stage-2/portrait-refresh-2026-08-22/CLAUDE_INSTRUCTIONS.md) | ⏳ |
| D2 | six ratkin faces | same | `POR-R01..R06` → `PORR01..06` (⚠ `PORR05` is Snarl and exists; number round it) | §3 | ⏳ |
| D3 | three ogre faces | same | `POR-O01..O03` → `PORO01..03` | §3 | ⏳ |

Needs an entry of its own when the files exist: `portraitOf` reads `PORTRAIT[id]`, then
`PORTRAIT_BY_NAME`, then the race plate; the pool is a fourth step that stamps a face key on the
body at `finishRecruit` and rides the save.

### E. The vignettes: optional, and probably never

Eight one-line road cards (FOUND x2, LOST x2, THE MULE, THE BET, SORE HEELS, THE CROW) draw the
procedural ground, and two (AT THE FIRE) have no body at all. A 1672x941 stage each is the full
J-pack pipeline for a card on screen for seconds. **Make these last, or not at all.**

### F. Retired, so nobody makes them

| | why |
|---|---|
| the prologue re-export to 750x190 ([`stage-4/PROLOGUE_REEXPORT_BRIEF.md`](src/stage-4/PROLOGUE_REEXPORT_BRIEF.md)) | #219 put both prologue cards on wide stages (`EVJ64`, `EVJ65`); the 460x190 plates are only the fallback of a column card with no live caller |
| the C1 redraw *as a share blocker* | the artifact route was abandoned for GitHub Pages; C1 is still wanted, as A1, for the plaque |
| a second set of map sights | #237 measured 0 bare nodes |

---

## 2. Later, when the system exists (do not make these yet)

| when | what it will want | size |
|---|---|---|
| **act 2** (parked 2026-08-01) | a terrain painting · about 25 sights · a wide stage per card · tokens and faces for whatever is new | 2560x1276 · 128 alpha · 1672x941 · as now |
| the mule ladder (#238 spec §D: the ox, the horse) | two tile icons and the two swap cards' stages | 128 alpha · 1672x941 |
| the forge on the road (#238 spec, acts 1-2) | nothing: `CRAFT`'s five pieces already have icons | |
| the settlement screen (`09_SETTLEMENTS_AND_LEGACY.md`) | a painting per building tier, when it is designed | |
| the skill tree (#208, `tools/skilltree_lab.html`) | perk icons, when the tree is in the game | |

---

## 3. Short briefs for the rows that have no file of their own

**The fixed suffix, from the item task, on every prompt:** *Painted illustration, dark low-fantasy,
rain-soaked, muted earth palette with one warm accent, visible brushwork, no text, no watermark, no
border, no frame.*

**Enemy faces (A2-A5).** A head-and-shoulders portrait of one creature, three-quarter view, looking
past the viewer, lit from one side, against a dark wet stone or fen background with nothing else in
it. The plaque cover-crops, so keep the face in the middle third. No weapons raised, no second figure.
- A2 the ogre: grey skin, a heavy brow, small eyes, a lashed-leather collar; patient rather than angry.
- A3 the dog: a lean hound, wet, one ear torn, a clan bell on a cord at the throat.
- A4 the mirehares: the doe sitting tall with her long legs folded, the buck lower, head down; green
  at the edges of the coat where the fen has touched it.
- A5 the Fen-Mother: a vast old beast, the light under the skin faintly visible, eyes half shut.

**Items (C1-C3).** One object, centred, cut out on transparency, lit from the upper left, shown at
40-56px: the same as the 56 already made. Subjects are in the table.

**Recruit faces (D).** Vertical masters like the portrait refresh, one person each, road-worn and
plain, nobody heroic, no two with the same hair or age; humans of both sexes and several ages, ratkin
with different muzzles and ears, ogres that differ in the brow and the jaw. No armour that would
contradict what the body is wearing: a collar, a hood, a scarf at most.

---

## 4. The pipelines: where a file goes and what runs

| family | drop the file in | then run | then |
|---|---|---|---|
| event paintings 586x212, enemy sheets, portraits | `art/src/stage-4/events/` · `art/src/` · `art/src/stage-2/portraits/` | `art\build_assets.ps1` then `art\inject.ps1` | a key row where the table needs one (`EVENTART`, the plaque cascade, `PORTRAIT`) |
| item icons 128 alpha | `art/src/items/` | `art\build_assets.ps1` then `art\inject.ps1` | an `ITEM_ICON` row for C1-C3; B2-B6 are mapped already |
| wide stages 1672x941 | `art/src/stage-6/j-stage/` | `python art\build_j_pack.py` then `art\inject_j_pack.ps1` | a `JSTAGE` row |
| map sights | `art/src/world-map-sites/` as `MAP-*-source.png` | `build_event_sites.py`, then the two above | `MAP_SIGHT` or `MAP_PLACE` |
| every family | | `tools\build_site.ps1` or `deploy.ps1` | `python tools/dev/gt.py check`, and the census probes |

Formats are not negotiable: a cut-out is PNG with alpha, a full-bleed stage is JPEG at q82 (the
pipeline converts), nothing is resampled by hand. The reasons are in `.claude/rules/static-event-art.md`
and `.claude/rules/world-map-sights.md`.
