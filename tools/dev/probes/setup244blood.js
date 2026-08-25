/* four of the same body, at the four wound tiers, side by side on the board */
(() => new Promise(res=>{
  startBattle('brigand');
  const mine=B.units.filter(x=>x.side==='you'&&!x.dead).slice(0,4);
  const row=6;
  mine.forEach((u,i)=>{u.col=3+i*2;u.row=row;u.hp=Math.round(u.hpMax*[1,.5,.25,.08][i]);});
  B.units.filter(x=>mine.indexOf(x)<0).forEach(x=>{x.dead=true;});
  B.sel=null;camSet(2);render();
  setTimeout(()=>{render();setTimeout(()=>{
    const hx=GT.hexOf(mine[0]),h2=GT.hexOf(mine[3]);
    const a=hx.getBoundingClientRect(),b=h2.getBoundingClientRect();
    res({clip:[Math.round(a.left-30),Math.round(a.top-40),
               Math.round(b.right-a.left+60),Math.round(a.height+70)],
         tiers:mine.map(u=>u.name+' '+Math.round(100*u.hp/u.hpMax)+'% t'+woundTier(u))});},400);},400);
}))()
