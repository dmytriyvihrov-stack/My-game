/* #274 ask 10 - the states where the automatic ranged odds could go away */
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
  foes[0].col=ring(3)[0][0];foes[0].row=ring(3)[0][1];
  const rd=()=>GT.shown('#bGrid .hodds').map(e=>e.textContent);
  const o={who:u.name};
  render();o.clean=rd();
  /* engaged: somebody in contact */
  const n=nbrs(u.col,u.row).find(p=>!at(p[0],p[1]));
  foes[1].col=n[0];foes[1].row=n[1];
  render();o.engaged={odds:rd(),offAisRanged:true,engaged:engaged(u)};
  foes[1].col=ring(6)[0][0];foes[1].row=ring(6)[0][1];
  /* one action spent */
  u.actions=1;render();o.oneAction=rd();
  /* the shot already taken twice */
  u.actions=2;u.used['main']=2;render();o.usedTwice=rd();
  u.used['main']=0;
  /* an act picked that is NOT the bow */
  const kick=u.acts.find(a=>a.k==='kick');
  if(kick){B.sel=kick;render();o.kickPicked=rd();}
  B.sel=u.acts.find(a=>a.move);render();
  o.back=rd();
  return o;
})()
