let isTappingMode = false;
let tappingType = null; 
let forceSequence = "";
let seqIdx = 0;

const body = document.getElementById('calc-body');
const dotBtn = document.getElementById('btn-dot');
const toggleBtn = document.getElementById('btn-toggle');
let pressTimer;

// Long Press Dot -> Toxic Force
dotBtn.addEventListener('touchstart', (e) => {
    pressTimer = setTimeout(() => {
        if (typeof calculateToxicGap === 'function') calculateToxicGap();
    }, 1000);
});

// Long Press Toggle -> ACAAN Mode
toggleBtn.addEventListener('touchstart', (e) => {
    pressTimer = setTimeout(() => {
        if (typeof activateAcaanMode === 'function') activateAcaanMode();
    }, 1000);
});

[dotBtn, toggleBtn].forEach(b => b.addEventListener('touchend', () => clearTimeout(pressTimer)));

// GLOBAL TAPPING ENGINE
body.addEventListener('touchstart', (e) => {
    if (!isTappingMode) return;
    
    // Check if the tap is on a button or background
    if (e.target.tagName === 'BUTTON' || e.target.id === 'calc-body') {
        e.preventDefault();
        
        if (seqIdx < forceSequence.length) {
            let nextDigit = forceSequence[seqIdx++];
            // Append force digit
            if (currentInput === "0") currentInput = nextDigit;
            else currentInput += nextDigit;
            
            updateUI();
            updateIndicator(forceSequence.length - seqIdx);
        }

        if (seqIdx === forceSequence.length) {
            exitSecretMode();
        }
    }
});

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
    setTimeout(() => { document.getElementById('tap-cue').style.display = 'none'; }, 1000);
}
