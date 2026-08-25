(() => {
  startBattle('pack');
  const bitch=B.units.find(x=>x.name==='The Bitch');
  const dog=B.units.find(x=>x.kind==='dog'&&x!==bitch&&!x.dead);
  const you=B.units.find(x=>x.side==='you'&&!x.dead);
  /* put the dog next to one of yours, the Bitch next to the dog */
  const n=nbrs(you.col,you.row).find(p=>!at(p[0],p[1]));
  dog.col=n[0];dog.row=n[1];
  const nb=nbrs(dog.col,dog.row).find(p=>!at(p[0],p[1])); bitch.col=nb[0];bitch.row=nb[1];
  const snap=dog.acts.find(a=>a.bounce);
  const before={dogAt:[dog.col,dog.row],bitchAt:[bitch.col,bitch.row],
                dBitch:udist(dog,bitch),dYou:udist(dog,you),
                hit:auraSum(dog,'hit'),dodge:auraSum(dog,'dodge'),auras:aurasOn(dog).map(a=>a.n)};
  B.idx=B.order.indexOf(dog);
  let threw=null;
  try{strike(dog,you,snap);}catch(e){threw=e.message;}
  const after={dogAt:[dog.col,dog.row],dBitch:udist(dog,bitch),dYou:udist(dog,you),
               hit:auraSum(dog,'hit'),dodge:auraSum(dog,'dodge'),auras:aurasOn(dog).map(a=>a.n)};
  /* and what it looks like if the bounce takes it further than her radius */
  dog.col=Math.min(COLS-1,bitch.col+4);
  const far={dBitch:udist(dog,bitch),hit:auraSum(dog,'hit'),auras:aurasOn(dog).map(a=>a.n)};
  return {threw:threw, bounce:snap.bounce, radius:bitch.aura.r, before:before, after:after, far:far};
})()
