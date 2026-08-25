/* the Sitting Stone: still in band, still four doors, and the shield reachable */
(() => {
  const e = EVENTS.ogrestone;
  const w = s => String(s || '').trim().split(/\s+/).length;
  const words = w(typeof e.body === 'function' ? e.body() : e.body) +
                e.choices.reduce((n, c) => n + w(c.after), 0);
  return {
    words, band: words <= 90 ? 'LIGHT' : words <= 140 ? 'MEDIUM' : words <= 175 ? 'HEAVY' : 'OVER',
    doorsAuthored: e.choices.length,
    doorsVisibleNoRace: e.choices.filter(c => !c.needRace).length,
    gearDoors: e.choices.filter(c => c.gear).map(c => c.t + ' -> ' + c.gear),
    shieldReachable: Object.entries(EVENTS).concat(Object.entries(CAMPS))
      .some(([k, ev]) => (ev.choices || []).some(c => c.gear === 'stoneshield' ||
        (c.gear2 || []).indexOf('stoneshield') >= 0)),
    lint: LINT().findings,
  };
})()
