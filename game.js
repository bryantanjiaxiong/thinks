/**
 * THINK'S - Core Game Logic
 * Consolidated & Modular Version
 */

// --- 1. GLOBAL VARIABLES ---
var jumps = 0;
var i = 0;
var p, q;
var password = "";
var havejumped = 0;
var gameenabled = true; // Set to true by default or managed by GA.js

// Level tracking variables
var havedone2 = -1, threeisdone = 0, havedone5 = -1, sixisdone = 0, 
    havedone7 = -1, eightisdone = 0, havedone7f = -1, eightfisdone = 0, 
    havedone10 = -1, elevenisdone = 0;

// The Game Board Array (9x9 max)
var z = Array.from({ length: 9 }, () => Array(9).fill(0));

// --- 2. INITIALIZATION & DEVICE DETECTION ---
if (localStorage.getItem('unlockedLevel') === null) {
    localStorage.setItem('unlockedLevel', '1');
}

window.onload = function() {
    initialisePage();
};

async function initialisePage() {
    console.log("Game Engine Loaded.");
    let device = localStorage.getItem("device");
    
    // Show loading message if it exists
    let msg = document.getElementById("message");
    if (msg) msg.style.display = "block";
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!device) {
        device = getDeviceType();
        localStorage.setItem("device", device);
    }
    
    if (msg) msg.style.display = "none";
    (device === "mobile") ? onMobile() : onPC();
    
    // Start the level lock observer
    startLevelObserver();
}

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile|iphone|ipod|android|blackberry|iemobile/i.test(ua) && window.innerWidth < 768) return 'mobile';
    return 'PC';
}

function startLevelObserver() {
    let lastLevel = localStorage.getItem('unlockedLevel');
    setInterval(() => {
        let currentLevel = localStorage.getItem('unlockedLevel');
        if (currentLevel !== lastLevel) {
            lastLevel = currentLevel;
            disableLockedLevels();
        }
    }, 500);
}

// --- 3. CORE MOVEMENT ENGINE ---
/**
 * Handles all logic for placing a piece on the board.
 */
function processMove(a, b, level, patternType, moveRule) {
    // Initial Move
    if (i === 0) {
        if (z[a][b] === 0) {
            applyColor(a, b, patternType);
            i++; p = a; q = b;
        }
    } 
    // Subsequent Moves
    else if (i > 0 && z[a][b] === 0) {
        let isAdjacent = (Math.abs(a - p) === 1 && b === q) || (Math.abs(b - q) === 1 && a === p);
        let canMove = false;

        if (moveRule === 'adjacent' && isAdjacent) {
            canMove = true;
        } else if (moveRule === 'infiniteJump') {
            canMove = true; 
        } else if (moveRule === 'jumpOnce') {
            if (isAdjacent) {
                canMove = true;
            } else if (jumps > 0) {
                canMove = true;
                jumps--;
                updateJumpDisplay();
            }
        }

        if (canMove) {
            applyColor(a, b, patternType);
            i++; p = a; q = b;
        }
    }
    checkboxes(level);
}

function applyColor(a, b, patternType) {
    let colorValue; // 1 = White, 2 = Black
    if (patternType === 'BWB') {
        colorValue = (i % 3 === 1) ? 1 : 2;
    } else if (patternType === 'BYLINE') {
        let seq = [1, 2, 2, 1]; // White, Black, Black, White
        colorValue = seq[i % 4];
    } else if (patternType === 'BW') {
        colorValue = (i % 2 === 0) ? 1 : 2;
    }

    z[a][b] = colorValue;
    let cell = document.getElementById(`box[${a}][${b}]`);
    if (cell) cell.style.backgroundColor = (colorValue === 1) ? "white" : "black";
}

// Wrapper functions for HTML calls
function returnpieceBWB(a, b, level) { processMove(a, b, level, 'BWB', 'adjacent'); }
function returnpieceBYLINE(a, b, level) { processMove(a, b, level, 'BYLINE', 'adjacent'); }
function returnpieceJUMPONCE(a, b, level) { processMove(a, b, level, 'BYLINE', 'jumpOnce'); }

// --- 4. UI & BOARD MANAGEMENT ---
function resetBoardData() {
    i = 0;
    z = Array.from({ length: 9 }, () => Array(9).fill(0));
}

function onMobile() {
    document.getElementById("replace0").innerHTML = "<div id='button-container'align='center' ><button id=user-choice onclick='tutorial()'>Start Tutorial</button><button id=user-choice onclick='startgame()'>Skip Tutorial</button></div>";
    // let grid = document.getElementById("thegrid");
    // if (grid) grid.style.gridTemplateColumns = "1fr";
}

function onPC() {
    document.getElementById("replace0").innerHTML = "<div id='button-container' align='center' '><button id=user-choice onclick='tutorial()' style='margin-right: 20px;'>Start Tutorial</button><button id=user-choice onclick='startgame()'>Skip Tutorial</button></div>";
}

function startgame() { window.location.href = "thinks.html"; }

function cleartheboard(levelID) {
    resetBoardData();
    if (!levelID) { makeboard('final', 'BWB'); return; }
    // Add logic to reload specific levels if needed
}

function updateJumpDisplay() {
    let j = document.getElementById("jumpcount");
    if (j) j.innerHTML = "Jump: " + jumps;
}

// --- 5. TUTORIAL SEQUENCE ---
function tutorialAutoFill(a, b, colorValue) {
    const colorName = (colorValue === 1) ? "white" : "black";
    const cellId = `box[${a}][${b}]`;
    const cell = document.getElementById(cellId);
    
    if (cell) {
        // Update Visuals
        cell.style.backgroundColor = colorName;
        
        // Update Internal State so the "Win Condition" can be met
        z[a][b] = colorValue;
        
        // Update Engine Trackers
        p = a; 
        q = b;
        i++; 
        
        console.log(`Tutorial Move: [${a},${b}] as ${colorName}. Current i: ${i}`);
    } else {
        console.error(`Tutorial Error: Could not find cell ${cellId}`);
    }
}

// --- 3. PATTERN INDICATOR LOGIC ---
/**
 * Updates the #circleInstructions div with the current color pattern.
 */
function updatePatternIndicator(patternType) {
    const container = document.getElementById("circleInstructions");
    if (!container) return;

    let colors = [];
    if (patternType === 'BW') colors = [2, 1];          // White, Black
    if (patternType === 'WB') colors = [1, 2];          // White, Black
    if (patternType === 'BWB') colors = [2, 1, 2];      // Black, White, Black
    if (patternType === 'BYLINE') colors = [1, 2, 2, 1]; // White, Black, Black, White

    let html = `<div style="display: flex; gap: 10px; justify-content: center; align-items: center; margin-bottom: 10px;">`;
    colors.forEach(val => {
        let bg = (val === 1) ? "white" : "black";
        html += `<div style="width: 25px; height: 25px; border-radius: 50%; border: 2px solid #333; background-color: ${bg};"></div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// --- Updated Board Creation ---

function makeboard(levelType,patternType) {
    resetBoardData();
    updatePatternIndicator(patternType);
    let isMobile = localStorage.getItem("device") === "mobile";
    let size = isMobile ? "247px" : "126px";
    let refArea = document.getElementById("thepictureforimitation");
    let boardArea = document.getElementById("replace");

    // 1. Set the Reference Picture based on the level/type
    let layout;
    if (levelType === 'tutorial-1') {
        // Standard checkerboard pattern for first tutorial
        layout = [1, 2, 1, 2, 1, 2, 1, 2, 1]; 
    } else if (levelType === 'tutorial-2') {
        // The "Stuck" layout from your makeboard1()
        layout = [1, 1, 1, 2, 2, 2, 1, 2, 1];
    } else {
        // The "Final" layout from your makeboardfinal()
        layout = [2, 2, 1, 1, 2, 2, 2, 1, 2];
    }

    if (refArea) refArea.innerHTML = generateReferenceHTML(layout, size);

    // 2. Set the Playable Board
    if (boardArea) {
        boardArea.innerHTML = `<div id="chessboard" style="width: ${size}; height: ${size}"></div>`
        
        for(let x=0; x<3; x++) {
            for(let y=0; y<3; y++) {
                // Only add the click handler if it's the final playable part
                let clickAttr = (levelType === 'final') ? `onclick="returnpieceBWB(${x}, ${y}, 1)"` : "";
                document.getElementById("chessboard").innerHTML += 
                    `<div class="beige"><button class="circle" id="box[${x}][${y}]" ${clickAttr}></button></div>`;
            }
        }
    }
}


function tutorial() {       
    let removeButton = document.querySelectorAll("#user-choice");
    if (removeButton) {
        removeButton.forEach(btn => {
            btn.style.display = "none";
        });
    }
    // Reset everything for a fresh start
    resetBoardData(); 
    makeboard('tutorial-1', 'WB'); // Draws the 3x3 grid and reference picture
    
    const msg = (text) => {
        const el = document.getElementById("instructions");
        if (el) el.innerHTML = text;
    };

    // --- Phase 1: The Adjacent Rule Demo ---
    msg("Generally, the Adjacent Rule: Only fill squares next to the previous one.");

    // Incremental moves (Original Timings)
    setTimeout(() => tutorialAutoFill(0, 0, 1), 7500); // White
    setTimeout(() => tutorialAutoFill(0, 1, 2), 8000); // Black
    setTimeout(() => tutorialAutoFill(0, 2, 1), 8500); // White
    setTimeout(() => tutorialAutoFill(1, 2, 2), 9000); // Black
    setTimeout(() => tutorialAutoFill(1, 1, 1), 9500); // White
    setTimeout(() => tutorialAutoFill(1, 0, 2), 10000); // Black
    setTimeout(() => tutorialAutoFill(2, 0, 1), 10500); // White
    setTimeout(() => tutorialAutoFill(2, 1, 2), 11000); // Black
    setTimeout(() => tutorialAutoFill(2, 2, 1), 11500); // White

    // --- Phase 2: Different Pattern Demo ---
    setTimeout(() => {
        makeboard('tutorial-1', 'WB'); // Clear board for new demo
        msg("The goal is to match the reference picture using the pattern repetition.");
    }, 14000);

    setTimeout(() => tutorialAutoFill(0, 0, 1), 18500);
    setTimeout(() => tutorialAutoFill(1, 0, 2), 19000);
    setTimeout(() => tutorialAutoFill(2, 0, 1), 19500);
    setTimeout(() => tutorialAutoFill(2, 1, 2), 20000);
    setTimeout(() => tutorialAutoFill(2, 2, 1), 20500);

    setTimeout(() => tutorialAutoFill(1, 2, 2), 21000);
    setTimeout(() => tutorialAutoFill(1, 1, 1), 21500);
    setTimeout(() => tutorialAutoFill(0, 1, 2), 22000);
    setTimeout(() => tutorialAutoFill(0, 2, 1), 22500);

    // --- PHASE 3: Repeating Pattern (25.5s - 39s) ---
    setTimeout(() => {
        msg("While using the pattern repetition: White then Black then White then Black.");
    }, 25500);

    setTimeout(() => {
        makeboard('tutorial-1', 'WB');
        tutorialAutoFill(1, 1, 1);
    }, 31000);
    setTimeout(() => tutorialAutoFill(1, 2, 2), 33000);
    setTimeout(() => tutorialAutoFill(2, 2, 1), 33500);
    setTimeout(() => tutorialAutoFill(2, 1, 2), 34000);
    setTimeout(() => tutorialAutoFill(2, 0, 1), 34500);
    setTimeout(() => tutorialAutoFill(1, 0, 2), 35000);
    setTimeout(() => tutorialAutoFill(0, 0, 1), 35500);
    setTimeout(() => tutorialAutoFill(0, 1, 2), 36000);
    setTimeout(() => tutorialAutoFill(0, 2, 1), 36500);

    // --- PHASE 4: Introducing Jumps (39s - 77s) ---
    setTimeout(() => {
        jumps = 1; // Initialize tutorial jump
        makeboard('tutorial-2', 'WB'); // Stuck Layout
        msg("Let us set a different picture. You can never fill all these squares with just the Adjacent Rule.");
        updateJumpDisplay();
    }, 39000);

    setTimeout(() => tutorialAutoFill(0, 0, 1), 47500);
    setTimeout(() => tutorialAutoFill(1, 0, 2), 48000);
    setTimeout(() => tutorialAutoFill(2, 0, 1), 48500);
    setTimeout(() => tutorialAutoFill(2, 1, 2), 49000);
    setTimeout(() => tutorialAutoFill(2, 2, 1), 49500);
    setTimeout(() => tutorialAutoFill(1, 2, 2), 50000);
    setTimeout(() => tutorialAutoFill(0, 2, 1), 50500);

     // Show jump counter
    setTimeout(() => msg("Now you are stuck. But note your 'Jumps' counter."), 54000);
    setTimeout(() => msg("Jumps allow you to fill an unadjacent square, then continue the Adjacent Rule from there."), 58000);
    
    // Perform the Jump
    setTimeout(() => {
        jumps--;
        updateJumpDisplay();
        tutorialAutoFill(1, 1, 2); // Jump to center (Black)
    }, 74000);
    setTimeout(() => tutorialAutoFill(0, 1, 1), 74500);

    // --- PHASE 5: Pattern Variation Challenge (77s - 105s) ---
    setTimeout(() => {
        makeboard('final', 'BWB'); // Target Layout
        msg("Pattern: Black White Black. You have ten seconds to find a way with no jumps.");
    }, 77000);

    setTimeout(() => msg("There are a few ways, this is one..."), 94500);
    setTimeout(() => tutorialAutoFill(1, 1, 2), 96000); // Black
    setTimeout(() => tutorialAutoFill(1, 0, 1), 96500); // White
    setTimeout(() => tutorialAutoFill(0, 0, 2), 97000); // Black
    setTimeout(() => tutorialAutoFill(0, 1, 2), 97500); // Black
    setTimeout(() => tutorialAutoFill(0, 2, 1), 98000); // White
    setTimeout(() => tutorialAutoFill(1, 2, 2), 98500); // Black
    setTimeout(() => tutorialAutoFill(2, 2, 2), 99000); // Black
    setTimeout(() => tutorialAutoFill(2, 1, 1), 99500); // White
    setTimeout(() => tutorialAutoFill(2, 0, 2), 100000); // Black

    // --- PHASE 6: Final Handover (105s+) ---
    setTimeout(() => {
        msg("Now it is your turn! Match the picture. If you make a mistake, use CLEAR.");
        document.getElementById("replace0").innerHTML = "<div id='button-container'><button id=user-choice onclick='tutorial()'>RESTART</button><button id=user-choice onclick='cleartheboard()'>CLEAR</button></div>";
       makeboard('final', 'BWB');  // Enable user control
    }, 105000);
}

// --- 6. WIN CONDITIONS ---
function checkboxes(lvl) {
    if (lvl === 1) {
        // Tutorial Win Condition
        if(z[0][0] == 2 && z[0][1] == 2 && z[0][2] == 1 && z[1][0] == 1 && z[1][1] == 2) {
            document.getElementById("replace0").innerHTML = "<div align='center'><button id=user-choice onclick='startgame()'>Finish Tutorial</button><button id=user-choice onclick='tutorial()'>Restart Tutorial</button></div>";
            document.getElementById("thepictureforimitation").innerHTML = "";
            document.getElementById("instructions").innerHTML = "";
            document.getElementById("jumpcount").innerHTML = "";
            document.getElementById("circleInstructions").innerHTML = "";
            document.getElementById("replace").innerHTML = "<h2>Tutorial Complete!</h2>";
        }
    }
}

function disableLockedLevels() {
    let unlocked = parseInt(localStorage.getItem('unlockedLevel') || "1");
    const levels = ["1a", "1b", "2a", "2b", "2c", "2d"]; // Extend this list
    levels.forEach((id, index) => {
        let btn = document.getElementById(id);
        if (btn) {
            btn.disabled = (index + 1) > unlocked;
            btn.style.opacity = btn.disabled ? "0.5" : "1";
        }
    });
}

/**
 * Generates the HTML for the reference picture.
 * @param {Array} layout - A 1D array of 9 values (e.g., [2,2,1, 1,2,2, 2,1,2])
 * @param {string} size - The CSS width/height (e.g., "126px")
 */
function generateReferenceHTML(layout, size) {
    let html = `<div style="padding-top: 20px;">
                <div id="picboard" style="width: ${size}; height: ${size}">`;
    
    layout.forEach(colorVal => {
        let color = (colorVal === 1) ? "white" : (colorVal === 2) ? "black" : "transparent";
        html += `<div class="beige"><button class="circle" style="background-color: ${color}"></button></div>`;
    });

    html += `</div></div>`;
    return html;
}

// function displayJumpDisplay() {
//     let jumpDisplay = document.getElementById("jumpcount");
//     jumpDisplay.innerHTML = "Jump: " + jumps;
// }