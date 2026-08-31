/* #274 ask 12 - the two-action stride hands over at once and the undo lives on */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  startBattle('brigand');
  const o={};
  /* run every later() at once, so one probe can see the hand-over */
  try{
    /* a body of yours whose NEXT in the order is also one of yours */
    let i=-1;
    for(let n=0;n<B.order.length-1;n++){
      const a=B.order[n],b=B.order[n+1];
      if(a.side==='you'&&!a.ally&&!a.pet&&b.side==='you'&&!b.ally&&!b.pet&&n>0){i=n;break;}
    }
    if(i<0)return {none:B.order.map(x=>x.side+'/'+x.name)};
    B.idx=i;beginTurn();
    const u=cur(),nxt=B.order[i+1];
    o.mover=u.name;o.next=nxt.name;
    o.before={col:u.col,row:u.row,actions:u.actions,round:B.round,
      mor:Math.round(nxt.morale),nxtActions:nxt.actions};
    /* a hex only the far half reaches */
    const far=Object.keys(B.reach2?B.reach2.dist:{}).filter(k=>
      (!B.reach||B.reach.dist[k]===undefined)&&!at.apply(null,k.split(',').map(Number)));
    o.farN=far.length;
    if(!far.length)return o;
    const p=far[0].split(',').map(Number);
    clickHex(p[0],p[1]);
    o.heldByAutoEnd={cur:cur().name,undoT:B.undoT};
    /* the real path is autoEnd's `later(nextTurn,140)`; a hand call makes the
       queued one stale (later() guards on B.seq, which beginTurn bumps) */
    nextTurn();
    o.afterMove={cur:cur().name,undo:!!B.undo,undoId:B.undo&&B.undo.id,
      moverAt:u.col+','+u.row,moverActions:u.actions,
      nxtActions:nxt.actions,nxtMor:Math.round(nxt.morale),round:B.round,idx:B.idx};
    render();
    o.buttonLive=$('bUndo').classList.contains('on');
    o.buttonDraining=$('bUndo').classList.contains('draining');
    /* take it back */
    undoMove();
    o.afterUndo={cur:cur().name,moverAt:u.col+','+u.row,moverActions:u.actions,
      undo:!!B.undo,round:B.round,idx:B.idx,
      nxtActions:nxt.actions,nxtMor:Math.round(nxt.morale),
      moverHeld:!!u.turnHeld,nxtHeld:!!nxt.turnHeld};
    /* and the interrupted body must not tick twice when it comes round */
    B.idx=i;                    /* the mover is up; end its turn by hand */
    nextTurn();
    o.handedOn={cur:cur().name,nxtMor:Math.round(nxt.morale),nxtActions:nxt.actions,
      nxtHeld:!!nxt.turnHeld};
  }finally{}
  return o;
})()
