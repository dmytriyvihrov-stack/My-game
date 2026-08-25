/* the SECOND and THIRD visit, which is the one that was broken */
(()=>{
  const out=[],go=()=>{openMenu();
    const b=[].slice.call(document.querySelectorAll('#mOpts .popt')).find(x=>/Options/.test(x.textContent));
    b.click();
    out.push({btns:document.querySelectorAll('#audioBox button').length,
      parent:(document.getElementById('audioBox')||{}).parentElement&&
             document.getElementById('audioBox').parentElement.id,
      txt:[].slice.call(document.querySelectorAll('#audioBox button')).map(x=>x.textContent).join(' ')});
    document.getElementById('optBack').click();};
  go();go();go();
  /* and they still switch on the third visit */
  openMenu();[].slice.call(document.querySelectorAll('#mOpts .popt')).find(x=>/Options/.test(x.textContent)).click();
  const before=MUS.on;document.getElementById('musicBtn').click();
  out.push({toggled:MUS.on!==before,face:document.getElementById('musicBtn').textContent});
  document.getElementById('musicBtn').click();
  return out;
})()
