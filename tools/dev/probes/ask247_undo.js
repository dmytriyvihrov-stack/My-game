/* ask 2, driven: a stride that empties the body must leave the offer up and
   the turn where it was, and taking it must put everything back. */
(()=>{
  const out={};
  window.TUT_SILENT=true;if(typeof learnSkip==='function')learnSkip();
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();if(typeof tutClose==='function')tutClose();render();
  const u=cur();
  const from={c:u.col,r:u.row,a:u.actions,mu:u.movesUsed||0};
  out.before=from;
  /* a hex only the second action can reach, with nobody engaged (a clean step) */
  const far=Object.keys(B.reach2.dist).filter(k=>B.reach.dist[k]===undefined);
  const k=far[Math.floor(far.length/2)],p=k.split(',').map(Number);
  out.target=k;
  clickHex(p[0],p[1]);
  out.after={c:u.col,r:u.row,a:u.actions,mu:u.movesUsed||0,
    landed:(u.col===p[0]&&u.row===p[1])};
  out.stillMyTurn=(cur()===u);
  out.undoOffered=document.getElementById('bUndo').classList.contains('on');
  out.undoLive=!!B.undo;
  undoMove();
  out.back={c:u.col,r:u.row,a:u.actions,mu:u.movesUsed||0,
    home:(u.col===from.c&&u.row===from.r&&u.actions===from.a)};
  out.offerGone=!document.getElementById('bUndo').classList.contains('on');
  return out;
})()
