/* #275 - does the page hold this edit, and does the arithmetic say what the
   ask says. One round trip. */
(() => {
  const o = {};
  o.holds = {
    hitOf: typeof hitOf, hiddenLive: typeof hiddenLive, hasDis: typeof hasDis,
    DODGE_SOFT: typeof DODGE_SOFT !== 'undefined' ? DODGE_SOFT : null,
    HIT_SOFT: typeof HIT_SOFT !== 'undefined' ? HIT_SOFT : null,
    cloak: !!(GEAR && GEAR.cloak), cloakTier: GEAR.cloak && GEAR.cloak.rarity,
    tutSure: typeof TUT_FIRST_SURE !== 'undefined' ? TUT_FIRST_SURE : null,
  };
  /* the two curves, at the points that matter */
  o.dodgeCurve = [10, 14, 20, 25, 30, 40].map(v => v + '->' + Math.round(softDodge(v)));
  o.hitCurve = [70, 95, 100, 110, 130].map(v => v + '->' + Math.round(softHit(v)));

  /* a built body on both sides, before and after the cap */
  startBattle('brigand');
  const you = B.units.find(u => u.side === 'you'), foe = B.units.find(u => u.side === 'foe');
  o.bodies = {
    you: { raw: you.mskill, hit: hitOf(you), dodgeBase: you.dodgeBase, dodge: dodgeOf(you) },
    foe: { raw: foe.mskill, hit: hitOf(foe), dodgeBase: foe.dodgeBase, dodge: dodgeOf(foe) },
  };
  /* the hover ledger adds up to the figure it prints */
  const W = [], v = hitOf(you, W);
  o.hitLedger = { rows: W.map(r => r[0] + ' ' + r[1]), sum: W.reduce((n, r) => n + r[1], 0), val: v };
  const D = [], dv = dodgeOf(you, D);
  o.dodgeLedger = { rows: D.map(r => r[0] + ' ' + r[1]), sum: D.reduce((n, r) => n + r[1], 0), val: dv };
  return o;
})()
