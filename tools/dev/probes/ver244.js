/* #244 - the battlefield asks, driven. */
(() => {
  const o={};
  startBattle('brigand');
  const u=GT.playerTurn(); const f=GT.nearestFoe(u);
  GT.standNextTo(u,f); GT.moveInHand(u);
  const g=document.getElementById('bGrid');

  /* ask 3 - the zone is the shared edge only */
  const zone=[...g.querySelectorAll('.hex')].filter(h=>{
    const p=h.dataset.k.split(',').map(Number);return heldAt(p[0],p[1],'you')>0;}).length;
  const svg=document.getElementById('bZoc');
  o.a3={zoneHexes:zone, svg:!!svg,
        segments: svg?(svg.querySelector('path').getAttribute('d').match(/M/g)||[]).length:0,
        stroke: svg?getComputedStyle(svg.querySelector('path')).stroke:'-'};

  /* ask 16 - no back arc anywhere */
  o.a16={backers:document.querySelectorAll('.backer').length,
         backRingReturns:backRing(f)};

  /* ask 4a - the near and far washes */
  o.a4a=(()=>{
    /* B.reach/B.reach2 came from GT.moveInHand, which does not set reach2 */
    const a=u.acts.find(x=>x.move);
    B.sel=a;B.reach=reachMap(u,moveBudget(u));
    B.reach2=(u.actions>(a.cost||1))?reachMap(u,moveBudget(u)+moveBudget2(u)):null;
    render();
    const near=Object.keys(B.reach.dist).length, far=B.reach2?Object.keys(B.reach2.dist).length:0;
    const washed=[...g.querySelectorAll('.hfill')].map(e=>e.style.background);
    const cnt=v=>washed.filter(x=>x===v).length;
    return {budget1:moveBudget(u), budget2:moveBudget2(u), nearHexes:near, farHexes:far,
            paintedNear:cnt(REACH_WASH.dry)+cnt(REACH_WASH.wet),
            paintedFar:cnt(REACH_WASH.dry2)+cnt(REACH_WASH.wet2),
            litHexes:g.querySelectorAll('.hex.lit').length};})();

  /* ask 4b - the pips a picked card would take */
  o.a4b=(()=>{const out=[];
    const two=u.acts.find(a=>(a.cost||1)>1)||u.acts.find(a=>!a.move);
    [null,two].forEach(a=>{B.sel=a;render();
      out.push({card:a?a.n+' cost '+(a.cost||1):'nothing picked',
                pips:[...document.querySelectorAll('#bAPnum .pip')].map(p=>p.className).join(' | '),
                anim:(()=>{const p=document.querySelector('#bAPnum .pip.pay');
                  return p?getComputedStyle(p).animationName+' '+getComputedStyle(p).animationDuration:'-';})()});});
    B.sel=null;render();return out;})();

  /* ask 6 - blood */
  o.a6=(()=>{
    const tiers=[0,.2,.5,.9].map(loss=>{f.hp=Math.round(f.hpMax*(1-loss));return woundTier(f);});
    f.hp=Math.round(f.hpMax*0.2);render();
    return {tiersForLoss:tiers, tierNow:woundTier(f),
            pending:Object.keys(SPRHURT).length,
            keys:Object.keys(SPRHURT)};})();

  /* ask 5 - the dog's pack bonus through a REAL bite-and-run */
  o.a5=(()=>{
    startBattle('pack');
    const bitch=B.units.find(x=>x.name==='The Bitch');
    const dog=B.units.find(x=>x.kind==='dog'&&x!==bitch&&!x.dead);
    const you=B.units.find(x=>x.side==='you'&&!x.dead);
    const n=nbrs(you.col,you.row).find(p=>!at(p[0],p[1]));
    dog.col=n[0];dog.row=n[1];
    const nb=nbrs(dog.col,dog.row).find(p=>!at(p[0],p[1])); bitch.col=nb[0];bitch.row=nb[1];
    const before={d:udist(dog,bitch),hit:auraSum(dog,'hit'),dodge:auraSum(dog,'dodge')};
    const snap=dog.acts.find(a=>a.bounce);
    B.idx=B.order.indexOf(dog);
    try{strike(dog,you,snap);}catch(e){return {threw:e.message,before:before};}
    return {before:before, after:{d:udist(dog,bitch),hit:auraSum(dog,'hit'),
            dodge:auraSum(dog,'dodge'),at:[dog.col,dog.row]},
            bounce:snap.bounce, radius:bitch.aura.r};})();

  /* ask 9 - the crossbow */
  o.a9={hands:GEAR.crossbow.hands, range:GEAR.crossbow.range};
  return o;
})()
