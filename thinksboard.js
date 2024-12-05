class Square {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.element = document.createElement('div');
      this.element.classList.add('square');
      this.element.textContent = `${x}, ${y}`; // Optional: Add coordinates
    }
}

class SquareButton {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.element = document.createElement('button');
      this.element.classList.add('squarebutton');
      this.element.textContent = `${x}, ${y}`; // Optional: Add coordinates
    }
}

function createBoard(I,J) {
    const board = document.getElementById("playboard");
    board.innerHTML = '';
    for (let i = 0; i < I; i++) {
        const row = document.createElement('div');
        row.classList.add('board-row');
      for (let j = 0; j < J; j++) {
        const square = new SquareButton(i, j);
        row.appendChild(square.element);
      }
      board.appendChild(row);
    }
}

function createGoalBoard(I,J) {
    const board = document.getElementById("goalboard");
    for (let i = 0; i < I; i++) {
        const row = document.createElement('div');
        row.classList.add('goal-board-row');
      for (let j = 0; j < J; j++) {
        const square = new Square(i, j);
        row.appendChild(square.element);
      }
      board.appendChild(row);
    }
}

// function createBoard(x, y, containerId) {
//     const container = document.getElementById(containerId);
//     container.innerHTML = ''; // Clear any existing content
  
//     for (let i = 0; i < y; i++) {
//       const row = document.createElement('div');
//       row.classList.add('board-row');
  
//       for (let j = 0; j < x; j++) {
//         const cell = document.createElement('div');
//         cell.classList.add('board-cell');
//         row.appendChild(cell);
//       }
  
//       container.appendChild(row);
//     }
//   }

async function Play() {
    const welcomeMessage = document.getElementById("Welcome-Message");
    const board = document.getElementById("game");
    welcomeMessage.style.display = "none";
    board.style.display = "flex";
    createBoard(4,3);
    createGoalBoard(4,3);
}

// function createBoard(dimension) {
//     const board = document.getElementById('board');
//     board.innerHTML = ''; // Clear any existing content

//     for (let i = 0; i < dimension; i++) {
//         for (let j = 0; j < dimension; j++) {
//             const square = document.createElement('div');
//             square.classList.add('square');
//             square.textContent = `${i}, ${j}`; // Optional: Add coordinates
//             board.appendChild(square);
//         }
//     }
// }

// // Example usage:
// createBoard(3); // Create a 3x3 board

