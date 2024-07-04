const redBtn = document.querySelector(".red");
const greenBtn = document.querySelector(".green");
const yelloBtn = document.querySelector(".yellow");
const blueBtn = document.querySelector(".blue");
const coloredBtn = document.querySelectorAll(".gameBtn");
const startBtn = document.querySelector("#startBtn");
const startArr = [];
const playerArr = [];
const background = document.querySelector("body");
const score = document.querySelector("h1");
let icounter = 0;
let level = 0;

const insertNum = () => {
  let num = Math.floor(Math.random() * 4 + 1);
  startArr.push(num);
  return num;
};

const gameOver = () => {
  startArr.length = 0;
  playerArr.length = 0;
  level = 0;
  icounter = 0;
};

const trigger = (selected) => {
  setTimeout(() => {
    document.getElementById(`${selected}`).classList.add("pressed");
  }, 0);

  setTimeout(() => {
    document.getElementById(`${selected}`).classList.remove("pressed");
  }, 500);
};

const next = () => {
  score.innerHTML = level;
  const randNum = insertNum();
  trigger(startArr[startArr.length - 1]);
};

startBtn.addEventListener("click", next);

const checkMatch = (btn) => {
  switch (true) {
    case playerArr[icounter] == startArr[icounter]:
      console.log("correct");
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
      console.log("lose");
      //gameOver();
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
