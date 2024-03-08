const gameBoard = (function () {
    // array where the game would take place
    // e - empty, s - ship, h - hit, m - miss
    this.gameBoard = new Array(10);
    for (let i = 0; i < 10; i++) {
        this.gameBoard[i] = new Array(10).fill("e");
    }

    const boardPieces = [
        new Ship(4),
        new Ship(3), new Ship(3),
        new Ship(2), new Ship(2), new Ship(2),
        new Ship(1), new Ship(1), new Ship(1), new Ship(1)
    ];

    function isAdjacentOccupied(row, col) {
        for (let i = Math.max(0, row - 1); i <= Math.min(9, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(9, col + 1); j++) {
                if (this.gameBoard[i][j] === "s") {
                    return true;
                }
            }
        }

        return false;
    }

    function receiveAttack(row, col) {
        if (this.gameBoard[row][col] === 'e') {
            this.gameBoard[row][col] = 'm';
        } else if (this.gameBoard[row][col] instanceof Ship) {
            let ship = this.gameBoard[row][col];
            ship.hit();
            this.gameBoard[row][col] = 'h';
        } else {
            return
        }
    }
    
    return {receiveAttack, isAdjacentOccupied};
})();