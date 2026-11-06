# Snake

Un petit jeu Snake jouable dans un navigateur, réalisé avec HTML, CSS et JavaScript.

## Étapes de création

1. Créer `index.html` pour la page du jeu, `style.css` pour son apparence et `script.js` pour sa logique.
2. Afficher une grille qui servira de terrain de jeu.
3. Dessiner le serpent et faire avancer sa tête automatiquement.
4. Ajouter les commandes au clavier pour changer la direction du serpent.
5. Placer une pomme au hasard sur la grille et augmenter le score quand le serpent la mange.
6. Faire grandir le serpent après chaque pomme.
7. Détecter les collisions avec les murs et le corps du serpent, puis terminer la partie.
8. Afficher le score et proposer de recommencer une partie.
9. Tester le jeu et corriger les problèmes avant de l'améliorer.

## Sauvegarder le projet sur GitHub

### Première publication

1. Créer un dépôt vide sur GitHub. Comme ce projet possède déjà un README, ne pas demander à GitHub d'en créer un autre.
2. Ouvrir un terminal dans le dossier du projet.
3. Si le dossier n'est pas encore un dépôt Git, l'initialiser :

	```bash
	git init
	```

4. Ajouter les fichiers et créer le premier point de sauvegarde :

	```bash
	git add .
	git commit -m "Premiere version du jeu Snake"
	```

5. Relier le dossier au dépôt GitHub. Remplacer l'adresse d'exemple par l'adresse HTTPS affichée sur GitHub :

	```bash
	git branch -M main
	git remote add origin https://github.com/TON-NOM/TON-DEPOT.git
	git push -u origin main
	```

Si `git remote add origin` indique que `origin` existe déjà, ne pas répéter cette commande. Vérifier l'adresse avec `git remote -v`, puis envoyer les changements avec `git push -u origin main`.

### Sauvegardes suivantes

Après avoir apporté des changements, les enregistrer et les envoyer sur GitHub :

```bash
git add .
git commit -m "Ajoute le deplacement du serpent"
git push
```

GitHub peut demander de se connecter. Dans VS Code, suivre la fenêtre de connexion proposée. Pour vérifier les fichiers qui ont changé avant de les sauvegarder, utiliser `git status`.