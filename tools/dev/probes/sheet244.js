/* #244 - the sheet asks: 10 (a stat point says so), 11 (kills), 12 (no armour),
   13 (the off hand), 8 (the dirk both ways). */
(() => {
  const o={};
  openInv();iSel='you';
  const p=member('you');
  const keepEq=JSON.parse(JSON.stringify(p.eq)),keepSP=p.statPoints,keepMem=G.showMem;

  /* ask 12 - stripped */
  p.eq.armour=null;drawInv();
  o.a12={band:($('iBand')||{}).textContent,
         value:(document.querySelector('#iBand')||{}).parentElement.parentElement.textContent
           .replace(/\s+/g,' ').trim()};
  p.eq.armour=keepEq.armour;

  /* ask 10 - a banked stat point */
  p.statPoints=0;drawInv();
  const noNag=!document.querySelector('.statnag');
  p.statPoints=2;drawInv();
  const nag=document.querySelector('.statnag');
  o.a10={silentWhenNone:noNag, says:nag?nag.textContent:'-',
         rowsOffered:document.querySelectorAll('.itl.spend').length};
  p.statPoints=keepSP;

  /* ask 11 - the kill tally */
  p.killsBy={human:2,ratkin:1};
  G.showMem=false;drawInv();
  const shut=document.querySelector('#iMemBtn').textContent.replace(/\s+/g,' ').trim();
  const shutHeads=document.querySelectorAll('#iMemBtn .kills').length;
  G.showMem=true;drawInv();
  const open=document.querySelector('#iMemBtn').textContent.replace(/\s+/g,' ').trim();
  const openHeads=document.querySelectorAll('#iMemBtn .kills').length;
  o.a11={shut:shut,shutHeads:shutHeads,open:open,openHeads:openHeads};
  G.showMem=keepMem;delete p.killsBy;

  /* ask 13 - a two-hander's off hand */
  p.eq.main='maul';p.eq.off='shield';drawInv();
  o.a13=(()=>{const slot=[...document.querySelectorAll('.slot')]
      .find(b=>/OFF HAND/.test(b.textContent));
    const pop=slot?slot.querySelector('.pop'):null;
    return {label:slot?slot.querySelector('.sl').textContent.replace(/\s+/g,' ').trim():'-',
            popText:pop?pop.textContent.replace(/\s+/g,' ').trim():'(no popover)'};})();
  p.eq.off=null;drawInv();
  o.a13empty=(()=>{const slot=[...document.querySelectorAll('.slot')]
      .find(b=>/OFF HAND/.test(b.textContent));
    const pop=slot?slot.querySelector('.pop'):null;
    return {label:slot?slot.querySelector('.sl').textContent.replace(/\s+/g,' ').trim():'-',
            popText:pop?pop.textContent.replace(/\s+/g,' ').trim():'(no popover)'};})();

  /* ask 8 - the dirk, melee and behind a bow */
  o.a8=(()=>{const out={};
    p.eq.main='sword';p.eq.off=null;const bare=unitFrom(p);
    p.eq.off='offhand';const withD=unitFrom(p);
    out.melee={hitBare:bare.mskill,hitDirk:withD.mskill,
               dmgBare:bare.dmgBonus,dmgDirk:withD.dmgBonus,
               cards:withD.acts.map(a=>a.n)};
    p.eq.main='bow';p.eq.off=null;const bowBare=unitFrom(p);
    p.eq.off='offhand';const bowD=unitFrom(p);
    out.bow={hitBare:bowBare.mskill,hitDirk:bowD.mskill,
             dmgBare:bowBare.dmgBonus,dmgDirk:bowD.dmgBonus,
             cards:bowD.acts.map(a=>a.n)};
    return out;})();
  p.eq=JSON.parse(JSON.stringify(keepEq));drawInv();
  return o;
})()
