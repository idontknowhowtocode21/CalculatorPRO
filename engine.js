// Global State - Initialize immediately to ensure a "live" feel
let currentInput = "0"; 
let isTappingMode = false;
let tappingType = null; 
let forceSequence = "";
let seqIdx = 0;

// 1. INITIALIZATION: Ensures the UI shows "0" on load
document.addEventListener('DOMContentLoaded', () => {
    updateUI(); 
    console.log("Calculator Initialized & Live");
});

// 2. GESTURE SETUP: Long-press detection
const keypad = document.getElementById('keypad'); 
const dotBtn = document.getElementById('btn-dot');
const toggleBtn = document.getElementById('btn-toggle');
let pressTimer;

// Long Press Dot -> Triggers Smart Toxic Gap
dotBtn.addEventListener('touchstart', (e) => {
    pressTimer = setTimeout(() => { 
        if (typeof calculateToxicGap === 'function') calculateToxicGap(); 
    }, 1000);
});

// Long Press Toggle (+/-) -> Activates ACAAN Card Mode
toggleBtn.addEventListener('touchstart', (e) => {
    pressTimer = setTimeout(() => { 
        if (typeof activateAcaanMode === 'function') activateAcaanMode(); 
    }, 1000);
});

// Clear timer if press is released early
[dotBtn, toggleBtn].forEach(b => b.addEventListener('touchend', () => clearTimeout(pressTimer)));

// 3. THE EXPANDED TAPPING ENGINE
// Listens to the entire keypad area, including black gaps between buttons.
keypad.addEventListener('touchstart', (e) => {
    if (!isTappingMode) return;
    
    // Block standard calculator button behavior
    e.preventDefault();
    e.stopPropagation();
    
    if (seqIdx < forceSequence.length) {
        let nextDigit = forceSequence[seqIdx++];
        
        // Handle input: replace initial "0" or append digits
        if (currentInput === "0" || currentInput === "") currentInput = nextDigit;
        else currentInput += nextDigit;
        
        updateUI();
        
        // Update the secret performer indicator
        updateIndicator(forceSequence.length - seqIdx);

        // 4. NATURAL EXIT DELAY
        // Keeps the phone "locked" for 1 second after the final tap.
        if (seqIdx === forceSequence.length) {
            setTimeout(() => { 
                exitSecretMode(); 
            }, 1000); 
        }
    }
}, { passive: false });

// 5. HELPER FUNCTIONS

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
    // Clean up ACAAN state if it was active
    if (typeof killCardMode === 'function') killCardMode();
    // Hide the performer indicator
    document.getElementById('tap-cue').style.display = 'none';
}
