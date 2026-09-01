---
name: grimtoll-223-six-desk-landing
description: "The 2026-08-21 landing of six desks (#215-#222) and deploy; what a union merge hides, and the claim guard's citation deadlock on a new axis"
metadata: 
  node_type: memory
  type: project
  originSessionId: 15c771c4-773a-48e7-aff1-bbd83f0c1797
  modified: 2026-08-21T14:42:36.301Z
---

Six desks landed onto main together on 2026-08-21 and deployed: #215 mirror, #216 practice
points, #217 beast race, #218 card unfold, #219 opening on the stage, #220/#221 world bar +
payday, #222 claim.ps1 verify. Plus uncommitted #219 sitting on the main desk and an untracked
Steam-copy research doc. Live at `https://dmytriyvihrov-stack.github.io/My-game/`.

**Why this is worth keeping: the merges were the easy half. Every real defect was in the RECORD,
and none of it appeared in a diff.**

⛔ **A `merge=union` FILE NEVER CONFLICTS, SO IT NEEDS A COUNTER RATHER THAN A READING.**
`docs/CHANGELOG.md` and `docs/SHIPPED.md` are union in `.gitattributes`. Three faults merged
perfectly clean:
- #221's changelog row had been written INTO THE MIDDLE of #220's, on the branch, leaving
  `| 8f.243 | **#220 -| 8f.244 | **#221 - ...` on one line and #220's text orphaned on the next;
- #215's SHIPPED row arrived TWICE, once as authored and once as #217 had edited it to close its
  remainder (`work/beast-race` was stacked on `work/mirror-battle`). **The two rows differ, and
  keeping the wrong one has the registry claiming an open remainder that is closed**;
- #222 took a number and wrote no row anywhere, its whole argument living in the commit message.

⚑ **The thing that found all three was a completeness table**: for every entry number, is it in
CHANGELOG *and* SHIPPED *and* the backlog? Run it after any multi-desk landing.

⛔ **THE CLAIM GUARD'S #144 CITATION DEADLOCK HAS A NEW AXIS: WRITING A NUMBER'S RECORD IS BLOCKED
BY THE CLAIM ON THAT NUMBER.** The auto-sweep frees a claim once its number is in the committed
`CHANGELOG.md`, so it cannot free the claim that is refusing the very commit that would write it.
Free the claim file to `.grimtoll/freed/` first, then commit. **Safe by #144's own argument**: the
issuing floor comes from a scan of the REPO, so once the number is committed it can never be
issued again, claim file or no claim file. ⚠ **CORRECTION: an earlier draft of this entry said the
sweep reads `CHANGELOG.md` only. It does not** - `$ShipRecord` in `claim.ps1` lists all four docs,
so a number recorded anywhere clears itself. What the sweep cannot do is clear a claim on the
strength of a commit that has not landed, and the blocked commit is the one that would record it.

⛔ **A DESK THAT BRANCHED BEFORE #219 AUTHORS BARE `#wDlg`, AND EVERY SELECTOR MUST BE LIFTED AT
THE MERGE.** #218's unfold and door rails were written before the opening became the fourth deck.
Taking either side of that conflict alone was wrong: **18 selectors were lifted into
`:is(#wDlg,#prDlg)`**, outside CSS comments only (the comments discuss `#wDlg` by name at length
and are explaining the `.on` gate, not naming a selector). Proved by driving the opening card:
`evCardIn`/`evPart`/`evSeam`/`evColIn`/`evRise` all running on `#prDlg`, and its door carrying
`iv-fight` + `--rail:#a33b34` + `evDoorIn`. Unlifted, THE THREE BELLS and THE MAN IN THE CORNER
would have been the two cards in the game that do not unfold and whose doors have no rail.
See [[grimtoll-218-card-unfold]] and [[grimtoll-219-opening-stage]].

⚑ **`openSim` CONFLICTED EXACTLY WHERE MEMORY SAID IT WOULD** ([[grimtoll-216-practice-points]]).
Two desks changed `col()`'s signature: #216 to take pre-built rows, #215 to take items plus a
wrapper class. The union is `col(title,rows,attr,cls)` with the rule buttons built beside the
other three lists. ⚠ #216's `#simCard:has(#simCrew) .simpick{max-height:200px}` does apply to
#215's rule row; **measured, the row wants 72px and does not clip**, so it is harmless.

⚠ **`branch.ps1 land` LISTED ALL SIX DESKS, INCLUDING THE TWO UNDER `.claude/worktrees/`.** That
does NOT contradict [[grimtoll-land-blind-spots]]: that entry says the BRANCH half works and only
the UNCOMMITTED half of such a desk is invisible, and every desk here was already committed. **The
survey it prescribes is still the one to run** (`git worktree list` + `git status` per worktree +
`main..<branch>` per branch) - it is what proved main's own tree was the only dirty one. ⚠ `land`
stops on a conflict rather than resolving; `land -Go` is re-run once per desk.

⛑ **AND THE PROCESS ADJUSTMENT CAME OUT OF THIS, THE SAME DAY: `tools/record.py`.** `check` counts
the four writes `SHIPPED.md` has always demanded and catches what a human cannot catch by reading
(conflict markers, a spliced row, an orphan under a row, a duplicate number, rows out of order, a
claim holding a number written in no doc); `fix` resolves the backlog conflict every desk causes;
`prove` makes all eight fire and go quiet. Run by `branch.ps1 land` after the merges and by the
pre-commit hook as `--faults-only` when a doc is staged. ⚡ **It found four real things on its
first runs**: #199/#200 swapped in the backlog, #217 and #219 with no test-bench section, the
recent test-bench block out of order, and the true registry gap being **22 entries and not the 6**
this session first reported. ⚠ And it caught itself: the four-writes counter reported a spotless
record on run one because its regex lacked `re.M` and had matched nothing.

**Parked, in the backlog's new "PARKED BY THE LANDING SWEEP OF 2026-08-21" section**: nine numbers
claimed and recorded nowhere (#204, #207, #153, #158, 8f.186, 8f.213, 8f.226, 8f.229, 8f.230, all
freed to `.grimtoll/freed/20260821-163937-sweep/`), six shipped entries with no SHIPPED row
(#196, #198, #199, #201, #208, #209), and three rulings the desks asked for and never got.
