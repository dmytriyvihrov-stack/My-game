/* #263 - THE FOUR MARKS ON THE INSPECT CARD, DRIVEN. Not read: opened.

     python tools/dev/gt.py eval tools/dev/probes/statmark263.js

   It starts a real battle, opens the real card (`inspect`, the function the
   hover calls) over a real foe, and measures what came out - how many marks,
   whether they are the reserved 32px, whether the card stays inside the stage,
   and whether anything on it fell under the 10px floor or clipped. Then one of
   YOURS (the row must be there too) and the Warden (the row must be ABSENT).

   ⚠ `inspect` takes a mouse event and `placeRead` reads `e.currentTarget`, so
   the fake event hands it a real hex element. Anything less and the card is
   built but never placed, and the measurement is of an unplaced box. */
(() => {
  const out = {};
  const R = el => el.getBoundingClientRect();
  const rd = () => document.getElementById('bRead');

  const measure = (u, label) => {
    const hex = document.querySelector('#bGrid .hex') ||
                document.getElementById('bField');
    inspect(u, { currentTarget: hex, clientX: 640, clientY: 360 });
    const card = rd();
    const row = card.querySelector('.statmk');
    const imgs = row ? row.querySelectorAll('img.tico') : [];
    const st = R(document.getElementById('stage'));
    const cr = R(card);
    out[label] = {
      hasRow: !!row,
      marks: imgs.length,
      sizes: [].map.call(imgs, i => i.getAttribute('width') + 'x' + i.getAttribute('height')),
      drawn: [].map.call(imgs, i => +R(i).width.toFixed(1)),
      titles: row ? [].map.call(row.children, s => s.getAttribute('title')) : [],
      cardW: +cr.width.toFixed(1), cardH: +cr.height.toFixed(1),
      insideStage: cr.left >= st.left - 1 && cr.right <= st.right + 1 &&
                   cr.top >= st.top - 1 && cr.bottom <= st.bottom + 1,
      underFloor: [].filter.call(card.querySelectorAll('*'), e => {
        const f = parseFloat(getComputedStyle(e).fontSize);
        return f > 0 && f < 10 && (e.textContent || '').trim();
      }).map(e => e.tagName + '.' + e.className),
      clipped: [].filter.call(card.querySelectorAll('*'), e => {
        const c = getComputedStyle(e);
        if (c.overflow === 'visible' && c.overflowY === 'visible') return false;
        if (c.overflow === 'auto' || c.overflowY === 'auto') return false;
        return e.scrollWidth - e.clientWidth > 1 || e.scrollHeight - e.clientHeight > 1;
      }).map(e => e.tagName + '.' + e.className)
    };
  };

  try {
    show('battle');
    G.party.length = 0;
    ARENA.COMPS.prepared().forEach(p => G.party.push(p));
    G.morale = 0; G.run.food = 8;
    startBattle('snare');
    render();
    measure(B.units.find(u => u.side === 'foe' && !u.dead), 'a foe');
    measure(B.units.find(u => u.side === 'you' && !u.dead && !u.pet), 'one of yours');

    B = null;
    startBattle('armour');
    render();
    measure(B.units.find(u => u.side === 'foe'), 'the Warden (must have NO row)');
  } catch (e) { out.FATAL = e.message + ' @ ' + (e.stack || '').split('\n')[1]; }
  finally {
    B = null;
    G.party.length = 0; makeParty().forEach(p => G.party.push(p));
    try { show('world'); } catch (e) {}
  }
  return out;
})()
