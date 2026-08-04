# Grimtoll

A dark medieval, low-magic tactical roguelike. Slay the Spire style road, Battle
Brothers style hex battles, a company of four strangers who did not choose each
other and one contract that will not wait.

**Play it in the browser: https://dmytriyvihrov-stack.github.io/My-game/**

Nothing to install and nothing to download. It is one HTML file with the
paintings and the score inside it. Works on a phone. Your run saves to the
browser, so closing the tab does not lose it.

## What is in here

| Path | What it is |
| --- | --- |
| `index.html` | **The build people play.** Generated. Do not hand-edit it. |
| `prototype/grimtoll_slice.html` | The working file. This is the one that gets changed. |
| `docs/` | Start at `docs/README.md`, then `00_PLAN_AND_BACKLOG.md`, then `CHANGELOG.md`. |
| `docs/WHAT_TO_TEST.md` | What is new and what to look at, written for a playtester. |
| `content/` | Events, names, personalities, art prompts, authored separately from code. |
| `tools/` | Local server, the dramaturge, the test harness. |
| `art/`, `audio/` | The build pipelines. The masters themselves are not in git, see `.gitignore`. |

## Deploying

One command, from this folder:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File deploy.ps1
```

It rebuilds `index.html`, **refuses to push if the sound did not make it in**,
commits, pushes, and prints the live URL. The link never changes.

`index.html` is `prototype/grimtoll_slice.html` with the compressed audio pack
poured into it, and it is **generated, never hand-edited**. The prototype's
`AUDIO_EMBED` table is deliberately empty, because at the desk the game reads
the WAV masters out of `audio/`. A host has no such folder, and for forty builds
that meant a game which played perfectly here and was silent for every
playtester. **[`docs/DEPLOY.md`](docs/DEPLOY.md) is the full card**: first-time
GitHub Pages setup, the flags, what is in git and what is not, and what to do
when git asks for a password.

To run the working file locally instead:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1
```

then open http://localhost:8777/ for the prototype, or
http://localhost:8777/index.html for the built page exactly as a player gets it.

## Playtesting notes

Sound starts on the first click, not on load, because every browser blocks
autoplay. The speaker button is bottom right. On a phone, "add to home screen"
gives it an icon and a full screen.
