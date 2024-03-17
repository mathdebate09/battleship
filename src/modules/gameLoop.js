import Ship from "./ship.js";
import GameBoard from "./gameBoard.js";
import { displayController } from "./displayController.js";

const gameLoop = (function () {
  const userBoard = new GameBoard();
  const computerBoard = new GameBoard();
  let currentPlayer = "user";

  function startGame() {
    displayController.placeShipModal();
    displayController.placeShipsOnModal();
  }

  return {
    startGame,
    userBoard: userBoard,
    computerBoard: computerBoard,
  };
})();

export { gameLoop };
