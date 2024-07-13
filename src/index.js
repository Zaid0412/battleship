import "./style.css";

import { Gameboard } from "./Gameboard";
import { Player } from "./Players";

const body = document.querySelector("body");

const newFleetBtn = document.querySelector(".random-fleet-btn");
const startGameBtn = document.querySelector(".start-game-btn");
const changeNameBtn = document.querySelector(".change-name-btn");
const changeThemeBtn = document.querySelector(".change-theme-btn");
const submitNameBtn = document.querySelector(".submit-name-btn");

const changeNameModal = document.querySelector(".change-name-modal");
const newNameInput = document.querySelector("#player-name");

const compBoard = document.querySelectorAll(".comp-board .board-square");
const playerBoard = document.querySelectorAll(".player-board .board-square");

const playerNameTag = document.querySelector(".player-name-tag");

const player1 = new Player(new Gameboard());
player1.Gameboard.initGame();

const compPlayer = new Player(new Gameboard(), "Computer");
compPlayer.Gameboard.initGame("comp");

let gameStarted = false;

const displayWinner = (hasLost, winner) => {
  if (hasLost) {
    console.log(`${winner.name} Wins!`);
    gameStarted = false;
  }
};

const startGame = () => {
  gameStarted = true;

  newFleetBtn.disabled = true;
  newFleetBtn.classList.add("disabled-btn");

  startGameBtn.disabled = true;
  startGameBtn.classList.add("disabled-btn");
};

const changeTheme = () => {
  body.classList.toggle("dark");
  console.log("a");
};

const openNameModal = () => {
  changeNameModal.showModal();
};

const changeName = (name = "Player") => {
  player1.name = name;
  playerNameTag.textContent = name;
};

const compTurn = () => {
  const randomXCoord = Math.trunc(Math.random() * 10) + 1; // Generating a random x-coord
  const randomYCoord = Math.trunc(Math.random() * 10) + 1; // Generating a random y-coord
  let hitSquare;

  for (const playerSquare of playerBoard) {
    // Looping over all the squares in the playerBoard
    if (
      // Finding the square in the board that correspond to the one on the "board" array
      playerSquare.dataset.x == randomXCoord &&
      playerSquare.dataset.y == randomYCoord
    ) {
      hitSquare = playerSquare; // Setting hitSquare the square
    }
  }
  if (
    hitSquare.style.backgroundColor == "#6C6C71" ||
    hitSquare.classList.contains("hit")
  ) {
    // Checking if hitSquare was already hit
    return compTurn(); // If yes, run compTurn()
  } else if (
    typeof player1.Gameboard.board[randomYCoord - 1][randomXCoord - 1] ==
    "object"
  ) {
    // Else, if the clicked square is a ship
    player1.Gameboard.board[randomYCoord - 1][randomXCoord - 1].hit(); // Call hit() to the ship
    console.log(randomXCoord - 1, randomYCoord - 1);
    hitSquare.classList.add("hit");
  } else if (
    compPlayer.Gameboard.board[randomYCoord - 1][randomXCoord - 1] == "-"
  ) {
    hitSquare.style.backgroundColor = "#6C6C71";
  }

  displayWinner(compPlayer.Gameboard.isFleetSunk(), player1);
  console.log(compPlayer.Gameboard.fleet.every((ship) => ship.sunken));
};

for (const compSquare of compBoard) {
  compSquare.addEventListener("click", () => {
    if (gameStarted) {
      let x = Number(compSquare.dataset.x) - 1;
      let y = Number(compSquare.dataset.y) - 1;

      if (typeof compPlayer.Gameboard.board[y][x] == "object") {
        compPlayer.Gameboard.board[y][x].hit();
        compSquare.classList.add("hit");
      } else if (compPlayer.Gameboard.board[y][x] == "-") {
        compSquare.style.backgroundColor = "#6C6C71";
      }

      compTurn();
    }
    displayWinner(player1.Gameboard.isFleetSunk(), compPlayer);
    console.log(player1.Gameboard.fleet.every((ship) => ship.sunken));
  });
}
newFleetBtn.addEventListener("click", player1.Gameboard.initGame);

startGameBtn.addEventListener("click", startGame);

changeThemeBtn.addEventListener("click", changeTheme);

changeNameBtn.addEventListener("click", openNameModal);

submitNameBtn.addEventListener("click", () => {
  changeName(newNameInput.value);
  newNameInput.value = "";
});
