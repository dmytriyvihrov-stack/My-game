---
name: grimtoll-payday-cycle
description: "#152 (2026-08-14): wages accrue daily and fall due every FOURTH day; roads carry no crown prices; captain draws 1, ogre 2"
metadata: 
  node_type: memory
  type: project
  originSessionId: 01bd7ed1-0c57-439d-b164-bb6895581216
  modified: 2026-08-14T10:41:41.786Z
---

**#152 / 8f.180, SHIPPED 2026-08-14.** Wages are a BILL, not a drip: `G.owed` accrues
`dailyUpkeep()` per day inside `passDays()`, and the chest opens on days divisible by
`PAY_EVERY` (4). The user asked the design question first ("once in 4-5 days +-"), the
comparison decided 4 (daily is Battle Brothers' cadence over hundreds of days; a ~22-day run
wants Wartales' dated bill; 4 gives one payday per fork branch and a bill one median event find
covers), and he ruled "ececute this new system of padayin 4 day".

Facts a future session needs before touching the economy:

- ⚑ **Accrual is the load-bearing half**: it is what let every ◉ come off the road labels, fork
  rows and travel buttons (his order: "delete crowns from each road and crosroad decigion")
  without breaking the fork's longer-road-costs-more trade. Do not reprint a crown price on a
  road surface; the PAYDAY chip owns the money question.
- **`wageOf(p)` is the one door** (`p.leader?1:WAGE[p.race]`): the Captain draws 1 whatever his
  race, ogre is 2 (the one-crown "he does not know his worth" joke is DEAD, RACEHELP rewritten).
  Boot upkeep is 7, first payday bills 21 on day 4 (day 1 never passes through passDays).
- **A short payday is a state**: remainder stays in `G.owed`, bills again next cycle, the chest
  catches up BY ITSELF at day's end while anybody is owed (`p.unpaid` gates it). #5/#114
  grievance maths untouched: 10 mood/day standing, `p.unpaid` counts DAYS never paydays (nerve
  4/day and the five-day walkout were tuned in days; walkout now implies two consecutive missed
  paydays).
- **The loud payment** is `G.paidFlash` → `.payflash` on the PAYDAY chip + crowns segment for
  exactly one bar rebuild, `sfx('coin')`, a say2 line. Never a card. ⚠ The keyframe declares
  only its 0% frame so chip and strip each settle to their OWN base colours.
- `G.owed` rides the save in `flags` with `||0` guards; `fundedDays()`/`fundedCol()` are
  deleted (#20's never-a-gate ruling lives on in the chip colour).
- 👤 His open playtest questions: is 4 the right beat vs 5, and is the ogre (3 seats AND 2/day)
  ever the right hire now.

Related: [[grimtoll-clarity-pass]] (this was a MERGE under its rule: ~22 silent charges became
5-6 dated events), [[grimtoll-event-card-rules]] (no card text touched; receipts unchanged).
