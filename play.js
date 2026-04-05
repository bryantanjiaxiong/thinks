/**
 * THINK'S - Perfected Game Engine
 * Consolidated from Core Logic and Tutorial references
 */

// --- 1. GLOBAL STATE ---
let z = Array.from({ length: 9 }, () => Array(9).fill(0)); // The Game Board Array
let currentI = 0;           // Move sequence tracker
let lastX = null;           // Last moved X coordinate
let lastY = null;           // Last moved Y coordinate
let availableJumps = 0;     // Current jumps remaining
let currentLevelConfig = null;
let currentLevelId = null;
let lastPlacedX = null;
let lastPlacedY = null;

/**
 * Loads a level by ID from the GAME_LEVELS data object.
 * @param {string} levelId 
 */
function loadLevel(levelId = "1a") {
    const config = GAME_LEVELS[levelId];
    if (!config) return console.error("Level not found: " + levelId);

    // Reset State
    currentLevelId = levelId;
    currentLevelConfig = config;
    resetBoardData();
    availableJumps = config.jumps || 0;
    document.getElementById("message").style.display = "none";

    // Clear boards before rendering new level (prevents stale state bleed)
    const boardArea = document.getElementById("replace");
    const refArea = document.getElementById("thepictureforimitation");
    if (boardArea) boardArea.innerHTML = "";
    if (refArea) refArea.innerHTML = "";

    // UI Setup
    updatePatternIndicator(config.pattern);
    updateJumpDisplay();
    renderGameBoards(config);
}

// --- 2. CORE MOVEMENT ENGINE ---

/**
 * Handles logic for placing a piece based on movement rules.
 */
function handleInput(x, y) {
    
    if (z[x][y] !== 0) return;

    let canMove = false;
    if (currentI === 0) {
        canMove = true;
    } else {
        const isAdjacent = (Math.abs(x - lastX) === 1 && y === lastY) || 
                           (Math.abs(y - lastY) === 1 && x === lastX);

        if (isAdjacent) {
            canMove = true; // Adjacent moves always allowed, no jump consumed
        } else if ((currentLevelConfig.rule === 'jumpOnce' || currentLevelConfig.rule === 'jumpTwice') && availableJumps > 0) {
            canMove = true;
            availableJumps--;
            updateJumpDisplay();
        }
        // If neither: non-adjacent + no jumps available → canMove stays false
    }

    if (canMove) applyMove(x, y);
}

function applyMove(x, y) {
    let colorValue = calculateColor(currentI, currentLevelConfig.pattern); // 1 = White, 2 = Black
    z[x][y] = colorValue;

    // Update Visuals
    let cell = document.getElementById(`box[${x}][${y}]`);
    if (cell) cell.style.backgroundColor = (colorValue === 1) ? "white" : "black";

    // Update Engine Trackers
    lastX = x;
    lastY = y;
    currentI++;
    checkWinCondition()
}

/**
 * Determines the color of the current piece based on the pattern sequence.
 */
function calculateColor(index, patternType) {
    switch(patternType) {
        case 'WB': return (index % 2 === 0) ? 1 : 2;
        case 'BW': return (index % 2 === 0) ? 2 : 1;
        case 'BYLINE': 
        case 'WBBW': return [1, 2, 2, 1][index % 4];
        case 'WWB': return (index % 3 === 2) ? 2 : 1;
        case 'BWW': return (index % 3 === 0) ? 2 : 1;
        case 'BBW': return (index % 3 === 2) ? 1 : 2;
        case 'WBB': return (index % 3 === 0) ? 1 : 2;
        case 'BWB': return (index % 3 === 1) ? 1 : 2;
        case 'WWBB': return [1, 1, 2, 2][index % 4];
        case 'BBWW': return [2, 2, 1, 1][index % 4];
        case 'W5': return (index % 5 === 1 || index % 5 === 3) ? 2 : 1;
        case 'WBWBB': return [1, 2, 1, 2, 2][index % 5];
        default: return 1;
    }
}

// --- 3. UI & RENDERING ---

function updatePatternIndicator(patternType) {
    const container = document.getElementById("circleInstructions");
    if (!container) return;

    // Derive the repeating sequence length per pattern
    const patternLength = {
        'WB': 2, 'BW': 2,
        'WWB': 3, 'BWW': 3, 'BBW': 3, 'WBB': 3, 'BWB': 3,
        'WBBW': 4, 'BYLINE': 4, 'WWBB': 4, 'BBWW': 4,
        'W5': 5, 'WBWBB': 5,
    };

    const len = patternLength[patternType] || 2;
    // Reuse calculateColor so preview is always in sync with gameplay
    const colors = Array.from({ length: len }, (_, i) => calculateColor(i, patternType));

    let html = `<div style="display:flex; gap:10px; justify-content:center; align-items:center; margin:15px 0;">`;
    colors.forEach(val => {
        const bg = (val === 1) ? "white" : "black";
        html += `<div class="circleInstructions" style="background-color:${bg}; border:2px solid #333;"></div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

function renderGameBoards(config) {
    const boardArea = document.getElementById("replace");
    const refArea = document.getElementById("thepictureforimitation");

    // 1. Render Playable Board
    if (boardArea) {
        boardArea.innerHTML = `
            <div id="chessboard" style="
                display: grid; 
                grid-template-columns: repeat(${config.size}, 1fr);
                grid-template-rows: repeat(${config.size}, 1fr);
                border: 4px solid #333;">
            </div>`;

        const board = document.getElementById("chessboard");
        for (let x = 0; x < config.size; x++) {
            for (let y = 0; y < config.size; y++) {
                let cell = document.createElement("div");
                cell.className = "beige";
                cell.style.display = "flex";
                cell.style.alignItems = "center";
                cell.style.justifyContent = "center";
                cell.innerHTML = `<button class="circle" id="box[${x}][${y}]" onclick="handleInput(${x}, ${y})"></button>`;
                board.appendChild(cell);
            }
        }
    }

    // 2. Render Reference Board
    if (refArea) {
        refArea.innerHTML = `
            <div style="padding-top: 20px;">
                <div id="picboard" style="
                    display: grid;
                    grid-template-columns: repeat(${config.size}, 1fr);
                    grid-template-rows: repeat(${config.size}, 1fr);
                    border: 4px solid #333;">
                    ${config.target.map(val => {
                        let color = (val === 1) ? "white" : (val === 2) ? "black" : "transparent";
                        return `<div class="beige" style="display:flex; align-items:center; justify-content:center;">
                                    <button class="circle" style="background-color: ${color}; cursor: default;"></button>
                                </div>`;
                    }).join('')}
                </div>
            </div>`;
    }
}

// --- 4. UTILITIES ---

function resetBoardData() {
    currentI = 0;
    lastX = null;
    lastY = null;
    z = Array.from({ length: 9 }, () => Array(9).fill(0)); // Reset 2D array
}

function updateJumpDisplay() {
    let j = document.getElementById("jumpcount");
    if (j) j.innerHTML = "Jumps: " + availableJumps;
}

function checkWinCondition() {
    const isWin = currentLevelConfig.target.every((val, index) => {
        let x = Math.floor(index / currentLevelConfig.size);
        let y = index % currentLevelConfig.size;
        return z[x][y] === val;
    });

    if (isWin) {
        setTimeout(() => {
            progressLevel();
        }, 200);
    }
}

function progressLevel() {
    // Build a flat ordered list of all level IDs from LEVEL_GROUPS
    const allIds = LEVEL_GROUPS.flatMap(group => group.ids);

    const currentIndex = allIds.indexOf(currentLevelId);
    const unlockedIndex = parseInt(localStorage.getItem('unlockedIndex') || "0");

    // Only advance the unlock pointer if this is the furthest they've reached
    if (currentIndex >= unlockedIndex) {
        localStorage.setItem('unlockedIndex', (currentIndex + 1).toString());
    }

    if (typeof showLevelPanel === "function") showLevelPanel();
}




