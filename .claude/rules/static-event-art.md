# Static event art: stage 3 and stage 4

Apply this rule whenever event art is rebuilt, embedded, mapped, regenerated,
or refactored. The compact handoff for the newest paintings lives at
`art/src/stage-4/CLAUDE_INSTRUCTIONS.md`.

## Hard size rule

- Road-event images are final at exactly `586x212`, matching `DLGART_W` x
  `DLGART_H` and the live `#wDlg` canvas.
- Prologue images are final at exactly `750x190`. ⚠ **The shipped files are
  still `460x190` and are therefore stretched; see the section below before
  exporting anything.**
- Embed these PNGs verbatim. Do not pass them through the legacy `640x360`
  JPEG path, enlarge their canvas, or apply another cover crop.

## ⛔ The number a canvas ATTRIBUTE gives you is not the box it lands in

*(2026-08-18, measured in the running build after the stage-4 pack went in.)*

This rule said prologue art was `460x190` "matching `proCard()`" for five
months, and `proCard()` does write `<canvas width="460" height="190">`. **The
attribute was read; the rendered box never was.** The style beside it is
`width:100%`, and the card it sits in is 750px wide inside its padding:

```
.pcard   width:800px, border-box, padding var(--p6) var(--p7), 1px border
         800 - 24 - 24 - 1 - 1 = 750
```

So every prologue painting is drawn into a 460-wide backing store and then
stretched by the browser across 750 CSS px: **x1.63 horizontally at full
height**, on `EV00P`, `EV00E`, `EV00D` and on stage-3's `EV00B`/`EV00C` before
them.

⚑ **THE ROAD CARD ALREADY SOLVED THIS AND WROTE THE ANSWER DOWN.** `#wDlg` is
620 wide, its padding and border take 34, and `DLGART_W` is 586 - equal by
construction, with the comment *"Every #wDlg canvas is created at exactly
586x212 so nothing is stretched to fit this box"*. It also uses **`outline`,
not `border`, on the canvas**, because a border on a border-box element eats
into the content box and would leave a 586 store in 584 real pixels. The
prologue card never got either half of that treatment.

⛔ **THE FIX IS ONE CHANGE IN THREE PARTS AND THEY LAND TOGETHER**, because any
two of them alone are worse than the bug:

1. the three prologue PNGs re-exported at **`750x190`** (brief:
   `art/src/stage-4/PROLOGUE_REEXPORT_BRIEF.md`) - a WIDER CROP of the original
   scene, never an upscale of the 460 file;
2. `proCard()` writing `<canvas width="750" height="190">`, ideally off named
   constants beside `DLGART_W`/`DLGART_H`;
3. that canvas's inline `border:1px solid var(--e2)` becoming
   `outline:1px solid var(--e2);outline-offset:-1px`.

⚠ **Do not do 2 before 1.** `drawArt` cover-fits, so a 460x190 painting in a
750x190 store is scaled 1.63 and loses **39% of its height** - the pourer's arm
on `EV00P` and the doorway swords on `EV00E` both leave the frame. A stretched
picture is the lesser bug until the wider art exists.

⚠ **And the card has no room to grow instead.** Keeping 460x190 undistorted at
full width would mean a 310px-tall picture, and the contract card already
measures **663px against `.pcard`'s 684px ceiling**. That path is closed by
arithmetic, not by taste.

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

`coin`, `joke_hit`, and `joke_miss` are existing scene names. Do not invent
replacement keys. `floor` is deliberately unmapped: its obsolete EV00A image
was deleted when that narrative door was parked.

## Narrative locks

- `EV00E` follows the shipped contract prose. After the won brawl, the employer
  crosses the wreckage, sits uninvited, and calmly places a closed purse on the
  table. He never throws it. Exactly two paid swords remain still at the door.
- `EV02` and `EV09` stay non-graphic: implication and covered forms only.
- Do not regenerate a listed painting just to make the pack stylistically
  uniform. Read its live event first and preserve the approved composition.

## Build and verification

1. `art/build_assets.ps1` reads stage 3 and stage 4 automatically, derives the
   art key from the filename prefix (`EV-00E` -> `EV00E`), and embeds PNG bytes.
2. Run `powershell -NoProfile -ExecutionPolicy Bypass -File art/build_assets.ps1`.
3. Run `powershell -NoProfile -ExecutionPolicy Bypass -File art/inject.ps1`.
4. Run `powershell -NoProfile -ExecutionPolicy Bypass -File tools/build_site.ps1`.
5. Verify the expected key in `art/out/art_data.js`,
   `prototype/grimtoll_slice.html`, and `index.html`, and confirm the dimensions
   before finishing.

Never hand-edit the embedded base64 block or the generated root `index.html`.
