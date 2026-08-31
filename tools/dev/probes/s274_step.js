G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
startBattle('brigand');
(()=>{const g=$('bGrid');
  const you=B.units.filter(x=>x.side==='you'&&!x.ally&&!x.pet&&!x.dead);
  const arch=you.find(u=>u.acts.some(a=>a.range&&a.dmg&&!a.arcane));
  /* clear the ground the shot has to cross, so nothing is a lane excuse */
  for(let c=3;c<=12;c++)for(let r=3;r<=9;r++)B.terr[K(c,r)]='field';
  paintTerrain();
  you.forEach((u,i)=>{if(u!==arch){u.col=1;u.row=1+i;}});
  arch.col=3;arch.row=6;
  const foes=B.units.filter(x=>x.side==='foe'&&!x.dead);
  foes.forEach((f,i)=>{f.col=20;f.row=i;});
  foes[0].col=9;foes[0].row=6;   /* six hexes off: out of a range-5 bow */
  foes[1].col=10;foes[1].row=7;
  B.idx=B.order.indexOf(arch);beginTurn();render();
  handOn(K(4,6));
  return 'd='+hdist([3,6],[9,6])+' fromStep='+hdist([4,6],[9,6])+
    ' stepodds='+g.classList.contains('stepodds')+
    ' n='+g.querySelectorAll('.hodds.aodds').length+
    ' live='+g.querySelectorAll('.hodds:not(.aodds)').length;})()
;(()=>{const h=$('bGrid').querySelector('[data-k="9,6"]');
  if(h){const r=h.getBoundingClientRect();window.__CLIP=[Math.round(r.left-260),
    Math.round(r.top-90),520,240];}
  return window.__CLIP;})()
