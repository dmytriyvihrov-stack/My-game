---
name: grimtoll-242-dev-bench
description: "#242 the dev bench - LANDED + DEPLOYED 2026-08-24 (8f.265, deploy d0358c5, with #241): ⚙-only any-foe/any-perk/orders/board-brush on the practice field; desk work/devbench closed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2474a099-d7e7-4d10-908a-abe020067ef4
  modified: 2026-08-24T15:23:27.676Z
---

**#242 (8f.265), 2026-08-24, commit 0cd160a, LANDED as merge 55ac9c4 and DEPLOYED in d0358c5**
alongside session 3229142e's #241 (`deploy.ps1 -Player`, both pages, guard 12 cues / 354 pictures).
`branch.ps1 land -Go` merged clean; gates re-run on the MERGED build (LINT 0, catalogue 53 stable,
custom fight + brush + restore green); desk closed. ⚑ **The player build ships the code and cannot
reach it**: `const TEST={on:false}` is hardcoded there and the cog is removed, so every ⚙ gate in
this entry is dead - verified by grepping BOTH built pages (`DEVFOES` present in both,
`__PLAYER_BUILD__` only in `play/`). Dev-mode (⚙/TEST.on) extensions
to the practice field, mockup-gated the same day (the devbench artifact,
https://claude.ai/code/artifact/24e8b4ee-232a-48bd-a828-bd1958de2457): THE OTHER SIDE (hand-picked
foes off a 53-body catalogue derived by running every fight builder), the ⚙ perk editor (dev picks
override the level policy, first tick seeds from policy), THE ORDERS (per-SIDE `ORDER_PROF`
profiles: brain / aggressive / steady / NEW defensive; a brain on your side engages AUTO = the
autobattle), and the ⚙ BRUSH (paints the terr words field/marsh/rock/tree/wall/fire mid-fight,
click eaten in `handHex` BEFORE the mirror). Full text in the changelog row.

- ⛔ **A LINT CHECK KEYED ON A FUNCTION'S SOURCE DIES WITH THE REFACTOR OF ITS SUBJECT.** Merging
  startBattle's and fightPts' twin fight-to-builder ternary chains into `FOE_BUILD` instantly made
  LINT 9c (which grepped `String(startBattle)` for `==='kind'`) report four fights missing. It asks
  the table itself now; proved by deleting a key (fired) and restoring (0).
- ⛔ **`seededly` PER BUILDER RUN, NEVER ONE STREAM OVER MANY RUNS.** The steading ROLLS its wall,
  so in one shared stream the same builder fields a different cast depending on how many rolls the
  runs before it spent: the stone-thrower appeared in the catalogue and then vanished between two
  probe runs. Fresh seed per `devFoeRun` makes catalogue and side-builder agree forever - verified
  byte-stable across two builds, every row buildable.
- ⚠ **ARENA's profile reset lacked `doct`**, so an arena A/B that set doct:0 leaked past its own
  finally into every later fight of the page session. `FULL=AIP_FULL` now (one reset table, three
  readers).
- ⚑ **Half the ask already existed and saying so was the first deliverable**: #216's crew bench
  already gave any artifact/level, locked fights were already dev-open, AUTO was already the
  tester's, and #229's gauntlet already held aggressive/steady as AIP profiles with "in-game
  picker, waits on a mockup" as its open item. The mockup mostly specified the four missing pieces.
- ⏳ Open: **`defensive` ({cohere:3.5,flank:0,pile:0.6}) is authored, not measured** - wants a
  gauntlet column; if it plays like steady the fix is likely a new advance-weight knob in aiTurn ·
  bloom/ember are painted palettes, not terr words, so the brush cannot speak them · orders are
  per SIDE (that is what AIP is); per-body orders would be a new system · the tap-room refuses a
  custom side by design (scripted waves).

Related: [[grimtoll-216-practice-points]] · [[grimtoll-229-gauntlet]] ·
[[grimtoll-parallel-sessions]] · [[explain-and-mockup-before-building]]
