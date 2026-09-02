(() => {
  const P = makeParty();
  const out = {party:P.map(p=>({id:p.id,cls:p.cls,lvl:p.level,perks:(p.perks||[]).slice(),
      sp:p.statPoints||0,pp:p.perkPoints||0,fp:p.freePicks||0,st:p.st,eq:p.eq}))};
  // level a copy to 4 and see what it holds
  const Q = makeParty(); Q.forEach(p=>simLevelTo(p,4));
  out.at4 = Q.map(p=>({id:p.id,cls:p.cls,lvl:p.level,perks:(p.perks||[]).slice(),
      sp:p.statPoints||0,pp:p.perkPoints||0,fp:p.freePicks||0,st:p.st,
      lane4:clsLaneAt(p,4), laneOpen:clsLaneOpen(p)}));
  out.fights = (typeof FIGHTS!=='undefined')?Object.keys(FIGHTS):null;
  out.foeT = (typeof FOE_BUILD!=='undefined')?Object.keys(FOE_BUILD).slice(0,40):null;
  return out;
})()
