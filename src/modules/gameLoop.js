const Ship = require('./ship.js')
const GameBoard = require('./gameBoard.js')
import { displayController } from './displayController.js';

const gameLoop = (function() {
    const playerUser = "user"
    const playerComputer = "computer"
    const userBoard = new GameBoard()
    const computerBoard = new GameBoard()

    function startGame() {
        let currentPlayer = playerUser
        displayController.placeShipModal()
        displayController.placeShipsOnModal()
    }

    return{ startGame, 
    userBoard : userBoard, computerBoard : computerBoard }
})();

export {gameLoop};