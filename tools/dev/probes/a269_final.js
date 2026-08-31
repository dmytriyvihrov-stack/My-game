/* #269 - the screens, driven. */
(function(){
  const out={};
  /* 25 - Coldharrow */
  if(!G.run)newRun();
  G.at='vill';G.vill=null;
  try{openVillage();out.villThrew=null;}catch(e){out.villThrew=String(e);}
  const w=document.getElementById('wChoices');
  out.villChoices=w?[].slice.call(w.querySelectorAll('.choice')).map(b=>b.querySelector('b').textContent):[];
  out.villOverflow=$('wDlg').scrollHeight-$('wDlg').clientHeight;
  $('wDlg').classList.remove('on');
  /* 17 - the enemy card's three marks */
  startBattle('pack');
  const foe=B.units.find(u=>u.side==='foe');
  GT.playerTurn();
  render();
  const hx=GT.hexOf(foe);
  inspect(foe,{clientX:400,clientY:300,target:hx,currentTarget:hx});
  const rd=document.querySelector('#bRead,.readcard,.read');
  out.enemyCardRows=rd?[].slice.call(rd.querySelectorAll('.rr')).slice(0,3)
    .map(r=>r.children[0].textContent+' '+(r.children[1]?r.children[1].textContent.trim():'')):'no card';
  /* 3 - the capstone sentence, as the sheet prints it */
  out.capstone=['str','agi','int','mor'].map(k=>k+': '+
    heldText(k,4).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
  /* 24 - the cub */
  out.cubDoors=(function(){try{startBattle('mother');
    B.units.filter(u=>u.side==='foe').forEach(u=>{if(u.monster==='wyrm')u.dead=true;});
    cubChoice();
    return [].slice.call(document.querySelectorAll('#sCard .popt')).map(b=>b.querySelector('b').textContent);
  }catch(e){return String(e);}})();
  return out;
})()
