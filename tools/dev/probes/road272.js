/* #272 - the road's state: the ladder, the chip's box on both bars, and that
   nothing it draws leaves the bar or collides with the furniture beside it. */
(() => {
  const R = e => e && e.getBoundingClientRect();
  const out = {};

  /* the build holds this edit at all */
  /* a top-level `const` is a global LEXICAL binding and is not on `window`,
     so the tables have to be named directly or they read as missing. */
  out.symbols = 'roadWeight ' + (typeof roadWeight) + ' | roadArc ' + (typeof roadArc) +
    ' | ROAD_W ' + JSON.stringify(typeof ROAD_W === 'undefined' ? null : ROAD_W) +
    ' | gates ' + JSON.stringify(ROAD_STATES.map(s => s.k));

  G.party.length = 0; ARENA.COMPS.prepared().forEach(p => G.party.push(p));
  enterWorld();
  ['tutDim', 'tutCard'].forEach(id => { const e = $(id); if (e) e.remove(); });

  /* ── the ladder: every deed count a run can produce, against the state ── */
  const keep = JSON.parse(JSON.stringify(G.deeds || {}));
  const lit = () => [...$('wRoad').querySelectorAll('path')]
    .filter(p => p.getAttribute('stroke') !== 'var(--e2)').length;
  out.ladder = [[0,0,0],[1,0,0],[2,0,0],[3,0,0],[9,0,0],
                [0,1,0],[0,1,1],[0,2,0],[0,9,9],[3,3,0],[2,0,3]]
    .map(([e, h, o]) => {
      G.deeds = { evil: e, help: h, honor: o }; roadStrip();
      const st = roadState();
      return 'evil ' + e + ' help ' + h + ' honor ' + o + ' -> w ' + roadWeight() +
             ' ' + st.k + ' lit ' + lit();
    });

  /* ── the box, on a black road, on both bars ────────────────────────── */
  G.deeds = { evil: 3 }; roadStrip();
  const box = () => {
    const b = $('wRoad'), r = R(b), bar = R(b.parentElement);
    return {
      w: Math.round(r.width), h: Math.round(r.height),
      x: Math.round(r.left) + '..' + Math.round(r.right),
      inBar: r.top >= bar.top - .5 && r.bottom <= bar.bottom + .5,
      border: getComputedStyle(b).borderColor,
      overflow: (b.scrollWidth - b.clientWidth) + ',' + (b.scrollHeight - b.clientHeight),
      /* ⚠ #273 MOVED THE CHIP INTO `#wMap`, SO THIS HAS TO BE 2D. While the
         parent was a 42px bar every sibling shared its row and an x-overlap
         WAS a collision; against the map, x alone reports the whole corner
         and reads as a shipped fault. Full box test, both axes. */
      hits: [...b.parentElement.querySelectorAll(':scope > *')]
        .filter(o => o !== b && R(o).width && R(o).height)
        .filter(o => { const a = R(o);
          /* ⚠ AND A SIBLING THAT CONTAINS THE CHIP IS GROUND, NOT A COLLISION.
             `#wCam` is `inset:0` over the whole map, so a plain box test calls
             the map itself a fault. Only a box that CROSSES the chip counts. */
          if (a.left <= r.left && a.right >= r.right &&
              a.top <= r.top && a.bottom >= r.bottom) return false;
          return a.right > r.left + .5 && a.left < r.right - .5 &&
                 a.bottom > r.top + .5 && a.top < r.bottom - .5; })
        .map(o => o.id || o.className)
    };
  };
  out.world = box();
  show('inv'); out.inv = box(); show('world');

  /* the whole bar still ends inside its own reservation */
  out.barRight = (() => { let r = -1e9;
    [...$('wBar').children].forEach(c => { const b = R(c); if (b.width) r = Math.max(r, b.right); });
    return Math.round(r) + ' (cap 1194)'; })();

  /* ── the hover, which neither ui-scales counter can see ─────────────── */
  const el = $('wRoad');
  el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, clientX: 900, clientY: 30 }));
  const t = $('gtTip'), tr = R(t);
  out.tip = { size: Math.round(tr.width) + 'x' + Math.round(tr.height),
              over: (t.scrollWidth - t.clientWidth) + ',' + (t.scrollHeight - t.clientHeight),
              offscreen: tr.right > innerWidth || tr.bottom > innerHeight,
              says: (t.textContent || '').slice(0, 90) };
  t.style.display = 'none';

  /* ── the two standing counters, on this screen ──────────────────────── */
  out.floor = GT.floor();
  out.clip = GT.clip();
  G.deeds = keep; roadStrip();
  return out;
})()
