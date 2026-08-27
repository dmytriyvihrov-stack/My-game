/* #256 · the three remainders, driven.
   ⚠ THE RUNG IS SOLVED FOR, NOT COMPUTED. The first cut of this probe worked
   out `st[k] = target - race - class - trait` by hand and was off by a rung on
   two of the three bodies, because gear and a scar are in `effStats` too and it
   had not asked. It nudges `st[k]` until `effStats` reports the rung it wants,
   and prints the rung it actually got. */
(() => {
  const out = {};
  show('inv'); drawInv();
  const p = member(iSel), u = unitFrom(p), sw = swingOf(u);

  const setRung = (b, k, want) => {
    for (let i = 0; i < 24; i++) {
      const got = effStats(b)[k];
      if (got === want) return true;
      b.st[k] += (want > got ? 1 : -1);
    }
    return effStats(b)[k] === want;
  };

  /* K1 - the sheet's three places, side by side */
  const card = [...document.querySelectorAll('#iChar .iact')].map(e =>
    (e.querySelector('b') || {}).textContent + ' ' + ((e.querySelector('.adm') || {}).textContent || '-'));
  out.K1 = {
    actionsLine: sw ? sw.n + ' ' + sw.lo + '-' + sw.hi : '-',
    skillCards: card,
    gearSlotKeepsTheDice: (g => g ? g.n + ' ' + g.dmg[0] + '-' + g.dmg[1] : '-')(GEAR[p.eq.main]),
    agree: !!(sw && card.some(c => c.indexOf(sw.lo + '-' + sw.hi) >= 0))
  };

  /* L2a - INTELLECT +3 pays its reach, on the working AND on the weapon */
  const mage = G.party.find(x => isCaster(x.cls)) || p;
  const keep = JSON.parse(JSON.stringify(mage.st));
  out.L2a = [0, 2, 3, 4].map(n => {
    if (!setRung(mage, 'int', n)) return 'int' + n + ': could not reach that rung';
    const uu = unitFrom(mage), wep = (uu.acts || []).find(a => a.reach || a.range);
    return 'INT ' + (n > 0 ? '+' : '') + n + ': spellRange ' + uu.spellRange +
      ' · rung reach ' + uu.intReach +
      ' · weapon ' + (wep ? (wep.range ? 'range ' + wep.range : 'reach ' + wep.reach) : 'none');
  });
  mage.st = keep;

  /* L2b - the opening nerve rung at MOR 0, -3 and -4 */
  const body = G.party[0], k2 = JSON.parse(JSON.stringify(body.st));
  out.L2b = [0, -3, -4].map(n => {
    if (!setRung(body, 'mor', n)) return 'mor' + n + ': could not reach that rung';
    const uu = unitFrom(body);
    return 'MOR ' + (n > 0 ? '+' : '') + n + ': opens ' + uu.state + ' at ' +
      Math.round(uu.morale) + '/' + uu.moraleMax + ' (' + Math.round(nerveFrac(uu) * 100) + '%)' +
      (rungHeld('mor', effStats(body).mor).low ? ' [one rung lower]' : '');
  });
  body.st = k2; drawInv();

  out.lint = LINT().findings;
  return out;
})()
