---
name: grimtoll-231-board-answers
description: "#231 the board answers when it is asked - LANDED on main + DEPLOYED 2026-08-21 (8f.254). Deleting a readout's opaque ground deletes a documented off-scale literal, and the rule file's own gate three sections down still expected it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 06991b43-0295-4834-b45c-22a391da7402
  modified: 2026-08-21T20:45:20.378Z
---

**#231 landed and deployed 2026-08-21 (8f.254)**, merged from desk `work/battleodds`
(`e71480c`) with no prototype conflict. Three parts: the hit % shows only while a skill is
picked or hovered (`#bGrid.odds .hodds{display:block}`), the opportunity-attack price became
**one figure under the body that pays it** (`.hin>.zodds`, bottom-anchored, text not a plate),
and the build stamp moved to the foot of the screen.

⛔ **The lesson is about the RULE FILE, not the build.** Replacing the zone-of-control odds
plate with a shadowed readout deleted its `padding:1px 2px` - which was one of exactly two
off-scale padding literals `.claude/rules/ui-scales.md` §3 documents by name, with its
arithmetic, as deliberately surviving. The desk correctly updated §3 to record the removal,
**and missed the §5 gate command three sections down**, which still read `# 1px 2px 86px`. So
the file disagreed with itself and the next session to run the gate would have read a pass as a
failure. Fixed at the landing (`593d6f8`); the merged build's grep returns `86px` alone.

⚑ **A documented exception has more than one reader.** When a rule file names a literal in a
table AND asserts it in a gate, deleting the thing means editing both. Grep the rule file for
the value, not just the section you are editing. See [[grimtoll-unverified-comment-is-a-defect]].

⚠ **Verifying it needs the CSS contract, not a played fight.** `.zodds` is only built when
`B.zrisk` is non-empty and `B.zfrom` is set, i.e. when the acting body stands next to an enemy -
which a fresh archer does not. Synthetic pointer events do not stamp `.aiming` either
(`paintHand` reads `B.hand`). The honest check is to inject a `.zodds` into a `.hin`, toggle
`#bGrid.aiming`, and measure: hidden without the class, `display:block` with it, 10px, zero
padding, transparent ground, centred on the hex and anchored under the body. See
[[grimtoll-measuring-the-running-build]].
