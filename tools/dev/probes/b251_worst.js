/* #251 - the sheet's height budget, every body x every state (#230's four),
   plus the two columns of `#iStatTop` so a taller pool row can be costed. */
(() => {
  const R = GT.R;
  const rows = GT.eachBody(p => {
    const s = GT.slack('iChar');
    const top = document.getElementById('iStatTop');
    const bars = top.querySelector('.ibars');
    const tells = [].slice.call(top.children).filter(x => x !== bars);
    return { slack: s.slack, scroll: s.scroll, overlap: s.overlap,
             head: R(document.getElementById('iHead')).h,
             headCol: R(document.getElementById('iHeadCol')).h,
             field: R(document.getElementById('iField')).h,
             stats: R(document.getElementById('iStats')).h,
             bars: R(bars).h,
             other: tells.map(x => (x.id || x.className) + ':' + R(x).h),
             doll: R(document.getElementById('iDollBox')).h };
  });
  return rows.map(r => r.id + '/' + r.state + ' slack ' + r.m.slack +
    ' scroll ' + r.m.scroll + ' | head ' + r.m.head + ' col ' + r.m.headCol +
    ' field ' + r.m.field + ' | stats ' + r.m.stats + ' bars ' + r.m.bars +
    ' [' + r.m.other.join(' ') + '] doll ' + r.m.doll +
    (r.m.overlap.length ? ' OVERLAP ' + r.m.overlap.join(';') : ''));
})()
