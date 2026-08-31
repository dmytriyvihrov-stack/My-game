/* #269 ask 25 - the Coldharrow soft lock, reproduced. */
(function(){
  const out={};
  try{
    if(!G.run)newRun();
    G.at='vill';
    try{openVillage();out.threw=null;}catch(e){out.threw=String(e);}
    const w=document.getElementById('wChoices');
    out.choices=w?w.querySelectorAll('.choice').length:'no #wChoices';
    out.cardOn=document.getElementById('wDlg').classList.contains('on');
    out.bdChars=(document.querySelector('#wDlg .bd')||{textContent:''}).textContent.trim().length;
    /* and the direct question: what does resGlyphs do with a function label? */
    out.feedLabelType=typeof (function(){const v=G.vill;return null;})();
    try{resGlyphs(()=>'x');out.resGlyphsOnFn='survived';}catch(e){out.resGlyphsOnFn=String(e);}
    out.hasEvLabel=(typeof evLabel==='function');
  }catch(e){out.fatal=String(e);}
  return out;
})()
