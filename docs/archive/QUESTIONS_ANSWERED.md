# Questions that are closed

> **Split out of [`OPEN_QUESTIONS.md`](../OPEN_QUESTIONS.md) on 2026-08-25** at the user's request
> (*"put open question in diffrent file and clean else"*). That file holds only what is still
> waiting on him; everything answered, parked or overtaken lands here.
>
> ⛔ **A CODE IS NEVER REISSUED.** `B4` here means `B4` there is not missing, and a row that comes
> back open keeps the code it had. That is the whole reason this is a separate file rather than a
> deletion: the codes are how he answers, and an answer that lands on a recycled code is worse than
> no record at all.
>
> ⚠ **`python tools/record.py check` reads BOTH files**, so an entry whose ruling was answered does
> not start reporting as an unfiled `👤`.

---

## ✅ Answered, 2026-08-25

*The user, working down the gathered list: **"Stone shield - do"** · **"b6 - good, close"** ·
**"b8 do it, great"** · **"b7 - if it answere, solved - close"** · **"c3 - find how to resolve it"**.
Built as #248 round two, build log **8f.273**.*

| | what it was | what happened |
|---|---|---|
| **E2** · #192 / #224 / #245 | Four items had no painting and two paintings had no item | **The Fingerprint Stone Shield is built.** Painted, embedded and rowless since #192. EPIC, two-handed, MAIN slot, 8-13 damage, **+30 armour, +12 dodge, every hit shoves a hex**. ⛑ It needed **two engine fields nobody had**: `armourValue` never summed a main-hand piece (the brief predicted that one in capitals) and `unitFrom` never read a main-hand `dodge`, so both numbers would have been printed by the sheet and ignored by the board. ⛑ **Wired to THE SITTING STONE's bread door**, because `unique:true` means an unwired row is dead content - and that card has opened with an ogre sitting on a rock since it was written, so the rock is the shield. ⏳ **The four unpainted items are parked as art** at his word (*"paintings for future"*); ⏳ the kris still needs a BLEEDING status the engine does not have |
| **B6** · #239 | The wagon was never re-priced against the halved salvage curve | `FRAME_COST` **6/12/24 → 5/10/18**. ⚡ And the card's own *"Seats go 13, 14, 16, 18"* sentence had the ladder TYPED IN; it is derived off `FRAME_SEATS` now, so B8 moved it in the same edit without anybody going to find it |
| **B7** · #239 | A rare shop roll leaned to trinkets | It answered, so it closed. `rollRack` walks `slotOrder()` the way `rollFind` already did, so the SLOT is rolled off `FIND_SLOT` before anything is picked inside it. **Measured over 300 racks: main 43% · armour 24% · trinket 11% · off 11% · bag 10%** |
| **B8** · #238 | The weak joint was the party cap, not the wagon | **`PARTYBASE` 13 → 11**, seat ladder **11 / 12 / 14 / 16**. A seat upgrade is only candy when the cap binds, and four founders at 8 of 13 almost never reached it |
| **C3** · #157 | The muster might not be distinguishing anybody | ⛔ **The complaint was not literally true and the measurement is what said so**: over 400 musters two candidates share a whole four-sentence line **0.7%** of the time and all three share one **0%**. ⛑ **What is the same is the REGISTER, and it is arithmetic**: over 1,740 bodies str/agi/int run **3-13, median 8, p95 11** against thresholds authored at 17/15/13/11/9, so the median body took the SIXTH of nine phrases and the top four were unreachable. `Not strong` 38% · `Heavy-handed` 39% · `Plain` 40%, every one below the middle of its own vocabulary. ⚡ **#230's paintings were paying for it too** - `statIco` reads the same index, so str showed **5 of 9** grades. The bands moved, not one word of the vocabulary; now `Strong enough` 39% · `Steady enough` 40% · `Sensible` 35%, grades seen **str 5→8, agi 6→9**. ⚠ `mor` untouched: it runs 1-19 and already used 9 of 9 |

---

## ⏸ Parked, 2026-08-25: perks, classes and stats

*The user: **"summarise something that not related to perks, clases and stats (they are under
rework)"**.* **None of these is answered.** They come back as the rework's own decisions rather than
as questions beside it.

| | what it was | why it is parked |
|---|---|---|
| **A1** · #204 | STRENGTH and AGILITY become signed ladders, 0 = the ordinary human, size carrying hitpoints and STR multiplying it | it **is** the stat rework. ⚠ The art already shipped: #230 painted nine grades across four stats and they are on the sheet now, so the pictures exist and the ladder does not |
| **A2** · #47 | The spear gets its weakness - bad in a clinch, one accuracy band, and SHOVE is the tool that converts reach 1 back to reach 2 | a class contract: the whole entry is what one class is FOR. The build is one condition in the accuracy calculation; the expensive half is the enemy AI in both brains |
| **B4** · #243 | the glass-cannon mage behind `MAGE_GLASS=false` | two buttons that differ only in perks |
| **B9** · #240 | `PUNCH THROUGH` priced and never fielded | an archer perk |
| **C5** · #134 | the joke door needs a reason the player can read before it returns | its own note says the reason has to be *a stat, a trait, a personality*, so it is blocked by construction |

⚠ **`C3` stayed LIVE while these were parked, and that was a judgement call**: its bands are read
off stats, so the rework could have moved it, but the fault was that the median body was described
as deficient and that is a banding problem whatever the numbers become. **A question the rework
might incidentally fix is not the same as a question the rework OWNS.** It was then resolved above.

---

## ⌛ Overtaken by later work

*Raised honestly, never answered, and answered anyway by something that was not about them. Kept
rather than deleted because **a question closed by somebody other than the person who asked it
should be visible**, and because any of them can come back on one word.*

| | what it was | what overtook it |
|---|---|---|
| **F1** · #94 | *"the rail's placement is yours - maybe place under the skills?"* | the battle screen has been rebuilt in #231, #234, #236, #243, #244, #246 and #247. That rail is not the rail that is there |
| **F2** · #95 | *"everything at FULL is 9% smaller; one constant if that is too much"* | #241 and #243 rewrote the camera, its clamping and its stops |
| **F3** · #122 | *"the prose paragraph above the grid; if he wants the pure BB ledger it goes"* | #187 rebuilt the aftermath around that paragraph, deliberately, as a tray |
| **F4** · #135 | *"if the fights now read as too soft, that is a separate call"* | he called the balance done on 2026-08-25 |
| **F5** · #155 | *"whether the opening is now too FAST is a playtest question"* | ten people played it |
| **F6** · #108 | the two interpretation calls: the *"correct king"* read as the ratkin, and Vesna as the second arrival | both have been in the shipped opening for two weeks with no objection |
| **F7** · #141 | *"the two mood numbers are a guess"* (−4 / +8) | the card has one door and one figure now |
| **F8** · #143 | the coin's one door overruling #141's two-door decision | same card, same answer |
| **F9** · #152 | *"the 4-vs-5 number itself is his to feel out in play"* | ten runs of play and the payday cycle has not been raised once |
| **F10** · #156 | *"whether the enemy's reach should show his weapon's REACH on top of his stride"* | #244 and #246 rebuilt what a hex says about reach, twice |

⚑ **THE LESSON THIS TABLE IS REALLY ABOUT.** Ten of the twenty rulings gathered in #248 were in this
state, some since **#90**. **A question nobody can find is not a question that waits; it is a
question that rots** - and the cost was never the answer that failed to come, it was that the other
twenty-nine were sitting beside them where he could not see them either.
