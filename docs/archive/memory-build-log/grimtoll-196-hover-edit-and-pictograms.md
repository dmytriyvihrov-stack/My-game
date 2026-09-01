---
name: grimtoll-196-hover-edit-and-pictograms
description: "#196 (8f.218) 2026-08-19: the hover layer was invisible to the text tool, and the races had two glyph vocabularies"
metadata: 
  node_type: memory
  type: project
  originSessionId: 49d790e7-4811-42cb-887c-176e90f9d4d0
  modified: 2026-08-19T09:31:14.265Z
---

**#196 / 8f.218, committed to main 2026-08-19 (`a56a73c`), NOT deployed.** Three asks: more space
in the ✎ TEXT dev tool, an option to edit text on hover, class and race as symbols. He picked the
pictogram set out of three options I put to him with previews.

⛔ **THE HOVER MODE IS NOT A SECOND WAY TO PICK. IT IS THE ONLY WAY TO REACH TEXT THAT HAS NO
CLICK** - and that was the finding, not the feature. `#gtTip` is ONE box driven by fifteen hover
sources across three screens, built `pointer-events:none` and hidden on the anchor's `mouseleave`,
so the cursor can never arrive on it and `caretRangeFromPoint` can never be asked. Beside it, 33
`title=` attributes that a native tooltip draws outside the DOM entirely. ✎ TEXT had been blind to
all of that prose since [[grimtoll-text-edit-tool]] built it in #172. The editor now offers TEXT /
HOVER BOX / TOOLTIP as targets and the ledger records `kind`, because "grep `orig` in the file" is a
different job for a body string than for a `title=`.

⚠ **THE DWELL RESTS ON MOVEMENT, NOT ARRIVAL.** A timer started at `mouseover` fires 420ms after
you ENTER an element, so crossing a screen opens an editor over whatever you passed. Restarting it
on every `mousemove` means it opens where you STOPPED - which is also exactly when a hover box is up
and settled. And it must refuse to fire while one is open, or the panel re-renders under the hand
every 420ms and the textarea loses the caret.

⛔ **A HOVER-BOX EDIT GETS NO PREVIEW AND MUST NOT FAKE ONE** (`tipOn` holds a function and rebuilds
`#gtTip` on the next enter). A `title=` does preview, because it is an attribute on an element that
survives.

⛔ **THE RACES HAD TWO VOCABULARIES AND NOBODY HAD NOTICED.** `RACE_ICON` said ◆ ▪ ⬢ (authored as
small/medium/huge BODY marks) on the sheet, rail and muster, while `RACE_ICO` on the event doors has
said 🐀 👹 🧑 since #154. Same fact, two symbols, two screens a player crosses in a minute - #102's
wrong-unit rule with the glyphs as the units. `RACE_ICON` is the source now and `RACE_ICO` READS it;
⚠ the dependency must run DOWNWARDS (declared 24,000 lines above) or it is the temporal-dead-zone
throw this file has shipped once.

⛑ **THE STANDING RULE THAT CAME OUT OF IT, now in `.claude/rules/event-cards.md`: the word comes off
a LIST and stays where ONE body is studied.** Roster, battle rail, tavern strip, muster wall,
aftermath recruits lose it; promotion card, the trade being PICKED, the lore box that IS the
explanation, and the camp news keep it. A symbol earns its place by sorting twelve rows and earns
nothing on the one row you are already reading. `bindLoreTips` now STRIPS the `title` it wires, or
one mark opens two tooltips.

⚡ **AND IT FIXED A SHIPPED CLIPPING NOBODY HAD REPORTED**: the battle rail is 194px and on HEAD an
ogre SPEARWOMAN overflowed by 2px, an ogre BATTLE-MAGE by 23, cut off inside the line. Measured only
because I ran the same probe against a `git show HEAD:` baseline in a second tab, which is
[[grimtoll-parallel-sessions]]-adjacent tooling doing its job.

⛑ **The mark size was measured at three steps rather than picked**: the roster's race line lands at
15 / 17 / 19px for `--fs4` / `--fs5` / `--fs6`, none clips anything, and ALL THREE are smaller than
what shipped because the old line wrapped to two lines at 27px. `--fs5` taken.

⚠ **OPEN, and his call:** the 🧑 human mark is the loudest thing on a roster row and the least
informative, because most of the company is human. A `filter` tint into the gold palette would keep
the shape and lose the shout, one line, if he says so.

⚠ **ALSO OPEN, flagged as a separate task chip:** the prototype carries **1,338 em dashes**, 181 of
them inside JS string literals that reach the player, against the hard rule in
[[never-use-em-dash]].
