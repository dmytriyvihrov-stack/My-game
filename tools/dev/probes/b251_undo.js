/* #251 - the undo window, after. A body spends its last action on a step, the
   offer goes up with its bar, and then the player CLICKS THE BOARD: the turn
   must hand over at once instead of waiting the bar out. The second half checks
   that doing nothing still behaves exactly as it did. */
(() => {
  const nap = ms => new Promise(r => setTimeout(r, ms));
  const snap = t => { const b = document.getElementById('bUndo'), c = cur() || {};
    return { t: t, cur: c.name, side: c.side, undo: !!B.undo,
             on: b.classList.contains('on'), draining: b.classList.contains('draining'),
             idx: B.idx }; };
  const emptyOnAStep = () => {
    const u = GT.playerTurn();
    while (u.actions > 1) u.actions--;
    GT.moveInHand(u);
    const near = GT.$$('#bGrid .hex.lit:not(.lit2)').map(h => h.dataset.k)
      .filter(k => k !== K(u.col, u.row));
    const kk = near[0].split(',').map(Number);
    clickHex(kk[0], kk[1]);
    return u;
  };
  const o = {};
  startBattle('brigand');
  const u = emptyOnAStep();
  o.who = u.name; o.actionsLeft = u.actions; o.undoSet = !!B.undo;
  return nap(60).then(() => {
    o.open = snap(60);
    /* the click the board used to swallow */
    const spot = nbrs(u.col, u.row).find(p => !at(p[0], p[1]));
    clickHex(spot[0], spot[1]);
    o.afterClick = snap(61);
    o.handedOver = (cur() || {}).id !== u.id;
    o.moverIntact = { col: u.col, row: u.row, actions: u.actions };
    return nap(3400); })
  .then(() => {
    /* and the stale hold must not fire a SECOND handover */
    o.later = snap(3460);
    /* now the other half: do nothing, and the bar must still run it out */
    startBattle('brigand');
    const v = emptyOnAStep();
    o.who2 = v.name;
    return nap(60).then(() => { o.open2 = snap(60); return nap(900); })
      .then(() => { o.mid2 = snap(960); return nap(2700); })
      .then(() => { o.done2 = snap(3660); o.handed2 = (cur() || {}).id !== v.id; return o; });
  });
})()
