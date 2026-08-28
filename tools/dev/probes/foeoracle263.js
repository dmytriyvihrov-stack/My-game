/* #263 - THE ORACLE: every foe side, field by field, so a refactor can be
   PROVED to have changed nothing and a re-stat can be proved to have changed
   exactly what it claims.

     python tools/dev/gt.py eval tools/dev/probes/foeoracle263.js
     python tools/dev/gt.py eval --port <p> --url <baseline> tools/dev/probes/foeoracle263.js

   Run it on two builds and diff the JSON. `trait` is EXCLUDED: build() rolls a
   personality for roughly two in three people, so it differs between two runs
   of the SAME build and would drown the signal. Everything else here is
   deterministic given the party size, which is why the party is forced.

   ⚠ `steading` DRIFTS AGAINST ITSELF and is not a finding: `steading()` rolls
   three of four ogres for its wall, so the same build twice gives a different
   order. Compare it by SORTED rows or ignore it; every other kind is exact. */
(() => {
  const _r = render, _f = fx, _s = say, _x = sfx, _p = paintTerrain;
  render = () => {}; fx = () => {}; sfx = () => {}; paintTerrain = () => {};
  say = () => {};
  const _t = window.TUT_SILENT; window.TUT_SILENT = true;
  const out = {};
  try {
    /* the same company every time, or the size-gated plans (snare, hold,
       steading) field different bodies and the diff is about the party */
    G.party.length = 0;
    ARENA.COMPS.prepared().forEach(p => G.party.push(p));
    Object.keys(FOE_BUILD).sort().forEach(k => {
      G.battleKind = k;
      let side;
      try { side = FOE_BUILD[k](); }
      catch (e) { out[k] = 'THREW ' + e.message; return; }
      out[k] = side.map(u => [
        u.name, u.kind, u.race, u.hp, u.hpMax, u.armour, u.armourMax,
        u.mskill, u.dodgeBase, u.morale, u.moraleMax, u.speed,
        u.actions, u.actionsMax, u.flankPow, u.dmgBonus,
        u.st ? [u.st.str, u.st.agi, u.st.int, u.st.mor].join('/') : null,
        !!u.stands + '' + !!u.fleet + !!u.unrepeatable,
        (u.acts || []).map(a => a.n + (a.dmg ? ':' + a.dmg[0] + '-' + a.dmg[1] : '')).join(',')
      ].join('|'));
    });
  } catch (e) { out.FATAL = e.message; }
  finally {
    render = _r; fx = _f; say = _s; sfx = _x; paintTerrain = _p;
    window.TUT_SILENT = _t; B = null;
    G.party.length = 0; makeParty().forEach(p => G.party.push(p));
  }
  return out;
})()
