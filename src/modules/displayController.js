import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import { gameLoop } from "./gameLoop.js";
import { computerTurn } from "./computerTurn.js";

const displayController = (function () {
  let direction = "vertical";
  let currentShipIndex = 0;
  let lastHoveredCell = null;
  let lastColoredCells = [];

  function placeShipModal() {
    const existingDialog = document.querySelector("dialog");
    if (existingDialog) {
      existingDialog.remove();
    }

    const dialog = document.createElement("dialog");
    dialog.classList.add("task-input");
    dialog.open = true;

    const dialogHeader = document.createElement("p");
    dialogHeader.textContent = "LAYOUT YOUR SHIPS";
    dialog.appendChild(dialogHeader);

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "button-div";

    const resetButton = document.createElement("button");
    resetButton.id = "reset-bt";
    resetButton.textContent = "RESET";
    buttonContainer.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      // Reset the game board
      gameLoop.userBoard = new GameBoard();

      const pBoardDivs = document.querySelectorAll(".board > div");
      const pBoardDivsArray = Array.from(pBoardDivs);
      const pRows = [];

      while (pBoardDivsArray.length) {
        pRows.push(pBoardDivsArray.splice(0, 10));
      }

      // Clear all div ids
      pBoardDivs.forEach((div) => {
        div.id = "";
        div.className = "e";
      });

      // Call placeShipsOnModal again
      placeShipsOnModal();
    });

    const rotateButton = document.createElement("button");
    rotateButton.id = "rotate-bt";
    rotateButton.textContent = "ROTATE";
    rotateButton.addEventListener("click", function () {
      direction = direction === "vertical" ? "horizontal" : "vertical";
    });

    buttonContainer.appendChild(rotateButton);

    dialog.appendChild(buttonContainer);

    const grid = document.createElement("div");
    grid.className = "board";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.className = "e";
        grid.appendChild(cell);
      }
    }
    dialog.appendChild(grid);

    document.body.appendChild(dialog);
  }

  function placeShipsOnModal() {
    const boardDivs = document.querySelectorAll(".board > div");
    const boardDivsArray = Array.from(boardDivs);
    const rows = [];

    while (boardDivsArray.length) {
      rows.push(boardDivsArray.splice(0, 10));
    }
    currentShipIndex = 0;
    lastHoveredCell = null;
    lastColoredCells = [];

    rows.forEach((row, rowIndex) => {
      row.forEach((div, colIndex) => {
        div.addEventListener("mouseover", () => {
          if (lastHoveredCell !== div) {
            lastHoveredCell = div;

            lastColoredCells.forEach(
              (cell) => (cell.style.backgroundColor = ""),
            );
            lastColoredCells = [];

            if (currentShipIndex < gameLoop.userBoard.boardPieces.length) {
              const ship = gameLoop.userBoard.boardPieces[currentShipIndex];
              ship.alignment = direction;

              if (
                (ship.alignment === "vertical" &&
                  rowIndex + ship.length <= 10) ||
                (ship.alignment === "horizontal" &&
                  colIndex + ship.length <= 10)
              ) {
                for (let j = 0; j < ship.length; j++) {
                  let cellToColor;

                  if (ship.alignment === "horizontal") {
                    cellToColor = rows[rowIndex][colIndex + j];
                  } else {
                    cellToColor = rows[rowIndex + j][colIndex];
                  }

                  if (cellToColor) {
                    cellToColor.style.backgroundColor = "#CCC5B9";
                    lastColoredCells.push(cellToColor);
                  }
                }
              }
            }
          }
        });

        div.addEventListener("click", () => {
          if (
            currentShipIndex < gameLoop.userBoard.boardPieces.length &&
            !gameLoop.userBoard.isAdjacentOccupied(rowIndex, colIndex)
          ) {
            const ship = gameLoop.userBoard.boardPieces[currentShipIndex];
            ship.alignment = direction;

            if (
              (ship.alignment === "vertical" && rowIndex + ship.length <= 10) ||
              (ship.alignment === "horizontal" &&
                colIndex + ship.length <= 10 &&
                !gameLoop.userBoard.isAdjacentOccupied(rowIndex, colIndex))
            ) {
              gameLoop.userBoard.placeShip(
                ship,
                rowIndex,
                colIndex,
                ship.alignment,
              );
              currentShipIndex++;

              for (let j = 0; j < ship.length; j++) {
                let cellToColor;

                if (ship.alignment === "horizontal") {
                  cellToColor = rows[rowIndex][colIndex + j];
                } else {
                  cellToColor = rows[rowIndex + j][colIndex];
                }

                if (cellToColor) {
                  cellToColor.classList.add("ship-location");
                }
              }
            }
          }

          if (currentShipIndex === gameLoop.userBoard.boardPieces.length) {
            const dialog = document.querySelector("dialog");
            if (dialog) {
              dialog.style.display = "none";
            }
            gameLoop.computerBoard.populateShipsRandomly();
            displayShips();
          }
        });
      });
    });
  }

  function displayShips() {
    const pBoardDivs = document.querySelectorAll(".p-board > div");
    const pBoardDivsArray = Array.from(pBoardDivs);
    const pRows = [];

    while (pBoardDivsArray.length) {
      pRows.push(pBoardDivsArray.splice(0, 10));
    }

    pRows.forEach((row, rowIndex) => {
      row.forEach((div, colIndex) => {
        div.className = gameLoop.userBoard.gameBoard[rowIndex][colIndex];
      });
    });

    const cBoardDivs = document.querySelectorAll(".c-board > div");
    const cBoardDivsArray = Array.from(cBoardDivs);
    const cRows = [];

    while (cBoardDivsArray.length) {
      cRows.push(cBoardDivsArray.splice(0, 10));
    }

    cRows.forEach((row, rowIndex) => {
      row.forEach((div, colIndex) => {
        div.className = "e";
      });
    });
  }

  // OVERALL TAKETURNS FUNCTIONALITY
  let isPlayerTurn = true;

  // Add click event listeners to the divs
  const boardDivs = document.querySelectorAll(".c-board > div");
  boardDivs.forEach((div, index) => {
    let rowIndex = Math.floor(index / 10);
    let colIndex = index % 10;

    div.addEventListener("click", function () {
      if (isPlayerTurn) {
        playerTakeTurn(rowIndex, colIndex, div);
      }
    });
  });

  // Event listener for computer's turn
  document.addEventListener("computerTurn", function () {
    if (!isPlayerTurn) {
      computerTakeTurn();
    }
  });

  function playerTakeTurn(rowIndex, colIndex, div) {
    gameLoop.computerBoard.receiveAttack(rowIndex, colIndex);

    let newClass = gameLoop.computerBoard.gameBoard[rowIndex][colIndex];
    div.className = "";
    div.classList.add(newClass);

    if (gameLoop.computerBoard.areAllShipsSunk()) {
      declareWinner("player");
      document.querySelector(".player-div").style.filter = "none";
      document.querySelector(".computer-div").style.filter = "none";
    } else {
      if (newClass === "m") {
        isPlayerTurn = false;
        document.querySelector(".player-div").style.filter = "none";
        document.querySelector(".computer-div").style.filter = "blur(2px)";
      }

      setTimeout(() => {
        document.dispatchEvent(new Event("computerTurn"));
      }, 1000);
    }
  }

  function computerTakeTurn() {
    const boardDivs = document.querySelectorAll(".p-board > div");
    const boardDivsArray = Array.from(boardDivs);
    const rows = [];

    while (boardDivsArray.length) {
      rows.push(boardDivsArray.splice(0, 10));
    }

    const [rowIndex, colIndex] = computerTurn.get();
    const div = rows[rowIndex][colIndex];

    gameLoop.userBoard.receiveAttack(rowIndex, colIndex);

    let newClass = gameLoop.userBoard.gameBoard[rowIndex][colIndex];
    div.className = "";
    div.classList.add(newClass);

    if (gameLoop.userBoard.areAllShipsSunk()) {
      declareWinner("computer");
      document.querySelector(".player-div").style.filter = "none";
      document.querySelector(".computer-div").style.filter = "none";
    } else {
      if (newClass === "m") {
        isPlayerTurn = true;
        document.querySelector(".player-div").style.filter = "blur(2px)";
        document.querySelector(".computer-div").style.filter = "none";
      } else if (newClass === "h") {
        setTimeout(computerTakeTurn, 1000);
      }
    }
  }

  function declareWinner(winner) {
    const existingDialog = document.querySelector("dialog");
    if (existingDialog) {
      existingDialog.remove();
    }

    const dialog = document.createElement("dialog");
    dialog.classList.add("declare-res");

    const text = document.createElement("p");
    text.textContent = winner.toUpperCase() + " WINS!";
    dialog.appendChild(text);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", function () {
      dialog.close();
      gameLoop.userBoard = new GameBoard();
      gameLoop.computerBoard = new GameBoard();
      displayShips();
      gameLoop.startGame();
    });
    dialog.appendChild(restartButton);
    document.body.appendChild(dialog);
    dialog.showModal();
  }

  return { placeShipModal, placeShipsOnModal, displayShips, playerTakeTurn };
})();

export { displayController };
