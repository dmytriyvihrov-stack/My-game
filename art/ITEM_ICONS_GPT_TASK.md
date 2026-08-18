# TASK FOR THE IMAGE GENERATOR: every item in RabbleBound as a painted icon

**Read this whole file, then work through §6 one item at a time.** It is written to be pasted into
ChatGPT (GPT Image) in pieces: §3 is the fixed suffix you append to every prompt, §6 is the list of
subjects. Nothing here needs the game open.

*Written 2026-08-18. The five newest items are specced in `art/ITEM_PACK_01_TEXT.md`; the rest of
the rack is read straight off the game's `GEAR{}` table (51 pieces). Where this file and the game's
prose disagree about what an object IS, the game wins; ask.*

---

## 1. What this is for

RabbleBound is a dark, muddy, low-fantasy tactical game about a company of strangers on one
contract, on a rainy island called Grimtoll: humans, ratkin (small wiry rat-people) and ogres (huge
grey-skinned people). Every piece of kit on the company sheet is shown today as a **text glyph 15px
tall** (⚔ ⛊ ✧). This task replaces those glyphs with **one painted icon per item**, shown at
**40 pixels** on the sheet and in the stash.

**56 icons in total**: 5 new items and the 51 already in the game, in five families.

| family | count | what it is |
|---|---|---|
| BAG (new) | 3 | the first throwables and consumables the game has had |
| MAIN HAND | 15 | 13 weapons in the game + 2 new blades |
| OFF HAND | 7 | shields, quiver, dirk, focus |
| ARMOUR | 13 | worn kit, from rags to a wardrobe |
| TRINKET | 18 | strange small objects, some company relics |

---

## 2. The hard rules, and why each one is hard

1. **One object per image, isolated, on a TRANSPARENT background** (or flat `#ff00ff` magenta if
   the tool cannot do alpha; the build script strips it). ⛔ No table, no cloth under it, no
   scene, no shadow beyond a small contact shadow.
2. **No frame, no border, no glow, no sparkle, no rarity colour.** The game has three rarity tiers
   (common / uncommon / epic, drawn as a white / green / purple FRAME) and **the game draws that
   frame itself**, off a data field. A frame or a glow baked into the PNG would be wrong the day
   the tier changes, and it would clash with the frame drawn around it. The only permitted glow in
   the whole set is on the Time-Cube's scratched faces (§6, and it is faint) and on the Bloom-Stem.
3. **It must read at 40 pixels.** Big connected shapes, one strong silhouette, two to five value
   masses, no micro-detail. If a detail dies at 40px, delete it rather than sharpen it. Test by
   shrinking your own output to 40px before you call it done.
4. **No text, letters, numbers, runes, symbols or writing anywhere**, including on the coin, the
   token, the ledger-pin and the Roll of Names. Writing at 40px is noise, and the game's rule is
   that pictures do not carry text.
5. **Grounded, used, repaired.** Everything is patched, rusted, wrapped in cord, dented, tarred.
   Nothing is shiny, heroic, jewelled or new. Bone-grey, mud-brown, wet-slate, dull ochre, old iron.
   Colour is allowed only where the subject line names it.
6. **Same camera and light for the whole set**: three-quarter view from slightly above, light from
   the upper left, so fifty-six icons look like one rack and not fifty-six pictures.
7. **Same scale logic**: scale by *gameplay footprint*, not by real length. A dagger and a maul are
   the same visual weight in their squares; a trinket fills its square as much as a shield does.
8. **Delivery per item: PNG, exactly 128x128, transparent**, named as in §6 (`ITEM-04_thunder-fish-kris.png`).
   Plus **one contact sheet** of all 56 at 40px on a `#221a10` ground, for the eye check.
9. **Ratkin are rat-people, not goblins; ogres are grey people, not monsters.** No object here has
   a body attached, but if a hand appears for scale it obeys that.
10. **Generate new; do not restyle the current text glyphs or any existing painting.**

---

## 3. The fixed suffix: append this to EVERY prompt, after the subject line

Copy the three blocks in this order. They are the game's own style contract from
`docs/10_ART_ASSET_BIBLE_AND_PROMPTS.md` §3, with the lines about people, weather haze and scenes
taken out because these are isolated objects; nothing was added.

**ICON FORMAT**
```text
Production icon on a transparent background. One isolated object, identical scale logic and
upper-left light across the set, clear silhouette at 32-64 pixels, no labels, numbers, frames or
decorative background. Use large connected shapes, purposeful line weight and quiet negative space;
remove any detail that vanishes at delivery size. Three-quarter view from slightly above.
```

**MASTER STYLE BLOCK**
```text
Painted digital illustration for a dark pre-gunpowder low-fantasy tactical RPG. Grounded but
expressive medieval material design with confident connected linework, visible directional brush
strokes, matte surfaces and strong value grouping. Construct the image from silhouette, gesture and
large connected shapes before adding selective detail. Do not enforce strict photographic realism:
simplify secondary detail, exaggerate useful silhouettes and let colour and atmosphere carry emotion.
Base the image in an earth palette: mud brown, bone grey, wet slate, dead-grass ochre and bruised
green, but permit one deliberately chosen, story-bearing area of bright colour when the subject
calls for it. Cold directional light through overcast weather, deep but readable shadows. Armour
mismatched and repaired, metal cold grey-blue with old rust. Quiet melancholy with dry human
absurdity. One clear focal subject and a readable silhouette. Leave deliberate quiet areas. Texture
must follow form, material, light or motion rather than filling empty space. The world is dirty and
used, never decorative fantasy.
```

**UNIVERSAL NEGATIVE BLOCK**
```text
No readable text, letters, numbers, logo, caption, border, card frame, interface, watermark or
signature. No guns, modern objects, polished chrome armour, pristine costume, glowing sword,
floating runes, heroic pose, anime, chibi, comic outline, plastic 3D render, oversaturation,
teal-and-orange grading or indiscriminate magical glow. No pointillist AI noise, random speckles,
all-over scratches, decorative micro-buckles, uniform detail density or sharpening used to rescue
a weak silhouette. Keep equipment functional.
```

⚠ **One object in §6 overrides "no guns" on purpose** (ITEM-13, the Wood-Stick). Read its line.

---

## 4. How to prompt one item

```text
[the subject line from §6]
[ICON FORMAT]
[MASTER STYLE BLOCK]
[UNIVERSAL NEGATIVE BLOCK]
```

Then: shrink to 40px, look, and if the silhouette is mush, take detail OUT and go again. Do the
five new ones first (they are the ones being waited on), then the shields and weapons (the biggest
shapes, the easiest wins), then the trinkets last (they are the hardest to make read at 40px).

---

## 5. Where the files go

`art/src/items/ITEM-NN_slug.png`, 128x128, plus `art/src/items/CONTACT_SHEET.png`. The build script
picks up the prefix and makes the runtime key (`ITEM-04` -> `ITEM04`). Nothing else is needed from
the generator side.

---

## 6. The fifty-six, with a subject line each

Numbering is stable: **do not renumber if you skip one.** The name in bold is what the player reads
in the game; the line under it is what to paint. Family headers are for you; they are not in the
image.

### BAG (new) - the first throwables

**ITEM-01 · Pilum** *(new, common)*
```text
One Roman-style throwing spear, isolated: a long plain ash shaft, a thin soft-iron neck the length
of a forearm, and a small pyramidal point; the neck slightly bent from a previous throw and
hammered straight again. Old wood, cold grey iron with rust in the seams, one leather grip wrap
worn dark. Laid diagonally. Plain soldier's kit, no ornament, no glow.
```

**ITEM-02 · Shuriken, a pair** *(new, uncommon)*
```text
Two flat four-point iron throwing stars, hand-forged and slightly uneven, one lying half across
the other, joined by a short loop of dark waxed cord through their centre holes. Blackened forge
scale, bright only along the ground edges, one point chipped. Nothing decorative; they read as
tools made in a hurry by clever small hands.
```

**ITEM-03 · The Time-Cube** *(new, epic, the one object with a faint inner light)*
```text
One palm-sized cube of grey stone, matte and slightly rounded at the edges as if handled for a
very long time, sitting on one face turned three-quarters to camera so three sides show. Each
visible side carries a different crude scratched sun-dial-like mark, no letters, no numerals; the
top face is blank. The scratches hold a faint, restrained sick-gold light as if lit from inside
the stone; the cube itself does not glow and casts an ordinary small shadow. No frame, no runes,
no floating.
```

### MAIN HAND - the two new blades

**ITEM-04 · Thunder-fish Kris** *(new, uncommon)*
```text
One wavy-bladed knife ground from a single long ivory-coloured tusk, isolated: the blade a
serpentine kris shape with a serrated back edge like a saw, the natural curve and grain of the
tusk still readable, root end wrapped in tarred cord for a grip. Old bone-yellow ivory with grey
staining, no metal but a small iron ferrule. Damp, salt-worn, a fisherman's object not a jeweller's.
No glow.
```

**ITEM-05 · Fingerprint Stone Shield** *(new, epic; a shield that is held in both hands as a weapon)*
```text
One tall shield hewn from a single slab of grey stone the shape of a door, isolated and leaning
upright: the face worn smooth and pale, and pressed into its centre one enormous thumbprint, the
ridges of the print clearly readable and as deep as a hand. Two heavy iron staples and a leather
strap on the back edge just visible. Cold stone, dull iron, no carving, no ornament, no glow. It
must read as too heavy for one arm.
```

### MAIN HAND - the thirteen already in the game

**ITEM-06 · Fence-post cudgel**
```text
One length of split fence post used as a club, isolated: grey weathered wood, one end still
carrying a bent rusted nail and a scrap of wire, the grip end darkened by hands. Nothing made
about it; it was a fence yesterday.
```

**ITEM-07 · Arming sword**
```text
One plain single-hand medieval arming sword, isolated: straight double-edged blade with a shallow
fuller, simple straight cross-guard, wheel pommel, grip wrapped in dark cord. Old grey steel with
a few nicks along one edge, no shine, no engraving.
```

**ITEM-08 · Short sword**
```text
One short broad single-hand sword, isolated: a blade the length of a forearm, plain iron guard,
wooden grip worn pale, leather-wrapped scabbard-less. Workmanlike, dented, no ornament.
```

**ITEM-09 · Boar spear**
```text
One boar spear, isolated: long ash shaft, broad leaf-shaped iron head with a short iron cross-bar
(lugs) just below the blade to stop a charging animal, the shaft bound with cord where it has
split. Grey iron, dark wood, no ornament.
```

**ITEM-10 · Halberd**
```text
One halberd, isolated: a long shaft with an axe blade on one side, a curved iron hook on the back,
and a spear point on top; the whole head crude and hand-forged, riveted to the shaft with two iron
langets. It reads as a spear that grew an axe. Rust in the corners, no polish.
```

**ITEM-11 · Warclub**
```text
One heavy two-hand warclub, isolated: a thick knotted length of dark hardwood, the striking end
swollen and studded with a few square iron nails, grip bound in rawhide. Ogre-sized, brutal,
plain.
```

**ITEM-12 · Two-hand maul**
```text
One two-hand maul, isolated: a long shaft topped by a squared iron sledge head, one face
mushroomed from use, the shaft reinforced with iron bands near the head. Heavy, grey, no ornament.
```

**ITEM-13 · The Wood-Stick With Two Holes** *(⚠ overrides "no guns": it IS a musket, but nobody on the island knows the word)*
```text
One long dark wooden object, heavier at one end, isolated: it is in truth an old matchlock musket
lying diagonally, but paint it as the company sees it, a strange heavy stick with a broad wooden
butt at one end and a long iron tube along the top; two round holes visible, one at each end, the
far one black inside. Old wood, blackened iron, a burn mark near one hole. It must not read as
a modern gun and must not carry any mechanism detail: a wooden club with an iron pipe on it.
```

**ITEM-14 · A broom**
```text
One old household broom, isolated: a long rough pole with a bound head of birch twigs, the twigs
splayed and worn short on one side from sweeping. Held as if it were a weapon, which is the joke.
Dull straw and grey wood, no ornament.
```

**ITEM-15 · Gut-knife**
```text
One short ugly working knife, isolated: a broad slightly curved blade the length of a hand,
sharpened on one side, wooden scale grip riveted with two pins, the blade stained dark near the
handle. A butcher's tool, not a fighter's.
```

**ITEM-16 · Hunting bow**
```text
One plain self bow, isolated: a single stave of pale yew with the bark left on the back, strung,
handle wrapped in leather, one nocked arrow beside it. Slightly asymmetric, well used, no
ornament.
```

**ITEM-17 · Working stave** *(a caster's stick)*
```text
One stripped ash pole the height of a man, isolated: the whole length rubbed white with chalk in
uneven bands, the top hand-span burnt black and split. No crystal, no carving, no runes: a burnt
chalky stick that has clearly been used for something other than walking.
```

**ITEM-18 · The Weeping Hammer** *(the one weapon allowed a barely damp surface)*
```text
One heavy two-hand war hammer, isolated: a squared iron head with a blunt striking face and a short
spike opposite, dark oak shaft with an iron collar. The head's surface faintly beaded with moisture
as if sweating in cold air, a single drop at the lowest corner. No glow, no light, no colour beyond
wet dark iron.
```

### OFF HAND - seven

**ITEM-19 · Round shield**
```text
One round wooden shield, isolated, three-quarter view: planked face painted a faded dull red long
ago and mostly worn back to wood, an iron boss at the centre, a rawhide rim, two arrow-cuts in the
face. Plain, repaired, no heraldry.
```

**ITEM-20 · Buckler**
```text
One small round iron buckler the size of a plate, isolated: a domed centre with a fist-grip behind
it, hammered rim, dents and one bright scar. Small, hard, plain.
```

**ITEM-21 · Barrel-lid shield**
```text
One barrel lid used as a shield, isolated: a round of stave-planks held by two iron hoops, a rope
handle nailed to the back, the wood stained dark by whatever the barrel held. It is obviously a
barrel lid.
```

**ITEM-22 · Pan-lid**
```text
One large iron cooking-pot lid used as a shield, isolated: a domed disc with a ring handle on top,
soot black on one side, one dent, one bright hammer mark. It is obviously a pan lid.
```

**ITEM-23 · Full quiver**
```text
One leather quiver stuffed with arrows, isolated: a tube of stitched dark leather with a shoulder
strap, twenty grey-goose-fletched arrows standing in it, the fletching neat, the leather scuffed.
No ornament.
```

**ITEM-24 · Off-hand dirk**
```text
One short ugly dirk, isolated: a narrow straight blade the length of a hand, no guard, a wooden
grip wound with wire, the blade blackened except at the edge. Mean and plain.
```

**ITEM-25 · Chalk-and-cord rod** *(a caster's off-hand focus)*
```text
One short stick a forearm long, isolated: pale wood chalked white and bound end to end with dark
cord in tight bands, the cord frayed. Nothing glows. It is something to hold onto.
```

### ARMOUR - thirteen, shown WITHOUT a body

**ITEM-26 · Rags and rope**
```text
A bundle of grey rags bound around a torso shape with hairy rope, isolated, empty of a body:
layered sacking, a rope belt, frayed ends. The poorest thing a person can wear.
```

**ITEM-27 · Cook-pot and straps**
```text
One dented iron stew-pot worn as a helmet with a leather chin-strap riveted to it, isolated,
sitting on top of a short quilted jerkin arranged as if hanging on a peg. Soot on the pot, no
crest.
```

**ITEM-28 · Door-plank harness**
```text
Somebody's front door in three pieces, isolated: two planks with the old paint half gone and one
iron hinge still on, strapped together with leather into a crude breastplate shape, no body in it.
Human-sized, absurd, functional.
```

**ITEM-29 · Scrap harness** *(ratkin-sized)*
```text
A small harness of scrap, isolated, empty: bits of tin, a strip of mail, a boiled-leather plate
and a buckle, all sewn onto a hide vest sized for a body the height of a child. Mismatched, tied
with string.
```

**ITEM-30 · Stitched hides** *(ogre-sized)*
```text
A huge vest of thick animal hides, isolated, empty: several hides stitched together with sinew,
hair still on in patches, the whole thing wide enough for a body twice a man's width. Brown-grey,
heavy, plain.
```

**ITEM-31 · Padded jack**
```text
One padded linen jack, isolated, empty: a quilted knee-length coat with vertical stitching, dull
undyed cloth grey with wear, a few stitched patches, ties down the front. Plain infantry armour.
```

**ITEM-32 · Mail hauberk**
```text
One knee-length mail hauberk, isolated, empty, hanging: dark grey riveted rings, rusted at the
hem and cuffs, a few rings replaced with brighter ones. Heavy, real, no ornament.
```

**ITEM-33 · Foundry plate**
```text
One crude breastplate and back of hammered black iron, isolated, empty: thick, slightly uneven
plates with visible hammer marks, riveted straps, no fluting or etching. Blunt foundry work, not a
knight's harness.
```

**ITEM-34 · Rat-silk shroud** *(ratkin-sized)*
```text
One small hooded wrap of layered grey silk-like cloth, isolated, empty: fine, dense, slightly
translucent at the edges, hood up, sized for a body the height of a child. Quiet, no ornament, no
glow.
```

**ITEM-35 · Lashed plates** *(ogre-sized)*
```text
Broad rectangular iron plates lashed together with rope and rawhide into a huge chest piece,
isolated, empty: the plates overlapping unevenly, rope crossing in front. Grey iron, tarred rope,
made for a body twice a man's width.
```

**ITEM-36 · Ogre scale** *(ogre-sized)*
```text
One enormous coat of overlapping iron scales on a hide backing, isolated, empty: rows of dull grey
scales the size of a palm, some rusted, some replaced with bronze, the whole thing sized for a
body twice a man's width. Heavy, dark, no ornament.
```

**ITEM-37 · A wardrobe**
```text
One wooden wardrobe worn as armour, isolated, empty of its ogre: a tall plain cupboard with the
doors removed and two rough arm-holes cut in the sides, a rope strap through the top. It is
obviously a piece of furniture. Dark varnished wood, one drawer still in.
```

**ITEM-38 · Bucket, worn**
```text
One dented wooden bucket with an iron rim and handle, isolated, sitting upside down as if on a
head, two rough eye-slits cut into the side. That is the whole armour. Grey wood, rust rim.
```

### TRINKET - eighteen small objects, and these are the hardest at 40px

**ITEM-39 · The Toll-Man's Boots**
```text
One pair of good tall leather boots, isolated, standing: dark brown, waxed, hardly worn, a little
mud on the soles. They look better than anything else the company owns, and that is the point.
No ornament, no glow.
```

**ITEM-40 · The Mirrored Sphere**
```text
One hanging ball the size of a head covered in a thousand tiny mirror shards, isolated, on a short
chain: many of the shards cracked or missing, the light broken across it in cold grey flecks. Not
glowing; reflecting. It is a disco ball found in a ruin and nobody has the word for it.
```

**ITEM-41 · Saint's Fingerbone**
```text
One small human finger bone in a plain tarnished pewter reliquary tube with a glass window,
isolated: the bone yellowed, the tube dented, a leather thong through the cap. Faintly warm-toned
against cold surroundings, but no glow.
```

**ITEM-42 · Bloom-Stem** *(the ONE object allowed the Bloom's hot magenta)*
```text
One short cut plant stem the length of a finger, isolated: dark near-black green flesh with a wet
sheen, and a restrained hot magenta light bleeding out of the cut end and the veins, the only
saturated colour in the image. No flower, no leaves, no source for the light.
```

**ITEM-43 · Glass Apple**
```text
One apple made entirely of cloudy grey-green glass, isolated: apple-shaped, with a stalk of the
same glass, a small chip out of one side, cold light passing through it. Not glowing. A fruit that
died standing.
```

**ITEM-44 · Brass Token**
```text
One worn brass disc the size of a coin with a hole punched near the edge and a plain stamped
mark worn almost smooth, isolated: dull yellow brass with dark tarnish. No letters, no numbers, no
face; the mark is a simple abstract shape only.
```

**ITEM-45 · The Company Banner**
```text
One ragged company banner furled around a short pole, isolated: the cloth clearly stitched from
three different older flags in three faded colours (dull red, dull blue, mustard), the seams
crooked, the pole plain wood. No device, no letters.
```

**ITEM-46 · Marching Drum**
```text
One small side drum, isolated: a wooden shell painted a faded dull ochre and worn back to wood in
patches, rope tensioning, two plain drumsticks laid across the head. No device.
```

**ITEM-47 · Fen-Mother's Tooth**
```text
One enormous curved tooth longer than a hand, isolated: yellow-grey enamel, the root still dark
and wet-looking, a crack down one side. It plainly came out of something too big. No glow.
```

**ITEM-48 · Pedlar's Charm**
```text
One cheap charm on a cord, isolated: a small carved wooden fish or knot, worn smooth, a bead of
blue glass and a bent copper coin threaded beside it. Trinket-market rubbish. No glow.
```

**ITEM-49 · Rat-King's Knuckle**
```text
One small yellowed knuckle bone, isolated, far too clean, on a fine cord: the bone slightly
crowned in shape at one end as if worn as a ring by something. Very small, very plain, no glow.
```

**ITEM-50 · Rosined String**
```text
One coil of fiddle string, isolated: dark gut string wound into a small coil and tied, dusted
white with rosin, one end fraying. Nothing else. No instrument.
```

**ITEM-51 · Foundry Ledger-Pin**
```text
One long iron pin the length of a finger with a flattened, stamped head, isolated: the kind used
to spike receipts together, dark iron, a scrap of torn paper still on it (no readable writing, just
a torn corner). Plain, clerical.
```

**ITEM-52 · Cub's Milk-Tooth**
```text
One tiny animal milk-tooth on a thread, isolated: white, pointed, small enough to lose, knotted
into a fine leather cord. Almost nothing, and that is the picture.
```

**ITEM-53 · The Cold Thing** *(⚠ it must NOT reveal what it is)*
```text
One hand-length of black metal, isolated: a straight, slightly tapered bar with one machined-looking
edge and one rough broken end, matte black with a faint frost bloom on its surface as if colder than
the air. No writing, no glow, no recognisable shape: it must not read as a blade, a bullet, a tool
or anything nameable.
```

**ITEM-54 · The Ground-Glass Eyes**
```text
One pair of crude spectacles, isolated: two round discs of ground glass in a bent iron wire frame,
the wire twisted by hand, one lens cracked, the glass slightly cloudy. Sitting folded. No glow.
```

**ITEM-55 · An Unusual Coin**
```text
One worn coin of an unfamiliar dull silver-grey metal, isolated, three-quarter view: thick, slightly
irregular, both faces worn almost blank with only the faintest suggestion of a shape, no letters,
no numbers, no head. It should look pleasant to hold and impossible to place.
```

**ITEM-56 · The Roll of Names**
```text
One strip of undyed linen folded eight times into a small tight packet and tied with thread,
isolated: the cloth greyed, the folds soft, a corner lifted to show ink marks inside that are
suggestion only, no readable writing. Small, worn, private.
```

---

## 7. When it is done

- 56 PNGs at 128x128 with alpha, named as above, in `art/src/items/`.
- One contact sheet of all 56 at 40px on `#221a10`.
- A note of any prompt that had to change materially, so `art/ITEM_PACK_01_TEXT.md` §4.2 can be
  kept honest.

The build side (the 40px box on the sheet, the rarity frame, the bag mechanics) is the game's own
job and is written in `art/ITEM_PACK_01_TEXT.md` §3-§4. Nothing about it needs to be right for the
paintings to be made.
