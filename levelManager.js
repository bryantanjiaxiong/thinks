function startGame() {
    try {
        showLevelPanel();
    } catch (error) {
        console.error("Error starting the game:", error);
    }
}

function showLevelPanel() {
    const levelPanel = document.getElementById("levelpanel");
    if (!levelPanel) throw new Error("Level panel not found.");

    levelPanel.innerHTML = `
        <table style="margin-top: 16px;">
            <tr>
                <td><button class="levelbutton" onclick="levelHandler('levelOne')">1A</button></td>
                <td><button class="levelbutton" onclick="levelHandler('levelOne')">1B</button></td>
            </tr>
            <!-- Additional rows for levels -->
        </table>
    `;
}

function levelHandler(level) {
    try {
        if (typeof window[level] === "function") {
            window[level]();
        } else {
            throw new Error(`Level function '${level}' not found.`);
        }
    } catch (error) {
        console.error(`Error handling level '${level}':`, error);
    }
}

function levelOne() {
    console.log("Level One started!");
    // Add logic for level one
}
