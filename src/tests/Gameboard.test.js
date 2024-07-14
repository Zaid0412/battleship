const Gameboard = require("../Gameboard");

test("Creates 10x10 board", () => {
  const gameboard = new Gameboard();

  gameboard.board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});
