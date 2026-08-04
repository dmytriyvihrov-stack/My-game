# Deploying: how the link gets updated

> **The short version.** One command, from the project folder:
>
> ```powershell
> powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1
> ```
>
> That builds the playable page, refuses to ship it if the sound did not make
> it in, commits, pushes, and prints the live URL. About twenty seconds.
> Everything below is only here for the day something goes wrong.

---

## Where it lives

| | |
|---|---|
| **Repo** | https://github.com/dmytriyvihrov-stack/My-game |
| **The link you send** | **https://dmytriyvihrov-stack.github.io/My-game/** |

*Done on 2026-08-04. Kept here in case a second copy is ever needed: create a
**public** repo without a README, then `git remote add origin <url>` and
`git push -u origin main`, then **Settings → Pages → Source: Deploy from a
branch → `main` / `(root)` → Save**, and the link appears about a minute later.*

Send that link to anyone. It works on a phone, needs no account, installs nothing,
and the run saves in their browser so closing the tab does not lose it.

**If git asks for a password:** GitHub stopped accepting account passwords years ago.
It wants a **personal access token**. github.com → Settings → Developer settings →
Personal access tokens → Tokens (classic) → Generate new token → tick **`repo`** →
paste that where it asks for a password. Windows remembers it after the first time.

---

## Every time after that

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1
```

| Flag | When |
|---|---|
| *(nothing)* | the normal case. Rebuilds the page, commits, pushes. |
| `-Audio` | **only after something in `audio/` changed.** Re-encodes the pack, about 30 seconds. Skipped otherwise, which is what makes the normal case fast. |
| `-m "what changed"` | your own commit message instead of the dated default. |
| `-NoPush` | build and commit, hold the push. |

**The link never changes.** Every push updates the same URL, so a link you sent last
week is the build you pushed a minute ago. If a friend still sees the old one, it is
their browser cache: Ctrl+F5.

---

## The one thing that can go wrong, and why the script checks for it

**`prototype/grimtoll_slice.html` is the working file and its audio table is EMPTY on
purpose.** At this desk the game reads the 44.1k WAV masters out of `audio/`, which is
why it sounds right while you build. A web host has no such folder.

So **copying the working file to the host produces a game that plays perfectly here
and is silent for everybody else.** That is not a hypothetical: it is what shipped
from build 8f.70 until 8f.111, and it came back as reports of the music *dying*,
because from the player's side that is exactly what it looks like.

The hosted file is therefore **generated, never copied**:

```
audio\build_audio.ps1     79MB of WAV  ->  3.7MB of AAC  ->  audio\out\audio_data.js
tools\build_site.ps1      prototype + that block  ->  index.html  (10.3MB, self-contained)
deploy.ps1                both of the above, plus the guard, plus git
```

`deploy.ps1` then **reads the built file back** and counts what is actually in it:
fewer than 11 audio cues or fewer than 100 pictures and it refuses to push. Checking
the thing that ships rather than the thing that was meant to ship is the entire point
of that step.

⚠ **Verify on `/index.html`, never on `/`.** `tools/serve.ps1` maps `/` to the
prototype, so testing the root serves you the working file with no audio in it and
looks like a failure that is not there. This has already fooled one session.

---

## What is in git and what is not

Committed: the playable `index.html`, the prototype, `docs/`, `content/`, `tools/`,
and every build script. About 19MB.

Not committed: `art/src`, `audio/music`, `audio/sfx`, `audio_review/`, `shots/`.
That is roughly 360MB of masters for a 10MB page, and both pipelines read them
straight out of the Google Drive folder anyway. `.gitignore` says which and why.

**This means `deploy.ps1 -Audio` only works on a machine that has the Drive folder.**
A fresh clone can rebuild the page from `audio/out/audio_data.js`, but it cannot
re-encode from masters it does not have. That is a deliberate trade, not an oversight.

⚠ **`.git` lives inside a Google Drive folder.** Drive syncing a repository while git
is writing to it is a known way to corrupt one. Worth pausing sync during a push, or
moving the project off Drive.

---

## Other hosts, if GitHub is ever in the way

`index.html` is one self-contained file. Any static host runs it.

| | |
|---|---|
| **Netlify Drop** | app.netlify.com/drop, drag `index.html` on, URL in ten seconds, no account |
| **itch.io** | the right home for a real playtest: upload as an HTML game, put a password on it |

⛔ **Not the Claude artifact.** That route was abandoned at 8f.110 after a day of
bisection: the share check reads the page whole, gives one sentence and no reason, and
refused the build with no way to find out why. See `CHANGELOG.md` 8f.109 and 8f.110.
On a real host the `window.claude` ban also evaporates, so the save-as-a-file row that
8f.104 cost you can come back whenever you want it.
