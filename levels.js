/** * THINK'S - Level Data (Migrated from Old Hardcoded Logic)
 * Colors: 1 = White, 2 = Black
 */
/**
 * THINK'S - Complete Level Data
 * Patterns: WB (White, Black), WWB (White, White, Black), etc.
 * Rules: adjacent, jumpOnce, jumpTwice
 */

const GAME_LEVELS = {
    // --- Level 1 (2x2) ---
    "1a": { size: 2, pattern: 'WB',   rule: 'adjacent', jumps: 0, target: [1, 2, 2, 1] },  // was 'BYLINE' — old code shows W,B (2 circles)
    "1b": { size: 2, pattern: 'WB',   rule: 'jumpOnce', jumps: 1, target: [1, 2, 1, 2] },  // correct, no change


    // --- Level 2 (3x3) ---
    "2a": { size: 3, pattern: 'WWB', rule: 'adjacent', jumps: 0, target: [1, 1, 1, 2, 2, 1, 1, 1, 2] },
    "2b": { size: 3, pattern: 'BWW', rule: 'adjacent', jumps: 0, target: [2, 1, 1, 1, 1, 1, 1, 2, 2] },
    "2c": { size: 3, pattern: 'BBW', rule: 'adjacent', jumps: 0, target: [1, 2, 2, 2, 1, 1, 2, 2, 2] },
    "2d": { size: 3, pattern: 'WBB', rule: 'adjacent', jumps: 0, target: [2, 2, 1, 2, 2, 1, 1, 2, 2] },

    // --- Level 2 Jumps (3x3) ---
    "2ea": { size: 3, pattern: 'WWB', rule: 'jumpOnce', jumps: 1, target: [1, 1, 1, 2, 2, 2, 1, 1, 1] },
    "2eb": { size: 3, pattern: 'BWW', rule: 'jumpOnce', jumps: 1, target: [1, 2, 1, 1, 1, 2, 2, 1, 1] },
    "2ec": { size: 3, pattern: 'BBW', rule: 'jumpOnce', jumps: 1, target: [2, 1, 2, 2, 1, 2, 2, 1, 2] },
    "2ed": { size: 3, pattern: 'WBB', rule: 'jumpOnce', jumps: 1, target: [2, 2, 1, 1, 2, 2, 2, 1, 2] },

    // --- Level 4 (4x4) ---
    "4aa": { size: 4, pattern: 'WWBB', rule: 'adjacent', jumps: 0, target: [1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1] },
    "4ab": { size: 4, pattern: 'BBWW', rule: 'adjacent', jumps: 0, target: [1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1] },
    "4ba": { size: 4, pattern: 'BBWW', rule: 'adjacent', jumps: 0, target: [2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1] },
    "4bb": { size: 4, pattern: 'WWBB', rule: 'adjacent', jumps: 0, target: [2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1] },

    // --- Level 5 (4x4) ---
    "5a": { size: 4, pattern: 'WWB', rule: 'adjacent', jumps: 0, target: [2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1] },
    "5b": { size: 4, pattern: 'WWB', rule: 'adjacent', jumps: 0, target: [2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2] },
    "5c": { size: 4, pattern: 'WWB', rule: 'adjacent', jumps: 0, target: [1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2] },
    "5d": { size: 4, pattern: 'WWB', rule: 'adjacent', jumps: 0, target: [1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1] },

    // --- Level 7 (4x4) ---
    "7a": { size: 4, pattern: 'W5', rule: 'adjacent', jumps: 0, target: [2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 2, 1] },
    "7b": { size: 4, pattern: 'W5', rule: 'adjacent', jumps: 0, target: [1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2] },
    "7c": { size: 4, pattern: 'W5', rule: 'adjacent', jumps: 0, target: [2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1] },
    "7d": { size: 4, pattern: 'W5', rule: 'adjacent', jumps: 0, target: [1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1] },
    "7e": { size: 4, pattern: 'W5', rule: 'adjacent', jumps: 0, target: [2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1] },
    "7fa": { size: 4, pattern: 'WBWBB', rule: 'adjacent', jumps: 0, target: [2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2] },
    "7fb": { size: 4, pattern: 'WBWBB', rule: 'adjacent', jumps: 0, target: [1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2] },
    "7fc": { size: 4, pattern: 'WBWBB', rule: 'adjacent', jumps: 0, target: [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1] },
    "7fd": { size: 4, pattern: 'WBWBB', rule: 'adjacent', jumps: 0, target: [1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1] },
    "7fe": { size: 4, pattern: 'WBWBB', rule: 'adjacent', jumps: 0, target: [1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2] },

    // --- Level 9 (4x4) ---
    "9aa": { size: 4, pattern: 'BWW', rule: 'jumpOnce', jumps: 1, target: [1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1] },
    "9ab": { size: 4, pattern: 'BWW', rule: 'jumpOnce', jumps: 1, target: [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1] },
    "9ac": { size: 4, pattern: 'BWW', rule: 'jumpOnce', jumps: 1, target: [1, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1] },
    "9ba": { size: 4, pattern: 'BBW', rule: 'jumpOnce', jumps: 1, target: [2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1] },
    "9bb": { size: 4, pattern: 'BBW', rule: 'jumpOnce', jumps: 1, target: [2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2] },
    "9bc": { size: 4, pattern: 'BBW', rule: 'jumpOnce', jumps: 1, target: [2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1] },
    "9ca": { size: 4, pattern: 'BWB', rule: 'jumpOnce', jumps: 1, target: [2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2] },
    "9cb": { size: 4, pattern: 'BWB', rule: 'jumpOnce', jumps: 1, target: [2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2] },
    "9cc": { size: 4, pattern: 'BWB', rule: 'jumpOnce', jumps: 1, target: [2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1] },
    "9da": { size: 4, pattern: 'WBBW', rule: 'jumpOnce', jumps: 1, target: [1, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 2, 1] },
    "9db": { size: 4, pattern: 'WBBW', rule: 'jumpOnce', jumps: 1, target: [1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2] },
    "9dc": { size: 4, pattern: 'WBBW', rule: 'jumpOnce', jumps: 1, target: [1, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2] },

    // --- Level 10 (5x5) ---
    "10a": { size: 5, pattern: 'WBBW', rule: 'jumpTwice', jumps: 2, target: [2, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1] },
    "10b": { size: 5, pattern: 'WBBW', rule: 'jumpTwice', jumps: 2, target: [2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2] },
    "10c": { size: 5, pattern: 'WBBW', rule: 'jumpTwice', jumps: 2, target: [2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2] },
    "10d": { size: 5, pattern: 'WBBW', rule: 'jumpTwice', jumps: 2, target: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1] },
    "10e": { size: 5, pattern: 'WBBW', rule: 'jumpTwice', jumps: 2, target: [1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2] },
    "10f": { size: 5, pattern: 'WBBW', rule: 'jumpTwice', jumps: 2, target: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2] },

    // --- Level 12 (5x5) ---
    "12a": { size: 5, pattern: 'BWB', rule: 'jumpTwice', jumps: 2, target: [2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1] },
    "12b": { size: 5, pattern: 'BWB', rule: 'jumpTwice', jumps: 2, target: [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 1, 2] },
    "12c": { size: 5, pattern: 'BWB', rule: 'jumpTwice', jumps: 2, target: [1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2] },
    "12d": { size: 5, pattern: 'BWB', rule: 'jumpTwice', jumps: 2, target: [2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2] }
};

const LEVEL_GROUPS = [
    { label: "Level 1", ids: ["1a", "1b"] },
    { label: "Level 2", ids: ["2a", "2b", "2c", "2d"] },
    { label: "Level 2 (Jumps)", ids: ["2ea", "2eb", "2ec", "2ed"] },
    { label: "Level 4", ids: ["4aa", "4ab", "4ba", "4bb"] },
    { label: "Level 5", ids: ["5a", "5b", "5c", "5d"] },
    { label: "Level 7", ids: ["7a", "7b", "7c", "7d", "7e", "7fa", "7fb", "7fc", "7fd", "7fe"] },
    { label: "Level 9", ids: ["9aa", "9ab", "9ac", "9ba", "9bb", "9bc", "9ca", "9cb", "9cc", "9da", "9db", "9dc"] },
    { label: "Level 10", ids: ["10a", "10b", "10c", "10d", "10e", "10f"] },
    { label: "Level 12", ids: ["12a", "12b", "12c", "12d"] }
];

// 3. THE UI LOGIC
function showLevelPanel() {
    const panel = document.getElementById("levelpanel");
    if (!panel) return;

    // Clear board display
    const replace = document.getElementById("replace");
    const ref = document.getElementById("thepictureforimitation");
    if (replace) replace.innerHTML = "";
    if (ref) ref.innerHTML = "<h2>Select a Level</h2>";
    
    document.getElementById("circleInstructions").innerHTML = "";
    document.getElementById("jumpcount").innerHTML = "";

    let html = `<div class="level-selection-grid" style="height: 90%; overflow-y: auto; padding: 10px;"><strong><h1 style="text-align:center; color:#333;">THINK'S - Level Select</h1> <p style="text-align:center; font-size: medium; margin-top: -10px; margin-bottom: 15px;">Select a level to start or reset a level</p></strong>`;

    // Correct Loop: Iterating through the groups defined above
    LEVEL_GROUPS.forEach(group => {
        html += `<div style="margin-bottom: 15px;">
                    <strong style="display:block; margin-bottom: 5px; color: #333;">${group.label}</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">`;
        
        group.ids.forEach(id => {
            if (GAME_LEVELS[id]) {
                html += `<button id="btn-${id}" class="level-button" onclick="loadLevel('${id}')">${id.toUpperCase()}</button>`;
            }
        });

        html += `</div></div>`;
    });

    html += `</div>`;
    
    panel.innerHTML = html;
    panel.style.opacity = "1";

    // Indicate current level 
    if (currentLevelId) {
        const currentBtn = document.getElementById(`btn-${currentLevelId}`);
        if (currentBtn) {
            currentBtn.style.border = "3px solid #02060b";
            currentBtn.style.backgroundColor = "#ffffff";
            currentBtn.style.color = "#333";
        }
    }
    
    disableLockedLevels();
}

function disableLockedLevels() {
    const allIds = LEVEL_GROUPS.flatMap(group => group.ids);
    const unlockedIndex = parseInt(localStorage.getItem('unlockedIndex') || "0");

    allIds.forEach((id, index) => {
        const btn = document.getElementById(`btn-${id}`);
        if (!btn) return;

        if (index > unlockedIndex) {
            btn.disabled = true;
            btn.title = "Complete previous levels to unlock";
            btn.style.opacity = "0.35";
            btn.style.cursor = "not-allowed";
        } else {
            btn.disabled = false;
            btn.title = "";
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
    });
}