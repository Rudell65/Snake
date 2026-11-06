# Snake

Un jeu Snake simple qui se joue dans un navigateur. Le joueur dirige un serpent sur une grille, lui fait manger des pommes pour augmenter son score et essaie d'éviter les murs ainsi que son propre corps.

## Comment jouer

- Utilise les flèches du clavier ou les touches **ZQSD** pour diriger le serpent.
- Appuie sur **Espace** pour démarrer la partie.
- Mange les pommes pour faire grandir le serpent et gagner des points.
- Évite les bords de la grille et le corps du serpent.

## Le projet

Le jeu est écrit en JavaScript sans dépendance externe. Le code est réparti en trois fichiers :

- [`game.js`](./game.js) contient les règles de la partie : déplacement, collisions, score, dessin et redémarrage.
- [`input.js`](./input.js) relie les touches du clavier aux actions du jeu.
- [`script.js`](./script.js) initialise le jeu et connecte son moteur aux éléments de la page.

La grille et le serpent sont dessinés dans un élément HTML `<canvas>`. Le moteur met à jour la partie à intervalles réguliers, puis redessine le canvas. La nourriture est placée au hasard sur une case libre.

## Intégration dans une page web

Le projet doit être chargé depuis une page HTML qui contient un canvas avec l'identifiant `game`. Les éléments `score`, `message`, `start-button` et `restart-button` sont facultatifs : ils permettent respectivement d'afficher le score, un message et les boutons de démarrage et de redémarrage.

```html
<canvas id="game" width="400" height="400"></canvas>
<p>Score : <span id="score">0</span></p>
<p id="message"></p>
<button id="start-button">Commencer</button>
<button id="restart-button">Recommencer</button>
<script type="module" src="script.js"></script>
```

Le canvas doit faire au moins 80 pixels de large pour afficher le serpent de départ. Si la page ne contient pas de bouton de démarrage, la partie commence automatiquement.
