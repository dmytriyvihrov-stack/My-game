---
name: grimtoll-text-edit-tool
description: "#172 the ✎ TEXT dev-mode editor - built 2026-08-16, MERGED AND LIVE on main since 8f.204; the user will hand over grimtoll_text_edits_*.json ledgers and a session APPLIES them to the source"
metadata: 
  node_type: memory
  type: project
  originSessionId: 31559653-4e4e-446f-9b6e-984981010fb3
  modified: 2026-08-17T21:09:37.919Z
---

**#172 (8f.200), built 2026-08-16 on `work/text-edit` (3092509).** ✅ **MERGED AND DEPLOYED** -
verified 2026-08-17 during the #176-#184 deploy: `work/text-edit`, `work/combat-feel` and
`work/combat-feel-3` are all ancestors of main with zero commits ahead, and the editor's code is in
the shipped page. *(It was held back at build time because main was mid-landing #164 by another
live session; that is history now, not a state.)* ✎ TEXT is the fifth tester-stack button: armed, one
capture listener intercepts every click, the clicked TEXT NODE opens an editor (delete / change /
note-to-AI), and the ledger persists in `gt_tedit_v1` (kept by WIPE HISTORY).

**The half that involves a future session:** the user exports the ledger as
`grimtoll_text_edits_<date>.json` (or pastes the JSON in chat). Applying it is the SESSION'S job,
not the tool's: for each edit find `orig` in `prototype/grimtoll_slice.html` (exact match first;
numbers may be interpolated, so fall back to the `screen`/`where`/`ctx` fields), apply
change/delete under the [[grimtoll-event-card-rules]] bands and the nine voice rules, run
`LINT()`, then push. A `note` op changes nothing now - it is a pinned instruction.

**Why:** the live DOM change is only a preview (renderers repaint from string tables), so the
ledger is the deliverable by design - do not "fix" previews evaporating on redraw.

**How to apply:**
- ⛔ The ledger's `where` breadcrumb is a HINT, never a selector to re-apply by.
- ⚠ `TE_EXEMPT` must contain `#askWrap`: CLEAR confirms through `ask()`, and an intercepted
  dialog cannot be answered while armed. Found by reasoning, not by the drive.
- ⛔ The CSS comment-terminator trap fired AGAIN on this entry (star-after-slash inside a comment
  naming var families ate the `#teditBtn` rule; `__cssTail` stayed true, classList checks stayed
  green). Read the COMPUTED style, not the class list - a real-viewport drive caught it via an
  impossible rect.
- ⚠ My new CSS is literal px with a comment to convert to #164's `--fs/--p/--e` steps at merge.

## ⛑ #198, 2026-08-19: THE FIRST REAL LEDGER APPLIED, AND FOUR OF 24 MARKS COULD NOT LAND VERBATIM

**The user's covering instruction is the one to keep:** *"If you see mistakes of mine - correct
it. If you see some pattern or similareties that could be done for other tasks - do it."*
⛑ **That second clause found more than the ledger did.** Treat an export as a SAMPLE of a
defect, never as the list of it.

- ⛔ **AN `orig` CAN BE ONE OF SEVERAL BRANCHES OF THE SAME STRING, AND THE EDITOR ONLY SAW
  THE ONE ON SCREEN.** The contract card's opening has three versions (won / lost / skipped brawl)
  and every one carried the purse the ledger moved. Applying the mark as exported would have put
  the purse on the wood **twice** on the two branches a player reaches. **Before editing a body,
  grep the distinctive phrase and count the hits.** Same shape as the `evGearStrip` call the
  ledger caught at one of its **two** sites.
- ⛔ **AND A MARK CAN CONTRADICT A LOCK THE USER CANNOT SEE FROM THE GAME.** *"He throws a bag
  of coint"* against `.claude/rules/static-event-art.md`, which locks `EV00E` to *he never throws
  it* and paints the purse being set down closed. **Prose that fights the painting on its own card
  is the wrong-unit defect with a canvas in it.** He puts it down instead.
- ⛑ **A PARAGRAPH BREAK IS A LAYOUT CHANGE ON A CARD WITH NO HEADROOM.** Splitting the new
  close in two took `#prCard` from **683px to 696 in a 684 ceiling** - it began to scroll - and the
  LINE COUNT WAS IDENTICAL IN BOTH (seven). The whole regression was one 9px paragraph gap. The
  ledger's own text had been a single paragraph and the split was mine.
- ⛔ **A `?` REQUEST IS THE ONE MARK THAT IS ROUTINELY ILLEGAL.** Asked for twice, refused
  twice, for two different reasons: `mystery` replaces the WHOLE sub-line, so it cannot go on a
  door whose line carries *what the fight fields*; and **LINT 6d** forbids one on a door that
  charges days/morale/coin/food. ⛑ **Both times the right landing was the half a `?` is
  actually FOR** - delete the payout promise, keep the price and the fight - **and that is the cut
  the user had made BY HAND two marks later in the same ledger.** When a mark is illegal, look
  through the ledger for the same intent expressed legally.
- ⛔ **A LABEL REWRITE CAN ASSERT A MECHANIC THAT IS NOT TRUE.** *"forget about your teammate"*
  on the sinkhole: `strandOne` walks them back on a **50% roll per leg**. Check the flag before
  writing the door.
- ⛑ **A `note` OP MAY BE BUILDABLE RATHER THAN PINNED.** *"instead of 'company' - here you can
  add dynamic name of company"* - `G.coName` already existed, set three roads earlier. Grep before
  parking a note. ⚠ And then apply it to **every branch**: the driven build showed the
  serjeant using the name on one accusation and "this company" on the other.
- ⛑ **DELETING A SUB-LINE OFTEN EXPOSES THAT IT WAS FALSE.** THE HOLD'S MEN's *"the hounds"*
  when `holdFoes` fields ONE at four bodies, no crossbow on the label at all, and a **party-scaled
  roster no static count can describe.** The ask was "cut it"; the answer was "measure it".
- ⚠ **`no cost` IS PROTECTED AND IS NOT A MOOD ECHO.** `fxNote({})` returns `''`, so nothing
  derives it, and voice rule 7 wants the free door to say so where others charge. Delete only the
  clause after it.
- ⛑ **A SWEEP OVER A TABLE MISSES EVERY ROW THE CODE WRITES AT RUN TIME.** #176 cleared 63
  mood echoes out of `CAMPS{}`/`EVENTS{}`; the 64th survived because that door is built in the
  RENDERER. Check the builders, not only the data.
- ⛔ **AND THE AFTERMATH TABLES STAY OUT OF SCOPE.** `MERCY` and the cub row wear the same
  `{t,c,fx}` shape but are not rendered by `choiceNote`, so their `c:` may be the only receipt
  there is. Left alone on purpose; see [[grimtoll-event-card-rules]].

