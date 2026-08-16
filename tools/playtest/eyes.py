#!/usr/bin/env python3
"""
eyes.py - the playtester's eyes and hands.

One file, standard library only (the machine has no node and the python here is the
one build_event_sites.py already uses). It talks to a headless Chrome/Edge over the
DevTools protocol and offers that browser to a `claude -p` process as an MCP server
named "game", so the persona can play the build and NOTHING ELSE: it has no Read, no
Bash, no docs, no memory. What it can see is decided HERE, per persona, which is the
point: a tester with weak eyesight does not get asked to pretend small text is
unreadable, the server blurs it before he sees it.

    python eyes.py launch  --port 9301 --profile DIR --url URL [--browser chrome|edge]
    python eyes.py serve   --port 9301 --out DIR --vision normal|weak --budget 150 [--who dima]
    python eyes.py cli     --port 9301 look|shot [file]|click X Y|key K|type T|wait S|dump|wipe|close
    python eyes.py thoughts TRANSCRIPT.jsonl > thoughts.md

`serve` is what run.ps1 puts in the MCP config. It ATTACHES to a browser that
`launch` started, and never starts one itself, so the browser outlives the model
and the runner can `dump` the game's own telemetry after the tester has gone.

Coordinates: everything the tester sees or gives is in ONE frame, the frame of its
own screenshot. A weak-vision tester's screenshot is scaled by VISION['shot'], and
its look() coordinates and its clicks are in that same scaled frame. The server
converts. Nobody has to multiply.
"""
import sys, os, re, json, socket, struct, base64, hashlib, time, subprocess, argparse, urllib.request

# ---------------------------------------------------------------- vision profiles
# shot: screenshot scale.  minfs: text below this computed font-size is blurred.
# tinypx: a one-or-two-glyph mark in a box smaller than this is "a tiny mark".
# squint: whether the tester may lean in (a close-up of a region at full scale).
VISION = {
    'normal': dict(shot=1.0,  minfs=0,  tinypx=0,  squint=False),
    'weak':   dict(shot=0.5,  minfs=13, tinypx=20, squint=True),
}
VIEW_W, VIEW_H = 1280, 800
CHECKPOINT_EVERY = 20         # hand-actions between "rate your interest" prompts
WARN_LEFT = 12                # actions left when the wrap-up warning starts

# ---------------------------------------------------------------- websocket (client)
class WS:
    def __init__(self, url, timeout=120):
        m = re.match(r'ws://([^:/]+):(\d+)(/.*)', url)
        host, port, path = m.group(1), int(m.group(2)), m.group(3)
        self.sock = socket.create_connection((host, port), timeout=timeout)
        key = base64.b64encode(os.urandom(16)).decode()
        req = ('GET %s HTTP/1.1\r\nHost: %s:%d\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n'
               'Sec-WebSocket-Key: %s\r\nSec-WebSocket-Version: 13\r\n\r\n') % (path, host, port, key)
        self.sock.sendall(req.encode())
        buf = b''
        while b'\r\n\r\n' not in buf:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise RuntimeError('websocket handshake: connection closed')
            buf += chunk
        head, _, rest = buf.partition(b'\r\n\r\n')
        if b' 101 ' not in head.split(b'\r\n')[0]:
            raise RuntimeError('websocket handshake refused: ' + head.decode(errors='replace')[:200])
        self.buf = rest

    def _exact(self, n):
        while len(self.buf) < n:
            chunk = self.sock.recv(min(1 << 20, max(4096, n - len(self.buf))))
            if not chunk:
                raise RuntimeError('websocket closed')
            self.buf += chunk
        out, self.buf = self.buf[:n], self.buf[n:]
        return out

    def _frame(self, op, data):
        hdr = bytearray([0x80 | op])
        n = len(data)
        if n < 126:
            hdr.append(0x80 | n)
        elif n < 65536:
            hdr.append(0x80 | 126); hdr += struct.pack('>H', n)
        else:
            hdr.append(0x80 | 127); hdr += struct.pack('>Q', n)
        mask = os.urandom(4)
        hdr += mask
        masked = bytes(b ^ mask[i & 3] for i, b in enumerate(data))
        self.sock.sendall(bytes(hdr) + masked)

    def send(self, text):
        self._frame(0x1, text.encode('utf-8'))

    def recv(self):
        msg = b''
        while True:
            b0, b1 = self._exact(2)
            fin, op = b0 & 0x80, b0 & 0x0f
            n, masked = b1 & 0x7f, b1 & 0x80
            if n == 126:
                n = struct.unpack('>H', self._exact(2))[0]
            elif n == 127:
                n = struct.unpack('>Q', self._exact(8))[0]
            mk = self._exact(4) if masked else None
            payload = self._exact(n)
            if mk:
                payload = bytes(b ^ mk[i & 3] for i, b in enumerate(payload))
            if op == 0x9:
                self._frame(0xA, payload); continue
            if op == 0x8:
                raise RuntimeError('websocket closed by browser')
            if op in (0x0, 0x1, 0x2):
                msg += payload
                if fin:
                    return msg.decode('utf-8', errors='replace')

# ---------------------------------------------------------------- CDP
class CDP:
    def __init__(self, port):
        self.port = port
        info = json.load(urllib.request.urlopen('http://127.0.0.1:%d/json' % port, timeout=10))
        pages = [t for t in info if t.get('type') == 'page' and not t.get('url', '').startswith('devtools')]
        if not pages:
            raise RuntimeError('no page target on port %d' % port)
        self.ws = WS(pages[0]['webSocketDebuggerUrl'])
        self.mid = 0
        self.call('Page.enable'); self.call('Runtime.enable')
        self.call('Emulation.setDeviceMetricsOverride',
                  {'width': VIEW_W, 'height': VIEW_H, 'deviceScaleFactor': 1, 'mobile': False})

    def call(self, method, params=None, timeout=90):
        self.mid += 1
        mid = self.mid
        self.ws.send(json.dumps({'id': mid, 'method': method, 'params': params or {}}))
        end = time.time() + timeout
        while time.time() < end:
            msg = json.loads(self.ws.recv())
            if msg.get('id') == mid:
                if 'error' in msg:
                    raise RuntimeError('%s: %s' % (method, msg['error']))
                return msg.get('result', {})
        raise TimeoutError(method)

    def eval(self, expr, timeout=60):
        r = self.call('Runtime.evaluate', {'expression': expr, 'returnByValue': True,
                                           'awaitPromise': True}, timeout)
        if 'exceptionDetails' in r:
            d = r['exceptionDetails']
            raise RuntimeError('page threw: ' + str(d.get('exception', {}).get('description') or d.get('text')))
        return r.get('result', {}).get('value')

    def wait_ready(self, secs=30):
        end = time.time() + secs
        while time.time() < end:
            try:
                if self.eval('document.readyState') == 'complete':
                    return True
            except Exception:
                pass
            time.sleep(0.3)
        return False

    def mouse(self, x, y, kind, button='none', clicks=0, dx=0, dy=0):
        p = {'type': kind, 'x': float(x), 'y': float(y), 'button': button, 'clickCount': clicks}
        if kind == 'mouseWheel':
            p['deltaX'] = dx; p['deltaY'] = dy
        self.call('Input.dispatchMouseEvent', p)

    def click(self, x, y):
        self.mouse(x, y, 'mouseMoved')
        time.sleep(0.05)
        self.mouse(x, y, 'mousePressed', 'left', 1)
        time.sleep(0.05)
        self.mouse(x, y, 'mouseReleased', 'left', 1)

    KEYS = {'enter': ('Enter', 'Enter', 13), 'escape': ('Escape', 'Escape', 27), 'esc': ('Escape', 'Escape', 27),
            'space': (' ', 'Space', 32), 'tab': ('Tab', 'Tab', 9), 'backspace': ('Backspace', 'Backspace', 8),
            'left': ('ArrowLeft', 'ArrowLeft', 37), 'right': ('ArrowRight', 'ArrowRight', 39),
            'up': ('ArrowUp', 'ArrowUp', 38), 'down': ('ArrowDown', 'ArrowDown', 40)}

    def key(self, name):
        k = name.strip()
        low = k.lower()
        if low in self.KEYS:
            key, code, vk = self.KEYS[low]
            text = ' ' if low == 'space' else ''
        elif len(k) == 1:
            key = k; text = k
            up = k.upper()
            code = ('Key' + up) if up.isalpha() else (('Digit' + k) if k.isdigit() else '')
            vk = ord(up) if (up.isalpha() or k.isdigit()) else 0
        else:
            raise ValueError('unknown key ' + name)
        down = {'type': 'keyDown' if text else 'rawKeyDown', 'key': key, 'code': code,
                'windowsVirtualKeyCode': vk, 'nativeVirtualKeyCode': vk}
        if text:
            down['text'] = text; down['unmodifiedText'] = text
        self.call('Input.dispatchKeyEvent', down)
        self.call('Input.dispatchKeyEvent', {'type': 'keyUp', 'key': key, 'code': code,
                                             'windowsVirtualKeyCode': vk, 'nativeVirtualKeyCode': vk})

    def insert_text(self, text):
        self.call('Input.insertText', {'text': text})

    def screenshot_png(self, scale=1.0, clip=None):
        c = clip or {'x': 0, 'y': 0, 'width': VIEW_W, 'height': VIEW_H}
        c = dict(c); c['scale'] = scale
        r = self.call('Page.captureScreenshot', {'format': 'png', 'clip': c})
        return r['data']

# ---------------------------------------------------------------- the LOOK script
# Runs in the page. Returns the visible, un-occluded, text-or-clickable elements in
# reading order with their computed font size, so the server can decide what a
# given pair of eyes actually gets out of the screen.
LOOK_JS = r"""
(function(){
  const W=innerWidth,H=innerHeight;
  const SKIP=new Set(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','HEAD','META','LINK','TITLE','svg','path','g','defs','use']);
  const out=[];
  function vis(el,cs,r){
    if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)===0)return false;
    if(r.width<2||r.height<2)return false;
    if(r.right<0||r.bottom<0||r.left>W||r.top>H)return false;
    return true;
  }
  function ownText(el){let s='';for(const n of el.childNodes)if(n.nodeType===3)s+=n.nodeValue;return s.replace(/\s+/g,' ').trim();}
  function inter(el,cs){const t=el.tagName;return t==='BUTTON'||t==='A'||t==='INPUT'||t==='SELECT'||t==='TEXTAREA'||!!el.onclick||el.getAttribute('role')==='button'||cs.cursor==='pointer';}
  /* 0 = in the open, 1 = behind a see-through veil (a dimmed layer, a spotlight),
     2 = covered by something opaque. A player reads through a veil and cannot
     click through it, and the tester should know which of the two it is. */
  function alpha(c){const m=/rgba?\(([^)]+)\)/.exec(c||'');if(!m)return c&&c!=='transparent'?1:0;const p=m[1].split(',');return p.length>3?parseFloat(p[3]):1;}
  /* t is on top of el at the point. Walk up from t until an ancestor of el: whatever
     is PAINTED on that path is what stands between the eye and el. Nothing painted
     (a transparent hit-catcher) = in the open. A big translucent layer = a veil.
     Anything opaque = covered. */
  function coverKind(el,t){
    for(let e=t;e&&e!==document.body;e=e.parentElement){
      if(e.contains(el))return 0;
      const cs=getComputedStyle(e),r=e.getBoundingClientRect();
      const hasImg=cs.backgroundImage&&cs.backgroundImage!=='none';
      const a=alpha(cs.backgroundColor)*(parseFloat(cs.opacity)||1);
      const big=r.width*r.height>=0.6*W*H;
      if(hasImg&&(parseFloat(cs.opacity)||1)>=0.9)return 2;
      if(a>=0.9)return 2;
      if(a>0)return big?1:2;
    }
    return 0;
  }
  function covered(el,r){
    const x=Math.min(W-1,Math.max(0,r.left+r.width/2)),y=Math.min(H-1,Math.max(0,r.top+r.height/2));
    const t=document.elementFromPoint(x,y);
    if(!t)return 2;
    if(t===el||el.contains(t)||t.contains(el))return 0;
    return coverKind(el,t);
  }
  function walk(el){
    if(SKIP.has(el.tagName))return;
    const cs=getComputedStyle(el);
    const r=el.getBoundingClientRect();
    if(!vis(el,cs,r))return;
    const txt=ownText(el);
    const it=inter(el,cs);
    const pic=el.tagName==='CANVAS'||el.tagName==='IMG'||(cs.backgroundImage&&cs.backgroundImage!=='none'&&r.width>=60&&r.height>=40);
    const inp=el.tagName==='INPUT'||el.tagName==='TEXTAREA';
    if(txt||it||pic||inp){
      const cv=covered(el,r);
      if(cv<2){
        const cx=r.left+r.width/2, cy=r.top+r.height/2;
        out.push({tag:el.tagName.toLowerCase(),cls:(el.className&&typeof el.className==='string')?el.className.split(/\s+/).slice(0,3).join('.'):'',
          txt:txt,it:!!it,pic:!!pic,inp:inp,val:inp?(el.value||''):'',ph:inp?(el.placeholder||''):'',veil:cv===1,
          x:Math.round(cx),y:Math.round(cy),w:Math.round(r.width),h:Math.round(r.height),
          fs:Math.round(parseFloat(cs.fontSize)||0),dis:!!el.disabled});
      }
    }
    for(const c of el.children)walk(c);
  }
  walk(document.body);
  return JSON.stringify(out);
})()
"""

DUMP_JS = r"""
(function(){
  const g=(typeof G!=='undefined')?G:null, j=(typeof JOURNAL!=='undefined')?JOURNAL:null;
  const o={};
  if(g){o.day=g.day;o.at=g.at;o.morale=g.morale;o.owed=g.owed;o.stranded=g.stranded;
    o.crowns=(g.run&&g.run.crowns!==undefined)?g.run.crowns:null;
    o.party=(g.party||[]).map(u=>{let mx=u.hpMax;try{if(mx===undefined&&typeof unitFrom==='function')mx=unitFrom(u).hpMax;}catch(e){}
      const loss=u.hpLoss||0;return {name:u.name,cls:u.cls,race:u.race,hpMax:mx,hp:(mx!==undefined?mx-loss:u.hp),hpLoss:loss,dead:!!u.dead,scars:(u.scars||[]).length};});
    o.logLines=(g.log||[]).length;}
  if(j){const run=j.runId||0;o.journalRun=run;o.journal=(j.log||[]).filter(r=>!run||r.run===run);o.journalAll=(j.log||[]).length;}
  o.title=document.title;o.url=location.href;
  return JSON.stringify(o);
})()
"""

# ---------------------------------------------------------------- the eyes
class Eyes:
    def __init__(self, port, vision='normal', out=None, budget=150, who='tester'):
        self.cdp = CDP(port)
        self.v = VISION[vision]
        self.vision = vision
        self.out = out
        self.budget = budget
        self.who = who
        self.actions = 0          # hand-actions (click/key/type/wait/scroll/hover)
        self.calls = 0            # every tool call
        self.squints = 0
        self.checkpoints = 0
        self.refs = {}            # ref -> (page x, page y, label)
        self.last_hint = ''
        self.t0 = time.time()
        self.done = False
        if out:
            os.makedirs(out, exist_ok=True)
            # cli mode is one process per call: pick the counters up where the last call left them
            try:
                with open(os.path.join(out, 'harness.json'), encoding='utf-8') as f:
                    h = json.load(f)
                if h.get('t0_epoch'):
                    self.t0 = h['t0_epoch']
                for k in ('actions', 'calls', 'squints', 'checkpoints'):
                    setattr(self, k, int(h.get(k, 0)))
                self.done = bool(h.get('reported'))
            except Exception:
                pass

    # ---- frame conversion: tester frame <-> page frame
    def to_page(self, x, y):
        s = self.v['shot']
        return x / s, y / s

    def to_frame(self, x, y):
        s = self.v['shot']
        return int(round(x * s)), int(round(y * s))

    # ---- log rows
    def log(self, kind, **kw):
        if not self.out:
            return
        row = {'t': round(time.time() - self.t0, 1), 'n': self.actions, 'kind': kind, 'screen': self.last_hint}
        row.update(kw)
        with open(os.path.join(self.out, 'actions.jsonl'), 'a', encoding='utf-8') as f:
            f.write(json.dumps(row, ensure_ascii=False) + '\n')
        # the counters live in this process; leave them where the runner can read them
        with open(os.path.join(self.out, 'harness.json'), 'w', encoding='utf-8') as f:
            json.dump(self.stats(), f)

    def stats(self):
        return {'who': self.who, 'vision': self.vision, 'actions': self.actions, 'calls': self.calls,
                'squints': self.squints, 'checkpoints': self.checkpoints, 'seconds': round(time.time() - self.t0),
                'reported': self.done, 't0_epoch': self.t0}

    # ---- LOOK
    def look(self, raw=False):
        try:
            items = json.loads(self.cdp.eval(LOOK_JS))
        except Exception as e:
            return 'the screen could not be read (%s). Try wait(1) and look() again.' % e
        items.sort(key=lambda i: (i['y'] // 12, i['x']))
        # the screen's own headline: the biggest visible text
        big = max((i for i in items if len(re.findall(r'\w', i['txt'])) >= 3), key=lambda i: (i['fs'], -i['y']), default=None)
        self.last_hint = (big['txt'][:48] if big else '')
        v = self.v
        lines = []
        self.refs = {}
        ref = 0
        collapsed = set()
        # a text-less clickable wrapper whose box holds a text item is the same button twice
        texted = [i for i in items if i['txt']]
        for i in items:
            if not i['txt'] and i['it'] and not i['inp']:
                x0, x1 = i['x'] - i['w'] / 2, i['x'] + i['w'] / 2
                y0, y1 = i['y'] - i['h'] / 2, i['y'] + i['h'] / 2
                if any(x0 <= t['x'] <= x1 and y0 <= t['y'] <= y1 for t in texted):
                    collapsed.add(id(i))
        # collapse runs of text-less tiles of one kind (the hex board). Their class
        # names are the developer's words, so a kind is a letter here, and what a
        # kind MEANS is learnt from the picture, the way a player learns it.
        groups = {}
        order = []
        for i in items:
            if id(i) in collapsed:
                continue
            if not i['txt'] and not i['inp'] and (i['it'] or i['pic']) and i['w'] < 160 and i['h'] < 160:
                k = (i['tag'], i['cls'], i['w'], i['h'])
                if k not in groups:
                    groups[k] = []; order.append(k)
                groups[k].append(i)
        kind = 0
        for k in order:
            g = groups[k]
            if len(g) >= 4:
                kind += 1
                for i in g:
                    collapsed.add(id(i))
                xs = [i['x'] for i in g]; ys = [i['y'] for i in g]
                x0, y0 = self.to_frame(min(xs), min(ys)); x1, y1 = self.to_frame(max(xs), max(ys))
                tw, th = self.to_frame(k[2], k[3])
                lines.append('  %d %stiles of kind %s (%dx%d each), centres from (%d,%d) to (%d,%d): tell them apart on a screenshot, click by coordinates'
                             % (len(g), 'clickable ' if g[0]['it'] else '', chr(64 + kind), tw, th, x0, y0, x1, y1))
        omitted = 0
        for i in items:
            if id(i) in collapsed:
                continue
            fx, fy = self.to_frame(i['x'], i['y'])
            fw, fh = self.to_frame(i['w'], i['h'])
            txt = i['txt']
            flag = ''
            if txt and v['minfs'] and i['fs'] < v['minfs']:
                n = len(txt)
                txt = '\u2592' * min(n, 40)
                flag = ' (too small to read: %dpx text)' % i['fs']
            elif txt and v['tinypx'] and len(txt) <= 2 and not re.search(r'\w', txt) and (i['w'] < v['tinypx'] or i['h'] < v['tinypx']):
                txt = '\u00b7'; flag = ' (a tiny mark, cannot tell what)'
            if not txt and not i['pic'] and not i['inp'] and not i['it']:
                continue
            ref += 1
            self.refs[ref] = (i['x'], i['y'], i['txt'][:40])
            if i['pic'] and not txt:
                what = 'PICTURE'
            elif i['inp']:
                what = 'INPUT' + (' "%s"' % i['val'] if i['val'] else '') + (' placeholder "%s"' % i['ph'] if i['ph'] else '')
            elif i['it']:
                what = 'BUTTON'
            else:
                what = ''
            if what and txt:
                what += ' '
            size = ' %dx%d' % (fw, fh) if (i['it'] or i['pic'] or i['inp']) else ''
            fs = (' %dpx' % i['fs']) if txt and not flag else ''
            dis = ' (greyed out)' if i['dis'] else ''
            if i.get('veil'):
                dis += ' (seen through a dimmed layer, not clickable right now)'
            body = ('%s"%s"' % (what, txt)) if txt else what
            if len(lines) < 140:
                lines.append('[%d] %s @(%d,%d)%s%s%s%s' % (ref, body, fx, fy, size, fs, dis, flag))
            else:
                omitted += 1
        if omitted:
            lines.append('  ... and %d more small lines not listed. screenshot() shows the whole layout.' % omitted)
        fw, fh = self.to_frame(VIEW_W, VIEW_H)
        head = 'SCREEN %dx%d  |  actions %d/%d  |  %s' % (fw, fh, self.actions, self.budget,
                                                         ('headline: ' + self.last_hint) if self.last_hint else 'no big text')
        if raw:
            return items
        return head + '\n' + '\n'.join(lines) + self.trailer()

    # ---- budget and checkpoint trailer, appended to every result
    def trailer(self):
        left = self.budget - self.actions
        s = ''
        due = self.actions and self.actions // CHECKPOINT_EVERY > self.checkpoints
        if due:
            self.checkpoints += 1
            s += ('\n\n== CHECKPOINT %d == Before your next move call note() with: interest 1-5 (1 = I would close this now, '
                  '5 = I do not want to stop), whether you would keep playing if this were your own evening, and what '
                  'you are trying to do right now.' % self.checkpoints)
        if left <= 0:
            s += '\n\n== SESSION OVER == Your hands are off the keyboard. Call report() now with your full report.'
        elif left <= WARN_LEFT:
            s += '\n\n== %d actions left == Finish the thing you are doing, then call report().' % left
        return s

    def spend(self, kind, **kw):
        if self.actions >= self.budget:
            return False
        self.actions += 1
        self.log(kind, **kw)
        return True

    # ---- hands
    def click(self, ref=None, x=None, y=None):
        if not self.spend('click', ref=ref, x=x, y=y):
            return 'Session over. Call report().' + self.trailer()
        if ref is not None:
            if ref not in self.refs:
                return 'No such ref [%s] on the last look(). Call look() and use a number it printed.' % ref
            px, py, label = self.refs[ref]
        else:
            px, py = self.to_page(x, y)
            try:
                label = self.cdp.eval("(()=>{const t=document.elementFromPoint(%d,%d);return t?String(t.innerText||'').slice(0,20):'';})()" % (px, py)) or ''
            except Exception:
                label = ''
        if re.search(r'DEV\.?MODE|\bTEST\b', label.upper()) and len(label) <= 12:
            return 'That is the developer switch. The tester brief says leave it alone. Pick something else.'
        self.cdp.click(px, py)
        time.sleep(0.45)
        return ('clicked %s@(%d,%d)\n' % (('[%d] "%s" ' % (ref, label)) if ref is not None else '', *self.to_frame(px, py))) + self.look()

    def hover(self, ref=None, x=None, y=None):
        if not self.spend('hover', ref=ref, x=x, y=y):
            return 'Session over. Call report().' + self.trailer()
        if ref is not None:
            if ref not in self.refs:
                return 'No such ref [%s]. look() first.' % ref
            px, py, _ = self.refs[ref]
        else:
            px, py = self.to_page(x, y)
        self.cdp.mouse(px, py, 'mouseMoved')
        time.sleep(0.5)
        return 'hovering at (%d,%d)\n' % self.to_frame(px, py) + self.look()

    def key(self, name):
        if not self.spend('key', key=name):
            return 'Session over. Call report().' + self.trailer()
        try:
            self.cdp.key(name)
        except ValueError as e:
            return str(e)
        time.sleep(0.4)
        return 'pressed %s\n' % name + self.look()

    def type_text(self, text):
        if not self.spend('type', text=text):
            return 'Session over. Call report().' + self.trailer()
        self.cdp.insert_text(text)
        time.sleep(0.2)
        return 'typed "%s"\n' % text + self.look()

    def wait(self, secs):
        secs = max(0.2, min(float(secs), 8.0))
        if not self.spend('wait', s=secs):
            return 'Session over. Call report().' + self.trailer()
        time.sleep(secs)
        return 'waited %.1fs\n' % secs + self.look()

    def scroll(self, x, y, dy):
        if not self.spend('scroll', x=x, y=y, dy=dy):
            return 'Session over. Call report().' + self.trailer()
        px, py = self.to_page(x, y)
        self.cdp.mouse(px, py, 'mouseWheel', dy=float(dy))
        time.sleep(0.4)
        return 'scrolled\n' + self.look()

    # ---- pictures
    def screenshot(self):
        self.log('shot')
        return self.cdp.screenshot_png(self.v['shot'])

    def squint(self, x, y):
        if not self.v['squint']:
            return None
        self.squints += 1
        self.log('squint', x=x, y=y)
        px, py = self.to_page(x, y)
        w, h = 360, 220
        cx = max(0, min(VIEW_W - w, px - w / 2)); cy = max(0, min(VIEW_H - h, py - h / 2))
        return self.cdp.screenshot_png(1.0, {'x': cx, 'y': cy, 'width': w, 'height': h})

    # ---- diary and report
    def note(self, text, interest=None):
        self.log('note', text=text, interest=interest)
        if self.out:
            with open(os.path.join(self.out, 'notes.md'), 'a', encoding='utf-8') as f:
                mm = int((time.time() - self.t0) // 60)
                tag = (' [interest %s/5]' % interest) if interest else ''
                f.write('- **%02d:%02d** (action %d, on "%s")%s %s\n' % (mm // 60, mm % 60, self.actions,
                        self.last_hint, tag, text.strip()))
        return 'noted.' + self.trailer()

    def report(self, md):
        if self.out:
            with open(os.path.join(self.out, 'report.md'), 'w', encoding='utf-8') as f:
                f.write(md.strip() + '\n')
        self.done = True
        self.log('report', chars=len(md))
        return 'Report saved. Thank you, that is the whole session. Reply with one line and stop; do not call any other tool.'

    def dump(self):
        try:
            d = json.loads(self.cdp.eval(DUMP_JS))
        except Exception as e:
            d = {'error': str(e)}
        d['harness'] = self.stats()
        return d

# ---------------------------------------------------------------- MCP stdio server
def tool_defs(eyes):
    weak = eyes.v['squint']
    fw, fh = eyes.to_frame(VIEW_W, VIEW_H)
    T = []
    def tool(name, desc, props=None, req=None):
        T.append({'name': name, 'description': desc,
                  'inputSchema': {'type': 'object', 'properties': props or {}, 'required': req or []}})
    tool('look', 'Read what is on the screen right now: every visible piece of text and every clickable thing, in reading '
         'order, each with a [ref] number and its centre (x,y). This is your eyes for TEXT. Free, does not spend an action.')
    tool('screenshot', 'See the screen as a picture (%dx%d). This is your eyes for LAYOUT, the board, colours, where things are. '
         'Free. Coordinates in the picture are the same coordinates click(x,y) takes.' % (fw, fh))
    if weak:
        tool('squint', 'Lean in close to one spot: a sharp close-up of a 360x220 region around (x,y), readable even when look() said '
             '"too small". Costs you effort, like leaning to the screen does. Use it when you need to, and know that every '
             'squint is recorded as a moment the game made you lean in.',
             {'x': {'type': 'number'}, 'y': {'type': 'number'}}, ['x', 'y'])
    tool('click', 'Click something. Either a [ref] from the last look(), or an (x,y) from the last screenshot. Spends one action. '
         'Returns a fresh look() of what the screen became.',
         {'ref': {'type': 'integer'}, 'x': {'type': 'number'}, 'y': {'type': 'number'}})
    tool('hover', 'Move the mouse over something without clicking (a [ref] or an (x,y)), to see if a tooltip or a highlight appears. '
         'Spends one action. Returns a fresh look().',
         {'ref': {'type': 'integer'}, 'x': {'type': 'number'}, 'y': {'type': 'number'}})
    tool('press_key', 'Press one key: a letter, a digit, "enter", "escape", "space", "tab", "left/right/up/down". Spends one action.',
         {'key': {'type': 'string'}}, ['key'])
    tool('type_text', 'Type text into the focused input (click the input first). Spends one action.',
         {'text': {'type': 'string'}}, ['text'])
    tool('wait', 'Wait up to 8 seconds for an animation or a turn to play out, then look. Spends one action.',
         {'seconds': {'type': 'number'}}, ['seconds'])
    tool('scroll', 'Scroll the mouse wheel at (x,y) by dy pixels (positive = down). Spends one action.',
         {'x': {'type': 'number'}, 'y': {'type': 'number'}, 'dy': {'type': 'number'}}, ['x', 'y', 'dy'])
    tool('note', 'Think aloud. Write down what you just felt, expected, understood, or failed to understand, in your own voice, '
         'the way a tester talks while playing. Use it often: every few actions, and EVERY time you are confused, surprised, '
         'pleased, bored, or stuck. Optional interest 1-5 whenever a CHECKPOINT asks for it. Free.',
         {'text': {'type': 'string'}, 'interest': {'type': 'integer', 'minimum': 1, 'maximum': 5}}, ['text'])
    tool('report', 'Hand in your final report (markdown, the sections your brief lists). Call it exactly once, when you stop '
         'playing: because you would stop, because the run ended, or because the session said it is over.',
         {'markdown': {'type': 'string'}}, ['markdown'])
    return T

def serve(args):
    eyes = Eyes(args.port, args.vision, args.out, args.budget, args.who)
    tools = tool_defs(eyes)
    inp = sys.stdin.buffer
    outp = sys.stdout.buffer

    def send(obj):
        outp.write((json.dumps(obj, ensure_ascii=False) + '\n').encode('utf-8'))
        outp.flush()

    def text(s, err=False):
        r = {'content': [{'type': 'text', 'text': s}]}
        if err:
            r['isError'] = True
        return r

    def image(b64, caption):
        return {'content': [{'type': 'image', 'data': b64, 'mimeType': 'image/png'},
                            {'type': 'text', 'text': caption}]}

    def call(name, a):
        eyes.calls += 1
        if eyes.done and name != 'report':
            return text('The session is over and the report is in. Do not call tools; reply with one line and stop.')
        if name == 'look':
            return text(eyes.look())
        if name == 'screenshot':
            fw, fh = eyes.to_frame(VIEW_W, VIEW_H)
            return image(eyes.screenshot(), 'screenshot %dx%d. click(x,y) takes these coordinates.%s' % (fw, fh, eyes.trailer()))
        if name == 'squint':
            b = eyes.squint(a.get('x', 0), a.get('y', 0))
            if b is None:
                return text('You cannot do that.', True)
            return image(b, 'close-up around (%d,%d).' % (a.get('x', 0), a.get('y', 0)))
        if name == 'click':
            return text(eyes.click(a.get('ref'), a.get('x'), a.get('y')) if (a.get('ref') is not None or a.get('x') is not None)
                        else 'click needs a ref or an x,y.')
        if name == 'hover':
            return text(eyes.hover(a.get('ref'), a.get('x'), a.get('y')) if (a.get('ref') is not None or a.get('x') is not None)
                        else 'hover needs a ref or an x,y.')
        if name == 'press_key':
            return text(eyes.key(a.get('key', '')))
        if name == 'type_text':
            return text(eyes.type_text(a.get('text', '')))
        if name == 'wait':
            return text(eyes.wait(a.get('seconds', 1)))
        if name == 'scroll':
            return text(eyes.scroll(a.get('x', 0), a.get('y', 0), a.get('dy', 0)))
        if name == 'note':
            return text(eyes.note(a.get('text', ''), a.get('interest')))
        if name == 'report':
            return text(eyes.report(a.get('markdown', '')))
        return text('unknown tool ' + name, True)

    while True:
        line = inp.readline()
        if not line:
            break
        line = line.strip()
        if not line:
            continue
        try:
            msg = json.loads(line)
        except Exception:
            continue
        mid = msg.get('id')
        m = msg.get('method', '')
        if m == 'initialize':
            send({'jsonrpc': '2.0', 'id': mid, 'result': {
                'protocolVersion': msg.get('params', {}).get('protocolVersion', '2024-11-05'),
                'capabilities': {'tools': {}},
                'serverInfo': {'name': 'game', 'version': '1.0'}}})
        elif m == 'notifications/initialized' or m.startswith('notifications/'):
            pass
        elif m == 'ping':
            send({'jsonrpc': '2.0', 'id': mid, 'result': {}})
        elif m == 'tools/list':
            send({'jsonrpc': '2.0', 'id': mid, 'result': {'tools': tools}})
        elif m == 'tools/call':
            p = msg.get('params', {})
            try:
                res = call(p.get('name'), p.get('arguments') or {})
            except Exception as e:
                res = text('the harness hiccuped (%s). This is NOT the game. Try wait(1) then look().' % e, True)
            send({'jsonrpc': '2.0', 'id': mid, 'result': res})
        elif mid is not None:
            send({'jsonrpc': '2.0', 'id': mid, 'error': {'code': -32601, 'message': 'no such method ' + m}})

# ---------------------------------------------------------------- launch / cli / thoughts
def find_browser(pref):
    cands = {
        'chrome': [r'C:\Program Files\Google\Chrome\Application\chrome.exe',
                   r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'],
        'edge': [r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
                 r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'],
    }
    order = [pref] + [k for k in cands if k != pref] if pref in cands else list(cands)
    for k in order:
        for p in cands[k]:
            if os.path.exists(p):
                return p
    raise SystemExit('no Chrome or Edge found')

def launch(args):
    exe = find_browser(args.browser)
    os.makedirs(args.profile, exist_ok=True)
    cmd = [exe, '--remote-debugging-port=%d' % args.port, '--user-data-dir=' + args.profile,
           '--headless=new', '--window-size=%d,%d' % (VIEW_W + 20, VIEW_H + 60), '--no-first-run',
           '--no-default-browser-check', '--mute-audio', '--autoplay-policy=no-user-gesture-required',
           '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
           '--disable-backgrounding-occluded-windows', '--hide-scrollbars', '--remote-allow-origins=*',
           '--disable-features=TranslateUI', args.url]
    flags = 0
    if os.name == 'nt':
        flags = subprocess.CREATE_NEW_PROCESS_GROUP | getattr(subprocess, 'DETACHED_PROCESS', 0)
    p = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=flags)
    end = time.time() + 25
    while time.time() < end:
        try:
            urllib.request.urlopen('http://127.0.0.1:%d/json/version' % args.port, timeout=2).read()
            break
        except Exception:
            time.sleep(0.4)
    else:
        raise SystemExit('browser did not open a debugging port')
    c = CDP(args.port)
    c.wait_ready(30)
    time.sleep(1.0)
    print(json.dumps({'pid': p.pid, 'port': args.port, 'browser': os.path.basename(exe), 'url': c.eval('location.href')}))

def cli(args):
    cmd, rest = args.cmd[0], args.cmd[1:]
    if cmd == 'close':
        try:
            CDP(args.port).call('Browser.close')
        except Exception:
            pass
        print('closed'); return
    e = Eyes(args.port, args.vision, args.out or None, 10 ** 6)
    if cmd == 'note':
        txt = ' '.join(rest)
        m = re.match(r'^(\d)\s+(.*)$', txt, re.S)
        print(e.note(m.group(2), int(m.group(1))) if m else e.note(txt))
        return
    if cmd == 'report':
        print(e.report(_read(rest[0])))
        return
    if cmd == 'squint':
        b = e.squint(float(rest[0]), float(rest[1]))
        path = rest[2] if len(rest) > 2 else 'squint.png'
        with open(path, 'wb') as f:
            f.write(base64.b64decode(b))
        print('saved', path); return
    if cmd == 'look':
        print(e.look())
    elif cmd == 'shot':
        path = rest[0] if rest else 'shot.png'
        with open(path, 'wb') as f:
            f.write(base64.b64decode(e.screenshot()))
        print('saved', path)
    elif cmd == 'click':
        print(e.click(x=float(rest[0]), y=float(rest[1])))
    elif cmd == 'key':
        print(e.key(rest[0]))
    elif cmd == 'type':
        print(e.type_text(' '.join(rest)))
    elif cmd == 'wait':
        print(e.wait(float(rest[0]) if rest else 1))
    elif cmd == 'dump':
        s = json.dumps(e.dump(), ensure_ascii=False, indent=1)
        if rest:
            with open(rest[0], 'w', encoding='utf-8') as f:
                f.write(s)
            print('wrote', rest[0])
        else:
            print(s)
    elif cmd == 'wipe':
        e.cdp.eval("(()=>{const ks=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf('gt_')===0)ks.push(k);}ks.forEach(k=>localStorage.removeItem(k));return ks.length;})()")
        e.cdp.call('Page.reload'); time.sleep(1.5); e.cdp.wait_ready(30)
        print('wiped and reloaded')
    elif cmd == 'open':
        e.cdp.call('Page.navigate', {'url': rest[0]}); time.sleep(1.0); e.cdp.wait_ready(30)
        print('opened', e.cdp.eval('location.href'))
    else:
        raise SystemExit('unknown cli command ' + cmd)

def thoughts(args):
    """stream-json transcript -> the tester's spoken thoughts and tool calls, no images."""
    out = []
    with open(args.file, encoding='utf-8', errors='replace') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                m = json.loads(line)
            except Exception:
                continue
            if m.get('type') != 'assistant':
                continue
            for c in (m.get('message', {}).get('content') or []):
                if c.get('type') == 'text' and c.get('text', '').strip():
                    out.append(c['text'].strip())
                elif c.get('type') == 'tool_use':
                    name = c.get('name', '').replace('mcp__game__', '')
                    a = c.get('input') or {}
                    if name in ('note', 'report'):
                        continue
                    arg = ', '.join('%s=%s' % (k, json.dumps(v, ensure_ascii=False)[:60]) for k, v in a.items())
                    out.append('> %s(%s)' % (name, arg))
    text = '\n\n'.join(out)
    if args.out:
        with open(args.out, 'w', encoding='utf-8') as f:
            f.write(text + '\n')
        print('wrote', args.out)
    else:
        print(text)

def _read(path, default=''):
    try:
        with open(path, encoding='utf-8-sig', errors='replace') as f:
            return f.read()
    except Exception:
        return default

def _last_result(transcript):
    """the final `result` row of a stream-json transcript: cost, turns, errors."""
    last = None
    for line in _read(transcript).splitlines():
        try:
            m = json.loads(line)
        except Exception:
            continue
        if m.get('type') == 'result':
            last = m
    return last or {}

def _journal_summary(res):
    j = res.get('journal') or []
    kinds = {}
    for r in j:
        kinds[r.get('t', '?')] = kinds.get(r.get('t', '?'), 0) + 1
    battles = [r for r in j if r.get('t') == 'battle']
    ends = [r for r in j if r.get('t') == 'run-end']
    return kinds, battles, ends

def assemble(args):
    """one tester's folder -> one markdown page for docs/playtests/."""
    d = args.dir
    meta = {}
    try:
        meta = json.loads(_read(os.path.join(d, 'meta.json'), '{}'))
    except Exception:
        pass
    res = {}
    try:
        res = json.loads(_read(os.path.join(d, 'results.json'), '{}'))
    except Exception:
        pass
    # the server's counters outrank the CLI dump's (the CLI dump was a second process)
    try:
        hs = json.loads(_read(os.path.join(d, 'out', 'harness.json'), '{}'))
        if hs:
            res['harness'] = hs
    except Exception:
        pass
    report = _read(os.path.join(d, 'out', 'report.md')).strip()
    notes = _read(os.path.join(d, 'out', 'notes.md')).strip()
    thoughts = _read(os.path.join(d, 'thoughts.md')).strip()
    last = _last_result(os.path.join(d, 'transcript.jsonl'))
    h = res.get('harness', {})
    kinds, battles, ends = _journal_summary(res)
    who = meta.get('who', h.get('who', 'tester'))
    L = []
    L.append('# Playtest: %s on build %s' % (who.capitalize(), meta.get('label', '?')))
    L.append('')
    L.append('| | |')
    L.append('|---|---|')
    L.append('| **tester** | %s (vision: %s) |' % (who, h.get('vision', meta.get('vision', '?'))))
    L.append('| **build** | %s |' % meta.get('label', '?'))
    L.append('| **url** | %s |' % meta.get('url', res.get('url', '?')))
    L.append('| **model** | %s |' % meta.get('model', '?'))
    L.append('| **context** | %s |' % meta.get('context', 'clean room: `claude -p` in an empty folder, `--tools ""`, `--strict-mcp-config`, the only tool is the game'))
    L.append('| **when** | %s |' % meta.get('when', '?'))
    L.append('| **actions** | %s of %s budget, %s tool calls, %s squints, %s checkpoints, %s s of play |'
             % (h.get('actions', '?'), meta.get('budget', '?'), h.get('calls', '?'), h.get('squints', 0),
                h.get('checkpoints', 0), h.get('seconds', '?')))
    if last:
        L.append('| **cost** | $%.2f, %s turns, %s |' % (last.get('total_cost_usd', 0) or 0, last.get('num_turns', '?'),
                                                       last.get('subtype', '')))
        if last.get('is_error'):
            L.append('| **error** | %s |' % str(last.get('result', ''))[:200].replace('\n', ' '))
    L.append('')
    L.append('## Results (the game\'s own telemetry, not the tester\'s opinion)')
    L.append('')
    if res and 'day' in res:
        alive = [u for u in res.get('party', []) if not u.get('dead')]
        dead = [u for u in res.get('party', []) if u.get('dead')]
        L.append('- reached **day %s**, standing at `%s`, %s crowns, morale %s, wages owed %s'
                 % (res.get('day'), res.get('at'), res.get('crowns'), res.get('morale'), res.get('owed')))
        L.append('- company: %d alive (%s)%s' % (len(alive), ', '.join('%s the %s %s/%s' % (u.get('name'), u.get('cls'), u.get('hp'), u.get('hpMax')) for u in alive),
                                                (', %d dead (%s)' % (len(dead), ', '.join(str(u.get('name')) for u in dead))) if dead else ''))
        L.append('- journal rows this run: %s' % (', '.join('%s x%d' % (k, v) for k, v in sorted(kinds.items())) or 'none'))
        for b in battles:
            L.append('  - battle: `%s`' % json.dumps({k: v for k, v in b.items() if k not in ('run',)}, ensure_ascii=False)[:200])
        for e in ends:
            L.append('  - run end: %s' % e.get('w'))
    elif res.get('error'):
        L.append('- could not read the game state: %s' % res['error'])
    else:
        L.append('- no game state captured (the page had no run, or the browser was gone)')
    L.append('')
    L.append('---')
    L.append('')
    if report:
        L.append(report)
    else:
        L.append('# %s - NO REPORT HANDED IN' % who.capitalize())
        L.append('')
        L.append('The tester did not call report(). Their last spoken thoughts are below; the run may have hit the turn or dollar cap, or the CLI was not logged in (see the cost row).')
    L.append('')
    L.append('---')
    L.append('')
    L.append('## Diary (every note(), in order)')
    L.append('')
    L.append(notes or '_no notes_')
    L.append('')
    L.append('<details><summary>Spoken thoughts and every action, from the transcript</summary>')
    L.append('')
    L.append(thoughts or '_no transcript_')
    L.append('')
    L.append('</details>')
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    with open(args.out, 'w', encoding='utf-8') as f:
        f.write('\n'.join(L) + '\n')
    print('wrote', args.out)

def compare(args):
    """three assembled folders -> one comparison table."""
    rows = []
    for d in args.dirs:
        who = os.path.basename(d.rstrip('\\/'))
        try:
            res = json.loads(_read(os.path.join(d, 'results.json'), '{}'))
        except Exception:
            res = {}
        h = res.get('harness', {})
        try:
            hs = json.loads(_read(os.path.join(d, 'out', 'harness.json'), '{}'))
            if hs:
                h = hs
        except Exception:
            pass
        report = _read(os.path.join(d, 'out', 'report.md'))
        notes = _read(os.path.join(d, 'out', 'notes.md'))
        interest = re.findall(r'\[interest (\d)/5\]', notes)
        def section(name):
            m = re.search(r'## %s\s*\n(.*?)(?=\n## |\Z)' % re.escape(name), report, re.S)
            return m.group(1).strip() if m else ''
        verdict = section('Verdict').split('\n')[0][:220] if report else '(no report)'
        stopped = section('Where I stopped and why').split('\n')[0][:200] if report else ''
        fixes = section('Three things I would fix first')
        kinds, battles, ends = _journal_summary(res)
        rows.append({'who': who, 'day': res.get('day', '?'), 'crowns': res.get('crowns', '?'),
                     'alive': len([u for u in res.get('party', []) if not u.get('dead')]) if res.get('party') else '?',
                     'battles': kinds.get('battle', 0), 'choices': kinds.get('choice', 0),
                     'actions': h.get('actions', '?'), 'squints': h.get('squints', 0),
                     'interest': ' '.join(interest) or '-', 'verdict': verdict, 'stopped': stopped, 'fixes': fixes})
    L = ['# Playtest comparison: build %s' % args.label, '',
         '| tester | day | crowns | alive | battles | choices | actions | squints | interest by checkpoint |',
         '|---|---|---|---|---|---|---|---|---|']
    for r in rows:
        L.append('| %(who)s | %(day)s | %(crowns)s | %(alive)s | %(battles)s | %(choices)s | %(actions)s | %(squints)s | %(interest)s |' % r)
    L.append('')
    for r in rows:
        L.append('## %s' % r['who'].capitalize())
        L.append('')
        L.append('**Verdict:** %s' % r['verdict'])
        L.append('')
        if r['stopped']:
            L.append('**Stopped:** %s' % r['stopped'])
            L.append('')
        if r['fixes']:
            L.append('**Would fix first:**')
            L.append('')
            L.append(r['fixes'])
            L.append('')
    with open(args.out, 'w', encoding='utf-8') as f:
        f.write('\n'.join(L) + '\n')
    print('wrote', args.out)

def main():
    # a Windows console is cp1251 here and the game's screen is full of glyphs
    for s in (sys.stdout, sys.stderr):
        try:
            s.reconfigure(encoding='utf-8', errors='replace')
        except Exception:
            pass
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest='mode', required=True)
    a = sub.add_parser('launch'); a.add_argument('--port', type=int, required=True); a.add_argument('--profile', required=True)
    a.add_argument('--url', required=True); a.add_argument('--browser', default='chrome')
    s = sub.add_parser('serve'); s.add_argument('--port', type=int, required=True); s.add_argument('--out', required=True)
    s.add_argument('--vision', default='normal', choices=list(VISION)); s.add_argument('--budget', type=int, default=150)
    s.add_argument('--who', default='tester')
    c = sub.add_parser('cli'); c.add_argument('--port', type=int, required=True); c.add_argument('--vision', default='normal', choices=list(VISION))
    c.add_argument('--out', default=''); c.add_argument('cmd', nargs='+')
    t = sub.add_parser('thoughts'); t.add_argument('file'); t.add_argument('--out', default='')
    m = sub.add_parser('assemble'); m.add_argument('--dir', required=True); m.add_argument('--out', required=True)
    k = sub.add_parser('compare'); k.add_argument('--out', required=True); k.add_argument('--label', default='?'); k.add_argument('dirs', nargs='+')
    args = ap.parse_args()
    if args.mode == 'launch':
        launch(args)
    elif args.mode == 'serve':
        serve(args)
    elif args.mode == 'cli':
        cli(args)
    elif args.mode == 'thoughts':
        thoughts(args)
    elif args.mode == 'assemble':
        assemble(args)
    elif args.mode == 'compare':
        compare(args)

if __name__ == '__main__':
    main()
