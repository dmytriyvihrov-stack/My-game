/* #273 - the road chip took the zoom row's corner. What has to be true:
   the row is gone, the chip is in the map and clears every neighbour, the
   WHEEL still zooms (it is now the only way), the drag still pans, and the
   hover survived leaving the two bars that used to bind it. */
(() => {
  const R = e => e && e.getBoundingClientRect();
  const out = {};
  G.party.length = 0; ARENA.COMPS.prepared().forEach(p => G.party.push(p));
  enterWorld();
  ['tutDim', 'tutCard'].forEach(id => { const e = $(id); if (e) e.remove(); });
  G.deeds = { evil: 3 }; roadStrip();

  out.zoomGone = !$('wZoom');
  out.chipParent = $('wRoad') ? $('wRoad').parentElement.id : null;

  /* ── the corner, against every neighbour #220 and #226 measured ─────── */
  const box = id => { const e = $(id); if (!e) return null; const r = R(e);
    return { y: Math.round(r.top) + '..' + Math.round(r.bottom),
             x: Math.round(r.left) + '..' + Math.round(r.right),
             h: Math.round(r.height) }; };
  out.corner = { road: box('wRoad'), menu: box('menuBtn'),
                 stamp: box('buildTag'), tester: box('winBtn') };
  /* nothing in that corner may touch the chip */
  const r = R($('wRoad'));
  out.collisions = ['menuBtn', 'buildTag', 'winBtn', 'wQuest', 'wPlaque']
    .filter(id => $(id) && R($(id)).width)
    .filter(id => { const a = R($(id));
      return a.right > r.left + .5 && a.left < r.right - .5 &&
             a.bottom > r.top + .5 && a.top < r.bottom - .5; });

  /* ── the wheel is now the ONLY zoom, so it must work in three places ── */
  const notch = (el, dy) => { const was = WCAM.i;
    el.dispatchEvent(new WheelEvent('wheel', { deltaY: dy, bubbles: true, cancelable: true }));
    const now = WCAM.i; return was + '->' + now; };
  WCAM.i = 1; wcamApply();
  out.wheel = {
    overMap: notch($('wMap'), -100),          /* expect a step */
    overChip: notch($('wRoad'), 100),         /* must NOT be a dead patch */
    overCard: (() => { $('wDlg').classList.add('on');
      const s = notch($('wDlg'), -100); $('wDlg').classList.remove('on');
      return s + ' (must not move)'; })()
  };
  out.stopsIntact = WCAMS.map(c => c.k + ':' + c.z).join(' ');

  /* ── the drag still pans, and does NOT start on the chip ───────────── */
  const press = el => { WPAN = null;
    el.dispatchEvent(new PointerEvent('pointerdown',
      { button: 0, bubbles: true, cancelable: true, clientX: 600, clientY: 300 }));
    return !!WPAN; };
  WCAM.i = 2; wcamApply();                    /* CLOSE, so the map can pan */
  out.drag = { fromMap: press($('wMap')), fromChip: press($('wRoad')) };
  WPAN = null; WCAM.i = 1; wcamApply();

  /* ── the hover, which the two-bar selector would have dropped ──────── */
  const el = $('wRoad');
  out.hoverBound = typeof el.onmouseenter === 'function';
  el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, clientX: 1200, clientY: 60 }));
  const t = $('gtTip'), tr = R(t);
  out.tip = { size: Math.round(tr.width) + 'x' + Math.round(tr.height),
              over: (t.scrollWidth - t.clientWidth) + ',' + (t.scrollHeight - t.clientHeight),
              offscreen: tr.right > innerWidth || tr.bottom > innerHeight,
              says: (t.textContent || '').slice(0, 60) };
  t.style.display = 'none';

  out.floor = GT.floor();
  out.clip = GT.clip();
  G.deeds = {}; roadStrip();
  return out;
})()
