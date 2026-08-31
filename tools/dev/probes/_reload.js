/* reload the page and return at once - #234's note: location.reload() never
   returns to the evaluator, so it is queued. Give the page ~25s before the
   next eval. */
(function(){setTimeout(()=>location.reload(),20);return 'reloading';})()
