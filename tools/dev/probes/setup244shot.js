(() => new Promise(res=>{
  startBattle('brigand');
  const u=GT.playerTurn(); const f=GT.nearestFoe(u);
  GT.standNextTo(u,f);
  const a=u.acts.find(x=>x.move);
  B.sel=a;B.reach=reachMap(u,moveBudget(u));
  B.reach2=(u.actions>(a.cost||1))?reachMap(u,moveBudget(u)+moveBudget2(u)):null;
  B.units.filter(x=>x.side==='foe').forEach((x,i)=>{x.hp=Math.round(x.hpMax*[1,.5,.22,.08][i%4]);});
  camSet(1);render();
  setTimeout(()=>{render();setTimeout(()=>res({ok:1}),350);},350);
}))()
