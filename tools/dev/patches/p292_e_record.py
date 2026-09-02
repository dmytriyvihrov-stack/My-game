# -*- coding: utf-8 -*-
"""#292 - the five writes, plus the rule file the entry moved.

Run:  python tools/dev/patches/p292_e_record.py
"""
import sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..'))
from safeedit import patch, ROOT

D = lambda *p: os.path.join(ROOT, *p)

# ══════════════════════════════════════════════════════════════════════════
# WRITE 1 · CHANGELOG.md, the build-log row
# ══════════════════════════════════════════════════════════════════════════
CHANGELOG_OLD = ("| 8f.315 | **#292 - THE DESIGN PASS: THE POOLS, THE SEAMS, THE STRIP AND THE "
                 "CORNERS** TODO: what changed, why, what it cost, and the gates it passed. |")

CHANGELOG_NEW = (
 "| 8f.315 | **#292 - THE DESIGN PASS: THE POOLS, THE SEAMS, THE STRIP AND THE CORNERS.** "
 "*(User, 2026-09-02: пройдись по "
 "дизайну всех "
 "екранов / Сделай "
 "лучше - мор "
 "соответствующий, "
 "консистент, четче "
 "бордеры и т.д. / бар "
 "здоровье, брони и "
 "морали четче.)* "

 "⛔ **A DESIGN PASS IS A MEASUREMENT OR IT IS TASTE, AND THIS FILE HAS THE RULE FOR THAT "
 "ALREADY.** `.claude/skills/ui-scales/SKILL.md` opens by naming the mechanism: *a build polished "
 "screen by screen converges on locally-perfect and globally-unrelated, and the author is the one "
 "person who cannot see it.* So the entry starts with a probe rather than an opinion - "
 "`tools/dev/probes/edges.js`, which walks `#stage *` on the world, the sheet, the battle and the "
 "front door and groups every **visible** border by colour and width, naming the elements. "
 "Everything below came off that table and off five clipped screenshots. "

 "⛔ **WHAT IT FOUND, AND NONE OF IT WAS ARGUABLE.** The teal chrome had **five** colours where "
 "the scale has two: `--e4` was not drawn on the battle screen at all while `#24383a` (the four "
 "stat cells), `#3a4f52` (the twelve act cards) and `#223335` (the log head and the log's own "
 "footer door) did its job, and the hover was `#4d6b6c` at ten sites plus **`#4c6a6d` at one** - "
 "the act card's popover, one unit of blue away from the other ten and unfindable by eye. The gold "
 "ladder had the same drift on the sheet: `#3d2f20`/`#3d3020` is `--e1` off by three units, and "
 "**`#2a2114` - a BACKGROUND colour at eleven other sites in this file - was doing edge duty** on "
 "the roster tile, the tab strip, the derived row and the empty ledger chip. The two top bars "
 "disagreed about their own seam (`#wBar` 1px, `#iBar` 2px, both `--e1`). The world bar carried "
 "**three chip grounds in one 42px strip** (`#221a10`, `#161009`, `#1a1a14`), which is #197's own "
 "ask (*\"Make heights same size, so it looks nicer\"*) finished on one axis and left standing on "
 "the other. And the three doors a player sees on all fourteen screens measured **23, 20 and 24** "
 "px tall on **two different floors** (10 and 6). "

 "⛔ **THE POOLS: THE DIVIDERS WERE DRAWN ON THE HALF THAT IS STILL THERE.** #94's whole "
 "argument for sectioning armour and hitpoints is that *the width of one section IS a blow's "
 "worth*, so the question the bar answers is **how many more**. The ink was `rgba(7,11,12,.92)` and "
 "the troughs are `#243133` / `#3b2126` / `#20272a`: over steel or blood that is a clean notch, "
 "over the drained half it is one dark on another. **So every bar in the game read as sectioned "
 "exactly where the pool still is and as one unbroken block exactly where it is gone**, which is "
 "the reading backwards, and the mood row had it worst - a body at STEADY has two thirds of its "
 "ladder drawn on the trough, so the rung gates the whole row is READ against were the part you "
 "could not see. ⛑ **The rim is the light the fill already wears**: `.sbb>i::after` crowns "
 "every fill with `rgba(255,246,224,.20)`, so a 1px stop off that family reads as the lit side of a "
 "groove on the fill and as the only visible thing on the trough. One declaration, both grounds, no "
 "colour invented, and `--nrvticks` takes the same two stops beside `LADDER` where #266 put it. "

 "⛔ **AND THE TROUGH WAS TYPED TWICE, WHICH IS RULE 4 ON THREE COLOURS.** `#243133`, `#3b2126` "
 "and `#20272a` sat inline on the battle card's markup **and** inline again in `drawInv`'s string: "
 "two builders for one fact, on two screens that have to agree or the same pool means two things. "
 "The row says which pool it is (`.parm` / `.phit` / `.nrv`) and three stylesheet rules say what a "
 "drained one looks like; the six inline declarations are gone and the computed colours are "
 "byte-identical on both hosts. ⚠ **The FILL stays inline and must**: it is `--steel`, "
 "`hpCol`'s ramp and the rung's own colour, which is three readouts. "

 "⛔ **THE ARMOUR ROW HAD NO DENOMINATOR, ON ONE SCREEN ONLY.** It printed `10` under a `19/19` "
 "and over a `68/120` while the same row on the battle card has read `2/2` since #247 - one pool of "
 "three saying what it is out of, depending on where you were standing. Measured on the whole "
 "company, `armourValue(p)` **is** `u.armourMax`, which is why the fill is drawn at 100%: out of a "
 "fight the shell is whole and saying so is the point. "

 "⛑ **THE RULE THE SEAMS NEEDED, WRITTEN DOWN SO THE NEXT ONE HAS SOMEWHERE TO LAND**: a BOX "
 "takes 1px of `--e1`; a **SEAM** - the line between two panes of one screen - takes 2px of `--e2`, "
 "one step lit-ter, because it is dividing rather than containing. Five seams (`#wBar`, `#iBar`, "
 "`#iRoster`, `#iStash`, `#iTabs`) now say the same thing, and the sheet's spine is visible for the "
 "first time. ⚠ §2's *\"1px, or 2px when a thing is picked\"* is untouched: a seam is not "
 "a box. "

 "⛑ **`--e6` IS THE STEP THE TEAL LADDER NEVER HAD.** The gold side is dim/raised/lit and the "
 "teal side stopped at two, so every raised or hovered teal edge in the build was a literal - which "
 "is exactly how `#4c6a6d` got in. ⚠ **Two sites keep the literal on purpose and must not be "
 "swept in**: `#tutCard.call` and `#bLog .ll.mine` are MEANING rails (whose voice is speaking) that "
 "happen to be teal, and §2 forbids collapsing one of those into the structural scale even "
 "when the hex agrees today. That is why the border grep now reads **2 and not 0**, and the rule "
 "file records both. "

 "⛑ **`--chromeChip:24px` AND NOTHING SHRANK.** 24 is the tallest of the three doors, so "
 "`? RULES` keeps `--fs4` and `FEEDBACK` keeps `--fs1` and only the BOXES agree; `#bPace` (which "
 "stands directly under `☰ MENU` in the same column, 19 against 24) and the sheet bar's two "
 "buttons join them. ⛔ **And the `?` on the battle card was the fifth cell in a row of five at "
 "half their height** - `#bStats` is `align-items:stretch`, its four `.pcell` children measure 35 "
 "and `#bLegend` was 19, hung off the bottom edge. "

 "⛑ **The map got the cheapest fix in the entry.** `.node.live`, `.mark`, `.goal` and `.done` "
 "captions have each carried a `box-shadow:0 0 0 1px` ring since they were written and the PLAIN "
 "caption had none, so two thirds of the labels were an unbounded smudge over painted ground and "
 "the rest were plates. A shadow and never a border: `world-map-sights`' three counters measure "
 "label BOXES, and a border would have grown every one of them by 2px. **spacing/label/orphan stay "
 "0/0/0 by construction.** "

 "⚡ **AND THE PADDING SCALE IS CLOSED AGAIN AFTER AN UNKNOWN NUMBER OF ENTRIES.** §5's "
 "grep has expected `86px` **alone** since it was written and returned `3px, 86px` on HEAD: two "
 "literals, one pixel each, in the ladder tooltip's `×2` chip and the enemy readout's "
 "sentence. Both are `--p2` now. "

 "**Gates.** `gt.py check` 3 scripts 0 problems · `emdash.py` exit 0, the file's `—` count "
 "unchanged at 1098 · `LINT()` **0** · floor `[]` on **all four screens**, not just the "
 "open one · sheet clip `[]`, battle clip the documented set · `sheetOverlap` `[]` · "
 "map **0/0/0** · `cards.emdash` false, `noIco` 0 · the stat tip on all four stats "
 "`0,0` and not offscreen · `smoke.js` **19 walks, 0 errors** · the three scale greps: "
 "font-size **0**, padding **86px alone**, border **2 documented**. "
 "⛔ **AND THE ONE THAT MATTERS FOR A LAYOUT ENTRY: THE `HEAD:` BASELINE DIFF.** A raw count "
 "means nothing, so `HEAD:prototype/grimtoll_slice.html` was served on a second port and "
 "`gates.js sheet.js cardfloor.js` run on both. **Byte-identical output**: the same slack figure on "
 "every one of sixteen body-and-state cases, the same clip lists, the same card overflow. Nothing "
 "moved; only what you can see changed. |")

# ══════════════════════════════════════════════════════════════════════════
# WRITE 2 · SHIPPED.md
# ══════════════════════════════════════════════════════════════════════════
SHIPPED_OLD = ("| **292** | **the design pass: the pools, the seams, the strip and the corners.** "
               "TODO: one line. | TODO: open remainders, or leave empty |")

SHIPPED_NEW = (
 "| **292** | **The design pass, off a probe rather than an opinion.** `probes/edges.js` groups "
 "every visible border on four screens by colour: the teal chrome had **five** colours where the "
 "scale has two (`#4c6a6d` and `#4d6b6c` were the same hover spelled twice), `#2a2114` - a "
 "BACKGROUND colour - was drawing four edges on the sheet, the two top bars disagreed about their "
 "own seam, the world bar carried **three chip grounds in one 42px strip**, and the three doors on "
 "every screen were 23/20/24px tall on two different floors. ⛔ **The pools: the section "
 "dividers were drawn only on the half that is still there** - dark ink on a dark trough, so a bar "
 "read as sectioned where the pool IS and unbroken where it is gone, which is #94's blows-left "
 "question backwards. A 1px rim off the fill's own crown light fixes both grounds in one "
 "declaration. ⛔ **The three trough colours were typed in two builders** and are three "
 "stylesheet rules now; **the sheet's armour row got the `/max`** the battle card has printed since "
 "#247. ⛑ A **seam** is 2px of `--e2`, a **box** is 1px of `--e1`, `--e6` is the step the teal "
 "ladder never had, and `--chromeChip:24px` is the tallest of the three doors so nothing shrank. "
 "Map captions all get the hairline the live one had, by `box-shadow` so the three map counters "
 "cannot move. **The `HEAD:` baseline diff is byte-identical on sixteen sheet cases**: nothing "
 "moved, only what you see. *(2026-09-02, 8f.315)* | ⏳ The stash column is 606px of mostly "
 "empty on day one and this entry did not touch it. 👤 **AG1** the battle card's mood row "
 "still has no figure while the sheet's has one. 👤 **AG2** the right half of the company "
 "sheet. |")

# ══════════════════════════════════════════════════════════════════════════
# WRITE 3 · 00_PLAN_AND_BACKLOG.md
# ══════════════════════════════════════════════════════════════════════════
PLAN_OLD = ("| **#292** *(TODO MM-DD)* | **the design pass: the pools, the seams, the strip and "
            "the corners** | 8f.315 |")
PLAN_NEW = ("| **#292** *(09-02)* | **the design pass: the pools, the seams, the strip and "
            "the corners** | 8f.315 |")

# ══════════════════════════════════════════════════════════════════════════
# WRITE 4 · WHAT_TO_TEST.md
# ══════════════════════════════════════════════════════════════════════════
WTT_OLD = (
 "## #292 - the design pass: the pools, the seams, the strip and the corners\n"
 "\n"
 "**In the game.** TODO: how to reach it in three steps.\n"
 "\n"
 "- TODO: what should happen.\n"
 "- TODO: what would be a bug.\n")

WTT_NEW = (
 "## #292 - the design pass: the pools, the seams, the strip and the corners\n"
 "\n"
 "**In the game, and nothing about the rules changed.** Every line of this entry is what a screen\n"
 "LOOKS like. If a number, a door or an outcome behaves differently anywhere, that is the bug.\n"
 "\n"
 "**In three steps.** Take the road and look at the **top bar** · press **THE COMPANY** and\n"
 "look at the **three bars** top left · walk into a fight and look at the **same three bars**\n"
 "on the card bottom left.\n"
 "\n"
 "- **The three pools are the thing to look at hardest.** Armour, hitpoints and mood, on the sheet\n"
 "  and on the battle card. The **dividers should now be visible along the WHOLE bar**, not just\n"
 "  over the coloured part: a body at half health should show you the empty half in sections too,\n"
 "  because that is the half that answers *how many more blows*. The frame round each bar is one\n"
 "  step brighter. **On the sheet the armour row now reads `10/10`** rather than `10`, which is what\n"
 "  the other two rows and the battle card have always done.\n"
 "- **The top bar is one strip now.** Every chip on it stands on the same brown and wears the same\n"
 "  gold hairline; the two that carry a colour (the mood face and the heart) wear the mood's or the\n"
 "  blood's own colour, at two thirds rather than at two fifths, so they read as chosen rather than\n"
 "  as forgotten. The sheet's bar carries the same strip, so the two screens are one bar.\n"
 "- **The seams.** The line under both top bars, and the two lines that box the company sheet's\n"
 "  middle column, are all 2px of the same gold. The sheet used to have a spine you could not see.\n"
 "- **The corners.** `? RULES` bottom left and `FEEDBACK` bottom right are the same height and stand\n"
 "  on the same floor now, on every screen; `☰ MENU` top right is the same box; and on the\n"
 "  battle screen the **×1 speed knob under it** matches. The little **`?`** at the end of the\n"
 "  battle card's bottom row is a full-height cell in that row rather than a half-height chip.\n"
 "- **The map.** Every place name has the same hairline plate. Before, only the live one, the marked\n"
 "  one, the goal and the finished ones did; the rest were a shadow with no edge.\n"
 "- **What would be a bug**: a bar whose figure is clipped or whose fill has changed colour; a\n"
 "  divider that is now so loud it is hard to read the number over it; a chip on the top bar that\n"
 "  did not get the new ground; a name plate on the map that has moved or collided with another\n"
 "  (the plate is a shadow and costs no space, so it should not have); a corner door that overlaps\n"
 "  something. ⚠ **And anything at all that is not a picture** - a price, a roll, a door, a\n"
 "  fight: nothing in this entry was allowed to touch those, and the sheet measured identical to\n"
 "  the previous build on all sixteen body-and-state cases.\n")

# ══════════════════════════════════════════════════════════════════════════
# WRITE 5 · OPEN_QUESTIONS.md
# ══════════════════════════════════════════════════════════════════════════
OQ_ANCHOR = "## AF · From #289"
OQ_NEW = (
 "## AG · From #292\n"
 "\n"
 "| | the question | ⭐ mine |\n"
 "|---|---|---|\n"
 "| **AG1** | **The mood row on the BATTLE CARD still has no figure, and the same row on the sheet "
 "has had one since #257.** #247 gave the mood bar the rung name on the argument that *its value IS "
 "the word*; #257 then put `68/120` on the sheet's copy because *every body opens a fight at the "
 "same 71% of its own pool, so the ladder's whole positive half was invisible*. That argument is "
 "just as true mid-fight, where morale is the thing actually moving. The card has the room (the row "
 "is the same 17px grid and the word would move left, exactly as it does on the sheet). **This is "
 "the one place left where the two hosts of one readout disagree.** | put the figure on the card "
 "too, and the three rows say the same thing on both screens |\n"
 "| **AG2** | **The right half of the company sheet is 606px of mostly empty on day one.** THE "
 "STASH holds four things at the start and the panel runs the full height of the screen; the PERKS "
 "tab beside it is empty until level 2. Nothing in this entry touched it because it is a layout "
 "decision rather than a consistency one, but it is the largest single piece of dead ground in the "
 "build and it is on the screen a player opens most. | narrow it and give the width back to the "
 "middle column, which is where the doll and the skills are cramped |\n"
 "\n"
 "---\n"
 "\n"
 + OQ_ANCHOR)

patch([(CHANGELOG_OLD, CHANGELOG_NEW)], path=D('docs', 'CHANGELOG.md'))
patch([(SHIPPED_OLD, SHIPPED_NEW)], path=D('docs', 'SHIPPED.md'))
patch([(PLAN_OLD, PLAN_NEW)], path=D('docs', '00_PLAN_AND_BACKLOG.md'))
patch([(WTT_OLD, WTT_NEW)], path=D('docs', 'WHAT_TO_TEST.md'))
patch([(OQ_ANCHOR, OQ_NEW)], path=D('docs', 'OPEN_QUESTIONS.md'))

# ══════════════════════════════════════════════════════════════════════════
# and the rule file the entry moved
# ══════════════════════════════════════════════════════════════════════════
SK = D('.claude', 'skills', 'ui-scales', 'SKILL.md')

patch([
 ("| `--e4` | `#2c3d3f` | teal, dim. The battle chrome |\n"
  "| `--e5` | `#35494c` | teal, lit. The battle chrome, raised |",

  "| `--e4` | `#2c3d3f` | teal, dim. The battle chrome |\n"
  "| `--e5` | `#35494c` | teal, mid. The battle chrome, raised |\n"
  "| `--e6` | `#4d6b6c` | teal, lit. **A hovered or focused teal edge** (#292) |"),

 ("⚠ Thickness is 1px, or 2px when a thing is picked. `border:Npx solid transparent` at "
  "2.5/3/7/9 is a\nCSS triangle, not an edge, and is off the scale on purpose.",

  "⛔ **A BOX IS 1px OF `--e1`. A SEAM IS 2px OF `--e2`** *(#292)*. A seam is the line between "
  "two\nPANES of one screen - `#wBar` and `#iBar`'s bottoms, `#iRoster`'s right, `#iStash`'s left, "
  "`#iTabs`'s\nbottom - and it is one step lit-ter because it divides rather than contains. Before "
  "#292 the two top\nbars disagreed about their own (1px against 2px, both `--e1`) and the sheet's "
  "whole spine was two\ninvisible pixels wide.\n"
  "⚠ Otherwise thickness is 1px, or 2px when a thing is picked. `border:Npx solid transparent` "
  "at 2.5/3/7/9 is a\nCSS triangle, not an edge, and is off the scale on purpose.\n"
  "⚠ **`--e6` HAS TWO DOCUMENTED LITERALS AND §5'S BORDER GREP READS 2, NOT 0.** "
  "`#tutCard.call`\nand `#bLog .ll.mine` are MEANING rails (whose voice is speaking) that happen to "
  "be teal, so the rule\ntwo lines up forbids collapsing them - **they are the exception the grep "
  "counts, the way `86px` is\nthe exception the padding grep prints.** A third one appearing is the "
  "bug."),

 ("⛔ **A HEIGHT IS NOT A `--p` STEP AND MUST NOT BE MADE ONE.** `--barChip:30px` sits in "
  "`:root` on the\nsame footing as the 86px reservation and carries its arithmetic for the same "
  "reason.",

  "⛔ **A HEIGHT IS NOT A `--p` STEP AND MUST NOT BE MADE ONE.** `--barChip:30px` sits in "
  "`:root` on the\nsame footing as the 86px reservation and carries its arithmetic for the same "
  "reason. **`--chromeChip:24px`\nis the second one** *(#292)*: the height of the three doors a "
  "player sees on all fourteen screens\n(`? RULES`, `☰ MENU`, `FEEDBACK`, and `#bPace` and the "
  "sheet bar's buttons with them). 24 is the\nTALLEST of the three as measured (23/20/24), so it "
  "took no type down a step to buy the alignment."),

 ("| inside, **the middle** | the figure, **`--fs5` on both** |\n"
  "| the height | `--sbh`, **20 on both** |\n"
  "| the frame | a `box-shadow` on `.sbt`, never on `.sbb` |",

  "| inside, **the middle** | the figure, **`--fs4` on both** |\n"
  "| the height | `--sbh`, **17 on both** |\n"
  "| the trough | `.parm` / `.phit` / `.nrv` **in the stylesheet** (#292), never inline in a "
  "builder |\n"
  "| the frame | a `box-shadow` on `.sbt`, never on `.sbb`. **`--e2`** since #292 |\n"
  "| the dividers' rim | a 1px `rgba(255,246,224,.17)` stop **before** the dark one (#292), or the "
  "sections exist only over the fill |"),

 ("grep -o \"border[a-z-]*:[^;}\\\"']*\" prototype/grimtoll_slice.html | "
  "grep -icE \"#(3d2f1d|4d3c22|6b5330|2c3d3f|35494c|33474a|3d5250)\"  # 0",

  "grep -o \"border[a-z-]*:[^;}\\\"']*\" prototype/grimtoll_slice.html | "
  "grep -icE \"#(3d2f1d|4d3c22|6b5330|2c3d3f|35494c|4d6b6c|33474a|3d5250)\"  # 2, and both named "
  "in §2"),
], path=SK)

print('p292_e: the five writes and the rule file')
