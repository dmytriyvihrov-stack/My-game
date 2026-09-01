---
name: grimtoll-207-event-and-hover-books
description: "#207 the event book + the hover book, delivered 2026-08-21: two documents generated straight out of the build, the three design findings, and why the first parse silently missed a card and three whole decks"
metadata: 
  node_type: memory
  type: project
  originSessionId: 62f76a07-417d-43a3-a6f9-26b7a63918cb
  modified: 2026-08-20T09:38:31.301Z
---

**#207, 2026-08-20.** The user: *"collect all texts of all events (road and typical) in one google doc
file. Highlight weaker events or choices, that you think not interested or doesnt provide you with
decisions or not open loop enough"* and *"prepare separate file with texts of all hovers in the game -
and before hover show exactly where does it belong"*.

Delivered as `content/2026-08-21 RabbleBound - every event text.docx` and `… every hover text.docx`.
**Event book: 18,053 words, 66 cards. Hover book: 8,649 words, 88 hover sites (71 player-facing,
17 dev).** ⚠ The `.html` twins from the first cut were DELETED rather than regenerated: two
builders for one document is the second-source shape this project keeps deleting, and the HTML had
already gone stale within a day.

## ⛔ THE FIRST CUT PARSED A FILE THAT WAS 2,861 LINES SHORT, AND NOTHING SAID SO

The re-check the user asked for is the entry. `wc -l prototype/grimtoll_slice.html` read **38,518**
on the first pass and **41,379** on the second, at the same commit, with `git status` clean both
times and `git diff` empty. The repo lives inside the Google Drive folder, so the working tree is a
Drive mirror and the first read got a partially-materialised copy.

⛔ **BRACE MATCHING SUCCEEDED ON THE SHORT FILE**, which is why it was invisible: `EVENTS` parsed
clean, 39 cards, no error. The 40th (`chase`, #210) simply was not there. **A parser that succeeds
is not evidence the input was whole.** The cheap guard is to compare `wc -l` against
`git show HEAD:<path> | wc -l` before trusting any extraction out of this tree.

## ⛔ THE THREE FINDINGS, and the first two are defects

1. **A race door is FREE and pays MORE than the door beside it**, on the wedding, the pork barrel,
   the Sitting Stone and the peat body. `raceDoorPick` only ever offers ONE race door and the
   ratkin's wins, so a company holding a ratkin resolves all four cards to a free maximum. The race
   doors are some of the best writing on the road; the bug is that they cost nothing.
2. **`rep:` is inert on seven doors and `doorGives`/`doorCosts` still read it.** Factions were cut
   and `pickChoice` says so in a comment, but the pair that decides whether `dropDeadExits` deletes
   a walk-away still counts `rep` as a payment. Two of those doors (THE SITTING STONE's bread, WHAT
   THE PEAT KEPT's cover-it-over) are dominated *because* the field pays nothing.
3. **Eight cards end on a promise nothing keeps** - the salt-wives walking inland, the clan that now
   knows your banner (`clan-favour` exists ONLY in the Dramaturge's rubric, the string is not in the
   game at all), the drowned village, the name carved by the bunk. Compare [[grimtoll-event-card-rules]]:
   WHAT THEY DID BEFORE is the only fire card that writes a node onto the world map.

## ⛔ AND THREE WHOLE DECKS WERE MISSED, ALL FOR ONE REASON: THEY ARE FUNCTIONS

The first cut walked `EVENTS`/`CAMPS`/`VIGNETTES`/`MERCY` and every deck written as a FUNCTION was
invisible to it:

- **the opening pair** - `openPrologue()` and `tavernContract(won,skipped)` hand cards to
  `prStage()`. THE THREE BELLS, and THE MAN IN THE CORNER with **three** arrivals.
- **the cub screen** - `cubChoice()` builds THE CUB / THE FIELD / SHE GOES BACK INTO THE WATER as
  one `innerHTML` string. Three doors, and all three pay.
- **the mercy screen's BODY** - `mercyLine(race)`, three variants. The doors were in the book and
  the paragraph above them was not.

⚑ **THIS IS THE SAME BLIND SPOT `.claude/rules/event-cards.md` ALREADY RECORDS TWICE**: the #154
glyph pass walked EVENTS and CAMPS, so the opening's `Draw your sword.` had no sword until #155;
LINT 6f is scoped the same way, so `MERCY.opts` and the cub’s rows kept the two-receipts defect
through every sweep. **A sweep over this build that walks the tables is a sweep that misses four
decks**, and the count to check against is the callers of `evStageOpen`/`prStage` plus `cubChoice`.

⛑ **THEY ARE CAPTURED BY DRIVING THEM, NOT BY READING THEM**: stub `prStage` to record its
argument, hand `$` an object with an `innerHTML` setter, and call each entry point once per branch.
⚠ **A Proxy is TRUTHY**, so `if(LEGACY.brawlDone)` sent `openPrologue` down the returning-player
path and captured nothing. Any flag a deck GATES on has to be a real value, never a bottomless stub.

## ⛑ HOW THE BOOKS ARE BUILT, because the method is the deliverable

**Nothing is retyped.** `EVENTS`/`CAMPS`/`VIGNETTES`/`MERCY` are sliced out of the prototype by
brace-matching and evaluated in a node `vm` behind a `with(Proxy)` scope whose `has` is always true,
so a body that reads `G` or calls a helper returns its real string instead of throwing. Function
bodies are run against three ledger states and **every distinct branch is printed**.

⚠ **Stubbing a helper to `''` silently truncates prose and it looks like authored text.**
`plantStash` stubbed empty cut both outcomes of WHAT THEY DID BEFORE from ~70 words to one sentence,
and `proseName` stubbed empty made THE RED LIGHTS open with a leading space. Copy the real helper in.
⚠ **Cast placeholders must be ONE word**: the camp chain calls `fst()` on them, so `{NAME A}` came
back as `{NAME`. Use `PERSON_A` and substitute on the way out - the same trap `tools/events_text.js`
records.

⛔ **A DOMINATED-DOOR CHECK MUST REFUSE ANY DOOR IT CANNOT PRICE.** The first pass compared `fx`
alone and reported eleven road cards; six were `healAll`, `blessAll`, `opensRoad`, `strandOne`, the
two `plantStash` modes and `needUnpaid` - real payloads that live nowhere in `fx`, all working as
designed. Filter on the door's own `keys`, and skip pairs on disjoint sin branches.

## ⚠ THE DELIVERY: Google Drive Desktop IS NOT RUNNING on this machine

`C:\Users\USER\Google Диск\` is a **stale local mirror** - no `GoogleDriveFS` process, 15 items stuck
in `.tmp.driveupload`. Files written into the repo folder do NOT reach Drive until the client is
started. See [[grimtoll-share-link]].

⛔ **And the Drive connector cannot be handed a file.** `create_file` takes content in the request, so
a native Google Doc would mean retyping 15,859 words of the game's own prose - which breaks the one
guarantee these documents make. **.docx is the answer**: Google Docs opens it from Drive directly,
headings become the outline pane, and `w:highlight` on a RUN imports every time (paragraph `w:shd`
does not). Word's fixed sixteen colours are why the flags are yellow / pink / turquoise / green.

⚠ **AND THE HOVER LAYER MOVED TOO**, between one day and the next: `WTIPS.party` was rewritten by
#220 (bodies, not seats), the zone-of-control warning gained its odds clause, `choiceIco` became
`icoSpan`, and #216’s practice field added five hover sites on a screen reached from the front
door. **The front-door menu rows are hovers now** and were in neither book.

Builders are in the session scratchpad, not the repo. `tools/events_book.js` and
`tools/events_text.js` are the older in-game generators and were NOT used: they need the game running
and they carry no editorial layer. See [[dramaturge-tool]].
