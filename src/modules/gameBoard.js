import Ship from "./ship.js";

class GameBoard {
  constructor() {
    // array where the game would take place
    // e - empty, s - ship, h - hit, m - miss
    this.gameBoard = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.gameBoard[i] = new Array(10).fill("e");
    }

    this.boardPieces = [
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(2),
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(1),
    ];
  }

  isAdjacentOccupied(row, col) {
    for (let i = Math.max(0, row - 1); i <= Math.min(9, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(9, col + 1); j++) {
        if (this.gameBoard[i][j] === "s") {
          return true;
        }
      }
    }

    return false;
  }

  populateShips(ship) {
    ship.coordinates.forEach(([row, col]) => {
      this.gameBoard[row][col] = "s";
    });
  }

  getShip(row, col) {
    for (let i = 0; i < this.boardPieces.length; i++) {
      for (let j = 0; j < this.boardPieces[i].coordinates.length; j++) {
        if (
          this.boardPieces[i].coordinates[j][0] === row &&
          this.boardPieces[i].coordinates[j][1] === col
        ) {
          return this.boardPieces[i];
        }
      }
    }
    return null;
  }

  receiveAttack(row, col) {
    if (
      row >= 0 &&
      row < this.gameBoard.length &&
      col >= 0 &&
      col < this.gameBoard[row].length
    ) {
      if (this.gameBoard[row][col] === "e") {
        this.gameBoard[row][col] = "m";
      } else if (this.gameBoard[row][col] === "s") {
        const ship = this.getShip(row, col);
        if (ship) {
          ship.hit();
          this.gameBoard[row][col] = "h";
        } else {
          console.error(`No ship found at coordinates (${row}, ${col})`);
        }
      }
    } else {
      console.error(`Invalid coordinates: (${row}, ${col})`);
    }
  }

  areAllShipsSunk() {
    for (let i = 0; i < this.boardPieces.length; i++) {
      if (!this.boardPieces[i].sunk) {
        return false;
      }
    }
    return true;
  }

  populateShipsRandomly() {
    this.boardPieces.forEach((ship) => {
      let row, col, direction;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      } while (!this.canPlaceShip(ship, row, col, direction));

      this.placeShip(ship, row, col, direction);
    });
  }

  canPlaceShip(ship, row, col, direction) {
    if (direction === "horizontal") {
      if (col + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (col + i < 10) {
          if (
            this.gameBoard[row][col + i] === "s" ||
            this.isAdjacentOccupied(row, col + i)
          ) {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      // vertical
      if (row + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (row + i < 10) {
          if (
            this.gameBoard[row + i][col] === "s" ||
            this.isAdjacentOccupied(row + i, col)
          ) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(ship, row, col, direction) {
    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        ship.coordinates.push([row, col + i]);
        this.gameBoard[row][col + i] = "s";
      } else {
        // vertical
        ship.coordinates.push([row + i, col]);
        this.gameBoard[row + i][col] = "s";
      }
    }
  }
}

export default GameBoard;
