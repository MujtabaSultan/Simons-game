const redBtn = document.querySelector("#red");
const greenBtn = document.querySelector("#green");
const yelloBtn = document.querySelector("#yellow");
const blueBtn = document.querySelector("#blue");
const coloredBtn = document.querySelectorAll(".gameBtn");
const startBtn = document.querySelector("#startBtn");
const startArr = [];
const playerArr = [];
let icounter = 0;

const insertNum = () => {
  let num = Math.floor(Math.random() * 4);
  startArr.push(num);
};

const trigger = () => {
  setTimeout(() => {
    coloredBtn[startArr[icounter]].classList.add("pressed");
  }, 0);

  setTimeout(() => {
    coloredBtn[startArr[icounter]].classList.remove("pressed");
  }, 500);
};

startBtn.addEventListener("click", () => {
  insertNum();
  trigger();
});

const checkMatch = (btn) => {};

// coloredBtn.forEach((btn) => {
//   btn.addEventListener("click",(btn.id)=>{

//   });

// });
