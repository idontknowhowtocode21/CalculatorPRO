let isTappingMode = false;
let tappingType = null; 
let forceSequence = "";
let seqIdx = 0;

document.addEventListener('DOMContentLoaded', () => { 
    updateUI(); 
});

const keypad = document.getElementById('keypad'); 
const dotBtn = document.getElementById('btn-dot');
const toggleBtn = document.getElementById('btn-toggle');
let pressTimer;

dotBtn.addEventListener('touchstart', (e) => {
    pressTimer = setTimeout(() => { calculateToxicGap(); }, 1000);
});

toggleBtn.addEventListener('touchstart', (e) => {
    pressTimer = setTimeout(() => { activateAcaanMode(); }, 1000);
});

[dotBtn, toggleBtn].forEach(b => b.addEventListener('touchend', () => clearTimeout(pressTimer)));

// UPDATED TAPPING ENGINE: APPENDS TO SCREEN
keypad.addEventListener('touchstart', (e) => {
    if (!isTappingMode) return;
    e.preventDefault(); e.stopPropagation();
    
    if (seqIdx < forceSequence.length) {
        let nextChar = forceSequence[seqIdx++].toString();
        
        // FIX: Instead of replacing, we append the force digit to the existing math string
        // This keeps "15 + 15 +" on screen and just adds the next digit
        currentInput = currentInput.toString() + nextChar;
        
        updateUI();
        updateIndicator(forceSequence.length - seqIdx);

        if (seqIdx === forceSequence.length) {
            // Once finished, we stop the "Tapping Mode" so the Equals button works normally
            isTappingMode = false;
            // Note: We don't call exitSecretMode yet so ACAAN data stays locked if needed
        }
    }
}, { passive: false });

function updateIndicator(text) {
    const cue = document.getElementById('tap-cue');
    cue.innerText = text;
    cue.style.display = 'block';
}

function exitSecretMode() {
    isTappingMode = false;
    tappingType = null;
    seqIdx = 0;
    forceSequence = "";
    if (typeof killCardMode === 'function') killCardMode(); 
    document.getElementById('tap-cue').style.display = 'none';
}
