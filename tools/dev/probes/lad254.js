/* #254 - what the ladder did to the company, and what the arena says. */
(()=>{const K=['str','agi','int','mor'];
 const bodies=G.party.map(p=>{const u=unitFrom(p),s=effStats(p);
   return p.name+' ['+K.map(k=>k+(s[k]>0?'+':'')+s[k]).join(' ')+'] hp '+bodyHp(p)+
     ' hit '+u.mskill+' dodge '+u.dodgeBase+' nerve '+u.moraleMax+
     ' land '+D.arc({st:s})+' step '+u.speed+
     ' swing '+(sw=>sw?sw.lo+'-'+sw.hi:'-')(swingOf(u));});
 const rungs=K.map(k=>k+': '+[4,3,2,1,0,-1,-2,-3,-4].map(n=>{
   const h=rungHeld(k,n),c=(STATLADDER[k][String(n)]||{}).cap;
   return n+'{'+Object.keys(h).map(q=>q+':'+(+h[q].toFixed(3))).join(',')+(c?'|'+c:'')+'}';
 }).join(' '));
 const races=Object.keys(RACEHP).map(r=>r+' hp '+RACEHP[r]+' melee '+RACEMELEE[r]+
   ' attackerAdds '+RACEATK[r]);
 return {bodies:bodies,rungs:rungs,races:races,
   given:JSON.stringify(GIVEN),lint:LINT().findings};})()
