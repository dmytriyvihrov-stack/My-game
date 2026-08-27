/* ⛔ #252 · the stat hover shows how the number was reached.
   Three questions, and the first is the only one that can lose data:
   1. does `statParts` sum to exactly what HEAD's `effStats` returned?
   2. does every hover's ledger add up to the figure it prints?
   3. does the tip stay inside the stage, and above the 10px floor? */
(() => {
  const KEYS = ['str', 'agi', 'int', 'mor'];

  /* HEAD's walk, re-typed here as an INDEPENDENT ORACLE. If the new one is a
     refactor it agrees on every body; if it is a rewrite it does not. */
  const headEff = p => {
    const s = { str: p.st.str, agi: p.st.agi, int: p.st.int, mor: p.st.mor };
    SLOTS.forEach(sl => {
      if (sl[0] === 'off' && !handsFree(p)) return;
      const g = GEAR[p.eq[sl[0]]]; if (!g) return;
      KEYS.forEach(k => { if (g[k]) s[k] += g[k]; });
      const b = trinketFires(g, p);
      if (b) KEYS.forEach(k => { if (b[k]) s[k] += b[k]; });
    });
    const t = TRAITS[p.trait];
    if (t) KEYS.forEach(k => { if (t[k]) s[k] += t[k]; });
    (p.injuries || []).forEach(i => KEYS.forEach(k => { if (i[k]) s[k] += i[k]; }));
    if (p.hurt) KEYS.forEach(k => { if (p.hurt[k]) s[k] += p.hurt[k]; });
    if (sizeMismatch(p)) { s.agi += WRONGSIZE.agi; s.mor += WRONGSIZE.mor; }
    if (t && t.heavyOnly && bandKey(armourValue(p)) !== 'heavy') s.mor -= t.heavyOnly;
    KEYS.forEach(k => { s[k] = Math.max(1 - STAT_ZERO, s[k]); });   /* #253 - the floor moved with the origin */
    return s;
  };

  /* a wide population: the company, plus rolled recruits of every race and
     class, plus scars, a temporary injury and armour that does not fit -
     because the interesting rows are the ones nobody's founder carries */
  const crowd = G.party.slice();
  const races = ['human', 'ratkin', 'ogre'];
  const traits = Object.keys(TRAITS);
  const armours = Object.keys(GEAR).filter(k => GEAR[k].slot === 'armour');
  const mains = Object.keys(GEAR).filter(k => GEAR[k].slot === 'main');
  const trinks = Object.keys(GEAR).filter(k => GEAR[k].slot === 'trinket');
  for (let i = 0; i < 240; i++) {
    const p = JSON.parse(JSON.stringify(G.party[i % G.party.length]));
    p.race = races[i % 3];
    p.trait = traits[i % traits.length];
    p.eq = { armour: armours[i % armours.length], main: mains[i % mains.length],
             off: mains[(i + 3) % mains.length], trinket: trinks[i % trinks.length], bag: null };
    p.st = { str: 1 + (i % 14), agi: 1 + ((i * 5) % 14), int: 1 + ((i * 7) % 14), mor: 1 + ((i * 3) % 14) };
    p.injuries = i % 3 ? [SCARS[i % SCARS.length]] : [];
    if (i % 4 === 0) p.injuries.push(SCARS[(i + 4) % SCARS.length]);
    p.hurt = i % 5 ? null : HURTS[i % HURTS.length];
    p.lvUp = i % 6 ? null : { str: 1, mor: 2 };
    crowd.push(p);
  }

  const drift = [], notSum = [];
  crowd.forEach((p, i) => {
    const a = headEff(p), b = effStats(p), parts = statParts(p);
    KEYS.forEach(k => {
      if (a[k] !== b[k]) drift.push('#' + i + ' ' + k + ': HEAD ' + a[k] + ' vs ' + b[k]);
      const sum = parts[k].reduce((n, r) => n + r.v, 0);
      if (sum !== b[k]) notSum.push('#' + i + ' ' + k + ': parts ' + sum + ' vs ' + b[k]);
      parts[k].forEach(r => { if (!r.n) notSum.push('#' + i + ' ' + k + ': an unnamed line'); });
    });
  });

  /* the ledger the player actually reads, on the body that is on screen */
  show('inv'); drawInv();
  const me = member(iSel);
  const ledger = KEYS.map(k => {
    const box = document.createElement('div');
    box.innerHTML = statSumHTML(me, k);
    const rows = [...box.querySelectorAll('.ssr:not(.tot)')].map(r =>
      r.querySelector('.ssn').textContent + ' ' + r.querySelector('.ssv').textContent);
    const tot = box.querySelector('.ssr.tot .ssv').textContent;
    return k + ': ' + rows.join(' | ') + '  => ' + tot + ' (sheet ' + effStats(me)[k] + ')';
  });

  /* and one live hover, measured rather than assumed */
  const cell = document.querySelector('#iChar [data-tell="str"]');
  const r = cell.getBoundingClientRect();
  cell.onmouseenter({ clientX: r.left + 4, clientY: r.top + 4 });
  const tip = document.getElementById('gtTip');
  const tr = tip.getBoundingClientRect(), st = document.getElementById('stage').getBoundingClientRect();
  const small = [...tip.querySelectorAll('*')].filter(e => {
    const c = getComputedStyle(e);
    return c.display !== 'none' && parseFloat(c.fontSize) < 10 && (e.textContent || '').trim();
  }).map(e => e.className + ' ' + getComputedStyle(e).fontSize);
  const out = {
    bodies: crowd.length,
    driftFromHEAD: drift.slice(0, 8),
    partsDoNotSum: notSum.slice(0, 8),
    ledger: ledger,
    tip: { w: Math.round(tr.width), h: Math.round(tr.height), rows: tip.querySelectorAll('.ssr').length,
           insideStage: tr.right <= st.right + 1 && tr.bottom <= st.bottom + 1 && tr.top >= st.top - 1,
           underFloor: small },
    lint: typeof LINT === 'function' ? LINT().length : 'no LINT'
  };
  cell.onmouseleave();
  return out;
})()
