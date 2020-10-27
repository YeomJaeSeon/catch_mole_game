import Field from "./field.js";
import { Reason } from "./popup.js";
import * as sound from "./sound.js";

export const Result = Object.freeze({
  win: "win",
  lose: "lose",
  stop: "stop",
});

export class GameBuilder {
  withDuration(gameDuration) {
    this.gameDuration = gameDuration;
    return this;
  }
  build() {
    return new Game(this.gameDuration);
  }
}

class Game {
  constructor(gameDuration) {
    this.gameDuration = gameDuration;

    this.started = false;
    this.timer = undefined;
    this.minusScore = 0;
    this.score = 0;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.winScore = document.querySelector(".score__win");
    this.loseScore = document.querySelector(".score__lose");
    this.gameBtn = document.querySelector(".game__button");

    this.gameBtn.addEventListener("click", () => {
      if (!this.started) this.startGame();
      else this.stop(Reason.stop);
    });

    this.field = new Field(() => this.started);
    this.field.setFieldListener(() => {
      ++this.score;
      this.upDatePlusScoreBoard(this.score);
    });
    this.field.setMinusListener(() => {
      ++this.minusScore;
      this.upDateMinusScoreBoard(this.minusScore);
    });
  }

  setStopListener(onStop) {
    this.onStop = onStop;
  }

  startGame() {
    sound.stopFinish();
    sound.playBg();
    this.started = true;
    this.init();
    this.changeStopButton();

    this.field.showAndHideRepeat();
    this.showGameTimer();
    this.showGameScore();
    this.startGameTimer();
    this.showGameButton();
  }
  stop(reason) {
    sound.stopBg();
    this.started = false;
    this.field.stopShowAndHideRepeat();
    this.stopGameTimer();
    this.hideGameButton();
    switch (reason) {
      case Reason.finish:
        sound.playFinish();
        if (this.minusScore === 0) {
          this.onStop && this.onStop(Result.win);
        } else {
          this.onStop && this.onStop(Result.lose);
        }

        break;
      case Reason.stop:
        sound.playAlert();
        this.onStop && this.onStop(Result.stop);
        break;
      default:
        throw new Error("에러발생!");
    }
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }
  showGameButton() {
    this.gameBtn.style.visibility = "visible";
  }
  changeStopButton() {
    const playBtn = document.querySelector(".fas");
    playBtn.classList.add("fa-stop");
    playBtn.classList.remove("fa-play");
  }
  init() {
    this.score = 0;
    this.minusScore = 0;
    this.upDateMinusScoreBoard(this.minusScore);
    this.upDatePlusScoreBoard(this.score);
    this.field.fieldItems.forEach((item) => {
      item.setAttribute("src", "./img/hole.png");
    });
  }

  showGameTimer() {
    this.gameTimer.style.visibility = "visible";
  }
  showGameScore() {
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remaintime = this.gameDuration;
    this.upDateTimer(remaintime);
    this.timer = setInterval(() => {
      this.upDateTimer(--remaintime);
      if (remaintime <= 0) {
        this.stop(Reason.finish);
      }
    }, 1000);
  }
  stopGameTimer() {
    clearInterval(this.timer);
  }
  upDateTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  upDateMinusScoreBoard(score) {
    this.loseScore.innerText = score;
  }
  upDatePlusScoreBoard(score) {
    this.winScore.innerText = score;
  }
}
