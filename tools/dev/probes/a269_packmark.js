/* #269 ask 15 - which hexes carry the aura mark, and how far they are from her. */
(function(){
  startBattle('pack');
  render();
  const bitch=B.units.filter(u=>u.aura)[0];
  const out={bitch:bitch&&bitch.name,r:bitch&&bitch.aura.r,marks:[],badges:[]};
  B.units.filter(u=>!u.dead).forEach(u=>{
    const h=GT.hexOf(u);
    const st=statusesOn?statusesOn(u).map(s=>s.n+'/'+s.g).join(','):'?';
    const badge=h?[].slice.call(h.querySelectorAll('.stbar *,.stb,.stat')).map(e=>e.textContent).join(''):'';
    out.marks.push(u.name+' side='+u.side+' d='+(bitch?udist(u,bitch):'-')+' statuses=['+st+']'+
      (badge?' badge='+badge:''));
  });
  /* every star-looking glyph actually painted on the grid */
  out.painted=GT.$$('#bGrid *').filter(e=>e.children.length===0&&/[\u2735\u273b\u2733\u2734\u273a\u2739]/.test(e.textContent))
    .map(e=>e.textContent.trim()+'@'+((e.closest('.hex')||{dataset:{}}).dataset.k||'-')+'.'+e.className);
  return out;
})()
