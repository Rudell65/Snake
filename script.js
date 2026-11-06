import { createGame } from "./game.js";
import { attachInput } from "./input.js";

function initializeGame() {
  const canvas = document.querySelector("#game");
  const scoreElement = document.querySelector("#score");
  const messageElement = document.querySelector("#message");

  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error('Le jeu a besoin d\'un canvas avec id="game".');
    return;
  }

  const game = createGame({ canvas, scoreElement, messageElement });
  if (!game) {
    return;
  }

  attachInput(game);

  const startButton = document.querySelector("#start-button");
  const restartButton = document.querySelector("#restart-button");

  if (startButton) {
    startButton.addEventListener("click", game.start);
    game.showMessage("Appuie sur commencer pour jouer.");
  } else {
    game.start();
  }

  if (restartButton) {
    restartButton.addEventListener("click", game.restart);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame, { once: true });
} else {
  initializeGame();
}