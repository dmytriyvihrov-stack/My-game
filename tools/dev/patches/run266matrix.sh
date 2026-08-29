#!/bin/sh
# #266 - accumulate the balance matrix a couple of fight-comps at a time.
#   sh tools/dev/patches/run266matrix.sh <port-arg...>   (extra args go to gt.py)
cd "$(dirname "$0")/../../.." || exit 1
OUT="$1"; shift
: > "$OUT"
i=0
while [ $i -lt 40 ]; do
  R=$(python tools/dev/gt.py arena tools/dev/probes/m266_matrix.js "$@" 2>&1)
  echo "$R" >> "$OUT"
  echo "$R" | grep -q '"done": true' && break
  echo "$R" | grep -q 'Traceback' && { echo "FAILED at chunk $i" >> "$OUT"; break; }
  i=$((i+1))
done
echo "loop finished after $i chunks" >> "$OUT"
