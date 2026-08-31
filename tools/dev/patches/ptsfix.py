# -*- coding: utf-8 -*-
"""Re-check the threat price: four defects, all of them a readout being wrong.

(User, 2026-08-31: "Can you recheck threat points?")

`unitPts` (#216) prices the practice field's bands, the dev bench and the map's
dev badge. It never touches a fight, which is why none of this was caught.

  1  PTS_SCALE's own comment says "the four founders sum to ~100". They sum to
     37: HDA_CUT cut hitpoints, damage and armour 3.5x on both sides and a
     geometric mean of two things each cut 3.5x is cut 3.5x.
  2  A caster's damage was clamped to a flat 26. Every die in the game was cut
     by HDA_CUT and that constant was not, so all three casters priced off it
     (raw dpr 7 / 7 / 14 against a clamp of 26).
  3  Offence was weighted by `mskill` on every act. A working is aimed with the
     INTELLECT (#253/#254) and nothing dodges it, so the one-word ogre - whose
     whole design is missing two workings in three, arc 41 - priced as if he
     swung at 53, and the warp-sniffer - arc 76 - as if he cast at 56.
  4  A cooled act was priced as if it fired every turn.

  and two rules that ARE first-order and were worth nothing: burning ground
  (the salamander's own bestiary line says its bite is not the point) and
  hit-and-run / veiled, which are staying power without being a number.

EVERY NEW CONSTANT IS MEASURED OFF THE BUILD, none is picked:
  PTS_SCALE  1.135  = 0.42 * 100/37, against ARENA.COMPS.four()
  ARC_THROUGH 1.35  = the mean of (hp+.8*armour)/hp over the two reference
                      companies (1.19 on the starting four, 1.53 on the
                      prepared six). A working goes through the plates
                      entirely, so it only has to chew the hitpoints.
  the ember term    = EMBER_HIT + BURN_TICK*BURN_TURNS, the game's own three
                      constants, on one body.

Re-runnable; refuses a second run.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import read, write            # noqa: E402

MARK = 'PTS_ARC_THROUGH'

OLD_SCALE = ("const PTS_SCALE=0.42;   "
             "/* the dial. Recalibrate against the founders, nothing else. */")

NEW_SCALE = u"""/* ⛔ 2026-08-31 - 0.42 -> 1.135, WHICH IS THIS COMMENT BEING OBEYED RATHER THAN
   CHANGED. The dial is calibrated so the four founders sum to ~100 ("bring 100
   points" means "bring the company the run starts with"), and measured against
   `ARENA.COMPS.four()` they summed to 37: HDA_CUT took hitpoints, damage and
   armour 3.5x on BOTH sides, and `pts` is a geometric mean of the two, so it
   came down 3.5x with them. ⚠ THE BANDS DID NOT MOVE AND CANNOT: `simBands` is
   ratios of the same net (x1.3 / x1 / x0.75), so only the absolute reading was
   ever wrong. Recalibrate against the founders, nothing else. */
const PTS_SCALE=1.135;
/* ⛑ A WORKING GOES THROUGH THE PLATES ENTIRELY (`ignoresArmour`, am:0), so an
   arcane blow only has to chew the hitpoints while a sword has to chew the whole
   pool `stay` counts. The premium is therefore (hp + .8*armour)/hp on whoever
   they are actually fighting: measured 1.19 on the starting four and 1.53 on the
   prepared six, 2026-08-31. ⚠ RE-MEASURE IT IF EITHER COMPANY'S KIT MOVES. */
const PTS_ARC_THROUGH=1.35;"""

OLD_FN = """function unitPts(u){
  if(!u||u.passive)return 0;              /* the cub is a decision, not a threat */
  let dpr=0;
  (u.acts||[]).forEach(a=>{
    if(!a.dmg||a.move)return;
    const avg=(a.dmg[0]+a.dmg[1])/2+(u.dmgBonus||0);
    let v=avg*((u.actionsMax||2)/Math.max(1,a.cost||1));
    if(a.sweep)v*=1.35;                   /* hits everything adjacent */
    if(a.range)v*=1.10;                   /* distance is rounds of free work */
    dpr=Math.max(dpr,v);
  });
  if(u.caster)dpr=Math.max(dpr,26*(u.spellPow||1));   /* a school, through armour */
  let off=dpr*(.35+.011*(u.mskill||50));
  /* the wedding's whole difficulty tuning is this flag (#159), so the scale
     has to read it: a drunk body swings at -12 and dodges at -8 */
  if(u.drunk)off*=0.7;
  const dv=Math.max(0,(u.dodgeBase||0)-(u.drunk?8:0));
  const stay=((u.hpMax||1)+.8*(u.armourMax||0)+22*(u.soak||0))
    *(1+dv/90)*(u.noRout?1.25:1);
  return Math.max(1,Math.round(Math.sqrt(off*stay)*PTS_SCALE));
}"""

NEW_FN = u"""/* how much of a swing actually lands, off the skill that AIMS that swing */
const ptsWeight=k=>.35+.011*(k||50);
function unitPts(u){
  if(!u||u.passive)return 0;              /* the cub is a decision, not a threat */
  const mw=ptsWeight(u.mskill);
  /* ⛔ AN ARCANE ACT IS AIMED WITH THE INTELLECT AND NOTHING DODGES IT (#253,
     #254), so it is weighted by `D.arc` and never by the weapon arm. Weighting
     every act by `mskill` priced the one-word ogre - arc 41, and the fight IS
     that he misses - as if he swung at 53, and the warp-sniffer - arc 76 - as
     if he cast at 56. Two bodies, wrong in opposite directions, from one line.
     ⚠ `D.arc` NEEDS `u.st` AND A HAND-TUNED BOSS MAY NOT HAVE ONE, so the
     weapon weight is the fallback rather than a throw. */
  let aw=mw;
  try{if(u.st)aw=ptsWeight(D.arc(u));}catch(e){}
  const score=a=>{
    if(a.move)return 0;
    let avg=a.dmg?(a.dmg[0]+a.dmg[1])/2+(u.dmgBonus||0):0;
    /* ⛑ BURNING GROUND IS DAMAGE, AND IT IS THE GAME'S OWN ARITHMETIC RATHER
       THAN A GUESS: one body pays EMBER_HIT to stand in it and BURN_TICK for
       BURN_TURNS after. The cinder salamander's bestiary line is *"It cannot
       really hurt you. The ground it leaves behind can"* and it was priced on
       the half that cannot. */
    if(a.ember||a.char)avg+=EMBER_HIT+BURN_TICK*BURN_TURNS;
    if(!avg)return 0;
    let v=avg*((u.actionsMax||2)/Math.max(1,a.cost||1));
    if(a.sweep)v*=1.35;                   /* hits everything adjacent */
    if(a.range)v*=1.10;                   /* distance is rounds of free work */
    if(a.arcane)v*=PTS_ARC_THROUGH;       /* it only has to chew the body */
    return v*(a.arcane?aw:mw);
  };
  const acts=(u.acts||[]).filter(a=>!a.move);
  let best=0,bestCool=0,free=0;
  acts.forEach(a=>{const v=score(a);
    if(v>best){best=v;bestCool=a.cool||0;}
    if(!a.cool&&v>free)free=v;});
  /* ⛔ A COOLED ACT DOES NOT FIRE EVERY TURN AND THE MAX PRICED IT AS IF IT
     DID. Over `cool+1` turns it lands once and the best FREE act covers the
     rest, which is arithmetic rather than a discount factor. ⚡ It changed
     nothing on the shipped build - no body's best act is behind a cooldown -
     and it is here because the re-weighting above can make one, silently. */
  let off=bestCool?(best+bestCool*free)/(bestCool+1):best;
  /* the wedding's whole difficulty tuning is this flag (#159), so the scale
     has to read it: a drunk body swings at -12 and dodges at -8 */
  if(u.drunk)off*=0.7;
  const dv=Math.max(0,(u.dodgeBase||0)-(u.drunk?8:0));
  let stay=((u.hpMax||1)+.8*(u.armourMax||0)+22*(u.soak||0))
    *(1+dv/90)*(u.noRout?1.25:1);
  /* ⛑ TWO RULES THAT ARE STAYING POWER WITHOUT BEING A NUMBER ON THE BODY.
     `bounce` leaves the hex after it swings, so the thing is not standing there
     when your turn comes - which is the lurcher's ENTIRE design and was worth
     nothing; `veiled` cannot be targeted at all until it moves. Both are
     deliberately small: they buy turns, not hitpoints. */
  if(acts.some(a=>a.bounce))stay*=1.20;
  if(u.veiled)stay*=1.15;
  return Math.max(1,Math.round(Math.sqrt(off*stay)*PTS_SCALE));
}"""


def main():
    s, crlf = read()
    if MARK in s:
        print('already applied; nothing to do')
        return
    for old, new in ((OLD_SCALE, NEW_SCALE), (OLD_FN, NEW_FN)):
        if s.count(old) != 1:
            raise SystemExit('REFUSED: anchor matched %d times' % s.count(old))
        s = s.replace(old, new)
    write(s, crlf)
    print('threat price re-derived')


if __name__ == '__main__':
    main()
