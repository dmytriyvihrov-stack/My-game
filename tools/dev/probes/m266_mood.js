/* #266 - the mood ladder, the pool, and where a fight opens */
(()=>{
  const out={};
  out.lint=(LINT().findings||[]).length;
  out.ladder=LADDER.map(l=>l.n+' '+Math.round(l.at*100)+'%');
  out.rungs=NERVE_RUNGS.map(r=>r[0]+' '+Math.round(r[1]*100)+'%');
  out.flags=FLAG_BY_RUNG.map((k,i)=>i+':'+(k||'-')).join(' ');
  out.shown=Object.keys(FLAG_SHOWN).join(',');
  out.start={foe:START_NERVE,you:START_NERVE_YOU,given:GIVEN.nerve};
  out.ticks=NRV_TICKS;
  out.cssVar=getComputedStyle(document.documentElement).getPropertyValue('--nrvticks').trim().slice(0,60);
  /* every body in the shipped company, as it walks on, at each company mood */
  const moods=[-60,-25,0,25,60];
  out.opens=moods.map(m=>{
    const keep=G.morale;G.morale=m;
    const r=G.party.map(p=>{const u=unitFrom(p);
      return p.name+' '+Math.round(u.morale0)+'/'+u.moraleMax+' '+LADDER[ladderAt({morale:u.morale0,moraleMax:u.moraleMax})].n+' ('+u.state+')';});
    G.morale=keep;return moodState(m).n+': '+r.join(' | ');});
  /* the four founders' pools, which is ask 4 */
  out.pools=G.party.map(p=>p.name+' '+unitFrom(p).moraleMax);
  return out;})()
