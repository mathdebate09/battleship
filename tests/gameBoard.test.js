const Ship = require('../src/modules/ship.js');
const GameBoard = require('../src/modules/gameBoard.js');

let gameBoard;

beforeEach(() => {
    gameBoard = new GameBoard();
});

describe('gameBoard', () => {
    test('should correctly initialize a game board', () => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                expect(gameBoard.gameBoard[i][j]).toBe('e');
            }
        }
    });

    test('should correctly register a miss', () => {
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.gameBoard[0][0]).toBe('m');
    });

    test('should correctly register a hit', () => {
        gameBoard.gameBoard[0][0] = "s"
        gameBoard.gamePieces[0].setCoordinates([0,0], 'horizontal')
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.gameBoard[0][0]).toBe('h');
    });

    test('should correctly check if adjacent cells are occupied', () => {
        gameBoard.gameBoard[0][0] = 's';
        expect(gameBoard.isAdjacentOccupied(1, 1)).toBe(true);
    });
});