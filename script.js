import { createGame } from "./game.js";
import { attachInput } from "./input.js";

// Récupère les éléments HTML et relie l'interface au moteur du jeu.
function initializeGame() {
  const canvas = document.querySelector("#game");
  const scoreElement = document.querySelector("#score");
  const messageElement = document.querySelector("#message");

  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error('Le jeu a besoin d\'un canvas avec id="game".');
    return;
  }

  // Le moteur contient les règles et l'état du jeu ; les entrées clavier lui sont ensuite reliées.
  const game = createGame({ canvas, scoreElement, messageElement });
  if (!game) {
    return;
  }

  attachInput(game);

  // Relie les boutons HTML aux actions de démarrage et de redémarrage.
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

// Attend que le HTML soit chargé avant de chercher ses éléments.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame, { once: true });
} else {
  initializeGame();
}
