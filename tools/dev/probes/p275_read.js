/* #275 - the readouts, driven. The three DISENGAGE promises, the tally line,
   the two capped figures, the brawl's first swing, and whether a cloak can be
   found at all. */
(() => {
  const o = {};
  const T = window.TUT_SILENT; window.TUT_SILENT = true;

  /* 1. can the cloak be found or bought at all */
  o.pool = (() => {
    try {
      const p = (typeof findPool === 'function') ? findPool() : null;
      return p ? { has: p.indexOf('cloak') >= 0, n: p.length } : 'no findPool';
    } catch (e) { return 'threw: ' + e.message; }
  })();
  o.price = typeof gearPrice === 'function' ? gearPrice('cloak') : null;

  /* 2. the brawl: the lesson, the first swing, the tally */
  startBattle('tavern');
  GT.playerTurn();
  const u = cur();
  o.brawl = { tut: !!B.tut, hasDis: hasDis(u) };
  o.circled = TUTSTEPS.circled.t().slice(0, 200);

  const f = GT.nearestFoe(u); GT.standNextTo(u, f);
  const atk = u.acts.find(a => a.dmg && !a.arcane);
  o.firstSwing = { total: hitBreakdown(u, f, atk).total,
                   parts: hitBreakdown(u, f, atk).parts.filter(s => /lands/.test(s)) };
  strike(u, f, atk);
  o.afterOne = hitBreakdown(u, f, atk).total < 100 || (u.hits || 0) > 0;

  /* 3. the hover box goes down when the sheet goes up */
  const tp = document.getElementById('gtTip');
  tp.style.display = 'block';
  window.TUT_SILENT = false;
  const painted = tutPaint('TEST', 'text', $('bActions'));
  o.tip = { painted: painted, display: tp.style.display };
  tutClose && tutClose();
  window.TUT_SILENT = true;

  /* 4. the zone note and the step chip, on a body with and without the card */
  {
    const keep = u.acts.slice();
    o.zocNoDis = (zocNote(u.col, u.row) || {}).d || null;
    u.acts.push({ k: 'dis', n: 'DISENGAGE', cost: 1, self: true });
    o.zocWithDis = (zocNote(u.col, u.row) || {}).d || null;
    u.acts = keep;
  }

  /* 5. the two capped figures on the two surfaces */
  startBattle('brigand'); GT.playerTurn(); render();
  const you = cur();
  o.plaque = { hitN: $('bHitN').textContent, dodgeN: $('bDodgeN').textContent,
               raw: you.mskill, capped: hitOf(you) };
  o.card = { tally: /of 2 this turn/i.test($('bActions').innerHTML) };
  spend(you, you.acts[0]); render();
  o.cardAfterOne = { tally: /OF 2 THIS TURN/i.test($('bActions').innerHTML) };

  window.TUT_SILENT = T;
  return o;
})()
