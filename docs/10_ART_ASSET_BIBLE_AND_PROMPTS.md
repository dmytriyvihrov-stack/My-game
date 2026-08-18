# RabbleBound — complete art asset bible and prompt pack

> Standalone production document. Audited against the live vertical slice in
> `prototype/grimtoll_slice.html`, the game concept, world lore, mutation design, settlement and
> legacy design, and every source image currently in `art/src/` on 2026-07-31.

## 1. What this document is for

This is the single manifest for **painted visual assets** in RabbleBound. It includes:

- every painting already in the repository;
- every live event, camp incident, road vignette, major screen, character, enemy and environment;
- planned mutation and settlement art that the accepted concepts already require;
- one subject prompt for every proposed picture or production sheet;
- rules for format, crop, palette, naming and review.

It does **not** treat every idea in the backlog as ready for illustration. Items whose fiction or
mechanics are still open are marked **BLOCKED — DO NOT GENERATE**. Painting them early would turn an
unsettled design into accidental canon.

### Status legend

| Status | Meaning |
|---|---|
| **EXISTING — KEEP** | A source painting exists and is suitable as a current reference or production asset. |
| **EXISTING — LEGACY** | A source exists, but a newer painting supersedes it. Preserve it; do not integrate it again. |
| **GENERATED — STAGE 1** | A new source has been generated and packaged for review, but is not yet wired into the prototype. |
| **STAND-IN — REPLACE** | The live prototype deliberately reuses an unrelated painting or a labelled concept sheet. |
| **MISSING — CREATE** | The subject and use are defined well enough to generate now. |
| **FUTURE — CREATE LATER** | Accepted concept, not required for the current slice. The prompt is ready. |
| **BLOCKED — DO NOT GENERATE** | The design must be settled before art production. |

### Audit result before stage 1

- `art/src/` contains **29 PNG source paintings** and `art/out/` contains their 29 JPG exports.
- The live event table contains **28 road/place/battle events**. Only **11** have a dedicated event
  illustration. **12** reuse a stand-in and **5** have no mapped painting.
- The tavern prologue has dedicated art; the Muster Field has dedicated art; Coldharrow currently
  reuses the Ratkin Snare image.
- All **17 camp incidents** and all **14 small road vignettes** are text-only.
- Existing recruit and creature sheets include labels and multiple figures in one image. They are
  useful reference sheets, but not final single-character portraits or transparent battle tokens.
- The menu, world map, inventory, battlefield grounds, aftermath, wagon, victory/defeat and planned
  inheritance screens have no dedicated source paintings.

### Stage-1 production result — 2026-07-31

Stage 1 is now frozen for review in `art/src/stage-1/`. It contains three full-size key/menu PNGs,
fourteen 640×360 event JPGs and a colocated Claude integration guide. These files are generated but
**not yet integrated** into the runtime art bundle.

| Asset | File | Production use |
|---|---|---|
| `KEY-01` | `art/src/stage-1/key/KEY-01_main-menu-bloom.png` | Selected main-menu background; vivid Bloom forest with a dark centred UI corridor. |
| `KEY-01A` | `art/src/stage-1/key/KEY-01_ALT_opening-road.png` | Alternate prologue/loading/Act One road splash. |
| `KEY-02` | `art/src/stage-1/key/KEY-02_world-mood-key.png` | Neutral road, weather, company-diversity and scale reference. |
| `EV-03` | `art/src/stage-1/events/EV-03_pedlar-on-the-ridge.jpg` | Replaces the Clan Cart stand-in for `pedlar`. |
| `EV-05` | `art/src/stage-1/events/EV-05_bonepickers-camp.jpg` | Replaces the Muster Field stand-in for `camp`. |
| `EV-06` | `art/src/stage-1/events/EV-06_sunken-wain.jpg` | Replaces the Clan Cart stand-in for `wain`. |
| `EV-07` | `art/src/stage-1/events/EV-07_under-the-bloom.jpg` | Vivid Bloom-style refresh for `bloom`. |
| `EV-08` | `art/src/stage-1/events/EV-08_fen-mother.jpg` | Production-size vivid Bloom refresh for `mother`. |
| `EV-10` | `art/src/stage-1/events/EV-10_something-in-armour.jpg` | New dedicated scene for `armour`. |
| `EV-11` | `art/src/stage-1/events/EV-11_they-come-over-the-wall.jpg` | New dedicated scene for `packev`. |
| `EV-12` | `art/src/stage-1/events/EV-12_door-shrine.jpg` | New bright Stolen-Daylight shrine scene for `shrine`. |
| `EV-13` | `art/src/stage-1/events/EV-13_sling-line.jpg` | New dedicated ratkin firing-line scene for `slingline`. |
| `EV-14` | `art/src/stage-1/events/EV-14_steading-line.jpg` | New dedicated ogre toll scene for `steading`. |
| `EV-15` | `art/src/stage-1/events/EV-15_milestone.jpg` | Replaces the Sitting Stone stand-in for `milestone`. |
| `EV-16` | `art/src/stage-1/events/EV-16_salt-wives.jpg` | Replaces the Muster Field stand-in for `saltwives`; bright good-event palette key. |
| `EV-18` | `art/src/stage-1/events/EV-18_hollow-tree.jpg` | Replaces the Last Ship stand-in for `hollow`. |
| `EV-21` | `art/src/stage-1/events/EV-21_what-the-peat-kept.jpg` | Replaces the Dead Company stand-in for `bogbody`. |

Exact runtime keys and the integration sequence are documented beside the art in
`art/src/stage-1/CLAUDE_ASSET_PLACEMENT.md`.

## 2. Locked visual language

### The look in one sentence

**Expressive painterly low fantasy with tired faces and lived-in equipment; believable materials,
clear silhouettes and a deliberate rhythm between grim roads, bright human moments and vivid Bloom.**

The current large paintings — especially `E11`, `E12`, `E13`, `E14`, `E15` and `E16` — are the
closest repository references. `P1` is the character rendering reference. Future work should retain
their material weight while pulling slightly away from photographic smoothness: visible brush
texture, simplified secondary detail, strong value grouping and readable silhouettes.

### Line before noise: locked craft rule (2026-08-01)

Human-made pictures are designed through lines, connected shapes and deliberate omissions. A common
AI failure is to manufacture apparent finish from thousands of unrelated dots, scratches, fur marks,
buckles and pebbles. That surface noise is not detail and it is not the RabbleBound style.

Abstraction is not a temporary defect. The asset gives the player a strong silhouette, an intention
and a few specific clues; the player's imagination supplies the rest. If a more complete rendering
leaves less room for an internal picture, it has become worse for this game even when it is prettier.

Use this hierarchy for every asset, from a 32 px icon to key art:

1. **Silhouette:** the subject must read as one black shape.
2. **Gesture line:** the spine, gaze, weapon and movement must agree on one intention.
3. **Large value and colour masses:** two to five connected areas establish the design.
4. **Identity detail:** face, hands, weapon and one story-bearing material receive selective focus.
5. **Texture last:** every mark must follow form, material, light or motion. Random speckle is removed.

Build quiet areas on purpose. Prefer one confident broken contour, brush stroke, hatch direction or
pixel cluster to many tiny marks. Preserve small human irregularities: unequal line weight, selective
edges, imperfect repetition and asymmetry that feels chosen rather than generated.

**Review at delivery size.** If a detail disappears in the live crop or battlefield scale, remove it
from the source rather than sharpening it. An asset that works only when enlarged fails review. For
battle tokens, species, weapon, posture and one emotion must survive at the final 32–48 px height.

### Side before ornament: locked battlefield rule (2026-08-01)

For ordinary humans, ratkin, ogres and other faction units, allegiance is a large clothing mass:
blue or teal for allies, rust or red for enemies. Put it on roughly 25 to 35 percent of the visible
body as a cloak, tabard, scarf, sash, coat panel or another major garment layer. Vary the carrier by
role so units do not look mass-produced. The side read must not depend on a small badge, trim,
outline, weapon tint or eye colour. Unique ununiformed beasts retain natural colour.

### Size roughly signals danger: locked battlefield rule (2026-08-01)

The live token scale is part of threat communication. Ordinary dogs read smallest, then ratkin,
then humans, then ogres and major armoured threats. Current approved display multipliers are dogs
75 percent, ratkin 85 percent, humans 105 percent, ogres 100 percent of their larger source body,
and Something in armour 114 percent. Break this order only when an encounter deliberately uses a
small silhouette to conceal danger.

**Future generation gate:** generate mixed battlefield units against one shared ground line and one
camera. Never enlarge each subject independently until it fills its atlas cell, because that erases
the threat hierarchy. Preserve generous empty space around smaller bodies. Keep the source masters
intact, apply the approved display multipliers during deterministic export, then review every race
together on a 1x contact sheet. Do not integrate the pack unless the visible order is strictly
`dogs < ratkin < humans < ogres < major armour`.

### Master style block

Append this block to every generative prompt in this document:

```text
Painted digital illustration for a dark pre-gunpowder low-fantasy tactical RPG. Grounded but
expressive medieval material design with confident connected linework, visible directional brush
strokes, matte surfaces and strong value grouping. Construct the image from silhouette, gesture and
large connected shapes before adding selective detail. Do not enforce strict photographic realism:
simplify secondary detail, exaggerate useful silhouettes and let colour and atmosphere carry emotion.
Base the image in an earth palette: mud
brown, bone grey, wet slate, dead-grass ochre
and bruised green, but permit one deliberately chosen, story-bearing area of bright colour when the
event calls for it. Cold directional light through overcast weather, heavy pale grey-blue atmospheric
haze, deep but readable shadows. Clothing is patched, armour mismatched and repaired, metal cold
grey-blue with old rust. People are weathered, asymmetrical and ordinary rather than beautiful or
heroic. Quiet melancholy with dry human absurdity. One clear focal subject and a readable
silhouette. Leave deliberate quiet areas. Texture must follow form, material, light or motion rather
than filling empty space. The world is dirty and used, never decorative fantasy.
```

Do not make consecutive event batches uniformly grey. Aim for a colour break at least every three
or four scenes: vivid Bloom, bright Stolen Daylight, ritual paint/ribbons, fire, coastal colour or a
communal celebration. “Grounded” describes behaviour and material history, not a ban on fun colour.

### Universal negative block

Append this after the master style block:

```text
No readable text, letters, numbers, logo, caption, border, card frame, interface, watermark or
signature. No guns, modern objects, high-fantasy castle, polished chrome armour, pristine costume,
glowing sword, floating runes, generic wizard robe, heroic pose, glamour portrait, anime, chibi,
comic outline, plastic 3D render, excessive gore, oversaturation, teal-and-orange movie grading or
indiscriminate magical glow. No pointillist AI noise, random speckles, all-over scratches, fur-by-fur
rendering, decorative micro-buckles, uniform detail density or sharpening used to rescue a weak
silhouette. Keep faces and hands anatomically coherent and keep equipment functional.
```

### The saturation and colour-contrast rule

Saturation must tell the story, but the game must not become uniformly grey. Something strongly
saturated is **magical, dangerous, firelit, ritual/celebratory, or Stolen Daylight**. Ordinary cloth
may use faded madder red, woad blue or dull mustard. A shrine, wedding, market or similar social
scene may use a small cluster of richer crimson, turquoise, saffron or lapis-coloured props if the
surrounding world remains grounded. Bloom scenes should be boldly contrastive and visibly juicier
than ordinary road scenes: hot magenta against near-black green and cold grey. Name every permitted
accent in the prompt. Do not let the model add unrelated blue spells, orange rim light or green fog.

### Four atmosphere keys

| Key | Use | Colour and light |
|---|---|---|
| **A — Fogbound Teal** | Marsh, ambush, aftermath, outnumbered fights | Wet slate and grey-teal ground, cold fog, very weak sun, almost no warm colour. |
| **B — Dust & Gold** | Road, trade, contracts, holdings, most human comedy | Muted dry ochre and old gold against cold grey; low lateral light, never sunny postcard warmth. |
| **C — The Bloom** | Corruption and its mutations only | Near-black greens and greys; restrained hot magenta is the only saturated colour and has no obvious source. |
| **D — Stolen Daylight** | Two or three emotionally exceptional frames per act | Clean pale daylight, cool sky and soft straw gold; precious because the rest of the act denies it. |

### People and species

- **Humans:** bad teeth, broken noses, thinning hair, squints, jowls, uneven faces. Beauty should feel
  suspicious rather than normal.
- **Ratkin / ratlings:** small, wiry rat-people with grey-pink or grey-brown patchy fur, a long narrow
  rodent muzzle, whiskers, visible incisors, small dark eyes, round rat ears, clever hands and a long
  tail. Their silhouette should feel scavenging, furtive and resourceful. They must never read as
  goblins: no green skin, flat humanoid face, pig nose, tusks or long pointed goblin ears. Never cute
  mascots and never an inherently evil species.
- **Ogres:** wide, top-heavy, small head, mottled grey-green skin, heavy joints, slow physical
  confidence. They are people, not fantasy brutes waiting to be killed.
- **The company — hard rule:** whenever the recurring mercenary company is visible as a group, make
  it species-diverse. Show a readable combination of humans, at least one ratkin/ratling and at least
  one ogre unless the story explicitly isolates a character. Give every species practical company
  roles and shared wear; do not stage the non-humans as pets, mascots or automatic enemies. Nobody
  poses. They look at the problem, the road, or each other; rarely at camera.
- **Travel — hard rule:** the company, wagon and pack animals use the established road, causeway,
  bridge or firm track. They do not walk into marsh water or abandon a passable road unless the event
  text explicitly requires wading. Make the intended direction of travel consistent in every body,
  animal, wheel and wagon shaft.
- **Magic:** physical and specific — a changed nail, a gland, a colour under skin, a light inside a
  body — rather than spell effects filling the frame.

## 3. Production formats and prompt assembly

### Source masters

| Family | Master | Delivery | Composition rule |
|---|---:|---:|---|
| Key/menu/background | 2560×1440, 16:9 | PNG or high-quality JPG | Keep the UI side calm and low-contrast; art contains no title or buttons. |
| Event/place scene | 640×360, 16:9 | JPG | Keep the subject and story-bearing prop inside the middle 45% of image height so the live 398×104 panoramic crop still reads. |
| Camp scene | 640×360, 16:9 | JPG | Fire near centre, cast arranged in a shallow arc, faces readable at card crop. |
| Road vignette | 640×360, 16:9 | JPG | One incident, one or two figures, simple background; it must read small. |
| Character portrait | 1024×1536, 2:3 | PNG/JPG | Chest-up three-quarter view, head in upper third, dark simple vignette; leave room for square and 4:5 crops. |
| Tactical turnaround | 2048×1152 sheet | PNG with transparency after cleanup | Six directional poses or three poses that can be mirrored, identical gear and proportions, feet aligned. |
| Item/icon sheet | 2048×2048 | PNG with transparency after cleanup | 4×4 or 5×5 grid, isolated objects, consistent upper-left light, no labels. |
| Mutation/body reference | 1536×1536 | PNG/JPG | Neutral three-quarter body plus close detail; no gore-poster composition. |

Current files use mixed dimensions, including 1448×1086 scene masters and small early images. Do
not upscale and repaint a small legacy image merely to satisfy the table. Regenerate only when its
row says to replace it.

### Format suffixes

Add one of these between the subject prompt and master style block.

**EVENT FORMAT**

```text
Wide 16:9 event illustration, no text or interface. Compose as one legible story moment, not a
montage. Keep every essential subject and prop in a broad central horizontal band so a very wide,
shallow card crop remains understandable. Foreground detail may frame the scene but must not hide it.
```

**MENU FORMAT**

```text
Wide 16:9 key art used behind a title menu. Keep the central and upper-left field calm, dark and
low-detail for separately typeset title and menu options. Place narrative figures low and off-centre.
Do not paint words or a logo into the image.
```

**PORTRAIT FORMAT**

```text
Vertical 2:3 chest-up character portrait, three-quarter view, plain dark atmospheric vignette,
single cold key light from upper left, no frame and no writing. Neutral posture, not an action pose.
Preserve a clear silhouette and enough shoulder information to identify armour and class.
```

**TURNAROUND FORMAT**

```text
Production turnaround sheet on a transparent or flat neutral background: six consistent full-body
tactical poses showing the same design facing the six directions of a pointy-top hex grid. Top-down
three-quarter camera, strong readable silhouette, feet on one baseline, no cast shadow beyond a
small contact shadow, no labels. Gear, scars and proportions must remain identical in every pose.
Design for the final battlefield height, not the source-sheet zoom: one strong outer contour, one
clear gesture line, two to five large value masses, connected marks and only the identity details
that remain visible at 32–48 pixels. No dithering or scattered micro-texture. Give allied faction
units one broad blue or teal garment layer and hostile faction units one broad rust or red garment
layer; vary which garment carries it, but keep it readable without tiny trim or badges.
For a mixed-race sheet, use one shared ground line and camera and preserve the apparent body-size
order `dogs < ratkin < humans < ogres < major armour`. Do not scale every subject to fill its cell.
```

**ICON FORMAT**

```text
Production icon sheet on a transparent or flat neutral background. Isolated objects in an orderly
grid with generous separation, identical scale logic and upper-left light, clear silhouette at
32–64 pixels, no labels, numbers, frames or decorative background. Use large connected shapes,
purposeful line weight and quiet negative space; remove any detail that vanishes at delivery size.
```

### Prompt assembly

For each row below, use:

```text
[SUBJECT PROMPT]
[FORMAT SUFFIX]
[MASTER STYLE BLOCK]
[UNIVERSAL NEGATIVE BLOCK]
```

For Bloom assets, add: **“Hot magenta is the dominant saturated colour, rendered boldly against
near-black green and cold grey.”** For a normal scene, either add **“Keep all colour muted”** or
name one small story-bearing bright accent. Never ask for blanket oversaturation.

## 4. Existing source paintings

### Named and generic portraits

| ID | Source | Status | Production note |
|---|---|---|---|
| `P1` | `art/src/P1_The_Captain.png` | **EXISTING — KEEP** | Canon face and rendering reference for the Captain. |
| `P2` | `art/src/P2_Vesna_Kolb.png` | **EXISTING — KEEP** | Canon Vesna. |
| `P3` | `art/src/P3_Skree.png` | **EXISTING — KEEP** | Canon Skree. |
| `P4` | `art/src/P4_Bruht.png` | **EXISTING — KEEP** | Canon Bruht. |
| `P5` | `art/src/P5_Marrow.png` | **EXISTING — KEEP** | Canon Marrow. |
| `P6` | `art/src/P6_Generic_Human_Recruits.png` | **STAND-IN — REPLACE** | Useful three-face human reference sheet, but labels and multiple faces make it unsuitable as one recruit portrait. Split by regeneration, not by cropping the labels. |
| `P7` | `art/src/P7_Generic_Ratkin_Recruits.png` | **STAND-IN — REPLACE** | Same issue for ratkin. |
| `P8` | `art/src/P8_Generic_Ogre_Recruits.png` | **STAND-IN — REPLACE** | Same issue for ogres. |

### Event and place paintings

| ID | Source | Status | Live use |
|---|---|---|---|
| `E1` | `art/src/E1_The_Hanged_Toll_Man.png` | **EXISTING — LEGACY** | Superseded by `E13`. |
| `E2` | `art/src/E2_The_Fen_Mother.png` | **EXISTING — KEEP** | The Fen-Mother. Small source, but the design is canon. Regenerate at production resolution only when the boss pass begins. |
| `E3` | `art/src/E3_The_Dead_Company.png` | **EXISTING — KEEP** | The Dead Company. Also misused as a bog-body and sinkhole stand-in. |
| `E4` | `art/src/E4_The_Muster_Field.png` | **EXISTING — KEEP** | Muster Field. Also misused for Bonepicker’s Camp and the Salt-Wives. |
| `E5` | `art/src/E5_The_Ratkin_Snare.png` | **EXISTING — KEEP** | Ratkin Snare. Also reused for Wynn and, incorrectly, Coldharrow. |
| `E6` | `art/src/E6_Under_the_Bloom.png` | **EXISTING — LEGACY** | Superseded by `E16`. |
| `E7` | `art/src/E7_The_Last_Ship.png` | **EXISTING — KEEP** | The Last Ship. Also misused for the Hollow Tree. |
| `E8` | `art/src/E8_The_Clan_Cart.png` | **EXISTING — KEEP** | Clan Cart. Also misused for pedlar, wain and wedding. |
| `E9` | `art/src/E9_The_Sitting_Stone.png` | **EXISTING — KEEP** | Sitting Stone. Also misused for milestone and aqueduct. |
| `E10` | `art/src/E10_The_Collector.png` | **EXISTING — LEGACY** | Superseded by `E15`. |
| `E11` | `art/src/E11_The_Sign_of_the_Three_Bells.png` | **EXISTING — KEEP** | Tavern prologue; large current reference. |
| `E12` | `art/src/E12_Blood_on_the_Road.png` | **EXISTING — KEEP** | First road battle; large current reference. |
| `E13` | `art/src/E13_The_Hanged_Toll_Man.png` | **EXISTING — KEEP** | Current Toll-Man. |
| `E14` | `art/src/E14_The_Drowned_Chapel.png` | **EXISTING — KEEP** | Current Drowned Chapel. |
| `E15` | `art/src/E15_The_Collector.png` | **EXISTING — KEEP** | Current Collector. |
| `E16` | `art/src/E16_Under_the_Bloom.png` | **EXISTING — KEEP** | Current Bloom environment reference. |

### Creature and faction reference sheets

| ID | Source | Status | Production note |
|---|---|---|---|
| `C1` | `art/src/C1_Ratkin_Rank_and_File.png` | **EXISTING — KEEP** | Canon design sheet for spear, cleaver and slinger; not a transparent token. |
| `C2` | `art/src/C2_Ratkin_Chieftain.png` | **EXISTING — KEEP** | Canon chieftain concept; not a token. |
| `C3` | `art/src/C3_Ratkin_Warp_Sniffer.png` | **EXISTING — KEEP** | Canon warp-sniffer concept. |
| `C4` | `art/src/C4_The_Broken_Men.png` | **EXISTING — KEEP** | Canon faction sheet; currently a stand-in for the event scene. |
| `C5` | `art/src/C5_The_Cub.png` | **EXISTING — KEEP** | Canon cub concept; not a token. |

## 5. Key art and major screen paintings

These pictures establish screens rather than individual narrative events. Interface text, buttons,
icons and the `RABBLEBOUND` wordmark must be laid out separately and must never be generated inside the
painting.

### `KEY-01` Bloom main menu — **GENERATED — STAGE 1**

**Subject prompt:**

```text
The species-diverse mercenary company stands very small and low on a firm forest road at the
threshold of the Bloom. Black crooked trees, ruined stone and swollen hot-magenta Bloom pods frame
the left and right edges. Reserve the entire central vertical field as a calm, dark, low-detail
corridor of black-violet haze behind the separately typeset title, subtitle and vertical menu
buttons. Keep the company low and slightly left; include humans, one allied ogre and one wiry
rat-person. Vivid juicy hot magenta against near-black green, charcoal and deep violet. No text,
logo, panel or interface in the art.
```

Use **MENU FORMAT**. Selected file:
`art/src/stage-1/key/KEY-01_main-menu-bloom.png`.

### `KEY-01A` Opening road alternate — **GENERATED — STAGE 1**

```text
A long muddy road leaving a dark timber town and crossing dead marsh toward a crooked ridge under
a huge overcast sky. A battered wagon and four small mercenaries move away from the viewer along the
firm road in single file, low in frame: two weathered humans, one large allied ogre carrying heavy
company gear and one small wiry ratkin with a clearly rodent muzzle, round ears and tail. They move
consistently left-to-right and look insignificant against the country. Far ahead, almost lost in
haze, a single gibbet and one leaning bell frame hint at the road to come. No Bloom or overt magic.
Atmosphere key B, Dust & Gold, but cold and restrained. Leave calm dark sky and fog for the title.
```

Use **MENU FORMAT**. Preserve as a prologue/loading/Act One travel alternate:
`art/src/stage-1/key/KEY-01_ALT_opening-road.png`.

### `KEY-02` World mood key — **GENERATED — STAGE 1**

**Subject prompt:**

```text
A species-diverse group of ragged mercenaries and their one-mule wagon travel left-to-right along a
broad raised stone-and-mud causeway through an immense dead marsh. Every boot, hoof and wheel stays
on the clearly visible firm road above the water. Include weathered humans, one large allied ogre and
one small wiry ratkin with a long rodent muzzle, whiskers, round ears and tail. A ruined watchtower
leans on the far horizon, crows cross the pale sky, and drowned fences stand outside the road. The
people are tiny and tired, not heroic. This is the neutral colour and light reference for the entire
game: Fogbound Teal, no saturated colour, cold low cloud, distance dissolving into pale grey-blue.
```

Use **EVENT FORMAT**, but archive the full frame as the master grading reference. Selected file:
`art/src/stage-1/key/KEY-02_world-mood-key.png`.

### `UI-01` Act One road map plate — **MISSING — CREATE**

**Subject prompt:**

```text
An illustrated oblique map of one island road network, designed as a quiet background beneath
separate interactive nodes: Grausen Hold at the west edge, three routes through ridge, marsh and
Bloom-dark woodland, a ruined steading where the routes meet, the Black Fen, Coldharrow village,
the Hunch ridge and a final road curling back to a bell-strung snare. Geography must be legible as
landscape rather than parchment symbols: muddy roads, causeways, pale high ground, coast and fog.
No labels, node icons, dotted paths, compass letters or decorative cartouche. Atmosphere B with a
small C-coloured stain only in the Bloom region.
```

Use **MENU FORMAT**, with usable negative space across the route layer.

### `UI-02` Company / inventory backdrop — **MISSING — CREATE**

**Subject prompt:**

```text
The inside of a patched wagon awning at a cold roadside stop: hanging mail, spear shafts, a bow,
folded rags, an open but mostly empty equipment chest and a narrow bench. No people. Dark, shallow
space with a calm central field for a paper-doll character and quieter side areas for roster and
stash panels. A little grey daylight leaks through canvas; nothing glows.
```

Use **MENU FORMAT**.

### `UI-03` Post-battle consequences backdrop — **MISSING — CREATE**

**Subject prompt:**

```text
The edge of a small battlefield after the violence has stopped: trampled wet grass, a dropped
spear, one torn shield, boot prints, rain beginning, survivors as indistinct silhouettes carrying
someone toward a wagon in the distance. No visible corpse in close-up and no triumphant pose. The
central foreground is dark and simple for the consequences card. Fogbound Teal.
```

Use **MENU FORMAT**.

### `UI-04` Practice field backdrop — **MISSING — CREATE**

**Subject prompt:**

```text
A rough mercenary practice ground outside Grausen Hold: muddy hex-like training lanes implied by
stakes and rope, battered straw targets, blunted spears, a shield post, a low timber viewing rail and
one smoky brazier. Empty of fighters, practical rather than festive. Overcast morning, atmosphere B,
calm areas for fight and company selectors.
```

Use **MENU FORMAT**.

### `UI-05` Rules / field manual backdrop — **MISSING — CREATE**

**Subject prompt:**

```text
A close view of an open, grease-marked mercenary field manual on a scarred wooden table, with crude
ink diagrams of a hex, a body silhouette, a spear and a broken line — shapes only, no legible words
or numbers. A charcoal nub, wax tablet and bent pin hold the pages. Neutral dim daylight, restrained
Dust & Gold, broad blank page areas reserved for real typeset rules.
```

Use **MENU FORMAT**. UI typography is added separately.

### `UI-06` The Wagon — **MISSING — CREATE**

**Subject prompt:**

```text
A battered two-wheel company wagon at the last safe roadside camp, one mule still harnessed, a
folding travel-forge bolted to the bed and a cold iron firebox below it. Show visible places where a
bed, medicine chest, cook-fire or curtained reliquary could be bolted in, but do not show every
upgrade at once. The cart has clearly outlived several companies. Three-quarter exterior view,
quiet dusk, enough empty dark around it for crafting controls. Dust & Gold.
```

Use **MENU FORMAT**.

### `UI-07` Travel-forge close view — **MISSING — CREATE**

**Subject prompt:**

```text
A compact folding smithy mounted to a wagon: small anvil, hand bellows, charcoal tray, tongs,
cracked water bucket and several unfinished practical weapons. The forge has just caught on the
second try; one restrained orange fire is the only saturated element. No smith and no fantasy
machinery. Central still-life composition with dark margins for recipe choices.
```

Use **EVENT FORMAT**.

### `UI-08` Defeat — **MISSING — CREATE**

**Subject prompt:**

```text
An abandoned company wagon on a wet road at blue-grey dawn, mule still tied, forge cold, one faded
banner fallen into mud and nobody returning from the fog ahead. No bodies, no enemy and no action.
The emptiness must make the loss clear. Fogbound Teal, no saturated colour, broad simple sky for the
defeat heading.
```

Use **MENU FORMAT**.

### `UI-09` Victory / end-of-slice walk home — **MISSING — CREATE**

**Subject prompt:**

```text
The surviving company walking west at pale morning with their wagon, smaller in number and visibly
bandaged, seen from behind. Their faded banner is still upright. Far behind, bells hang silent over
the road; far ahead, a strip of honest daylight touches the track home. Melancholy rather than
triumphant. Atmosphere D, Stolen Daylight, one of the act's rare clean-lit frames.
```

Use **MENU FORMAT**.

### `UI-10` Inheritance screen — **FUTURE — CREATE LATER**

**Subject prompt:**

```text
On the bed of the old company wagon, five survivors from a ruined settlement have laid out the few
things that escaped: a smith's tool roll, an ogre-armour mould, a scorched book of debts, one wrapped
gem and a folded piece of the old banner. Everything else behind them is smoke and rain. The picture
asks what one thing crosses into the next story; it does not celebrate treasure. Quiet central
still-life with human hands at the edges, Dust & Gold with fire kept distant.
```

Use **EVENT FORMAT**.

### `UI-11` Codex / bestiary backdrop — **FUTURE — CREATE LATER**

**Subject prompt:**

```text
An open field ledger filled with nonverbal sketches: a ratkin spear profile, an ogre footprint, a
two-hex lindwurm body plan, a tooth, a bell and a dark stain where an entry about armour refuses to
identify its subject. No readable text. The pages are repaired and carried, not an illuminated
manuscript. Blank columns remain for real typeset entries.
```

Use **MENU FORMAT**.

## 6. Prologue, road, place and battle-event paintings

Every subject prompt in this section uses **EVENT FORMAT**. An existing image still has a prompt so
it can be regenerated consistently at a larger production master or revised without inventing the
scene again.

### `EV-00` The Sign of the Three Bells — **EXISTING — KEEP** (`E11`)

```text
Inside a poor, crowded timber tavern, a well-fed human contract-giver in a very good dark coat leans
across a scarred table and drops one coin in front of four tired human mercenaries. Two guards wait
behind him; more are visible as shapes through the doorway. The Captain sits nearest camera,
unimpressed; Vesna is already half-standing; Marrow and Ilka watch the arithmetic. No ratkin, ogres
or magic. Candle flame may be warm, but the room remains brown-black and ordinary. The coin and the
man's clean coat are the sharpest details. Dust & Gold.
```

### The four prologue OUTCOME scenes - all **MISSING - CREATE**

*(Added 2026-08-01 with the lore pass. The user's plan: "Later on I will create immages for
different of scenarios." The game already carries the hook: every prologue outcome names a scene,
`floor` · `coin` · `joke_hit` · `joke_miss`, and the empty `PRO_ART{}` registry in the prototype
maps scene key to art key. Generate any of these, give it a key, add one line to `PRO_ART{}`, and
the outcome card swaps its picture. The joke outcomes already carry a green or red verdict line in
the UI, so the painting does not have to carry the verdict alone. Same room, same people and same
Dust & Gold as `EV-00`: these are its four possible next seconds. Use EVENT FORMAT.)*

#### `EV-00A` The outcome: he goes over a bench (`floor`)

```text
The same poor timber tavern one heartbeat after a punch: the contract-giver in the very good coat
tips backwards over a bench with his boots in the air, coin still on the table, the Captain's fist
still at the end of its arc. Forty drinkers catch their breath at once; two guards are already
moving in from the doorway, unhurried, professional, certain. Vesna is grinning. No blood yet, and
everyone in the room knows it is coming. Warm candle points in a brown-black room. Dust & Gold.
```

#### `EV-00B` The outcome: the coin is picked up (`coin`)

```text
The same tavern, quiet. The Captain's weathered hand closes on the single coin on the scarred
table while the contract-giver counts sixty crowns out of a real stamped purse, satisfied,
already talking past him. The crew behind the Captain look anywhere else: Vesna at the wall,
Marrow at his cup, Ilka at the guards. The coin and the counting hands are the sharpest details;
the humiliation is in the postures, never stated. Brown-black room, low candle warmth. Dust & Gold.
```

#### `EV-00C` The outcome: the joke lands (`joke_hit`)

```text
The same tavern mid-laugh: the contract-giver in the very good coat laughs genuinely and
unpleasantly, head back, one hand on the open door, ninety crowns spilled generously across the
scarred table. The room is delighted; the sergeant behind him is confused by his own master. The
Captain stands deadpan, palms open, mid-shrug of a man who just gambled in a room full of guards
and won. Candle warmth allowed to reach the faces for once. Dust & Gold.
```

#### `EV-00D` The outcome: the joke does not land (`joke_miss`)

```text
The same tavern, no laughter. The contract-giver is already turning away in his very good coat,
face showing nothing at all, while his sergeant drives a cudgel into the Captain's ribs with the
unhurried competence of a man paid by the week. The crew half-risen, too late; the room enjoying
it anyway; forty crowns still counted out on the table because the job stands. The violence is
procedural, not dramatic. Brown-black room, candle warmth pulled back. Dust & Gold.
```

### `EV-01` Blood on the Road — **EXISTING — KEEP** (`E12`)

```text
On a broad muddy road over open high country, a ratkin foraging party and an ogre steading-line face
each other over a dead deer while four human mercenaries arrive from the foreground. Three ratkin
with spears and one slinger move fast around a crude clan cart; two huge ogres stand with clubs and
the settled patience of things that do not expect to lose. Make both sides readable as people, not
good and evil armies. The instant before the humans choose a side. Cold Dust & Gold, no magic.
```

### `EV-02` The Hanged Toll-Man — **EXISTING — KEEP** (`E13`)

```text
A muddy bridge-head and heavy timber toll frame under a flat grey sky. One hanged toll-man turns
slowly from good rope; his unusually fine, barely worn boots are the most detailed object. The
company and wagon have stopped at a cautious distance. A small bell, crows, wet road and an old
ruin on the horizon. Melancholy, not gruesome. Dust & Gold with almost all warmth gone.
```

### `EV-03` Pedlar on the Ridge — **GENERATED — STAGE 1**

```text
A one-mule pedlar alone on an exposed stony ridge, a folding table between him and the approaching
mercenary company. Salt sacks, arrowheads, two shields, small charms and a carefully packed cart are
laid out with excessive neatness. He smiles too warmly after counting the company and his own odds;
several mercenaries have separately noticed that he is alone. Wide empty country makes the moral
arithmetic visible. Dust & Gold, hard low wind, no magic.
```

### `EV-04` The Drowned Chapel — **EXISTING — KEEP** (`E14`)

```text
A small ruined stone chapel standing in brown fen-water, roof partly collapsed and drowned pews
visible through the open doorway. The company wades toward it with rope and spear shafts; beneath
the altar one dry dark gap suggests a flooded crypt. Cold marsh stretches behind it. Fogbound Teal,
with weak candle stubs as tiny unsaturated points, no supernatural glow.
```

### `EV-05` Bonepicker’s Camp — **GENERATED — STAGE 1**

```text
Six patched tents around a cook-fire at a roadside camp run by a friendly man who buys teeth. Racks
hold stitched hides, including one enormous ogre-sized harness that has hung there for years; small
label-free jars and bowls of sorted teeth make his trade clear. He welcomes the company in the
relaxed way of somebody who has decided they are not worth robbing. Dry deadpan humour, Dust & Gold,
one modest fire as the only warm colour.
```

### `EV-06` The Sunken Wain — **GENERATED — STAGE 1**

```text
An abandoned merchant wagon sunk to its axles in dark fen mud, one wheel twisted, ox traces empty.
At the centre of the wagon bed sits a small iron strongbox that is obviously much heavier than it
looks. One ogre or the strongest mercenary tests a rope while everyone else prepares to pretend
they helped. The missing merchant is implied by a wet cloak snagged on reeds, never shown. Fogbound
Teal with two wrong-coloured stones barely visible through the box's cracked lid.
```

### `EV-07` Under the Bloom — **GENERATED — STAGE 1 / REFRESHES `E16`**

```text
The company enters a forest where the air itself is the wrong colour. Crooked bare trees, black moss
and ruined stone recede through magenta haze with no visible light source; Bloom pods and seams in
the bark carry restrained hot magenta while every ordinary green is near-black. Figures are small,
guarded and looking upward. Nothing casts a conventional glow: the atmosphere is corrupted. The
Bloom, hot magenta the only saturated colour.
```

### `EV-08` The Fen-Mother — **GENERATED — STAGE 1 / REFRESHES `E2`**

```text
A vast six-legged lindwurm the size of a hay-wain lies dead-still in bloom-lit fen, initially
mistakable for a collapsed barn. Its head is shaped like a split anvil and slow magenta bands move
beneath dark hide. Behind it, a dog-sized cub with an outsized head tries earnestly to eat a rock.
The beast watches the cub, not the distant company. Quiet, maternal and frightening rather than an
attack pose. The Bloom; hot magenta is the only saturated colour.
```

### `EV-09` The Dead Company — **EXISTING — KEEP** (`E3`)

```text
Nine dead mercenaries lie in a roadside ditch four or five days after an ambush, viewed from the
road above. They still wear good harness and hold blades; food and boots are gone. Their formation
shows they were struck from one direction while facing another. The living company stands at the
ditch edge, comparing that good armour with its own rags. No gore in focus. Fogbound Teal, heavy
mist; the wrongness is that their gear is better than yours.
```

### `EV-10` Something in Armour — **GENERATED — STAGE 1**

```text
Late afternoon on a broken road: a towering figure has followed the company for miles at an
unchanging walk. Plate covers it from throat to boot, visor shut, no skin visible. In one hand it
carries a sword that would be two-handed for anyone else, point dragging a continuous line through
the mud. The company glances back from low stone and broken ground while the figure never turns its
head. Give it no supernatural glow and no readable emblem. Fogbound Teal; dread from patience and
scale alone.
```

### `EV-11` They Come Over the Wall — **GENERATED — STAGE 1**

```text
Night inside a ruined steading's broken palisade. The company's small fire burns at centre while
starved long-legged pack-beasts pour through two gaps in the timber wall, one already crossing the
north gap without slowing. Outside the wall, the larger Bitch stands still like a captain while the
others move. Mercenaries rise from bedrolls and form around the two openings. Cold moonless
Fogbound Teal, with the central fire the only warm saturated colour; tense, readable defensive
geometry rather than chaotic monster horror.
```

### `EV-12` The Door-Shrine — **GENERATED — STAGE 1**

```text
An ordinary closed weathered wooden door stands upright alone in the middle of a wet field, with no
wall, frame or building. Preserve a simple centred composition: company framing the near foreground,
offerings before the door and a tired woman seated to the right. Its layered cobalt and turquoise
paint peels back to old brown wood; short weather-beaten crimson, saffron, lapis and faded-white
ritual ribbons hang from real nails and the iron latch. The carefully swept ground holds bread, one
shoe, exactly four teeth and an ancient featureless coin. The woman wears a faded madder shawl and
asks for nothing while the species-diverse company stops on the firm road at the field's edge. Use
bright Stolen Daylight after rain: pale clean sky, soft straw sun, luminous wet grass and cool clear
shadows. The colour comes from daylight, paint and cloth, never glow; no portal is visible.
```

### `EV-13` The Sling-Line — **GENERATED — STAGE 1**

```text
An exposed stony ridge seen from the company at the bottom: ratkin slingers hold high ground behind
two long-spear screens while a small warp-sniffer further back raises a staff tipped with one point
of restrained magenta. A fresh sling stone chips the wagon-board in the foreground. The ratkin line
is disciplined improvised warfare, not a swarm, and the open ground between forces is the subject.
Dust & Gold; the staff tip is the only saturated colour.
```

### `EV-14` The Steading-Line — **GENERATED — STAGE 1**

```text
Four ogres have settled across a mountain road for the day: a small fire, a pot and ground packed
flat around them. The old steading-elder sits in the middle and does not rise as the company
approaches; the others rest with club, long pike, maul and throwing stone within reach. Their road
toll feels patient and almost reasonable. Open hard country, large negative sky, Dust & Gold. Show
them as a household defending a place, not raiders posing for battle.
```

### `EV-15` The Milestone — **GENERATED — STAGE 1**

```text
A squat ratkin milestone at a lonely fork, carved with an old distance and clan mark, while fresh
chisel cuts have altered the route symbol and number into a lie. One mercenary kneels to compare the
new cut with weathered stone as the rest study four empty roads. Chips and the abandoned chisel make
the sabotage recent. Dust & Gold, dry wind, one simple subject; no legible writing is required, only
clearly old marks altered by new ones.
```

### `EV-16` The Salt-Wives — **GENERATED — STAGE 1**

```text
Four human women boil brine in black iron pans on a grey shingle shore with no village behind them.
Salt crusts the pans and baskets; a low lean-to and stacked firewood show they have worked here
longer than the current war. They measure the approaching company while appearing only to discuss
the salt. Stolen Daylight used lightly: pale clean sky and soft straw light, practical dignity, no
sentimentality.
```

### `EV-17` The Clan Cart — **EXISTING — KEEP** (`E8`)

```text
A ratkin trade-cart sits with one broken wheel while four ratkin wait on it with complete exhausted
resignation. The cart is absurdly overloaded with hundreds of cheaply made crossbows stacked,
bundled and hanging from every rail; one has already come apart in somebody's hands. Focus on the
scale of shoddy manufacture and the traders' dignity, not slapstick. Dust & Gold, no magic.
```

### `EV-18` The Hollow Tree — **GENERATED — STAGE 1**

```text
A vast dead hollow tree beside the road, split open enough to reveal that someone once lived inside.
A moulded bedroll, one very good knife and a neat run of forty-one tally cuts on the inner wall end
abruptly after a gap. The company looks in from outside without entering. Fogbound Teal with weak
grey daylight; the stopped tally is the story-bearing detail, but no readable number is painted.
```

### `EV-19` The Sitting Stone — **EXISTING — KEEP** (`E9`)

```text
An enormous ogre sits on a modest roadside rock as if he has been there for two winters. Moss and
flattened grass support the claim. He is peaceful, weathered and slightly puzzled, holding a piece
of bread while the company speaks with him from a respectful distance. A war marker behind him has
rotted through several old banners. Dry deadpan melancholy, Dust & Gold; never a comic giant.
```

### `EV-20` The Collector — **EXISTING — KEEP** (`E15`)

```text
A solitary human toll collector in an unexpectedly good coat has set a small desk across a ruined
road. He opens a meticulous ledger and presents a stamped writ with total seriousness; behind him,
the kingdom's gatehouse has been roofless for decades and its banner is almost gone. No escort. The
company and wagon wait in disbelief. Dust & Gold; the ledger, seal and coat carry the joke, with no
readable writing.
```

### `EV-21` What the Peat Kept — **GENERATED — STAGE 1**

```text
A peat cutting has opened the perfectly preserved dark-brown face of an ancient ratkin body. A
ratkin blade remains between its ribs, establishing an old clan-war grave; other faint shapes and
metal glints continue into the peat wall. Two mercenaries kneel at the cut while a ratkin companion
recognises what it means. Archaeological, solemn and materially specific, not a horror corpse.
Fogbound Teal, no saturated colour.
```

### `EV-22` A Wedding on the Road — **STAND-IN — REPLACE**

```text
A ratkin clan wedding has completely occupied a muddy road: patched awnings, shared pots, drums,
cheap ribbons, crowded family groups and a cart used as a table. Drunk ratkin welcome the baffled
mercenary company with enormous warmth while the wagon has nowhere to pass. The clan remains
verminous, poor and recognisably familial, never cute or carnival-bright. Dust & Gold with faded
madder and mustard cloth only.
```

### `EV-23` The Ratkin Waterworks — **STAND-IN — REPLACE**

```text
A beautiful stone aqueduct crosses forty feet above a road and is catastrophically assembled:
misaligned courses, shims, rope repairs and a leak that has run for a century yet will probably
stand for another. Water falls beside a rude scratched clan mark at the base while the company
examines the lead joints. The engineering is impressive and shoddy at once. Dust & Gold, crisp pale
sky, no readable inscription.
```

### `EV-24` The Last Ship — **EXISTING — KEEP** (`E7`)

```text
A sixty-year-old human sailing vessel rests far up a grey shingle beach, impossibly distant from
water, weathered almost to bone. Somebody has built a small firepit and crude sleeping place inside
the broken hull; an old grave lies nearby. The company stands tiny below the prow, recognising one
of the ships that brought humans here. Atmosphere D, Stolen Daylight: real pale sky and clean light,
used here because this is memory rather than danger.
```

### `EV-25` The Ground Opens — **STAND-IN — REPLACE**

```text
A silent peat sinkhole has opened beneath one mercenary, revealing a deep black slot and the mouth
of a horizontal stone passage far below. A rope is already being thrown down while the trapped
person, alive and furious, braces on a ledge. The wagon and company recoil from an edge that looked
solid a moment ago. Fogbound Teal, strong readable depth, no monsters and no glowing cavern.
```

### `EV-26` The Broken Men — **STAND-IN — REPLACE EVENT SCENE** (`C4` remains the design sheet)

```text
Five human deserters step from a wet treeline to block the company road. Each wears half a uniform,
a season of hunger and scavenged kit; their captain still stands like one and speaks calmly with
weapon lowered. Across from them, the mercenary company sees its possible next winter. Nobody looks
monstrous or eager. Fogbound Teal, eye-level human distance, the cart and provisions visible between
the two groups as the actual stakes.
```

### `EV-27` The Ratkin Snare — **EXISTING — KEEP** (`E5`)

```text
A dead-marsh road at dusk is strung with small bells on cords. At the far end stands a boar-hauling
cage with a human woman folded inside; ratkin shapes wait in reeds, a large chieftain under a crude
standard and a smaller unarmed warp-sniffer humming behind the line. The company has just noticed
all three facts. Fogbound Teal, tense and outnumbered; one tiny magenta staff light is the only
saturated colour.
```

### `EV-28` The Woman in the Cage — **STAND-IN — REPLACE**

```text
After the fight, Vesna cuts the withies of a boar cage while Wynn Aldreth unfolds herself from
inside, silent and bruised but alert. Wynn counts the surviving company before deciding who to
address; the Captain's faded banner and the wrecked bell-cords remain behind them. Keep dead enemies
out of focus and make this a meeting, not a rescue pose. Cold dawn Fogbound Teal, Wynn's calculating
expression the focal point.
```

### `PLACE-01` Coldharrow — **STAND-IN — REPLACE**

```text
Forty cramped houses behind a wall that would not stop a determined cow, a church with lead stripped
from its roof, muddy market, bone-setter's sign, armourer's rack and wheelwright yard all visible in
one coherent village entrance. The human company enters while ratkin or ogre companions are asked,
politely, to wait by the gate. Civil, safe by local standards and visibly expensive. Dust & Gold,
smoke held low, no welcoming fantasy glow.
```

### `PLACE-02` The Muster Field — **EXISTING — KEEP** (`E4`)

```text
A low stone wall at a crossroads beneath a wide pale sky. Three strangers of different races sit on
it waiting to be hired: one human with patched kit, one nervous ratkin and one huge ogre taking most
of the wall. A faded empty banner-pole marks the place. Hopeful but unsentimental, Dust & Gold; one
of the act's few frames where the open road feels like opportunity.
```

### `PLACE-03` The Last Muster — **MISSING — CREATE**

```text
Three worn recruits wait at a crossroads one day short of the bells. Evening is closing, the road
behind them points back toward safety and every one of them knows what is ringing ahead. Their kit
is slightly better and their expressions less hopeful than at the first Muster Field; a line of
refugees passes in the opposite direction. Dust & Gold fading toward Fogbound Teal.
```

### `PLACE-04` Somebody at the Fire — dismissed veteran returns — **MISSING — CREATE**

```text
A former company member stands at the edge of a roadside firelight with a bundle and a week of road
on them. The current company sits around the fire and every face recognises them; one empty place on
the log is clearly still theirs. Keep the returning figure generic enough that the live character
portrait can be overlaid separately. Fogbound Teal with one small warm fire, quiet and undecided.
```

## 7. Camp-incident paintings

All 17 live camp incidents are **MISSING — CREATE**. Use **CAMP FORMAT**. Because the incident text
casts current party members dynamically, the paintings should emphasise hands, posture, objects and
fire arrangement rather than lock in named faces. Specific racial requirements are stated where the
event has them.

### `CAMP-01` The Argument

```text
Two mercenaries sit on opposite sides of a low campfire refusing to look at each other while the
rest of the company has visibly taken sides, including people who were not present. One shared
cook-pot sits untouched between them and a watch cloak has been pulled in two directions. The
argument is cold and exhausted rather than theatrical. One small fire is the only warm colour.
```

### `CAMP-02` Something in the Pork

```text
An opened salt-pork barrel at the fire, meat visibly green at the edges but not grotesque. One
mercenary has already eaten a strip and defends the decision with stubborn posture while everyone
else studies the barrel as a command problem. If an ogre shape is present at the edge, it watches
with practical interest. Object-led deadpan composition, no slapstick.
```

### `CAMP-03` The Fiddler

```text
A shoeless human fiddler has attached himself to the company fire and plays on a battered instrument
without having asked permission or payment. Mercenaries listen despite themselves; nobody reaches
for a weapon, but nobody relaxes either. His empty feet, the untouched food bowl and a coil of
rosined string on the log are the story details. Warm fire against cold night.
```

### `CAMP-04` The Found Thing

```text
At the edge of firelight, one pair of mercenary hands unwraps a shirt around a knuckle-bone with a
small scratched crown. The bone is too heavy for its size; everyone else's hands stay away from it.
Keep faces in shadow and make the object ordinary, dry and deeply wrong without any glow. The fire
does not seem to warm it.
```

### `CAMP-05` The Debt

```text
Two company members face each other across a barrel head with no agreed sum between them. A few
crowns, a dented cup and one clenched hand occupy the centre while the whole company stops pretending
to mend gear in the background. The Captain's decision will be public. No fight yet, only held
breath and nine seconds waiting to happen.
```

### `CAMP-06` What They Did Before

```text
One mercenary has recognised another across the fire and now sits far away, intensely mending a
piece of gear that is plainly not broken. The recognised figure does not yet know why. Use distance,
eyelines and the stretched fire circle to tell the story without fixing either character's identity.
Quiet cold night, no supernatural element.
```

### `CAMP-07` The Wrong Fire

```text
The company has unknowingly reused a camp abandoned four days earlier: half a meal remains in a
black pot, one boot lies beside a kicked-out bedroll, packs are gone and there is no blood anywhere.
The current fire has just been lit over old ash while mercenaries notice the objects one by one.
Fogbound night, negative space beyond the fire, no visible threat.
```

### `CAMP-08` The Good Night

```text
For once nothing is wrong: the fire holds, rain has stopped, one mercenary shares a stolen cheese
and another tells an obviously false story while the company laughs quietly. Wet cloaks steam on a
line and weapons remain within reach, but nobody is watching the dark. A rare gentle frame; modest
fire warmth, never tavern cheer or sentimental heroism.
```

### `CAMP-09` The Second Debt

```text
The same debtor is now approached by two different supposed creditors at the fire, with separate
scraps of tally, open hands and patient public posture. Another company member leans close to the
Captain and quietly indicates that the first debt was real but this is now a business. Show the
manufactured system through repeated hands and coins, not text.
```

### `CAMP-10` What Debts Do Not Exist

```text
A good personal knife now hangs openly from the wrong mercenary's belt. Its owner points to it across
the fire while the wearer waits pleasantly for the Captain to apply yesterday's ruling that debts
do not exist. The knife is the sharp focal object; everyone understands the trap. No violence,
quiet social pressure.
```

### `CAMP-11` The Nine Seconds

```text
After a previous camp fight, two bedrolls now lie on opposite sides of the fire. Their owners sit on
watch in held silence while the company watches the distance between the rolls rather than the
people. One set of split knuckles is wrapped. The frame should feel like a breath still being held,
not a second brawl.
```

### `CAMP-12` The Thing That Was Kept

```text
The rat-king's knuckle-bone has moved by itself from the bottom of the wagon to the top of the sacks,
exactly where the next hand would touch it. A mercenary holds the loosened sacking open while every
other person remains outside arm's reach. No glow, no motion effect, only an object in a place it
cannot reasonably be.
```

### `CAMP-13` The Tune Comes Back

```text
Three different mercenaries around the fire have begun humming the same fiddler's tune without
noticing one another. A fourth listens with dawning alarm beside the coiled rosined string. Suggest
the shared rhythm through repeated posture and breath in cold air; do not add musical notes, words
or magical light.
```

### `CAMP-14` The Aunt

```text
Two ratkin company members argue earnestly over the same absent aunt beside the camp pot. One traces
an old bridge and boat shape in spilled meal while the other holds up four crowns and a child's
small token. They agree on one crude sketch of her teeth and nothing else. Other species watch,
aware that they have been asked to settle ratkin family. Warm, funny and attached rather than comic
relief.
```

### `CAMP-15` The Boat

```text
At a river crossing, a human boatman quietly tells the Captain that the famous old ratkin woman owns
a boat, is extremely rude, cannot read and is claimed as an aunt by half the country. Her small boat
is visible downstream, but the two ratkin claimants are only distant silhouettes and do not know
the conversation is happening. Pale cold daylight, restrained humour.
```

### `CAMP-16` Four Crowns

```text
Four returned or missing crowns sit on a barrel head beside a borrowed dead child's token. One
ratkin claimant has gone very quiet; another, if present, is struggling not to enjoy the revelation.
The house that accepted money it was never owed is a dark shape across the road. The still-life of
four coins and the silence carries the scene; no text or judgement.
```

### `CAMP-17` The Aunt, in Person

```text
At a muddy crossing, an elderly ratkin woman sells eels from a small boat. She has the exact famous
teeth described by both claimants and recognises neither of them. Two company ratkin stand before
her under the Captain's attention while she holds up an eel and continues talking. Human warmth,
embarrassment and aggressive ratkin definitions of family; Stolen Daylight, never cute.
```

## 8. Road-vignette spot paintings

These 14 live vignettes are **MISSING — CREATE**. They are deliberately smaller than full events.
Use **EVENT FORMAT** at the vignette master size, one clear incident per picture and no named face.
If production scope must be reduced, these may ship after the dedicated event paintings, but they
remain in the manifest so no live content is forgotten.

### `VIG-01` Horseshoe from the mud

```text
One muddy mercenary hand raises an intact, barely rusted horseshoe from a road puddle while the
finder is disproportionately pleased and the wagon continues behind. Simple close road moment,
Fogbound Teal, no magic.
```

### `VIG-02` Purse and milk tooth

```text
An old purse opened on a ditch stone: three tarnished crowns and one small milk tooth in the palm,
with two mercenaries choosing not to comment. The tooth is ordinary and therefore stranger.
```

### `VIG-03` Unaccounted cheese

```text
Two wet mercenaries return from filling waterskins carrying an entire wheel of cheese neither will
explain, exchanging the disciplined look of people with a shared story. Deadpan road humour.
```

### `VIG-04` Cart spring

```text
A good steel cart spring is pulled from the splintered wreck of somebody else's bad day beside the
road. The company wagon waits to receive it; no bodies, only practical salvage.
```

### `VIG-05` Ceremonial boot-sole burial

```text
A detached boot sole is ceremonially lowered into a tiny roadside hole while its limping owner and
two solemn witnesses overplay the funeral. Muddy, restrained and dryly funny, never cartoonish.
```

### `VIG-06` Bread to the bog

```text
A provisions sack has slipped its knot on a bad rut, spilling a day's dark bread into black bog
water that accepts it without a ripple. Mercenaries and mule stare at the loss.
```

### `VIG-07` Eating knife lost

```text
A mercenary eats supper from the point of an uncomfortably large fighting knife after losing the
small eating knife; everyone on the wagon bench gives them a little more room.
```

### `VIG-08` Riderless mule declines

```text
A riderless mule stands in the road considering the company, then visibly chooses the opposite
direction while one mercenary takes the rejection personally. Wide simple road and weather.
```

### `VIG-09` The distant milestone bet

```text
Two mercenaries at a milestone enact payment of a lost wager: one publicly cleans the other's boot
while the actual next milestone remains a tiny shape hours away. No readable numbers.
```

### `VIG-10` Flat grey rain

```text
One hour of flat grey rain over the moving wagon, wet wool, hunched shoulders and road water running
from every edge; strangely nobody's mood is worse. Pure Fogbound Teal weather study.
```

### `VIG-11` Walking backwards

```text
One mercenary walks the final mile backwards beside the wagon on an unexplained theory about sore
heels while companions refuse to ask. Low wide road composition.
```

### `VIG-12` The named crow

```text
A single crow follows the wagon from a bare branch to a fence post through the day while one
mercenary points and has clearly just made the mistake of naming it. No supernatural sign.
```

### `VIG-13` Gills open in the rain

```text
At night rain reaches a sleeping mutated mercenary and thin teal gill folds at the neck open and
move. Another company member quietly shifts their bedroll closer to keep watch. Restrained teal is
the only saturated colour; intimate, non-grotesque and not a horror reveal.
```

### `VIG-14` Too long in the stream

```text
A gilled mercenary stands waist-deep in a cold stream longer than washing takes, collar raised on
the walk back while the company heroically asks no questions. The water and the person's reluctance
to leave are the subject. Restrained teal only at the gills.
```

## 9. Character portrait library

Use **PORTRAIT FORMAT**. Existing named portraits remain canon; their prompts are recorded for
controlled regeneration. New portraits must be delivered as one person per image, never as a
labelled contact sheet.

### Named company portraits

#### `POR-01` The Captain — **EXISTING — KEEP** (`P1`)

```text
Human mercenary captain, late thirties, tired and competent, ordinary ugly face, broken nose, bad
shave, one eyebrow scarred through, dark thinning hair and watchful eyes. A decent mail hauberk
repaired badly, mismatched rusted pauldron and a small faded banner crest at the shoulder. He is not
posing and does not look pleased to be in charge. Dust & Gold grading.
```

#### `POR-02` Vesna Kolb — **EXISTING — KEEP** (`P2`)

```text
Human spearwoman in her forties, weathered, thin-lipped and entirely unbothered, grey beginning at
the temples, a face that has buried three husbands and does not discuss it. Patched rags over an old
gambeson and the haft of a boar spear behind one shoulder. Fogbound Teal grading.
```

#### `POR-03` Skree — **EXISTING — KEEP** (`P3`)

```text
Small ratkin cutter with grey-pink patchy fur, long naked snout, yellowed incisors, one notched ear
and wet black darting eyes. Scavenged leather hood, scrap harness, cord-bound rags, gut-knife and tiny
stolen trinkets sewn into the cloth. Twitchy, clever, verminous and oddly sympathetic; never cute.
```

#### `POR-04` Bruht — **EXISTING — KEEP** (`P4`)

```text
Enormous ogre brute, shoulders overflowing the frame so the head looks small above them, mottled
grey-green hide, heavy brow, deep-set dull eyes, blunt tusks and old rope scars at the neck. Bare
skin with scavenged straps and a warclub haft. Slow, sad and dangerous; a person, not a monster.
```

#### `POR-05` Marrow — **EXISTING — KEEP** (`P5`)

```text
Thin human battle-mage in his mid-fifties, sunken eyes, ink-stained fingers, patched clothes, short
sword at the hip and plain chalk-and-cord rod at the back. He visibly knows how to stand in a line
and also reads things other people leave alone. One faint magenta reflection catches in one pupil
and nowhere else.
```

#### `POR-06` Ilka Renn — **MISSING — CREATE**

```text
Human archer in her early thirties, long narrow asymmetric face, wind-burned cheeks, one front tooth
missing and dark hair hacked short with a knife. Quietly ambitious rather than swaggering; she has
already counted every exit. Worn rags reinforced at the drawing shoulder, hunting bow and full
quiver visible, fingers callused and stained with wax. No idealised huntress beauty.
```

#### `POR-07` Nib — **MISSING — CREATE**

```text
Ratkin archer and Skree's cousin, small even for a ratkin, grey-brown fur, narrow alert muzzle and
one ear pierced with a bent copper loop. Scrap harness, short hunting bow and overfull quiver.
Unexpectedly steady eyes and relaxed posture: the ratkin who does not run when everyone expects it.
```

#### `POR-08` Gell — **MISSING — CREATE**

```text
Half-dead ratkin cutter found in the ditch after Blood on the Road, pale grey-pink fur matted with
mud, one eye swollen, rags and a small gut-knife still present. A pacifist carrying the weapon the
world requires, exhausted rather than cowardly. Show survival and reluctance, not gore.
```

#### `POR-09` Wynn Aldreth — **MISSING — CREATE**

```text
Human foundry widow in her late thirties, recently freed from a boar cage, folded posture not yet
fully straight but eyes already counting the room. Weathered practical face, cropped brown hair,
rope bruises, torn work coat with old soot at the cuffs. Dry intelligence and no gratitude pose;
she is deciding what the banner is worth.
```

### Generic recruit portrait pool — **MISSING — CREATE**

These replace composite `P6–P8`. Generate each entry as a separate portrait. Do not make any one
look like a protagonist.

| ID | Subject prompt |
|---|---|
| `POR-H01` | `Older human spear recruit, bald crown, broken nose bent twice, patched rags and boar-spear haft, patient defensive posture.` |
| `POR-H02` | `Young human archer recruit with severe squint, uneven cropped hair, waxed bowstring around two fingers, cheap cloak and no romantic poise.` |
| `POR-H03` | `Middle-aged human cutter recruit, jowled face, old cheek burn, small knife and barrel-lid buckler, watchful hands.` |
| `POR-H04` | `Gaunt human mage recruit with bad skin, shaved scalp, plain focus rod and thin clothes, frightened by what they know rather than theatrical.` |
| `POR-R01` | `Lean grey ratkin spear recruit with torn left ear, scrap shoulder plates and a spear too long for them, nervous forward lean.` |
| `POR-R02` | `Brown ratkin archer recruit with blunt snout, patched hood, sling and short bow bundled together, quick suspicious eyes.` |
| `POR-R03` | `Pale ratkin cutter recruit with scarred tail visible at frame edge, gut-knife and stolen human glove used as a pouch.` |
| `POR-R04` | `Older black-furred ratkin recruit with several whiskers burned away, cheap spectacles and scavenged focus staff, clever but exhausted.` |
| `POR-O01` | `Broad grey-green ogre recruit in stitched hides, one blunt tusk broken, huge calm hands and a fence-post cudgel.` |
| `POR-O02` | `Mottled brown-grey ogre recruit wearing door-plank harness, tiny patient eyes and stone maul haft, older than first impression.` |
| `POR-O03` | `Female ogre recruit with heavy jaw, rope-braided hair, scrap harness and long pike, immense without glamour or monstrous exaggeration.` |
| `POR-O04` | `Thin-for-an-ogre recruit in an absurd human wardrobe used as armour, embarrassed dignity, bucket hanging from one strap.` |

### Supporting NPC portraits — **FUTURE — CREATE LATER**

These become necessary if settlement and event dialogue gains visible speakers. Event scenes are
enough for the present slice.

| ID | Subject prompt |
|---|---|
| `NPC-01` | `The human contract-giver from the tavern, well-fed middle age, excellent dark coat, pleasant contempt, clean hands and a real stamped purse.` |
| `NPC-02` | `One-mule ridge pedlar, narrow friendly face, road-burned skin, quick knife hand hidden under a salt-stained coat, alert to every person's odds.` |
| `NPC-03` | `Bonepicker camp owner, human man with magnifying lens, sorted teeth pouch and relaxed smile of someone who has declined to rob you.` |
| `NPC-04` | `Coldharrow bone-setter, older human woman, boiled linen, bone hook, steam burns on practical hands, no comforting bedside manner.` |
| `NPC-05` | `The Collector, solitary human in a good but old coat, meticulous ledger, genuine obsolete seal and total seriousness.` |
| `NPC-06` | `Woman tending the Door-Shrine, ageless from weather rather than magic, plain shawl, swept-ground broom and eyes that never ask.` |
| `NPC-07` | `The elderly ratkin aunt from the crossing, famous large teeth, eel basket, boat rope and formidable amused impatience.` |

## 10. Tactical character, faction and creature art

The current prototype uses the approved simplified painted battlefield pack for its shipped unit
roles, with the older procedural painter retained only as a fallback for unmapped variants. `C1–C5`
remain useful design sheets and battle-panel faces, not transparent gameplay assets. Future
production art should be layered so equipment remains visible without painting every possible
character and gear combination.

Use **TURNAROUND FORMAT** for every sheet below. First generate neutral body silhouettes, then
armour and weapon overlays against the approved body proportions. Test every result at actual board
scale before authoring more.

### Playable body bases — **MISSING — CREATE**

| ID | Subject prompt |
|---|---|
| `TOK-H01` | `Two consistent human mercenary base bodies, one male and one female, upright medium silhouettes, weathered underclothes and boots, empty hands, deliberately ordinary proportions.` |
| `TOK-R01` | `Ratkin mercenary base body, small hunched silhouette, long naked tail, narrow shoulders, digitigrade feet and clever hands, empty-handed, grey-pink patchy fur.` |
| `TOK-O01` | `Ogre mercenary base body, very wide top-heavy silhouette, tiny head, long heavy arms and slow planted feet, mottled grey-green skin, empty-handed.` |

### Player armour overlay sheets — **MISSING — CREATE**

Use the appropriate approved body base as a hard visual reference. Overlays contain no face or body.

| ID | Subject prompt |
|---|---|
| `ARM-H01` | `Human-size armour overlay turnaround set: rags and rope, padded jack, mail hauberk, foundry plate; identical body registration and increasing visible weight.` |
| `ARM-R01` | `Ratkin-size armour overlay turnaround set: rags, cook-pot straps, scrap harness, rat-silk shroud; improvised fit around tail and hunched shoulders.` |
| `ARM-O01` | `Ogre-size armour overlay turnaround set: bare straps, door-plank harness, stitched hides, lashed plates, ogre scale and an absurd wardrobe; every layer tied on rather than tailored.` |

### Weapon and off-hand overlay sheets — **MISSING — CREATE**

| ID | Subject prompt |
|---|---|
| `WPN-01` | `One-hand weapon turnaround overlay sheet: fence-post cudgel, arming sword, short sword, gut-knife, warclub and the wood-stick with two holes; practical grip and consistent registration.` |
| `WPN-02` | `Two-hand and reach weapon overlay sheet: boar spear, long pike, two-hand maul, halberd, Weeping Hammer, hunting bow and broom; clear reach silhouettes and hand placement.` |
| `WPN-03` | `Off-hand overlay sheet: barrel-lid shield, round shield, buckler, pan-lid, off-hand dirk, full quiver and chalk-and-cord focus rod; same six facings and body registration.` |

### Ratkin hostile formations

| ID | Status | Subject prompt |
|---|---|---|
| `TOK-RAT-SPEAR` | **MISSING — CREATE**, refer to `C1` | `Mangy ratkin rank-and-file with rusty spear and small scavenged shield, cheap scrap harness, alert swarm posture.` |
| `TOK-RAT-SLINGER` | **MISSING — CREATE**, refer to `C1` | `Small ratkin slinger with stone pouch, sling extended, almost no armour and evasive low stance.` |
| `TOK-RAT-CUTTER` | **MISSING — CREATE**, refer to `C1` | `Ratkin cutter with gut-knife, cord-bound rags and posture built around stepping behind a distracted target.` |
| `TOK-RAT-CHIEF` | **MISSING — CREATE**, refer to `C2` | `Larger ratkin chieftain in the best scavenged armour of the clan, crude standard fixed to the back, visibly in command without becoming a giant rat.` |
| `TOK-RAT-SNIFFER` | **MISSING — CREATE**, refer to `C3` | `Small unarmed ratkin warp-sniffer, staff with one restrained hot-magenta tip, ritual scraps and cautious posture behind the line.` |
| `TOK-RAT-SLINGMASTER` | **MISSING — CREATE** | `Veteran ratkin sling-master with heavier sling, layered scrap coat and a compact command standard; ranged captain who holds the ridge rather than charges.` |
| `TOK-RAT-LONGSPEAR` | **MISSING — CREATE** | `Ratkin screen fighter braced behind an overlong spear, scrap helmet and narrow shield, silhouette devoted to keeping enemies away from slingers.` |

### Ogre hostile formations

| ID | Status | Subject prompt |
|---|---|---|
| `TOK-OGR-CLUB` | **MISSING — CREATE** | `Steading ogre with warclub, stitched hides and settled wide stance, slow confidence rather than rage.` |
| `TOK-OGR-PIKE` | **MISSING — CREATE** | `Ogre with extremely long crude pike, rope hand-spacing and light hide armour, designed to hold a road from two hexes away.` |
| `TOK-OGR-MAUL` | **MISSING — CREATE** | `Ogre with two-handed stone maul and heavy scrap shoulder protection, low deliberate centre of mass.` |
| `TOK-OGR-THROWER` | **MISSING — CREATE** | `Ogre stone-thrower with sling-basket of fist-sized rocks and one rock ready in a huge hand, lighter armour, patient aim.` |
| `TOK-OGR-ELDER` | **MISSING — CREATE** | `Old steading-elder, broad grey hide, best repaired plate, walking staff that is also a club, calm seated authority translated into a standing combat silhouette.` |

### Human hostile formation

| ID | Status | Subject prompt |
|---|---|---|
| `TOK-BROKEN-RABBLE` | **MISSING — CREATE**, refer to `C4` | `Three compatible Broken Men variants on one turnaround sheet: starving deserter with spear, deserter with sword and half-shield, deserter archer; each wears half a faded human uniform.` |
| `TOK-BROKEN-CAPTAIN` | **MISSING — CREATE**, refer to `C4` | `Broken Men's captain, hungry and patched but still standing like an officer, faded half-uniform, serviceable sword and no villainous flourish.` |

### Beasts and the unidentified

| ID | Status | Subject prompt |
|---|---|---|
| `TOK-FEN-MOTHER` | **MISSING — CREATE**, refer to `E2` | `Six-legged lindwurm great beast occupying two connected hexes, head like a split anvil, long body and tail, near-black hide with slow restrained magenta under-skin bands; separate head and following-body registration.` |
| `TOK-CUB` | **MISSING — CREATE**, refer to `C5` | `Dog-sized Fen-Mother whelp with outsized split-anvil head, clumsy six legs and no useful sense, skittish rather than aggressive.` |
| `TOK-BITCH` | **MISSING — CREATE** | `Large starved pack-bitch, long-legged and scarred, lean frame, commanding stillness and a simple old collar; animal captain, not a wolf fantasy monster.` |
| `TOK-LURCHER` | **MISSING — CREATE** | `Long-legged starved camp lurcher built to bite and leave, narrow chest, torn ears and no armour.` |
| `TOK-RUNT` | **MISSING — CREATE** | `Smaller quicker pack runt, visible ribs, sharp silhouette and frightened aggression.` |
| `TOK-FENLING` | **MISSING — CREATE** | `A person-sized thing made by fen-water, soaked hide or skin, one wrong watching eye motif and posture that does not react normally to pain; ambiguous origin, no bright glow.` |
| `TOK-ARMOUR` | **MISSING — CREATE** | `Something entirely sealed in oversized plate, no skin and no readable emblem, carrying a huge circular-sweeping sword in one hand; perfectly frontless silhouette, heavy enough to feel inevitable rather than fast.` |

### Non-fighting companion

#### `TOK-PET-CUB` — **MISSING — CREATE**

```text
The same Fen-Mother cub after joining the company, six awkward legs and outsized head, staying at the
Captain's shoulder rather than fighting. Include calm, watchful and sleeping poses in the six-facing
sheet; no attack pose.
```

## 11. Battlefield grounds and environment atlases

The live prototype currently paints these grounds procedurally. These assets are for a future
painted Godot board and for art-direction tests. The hex grid and all tactical state colours remain
separate UI layers; never bake reachable hexes, back arcs, selection colour or unit shadows into the
ground painting.

### `ENV-01` Fogbound Teal battlefield — **MISSING — CREATE**

```text
Empty 15-by-13 pointy-top hex tactical battlefield viewed from a high three-quarter angle, but with
no visible grid lines: wet marsh soil, dead grass, shallow black water, pale reeds, occasional bone,
broken branch and two or three large obstacle clumps of boulders or drowned trees. Broad connected
lanes remain open for movement. Fogbound Teal, low contrast in the centre so coloured tactical
states remain legible, no units, buildings or interface.
```

Deliver both a clean 16:9 ground plate and a tileable material atlas.

### `ENV-02` Dust & Gold ridge battlefield — **MISSING — CREATE**

```text
Empty 15-by-13 pointy-top hex tactical battlefield from a high three-quarter angle, no visible grid:
dark dry soil, pale dead-grass tufts, hard stony ridge, four substantial rock clumps and almost no
water or cover. Bright detail sits on darker ground so amber and red tactical overlays remain
readable. Dust & Gold, hard cold lateral light, no units or interface.
```

### `ENV-03` The Bloom battlefield — **MISSING — CREATE**

```text
Empty 15-by-13 pointy-top hex tactical battlefield from a high three-quarter angle, no visible grid:
near-black moss, wrong-coloured water, crooked roots and low Bloom pods concentrated at the edges,
with several clear connected lanes through the middle. Restrained magenta stains the air without a
visible source; it is the only saturated colour. No units or interface. Keep the centre dark enough
for state overlays and tokens.
```

### `ENV-04` Ruined steading camp battlefield — **MISSING — CREATE**

```text
Empty tactical camp inside a broken circular palisade, high three-quarter view: stacked timber and
thorn form a ring with exactly two readable gaps, one north and one south; an impassable firepit at
the centre; three crude lean-tos inside; dead ground and open lanes between fire and wall. Night
Fogbound Teal with the fire as the only warm saturated colour. No units, grid or interface.
```

### `ENV-05` Terrain prop atlas — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Top-down three-quarter isolated battlefield prop atlas: wet boulder cluster, dry ridge rock cluster,
drowned tree, fallen log, reed bank, shallow pool edge, broken fence, palisade wall segment, palisade
gap posts, crude lean-to, camp firepit, old bones, muddy rut, tree stump, Bloom pod cluster and ruined
stone fragment. Consistent scale and light, no decorative symbols and no grid outline.
```

### `ENV-06` Road and settlement prop atlas — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Oblique world-map prop atlas: muddy road segment, stone causeway, small timber hold, ruined tower,
marsh chapel, ridge rocks, trade cart, campsite, Black Fen reeds, tiny Coldharrow village, crossroads
wall, Door-Shrine, faded banner pole, shipwreck, bell frame and company wagon. Simplified painted
miniatures with no labels or node rings.
```

## 12. Inventory, resource and UI icon art

The live build uses Unicode glyphs. Final icons should be hand-cleaned after generation and checked
at 32 px. If a generated sheet cannot keep an exact object count or clear silhouette, use it only as
concept reference and redraw the final icon manually.

### `ICON-RES` Resources — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Four isolated resource icons at identical visual weight: a small stack of tarnished crowns, a tied
bundle of dark bread and provisions, a compact pile of useful salvage made of wood strap and iron
banding, and one irregular translucent gem whose restrained sick-gold or magenta inner colour is the
only saturated element. Practical objects, no treasure sparkle.
```

### `ICON-ARMOUR` Armour and worn oddities — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Thirteen isolated equipment icons in an orderly grid: rags and rope; cook-pot with straps; door-plank
harness; scrap harness; stitched hides; padded jack; mail hauberk; foundry plate; rat-silk shroud;
lashed ogre plates; ogre scale armour; a wooden wardrobe worn as armour; and a dented bucket worn as
a helm. Each object is patched, readable and shown without a body.
```

### `ICON-WEAPON` Weapons — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Fifteen isolated weapon icons: broom; wood-stick with two holes; fence-post cudgel; arming sword;
boar spear; warclub; gut-knife; hunting bow; short sword; two-hand maul; halberd; Weeping Hammer;
barrel-lid shield; round shield; and buckler. Match scale by gameplay footprint rather than real
length, with clear silhouettes and no magical glow except a barely damp surface on the Weeping
Hammer.
```

### `ICON-OFFHAND` Off-hands and tools — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Five isolated equipment icons: full quiver, off-hand dirk, chalk-and-cord focus rod, pan-lid shield
and the company banner folded around its short pole. Patched, practical and readable at 32 pixels.
```

### `ICON-RELIC` Trinkets and strange objects — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Sixteen isolated trinket icons: Toll-Man's good boots; mirrored sphere; Saint's Fingerbone; warm
Bloom-Stem; Glass Apple; worn brass token; marching drum; Fen-Mother's shed tooth; pedlar's charm;
Rat-King's crowned knuckle; coiled rosined fiddle string; Foundry ledger-pin; cub's milk-tooth; the
unidentified Cold Thing; Ground-Glass Eyes; and a crude bell. Ordinary materials, restrained magic:
only Bloom objects may carry hot magenta, the fingerbone may be faintly warm, and the Cold Thing
must not reveal what it is.
```

### `ICON-NODE` World-node symbols — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Eight stark painted-symbol icons with consistent line weight and no letters: settlement, battle,
road event, merchant, camp, strange place, recruitment and final danger. Build them from plausible
medieval objects — wall, crossed weapons, road stone, scales, tent, wrong-coloured aperture, empty
banner and bells — on transparent background. Saturated magenta appears only on strange place.
```

### `ICON-CLASS` Class and race symbols — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Ten compact silhouette icons: Captain banner crest, spear, bow, mage focus, battle-mage sword plus
focus, cutter knife, ogre brute fist, human diamond, ratkin narrow tail mark and ogre broad hex mark.
One-colour bone-grey shapes intended for UI tinting, transparent background, no words.
```

### `ICON-STATUS` Battle states — **MISSING — CREATE**

Use **ICON FORMAT**.

```text
Compact tactical status symbols: steady, wavering, breaking, routed white flag, surrounded, in-line,
back arc, transfixed eye, rooted legs, poison count, bleeding, guarded, blessed, armour broken and
disengaging. Simple readable shapes, mostly monochrome for later tinting; only the unnatural eye and
root may use restrained magenta.
```

### `FX-01` Physical combat effects — **MISSING — CREATE**

```text
Transparent effect atlas for a painted tactical game: small sword impact, spear thrust streak,
shield block sparks, sling-stone dust chip, arrow trail, armour dent, bloodless miss, parting swing,
ground shove, kick dust and white surrender cloth. Compact, restrained, readable at board scale,
never screen-filling.
```

### `FX-02` Low-magic spell effects — **MISSING — CREATE**

```text
Transparent effect atlas with five distinct low-magic workings: Ember as a tiny dirty-orange coal
streak; Unpick as armour lacing coming loose without light; Iron-Oath as a cold iron-grey binding
ring close to the body; Blight-Wind as a thin bruised-green pressure through a crowd; Wither as a
brief sick-gold desiccation with no fire. Add one restrained hot-magenta warp-sniffer mote. Effects
are physical, brief and small, never neon spell circles or floating runes.
```

## 13. Mutation and strange-condition art

Mutation art changes the person's body in the portrait, tactical token and paper doll. It is not a
badge laid over them. The altered part carries at most one restrained supernatural colour while the
rest of the person remains in the base palette.

### Built chains that still lack finished body art

#### `COND-01` Fen-Water in the Lungs — **MISSING — CREATE**

```text
Neutral character reference showing a soaked mercenary with grey reed-like phlegm on a cloth,
shallow guarded breath and no visible mutation yet. Ordinary sick body, no glow; pair with a small
neck detail panel that remains unchanged.
```

#### `MUT-01` Gills of the Fen — **MISSING — CREATE**

```text
Neutral three-quarter character body reference with thin functional gill folds along both sides of
the neck, moving slightly as rain approaches. Human version frighteningly anatomical; ratkin version
small and fluttering; ogre version broad and heat-sensitive. Restrained teal #35e0c8 only inside the
gill folds, no fish-person redesign.
```

#### `COND-02` Colour Beneath the Nail — **MISSING — CREATE**

```text
Close body-detail reference of one work-worn hand where a single fingernail has become glossy hot
magenta and the colour has just begun to creep beneath adjacent skin. The hand otherwise remains
dirty and ordinary; no glow beyond the nail.
```

#### `MUT-02` Blooming Hand — **MISSING — CREATE**

```text
Neutral character reference where one hand's fingers have become pale flowering tendrils with a
restrained hot-magenta centre. The altered hand can reach farther and can no longer grip a normal
weapon; show it reaching toward a nearby strange object without permission. Body, clothes and other
hand remain desaturated and human-scale.
```

### Authored future mutations

These are **FUTURE — CREATE LATER**. Their concept prompt is ready, but final token/gear interaction
must be checked when each mechanic enters production.

| ID | Mutation | Subject prompt |
|---|---|---|
| `MUT-03` | The Second Shadow | `Neutral character in cold side light whose cast shadow remains one half-step behind the body's current pose, still attached at the feet but performing the previous motion. No glowing duplicate.` |
| `MUT-04` | The Talking Wound | `Old closed wound at the ribs has formed subtle lip-like scar margins that seem about to speak; useful and ashamed, anatomical but non-gory, one restrained sick-gold wetness inside.` |
| `MUT-05` | The Eye Beneath the Tongue | `Mouth opened only enough to reveal one small alert eye beneath the tongue, its dull gold iris seeing what speech hides; using it costs the voice, unsettling but not gore.` |
| `MUT-06` | Bone Lantern | `A hard pale lattice has grown behind the sternum and contains a low sick-gold light that belongs inside no person; ribs and clothing catch it from within, face remains dark.` |
| `MUT-07` | Hollow Belly | `Mercenary with ordinary exterior except for an unnaturally deep concavity below the ribs and a dark opening implied under loosened clothing, always carrying more than the body should contain; no gore or comedy.` |
| `MUT-08` | Reed Lungs | `Each exhale carries a faint reed-shaped mist and the ribcage moves in thin vertical sections like marsh stems; bruised green-grey only, no plant costume.` |
| `MUT-09` | Borrowed Face | `A weathered face has subtly rearranged to resemble the most inconvenient nearby person while retaining wrong asymmetry and mismatched age; show original and borrowed profile in one restrained reference plate, no morphing effect.` |
| `MUT-10` | Splinter Bones | `Forearm and shoulder have become visibly reinforced by many fine bone splints beneath taut skin, harder to break and frighteningly dry, with small char marks showing the cost of fire.` |
| `MUT-11` | Bell Heart | `Under the sternum, a small bell-shaped hard growth is visible through skin and cloth tension; fear makes it physically ring, suggested by one vibration in a hanging buckle, no drawn sound waves.` |
| `MUT-12` | Long Fingers | `One hand has grown three-jointed fingers long enough to reach a key or throat beyond normal range, still recognisably the character's hand and awkward inside gloves.` |
| `MUT-13` | Glass Skin | `Patches of skin have become translucent mineral glass, beautiful only at a distance and edged dangerously up close; pale colourless refraction, no rainbow crystal person.` |
| `MUT-14` | The Quiet Mouth | `Lips have sealed into a smooth scar while a second shadow of a mouth appears in cold breath beside the face and answers anyway; no gore and no readable words.` |
| `MUT-15` | The Backward Knee | `One leg's knee has reversed its working angle while remaining weight-bearing, giving a silhouette made for retreat and difficult approach; practical brace no longer fits.` |
| `MUT-16` | Crown of Antennae | `A restrained crown of fine sensory antennae grows from the scalp and temples, each leaning toward a different approaching threat; the wearer is exhausted by feeling everything coming.` |

### Future condition visuals — **BLOCKED — DO NOT GENERATE**

Bloom Fever, Something in the Wound, Bell-Sick, Mirror Sleep, Reed Cough, Hollow Hunger, Glass
Cracks, Rooted Blood, Watched from Inside, Wrong Voice, Skin Full of Light, Unfinished Drowning and
The Extra Pulse have names but no locked visible changes. Write the full origin → clock → outcome
chain before commissioning their images.

## 14. Settlements and legacy paintings

Coldharrow itself is `PLACE-01`. The following accepted settlement concepts are **FUTURE — CREATE
LATER**. Each building sheet is a three-panel progression from stage I to III, but contains no
labels or numbers. Atmosphere B; the settlement remains poor at every tier.

### `SET-01` Forge I–III

```text
Three coherent stages of the same village forge: first, a repaired hearth and one usable anvil;
second, racks with clearly human, ratkin and ogre armour forms; third, a secured dark bench where a
known strange artifact can be reforged without turning the shop into a wizard laboratory. Same
smithy footprint and camera in every panel, practical improvements rather than wealth.
```

### `SET-02` Infirmary I–III

```text
Three stages of the same village infirmary: clean straw beds and boiled linen; then proper splints,
steam treatment and space to soften one old scar; finally a guarded surgery table with skilled tools
and one unpleasant covered payment on a tray. Humane but not comforting, no modern medicine.
```

### `SET-03` Wheelwright / workshop I–III

```text
Three stages of the same wheelwright yard: provision racks fitted to a wagon; then a widened bed and
second companion bench; finally a survey table, spare axle and road tools that make a second route
possible. Show structural change to the wagon, not abstract prosperity.
```

### `SET-04` Kitchen I–III

```text
Three stages of the same communal village kitchen: sound dry storage and one hot pot; then a covered
company table prepared before the act's first march; finally a calm busy kitchen that turns some
camp incidents safer without ever looking abundant. Food is brown, practical and precious.
```

### `SET-05` Wall and watchtower I–III

```text
Three stages of the same poor village perimeter: a repaired timber gate; then a short watchtower and
working warning bell; finally a defended gate after an attack, traders and one recruit still present
because the wall changed what happened. Never a stone fantasy fortress.
```

### `SET-06` The building that did not survive

```text
The selected village building burned or abandoned after the company ends, with one person carrying
out a single surviving crate, tool or pattern while the rest collapses behind. The legacy is a
possibility carried forward, not permanent power. Fogbound Teal with distant restrained fire.
```

## 15. Accepted concepts that are not art-ready

| Concept | Status | Why no prompt is supplied |
|---|---|---|
| The Smaller One seven-card chain | **BLOCKED — DO NOT GENERATE** | Victim, hunter appearance and final encounter staging are not locked. |
| Act One stinger | **BLOCKED — DO NOT GENERATE** | The enemy still needs a real name and final fiction. |
| Act Two regions and map | **BLOCKED — DO NOT GENERATE** | Geography and node content are not authored. |
| Hollow-men and later playable peoples | **BLOCKED — DO NOT GENERATE** | Only examples, not accepted visual canon. |
| Iron Road mortality contract | **BLOCKED — DO NOT GENERATE** | The run-start presentation is still an open design question. |
| Grafts, beginning with Shield-Skull | **BLOCKED — DO NOT GENERATE** | Anatomy API is planned, but the physical design and compensating rule are not locked. |
| “Meet the Rabble” onboarding card | **NO UNIQUE ART NEEDED** | It reuses the current speaker's portrait and the current screen art. |
| Personalities, bonds and provenance facts | **NO UNIQUE ART NEEDED** | These are shown through portraits, posture, text and existing screen art, not collectible badges. |
| AI doctrines and balance tools | **NO PLAYER ART NEEDED** | Debug and simulation UI only. |

## 16. Recommended production order

1. **Stage 1 generated — awaiting visual approval:** Bloom `KEY-01`, alternate road `KEY-01A`,
   `KEY-02`, `EV-03`, `EV-05` through `EV-08`, `EV-10` through `EV-16`, `EV-18` and `EV-21`.
2. **Integrate the approved stage-1 pack:** update `art/build_assets.ps1`, embed the menu, replace the
   fourteen `EVENTART` mappings and test every image at the live 398×104 crop. Follow
   `art/src/stage-1/CLAUDE_ASSET_PLACEMENT.md`.
3. **Finish remaining live stand-ins in stage 2:** `EV-22`, `EV-23`, `EV-25`, `EV-26` and `EV-28`,
   then `PLACE-01` and `PLACE-03`.
4. **Narrative completeness:** 17 camp scenes, then 14 small road vignettes. Preserve colour rhythm;
   not every event should be grey or threatening.
5. **Named faces:** Ilka, Nib, Gell and Wynn, then the 12 individual recruit portraits.
6. **Battle readability test:** `ENV-01` plus one human, ratkin and ogre base and the simplest gear
   overlays. Do not create the rest until they read correctly at actual hex size.
7. **Full tactical set:** faction variants, beasts, remaining grounds, props and effects.
8. **UI and inventory finish:** remaining screen backgrounds, item sheets and hand-cleaned icons.
9. **Future systems only when scheduled:** mutation library, settlements and inheritance.

## 17. Review checklist for every generated image

- **Story:** Can someone name the event from the picture without reading the caption?
- **One subject:** Is there one clear scene rather than a collage of every noun in the prompt?
- **Crop:** Does the essential story survive a 398×104 centre crop?
- **Values:** Does it still read in greyscale and at 10% size?
- **Colour purpose:** Does saturation support Bloom, danger, fire, ritual, celebration, daylight or
  another specific story beat, while preventing consecutive scenes from becoming uniformly grey?
- **World:** Is it pre-gunpowder, poor, repaired and materially plausible?
- **Company diversity:** When the recurring company is visible as a group, are humans, a ratling and
  an ogre readable as equals with practical roles?
- **Ratling anatomy:** Does the ratling read as a furred rat-person with rodent muzzle, whiskers,
  round ears and tail rather than a green goblin or cute mascot?
- **Road logic:** Unless wading is the event, do every boot, hoof, wheel and wagon shaft follow the
  established road/causeway in one consistent direction?
- **Magic:** Is the weird physical, rare and specific rather than a general fantasy glow?
- **Gear:** Is armour visibly the right size and are hands actually holding weapons?
- **Continuity:** Do named faces, banners, species proportions and recurring objects match their
  approved references?
- **Clean delivery:** No text, labels, watermark, frame or UI baked into the art.

Reject a prettier image if it violates continuity or tells the wrong event. Consistency does not
mean monotony: RabbleBound needs ugly roads, vivid Bloom, bright salt air and occasional human fun to
make each other stronger.

## 18. Naming and integration convention

Use descriptive, stable IDs and keep source masters separate from runtime exports:

```text
art/src/key/KEY-01_opening-menu.png
art/src/events/EV-10_something-in-armour.png
art/src/camp/CAMP-04_found-thing.png
art/src/portraits/POR-06_ilka-renn.png
art/src/tokens/TOK-RAT-SLINGER_turnaround.png
art/src/environments/ENV-01_fogbound-teal-board.png
art/src/icons/ICON-RELIC_sheet.png
art/src/mutations/MUT-01_gills-of-the-fen.png
```

Runtime exports may be JPG for opaque scenes and PNG/WebP for alpha assets. Store the exact assembled
prompt, seed/reference information, source dimensions and approval note beside each master. Never
encode a production ID or asset title into the painting itself.
