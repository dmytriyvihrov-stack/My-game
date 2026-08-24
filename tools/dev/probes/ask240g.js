/* #240 - the spear round the corner of a Г, on a real board.
   The first cut of this probe placed the pair by hand and measured a STRAIGHT
   pair (one corner) while claiming to test a bent one. The pair is found by
   asking the grid instead: a bent pair is exactly one with TWO hexes adjacent
   to both ends. */
(() => {
  const _r = render, _f = fx, _s = say, _x = sfx, _p = paintTerrain;
  render = () => {}; fx = () => {}; sfx = () => {}; paintTerrain = () => {}; say = () => {};
  try {
    G.party.length = 0; ARENA.COMPS.prepared().forEach(p => G.party.push(p));
    startBattle('brigand');
    const u = B.units.find(x => x.side === 'you' && !x.ally);
    const d = B.units.find(x => x.side === 'foe');
    const spear = { k: 'jab', n: 'SPEAR', cost: 1, reach: 2, dmg: [10, 15], am: .6, ft: .3 };
    /* find a bent pair and a straight pair on open ground */
    const cornersOf = (A, D) => nbrs(A[0], A[1]).filter(p => hdist(p, D) === 1);
    let bent = null, straight = null;
    for (let c = 3; c < 10 && (!bent || !straight); c++)
      for (let r = 3; r < 9 && (!bent || !straight); r++)
        for (const D of [[c + 2, r], [c + 1, r + 2], [c, r + 2], [c - 1, r + 2]]) {
          if (hdist([c, r], D) !== 2) continue;
          if (BLOCKED[B.terr[K(c, r)]] || BLOCKED[B.terr[K(D[0], D[1])]]) continue;
          const co = cornersOf([c, r], D);
          if (co.some(p => BLOCKED[B.terr[K(p[0], p[1])]])) continue;
          if (co.length === 2 && !bent) bent = { a: [c, r], d: D, co: co };
          if (co.length === 1 && !straight) straight = { a: [c, r], d: D, co: co };
        }
    const test = (pair, blockIdx) => {
      const save = pair.co.map(p => B.terr[K(p[0], p[1])]);
      pair.co.forEach((p, i) => { B.terr[K(p[0], p[1])] = blockIdx.indexOf(i) >= 0 ? 'tree' : save[i]; });
      terrMoved();
      u.col = pair.a[0]; u.row = pair.a[1]; d.col = pair.d[0]; d.row = pair.d[1];
      const r = reachBlocked(u, d, spear);
      pair.co.forEach((p, i) => { B.terr[K(p[0], p[1])] = save[i]; });
      terrMoved();
      return r ? 'BLOCKED' : 'open';
    };
    return {
      bent: bent && { a: bent.a, d: bent.d, corners: bent.co.length,
        noTree: test(bent, []), oneCorner: test(bent, [0]),
        otherCorner: test(bent, [1]), bothCorners: test(bent, [0, 1]) },
      straight: straight && { a: straight.a, d: straight.d, corners: straight.co.length,
        noTree: test(straight, []), theCorner: test(straight, [0]) }
    };
  } catch (e) { return 'ERR ' + e.message + ' | ' + (e.stack || '').split('\n')[1]; }
  finally { render = _r; fx = _f; say = _s; sfx = _x; paintTerrain = _p; B = null; }
})()
