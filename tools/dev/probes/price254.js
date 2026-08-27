/* #254 · what the ladder cost the balance. Runs on BOTH builds; diff the rows.
   ⚠ n=8 a fight and a fixed company, because the point is the SHAPE of the
   change and not a third decimal. */
(() => {
  const FIGHTS = ['clash', 'brigand', 'pack', 'slingline', 'steading', 'snare', 'armour'];
  const out = [];
  FIGHTS.forEach(f => {
    let r = null;
    try { r = ARENA.match('prepared', f, 8); } catch (e) { out.push(f + ': THREW ' + e.message); return; }
    const pick = o => {
      if (!o || typeof o !== 'object') return String(o);
      const k = Object.keys(o).filter(x => typeof o[x] === 'number' || typeof o[x] === 'string');
      return k.map(x => x + ' ' + (typeof o[x] === 'number' ? Math.round(o[x] * 100) / 100 : o[x])).join(' · ');
    };
    out.push(f + ': ' + pick(r));
  });
  return out;
})()
