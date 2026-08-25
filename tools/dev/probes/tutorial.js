/* #248 - the world tour still runs, and the battle lesson still stops the
   clock. Both halves, because the fix touched the reader they share. */
(() => {
  const on = () => { const d = document.getElementById('tutDim');
                     return !!(d && d.classList.contains('on')); };
  const head = () => { const h = document.getElementById('tutH');
                       return h ? h.textContent : null; };
  const o = { tour: [], battle: {} };

  /* --- the world tour, as a player meets it -------------------------- */
  delete window.TUT_SILENT;
  G.wTutDone = false; show('world'); drawMap(); drawNodes();
  worldTut();
  o.tour.push({ step: 1, dim: on(), head: head(), q: WTUT.q.slice() });
  tutNext(); o.tour.push({ step: 2, dim: on(), head: head(), q: WTUT.q.slice() });
  tutNext(); o.tour.push({ step: 3, dim: on(), head: head(), q: WTUT.q.slice() });
  tutNext(); o.tour.push({ step: 4, dim: on(), head: head(), q: WTUT.q.slice() });

  /* --- and a battle lesson still locks the fight it belongs to -------- */
  startBattle('brigand'); render();
  B.tutLock = false;
  const painted = tutPaint('A TEST', 'the lock still closes', document.getElementById('bGrid'));
  o.battle.painted = painted;
  o.battle.locked = !!B.tutLock;
  tutNext();
  o.battle.unlocked = !B.tutLock;
  o.battle.dimDown = !on();
  tutClose(); show('world');
  return o;
})()
