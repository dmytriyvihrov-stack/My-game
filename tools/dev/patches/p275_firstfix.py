# -*- coding: utf-8 -*-
# #275 - `a.hits` is personality-gated. The first-swing test needs its own flag.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

OLD = """  const firstBlow=TUT_FIRST_SURE&&B&&B.tut&&a.side==='you'&&!a.ally&&!a.pet&&
    !!act.dmg&&!(a.hits||0)&&!(a.misses||0);"""
NEW = """  /* ⚠ `a.swung` AND NOT `a.hits`, WHICH COST A DRIVEN PROBE TO FIND. `a.hits`
     is incremented inside `if(tr(a,'hitLift'))` and `a.misses` inside the
     ogre's rage clause, so on an ordinary Captain BOTH stay 0 for the whole
     fight - and the first cut of this read them, which would have made every
     landing swing in the brawl a guaranteed 100%. A counter that exists for
     one personality is not a counter, and the two names look identical to a
     third one. `strike` sets `swung` at the top, on a hit and on a miss alike. */
  const firstBlow=TUT_FIRST_SURE&&B&&B.tut&&a.side==='you'&&!a.ally&&!a.pet&&
    !!act.dmg&&!a.swung;"""

OLD_S = """  if(hiddenLive(a))unhide(a,a.name+' comes out from under the rags to swing.');
  if(hiddenLive(d))unhide(d,null);"""
NEW_S = """  if(hiddenLive(a))unhide(a,a.name+' comes out from under the rags to swing.');
  if(hiddenLive(d))unhide(d,null);
  /* #275 - this body has now swung at something, whatever comes of it. Read by
     the brawl's one free blow and by nothing else. */
  a.swung=true;"""

patch([(OLD, NEW), (OLD_S, NEW_S)])
