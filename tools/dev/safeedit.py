#!/usr/bin/env python3
# ============================================================================
# safeedit.py - the one door every scripted edit to the prototype goes through.
#
#   from safeedit import patch
#   patch([(old, new), (old, new)])          # the prototype in THIS worktree
#   patch([(old, new)], path=SOME_DOC)       # any file inside this worktree
#
# ⛔ WHY THIS FILE EXISTS AT ALL. `prototype/grimtoll_slice.html` is one 30 MB
# file, 91% of which is 337 lines of embedded base64, and there is no second
# copy of it. Three things follow, and every one has cost this project a
# session:
#
#   1. `open(p,'w')` TRUNCATES BEFORE IT ENCODES. A UnicodeEncodeError raised
#      part-way through the write leaves a 0-byte prototype. #191 lost the
#      whole file to a lone-surrogate emoji escape, with nothing committed.
#      So: encode to bytes FIRST, write a temp file, os.replace() it in.
#   2. THE FILE IS CRLF (`.gitattributes` says `* text=auto`, the working copy
#      is Windows). Reading BYTES and matching a pattern written with `\n`
#      matches nothing, SILENTLY, and reads exactly like a typo in a 200-line
#      anchor. So: normalise to `\n` in memory, restore the file's own
#      convention on the way out.
#   3. AN ANCHOR THAT MATCHES TWICE IS WORSE THAN ONE THAT MISSES. Every `old`
#      must match exactly once. If any of them does not, NOTHING is written -
#      not the ones that matched, not a partial file.
#
# ⛔ AND IT REFUSES TO WRITE OUTSIDE ITS OWN WORKTREE. #234 pointed a rule-file
# patch at the MAIN checkout's `.claude/rules/` while working on a desk, and
# edited the shared tree instead of the branch. The mistake is invisible until
# `git status` in the other tree. Pass `force=True` only when the target really
# is meant to be somewhere else.
#
# ⚠ PRINT ASCII. Python's stdout in this environment is cp1251, so printing a
# `⚔` or a `═` from a check script raises and the failure reads like a bug in
# the code under test. Everything here goes through unicode_escape.
# ============================================================================
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))          # tools/dev -> tools -> worktree
PROTO = os.environ.get('GT_PROTO') or os.path.join(ROOT, 'prototype', 'grimtoll_slice.html')


def _ascii(s):
    return str(s).encode('unicode_escape').decode('ascii')


def _inside(path):
    try:
        return os.path.commonpath([os.path.abspath(path), ROOT]) == ROOT
    except ValueError:            # different drive
        return False


def read(path=None):
    """-> (text with LF endings, whether the file on disk was CRLF)"""
    path = path or PROTO
    with open(path, 'rb') as f:
        raw = f.read()
    return raw.replace(b'\r\n', b'\n').decode('utf-8'), (b'\r\n' in raw)


def write(text, crlf, path=None, force=False):
    path = path or PROTO
    if not force and not _inside(path):
        raise SystemExit('REFUSED: %s is outside this worktree (%s).\n'
                         'A desk edits its own branch. Pass force=True if you really mean it.'
                         % (_ascii(path), _ascii(ROOT)))
    data = text.encode('utf-8')                        # encode FIRST: an error here writes nothing
    if crlf:
        data = data.replace(b'\n', b'\r\n')
    tmp = path + '.tmp'
    with open(tmp, 'wb') as f:
        f.write(data)
    os.replace(tmp, path)


def patch(pairs, path=None, count=1, force=False, quiet=False):
    """pairs: [(old, new), ...]. Every `old` must match exactly `count` times
    or NOTHING is written."""
    text, crlf = read(path)
    bad = []
    for i, (old, new) in enumerate(pairs):
        n = text.count(old)
        if n != count:
            bad.append('  [%d] matched %d times, wanted %d:\n      %s'
                       % (i, n, count, _ascii(old[:140].replace('\n', ' | '))))
    if bad:
        print('NOTHING WRITTEN - %d of %d anchors are wrong' % (len(bad), len(pairs)))
        print('\n'.join(bad))
        sys.exit(1)
    for old, new in pairs:
        text = text.replace(old, new)
    write(text, crlf, path, force)
    if not quiet:
        print('ok: %d edits -> %s' % (len(pairs), _ascii(os.path.relpath(path or PROTO, ROOT))))
