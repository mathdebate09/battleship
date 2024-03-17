import human from "../assets/images/human.svg";
import computer from "../assets/images/computer.svg";

/* Creates
    <div class="container">
      <div class="header">
        <p>BATTLESHIP</p>
      </div>
      <div class="display">
        <div class="player-board">
          <div class="player-title"><img></img><p>PLAYER</p></div>
          <div class="p-board"></div>
        </div>
        <div class="computer-div">
          <div class="computer-title"><img></img><p>COMPUTER</p></div>
          <div class="c-board"></div>
        </div>
        <div
    </div> */

const container = document.querySelector(".container");

const header = document.createElement("div");
header.className = "header";
header.innerHTML = "<p>BATTLESHIP</p>";
container.appendChild(header);

const display = document.createElement("div");
display.className = "display";
container.appendChild(display);

const playerBoard = document.createElement("div");
playerBoard.className = "player-div ";
display.appendChild(playerBoard);

const playerTitle = document.createElement("div");
playerTitle.className = "player-title";
playerTitle.innerHTML = `<img src=${human}></img><p>PLAYER</p>`;
playerBoard.appendChild(playerTitle);

const pBoard = document.createElement("div");
pBoard.className = "p-board";

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.className = "e";
    pBoard.appendChild(cell);
  }
}

playerBoard.appendChild(pBoard);

const computerDiv = document.createElement("div");
computerDiv.className = "computer-div";
display.appendChild(computerDiv);

const computerTitle = document.createElement("div");
computerTitle.className = "computer-title";
computerTitle.innerHTML = `<img src=${computer}></img><p>COMPUTER</p>`;
computerDiv.appendChild(computerTitle);

const cBoard = document.createElement("div");
cBoard.className = "c-board";

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cell = document.createElement("div");
    cell.className = "e";
    cBoard.appendChild(cell);
  }
}

computerDiv.appendChild(cBoard);
document.body.appendChild(container);

const createFooter = document.createElement("div");
createFooter.classList.add("footer");
createFooter.innerHTML =
  '<p>© Jay Singh <a href="https://github.com/mathdebate09/battleship" target="_blank">(mathdebate09)</a></p>';
container.appendChild(createFooter);
