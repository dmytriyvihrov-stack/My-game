# -*- coding: utf-8 -*-
"""#266 asks 1, 2, 8, 9 - nothing is born with anything, the total is the
   headline, the trait line stops repeating it, and the level comes back."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ---- ask 1: no body is BORN with a lean ------------------------------------
E.append((
 "    {id:'you',name:'You',sur:'',race:'human',cls:'captain',kind:'human',leader:true,\n"
 "     st:{str:1,agi:1,int:0,mor:0},trait:'harness',",
 "    /* ⛔ #266 - AND THE CAPTAIN IS BORN WITH NOTHING, WHICH IS THE LAST HALF OF\n"
 "       #255. (User, the row boxed in red on the STRENGTH hover: *\"No Born !\"*.)\n"
 "       #255 stopped ROLLING a born line and kept this one, on the argument that the\n"
 "       Captain's backstory had paid for it. The ask is the same ask a second time,\n"
 "       pointed at the one row that survived: what a body is comes from its race, its\n"
 "       trade and its personality, all three of which the player can read.\n"
 "       ⚠ IT IS A REAL SUBTRACTION AND NOT A RELABEL: he is -1 STR and -1 AGI, which\n"
 "       is priced with ARENA in this entry. What is left of him is +1 STR and +1 MOR\n"
 "       off EXPERIENCED, +1 MOR off the captaincy and +1 INT off being human - four\n"
 "       named lines, none of them a residual. */\n"
 "    {id:'you',name:'You',sur:'',race:'human',cls:'captain',kind:'human',leader:true,\n"
 "     st:{str:0,agi:0,int:0,mor:0},trait:'harness',"))

# ---- and the row that is left is not called `born` any more -----------------
E.append((
 "  /* #253 - the born line is ALWAYS drawn, at 0 as much as at +2: it is the\n"
 "     origin the whole ledger is read from, and a column that starts blank on an\n"
 "     ordinary body reads as a broken box rather than as an ordinary body. */\n"
 "  /* #255 - and the row is drawn only when a backstory actually paid for it */\n"
 "  STATK.forEach(k=>{const b=(p.st[k]||0)-(m[k]||0)-(cl[k]||0)-(lv[k]||0);\n"
 "    if(b)out[k].push({n:'born',v:b});});",
 "  /* ~~#253 - the born line is ALWAYS drawn~~ / #255 - only when a backstory paid */\n"
 "  /* ⛔ #266 - THE ROW IS CALLED `the road` NOW, AND DELETING IT WOULD HAVE COST\n"
 "     TWO SHIPPED REWARDS. (User: *\"No Born !\"*.) The obvious reading of that ask is\n"
 "     to take this line out, and it is wrong: the residual is not the birth roll (#255\n"
 "     deleted that) and it is not the Captain's backstory (deleted above). What is\n"
 "     left in it is `p.st` raised in play - a night at THE WARM SPRING (`springStay`,\n"
 "     +1 MOR, *permanently, for as long as they live*) and the wish off the falling\n"
 "     star (`starWish`, +1 on their weakest axis). Both are permanent, both are\n"
 "     written straight into `p.st` on purpose, and this is the only row that pays\n"
 "     them. Deleting it would have deleted two rewards the cards promise in prose,\n"
 "     which is the promise-versus-payment defect this build has caught six times.\n"
 "     ⛑ SO THE WORD GOES AND THE ROW STAYS, and the new word is the true one: every\n"
 "     live producer of this figure is something the road did. `born` stopped being\n"
 "     accurate the moment nothing is born with anything.\n"
 "     ⚠ IT IS STILL DRAWN ONLY WHEN IT IS NON-ZERO, so an ordinary body's ledger is\n"
 "     race, trade and personality and nothing else - which is what the ask wanted to\n"
 "     see. A LEGACY SAVE reads a pre-#253 promotion here too; that is a line which is\n"
 "     less specific rather than one that is wrong, and it was true of `born` as well. */\n"
 "  STATK.forEach(k=>{const b=(p.st[k]||0)-(m[k]||0)-(cl[k]||0)-(lv[k]||0);\n"
 "    if(b)out[k].push({n:'the road',v:b});});"))

E.append((
 "      /* #254 - zero is `0` and never `−0`: the born line is always drawn now\n"
 "         (#253) and on an ordinary body it is exactly this row. */",
 "      /* #254 - zero is `0` and never `−0`. ⚠ #266: no row here can be zero any\n"
 "         more (the road line is gated on being non-zero and every other row is a\n"
 "         real lean), so this is the guard rather than the common case. */"))

# ---- ask 2: the total, and what it buys, are the headline of the ledger -----
E.append((
 ".stsum .ssgv{font-family:var(--mono);font-size:var(--fs1);color:#8a7248;line-height:1.35;\n"
 "  margin-top:var(--p1)}",
 "/* ⛔ #266 - THE TOTAL AND WHAT IT BUYS ARE THE HEADLINE, AND THEY WERE THE\n"
 "   QUIETEST THING IN THE BOX. (User: *\"Show bigger total bonus - i feel it is quite\n"
 "   important\"*.) The ledger's whole point is the line under the rule - the rung this\n"
 "   body actually stands on and what the fight pays for it - and it was set one step\n"
 "   over the sources that add up to it, with the effects under it on the 10px floor in\n"
 "   the dimmest brown on the card. A sum drawn quieter than its own addends is the\n"
 "   readout saying the wrong thing is important.\n"
 "   ⚠ EVERY SIZE IS STILL AN `--fs` STEP (ui-scales §1) and the sources did NOT\n"
 "   move: what makes a total read as a total is the GAP to the rows above it, so\n"
 "   raising both would have bought nothing. */\n"
 ".stsum .ssgv{font-family:var(--mono);font-size:var(--fs2);color:#c2b493;line-height:1.35;\n"
 "  margin-top:var(--p2)}\n"
 ".stsum .ssgv b{color:#d9bd7e;letter-spacing:.06em}"))

E.append((
 ".stsum .ssr.tot .ssv{font-family:var(--display);font-size:var(--fs4);font-weight:700}",
 ".stsum .ssr.tot .ssv{font-family:var(--display);font-size:var(--fs6);font-weight:700;\n"
 "  line-height:1.1}"))

E.append((
 ".statwrap .stsum{flex:0 0 auto;width:154px;margin-top:0;padding-top:0;border-top:0;",
 "/* ⚡ #266 - 154 -> 176, WHICH IS WHAT THE BIGGER TOTAL COSTS AND IT IS PAID BY THE\n"
 "   TIP AND NOT BY THE LADDER. `#gtTip:has(.statwrap)` caps at 640 and the ladder\n"
 "   column is `flex:1 1 auto`, so 22px comes off a column measured at #230's own\n"
 "   `width:auto`. Measured after: the tip is the same height it was, and no rung name\n"
 "   wraps. */\n"
 ".statwrap .stsum{flex:0 0 auto;width:176px;margin-top:0;padding-top:0;border-top:0;"))

# ---- ask 8: the personality line stops restating the ledger -----------------
E.append((
 "  const full=traitDesc(p),cut=full.indexOf('. ');\n"
 "  return (cut>0&&cut<70)?full.slice(0,cut+1):full.slice(0,66)+'…';\n"
 "};",
 "  const full=traitDesc(p),cut=full.indexOf('. ');\n"
 "  return (cut>0&&cut<70)?full.slice(0,cut+1):full.slice(0,66)+'…';\n"
 "};\n"
 "/* ═══ ⛔ #266 · THE COMPANY SHEET'S PERSONALITY LINE STOPS SAYING THE LEDGER ══\n"
 "   (User, an arrow along the row under the name: *\"don`t like this line\"*, on a\n"
 "   header reading **Experienced · +1 STR and +1 MOR**.)\n"
 "\n"
 "   ⛑ AND WHAT IS WRONG WITH IT IS NOT THE LINE, IT IS THAT ONE SCREEN SAYS ONE\n"
 "   FACT TWICE. #234 authored `up:'+1 STR and +1 MOR'` at the user's own word and it\n"
 "   is right where it is READ - the muster wall, the promotion card, the battle\n"
 "   hover, all places with no ledger beside them. On this sheet the four stat hovers\n"
 "   name EXPERIENCED as a row and total it, and this entry has just made that total\n"
 "   the loudest thing in the box; the header was the second receipt, and it was the\n"
 "   one that cannot be checked against anything. That is the rule at the top of\n"
 "   `.claude/rules/event-cards.md` arriving on the company sheet.\n"
 "\n"
 "   ⛔ SO IT IS A FILTER AND NOT A REWRITE, AND IT RUNS ON THIS SURFACE ONLY.\n"
 "   `traitShort` is unchanged and its five other callers print exactly what they\n"
 "   printed. What comes off here is a clause that is ONLY a stat restatement; a\n"
 "   clause that says something else keeps every word - DOES NOT RUN keeps *Cannot\n"
 "   rout, ever*, HAS NO STOMACH FOR IT keeps *-18 morale and -7% damage per kill*,\n"
 "   which are rules rather than rungs and appear on no ladder.\n"
 "   ⚠ SO A TRAIT WHOSE WHOLE SHORT FORM IS ITS STATS PRINTS ITS NAME ALONE, and\n"
 "   that is the case the ask is about. Nothing is lost: the lore box is one hover\n"
 "   away on the name, and the rungs are two columns down where they add up.\n"
 "   ⚑ `SHEET_TRAIT_STATS = true` PUTS IT BACK IN ONE WORD, which is #240's switch\n"
 "   and the reason that entry cost one line when the user changed his mind hours\n"
 "   later. A cut taken on somebody's word gets a way back or the next answer is a\n"
 "   re-argument.\n"
 "   ⚠ BOTH MINUS SIGNS. The tables are authored with U+2212 and a hyphen appears in\n"
 "   both; a regex that knows only one of them silently keeps half the clauses. */\n"
 "const SHEET_TRAIT_STATS=false;\n"
 "const STAT_CLAUSE=/^[+−-]\\s*\\d+\\s*(STR|AGI|INT|MOR)"
 "(\\s*(and|,|·)\\s*[+−-]?\\s*\\d+\\s*(STR|AGI|INT|MOR))*\\.?$/i;\n"
 "const traitSheetShort=p=>{\n"
 "  const s=String(traitShort(p)||'');\n"
 "  if(SHEET_TRAIT_STATS)return s;\n"
 "  return s.split(' · ').filter(x=>!STAT_CLAUSE.test(x.trim())).join(' · ');\n"
 "};"))

E.append((
 "      '<div id=\"iTrait\"><b>'+TRAITS[p.trait].n+'</b> · '+traitShort(p)+'</div>'+",
 "      /* #266 - and the stat half of it comes off. See `traitSheetShort`. */\n"
 "      (t=>'<div id=\"iTrait\"><b>'+TRAITS[p.trait].n+'</b>'+(t?' · '+t:'')+'</div>')\n"
 "        (traitSheetShort(p))+"))

# ---- ask 9: the level, and the experience with it --------------------------
E.append((
 "    /* ⚠ #253 - AND THE LEVEL RING STAYS DELETED. #246 put the level on the\n"
 "       roster portrait's corner and #251 moved `xpHover` onto that plate with\n"
 "       it, so this would be the one fact on the row that IS said twice. The\n"
 "       race and the class are back because a mark on a tile is not a name. */\n"
 "    '';",
 "    /* ~~⚠ #253 - AND THE LEVEL RING STAYS DELETED~~.\n"
 "       ⚡ #266 - IT IS BACK, AT THE USER'S WORD, AND WITH THE FIGURES ON IT.\n"
 "       (*\"return lvl with expirience - so i can see it in details\"*.)\n"
 "       #251's argument was that the roster tile 130px away carries the level and\n"
 "       the arc, so this row would say it twice - and that argument was about the\n"
 "       LEVEL. It was never true of the EXPERIENCE: a 42px arc round a bust says\n"
 "       *somewhere along* and nothing else, and the two exact figures were on a\n"
 "       `title` attribute, which is the one readout `.claude/rules/ui-scales.md`\n"
 "       and #191 both record as not being a readout. The ask names the numbers,\n"
 "       so the numbers are on the chip rather than behind it.\n"
 "       ⚠ THE RING IS THE SAME BUILDER AT THE SAME 26 IT USED TO BE, and `xpHover`\n"
 "       stays on the roster plate as well: two surfaces reading one function is not\n"
 "       the drift this file guards against, two surfaces computing it would be.\n"
 "       ⚠ AT THE CAP THERE IS NOTHING LEFT TO COUNT, so the figures give way to the\n"
 "       word `xpHover` already uses. A `0 of 0` on a body that is finished is a\n"
 "       counter printing the wrong unit. */\n"
 "    '<span class=\"ichip xplv\" title=\"'+esc(xpHover(p))+'\" style=\"cursor:help\">'+\n"
 "      xpRing(p,26,true)+'<span class=\"xpn\">'+\n"
 "      ((p.level||0)>=XP_CAP?'MAX'\n"
 "        :(Math.max(0,(p.xp||0)-xpNeed(p,p.level||0))+'<span class=\"of\">/'+\n"
 "          Math.max(1,xpNeed(p,(p.level||0)+1)-xpNeed(p,p.level||0))+'</span> XP'))+\n"
 "      '</span></span>';"))

E.append((
 ".ichip.xplv .xpring{display:block}",
 ".ichip.xplv .xpring{display:block}\n"
 "/* #266 - the two figures beside the ring. `--fs1` is the floor and the pool it is\n"
 "   out of takes `.of`'s own dimmer treatment, which is the same pair the hitpoint\n"
 "   bar draws: what is EARNED is the fact, what it is out of is context. */\n"
 ".ichip.xplv .xpn{font-family:var(--mono);font-size:var(--fs1);letter-spacing:.08em;\n"
 "  color:var(--g3);margin-left:var(--p2)}\n"
 ".ichip.xplv .xpn .of{color:#7a6238}"))

patch(E)
print('head ok')
