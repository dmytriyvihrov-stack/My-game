/* #243 - IS THE PAINT WHERE THE TILE IS. The user: "async of textures of map
   and actual options of turn ... maybe it was hardcoded before".

     python tools/dev/gt.py eval align243.js

   Three questions, all in board px so the camera cannot flatter any of them:
     paintVsTile   the drawing coordinate of a hex's DOM centre, against the
                   hexCentre() the painter placed that hex's tuft/rock from.
                   Expect 0,0 on every hex or every feature is off its tile.
     tintVsGround  the STATE tint (.hfill, the red/amber wash that says what
                   this turn can do) against the GROUND hexagon (.hedge).
                   Two different boxes would be exactly the "async" reported.
     litEdge       the same for a hex the move preview has lit. */
(() => {
  startBattle('brigand');
  const u = GT.playerTurn();
  GT.moveInHand(u);
  const G0 = document.getElementById('bGround'), g = document.getElementById('bGrid'),
        cv = document.getElementById('bTerrain');
  G0.style.transition = 'none'; camSet(1); camApply(true);
  const A = typeof apronOf === 'function' ? apronOf(G0) : { l: 0, t: 0, r: 0, b: 0 };
  /* ⚠ THE ORIGIN COMES OFF `apronCv()` AND IS NOT RE-DERIVED HERE. The first
     cut of this probe worked the offset out from the apron by hand, got it
     wrong by exactly one apron, and reported a constant 114,32 delta on a
     build where the paint was right - a probe that reproduces the bug it is
     testing for is worth nothing. `ox`/`oy` is where drawing (0,0) sits in the
     bitmap, which is the one number both the element and the painter use. */
  const O = typeof apronCv === 'function' ? apronCv() : { ox: A.l, oy: A.t };
  const cr = cv.getBoundingClientRect(), cw = parseFloat(getComputedStyle(cv).width);
  const sc = cr.width / cw;                       /* screen px per design px */
  /* a screen point in the painter's own drawing coordinates */
  const draw = (x, y) => ({ x: +((x - cr.left) / sc - O.ox).toFixed(2),
                            y: +((y - cr.top) / sc - O.oy).toFixed(2) });
  const cell = k => { const h = g.querySelector('[data-k="' + k + '"]'); if (!h) return null;
    const r = h.getBoundingClientRect(); return draw((r.left + r.right) / 2, (r.top + r.bottom) / 2); };

  const out = { apron: A, canvasCss: cw + 'x' + parseFloat(getComputedStyle(cv).height),
                bitmap: cv.width + 'x' + cv.height, scale: +sc.toFixed(3) };
  out.paintVsTile = ['0,0', '7,0', '14,0', '0,6', '7,6', '14,6', '0,12', '7,12', '14,12']
    .map(k => { const c = k.split(',').map(Number), p = cell(k), q = hexCentre(c[0], c[1]);
      return k + ': dom ' + p.x + ',' + p.y + '  paint ' + q.x + ',' + q.y +
             '  delta ' + (p.x - q.x).toFixed(2) + ',' + (p.y - q.y).toFixed(2); });

  const box = (h, sel) => { const e = sel ? h.querySelector(sel) : h;
    if (!e) return null; const r = e.getBoundingClientRect(), z = CAMS[CAM.i].z;
    return { w: +(r.width / z).toFixed(1), h: +(r.height / z).toFixed(1),
             x: +(r.left / z).toFixed(1), y: +(r.top / z).toFixed(1) }; };
  const one = k => { const h = g.querySelector('[data-k="' + k + '"]'); if (!h) return k + ': gone';
    const H = box(h), E = box(h, '.hedge'), F = box(h, '.hfill'), I = box(h, '.hin');
    return { k: k, cls: h.className, hex: H, hedge: E, hin: I, fill: F,
             fillOffTile: F && E ? [+(F.x - E.x).toFixed(1), +(F.y - E.y).toFixed(1)] : null,
             fillSize: F && E ? [+(F.w - E.w).toFixed(1), +(F.h - E.h).toFixed(1)] : null }; };
  out.tintVsGround = one(K(u.col, u.row));
  const lit = g.querySelector('.hex.lit');
  out.litEdge = lit ? one(lit.dataset.k) : 'no lit hex';
  const foe = GT.nearestFoe(u);
  out.foeTile = one(K(foe.col, foe.row));
  return out;
})()
