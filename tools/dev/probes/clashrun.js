/* the one fight that stalled once, n=15. `guard` is 'HIT GUARD' or 'ok'
   (harness.js:90) - the earlier cut of this probe read it as a boolean and
   reported 15/15 guards on a clean build, which is the trap this line exists
   to stop somebody hitting again. */
(() => {
  const tally = {}, rounds = [];
  for (let i = 0; i < 15; i++) {
    const r = runFight('clash', { comp: 'prepared' });
    const k = r.guard + '/' + r.won;
    tally[k] = (tally[k] || 0) + 1;
    rounds.push(r.rounds);
  }
  return { tally: tally, rounds: rounds,
           minRounds: Math.min.apply(null, rounds),
           mean: +(rounds.reduce((a, b) => a + b, 0) / rounds.length).toFixed(2) };
})()
