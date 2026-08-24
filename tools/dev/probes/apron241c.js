/* #241 - is the apron where it says it is, and did anything start clipping.

     python tools/dev/gt.py eval apron241c.js

   `align` is the proof that the painted band and the padded box are one thing:
   hex 0,0's own screen rect against the ground box's corner must be the apron,
   times the camera's zoom, and the canvas must start one apron further out.
   ⚠ Run it against `git show HEAD:` in a second browser and diff. A raw clip
   count means nothing; the DIFFERENCE is the finding. */
(() => {
  startBattle('brigand');
  GT.playerTurn();
  const G0 = document.getElementById('bGround'), g = document.getElementById('bGrid'),
        cv = document.getElementById('bTerrain');
  G0.style.transition = 'none';
  const out = {};
  const A = typeof apronOf === 'function' ? apronOf(G0) : { l: 0, r: 0, t: 0, b: 0 };
  out.apron = A;

  out.align = [0, 1, 2].map(i => { camSet(i);
    const z = CAMS[i].z, gd = G0.getBoundingClientRect(),
          h0 = g.querySelector('[data-k="0,0"]').getBoundingClientRect(),
          cr = cv.getBoundingClientRect();
    return { stop: CAMS[i].k,
      /* the play area's corner, in board px off the ground box's corner */
      hexInset: [+((h0.left - gd.left) / z).toFixed(1), +((h0.top - gd.top) / z).toFixed(1)],
      /* the canvas's corner, same units: one apron out, and 10 above (#105) */
      canvasInset: [+((cr.left - gd.left) / z).toFixed(1), +((cr.top - gd.top) / z).toFixed(1)],
      canvasSize: [+(cr.width / z).toFixed(0), +(cr.height / z).toFixed(0)],
      groundSize: [gd.width / z | 0, gd.height / z | 0] };
  });

  camSet(1);
  out.clip = GT.clip();
  out.floor = GT.floor();
  out.lint = typeof LINT === 'function' ? LINT() : 'no LINT';
  /* the ground under the field must be painted, not transparent: read a pixel
     from the middle of the left apron band and one from the middle of the field */
  const ctx = cv.getContext('2d'), DPR = cv.width / (cv.getBoundingClientRect().width / CAMS[1].z);
  const px = (x, y) => { const d = ctx.getImageData(Math.round((x + A.l) * DPR),
    Math.round((y + A.t) * DPR), 1, 1).data; return [d[0], d[1], d[2], d[3]].join(','); };
  out.pixels = { farLeftRim: px(-A.l + 6, 200), innerLeft: px(-8, 200),
                 field: px(294, 200), belowField: px(294, 426 + A.b - 6) };
  return out;
})()
