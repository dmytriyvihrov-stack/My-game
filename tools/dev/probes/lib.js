/* ═══════════════════════════════════════════════════════════════════════
   lib.js - the setup and measurement helpers every layout or battle probe
   needs, so nobody writes them a fifth time.

   `gt.py eval` PREPENDS this to whatever probe you pass, so a probe is just
   the question. Nothing here is loaded by the game.

   ⚠ `window.GT = ...` AND NOT `const GT`. A `const` at the top level of a
   Runtime.evaluate persists in that execution context, so the SECOND probe of
   a session throws "Identifier 'GT' has already been declared" - which reads
   like the page is broken. Reassignment is free.
   ═══════════════════════════════════════════════════════════════════════ */
window.GT = (function () {

  const $$ = s => [].slice.call(document.querySelectorAll(s));
  const R = e => { const r = e.getBoundingClientRect();
    return { w: +r.width.toFixed(1), h: +r.height.toFixed(1),
             t: +r.top.toFixed(1), l: +r.left.toFixed(1),
             b: +r.bottom.toFixed(1), r: +r.right.toFixed(1) }; };
  const vis = e => { const c = getComputedStyle(e);
    return c.display !== 'none' && c.visibility !== 'hidden' &&
           (e.offsetParent || c.position === 'fixed'); };

  /* the transform chain an element actually renders under. #231's own note:
     `#bGrid` is inside a camera, so a raw fontSize lies in both directions.
     ⚠ Math.hypot(a,b), never matrix.a alone - a mirrored element reads -1 and
     a rotated one reads 0. */
  const scaleOf = el => { let s = 1, e = el;
    while (e && e !== document.documentElement) {
      const m = new DOMMatrixReadOnly(getComputedStyle(e).transform);
      s *= Math.hypot(m.a, m.b) || 1; e = e.parentElement; }
    return s; };

  /* ── ui-scales.md §5, both counters, camera-aware ──────────────────── */
  function floor(min) {
    min = min || 10;
    const S = scaleOf(document.getElementById('stage')) || 1;
    return $$('#stage *').filter(e => {
      if (!vis(e)) return false;
      const f = parseFloat(getComputedStyle(e).fontSize);
      return f > 0 && f * (scaleOf(e) / S) < min && (e.textContent || '').trim();
    }).map(e => e.tagName + '.' + e.className + '#' + e.id);
  }
  function clip() {
    const bad = [];
    for (const e of document.querySelectorAll('#stage *')) {
      const c = getComputedStyle(e);
      if (!vis(e)) continue;
      /* a hex is overflow:visible by design and a scroller is auto by design */
      if (c.overflow === 'visible' && c.overflowX === 'visible' && c.overflowY === 'visible') continue;
      if (c.overflow === 'auto' || c.overflowY === 'auto') continue;
      if (e.scrollWidth - e.clientWidth > 1 || e.scrollHeight - e.clientHeight > 1)
        bad.push(e.tagName + '.' + e.className + '#' + e.id);
    }
    return bad;
  }

  /* ⛔ #230's probe, and the one the two counters above are BLIND to: a flex
     column that runs out of room SHRINKS a child, and a fixed-height
     grandchild inside it then PAINTS OVER the next block instead of clipping.
     Every gate reads 0 while it happens. Walk the descendants, not the rect. */
  function overlap(id) {
    const box = document.getElementById(id); if (!box) return ['no #' + id];
    const kids = [].slice.call(box.children), bad = [];
    for (let i = 1; i < kids.length; i++) {
      const pr = kids[i - 1].getBoundingClientRect(), cr = kids[i].getBoundingClientRect();
      const pb = Math.max(pr.bottom, ...[].slice.call(kids[i - 1].querySelectorAll('*'))
        .map(e => e.getBoundingClientRect().bottom).concat([pr.bottom]));
      if (pb - cr.top > 0.5)
        bad.push((kids[i - 1].id || kids[i - 1].className) + ' over ' +
                 (kids[i].id || kids[i].className) + ' by ' + (pb - cr.top).toFixed(1));
    }
    return bad;
  }

  /* how much room a fixed-height flex column has left, and what is in it */
  function slack(id) {
    const box = document.getElementById(id); if (!box) return null;
    const kids = [].slice.call(box.children), cs = getComputedStyle(box);
    const content = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const used = kids.reduce((s, k) => s + k.getBoundingClientRect().height, 0) +
      (kids.length - 1) * parseFloat(cs.rowGap || 0);
    return { slack: +(content - used).toFixed(1), scroll: box.scrollHeight - box.clientHeight,
             gap: cs.rowGap, overlap: overlap(id),
             kids: kids.map(k => (k.id || k.className) + ':' +
               k.getBoundingClientRect().height.toFixed(1)) };
  }

  /* ── the company sheet: every body, every state #230 named ───────────── */
  function eachBody(fn) {
    openInv();
    const outp = [];
    G.party.forEach(p => {
      const sp = p.statPoints, mk = p.mark;
      [['clean', 0, null], ['+point', 1, null], ['circle', 0, 'circle'], ['both', 1, 'circle']]
        .forEach(c => {
          /* ⚠ RESET AT THE TOP OF EVERY CASE. A flag left behind by the
             previous measurement is this file's oldest trap (#230). */
          p.statPoints = c[1]; p.mark = c[2];
          iSel = p.id; drawInv();
          outp.push({ id: p.id, cls: p.cls, state: c[0], m: fn ? fn(p) : slack('iChar') });
        });
      p.statPoints = sp; p.mark = mk;
    });
    iSel = 'you'; drawInv();
    return outp;
  }

  /* ── the battlefield ─────────────────────────────────────────────────── */

  /* jump to one of YOUR bodies without playing three enemy turns to get there */
  function playerTurn(id) {
    const i = B.order.findIndex(x => x.side === 'you' && !x.ally && !x.pet &&
                                     (!id || x.id === id));
    if (i < 0) return null;
    B.idx = i; beginTurn(); return cur();
  }
  /* stand a body on a free hex beside another, so a reach-1 act is legal */
  function standNextTo(u, f) {
    const n = nbrs(f.col, f.row).find(p => !at(p[0], p[1]));
    if (n) { u.col = n[0]; u.row = n[1]; }
    return n;
  }
  const nearestFoe = u => B.units.filter(x => x.side === 'foe' && !x.dead)
    .sort((a, b) => udist(u, a) - udist(u, b))[0];

  /* MOVE is the standing selection (#91); this is what a fresh turn looks like */
  function moveInHand(u) {
    B.sel = u.acts.find(a => a.move) || null;
    B.reach = reachMap(u, moveBudget(u));
    render();
    return B.sel;
  }
  /* the pointer over ground this step would be paid for: `aiming` on, so the
     parting-swing price and the red pulse are both up */
  function aimAtLit() {
    const lit = document.querySelector('#bGrid .hex.lit');
    if (lit) handOn(lit.dataset.k);
    return lit && lit.dataset.k;
  }

  /* ⚠ `nerveFrac` LIFTS the rung a body reads at, so setting morale to a
     band's `at` does NOT land on that band. Drive it until `ladderAt` agrees. */
  function rung(u, want) {
    u.morale = Math.round(u.moraleMax * 0.5);
    let g = 0;
    while (ladderAt(u) !== want && g++ < 400) u.morale += (ladderAt(u) > want ? 1 : -1);
    return ladderAt(u);
  }

  const hexOf = u => document.querySelector('#bGrid [data-k="' + K(u.col, u.row) + '"]');
  /* design px per screen px on the board, for measuring anything on a hex */
  const hexUnit = () => { const h = document.querySelector('#bGrid .hex');
    return h ? h.getBoundingClientRect().width / 37 : 1; };

  const shown = sel => $$(sel).filter(vis);

  return { $$: $$, R: R, vis: vis, shown: shown, scaleOf: scaleOf,
           floor: floor, clip: clip, overlap: overlap, slack: slack, eachBody: eachBody,
           playerTurn: playerTurn, standNextTo: standNextTo, nearestFoe: nearestFoe,
           moveInHand: moveInHand, aimAtLit: aimAtLit, rung: rung,
           hexOf: hexOf, hexUnit: hexUnit };
})();
