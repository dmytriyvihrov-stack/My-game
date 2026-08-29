/* #266 - #265's own measured sentence, re-taken. That entry recorded "your six
   average a 101.7 pool against the road's 63.6, which is -37.5%; at 1.25 the
   road reads 79.4, which is -21.9%" - measured with GIVEN.nerve at 90. This
   entry moved it to 100, so the sentence is a claim about a build that no
   longer exists unless it is re-measured. Both sides BUILT, the way that entry
   took it. */
(()=>{
  const mean=a=>a.length?+(a.reduce((s,x)=>s+x,0)/a.length).toFixed(1):0;
  /* your side, built: the prepared six the arena prices everything against */
  const keep=G.party.slice();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  const you=mean(G.party.map(p=>unitFrom(p).moraleMax));
  G.party.length=0;keep.forEach(p=>G.party.push(p));
  const four=mean(G.party.map(p=>unitFrom(p).moraleMax));
  /* the road's side, built through the one dispatch table */
  const ROAD=['tavern','chase','clash','brigand','pack','slingline','mirehares',
              'wedding','circle','steading','armour','hold','mother','snare'];
  /* ⚠ THE POPULATION IS THE ONE `.claude/rules/enemy-stats.md` ALREADY USES -
     the ORDINARY templates, no captain, no champion, no boss. An unfiltered
     sweep puts the Fen-Mother's 300 and the Warden's 460 into a mean of ~50s
     and reads 84 instead of 79.4, i.e. it silently measures a different
     population from the sentence it is checking. */
  const BOSS={wyrm:1,cub:1,warden:1};
  const pools=[];
  ROAD.forEach(k=>{try{(FOE_BUILD[k]()||[]).forEach(u=>{
    if(u&&u.moraleMax&&!u.captain&&!u.champ&&!BOSS[u.kind])pools.push(u.moraleMax);});
    }catch(e){}});
  const foe=mean(pools);
  const pct=(a,b)=>((b-a)/a*100).toFixed(1)+'%';
  return {yourSix:you, yourFour:four, roadBodies:pools.length, roadMean:foe,
    gapVsSix:pct(you,foe), gapVsFour:pct(four,foe),
    foeNerve:(typeof FOE_NERVE!=='undefined')?FOE_NERVE:'-',
    given:GIVEN.nerve};})()
