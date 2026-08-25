/* #244 ask 7 - what the screen actually says when a working costs mood. */
(() => {
  startBattle('brigand');
  const u=B.units.find(x=>x.side==='you'&&x.caster)||GT.playerTurn();
  B.idx=B.order.indexOf(u);beginTurn();
  const a=(u.acts||[]).find(x=>x.strain);
  if(!a)return {noCaster:(u&&u.name)||'-',acts:(u.acts||[]).map(x=>x.n)};
  const before={morale:u.morale,max:u.moraleMax,rung:LADDER[ladderAt(u)].n,
                bar:($('bNerve')||{}).style?$('bNerve').style.width:'-'};
  const cost=strainCost(u,a);
  payStrain(u,a);
  render();
  const floats=[...document.querySelectorAll('#bFx .fx')].map(e=>e.textContent+' @'+e.style.top);
  return {who:u.name, act:a.n, cost:cost, before:before,
          after:{morale:u.morale,rung:LADDER[ladderAt(u)].n,
                 bar:$('bNerve').style.width, word:($('bStateN')||{}).textContent},
          floatsOnScreen:floats,
          cardSays:(()=>{const el=[...document.querySelectorAll('#bActions .act')]
            .find(e=>e.textContent.indexOf(a.n)>=0);
            return el?el.textContent.replace(/\s+/g,' ').trim():'-';})()};
})()
