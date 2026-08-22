# ⛔ #235 - THIS NO LONGER TOUCHES THE PROTOTYPE, AND THE NAME IS KEPT ON PURPOSE.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File art\inject.ps1
#
# It used to read the whole 30 MB prototype and write it whole back, pouring
# art\out\art_data.js into a /*__ART_DATA__*/ marker - and it carried its own
# warning that this "is the exact shape that erases a parallel session's work.
# Ask first." The paintings live in art\embed\art_data.js now and the prototype
# loads them with a script tag, so this forwards to art\embed.ps1: one block,
# one file, nothing shared to erase, and no claim gate needed.
#
# The name survives because `.claude\rules\static-event-art.md`, the changelog
# and every habit in this project say "run inject.ps1" after rebuilding the art.
# That instruction is still correct and still does the right thing.
$ErrorActionPreference = 'Stop'
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'embed.ps1') art_data
