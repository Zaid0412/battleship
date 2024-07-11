import { Gameboard } from "./Gameboard";

export class Player {
  constructor(Gameboard, name = "Player") {
    this.Gameboard = Gameboard;
    this.name = name;
  }
}
