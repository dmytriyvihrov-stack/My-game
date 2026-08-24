/* #240 - ISOLATING THE TWO BALANCE CHANGES THAT LANDED IN THE SAME EDIT.
   The rout-rate probe moved `youDown` on the Snare from 2.58 to 4.92, and TWO
   things in this batch could have done it: the death shock is scaled by the
   size of the line (ask 2), and the flanking bonus no longer reaches a shot
   (ask 4). This runs the same fights with the death shock ARITHMETICALLY
   RESTORED - `MORALE.allyDied` is a field on a const object, so setting it to
   -14/deathScale(n) makes deathShock() return exactly the -14 HEAD charged -
   so whatever is left over is ask 4 alone.
     python tools/dev/gt.py arena ask240c.js */
(() => {
  const N = 16, out = {};
  const base = MORALE.allyDied;
  const run = (k, n) => {
    let rounds = 0, routed = 0, downs = 0, killed = 0;
    for (let i = 0; i < n; i++) {
      const r = runFight(k, { comp: 'prepared', after: B => ({
        routed: B.units.filter(x => x.side === 'foe' && !x.passive && (x.fled || x.state === 'routed')).length,
        killed: B.units.filter(x => x.side === 'foe' && !x.passive && x.dead).length })});
      rounds += r.rounds; downs += r.down;
      if (r.after) { routed += r.after.routed; killed += r.after.killed; }
    }
    return { rounds: +(rounds / n).toFixed(1), routed: +(routed / n).toFixed(2),
             killed: +(killed / n).toFixed(2), youDown: +(downs / n).toFixed(2) };
  };
  [['snare', 9], ['pack', 10], ['slingline', 8], ['steading', 5]].forEach(([k, size]) => {
    MORALE.allyDied = base;
    const withScale = run(k, N);
    /* undo the scaling for this side size only, so deathShock() returns -14 */
    MORALE.allyDied = Math.round(base / (Math.max(0.45, Math.min(1, 5 / size))));
    const flat = run(k, N);
    MORALE.allyDied = base;
    out[k] = { size: size, shockScaled: deathShock(size), shockFlat: -14,
               scaled: withScale, flatShock: flat };
  });
  return out;
})()
