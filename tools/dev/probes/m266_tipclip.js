/* #266 - the counter in ui-scales §5 walks `#stage *`, and `#gtTip` is a child
   of `document.body`. So the one box this entry made bigger is the one box
   neither gate can see. Measure it by hand, on every stat, on the worst body. */
(()=>{
  const out={rows:[]};
  const tip=document.getElementById('gtTip');
  const over=e=>({w:e.scrollWidth-e.clientWidth,h:e.scrollHeight-e.clientHeight});
  G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  /* a body with a long ledger: bank a level, wear ill-fitting armour, take a scar */
  const worst=member('you');
  worst.lvUp={str:1,mor:1};worst.st.str+=1;worst.st.mor+=1;
  worst.injuries=[{n:'a shoulder that clicks',str:-1}];
  worst.hurt={n:'an opened wound',agi:-1};
  ['you','vesna'].forEach(id=>{
    iSel=id;show('inv');drawInv();
    ['str','agi','int','mor'].forEach(k=>{
      const el=$('iChar').querySelector('[data-tell="'+k+'"]');
      el.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true,clientX:400,clientY:300}));
      const t=over(tip),r=tip.getBoundingClientRect();
      const sums=[...tip.querySelectorAll('.stsum .ssr')].map(x=>({o:over(x),
        n:x.querySelector('.ssn').textContent}));
      const tot=tip.querySelector('.ssr.tot .ssv');
      const totR=tot.getBoundingClientRect(),colR=tot.parentNode.parentNode.getBoundingClientRect();
      out.rows.push(id+'/'+k+' tip '+Math.round(r.width)+'x'+Math.round(r.height)+
        ' over '+t.w+','+t.h+
        ' | rowsOver '+sums.filter(s=>s.o.w>1||s.o.h>1).map(s=>s.n).join()+
        ' | tot right '+Math.round(totR.right)+' vs col right '+Math.round(colR.right)+
        ' vs tip right '+Math.round(r.right)+
        ' | offscreen '+(r.right>innerWidth||r.bottom>innerHeight));
    });});
  tip.style.display='none';
  G.party.length=0;makeParty().forEach(p=>G.party.push(p));
  return out;})()
