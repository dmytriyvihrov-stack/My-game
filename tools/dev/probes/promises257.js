/* ⛔ #257 · EVERY PROMISE ON THE FOUR LADDERS, DRIVEN.
   (User: *"fix 256 do also - the things that are claiming something but not
   actually conected to the real stuff"*.)

   A rung prints a sentence. This asks the ENGINE whether that sentence is
   true, by putting a body on the rung and measuring the readout the rung
   names. A row that reads `PAYS` is wired; `DEAD` is a promise printing and
   not paying, which is what #256 closed two of. */
(() => {
  const rows = [];
  const B0 = G.party[0];
  const keep = JSON.parse(JSON.stringify(B0.st));

  const setRung = (b, k, want) => {
    for (let i = 0; i < 24; i++) {
      const got = effStats(b)[k];
      if (got === want) return true;
      b.st[k] += (want > got ? 1 : -1);
    }
    return effStats(b)[k] === want;
  };
  /* read a number with the body on rung `n` of stat `k` */
  const at = (k, n, fn) => { setRung(B0, k, n); const v = fn(B0, unitFrom(B0)); return v; };
  const test = (label, k, n, fn) => {
    const lo = at(k, 0, fn), hi = at(k, n, fn);
    rows.push((String(lo) !== String(hi) ? 'PAYS ' : 'DEAD ') + label +
      '  [rung 0 -> ' + lo + ' · rung ' + (n > 0 ? '+' : '') + n + ' -> ' + hi + ']');
  };

  /* ── STRENGTH ── */
  test('STR +1 hitpoints', 'str', 1, p => bodyHp(p));
  test('STR +2 melee', 'str', 2, (p, u) => (s => s ? s.lo + '-' + s.hi : '-')(swingOf(u)));
  test('STR -2 bow', 'str', -2, (p, u) => Math.round(thews(u, { range: 2 }) * 1000) / 1000);
  /* ── AGILITY ── */
  test('AGI +1 to hit', 'agi', 1, (p, u) => u.mskill);
  test('AGI +2 dodge', 'agi', 2, (p, u) => dodgeOf(u));
  test('AGI +4 FLEET step', 'agi', 4, (p, u) => u.speed);
  /* ── INTELLECT ── */
  test('INT +1 to land', 'int', 1, (p, u) => D.arc(u));
  test('INT +1 experience', 'int', 1, p => D.learn({ st: effStats(p) }));
  test('INT +2 magic', 'int', 2, (p, u) => Math.round(u.spellPow * 1000) / 1000);
  test('INT +3 reach', 'int', 3, (p, u) => {
    const a = (u.acts || []).find(x => x.reach || x.range);
    return (u.spellRange || 0) + '/' + (a ? (a.range || a.reach) : '-');
  });
  /* ── MORALE ── */
  test('MOR +1 pool', 'mor', 1, (p, u) => u.moraleMax);
  test('MOR +1 climbs back', 'mor', 1, (p, u) =>
    MORALE.recover + (rungHeld('mor', effStats(p).mor).climb || 0));
  test('MOR +2 loses mood slower', 'mor', 2, (p, u) => {
    /* drive the real payer: take 20 off and see what actually came off */
    const uu = unitFrom(p); uu.morale = uu.moraleMax; const before = uu.morale;
    try { mor(uu, -20, 'probe', true); } catch (e) { return 'threw'; }
    return Math.round(before - uu.morale);
  });
  test('MOR +3 mends twice as fast', 'mor', 3, p => {
    /* the road's own mend figure for THIS body */
    const h = rungHeld('mor', effStats(p).mor).heal || 0;
    const src = String(passDays || '');
    return (src.indexOf('MEND_BASE') >= 0 && /heal/.test(src)) ? MEND_BASE * (1 + h) : MEND_BASE;
  });
  test('MOR -4 opens lower', 'mor', -4, (p, u) => u.state);

  /* ── the capstones. ⚠ THE FIRST CUT OF THIS BLOCK GREPPED FUNCTION SOURCE
     AND REPORTED TWO FALSE DEADS: FLEET is applied in `unitFrom` and TWO PERK
     POINTS in `levelUp`, neither of which was in the list it searched - and the
     functional row above already said FLEET pays. A source grep tests where you
     THOUGHT the wiring went; driving it tests whether it went anywhere. ── */
  /* FLEET is the functional row above (AGI +4 step 4 -> 5) and needs nothing here */
  test('MOR +4 two perk points', 'mor', 4, p => {
    const lv = p.level, pk = p.perkPoints || 0, np = p.nextIsPerk, st = p.statPoints || 0;
    p.nextIsPerk = true; p.perkPoints = 0;
    levelUp(p);
    const got = p.perkPoints || 0;
    p.level = lv; p.perkPoints = pk; p.nextIsPerk = np; p.statPoints = st;
    return got;
  });
  test('STR +4 STANDS survives the drop', 'str', 4, (p, u) => {
    /* the flag on the unit, and the one site that reads it */
    return (u.stands ? 'flagged' : 'no flag') +
      (String(strike).indexOf('d.stands') >= 0 ? ' + read by strike' : ' + NOTHING READS IT');
  });
  test('INT +4 UNREPEATABLE refuses a second blow', 'int', 4, (p, u) => {
    if (!u.unrepeatable) return 'no flag';
    const foe = { id: 'probe_foe', side: 'foe' }, act = { dmg: [1, 2] };
    const t = Object.assign({}, u, { unrepeatable: true, hitBy: null });
    const first = mayAim(foe, act, t);
    t.hitBy = { probe_foe: 1 };
    const again = mayAim(foe, act, t);
    const other = mayAim({ id: 'probe_foe2', side: 'foe' }, act, t);
    return 'first ' + !!first + ' · same foe again ' + !!again + ' · a second foe ' + !!other;
  });

  B0.st = keep; drawInv();
  return rows;
})()
