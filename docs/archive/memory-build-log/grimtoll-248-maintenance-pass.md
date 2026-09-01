---
name: grimtoll-248-maintenance-pass
description: "#248 the maintenance pass - LANDED 2026-08-25 (8f.272). ⛔ THE ONE THING RECORDED AS UNRESOLVED IN TEN ENTRIES WAS A HARNESS DEFECT WEARING A GAME BUG'S CLOTHES, and the flag that prevents it existed, said in its own comment that the harness sets it, and no caller set it. The reproduction was a SEQUENCE, not a seed - which is why two entries and ~155 runs could not find it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5eda0447-e02b-4693-a422-d073cae92240
  modified: 2026-08-25T17:58:20.582Z
---

**The ask** (2026-08-25): *"check last 10 iterations. If everething done / complete ... If you see
smaller bugs - fix them. Then update recent docs, concept itself - to match actual butch ...
Archve / delete / close stuff not needed, so we don`t spend time each session it"*.

**The answer to the first half: yes.** #238 through #247 all have their four writes, every standing
gate reads clean, and every leftover in those ten entries is a ⏳ somebody declared on purpose. One
thing was recorded as **UNRESOLVED** and it is now closed.

## ⛔ A REPRODUCTION CAN BE A SEQUENCE RATHER THAN A SEED, AND THAT IS WHY NOBODY FOUND IT

#236 saw `1rd DRAW/STALL HIT GUARD` once in ~32 runs. #239 spent about **155 clash runs** on it
across six different loops, disproved its own first theory, and wrote the row UNRESOLVED asking for
*"a seeded loop over that one fight at n>=200"*. **It did not need one.** A fresh page then
`regress.js` is clean; a fresh page then `gates.js` then `smoke.js` then `regress.js` stalled
**4 of 4**.

⚑ **BOTH ENTRIES HAD ALREADY WRITTEN THE CAUSE DOWN AND READ IT AS NOISE** - *"the first
`regress.js` after a run of `gt.py eval` probes on the same page"*. **When an intermittent fault
comes with a circumstance attached, the circumstance IS the lead**, and n=200 on the wrong page
state proves nothing at any n.

## ⛔ AND THE FLAG THAT PREVENTS IT EXISTED, WAS DOCUMENTED, AND WAS NEVER SET

`tutFlush` opens `if(window.TUT_SILENT)return;` with the comment *"the harness switches this on"*.
`tools/harness.js` never did. Six ad-hoc probes from #247 each set it by hand, having rediscovered
the need one at a time. **This is [[grimtoll-unverified-comment-is-a-defect]] one layer down**: not a
comment saying *check this*, but a comment asserting a CONTRACT that no caller honoured. Same shape
as #202's *"LINT 6f was cited in two places and did not exist"*.

⛑ **THE GATE BELONGS ON THE ONE DOOR, AND IT WAS ON THREE OF THE WRONG ONES.** Three sites read the
flag and all three are the tutorial's; **`capSay` reaches the same dim sheet through `capCard`**,
a fourth path. `tutPaint` is the only function that raises the sheet and the only one that writes
`B.tutLock`, so one gate there is every caller.

⛑ **AND NOTHING WAS WRONG WITH THE GAME.** The hold is #156's deliberate *"a spotlight stops the
clock"*; a player clicks the card and `tutNext` resumes the turn through `later()`, which a
synchronous loop can never let fire. **The rig was the thing that could not click.**

## ⛑ TRAP THE WRITE, DO NOT REASON ABOUT IT

`Object.defineProperty(B,'tutLock',{set(x){...stack...}})`, re-installed after every `startBattle`,
named the writer in one run with a stack. ⚠ **Wrapping `window.tutShow` did NOT work and looked like
a clean result**: the game's calls resolve the *function declaration's* lexical binding, not the
window property, so the wrapper never fired and the probe returned `hits: []`. **An empty result
from a trap you have not proved fires is not evidence.**

⛑ **AND THE GUARD REPORTS ITSELF NOW.** `runFight` returns a `stuck` object read inside the `try`
(the `finally` nulls `B`, and B is the whole question). `HIT GUARD` used to say the loop gave up and
never what it gave up ON.

## What else came out of the same pass

- **The three scale counters were open**: `.rmem .rlv` shipped `padding:1px 3px` (#246) and
  `#bGround` used `0px` var fallbacks, so `ui-scales.md` §3's own grep returned four numbers where
  the file says `86px`. Both fixed; the tile did not move (69px row, 148px column, measured).
- **The docs said `nerve` and `provisions`** while the game has said MOOD since #232 and SUPPLIES
  since #245. Fixed in the concept, README and the lore book. ⚠ **The records keep the old words** -
  they say what was true when written, which is their job.
- **878 doc em dashes swept** by `tools/dev/emdash.py` (markdown-aware: fenced blocks and inline
  spans untouched), and **wired into `record.py check`** so it cannot drift back. ⛔ `docs/playtests/`
  is excluded on purpose: **a transcript that is corrected is not a transcript.**
- **61 of 76 probes deleted.** `tools/dev/README.md` now carries the test: *will somebody run this
  again?* An instrument gets a row in the table; scratch goes, and a one-off earns its place only by
  being CITED in the record as the thing that measured something.
- **`probes/reach.js`** is the built-but-unreachable census that [[grimtoll-245-eleven-ask-batch]]
  and #247 each did by hand.
