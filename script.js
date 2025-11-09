let cookies = 0;
let cursors = 0;
let cursorCost = 10;
let cps = 0; // cookies per second

// Elements
const cookie = document.getElementById("cookie");
const cookieCount = document.getElementById("cookieCount");
const cursorUpgrade = document.getElementById("cursorUpgrade");
const cursorCount = document.getElementById("cursorCount");
const cursorCostText = document.getElementById("cursorCost");
const cpsDisplay = document.getElementById("cps");

// 🔹 Load saved data when the game starts
function loadGame() {
    const savedCookies = localStorage.getItem("cookies");
    const savedCursors = localStorage.getItem("cursors");
    const savedCursorCost = localStorage.getItem("cursorCost");

    if (savedCookies) cookies = parseInt(savedCookies);
    if (savedCursors) cursors = parseInt(savedCursors);
    if (savedCursorCost) cursorCost = parseInt(savedCursorCost);

    cps = cursors; // each cursor adds 1 CPS
    updateDisplay();
}

// 🔹 Save data to localStorage
function saveGame() {
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("cursors", cursors);
    localStorage.setItem("cursorCost", cursorCost);
}

// 🔹 Update the numbers on screen
function updateDisplay() {
    cookieCount.textContent = cookies;
    cursorCount.textContent = cursors;
    cursorCostText.textContent = cursorCost;
    cpsDisplay.textContent = cps;
}

// 🔹 Click the cookie
cookie.addEventListener("click", () => {
    cookies++;
    updateDisplay();
    saveGame();
});

// 🔹 Buy cursors
cursorUpgrade.addEventListener("click", () => {
    if (cookies >= cursorCost) {
        cookies -= cursorCost;
        cursors++;
        cursorCost = Math.round(cursorCost * 1.3);
        cps = cursors;
        updateDisplay();
        saveGame();
    }
});

// 🔹 Auto-cookie generation
setInterval(() => {
    cookies += cps;
    updateDisplay();
    saveGame();
}, 1000);

// 🔹 Auto-save every 5 seconds (extra safety)
setInterval(saveGame, 5000);

// 🔹 Load saved data when game starts
loadGame();
