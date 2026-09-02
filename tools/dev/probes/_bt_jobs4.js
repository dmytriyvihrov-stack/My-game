/* what a haul of artifacts is worth, on a level-4 company that has NOT spent
   its free class pick - so the swing is the gear and nothing else. */
(() => {
  const mk = window.BT_MK, C = ARENA.COMPS;
  C.L4_t1  = mk(4, {trinket:{'*':'bone'}});
  C.L4_t2  = mk(4, {trinket:{captain:'coldthing', archer:'glasses', spear:'tooth', warmage:'apple'}});
  C.L4_t3  = mk(4, {trinket:{captain:'roll', archer:'oddcoin', spear:'cubtooth', warmage:'stem'}});
  C.L4_arm = mk(4, {eq:{'*':{armour:'mail'}}});
  C.L4_wep = mk(4, {eq:{captain:{main:'maul'}, spear:{main:'harpoon'},
                        archer:{main:'crossbow'}, warmage:{main:'rod'}}});
  const F = ['brigand','pack'], J = [];
  ['L4_t1','L4_t2','L4_t3','L4_arm','L4_wep'].forEach(c => F.forEach(k => J.push([c,k])));
  window.BT_JOBS = J; window.BT_N = 20; window.BT_MS = 60000;
  return {jobs:J.length};
})()
