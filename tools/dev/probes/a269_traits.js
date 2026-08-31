/* #269 ask 16 - what a trait PROMISES against what it PAYS, and which `d`
   restates its own short form. */
(function(){
  const KEYS=['str','agi','int','mor'];
  const NAME={str:'STR',agi:'AGI',int:'INT',mor:'MOR'};
  const said=t=>{                       /* every "+N STAT" in up/cost/d */
    const o={};
    [t.up,t.cost,t.d].forEach(s=>{
      String(s||'').replace(/([+\u2212-])\s*(\d+)\s*(STR|AGI|INT|MOR)(?![a-z])/g,(m,sg,n,k)=>{
        const v=(sg==='+'?1:-1)*(+n);k=k.toLowerCase();
        if(o[k]===undefined)o[k]=v;return m;});});
    return o;};
  const bad=[],dup=[];
  for(const k in TRAITS){const t=TRAITS[k];
    const s=said(t);
    KEYS.forEach(q=>{
      const pays=(typeof t[q]==='number')?t[q]:0;
      if(s[q]!==undefined&&s[q]!==pays)bad.push(k+' says '+(s[q]>0?'+':'')+s[q]+' '+NAME[q]+' pays '+(pays>0?'+':'')+pays);
      if(s[q]===undefined&&pays)bad.push(k+' pays '+(pays>0?'+':'')+pays+' '+NAME[q]+' and says nothing');
    });
    /* the doubling: the paragraph is the short line again */
    const short=[t.up,t.cost].filter(Boolean).join(' \u00b7 ');
    const norm=x=>String(x||'').replace(/[.,\u00b7]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
    if(t.d&&short&&norm(t.d)===norm(short))dup.push(k);
    else if(t.d&&t.up&&norm(t.d).indexOf(norm(t.up))===0&&norm(t.d).length<norm(short).length+6)dup.push(k+'(near)');
  }
  return {mismatch:bad,paragraphRepeatsShortForm:dup};
})()
