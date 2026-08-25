/* #244 ask 4a - the near and the far half of a stride, counted off the
   COMPUTED background (the browser normalises `rgba(a,b,c,.24)` to
   `rgba(a, b, c, 0.24)`, so a string compare against the table reads 0 and
   looks like nothing was painted). */
(() => {
  startBattle('brigand');
  const u=GT.playerTurn();
  const a=u.acts.find(x=>x.move);
  B.sel=a;B.reach=reachMap(u,moveBudget(u));
  B.reach2=(u.actions>(a.cost||1))?reachMap(u,moveBudget(u)+moveBudget2(u)):null;
  render();
  const g=document.getElementById('bGrid');
  const norm=s=>{const d=document.createElement('div');d.style.background=s;
    return d.style.background;};
  const want={near:[norm(REACH_WASH.dry),norm(REACH_WASH.wet)],
              far:[norm(REACH_WASH.dry2),norm(REACH_WASH.wet2)]};
  const paint=[...g.querySelectorAll('.hfill')].map(e=>e.style.background);
  const c=list=>paint.filter(x=>list.indexOf(x)>=0).length;
  /* and the far ones must not be clickable */
  const farKeys=B.reach2?Object.keys(B.reach2.dist).filter(k=>B.reach.dist[k]===undefined):[];
  const farLit=farKeys.filter(k=>{const h=g.querySelector('[data-k="'+k+'"]');
    return h&&h.classList.contains('lit');}).length;
  /* and a body with one action left gets no far half at all */
  const oneAct=(()=>{const was=u.actions;u.actions=1;
    B.reach2=(u.actions>(a.cost||1))?reachMap(u,moveBudget(u)+moveBudget2(u)):null;
    render();
    const n=[...g.querySelectorAll('.hfill')].map(e=>e.style.background)
      .filter(x=>want.far.indexOf(x)>=0).length;
    u.actions=was;return n;})();
  return {budget1:moveBudget(u),budget2:moveBudget2(u),
          nearHexes:Object.keys(B.reach.dist).length,
          farOnly:farKeys.length,
          paintedNear:c(want.near),paintedFar:c(want.far),
          farThatAreLit:farLit, farPaintedWithOneActionLeft:oneAct};
})()
