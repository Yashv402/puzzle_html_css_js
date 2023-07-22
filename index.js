var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

// THEMES
var dor = false;
var toothless = false;
var fairy = false;

var theme;

let game_over = false;

var turns = 0;
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

let board = document.getElementById("board");
window.onload = function () {
  if (game_over) {
    return;
  }
  let number = Math.floor(Math.random()*2);
   if(number==0){
      theme = "Toothless";
      board.style.backgroundImage="url('./Toothless/10.jpg')"
  }
  else{
      theme = "Fairy";
      board.style.backgroundImage="url('./Fairy/0d09246df23171ec13174075fdfb1389.jpg')"
  }

  setup();
};

function setup(){

    imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          // <img id="0-0" src= "1.jpg">
          let tile = document.createElement("img");
          tile.id = r.toString() + "-" + c.toString();
          tile.src = "./" + theme + "/" + imgOrder.shift() + ".jpg";
          if(theme== "Fairy"){
            tile.style.border = "1px solid #747796";
            board.style.border = "10px solid #747796";
          }
          else{
            tile.style.border = "1px solid #262219";
            board.style.border = "10px solid #262219";
          }
    
          // DRAG AND DROP
          tile.addEventListener("dragstart", dragStart); // click an image to drag
          tile.addEventListener("dragover", dragOver); // moving image arouns while clicked
          tile.addEventListener("dragenter", dragEnter); // dragging image onto another
          tile.addEventListener("dragleave", dragLeave); // dragged images leaving another image
          tile.addEventListener("drop", dragDrop); // drag an image over another image, drop the image
          tile.addEventListener("dragend", dragEnd); // after drag drop, swap the two tiles
    
          document.getElementById("board").append(tile);
        }
      }
}

function dragStart() {
  currTile = this; // this refers to the img tile being dragged
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
//   if(!otherTile.src.includes("3.jpg")){
//       return;
//   }

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c == c2 - 1;
  let moveRight = r == r2 && c == c2 + 1;
  let moveUp = r == r2 - 1 && c == c2;
  let moveDown = r == r2 + 1 && c == c2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    let turns = document.getElementById("turns");
    turns.innerText = parseInt(turns.innerText) + 1;
  }
  isdone();
}

function checkwin() {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      if (!tile.src.includes((count + 1).toString())) {
        return false;
      }
      count++;
    }
  }
  return true;
}

function isdone() {
  let winboard = document.getElementById("go");
  if (checkwin()) {
    board.innerHTML="";
    game_over = true;
    if(theme=="Toothless"){
        winboard.style.color ="black";
    }
    winboard.style.display = "block";
  }

  window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
      board.innerHTML="";
      winboard.style.display = "none";
      game_over = false;
      let turns = document.getElementById("turns");
      turns.innerText = 0;

      setup();
    }

    
  });

}