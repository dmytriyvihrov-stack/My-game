(()=>{
  const out={};
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();render();
  const seg=()=>{const p=document.querySelector('#bZoc .zocline');
    return p?(p.getAttribute('d').match(/M/g)||[]).length:0;};
  out.segmentsAtRest=seg();
  out.heldHexes=(()=>{let n=0;for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)
    if(!at(c,r)&&controllers(c,r,'you').length)n++;return n;})();
  out.foes=B.units.filter(u=>u.side==='foe'&&!u.dead).length;
  const u=cur();
  out.reachHexes=B.reach?Object.keys(B.reach.dist).length:0;
  out.heldInsideReach=(()=>{let n=0;Object.keys(B.reach?B.reach.dist:{}).forEach(k=>{
    const p=k.split(',').map(Number);
    if(controllers(p[0],p[1],'you').length)n++;});return n;})();
  out.hasReach2=!!B.reach2;
  return out;
})()
