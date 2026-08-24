/* #239 - the three "check whether this is real" asks, measured on the build.

     python tools/dev/gt.py eval ask239.js

   4  a spear draws its reach the way a bow draws its range
   5  shallow water (marsh) and the fen's deep water stop neither a thrust
      nor an arrow
   11 a scar actually takes the stat off, all the way to the field           */
(() => {
  const out = {};

  /* ── 11 · A SCAR IS A NUMBER, NOT A LINE OF PROSE ─────────────────────── */
  (() => {
    const p = G.party.find(x => !x.leader) || G.party[0];
    const keep = (p.injuries || []).slice();
    p.injuries = [];
    const before = effStats(p), bu = unitFrom(p);
    /* the gut-wound, which is the only two-channel row in SCARS */
    p.injuries = [SCARS.find(s => s.str && s.agi)];
    const after = effStats(p), au = unitFrom(p);
    out.scars = {
      who: p.name,
      row: p.injuries[0].n,
      statsBefore: before, statsAfter: after,
      hpMax: [bu.hpMax, au.hpMax],
      hit: [bu.mskill, au.mskill],
      dodge: [bu.dodgeBase, au.dodgeBase],
      dmgBonus: [bu.dmgBonus, au.dmgBonus],
      /* what the SHEET says it costs, off the same row */
      sheetSays: p.injuries[0].d
    };
    p.injuries = keep;
  })();

  /* ── 5 · WATER STOPS NOTHING ──────────────────────────────────────────── */
  startBattle('brigand');
  out.water = {
    /* every terrain kind this build can paint, and what a lane makes of it */
    heights: {},
    blocked: {}
  };
  ['field', 'marsh', 'deep', 'rock', 'tree', 'fire', 'ember', 'wall', 'flower']
    .forEach(t => {
      out.water.heights[t] = (typeof HEIGHT !== 'undefined' && HEIGHT[t]) || null;
      out.water.blocked[t] = !!BLOCKED[t];
    });

  /* and prove it on real ground rather than off the table: put water between
     two bodies and ask the two functions the board asks */
  (() => {
    const u = GT.playerTurn('vesna') || GT.playerTurn();
    const f = GT.nearestFoe(u);
    /* stand them three apart on a row, water in the middle */
    u.col = 4; u.row = 4; f.col = 6; f.row = 4;
    const mid = K(5, 4);
    const jab = u.acts.find(a => a.reach >= 2 && !a.range) ||
                { k: 'jab', reach: 2, dmg: [1, 1] };
    const bow = { k: 'shot', range: 5, dmg: [1, 1] };
    const ask = kind => {
      B.terr[mid] = kind; terrMoved();
      return { lane: losState(u, f).k, thrust: reachBlocked(u, f, jab) ? 'REFUSED' : 'through',
               arrow: losState(u, f, [u.col, u.row]).k,
               needsLaneShot: needsLane(bow) };
    };
    out.water.onTheBoard = { marsh: ask('marsh'), deep: ask('deep'),
                             field: ask('field'), tree: ask('tree') };
    B.terr[mid] = 'field'; terrMoved();
  })();

  /* ── 4 · THE SPEAR'S FOOTPRINT ────────────────────────────────────────── */
  (() => {
    const wash = k => {
      const u = GT.playerTurn(k === 'bow' ? 'ilka' : 'vesna') || GT.playerTurn();
      const act = k === 'bow' ? u.acts.find(a => a.range)
                              : u.acts.find(a => a.reach >= 2 && !a.range && !a.move);
      if (!act) return { who: u.name, act: null };
      B.sel = act; B.actHover = null; render();
      /* the wash is painted onto the hex's own .hfill layer, never onto
         the button - see the `.hin` note in the stylesheet */
      const hexes = [].slice.call(document.querySelectorAll('#bGrid .hex'));
      const act_ = REACH_WASH.act;
      const lit = B.hexEls.filter(h => h.base === act_);
      return { who: u.name, act: act.n, reach: act.range || act.reach,
               washHexes: lit.length,
               washColour: act_,
               sample: lit.slice(0, 3).map(h => h.k),
               farCursor: hexes.filter(h => h.classList.contains('hfar')).length };
    };
    out.spear = wash('spear');
    out.bow = wash('bow');
    out.reachWash = REACH_WASH;
  })();

  return out;
})()
