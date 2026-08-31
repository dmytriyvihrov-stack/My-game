/* #275 - the cloak, driven rather than read. Every one of the four exits. */
(() => {
  const o = {};
  const arm = () => {
    startBattle('brigand');
    GT.playerTurn();
    const u = cur();
    u.hideUntil = 0;
    return u;
  };
  const foeFar = u => alive().filter(x => x.side === 'foe')
    .sort((a, b) => udist(b, u) - udist(a, u))[0];

  /* 1. the card exists off the GEAR row alone */
  {
    const p = G.party[0], keep = p.eq.bag;
    p.eq.bag = 'cloak';
    const u = unitFrom(p);
    const a = u.acts.find(x => x.k === 'baguse');
    o.card = a ? { n: a.n, cost: a.cost, hide: a.hide, self: !!a.self, note: (a.note || '').slice(0, 60) } : null;
    p.eq.bag = keep;
  }

  /* 2. hidden: nobody may aim, from anywhere, unless clever and adjacent */
  {
    const u = arm(), f = foeFar(u), atk = f.acts.find(x => x.dmg);
    u.hideUntil = B.round + 2;
    o.far = { dist: udist(f, u), int: statRung(f, 'int'), mayAim: mayAim(f, atk, u) };
    /* stand it next to the hidden body and ask again, both ways round the rung */
    GT.standNextTo(f, u);
    f.st = Object.assign({}, f.st, { int: 3 });
    o.nearSmart = { dist: udist(f, u), int: statRung(f, 'int'), mayAim: mayAim(f, atk, u) };
    f.st = Object.assign({}, f.st, { int: -1 });
    u.hideUntil = B.round + 2;
    o.nearDim = { dist: udist(f, u), int: statRung(f, 'int'), mayAim: mayAim(f, atk, u) };
    /* and the zone of control it does not hold */
    o.zoc = { holdsIt: controllers(f.col, f.row, f.side).indexOf(u) >= 0,
              engagesIt: engagers(f.col, f.row, f.side).indexOf(u) >= 0,
              seenNow: hiddenLive(u) };
  }

  /* 3. it comes off when a clever body walks up */
  {
    const u = arm();
    u.hideUntil = B.round + 2;
    const f = foeFar(u);
    f.st = Object.assign({}, f.st, { int: 3 });
    spotAround(f);
    o.spotFar = hiddenLive(u);                 /* still hidden, it is far away */
    GT.standNextTo(f, u); spotAround(f);
    o.spotNear = hiddenLive(u);                /* gone */
  }

  /* 4. it comes off when this body swings */
  {
    const u = arm(); u.hideUntil = B.round + 2;
    const f = GT.nearestFoe(u); GT.standNextTo(u, f);
    strike(u, f, u.acts.find(x => x.dmg));
    o.onSwing = hiddenLive(u);
  }

  /* 5. it comes off when something walks into the ground it is on */
  {
    const u = arm(); u.hideUntil = B.round + 2;
    const f = foeFar(u);
    f.st = Object.assign({}, f.st, { int: -1 });     /* it cannot see them */
    const dest = [u.col, u.row], before = [f.col, f.row];
    const rm = reachMap(f, 99);
    o.bumpOffered = rm.dist[K(dest[0], dest[1])] !== undefined;   /* the hex is a destination */
    walkTo(f, dest[0], dest[1], rm);
    o.bump = { hidden: hiddenLive(u), foeMoved: f.col !== before[0] || f.row !== before[1],
               onTop: f.col === u.col && f.row === u.row,
               twoOnAHex: B.units.filter(x => !x.dead && !x.fled)
                 .filter(x => x.col === u.col && x.row === u.row).length };
  }

  /* 6. and it lapses */
  {
    const u = arm(); u.hideUntil = B.round + 2;
    o.lapse = [0, 1, 2, 3].map(n => { B.round = u.hideUntil - 2 + n; return hiddenLive(u); });
  }
  return o;
})()
