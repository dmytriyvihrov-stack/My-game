---
name: grimtoll-224-seven-ask-batch
description: "#224 the seven-ask batch (8f.247) - COMMITTED on desk work/sevenask 2026-08-21, NOT landed. The parting-swing price moves to the cursor, chase+clash open up, the wedding door shuts when your hands are bloody, THE SECOND SHAPE, the kill tally, the deed ledger, the crossbow"
metadata:
  node_type: memory
  type: project
  originSessionId: 07702d01-cf41-42fa-a5a6-aca857d00778
  modified: 2026-08-21T17:00:30.818Z
---

Seven asks in one message on 2026-08-21, built on desk `work/sevenask`
(`C:\Users\USER\grimtoll-desks\sevenask`), two commits, **not landed**. Numbers `#224` / `8f.247`.
Full text in `docs/CHANGELOG.md` 8f.247; the test bench section is at the top of
`docs/WHAT_TO_TEST.md`. See [[grimtoll-parallel-sessions]] and the `/land` skill.

## The three findings worth carrying, none of which was the feature

⛔ **A GLYPH TABLE THAT TWO SWEEPS MISSED, BECAUSE NEITHER SWEPT THE THING THAT COUNTS.** #196 made
`RACE_ICON` the one face of the three races and #211 sent nine screens through it. `KILLHEAD` was
neither a screen nor a race table, so it went on drawing a ratkin as ⬩ **two inches under the
painted mark, on the same body, on the company sheet**. ⚑ **The lesson is where to look next time:
a vocabulary sweep has to enumerate the TABLES that speak the vocabulary, not the screens that
draw it** - which is exactly the count `.claude/rules/event-cards.md` already records getting wrong
twice (a stock phrase counted over `EVENTS{}` alone when it also lived in `CAMPS`).

⛔ **`maxSize:2` IS A NO-OP AND LOOKS LIKE A RULE.** `sizeOf` is big→3, ogre→2, else 1, and
`strike`'s force block already refuses `d.big` on its own line - so a shove capped at 2 refuses
nothing at all. It was written, it read fine, and only `sizeOK` being opened after a test shove
failed to fire caught it. ⚑ **A guard whose threshold sits outside the range of what reaches it is
indistinguishable from a working guard**, and this file's own history (#139's desk exemption, #144's
pre-commit hook, #161's lock) is three more of the same shape.

⛔ **A NEW ACT THAT GREYS ITSELF IS A TRAP UNTIL BOTH BRAINS KNOW HOW TO UN-GREY IT.** The crossbow
sets `u.spent` and `canUse` refuses the shot; without a wind branch in `autoStep` AND `aiTurn` a
company under AUTO fires once and carries a stick for the rest of the fight. That is #128's spear
wall (`u.spearwall` written only on the player's path) and #99 before it. ⚠ And the AUTO branch has
to **return**: measured, falling through spent the second action WALKING with an enemy four hexes
away, because the attack pick had already run while the weapon was empty.

## The two rulings the user gave when asked

- the parting-swing % **moves to the cursor** and the per-enemy plates go (*"Move it to the
  cursor"*). ⚑ It is anchored to the lit HEX and not to the pointer's pixels, because `paintHand`
  already folds the pointer through the MIRROR and a chip on the raw pointer would price a hex
  nothing is going to happen on.
- "the second and third battle" is **`chase` and `clash` by name** (*"is chase and blood on the
  road"*), never a run counter - which is `armourWhere`'s own rule and #71's lesson.

## What is open

**Both new pieces of gear are `rarity:'rare'` and not `unique`**, so they arrive only through
`findPool` or Coldharrow's `ARMOURY`, which rolls **one row of six**. Most runs will never see
either. Neither has an `ITEM_ICON` painting (a legitimate shipping state - it falls back to
`gGlyph`). The Second Shape's zone of control over an adjacent enemy is deliberate and **unmeasured**:
nobody has played a fight where it decides one.
