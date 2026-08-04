OLD VERSIONS — NOT THE GAME. DO NOT EDIT, DO NOT PLAY, DO NOT PUBLISH.

The live build is always  ../grimtoll_slice.html  (one directory up).
Everything in this folder is a dated snapshot kept only so a change can be
diffed or reverted.

  grimtoll_slice_2026-07-31_pre-cleanup.html
      The build exactly as it stood before the 2026-07-31 dead-code pass.
      Byte-identical to what shipped that morning: 1 343 009 bytes.
      Removed after this snapshot (all of it verified unreachable first):
        JS   bondOther() · killLine() and its unread caller · TRAITKEYS ·
             FILL · D.speed · bindStatTips() and its call site
        CSS  .capself · .core (and its five descendant rules) ·
             .sSTR/.sAGI/.sINT/.sMOR
        fix  the Stubborn +8 morale recovery read its own `mrec` data field
             instead of a hardcoded trait name; saveLegacy() no longer
             swallows a failed write in silence.
