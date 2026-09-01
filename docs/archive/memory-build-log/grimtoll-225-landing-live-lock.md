---
name: grimtoll-225-landing-live-lock
description: The #223-#225 landing, 2026-08-21 - deploying around a LIVE lock by building from a detached worktree at HEAD, because deploy.ps1 reads the working file and its step 4 is `git add -A`
metadata:
  type: project
---

#223 (8f.246), #224 (8f.247) and #225 (8f.248) landed on main and deployed 2026-08-21.
Head `0c640d6`, live at `https://dmytriyvihrov-stack.github.io/My-game/` and `/play/`.

**⛔ THE DEPLOY GUARD FIRED MID-LANDING AND THE ANSWER WAS NOT TO STEAL THE LOCK.** Session
`5860cf8e` claimed `prototype/grimtoll_slice.html` for #204 (stat icons into the sheet) two
minutes before the deploy, and had written 86 lines into it by the time the user said *"204 leave
alone, don't push it now"*. Both halves of `deploy.ps1` are fatal here and the second is the one
that hides: **step 2 builds from the WORKING FILE, and step 4 is `git add -A`**, so it would have
shipped AND committed another session's work in progress. Its own comment says so.

⛑ **The way through is a detached worktree at HEAD.** `build_site.ps1` derives every path from
`$PSScriptRoot`, and the art block is already injected into the committed prototype, so the only
thing a fresh worktree lacks is gitignored `audio/out/audio_data.js` - copy it in, build both
pages there, assert them, copy `index.html` + `play/index.html` back, and `git add` **those two
paths only**. The other session's lock and its uncommitted edits are never touched.

⚑ **And the assertion that makes it honest is the NEGATIVE one.** Grep the built pages for a
string only the OTHER session's work has (`STAT_ICON`) and require **0**, alongside the usual
positives (`popPlace`, `markDeed`, `nextRung`, `const evRail=`). "The merge is in" and "their work
is out" are two different claims and the second is the one nobody thinks to check.

⚠ **A `const` arrow is invisible to a `function <name>` grep and to `window[name]`.** Two checks
reported false failures against a build that was fine: `typeof window.evRail` is `undefined`
because a top-level `const` never lands on `window`, and `b.Contains('function evRail')` misses
`const evRail=`. Test by bare identifier in the page, and by the declaration's real form on disk.

⚠ **`branch.ps1 land` merged newest-first, not the oldest-first its own report promised** (#223
before #225). Harmless here; do not rely on the printed order.

⛑ **Two record faults the merge did not cause and no diff would show.** #225's backlog row shipped
from its desk missing the whole `log` column (3 pipes where the table has 4), so `8f.248` was
written nowhere in that file; and `ui-scales.md` named `#wBar`'s reservation as **64px** in three
places, including §5's expected grep output, while #220/#223 had moved it to **86px**. A gate that
names a stale number reports a false failure, and a counter that cries wolf once stops being run.

See [[grimtoll-parallel-sessions]], [[grimtoll-expired-lock-is-not-free]],
[[grimtoll-share-link]], [[grimtoll-224-seven-ask-batch]], [[grimtoll-223-nine-small-asks]].
