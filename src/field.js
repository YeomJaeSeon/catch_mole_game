import * as sound from "./sound.js";

export default class Field {
  constructor(isGameRunning) {
    this.isGameRunning = isGameRunning;

    this.repeatTimer = undefined;
    this.selectedPosition = undefined;
    // 두더지가 나올 랜덤으로 선택된 구멍

    this.fieldItems = document.querySelectorAll(".field__item");
    this.field = document.querySelector(".game__field");

    this.onFieldGame = this.onFieldGame.bind(this);
    this.field.addEventListener("click", this.onFieldGame);
  }
  onFieldGame(event) {
    if (!this.isGameRunning()) return;
    const target = event.target;
    if (target.matches('.field__item[src="./img/mole.png"]')) {
      sound.playCatch();
      target.setAttribute("src", "./img/hole.png");
      this.onClick && this.onClick();
    }
  }
  setFieldListener(onClick) {
    this.onClick = onClick;
  }
  setMinusListener(onMinus) {
    this.onMinus = onMinus;
  }
  _showMole(item) {
    item.setAttribute("src", "./img/mole.png");
  }
  _hideMole(item) {
    // 이미 hole.png이면 early exit한다. - 뿅망치로 이미 두더지 쳐서
    // hole로 바뀐 hole을 말하는것
    if (item.matches('.field__item[src="./img/hole.png"]')) {
      return;
    }
    this.onMinus && this.onMinus();
    item.setAttribute("src", "./img/hole.png");
  }
  showAndHideRepeat() {
    this.repeatTimer = setInterval(() => {
      this._selectRandomHole();
    }, randomTime(0.5, 1.5));
  }
  stopShowAndHideRepeat() {
    clearInterval(this.repeatTimer);
  }

  _selectRandomHole() {
    const hole = randomInteger(1, 10);
    if (this.selectedPosition === hole) return;

    this.selectedPosition = hole;
    this.fieldItems.forEach((item) => {
      if (hole == item.dataset.id) {
        this._showAndHide(item);
      }
    });
  }
  _showAndHide(item) {
    this._showMole(item);
    setTimeout(() => {
      if (!this.isGameRunning()) return;
      this._hideMole(item);
    }, randomTime(0.5, 3));
  }
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
