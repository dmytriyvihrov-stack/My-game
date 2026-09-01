# A question for the user lives in ONE file

Apply this rule whenever a session raises something only the user can decide: a taste call, a
ruling, a number that wants his ear, an interpretation of an ask that could have gone two ways.

It is the standing version of #248 (8f.272) and it exists because the alternative was tried for
eight months and failed quietly.

## The one sentence

**Every question for the user goes in [`docs/OPEN_QUESTIONS.md`](../../docs/OPEN_QUESTIONS.md), and
nowhere else is a place it LIVES.** Raise it wherever the reasoning is; file it there in the same
session.

⚡ **AND IT IS TWO FILES, WHICH IS ONE LEDGER** *(2026-08-25, *"put open question in diffrent file
and clean else"*)*. The live file holds only what is still waiting on him;
[`docs/archive/QUESTIONS_ANSWERED.md`](../../docs/archive/QUESTIONS_ANSWERED.md) takes everything
answered, parked or overtaken. ⛔ **A CODE IS NEVER REISSUED** - the codes are how he answers, and an
answer landing on a recycled code is worse than no record. ⚠ `record.py check` reads BOTH, or every
ruling that gets CLOSED would start reporting as an unfiled one.

## ⛔ Why, and the number is the argument

*(2026-08-25. The user: **"what questions? can you please gather all questions and send to me in one
go?"** and **"make a rule to put all questions in only 1 file"**.)*

When that was asked, there were **39 open questions in four places**:

| where | how many | what was wrong with it |
|---|---|---|
| the backlog's *Rulings still waiting on you* | 5 | the only one that was actually a list |
| `README.md` §8 | 5 | a different list, of a different KIND of question, in a different file |
| **`SHIPPED.md` rows, marked `👤`** | **20** | ⛔ **not a list at all** |
| `⏳` remainders across ten entries | 9 | filed by entry, so reading them means reading ten entries |

⛔ **THE TWENTY ARE THE FINDING.** `👤` was a real convention, used correctly, in twenty separate
entries over five months - **and nothing ever collected them.** Each one was written inside the row
of the entry that raised it, which is the most reasonable-looking place to put it and the one place
nobody will ever look. Some had been sitting unanswered since **#90**.

⚑ **AND TEN OF THEM CAME BACK ANSWERED BY WORK THAT WAS NOT ABOUT THEM.** The battle rail's
placement (#94) was overtaken by seven rebuilds of that screen; *"whether the opening is now too
FAST"* (#155) was answered by ten people playing it; *"the two mood numbers are a guess"* (#141) was
answered when the card went to one door. **A question nobody can find is not a question that waits.
It is a question that rots**, and the cost is not the answer that never came - it is that the other
twenty-nine were sitting beside them where he could not see them either.

## Where it goes, and where it does NOT

⛑ **RAISE IT WHERE THE REASONING IS. FILE IT WHERE HE READS.** These are not in tension and both
halves are required:

- **`👤` in a `CHANGELOG.md` or `SHIPPED.md` row is still correct** and should keep being written.
  It is written beside the measurement, the alternative and the reason, and none of that survives a
  move. **That is the RAISING.**
- **A row in `OPEN_QUESTIONS.md` in the same session is the FILING**, and it is not optional. One
  line: the question, where it came from, and a recommendation.

⛔ **THE ANSWER LANDS IN THE SAME FILE.** A ruling given in chat and applied to the code is a ruling
that is lost the moment the session ends - the next session finds the row still open and asks
again. **Strike the row, in the file, in the session that acts on it.**

## ⛔ It is the FIFTH write

`SHIPPED.md`'s header has said *"when an entry ships, four writes"* since the record was split. It
is five now:

| | |
|---|---|
| 1 | full text and a build-log row → `CHANGELOG.md` |
| 2 | a one-line row → `SHIPPED.md` |
| 3 | strike it from `00_PLAN_AND_BACKLOG.md` |
| 4 | a section → `WHAT_TO_TEST.md` |
| **5** | **every ruling it raised → `OPEN_QUESTIONS.md`** |

⚠ **Unlike the other four, this one is CONDITIONAL**: an entry that raises no question writes
nothing, which is the common case. That is exactly why it needs a counter rather than a habit - a
write you only owe sometimes is a write you forget.

## ⛑ And it is checked, because a rule a document states is not a rule the repo keeps

`python tools/record.py check` reports a `👤` in a `CHANGELOG.md` or `SHIPPED.md` row whose entry
has no row in `OPEN_QUESTIONS.md`. ⚠ **A NOTE AND NOT A FAULT**, for the reason `--faults-only`
already gives about the other four writes: the writes finish at different times, and a guard that
refuses the commit on its way to being correct gets bypassed within a day.

⛑ **PROVED BY MAKING IT FIRE**, which is this repo's standing condition for a new check - and the
FIRST attempt at proving it is the reason the paragraph on glyphs below exists. Deleting a row from
`OPEN_QUESTIONS.md` reported **nothing**, because the entry it belonged to (#247) carries no `👤`
at all: the recent entries write every ruling as a `⏳`. The honest test is to seed the glyph itself -
a `👤` added to #235's row, which raises no ruling and has no row in the file, reported
*`#235 marks a ruling with the person glyph in SHIPPED.md and has no row in OPEN_QUESTIONS.md`*, and
removing it returned the linter to silence. ⚠ **A check that agrees with you on the first try has
told you nothing**, and this one was wrong about which half it was testing.

```bash
python tools/record.py check     # a 👤 with no row in OPEN_QUESTIONS.md is named
python tools/dev/emdash.py       # and the file obeys the em dash rule like every other doc
```

## What is NOT a question for this file

⛔ **A `⏳` REMAINDER IS WORK, NOT A QUESTION, AND THE TWO MUST NOT MERGE.**

⚠ **AND THE RECENT ENTRIES HAD ALREADY MERGED THEM, WHICH IS WHY THE COUNTER FOUND NOTHING AT
FIRST.** Every ruling in #238 to #247 was written as a `⏳` beside genuine leftover WORK - so the
twenty `👤` rows all sit at #90 to #157, and the convention had quietly died some time around #160
without anybody deciding to stop. **The check reported zero on its first run and that was the
finding, not a pass.**

⛑ **SO THE TWO GLYPHS ARE A CONTRACT NOW AND NOT A HABIT:**

| | |
|---|---|
| `👤` | **a decision only he can take.** Goes in `OPEN_QUESTIONS.md` the same session. The counter reads this glyph and no other |
| `⏳` | **work nobody has done yet.** Stays in `SHIPPED.md`'s own remainder column, where it is already collected per entry |

⚠ **A row may carry both, and #247's should.** *"The 19 camp cards still letterbox"* is a job
somebody does, so it is `⏳`; *"should the mood mark stay an emoji beside two drawn glyphs"* is a
decision only he can take, so it is `👤`. **If this file fills up with work it stops being
answerable in one sitting, which is the whole thing it was built to be.**

⚠ **And a question a SESSION can answer is not a question for him.** #248 checked six of the twenty
against the running build before asking, and four of them turned out to describe something that no
longer exists. **Drive the thing first. A question about a screen that was rebuilt twice since is
worse than no question**, because answering it costs him the same minute and buys nothing.
