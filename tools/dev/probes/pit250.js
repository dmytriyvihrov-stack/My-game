/* #250 - THE PIT, driven rather than read.

     python tools/dev/gt.py eval pit250.js

   Every rule the hole carries, on a live board: the budget, the rim in both
   directions and for both kinds of act, the fall a shove buys, the turn a
   climb costs, the hex note and the badge. Plus the generation in situ on a
   real rocky board, because the 40-board sample in the entry is the generator
   alone and says nothing about `B.hasPits`. */
(() => {
  const out = {};

  /* ── 1. the rules, on a hand-dug hole ─────────────────────────────── */
  startBattle('brigand');
  /* a body whose MAIN act is hands-on. The archer's is a bow, and testing the
     rim with a bow proves the opposite of what it looks like it proves - which
     cost this probe one wrong reading. */
  const u = (() => { for (const p of G.party) { const v = GT.playerTurn(p.id);
      if (v && handsOn(mainAtk(v))) return v; } return GT.playerTurn(); })();
  const f = GT.nearestFoe(u);
  GT.standNextTo(u, f);
  const kick = u.acts.find(a => a.push) || null;
  const main = mainAtk(u);
  const shot = u.acts.find(a => a.range && !a.arcane && a.dmg) || null;

  /* dig it where the kick would put him, so the shove is a real shove */
  const dest = forceDest(u, f, (kick && kick.push) || 1, kick && kick.slip);
  const pk = K(dest.to[0], dest.to[1]);
  B.terr[pk] = 'pit';
  B.hasPits = Object.keys(B.terr).some(k => B.terr[k] === 'pit');
  terrMoved();
  out.dug = { at: pk, stepped: dest.stepped, hasPits: B.hasPits };

  /* the budget, before and in */
  const wasBudget = moveBudget(u);
  const keep = [u.col, u.row];
  u.col = dest.to[0]; u.row = dest.to[1];
  out.budget = { onField: wasBudget, inPit: moveBudget(u), inPitReports: inPit(u) };

  /* the rim, both directions, all four kinds of act */
  const cast = { k: 'x', arcane: 1, dmg: 4, range: 3, reach: 1 };
  const spear = { k: 'y', dmg: 6, reach: 2 };
  const bothIn = (() => { const k2 = [f.col, f.row]; f.col = u.col; f.row = u.row;
    /* two bodies cannot share a hex, so put the foe on a second pit hex */
    const n = nbrs(u.col, u.row).find(p => !at(p[0], p[1]));
    B.terr[K(n[0], n[1])] = 'pit'; f.col = n[0]; f.row = n[1];
    const r = { melee: mayAim(u, main, f), spear: mayAim(u, spear, f) };
    delete B.terr[K(n[0], n[1])]; B.terr[K(n[0], n[1])] = 'field';
    f.col = k2[0]; f.row = k2[1]; return r; })();

  out.actUnderTest = { who: u.name, cls: u.cls, main: mainAtk(u).n,
                       handsOn: handsOn(mainAtk(u)) };
  out.rim = {
    meleeIntoPit:  mayAim(f, main, u),        /* he is on the field, u is down */
    meleeOutOfPit: mayAim(u, main, f),
    spearIntoPit:  mayAim(f, spear, u),
    shotIntoPit:   shot ? mayAim(f, shot, u) : 'no shooter',
    shotOutOfPit:  shot ? mayAim(u, shot, f) : 'no shooter',
    castIntoPit:   mayAim(f, cast, u),
    castOutOfPit:  mayAim(u, cast, f),
    bothInOnePit:  bothIn,
    bothOnField:   (() => { u.col = keep[0]; u.row = keep[1];
      return { melee: mayAim(u, main, f), cast: mayAim(u, cast, f) }; })()
  };

  /* the offer the board makes, which has to agree with mayAim */
  u.col = dest.to[0]; u.row = dest.to[1];
  out.offer = { litIntoPit: offerAtk(f, main, u), litOutOfPit: offerAtk(u, main, f) };
  u.col = keep[0]; u.row = keep[1];

  /* the note and the badge */
  out.note = groundNote(dest.to[0], dest.to[1], u);
  u.col = dest.to[0]; u.row = dest.to[1];
  out.badge = Object.keys(STATUS).filter(k => {
    const s = STATUS[k];
    try { return s.on ? !!s.on(u) : !!u[k]; } catch (e) { return false; } });
  u.col = keep[0]; u.row = keep[1];

  /* ── 2. the fall a shove buys ─────────────────────────────────────── */
  if (kick) {
    const hp0 = f.hp, arm0 = f.armour;
    GT.playerTurn(u.id);
    u.col = keep[0]; u.row = keep[1];
    strike(u, f, kick);
    out.shove = { landedIn: inPit(f), hpLost: hp0 - f.hp, armourLost: arm0 - f.armour,
                  fallIsAtLeast: PIT_FALL };
  }

  /* ── 3. the climb ─────────────────────────────────────────────────── */
  (() => {
    const v = GT.playerTurn();
    /* park him in the hole with a clean turn */
    const hole = Object.keys(B.terr).find(k => B.terr[k] === 'pit');
    const p = hole.split(',').map(Number);
    const sitting = at(p[0], p[1]); if (sitting && sitting !== v) { sitting.col = 0; sitting.row = 0; }
    v.col = p[0]; v.row = p[1];
    beginTurn();
    const acts0 = v.actions, b = moveBudget(v);
    const rm = reachMap(v, b);
    const outHex = Object.keys(rm.dist).map(k => k.split(',').map(Number))
      .find(q => B.terr[K(q[0], q[1])] !== 'pit');
    if (!outHex) { out.climb = { err: 'nowhere out', reach: Object.keys(rm.dist).length }; return; }
    const mv = v.acts.find(a => a.move);
    spend(v, mv);
    walkTo(v, outHex[0], outHex[1], rm);
    out.climb = { budget: b, reachable: Object.keys(rm.dist).length,
                  actionsBefore: acts0, actionsAfter: v.actions, stillIn: inPit(v) };
  })();

  /* ── 4. generation in situ, on a real rocky board ─────────────────── */
  (() => {
    const on = SIM.on, gr = SIM.ground;
    SIM.on = true; SIM.ground = 'rocky';
    const seen = [];
    for (let i = 0; i < 12; i++) {
      startBattle('slingline');
      seen.push({ pits: Object.keys(B.terr).filter(k => B.terr[k] === 'pit').length,
                  flag: !!B.hasPits,
                  onBody: B.units.some(x => !x.dead && B.terr[K(x.col, x.row)] === 'pit') });
    }
    SIM.on = on; SIM.ground = gr;
    out.boards = { withPits: seen.filter(s => s.pits).length, of: seen.length,
                   counts: seen.map(s => s.pits).join(','),
                   flagAlwaysAgrees: seen.every(s => s.flag === (s.pits > 0)),
                   nobodyStartsInOne: seen.every(s => !s.onBody) };
  })();

  /* ── 5. the gate ──────────────────────────────────────────────────── */
  const L = LINT();
  out.lint = { findings: L.findings, items: L.items };
  return out;
})();
