export const Reason = Object.freeze({
  stop: "stop",
  finish: "finish",
});

export class Popup {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.popupBtn = document.querySelector(".popup__button");
    this.popupMessage = document.querySelector(".popup__message");
    this.popupBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hidePopup();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }
  showPopupWithMessage(text) {
    this.popup.style.visibility = "visible";
    this.popupMessage.innerText = text;
  }
  hidePopup() {
    this.popup.style.visibility = "hidden";
  }
}
