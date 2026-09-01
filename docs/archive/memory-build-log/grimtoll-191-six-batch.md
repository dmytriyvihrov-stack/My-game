---
name: grimtoll-191-six-batch
description: "#191 the six-point batch - SHIPPED + DEPLOYED 2026-08-18 (8f.211). The game is RabbleBound; the island is still Grimtoll"
metadata: 
  node_type: memory
  type: project
  originSessionId: ebce7f5d-1f39-4745-9c5b-9a7f03884d83
  modified: 2026-08-18T15:55:29.494Z
---

Six unrelated asks in one message, landed on main as four commits via desk `work/six-batch`
(merged, branch deleted, `index.html` rebuilt on main where the audio pack lives) and **DEPLOYED** at
his word - verified live on `/index.html`: title, gate, perks, elements, faces, embedded webp, LINT 0,
no console errors.

**THE NAME.** The game is **RabbleBound** (165 occurrences, 47 files). ⛔ **The ISLAND is still
Grimtoll** - his call when asked, because `03_WORLD_LORE.md` has it *"named twice in one word"* and
the toll runs through the content from THE HANGED TOLL-MAN down. **The discriminator is CASE**:
`Grimtoll`/`GRIMTOLL` name the game, lowercase `grimtoll` is always a path. ⚠ **`gt_*` localStorage
keys never move** - that is not tidiness, it is the difference between a rename and wiping every
save. Paths (`prototype/grimtoll_slice.html`, `grimtoll-desks`, `.grimtoll`) stay too.

**The other five:** terrain tooltips in battle (`groundNote`, one builder / three readers) ·
`SHOW_HIT_ODDS=false` hid every % to hit in the fight (⚠ **REVERSED in #195, 2026-08-19, at his word**:
the flag is `true` again and the whole family came back together, because the rule below about signed parts
runs both ways. See [[grimtoll-195-hit-odds-and-mirehare-lines]]) · three perks (Patient, Ground-Wise,
Elemental Weapon) · `say2` tone now decides POSITION, so payday and the objective arrive centred ·
the feedback popup lost SEND/NOT NOW.

**Lessons worth keeping:**

- ⛔ **A `title` attribute is not a readout, and a sprite EATS it.** Six terrain kinds had one; the
  moment a body stood on the hex the tooltip was gone - so the one time you need to know somebody is
  standing in fire was the one time nothing said so. An occupied hex needs the note on the card that
  is already opening for the body.
- ⛔ **Hiding a total means hiding its signed PARTS.** Leaving `surrounded +10` and `arc BACK +15`
  beside a hidden 73% just makes the player add the receipt back up. What survives is the **state**
  (FRONT/FLANK/BACK as a place to stand), never the figures.
- ⛑ **A perk should join an existing door, not open a new one.** Ground-Wise went into `wetproof()`,
  which the file had already declared "the one place that question is answered"; Elemental Weapon
  reuses `ignite()`/`act.cripple`/`act.venom` and cost **one** new field. See
  [[grimtoll-event-card-rules]] for the same instinct on content.
- ⚠ **Merge an effect onto a COPY of an act.** Weapon acts come from `GEAR`; mutating one hangs the
  element on that weapon for every body that ever equips it.
- ⚠ **A rename is a LAYOUT change.** RABBLEBOUND is **43% wider** than GRIMTOLL in real Cinzel at
  `--fsTitle` 74 (482 → 687px). It cleared the 1280 stage by 593px so nothing had to give, but that
  was measured, not assumed - see [[grimtoll-189-fonts-and-scrolling]].
- ⚑ **The two-tab baseline diff earned its keep again**: `#bTrait` looked like a new clipped box and
  the baseline proved both builds clip it. It is 8f.209's deliberate `-webkit-line-clamp:2`, now
  written into the ui-scales known list so a third session does not measure it.

⛑ **THE ONE OPEN QUESTION, ANSWERED, AND THE ANSWER IS A DESIGN RULE.** Elemental Weapon is on the
**mage alone**. I raised the battle-mage as the obvious home (he is the caster who actually swings a
blade); the user: *"it ads melee - so you mage could be a glass canon. And use him for melee could be
a decent trade off"*. ⛑ **It is aimed at the class that is BAD at melee on purpose** - it does not
make the mage good in a scrum, it makes stepping into one a decision with a price, which is what
turns a glass cannon into a choice instead of a positioning chore. On the battle-mage the same perk
would be a straight upgrade to what he already does, i.e. a stat increase with a name. **Stays off
`warmage` as a ruling, not an omission.**

See [[grimtoll-safe-file-patching]] for the truncation that cost this session an hour.
