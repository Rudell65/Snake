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
  function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if (directions[key]) {
      event.preventDefault();
      game.changeDirection(directions[key]);
    } else if (event.code === "Space") {
      event.preventDefault();
      game.start();
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}