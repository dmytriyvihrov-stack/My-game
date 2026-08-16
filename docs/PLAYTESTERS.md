# The three playtesters: Dima, Sanya, Andrey

*#162 (8f.190), 2026-08-16.* Three simulated testers you can put a build through and read what
came back: a report in each one's voice, the game's own telemetry for the run, and a diary of every
thought they had while playing. They exist so a build can be tested by three different kinds of
player on demand, before the ten friends see it, and so the same three players can be run again on
the next build and the reports compared.

## One command

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\playtest\run.ps1 -Who all
```

| flag | default | what |
|---|---|---|
| `-Who` | `all` | `dima`, `sanya`, `andrey` or `all` |
| `-Url` | `http://localhost:8777/` | the build. The default is the working prototype; `run.ps1` starts `tools\serve.ps1` if nothing answers. For the deployed page: `-Url https://dmytriyvihrov-stack.github.io/My-game/` |
| `-Budget` | `150` | hand-actions per tester (clicks, keys, waits). Looks, screenshots and notes are free |
| `-Model` | `opus` | `fable`, `opus`, `sonnet`. Keep it the SAME for all three: the difference between the testers must come from the persona, not the model |
| `-MaxUsd` | `20` | dollar cap per tester, passed to the CLI |
| `-Parallel` | off | three browsers and three testers at once, instead of one after another |
| `-Label` | git short hash | the build's name in the report file names |
| `-DryRun` | off | launch the browser, print the command, call nobody |
| `-KeepBrowser` | off | leave the headless browser standing afterwards |

**Where it lands.** `docs/playtests/<stamp>_<label>_<who>.md`, one page per tester, and for `all` a
`..._ALL.md` comparison table on top. The raw folder (transcript, action log, browser profile) is
`%USERPROFILE%\grimtoll-playtest\<stamp>_<label>\<who>\`: outside the repo and outside Google
Drive on purpose.

⚠ **ONE-TIME BEFORE THE FIRST RUN: log the CLI in.** The testers are `claude -p` processes and the
bundled CLI does not share the desktop app's login. Run it once by hand and type `/login`:

```powershell
& "$env:APPDATA\Claude\claude-code\2.1.229\claude.exe"
```

(any version folder in that directory; `run.ps1` picks the newest). Until that is done every report
comes back with `Not logged in` in its cost row and no play. An `ANTHROPIC_API_KEY` in the
environment also works.

## Who they are

`tools\playtest\personas\<who>.md` is the whole person, and `_common.md` is the session protocol
appended to every one of them (tools, stop rules, the report headings). Edit the persona to change
the player; edit `_common.md` to change what every report contains.

| | who | how the rig treats them |
|---|---|---|
| **Dima** | genre veteran, four hundred hours of Battle Brothers, reads once and expects the screen to carry it, hovers everything, tests rules before trusting them, **wants to know what an enemy does BEFORE it acts** and says whether the interface let him find out; judges the choice economy | normal eyes, screenshots at 1:1 |
| **Sanya** | plays most evenings but not this genre; finished Into the Breach and **expects the enemy's intent to be shown**; understands grid tactics at once, some systems half, some not at all, and is told not to pretend otherwise; reads paragraph one, skims two, reads the price | normal eyes |
| **Andrey** | never played anything like it; does not know END TURN, hexes, action points or that green means walkable; reads the big words and looks for the biggest button; long text tires him | **weak eyes**: text under 13px arrives as `▒▒▒▒ (too small to read)`, tiny glyphs as "a tiny mark", screenshots at half size; a `squint(x,y)` close-up exists and **every squint is logged as a moment the game made him lean in** |

Andrey's eyesight is enforced by the server, not requested of the persona: `eyes.py` blurs the text
before he sees it. That is the difference between a tester who is asked to pretend and one who
cannot read the thing.

## What "closed off from everything outside the session" means here, exactly

- Each tester is its own `claude -p` process, started in an **empty folder** under
  `%USERPROFILE%\grimtoll-playtest\`, so there is no `CLAUDE.md`, no `.claude\rules`, and no
  auto-memory for it to inherit.
- `--tools ""`: no Read, no Bash, no Grep, no web. `--strict-mcp-config`: none of the user's
  connectors. Its **only** tool is `game`, served by `tools\playtest\eyes.py`.
- The browser is a fresh headless Chrome/Edge profile per run: **no save, no legacy, no journal**;
  the front door as a stranger sees it.
- The system prompt is the persona plus the protocol and nothing else; the first message is
  "build X is in front of you, begin".
- What it can see is what `look()` and `screenshot()` return, and `look()` hides the developer's
  words: hex tiles come out as "45 tiles of kind A", never `.hex.blocked`. The `DEV.MODE` switch is
  refused by the rig whether clicked by ref or by coordinates.

⛔ **This is why the testers are a script and not `.claude/agents/*.md` files.** A subagent spawned
inside a session that is working this repo inherits the three `.claude/rules/*` files and the
whole `MEMORY.md`; measured on 2026-08-16 by asking one what it could see, and it could name
`MOODSTATES`, the intent glyphs and the clarity pass. That agent would "know" what the ☠️ door
means before it opened it. Nothing in a prompt can un-teach that, so the clean room is a process
boundary, not an instruction.

## What a report contains

Each page, top to bottom:

1. **A header table**: tester, build, url, model, context, actions used, cost.
2. **Results, from the game's own telemetry** (`JOURNAL` and `G`, read from the page after the
   tester left): the day reached, crowns, morale, who is alive, journal rows by kind (battles,
   choices, travel, run-end). This is the objective half; the tester never sees it.
3. **The report itself**, in the tester's voice, with fixed headings so builds can be compared:
   Verdict · Where I stopped and why · Interest over time (from the checkpoints) · Where I got stuck
   or confused · What I understood and what I did not (systems marked UNDERSTOOD / PARTLY / NO)
   · The fights · Reading and looking · Three things I would fix first · Something I liked.
4. **The diary**: every `note()` in order, with the minute, the action count, the screen it was on,
   and the interest score when a checkpoint asked for one.
5. **Spoken thoughts and every action**, folded, from the transcript.

**Interest is measured, not asked for once.** Every 20 hand-actions the rig appends a CHECKPOINT to
the tester's next result and the next `note()` must carry a 1-5 score plus "would you keep playing
if this were your own evening". The stop rule is the other half of it: a tester who would close the
game now is told to close it and say why, and that moment is the first section of the report.

## What is NOT a finding, and what is

- "Andrey could not read X" is a finding when `X` mattered (a price, a button, a warning). The rig
  records every "too small" line; the report asks him to list only the ones that cost him.
- A "harness hiccuped" line in a diary is the rig, not the game. The persona is told so.
- A tester reasoning about a system it never saw explained is a **leak** and the persona is told
  to flag it. In the clean room there is nothing to leak from; if a `[LEAK]` note appears there,
  the model brought it from training, which is worth knowing too.
- Three testers is n=3. A thing all three hit is real; a thing one hit is a lead. Run the same
  build twice before deciding a single tester's complaint is the persona rather than the dice.

## The pieces

| | |
|---|---|
| `tools\playtest\run.ps1` | the runner: serve, browser, system prompt, MCP config, `claude -p`, telemetry, assembly, comparison |
| `tools\playtest\eyes.py` | the eyes and hands. Standard library only. `launch` a headless browser · `serve` it as the MCP server named `game` · `cli` for one-shot driving (`look`, `shot`, `click X Y`, `key`, `dump`, `wipe`, `close`) · `thoughts`/`assemble`/`compare` for the pages |
| `tools\playtest\personas\` | `dima.md`, `sanya.md`, `andrey.md`, `_common.md` |
| `docs\playtests\` | the reports |

`eyes.py` talks DevTools protocol over a websocket it implements itself, because the machine has
no node and the python it uses is the one `build_event_sites.py` already runs on. The `look()`
walker returns visible, un-occluded text and clickables with computed font sizes; a translucent
full-screen layer (the tutorial's spotlight) counts as a veil the eye reads through and the hand
cannot click through, a transparent hit-catcher counts as nothing, an opaque box counts as a cover.

⚑ **The action log answers step 1 of the plan as a by-product.** `actions.jsonl` is every click,
key and wait with the screen it landed on, so "clicks made from launch to the first decision that
costs something" is a count over that file, for three different players, on every build.
