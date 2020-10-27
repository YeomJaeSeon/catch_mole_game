"use strict";
import { GameBuilder, Result } from "./game.js";
import { Popup } from "./popup.js";

const finishGameBanner = new Popup();

const game = new GameBuilder().withDuration(20).build();

finishGameBanner.setClickListener(() => {
  game.startGame();
});

game.setStopListener((reason) => {
  switch (reason) {
    case Result.win:
      finishGameBanner.showPopupWithMessage("모두 잡았습니다!!");
      break;
    case Result.lose:
      finishGameBanner.showPopupWithMessage(
        `${game.minusScore}마리 놓쳤습니다.ㅠ.ㅠ`
      );
      break;
    case Result.stop:
      finishGameBanner.showPopupWithMessage("REPLAY??");
      break;
    default:
      throw new Error("에러발생!");
  }
});
