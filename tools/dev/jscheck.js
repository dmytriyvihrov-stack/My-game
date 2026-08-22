/* ═══════════════════════════════════════════════════════════════════════
   jscheck.js - every script the prototype runs, through node's parser.

     node tools/dev/jscheck.js [file]        (or: python tools/dev/gt.py check)

   ⛔ THE CHEAP GATE AFTER EVERY PATCH, AND IT HAS EARNED ITS PLACE. A scripted
   edit to a large file can swallow a quote and the page then dies at parse
   time, which in a headless run looks like "the browser did not come up"
   rather than like a syntax error. This costs under a second and names the
   line. #191 caught a swallowed quote with it in one run.

   ⛔ #235 - AND IT FOLLOWS `<script src>` NOW, BECAUSE THE ART LEFT THE FILE.
   26.8 MB of it lives in art/embed/*.js and is loaded with a script tag; a
   check that only read inline scripts would have gone on saying "0 errors"
   over a build whose paintings did not parse. It did, for one round.

   ⛔ AND IT STRIPS HTML COMMENTS FIRST, WHICH IS THE OTHER HALF OF THAT SAME
   ROUND. The comment introducing those tags contained the words "an inline
   <script> holding the file", and a scanner that does not know what a comment
   is matched THAT and tried to parse English as JavaScript. The error it
   printed ("Unexpected identifier 'the'") pointed at a line that was never
   going to run.
   ⚠ It compiles, it does not execute: nothing here touches the game.
   ═══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const P = process.argv[2] ||
  path.join(__dirname, '..', '..', 'prototype', 'grimtoll_slice.html');
const raw = fs.readFileSync(P, 'utf8');
const dir = path.dirname(path.resolve(P));

/* blank the comments rather than deleting them, so every line number below is
   still the line number in the real file */
const src = raw.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));

let n = 0, bad = 0;

const check = (label, body, line) => {
  n++;
  try { new vm.Script(body); }
  catch (e) { bad++; console.log(label + (line ? ' (opens at line ' + line + ')' : '') + ': ' + e.message); }
};

/* the inline ones */
const inline = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m;
while ((m = inline.exec(src))) {
  check('inline script #' + (n + 1), m[1], src.slice(0, m.index).split('\n').length);
}

/* and the ones it loads */
const ext = /<script[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
while ((m = ext.exec(src))) {
  const p = path.resolve(dir, m[1]);
  if (!fs.existsSync(p)) {
    n++; bad++;
    console.log('MISSING: ' + m[1] + ' (referenced at line ' + src.slice(0, m.index).split('\n').length + ')');
    continue;
  }
  const mb = (fs.statSync(p).size / 1048576).toFixed(2);
  check(m[1] + ' [' + mb + ' MB]', fs.readFileSync(p, 'utf8'), 0);
}

console.log(n + ' scripts, ' + bad + ' with problems');
process.exit(bad ? 1 : 0);
