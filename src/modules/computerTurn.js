const computerTurn = (function () {
  let previousTurns = new Set();

  function get() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (previousTurns.has(`${row},${col}`));

    previousTurns.add(`${row},${col}`);
    return [row, col];
  }

  return { get };
})();

export { computerTurn };
