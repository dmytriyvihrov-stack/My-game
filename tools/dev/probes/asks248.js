/* #248 round two - the open rulings, checked against the build before anybody
   is asked to rule on them. A question about a thing that no longer exists is
   worse than no question. */
(() => {
  const o = {};

  /* #123 - the chapel's gills door, against #16's MUTATIONS_ON=false */
  o.gills = {
    mutationsOn: typeof MUTATIONS_ON !== 'undefined' ? MUTATIONS_ON : 'n/a',
    doors: Object.entries(EVENTS).flatMap(([k, e]) => (e.choices || [])
      .filter(c => c.needMut).map(c => k + ' needs ' + c.needMut)),
    anyoneCanHave: (() => { try { return G.party.filter(p => p.muts && p.muts.length).length; }
                           catch (e) { return 'threw'; } })(),
  };

  /* #96 - the armour bar's colour, and whose the pet is */
  o.armourSteel = (() => { try { return typeof SLOT_ICON !== 'undefined' &&
      /--steel|#96a1a5/.test([...document.styleSheets].length ? 'checked-in-css' : ''); }
    catch (e) { return 'n/a'; } })();

  /* #147 - are `plains` and `outpost` still unused arenas? */
  o.unusedFields = (() => { try {
      const all = Object.keys(typeof FIELDS !== 'undefined' ? FIELDS : {});
      const used = new Set(Object.values(typeof FIGHTFIELD !== 'undefined' ? FIGHTFIELD : {}));
      return { all: all.length, unused: all.filter(k => !used.has(k)) };
    } catch (e) { return 'n/a: ' + e.message; } })();

  /* #157 - the muster's tellLine: do three candidates read the same? */
  o.musterTells = (() => { try {
      openHire();
      return [...document.querySelectorAll('#hireWall .htell, .hrow .tell, #wDlg .htell')]
        .map(e => e.textContent.trim()).slice(0, 12);
    } catch (e) { return 'n/a: ' + e.message; } })();

  /* #141 - the two mood numbers on the coin card */
  o.coin = (() => { try { return (EVENTS.coin.choices || [])
      .map(c => (c.t || '') + ' -> ' + JSON.stringify(c.fx || {})); }
    catch (e) { return 'n/a'; } })();

  /* how many events still carry a needMut door at all */
  o.mutDoors = Object.entries(EVENTS).concat(Object.entries(CAMPS))
    .flatMap(([k, e]) => (e.choices || []).filter(c => c.needMut).map(c => k));
  return o;
})()
