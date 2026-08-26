/* #251 baseline - the company sheet: header chips, the three pools, the doll
   grid and the stash column. Run on HEAD and on the new build and diff. */
(() => {
  openInv();
  const R = GT.R, o = {};
  const id = s => document.getElementById(s);
  o.char = GT.slack('iChar');
  o.head = { iHead: R(id('iHead')), col: R(id('iHeadCol')),
             chips: id('iChips') ? R(id('iChips')) : null,
             name: R(id('iName')), trait: R(id('iTrait')) };
  o.pools = GT.$$('#iStatTop .ibars .sbar').map(s => ({
    h: R(s).h, bar: R(s.querySelector('.sbb')).h,
    sbh: getComputedStyle(s).getPropertyValue('--sbh').trim(),
    fig: s.querySelector('.sbR') ? getComputedStyle(s.querySelector('.sbR')).fontSize : null,
    txt: (s.textContent || '').trim() }));
  o.doll = { box: R(id('iDollBox')),
             cols: getComputedStyle(id('iDollBox')).gridTemplateColumns,
             slots: GT.$$('#iDollBox .slot').map(s => ({
               lab: (s.querySelector('.sl') || {}).textContent,
               r: R(s) })) };
  const sb = id('iStashBody');
  o.stash = { body: R(sb), disp: getComputedStyle(sb).display,
              n: G.stash.length,
              rows: GT.$$('#iStashBody .item').map(x => R(x)) };
  o.gates = { floor: GT.floor(), clip: GT.clip(), overlap: GT.overlap('iChar') };
  return o;
})()
