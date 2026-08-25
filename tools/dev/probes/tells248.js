/* #248 - C3. The muster's four sentences: do three candidates ever read
   differently? Rolled n times, counting how often a whole LINE repeats and
   how the four axes actually distribute. */
(() => {
  const N = window.TELL_N || 400;
  const seen = {str:{}, agi:{}, int:{}, mor:{}};
  const vals = {str:[], agi:[], int:[], mor:[]};
  let sameLinePairs = 0, pairs = 0, allThreeSame = 0, rounds = 0;

  for (let i = 0; i < N; i++) {
    const cands = [];
    for (let j = 0; j < 3; j++) {
      cands.push(rollRecruit(cands));
    }
    rounds++;
    const lines = cands.map(p => {
      const s = effStats(p);
      ['str','agi','int','mor'].forEach(k => {
        const t = tell(k, s[k]);
        seen[k][t] = (seen[k][t] || 0) + 1;
        vals[k].push(s[k]);
      });
      return tellLine(s);
    });
    for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) {
      pairs++; if (lines[a] === lines[b]) sameLinePairs++;
    }
    if (lines[0] === lines[1] && lines[1] === lines[2]) allThreeSame++;
  }

  const stat = k => {
    const v = vals[k].slice().sort((a,b)=>a-b);
    return { min:v[0], p25:v[(v.length*.25)|0], med:v[(v.length*.5)|0],
             p75:v[(v.length*.75)|0], max:v[v.length-1] };
  };
  const top = k => Object.entries(seen[k]).sort((a,b)=>b[1]-a[1])
    .slice(0,4).map(([t,n]) => t + ' ' + (100*n/(rounds*3)).toFixed(0) + '%');

  return {
    rounds,
    identicalWholeLine: (100*sameLinePairs/pairs).toFixed(1) + '% of candidate pairs',
    allThreeIdentical: (100*allThreeSame/rounds).toFixed(1) + '% of musters',
    distribution: {str:stat('str'), agi:stat('agi'), int:stat('int'), mor:stat('mor')},
    commonest: {str:top('str'), agi:top('agi'), int:top('int'), mor:top('mor')},
    distinctPhrasesUsed: Object.fromEntries(['str','agi','int','mor']
      .map(k => [k, Object.keys(seen[k]).length + ' of 9'])),
  };
})()
