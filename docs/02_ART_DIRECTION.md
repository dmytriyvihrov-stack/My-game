# Step 2 - Art Direction & Visual Prompt Pack #1

> **⚠ DECISION (2026-07-29): the game is PAINTED, not pixel.** The user resolved the fork the
> style bible raised: painted illustration throughout. What survives from this document: the
> palette rules, the saturation rule, the lighting rules, the character design rules, and the
> Style Bible's four atmosphere prompt keys (3a–3d) - those are the production prompts now.
> What is superseded: the pixel-art technical spec (resolutions, dithering, 32-colour cap).
> New spec direction: painted bust portraits (Battle Brothers-style), painted event scenes in
> the atmosphere keys, and units on the hex board as painted tokens/busts. Tile and sprite
> sizes to be re-specced when the Godot port begins.

## Part 1 - The Style Bible

### Where to start (my recommendation)

Don't start with characters. **Start with one mood piece that defines the world's light and palette**, then derive everything from it. Reason: palette and lighting are the hardest things to fix later - if every asset is authored against an agreed mood key, a hundred assets stay coherent. Characters made first tend to drag the whole game toward whatever colors happened to look nice that day.

So the order in this pack is:
1. **World mood key** (2 prompts) - the single image the whole game is graded against
2. **Character busts** (3 prompts) - human, ratkin, ogre; this defines "ugly-charming"
3. **Battle sprite test** (2 prompts) - the same characters at gameplay scale
4. **Environment tile test** (1 prompt + 1 optional) - proves the mood key survives contact with a hex tileset

**8 core prompts. That's the whole batch - we review before making more.**

### The look in one sentence

*Pixel art with the weight of an oil painting: Battle Brothers' grounded, dirty realism, drawn with Caves of Qud's willingness to be strange, lit and colored like The Banner Saga.*

### Line before noise: applies even where this older pixel spec is superseded

Think like a human draughtsperson: silhouette first, then one gesture line, then large connected
value masses, then only the identity details that survive the final crop. Texture must follow form,
material, light or motion. Random dots, all-over scratches, noisy dithering, fur-by-fur marks and
uniform micro-detail are AI noise, not finish. Leave quiet areas and allow deliberate irregularity in
line weight and edges. Judge every asset at its live size; if a detail disappears there, remove it
instead of sharpening it. Abstraction is a feature: give the player enough evidence to recognise
the subject and its intention, then let their imagination complete the image.

### Side before ornament: locked battlefield rule

All ordinary allied people and faction creatures use one large blue or teal garment mass. Hostile
versions use one large rust or red garment mass. Colour roughly a quarter to a third of the visible
body through a cloak, tabard, scarf, sash, coat panel or other major layer. The chosen layer may vary
by role so the company still looks scavenged and human. Never rely on a tiny badge, piping, outline,
weapon tint or eye colour to separate sides. Unique ununiformed beasts keep natural colour and read
through silhouette and placement.

### Palette rules

| Role | Colors | Where |
|------|--------|-------|
| **Base world** | Desaturated earth - mud brown, bone grey, wet slate, dead-grass ochre, bruised green | 85% of every frame |
| **Cloth accents** | Faded madder red, woad blue, dull mustard - pigments a poor medieval dyer could actually make | Clothing, banners, tents |
| **Metal** | Cold grey-blue, never chrome; rust orange on everything old | Weapons, armor |
| **Skin** | Sallow, weathered, veined; ratkin grey-pink; ogre grey-green mottled | Faces, hands |
| **THE WEIRD** | Saturated bile-green, hot magenta, sick gold - **the only saturated colors in the game** | Magic, artifacts, unnatural creatures |

**The rule that makes the game readable:** if it's saturated, it's dangerous or magical. A player should be able to spot the supernatural thing in any screenshot instantly, because it's the only thing with real color in it.

### Lighting

Overcast, low sun, weather that has opinions. Light comes from one direction and is *cold*; fire and the weird are the only warm sources. Heavy atmospheric perspective - distance goes pale grey-blue like Banner Saga.

### Character design rules

- **Humans are a bit ugly.** Asymmetric faces, broken noses, bad teeth, thinning hair, scars, squints, jowls. Nobody has a jawline. Beauty in this world is suspicious - save it for one or two NPCs and let it feel *wrong*.
- **Silhouette first.** Every unit must be identifiable as a black shape: ratkin = small, hunched, long tail; human = upright, medium; ogre = wide, top-heavy, tiny head.
- **Gear reads on the sprite.** Since armor is a separate mechanical layer, armor must be *visible* - a character in foundry-plate looks visibly different from one in rags.
- **Wear and damage.** Everything is repaired, patched, mismatched. Nobody's kit matches.
- **Allegiance is a garment layer.** Blue or teal marks allies; rust or red marks enemies. Keep the
  colour mass broad enough to read at delivery size while varying which garment carries it.
- **Size roughly signals danger.** At live battlefield scale, dogs read below ratkin, ratkin below
  humans, and humans below ogres and major armoured threats. Preserve exceptions only when an
  encounter deliberately weaponises misleading size.
- **Future sheets share one scale.** Use one ground line, camera and distance for mixed units. Never
  enlarge every subject to fill its own cell. Approval happens on one combined 1x contact sheet.

### Technical spec (locked so assets stay compatible)

| Asset type | Resolution | Notes |
|---|---|---|
| Bust portrait (dialog/roster) | **160×160 px** | Painted-pixel, chest-up, 3/4 view, plain dark vignette background |
| Battle sprite | **48×64 px** | Side-on 3/4, idle pose, transparent background, feet at bottom edge |
| Terrain tile | **64×56 px hex** | **Hexagonal** (pointy-top), seamless against neighbors, top-down 3/4 to match battle sprites. Battle grid is hex - see concept §14. Sprite feet sit on the hex center. |
| UI icon (item/resource) | **32×32 px** | Flat dark background or transparent |

Palette target: **~32-48 colors globally**, shared across all assets. Limited palette is what will make AI-generated pieces feel like one game.

### What we are NOT

Not clean fantasy. Not bright. Not anime. Not high-magic - no glowing swords, no floating runes, no wizards in pointy hats. Not chibi. Not 8-bit/NES-retro - this is *modern* pixel art with painterly shading.

---

## Part 2 - Prompt Pack #1 (copy-paste into Claude design)

> **Style block** - I've embedded this in every prompt below, but keep it handy; it's the thing that makes all future assets match:
>
> *"Dark medieval low-fantasy, desaturated earth-tone palette (mud brown, bone grey, wet slate, dull ochre), cold overcast lighting from one direction, line-led painterly art built from readable silhouettes and large connected shapes, grounded and dirty, no pointillist noise, no bright saturated colors except where magic is present."*

### 🎨 Group A - World mood key (do these first)

**Prompt A1 - The road (master mood key)**
```
A wide painterly pixel-art landscape of a dark medieval world: a muddy road cutting
through dead marshland under a heavy overcast sky. A ruined stone watchtower leans on
the horizon, crows on it. In the middle distance, five small ragged mercenaries walk
in single file, seen from behind, tiny against the land. Desaturated earth-tone
palette — mud brown, bone grey, wet slate, dull ochre, bruised green. Cold flat
light from a low sun behind clouds. Heavy atmospheric perspective, distance fading
to pale grey-blue. Melancholic, grounded, pre-gunpowder, low magic. Painterly pixel
art with confident connected strokes and restrained texture, in the spirit of Battle Brothers and The Banner Saga.
No bright or saturated colors anywhere. Wide 16:9 composition.
```

**Prompt A2 - The weird (proves the saturation rule)**
```
Same world, same painterly pixel-art style and desaturated earth-tone palette as
before: a small forest shrine at dusk, mossy stones, mud, bare crooked trees, all in
muted browns and greys. At the center, a single unnatural object — a hovering,
cracked stone idol leaking thick bile-green light that stains the mud around it.
The green glow is the ONLY saturated color in the entire image; everything else stays
desaturated and cold. Ominous, strange, quietly wrong — in the spirit of Caves of Qud's
weirdness inside a Battle Brothers world. Line-led painterly pixel art, large connected clusters,
cold overcast lighting. 16:9.
```

### 👤 Group B - Character busts (160×160 target)

**Prompt B1 - Human sellsword**
```
A pixel-art character bust portrait for a dark medieval tactical RPG. A middle-aged
human mercenary man, chest-up, three-quarter view. Deliberately ugly and ordinary:
broken nose, asymmetric face, bad teeth visible in a flat grim expression, thinning
greasy hair, stubble, a scar through one eyebrow, tired sunken eyes, no jawline.
Wearing a patched gambeson and a mismatched rusted iron pauldron on one shoulder only.
Desaturated earth-tone palette — sallow weathered skin, mud brown, faded madder red
cloth, cold rust-grey metal. Cold directional lighting from the upper left, dark
vignette background. Line-led painterly pixel art with large connected clusters, limited palette,
grounded and dirty. In the spirit of Battle Brothers character portraits.
No idealization, no heroism, no bright colors.
```

**Prompt B2 - Ratkin scout**
```
A pixel-art character bust portrait for a dark medieval tactical RPG. A ratkin — a
small humanoid rat person — chest-up, three-quarter view. Grey-pink patchy fur, long
naked snout, yellowed crooked incisors, torn notched ear, wet black darting eyes,
nervous hunched posture, thin clever hands visible at the edge of frame. Wearing a
scavenged leather hood and layered rags bound with cord, small stolen trinkets sewn
into the cloth. Desaturated earth-tone palette — grey-pink flesh, mud brown leather,
dull ochre rags. Cold directional lighting from the upper left, dark vignette
background. Line-led painterly pixel art with large connected clusters, limited palette. Grounded,
verminous, sympathetic-but-unsettling — not cartoonish, not cute. In the spirit of
Battle Brothers portraits with Caves of Qud strangeness.
```

**Prompt B3 - Ogre**
```
A pixel-art character bust portrait for a dark medieval tactical RPG. A huge ogre,
chest-up, three-quarter view, so massive the shoulders overflow the frame and the
head looks small on top of them. Mottled grey-green thick skin, heavy brow, small
dull eyes set deep, underbite with blunt tusks, old rope scars around the neck,
crude iron ring through the septum. Wearing chains and scavenged plate scraps
lashed over bare skin with rope — armor that was clearly made for something smaller.
Desaturated earth-tone palette — grey-green flesh, cold rust-grey metal, mud brown
rope. Cold directional lighting from the upper left, dark vignette background.
Line-led painterly pixel art with large connected clusters, limited palette. Slow, sad, dangerous.
Not a monster — a person. No bright colors.
```

### ⚔️ Group C - Battle sprite test (48×64 target)

**Prompt C1 - Sprite trio, same characters**
```
Pixel-art battle sprites for a tactical turn-based RPG, three characters side by side
on a transparent background, each in a neutral idle stance, side-on three-quarter view,
full body, feet aligned to the bottom:
1) a human mercenary in a patched gambeson with a sword and small round shield;
2) a small hunched ratkin scout with a dagger and long tail;
3) a huge wide top-heavy ogre in lashed-on scrap plate with a crude club.
Strong readable silhouettes, clearly different sizes and shapes — the ogre roughly
twice the ratkin's height and three times its width. Desaturated earth-tone palette
matching the portraits: mud brown, bone grey, wet slate, rust. Cold directional
lighting from upper left. Small-scale readable pixel art, limited palette, heavy
large connected pixel clusters, purposeful contour lines, clean edges. In the spirit of Battle Brothers and Wildermyth combat units.
No outlines glowing, no bright colors, no background.
```

**Prompt C2 - Enemy swarm test**
```
Pixel-art battle sprites for a tactical turn-based RPG: five small ratkin vermin
enemies on a transparent background, side-on three-quarter view, full body, idle
stances, arranged in a row. Each slightly different — one with a rusty spear, one
with a sling, one with a butcher's cleaver, one hunched and diseased, one larger
with a scavenged helmet. Mangy grey-brown fur, ragged cloth scraps, crude improvised
weapons. Same small readable scale, strong silhouettes, they should read as a cheap
disposable swarm. Desaturated earth-tone palette — mud brown, bone grey, dull ochre.
Cold directional lighting from upper left. Limited palette pixel art with heavy
large connected pixel clusters, purposeful contour lines, clean edges. No background, no bright colors.
```

### 🗺️ Group D - Environment test (hexagonal tiles, 64×56)

**Prompt D1 - Hex terrain tile set**
```
A pixel-art HEXAGONAL terrain tile set for a tactical turn-based RPG battle map,
top-down three-quarter perspective. Eight separate pointy-top hexagon tiles laid out
in a honeycomb arrangement, each hexagon a distinct terrain type: wet mud, dead
yellow grass, shallow marsh water, cracked cobblestone, bare dirt, a fallen mossy
log, a jagged rock outcrop, and a broken wooden fence post. Each tile must be a clean
regular hexagon that fits seamlessly against its six neighbors, with terrain detail
contained inside the hex shape. Desaturated earth-tone palette — mud brown, bone grey,
wet slate, dead-grass ochre, bruised green. Cold overcast lighting from the upper
left, soft shadows. Line-led painterly pixel art with large connected clusters, limited palette,
grounded and dirty. In the spirit of Battle Brothers hex battlefields. No bright or
saturated colors, no drawn grid outlines on the tiles themselves.
```

**Prompt D2 - Hex battlefield in context (optional, do only if D1 lands)**
```
A pixel-art tactical RPG battle scene viewed from a top-down three-quarter angle,
showing a hexagonal grid battlefield of wet marshland — mud, dead grass, shallow
water, a fallen log and scattered rocks laid out across visible hexagon tiles with
subtle thin tile borders. A few ragged mercenary units and small ratkin enemies stand
on individual hexes facing each other across the field. Desaturated earth-tone palette,
cold overcast lighting from upper left. Line-led painterly pixel art with large connected clusters,
limited palette. In the spirit of Battle Brothers combat screens. No UI elements,
no bright colors, no text.
```

---

## Part 3 - How to use this pack

1. Run **A1 first**. Iterate until the mood is right - this image is the reference for everything after it.
2. Once A1 is approved, run **A2** to verify the saturation rule reads.
3. Then **B1-B3**. Judge them on: *is this person plausibly ugly and tired? Would I recognize them in a roster of 20?*
4. Then **C1-C2** for gameplay readability. Squint at them - if silhouettes are ambiguous at squint distance, the sprite fails.
5. **D1** last, and hold it next to C1 to check the sprites don't disappear into the ground. Only run D2 if D1's hexes came out clean.

**What to bring back for review:** the pieces you like, the pieces that missed, and *why* they missed. We'll refine the style bible from real results, then move to Step 3 (core combat design) or a second art batch - your call.
