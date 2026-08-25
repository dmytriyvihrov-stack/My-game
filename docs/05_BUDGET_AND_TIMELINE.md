# Budget & Timeline - art spend and the road to a first playable

> Written 2026-07-29, at the user's request. Estimates, not quotes. Rates are 2026 freelance
> market ranges in USD; the low end of each band is realistic for Eastern European, LATAM and
> SEA artists, which is where most indies in this genre actually hire.
>
> Two things this document assumes and states plainly: **music is free** (the user's brother is
> doing it - that is a $3–8k line item already off the board), and **the design is not locked
> yet**, which is the single biggest factor in when art money should be spent.

---

## 1. The framing that matters most

The user's instinct is correct: *"people don't want general generated AI plain things, they
want more personality."* But it is worth being precise about **where personality actually comes
from**, because it changes what you pay for.

Personality in this genre is a **concept** win, not a **render-quality** win.

The things that will make RabbleBound memorable are already written down in
`01_GAME_CONCEPT.md`, and none of them require expensive art:

- A wardrobe with the doors off and arm-holes cut is legitimate ogre armour (96 armour, −3 AGI).
- A bucket is 12 armour and there is no rest of the armour.
- A broom has reach 2 and is humiliating for everyone involved.
- A ratkin in human mail *"is entirely inside it. When he stops moving it stands up on its own
  and he has to be found."*
- Humans are deliberately a bit ugly - bad teeth, broken noses. Beauty is suspicious here.

**That is the differentiator, and it is free.** A competent mid-tier artist rendering *those
ideas* beats a top-tier artist rendering generic dark-fantasy mercenaries. What reads as "AI
slop" to an audience is almost never brushwork quality - it is **absence of specific ideas**:
symmetrical pretty faces, generic armour, no jokes, no wear, nothing that could only exist in
this one world.

**Standing visual acceptance rule: line before noise.** Ask for a readable silhouette, one clear
gesture and a few connected value masses before surface finish. Every stroke must describe form,
material, light or motion and remain visible at the final use size. Reject random speckles,
all-over scratches, fur-by-fur rendering and uniform micro-detail. Human-made character comes from
chosen line weight, asymmetry, rhythm and omission, not from filling every surface. The image should
suggest the person or creature and leave the unstated detail for the player's imagination.

So the budget below is structured around **buying consistency and buying the hero assets**, not
around buying volume.

---

## 2. Asset inventory - what MVP Act 1 actually needs

Derived from the MVP definition in `01_GAME_CONCEPT.md` §12 and the current prototype contents.

| Family | Count | Notes |
|---|---|---|
| **Named-cast portraits** | 6–8 | Captain, Vesna, Marrow, Skree, Bruht, Pell (+ spares). Highest visibility - seen every run. |
| **Generic roster portraits** | 15–25 | Randomly-rolled recruits across 3 races. Needs variety or the roster feels repetitive. |
| **Battle sprites / tokens** | ~30 | 10–12 player-side, 12–15 enemy types, Fen-Mother (two-hex), cub, pet. |
| **Event illustrations** | ~25 | 17 floating + fixed events. **These are what people screenshot and post.** |
| **Gear / item icons** | 40–60 | The funny gear list lives or dies here. |
| **Perk / status icons** | ~30 | Small, repetitive, cheap. |
| **Terrain, hex tiles, props** | 3–4 biome sets | Fen, ridge, road, tavern interior. |
| **UI kit** | 1 pass | Frames, panels, buttons applied to existing layouts. |
| **Key art + Steam capsule** | 1 set | The single highest-ROI asset you will ever buy. |

**Total distinct pieces: roughly 150–200.**

At full custom rates ($150–350 per illustration, $80–250 per portrait), that is **$30–50k**.
That number is why the AI-assist + human-paintover model exists, and why the tiers below are
built around it.

---

## 3. Three budget tiers

### Tier 0 - "Enough to not embarrass yourself sharing on Discord"
### **$0 - and this is the correct answer right now**

The user's stated concern was needing human touch *"even before sharing stuff with Discord."*
Push back on this, gently but firmly:

**Indie dev communities do not punish placeholder art. They punish dishonesty.** Sharing a WIP
build with obviously-placeholder or clearly-labelled AI-assisted art is completely normal and
completely accepted on r/gamedev, indie Discords, TIGSource and devlogs. What triggers backlash
is *polished-looking AI art presented as final art*, especially on a storefront.

So: label it honestly ("placeholder art, hiring an artist once the design settles"), and share
now, for free. The feedback you need at this stage is about **the fights and the events**, not
the pictures. Spending art money before playtest validation is the classic solo-dev mistake -
if the roster, races or classes change after playtesting, every portrait you commissioned is
thrown away.

### Tier 1 - "Style lock + hero assets" (the first money you should spend)
### **$2,500 – $5,800**

Hire **one** artist. The goal is not volume - it is a **locked, reproducible target** that you
(or AI-assist, or a cheaper artist later) can match.

| Item | Range | Why |
|---|---|---|
| Style bible / visual target sheet | $400 – $900 | Palette, brushwork, lighting, face rules, "what ugly means here". Reusable forever. |
| Key art + Steam capsule variants | $600 – $1,500 | **Do not cheap out.** This is your wishlist-conversion asset. |
| 6–8 named-cast portraits | $150–250 ea → $900 – $2,000 | Seen every single run. |
| 3–4 signature event scenes | $200–350 ea → $600 – $1,400 | Fen-Mother, the tavern, the clash, the snare. |

### Tier 2 - "Steam-page ready Act 1 demo"
### **$6,500 – $14,000** (includes Tier 1)

Adds the volume layer, using AI-assist + human paintover at **$30–70 per asset**:

| Item | Range |
|---|---|
| ~20 remaining event scenes | $1,000 – $1,600 |
| ~15 enemy sprites | $600 – $1,050 |
| ~15 additional roster portraits | $600 – $1,050 |
| ~60 gear + perk icons | $720 – $1,500 |
| Terrain / hex tiles / props | $400 – $800 |
| UI kit pass | $700 – $2,000 |

**This is the realistic target number for a credible Steam demo.**

### Tier 3 - "Distinctive enough that people recognise a screenshot"
### **$25,000 – $45,000**

One dedicated artist, part-time, 6–9 months, everything hand-made, some animation. Only justify
this **after** wishlist data proves the game has an audience. Do not start here.

---

## 4. The AI disclosure reality - plan for this now

Valve requires developers to disclose AI-generated content in the Steam content survey, and
store pages display an **AI Generated Content Disclosure** section publicly. (Introduced Jan
2024 - verify current wording before you submit, storefront policies move.)

This is a real strategic constraint, not a footnote:

- The disclosure is **public-facing**. Some portion of your audience filters on it.
- Many indies now use AI **only for internal concepting and placeholders**, and ship fully
  human-made final art specifically to avoid both the disclosure and the reputational drag.
- **Practical implication:** AI-assist is excellent for *pre-production* - mood, composition,
  iterating on "what does a ratkin actually look like" for free, at speed, before you pay
  anyone. Treat AI output as **direction for the artist**, not as shippable pixels. That way
  you get most of the cost saving with none of the disclosure problem.

This also happens to be the cheapest workflow overall, because the expensive part of hiring an
artist is *iteration on direction*, and AI-generated reference kills that cost.

---

## 5. Timeline to a first playable version

**You already have a playable version** - `prototype/grimtoll_slice.html` is a working game with
hex combat, a world map, events, inventory, morale, perks and metaprogression. So the real
question is *first playable version of what*.

### Scenario A - shareable browser demo (friends, Discord, Reddit)

Remaining work: finish the tavern prologue + village node (in progress), an onboarding/tutorial
pass, a bug pass, a balance pass.

| Hours/week | Time to shareable demo |
|---|---|
| ~5 | 8–14 weeks |
| ~10 | **4–8 weeks** |
| ~25 | 2–3 weeks |

### Scenario B - Godot 4 port to feature parity

Re-implementing the hex grid, pathfinding, turn system, all UI, and save/load. ~4,200 lines of
dense JS. Includes learning GDScript.

| Hours/week | Time to parity |
|---|---|
| ~5 | 8–14 months |
| ~10 | **4–7 months** |
| ~25 | 2–3 months |

**Critically: this produces zero new design value.** It is pure translation.

### Scenario C - full MVP Act 1, Steam-demo quality

Scenario B **plus** content build-out (30–40 nodes, 12–15 enemy types, 2 quest-lines, act boss
tuning, art integration, audio integration, save system, settings, localisation hooks).

| Hours/week | Time from today |
|---|---|
| ~5 | 20–30 months |
| ~10 | **12–20 months** |
| ~25 | 7–11 months |

Solo part-time timelines slip. Assume the upper end of each band.

---

## 6. The port question - a real recommendation

**Do not port to Godot yet.** Possibly do not port at all.

Reasons:

1. **The design is not locked.** Session 4 alone cut the entire faction system, restructured the
   starting roster, added a pet system and reframed metaprogression. Porting a moving target is
   how solo projects die - you pay the translation cost repeatedly.
2. **This game is not performance-bound.** It is a turn-based 2D game on a 13×8 hex grid. There
   is no technical reason it needs a game engine.
3. **Web builds ship commercially.** itch.io runs them natively; Steam accepts them wrapped
   (Electron / NW.js / Tauri). Several turn-based indies ship exactly this way.

**Trade-offs of staying on HTML/JS, honestly stated:** a Steam wrapper adds ~100 MB, controller
support takes deliberate work, Steamworks integration (achievements, cloud saves) needs a
bridge library, and modding/localisation tooling is slightly more DIY. None of these are
blocking for this game. Godot's real advantages - physics, 3D, mobile export, asset pipeline -
are advantages this specific game does not use.

**Suggested decision point:** revisit the port question *after* external playtesting. If the
design is stable and the web build feels good, ship it wrapped and save 4–7 months. If you hit a
real wall, port then, once, against a locked design.

The existing decision in `01_GAME_CONCEPT.md` §14 ("Engine: Godot 4") was made before there was
a working prototype. It was reasonable then. It is worth re-examining now, on the evidence.

---

## 7. Recommended sequence - what I would actually do, in order

1. **Finish the browser slice.** Prologue + village + onboarding + balance pass. *(4–8 weeks at
   10 hrs/wk, $0)*
2. **Playtest with 10–20 external people.** Discord, r/playmygame, indie servers. Placeholder
   art, labelled honestly. *($0)* - **this is the highest-value step in this entire document.**
3. **Lock the design** based on what that playtesting says. Expect real cuts.
4. **Only now: spend $500–1,000** on a style bible + one piece of key art from a human artist.
5. **Build the Steam page** around that key art. Start collecting wishlists. This is the actual
   commercial milestone - everything before it is preparation.
6. **Scale art spend against wishlist velocity.** If wishlists move, fund Tier 2. If they do
   not, you have spent under $1,000 finding that out instead of $14,000.

**Total spend before you know whether the game has an audience: under $1,000.**

That is the whole point of ordering it this way.

---

## 8. Where to find artists

ArtStation (filter by "available for work"), Reddit `r/gameDevClassifieds` and `r/HungryArtists`,
Behance, and genre-specific Discord servers - the Battle Brothers, Wartales and Darkest Dungeon
communities all have artists who already understand this aesthetic and will need far less
direction, which is where the real cost saving is.

**When briefing, lead with the concepts, not the mood words.** "A wardrobe with the doors off,
worn as armour by an ogre who knows exactly how he looks" gets you a better and cheaper result
than three paragraphs about grimdark atmosphere.
