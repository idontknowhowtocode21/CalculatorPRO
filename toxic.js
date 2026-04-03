let toxicValue = localStorage.getItem("toxic_force") || "";
let pCount = 0;
let pTimer;

function handlePercentLogic() {
    pCount++;
    clearTimeout(pTimer);
    if (pCount === 3) {
        document.getElementById('secret-overlay').style.display = 'flex';
        pCount = 0;
        if (currentInput.endsWith('%%')) currentInput = currentInput.slice(0, -2);
    } else {
        appendChar('%');
        pTimer = setTimeout(() => pCount = 0, 600);
    }
}

function saveToxicValue() {
    toxicValue = document.getElementById('force-input').value;
    localStorage.setItem("toxic_force", toxicValue);
    document.getElementById('secret-overlay').style.display = 'none';
    currentInput = "";
    updateUI();
}
