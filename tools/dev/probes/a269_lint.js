/* #269 - LINT clean, then rule 15 proved by making it fire. */
(function(){
  const n0=LINT();
  const keep=TRAITS.twitchy.up;TRAITS.twitchy.up='+2 AGI';
  const seeded=LINT().items.filter(f=>f.cat==='trait').map(f=>f.where+': '+f.what);
  TRAITS.twitchy.up=keep;
  const n1=LINT();
  return {findings:n0.findings,items:n0.items.map(f=>f.cat+' '+f.where+': '+f.what),
          seeded:seeded,restored:n1.findings};
})()
