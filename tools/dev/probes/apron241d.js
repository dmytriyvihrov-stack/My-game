/* #241 - the hand-driven camera against the new clamp, and the fx anchor.

     python tools/dev/gt.py eval apron241d.js

   `push` drives camNudge past the rim in both directions and reads back where
   it settled: at a panning stop it must stop with the GROUND box's corner on
   the view's corner (tx 0 / VW-w), which is what "never shows off-board
   emptiness" now means with an apron on the board. At FULL nothing may move.
   `span` is the one number every effect radius is measured from. */
(() => {
  startBattle('brigand');
  GT.playerTurn();
  const G0 = document.getElementById('bGround'), F = document.getElementById('bField');
  G0.style.transition = 'none';
  const A = apronOf(G0), out = { apron: A };
  out.push = [0, 1, 2].map(i => { camSet(i);
    const z = CAMS[i].z, VW = F.offsetWidth, VH = F.offsetHeight,
          w = G0.offsetWidth * z, h = G0.offsetHeight * z;
    camNudge(9e4, 9e4); const tl = [+CAM.tx.toFixed(1), +CAM.ty.toFixed(1)];
    camNudge(-9e4, -9e4); const br = [+CAM.tx.toFixed(1), +CAM.ty.toFixed(1)];
    return { stop: CAMS[i].k, pans: camPans(),
             topLeftStop: tl, wantTL: camPans() ? [0, 0] : tl,
             bottomRightStop: br,
             wantBR: camPans() ? [+(VW - w).toFixed(1), +(VH - h).toFixed(1)] : br };
  });
  camSet(1); camApply(true);
  out.span = [0, 1, 2].map(i => { camSet(i);
    return CAMS[i].k + ': ' + hexSpan().toFixed(1) + ' want ' + (38 * CAMS[i].z).toFixed(1); });
  camSet(1);
  return out;
})()
