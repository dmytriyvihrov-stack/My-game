/* #239 ask 8 - what the tap-room costs the Captain now that he holds it with
   the barman instead of with a crew.

     python tools/dev/gt.py arena brawl239.js

   ⚠ NOT `runFight`: that swaps the whole party for an ARENA comp, and the
   brawl is scripted around the four `makeParty` bodies and a bench. This is
   the same loop with the roster left alone, plus `capTick` on every turn -
   which is where `tavernTick` runs, i.e. where the whole script lives.
   ⚑ n=50 A SIDE, because #145 measured exactly this fight at n=16 and got a
   number that was not there. A minimum over n is the unluckiest sample. */
(() => {
  const N = 50;
  const _r = render, _f = fx, _s = say, _x = sfx, _p = paintTerrain;
  const _jp = (typeof JOURNAL !== 'undefined' && JOURNAL) ? JOURNAL.put : null;
  render = () => {}; fx = () => {}; sfx = () => {}; paintTerrain = () => {};
  say = t => { G.log.push(t); };
  if (_jp) JOURNAL.put = () => {};
  const fin = [], rounds = [], lost = [];
  try {
    for (let i = 0; i < N; i++) {
      G.party.forEach(p => { p.hpLoss = 0; p.hurt = null; p.injuries = []; });
      G.morale = 0; G.log.length = 0;
      startBattle('tavern');
      let g = 0;
      while (B && B.won === null && g++ < 3000) {
        if (checkEnd()) break;
        const u = cur(); if (!u) break;
        if (u.dead || u.downed || u.fled) { B.busy = false; nextTurn(); continue; }
        let s = 0;
        while (B && B.won === null && cur() === u && s++ < 8) {
          const a0 = u.actions; B.busy = false;
          try { aiTurn(u); } catch (e) { g = 1e9; break; }
          if (!B || B.won !== null || cur() !== u || u.actions === a0) break;
        }
        if (B && B.won === null && cur() === u) { B.busy = false; nextTurn(); }
      }
      const cap = B && B.units.find(x => x.leader && x.side === 'you');
      if (cap) fin.push(Math.max(0, cap.hp) / cap.hpMax);
      if (B) rounds.push(B.round);
      if (B && B.won === false) lost.push(1);
      B = null;
    }
  } finally {
    render = _r; fx = _f; say = _s; sfx = _x; paintTerrain = _p;
    if (_jp) JOURNAL.put = _jp;
  }
  const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0;
  const pct = a => +(100 * mean(a)).toFixed(1);
  return { n: fin.length,
           capFinishPct: pct(fin),
           under25: fin.filter(x => x < .25).length,
           under15: fin.filter(x => x < .15).length,
           worstPct: +(100 * Math.min(...fin)).toFixed(1),
           meanRounds: +mean(rounds).toFixed(1),
           lostRuns: lost.length };
})()
