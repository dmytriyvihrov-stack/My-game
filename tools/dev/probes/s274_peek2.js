/* setup: ONE enemy alone in the open, hovered - the two red bands, nothing else */
G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
startBattle('warmstones');
(()=>{
  const foes=B.units.filter(x=>x.side==='foe'&&!x.dead);
  const f=foes[0];
  f.col=7;f.row=6;
  foes.slice(1).forEach((x,i)=>{x.col=14;x.row=i;});
  B.units.filter(x=>x.side==='you').forEach((u,i)=>{u.col=0;u.row=i;});
  B.idx=B.order.findIndex(x=>x.side==='you');beginTurn();render();
  peekOn(f);
  return 'ok';})()
