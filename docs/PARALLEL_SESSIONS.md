# Two sessions, one working tree

**Working in two or three Claude sessions at once is fine and it is how this project has been
built.** What is not fine is the way the two sessions have been finding out about each other, which
until now was afterwards.

> ## The one command
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 number
> ```
>
> Run it **before you write anything**, not after. It hands you a `#NN` and an `8f.NNN` that no
> other session can be given. Then take the prototype if you are going to change it:
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 lock -Title "what you are doing"
> ```
>
> `tools\claim.ps1 status` says who holds what. `tools\claim.ps1 release all` gives it back.

---

## 1. What the danger actually is, because it is not committing

There is **one working tree and one branch**. `git worktree list` returns a single line. Both
sessions edit the same bytes on the same disk at the same instant, so **git isolates nothing between
them**: a branch is not a room, it is a label on the one room you are both standing in.

That means "do not commit" protects nothing. It only removes the restore point. The three things
that actually go wrong:

**1. The number.** Five collisions, and nearly a sixth twice in one day. The cause is structural and
worth stating exactly: the number lived in **a sentence in a document**, and the document is written
**last**. The code and `shots/` get the number first. So at the moment session B greps for the next
free number, session A has already decided on it and written nothing. *"Grep before you take a
number"* could never have worked. Both docs still said *next free #89* while two sessions were both
building #89.

**2. The whole-file rewrite.** Two string edits in different parts of the prototype coexist fine.
A **read-everything, write-everything** pass does not, and
[`art/inject.ps1`](../art/inject.ps1) is exactly that shape: it slurps the whole prototype, swaps the
art block, and writes the whole thing back. Its sibling
[`tools/build_site.ps1`](../tools/build_site.ps1) is the mirror hazard. It does not touch the
prototype, it **reads** it into `index.html`, so what it ships is whatever state the other session
happened to have the file in.

**3. The deploy, and this is the worst one.** [`deploy.ps1`](../deploy.ps1) runs `git add -A` and
then **pushes to the live link**. A deploy from your session publishes the other session's
half-finished prototype to every playtester. Nothing about that is theoretical: `-A` means `-A`.

---

## 2. The mechanism

Three layers, because one is never enough: **claim** before, **lock** during, **verify** at the gate.

| | What it does | Where it lives |
|---|---|---|
| **claim** | reserves the next free `#NN` / `8f.NNN` so it cannot be issued twice | `.grimtoll/claims/` |
| **lock** | one session owns `prototype/grimtoll_slice.html` at a time | `.grimtoll/locks/` |
| **verify** | refuses a commit that spends a number somebody else holds | `.git/hooks/pre-commit` |

**`.grimtoll/` is gitignored on purpose.** It is live state about the two sessions running on this
machine right now, not repo content, and both sessions read it off the same disk. That shared disk is
exactly why this works when a branch would not.

### Why a claim cannot be issued twice

The claim is a **file created with `CreateNew`**, which fails if the file already exists. NTFS makes
the check and the create one indivisible operation, so two sessions asking at the same instant cannot
both win: the loser gets an exception, takes the next number, and never learns there was a race.

Nothing else in this repo has that property. A counter in a document does not. A "check, then write"
in a script does not either, because the gap between the check and the write is where the collision
lives.

### The floor

`claim.ps1 number` reads every number the repo has already spent before it issues one: the docs,
`content/`, the prototype, the tools, and **`shots/`**, which matters most because it is written
first and is therefore the only honest source. `ls -t shots/` was what caught both near-misses on
2026-08-11, and the script now does that for you.

> ⚠ **`#NN` and a three-digit CSS hex colour are the same string.** The first version of this scan
> read `#373` out of a stylesheet and issued it as a backlog number. Entry numbers are therefore
> read from **prose and `shots/` only**, with fenced and inline code stripped, and capped at 200.
> `8f.NNN` is unambiguous and is read from everywhere.

---

## 3. What is enforced without you remembering

A script you have to remember to run prevents nothing, so four things run on their own:

- **Claude Code refuses the edit.** A `PreToolUse` hook in [`.claude/settings.json`](../.claude/settings.json)
  blocks `Write`, `Edit` and `NotebookEdit` on a file another live session holds, and tells that
  session why.
- **`inject.ps1` refuses to run** while somebody else owns the prototype.
- **`deploy.ps1` refuses to run**, and when it does run it now **prints every file `git add -A` is
  about to sweep up** before it commits. A deploy that quietly carries eight files you did not touch
  is how the other session's work ends up in your commit.
- **`git commit` refuses** a change that spends a number another session is holding.

Every one of them is escapable, because a guard you cannot get past becomes a guard somebody deletes:
`claim.ps1 lock -Steal`, `claim.ps1 release`, `git commit --no-verify`.

**A lock expires after 4 hours.** A session that ends without releasing does not block the desk
forever, and `status` marks an expired lock rather than hiding it.

> ### ⚠ Release the number once it is written into the docs
>
> ```
> powershell -NoProfile -ExecutionPolicy Bypass -File tools\claim.ps1 release all
> ```
>
> A claim's whole job is to hold a number **while it exists nowhere**. The moment it is in
> `CHANGELOG.md` and `SHIPPED.md` the repo scan defends it on its own, and a claim left standing
> starts working against you: the other session edits a doc, their diff quotes your number, and
> `pre-commit` blocks a commit that was never a collision. **Claim early, release at the four
> writes.**

---

## 4. What to do when you are the second session

If the prototype is taken, the answer is not to wait. **Take work that does not touch it:** the docs,
a measurement, a `shots/` study, the dramaturge, a plan for the entry you just claimed a number for.
The build is one file, and it is the one genuinely serial resource here. Almost nothing else is.

And **commit scoped to what you touched**: `git add docs/CHANGELOG.md`, never `git add -A` by hand.
`deploy.ps1` is allowed `-A` because its job is to ship everything, which is exactly why it is gated.

---

## 5. The lesson, for the next thing that looks like this

> **A counter that lives in prose is not a counter, it is a note about a counter.**
>
> Five collisions were read as a discipline problem and answered five times with a stricter
> instruction to grep. It was never a discipline problem. **The document was structurally
> incapable of being right**, because it was written after the thing it described. The fix is not a
> better instruction, it is moving the fact into something that can refuse.

Same shape as the one already on the trap list in [`README.md`](README.md): *one map was answering
two questions.* Here it was **one document holding a fact it could not hold**.
