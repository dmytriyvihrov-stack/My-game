(()=>{openMenu();
  const b=[].slice.call(document.querySelectorAll('#mOpts .popt'))
    .find(x=>/Options/.test(x.textContent));
  if(b)b.click();return {on:[].slice.call(document.querySelectorAll('.screen.on')).map(s=>s.id)};})()
