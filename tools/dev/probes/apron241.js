/* #241 - the ground beyond the field. What the chrome covers, per camera stop.

     python tools/dev/gt.py eval apron241.js

   Measures, on a real brigand field:
     ground/grid/field   the three boxes the camera arithmetic is written on
     covered             how many PLAYABLE hexes each floating control sits on
     bottomGap           screen px between the last hex row and the card band
   ⚠ THE TRANSITION IS KILLED FIRST. camApply writes a transform and #bGround
   glides for .22s, so a rect read straight after camSet is a frame of an
   animation, not the stop. */
(() => {
  startBattle('brigand');
  const u = GT.playerTurn();
  const F = document.getElementById('bField'), G0 = document.getElementById('bGround'),
        g = document.getElementById('bGrid');
  G0.style.transition = 'none';
  const CH = ['bCap', 'bTop', 'bPlq', 'bPace', 'bFlee', 'bIcons', 'bEnd', 'bUndo',
              'bActions', 'bLog', 'bZoom'];
  const out = {
    ground: G0.offsetWidth + 'x' + G0.offsetHeight,
    grid: g.offsetWidth + 'x' + g.offsetHeight,
    field: F.offsetWidth + 'x' + F.offsetHeight,
    pad: getComputedStyle(G0).padding,
    canvas: (() => { const c = document.getElementById('bTerrain'), s = getComputedStyle(c);
      return s.width + 'x' + s.height + ' at ' + s.left + ',' + s.top +
             ' bitmap ' + c.width + 'x' + c.height; })()
  };
  out.chrome = CH.map(id => { const e = document.getElementById(id);
    if (!e || !GT.vis(e)) return id + ': hidden';
    const r = GT.R(e); return id + ': ' + r.l + ',' + r.t + ' ' + r.w + 'x' + r.h; });

  /* put the acting body on the BOTTOM row, which is the case the cards cover */
  const bottom = () => { u.col = 7; u.row = ROWS - 1;
    if (at(7, ROWS - 1) && at(7, ROWS - 1) !== u) at(7, ROWS - 1).row = 0;
    B.reach = null; render(); camApply(true); };

  out.stops = [0, 1, 2].map(i => {
    camSet(i); bottom();
    const boxes = CH.map(id => document.getElementById(id))
      .filter(e => e && GT.vis(e)).map(e => ({ id: e.id, r: e.getBoundingClientRect() }));
    const cov = {};
    const hexes = [].slice.call(g.querySelectorAll('.hex'));
    hexes.forEach(h => { const r = h.getBoundingClientRect();
      boxes.forEach(b => { if (r.right > b.r.left + 1 && r.left < b.r.right - 1 &&
                               r.bottom > b.r.top + 1 && r.top < b.r.bottom - 1)
        cov[b.id] = (cov[b.id] || 0) + 1; }); });
    const fr = F.getBoundingClientRect();
    const off = hexes.filter(h => { const r = h.getBoundingClientRect();
      return r.right < fr.left || r.left > fr.right || r.bottom < fr.top || r.top > fr.bottom;
    }).length;
    const act = document.getElementById('bActions').getBoundingClientRect();
    const last = g.querySelector('[data-k="7,' + (ROWS - 1) + '"]').getBoundingClientRect();
    const first = g.querySelector('[data-k="7,0"]').getBoundingClientRect();
    return { stop: CAMS[i].k + ' z' + CAMS[i].z, covered: cov, offscreen: off,
             grid: GT.R(g), pans: camPans(),
             bottomRowVsCards: +(act.top - last.bottom).toFixed(1),
             topRowY: +first.top.toFixed(1), fieldTop: +fr.top.toFixed(1) };
  });
  camSet(1);
  return out;
})()
