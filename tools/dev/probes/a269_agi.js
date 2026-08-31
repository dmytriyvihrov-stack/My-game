/* #269 ask 14 - what the AGILITY ladder SAYS against what a built body PAYS,
   and ask 20's current surrounded price, and ask 15's pack aura by distance. */
(function(){
  const out={};
  /* --- 14. the ladder's own claim, rung by rung --- */
  out.ladderSays=[-4,-3,-2,-1,0,1,2,3,4].map(n=>{
    const h=rungHeld('agi',n);
    return n+': hit '+(h.hit||0)+' dodge '+(h.dodge||0);});
  /* --- and what a REAL body reads, built through unitFrom at each rung --- */
  const p=G.party&&G.party[0];
  if(p){
    const keep=p.st.agi;
    out.bodyPays=[-4,-2,0,2,4].map(n=>{
      p.st.agi=n;const u=unitFrom(p);
      return n+': mskill '+u.mskill+' dodgeBase '+u.dodgeBase+
             ' softDodge('+u.dodgeBase+')='+(+softDodge(u.dodgeBase).toFixed(1));});
    p.st.agi=keep;
  }
  out.GIVEN={hit:GIVEN.hit,dodge:GIVEN.dodge,opening:GIVEN.opening};
  out.softDodge={DODGE_SOFT:DODGE_SOFT,DODGE_RATE:DODGE_RATE};
  /* --- 20. what one extra body on a target is worth right now --- */
  out.flankPow=(G.party||[]).map(q=>q.name+' '+unitFrom(q).flankPow);
  /* --- 15. the pack, by distance --- */
  startBattle('pack');
  const bitch=B.units.filter(u=>u.aura)[0];
  out.pack=B.units.filter(u=>u.side==='foe'&&!u.dead).map(u=>{
    const on=aurasOn(u).map(a=>a.n).join('+');
    return u.name+' d='+(bitch?udist(u,bitch):'-')+' aura=['+on+'] hit+'+auraSum(u,'hit')+
           ' dodge+'+auraSum(u,'dodge');});
  out.auraR=bitch?bitch.aura.r:null;
  return out;
})()
