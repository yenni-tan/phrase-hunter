/**
 * Game - represents the game instance. Handles interactions and game state.
 */
class Game {
  _missed = 0;
  _phrases = ['hello world', 'mabel paw', 'meatball soup', 'flower power', 'you did it'];
  _activePhrase = null;

  // clear the game state
  startGame() {
    document.getElementById('overlay').style.display = 'none';

    // remove old phrase boxes
    const ul = document.getElementById('phrase').getElementsByTagName('ul')[0];
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
    }

    // reset keyboard
    const keys = document.getElementsByClassName('key');
    for (let key of keys) {
      key.classList.remove('chosen');
      key.classList.remove('wrong');
      key.removeAttribute("disabled");
    }

    // Reset lives
    const lives = document.getElementsByClassName('tries');
    for (let life of lives) {
      life.getElementsByTagName('img')[0].setAttribute("src", "images/liveHeart.png");
    }
    this._missed = 0;

    // select and display new phrase
    this._activePhrase = new Phrase(this.getRandomPhrase());
    this._activePhrase.addPhraseToDisplay();
  }

  // returns a random phrase
  getRandomPhrase() {
    return this._phrases[Math.floor((Math.random() * 5))];
  }

  // handles interactions of user keyboard selections
  handleInteraction(event) {
    /**
     * Handle guess:
     * - apply key styling
     * - disable key
     * 
     * Handle correct guess:
     * - check for a win & end game if won
     * 
     * Handle incorrect guess:
     * - remove one life
     */
    let target = event.target;
    const keys = document.getElementsByClassName('key');
    for (let key of keys) {
      if (key.textContent === event.key) {
        target = key;
      }
    }
    target.setAttribute("disabled", "disabled");
    const letter = target.textContent;
    if (!this._activePhrase._phrase.includes(letter)) {
      target.classList.add('wrong');
      this.removeLife();
    } else {
      target.classList.add('chosen');
      this._activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) {
        this.gameOver();
      }
    }
  }

  // remove one life
  removeLife() {
    this._missed++;
    if (this._missed === 5) {
      this.gameOver();
    } else {
      const tries = document.getElementsByClassName('tries');
      tries[5-this._missed].getElementsByTagName('img')[0].setAttribute("src", "images/lostHeart.png");
    }
  }

  // check to see if any guess boxes remain hidden - if not, the user has won.
  checkForWin() {
    return document.getElementsByClassName('hide').length === 0;
  }

  // set game state when user has won or lost the game.
  gameOver() {
    const overlay = document.getElementById('overlay')
    overlay.style.display = '';
    overlay.classList = '';
    if (this.checkForWin()) {
      overlay.classList.add('win');
      overlay.getElementsByTagName('h1')[0].textContent = 'You Win!';
    } else {
      overlay.classList.add('lose');
      overlay.getElementsByTagName('h1')[0].textContent = 'Better luck next time!';
    }
  }
}