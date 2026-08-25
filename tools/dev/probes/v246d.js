(()=>{
  const out={};
  const seg=()=>{const p=document.querySelector('#bZoc .zocline');
    return p?(p.getAttribute('d').match(/M/g)||[]).length:0;};
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();render();
  let u=cur();
  /* ── walk this body up next to the enemy line, then measure the zone ── */
  const foe=B.units.filter(x=>x.side==='foe'&&!x.dead)
    .sort((a,b)=>udist(u,a)-udist(u,b))[0];
  const spot=nbrs(foe.col,foe.row).find(p=>!at(p[0],p[1])&&walkable(p[0],p[1]));
  u.col=spot[0];u.row=spot[1];faceToward(u,foe.col,foe.row);
  B.sel=null;B.reach=null;B.reach2=null;render();
  out.heldOnBoard=(()=>{let n=0;for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)
    if(!at(c,r)&&controllers(c,r,'you').length)n++;return n;})();
  out.segments_drawn=seg();
  out.reachHexes=B.reach?Object.keys(B.reach.dist).length:0;
  out.heldInsideReach=(()=>{let n=0;Object.keys(B.reach.dist).forEach(k=>{
    const p=k.split(',').map(Number);
    if(controllers(p[0],p[1],'you').length)n++;});return n;})();
  /* the fallback: an attack in hand draws the whole board again */
  const atk=u.acts.find(a=>a.dmg&&!a.move);
  if(atk){B.sel=atk;render();out.segments_withAttack=seg();}
  /* ── the real path for the two-action click ── */
  B.sel=null;B.reach=null;B.reach2=null;render();
  u=cur();
  const farK=Object.keys(B.reach2?B.reach2.dist:{}).filter(k=>B.reach.dist[k]===undefined)[0];
  if(farK){
    handOn(farK);
    out.pipsOnFar=[...document.querySelectorAll('#bAPnum .pip.pay')].length;
    const p=farK.split(',').map(Number),b=[u.col,u.row,u.actions,u.movesUsed||0];
    B.busy=false;clickHex(p[0],p[1]);
    out.twoActionWalk={from:[b[0],b[1]],to:[u.col,u.row],target:p,
      actions:b[2]+'->'+u.actions,movesUsed:b[3]+'->'+(u.movesUsed||0),
      landed:(u.col===p[0]&&u.row===p[1])};
    out.undoOffered=!!B.undo;
  }else out.twoActionWalk='no far hex';
  return out;
})()
