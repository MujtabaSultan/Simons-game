const coloredBtn = document.querySelectorAll(".gameBtn");
const startBtn = document.querySelector(".startBtn");
const mode = document.querySelector(".mode");
const topScoreTxt = document.querySelector(".topScore");
const startArr = [];
const playerArr = [];
const background = document.querySelector("body");
const score = document.querySelector("h1");
const scoreStatment = document.querySelector("h2");
const loseAudio = new Audio("sounds/lose.mp3.mp3");
const Audio1 = new Audio("sounds/sound1.mp3.mp3");
const Audio2 = new Audio("sounds/sound2.mp3.mp3");
const Audio3 = new Audio("sounds/sound3.mp3.mp3");
const Audio4 = new Audio("sounds/sound4.mp3.mp3");
const soundsArr = [Audio1, Audio2, Audio3, Audio4];
topScoreTxt.innerHTML = `Top Score : ${localStorage.getItem("top")}`;
let winner = true;
let icounter = 0;
let level = 0;
let topScore = 0;

const insertNum = () => {
  let num = Math.floor(Math.random() * 4 + 1);
  startArr.push(num);
  return num;
};
const gameOver = () => {
  scoreStatment.innerHTML = "you lost";
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
  setTimeout(() => {
    document.getElementById(`${selected}`).classList.add("pressed");
  }, 0);

  setTimeout(() => {
    document.getElementById(`${selected}`).classList.remove("pressed");
  }, 500);
};
const lost = () => {
  setTimeout(() => {
    document.querySelector("body").classList.add("lost");
  }, 0);

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
startBtn.addEventListener("click", () => {
  winner = true;
  gameOver();
  next();
});

const checkMatch = (btn) => {
  switch (true) {
    case playerArr[icounter] == startArr[icounter]:
      icounter++;

      if (startArr.length == icounter) {
        level++;
        icounter = 0;
        playerArr.length = 0;
        setTimeout(() => {
          next();
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
coloredBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    playerArr.push(btn.id);
    trigger(btn.id);
    checkMatch(btn.id);
  });
});
mode.addEventListener("click", () => {
  background.classList.toggle("light");
  score.classList.toggle("lightModeTxt");
  scoreStatment.classList.toggle("lightModeTxt");
  startBtn.classList.toggle("lightModeTxt");
  topScoreTxt.classList.toggle("lightModeTxt");
  mode.classList.toggle("lightBtn");
});
