# -*- coding: utf-8 -*-
"""#292 part A - THE THREE POOLS READ AS ONE INSTRUMENT.

(User, 2026-09-02: *"пройдись по дизайну всех екранов. Сделай лучше - мор
соответствующий, консистент, четче бордеры и т.д. бар здоровье, брони и морали
четче."*)

Four things, all inside `.claude/skills/ui-scales/SKILL.md` 3c's own vocabulary:

  1. the frame round a pool goes `--e1` -> `--e2`. It is the one hairline that
     says where the bar ENDS, and at `--e1` on a `#0e1516` card it was the
     dimmest edge on the panel.
  2. the section dividers get a 1px light rim. They were a single dark line, so
     a bar was sectioned over its FILL and unbroken over its drained half -
     which is exactly backwards, because "how many more blows" is a question
     about the part that is still there against the part that is gone.
  3. the trough colours stop being typed twice. `#243133` / `#3b2126` /
     `#20272a` were inline on the battle markup AND inline in `drawInv`: one
     fact, two builders, and the pair had no way of staying together. They are
     three stylesheet rules keyed off `.parm` / `.phit` / `.nrv` now.
  4. the sheet's ARMOUR row gets its `/max`. It printed `10` beside a `19/19`
     and a `68/120` - one row of three with no denominator, and the same row on
     the battle card has printed `2/2` since #247.

Run:  python tools/dev/patches/p292_a_pools.py
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

E = []

# ---- 1 · the frame -------------------------------------------------------
E.append((
    "  box-shadow:inset 0 0 0 1px var(--e1),inset 0 2px 4px -2px rgba(0,0,0,.75);",
    "  /* #292 - `--e2` AND NOT `--e1`. The ring on this overlay is the only line that\n"
    "     says where a pool ENDS, and on a drained bar it is the only line that says the\n"
    "     bar is there at all. At `--e1` it was the dimmest edge on a panel whose own\n"
    "     border is `--e5`, so the three readouts the player checks most often had the\n"
    "     softest boxes on the screen. One step up the gold ladder, no box moved. */\n"
    "  box-shadow:inset 0 0 0 1px var(--e2),inset 0 2px 4px -2px rgba(0,0,0,.75);"))

# ---- 2 · the section dividers read on the drained half too ---------------
E.append((
    ":is(#bPlq,.ibars) .bar::after{content:'';position:absolute;inset:0;pointer-events:none;\n"
    "  background:repeating-linear-gradient(90deg,\n"
    "    rgba(0,0,0,0) 0, rgba(0,0,0,0) calc(100%/var(--seg,4) - 1.5px),\n"
    "    rgba(7,11,12,.92) calc(100%/var(--seg,4) - 1.5px), rgba(7,11,12,.92) calc(100%/var(--seg,4)))}",

    "/* ⛔ #292 - AND THE DIVIDER IS A DARK LINE WITH A LIT RIM, BECAUSE ONE DARK LINE\n"
    "   ONLY EXISTS OVER THE FILL. The trough is `#243133` / `#3b2126` / `#20272a` and the\n"
    "   ink was `rgba(7,11,12,.92)`: over steel or blood that is a clean notch, over the\n"
    "   drained half it is one dark on another and the sections vanish. So a bar read as\n"
    "   sectioned exactly where the pool still is, and as one unbroken block exactly where\n"
    "   it is gone - which is backwards, since #94's whole argument is that the width of a\n"
    "   section is a BLOW and the question is how many are left.\n"
    "   ⛑ THE RIM IS THE SAME LIGHT THE FILL ALREADY WEARS. `.sbb>i::after` crowns every\n"
    "   fill with `rgba(255,246,224,.20)`; a 1px rim off that family reads as the lit side\n"
    "   of a groove on the fill and as the only visible thing on the trough, so one\n"
    "   declaration covers both grounds and no colour is invented.\n"
    "   ⚠ THE DIVIDER IS 2.5px WIDE NOW AND THAT IS THE COST. The narrowest host is the\n"
    "   sheet at ~193px of bar; `SEG` caps the count, so the widest a divider ever gets is\n"
    "   2.5 of a section, and it is 1.5 of one on the battle card. Measured, not guessed. */\n"
    ":is(#bPlq,.ibars) .bar::after{content:'';position:absolute;inset:0;pointer-events:none;\n"
    "  background:repeating-linear-gradient(90deg,\n"
    "    rgba(0,0,0,0) 0, rgba(0,0,0,0) calc(100%/var(--seg,4) - 2.5px),\n"
    "    rgba(255,246,224,.17) calc(100%/var(--seg,4) - 2.5px), rgba(255,246,224,.17) calc(100%/var(--seg,4) - 1.5px),\n"
    "    rgba(7,11,12,.92) calc(100%/var(--seg,4) - 1.5px), rgba(7,11,12,.92) calc(100%/var(--seg,4)))}"))

# ---- 2b · the mood ticks, built beside LADDER, get the same rim ----------
E.append((
    "const NRV_TICKS=(()=>{\n"
    "  const ink='rgba(7,11,12,.92)';\n"
    "  const g=LADDER.map(l=>l.at).filter(a=>a>0).sort((a,b)=>a-b)\n"
    "                .map(a=>+(a*100).toFixed(2));\n"
    "  let s='transparent 0';\n"
    "  g.forEach(p=>{s+=' calc('+p+'% - 1px),'+ink+' calc('+p+'% - 1px) '+p+\n"
    "                   '%,transparent '+p+'%';});\n"
    "  return 'linear-gradient(90deg,'+s+')';\n"
    "})();",

    "/* ⛔ #292 - THE RUNG GATES TAKE THE SAME LIT RIM AS THE BLOWS HATCH, and they need\n"
    "   it more: the mood trough is `#20272a` and a body standing at STEADY has two thirds\n"
    "   of its ladder drawn on that ground, so the gates the whole row is READ against were\n"
    "   the half of the bar you could not see. Same two stops, same family, one place. */\n"
    "const NRV_TICKS=(()=>{\n"
    "  const ink='rgba(7,11,12,.92)',rim='rgba(255,246,224,.17)';\n"
    "  const g=LADDER.map(l=>l.at).filter(a=>a>0).sort((a,b)=>a-b)\n"
    "                .map(a=>+(a*100).toFixed(2));\n"
    "  let s='transparent 0';\n"
    "  g.forEach(p=>{s+=' calc('+p+'% - 2px),'+rim+' calc('+p+'% - 2px) calc('+p+'% - 1px),'+\n"
    "                   ink+' calc('+p+'% - 1px) '+p+'%,transparent '+p+'%';});\n"
    "  return 'linear-gradient(90deg,'+s+')';\n"
    "})();"))

# ---- 3 · the trough colour lives in the stylesheet, once -----------------
E.append((
    ".sbar>.sbb{position:relative;flex:1;height:var(--sbh);overflow:hidden}",

    ".sbar>.sbb{position:relative;flex:1;height:var(--sbh);overflow:hidden}\n"
    "/* ⛔ #292 - THE TROUGH IS ONE FACT AND IT WAS TYPED IN TWO BUILDERS. `#243133`,\n"
    "   `#3b2126` and `#20272a` sat inline on the battle card's markup and inline again in\n"
    "   `drawInv`'s string, which is rule 4 (one fact, one builder) on three colours that\n"
    "   have to agree across two screens or the same pool means two things. The row says\n"
    "   WHICH pool it is and the stylesheet says what a drained one looks like.\n"
    "   ⚠ THE FILL STAYS INLINE AND MUST. It is `--steel`, `hpCol`'s ramp and the rung's\n"
    "   own colour - three readouts - and #249's note on the veil is about exactly that. */\n"
    ".sbar>.sbb.parm{background:#243133}\n"
    ".sbar>.sbb.phit{background:#3b2126}\n"
    ".sbar>.sbb.nrv {background:#20272a}"))

# the battle card's markup
E.append((
    '<div class="bar sbb" style="background:#243133"><i id="bArm" style="background:var(--steel)"></i>',
    '<div class="bar sbb parm"><i id="bArm" style="background:var(--steel)"></i>'))
E.append((
    '<div class="bar sbb" style="background:#3b2126"><i id="bHp" style="background:var(--blood)"></i>',
    '<div class="bar sbb phit"><i id="bHp" style="background:var(--blood)"></i>'))
E.append((
    '<div class="bar nrv sbb" style="background:#20272a"><i id="bNerve"></i>',
    '<div class="bar nrv sbb"><i id="bNerve"></i>'))

# the sheet's builder
E.append((
    "'<div class=\"bar sbb\" style=\"--seg:'+SEG(u.armourMax||1,SEG_ARM)+\n"
    "              ';background:#243133\"><i style=\"width:'+(arm?100:0)+",
    "'<div class=\"bar sbb parm\" style=\"--seg:'+SEG(u.armourMax||1,SEG_ARM)+\n"
    "              '\"><i style=\"width:'+(arm?100:0)+"))
E.append((
    "'<div class=\"bar sbb\" style=\"--seg:'+SEG(hpMax,SEG_HP)+\n"
    "              ';background:#3b2126\"><i style=\"width:'+(100*hpF)+",
    "'<div class=\"bar sbb phit\" style=\"--seg:'+SEG(hpMax,SEG_HP)+\n"
    "              '\"><i style=\"width:'+(100*hpF)+"))
E.append((
    "'<div class=\"bar sbb nrv\" style=\"background:#20272a\"><i style=\"width:'+",
    "'<div class=\"bar sbb nrv\"><i style=\"width:'+"))

# ---- 4 · the sheet's armour figure gets its /max -------------------------
E.append((
    "'</b><span class=\"sbR\">'+arm+'</span></span></div></div>'+",
    "/* ⛔ #292 - AND THE DENOMINATOR, WHICH ONLY THIS ROW WAS MISSING. It printed\n"
    "   `10` under a `19/19` and over a `68/120`, and the SAME row on the battle card has\n"
    "   read `2/2` since #247 - so one pool of three said what it was out of, depending on\n"
    "   which screen you were on. `armourValue(p)` IS `u.armourMax` here (measured on the\n"
    "   whole company), which is why the fill is drawn at 100%: out of a fight the shell is\n"
    "   whole, and saying so is the point. */\n"
    "'</b><span class=\"sbR\">'+arm+'<span class=\"of\">/'+(u.armourMax||arm)+\n"
    "              '</span></span></span></div></div>'+"))

patch(E)
print('p292_a: %d edits applied' % len(E))
