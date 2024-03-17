import GameBoard from '../modules/gameBoard.js';
import Ship from '../modules/ship.js';

describe('GameBoard', () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test('constructor initializes gameBoard and boardPieces correctly', () => {
    expect(gameBoard.gameBoard.length).toBe(10);
    gameBoard.gameBoard.forEach(row => {
      expect(row.length).toBe(10);
      row.forEach(cell => expect(cell).toBe('e'));
    });

    expect(gameBoard.boardPieces.length).toBe(10);
    gameBoard.boardPieces.forEach(ship => expect(ship).toBeInstanceOf(Ship));
  });

  test('isAdjacentOccupied returns true if adjacent cell is occupied', () => {
    gameBoard.gameBoard[1][1] = 's';
    expect(gameBoard.isAdjacentOccupied(0, 0)).toBe(true);
  });

  test('isAdjacentOccupied returns false if no adjacent cell is occupied', () => {
    expect(gameBoard.isAdjacentOccupied(0, 0)).toBe(false);
  });

  test('populateShips updates gameBoard correctly', () => {
    const ship = new Ship(1);
    ship.coordinates = [[0, 0]];
    gameBoard.populateShips(ship);
    expect(gameBoard.gameBoard[0][0]).toBe('s');
  });

  test('getShip returns the correct ship', () => {
    const ship = new Ship(1);
    ship.coordinates = [[0, 0]];
    gameBoard.boardPieces.push(ship);
    expect(gameBoard.getShip(0, 0)).toBe(ship);
  });

  test('receiveAttack updates gameBoard correctly', () => {
    const ship = new Ship(1);
    ship.coordinates = [[0, 0]];
    gameBoard.boardPieces.push(ship);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.gameBoard[0][0]).toBe('h');
  });

  test('areAllShipsSunk returns true if all ships are sunk', () => {
    gameBoard.boardPieces.forEach(ship => ship.sunk = true);
    expect(gameBoard.areAllShipsSunk()).toBe(true);
  });

  test('areAllShipsSunk returns false if not all ships are sunk', () => {
    gameBoard.boardPieces[0].sunk = true;
    expect(gameBoard.areAllShipsSunk()).toBe(false);
  });
});