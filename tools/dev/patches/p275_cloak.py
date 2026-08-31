# -*- coding: utf-8 -*-
# #275 - the Disguise Cloak: the rules half.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

OLD_CUR = """const cur=()=>B.order[B.idx];
/* anything standing next to ANY part of you is engaging you */"""
NEW_CUR = """const cur=()=>B.order[B.idx];
/* ═══ ⛔ #275 · THE DISGUISE CLOAK: A BODY NOBODY IS LOOKING FOR ═══════
   (User, 2026-08-31: *"add disgise cloak. Camufliage for 2 turns for this unit.
   It gets of - when enemy is standing on nearest tile / triyng to take the
   place, where you disgies character stands. After your atack or active
   damaging skill effect disapear. Take 1 action. Uncommon"*, then *"maybe, add
   that you are invisible until enemy actually steps on you. for near by can
   only smart 2+ detect you"*.)

   ⛑ THE LIZARDS' VEIL IS THE SAME KIND OF FACT AND IT IS NOT THE SAME RULE,
   so this is a second field rather than a second meaning on the first. A veil
   is *you cannot aim at me from further than a hex*; the cloak is *you cannot
   aim at me at all*, and it is broken by four different things. Merging them
   would be one field answering two questions, which is the split `passable`
   and `walkable` were separated over.

   THE FOUR DOORS OUT, AND EACH IS STATED EXACTLY ONCE:
     · you swing, or something lands on you    -> `strike`, the one blow door
     · something clever is standing beside you -> `spotAround`, off `beginTurn`
       and `walkTo`, i.e. it was already there or it has just walked up
     · something walks into the hex you are on -> `walkTo`, the one move door
     · two rounds                              -> `hiddenLive`, and no clock

   ⚠ `HIDE_SEE` IS AN INTELLECT RUNG AND NOT A RACE. *"smart 2+"* read against
   the ladder every body on both sides climbs (`.claude/rules/enemy-stats.md`),
   so a clever ratkin sees you and a dog does not, and nothing here carries a
   list of who is clever that could go stale.
   ⚠ AND IT IS ROUNDS, WHICH IS #46's OWN RULING ON VENOM: a clock counting
   TICKS would last a different length of time depending on how many bodies are
   on the field. Set to `B.round+2`, live while `B.round` is strictly under it,
   so a cloak pulled on in round 3 covers rounds 3 and 4 and is gone in 5. */
const HIDE_TURNS=2, HIDE_SEE=2;
function hiddenLive(u){return !!(u&&u.hideUntil&&B&&B.round<u.hideUntil&&!u.dead&&!u.fled);}
/* can `u` NOT see `t`. Same side always sees its own: your line walks round its
   own hidden mate exactly as it did before, so nothing on your half of the
   board changed. */
function hiddenFrom(u,t){
  if(!hiddenLive(t))return false;
  if(!u||u.side===t.side)return false;
  return !(udist(u,t)<=1&&statRung(u,'int')>=HIDE_SEE);
}
/* the one exit, whatever ended it - the same shape `popIllusion` has. */
function unhide(u,why){
  if(!u||!u.hideUntil)return;
  u.hideUntil=0;
  fx(u,'SEEN','#e07a28',true);
  if(why)say(why);
}
/* `u` looks around it. Called where a body arrives and where its turn opens,
   which between them are every way something comes to be standing beside you. */
function spotAround(u){
  if(!u||!B||!B.units)return;
  if(statRung(u,'int')<HIDE_SEE)return;
  B.units.forEach(t=>{
    if(t.side===u.side||!hiddenLive(t)||udist(u,t)>1)return;
    unhide(t,u.name+' is close enough to see the shape of somebody under the rags.');});
}
/* anything standing next to ANY part of you is engaging you */"""

OLD_CTL = """const controllers=(c,r,side)=>engagers(c,r,side).filter(e=>holdsHex(e,c,r));"""
NEW_CTL = """/* #275 - and a body nobody can see holds no ground. All four readers of
   control (the parting swing, the red edge, the undo test and DISENGAGE's own
   gate) inherit that from this one filter, which is why the list of four in the
   note above is the reason it goes here and not in `partingShots`. */
const controllers=(c,r,side)=>engagers(c,r,side)
  .filter(e=>holdsHex(e,c,r)&&!hiddenLive(e));"""

OLD_AIM = """  (!t.veil||udist(u,t)<=1)&&"""
NEW_AIM = """  /* ⛔ #275 - THE CLOAK, AND IT IS ONE CLAUSE FOR THE VEIL'S OWN REASON: this
     is the one gate, so the player's offer ring, `aiTurn` and `autoStep` refuse
     together and none of them can stall on it. */
  !hiddenFrom(u,t)&&
  (!t.veil||udist(u,t)<=1)&&"""

OLD_RM = """  Object.keys(dist).forEach(k=>{const p=k.split(',');
    if(at(+p[0],+p[1]))delete dist[k];});"""
NEW_RM = """  /* ⛔ #275 - EXCEPT A HEX WHOSE BODY THIS ONE CANNOT SEE, which is what makes
     *"triyng to take the place where your disgies character stands"* a thing
     that can happen at all: an enemy that does not know you are there picks
     your ground like any other ground, and `walkTo` is where it finds out. */
  Object.keys(dist).forEach(k=>{const p=k.split(',');
    const o=at(+p[0],+p[1]);
    if(o&&o!==u&&!hiddenFrom(u,o))delete dist[k];});"""

OLD_WALK = """  u.col=c;u.row=r;
  walkMark(u,from,path.length?path:[[c,r]]);"""
NEW_WALK = """  /* ⛔ #275 - WALKING INTO SOMEBODY YOU COULD NOT SEE. The step is REFUSED and
     the body stops on the last hex it had actually crossed, because two bodies
     on one hex is the fault `tavernPlace` spends a paragraph refusing and this
     is the one door that could produce it. ⚠ If that hex is taken too, the
     mover simply does not move: it has spent its action walking into somebody,
     which is exactly what happened to it. */
  {const blk=at(c,r);
   if(blk&&blk!==u&&hiddenFrom(u,blk)){
     unhide(blk,u.name+' walks straight into something that is not ground.');
     path=path.slice(0,-1);
     const last=path.length?path[path.length-1]:from;
     const taken=at(last[0],last[1]);
     if(taken&&taken!==u){path=[];c=from[0];r=from[1];}
     else{c=last[0];r=last[1];}
   }}
  u.col=c;u.row=r;
  walkMark(u,from,path.length?path:[[c,r]]);"""

OLD_WALK2 = """  emberCross(u,path.length?path:[[c,r]]);
}"""
NEW_WALK2 = """  emberCross(u,path.length?path:[[c,r]]);
  spotAround(u);        /* #275 - and it looks at what it is now standing beside */
}"""

OLD_STRIKE = """  if(a.veil){a.veil=false;fx(a,'SEEN','#e07a28',true);}
  if(d.veil)d.veil=false;"""
NEW_STRIKE = """  if(a.veil){a.veil=false;fx(a,'SEEN','#e07a28',true);}
  if(d.veil)d.veil=false;
  /* #275 - and the cloak, at the same door and for the same reason. Both
     halves of the ask - *"after your atack or active damaging skill effect
     disapear"* - and the one nobody has to write down: a body that has been hit
     has been found. */
  if(hiddenLive(a))unhide(a,a.name+' comes out from under the rags to swing.');
  if(hiddenLive(d))unhide(d,null);"""

patch([(OLD_CUR, NEW_CUR), (OLD_CTL, NEW_CTL), (OLD_AIM, NEW_AIM),
       (OLD_RM, NEW_RM), (OLD_WALK, NEW_WALK), (OLD_WALK2, NEW_WALK2),
       (OLD_STRIKE, NEW_STRIKE)])
