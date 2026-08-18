# Item pack 01: the bag's first three, and two blades. TEXT VERSION

*2026-08-18. The user: "давай сгенерим еще чуть артов: начни с текстовой версии". This file IS the
text version. Nothing here is built and nothing here is painted yet: it is the spec the art will be
painted FROM and the data the code will be built FROM, in that order, so that the two cannot drift.
The generator's task (the five here plus the whole existing rack) is `art/ITEM_ICONS_GPT_TASK.md`.*

*Revised the same day on his two notes: bleed became a STATUS (§2.4, §3) and rarity got its three
colours (§1).*

⚑ **Why this pack matters more than five icons.** The BAG slot has been on the company sheet since
#140 point 7, deliberately empty, with its own comment: *"the day a potion exists it needs no code
here."* Today is that day. The pilum, the shuriken and the cube are **the first three things in
the game that can go into the bag**, and the first consumables the game has ever had. That is why
the mechanics are written down here beside the art brief and not left for later: an icon of a
thing the engine cannot do is a promise the sheet already made once.

---

## 1. Rarity: three tiers, three colours, and every one of them lands somewhere

The user: *"Важно добавить для артов 3 уровня редкости (каждый из них куда-то должен попадать):
Обычный · Необычный · Эпик."* And then: *"We can make rarity color - standart, white, green, purple
accordingly."*

| tier | word | colour | what it means in THIS game | in this pack |
|---|---|---|---|---|
| **COMMON** | `COMMON` | **white** | the road hands it out. A merchant stocks it. Losing it costs a shrug | Pilum |
| **UNCOMMON** | `UNCOMMON` | **green** | one or two exist per run. Found, not bought | Shuriken · Thunder-fish Kris |
| **EPIC** | `EPIC` | **purple** | one exists. It has a place it comes from and a story attached | Time-Cube · Fingerprint Stone Shield |

⚠ **The user wrote "Legendary" for the shield. There is no fourth tier: Legendary IS Epic** here,
and the shield sits at the top of the three. If a fourth tier is ever wanted it is a separate ruling.

⚠ **Two of the five tiers were assigned by me, not by him**: the pilum as COMMON (a soldier's spear,
the plainest object in the pack) and the cube as EPIC (it is the only thing in the game that
DISAPPEARS after use, which is what "precious" means mechanically). Both are one word to change.

### What rarity is, and what it is not

⛔ **Rarity is not power.** A COMMON pilum kills a man. Rarity is **how often the road hands one
out**, and nothing else reads off it: no damage multiplier, no price formula. The day a tier starts
meaning "this one hits harder" it is a second receipt for the damage line, which is the one rule at
the top of `.claude/rules/event-cards.md` arriving on the stash.

### Where the colour goes, and where it does not

- **The colour is on the icon's FRAME in the game's UI**: the 40px box on the sheet slot and on
  the stash row (§4.1). It is an accent edge in the sense of `.claude/rules/ui-scales.md` §2 (an
  edge that SAYS something), so it is not on the `--e1..--e5` scale and must not be collapsed into
  it. **The word stays beside the colour** (`COMMON` / `UNCOMMON` / `EPIC` at `--fs1` on the
  tooltip and stash row): a colour alone is not a readout for a fifth of the players.
- ⚠ **Two collisions to measure before the hexes are picked**, since #102's rule is one colour,
  one meaning on one screen: **green** already means "approves" on this build (`#8ca35a`, the
  wedding's answer and the paid-up state), and **purple must sit far from the Bloom's magenta**,
  which is the corruption colour and the only hot colour in the world. Proposed starting points, to
  be checked on the running sheet and nowhere else: white `#cfc9b4` (the build's own bone-white),
  green `#5f9a4a` (cooler and darker than the approve-green so the two are not one), purple
  `#7d5fb8` (blue-side purple, no pink in it).
- ⛔ **The art carries no rarity mark.** ICON FORMAT says no frames, and a painted frame would be a
  receipt baked into a PNG. The tier lives in `GEAR[k].rarity` and the game draws the frame off
  that field, so a re-tiered item needs no repaint.

### Each tier lands somewhere = each item has a SOURCE

An item with no door that hands it out is a table row nobody meets. Proposed, from cards that
already exist:

| item | enters the game at | why there |
|---|---|---|
| Pilum | the Muster Field's armoury (`ARMOURY`) and common aftermath `LOOT` | it is soldier's kit; the muster is where soldiers' kit is |
| Shuriken | the Clan Cart (`ratcart`) or the Ratkin Snare (`snare`) haul | a small thrown blade in a pair reads as ratkin work |
| Thunder-fish Kris | The Last Ship (`shipwreck`) | a knife ground from a sea-creature's tusk belongs on a wreck |
| Time-Cube | a strange place: the Sitting Stone or the falling star | it is the one thing here that is not of this island |
| Fingerprint Stone Shield | The Sitting Stone (`ogrestone`) | a stone with a THUMBPRINT in it: an ogre pressed it. That is the whole object |

---

## 2. The five, as game data

Written in `GEAR{}`'s own shape so the row can be pasted. Fields that do not exist yet are marked
**NEW** and gathered in §3. Numbers are proposals against the shipped rack (gut-knife 11-16 ·
arming sword 16-24 · maul 27-41 · round shield dodge +9 · bow range 5 · boar spear reach 2).

### 2.1 Pilum · COMMON · bag

The user: *"бросается раз в ход. Дает существенный урон. Восстанавливается после сражения."*

```js
pilum  :{n:'Pilum',            slot:'bag',rarity:'common',
         throw:{range:3,dmg:[22,32],am:1.0,ft:.30,uses:1},      /* NEW: throw */
         d:'A soldier’s spear with a soft iron neck. It goes into a man or a shield and bends '+
           'there, and either way he is not getting it back to you. You are.'},
```

- **One throw a battle**, cost 1 action, range 3 (a bow's five would make the archer pointless;
  a boar spear's two would make it a jab). It hits like a two-hand maul's low end because that is
  what a two-pound spear thrown at ten paces does.
- ⚠ **Reading of "раз в ход" + "восстанавливается после сражения"**: one pilum, one throw, and it is
  in the enemy until the fight ends, then it is back in the bag. If he meant *every* turn, `uses`
  is the one number to change, and the damage comes down with it.
- `am:1.0`: armour matters fully. A pilum is the anti-armour throw of history; if it ignored armour
  it would be the best weapon in the game at COMMON.

### 2.2 Shuriken, a pair · UNCOMMON · bag

The user: *"В связке два (можно использовать дважды за бой). У этого противника в след. раз -1
действие. Необычный. В конце боя восстанавливается."*

```js
shuriken:{n:'Shuriken, a pair', slot:'bag',rarity:'uncommon',
         throw:{range:4,dmg:[5,9],am:.30,ft:.45,uses:2,slow:1},  /* NEW: throw, slow */
         d:'Two flat iron stars on a cord. They do not kill anybody. They go into a hand or a '+
           'foot, and the man spends his next turn finding out which.'},
```

- **Two throws a battle** (the pair), cost 1 action each, range 4, damage a scratch.
- **On a hit the target has -1 action on its next turn** (`slow:1`). ⚑ It reads off `t.actions`,
  which #156 already made a per-body field: two actions become one, one becomes zero. It does not
  stack across the two throws on one body (a second star on the same man refreshes, it does not
  make him miss the whole turn), because a 2-for-1 that deletes a body's turn is a stun, and the
  user asked for a slow.
- Both back in the bag when the fight ends.

### 2.3 The Time-Cube · EPIC · bag · vanishes

The user: *"Тайм куб (отсылка к Caves of Qud) - на два хода все враги на карте имеют 50% от своих
обычных действий. Используется раз за бой. После использования исчезает."*

```js
timecube:{n:'The Time-Cube',   slot:'bag',rarity:'epic',
         use:{cost:1,uses:1,burn:true,foeActs:.5,turns:2},           /* NEW: use */
         d:'A cube of grey stone that fits the palm, with a different hour scratched on each of '+
           'its four sides and nothing on the top or the bottom. Somebody was very sure about '+
           'something. Turn it over once and everyone who is not with you moves as if through '+
           'cold water, for two turns, and then it is not in your hand any more.'},
```

- Once a battle, cost 1 action, **every enemy on the field has half its actions for the next two
  enemy turns**: `Math.max(1,Math.floor(actions*.5))`, so the standard two-action body gets one and
  the `actions:1` bodies (the tavern brawlers) keep their one. ⚠ **That floor is my call**: at a
  literal 50% a one-action body gets half an action, and a floor of zero would freeze the tavern
  fight solid.
- **After use it is gone**: removed from the bag, not from the run's memory (a `latestFact` for
  #24, when #24 exists).
- The Qud wink is the four faces with four hours. It stays a wink: nothing on the island explains
  the cube, the way nothing explains the Cold Thing.

### 2.4 The Thunder-fish Kris · UNCOMMON · main hand · applies BLEEDING

The user: *"Крис из бивня рыбы - гром. Зазубренный нож. Урон как гат найф + кровотечение."* And,
on the revision: *"lets just add status 'bleed' for 2 turns. This status itself means 10% lose of
health each turn (5% for bosses)."*

```js
kris   :{n:'Thunder-fish Kris',slot:'main',rarity:'uncommon',
         dmg:[11,16],am:.40,ft:.45,reach:1,bleed:2,                    /* NEW: bleed = turns of BLEEDING */
         d:'A wavy blade ground out of one tusk, from a fish nobody on this coast has seen '+
           'whole. It goes in like a knife and comes out like a saw. What it opens does not '+
           'close by itself.'},
```

- Gut-knife's numbers exactly (`dmg:[11,16],am:.40,ft:.45`). **A hit that finds flesh puts the
  target under BLEEDING for 2 turns.**
- **BLEEDING is a STATUS, not a weapon field**, and it is defined once, beside POISONED, so the
  next thing that cuts (a graft, a beast, an event) applies the same status by name:

  | | |
  |---|---|
  | name on the field | `BLEEDING` (the same red as the blood, `#c15d55`, never poison's green) |
  | tick | **10% of max HP** at the start of the body's own turn, **5% on a boss** |
  | length | 2 turns; a fresh hit REFRESHES to 2, it does not stack to 4 or to 20% |
  | ends | when the count runs out, or when the body goes down |
  | armour | ⛔ armour does not bleed. The status is set only when the blow found flesh (`kind!=='arm'`, the #165 gate blood already uses) |

- ⚠ **"boss" is not a field the engine has.** Nothing on any template says `boss:true` today (the
  Fen-Mother is a template like the others). The 5% needs that flag written on the two or three
  bodies that earn it, and it is the one new field of the five that is a design decision rather
  than plumbing: *who counts as a boss* is his list.
- ⚑ The engine already has a bleed shape (`DESP_BLEED`, the desperation rule at 6% of hpMax a
  turn); BLEEDING is the same tick with its own count and its own cause. Two ticks that look the
  same on the field and are computed in two places is the second-source bug; write it once.
- ⚠ **"гром"**: read as the fish's name (a thunder-fish), so the kris is named for the animal and
  not for a sound. If he meant something else, the name is one word.

### 2.5 The Fingerprint Stone Shield · EPIC · both hands

The user: *"щит, требует двух рук. Дает большую броню, додж и при ударе отпихивает противника на 1
клетку. Урон достаточно низкий. Легендарное. Требует двух рук."*

```js
stoneshield:{n:'Fingerprint Stone Shield',slot:'main',rarity:'epic',hands:2,
         dmg:[8,13],am:.60,ft:.20,reach:1,armour:+30,dodge:+12,push:1,  /* armour on a weapon: NEW */
         d:'A slab of grey stone the size of a door, worn smooth, with a thumbprint pressed into '+
           'the middle of it as deep as your hand is long. Whoever left it did not need a shield. '+
           'You do, and it takes both arms to say so.'},
```

- ⚑ **It lives in the MAIN slot with `hands:2`**, not in the off hand. That is what "requires two
  hands" means on this sheet: `handsFree()` already empties the off hand for a two-handed main, and
  a shield that IS your weapon is exactly that shape. The off-hand slot cannot say "both hands".
- Big armour (`+30`, a padded jack's worth on top of whatever is worn), dodge above the round
  shield's +9, damage under the gut-knife, and **every hit shoves the target one hex** through the
  `push` machinery the kick and the halberd's shove already use.
- ⚠ **`armour` on a main-hand row is new**: today `armour` only lives on the armour slot and
  `armourValue(p)` reads only that. One line in `armourValue` sums the main hand's too. Written
  here so nobody ships the shield with a number that does not count.

---

## 3. What the engine has, and what it has to grow

| needed | exists today | what has to be built |
|---|---|---|
| a bag item that fires in battle | the BAG slot renders, empty (#140) | a **THROW / USE act** on the body's skill list, sourced from `GEAR[p.eq.bag]`, `cost:1`, with `range`, `dmg`, `uses` |
| uses per battle, restored after | nothing | `u.bagUses` set at `unitFrom`, decremented per throw, never persisted: it is a battle fact, and the item restores by construction |
| a thing that vanishes (`burn`) | nothing | on use: `p.eq.bag=null`, and it does NOT go to the stash |
| `slow:1` (-1 action next turn) | `t.actions` per body (#156) | a one-turn status that subtracts from `actionsMax` at the start of that body's next turn, then clears |
| all foes at 50% for two turns | same field | a battle-wide counter `B.foeSlow={turns:2,k:.5}` read where a body's actions are dealt |
| **the BLEEDING status** | `DESP_BLEED` ticks 6% at desperation; POISONED is the model for a counted status | `u.bleed` = turns left; tick 10% (5% boss) of hpMax at the start of the body's turn; set by a `bleed:` weapon on a flesh hit; refresh not stack; its own `fx()` line and its own mark on the token, in blood red |
| **`boss:true`** | nothing | one flag on the templates he names; read only by the tick above for now |
| shove on hit | `push:1` on kick and shove | the same resolution, fired from a `push:` field on the WEAPON instead of on the act |
| armour off a main-hand piece | `armourValue` reads the armour slot | sum the main hand's `armour` too |
| the tier | `hush` shows the renderers can be told what to print | `rarity` on the row; `gearLine`/`tipFor` print the word at `--fs1`; the icon frame takes the colour |

⛔ **The receipt rule applies to the bag.** A thrown pilum's damage is a number the battle prints;
the tooltip prints it once. `d:` carries no figure the fields already carry (`LINT` 6f's spirit,
even though 6f today reads only EVENTS and CAMPS).

⛔ **The arena is part of the gate.** Before any of these ships, `ARENA.match()` on the four
starting fights with a pilum in the Captain's bag, then with the cube, then the kris against a
two-action body: 10% a turn for two turns is a fifth of a man for one hit, and that number is the
one most likely to be wrong.

---

## 4. The art

### 4.1 Format, size, and where it lands

- **ICON FORMAT** from `docs/10_ART_ASSET_BIBLE_AND_PROMPTS.md` §3, verbatim: isolated object,
  transparent or flat neutral ground, upper-left light, no labels, numbers, frames or decorative
  background, large connected shapes, quiet negative space.
- **Master 128x128 per item, delivered as singles**, `ITEM-01_pilum.png` and so on. Same master
  size as the map sights (`.claude/rules/world-map-sights.md`), so `art/build_assets.ps1` needs one
  more folder and no new rule. Native alpha or `#ff00ff` chroma, either is accepted; the builder
  zeroes alpha below 40.
- **Display**: the sheet's slot is 150 wide and about 46 tall, and today the item's face is a
  15px text glyph (`.gg`, `--fs5`). ⚠ **A painting has no home at 15px.** The icon goes in at
  **40px** on the slot's left, and the stash rows get the same 40 or nothing. That is a layout change
  on the company sheet (#133's screen, 678px measured, no scroll) and it is measured before it is
  drawn. **The picture is not integrated until the box for it exists.**
- ⛔ **No frame, no glow, no sparkle in the file.** Rarity is a frame the GAME draws (§1). The
  Time-Cube is the one object allowed a single restrained accent, and it is on its FACES, not
  around it.

### 4.2 The five subject prompts

Assemble each as `[SUBJECT] + [ICON FORMAT] + [MASTER STYLE BLOCK] + [UNIVERSAL NEGATIVE BLOCK]`
from the bible §3. Palette key B, Dust & Gold, for all five: they are objects on a table, not scenes.
The same five prompts, beside the whole existing rack, are in `art/ITEM_ICONS_GPT_TASK.md`.

**ITEM-01 Pilum · COMMON**
```text
One Roman-style throwing spear, isolated: a long plain ash shaft, a thin soft-iron neck the length
of a forearm, and a small pyramidal point; the neck slightly bent from a previous throw and
hammered straight again. Old wood, cold grey iron with rust in the seams, one leather grip wrap
worn dark. Held nothing, laid diagonally. Plain soldier's kit, no ornament, no glow.
```

**ITEM-02 Shuriken, a pair · UNCOMMON**
```text
Two flat four-point iron throwing stars, hand-forged and slightly uneven, one lying half across
the other, joined by a short loop of dark waxed cord through their centre holes. Blackened forge
scale, bright only along the ground edges, one point chipped. Nothing decorative; they read as
tools made in a hurry by clever small hands.
```

**ITEM-03 The Time-Cube · EPIC**
```text
One palm-sized cube of grey stone, matte and slightly rounded at the edges as if handled for a
very long time, sitting on one face turned three-quarters to camera so three sides show. Each
visible side carries a different crude scratched sun-dial-like mark, no letters, no numerals; the
top face is blank. The scratches hold a faint, restrained sick-gold light as if lit from inside
the stone; the cube itself does not glow and casts an ordinary shadow. Cold overcast light. No
frame, no runes, no floating.
```

**ITEM-04 Thunder-fish Kris · UNCOMMON**
```text
One wavy-bladed knife ground from a single long ivory-coloured tusk, isolated: the blade a
serpentine kris shape with a serrated back edge like a saw, the natural curve and grain of the
tusk still readable, root end wrapped in tarred cord for a grip. Old bone-yellow ivory with grey
staining, no metal but a small iron ferrule. Damp, salt-worn, a fisherman's object not a jeweller's.
No glow.
```

**ITEM-05 Fingerprint Stone Shield · EPIC**
```text
One tall shield hewn from a single slab of grey stone the shape of a door, isolated and leaning
upright: the face worn smooth and pale, and pressed into its centre one enormous thumbprint, the
ridges of the print clearly readable and as deep as a hand. Two heavy iron staples and a leather
strap on the back edge just visible. Cold stone, dull iron, no carving, no ornament, no glow. It
must read as too heavy for one arm.
```

### 4.3 The eye check

A page under `shots/`, the shape of `shots/143_event_chips.html`: the five at their real **40px**
on the company sheet's own slot ground (`#221a10`) inside the three rarity frames, with the round
shield's and the gut-knife's current 15px glyphs beside them for scale, and one at 128 for the
record. **The pane composites nothing; the DOM and the contact sheet are the proof.** Then, once
the box exists, `LINT()` and the ui-scales §5 counters on the company sheet, against a
`git show HEAD:` baseline in a second tab.

---

## 5. Open, and his to answer

1. **"гром"** on the kris: the fish's name, or something else?
2. **Pilum**: one throw a battle (as written here), or a throw every turn?
3. **The cube's floor**: a one-action body keeps its one action at 50%. Yes?
4. **Who is a boss** (the 5% tick): the Fen-Mother, and who else?
5. **The sources in §1**: right doors, or different ones?
