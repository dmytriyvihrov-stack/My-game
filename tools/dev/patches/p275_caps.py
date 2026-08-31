# -*- coding: utf-8 -*-
# #275 - the two stacking caps: dodge past 25, to hit past 100.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

OLD_CONST = """const DODGE_SOFT=12,DODGE_RATE=0.6;
const softDodge=v=>v<=DODGE_SOFT?v:DODGE_SOFT+(v-DODGE_SOFT)*DODGE_RATE;"""

NEW_CONST = """/* \u2550\u2550\u2550 \u26d4 #275 \u00b7 THE TWO STACKING CAPS, AND THEY ARE ONE RULE SAID TWICE \u2550\u2550\u2550
   (User, 2026-08-31, of the DODGE hover's own `hard to stack past 12` row:
   *"hard to stuck: -dodge after 25, -atack - after 100"*.)

   \u26d4 DODGE_SOFT WAS 12 AND A STARTING BODY ALREADY DODGES 14. So the cap was
   biting every body in the game on the day it was rolled, which makes it a flat
   tax on the stat rather than a ceiling on STACKING it - and a player who spent
   a level, a shield and a trait on footwork was being handed 60% of the third
   thing they bought. 25 is above what a fresh body brings and under what a
   built one reaches, which is where a soft cap is supposed to sit.

   \u26d1 AND THE TO-HIT SIDE HAD NO CAP AT ALL, which is why the ask names both in
   one breath. `hitOf` is the same shape as `dodgeOf` below - one function, a
   collector for the hover, the cap applied LAST to the sum so no contributor
   gets to opt out of it - and every reader of `u.mskill` on a card or in the
   arithmetic goes through it. \u26a0 The raw field stays raw: it is written by
   `unitFrom` and by `build()` in a dozen `+=` lines and read by the ledger, so
   capping it in place would leave the hover unable to say what it took off. */
const DODGE_SOFT=25,DODGE_RATE=0.6;
const softDodge=v=>v<=DODGE_SOFT?v:DODGE_SOFT+(v-DODGE_SOFT)*DODGE_RATE;
const HIT_SOFT=100,HIT_RATE=0.6;
const softHit=v=>v<=HIT_SOFT?v:HIT_SOFT+(v-HIT_SOFT)*HIT_RATE;
/* \u26d4 IT IS THE BODY'S OWN RATING AND NOT THE WHOLE ROLL. An act's `aim` is a
   fact about the WEAPON and is added after, the same way the target, the ground
   and the arc are: what the ask is capping is what a player STACKS onto a body,
   which is exactly the figure the sheet's TO HIT prints.
   \u26a0 THE COLLECTOR IS `u.hitWhy`, WHICH #254 BUILT BESIDE THE `+=` LINES. This
   function does not re-add anything; it copies those rows and appends the one
   line they cannot know about, which is the cap. Same contract as `dodgeOf`. */
function hitOf(u,W){
  const raw=(u&&u.mskill)||0,out=Math.max(0,Math.round(softHit(raw)));
  if(W){(u&&u.hitWhy||[]).forEach(r=>W.push(r));
    if(raw>HIT_SOFT)W.push(['hard to stack past '+HIT_SOFT,-Math.round(raw-softHit(raw))]);}
  return out;
}"""

# hitBreakdown reads the capped rating
OLD_SKILL = """        skill=(arcSkill!==null?arcSkill:a.mskill)+(act.aim||0),"""
NEW_SKILL = """        /* #275 - the cap, on both halves of the same question. A working is
           aimed with the INTELLECT and it stacks the same way a sword arm
           does, so `softHit` takes the arcane figure too. */
        skill=(arcSkill!==null?softHit(arcSkill):hitOf(a))+(act.aim||0),"""

# the battle plaque
OLD_PLQ = """    $('bHitN').textContent=u.mskill+'%';"""
NEW_PLQ = """    $('bHitN').textContent=hitOf(u)+'%';   /* #275 - the capped figure, like DODGE beside it */"""

# the readout card's SKILL / DODGE row
OLD_RR = """      ?'<div class="rr"><span>SKILL / DODGE</span><span>'+t.mskill+' / '+dodgeOf(t)+'</span></div>'"""
NEW_RR = """      ?'<div class="rr"><span>SKILL / DODGE</span><span>'+hitOf(t)+' / '+dodgeOf(t)+'</span></div>'"""

# the company sheet's TO HIT
OLD_SHEET = """          '<span data-drv="hit">TO HIT <b>'+u.mskill+'%</b></span>'+"""
NEW_SHEET = """          '<span data-drv="hit">TO HIT <b>'+hitOf(u)+'%</b></span>'+"""

# the sheet hover: TO HIT now has a collector like the other two
OLD_HOV = """      const W=[],val=which==='dodge'?dodgeOf(u,W):which==='hp'?bodyHp(p,W):u.mskill;
      const rows=(which==='dodge'||which==='hp')?W:(u.hitWhy||[]);"""
NEW_HOV = """      /* #275 - and the third takes a collector too, so the cap gets a NAMED row
         instead of falling through to the residual line below. */
      const W=[],val=which==='dodge'?dodgeOf(u,W):which==='hp'?bodyHp(p,W):hitOf(u,W);
      const rows=W;"""

patch([(OLD_CONST, NEW_CONST), (OLD_SKILL, NEW_SKILL), (OLD_PLQ, NEW_PLQ),
       (OLD_RR, NEW_RR), (OLD_SHEET, NEW_SHEET), (OLD_HOV, NEW_HOV)])
