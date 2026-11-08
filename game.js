// Ce module crée et gère le jeu Snake.
// Il reçoit le canvas et les éléments DOM pour afficher le score et les messages.
// Il retourne des méthodes pour démarrer, redémarrer et changer la direction du serpent.

export function createGame({ canvas, scoreElement, messageElement }) {
  // On récupère le contexte 2D du canvas pour pouvoir dessiner.
  const context = canvas.getContext("2d");

  // Si le canvas n'est pas disponible, on affiche une erreur et on stoppe.
  if (!context) {
    console.error("Impossible de créer le contexte de dessin du jeu.");
    return null;
  }

  // Taille d'une cellule du serpent dans le plateau.
  const cellSize = 20;

  // Nombre de colonnes et de lignes selon la taille du canvas.
  const columns = Math.floor(canvas.width / cellSize);
  const rows = Math.floor(canvas.height / cellSize);

  // Vitesse du jeu : le serpent avance toutes les 120 ms.
  const tickDelay = 120;

  // Variables de jeu :
  // - snake : tableau des positions du serpent
  // - food : position de la nourriture
  // - direction : direction actuelle du serpent
  // - nextDirection : direction qui sera prise au prochain déplacement
  // - score : points du joueur
  // - timer : identifiant du timer de répétition
  // - isRunning : indique si le jeu est en cours
  // - isGameOver : indique si la partie est terminée
  let snake;
  let food;
  let direction;
  let nextDirection;
  let score;
  let timer;
  let isRunning = false;
  let isGameOver = false;

  // Affiche un message dans l'élément HTML dédié.
  function showMessage(message) {
    if (messageElement) {
      messageElement.textContent = message;
    }
  }

  // Met à jour l'affichage du score dans le DOM.
  function updateScore() {
    if (scoreElement) {
      scoreElement.textContent = String(score);
    }
  }

  // Place la nourriture dans une case vide du plateau.
  // On crée une liste de toutes les cases libres, puis on en choisit une au hasard.
  function placeFood() {
    const emptyCells = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const isSnakeCell = snake.some((segment) => segment.x === x && segment.y === y);
        if (!isSnakeCell) {
          emptyCells.push({ x, y });
        }
      }
    }

    // Si aucune case libre n'existe, la grille est pleine.
    if (emptyCells.length === 0) {
      return null;
    }

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  // Dessine une cellule du jeu avec une couleur et une marge intérieure.
  function drawCell(x, y, color, inset = 2) {
    context.fillStyle = color;
    context.fillRect(
      x * cellSize + inset,
      y * cellSize + inset,
      cellSize - inset * 2,
      cellSize - inset * 2,
    );
  }

  // Dessine tout le plateau :
  // - fond beige
  // - grille
  // - serpent
  // - nourriture
  function draw() {
    // Fond du jeu.
    context.fillStyle = "#f4f1e8";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dessin de la grille.
    context.strokeStyle = "#e4dfd2";
    context.lineWidth = 1;

    for (let x = 0; x <= columns; x += 1) {
      context.beginPath();
      context.moveTo(x * cellSize, 0);
      context.lineTo(x * cellSize, rows * cellSize);
      context.stroke();
    }

    for (let y = 0; y <= rows; y += 1) {
      context.beginPath();
      context.moveTo(0, y * cellSize);
      context.lineTo(columns * cellSize, y * cellSize);
      context.stroke();
    }

    // Dessin du serpent.
    // La tête est plus sombre que le corps.
    snake.forEach((segment, index) => {
      drawCell(segment.x, segment.y, index === 0 ? "#237a57" : "#45a777");
    });

    // Dessin de la nourriture sous forme d'un cercle rouge.
    if (food) {
      context.beginPath();
      context.fillStyle = "#df5848";
      context.arc(
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        cellSize * 0.36,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
  }

  // Réinitialise la partie pour un nouveau démarrage.
  // Le serpent repart au centre, la direction est droite et le score est remis à zéro.
  function resetGame() {
    const startX = Math.floor(columns / 2);
    const startY = Math.floor(rows / 2);

    snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    food = placeFood();

    isGameOver = false;
    updateScore();
    draw();
  }

  // Termine la partie.
  // On arrête le timer et on affiche un message.
  function endGame(message) {
    window.clearInterval(timer);
    isRunning = false;
    isGameOver = true;
    showMessage(message);
  }

  // Fait avancer le serpent d'une case.
  // Vérifie :
  // - collision avec les murs
  // - collision avec son propre corps
  // - consommation de nourriture
  function moveSnake() {
    // On valide la direction choisie au tour précédent.
    direction = nextDirection;

    // Position actuelle de la tête du serpent.
    const head = snake[0];

    // Position que la tête va occuper au prochain déplacement.
    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    // Si la prochaine case contient la nourriture, on mange.
    const eatsFood = food && nextHead.x === food.x && nextHead.y === food.y;

    // Si le serpent mange, on ne supprime pas le dernier segment.
    // Sinon, on le supprime pour simuler le déplacement.
    const bodyToCheck = eatsFood ? snake : snake.slice(0, -1);

    // Détection des collisions avec les bordures du plateau.
    const hitsWall =
      nextHead.x < 0 ||
      nextHead.x >= columns ||
      nextHead.y < 0 ||
      nextHead.y >= rows;

    // Détection des collisions avec le corps du serpent.
    const hitsSnake = bodyToCheck.some(
      (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
    );

    // Si collision, la partie est finie.
    if (hitsWall || hitsSnake) {
      endGame("Partie terminée !");
      return;
    }

    // On avance le serpent en ajoutant la nouvelle tête.
    snake.unshift(nextHead);

    // Si la nourriture est mangée :
    // - augmentation du score
    // - nouvelle position de la nourriture
    // - si la grille est pleine, victoire
    if (eatsFood) {
      score += 1;
      updateScore();
      food = placeFood();

      if (!food) {
        draw();
        endGame("Bravo, tu as rempli toute la grille !");
        return;
      }
    } else {
      // Sinon, on enlève la dernière partie du corps pour faire avancer.
      snake.pop();
    }

    // On redessine le plateau après chaque mouvement.
    draw();
  }

  // Démarre la partie.
  // Le serpent avance automatiquement à intervalle régulier.
  function start() {
    // Si le jeu est déjà en cours, on ne relance pas le timer.
    if (isRunning) {
      return;
    }

    // Si la partie est terminée, on réinitialise le plateau.
    if (isGameOver) {
      resetGame();
    }

    isRunning = true;
    showMessage("");
    timer = window.setInterval(moveSnake, tickDelay);
  }

  // Redémarre complètement la partie :
  // - stoppe l'ancien timer
  // - réinitialise le jeu
  // - relance immédiatement
  function restart() {
    window.clearInterval(timer);
    isRunning = false;
    resetGame();
    start();
  }

  // Change la direction du serpent.
  // On empêche de faire un demi-tour immédiat pour éviter de se mord la queue.
  function changeDirection(newDirection) {
    const isOpposite =
      newDirection.x === -direction.x && newDirection.y === -direction.y;

    if (!isOpposite) {
      nextDirection = newDirection;
    }
  }

  // Vérifie si la zone de jeu est suffisamment grande pour jouer.
  // Le jeu doit avoir au moins 4 colonnes et 1 ligne.
  if (columns < 4 || rows < 1) {
    showMessage("La zone de jeu est trop petite.");
    return null;
  }

  // On initialise le jeu au chargement.
  resetGame();

  // On retourne les méthodes disponibles pour l'extérieur.
  return { start, restart, changeDirection, showMessage };
}
