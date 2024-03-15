const Ship = require("./ship.js");
const GameBoard = require("./gameBoard.js");
import { gameLoop } from "./gameLoop.js";

const displayController = (function () {
    let direction = "vertical";
    function placeShipModal() {
        const dialog = document.createElement("dialog");
        dialog.open = true;

        const dialogHeader = document.createElement("p");
        dialogHeader.textContent = "LAYOUT YOUR SHIPS";
        dialog.appendChild(dialogHeader);

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "button-div";

        const randomButton = document.createElement("button");
        randomButton.id = "random-bt";
        randomButton.textContent = "RANDOM";
        buttonContainer.appendChild(randomButton);

        const rotateButton = document.createElement("button");
        rotateButton.id = "rotate-bt";
        rotateButton.textContent = "ROTATE";
        rotateButton.addEventListener("click", function () {
            direction = (direction === "vertical") ? "horizontal" : "vertical";
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
        const boardDivs = document.querySelectorAll('.board > div');
        const boardDivsArray = Array.from(boardDivs);
        const rows = [];

        while (boardDivsArray.length) {
            rows.push(boardDivsArray.splice(0, 10));
        }

        let currentShipIndex = 0;
        let lastHoveredCell = null;
        let lastColoredCells = [];

        // Add a mouseover event listener to each div
        rows.forEach((row, rowIndex) => {
            row.forEach((div, colIndex) => {
                div.addEventListener('mouseover', () => {
                    // Only color the cells if the mouse has moved to a new cell
                    if (lastHoveredCell !== div) {
                        lastHoveredCell = div;

                        // Uncolor the cells that were colored during the last hover event
                        lastColoredCells.forEach(cell => cell.style.backgroundColor = '');
                        lastColoredCells = [];

                        if (currentShipIndex < gameLoop.userBoard.boardPieces.length) {
                            const ship = gameLoop.userBoard.boardPieces[currentShipIndex];
                            ship.alignment = direction; // Use the direction variable to determine the ship's alignment

                            // Check if the ship can be placed at the hovered location
                            if ((ship.alignment === 'vertical' && rowIndex + ship.length <= 10) ||
                                (ship.alignment === 'horizontal' && colIndex + ship.length <= 10)) {
                                // Color the cells based on the ship's length and alignment
                                for (let j = 0; j < ship.length; j++) {
                                    let cellToColor;

                                    if (ship.alignment === 'horizontal') {
                                        cellToColor = rows[rowIndex][colIndex + j];
                                    } else { // ship.alignment === 'vertical'
                                        cellToColor = rows[rowIndex + j][colIndex];
                                    }

                                    if (cellToColor) {
                                        cellToColor.style.backgroundColor = '#CCC5B9';
                                        lastColoredCells.push(cellToColor);
                                    }
                                }
                            }
                        }
                    }
                });

                div.addEventListener('click', () => {
                    if (currentShipIndex < gameLoop.userBoard.boardPieces.length && !gameLoop.userBoard.isAdjacentOccupied(rowIndex, colIndex)) {
                        const ship = gameLoop.userBoard.boardPieces[currentShipIndex];
                        ship.alignment = direction; // Use the direction variable to determine the ship's alignment

                        // Check if the ship can be placed at the clicked location
                        if ((ship.alignment === 'vertical' && rowIndex + ship.length <= 10) ||
                            (ship.alignment === 'horizontal' && colIndex + ship.length <= 10) &&
                            !gameLoop.userBoard.isAdjacentOccupied(rowIndex, colIndex)) {
                            gameLoop.userBoard.placeShip(ship, rowIndex, colIndex, ship.alignment);
                            currentShipIndex++;

                            // Color the cells that represent the ship's location
                            for (let j = 0; j < ship.length; j++) {
                                let cellToColor;

                                if (ship.alignment === 'horizontal') {
                                    cellToColor = rows[rowIndex][colIndex + j];
                                } else { // ship.alignment === 'vertical'
                                    cellToColor = rows[rowIndex + j][colIndex];
                                }

                                if (cellToColor) {
                                    cellToColor.classList.add('ship-location');
                                }
                            }
                        }
                    }

                    if (currentShipIndex === gameLoop.userBoard.boardPieces.length) {
                        const dialog = document.querySelector("dialog");
                        dialog.parentNode.removeChild(dialog);
                        console.log(gameLoop.userBoard)  
                    }
                });
            });
        });
    }

    return { placeShipModal, placeShipsOnModal };
})();

export { displayController };
