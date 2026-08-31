/* #275 - the two the first pass could not answer: can a cloak be found, and
   does HELD GROUND change its last sentence with the card. */
(() => {
  const o = {};
  o.pool = { rareBag: findPool('rare', 'bag').slice(),
             hasCloak: findPool('rare', 'bag').indexOf('cloak') >= 0,
             early: typeof earlyFind === 'function' ? earlyFind('cloak') : null,
             price: gearPrice('cloak') };

  const T = window.TUT_SILENT; window.TUT_SILENT = true;
  startBattle('brigand'); GT.playerTurn();
  const u = cur(), f = GT.nearestFoe(u);
  GT.standNextTo(f, u);                       /* somebody has a hand on this one */
  faceToward(f, u.col, u.row);
  o.held = held(u);
  const keep = u.acts.slice();
  o.noDis = ((zocNote(u.col, u.row) || {}).d || '').slice(-140);
  u.acts.push({ k: 'dis', n: 'DISENGAGE', cost: 1, self: true });
  o.withDis = ((zocNote(u.col, u.row) || {}).d || '').slice(-170);
  u.acts = keep;
  window.TUT_SILENT = T;
  return o;
})()
