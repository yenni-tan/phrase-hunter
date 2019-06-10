/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();

const keys = document.getElementsByClassName('key');
for (let key of keys) {
    key.addEventListener('click', (event) => game.handleInteraction(event));
}

const resetButton = document.getElementById('btn__reset');
resetButton.addEventListener('click', () => game.startGame());

