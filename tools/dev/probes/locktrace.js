/* Trap EVERY B.tutLock write across n harness fights by re-installing the
   trap after each startBattle. */
(() => {
  const N = window.TRACE_N || 40, writes = [], guards = [];
  const _sb = window.startBattle;
  window.startBattle = function () {
    const r = _sb.apply(this, arguments);
    try {
      let v = B.tutLock;
      Object.defineProperty(B, 'tutLock', { configurable: true,
        get() { return v; },
        set(x) { if (x && !v) writes.push({ round: B.round, idx: B.idx,
                   stack: (new Error().stack || '').split('\n').slice(1, 9).map(s => s.trim()) });
                 v = x; } });
    } catch (e) { writes.push('trap failed: ' + e.message); }
    return r;
  };
  for (let i = 0; i < N; i++) {
    const r = runFight('clash');
    if (r.guard === 'HIT GUARD') guards.push({ run: i, stuck: r.stuck });
    if (writes.length) break;
  }
  window.startBattle = _sb;
  return { writes, guards: guards.length, first: guards[0] || null };
})()
