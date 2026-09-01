---
name: grimtoll-214-jstage-wiring-and-claim-ceiling
description: "#214, 2026-08-20: wire new J-stage art by matching PROMPT TEXT to the event's own body, never the filename slug; and claim.ps1's entry ceiling was stale at 200 while real usage had reached 213"
metadata: 
  node_type: memory
  type: project
  originSessionId: bda9ff68-f7c7-40e4-a6f7-302fce0fca93
  modified: 2026-08-20T17:14:25.831Z
---

**LANDED + DEPLOYED 2026-08-20 (8f.237).** Fifteen more `art/src/stage-6/j-stage/` masters
(EV-J9..EV-J23) landed on disk and were wired into `JSTAGE{}` in the same session as
[[grimtoll-211-213-race-marks-and-zoc]].

⛔ **A FILENAME SLUG IS NOT A KEY MATCH, AND #209's FIRST PASS TRUSTED ONE.** `steading` (THE
STEADING-LINE - four ogres holding a mountain road) had been pointed at `EVJ7` since the J-pack
first shipped. `EVJ7`'s actual file is `over-the-wall-stage.png` and its prompt is a ruined
steading with dogs pouring through wall gaps - that is `packev`'s card, THEY COME OVER THE WALL
("You made camp inside somebody's old steading"). **Both events use the word "steading" in their
own prose**, and matching on the slug picked the wrong one; `packev` was left with no row at all.

⚑ **THE FIX IS TO READ THE PROMPT AGAINST THE EVENT'S OWN BODY, NEVER THE FILENAME.**
`art/src/stage-6/J_STAGE_PROMPTS_USED.md` carries the prompt text per file; grep the live event's
`body:` string in the prototype for the same nouns (four ogres, a seated elder, dogs, wall gaps)
before writing a `JSTAGE` row. This is the general form of the rule this project keeps re-learning
for art wiring - `MAP_SIGHT`, `ITEM_ICON` - a key is a claim about CONTENT, and a filename is
evidence, not proof.

⛔ **`tools/claim.ps1`'s `$MaxEntry` WAS 200 AND REAL USAGE HAD REACHED 213.** `number entry`
scans committed docs for `#NNN` and floors the search at `$MaxEntry`, so once real entries passed
200 the scan went blind to them and reissued **#211 a second time** in this same session (caught
before it was used - the reissued claim was released and the ceiling raised to 300 before taking
#214). **This will happen again around #300** unless the ceiling is raised again or made dynamic.
Check `$MaxEntry`/`$MaxBuild` in `tools/claim.ps1` if `number` ever hands out something that greps
as already-shipped.

⚑ **AND THE MERGE THAT LANDED IT COLLIDED WITH A PARALLEL DESK ON THE SAME TABLE ROW.**
`work/asha-lane`'s #212 and this session's #211/#213/#214 both inserted rows at the top of
`docs/00_PLAN_AND_BACKLOG.md`'s newest-first table in the same spot. `branch.ps1 land -Go`
produced exactly one conflict, in exactly that file; every other file (`CHANGELOG.md`, `SHIPPED.md`,
`WHAT_TO_TEST.md`, `prototype/grimtoll_slice.html`) auto-merged clean because those are append-only
at different anchors. **A conflict in the backlog's newest-first table is not a sign anything is
wrong** - it is two sessions both writing "insert at the top" - and the fix is always the same:
interleave by number, newest first, nothing dropped.

Related: [[grimtoll-211-213-race-marks-and-zoc]], [[grimtoll-parallel-sessions]],
[[grimtoll-land-blind-spots]], [[grimtoll-share-link]].
