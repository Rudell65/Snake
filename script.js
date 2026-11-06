"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#game");
  const scoreElement = document.querySelector("#score");
  const messageElement = document.querySelector("#message");
  const startButton = document.querySelector("#start-button");
  const restartButton = document.querySelector("#restart-button");

  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error('Le jeu a besoin d\'un canvas avec id="game".');
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    console.error("Impossible de créer le contexte de dessin du jeu.");
    return;
  }

  const cellSize = 20;
  const columns = Math.floor(canvas.width / cellSize);
  const rows = Math.floor(canvas.height / cellSize);
  const tickDelay = 120;

  let snake;
  let food;
  let direction;
  let nextDirection;
  let score;
  let timer;
  let isRunning = false;
  let isGameOver = false;

  function showMessage(message) {
    if (messageElement) {
      messageElement.textContent = message;
    }
  }

  function updateScore() {
    if (scoreElement) {
      scoreElement.textContent = String(score);
    }
  }

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

    if (emptyCells.length === 0) {
      return null;
    }

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  function drawCell(x, y, color, inset = 2) {
    context.fillStyle = color;
    context.fillRect(
      x * cellSize + inset,
      y * cellSize + inset,
      cellSize - inset * 2,
      cellSize - inset * 2,
    );
  }

  function draw() {
    context.fillStyle = "#f4f1e8";
    context.fillRect(0, 0, canvas.width, canvas.height);

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

    snake.forEach((segment, index) => {
      drawCell(segment.x, segment.y, index === 0 ? "#237a57" : "#45a777");
    });

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

  function endGame(message) {
    window.clearInterval(timer);
    isRunning = false;
    isGameOver = true;
    showMessage(message);
  }

  function moveSnake() {
    direction = nextDirection;
    const head = snake[0];
    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };
    const eatsFood = food && nextHead.x === food.x && nextHead.y === food.y;
    const bodyToCheck = eatsFood ? snake : snake.slice(0, -1);
    const hitsWall =
      nextHead.x < 0 ||
      nextHead.x >= columns ||
      nextHead.y < 0 ||
      nextHead.y >= rows;
    const hitsSnake = bodyToCheck.some(
      (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
    );

    if (hitsWall || hitsSnake) {
      endGame("Partie terminée !");
      return;
    }

    snake.unshift(nextHead);

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
      snake.pop();
    }

    draw();
  }

  function startGame() {
    if (isRunning) {
      return;
    }

    if (isGameOver) {
      resetGame();
    }

    isRunning = true;
    showMessage("");
    timer = window.setInterval(moveSnake, tickDelay);
  }

  function changeDirection(newDirection) {
    const isOpposite =
      newDirection.x === -direction.x && newDirection.y === -direction.y;
    if (!isOpposite) {
      nextDirection = newDirection;
    }
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
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

    if (directions[key]) {
      event.preventDefault();
      changeDirection(directions[key]);
    } else if (key === " " && !isRunning) {
      startGame();
    }
  });

  if (columns < 4 || rows < 1) {
    showMessage("La zone de jeu est trop petite.");
    return;
  }

  resetGame();

  if (startButton) {
    startButton.addEventListener("click", startGame);
    showMessage("Appuie sur commencer pour jouer.");
  } else {
    startGame();
  }

  if (restartButton) {
    restartButton.addEventListener("click", () => {
      if (isRunning) {
        window.clearInterval(timer);
        isRunning = false;
      }
      resetGame();
      startGame();
    });
  }
});