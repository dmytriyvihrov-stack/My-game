# C1 needs redrawing, and the reason is not artistic

**Read this first, then paste the prompt at the bottom into an image generator.**

## What C1 is

`C1_Ratkin_Rank_and_File` is the enemy portrait for the **common ratkin soldier**, the one you meet
more than any other creature in the game. It shows in the battle side panel whenever a plain ratkin
is selected. The picture on disk today (`art/src/C1_Ratkin_Rank_and_File.png`, and the built
`art/out/C1_Ratkin_Rank_and_File.jpg`) is a **three-panel reference sheet**: three rat-headed
soldiers standing side by side under the labels SPEAR, CLEAVER and SLINGER, painted in the game's
dark palette against a stone wall.

## Why it has to go

**It is the one thing stopping the game from being shared with anybody.** A published page can be
given a public link, and the platform checks the page before it grants one. Grimtoll's page was
refused, over and over, with *"This version can't be shared publicly."*

That was chased down on 2026-08-04 with twenty published test pages, each one share-tested by hand.
Ruled out in turn: the account, the file's size, the email address, the whole event book, the head
tags, every browser API the game uses, and two megabytes of game code. What refused was **the game's
code with the artwork beside it**. Filler bytes of the same length shared fine; the same pictures
with their `data:image` label mangled still refused, so something reads the payloads by their magic
bytes and judges the page as a whole. Bisecting 22 pictures four ways, then three, then one, landed
on **C1 alone**.

**Every other picture in the build is innocent.** 113 of 114 pass. Only this one is out, and the
published build already runs without it: the game falls back to a dark ratkin silhouette, which is
readable but plainly a placeholder.

⚠ **Do not try to sneak the current picture past the check** by scrambling the bytes and rebuilding
them at runtime. That is defeating a content check on a public page. Draw a new picture instead.

## Which generator

**Any of them works. The requirements below matter far more than the brand.**

- **ChatGPT (GPT Image)** is the easy one: it takes a long written brief, it will iterate when you
  say "darker, less clutter", and it exports PNG directly. Best choice if you want to go back and
  forth in words.
- **Midjourney** gives the most painterly result for this style and the closest match to the rest of
  the set, but it fights you on exact framing and it will not reliably give you three separate
  figures in one frame.
- **Claude cannot do this.** I can write the brief, wire the result in, and rebuild the assets, but I
  do not generate images.

**One rule whatever you use: generate a NEW picture, do not upscale, restyle or img2img the old one.**
The point is to arrive at different pixels, not the same painting in a new coat.

## Hard requirements

| | |
|---|---|
| **Format out of the generator** | PNG, any size at or above 880x500 |
| **File name** | `C1_Ratkin_Rank_and_File.png` |
| **Where it goes** | `art/src/` (replace the file that is there) |
| **Final size in game** | 440x250, landscape. `art/build_assets.ps1` does the resize and the JPEG at quality 82. You do not do this by hand |
| **Aspect** | 16:9-ish. It will be cropped to 440x250, so keep the figures away from the edges |
| **Background** | Dark and simple. It sits behind UI text |

## What it must look like

It has to belong beside C2 (Ratkin Chieftain), C3 (Warp Sniffer), C4 (The Broken Men) and C5 (The
Cub), which are staying. Open those first and match them. In short: oil-painted, desaturated, one
weak light source, wet stone and worn leather, no bright colour except a single cold highlight on
metal.

**Say what it is with a silhouette, not with gore.** This creature is a conscript in a war it did not
choose, not a monster. Keep it grim, keep it bloodless.

## The prompt

> Oil-painted fantasy game portrait, landscape 16:9. A single rat-headed humanoid soldier, waist up,
> facing three quarters to the left. Lean and hunched, coarse grey-brown fur, long snout, small dark
> eyes, one ear notched. He wears a patched leather jerkin over a mail shirt, both too big for him,
> and carries a plain wooden spear resting on his shoulder. Battered round shield on his back.
>
> Dark medieval realism in the manner of a painted board game box: muted greys, browns and bone,
> heavy shadow, a single weak light from the upper left catching the rim of the mail and the wet
> stone wall behind him. Background is a plain dark stone wall, unlit and out of focus, no detail
> that competes with the figure.
>
> Grim and tired rather than monstrous. He looks like a conscript who has been awake too long. No
> blood, no wounds, no gore, no snarl, no bared teeth. No text, no labels, no borders, no panels,
> no watermark. One figure only, centred, with clear space around him.

**If the result comes back cluttered**, add: *"simpler background, fewer props, more empty space
around the figure."* **If it comes back too cartoonish**, add: *"painterly realism, visible brush
work, no cel shading, no outlines."*

## When you have the file

1. Put it in `art/src/` under the exact name above.
2. Run `art/build_assets.ps1`. It resizes, encodes at quality 82, and rewrites the `ART{}` block
   inside `prototype/grimtoll_slice.html`, which puts C1 back in the game.
3. Tell me, and I will publish the rebuilt page and you can test the share link again.
4. **If the share is refused again, the new picture inherited whatever the old one had.** Do not
   guess at it: I will run the same one-picture probe against the new C1 and we will know in one
   click.
