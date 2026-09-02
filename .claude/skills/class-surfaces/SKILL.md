---
name: class-surfaces
description: "Every surface a class fact has to reach, and the order to reach them in: the act builder, the company sheet, the class picker, the gear hover, the class lab. Where CLASSES, CLSLEAN, CLS_TRAINS, CLS_GIVEN, clsRule and the perk tables live, which reader owns which screen, and the gate row that proves a class change landed. Use whenever a class, a perk, a class act, a weapon category or anything a class GIVES is added or changed."
---

# A class fact has five surfaces, and adding it to one is the recurring bug

Apply this whenever a class, a perk, a class act, a weapon category, or anything a class
*gives* is added or changed.

## ⛔ THE FAILURE THIS FILE EXISTS FOR

Across #280-#287 the same thing happened four times: a class fact was added to the engine or
to the class lab, everything measured correct, and **the player could not see it**.

| entry | what was added | where it did not reach |
|---|---|---|
| #286 | the weapon category | `gearLine` (hover, card row) but **not the inventory slot**, which has its own short summary |
| #287 | the class's rule and lean | the **class lab only**. The game had nowhere to read it from |
| #287 | the class name | on a `title` attribute, which `ui-scales` and #191 both record as **not a readout** |
| #280 | COMMAND on the lab's weapon grid | the grid built at level 1 and COMMAND is gated `level>=4` |

⚑ **The user's words for all four were "I don't see it".** That is the symptom of a fact with
one reader, not of a missing feature. **Triage every "I can't see X" against the DOM before
building X** - the `batch` skill's table, and it has been right every time here.

## ⛑ Where a class fact lives

⛔ **The game is the source. The lab READS it.** #287 had `clsRule` authored in
the class lab, so the one screen a player opens could not say what their class does.
If a class fact exists only in a dev tool, it is not a class fact yet.

| the fact | the table | notes |
|---|---|---|
| name, signature, perk lane | `CLASSES` | `sig` is printed on the PICKER; `LINT` checks `sigActs` against a stub body |
| the stat lean | `CLSLEAN` | one rung, deliberately equal to the race's |
| what it trains | `CLS_TRAINS` | **categories, never weapon keys** - a key list goes stale the day a weapon is added |
| skills it is GIVEN | `CLS_GIVEN` | free, not a decision, applied by `giveClassSkills` |
| its own rule, in words | `clsRule(cls)` | **interpolate every figure** from the constant that pays it |
| what a lean is worth | `leanWords(cls)` → `rungHeld` | never type this; the ladder already knows |
| starting kit | `START_GEAR` | `[armour, main, off]` - the third slot exists since #284 |
| the art kind | `KIND_BY_CLS` | `paintedSpriteKey` falls through to the weapon |
| who may be hired | `CLS_BY_RACE` | the muster wall's own list |
| stat priority | `STAT_PRIO` | the practice bench's policy |

⚠ **Any figure a CARD quotes must be built from the constant the engine reads**
(`'+'+paid(THICKHIDE_ARM)+' armour.'`). A corrected literal is the same defect one retune later.
⚠ **`HDA_CUT` cuts hitpoints, damage and armour and nothing else.** Morale and percentages are
paid in full; do not "fix" them into agreement.

## ⛑ The five surfaces, and who owns each

Walk this list every time. Four of the five are one insertion each.

1. **The act builder** - `unitFrom`. Class acts are pushed here, gated on `trainedKit`.
   ⚠ A signature needs the weapon **in hand** (`main && trainsCat`); a class act that needs no
   weapon (ROAR, COMMAND, the caster's schools) is pushed in its **own** `p.cls===` block and
   must not go through the sig gate.
2. **The company sheet** - `drawInv`. `#iCls` is the one line; the rest is the `tipOn`/`TIP`
   hover beside the personality's. **The sheet has its own short summaries** (`shortGear`) and
   does *not* call the hover builder.
3. **The class picker** - the `data-trade` branch in `drawInv`, the one screen a class is chosen
   on. It draws lean, trains, signature and kit.
4. **The gear hover** - `gearLine`, read by the hover *and* the market row *and* the card row.
   **Three surfaces, one insertion** - which is exactly why the slot being separate is easy to miss.
5. **The class lab** - the CLASSES tab of `tools/lab.html`, which reads all of it live. Add the field to the
   bridge's `classRows()` and it is on the card.

## ⛔ The gate row for a class change

```bash
python tools/dev/gt.py check                       # parses; does NOT run
python tools/dev/gt.py eval gates.js sheet.js      # LINT 0, and the sheet's floor/clip
python tools/dev/gt.py eval smoke.js reach.js promises257.js
python tools/dev/gt.py arena regress.js            # no ERR, no FATAL, no HIT GUARD
```

⛔ **`gt.py check` CANNOT CATCH A DEAD BUILD.** #286 taught four perk cards to quote a `const`
declared eleven thousand lines below `PERKS`; `PERKS` is an object literal evaluated where it
sits, so the temporal dead zone threw at load and every global after it vanished. **The file was
valid JavaScript and the game was dead.** The one-second check that would have caught it:

```bash
python tools/dev/gt.py eval <(echo "typeof LINT")   # "function", or the build is dead
```

⛑ **So: every figure a class card quotes lives in ONE block above `PERKS`.** Keeping each
constant beside its first engine use is what scattered them.

⚠ **A sheet change needs the baseline diff and a raw number is not a finding.** #287's class
block measured "slack -36.8, scroll 21" - meaningless alone. Against `git show HEAD:` the same
probe read "slack 27-84, scroll 0", and the pair said the block cost ~60px the column had not
got. The fix was the sheet's own grammar (one line, the rest on hover), not a smaller font.

```bash
git show HEAD:prototype/grimtoll_slice.html > "$SCRATCH/_baseline.html"
python tools/dev/gt.py launch --port 9999 --url "$SCRATCH/_baseline.html"
python tools/dev/gt.py eval sheet.js --port 9999 --url "$SCRATCH/_baseline.html"
python tools/dev/gt.py eval sheet.js            # then diff, and delete the copy
```

## ⚠ Two traps that cost real time here

**A new class act is not proved by the card existing.** #285 shipped five acts that looked right
and were not: CRYSTALISE took 79% instead of 25% (the factor sat one line below `d.armour-=armD`,
so the harness was already spent), UNMAKING crashed `strike` (no dice, and `strike` reads
`act.dmg[0]` - a no-damage working goes through `a.hex` beside UNPICK), and EXECUTIONER shipped
with `crowd:true` that nothing read. **Fire every act in a live battle**, and force the roll:
`u.mskill=999; t.dodgeBase=-999`, because most of these rules only run on a landed blow.

**`selectAct(i)` takes an INDEX and reads `cur()`, which is `B.order[B.idx]`** - not a unit. A
targeted act resolves in the click block after `spend`, not in the self-act chain.

## ⚠ And do not misread the deploy

`git cat-file -s` gives the **LF blob**; the working copy is **CRLF**. On this 55k-line file that
is a 55,098-byte difference, which reads exactly like "one deploy behind" and is not. Compare the
**build stamp**, never the size:

```bash
curl -s -r 30050000-30150000 https://dmytriyvihrov-stack.github.io/My-game/ | grep -aoE "BUILD_ID[^;]{0,60}"
```
