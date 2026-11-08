// Associe chaque touche à un déplacement sur la grille (x : gauche/droite, y : haut/bas).
// ZQSD complète les flèches pour les claviers AZERTY.
const directions = {
  arrowup: { x: 0, y: -1 },
  z: { x: 0, y: -1 },
  arrowdown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  arrowleft: { x: -1, y: 0 },
  q: { x: -1, y: 0 },
  arrowright: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

export function attachInput(game) {
  // Traduit les touches du clavier en commandes comprises par le jeu.
  function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if (directions[key]) {
      // Empêche les flèches de faire défiler la page pendant le jeu.
      event.preventDefault();
      game.changeDirection(directions[key]);
    } else if (event.code === "Space") {
      event.preventDefault();
      // La barre espace démarre la partie.
      game.start();
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  // Retourne une fonction de nettoyage pour pouvoir retirer cet écouteur si nécessaire.
  return () => document.removeEventListener("keydown", handleKeyDown);
}
