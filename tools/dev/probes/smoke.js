/* a screen-by-screen smoke walk: open everything a player crosses in the first
   ten minutes and report anything that THREW. #236's technical sweep.
   ⚠ A screen sweep cannot find a seam bug (the QA memory) - this is the cheap
   half, and its value is that a thrown error anywhere is a hard finding.

   ⛔ #278 - AND NOT ONE SYMBOL IS GUARDED WITH `typeof`, WHICH IS THE WHOLE
   REASON THIS FILE WAS REWRITTEN. Two of its fourteen steps called functions
   that HAVE NEVER EXISTED IN THIS BUILD - `newRun` and `openShop` - and both
   were wrapped in `if (typeof X === 'function')`, so both printed `ok` on
   every run this probe has ever had. A guard that turns a missing function
   into a pass is rule 5 exactly: a check that has only ever returned ok is
   indistinguishable from a broken one. The run starts with `enterWorld` and
   the shop is `openVillage`; if either is ever renamed, this THROWS, which is
   the entire point of a smoke walk. */
(() => {
  const errs = [], note = [];
  const T = (what, fn) => { try { const r = fn(); note.push(what + ' ok' + (r === undefined ? '' : ' ' + r)); }
                            catch (e) { errs.push(what + ' THREW ' + e.message); } };
  const shut = () => { const d = document.getElementById('wDlg'); if (d) d.classList.remove('on'); };
  const doors = () => { const d = document.getElementById('wDlg');
                        return d ? d.querySelectorAll('button').length : 0; };
  /* the camp and the vignette are placed cards: they take the node they are
     told at, a continuation, and whether it is a real place. Called bare they
     throw on `spot`, which is a probe fault and not a finding. */
  const spot = () => NODES[G.at] || { x: 640, y: 300 };

  T('LINT', () => LINT().findings + ' findings');
  T('enterWorld', () => { enterWorld(); return 'day ' + G.day + ' at ' + G.at + ' · ' + G.party.length + ' of you'; });
  T('world', () => { show('world'); drawMap(); drawNodes(); return Object.keys(NODES).length + ' nodes'; });
  T('inventory', () => { openInv(); return G.party.length + ' bodies'; });
  T('each body sheet', () => { G.party.forEach(p => { iSel = p.id; drawInv(); }); iSel = 'you'; drawInv(); return 'all'; });
  T('stash tab', () => { G.stash.push('mail', 'maul', 'focus'); drawInv(); return G.stash.length + ' in cart'; });
  T('every gear hover', () => { let n = 0; Object.keys(GEAR).forEach(k => { const h = tipFor(k, G.party[0]);
      if (!h || h.indexOf('margin-bottom:4px') < 0) throw new Error('no tier/slot line on ' + k); n++; }); return n + ' tips'; });
  T('every road card', () => { let n = 0; Object.keys(EVENTS).forEach(k => { openEvent(k); n++; }); shut(); return n + ' cards'; });
  T('every camp card', () => { let n = 0; Object.keys(CAMPS).forEach(k => { const c = CAMPS[k];
      const b = typeof c.body === 'function' ? c.body() : c.body; if (!b) throw new Error('empty body ' + k); n++; }); return n; });
  /* ⛔ #278 - THE FOUR SURFACES A PLAYER SPENDS MONEY ON, none of which this
     walk has ever opened. The old `shop` step looked for `openShop`, which is
     not a function this game has ever had, and printed `no openShop` as a
     pass; the wagon is a whole system (#270's racks and kept crate) that had
     no smoke coverage at all. */
  /* ⚠ EACH ONE SHUTS FIRST AND STANDS ON THE ROAD FIRST. Left open, the
     previous card is still in `#wDlg` and the next surface reads its doors -
     seeded on purpose while proving these steps fire, and provisions read 0
     doors instead of 6 purely because the village before it had thrown. */
  const onRoad = () => { shut(); enterWorld(); };
  T('village (the shop)', () => { onRoad(); openVillage(); const n = doors(); shut(); return n + ' doors'; });
  T('provisions', () => { onRoad(); openProvisions(); const n = doors(); shut(); return n + ' doors'; });
  T('wagon', () => { onRoad(); openWagon(); const n = doors(); shut(); return n + ' doors'; });
  /* ⚠ A CAMP CARD AND A VIGNETTE ARE BEAT CARDS AND HAVE NO DOORS WHEN THEY
     OPEN, which is the staged reveal working and not a fault - counting
     buttons here would read 0 and mean nothing. What is asserted is that the
     painted stage actually built: `#wDlg` on, with a card in it. */
  const staged = where => { const d = document.getElementById('wDlg');
    if (!d || !d.classList.contains('on')) throw new Error(where + ' left #wDlg shut');
    if (!d.querySelector('.evcard')) throw new Error(where + ' built no card');
    /* ⚠ `.evname` IS THE CAST MEMBER ON THE PAINTED STAGE, NOT THE CARD'S
       TITLE - checked on the DOM, not assumed. It is reported because a card
       that staged a person is a card that got as far as picking its cast; a
       count of beats would read 0 before they are advanced and mean nothing. */
    const nm = d.querySelector('.evname');
    return 'staged, cast ' + (nm ? nm.textContent.trim().slice(0, 30) : '(nobody)'); };
  T('camp incident', () => { openCamp(spot(), () => {}, true); const r = staged('camp'); shut(); return r; });
  T('vignette', () => { openVignette(spot(), () => {}, true); const r = staged('vignette'); shut(); return r; });
  T('muster', () => { openHire(); shut(); return 'open'; });
  T('menu', () => { openMenu(); shut(); return 'open'; });
  T('battle + render', () => { startBattle('brigand'); GT.playerTurn(); render(); return B.units.length + ' units'; });
  T('every foe hovered', () => { let n = 0; B.units.filter(u => u.side === 'foe' && !u.dead).forEach(f => {
      handOn(K(f.col, f.row)); render(); n++; }); return n + ' foes'; });
  T('aftermath', () => { if (typeof consequences !== 'function') throw new Error('consequences is gone'); return 'present'; });

  return { errors: errs, walked: note };
})()
