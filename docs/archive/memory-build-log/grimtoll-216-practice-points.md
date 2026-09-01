---
name: grimtoll-216-practice-points
description: "#216 the practice field prices both sides + hand-picked crew + campaign locks - COMMITTED on desk work/practice-points 2026-08-21 (8f.239), NOT landed: main's prototype was dirty with 2ef84142's #215"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2fe6eee5-601b-4458-b04e-3e104ad6345a
  modified: 2026-08-21T08:58:39.607Z
---

**#216 (8f.239), 2026-08-21, commit 6ac731c on `work/practice-points`.** One derived points scale
(`unitPts` off both unit factories), a hand-picked crew bench in the practice field (recipe rows,
levels by policy, artifacts priced as their margin on the wearer), six surprise fights locked
behind `gt_seen_fights` (marked in startBattle beside the journal write, `!SIM.on` gate, TEST.on
bypasses), dev-only ⚔-points on fight doors (via `choiceNote`) and map battle nodes. Spec in
`docs/archive/BACKLOG_ENTRY_SPECS.md` §216; the numbers in the changelog row.

- ⚑ **The validation shape worth reusing: the scale agreed with arena measurements it never
  read.** PTS_SCALE calibrated ONLY on "founders = 100"; the seasoned six then priced 202 against
  the six-body Snare's 199, and #160 had measured that exact match-up at 45% win. One free
  agreement between an independent formula and an old measurement is worth more than any amount
  of tuning.
- ⛔ **A derived scale must read the flags that ARE the tuning.** The wedding priced 80 sober
  (`drunk` is that card's whole difficulty knob, #159) and five levels moved a spearman 2 points
  (most perks are conditional and price as nothing). Fixes: drunk x0.7 offence / -8 dodge, +3% a
  level. When a fight's number looks wrong, ask what one-word flag the formula cannot see.
- ⚠ **Anything measured through the builders runs under `seededly`** (swap Math.random, restore in
  finally) or the steading's rolled wall makes the picker flicker between opens.
- ⚠ **NOT landed:** `branch.ps1 done` refused because main's prototype carried session 2ef84142's
  uncommitted #215 ("mirrored practice battle" - ALSO touches the practice field, so expect a
  textual merge conflict in `openSim`/`simComps` when both land). Run `branch.ps1 land` after
  their session commits. [[grimtoll-parallel-sessions]]
- Tooling facts that cost a retry each: `LINT()` returns `{findings,byCategory,items}`, not an
  array · `eyes.py`'s `CDP.screenshot_png` returns base64 TEXT, decode before writing · the whole
  game is ONE inline script, so a const declared at line 39k is safely callable from line 14k at
  runtime.
- ⏳ Open: the easy/even/hard band multipliers (1.3/1.0/0.75) ignore the player's tactical edge
  (hold patrol at even points = 93% win in #183); measure bands against win rates in the balancing
  pass.
