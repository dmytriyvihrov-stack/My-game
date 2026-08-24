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
  /* ⚠ 8f.266 - THE WINDOW IS THE OUTERMOST 20 DESIGN PX AND NOT 60, and the
     reason is worth keeping: a HUGE tree standing on column 0 is drawn from
     the hex centre with a canopy and a root spread far wider than its tile,
     and it arrives as an IMAGE whose `onload` repaints the whole ground. A
     sample window a sprite can bleed into reports the apron as unstable when
     what moved was a tree in the field. */
  const band = () => { const d = ctx.getImageData(0, 200, 40, 600).data;
    let h = 0; for (let i = 0; i < d.length; i += 5) h = (h * 31 + d[i]) % 1e9; return h; };
  /* ⚠ WARM UP FIRST. The ground's trees and rocks are IMAGES and every
     `onload` repaints the whole canvas, so the first sample on a fresh page is
     a race and not a measurement: this probe read "unstable" three times on a
     build whose apron a full-canvas pixel diff (diff243.js) called identical. */
  paintTerrain();
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
