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

keypad.addEventListener('touchstart', (e) => {
    if (!isTappingMode) return;
    e.preventDefault(); e.stopPropagation();
    
    if (seqIdx < forceSequence.length) {
        let nextChar = forceSequence[seqIdx++].toString();
        
        if (tappingType === 'acaan') {
            // CARD MODE: REPLACE LOGIC
            // If it's the first tap, replace the whole screen with the first digit (e.g., "0")
            if (seqIdx === 1) {
                currentInput = nextChar;
            } else {
                // If it's the second tap, add it next to the first (e.g., "0" becomes "08")
                currentInput = currentInput.toString() + nextChar;
            }
        } else {
            // TOXIC MODE: APPEND LOGIC
            // Always add the digit to the end of the existing math (e.g., "15 + 7")
            currentInput = currentInput.toString() + nextChar;
        }
        
        updateUI();
        updateIndicator(forceSequence.length - seqIdx);

        if (seqIdx === forceSequence.length) {
            isTappingMode = false; // Allow Equals button to work now
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
