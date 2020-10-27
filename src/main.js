"use strict";
import * as sound from "./sound.js";
import { Popup, Reason } from "./popup.js";
import Field from "./field.js";

const GAME_DURATION = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const winScore = document.querySelector(".score__win");
const loseScore = document.querySelector(".score__lose");

let started = false;
let timer = undefined;
let minusScore = 0;
let score = 0;

const finishGameBanner = new Popup();
finishGameBanner.setClickListener(startGame);

const field = new Field(() => started);
field.setFieldListener(() => {
  ++score;
  upDatePlusScoreBoard(score);
});
field.setMinusListener(() => {
  ++minusScore;
  upDateMinusScoreBoard(minusScore);
});

gameBtn.addEventListener("click", () => {
  if (!started) startGame();
  else stop(Reason.stop);
});

function startGame() {
  sound.stopFinish();
  sound.playBg();
  started = true;
  init();
  changeStopButton();
  field.showAndHideRepeat();
  showGameTimer();
  showGameScore();
  startGameTimer();
  showGameButton();
}
function stop(reason) {
  sound.stopBg();
  started = false;
  field.stopShowAndHideRepeat();
  stopGameTimer();
  hideGameButton();
  switch (reason) {
    case Reason.finish:
      sound.playFinish();
      if (minusScore === 0) {
        finishGameBanner.showPopupWithMessage("모두 잡았습니다!!");
      } else {
        finishGameBanner.showPopupWithMessage(
          `${minusScore}마리 놓쳤습니다.ㅠ.ㅠ`
        );
      }

      break;
    case Reason.stop:
      sound.playAlert();
      finishGameBanner.showPopupWithMessage("REPLAY??");
      break;
    default:
      throw new Error("에러발생!");
  }
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
  field.fieldItems.forEach((item) => {
    item.setAttribute("src", "./img/hole.png");
  });
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
      stop(Reason.finish);
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

function upDateMinusScoreBoard(score) {
  loseScore.innerText = score;
}
function upDatePlusScoreBoard(score) {
  winScore.innerText = score;
}
