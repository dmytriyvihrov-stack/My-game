/* #254 · every new hover, driven and measured. Expect nothing clipped, nothing
   under the floor, every box inside the stage, and every ledger adding up. */
(() => {
  const K = ['str', 'agi', 'int', 'mor'];
  show('inv'); drawInv();
  const p = member(iSel), st = document.getElementById('stage').getBoundingClientRect();
  const out = [];

  const drive = (sel, tag) => {
    const c = document.querySelector(sel);
    if (!c) { out.push(tag + ': NO ELEMENT'); return; }
    const r = c.getBoundingClientRect();
    c.onmouseenter({ clientX: r.left + 4, clientY: r.top + 4 });
    c.onmousemove({ clientX: r.left + 4, clientY: r.top + 4 });
    const t = document.getElementById('gtTip'), tr = t.getBoundingClientRect();
    const clip = [...t.querySelectorAll('*')].filter(e => {
      const s = getComputedStyle(e);
      if (s.display === 'none') return 0;
      if (s.overflow === 'visible' && s.overflowX === 'visible' && s.overflowY === 'visible') return 0;
      return e.scrollWidth - e.clientWidth > 1 || e.scrollHeight - e.clientHeight > 1;
    }).map(e => e.className);
    const small = [...t.querySelectorAll('*')].filter(e => {
      const s = getComputedStyle(e);
      return s.display !== 'none' && parseFloat(s.fontSize) < 10 && (e.textContent || '').trim();
    }).length;
    /* does the ledger add up to the figure it prints? */
    const rows = [...t.querySelectorAll('.stsum .ssr:not(.tot)')]
      .map(e => parseFloat(e.querySelector('.ssv').textContent.replace('−', '-')) || 0);
    const totEl = t.querySelector('.stsum .ssr.tot .ssv');
    const tot = totEl ? parseFloat(totEl.textContent.replace('−', '-').replace('%', '')) : null;
    const sum = rows.reduce((a, b) => a + b, 0);
    out.push(tag + ': ' + Math.round(tr.width) + 'x' + Math.round(tr.height) +
      ' inside ' + (tr.bottom <= st.bottom + 1 && tr.top >= st.top - 1 &&
                    tr.right <= st.right + 1 && tr.left >= st.left - 1) +
      ' | clipped ' + (clip.length ? clip.join('/') : 'none') +
      ' | under floor ' + small +
      (tot === null ? '' : ' | ledger ' + sum + ' vs ' + tot + (sum === tot ? ' OK' : '  <<< MISMATCH')) +
      ' | says: ' + t.innerText.replace(/\s+/g, ' ').slice(0, 150));
    c.onmouseleave();
  };

  K.forEach(k => drive('#iChar [data-tell="' + k + '"]', 'stat ' + k));
  drive('#iChar [data-drv="hit"]', 'TO HIT');
  drive('#iChar [data-drv="dodge"]', 'DODGE');
  drive('#iChar [data-race]', 'race');
  drive('#iChar [data-cls]', 'class');
  return out;
})()
