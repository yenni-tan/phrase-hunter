const game = new Game();

const keys = document.getElementsByClassName('key');
for (let key of keys) {
  key.addEventListener('click', (event) => game.handleInteraction(event));
}

const resetButton = document.getElementById('btn__reset');
resetButton.addEventListener('click', () => game.startGame());

document.addEventListener('keypress', event => {
  for (let key of keys) {
    if (String.fromCharCode(event.keyCode) === key.textContent) {
      game.handleInteraction(event)
    }
  }
});