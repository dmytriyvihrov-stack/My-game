/* every body's threat price, the comps and the fights, on one build.
   Run on the baseline and on the new build and diff. */
(()=>{
  const foes=[];
  Object.keys(FOE_BUILD).forEach(k=>{
    (k==='clash'?devFoeRun(k,'ratkin').concat(devFoeRun(k,'ogre')):devFoeRun(k))
      .forEach(u=>{const p=seededly(()=>unitPts(u));
        const key=u.name+'#'+u.variant+(u.champ?'*':'');
        if(!foes.some(f=>f.k===key))foes.push({k:key,p:p});});
  });
  const comps={};Object.keys(ARENA.COMPS).forEach(k=>{
    try{comps[k]=compPts(ARENA.COMPS[k]());}catch(e){comps[k]=null;}});
  const fights={};Object.keys(FOE_BUILD).forEach(k=>{
    try{fights[k]=fightNet(k,6);}catch(e){fights[k]=null;}});
  return {foes:foes.sort((a,b)=>a.k<b.k?-1:1),comps:comps,fights:fights,scale:PTS_SCALE};
})()
