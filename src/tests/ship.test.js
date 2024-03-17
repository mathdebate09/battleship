import Ship from '../modules/ship.js';

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("hit increases numHits", () => {
    ship.hit();
    expect(ship.numHits).toBe(1);
  });

  test("hit does not increase numHits if ship is sunk", () => {
    ship.sunk = true;
    ship.hit();
    expect(ship.numHits).toBe(0);
  });

  test("isSunk sets sunk to true if numHits equals length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

  test("isSunk does not set sunk to true if numHits is less than length", () => {
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(false);
  });
});
