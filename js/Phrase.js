/**
 * Phrase - represents the phrase to guess and handles displaying and verifying guesses against the chosen phrase.
 */
class Phrase {
  constructor(phrase) {
    this._phrase = phrase.toLowerCase().split('');
  }

  // dynamically generate guess boxes for phrase
  addPhraseToDisplay() {
    this._phrase
      .forEach(char => {
        if (char !== ' ') {
          $('#phrase ul')
            .append($(`<li class="hide letter ${char}">${char}</li>`));
        } else {
          $('#phrase ul')
            .append($(`<li class="space">${char}</li>`));
        }
      });
  }

  // check if guessed letter is contained in phrase
  checkLetter(letter) {
    return this._phrase.includes(letter);
  }

  // show correctly guessed letter
  showMatchedLetter(guessLetter) {
    const answerLetters = document.getElementById('phrase').getElementsByTagName('ul')[0].getElementsByTagName('li');
    for (let answerLetter of answerLetters) {
      if (answerLetter.textContent === guessLetter) {
        answerLetter.classList.remove('hide');
        answerLetter.classList.add('show');
      }
    }
  }
}