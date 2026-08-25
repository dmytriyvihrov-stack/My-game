(()=>{
  const out={};
  /* the sheet, every body x state */
  out.sheetWorst=(()=>{let w=null;GT.eachBody().forEach(r=>{
    if(!w||r.m.slack<w.slack)w={who:r.id+'/'+r.state,slack:r.m.slack,overlap:r.m.overlap};});return w;})();
  out.invClip=GT.clip();out.invFloor=GT.floor();
  /* the battle card */
  window.TUT_SILENT=true;if(typeof learnSkip==='function')learnSkip();
  G.morale=0;G.run.food=8;startBattle('snare');
  const i=B.order.findIndex(x=>x.side==='you'&&!x.ally&&!x.pet);
  B.idx=i;beginTurn();if(typeof tutClose==='function')tutClose();
  const d=document.getElementById('tutDim');if(d)d.classList.remove('on');
  const cd=document.getElementById('tutCard');if(cd)cd.style.display='none';
  render();
  const R=e=>{const r=e.getBoundingClientRect();return {w:+r.width.toFixed(0),h:+r.height.toFixed(0),
    t:+r.top.toFixed(0),b:+r.bottom.toFixed(0)};};
  out.plaque=R(document.getElementById('bPlq'));
  out.pbars=R(document.querySelector('#bPlq .pbars'));
  out.rows=[].slice.call(document.querySelectorAll('#bPlq .sbar')).map(e=>R(e).h);
  out.battleClip=GT.clip();out.battleFloor=GT.floor();
  out.stageBottom=R(document.getElementById('stage')).b;
  return out;
})()
