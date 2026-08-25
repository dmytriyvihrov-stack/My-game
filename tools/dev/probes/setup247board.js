(()=>{
  window.TUT_SILENT=true;
  if(typeof learnSkip==='function')learnSkip();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();
  if(typeof tutClose==='function')tutClose();
  const d=document.getElementById('tutDim');if(d)d.classList.remove('on');
  const cd=document.getElementById('tutCard');if(cd)cd.style.display='none';
  render();
  const u=cur();
  return {who:u.name,actions:u.actions,
    near:B.reach?Object.keys(B.reach.dist).length:0,
    far:B.reach2?Object.keys(B.reach2.dist).length:0};
})()
