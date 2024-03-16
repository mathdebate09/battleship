import Ship from './ship.js'
import GameBoard from './gameBoard.js'
import { displayController } from './displayController.js';

const gameLoop = (function () {
    const userBoard = new GameBoard()
    const computerBoard = new GameBoard()
    let currentPlayer = 'user';

    function switchPlayer() {
        currentPlayer = currentPlayer === 'user' ? 'computer' : 'user';
    }

    function startGame() {
        displayController.placeShipModal();
        displayController.placeShipsOnModal();
        computerBoard.populateShipsRandomly();
        playGame()
    }

    async function playGame() {
        while (!userBoard.areAllShipsSunk() && !computerBoard.areAllShipsSunk()) {
            await displayController.takeTurn(); // Wait for the turn to complete
            switchPlayer();
            await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
        }
    
        if (userBoard.areAllShipsSunk()) {
            console.log('Computer wins!');
        } else {
            console.log('User wins!');
        }
    }

    let usedCoordinates = new Set();

    function computerTurn() {
        let row, col;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (usedCoordinates.has(`${row},${col}`));

        usedCoordinates.add(`${row},${col}`);
        return [row, col];
    }



    return {
        startGame,computerTurn,
        userBoard: userBoard, computerBoard: computerBoard
    }
})();

export { gameLoop };