# -*- coding: utf-8 -*-
"""#266 - resolve the merge with #265. Both sides keep everything; my question
   codes are RENAMED because #265 landed first and a code is never reissued."""
import io, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..'))


def read(p):
    with open(p, 'rb') as f:
        raw = f.read()
    return raw.decode('utf-8').replace('\r\n', '\n'), b'\r\n' in raw


def write(p, s, crlf):
    if crlf:
        s = s.replace('\n', '\r\n')
    data = s.encode('utf-8')
    tmp = p + '.tmp'
    with open(tmp, 'wb') as f:
        f.write(data)
    os.replace(tmp, p)


# ── the backlog: two rows, mine on top (newest first, the file's own order) ──
p = os.path.join(ROOT, 'docs', '00_PLAN_AND_BACKLOG.md')
s, crlf = read(p)
m = re.search(r'<<<<<<< HEAD\n(.*?)\n=======\n(.*?)\n>>>>>>> main\n', s, re.S)
assert m, 'backlog: no conflict found'
s = s[:m.start()] + m.group(1) + '\n' + m.group(2) + '\n' + s[m.end():]
write(p, s, crlf)
print('backlog: both rows kept, #266 above #265')

# ── OPEN_QUESTIONS: both groups, and MY codes move to R ──
p = os.path.join(ROOT, 'docs', 'OPEN_QUESTIONS.md')
s, crlf = read(p)
m = re.search(r'<<<<<<< HEAD\n(.*?)\n=======\n(.*?)\n>>>>>>> main\n', s, re.S)
assert m, 'open-questions: no conflict found'
mine, theirs = m.group(1), m.group(2)
# ⛔ A CODE IS NEVER REISSUED (.claude/rules/open-questions.md). #265 committed
#    to main first, so Q1-Q3 are its codes and mine become R1-R3. Renaming the
#    LANDED entry's rows instead would strand an answer he may already be
#    writing against the number in the file he has.
assert '## Q · From #266' in mine and '## Q · From #265' in theirs
mine = mine.replace('## Q · From #266', '## R · From #266')
mine = re.sub(r'\*\*Q(\d)\*\* · #266', lambda x: '**R%s** · #266' % x.group(1), mine)
mine = mine.replace('`SHEET_TRAIT_STATS = true`', '`SHEET_TRAIT_STATS = true`')
s = s[:m.start()] + mine + '\n' + theirs + '\n' + s[m.end():]
write(p, s, crlf)
print('open-questions: #266 renumbered Q1-Q3 -> R1-R3, both groups kept')
