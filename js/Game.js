class Game {
  _missed = 0;
  _phrases = ['hello world', 'mabel paw', 'meatball soup', 'flower power', 'you did it'];
  _activePhrase = null;

  startGame() {
    document.getElementById('overlay').style.display = 'none';
    const ul = document.getElementById('phrase').getElementsByTagName('ul')[0];
    console.log(document.getElementById('phrase').getElementsByTagName('ul')[0]);
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild);
      console.log(document.getElementById('phrase').getElementsByTagName('ul')[0]);
    }
    console.log(document.getElementById('phrase').getElementsByTagName('ul')[0]);

    const keys = document.getElementsByClassName('key');
    for (let key of keys) {
      key.classList.remove('chosen');
      key.classList.remove('wrong');
      key.removeAttribute("disabled");
    }

    const lives = document.getElementsByClassName('tries');
    for (let life of lives) {
      life.getElementsByTagName('img')[0].setAttribute("src", "images/liveHeart.png");
    }

    this._activePhrase = new Phrase(this.getRandomPhrase());
    this._activePhrase.addPhraseToDisplay();

    this._missed = 0;
  }

  getRandomPhrase() {
    return this._phrases[Math.floor((Math.random() * 5))];
  }

  handleInteraction(event) {
    console.log('event', event);
    // check to see if button clicked by user matches letter in phrase
    event.target.setAttribute("disabled", "disabled");
    const letter = event.target.textContent;
    if (!this._activePhrase._phrase.includes(letter)) {
      event.target.classList.add('wrong');
      this.removeLife();
    } else {
      event.target.classList.add('chosen');
      this._activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) {
        this.gameOver();
      }
    }
  }

  removeLife() {
    this._missed++;
    if (this._missed === 5) {
      this.gameOver();
    } else {
      const tries = document.getElementsByClassName('tries');
      tries[5-this._missed].getElementsByTagName('img')[0].setAttribute("src", "images/lostHeart.png");
    }
  }

  checkForWin() {
    return document.getElementsByClassName('hide').length === 0;
  }

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