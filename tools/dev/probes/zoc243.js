/* #243 ask 12 - the zone of control is one outline round the set, and the hexes
   inside it are no longer washed red. */
(() => {
  startBattle('brigand');
  const u = GT.playerTurn(); const f = GT.nearestFoe(u);
  GT.standNextTo(u, f); GT.moveInHand(u);
  const g = document.getElementById('bGrid'), gr = document.getElementById('bGround');
  const o = {};
  o.zoneHexes = [].slice.call(g.querySelectorAll('.hex')).filter(h=>{
    const p=h.dataset.k.split(',').map(Number);
    return heldAt(p[0],p[1],'you')>0;}).length;
  const svg = document.getElementById('bZoc');
  o.svg = !!svg;
  o.parentIsGround = !!svg && svg.parentElement === gr;
  o.segments = svg ? (svg.querySelector('path').getAttribute('d').match(/M/g)||[]).length : 0;
  /* the outline must be the OUTSIDE only: a set of N hexes with no shared sides
     would be 6N segments, and every shared side removes two. */
  o.max6N = o.zoneHexes*6;
  o.stroke = svg ? getComputedStyle(svg.querySelector('path')).stroke : '-';
  /* and the hexes themselves are back to plain ground */
  o.redGrounds = [].slice.call(g.querySelectorAll('.hedge'))
    .filter(e=>/150, ?40, ?45/.test(e.style.background)).length;
  o.aimingStroke = (()=>{ GT.aimAtLit();
    const s=document.getElementById('bZoc'); 
    return s?getComputedStyle(s.querySelector('path')).stroke+' / '+
      getComputedStyle(s.querySelector('path')).strokeWidth:'-';})();
  return o;
})()
