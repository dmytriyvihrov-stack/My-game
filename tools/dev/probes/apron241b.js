/* #241 - the apron at the four edges, and what the chrome still sits on.

     python tools/dev/gt.py eval apron241b.js

   The body is walked to each rim in turn and the camera snapped onto it, which
   is the case the clamp decides. `covered` counts PLAYABLE hexes under each
   floating control; `rim` is the screen px of apron visible past the field on
   that side, which is what the chrome now has to stand on instead. */
(() => {
  startBattle('brigand');
  const u = GT.playerTurn();
  const F = document.getElementById('bField'), G0 = document.getElementById('bGround'),
        g = document.getElementById('bGrid');
  G0.style.transition = 'none';
  const CH = ['bCap', 'bTop', 'bPlq', 'bPace', 'bFlee', 'bIcons', 'bEnd', 'bActions', 'bLog', 'bZoom'];
  const put = (c, r) => { const o = at(c, r); if (o && o !== u) { o.col = 7; o.row = 6; }
    u.col = c; u.row = r; B.reach = null; render(); camApply(true); };

  const look = () => {
    const boxes = CH.map(id => document.getElementById(id))
      .filter(e => e && GT.vis(e)).map(e => ({ id: e.id, r: e.getBoundingClientRect() }));
    const cov = {};
    [].slice.call(g.querySelectorAll('.hex')).forEach(h => { const r = h.getBoundingClientRect();
      boxes.forEach(b => { if (r.right > b.r.left + 1 && r.left < b.r.right - 1 &&
                               r.bottom > b.r.top + 1 && r.top < b.r.bottom - 1)
        cov[b.id] = (cov[b.id] || 0) + 1; }); });
    const fr = F.getBoundingClientRect(), gr = g.getBoundingClientRect();
    const gd = document.getElementById('bGround').getBoundingClientRect();
    return { covered: cov,
             rim: { l: +(gr.left - Math.max(gd.left, fr.left)).toFixed(0),
                    r: +(Math.min(gd.right, fr.right) - gr.right).toFixed(0),
                    t: +(gr.top - Math.max(gd.top, fr.top)).toFixed(0),
                    b: +(Math.min(gd.bottom, fr.bottom) - gr.bottom).toFixed(0) } };
  };

  const out = {};
  [1, 2].forEach(i => { camSet(i);
    const at4 = {};
    [['top', 7, 0], ['bottom', 7, ROWS - 1], ['left', 0, 6], ['right', COLS - 1, 6]]
      .forEach(c => { put(c[1], c[2]); at4[c[0]] = look(); });
    out[CAMS[i].k] = at4; });

  /* the ground box, and the play area inside it */
  camSet(1); put(7, 6);
  out.boxes = { ground: G0.offsetWidth + 'x' + G0.offsetHeight,
                play: g.offsetWidth + 'x' + g.offsetHeight,
                apron: JSON.stringify(typeof apronOf==='function'?apronOf(G0):'none') };
  /* the deck of hexes is the size it was: the apron adds none. `deck` and not
     `field`, because CAMS[1] is called 'field' and would be overwritten. */
  out.deck = { COLS: COLS, ROWS: ROWS, hexes: g.querySelectorAll('.hex').length,
               dataK: g.querySelectorAll('[data-k]').length };
  return out;
})()
