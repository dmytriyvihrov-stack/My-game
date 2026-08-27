/* #257 · does the mood pool reach the player at all?
   The Captain is MOR +2 and should read HIGHER than a body at 0. What does the
   sheet actually show him, and what does the battle card show him? */
(() => {
  const out = { bodies: [], sheetRow: null, cardRow: null };
  show('inv'); drawInv();
  G.party.forEach(p => {
    const u = unitFrom(p), s = effStats(p);
    out.bodies.push(p.name + ' MOR ' + (s.mor > 0 ? '+' : '') + s.mor +
      ' | pool ' + u.moraleMax + ' | opens ' + Math.round(u.morale) +
      ' (' + Math.round(nerveFrac(u) * 100) + '%) ' + u.state +
      ' | climbs ' + (MORALE.recover + (rungHeld('mor', s.mor).climb || 0)) +
      ' | loses x' + (1 + (rungHeld('mor', s.mor).loss || 0)) +
      ' | mends ' + (MEND_BASE * (1 + (rungHeld('mor', s.mor).heal || 0))) + '/day');
  });
  /* what the sheet's third pool row PRINTS, per body */
  out.sheetRow = G.party.map(p => {
    iSel = p.id; drawInv();
    const rows = [...document.querySelectorAll('#iStatTop .sbar')];
    const mood = rows[rows.length - 1];
    if (!mood) return p.name + ': no mood row';
    const bar = mood.querySelector('.sbb i, .bar i, i');
    return p.name + ': "' + mood.innerText.replace(/\s+/g, ' ').trim() + '"' +
      (bar ? ' fill ' + getComputedStyle(bar).width : ' (no fill)');
  });
  iSel = G.party[0].id; drawInv();
  /* and the battle card */
  startBattle('clash');
  out.cardRow = B.units.filter(u => u.side === 'you').map(u =>
    u.name + ': ' + Math.round(u.morale) + '/' + u.moraleMax + ' ' + u.state);
  return out;
})()
