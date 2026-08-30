# TASK FOR THE IMAGE GENERATOR: the lizards of the burnt road (#267)

**Read §1 to §4, then work down §5 one row at a time.** It is written to be pasted into ChatGPT
(GPT Image) in pieces: **§4 is the fixed suffix you append to every prompt**, §5 is the list of
subjects. Nothing here needs the game open.

*Written 2026-08-30 for entry #267, which built four new creatures, five fights and five road
cards. Everything below already EXISTS in the game and is playable today, drawn as temporary
flat-colour silhouettes. This task replaces those silhouettes with painted art. Where this file
and the game's own prose disagree about what a thing IS, the game wins; ask.*

---

## 1. What this is for

RabbleBound is a dark, muddy, low-fantasy tactical game about a company of strangers on one
contract, on a rainy island called Grimtoll: humans, ratkin (small wiry rat-people) and ogres.

**The story these four creatures tell, in one paragraph.** The island's one human town, Ashmoor,
fell to a ratkin clan last winter. The clan took its foundry and **could not light two of its
great furnaces**, and would never say why. The reason is that they were not empty. What lived in
the warm stone has been walking west along the road ever since, following the heat, and the fires
the company keeps meeting are not wildfire. They are a trail. **The salamanders are the vermin of
that migration, the slag-hides are its hunters, the ash-drakes are its first-born, and the thing
that emptied the third furnace is walking somewhere ahead of all of them.**

They are **animals, not demons and not dragons in the heroic sense**. They live in fire the way a
lizard lives on a hot stone: comfortably, and without meaning anything by it.

---

## 2. The hard rules, and why each one is hard

1. **They must read as ONE FAMILY and still be told apart at a glance.** The shared language is:
   a low-slung body, a long head, a hide the colour of cooled slag and road grit, and **exactly
   one saturated warm colour** on each of them. What separates them is SILHOUETTE and nothing
   else.
2. **The warm colour is the only saturated thing in the picture**, and it is ember orange going to
   pale gold at its hottest (`#e07a28` to `#ffc76b`). Everything else is grey-brown, olive, wet
   slate, bone. ⛔ No red. No purple. No magical glow, no runes, no light rays.
3. **They are not shiny and not armoured in metal.** The crust on them is slag, mud and cooled
   stone: dull, cracked, pitted. Anything that reads as forged plate is wrong.
4. **No fire is drawn coming OUT of them except where a row below asks for it.** The heat lives
   UNDER the crust, showing through splits. A creature wreathed in flames is the wrong idea: these
   are things that are hot, not things that are burning.
5. **No text, letters, numbers, runes or writing anywhere.**
6. **They are all four-legged and belly-low**, except where a row says otherwise. Nothing rears up
   like a heraldic dragon.

---

## 3. Scale, so the four read as a ladder

This matters more than any single picture. Put beside each other they must go:

| | roughly | reads as |
|---|---|---|
| cinder salamander | the size of a **cat** | vermin. Almost pitiable |
| slag-hide | the size of a **large pig**, but squat and wide | a lump of road with an eye in it |
| ash-drake | the size of a **cow**, standing up on its forelegs, wings half open | the first thing here that is a real animal |
| the Third Furnace | **four times the length of the drake**, lying down | not an animal any more. A landscape feature that moves |

---

## 4. The fixed suffix, appended to EVERY prompt below

> Dark low-fantasy creature art, painted, grounded and realistic in proportion, not cartoon and
> not heroic. Muted palette of wet slate, cooled slag grey, olive mud and bone; the ONLY saturated
> colour is ember orange going to pale gold, and it appears only where the description says.
> Overcast, low light, damp air. The creature is an animal: no armour, no jewellery, no glow, no
> runes, no text, no magical effects. Painterly, readable at small size, strong silhouette, few
> large value masses rather than fine detail.

---

## 5. The subjects

Status: ⏳ wanted · 🎨 delivered, not built · ✅ in the build. Flip a row when it lands.

### G1. Battle tokens: the figure you see on the board, in every fight

**The most valuable four pictures in this list.** These are what the player looks at for the whole
fight. Transparent background, cut out, **side-on, facing LEFT**, standing on flat ground.

⚠ **Facing left is not a preference.** The game mirrors ordinary bodies to face their target, but a
creature that occupies more than one hex is exempt from that flip and is drawn exactly as
delivered, with its head hex to the west. Deliver all four facing left and the pipeline is happy.

| # | subject | live box | file |
|---|---|---|---|
| G1a | **Cinder salamander.** A cat-sized fire-newt: long low body, splayed legs, a fat tail, a broad blunt head with a wide mouth. Charcoal-grey pebbled hide, and one band of ember orange along the flank as if it were lit from inside. Wet-looking. Unbothered. | 24 x 18 | `art/src/stage-3/battle-sprites/final-v4/salamander.png` |
| G1b | **Slag-hide.** A squat wide pig-sized lizard that looks like a lump of broken roadway: a crust of grey slag over its back, a low bony crest, stubby legs, a curled tail. Its ONE feature is a big turret eye set high on a blunt head. Almost no warm colour at all, just a dull gold ring in the eye. It is deliberately the drabbest thing here: the whole creature is an argument for not being looked at. | 30 x 24 | `.../slaghide.png` |
| G1c | **Ash-drake.** A cow-sized lizard up on its forelegs with tattered bat-like wings half open, a barrel chest and a heavy head carried high. Slag crust across the shoulders, split in places with ember orange underneath, and the same orange banked in its open mouth. | 34 x 30 | `.../drake.png` |
| G1d | **The Third Furnace, HEAD AND FORE-BODY.** The head and shoulders only, in profile facing left, of something enormous lying down. A blunt heavy skull carried low, an under-slung jaw that does not close, uneven teeth, two small eyes lit like coals. Over the shoulders a thick crust of cooled slag SPLIT OPEN along one long seam, and inside the seam it is the colour of a working forge. She is a furnace with a face. | 44 x 42 | `.../furnace.png` |
| G1e | **The Third Furnace, BODY SEGMENT.** The middle of the same animal: a length of the same slag-crusted back, one long split running edge to edge with forge-light inside it, a belly in shadow, one thick leg. ⛔ **It must tile:** the game repeats this image across two hexes and puts G1f after it, so the back line and the seam have to run flat out to BOTH edges and meet their neighbours. | 40 x 30 | `.../furnacebody.png` |
| G1f | **The Third Furnace, TAIL END.** As G1e but thinning to the right, the crust closing over, and a heavy tail trailing off the right edge. | 40 x 30 | `.../furnacebody_tail.png` |

⚠ **G1d, G1e and G1f are ONE animal in three pictures**, drawn at the same height above the
ground, the same crust colour and the same seam height, or she comes apart on the board. Draw them
as one long side view and cut it into three if that is easier.

### G2. Wide event stages: the painting behind each road card

**1672 x 941**, full-bleed scene, no transparency. ⛔ **The left 45% of the frame is covered by the
interface** (title, faces, the prose, the doors), so it must be dark low-detail ground, sky or
smoke. **Put the subject in the right half.** ⛔ Do not draw the player's company: the game shows
the real roster beside the painting and a painted body would contradict it.

| # | card | subject | file |
|---|---|---|---|
| G2a | SOMETHING IN THE SCRUB | Burnt scrub at the roadside, smoke still rising from it, and one cat-sized salamander sitting up on its front legs looking straight at the viewer. Small, almost comic, entirely unafraid. | `art/src/stage-6/j-stage/EV-J70_something-in-the-scrub-stage.png` |
| G2b | THE WARM STONES | A season-old burn that never went out: a wide shallow country of black ground with smoke coming up out of it in a dozen places, roadside stones, low sun. Two small shapes crossing the road, and one shape the exact colour of the road that is only visible because it is in the wrong place. | `.../EV-J71_the-warm-stones-stage.png` |
| G2c | THE GLASS ROAD | A cart road whose verge has been fused to green bubbled GLASS for a hundred paces, with the shape of the wheel ruts still frozen in it. Burnt scrub either side. The glass catches what light there is. This one is about the ROAD, not about a creature: keep them small and half-hidden. | `.../EV-J72_the-glass-road-stage.png` |
| G2d | THE ASH-DRAKES | Half a mile of standing timber burnt from the inside out, trunks still upright and still glowing in the seams. Two cow-sized winged lizards up on their forelegs in the middle of it, wings half open. One of them is breathing a lance of fire at nothing in particular. | `.../EV-J73_the-ash-drakes-stage.png` |
| G2e | THE THIRD FURNACE | A clearing that was not a clearing a month ago, the heat coming off it like a doorway. She lies across the whole of it, enormous, four lengths of her, the crust over her back split open and the light underneath the colour of a working forge. ⛔ **The single most important picture in this list.** She should read as a landscape that is alive. | `.../EV-J74_the-third-furnace-stage.png` |

### G3. Map sights: the icon on the road node, before you arrive

**128 x 128, transparent cut-out**, one strong mass, no scene, no ground plane, no text. It shows
what the company NOTICES from the road, never an outcome or a reward.

| # | for | subject | file |
|---|---|---|---|
| G3a | `emberpatch` | a low patch of burnt scrub with smoke coming off it | `art/src/world-map-sites/MAP-EV35_ember-patch-source.png` |
| G3b | `warmstones` | two roadside standing stones with smoke rising between them | `.../MAP-EV36_warm-stones-source.png` |
| G3c | `glassroad` | a short stretch of road fused to green glass, catching the light | `.../MAP-EV37_glass-road-source.png` |
| G3d | `ashdrakes` | three burnt tree trunks, upright, glowing in the splits | `.../MAP-EV38_ash-drakes-source.png` |
| G3e | `furnace` | a low dark ridge with one long lit seam across it, which on a second look is an animal | `.../MAP-EV39_third-furnace-source.png` |

### G4. The plaque face: the head shown beside the name in a fight

One sheet, same box as the other `C*` faces, cover-cropped by the game. Today every lizard falls
through the plaque cascade to the ratkin rank-and-file sheet, which is wrong on all four.

| # | subject | file → key |
|---|---|---|
| G4a | A lizard head in three-quarter view, filling the frame: slag-crusted, one lit eye, the jaw slightly open. Generic enough to serve the salamander, the slag-hide and the drake. | `art/src/C10_Lizard_Foe.png` → `C10` |
| G4b | *(optional, later)* The Third Furnace's own face, hers alone | `art/src/C11_The_Third_Furnace.png` → `C11` |

---

## 6. When a file lands: what a session does with it

Nothing here needs code except where a row says so.

```powershell
# battle tokens (G1)  - after dropping the PNGs in final-v4/
python art\src\stage-3\battle-sprites\final-v4\build_final.py
powershell -NoProfile -ExecutionPolicy Bypass -File art\build_assets.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File art\inject.ps1
# then one row each in paintedSpriteKey(): kind 'salamander' -> 'salamander', and so on,
# plus BODY_KIND for the two Furnace body pieces.

# wide stages (G2)
python art\build_j_pack.py
powershell -NoProfile -ExecutionPolicy Bypass -File art\inject_j_pack.ps1
# then one row each in JSTAGE{}: emberpatch:'EVJ70', warmstones:'EVJ71', ...

# map sights (G3)
python art\src\world-map-sites\build_event_sites.py
powershell -NoProfile -ExecutionPolicy Bypass -File art\build_assets.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File art\inject.ps1
# then one row each in MAP_SIGHT{}, and re-run the three map counters.

# always, last
powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_site.ps1
python tools\dev\gt.py check
```

⚠ **Flip the row in [`ART_QUEUE.md`](ART_QUEUE.md) §G in the same session and name the key.** An
asset sitting on disk unbuilt is the silent-failure shape this project has found three times
(#190, #226, #237).
