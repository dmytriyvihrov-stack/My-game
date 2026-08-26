/* the contract card at its last beat, animations pinned so the shot is exact */
show('prologue');
tavernContract(true, false);
EVSTAGE.at = EVSTAGE.beats.length - 1;
evFlow();
document.getAnimations().forEach(a => { try { a.pause(); a.currentTime = 2000; } catch (e) {} });
'contract ready';
