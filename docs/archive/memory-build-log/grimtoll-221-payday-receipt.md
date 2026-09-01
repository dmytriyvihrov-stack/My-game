---
name: grimtoll-221-payday-receipt
description: "#221 the payday and the card take turns, and the payday is a receipt - COMMITTED on desk work/worldbar-trim 2026-08-21 (8f.244), NOT landed"
metadata:
  type: project
---

**#221 / 8f.244, 2026-08-21.** *"on the event screen payday often blocks the event - maybe we
should do first paday, and then event. Or oposite"* and *"in payday window - shorter tex - more
amount of crons (bigger size) and when next one"*. Committed on desk `work/worldbar-trim`
(`e3f615f`), on top of [[grimtoll-220-world-bar-trim]]. **NOT landed**: main's prototype is still
uncommitted under session `840ef40b`'s #219.

⛔ **THE LAYER LADDER SAID IT AND THE CODE DID NOT.** #112 wrote *content outranks chrome*, and
`#wNews` has sat at **40** against the card's 30 the whole time, so the one line deliberately drawn
in the MIDDLE was drawn in the middle of the card. ⚑ **And it is not a z-index fix**: since #209 a
card is a 1180x620 stage on a 1280x720 screen, so there is nowhere for a 520px box to stand. The
two take turns.

⚑ **BOTH HALVES, BECAUSE THE COLLISION HAS TWO SHAPES.** A loud line raised while a card holds the
map waits in `G.newsQ` and is played by `worldTick` (the `f.days` path - a door that costs a day
and ticks a payday while its own outcome is on screen - which is the commoner one). And an arrival
waits for a line already playing. ⛔ **The guard is `G.moving`, held across the wait**: the tail of
`travel`'s `arrive` is a closure now with `G.moving=false` as its first line, because `firstTime`
is already false by then and a player who walked off in the 3.4s gap would never hear from that
place again.

⚠ **A NUMBER THAT WAS A FADE BECOMES A PAUSE THE MOMENT SOMETHING WAITS ON IT.** 6.5s was fine
while the line only faded; with the card waiting it is dead time. A receipt runs **3.4s** and only
loud PROSE keeps 6.5 - and `say2` READS `getComputedStyle(el).animationDuration` after the class is
on rather than carrying a copy, so the stylesheet stays the one place the number lives.

⚡ **AND TWENTY MINUTES WENT ON A HANG THAT WAS THE INSTRUMENT.** `openEvent` stopped answering over
CDP and every fresh connection wedged with it, `1+1` included, which reads exactly like an infinite
loop in new code. `Debugger.pause` on a second socket landed in the battle watchdog's ordinary
`setInterval`: the page was **idle**. The cause was the probe harness opening a socket per call and
never closing one. ⛑ **The fix is one script per run on ONE connection, ending in `Browser.close`**
(`scratchpad/verify221.py` is the shape), and **a fresh `--user-data-dir` every launch** - Chrome
holds the old profile after `close` and the next launch silently gets no debugging port.
⚑ **An unresponsive driver is indistinguishable from a hung page until you interrupt the page and
read where it actually is.**

Related: [[grimtoll-measuring-the-running-build]], [[grimtoll-parallel-sessions]].
