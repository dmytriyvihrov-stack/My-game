/* what ONE company reads on this card. `raceDoorPick` shows at most one race
   door, so the naive sum counts prose no single run can reach. */
(() => {
  const e = EVENTS.ogrestone;
  const w = s => String(s || '').trim().split(/\s+/).length;
  const body = w(typeof e.body === 'function' ? e.body() : e.body);
  const byT = {}; e.choices.forEach(c => byT[c.t] = w(c.after));
  const open = e.choices.filter(c => !c.needRace).reduce((n, c) => n + w(c.after), 0);
  const race = e.choices.filter(c => c.needRace)
    .map(c => ({ race: c.needRace, words: w(c.after) }));
  return {
    body, openDoors: open,
    perCompany: race.map(r => ({ company: 'has a ' + r.race,
      words: body + open + r.words })).concat(
      [{ company: 'all human', words: body + open }]),
    ceiling: 175,
  };
})()
