/* ⛔ #253 · the origin moved and nothing else may have.
   Runs on BOTH builds. Every derived number on a fixed set of bodies, plus the
   word each stat is called by. Diff the two outputs: they must be identical
   except for `st`, which is the thing that moved. */
(() => {
  const K = ['str', 'agi', 'int', 'mor'];
  const rows = [];

  const line = (tag, p) => {
    const u = unitFrom(p), s = effStats(p);
    rows.push([tag,
      'hp ' + D.hp(u), 'dmg ' + D.dmg(u), 'hit ' + D.hit(u), 'dodge ' + D.dodge(u),
      'flank ' + D.flank(u), 'spell ' + D.spell(u).toFixed(3), 'moral ' + D.moral(u),
      'bonus ' + D.bonus(u).toFixed(4), 'learn ' + D.learn(u).toFixed(4),
      'init ' + Math.round(28 + (typeof sv === 'function' ? sv(u, 'agi') : u.st.agi) * 1.4),
      'thews ' + thews(u, { range: 0 }).toFixed(4) + '/' + thews(u, { range: 2 }).toFixed(4),
      'words ' + K.map(k => tell(k, s[k])).join('|'),
      'ico ' + K.map(k => tellIdx(k, s[k])).join('|'),
      'bodyHp ' + bodyHp(p)
    ].join(' | '));
  };

  /* the four founders and the three presets, all authored, all deterministic */
  G.party.forEach(p => line(p.id, p));
  ['skree', 'ash', 'bruht'].forEach(id => {
    const r = (typeof PRESETS !== 'undefined' && PRESETS[id]) ? PRESETS[id] : null;
    if (r) line(id, r);
  });

  /* and a swept body: every combination of gear/trait that moves a stat, on a
     fixed spine, so the floor and the modifiers are exercised too */
  const spine = JSON.parse(JSON.stringify(G.party[0]));
  const traits = Object.keys(TRAITS).filter(t => K.some(k => TRAITS[t][k]));
  const armours = Object.keys(GEAR).filter(k => GEAR[k].slot === 'armour');
  traits.forEach((t, i) => {
    const p = JSON.parse(JSON.stringify(spine));
    p.trait = t;
    p.race = ['human', 'ratkin', 'ogre'][i % 3];
    p.eq = { armour: armours[i % armours.length], main: 'sword', off: null, trinket: null, bag: null };
    p.injuries = [SCARS[i % SCARS.length], SCARS[(i + 3) % SCARS.length]];
    p.hurt = HURTS[i % HURTS.length];
    line('sweep' + i + ':' + t, p);
  });

  /* the muster price, on a fixed roll */
  let seed = 42;
  const old = Math.random;
  Math.random = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const cands = [];
  for (let i = 0; i < 6; i++) { const r = rollRecruit(); cands.push(r.race + ' ' + r.cls + ' cost ' + r.cost); }
  Math.random = old;

  return { rows: rows, recruits: cands,
           statOfCaptain: JSON.stringify(G.party[0].st) };
})()
