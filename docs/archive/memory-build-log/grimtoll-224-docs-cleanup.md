---
name: grimtoll-224-docs-cleanup
description: "The 2026-08-21 docs cleanup and the `land` skill - what gets archived as a FILE vs as a hash, and the tooling that has to follow a move"
metadata: 
  node_type: memory
  type: project
  originSessionId: 15c771c4-773a-48e7-aff1-bbd83f0c1797
  modified: 2026-08-21T15:41:57.300Z
---

Same day as [[grimtoll-223-six-desk-landing]], immediately after it. The ask: *"clean what to test,
backlog, changelog and everything. Put in archive version all unrelevant and old"* and *"create a
skill if needed, to resolve such things better"*.

## ⛔ THE RULE THAT CAME OUT OF IT: KEEP WHAT IS CITED, HASH WHAT IS MERELY PAST

The repo already had a rule from 2026-08-14 - *"a superseded document does not need a shelf, it needs
a commit hash"* - and it is **right for a played test and wrong for reasoning**. The two files were
cut in OPPOSITE directions on purpose, and `README.md` §7 now carries the distinction beside the
original rule:

| | how | why |
|---|---|---|
| `WHAT_TO_TEST.md` | **deleted**, hash named in *Everything older* | a played test has no later readers |
| `CHANGELOG.md` | **moved to files** under `docs/archive/` | `.claude/rules/*` and this memory index cite old entry numbers constantly (#82, #102, #137, #143), and **a rule pointing at reasoning `grep` cannot reach is worse than a long file** |

**Numbers.** CHANGELOG 1.26 MB → **257 KB** (195 build rows before `8f.200` → `archive/CHANGELOG_BUILD_LOG_pre_8f200.md`,
built-entry full texts → `archive/CHANGELOG_BUILT_ENTRY_TEXT.md`; 230 build numbers before and after,
none lost). WHAT_TO_TEST 2,322 → **1,334 lines**, keeping 2026-08-19 onward, its fourth cut.

⛔ **A MOVE IS ONLY NOT A DELETION IF THE READERS FOLLOW IT.** `tools/claim.ps1`'s `$ShipRecord` and
`tools/record.py`'s `CHANGELOG_ARCHIVES` both list the two archive files. Forget either and the split
looks to them like two hundred entries vanishing, which would break the spent-claim sweep and make
the four-writes counter scream. ⚑ **The proof it worked**: `record.py` still names the same 16
below-floor entries afterwards, which is only possible if it can still see them.

## ⚑ THE `land` SKILL IS THE DELIVERABLE

`.claude/skills/land/SKILL.md`, 183 lines. Survey → land → the record → drive the merged build →
deploy → sweep the chats for what was lost → docs hygiene. It exists because the six-desk landing
rediscovered a procedure that had never been written in one place. The two rules in it that **no
tool enforces**:

- **RESOLVE TOWARD THE UNIFIER, THEN RE-READ WHAT THE UNIFIER NAMES.** A desk branched before a
  refactor still holds its own copy of what that refactor unified; taking the incoming side silently
  reverts the fix. Both worked examples needed BOTH sides, not a winner.
- **KEEP WHAT IS CITED, HASH WHAT IS MERELY PAST** (above).

## ⚠ WHAT THE CLEANUP FOUND, AND ONE BUG IT CAUSED

- **`record.py` died on a non-UTF-8 console.** It prints findings that quote headings, and every
  heading here carries a mark (⛔ ⚑ ⏸). A default Windows console is cp1251/cp866, so `print` raised
  `UnicodeEncodeError` - and it would have died hardest inside the pre-commit hook where nobody sees
  a traceback. `sys.stdout.reconfigure(encoding="utf-8", errors="replace")`. ⛑ **Found by making the
  new write-3 check FIRE**, not by running the clean case.
- **Write 3 of 4 is a NOTE and not a fault**, because #134 is honestly shipped AND parked: the joke
  door leaving the opening shipped, the door itself is parked at the user's word. Two things, one
  number, both rows correct.
- **878 em dashes survive in the DOCS** against a standing rule of none anywhere. Recorded in the
  backlog, deliberately not swept: #199 needed a lexer to tell a player-facing string from a code
  sample and the docs have that worse. ⚑ `.claude/rules/` is already clean; its one hit is inside
  the regex that TESTS for em dashes.
- **The concept docs were NOT stale.** Every `Grimtoll` hit is correct - the island is Grimtoll, the
  game is RabbleBound, and the docs say so explicitly. Checked rather than assumed.

⚑ **AND THE DESKS ARE GONE.** All nine `%USERPROFILE%\grimtoll-desks\` worktrees were verified
merged and clean, then closed with `branch.ps1 done`. The two under `.claude/worktrees/` are Claude
Code's own and were left alone.
