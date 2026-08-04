# Grimtoll

A dark medieval, low-magic tactical roguelike. Slay the Spire style road, Battle
Brothers style hex battles, a company of four strangers who did not choose each
other and one contract that will not wait.

**Play it in the browser: https://USERNAME.github.io/REPO/**

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

## Rebuilding the playable file

`index.html` is `prototype/grimtoll_slice.html` with the compressed audio pack
poured into it. The prototype's `AUDIO_EMBED` table is deliberately empty,
because at the desk the game reads the WAV masters out of `audio/`. A static
host has no such folder, and for several builds that meant a game which played
perfectly here and was completely silent for every playtester. So:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File audio\build_audio.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tools\build_site.ps1
```

The first encodes the eleven approved cues to AAC (79MB of WAV becomes 3.7MB)
and writes `audio/out/audio_data.js`. It needs `ffmpeg` on PATH and it needs the
masters, so it only runs on a machine that has the Drive folder. The second
pours that into a fresh `index.html` at the root and copies the icons beside it.
Commit `index.html` and push: GitHub Pages serves it as it stands.

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
