const Ship = require("./ship.js");
const GameBoard = require("./gameBoard.js");
import { gameLoop } from "./gameLoop.js";

const displayController = (function () { 
    let direction = "vertical";
    function placeShipModal() {
        const dialog = document.createElement("dialog");
        dialog.setAttribute("open", "");

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

                        const ship = gameLoop.userBoard.boardPieces[currentShipIndex];

                        // Check if the ship can be placed at the hovered location
                        if (rowIndex + ship.length <= 13 && colIndex + ship.length <= 13) {
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
                });

                div.addEventListener('click', () => {
                    const ship = gameLoop.userBoard.boardPieces[currentShipIndex];

                    // Check if the ship can be placed at the clicked location
                    if (rowIndex + ship.length <= 13 && colIndex + ship.length <= 13) {
                        gameLoop.userBoard.placeShip(ship, rowIndex, colIndex, ship.alignment);
                        currentShipIndex++;
                    }
                });
            });
        });
    }

    // function placeShipsOnModal() {
    //     const board = document.querySelector(".board");
    //     const gameBoard = gameLoop.userBoard;
    
    //     let currentShipIndex = 0;
    //     let lastHoveredCell = null;
    //     let lastColoredCells = [];
    
    //     board.addEventListener("mouseover", function (event) {
    //         if (event.target.classList.contains("e")) {
    //             const cell = event.target;
    //             const x = parseInt(cell.dataset.x);
    //             const y = parseInt(cell.dataset.y);
    
    //             // Only color the cells if the mouse has moved to a new cell
    //             if (lastHoveredCell !== cell) {
    //                 lastHoveredCell = cell;
    
    //                 // Uncolor the cells that were colored during the last hover event
    //                 lastColoredCells.forEach(cell => cell.style.backgroundColor = '');
    //                 lastColoredCells = [];
    
    //                 const ship = gameBoard.boardPieces[currentShipIndex];
    
    //                 if (!gameBoard.isAdjacentOccupied(x, y) && gameBoard.canPlaceShip(ship, x, y, ship.alignment)) {
    //                     ship.setCoordinates([x, y], ship.alignment);
    
    //                     // Color the cells based on the ship's length and alignment
    //                     for (let j = 0; j < ship.length; j++) {
    //                         let cellsToColor;
    
    //                         if (ship.alignment === 'horizontal') {
    //                             cellsToColor = document.querySelectorAll(`.e[data-x='${x + j}'][data-y='${y}']`);
    //                         } else { // ship.alignment === 'vertical'
    //                             cellsToColor = document.querySelectorAll(`.e[data-x='${x}'][data-y='${y + j}']`);
    //                         }
    
    //                         cellsToColor.forEach(cellToColor => {
    //                             cellToColor.style.backgroundColor = '#CCC5B9';
    //                             lastColoredCells.push(cellToColor);
    //                         });
    //                     }
    //                 }
    //             }
    //         }
    //     });
    
    //     board.addEventListener("click", function (event) {
    //         if (event.target.classList.contains("e")) {
    //             const cell = event.target;
    //             const x = parseInt(cell.dataset.x);
    //             const y = parseInt(cell.dataset.y);
    
    //             const ship = gameBoard.boardPieces[currentShipIndex];
    
    //             if (!gameBoard.isAdjacentOccupied(x, y) && gameBoard.canPlaceShip(ship, x, y, ship.alignment)) {
    //                 gameBoard.placeShip(ship, x, y, ship.alignment);
    //                 currentShipIndex++;
    //             }
    //         }
    //     });
    // }

    return { placeShipModal, placeShipsOnModal };
})();

export { displayController };
