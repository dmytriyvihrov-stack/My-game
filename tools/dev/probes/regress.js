/* the eight fights, both AI brains, one line each.

     python tools/dev/gt.py arena regress.js

   ⚠ THE GATE HERE IS `no ERR / no FATAL / no HIT GUARD`, NOT the round counts.
   Each row is a single unseeded run, so the rounds and the winner differ
   between two builds for no reason at all - and they differ between two runs
   of the SAME build once any probe has moved the RNG. A round-count diff is
   only a finding at n>=20 a side (`.claude` memory: n=6 cannot tell 0% from
   20%, and a MINIMUM over n is the unluckiest sample rather than a
   measurement).
   ⚑ `runFight` stubs `render`, `fx`, `say`, `sfx`, `paintTerrain` AND
   `JOURNAL.put` - the last one because it is the only output of this rig that
   outlives the page, and regression runs had been growing the player's own
   record. It restores all of them in a `finally`, so let it finish. */
(() => regress({ comp: 'prepared' }))()
