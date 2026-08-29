# -*- coding: utf-8 -*-
"""#266 ask 3 - the sheet's three pools take the battle card's dividers, and the
   mood bar's gates stop being a stale literal."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ---- the hatch, and the sheet joins it -------------------------------------
E.append((
 "   ⚠ SCOPED TO #bPlq. `.bar` is the company screen's and the sheet's too. */\n"
 "#bPlq .bar{position:relative}\n"
 "#bPlq .bar::after{content:'';position:absolute;inset:0;pointer-events:none;",
 "   ⚠ ~~SCOPED TO #bPlq~~. ⚡ #266 - AND THE SHEET IS IN IT NOW. (User, the three\n"
 "   rows boxed: *\"Bars with health do more in style of the game - and feel free to\n"
 "   add some dividers (like in battle)\"*.) #249 had already given both surfaces the\n"
 "   socket and the crown; the DIVIDERS were the half that stayed behind, so the sheet\n"
 "   drew the same three pools as unbroken blocks while the card two clicks away read\n"
 "   in blows. Nothing here is new - it is one selector, and the arithmetic that makes\n"
 "   it free is #219's: `:is()` takes the specificity of its most specific argument,\n"
 "   so these rules keep exactly the 1-1-0 they had and `.ibars .sbar .bar` (0-3-0,\n"
 "   later in the sheet) still wins on height and border the way it must.\n"
 "   ⚠ `--seg` IS WRITTEN BY `drawInv` OFF THE SAME `SEG()` AND THE SAME TWO\n"
 "   CONSTANTS the plaque uses, never a second figure: a section is one blow's worth\n"
 "   and a blow does not change size between screens. */\n"
 ":is(#bPlq,.ibars) .bar{position:relative}\n"
 ":is(#bPlq,.ibars) .bar::after{content:'';position:absolute;inset:0;pointer-events:none;"))

# ---- the mood gates, derived --------------------------------------------
E.append((
 "   ⚠ THE TICKS ARE THE RUNG THRESHOLDS AND NOT EVEN SECTIONS. LADDER's gates\n"
 "   are 15 / 40 / 70 / 90, so an evenly sectioned bar would draw a scale this\n"
 "   game does not have - the wide stretch between 40 and 70 is the real shape\n"
 "   of \"Ok\", and it is the thing the player is reading. `--seg` is suppressed\n"
 "   here for that reason: it is the blows-left rule, and nerve is not spent\n"
 "   in blows. */",
 "   ⚠ THE TICKS ARE THE RUNG THRESHOLDS AND NOT EVEN SECTIONS, so an evenly\n"
 "   sectioned bar would draw a scale this game does not have - the wide stretch\n"
 "   the body actually stands in is the real shape of the ladder, and it is the thing\n"
 "   the player is reading. `--seg` is suppressed here for that reason: it is the\n"
 "   blows-left rule, and nerve is not spent in blows.\n"
 "   ⛔ #266 - AND THE FOUR FIGURES USED TO BE TYPED HERE, AND THEY WERE WRONG.\n"
 "   This rule read `15 / 40 / 70 / 90` and the ladder's gates have been\n"
 "   `15 / 34 / 52 / 90` since #129 inserted SHAKEN and #228 merged Ok into Happy -\n"
 "   so for two entries the mood bar on the battle card drew its dividers at rungs\n"
 "   that do not exist, and the word inside the bar and the tick beside it disagreed\n"
 "   by up to 18% of the pool. Nothing said so, because a stylesheet cannot be asked\n"
 "   what `LADDER` says. It is `--nrvticks` now, BUILT from `LADDER` beside the table\n"
 "   itself, which is #137's rule arriving on a gradient: a rung added or moved is\n"
 "   drawn correctly untaught, and this entry moved two of them.\n"
 "   ⚠ The `none` fallback is not defensive dressing: it is what the rule paints\n"
 "   between parse and the line that sets the variable, and no ticks is the right\n"
 "   picture for a ladder nothing has read yet. */"))

E.append((
 "#bPlq .bar.nrv::after{display:none}\n"
 "#bPlq .bar.nrv::before{content:'';position:absolute;inset:0;pointer-events:none;\n"
 "  background:linear-gradient(90deg,\n"
 "    transparent 0 calc(15% - 1px),rgba(7,11,12,.92) calc(15% - 1px) 15%,\n"
 "    transparent 15% calc(40% - 1px),rgba(7,11,12,.92) calc(40% - 1px) 40%,\n"
 "    transparent 40% calc(70% - 1px),rgba(7,11,12,.92) calc(70% - 1px) 70%,\n"
 "    transparent 70% calc(90% - 1px),rgba(7,11,12,.92) calc(90% - 1px) 90%,\n"
 "    transparent 90%)}",
 ":is(#bPlq,.ibars) .bar.nrv::after{display:none}\n"
 ":is(#bPlq,.ibars) .bar.nrv::before{content:'';position:absolute;inset:0;\n"
 "  pointer-events:none;background:var(--nrvticks,none)}"))

# ---- built from LADDER, once, beside the table -----------------------------
E.append((
 "  {at:0,   n:'Broken',     ic:'\U0001f480',col:'#c15d55',bg:'rgba(193,93,85,.26)',\n"
 "   d:'Routed. Running off the map and out of the battle, unless somebody rallies them.'}\n"
 "];",
 "  {at:0,   n:'Broken',     ic:'\U0001f480',col:'#c15d55',bg:'rgba(193,93,85,.26)',\n"
 "   d:'Routed. Running off the map and out of the battle, unless somebody rallies them.'}\n"
 "];\n"
 "/* ⛔ #266 - THE DIVIDERS ON A MOOD BAR ARE THIS TABLE, READ. See the\n"
 "   `.bar.nrv::before` rule in the stylesheet for what they were before: four\n"
 "   percentages typed into CSS, two of them wrong for two entries. A gradient cannot\n"
 "   ask a JS table anything, so the table hands it over - one custom property, set\n"
 "   once, read by the battle card and the company sheet alike.\n"
 "   ⚠ IT IS DECLARED IMMEDIATELY UNDER `LADDER` AND RUNS AT PARSE. A `const` read\n"
 "   from its temporal dead zone throws and aborts the whole script, which is the\n"
 "   crash `.claude/rules/world-map-sights.md` records this project shipping once;\n"
 "   sitting directly under the thing it reads is what makes that impossible.\n"
 "   ⚠ THE BOTTOM GATE IS 0 AND IS NOT DRAWN: a tick on the left edge of the bar is\n"
 "   the edge of the bar. */\n"
 "const NRV_TICKS=(()=>{\n"
 "  const ink='rgba(7,11,12,.92)';\n"
 "  const g=LADDER.map(l=>l.at).filter(a=>a>0).sort((a,b)=>a-b)\n"
 "                .map(a=>+(a*100).toFixed(2));\n"
 "  let s='transparent 0';\n"
 "  g.forEach(p=>{s+=' calc('+p+'% - 1px),'+ink+' calc('+p+'% - 1px) '+p+\n"
 "                   '%,transparent '+p+'%';});\n"
 "  return 'linear-gradient(90deg,'+s+')';\n"
 "})();\n"
 "try{document.documentElement.style.setProperty('--nrvticks',NRV_TICKS);}catch(e){}"))

# ---- and the sheet's three rows carry the two facts the card's rows carry ---
E.append((
 "          '<div class=\"sbar\"><span class=\"sbi\" title=\"ARMOUR - it takes the hit first\">⛨</span>'+\n"
 "            '<div class=\"bar sbb\" style=\"background:#243133\"><i style=\"width:'+(arm?100:0)+",
 "          /* ⚡ #266 - `--seg` AND `nrv`, WHICH IS ALL THE SHEET NEEDED. The two\n"
 "             divider rules moved to `:is(#bPlq,.ibars)` in the stylesheet; what a\n"
 "             renderer still owes them is the section count on the two pools that are\n"
 "             spent in blows, off `SEG()` and the plaque's own two constants, and the\n"
 "             `nrv` class on the one that is not. */\n"
 "          '<div class=\"sbar\"><span class=\"sbi\" title=\"ARMOUR - it takes the hit first\">⛨</span>'+\n"
 "            '<div class=\"bar sbb\" style=\"--seg:'+SEG(u.armourMax||1,SEG_ARM)+\n"
 "              ';background:#243133\"><i style=\"width:'+(arm?100:0)+"))

E.append((
 "            '<div class=\"bar sbb\" style=\"background:#3b2126\"><i style=\"width:'+(100*hpF)+",
 "            '<div class=\"bar sbb\" style=\"--seg:'+SEG(hpMax,SEG_HP)+\n"
 "              ';background:#3b2126\"><i style=\"width:'+(100*hpF)+"))

E.append((
 "            '<div class=\"bar sbb\" style=\"background:#20272a\"><i style=\"width:'+\n"
 "              Math.round(100*nu.morale/(nu.moraleMax||1))+'%;background:'+nl.col+'\"></i>'+",
 "            '<div class=\"bar sbb nrv\" style=\"background:#20272a\"><i style=\"width:'+\n"
 "              Math.round(100*nu.morale/(nu.moraleMax||1))+'%;background:'+nl.col+'\"></i>'+"))

patch(E)
print('bars ok')
