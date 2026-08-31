/* ═══ MOCKUP ONLY. Nothing here is a patch to the build. ═══════════════════
   Draws the proposed world-state arc into the REAL world bar, then a board
   under it showing the three states big and the two icon options. */
(()=>{
  G.party.length=0;ARENA.COMPS.prepared().forEach(p=>G.party.push(p));
  enterWorld();

  const COL={evil:'#a33b34',neutral:'#96a1a5',good:'#8ca35a'},TRACK='#4d3c22';
  const N=11,SPAN=180/N,GAP=1.6,R=20,CX=30,CY=26;
  const pt=(a,r)=>[(CX+r*Math.cos(a*Math.PI/180)).toFixed(2),(CY-r*Math.sin(a*Math.PI/180)).toFixed(2)];
  const seg=(i,r)=>{const a0=180-i*SPAN-GAP,a1=180-(i+1)*SPAN+GAP,s=pt(a0,r),e=pt(a1,r);
    return 'M'+s[0]+' '+s[1]+'A'+r+' '+r+' 0 0 1 '+e[0]+' '+e[1];};

  /* v is -5..+5. state is what the gates make of it. */
  function arc(v,state,icons,scale){
    const lo=Math.min(5,5+v),hi=Math.max(5,5+v),c=COL[state];
    let p='';
    for(let i=0;i<N;i++){
      const lit=i>=lo&&i<=hi, edge=(i===5+v&&v!==0);
      p+='<path d="'+seg(i,R)+'" fill="none" stroke="'+(lit?c:TRACK)+'" stroke-width="5"'+
         ' opacity="'+(lit?(edge?1:.8):1)+'"/>';
    }
    const s=scale||1;
    return '<span class="algn" style="--s:'+s+'">'+
      '<i class="ai evil">'+icons[0]+'</i>'+
      '<svg viewBox="0 0 60 30" width="'+(60*s)+'" height="'+(30*s)+'">'+p+'</svg>'+
      '<i class="ai good">'+icons[1]+'</i></span>';
  }

  const css=document.createElement('style');
  css.id='mockcss';
  css.textContent=
   '.algn{display:inline-flex;align-items:flex-end;gap:calc(3px*var(--s));line-height:1}'+
   '.algn .ai{font-style:normal;font-size:calc(11px*var(--s));opacity:.85;'+
     'filter:grayscale(.35);padding-bottom:calc(1px*var(--s))}'+
   '#mockboard{position:absolute;left:0;top:52px;width:1280px;height:660px;'+
     'background:#12100c;color:#c9c2b4;font-family:Georgia,serif;z-index:9000;'+
     'padding:18px 26px;box-sizing:border-box}'+
   '#mockboard h2{font-size:15px;letter-spacing:.16em;color:#a38652;margin:0 0 14px;font-weight:400}'+
   '#mockboard h3{font-size:11px;letter-spacing:.14em;color:#7d735f;margin:22px 0 10px;font-weight:400}'+
   '.mrow{display:flex;gap:30px;align-items:flex-end}'+
   '.mcell{text-align:center}'+
   '.mcap{font-size:11px;letter-spacing:.1em;margin-top:8px;color:#8a8271}'+
   '.mcap b{display:block;font-size:12px;letter-spacing:.18em;font-weight:400}'+
   '.mnote{font-size:11.5px;color:#8a8271;max-width:1180px;line-height:1.55;margin-top:6px}';
  (document.getElementById('mockcss')||{remove(){}}).remove?0:0;
  const old=document.getElementById('mockcss');if(old)old.remove();
  document.head.appendChild(css);

  /* 1 - into the REAL bar, in the air beside the day plaque */
  document.querySelectorAll('.algnhost').forEach(e=>e.remove());
  const host=document.createElement('div');
  host.className='algnhost';
  host.style.cssText='position:absolute;left:742px;top:7px;z-index:50';
  host.innerHTML=arc(-3,'evil',['\uD83D\uDDE1','\uD83D\uDD4A'],1);
  $('wBar').appendChild(host);
  const tip=document.getElementById('gtTip');if(tip)tip.style.display='none';

  /* 2 - the board */
  const b0=document.getElementById('mockboard');if(b0)b0.remove();
  const b=document.createElement('div');b.id='mockboard';
  const KNIFE=['\uD83D\uDDE1','\uD83D\uDD4A'],DOOR=['\u2620\uFE0F','\uD83E\uDD1D'];
  const cell=(v,st,ic,cap,word)=>'<div class="mcell">'+arc(v,st,ic,2.2)+
    '<div class="mcap"><b>'+word+'</b>'+cap+'</div></div>';
  b.innerHTML='<h2>THE ROAD REMEMBERS \u00b7 mockup, not built</h2>'+
    '<h3>THE THREE STATES \u2014 the arc fills from the middle, outward</h3>'+
    '<div class="mrow">'+
      cell(-5,'evil',KNIFE,'five cruelties deep','BLACK')+
      cell(-2,'evil',KNIFE,'two, and it shows','BLACK')+
      cell(0,'neutral',KNIFE,'nothing yet, or it cancelled out','GREY')+
      cell(2,'good',KNIFE,'two kindnesses','WHITE')+
      cell(5,'good',KNIFE,'a clean road','WHITE')+
    '</div>'+
    '<h3>WHICH TWO MARKS \u2014 A is what you asked for, B is the glyph the doors already wear</h3>'+
    '<div class="mrow">'+
      cell(-3,'evil',KNIFE,'blade \u00b7 dove','A')+
      cell(-3,'evil',DOOR,'the evil door \u00b7 the helping door','B')+
    '</div>'+
    '<div class="mnote">B costs nothing to learn: the mark on the arc is the same mark on the '+
      'button that moved it. A is the stronger picture and is two new glyphs on a screen where '+
      '\u2620\uFE0F already means exactly this.</div>'+
    '<h3>AT REAL SIZE, IN THE BAR \u2014 look at the top of this picture</h3>'+
    '<div class="mrow"><div class="mcell">'+arc(-3,'evil',KNIFE,1)+
      '<div class="mcap">66 \u00d7 30. The bar\u2019s middle run is 229px of air.</div></div></div>';
  $('stage').appendChild(b);
  ['gtTip','wNews','tutDim','tutCard'].forEach(id=>{const e=document.getElementById(id);if(e)e.remove();});
  return {ok:1,barGap:'713..942 free',states:['evil','neutral','good']};
})()
