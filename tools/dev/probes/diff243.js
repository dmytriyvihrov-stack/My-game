/* 8f.266 - WHERE does a repaint differ. Snapshot, repaint, snapshot, and
   report the bounding box of the pixels that changed, in DRAWING coords. */
(() => {
  startBattle('brigand');
  GT.playerTurn();
  const cv = document.getElementById('bTerrain'), ctx = cv.getContext('2d');
  const O = apronCv(), DPR = cv.width / (parseFloat(getComputedStyle(cv).width));
  const grab = () => ctx.getImageData(0, 0, cv.width, cv.height).data;
  const boxOf = (a, b) => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0;
    for (let i = 0; i < a.length; i += 4) {
      if (a[i] !== b[i] || a[i+1] !== b[i+1] || a[i+2] !== b[i+2] || a[i+3] !== b[i+3]) {
        const p = (i / 4) | 0, x = p % cv.width, y = (p / cv.width) | 0;
        n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    return n ? { pixels: n, drawX: [(x0 / DPR - O.ox).toFixed(1), (x1 / DPR - O.ox).toFixed(1)],
                 drawY: [(y0 / DPR - O.oy).toFixed(1), (y1 / DPR - O.oy).toFixed(1)] } : 'identical';
  };
  const a = grab(); paintTerrain();
  const b = grab(); paintTerrain();
  const c = grab();
  return { play: [PLAY_W, PLAY_H], apron: APR, bleed: APRON_BLEED,
           firstVsSecond: boxOf(a, b), secondVsThird: boxOf(b, c) };
})()
