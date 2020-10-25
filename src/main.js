"use strict";
const GAME_DURATION = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const winScore = document.querySelector(".score__win");
const loseScore = document.querySelector(".score__lose");

const fieldItems = document.querySelectorAll(".field__item");
const field = document.querySelector(".game__field");

const popup = document.querySelector(".popup");
const popupBtn = document.querySelector(".popup__button");
const popupMessage = document.querySelector(".popup__message");

let started = false;
let timeoutTimer = undefined;
let repeatTimer = undefined;
let timer = undefined;
let selectedPosition = undefined;
let minusScore = 0;
let score = 0;

field.addEventListener("click", (event) => {
  if (!started) return;
  const target = event.target;
  if (target.matches('.field__item[src="./img/mole.png"]')) {
    target.setAttribute("src", "./img/hole.png");
    ++score;
    upDatePlusScoreBoard(score);
  }
});

gameBtn.addEventListener("click", () => {
  if (!started) startGame();
  else stopGame();
});
popupBtn.addEventListener("click", () => {
  startGame();
  hidePopup();
});

function startGame() {
  started = true;
  init();
  changeStopButton();
  showAndHideRepeat();
  showGameTimer();
  showGameScore();
  startGameTimer();
  showGameButton();
}
function stopGame() {
  started = false;
  //stopShowAndHide();
  stopShowAndHideRepeat();
  stopGameTimer();
  showPopupWithMessage("REPLAY???");
  hideGameButton();
}
function finishGame() {
  started = false;
  //stopShowAndHide();
  stopShowAndHideRepeat();
  stopGameTimer();
  showPopupWithMessage("타임 아웃!!");
  hideGameButton();
}
function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}
function showGameButton() {
  gameBtn.style.visibility = "visible";
}
function changeStopButton() {
  const playBtn = document.querySelector(".fas");
  playBtn.classList.add("fa-stop");
  playBtn.classList.remove("fa-play");
}
function init() {
  score = 0;
  minusScore = 0;
  upDateMinusScoreBoard(minusScore);
  upDatePlusScoreBoard(score);
  fieldItems.forEach((item) => {
    item.setAttribute("src", "./img/hole.png");
  });
}
function showPopupWithMessage(text) {
  popup.style.visibility = "visible";
  popupMessage.innerText = text;
}
function hidePopup() {
  popup.style.visibility = "hidden";
}
function showGameTimer() {
  gameTimer.style.visibility = "visible";
}
function showGameScore() {
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remaintime = GAME_DURATION;
  upDateTimer(remaintime);
  timer = setInterval(() => {
    upDateTimer(--remaintime);
    if (remaintime <= 0) {
      finishGame();
    }
  }, 1000);
}
function stopGameTimer() {
  clearInterval(timer);
}
function upDateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showAndHideRepeat() {
  repeatTimer = setInterval(() => {
    selectRandomHole();
  }, 1000);
}
function stopShowAndHideRepeat() {
  clearInterval(repeatTimer);
}

function selectRandomHole() {
  const hole = randomInteger(1, 10);
  if (selectedPosition === hole) return;

  selectedPosition = hole;
  fieldItems.forEach((item) => {
    if (hole == item.dataset.id) {
      showAndHide(item);
    }
  });
}
function showAndHide(item) {
  showMole(item);
  timeoutTimer = setTimeout(() => {
    if (!started) return;
    hideMole(item);
  }, 2000);
}
// function stopShowAndHide() {
//   clearTimeout(timeoutTimer);
// }
function showMole(item) {
  item.setAttribute("src", "./img/mole.png");
}
function hideMole(item) {
  // 이미 hole.png이면 early exit한다.
  if (item.matches('.field__item[src="./img/hole.png"]')) {
    console.log("안돼!!");
    return;
  }
  ++minusScore;
  upDateMinusScoreBoard(minusScore);
  item.setAttribute("src", "./img/hole.png");
}
function upDateMinusScoreBoard(score) {
  loseScore.innerText = score;
}
function upDatePlusScoreBoard(score) {
  winScore.innerText = score;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
