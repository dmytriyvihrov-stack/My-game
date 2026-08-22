# TASK FOR THE IMAGE GENERATOR: the wagon card (#238)

**Six pictures: one painting and five tile icons.** Written 2026-08-23 for the wagon card that
opens from the road bar. Paste §2 after every prompt in §3. Nothing here needs the game open.

*The card works without any of these: the painting slot is not drawn until the painting exists,
and a tile shows its text glyph until its icon lands. So the order is free, and a partial
delivery is a shipping state.*

---

## 1. What the card is

RabbleBound is a dark, muddy, low-fantasy tactical game about a company of strangers on one
contract, on a rainy island. The company travels with **one cart and one mule that has outlived
several owners**. Between fights the player spends **salvage** (timber, iron, fittings pulled off
the road) to bolt things into that cart: a wider frame, a cot, a medicine chest, an iron fire-box,
a reliquary shelf. The card shows the cart at the top and five tiles under it, one per thing.

**Style, same as every painting in the game:** painted, not rendered; mud, rain, wet wood and
iron; low saturation with one warm accent; no text, no UI, no frames, no borders baked in.

## 2. The fixed suffix, appended to every prompt

> Painted illustration, dark low-fantasy, rain-soaked, muted earth palette with one warm accent,
> visible brushwork, no text, no watermark, no border, no frame, no people.

## 3. The subjects

### The painting: `EV-40_the-wagon.png`, final at exactly **586x212**

A heavy two-wheeled cart seen from three-quarters, standing on a wet road at dusk, a tired mule
in the traces looking back at the viewer. The bed carries a rolled canvas, a strapped barrel and a
folding iron fire-box, all lashed. Rain on the boards. **Nobody in the picture.** The cart fills
the right two-thirds; the left third is road and sky, because the card's title sits there.

Delivery: `art/src/stage-4/events/EV-40_the-wagon.png`. The pipeline is `art/build_assets.ps1`
then `art/inject.ps1` then `tools/build_site.ps1`; the key it produces is `EV40`, which is what
`WAGON_ART` in the prototype already reads. Nothing else to wire.

### The five tile icons: **128x128, alpha background, the item-icon style**

Same treatment as the 56 item icons in `art/ITEM_ICONS_GPT_TASK.md`: one object, centred, cut
out on transparency, lit from the upper left, shown at 56px on the card. Filenames and keys:

| file | key | the object |
|---|---|---|
| `ITEM-57_the-frame.png` | `ITEM57` | a cart wheel with a fresh pale-wood spoke among dark ones, and a short length of new bench timber leaning on it |
| `ITEM-58_the-bed.png` | `ITEM58` | a folded canvas cot on a wooden frame with one leather strap buckled across it |
| `ITEM-59_the-medicine-chest.png` | `ITEM59` | a small iron-bound chest, lid half open, a stoppered jar and a roll of linen inside |
| `ITEM-60_the-cook-fire.png` | `ITEM60` | a squat iron fire-box with a hinged door, a little light showing through the slots |
| `ITEM-61_the-reliquary.png` | `ITEM61` | a narrow wooden shelf with a dark curtain half drawn across whatever is on it |

Delivery: `art/src/items/`, same pipeline as the rest of the items. The prototype's `ITEM_ICON`
already maps `wagon_frame`, `wagon_bed`, `wagon_aid`, `wagon_fire`, `wagon_shrine` to these five
keys, so the day the files are embedded the tiles pick them up with no code change.

## 4. What not to do

- no people, no company members, no hands holding things
- no numbers, no text, no rarity frames: the game draws what it needs around the picture
- do not make the five icons a matched set with identical framing; each is an object on its own
