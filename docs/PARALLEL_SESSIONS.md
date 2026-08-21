# Two sessions, two desks

**Working in two or three Claude sessions at once is fine and it is how this project has been
built.** Until 2026-08-13 they took turns on the one file that matters. Now they do not.

> ## The one command
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 new battle-panel -t "what it is"
> ```
>
> That makes a **branch** (`work/battle-panel`) and a **desk** (a folder of its own at
> `%USERPROFILE%\grimtoll-desks\battle-panel`). Point a Claude session at that folder and the whole
> repo is yours: no lock, no queue, the prototype is yours to edit while somebody else edits theirs.
>
> When it is done, from the **main** folder:
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 done battle-panel
> ```
>
> `branch.ps1 list` shows every desk and how far ahead it is. `branch.ps1 where` says which one you
> are standing in.
>
> ## ...and the one to run when the sessions stop
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 land
> ```
>
> **What is finished and has not landed on main**, across every desk *and* the main desk's own
> uncommitted tree, with the claims that would refuse the commit. Reports only; `-Go` does it.
> **See [§4b](#4b-branchps1-land---what-is-finished-and-has-not-landed).** It exists because on
> 2026-08-16 five finished entries were sitting in four different places and nothing said so.

---

## 1. Why the lock had to go, and what was actually right about it

The old rule was correct for the situation it was written in, and the situation was the problem:

> There is one working tree and one branch, so **git isolates nothing between the two sessions**: a
> branch is not a room, it is a label on the one room you are both standing in.

That is still true of a branch **on its own**. It stops being true the moment each session gets its
own directory. A `git worktree` is a second checkout on the same `.git`: two folders, two branches,
one history. The room becomes two rooms, and the lock becomes a queue with nothing left to protect.

**The lock's real cost was never waiting, it was waiting out the wrong unit of work.** Session B
wanted to change six lines of CSS and had to sit through session A's whole feature, because the lock
is per-file and the file is the entire game.

⛔ **The lock is not deleted, and it is still live on the main desk.** Two sessions that both open the
main folder still share one directory, and everything that was true in 2026-08-11 is still true
there. What changed is that there is now somewhere else to stand.

---

## 2. The three things that go wrong, and which layer answers each now

**1. The number.** Unchanged, and it is the one thing branches make *worse* rather than better.
**Git cannot merge a counter.** Two desks that each invent `#140` produce two entries with one
number and no merge in the world can tell them apart. So `claim.ps1` stays exactly as it was, with
one change: it resolves `.grimtoll\` through `git rev-parse --git-common-dir`, so **every desk asks
the same store**. Take a number before you write one.

> ⚠ **This was the piece that would have failed silently.** A store that followed the current folder
> would have given each desk its own empty counter, and three desks would have been issued `#140`
> three times while every one of them believed the tool had protected it. The fix is four lines and
> it is the load-bearing part of the whole change.

**2. The whole-file rewrite.** Solved by isolation. `art/inject.ps1` slurps the whole prototype and
writes the whole thing back, which is catastrophic in a shared folder and completely safe in a desk:
it rewrites **your** copy. `claim.ps1 gate` therefore returns clear in a desk and still gates the
main folder.

**3. The deploy.** [`deploy.ps1`](../deploy.ps1) runs `git add -A` and pushes to the live link, so it
now **refuses to run anywhere but the main desk on `main`**. A deploy from a branch would publish
half a feature to every playtester with the branch name attached.

---

## 3. What a merge does with each kind of file

This is the part that decides whether parallel work is real or just deferred pain.

| | rule | why |
|---|---|---|
| `prototype/grimtoll_slice.html` | ordinary line merge | two desks in different functions merge clean. Two desks in the same twenty lines conflict, and that conflict is **correct**: somebody has to decide |
| `index.html` | `merge=ours` | 10 MB of generated base64. A conflict in it is unresolvable by hand and the resolution was always "rebuild it" |
| `art/embed/art_data.js` | `merge=ours` | same, generated out of `art/src` |
| `CHANGELOG.md` · `WHAT_TO_TEST.md` · `SHIPPED.md` | `merge=union` | append-only logs. Both desks add a row at the top and would conflict **every single time**; union keeps both sides and the order is a two-second tidy |

> ## NOTHING GENERATED IS EVER MERGED. IT IS REBUILT AFTER THE MERGE.
>
> `merge=ours` leaves those files **stale on purpose**, which is why `merge.ps1` ends by naming what
> to rebuild. A generated file that survives a merge untouched is a generated file that is now lying
> about the source it came from.

### ⛔ AND THE PRICE OF `merge=union`: ITS DAMAGE NEVER CONFLICTS

*(2026-08-21, landing six desks at once.)* `union` is the right driver for an append-only log and
the reason is in the table above. The cost is the other half of the same sentence: **a union merge
cannot fail, so when it is wrong it arrives looking exactly like success.** That landing produced,
silently and with a clean diff:

- **`SHIPPED.md` carrying #215 TWICE** - once as authored and once as #217 had edited it to close
  its own remainder, because `work/beast-race` was stacked on `work/mirror-battle`. ⛑ **The two
  rows DIFFER**, so this is not a tidy-up: keeping the wrong one leaves the registry claiming an
  open remainder that is closed;
- **`CHANGELOG.md` with #221's row written INTO THE MIDDLE of #220's**, on one line, and #220's own
  text orphaned on the line below. It renders as one broken row. ⚠ That one arrived on the BRANCH
  rather than from the merge, which is the point: nothing was looking either way.

⛑ **SO THE RECORD HAS A COUNTER NOW, AND IT IS RUN BY `land` RATHER THAN REMEMBERED.**

```
python tools/record.py check     # what is wrong. Exit 1 on a structural fault
python tools/record.py fix       # resolve conflicts, dedupe, sort. Then check
python tools/record.py prove     # make all eight checks fire, then go quiet
```

It counts **the four writes** that `SHIPPED.md`'s own header has always demanded (changelog row ·
registry row · struck from the backlog · a test-bench section), and it catches what a human cannot
catch by reading: conflict markers, a row spliced into another row, a fragment orphaned under a
row, the same number twice, rows out of order, and a claim holding a number that is written in no
doc. ⚡ **The contract is not new and neither is the failure**: `SHIPPED.md` records that #117,
#137 and #138 went missing the same way and were restored by a hand audit in #151, which left
nothing behind to do it again. By 2026-08-21 twenty-two entries had a changelog row and no registry
row. **A contract that is only ever checked by somebody remembering to check it is a habit, not a
contract.**

⚠ **`fix` IS DELIBERATELY NARROW.** It keeps BOTH sides of a conflict and orders them by number,
which is the only resolution a backlog row conflict has ever wanted - and it **refuses** a conflict
whose two sides are not both entry rows, so a real disagreement still reaches a human. On a
duplicate whose rows DIFFER it keeps the longer one and says out loud what it dropped, because an
edit that supersedes a row adds text.

⛑ **AND IT IS PROVED BY MAKING IT FIRE**, which is this repo's standing rule for a new check and
which earned its keep inside an hour: the four-writes counter reported a spotless record on its
first run because its one regex was missing `re.M` and had matched nothing at all. `record.py
prove` seeds each of the eight faults into the real file, watches it report, restores with `git
checkout --` and watches it go quiet. It refuses to run on a dirty tree, having eaten an
uncommitted fix the first time it was used.

⚠ **The pre-commit hook runs `check --faults-only`, and only when a `docs/*.md` is staged.** The
four writes finish at DIFFERENT TIMES - code and the changelog row in one commit, the registry row
often in the next - so a hook that demanded all four would refuse the ordinary commit on its way to
making them, and a guard that refuses correct work is bypassed within a day. A spliced row is never
a stage on the way to anything. ⚠ **The hook lives in `.git/hooks/` and is therefore NOT tracked**,
the same standing weakness the claim guard has; `branch.ps1 land` runs the full check regardless,
which is the tracked backstop.

---

⛔ **`merge=ours` is not a built-in driver.** It has to be declared once per clone or the lines in
`.gitattributes` do nothing at all and you find out inside a 10 MB conflict:

```
git config merge.ours.driver true
```

`branch.ps1 setup` does it, `branch.ps1 new` calls that, and `merge.ps1` checks before it merges.

---

## 4. Merging, and the rule that is deliberately not "main must be clean"

`branch.ps1 done <name>` runs [`tools/merge.ps1`](../tools/merge.ps1) and then removes the desk.
`merge.ps1` on its own merges but keeps the desk open.

It refuses if **main has uncommitted changes to a file the merge would overwrite**. It does *not*
refuse merely because main is dirty, and the difference matters here: the main desk is shared and
somebody is very often mid-edit on something unrelated, so a blanket clean-tree rule would refuse
every merge and hand the queue straight back.

⛔ **Never stash to get a merge through.** On this repo the stash you take is somebody else's work in
progress.

If it conflicts, the merge is left half-done and waiting: fix the files, `git add`, `git commit`. Or
`merge.ps1 -Abort` and main is exactly where it was.

### 4b. `branch.ps1 land` - what is finished and has not landed

> **This is the one to run when several sessions have stopped.** Report first, act only on `-Go`.
>
> ```powershell
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 land
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\branch.ps1 land -Go
> ```

**Why it exists.** The desk system is good at ISOLATING and was bad at LANDING, and on **2026-08-16**
every failure was a landing failure: five entries finished across four sessions and **none of them
was on main.** #159 sat committed on a desk nobody merged. #161, #163 and #164 sat *uncommitted in
the main desk* because the sessions that built them closed without committing. #160 could not merge
because of them. Nothing was broken, nothing said anything, and `branch.ps1 list` reported it as
*"3 ahead"* in grey.

**What it surveys**, in the order the day actually went wrong:

| | |
|---|---|
| the **main desk's own tree** | uncommitted files, and which entry numbers look finished there. A **new registry row** in `SHIPPED.md`/`CHANGELOG.md` is the signal, because the four writes put one there and `git log` does not have it yet |
| **claims in the way** | numbers held by a session that has closed, whose work is in that tree |
| **desks with work waiting** | commits not on main, and anything still uncommitted in the desk |

⛔ **THE CIRCULAR ONE IS WHY THIS NEEDED CODE AND NOT A HABIT.** A session that finishes, leaves its
work uncommitted and closes leaves its **number claimed**. `claim.ps1 release` is hard-scoped to the
calling session, and #144's auto-sweep only drops a claim whose number is in **committed** main. So
the claim refuses the commit, and the commit is the only thing that would clear the claim. There is
no flag for it and no way out from inside `claim.ps1`.

⚠ **`land` will not sweep claims off the working tree in general, and that limit is deliberate.**
#144's reasoning still holds: a working tree is something the guarded session can write to, so a
hand-written number in a doc would drop the real holder's claim and wave through the very commit the
backstop exists to refuse. What makes it safe here is that **the human is the gate** - `land` prints
the numbers and the files they came from and frees nothing until somebody types `-Go`. Freed claims
are copied to `.grimtoll\freed\<timestamp>\` first.

⚠ **It refuses `-Go` when the registry diff is unreadable.** If more than eight rows read as new, a
whole file has had its line endings rewritten and every row in it looks added; acting on that would
free a hundred claims. It says so and stops. *(Found by rehearsing it, not by reasoning: the first
cut matched 109 numbers on a two-row change.)*

**It stops before shipping, on purpose.** The generated files kept main's copy through every merge,
so `index.html` does not match the source that was just merged. Verify `LINT()` and `regress()` on
the **merged** prototype, then `deploy.ps1`.

---

## 5. Which desk am I supposed to be in

| you are | use |
|---|---|
| changing the game for more than a few minutes | **a branch desk.** `branch.ps1 new <name>` |
| two sessions both changing the game | **two branch desks.** This is the case the whole thing exists for |
| deploying, merging, or looking at the live build | **the main desk, on `main`.** Deploy refuses anywhere else |
| a one-line doc fix while nobody else is running | main desk is fine. Take the lock if the prototype is involved |

**A desk is cheap and disposable.** `branch.ps1 drop <name> -Force` throws one away unmerged. Do not
keep one open for a week: the further it drifts from main the more of the merge you pay for.

> **Why desks live outside the repo folder.** The repo is in a Google Drive folder. A worktree is a
> full checkout, and pointing Drive at three more copies of a 5.6 MB prototype and a 10 MB
> `index.html` is both wasteful and a genuine corruption risk while git is writing. Desks default to
> `%USERPROFILE%\grimtoll-desks\`, outside Drive. `-Path` overrides it.

---

## 6. The claim, which did not change

Three layers still, and the first one is the one that cannot be replaced by git:

| | What it does | Where it lives |
|---|---|---|
| **claim** | reserves the next free `#NN` / `8f.NNN` so it cannot be issued twice | `.grimtoll/claims/`, **in the main folder, shared by every desk** |
| **lock** | one session owns `prototype/grimtoll_slice.html` **on the main desk** | `.grimtoll/locks/` |
| **verify** | refuses a commit that spends a number somebody else holds **and has not shipped** | `.git/hooks/pre-commit` |

The claim is a **file created with `CreateNew`**, which fails if the file already exists. NTFS makes
the check and the create one indivisible operation, so two sessions asking at the same instant cannot
both win. Nothing else in this repo has that property: a counter in a document does not, and a
"check, then write" in a script does not either, because the gap between the check and the write is
where the collision lives.

> ### ⛔ The pre-commit guard was OFF in every desk from #139 until #144, and it printed "clear"
>
> Found on 2026-08-13 by watching a commit from a desk report *"clear: no other session is holding a
> number"* while **twelve claims sat in the store**, four of them a live session's.
>
> `.git/hooks/pre-commit` is a **shell** script, so `claim.ps1` runs under `sh`, where the console is
> **cp866**. git hands back `C:/Users/USER/Google Диск/...` as UTF-8 bytes, cp866 turns that into a
> path that does not exist, `Resolve-Path` throws, and `Get-StoreRoot`'s catch quietly answered
> `$Root`. **So the store became the desk's own empty `.grimtoll\`, created fresh on the spot**, and
> every desk had a private claim directory with nothing in it.
>
> ⚑ **The lesson is the fallback, not the codepage.** `Get-StoreRoot` had one `catch` covering two
> completely different situations: *"this machine has no git"*, which is fine and should be quiet,
> and *"git answered and I could not read it"*, which is a bug. **A fallback that cannot be told
> apart from success will wear the word "clear" for as long as nobody looks.** Git is read as UTF-8
> now, and the second case prints a loud block saying the store is private and the guards are off.
>
> ⚠ **And `2>$null` was part of it.** Under `$ErrorActionPreference='Stop'`, *redirecting* a native
> command's stderr is what promotes a harmless warning into a terminating `NativeCommandError`.
> Unredirected stderr is inert. The redirection that looks like tidiness was the trap.
>
> **If you are ever unsure whether the guard is live in your desk**, stage a line spending a number
> `status` says somebody else holds, and check that the commit is refused. A `.grimtoll\` folder
> appearing inside a desk is the tell that it is not.

> ⚠ **`#NN` and a three-digit CSS hex colour are the same string.** The first version of the repo
> scan read `#373` out of a stylesheet and issued it as a backlog number. Entry numbers are read from
> **prose and `shots/` only**, with fenced and inline code stripped, and capped at 200. `8f.NNN` is
> unambiguous and is read from everywhere. The scan now reads **both** the desk and the main folder,
> because a desk's checkout is behind main and `shots/` is gitignored so it exists in main only.

> ### ⚠ A lock is on a PATH. A lock on a sentence protects nothing.
>
> Found live on 2026-08-13: a session ran `lock "the seven-item pack and the opening chain"`,
> passing its title where the path goes. The lock file was written, `status` listed it, and
> the session believed it owned the prototype. **It did not.** The hook matches on the file's leaf
> name and no edit was ever going to match that string. `lock` now refuses a target that is not a
> file in the repo. The title goes in `-t`.

> ### ⚑ You do not release a number any more. A spent claim gives itself back (#144)
>
> `number`, `status` and `verify` each drop **any** claim, anybody's, whose number is already in
> main's committed record. Nothing to run, nothing to remember.
>
> **The instruction this replaces was "claim early, release at the four writes", and it was obeyed
> exactly never.** On 2026-08-13 a session was refused its own #143 commit because the CHANGELOG
> row it was adding mentioned #141 and 8f.169, work another session had shipped hours earlier and
> left claimed. That commit was not a collision. **It was a citation, which is what a changelog row
> is made of**, and six more dead claims were sitting behind it waiting to do the same thing.
>
> **Why dropping it is safe, and the argument is arithmetic rather than trust.** `claim.ps1` takes
> its floor from **the repo**, never from the claims. So the moment a number is written down, the
> floor is above it and no session can be issued it again, with or without the claim file. From
> then on the claim is not holding a seat, it is holding a **word**, and the only thing left it can
> do is refuse somebody's honest sentence.
>
> ⛔ **It reads COMMITTED `main`, never the working tree, and that is the whole difference between a
> fix and a hole.** A working tree is something the session being guarded can write to. Let session
> Y hand-write a `#NN` it never claimed (the sixth collision, 2026-08-11, and the first caused by a
> document): a working-tree scan would see Y's own uncommitted line, drop the real holder's claim,
> and then wave through the very commit `pre-commit` exists to refuse. **Committed `main` is the one
> piece of evidence a session cannot manufacture for itself** - and `main` rather than `HEAD`
> because it is the only ref every desk and the main folder agree on. Measured: with the number in
> the working tree only, the repo scan sees it and the sweep does not, so the claim stands and the
> commit is still refused.
>
> **`NUMBERS HELD` in `status` therefore means work in flight again**, which is the one question
> anybody reads it for.
>
> Two things still want a hand, and `-By` is the supported door for both:
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 release 98 -By 053d905a
> ```
>
> - work that **shipped on a desk whose branch was never merged**. The sweep cannot see it, correctly:
>   it is not shared yet. Merge it, or clear it by hand.
> - a session that **vanished mid-work**. That claim is a real seat and the sweep will never touch it.
>
> ⛔ **Only ever for a number that has SHIPPED.** A row in `SHIPPED.md` and a commit in `main` are the
> proof. A claim on unbuilt work is somebody's seat and you leave it alone.

---

## 7. The lessons, for the next thing that looks like this

> **A counter that lives in prose is not a counter, it is a note about a counter.**
>
> Five collisions were read as a discipline problem and answered five times with a stricter
> instruction to grep. It was never a discipline problem. **The document was structurally incapable
> of being right**, because it was written after the thing it described.

> **A queue is what you build when isolation is not available. Check whether it still is not.**
>
> The lock was the right answer to "one working tree", and it went on being the answer for two days
> after `git worktree` would have removed the question. Nobody re-asked whether the constraint was
> still there. ⚑ **When a rule costs more every week, re-read the sentence it was derived from, not
> the rule.**

> **A guard that fails open, quietly, is worse than no guard.**
>
> Twice now on this one file. #139's desk exemption never fired because the hook asked where the
> *script* lived; #144's store resolution fell back to a private folder because a path would not
> decode. Both **looked exactly like working**, and the second one printed the word "clear" while
> doing nothing at all. ⚑ **Every fallback in a guard needs to be able to say which fallback it
> took** - "no git here" and "git answered and I could not read it" cannot share a `catch`.

> **A rule nobody has ever obeyed is a rule the tool should have been keeping.**
>
> "Release the number at the four writes" was written down, was correct, and was followed zero times
> in three weeks, because it asks a session to do housekeeping at the exact moment it is finished
> and moving on. ⚑ **When compliance is zero, stop editing the instruction.** The question is
> whether the machine can work it out for itself, and here it always could: the fact the rule was
> asking a human to report was already sitting in `main`.

> **One fact, two readers, and only one of them was taught.**
>
> This is the third time on this surface. `Verb-Verify`'s own comment describes it happening with
> the CSS-colour guard, which was written into the repo scan and never reached the pre-commit scan,
> so the two readers of "what is an entry number" disagreed for weeks. The regexes are now written
> **once** and all three callers share them. ⚑ **Where two scans genuinely must differ, name the
> difference in the signature so it cannot drift**: `-Markdown` is off for the diff scan because a
> diff's code fences arrive as loose halves, which is a fact about the corpus, not a preference.
>
> ⛔ **And the two scans here want OPPOSITE conservatism, which is why they stay two.** "What may I
> not be issued" casts the widest possible net, because a number it misses is a collision. "What has
> definitely shipped" takes the narrowest and most authoritative source there is, because a number it
> wrongly counts is somebody's live seat thrown away. Both are the careful direction. They are just
> careful about opposite things, and a future tidy-up that merges them will silently pick one.

> **The load-bearing line of a change is rarely the feature.**
>
> Branch-per-session is worktrees plus four lines that point the claim store at
> `--git-common-dir`. Without those four lines everything above still *works*, feels faster, and
> hands out the same number to three desks. ⚑ **When you distribute a thing, find the counter first.**
