/* #248 round three - the five rulings, each measured rather than read. */
(() => {
  const o = {};

  /* B8 + B6 - the cap and the frames */
  o.wagon = { PARTYBASE, FRAME_COST: FRAME_COST.slice(), FRAME_SEATS: FRAME_SEATS.slice(),
              seatLadder: FRAME_SEATS.map(n => PARTYBASE + (LEGACY.yard || 0) + n),
              capNow: (typeof wagonCap === 'function') ? wagonCap() : 'n/a',
              PARTYCAP };

  /* E2 - the Stone Shield, on a real body */
  o.shield = (() => {
    const g = GEAR.stoneshield;
    if (!g) return 'no row';
    const p = G.party[0];
    const keep = { main: p.eq.main, off: p.eq.off };
    const before = { armour: armourValue(p), dodge: unitFrom(p).dodgeBase };
    p.eq.main = 'stoneshield'; p.eq.off = 'shield';
    const u = unitFrom(p);
    const act = (u.acts || []).find(a => a.k === 'main');
    const after = { armour: armourValue(p), dodge: u.dodgeBase,
                    offEmptied: !handsFree(p), push: act && act.push,
                    note: act && act.note, dmg: act && act.dmg };
    p.eq.main = keep.main; p.eq.off = keep.off;
    return { price: gearPrice('stoneshield'), icon: !!ITEM_ICON.stoneshield,
             rarity: g.rarity, before, after };
  })();

  /* B7 - does a rack still lean to trinkets? */
  o.rack = (() => {
    const tally = {}, n = 300;
    for (let i = 0; i < n; i++) rollRack().forEach(([k]) => {
      const sl = GEAR[k].slot; tally[sl] = (tally[sl] || 0) + 1; });
    const tot = Object.values(tally).reduce((a, b) => a + b, 0);
    return Object.fromEntries(Object.entries(tally)
      .sort((a,b)=>b[1]-a[1]).map(([k,v]) => [k, (100*v/tot).toFixed(0) + '%']));
  })();

  /* C3 - does the ladder use its range now? */
  o.tells = (() => {
    const all = {str:[], agi:[], int:[], mor:[]};
    for (let i = 0; i < 300; i++) { const t = [];
      for (let j = 0; j < 3; j++) { const r = rollRecruit(t); t.push(r);
        const st = effStats(r); ['str','agi','int','mor'].forEach(k => all[k].push(st[k])); } }
    const out = {};
    ['str','agi','int','mor'].forEach(k => {
      const idx = new Set(all[k].map(v => tellIdx(k, v)));
      const words = {};
      all[k].forEach(v => { const w = tell(k, v); words[w] = (words[w]||0)+1; });
      out[k] = { gradesSeen: idx.size + ' of 9',
                 commonest: Object.entries(words).sort((a,b)=>b[1]-a[1])
                   .slice(0,3).map(([w,c]) => w + ' ' + (100*c/all[k].length).toFixed(0) + '%') };
    });
    return out;
  })();
  return o;
})()
