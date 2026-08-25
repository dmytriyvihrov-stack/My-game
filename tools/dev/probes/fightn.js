/* ONE fight, n times, on whatever page state the browser is already in - which
   is the half that matters. `regress.js` runs each of the eight ONCE, so it can
   only ever say "something went wrong here"; a rate needs a loop.
     window.FIGHT_KIND = 'brigand'; window.FIGHT_N = 40
   #248 used it at n=20 to turn "1 stall in ~32 runs" into "1 in 20 on a page
   that has been driven, 0 in 20 on a fresh one", which is what finally made the
   cause findable. `stuck` comes from runFight itself. */
(() => {
  const K = window.FIGHT_KIND || 'clash', N = window.FIGHT_N || 20;
  const out = { kind: K, n: N, guards: 0, stuck: null, rounds: [] };
  for (let i = 0; i < N; i++) {
    const r = runFight(K);
    if (r.guard === 'HIT GUARD') { out.guards++; if (!out.stuck) out.stuck = r.stuck; }
    else out.rounds.push(r.rounds);
  }
  return out;
})()
