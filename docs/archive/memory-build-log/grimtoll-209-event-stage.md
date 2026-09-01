---
name: grimtoll-209-event-stage
description: "#209 (8f.232), 2026-08-20: every card in the game is style J's painted stage - road, fire and vignette through ONE evStageOpen. 99 cards changed form and none changed a word, because the beats, the voices, the faces and the picture treatment are all DERIVED. Landed on main and DEPLOYED, both pages (the /play/ playtester build was four entries stale and was rebuilt with -Player)."
metadata: 
  node_type: memory
  type: project
  originSessionId: 22105e91-e565-4afa-abac-7913529353f6
  modified: 2026-08-20T15:08:01.816Z
---

**The road deck, the CAMPS incidents and the VIGNETTES are one 1180x620 painted stage now**: the
company stands in the picture on the left, the prose arrives a beat at a time down the middle, the
doors are the last beat. Built from `prototype/event_formats_sketch.html` tab J, story-mode, at the
user's *"I like style j (the sitting stone) ... inherit composition and everething else"* and then
*"but form of all events new - as was in new design - it is canon now"*. The standing rules are in
`.claude/rules/event-cards.md` and `.claude/rules/static-event-art.md`; this is what is worth
carrying forward.

⛔ **NOT ONE OF THE 99 CARDS CHANGED A WORD, AND THAT IS WHY IT COULD BE DONE IN A DAY.** Everything
the stage shows is read off what the cards already carry: the `\n\n` paragraphs ARE the beats, a
paragraph's own FIRST CHARACTER is its voice (a quote is somebody else, `{` is a cast token and
therefore one of yours), `needRace` is the second face and the door's actor, `G.fireTeller` is the
first, and the fire's two people come off the prose names it was already cast with. #137's rule
applied to a LAYOUT instead of to a field. **The proof arrived by itself**: another session landed a
brand-new card (#210's `chase`) mid-build, written for the old format, and it renders correctly on
the stage with no edit.

⛔ **`G.fireTeller` IS NEVER CLEARED, SO A DERIVED PICTURE OFF IT GOES STALE.** It has to survive its
card - `{TELLER}` must resolve to the same body in the body, the outcome and the effect prose - so
the first cut put THE COIN IN THE ROAD's finder on the front plate of A WEDDING ON THE ROAD three
nodes later. **The gate is the card's own RAW text**: no `{TELLER}` in it, no named subject. A
picture is a claim, and a stale one is a claim nothing else on screen agrees with.

⛑ **THE MODE FOLLOWS THE CONTENT, NEVER A CLASS ON `#wDlg`.** Twelve functions open that box and
only three are cards. `:has(.evstage)` cannot drift, because every opener writes `innerHTML` from
scratch; a class the other nine had to clear survives until somebody writes the thirteenth opener.

⚠ **A MOCKUP IS A PICTURE OF THE INTENT AND ITS TYPE IS NOT PART OF WHAT YOU COPY.** The sketch sets
the door label at 12.5px, its receipt at **8px** (under the 10px floor) and clips both with
`nowrap`+`ellipsis` - the exact regression table in `.claude/rules/ui-scales.md` §4. Its door colours
were `#63766f`/`#82958b`, which on this build is the BATTLE chrome. The user caught both himself
(*"also follow rules with fonts size"*, *"colors what don`t use in the game"*). See
[[grimtoll-text-style]] for the same split on words.

⚑ **THE J PACK HAS ITS OWN MARKER AND ITS OWN INJECTOR, AND THAT IS THE REUSABLE BIT.**
`art/build_j_pack.py` + `art/inject_j_pack.ps1` -> `/*__J_PACK__*/`, holding the 8 intent marks, the
3 race marks and the wide 1672x941 stages. **Never `/*__ART_DATA__*/`**: that injector rewrites 10 MB
and two desks running it is the unresolvable conflict [[grimtoll-parallel-sessions]] still lists as
open. This is the half of the build being actively redrawn, so it is rebuilt constantly. **Adding a
stage is three steps and one row**: PNG into `art/src/stage-6/j-stage/`, rebuild + inject, one row in
`JSTAGE`. 7 road cards have one; everything else falls back to the 586x212 letterbox and picks up the
heavier crop treatment automatically (`.evstage.fit`).

⚠ **THREE THINGS BROKE AND ALL THREE WERE FOUND BY DRIVING, NOT BY READING**: `placeDlg` read the
`DLGW` constant and there are two card widths now, so the stage opened 280px off centre; **a column
flex SHRINKS its items before it scrolls**, which cut a chip row in half on the OUTCOME only (a card
that fits never shows it); and the blurred background overflowed 12x6 until `transform-origin` was
pinned to `100% 100%`, because overflow to the left and top is not scrollable. See
[[grimtoll-measuring-the-running-build]].

⛔ **AND THE SESSION OPENED BY BREAKING THE CIRCULAR CLAIM.** Every session had stopped with #208's
work uncommitted in the main desk, and its 8f.231 claim blocked the very commit that would have
swept it. The fix is the surgical one [[grimtoll-parallel-sessions]] describes: back up
`.grimtoll/claims/`, delete **only** the file for the number whose work you are actually committing.
**Do that first** - it takes two minutes and it gives everything after it a restore point.

**How to apply:** the form is canon, so a new card gets no layout of its own. If a card wants
something the stage cannot show, add a fifth thing to `evStageOpen`'s options, never a second
renderer. Related: [[grimtoll-event-card-rules]], [[grimtoll-192-item-pack-01]].
