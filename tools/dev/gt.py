#!/usr/bin/env python3
# ============================================================================
# gt.py - the session's hands on the running build. ONE command, six verbs.
#
#   python tools/dev/gt.py launch                 headless Chrome on THIS worktree
#   python tools/dev/gt.py eval a.js [b.js ...]   run probes, one connection
#   python tools/dev/gt.py arena p.js             load tools/harness.js, then p.js
#   python tools/dev/gt.py shot out.png [--setup s.js] [--clip x y w h scale]
#   python tools/dev/gt.py grep PATTERN           the prototype, without the base64
#   python tools/dev/gt.py check                  every inline <script> through node
#   python tools/dev/gt.py close                  shut the browser
#
# ⛔ WHY IT IS NOT `preview_start`. `docs/README.md` used to send every session
# to the preview server, and it does not work from here: the preview tool runs
# in the SESSION'S PRIMARY directory, so a desk at %USERPROFILE%\grimtoll-desks
# is never what gets served, and in a non-interactive session the pane is
# hidden, so `javascript_tool` times out and a screenshot returns "not
# compositing frames". `tools/playtest/eyes.py` drives a real headless Chrome
# over CDP and takes a `file://` URL. It deliberately has no `eval` verb - a
# playtester is not allowed one - so this file imports its CDP class and adds
# the verbs a LAYOUT session needs.
#
# ⛔ AND THE PORT IS DERIVED FROM THE WORKTREE, NOT PICKED. #234 typed a round
# port, connected to a browser ANOTHER DESK already had open there, and
# measured the wrong build for one call before noticing the URL in the launch
# output. Every connection now asserts the page is this worktree's prototype
# and refuses otherwise. That check is the whole reason this file exists rather
# than six one-liners in a scratchpad.
# ============================================================================
import argparse
import base64
import hashlib
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
PROTO = os.path.join(ROOT, 'prototype', 'grimtoll_slice.html')
EYES = os.path.join(ROOT, 'tools', 'playtest', 'eyes.py')
HARNESS = os.path.join(ROOT, 'tools', 'harness.js')
PROBES = os.path.join(HERE, 'probes')
LIB = os.path.join(PROBES, 'lib.js')


def out(s):
    """cp1251 stdout: never let a glyph in a result crash the measurement."""
    sys.stdout.write(str(s).encode('ascii', 'backslashreplace').decode('ascii') + '\n')


def load_eyes():
    """⚠ eyes.py's module body RUNS at import, and it reads sys.argv. Save and
    restore it or this file's own verbs are gone."""
    saved = sys.argv[:]
    sys.argv = [EYES]
    spec = importlib.util.spec_from_file_location('eyes', EYES)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    sys.argv = saved
    return m


def port_for(root):
    """deterministic per worktree, so two desks never collide and the same desk
    always finds its own browser again."""
    h = int(hashlib.sha1(os.path.abspath(root).encode('utf-8')).hexdigest()[:6], 16)
    return 9500 + (h % 400)


def url_for(path):
    return 'file:///' + os.path.abspath(path).replace('\\', '/')


def same_url(a, b):
    """⛔ THE BROWSER PERCENT-ENCODES WHAT WE HAND IT, AND THIS REPO'S PATH IS
    CYRILLIC. `location.href` comes back as `Google%20%D0%94%D0%B8%D1%81%D0%BA`
    against the `Google Диск` we asked for, so a raw string compare refuses the
    MAIN desk - the one every session starts on - and tells you it is somebody
    else's browser. Unquote both sides. ⚠ `unquote`, never `unquote_plus`: the
    folder is literally called `Battle rothers + taletop`."""
    from urllib.parse import unquote
    n = lambda s: unquote(str(s or '')).replace('\\', '/').rstrip('/').lower()
    return n(a) == n(b)


def connect(port, expect=True, want=None):
    """⚠ `want` IS THE BUILD THIS COMMAND IS ABOUT, and it is not always this
    worktree's own prototype: the baseline-diff recipe in the `/drive` skill
    launches a SECOND browser on `git show HEAD:` written to a temp file, and an
    assertion hard-wired to `PROTO` refuses it. `--url` moves the check with the
    question. `expect=False` skips it and is only for `close`."""
    eyes = load_eyes()
    c = eyes.CDP(port)
    if expect:
        href = c.eval('location.href')
        want = url_for(want or PROTO)
        if not same_url(href, want):
            raise SystemExit('REFUSED: port %d is holding\n  %s\nand this command is about\n  %s\n'
                             'Run `gt.py launch` first, or name the build with --url.'
                             % (port, href, want))
    return c


# ---------------------------------------------------------------------------
def cmd_launch(a):
    eyes = load_eyes()
    port = a.port or port_for(ROOT)
    url = url_for(a.url or PROTO)
    try:                                   # already ours? then say so and stop
        c = eyes.CDP(port)
        if same_url(c.eval('location.href'), url):
            out(json.dumps({'port': port, 'url': url, 'reused': True}))
            return
        raise SystemExit('port %d is held by another page: %s' % (port, c.eval('location.href')))
    except SystemExit:
        raise
    except Exception:
        pass
    exe = eyes.find_browser(a.browser)
    # ⛔ THE PROFILE GOES IN TEMP, NOT IN THE REPO. Chrome writes ~2,000 files
    # into a fresh user-data-dir, and `git add tools/dev` swept the lot into the
    # index the first time this ran. A gitignore would work; keeping browser
    # state out of the working tree entirely is better.
    prof = a.profile or os.path.join(tempfile.gettempdir(), 'gt-chrome-%d' % port)
    os.makedirs(prof, exist_ok=True)
    cmd = [exe, '--remote-debugging-port=%d' % port, '--user-data-dir=' + prof,
           '--headless=new', '--window-size=%d,%d' % (eyes.VIEW_W + 20, eyes.VIEW_H + 60),
           '--no-first-run', '--no-default-browser-check', '--mute-audio',
           '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
           '--disable-backgrounding-occluded-windows', '--hide-scrollbars',
           '--remote-allow-origins=*', '--disable-features=TranslateUI', url]
    flags = (subprocess.CREATE_NEW_PROCESS_GROUP | getattr(subprocess, 'DETACHED_PROCESS', 0)
             ) if os.name == 'nt' else 0
    p = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                         creationflags=flags)
    end = time.time() + 30
    while time.time() < end:
        try:
            import urllib.request
            urllib.request.urlopen('http://127.0.0.1:%d/json/version' % port, timeout=2).read()
            break
        except Exception:
            time.sleep(0.4)
    else:
        raise SystemExit('browser did not open a debugging port')
    c = eyes.CDP(port)
    c.wait_ready(40)
    time.sleep(1.0)
    out(json.dumps({'pid': p.pid, 'port': port, 'url': c.eval('location.href')}))


def cmd_eval(a):
    c = connect(a.port or port_for(ROOT), want=a.url or None)
    lib = ''
    if os.path.exists(LIB) and not a.nolib:
        with open(LIB, 'r', encoding='utf-8') as f:
            lib = f.read() + '\n;\n'
    for name in a.probe:
        path = name if os.path.exists(name) else os.path.join(PROBES, name)
        with open(path, 'r', encoding='utf-8') as f:
            src = f.read()
        r = c.eval(lib + src, timeout=a.timeout)
        out('--- ' + os.path.basename(path) + ' ---')
        try:
            out(json.dumps(r, indent=1, ensure_ascii=True))
        except Exception:
            out(repr(r))


def cmd_arena(a):
    c = connect(a.port or port_for(ROOT), want=a.url or None)
    with open(HARNESS, 'r', encoding='utf-8') as f:
        c.eval(f.read())
    if c.eval('typeof runFight') != 'function':
        raise SystemExit('harness did not take')
    for name in a.probe:
        path = name if os.path.exists(name) else os.path.join(PROBES, name)
        with open(path, 'r', encoding='utf-8') as f:
            r = c.eval(f.read(), timeout=a.timeout)
        out('--- ' + os.path.basename(path) + ' ---')
        try:
            out(json.dumps(r, indent=1, ensure_ascii=True))
        except Exception:
            out(repr(r))


def cmd_shot(a):
    c = connect(a.port or port_for(ROOT), want=a.url or None)
    if a.setup:
        path = a.setup if os.path.exists(a.setup) else os.path.join(PROBES, a.setup)
        with open(path, 'r', encoding='utf-8') as f:
            out(repr(c.eval(f.read(), timeout=a.timeout))[:400])
    params = {'format': 'png'}
    if a.clip:
        x, y, w, h, sc = [float(v) for v in a.clip]
        params['captureBeyondViewport'] = True
        params['clip'] = {'x': x, 'y': y, 'width': w, 'height': h, 'scale': sc}
    r = c.call('Page.captureScreenshot', params)
    with open(a.out, 'wb') as f:
        f.write(base64.b64decode(r['data']))
    out('wrote ' + a.out)


def cmd_grep(a):
    """⛔ A PLAIN GREP OVER THE PROTOTYPE RETURNS MEGABYTES. 337 lines hold 27.5
    MB of base64 and half of them contain any short pattern you can think of.
    Filtering with `awk 'length<600' | grep -n` RENUMBERS the output, which sent
    #234 to read the wrong 60 lines twice. So the filter happens here, with the
    real line numbers kept."""
    import re
    pat = re.compile(a.pattern, 0 if a.case else re.I)
    n = 0
    with open(a.file or PROTO, 'r', encoding='utf-8', errors='replace') as f:
        for i, line in enumerate(f, 1):
            if len(line) > a.max:
                continue
            if pat.search(line):
                n += 1
                if n > a.head:
                    out('... more, raise --head')
                    return
                out('%d: %s' % (i, line.rstrip()[:a.width]))
    if not n:
        out('(no match on lines under %d chars)' % a.max)


def cmd_check(a):
    js = os.path.join(HERE, 'jscheck.js')
    r = subprocess.run(['node', js, a.file or PROTO], capture_output=True, text=True)
    out(r.stdout.strip() or r.stderr.strip())
    sys.exit(r.returncode)


def cmd_close(a):
    try:
        connect(a.port or port_for(ROOT), expect=False).call('Browser.close')
        out('closed')
    except Exception as e:
        out('nothing to close (%s)' % e)


def main():
    # ⚠ `--port` AND `--url` SIT ON BOTH SIDES OF THE VERB ON PURPOSE. argparse
    # accepts a top-level option only BEFORE the subcommand, and
    # `gt.py eval x.js --port 9999` is what anybody actually types. A shared
    # parent parser gives both spellings one definition.
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument('--port', type=int, default=0)
    common.add_argument('--url', default='',
                        help='the build this command is about (default: this worktree)')
    ap = argparse.ArgumentParser(prog='gt.py', parents=[common])
    sub = ap.add_subparsers(dest='cmd', required=True)

    p = sub.add_parser('launch', parents=[common]); p.add_argument('--browser', default='chrome')
    p.add_argument('--profile', default='')
    p.set_defaults(fn=cmd_launch)

    p = sub.add_parser('eval', parents=[common]); p.add_argument('probe', nargs='+')
    p.add_argument('--timeout', type=int, default=120); p.add_argument('--nolib', action='store_true')
    p.set_defaults(fn=cmd_eval)

    p = sub.add_parser('arena', parents=[common]); p.add_argument('probe', nargs='+')
    p.add_argument('--timeout', type=int, default=900)
    p.set_defaults(fn=cmd_arena)

    p = sub.add_parser('shot', parents=[common]); p.add_argument('out')
    p.add_argument('--setup', default=''); p.add_argument('--clip', nargs=5, default=None)
    p.add_argument('--timeout', type=int, default=120)
    p.set_defaults(fn=cmd_shot)

    p = sub.add_parser('grep', parents=[common]); p.add_argument('pattern')
    p.add_argument('--file', default=''); p.add_argument('--max', type=int, default=600)
    p.add_argument('--head', type=int, default=80); p.add_argument('--width', type=int, default=200)
    p.add_argument('--case', action='store_true')
    p.set_defaults(fn=cmd_grep)

    p = sub.add_parser('check', parents=[common]); p.add_argument('--file', default='')
    p.set_defaults(fn=cmd_check)

    p = sub.add_parser('close', parents=[common]); p.set_defaults(fn=cmd_close)

    a = ap.parse_args()
    a.fn(a)


main()
