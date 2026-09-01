---
name: grimtoll-220-world-bar-trim
description: "#220 the world bar: bodies not seats, the mood as a face, the menu top right - COMMITTED on desk work/worldbar-trim 2026-08-21 (8f.243), NOT landed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 255937f7-f1e6-4d62-95dc-662775b2df55
  modified: 2026-08-21T10:56:17.020Z
---

**#220 / 8f.243, 2026-08-21.** Three notes on the global map: *"Add 1 more thing: amount of units.
You can add just human class icon and number. For party size instead of protrait"* · *"at mood show
only icon on global map - not text. Text and full info show only when expanded"* · *"Move a menu to
the top right"*. Committed on desk `work/worldbar-trim` (`525fab2`). **NOT landed**: main's
`prototype/grimtoll_slice.html` was uncommitted under session `840ef40b`'s #219, so `merge.ps1`'s
guard would refuse. Land with `tools\branch.ps1 done worldbar-trim` from the main folder once that
session's work is committed.

⛔ **THE COUNT HE ASKED FOR HAD NEVER BEEN ON THE BAR, AND THE NUMBER THAT WAS THERE LOOKED LIKE
IT.** `partyUsed()` is SEATS and seats are size-weighted (ratkin 1, human 2, ogre 3), so a company
of four read `8/13` and nothing on any screen said four. ⚑ **A weighted total wearing a bare
`N/CAP` is indistinguishable from a headcount** - the ask reads as "add a feature" and the finding
is that a shipped readout had been answering a different question for months.

⚠ **AND TWO FIGURES IN ONE CHIP RUN TOGETHER.** `4` then `8/13 SEATS` lands 6px apart and reads
*48/13*. The word goes BETWEEN them (`SEATS 8/13`), which is the PAYDAY chip's own order - a `.nm`
label then its figure - and costs the chip nothing (127px either way). Measured, not eyeballed.

⛔ **A "FIRST CLEAR ROW" COMPUTED FROM THE STYLESHEET CAN BE OCCUPIED.** `top:52` is correct
arithmetic (the bar is 42, the tester's stack starts at 134) and it is `#wZoom`'s row - ROAD / NEAR
/ CLOSE, x 1118..1270, y 52..75 - which sits nowhere near `#menuBtn` in the file and which nothing
named. The menu printed straight through the word CLOSE. ⚑ **The fix that generalises is the
probe**: walk every visible box in `#world` whose right edge is past x 900 and whose top is under
y 200, in stage coordinates, and read what is actually there. One pass, and it also confirmed the
82 that replaced it. The screenshot is what said to look; the probe is what answered.

⚠ **SCOPED `body:has(#world.on)`**, the way `#audioBtn` carries its own world and battle overrides:
`MENU_ON` draws that button on five screens and the battle's top-right corner is the audio button's
at `top:74`. Verified on the battle screen - still bottom left at (100, 686).

⛑ **AND REMOVING THE PORTRAIT BROKE A DOCUMENTED DERIVATION.** `--barChip:30px` carried #197's
arithmetic *"the party chip holds a 24px painted bust plus its own border"*, and with the bust gone
that comment is a lie about a number that has not moved. It is a **declared** height now and the
comment says so. Same shape: `.rart` is 16px everywhere because #211 measured 16 as the ceiling for
a mark **in a line of text**, and a `.cchip` is a flex row with `min-height` pinned, so the one mark
standing alone can be 22 and the chip still measures 30. **A ceiling is only a ceiling in the
context it was measured in.**

⚑ Measuring a desk build: [[grimtoll-measuring-the-running-build]]. `eyes.py launch` ignored my
`--url` and opened the OTHER session's `localhost:8777` (main's checkout) - **navigate the page over
CDP after launching and re-check `location.href`**, or every number is about somebody else's file.

Related: [[grimtoll-211-213-race-marks-and-zoc]], [[grimtoll-parallel-sessions]].
