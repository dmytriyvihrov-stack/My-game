(() => {
  show('world');worldTick();
  const el=document.querySelector('#wCompany [data-w="mood"]');
  const r=el.getBoundingClientRect();
  el.dispatchEvent(new MouseEvent('mouseenter',
    {bubbles:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2}));
  const t=$('gtTip'),s=$('stage').getBoundingClientRect(),b=t.getBoundingClientRect();
  return {chip:[+r.left.toFixed(0),+r.top.toFixed(0)],
          tip:{w:+b.width.toFixed(0),h:+b.height.toFixed(0)},
          topInStage:+(b.top-s.top).toFixed(0), bottomSlack:+(s.bottom-b.bottom).toFixed(0),
          insideStage:b.top>=s.top-1&&b.bottom<=s.bottom+1,
          insideWindow:b.top>=0&&b.bottom<=innerHeight};
})()
