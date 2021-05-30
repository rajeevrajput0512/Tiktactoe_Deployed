//SELECTING ELEMENT FROM HTML
let switchIcn = document.querySelector(".switch");
let box = document.querySelectorAll(".box");

let msg = document.querySelector(".msg");
let msgTxt = document.querySelector(".msg-txt");

//STORING USABLE CONDITIONS AND DATA
let matchCombine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];
let playWithbot = false;
let turn = true;
let x = "x";
let o = "o";

//STARTING AND RESETING FUNCTION
function startGame() {
  //    IT WILL EXCUTE IF USER WANTS TO PLAY WITH bot
  if (playWithbot) {
    box.forEach((cell) => {
      //DELETING ALL PREVIOUS CLASS FROM ALL CELL
      cell.classList.remove(x);
      cell.classList.remove(o);
      cell.addEventListener("click", player); //ADDING player FUNCTION IN ALL CELL
    });
    if (!turn) {
      bot();
    }
  } else {
    box.forEach((cell) => {
      //DELETING ALL PREVIOUS CLASS FROM ALL CELL
      cell.classList.remove(x);
      cell.classList.remove(o);
      cell.removeEventListener("click", player); //REMOVING PLAYER FUNCTION FROM ALL CELL
      cell.addEventListener("click", dummyPlayers, { once: true }); //ADDING CUSTOM PLAYER FUNCTION IN ALL CELL AND IT WILL EXCUTE ONCE
    });
  }
  update();
  msgBox();
}

//CHANGING MODE AND THE THEME COLOR OF WEBSITE
function changeMode() {
  if (switchIcn.classList.contains("bot")) {
    switchIcn.classList.remove("bot");
    switchIcn.classList.add("custom");
    switchIcn.innerHTML = '<i class="fas fa-user" ></i>';
    document.documentElement.style.setProperty("--color", "#008080");
    playWithbot = false;
  } else {
    switchIcn.classList.add("bot");
    switchIcn.classList.remove("custom");
    switchIcn.innerHTML = '<i class="fas fa-robot" ></i>';
    document.documentElement.style.setProperty("--color", "#808000");
    playWithbot = true;
  }

  //RESTEING GAME AND MAKING MSG BOX VISIBLE FOR ONCE CAUSE WHEN GAME WAS RESET THE MSG BOX WILL AUTOMATICLLY INVISIBLE
  msgBox();
  startGame();
}

let player = (e) => {
  //    CHECKING THE TURN FOR PLAYER
  if (turn) {
    let item = e.target;
    if (!item.classList.contains(o) && !item.classList.contains(x)) {
      item.classList.add(x);
      // CHECKING X FOR WINNING OR DRAW
      check(x);
      // UPADTING TURN
      turn = false;
      update();
      setTimeout(bot, 500); // To avoid instant popout of the moves
    }
  }
};

let bot = () => {
  if (isDraw() || Winner(x)) {
    return;
  } else if (!turn) {
    let autoIndex = Math.floor(Math.random() * box.length);
    if (
      !box[autoIndex].classList.contains(x) &&
      !box[autoIndex].classList.contains(o)
    ) {
      box[autoIndex].classList.add(o);
      // CHECKING O FOR WINNING OR DRAW
      check(o);
      // UPADTING TURN
      turn = true;
      update();
    } else {
      bot();
    }
  }
};

let dummyPlayers = (e) => {
  if (!playWithbot) {
    let item = e.target;
    let mark = turn ? x : o;
    item.classList.add(mark);
    // CHECKING FOR WINNING OR DRAW
    check(mark);
    // UPADTING TURN
    turn = turn ? false : true;
    update();
  }
};

let check = (player) => {
  if (Winner(player)) {
    msgTxt.innerHTML = `"${player}"  WINS!!!!🙌🙌🙌`;
    msgBox();
  } else if (isDraw()) {
    msgTxt.innerHTML = "Draw";
    msgBox();
  }
};
// CHECKING FOR X OR O CLASS THAT ARE THEY IN THE MATCHING CONDITION INDEX
let Winner = (player) => {
  return matchCombine.some((cond) => {
    return cond.every((index) => {
      return box[index].classList.contains(player);
    });
  });
};
// CHECKING THAT IF ALL CELL ARE HAVE X OR O CLASS
let isDraw = () => {
  for (let i = 0; i < box.length; i++) {
    if (!box[i].classList.contains(x) && !box[i].classList.contains(o)) {
      return false;
    }
  }
  return true;
};
//MESSAGE DISPLAY
let msgBox = () => {
  if (msg.classList.contains("show")) {
    msg.classList.remove("show");
  } else {
    msg.classList.add("show");
  }
};
// TURN UPDATE IN THE BUTTON
let update = () => {
  let turnbtn = document.querySelector(".btn");
  if (turn) {
    turnbtn.innerHTML = "X's TURN";
  } else {
    turnbtn.innerHTML = "O's TURN";
  }
};
