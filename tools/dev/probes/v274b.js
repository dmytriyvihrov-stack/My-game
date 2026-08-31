/* #274 ask 11 - why the after-step figures did not fire */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  startBattle('brigand');
  const g=$('bGrid');
  const you=B.units.filter(x=>x.side==='you'&&!x.ally&&!x.pet&&!x.dead);
  const arch=you.find(u=>u.acts.some(a=>a.range&&a.dmg&&!a.arcane));
  B.idx=B.order.indexOf(arch);beginTurn();
  const u=cur();
  const foes=B.units.filter(x=>x.side==='foe'&&!x.dead);
  const ring=d=>{const s=[];for(let c=0;c<COLS;c++)for(let r=0;r<ROWS;r++)
    if(B.terr[K(c,r)]!==undefined&&!at(c,r)&&hdist([c,r],[u.col,u.row])===d)s.push([c,r]);return s;};
  foes.forEach((f,i)=>{const s=ring(7+i);f.col=s[0][0];f.row=s[0][1];});
  render();
  const o={who:u.name,actions:u.actions,sel:B.sel&&B.sel.k,
    main:(mainAtk(u)||{}).k+'/r'+((mainAtk(u)||{}).range),
    litN:g.querySelectorAll('.hex.lit').length,
    reach:B.reach?Object.keys(B.reach.dist).length:0,
    reach2:B.reach2?Object.keys(B.reach2.dist).length:0};
  /* the lit hex that is nearest the nearest foe */
  const f0=foes.slice().sort((a,b)=>udist(u,a)-udist(u,b))[0];
  o.foe=f0.name+' d='+udist(u,f0);
  const lits=[].slice.call(g.querySelectorAll('.hex.lit')).map(h=>h.dataset.k);
  const best=lits.filter(k=>moveCostAt(k)===1).map(k=>k.split(',').map(Number))
    .sort((a,b)=>hdist(a,[f0.col,f0.row])-hdist(b,[f0.col,f0.row]))[0];
  o.best=best&&K(best[0],best[1]);
  o.bestD=best&&hdist(best,[f0.col,f0.row]);
  o.moveCostAtBest=o.best?moveCostAt(o.best):null;
  handOn(o.best);
  o.landHex=landHex();
  o.handEl=!!g.querySelector('[data-k="'+landHex()+'"]');
  o.aiming=g.classList.contains('aiming');
  o.stepodds=g.classList.contains('stepodds');
  o.aodds=[].slice.call(g.querySelectorAll('.hodds.aodds')).map(e=>e.textContent);
  /* and the pieces of the gate, one by one, from that hex */
  const w=mainAtk(u),c0=u.col,r0=u.row,p=o.best.split(',').map(Number);
  u.col=p[0];u.row=p[1];
  o.fromThere=foes.map(t=>t.name+' d='+udist(u,t)+' mayAim='+mayAim(u,w,t)+
    ' hb='+(udist(u,t)<=w.range?hitBreakdown(u,t,w).total:'-'));
  u.col=c0;u.row=r0;
  o.gate={side:u.side,sel:!!(B.sel&&B.sel.move),w:!!(w&&w.range&&w.dmg),
    afford:(u.actions-moveCostAt(o.best))>=(w.cost||1),cost:w.cost};
  return o;
})()
