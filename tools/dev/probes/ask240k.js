/* #240 - the last four, driven: the derived ogre count, one morale float a
   beat, the two switches where they land on each screen, and the card. */
(() => {
  const out = {};

  /* ── ask 11: the head count, at both party sizes ────────────────────── */
  const keep = G.party.slice();
  const setSize = n => { G.party.length = 0;
    for (let i = 0; i < n; i++) G.party.push(keep[i % keep.length]); };
  const readCard = () => ({ heads: steadingHeads(),
    body: evBody(EVENTS.steading).slice(0, 46),
    door: evLabel(EVENTS.steading.choices.find(c => c.battle === 'steading')) });
  setSize(4); out.steadingSmall = readCard();
  setSize(6); out.steadingBig = readCard();
  G.party.length = 0; keep.forEach(p => G.party.push(p));
  /* and the fight itself, so the card and the field agree */
  const _r = render, _f = fx, _s = say, _x = sfx, _p = paintTerrain;
  render = () => {}; fx = () => {}; sfx = () => {}; paintTerrain = () => {}; say = () => {};
  try {
    setSize(4); startBattle('steading');
    out.steadingSmall.fielded = B.units.filter(x => x.side === 'foe').length;
    setSize(6); startBattle('steading');
    out.steadingBig.fielded = B.units.filter(x => x.side === 'foe').length;
  } finally { render = _r; fx = _f; say = _s; sfx = _x; paintTerrain = _p;
    G.party.length = 0; keep.forEach(p => G.party.push(p)); }

  /* ── ask 8: one float a beat ────────────────────────────────────────── */
  startBattle('clash');
  render();
  const fxbox = document.getElementById('bFx');
  const u = B.units.find(x => x.side === 'foe' && !x.dead);
  fxbox.innerHTML = '';
  /* three separate charges in ONE synchronous beat, the way a blow makes them */
  mor(u, -9, 'a'); mor(u, -6, 'b'); mor(u, -8, 'c');
  const during = fxbox.querySelectorAll('.fx').length;
  return Promise.resolve().then(() => {
    const after = [].slice.call(fxbox.querySelectorAll('.fx')).map(e => e.textContent);
    out.moraleFloat = { duringBeat: during, afterFlush: after.length, text: after };

    /* ── ask 16: where the two switches land ─────────────────────────── */
    const box = document.getElementById('audioBox');
    const R = e => { const r = e.getBoundingClientRect();
      return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), t: +r.top.toFixed(1),
               l: +r.left.toFixed(1), r: +r.right.toFixed(1) }; };
    const seen = {};
    ['battle', 'world', 'inv'].forEach(s => { show(s); seen[s] = R(box); });
    /* nothing else in the same corner on the world screen */
    show('world');
    const near = GT.$$('#stage button, #stage .cchip').filter(e => {
      if (e === box || box.contains(e)) return false;
      const a = R(e), b = seen.world;
      return GT.vis(e) && a.r > b.l - 2 && a.l < b.r + 2 && a.t < b.t + b.h + 2 && (a.t + a.h) > b.t - 2;
    }).map(e => e.id || e.className);
    out.switches = { pos: seen, collidesOnWorld: near, sfxOn: AU.on, musOn: MUS.on };
    return out;
  });
})()
