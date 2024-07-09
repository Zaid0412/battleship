import "./style.css";

import { Gameboard } from "./Gameboard";
import { Player } from "./Players";

const player1 = new Player(new Gameboard());

console.log(player1.Gameboard.initGame());

player1.Gameboard.receiveAttack(4, 5);
