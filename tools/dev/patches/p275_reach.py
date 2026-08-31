# -*- coding: utf-8 -*-
# #275 - the hidden hex has to be REACHABLE as well as un-deleted.
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from safeedit import patch

OLD = """    for(const p of nbrs(c,r)){
      if(!passable(p[0],p[1],u))continue;
      const nd=d+mcost(p[0],p[1],u);if(nd>budget)continue;
      if(nd<(dist[K(p[0],p[1])]??1e9)){dist[K(p[0],p[1])]=nd;prev[K(p[0],p[1])]=[c,r];
        pq.push([nd,p[0],p[1]]);}}}"""
NEW = """    for(const p of nbrs(c,r)){
      /* ⛔ #275 - A HEX WITH SOMEBODY UNDER A CLOAK ON IT IS GROUND, TO ANYBODY
         WHO CANNOT SEE THEM. `passable` refuses an enemy body outright, so the
         delete pass at the foot of this function was never reached for one:
         the hex had no `dist` to keep. It is entered here and NOT expanded
         from, which is the whole of the difference between *I will walk onto
         that ground* and *I will walk through a man* - so a route never runs
         past the cloak, it only ever ends on it, and `walkTo` is where the
         mover finds out what it has walked into. */
      const o275=at(p[0],p[1]),hid275=!!(o275&&o275!==u&&hiddenFrom(u,o275));
      if(!hid275&&!passable(p[0],p[1],u))continue;
      const nd=d+mcost(p[0],p[1],u);if(nd>budget)continue;
      if(nd<(dist[K(p[0],p[1])]??1e9)){dist[K(p[0],p[1])]=nd;prev[K(p[0],p[1])]=[c,r];
        if(!hid275)pq.push([nd,p[0],p[1]]);}}}"""

patch([(OLD, NEW)])
