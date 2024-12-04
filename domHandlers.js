document.getElementById("mobileBtn").addEventListener("click", () => {
    try {
        adjustForMobile();
    } catch (error) {
        console.error("Error adjusting for mobile view:", error);
    }
});

document.getElementById("pcBtn").addEventListener("click", () => {
    try {
        adjustForPC();
    } catch (error) {
        console.error("Error adjusting for PC view:", error);
    }
});

function adjustForMobile() {
    const grid = document.getElementById("thegrid");
    if (!grid) throw new Error("Grid element not found.");
    grid.style.gridTemplateColumns = GRID_TEMPLATE_MOBILE;

    const replace0 = document.getElementById("replace0");
    if (!replace0) throw new Error("Replace0 element not found.");
    replace0.innerHTML = '<div align="center"><button style="margin-top: 300px;" onclick="startGame()">Start Game</button></div>';
}

function adjustForPC() {
    const replace0 = document.getElementById("replace0");
    if (!replace0) throw new Error("Replace0 element not found.");
    replace0.innerHTML = '<div align="center"><button style="margin-top: 300px;" onclick="startGame()">Start Game</button></div>';
}
