/* does the narrower ladder column wrap or clip a rung name, and does the
   ledger column clip a long trait? measured on the worst strings there are. */
(()=>{show('inv');drawInv();const p=member(iSel);
 const keep=JSON.parse(JSON.stringify({st:p.st,eq:p.eq,race:p.race,trait:p.trait,
   injuries:p.injuries||[],hurt:p.hurt||null,lvUp:p.lvUp||null}));
 const arm=Object.keys(GEAR).filter(k=>GEAR[k].slot==='armour'&&GEAR[k].size==='ogre')[0];
 const tri=Object.keys(GEAR).filter(k=>GEAR[k].slot==='trinket'&&GEAR[k].bonus)[0];
 const longest=Object.keys(TRAITS).sort((a,b)=>(TRAITS[b].n||'').length-(TRAITS[a].n||'').length)
   .filter(t=>TRAITS[t].str||TRAITS[t].agi||TRAITS[t].int||TRAITS[t].mor)[0];
 p.race='ratkin';p.trait=longest;
 p.eq={armour:arm,main:'sword',off:null,trinket:tri,bag:null};
 p.injuries=[SCARS[0],SCARS[3],SCARS[7]];p.hurt=HURTS[0];
 p.lvUp={str:2,agi:1,int:1,mor:1};p.st={str:4,agi:3,int:2,mor:4};drawInv();
 const out=['str','agi','int','mor'].map(k=>{
   const c=document.querySelector('#iChar [data-tell="'+k+'"]'),r=c.getBoundingClientRect();
   c.onmouseenter({clientX:r.left+4,clientY:r.top+4});c.onmousemove({clientX:r.left+4,clientY:r.top+4});
   const t=document.getElementById('gtTip'),tr=t.getBoundingClientRect();
   const st=document.getElementById('stage').getBoundingClientRect();
   const clip=[...t.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);
     if(s.display==='none')return 0;
     if(s.overflow==='visible'&&s.overflowX==='visible'&&s.overflowY==='visible')return 0;
     return e.scrollWidth-e.clientWidth>1||e.scrollHeight-e.clientHeight>1;})
     .map(e=>e.className+' '+e.textContent.slice(0,22));
   const wrap=[...t.querySelectorAll('.ladfull .lnm')].filter(e=>
     e.getBoundingClientRect().height>parseFloat(getComputedStyle(e).lineHeight)*1.4).length;
   const small=[...t.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);
     return s.display!=='none'&&parseFloat(s.fontSize)<10&&(e.textContent||'').trim();}).length;
   const o=k+': tip '+Math.round(tr.width)+'x'+Math.round(tr.height)+
     ' inside '+(tr.bottom<=st.bottom+1&&tr.top>=st.top-1&&tr.right<=st.right+1&&tr.left>=st.left-1)+
     ' | rungs wrapped '+wrap+' | clipped '+(clip.length?clip.join(' / '):'none')+
     ' | under floor '+small+
     ' | ledger '+statParts(p)[k].map(x=>x.n+(x.v>0?' +':' \u2212')+Math.abs(x.v)).join(', ');
   c.onmouseleave();return o;});
 Object.assign(p,keep);drawInv();return out;})()
