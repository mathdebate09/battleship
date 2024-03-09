const Ship = require('./ship.js')

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
            new Ship(3), new Ship(3),
            new Ship(2), new Ship(2), new Ship(2),
            new Ship(1), new Ship(1), new Ship(1), new Ship(1)
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
            this.gameBoard[row][col] = 's';
        });
    }

    receiveAttack(row, col) {
        if (this.gameBoard[row][col] === 'e') {
            this.gameBoard[row][col] = 'm';
        } else if (this.gameBoard[row][col] === "s") {
            const ship = this.getShip(row, col)
            ship.hit();
            this.gameBoard[row][col] = 'h';
        }

        if (this.areAllShipsSunk()) {
            // ...
        }
    }

    getShip(row, col) {
        for (let i = 0; i < this.boardPieces.length; i++) {
            for (let j = 0; j < this.boardPieces[i].coordinates.length; j++) {
                if (this.boardPieces[i].coordinates[j][0] === row && this.boardPieces[i].coordinates[j][1] === col) {
                    return this.boardPieces[i];
                }
            }
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
}

module.exports = GameBoard;