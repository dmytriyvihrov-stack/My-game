/* #240 - the ogre throws one of yours AT somebody, driven end to end;
   and the hover card measured again with a deliberately TALL card. */
(() => {
  const out = {};

  /* ── ask 7: the throw ───────────────────────────────────────────────── */
  G.party.length = 0; ARENA.COMPS.prepared().forEach(p => G.party.push(p));
  startBattle('clash');
  render();
  /* find an ogre of ours, or make one */
  let ogre = B.units.find(x => x.side === 'you' && x.acts.some(a => a.thrower));
  if (!ogre) { out.throwErr = 'no thrower in the prepared comp'; }
  else {
    const act = ogre.acts.find(a => a.thrower);
    const mate = B.units.find(x => x.side === 'you' && x !== ogre && !x.pet && sizeOf(x) <= (act.maxSize || 1));
    const foe = B.units.find(x => x.side === 'foe' && !x.dead);
    /* stand them all where the throw is legal */
    GT.playerTurn(ogre.id);
    GT.standNextTo(mate, ogre);
    /* the throw is range 4: stand the target inside it, on a hex that has a
       free neighbour to come down on */
    (() => { const spots = [];
      for (let rr = 0; rr < ROWS; rr++) for (let cc = 0; cc < COLS; cc++) {
        if (BLOCKED[B.terr[K(cc, rr)]] || at(cc, rr)) continue;
        if (hdist([ogre.col, ogre.row], [cc, rr]) !== 3) continue;
        if (!nbrs(cc, rr).some(q => !at(q[0], q[1]) && !BLOCKED[B.terr[K(q[0], q[1])]])) continue;
        spots.push([cc, rr]); }
      if (spots.length) { foe.col = spots[0][0]; foe.row = spots[0][1]; render(); } })();
    const before = { foeHp: foe.hp, foeArm: foe.armour, mateHp: mate.hp,
      mateAt: [mate.col, mate.row], dist: udist(mate, foe), ogreActs: ogre.actions };
    const spot = throwSpotBy(ogre, foe);
    const ok = throwAimOK(ogre, mate, foe);
    /* the two clicks, through the real path */
    B.sel = act; B.hurl = null; B.hurlRock = null;
    B.hurlFrom = liftable(ogre, act); B.hurlRocks = liftableRocks(ogre);
    clickHex(mate.col, mate.row);
    const offered = B.reach && B.reach.dist[K(foe.col, foe.row)] !== undefined;
    clickHex(foe.col, foe.row);
    out.throw = { before: before, aimOK: ok, landingHex: spot, offeredEnemyHex: offered,
      after: { foeHp: foe.hp, foeArm: foe.armour, mateHp: mate.hp,
        mateAt: [mate.col, mate.row], distToFoe: udist(mate, foe),
        mateKeepsTurn: mate.actions, ogreActs: ogre.actions },
      log: G.log.slice(-4) };
  }

  /* ── ask 10: the card, with as many rows as a body can carry ─────────── */
  startBattle('snare');
  render();
  GT.playerTurn();
  render();
  const f = document.getElementById('bField'), rd = document.getElementById('bRead');
  const acts = document.getElementById('bActions');
  const R = e => { const r = e.getBoundingClientRect();
    return { h: +r.height.toFixed(1), t: +r.top.toFixed(1), b: +r.bottom.toFixed(1),
             l: +r.left.toFixed(1), r: +r.right.toFixed(1) }; };
  const worst = [];
  B.units.filter(x => x.side === 'foe' && !x.dead).forEach(t => {
    /* pile every status this file can put on a body, so the card is as tall
       as it will ever be */
    t.burning = 2; t.crippled = 2; t.rooted = 2; t.injured = true;
    t.hurtName = 'A torn shoulder'; t.hurtNote = 'It hurts to lift the arm.';
    t.venom = [{ until: 99 }, { until: 99 }];
    const hx = GT.hexOf(t); if (!hx) return;
    readout(t, { currentTarget: hx });
    const rr = R(rd), ar = R(acts);
    worst.push({ n: t.name, h: rr.h, top: rr.t, bot: rr.b, left: rr.l,
      overlapsActs: rr.b > ar.t + 0.5 && rr.r > ar.l && rr.l < ar.r,
      clearOfActs: +(ar.t - rr.b).toFixed(1) });
  });
  out.cardTallest = Math.max.apply(null, worst.map(c => c.h));
  out.cardOverlaps = worst.filter(c => c.overlapsActs).length;
  out.cards = worst;
  out.actsBox = R(acts);
  return out;
})()
