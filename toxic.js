let targetGoal = localStorage.getItem("toxic_goal") || "100";
let pCount = 0, pTimer;

// Three taps on % opens the goal setter
function handlePercentLogic() {
    pCount++;
    clearTimeout(pTimer);
    if (pCount === 3) {
        document.getElementById('secret-overlay').style.display = 'flex';
        pCount = 0;
    } else {
        pTimer = setTimeout(() => {
            for(let i=0; i<pCount; i++) { appendChar('%'); }
            updateUI(); pCount = 0;
        }, 400);
    }
}

function saveToxicValue() {
    const val = document.getElementById('force-input').value;
    if (val) { 
        targetGoal = val; 
        localStorage.setItem("toxic_goal", val); 
    }
    document.getElementById('secret-overlay').style.display = 'none';
}

function calculateToxicGap() {
    try {
        // PRIORITY 1: ACAAN (Card Trick)
        if (typeof foundPos !== 'undefined' && foundPos !== "") {
            forceSequence = foundPos; // The 01-52 position
            tappingType = 'acaan';    // Tells engine.js to REPLACE screen
        } 
        // PRIORITY 2: TOXIC (Math Trick)
        else {
            let mathString = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Remove trailing operator if user just pressed it
            let evalString = (['+','-','*','/'].includes(mathString.slice(-1))) ? mathString.slice(0,-1) : mathString;
            
            let currentTotal = eval(evalString) || 0;
            let gap = parseFloat(targetGoal) - currentTotal;
            
            // Format the gap (e.g. if target is 100 and screen is 30, gap is 70)
            forceSequence = Math.abs(gap).toString();
            tappingType = 'toxic';    // Tells engine.js to APPEND to screen
        }
        
        isTappingMode = true; 
        seqIdx = 0; 
        updateIndicator(forceSequence.length);
    } catch (e) { 
        console.error("Toxic Error", e);
        exitSecretMode();
    }
}
