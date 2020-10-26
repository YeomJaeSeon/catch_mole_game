"use strict";
import * as sound from "./sound.js";
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
let repeatTimer = undefined;
let timer = undefined;
let selectedPosition = undefined;
// 두더지가 나올 랜덤으로 선택된 구멍
let minusScore = 0;
let score = 0;

field.addEventListener("click", (event) => {
  if (!started) return;
  const target = event.target;
  if (target.matches('.field__item[src="./img/mole.png"]')) {
    sound.playCatch();
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
  sound.stopFinish();
  sound.playBg();
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
  sound.stopBg();
  sound.playAlert();
  started = false;
  stopShowAndHideRepeat();
  stopGameTimer();
  showPopupWithMessage("REPLAY???");
  hideGameButton();
}
function finishGame() {
  sound.playFinish();
  sound.stopBg();
  started = false;
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
  }, randomTime(0.5, 1.5));
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
  setTimeout(() => {
    if (!started) return;
    // 게임시작중아니면 멈춘다
    hideMole(item);
  }, randomTime(0.5, 3));
}
function showMole(item) {
  item.setAttribute("src", "./img/mole.png");
}
function hideMole(item) {
  // 이미 hole.png이면 early exit한다. - 뿅망치로 이미 두더지 쳐서
  // hole로 바뀐 hole을 말하는것
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

//두더지 나오는 구멍위치 찾는 랜덤함수
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 두더지 나오는 시간, 반복하는 시간 랜덤함수
//min : inclided , max : not included
function randomTime(min, max) {
  const time = (Math.random() * (max - min) + min) * 1000;
  console.log(time);
  return time;
}
