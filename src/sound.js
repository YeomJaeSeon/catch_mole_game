const alertSound = new Audio("sound/alert.wav");
const catchSound = new Audio("sound/carrot_pull.mp3");
const finishSound = new Audio("sound/game_win.mp3");
const bgSound = new Audio("sound/bg.mp3");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

export function playAlert() {
  playSound(alertSound);
}
export function playCatch() {
  playSound(catchSound);
}
export function playFinish() {
  playSound(finishSound);
}
export function playBg() {
  playSound(bgSound);
}
export function stopBg() {
  stopSound(bgSound);
}
export function stopFinish() {
  stopSound(finishSound);
}
