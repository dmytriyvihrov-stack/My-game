/* #240 - the same four fights at n=16, plain. Run on the HEAD baseline so the
   new build's `flatShock` column (ask240c) has an honest partner: that column
   already restores HEAD's death shock arithmetically, so the difference
   between the two IS the rest of the batch (the ring off a shot, the fire
   price, the spear round the tree, the holding line).
     python tools/dev/gt.py arena ask240d.js --port 9611 --url prototype/_head_baseline.html */
(() => {
  const N = 16, out = {};
  ['snare', 'pack', 'slingline', 'steading'].forEach(k => {
    let rounds = 0, routed = 0, killed = 0, downs = 0;
    for (let i = 0; i < N; i++) {
      const r = runFight(k, { comp: 'prepared', after: B => ({
        routed: B.units.filter(x => x.side === 'foe' && !x.passive && (x.fled || x.state === 'routed')).length,
        killed: B.units.filter(x => x.side === 'foe' && !x.passive && x.dead).length })});
      rounds += r.rounds; downs += r.down;
      if (r.after) { routed += r.after.routed; killed += r.after.killed; }
    }
    out[k] = { rounds: +(rounds / N).toFixed(1), routed: +(routed / N).toFixed(2),
               killed: +(killed / N).toFixed(2), youDown: +(downs / N).toFixed(2) };
  });
  return out;
})()
