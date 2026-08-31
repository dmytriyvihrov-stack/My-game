/* #274 - the two numbers this batch has to state a trade on */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  const out={jackPrice:gearPrice('jack'),jackTier:GEAR.jack.rarity,
    jackScrap:JSON.stringify(scrapPay('jack')),segArm:SEG_ARM,segHp:SEG_HP};
  const w=GT.eachBody(p=>{const s=GT.slack('iChar');
    return s.slack+(s.scroll?' SCROLL'+s.scroll:'')+(s.overlap.length?' OVER':'');});
  out.worst=w.map(x=>x.id+'/'+x.state+':'+x.m)
    .sort((a,b)=>parseFloat(a.split(':')[1])-parseFloat(b.split(':')[1])).slice(0,3);
  out.scrolls=w.filter(x=>/SCROLL|OVER/.test(String(x.m))).length;
  out.clip=GT.clip().length;out.floor=GT.floor().length;
  return out;})()
