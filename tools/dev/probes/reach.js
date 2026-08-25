/* #248 - THE CENSUS #245 AND #247 BOTH PAID FOR BY HAND. Both entries found
   content that was BUILT and could not be REACHED, and both found it because a
   human said "I have never seen X". This asks the same question of every table
   that maps a key to a thing, in one round trip. Nothing here is a gate: a
   legitimate shipping state is common (see `.claude/rules/static-event-art.md`).
   It is a LIST TO READ. */
(() => {
  const o = {};
  const keys = t => (typeof t === 'undefined' || !t) ? [] : Object.keys(t);

  /* art keys pointing at nothing */
  o.artOrphans = {
    mapSight: keys(MAP_SIGHT).filter(k => !MAP_ART[MAP_SIGHT[k]]),
    mapPlace: keys(MAP_PLACE).filter(k => !MAP_ART[MAP_PLACE[k]]),
    jstage: keys(typeof JSTAGE !== 'undefined' ? JSTAGE : {})
              .filter(k => !(typeof JSTAGE_ART !== 'undefined' && JSTAGE_ART[JSTAGE[k]])),
    eventart: keys(typeof EVENTART !== 'undefined' ? EVENTART : {})
              .filter(k => { try { return !artFor(EVENTART[k]); } catch (e) { return 'threw'; } }),
    /* a card with no wide master: a legitimate shipping state, and the number
       #214's remainder is measured in */
    noWideStage: Object.keys(EVENTS).filter(k => !jStageFor(k)).length,
    campsNoWide: Object.keys(CAMPS).filter(k => !jStageFor(k)).length,
  };

  /* a road card nothing can deal */
  const onNode = {}, floating = (typeof FLOATING !== 'undefined' ? FLOATING : []).slice();
  Object.keys(NODES).forEach(k => { if (NODES[k].ev) onNode[NODES[k].ev] = k; });
  o.eventsUndealt = Object.keys(EVENTS).filter(k => !onNode[k] && floating.indexOf(k) < 0);

  /* a painted node key that no node can hold (LINT 8h's question, listed) */
  o.sightUnreachable = keys(MAP_SIGHT).filter(k => !onNode[k] && floating.indexOf(k) < 0);

  /* gear nothing can find, buy or start with */
  const inFind = new Set(), inStart = new Set();
  try { (typeof findPool === 'function' ? findPool() : []).forEach(k => inFind.add(k)); } catch (e) {}
  o.gear = { total: Object.keys(GEAR).length,
             noIcon: Object.keys(GEAR).filter(k => !ITEM_ICON[k]),
             unique: Object.keys(GEAR).filter(k => GEAR[k].unique).length };

  /* ⛔ a door gated on something NOTHING IN THE BUILD CAN GRANT. #248 found the
     chapel's `needMut:'gills'` this way: it is the only mutation-gated door in
     the game and `MUTATIONS_ON` has been false since #16 parked the system for
     the whole first game, so that door has never once opened for anybody. A
     gate whose key is not issued is the same defect as an unreachable node,
     one field across. */
  o.deadGates = {
    mutationsOn: typeof MUTATIONS_ON !== 'undefined' ? MUTATIONS_ON : 'n/a',
    needMutDoors: Object.entries(EVENTS).concat(Object.entries(CAMPS))
      .flatMap(([k, e]) => (e.choices || []).filter(c => c.needMut)
        .map(c => k + ' needs ' + c.needMut)),
  };

  /* item art embedded but wired to no GEAR row (the reverse orphan) */
  o.itemIconNoGear = Object.keys(typeof ITEM_ICON !== 'undefined' ? ITEM_ICON : {})
                       .filter(k => !GEAR[k]);
  return o;
})()
