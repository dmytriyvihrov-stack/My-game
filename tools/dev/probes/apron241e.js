/* #241 - the apron survives a mid-fight repaint unchanged. A boulder being
   shoved calls paintTerrain() again (terrMoved), so an apron drawn off an
   unseeded stream would reshuffle every time somebody moved a rock.
   ⚠ THE SAMPLE IS THE FAR-LEFT BAND AND NOT THE WHOLE CANVAS. The play area's
   own trees arrive as IMAGES and each one's onload calls paintTerrain again,
   so a hash taken over ground a sprite can reach reports "unstable" for a
   reason that has nothing to do with this entry. Device x 0..120 is 60 board
   px of pure apron: the nearest hex centre is 114+18 out. */
(() => {
  startBattle('brigand');
  GT.playerTurn();
  const cv = document.getElementById('bTerrain'), ctx = cv.getContext('2d');
  const band = () => { const d = ctx.getImageData(0, 200, 120, 600).data;
    let h = 0; for (let i = 0; i < d.length; i += 5) h = (h * 31 + d[i]) % 1e9; return h; };
  const a = band(); paintTerrain();
  const b = band(); paintTerrain();
  const c = band();
  /* and the same field re-seeded: a DIFFERENT battlefield must look different */
  const keep = B.terrSeed; B.terrSeed = keep + 17; paintTerrain();
  const d2 = band(); B.terrSeed = keep; paintTerrain();
  const e = band();
  return { lattice: APRON_LATTICE, apron: APR, play: [PLAY_W, PLAY_H],
           stableAcrossRepaints: a === b && b === c,
           movesWithTheSeed: d2 !== a, backAgain: e === a,
           hashes: [a, b, c, d2, e], canvasBitmap: cv.width + 'x' + cv.height };
})()
