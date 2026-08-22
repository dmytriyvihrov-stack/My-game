/* ═══════════════════════════════════════════════════════════════════════
   jscheck.js - every inline <script> in the prototype through vm.Script.

     node tools/dev/jscheck.js [file]        (or: python tools/dev/gt.py check)

   ⛔ THE CHEAP GATE AFTER EVERY PATCH, AND IT HAS EARNED ITS PLACE. A scripted
   edit to a 30 MB file can swallow a quote and the page then dies at parse
   time, which in a headless run looks like "the browser did not come up"
   rather than like a syntax error. This costs under a second and names the
   line. #191 caught a swallowed quote with it in one run.
   ⚠ It compiles, it does not execute: nothing here touches the game.
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const P = process.argv[2] ||
  path.join(__dirname, '..', '..', 'prototype', 'grimtoll_slice.html');
const src = fs.readFileSync(P, 'utf8');
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, n = 0, bad = 0;
while ((m = re.exec(src))) {
  n++;
  const line = src.slice(0, m.index).split('\n').length;
  try { new vm.Script(m[1]); }
  catch (e) { bad++; console.log('script #' + n + ' (opens at line ' + line + '): ' + e.message); }
}
console.log(n + ' inline scripts, ' + bad + ' with syntax errors');
process.exit(bad ? 1 : 0);
