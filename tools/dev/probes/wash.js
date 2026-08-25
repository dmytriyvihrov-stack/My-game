/* WHAT A WASH ON THE BOARD ACTUALLY LOOKS LIKE, sampled rather than argued.

     python tools/dev/gt.py eval wash.js

   Every hex tint in this game is a translucent colour laid over a PAINTED ground,
   so what the player sees is a composite and the alpha in `REACH_WASH` is only half
   of it. This reads the ground colour out of `#bGround`'s own canvas under a real
   hex, composites each candidate src-over, and prints the luminance - which is the
   one number that says whether two washes can be told apart.

   ⛔ IT EXISTS BECAUSE THE OBVIOUS DIRECTION WAS THE WRONG ONE. #249 was asked to
   make the near half of a stride *"a bit darker"* so the two zones would separate;
   measured, a darker near wash walks TOWARDS the far one (80 -> 74 against the far
   half's 72) and one step further inverts it. Lighter separated them. Nothing on
   screen says that, and no screenshot of a randomly generated board says it either.
   ⚠ `seededly` WRAPS `startBattle` so two runs get the same field. Without it the
   terrain rerolls and the sampled ground is a different colour every time.

   Reads the shipped values and a candidate list; edit the list, not the build. */
(() => {
  seededly(()=>startBattle('brigand'));
  const i = B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  if(i>=0){B.idx=i;beginTurn();}
  const u = cur();
  B.sel = u.acts.find(a=>a.move);
  B.reach = reachMap(u,moveBudget(u));
  B.reach2 = reachMap(u,moveBudget(u)+moveBudget2(u));
  render();
  const gr = document.getElementById('bGround');
  const cv = gr && gr.tagName === 'CANVAS' ? gr : (gr && gr.querySelector('canvas'));
  if(!cv) return {err:'no ground canvas', ground: gr && gr.tagName, kids: gr && [].slice.call(gr.children).map(k=>k.tagName+'.'+k.className)};
  const cx = cv.getContext('2d');
  const grb = cv.getBoundingClientRect();
  const px = el => {                       /* the ground colour under a hex centre */
    const r = el.getBoundingClientRect();
    const x = Math.round((r.left + r.width/2 - grb.left) * cv.width / grb.width);
    const y = Math.round((r.top + r.height/2 - grb.top) * cv.height / grb.height);
    const d = cx.getImageData(x, y, 1, 1).data;
    return [d[0], d[1], d[2]];
  };
  const comp = (base, wash) => {
    const n = wash.replace(/[a-z()]/g,'').split(',').map(Number);
    const a = n.length > 3 ? n[3] : 1;
    return base.map((c,j) => Math.round(c*(1-a) + n[j]*a));
  };
  const lum = c => Math.round(0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]);
  const hexes = GT.$$('#bGrid .hex');
  const near = hexes.filter(h=>h.classList.contains('lit') && !h.classList.contains('lit2'));
  const far  = hexes.filter(h=>h.classList.contains('lit2'));
  const none = hexes.filter(h=>!h.classList.contains('lit') && !h.classList.contains('blocked'));
  const pick = a => a.filter(h=>{const t=(h.getAttribute('aria-label')||'');return /^dry|^grass|^plain/.test(t);})[0] || a[0];
  const out = {};
  [['near',near],['far',far],['none',none]].forEach(([k,a])=>{
    const h = pick(a); if(!h) return;
    out[k] = {terrain:(h.getAttribute('aria-label')||'').split(' ')[0], ground: px(h)};
  });
  const g = out.none && out.none.ground;
  const table = w => g ? {rgb: comp(g, w), lum: lum(comp(g, w))} : null;
  return {sample: out, groundLum: g && lum(g),
    now: {near: table(REACH_WASH.dry), far: table(REACH_WASH.dry2)},
    cand: ['rgba(110,180,160,.17)','rgba(110,180,160,.24)','rgba(110,180,160,.30)',
           'rgba(110,180,160,.34)','rgba(110,180,160,.38)','rgba(110,180,160,.44)',
           'rgba(46,112,104,.46)','rgba(28,74,70,.55)']
          .map(w=>w+' -> lum '+(table(w)||{}).lum)};
})()
