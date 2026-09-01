---
name: grimtoll-192-item-pack-01
description: "#192 item pack 01 - text spec (main 2026-08-18) + the 56 painted item icons WIRED and verified 2026-08-19 (8f.215); docs pushed, the prototype half held back by another session's lock"
metadata: 
  node_type: memory
  type: project
  originSessionId: d1195b97-cd61-4ae4-b34a-955e1fd09986
  modified: 2026-08-18T23:06:05.322Z
---

**#192 has two halves. The art half is BUILT AND VERIFIED; the game half is not started.**

**Half one, 2026-08-18 (`23229f8`):** the text spec. `art/ITEM_PACK_01_TEXT.md` (GEAR rows, engine
work, prompts, open questions) and `art/ITEM_ICONS_GPT_TASK.md` (the paste-into-ChatGPT task for all
56 items). His rulings: three tiers *Обычный · Необычный · Эпик*, each with a source door; rarity
colour **white / green / purple**; **BLEEDING is a STATUS: 2 turns, 10% of max HP a turn, 5% on a
boss**, refresh not stack. "Legendary" IS Epic; there is no fourth tier.

**Half two, 2026-08-19 (8f.215, docs pushed as `9d16395`):** ChatGPT delivered all 56 at
`art/src/items/` and they are wired. `build_assets.ps1` embeds them verbatim as `ITEM_ART`
(128x128 alpha PNG, +1.1 MB); **`ITEM_ICON{}` in the prototype is the one place a GEAR key meets a
picture** (the `MAP_SIGHT{}` shape), `itemArt()`/`itemImg()` are the readers, and five surfaces draw
it: sheet slot · stash row · the shop's `.gart` · `evGearStrip` · the aftermath's `.abslot`, plus the
hover tip. Five keys map to items that do not exist yet, on purpose.

⛔ **THE LESSON, now standing in `.claude/rules/static-event-art.md`: an item icon is a COLUMN
beside the text, never a character inside the name line.** Inline at 24px a dark 128px painting is a
smudge; at the briefed 40px the slot measured **72 against the sheet's 67px pitch**. Beside the three
lines it costs nothing (they already stack to ~44px). Measured: slot **53 → 56 → 63**, stash row
**56 → 54**, the shop's 60px box takes 56 unmoved.

⚠ **AND ONE EDIT SILENTLY REVERTED** while the `</div>` that closed it survived, leaving unbalanced
markup. The editor reported success. **On this shared tree, verify a landed edit by grepping for a
string only the new code has.** See [[grimtoll-parallel-sessions]].

**Gates all passed** (LINT 0 · overflow 5-vs-5 against a `git show HEAD:` baseline in a second tab ·
nothing under 10px · map counters 0/0/0), captured with `tools/playtest/eyes.py` on its own Chrome
profile because the preview pane composites nothing.

**⛔ NOT DEPLOYED, AND NOT BECAUSE OF THIS WORK.** Three sessions were live on the tree; `22aadaab`
holds `prototype/grimtoll_slice.html` for #193 (mirehares) and their in-flight code is in the same
file, so `deploy.ps1`'s gate refuses and stealing it would publish their half-finished work plus
`MUTATIONS_ON=false`. The wired prototype is committed nowhere: a recovery copy is in this session's
scratchpad as `grimtoll_slice.192-wired.html`. **To finish: take the lock, commit the prototype, run
`deploy.ps1`.**

⚠ **A stale `entry-192.claim` (taken by 22aadaab two minutes before my commit) blocked the
pre-commit hook.** It never auto-cleared because the sweep looks for `#192` and the backlog row
reads `| **192** |` with no hash. Moved to `.grimtoll/freed/`. **A backlog row written without the
`#` is invisible to `claim.ps1`'s shipped-scan.**

**Still open (the GAME half):** the five items' `GEAR` rows, `rarity:` + the three-colour frame, the
bag mechanics (THROW/USE act, uses-per-battle, `burn`, `slow`, `push` off a weapon, armour off a
main-hand row), and **who counts as a boss** for BLEEDING's 5%. See [[grimtoll-event-card-rules]],
[[grimtoll-company-sheet]].
