import { Ship } from "./Ship";

export class Gameboard {
  constructor() {
    this.fleet = [
      new Ship(5),
      new Ship(4),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(2),
    ];
    this.board = [
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ];
    this.missedHits = [];
  }

  initGame = () => {
    for (const ship of this.fleet) {
      // Generating random x and y coords
      const randomXCoord = Math.trunc(Math.random() * 10);
      const randomYCoord = Math.trunc(Math.random() * 10);

      // Checking if the x-coord is greater than 5
      if (randomXCoord > 5) {
        for (let i = 0; i < ship.length; i++) {
          if (this.board[randomYCoord][randomXCoord - i] == "-") {
            this.board[randomYCoord][randomXCoord - i] = ship;
          }
        }
      } else if (randomXCoord < 5) {
        // Checking is the x-coord is less than 5
        for (let i = 0; i < ship.length; i++) {
          if (this.board[randomYCoord][randomXCoord + i] == "-") {
            this.board[randomYCoord][randomXCoord + i] = ship;
          }
        }
      }
    }
    console.log(this.board);
  };

  allShipSink = () => {
    // Checking is all of the ships are sunken
    return this.fleet.every((ship) => ship.isSunk());
  };

  receiveAttack = (x, y) => {
    // Checking if it is a hit
    if (this.board[y][x] !== "-") {
      this.board[y][x].hit(); // If yes, call ship.hit() to that ship
    } else if (this.board[y][x] === "-") {
      this.missedHits.push([x, y]); // if not, adding the missed coords to missedHits array
    }
  };
}
