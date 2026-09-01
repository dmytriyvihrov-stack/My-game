---
name: static-event-art
description: "Exact sizes, formats and embed paths for event paintings, item icons, stat icons and the J pack, plus the narrative locks on specific scenes and the build-and-verify steps. Use whenever event art, item icons, stat icons or the J pack are rebuilt, embedded, mapped, regenerated or refactored, and whenever art/embed/* is touched."
---

# Static event art: the paintings, the packs, the embed

Apply this rule whenever event art, item icons, stat icons or the J pack are rebuilt, embedded, mapped, regenerated or refactored. The compact handoff for the newest paintings is `art/src/stage-4/CLAUDE_INSTRUCTIONS.md`.

> **The reasoning, the measurements and every user quote behind these rules are in
> [`docs/archive/rules-history/static-event-art.md`](../../../docs/archive/rules-history/static-event-art.md).**
> Read it when a rule looks arbitrary, when you are about to argue with one, or when you need the
> entry number. Nothing was cut, only moved: this file is the same rules with the story taken out.

## Hard size rule

- Road-event images final at exactly **`586x212`** = `DLGART_W` x `DLGART_H` = the live `#wDlg` canvas.
- Prologue images final at exactly **`750x190`**. ⚠ **The shipped files are still `460x190`, i.e.
  stretched; read the next section before exporting anything.**
- **Embed these PNGs verbatim.** Never the legacy `640x360` JPEG path, never enlarge the canvas,
  never a second cover crop.

## ⛔ A canvas `width=` ATTRIBUTE is not the box it lands in

`proCard()` writes `<canvas width="460" height="190">` with `width:100%` beside it:

```
.pcard   width:800px, border-box, padding var(--p6) var(--p7), 1px border
         800 - 24 - 24 - 1 - 1 = 750
```

so every prologue painting is stretched **x1.63 horizontally at full height** (`EV00P`, `EV00E`,
`EV00D`, stage-3's `EV00B`/`EV00C`).

⛑ The road card solved it: `#wDlg` 620, padding+border 34, `DLGART_W` 586, equal by construction, and
it uses **`outline` not `border` on the canvas** because a border on a border-box element eats the
content box and leaves a 586 store in 584 real pixels.

⛔ **THE PROLOGUE FIX IS THREE PARTS AND THEY LAND TOGETHER** (any two alone are worse than the bug):

1. the three PNGs re-exported at **`750x190`** (brief: `art/src/stage-4/PROLOGUE_REEXPORT_BRIEF.md`),
   a WIDER CROP of the scene, never an upscale of the 460 file;
2. `proCard()` writing `<canvas width="750" height="190">`, ideally off named constants beside
   `DLGART_W`/`DLGART_H`;
3. its inline `border:1px solid var(--e2)` becoming `outline:1px solid var(--e2);outline-offset:-1px`.

⚠ **Do not do 2 before 1**: `drawArt` cover-fits, so a 460x190 painting in a 750x190 store loses
**39% of its height**. A stretched picture is the lesser bug until the wider art exists.
⚠ **The card cannot grow instead**: the contract card already measures **663px against `.pcard`'s
684px ceiling**. Closed by arithmetic, not taste.

## ⛔ An item icon is a COLUMN, not a character on a line

*(#192)* `art/src/items/` -> `ITEM_ART`, mapped by `ITEM_ICON{}`, the one place a `GEAR` key meets a
picture. A key with no entry falls back to `gGlyph`: a shipping state, not a bug.

- **128x128 with alpha, embedded verbatim. No resize, no JPEG** (a JPEG has no alpha and these are
  cut-outs on a slot's own ground). Key = filename prefix, hyphens removed (`ITEM-04_...` ->
  `ITEM04`), same rule as `MAP-EV`.
- ⛔ **A COLUMN beside the text, never inline in the name line.** Inline it is a smudge at 24px and
  breaks the box at 40 (a filled slot measured **72px against the sheet's 67px slot pitch**).
  **`.slot` and `.item` are `flex-direction:row` with a `.sart` art column and a `.scol` text
  column**; a new surface copies that pair, never a third arrangement.
- ⚠ **Each caller writes its own size** (`itemImg(key,px)`) because each reserved a different box:
  **40** slot line and stash row, **38** in the aftermath's 40px `.abslot`, **56** in the shop's 60px
  `.gart`, **40** on the hover tip. `.iart` only says how the picture SITS.
- ⛔ **THE PNG CARRIES NO RARITY AND NO RECEIPT.** Rarity is the `GEAR` row's
  (`rarity:'common'|'rare'|'epic'`, plus `unique:true`); `RARITY{}` holds the names and colours
  (white `#c9c2b4`, green `#8ca35a`, purple `#a07cc9`); `rarityTag(key)` is the one renderer. ⏳ The
  frame is **still not drawn**, and when it is it goes round the slot the GAME draws, never into the
  PNG.
- ⚑ Five keys map to items that do not exist (`pilum`, `shuriken`, `timecube`, `kris`, `stoneshield`,
  specced in `art/ITEM_PACK_01_TEXT.md`) on purpose: `itemArt()` does not care whether `GEAR` has the
  row.

## ⛔ `STAT_ICON`: a family normalised on one axis inverts its ladder on the other

*(#234)* `prototype/export_brains_fullheight_32.py` normalises the nine BRAINS to a common content
HEIGHT under a width cap; one global cap made the four WEAKEST pictures the four WIDEST.

- ⛑ **The cap is PER GRADE and NEVER a squash**: `LUMP_W = {minus-4: 18, minus-3: 21, minus-2: 24}`
  against the 30 grade minus-1 keeps. Scaling height alone is a non-uniform resample of a pixel
  painting, the one thing this pipeline exists to refuse.
- ⛔ **`STAT_ICON` IS EMBEDDED FROM THE PACK, ROW BY ROW, NEVER HAND-EDITED.** Re-embedding is a
  script matching `/* minus-2 */'data:image/png;base64,...'` inside the `int:[ ... ]` slice,
  rewriting only grades whose PNG changed. ⚠ **Rows are in `TELLS` order, STRONGEST FIRST, and the
  pack ships the other way round**: the grade comment is the only row identifier, so it is
  load-bearing.
- ⚠ **The pack lives in `prototype/assets/`, gitignored, so it exists only in the MAIN working
  tree.** A desk running the exporter passes `GT_ART_ROOT`; the embedded base64 is what ships and
  what a desk commits.

## Exact live mapping

| Live scene | Art key | File |
|---|---|---|
| `EVENTART.oasis` | `EV29` | `art/src/stage-3/events/EV-29_warm-spring.png` |
| `EVENTART.bonfire` | `EV30` | `art/src/stage-3/events/EV-30_long-fire.png` |
| `EVENTART.circle` | `EV31` | `art/src/stage-3/events/EV-31_the-circle.png` |
| `EVENTART.clash` | `EV01` | `art/src/stage-4/events/EV-01_blood-on-the-road.png` |
| `EVENTART.toll` | `EV02` | `art/src/stage-4/events/EV-02_hanged-toll-man.png` |
| `EVENTART.chapel` | `EV04` | `art/src/stage-4/events/EV-04_drowned-chapel.png` |
| `EVENTART.deadco` | `EV09` | `art/src/stage-4/events/EV-09_dead-company.png` |
| `EVENTART.ratcart` | `EV17` | `art/src/stage-4/events/EV-17_clan-cart.png` |
| `EVENTART.ogrestone` | `EV19` | `art/src/stage-4/events/EV-19_sitting-stone.png` |
| `EVENTART.taxman` | `EV20` | `art/src/stage-4/events/EV-20_collector.png` |
| `EVENTART.shipwreck` | `EV24` | `art/src/stage-4/events/EV-24_last-ship.png` |
| `EVENTART.snare` | `EV27` | `art/src/stage-4/events/EV-27_ratkin-snare.png` |
| opening `proCard()` | `EV00P` | `art/src/stage-4/prologue/EV-00P_opening-pint.png` |
| base contract card / `TAVERNART` | `EV00E` | `art/src/stage-4/prologue/EV-00E_contract-offer.png` |
| `PRO_ART.coin` | `EV00B` | `art/src/stage-3/prologue/EV-00B_no-joke.png` |
| `PRO_ART.joke_hit` | `EV00C` | `art/src/stage-3/prologue/EV-00C_good-joke.png` |
| `PRO_ART.joke_miss` | `EV00D` | `art/src/stage-4/prologue/EV-00D_joke-miss.png` |

`coin`, `joke_hit`, `joke_miss` are existing scene names. Do not invent replacement keys. `floor` is
deliberately unmapped: its obsolete EV00A image was deleted when that narrative door was parked.

## ⛔ The J pack: the door marks and the wide stages

*(#209)* ⛔ **BUILT AND INJECTED BY THEIR OWN PAIR, NEVER BY `build_assets.ps1`.**

```
python art\build_j_pack.py
powershell -NoProfile -ExecutionPolicy Bypass -File art\inject_j_pack.ps1
```

`inject.ps1` rewrites the whole 10 MB `/*__ART_DATA__*/` block and two desks that both run it produce
the conflict nothing can resolve. The J pack gets `/*__J_PACK__*/` and its own 2 MB block: re-running
one can never touch the other.

| what | source | box | format |
|---|---|---|---|
| the eight intent marks | `art/src/intent-icons/intent-<k>-<ver>.png` | **120x160** | PNG, alpha |
| the three race marks | `art/src/intent-icons/race-<r>-v3-card.png` | **128x128** | PNG, alpha |
| the wide event stages | `art/src/stage-6/j-stage/EV-J<N>_<slug>-stage.png` | **1672x941** | JPEG q82 |

- ⛔ **A MARK IS PNG AND A STAGE IS JPEG, NOT A PREFERENCE.** A mark is a cut-out on a button's own
  ground and a JPEG has no alpha; a stage is full-bleed with no transparency and a PNG of one is 2 MB
  against 180 KB. **q82 is `build_assets.ps1`'s own number.**
- ⛔ **A STAGE IS EMBEDDED AT NATIVE SIZE AND NOTHING IS RESAMPLED.** The card draws it into 1180x620
  and the 1280x720 stage is SCALED to the window, so a downscale here is an upscale over about 1400.
- ⛔ **`cook` OR `as-delivered` IS A DECLARATION IN `PICK`, NOT A MEASUREMENT.** A source already at
  the target box goes in verbatim: trimming re-centres an approved composition and the alpha floor
  eats its antialiasing ring. **A faint-pixel test cannot tell the two cases apart** (a real wash and
  a one-pixel ring read the same number, opposite meanings); what differs is whether the file still
  has to be RESIZED, and only the pipeline knows that.
- ⚠ **The alpha floor (40) stays on anything COOKED**: a door draws `drop-shadow()`, which lights
  every non-zero pixel, so a near-invisible wash prints as a glowing rectangle.

⚑ **`JSTAGE{}` is where a card meets a stage and nowhere else**, same shape and rule as `MAP_SIGHT{}`.
Key = filename prefix, hyphens removed (`EV-J4_clan-wedding-stage.png` -> `EVJ4`). **A card with no
key is a legitimate shipping state**: it falls back to `EVENTART`'s letterbox, then to procedural
`paint()`. Adding art is three steps and one row:

1. drop the 1672x941 PNG in `art/src/stage-6/j-stage/`
2. `python art\build_j_pack.py` then `art\inject_j_pack.ps1`
3. one row in `JSTAGE`

⚠ **THE LEFT 45% OF A STAGE IS RESERVED** for the title, cast plates, beats and doors: a master with
its subject on the left will be covered by the interface, a composition fault this pipeline cannot
fix. Prompts: `art/src/stage-6/J_STAGE_PROMPTS_USED.md`.
⚠ **`EVJ8` IS THE MUSTER FIELD AND IS DELIBERATELY UNMAPPED**: `openEvent` hands `hire` to
`openHire()`, a wall and not a card. It is embedded because it arrived with the set.
⚑ The opening's two cards are `prologue:'EVJ64'` and `contract:'EVJ65'` *(#219)*. **`EV00P` and
`EV00E` are NOT deleted**: they are what `prStage` falls back to where the J pack is not injected.
⛔ **`EVJ64`/`EVJ65` SHOW THE COMPANY: AN APPROVED EXCEPTION BINDING THOSE TWO KEYS AND NOTHING
ELSE.** The standing rule keeps the party out of the painted right side so a card can never show a
body the roster disagrees with. **A road or camp master with your people in it is still a composition
fault.**

## ⛔ Narrative locks

- `EV00E` follows the shipped contract prose: after the won brawl the employer crosses the wreckage,
  sits uninvited, and calmly places a **closed** purse on the table. **He never throws it.** Exactly
  two paid swords remain still at the door. ⛔ **This lock binds `EVJ65` too.**
- `EV02` and `EV09` stay non-graphic: implication and covered forms only.
- **Do not regenerate a listed painting just to make the pack stylistically uniform.** Read its live
  event first and preserve the approved composition.

## ⛔ Where the blocks live, and it is not the prototype

*(#235)* **The two art blocks are two tracked, generated files: `art/embed/art_data.js` and
`art/embed/j_pack.js`**, loaded by the working file as two classic script tags;
`tools/build_site.ps1` pours them back inline so the shipped page is still ONE self-contained file.
`inject.ps1` and `inject_j_pack.ps1` still exist and forward to `art/embed.ps1`; neither reads or
writes the prototype.

- ⛔ **`art/embed/` IS TRACKED AND MUST STAY TRACKED.** It is the only copy of the paintings in git;
  `art/src/` and `art/out/` are ignored and a desk is a fresh checkout, so ignoring it gives every
  new desk a game with no art and no error to say why.
- ⚠ **CLASSIC SCRIPTS, IN ORDER, NEVER `defer` OR `type=module`.** A top-level `const` in a classic
  script is a global lexical binding, which is why not one line of game code changed; either
  attribute drops the game silently to `HASART`'s procedural fallback.
- ⚠ **The build finds the tags by `data-embed`, NOT by their `src`**, and a tag that survives the
  pour is a fatal build error.
- ⛔ **Never hand-edit `art/embed/*.js` or the generated root `index.html`.**

## Build and verification

1. `art/build_assets.ps1` reads stage 3 and stage 4 automatically, derives the art key from the
   filename prefix (`EV-00E` -> `EV00E`), and embeds PNG bytes.
2. Run `powershell -NoProfile -ExecutionPolicy Bypass -File art/build_assets.ps1`.
3. Run `powershell -NoProfile -ExecutionPolicy Bypass -File art/inject.ps1`
   (which is `art/embed.ps1 art_data`).
4. Run `powershell -NoProfile -ExecutionPolicy Bypass -File tools/build_site.ps1`.
5. Verify the expected key in `art/out/art_data.js`, **`art/embed/art_data.js`** and `index.html`,
   and confirm the dimensions before finishing. ⚠ The key is no longer in
   `prototype/grimtoll_slice.html` and looking for it there will say the art is missing when it is not.
6. `python tools/dev/gt.py check` parses the prototype AND both embed files. It is the gate that
   catches a block which did not survive its own rebuild.

⚠ **Verify a landed edit by grepping for a string only the NEW code has.** A hunk once silently
reverted while the `</div>` that closed it survived, and the editor reported success. **On a shared
working tree the tool's word is not the evidence; the file is.**
