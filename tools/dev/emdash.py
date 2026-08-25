#!/usr/bin/env python
"""⛔ The repo states a hard rule - no em dash, anywhere - and for 878 of them in
`docs/` it did not keep it.

#199 swept the GAME and stopped, correctly: telling a player-facing string from a
code sample inside one 3.4 MB HTML file needs a real lexer. **Markdown is not that
problem.** A fenced block opens and closes on ``` and an inline span on a backtick,
so the whole lexer is the two rules below, and the reason the docs went unswept for
four days was that the game's difficulty was assumed to carry over.

    python tools/dev/emdash.py            # count, per file, by where it sits
    python tools/dev/emdash.py --fix      # rewrite prose only, never code

⚠ CODE IS NEVER TOUCHED. A fenced block may hold a probe whose regex TESTS for an
em dash (`.claude/rules/` has exactly one, and it is why that directory reads as
clean rather than as swept).

⛑ THE REPLACEMENT IS THE HOUSE FORM AND NOT A JUDGEMENT CALL. Spaced ` — ` becomes
` - `, which is what every file written since #199 already uses; tight `a—b` becomes
`a-b`. Rewriting a parenthetical into a comma would read better and is not
mechanical, so it is not done here: this closes the RULE, and prose that wants a
comma can have one the next time somebody edits the line.
"""
import io, os, re, sys

EM = '\u2014'
DOCS = 'docs'

# ⛔ TWO KINDS OF FILE ARE OUT, AND ONLY ONE OF THEM IS ABOUT EFFORT.
#
# `docs/playtests/` is a RECORD OF WHAT A HUMAN WAS SHOWN. Those four files are
# Dima's, Sanya's and Andrey's 2026-08-16 runs, taken on a build three days older
# than #199's game sweep, so every em dash in them is a faithful capture of text
# the game really printed that day. **A transcript that is corrected is not a
# transcript.** Same argument as the changelog's own header: the record says what
# was, and the build says what is.
#
# The frozen `docs/archive/CHANGELOG_*` pair, `PLAN_REASONING`, `README_WHERE_IT_
# STOOD` and `MOLE_PEOPLE` are closed: nothing appends to them, so a rule about
# what WE WRITE has nothing to bite on, and rewriting 975 dashes there would be a
# diff nobody can read over a file nobody edits.
# ⚠ `docs/archive/BACKLOG_ENTRY_SPECS.md` IS NOT IN THAT SET and is swept. It
# lives under `archive/` for size, not for status - the backlog links a session
# into it for every entry's full spec, and new specs are written there.
SKIP = ('docs/playtests/',
        'docs/archive/CHANGELOG_BUILD_LOG_pre_8f200.md',
        'docs/archive/CHANGELOG_BUILT_ENTRY_TEXT.md',
        'docs/archive/PLAN_REASONING.md',
        'docs/archive/README_WHERE_IT_STOOD.md',
        'docs/archive/MOLE_PEOPLE_PARKED_CONCEPT.md')



def split_prose(line):
    """(prose, code) halves of one line, by inline backtick spans."""
    return re.sub(r'`[^`]*`', lambda m: ' ' * len(m.group(0)), line), line


def walk(text, fix):
    out, fence, n_prose, n_code = [], False, 0, 0
    for line in text.split('\n'):
        if line.lstrip().startswith('```'):
            fence = not fence
            out.append(line)
            continue
        if fence or EM not in line:
            n_code += line.count(EM) if fence else 0
            out.append(line)
            continue
        # inline code spans are masked, counted as code, and put back untouched
        masked, _ = split_prose(line)
        n_prose += masked.count(EM)
        n_code += line.count(EM) - masked.count(EM)
        if fix:
            pieces, i = [], 0
            for m in re.finditer(r'`[^`]*`', line):
                pieces.append(sub(line[i:m.start()])); pieces.append(m.group(0)); i = m.end()
            pieces.append(sub(line[i:]))
            line = ''.join(pieces)
        out.append(line)
    return '\n'.join(out), n_prose, n_code


def sub(s):
    s = s.replace(' ' + EM + ' ', ' - ')
    s = s.replace(EM + ' ', '- ').replace(' ' + EM, ' -')
    return s.replace(EM, '-')


def main():
    fix = '--fix' in sys.argv
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    total_p = total_c = 0
    for dirpath, _, names in os.walk(os.path.join(root, DOCS)):
        for name in sorted(names):
            if not name.endswith('.md'):
                continue
            p = os.path.join(dirpath, name)
            rel0 = os.path.relpath(p, root).replace(os.sep, '/')
            if any(rel0.startswith(k) for k in SKIP):
                continue
            raw = io.open(p, 'rb').read()
            crlf = b'\r\n' in raw
            s = raw.decode('utf-8').replace('\r\n', '\n')
            new, np, nc = walk(s, fix)
            if not (np or nc):
                continue
            total_p += np; total_c += nc
            rel = os.path.relpath(p, root).replace(os.sep, '/')
            print('%-52s prose %-5d code %d' % (rel, np, nc))
            if fix and new != s:
                io.open(p + '.tmp', 'wb').write(
                    new.replace('\n', '\r\n' if crlf else '\n').encode('utf-8'))
                os.replace(p + '.tmp', p)
    print('---\ntotal prose %d  code %d%s' % (total_p, total_c, '  (rewritten)' if fix else ''))
    return 1 if (total_p and not fix) else 0


if __name__ == '__main__':
    sys.exit(main())
