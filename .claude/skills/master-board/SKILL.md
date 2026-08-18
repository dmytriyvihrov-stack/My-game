---
name: master-board
description: Build or update the RabbleBound master board, the visual plan-and-backlog page. Use when the user asks to see the plan, see progress, see the backlog "in a good view", show what is next, or when an entry ships or a gate-1 step changes state and the board has gone stale.
---

# The master board

One page that answers three questions the docs answer slowly: **what is the next step**, **what does
that step spend**, and **what can wait**. It is a *view*, never a source. Built 2026-08-01 at the
user's request, and they picked the light theme by name.

## Where things live

| | |
|---|---|
| **The page** | `.claude/skills/master-board/board.html` in this repo. **This is the file you edit.** |
| **The published copy** | https://claude.ai/code/artifact/a6203c02-2946-4272-b3e5-83f7d5e691c2 |
| **The data** | `docs/00_PLAN_AND_BACKLOG.md` (gate-1 steps + backlog index) and `docs/SHIPPED.md` (the number registry) |

**To update:** edit `board.html`, verify (below), then call `Artifact` with that file path. From a
session that did not publish it, pass the URL above as `url` or it mints a new link.

## The rule that keeps it honest

**The board never invents state.** Every row, status and count is read out of the two docs. If the
board and the docs disagree, **the docs win and the board is wrong**. Re-read both before touching
it; this project runs parallel sessions and entries ship mid-conversation.

## Structure, top to bottom

1. **Masthead** with a five-cell tally: bucket sizes, critical gates, shipped.
2. **Gate 1 rail** - the thirteen steps plus the gate, as clickable stations. A progress meter above
   it. Clicking a station writes its done-test into the detail panel **and dims every backlog row
   that step does not consume.** That cross-link is the point of the page; do not remove it.
3. **The three buckets** - the whole backlog, sorted by *when it has to be true* rather than by tier.
4. **The order strip** - one line per bucket, the numbers in build order.
5. **The open decisions** - what the board is waiting on the user to rule.

## The three buckets, and how to place a row

Set by the user 2026-08-01. Ask the questions in order and stop at the first yes.

| | the question | placement rule |
|---|---|---|
| **I** | Does a friend need this to understand the game or be treated fairly by it? | **Before the first playtest.** Nothing here may add a system. Polish, measurement, art, fairness. |
| **II** | Does the depth pass need it before strangers arrive? | **Before the second playtest.** Foundations, the anatomy, the rule changes. **The bigger conceptual work goes here by the user's own call: skill synergies (#45) and metaprogression (settlements, #59).** |
| **III** | Everything else. | **Later, and say out loud that it is not a demotion.** Mostly consumers of the two gates above, so they get cheaper the moment those exist. |

**A critical gate** is a row that other rows cannot start without. Mark `crit:true`, give it a
`blocks:` sentence naming what waits, and it renders with a green rule and a `CRITICAL GATE` tag.
There are three today: **#13** (the whole balance trio), **#24** (five entries), **#4+17** (two).
**Do not mark a row critical because it is important.** Only because something is blocked.

## The data, all inline in `board.html`

Three arrays near the top of the `<script>`:

- **`STEPS`** - `{id, nm, s, moved?, dt, done, why, uses[]}`. `s` is the status:
  `open` (steel) · `moving` (brass) · `ask` (rust, **the user's own question mark**, undecided on
  purpose) · `gate` (green). `uses` holds backlog numbers as strings and drives the highlight, so
  `"4+17"` must match the entry's `n` exactly.
- **`BUCKETS`** - the three headings and their why-text.
- **`E`** - one object per backlog row:
  `{n, b, sc, tier, t, d, m, crit?, blocks?, wait?, feeds?[], note?}`.
  `b` is the bucket, `sc` the screen key, `m` the model tag, `wait` the hard dependency,
  `feeds` the gate-1 steps it serves.

Keep the counts in the masthead tally in step with the arrays. The bucket headings compute their own
`n of n`, the tally does not.

## Design contract

**Deliberately single-theme.** The user picked the light one by name (*"I love white one"*), so the
page does **not** follow `prefers-color-scheme` and does not answer the viewer's dark toggle. That is
a choice, not an omission. Do not "fix" it.

- **Palette** - ink `#14181B`, bone ground `#DCDAD2`, panel `#E7E5DE`, hairline `#B7B3A6`.
  Brass `#8A6516` is the accent and marks *moving / this step / highlighted*. Verdigris `#356B59` is
  the critical gate. Rust `#94371F` is *your call, undecided* and the open decisions. Steel `#5F7079`
  is not-started. Semantic colour is never decorative here: each one means one thing.
- **Type** - Georgia for display and folio numbers, the system sans for body, a mono for every
  number, tag and label. No webfonts: the artifact CSP blocks font CDNs and a link would fall back
  silently.
- **Layout** - a ledger, not cards. Square corners, hairline rules between rows, the entry number and
  its tier set as a folio in the left gutter. Wide strips get their own `overflow-x:auto`.

## Writing rules

- **No em dash anywhere.** Hard rule on this project. Use a full stop, comma, colon or plain hyphen.
- Say what a thing *is for*, not what it is made of. A row's one line should be usable by somebody
  who has not read the entry.
- When a placement is a judgement rather than a fact, **say so on the row and give the trigger that
  would reverse it** (see #47's note).

## Build and verify

1. Edit `board.html`.
2. **Boot last.** The renderers close over consts declared further down; calling `select()` before
   they exist is a TDZ crash that kills the whole script and leaves a page with a rail and no
   backlog. It has happened once. The boot call stays at the very bottom.
3. Verify live: `cp .claude/skills/master-board/board.html ./_board_preview.html`, open
   `http://localhost:8777/_board_preview.html`, check the console is clean and that the bucket counts
   and `.ent` total match the arrays, then **delete `_board_preview.html`**. The dev server on 8777
   is often owned by a parallel chat; do not fight for the port, just use it.
4. Publish with `Artifact`, favicon `⚔`, passing the URL above when updating from a fresh session.

## When an entry ships

Strike its row from `E`, drop the bucket count in the tally, and if it was a critical gate, move that
mark to whatever is now blocking the most. If it was consumed by a gate-1 step, that step probably
moved too: update its `s` and set `moved`. **The MOVED date is the reason this page exists** - it is
what turns a checklist into a slope. Never backdate one.
