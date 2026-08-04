# Grimtoll audio pack

Approved audio assets for the playable prototype. These files are intentionally
external to `prototype/grimtoll_slice.html`.

## ✅ INTEGRATED 2026-08-01 - build log 8f.70

The synthesized score, the wind and the fire loop are gone; these eleven files
are the whole of the game's sound. Full write-up in `docs/CHANGELOG.md` 8f.70,
player-facing notes in `docs/WHAT_TO_TEST.md`.

Three things the next audio pass owes, in priority order:

1. **A `rout` sound.** 9 call sites, and the loudest of them is the moment the
   game is about: somebody breaking, somebody going down, DESPERATE. Nothing in
   this pack fits it and it is currently silent.
2. **Compressed derivatives.** 62MB of 44.1k WAV is too much to hand a
   playtester, and the published single-file build has no audio at all as a
   direct result. Compare any replacement against these masters first.
3. **Three smaller silences** - a UI back/negation blip, and two short ticks for
   the nerve ladder. ⚠ The integration brief maps `rung_up` to `promote.wav`;
   that was not built, because `rung_up` is a nerve tick fired in volleys from
   `mor()`, not a promotion, and a 1.30s fanfare on each one is unusable. A
   fire loop is also wanted, and its wiring is already in place and tested.

## Music

| File | Duration | Intended use |
| --- | ---: | --- |
| `music/main_menu.wav` | 1:37 | Main menu only |
| `music/world_road.wav` | 1:36 | Main road/world theme |
| `music/world_fen.wav` | 1:36 | Alternate world/fen theme |
| `music/battle.wav` | 1:23 | Normal encounters |
| `music/boss.wav` | 1:28 | Fen-Mother and Something in Armour |

The main-menu cue is separate from the world programme; see
`CLAUDE_MAIN_MENU_INSTRUCTIONS.md`. The two world tracks should alternate. Do
not put either one on a short hard loop. Normal battle and boss tracks are long
enough for the intended encounter length; let them end rather than immediately
restarting from zero.

## Sound effects

| File | Duration | Intended use |
| --- | ---: | --- |
| `sfx/click.wav` | 0.13 s | UI confirmation |
| `sfx/hit.wav` | 0.16 s | Flesh impact; may be pitch-shifted slightly by body size |
| `sfx/armour.wav` | 0.72 s | Armour/metal impact |
| `sfx/miss.wav` | 0.11 s | Miss or dodge |
| `sfx/coin.wav` | 0.52 s | Money/reward |
| `sfx/promote.wav` | 1.30 s | Promotion/positive progression |
| `sfx/magic.wav` | 1.85 s | Casting/Bloom-related effects |

The approved source previews and the reproducible synthesis script remain in
`../audio_review/`.

See `CLAUDE_INSTRUCTIONS.md` for the integration brief.
