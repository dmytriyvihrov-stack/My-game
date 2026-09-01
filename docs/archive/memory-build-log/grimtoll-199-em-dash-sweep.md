---
name: grimtoll-199-em-dash-sweep
description: "#199 (8f.221) the em dash sweep: grep counted 1,338, the player read 188, and only a lexer could tell them apart"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9ee02431-0eb8-47a7-a368-242e17f69c0b
  modified: 2026-08-19T10:39:40.657Z
---

**#199 / 8f.221, 2026-08-19. On the desk `claude/strange-jennings-b10f17`, NOT committed, NOT
landed, NOT deployed.** The standing hard rule is [[never-use-em-dash]] and the prototype still
held 1,338 em dashes. The user's own framing carried the trap: *"It is NOT a blind
find-and-replace"*.

⛔ **THE HEADLINE: A COUNT OF WHAT REACHES A PLAYER CANNOT BE TAKEN BY GREP, AND HERE THE TWO
NUMBERS DIFFERED BY 7x.** Grep says 1,338. Lexing the `<script>` region properly (single quote /
double quote / template / line comment / block comment / regex) says **188 reach a player**, and
splits the rest into 1,071 JS block comments, 68 CSS comments, 9 lone placeholders, 2 HTML comments
and **2 inside `LINT()`'s own detectors, which must survive because they ARE the check**.

⚑ **AND THE BRIEF ITSELF UNDERCOUNTED, IN A WAY ONLY THE LEXER FOUND.** It named 181 single-quoted
strings and the lexer agreed **exactly**, which is what made the rest of its arithmetic trustworthy.
But **nobody had counted the raw HTML**: the `<title>`, the DECIDE FIRST banner, the stash nag,
three `title=` tooltips and three battle-legend lines are player-facing text that **no sweep of
`EVENTS{}` will ever reach**. 11 of the 188 lived there. A gate written as
`/—/.test(JSON.stringify(EVENTS))` would have passed with all eleven still on screen.

⚑ **THE REPLACEMENT STYLE WAS MEASURED OUT OF THE FILE, NOT CHOSEN.** Counted first: **` - ` is
what this build already writes for a dash-break** ("catch from the front - and a body that"),
**` · ` is the receipt separator and is spoken for** (56 uses; borrowing it would be #102's
wrong-unit bug), and **`–` is the numeric range** (`22–30`). **The battle legend settled it
outright**: of its four sibling lines, three carried an em dash and the fourth already read
`held - somebody is facing this hex`. **One sibling was right and three were not, so the job was to
make three match one rather than invent a fourth style.**

The 195 sites were then judged individually on a stated rule: **colon** where the second half
defines the first, **comma** for a light continuation, **full stop** for a fresh beat with the next
word re-capitalised, **` - `** for label-value joiners. Final tally **83 · 65 · 24 · 12 · 9 en dash
· 1 paren pair**. ⚠ Two decisions came from reading the OUTPUT rather than the source:
`Swarmed - −14 to hit` puts a hyphen against a minus sign, and four `console.error` sites read
`failed - ,e`; both wanted a colon.

⚑ **EVERY REPLACEMENT IS THE SAME LENGTH OR SHORTER** (3 bytes to 1, or 4 to 1 where the leading
space was eaten), **so no box needed re-measuring, and that is arithmetic rather than a hope.** It
is the reason a 195-site text sweep needed no layout pass at all.

⚠ **A 14 MB STRING RE-SLICED 195 TIMES TIMES OUT AT TWO MINUTES.** Build the edit list, assert no
overlaps, rebuild in ONE pass. Offsets are also the integrity check: the run aborts unless every
offset still holds an em dash in the shape its code assumes. Then encode to bytes BEFORE opening
anything for writing, per [[grimtoll-safe-file-patching]].

**Gates, all in the running build:** `LINT()` 0 · the em dash test false on EVENTS/CAMPS/VIGNETTES ·
`spacingViolations()` `labelViolations()` and the `MAP_SIGHT` orphan check 0 · every road door still
carries an intent glyph, 1 `mystery` door · no console errors · 190 lines changed 1:1, BOM and all
36,802 CRLF endings intact, `node --check` clean. Driven live: help, promotion card, muster line,
and a SIM battle where the placeholders filled from `–` to `6` / `HAPPY` / `58%`.

⚠ **THE PANE COMPOSITES NOTHING, SO A MUTATING CALL TIMES OUT WHILE STILL LANDING ITS SIDE EFFECT.**
`openHelp()` "timed out after 30s" and the help screen was open when the next call read it. **Call
the mutator in one call, accept the timeout, READ in the next.**

**Out of scope by the user's ruling:** the 1,141 comments, all of `docs/`, and `tools/`
(`dramaturge.html` 211, `harness.js` 11). **`index.html` deliberately not rebuilt**: generated, last
built at #194, and rebuilding it here would sweep #196's undeployed work into this diff. See
[[grimtoll-share-link]].

⚠ **`docs/SHIPPED.md` has no row for #187 through #196** and now #199 either. That gap predates this
entry; recent practice is a CHANGELOG build-log row plus a `WHAT_TO_TEST.md` section, both written.
