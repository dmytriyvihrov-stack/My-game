/* #236 - the five asks, each measured rather than read.
     1 the damage figure is off the body and the odds took its slot
     2 the bar band is a range: solid = min, hatched = the window to max
     5 the gear hover says the tier and where the thing belongs
     6 no epic armour and no stave is FOUND until the road is past clash
     7 Marrow's off hand is empty
   plus: LINT 8g is proved by making it fire. */
(() => {
  const o = {};

  /* ── 7 · the founders ─────────────────────────────────────────────── */
  const m = G.party.find(p => p.id === 'marrow');
  o.a7 = { marrowOff: m ? m.eq.off : 'no marrow', main: m && m.eq.main,
           focusStillInGame: !!GEAR.focus, inArmoury: ARMOURY.some(r => r[0] === 'focus') };

  /* ── 5 · the hover ────────────────────────────────────────────────── */
  const strip = h => h.replace(/<[^>]*>/g, '|').replace(/\|+/g, '|');
  o.a5 = ['pot', 'maul', 'rod', 'bone', 'plate', 'panlid'].map(k => {
    const h = tipFor(k, G.party[0]);
    const line = h.split('margin-bottom:4px">')[1] || '';
    return k + ' -> ' + strip(line.split('</div>')[0]).replace(/^\|/, '');
  });
  /* the tier word must be the one renderer's, and coloured */
  o.a5colours = ['pot', 'mail', 'plate'].map(k =>
    k + ' ' + (tipFor(k, G.party[0]).match(/color:(#[0-9a-f]{6})">[A-Z]+</i) || [])[1]);

  /* ── 6 · the find gate, driven at three points on the road ────────── */
  const held = k => findPool(GEAR[k].rarity, null, true).indexOf(k) >= 0;
  const snap = () => ({ plate: held('plate'), ogrescale: held('ogrescale'),
                        rod: held('rod'), mail: held('mail'), sword: held('sword') });
  const at0 = G.at, vis0 = JSON.parse(JSON.stringify(G.visited || {}));
  G.visited = {}; G.at = 'hold';           o.a6_before = snap();
  G.visited = { clash: true }; G.at = 'clash'; o.a6_onClash = snap();
  G.visited = { clash: true }; G.at = 'vill';  o.a6_after = snap();
  /* and 200 rolls out of the second fight may never produce one */
  G.visited = {}; G.at = 'hold';
  const bad = {}; for (let i = 0; i < 400; i++) { const k = rollFind('battle');
    if (k && ((GEAR[k].slot === 'armour' && GEAR[k].rarity === 'epic') || GEAR[k].spellRange)) bad[k] = (bad[k] || 0) + 1; }
  o.a6_rolls400_blocked = bad;
  G.at = at0; G.visited = vis0;

  /* ── 8g · prove the new LINT check by making it fire ────────────────
     ⚠ NOT by deleting the node: EDGES still names it and `labelViolations`
     throws on the way past, which takes the whole of LINT() with it and proves
     nothing. Handing it a road-set with one road that misses `clash` fires the
     branch that actually matters - a gate on a node only SOME companies walk. */
  const realRoads = window.allRoads;
  window.allRoads = () => [['hold', 'clash', 'vill'], ['hold', 'vill']];
  o.lint8g_fires = LINT().items.filter(f => f.where === 'earlyFind').map(f => f.what);
  window.allRoads = realRoads;
  o.lint8g_silent = LINT().items.filter(f => f.where === 'earlyFind').length;
  return o;
})()
