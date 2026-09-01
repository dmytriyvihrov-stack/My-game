---
name: grimtoll-188-feedback-popup
description: "#188 the feedback popup batch - BUILT + MERGED on work/feedback-popup 2026-08-18 (8f.208), NOT landed on main; plus three operational traps that cost real time"
metadata: 
  node_type: memory
  type: project
  originSessionId: 18305aac-8c77-445d-ae76-87cfd277bb96
  modified: 2026-08-18T13:01:32.782Z
---

**#188 / 8f.208, built 2026-08-18 on the desk `work/feedback-popup`
(`C:\Users\USER\grimtoll-desks\feedback-popup`), 2 ahead / 0 behind main, verified on the MERGED
file, and NOT LANDED.** Blocked only by another session's 5 uncommitted files on the main desk
(world-map backgrounds). `tools\branch.ps1 done feedback-popup` from the main folder finishes it
the moment that tree is clean. See [[grimtoll-parallel-sessions]] - this is a landing that is
waiting, not a landing that was forgotten.

**What it is.** The three corner reaction glyphs (★ ▲ ▼) and #98's fold are deleted; the question
is now `RXPOP`, a modal that ARRIVES - once a run, after a won fight, off `finish()`. Three doors,
**👍 good · 🤷 so-so · 👎 bad** (his second pick, after 🙁😊🤩), and only the down thumb opens a
five-word reason box.

⛔ **"SO-SO" COULD NOT BE FILED AS `like`, AND THAT WAS THE ONLY REAL DECISION IN A "TRY DIFFERENT
EMOJIS" REQUEST.** The three kinds since #53 print as loved/liked/disliked, so a shrug landing on
`like` would put the word *liked* on somebody who said the opposite - #102's wrong-unit rule
arriving through what looks like a change of picture. So `meh` is a **fourth kind**, and `super` is
**retired from the popup rather than deleted**: nothing files ★ any more, but it stays in `RXWORD`,
in the CSS and in the tally so every one already in a tester's journal still renders, with the LOVED
cell printed only when its count is non-zero. ⚠ The row SHAPE is unchanged (#57's contract) but a
reader switching on `k` meets `meh` for the first time. Plus: `SEND_TO` brings back the address and
the `mailto:` that 8f.105 pulled, four sentences deleted by name, Back stripped of its sub-line on
all three screens that had one, the copy button moved beside Back with the address under it, and
⚙ DEV.MODE is one dim glyph in the bottom-right corner.

⛔ **THE FINDING UNDER IT, AND IT IS THE REUSABLE HALF: a corner glyph is not a question, it is
furniture, and furniture gets looked past.** #98 answered "three lit buttons ask for an opinion
continuously" by hiding them behind a word. Two rounds later nobody pressed the word either. The
fix was never styling - a question has to arrive.

⚑ **The fight's name is captured BEFORE `afterPromotion()` navigates.** By the time the popup opens
the screen is the map and `where()` would file the reaction against the road. Same shape as
[[grimtoll-token-furniture]]: ask the thing while it still exists.

## ⛔ Three traps that cost real time this session

1. **`io.open(P,'w',encoding=...)` TRUNCATED A 7 MB FILE TO 0 BYTES.** Python's `'w'` truncates on
   OPEN; the `UnicodeEncodeError` (lone surrogates from `\ud83d\ude41` - use `\U0001F641`) fired
   during `.write()`, after the truncate and after ~7 M chars had flushed. **Always
   `s.encode('utf-8')` into a variable FIRST, then `io.open(P,'wb').write(b)`.** Recovered with
   `git checkout --` because it was a worktree; on an unversioned file it would have been gone.

2. **`LINT()` TAKES ~25 SECONDS AND LOOKS EXACTLY LIKE A HANG.** `labelViolations()` alone is
   **14.6s** (it walks every node as a stand), and `LINT` calls it plus `spacingViolations` plus a
   route enumeration. The browser eval bridge times out at 30s, so `LINT()` inline always "fails"
   while actually completing and logging `[LINT] clean` to the console a moment later. **Kick it
   with `setTimeout` and read the console, or read the result out of a global on the NEXT call.**
   ⚠ `requestAnimationFrame` will not do - it fires zero times in a non-compositing pane.

3. **A rendered fight in the hidden pane needs `tools/harness.js` loaded BEFORE `startBattle`, and
   one step per eval.** The shim routes timers through a MessageChannel so they are not clamped to
   ~1s. Without it the victory sequence stalls half-finished with `B.won=true, busy=true` and the
   aftermath never draws. Loading the shim and calling `startBattle` in the SAME eval wedges the
   renderer - reload and separate them.

⚠ **The pane composited nothing all session, so there is no screenshot: every number is off the
DOM.** That is what `.claude/rules/ui-scales.md` §5 says to do, and it was the only option.

## Open, and they are the user's calls

- **Discord is an empty string in `SEND_TO`.** One line whenever they give an invite; the screen
  already prints it the moment it is set.
- **A pre-filled GitHub issue link** is possible the same way `mailto:` is (navigation, not a
  request) but needs a public repo and a logged-in account per tester. Offered, not built.
- ⚠ **8f.105 pulled the address on an unconfirmed hunch that it was why the artifact share kept
  refusing.** It is back on the user's order. **If the share or `deploy.ps1` starts refusing again,
  `SEND_TO` is the first thing to pull.**
