/* the standing gates, on the three screens that have them, in one round trip.

     python tools/dev/gt.py eval gates.js

   Expected: `lint` 0 · every `floor` [] · `sheetOverlap` [] · map 0/0/0 ·
   `cards.emdash` false · `cards.noIco` 0.
   ⚠ `battle.clip` is NOT expected to be empty. `#bField`, `#bLog` and
   `#bTrait` are the documented known-and-pre-existing set in
   `.claude/rules/ui-scales.md` §5; `#bTrait` is a deliberate line-clamp and
   only reports on a body that HAS a trait. Anything else in that list is the
   finding. */
(() => {
  const o = { lint: LINT().findings };

  openInv();
  o.sheet = { floor: GT.floor(), clip: GT.clip() };
  o.sheetOverlap = GT.overlap('iChar');

  startBattle('brigand');
  GT.playerTurn();
  render();
  o.battle = { floor: GT.floor(), clip: GT.clip() };

  show('world');
  if (typeof drawMap === 'function') drawMap();
  o.map = {
    spacing: typeof spacingViolations === 'function' ? spacingViolations().length : 'n/a',
    label: typeof labelViolations === 'function' ? labelViolations().length : 'n/a',
    orphans: Object.entries(MAP_SIGHT).filter(([k, v]) => !MAP_ART[v]).length,
  };

  o.cards = {
    emdash: /—/.test(JSON.stringify(EVENTS)),
    noIco: Object.values(EVENTS).flatMap(e => e.choices).filter(c => !c.ico || !c.ico.length).length,
    mystery: Object.values(EVENTS).flatMap(e => e.choices).filter(c => c.mystery).length,
  };
  return o;
})()
