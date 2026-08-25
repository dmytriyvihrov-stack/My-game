/* #248 - C3, part two. The tells describe a 0..17+ ladder. What range do
   BODIES actually occupy? Recruits, founders, and founders carried up the
   level curve, so the answer covers a whole run and not one wall. */
(() => {
  const N = window.POP_N || 500;
  const all = {str:[], agi:[], int:[], mor:[]};
  const push = p => { const s = effStats(p);
    ['str','agi','int','mor'].forEach(k => all[k].push(s[k])); };

  for (let i = 0; i < N; i++) { const t = []; for (let j = 0; j < 3; j++) { const r = rollRecruit(t); t.push(r); push(r); } }
  for (let i = 0; i < 60; i++) makeParty().forEach(push);

  const q = (v, f) => v[Math.min(v.length - 1, (v.length * f) | 0)];
  const out = {};
  ['str','agi','int','mor'].forEach(k => {
    const v = all[k].slice().sort((a,b)=>a-b);
    out[k] = { n:v.length, min:v[0], p5:q(v,.05), p15:q(v,.15), p30:q(v,.30),
               p50:q(v,.50), p70:q(v,.70), p85:q(v,.85), p95:q(v,.95), max:v[v.length-1] };
  });
  /* how many of the nine painted grades a real population ever shows */
  out.gradesSeen = {};
  ['str','agi','int','mor'].forEach(k => {
    const idx = new Set(all[k].map(v => tellIdx(k, v)));
    out.gradesSeen[k] = [...idx].sort((a,b)=>a-b).join(',') + '  (' + idx.size + ' of 9)';
  });
  return out;
})()
