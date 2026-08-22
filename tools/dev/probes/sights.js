/* which map nodes still draw no painting, keyed the way sightFor keys them */
(() => {
  const rows = Object.keys(NODES).map(k => {
    const n = NODES[k];
    return { node: k, name: n.n, t: n.t, ev: n.ev || '(none)',
             sight: (n.ev && MAP_SIGHT[n.ev]) || null, drawn: !!sightFor(n) };
  });
  const evs = {};
  rows.forEach(r => { if (!r.drawn) (evs[r.ev] = evs[r.ev] || []).push(r.node + ' "' + r.name + '" [' + r.t + ']'); });
  return { nodesWithNoPainting: rows.filter(r => !r.drawn).length,
           byEvent: evs,
           mapSightKeys: Object.keys(MAP_SIGHT).length,
           orphanMappings: Object.entries(MAP_SIGHT).filter(([k, v]) => !MAP_ART[v]).map(e => e[0]) };
})()
