/*----- Cached Element References  -----*/
const coloredBtn = document.querySelectorAll(".gameBtn");
const startBtn = document.querySelector(".startBtn");
const mode = document.querySelector(".mode");
const topScoreTxt = document.querySelector(".topScore");
const background = document.querySelector("body");
const score = document.querySelector("h1");
const scoreStatment = document.querySelector("h2");
const instruction = document.querySelector(".instructions");
const hiden = document.querySelector(".hide");
const myList = document.querySelector("ol");
/*-------------- Constants -------------*/
const startArr = [];
const playerArr = [];
const loseAudio = new Audio("sounds/lose.mp3.mp3");
const Audio1 = new Audio("sounds/sound1.mp3.mp3");
const Audio2 = new Audio("sounds/sound2.mp3.mp3");
const Audio3 = new Audio("sounds/sound3.mp3.mp3");
const Audio4 = new Audio("sounds/sound4.mp3.mp3");
const soundsArr = [Audio1, Audio2, Audio3, Audio4];
/*---------- Variables (state) ---------*/
let goNext = true;
let winner = false;
let icounter = 0;
let level = 0;
let topScore = 0;
let clcikable = true;
if (localStorage.getItem("top") !== null) {
  topScoreTxt.innerHTML = `Top Score : ${localStorage.getItem("top")}`;
}
/*-------------- Functions -------------*/
const insertNum = () => {
  let num = Math.floor(Math.random() * 4 + 1);
  startArr.push(num);
  return num;
};
const topWin = () => {};
const gameOver = () => {
  scoreStatment.innerHTML = "You lost , start game";
  startArr.length = 0;
  playerArr.length = 0;
  level = 0;
  icounter = 0;
};
const trigger = (selected) => {
  if (winner == true) {
    let temporaryNum = eval(selected);
    soundsArr[temporaryNum - 1].play();
  }
  document.getElementById(`${selected}`).classList.add("pressed");
  clcikable = false;

  setTimeout(() => {
    document.getElementById(`${selected}`).classList.remove("pressed");
  }, 500);

  setTimeout(() => {
    clcikable = true;
  }, 1100);
};
const lost = () => {
  document.querySelector("body").classList.add("lost");

  setTimeout(() => {
    document.querySelector("body").classList.remove("lost");
  }, 500);
};
const next = () => {
  scoreStatment.innerHTML = "";
  score.innerHTML = `Your Score : ${level}`;
  if (level > localStorage.getItem("top")) {
    topScore = level;
    localStorage.setItem("top", topScore);
    topScoreTxt.innerHTML = `Top Score : ${localStorage.getItem("top")}`;
  }
  insertNum();
  trigger(startArr[startArr.length - 1]);
};

const checkMatch = (btn) => {
  switch (true) {
    case playerArr[icounter] == startArr[icounter]:
      icounter++;
      if (startArr.length == playerArr.length && winner == true) {
        goNext = false;
        level++;
        icounter = 0;
        playerArr.length = 0;
        setTimeout(() => {
          if (winner == true) {
            goNext = true;
            next();
          }
        }, 1000);
      }
      break;
    case !(playerArr[icounter] == startArr[icounter]):
      loseAudio.play();
      winner = false;
      lost();
      gameOver();
      break;
    default:
      break;
  }
};
/*----------- Event Listeners ----------*/
startBtn.addEventListener("click", () => {
  if (winner == false) {
    winner = true;
    gameOver();
    next();
  }
});
coloredBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (clcikable == true && startArr.length !== 0 && goNext == true) {
      playerArr.push(btn.id);
      checkMatch(btn.id);
      trigger(btn.id);
    }
  });
});
mode.addEventListener("click", () => {
  background.classList.toggle("light");
  score.classList.toggle("lightModeTxt");
  scoreStatment.classList.toggle("lightModeTxt");
  startBtn.classList.toggle("lightModeTxt");
  topScoreTxt.classList.toggle("lightModeTxt");
  mode.classList.toggle("lightBtn");
  instruction.classList.toggle("lightModeTxt");
  hiden.classList.toggle("lightBtn");
  hiden.classList.toggle("lightModeTxt");
});
hiden.addEventListener("click", () => {
  myList.classList.toggle("hider");
});
