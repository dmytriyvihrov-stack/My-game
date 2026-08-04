# Static event art: stage 3 mapping rule

Apply this rule whenever event art is rebuilt, embedded, mapped, or refactored.

## Hard size rule

- Do not enlarge these files, their canvas windows, or their CSS boxes.
- Static event images are final at exactly `586x212`, matching `DLGART_W` x `DLGART_H` and the live `#wDlg` canvas.
- Prologue outcome images are final at exactly `460x190`, matching the live `proCard()` canvas.
- Embed and draw the files as-is. Do not convert them to the older `640x360` event format and do not apply another cover crop.

## Exact mapping

| Live scene | Art key | File |
|---|---|---|
| `EVENTS.oasis` / `EVENTART.oasis` | `EV29` | `art/src/stage-3/events/EV-29_warm-spring.png` |
| `EVENTS.bonfire` / `EVENTART.bonfire` | `EV30` | `art/src/stage-3/events/EV-30_long-fire.png` |
| `EVENTS.circle` / `EVENTART.circle` | `EV31` | `art/src/stage-3/events/EV-31_the-circle.png` |
| `scene: 'coin'` / `PRO_ART.coin` | `EV00B` | `art/src/stage-3/prologue/EV-00B_no-joke.png` |
| `scene: 'joke_hit'` / `PRO_ART.joke_hit` | `EV00C` | `art/src/stage-3/prologue/EV-00C_good-joke.png` |

The required live assignments are:

```js
Object.assign(EVENTART, {
  oasis: 'EV29',
  bonfire: 'EV30',
  circle: 'EV31'
});

const PRO_ART = {
  coin: 'EV00B',
  joke_hit: 'EV00C'
};
```

`coin` is the no-joke outcome. Do not map it to a made-up `no_joke` key. Preserve the existing live scene names exactly.

## Build and integration instructions

1. Extend `art/build_assets.ps1` with a stage-3 PNG pass for `art/src/stage-3/events` and `art/src/stage-3/prologue`.
2. Embed these PNGs verbatim as `data:image/png;base64,...`; derive each key from the filename prefix with hyphens removed (`EV-29` -> `EV29`, `EV-00B` -> `EV00B`).
3. Do not send these files through the stage-2 `640x360` resize/JPEG path.
4. Apply the assignments above in `prototype/grimtoll_slice.html`, rebuild with `art/build_assets.ps1`, then inject with `art/inject.ps1`.
5. Verify that every canvas backing store remains `586x212` or `460x190` and that `drawArt()` performs a 1:1-aspect draw without further crop.

## Deliberate exclusions

- Do not create or map new art for `cache`: the buried bag is not visually strong enough at this scale.
- Do not create a new `floor` outcome in this pack. Unmapped `scene: 'floor'` must continue to fall back to the base tavern art.
- Do not create or map a `joke_miss` painting. It must continue to fall back to the base tavern art; both attempted beating compositions were rejected and deleted.
- Do not regenerate already illustrated events as part of this pack.
