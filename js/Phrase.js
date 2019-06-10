class Phrase {
  constructor(phrase) {
    this._phrase = phrase.toLowerCase().split('');
  }

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

  checkLetter(letter) {
    return this._phrase.includes(letter);
  }

  showMatchedLetter(guessLetter) {
    console.log('guessletter', guessLetter);
    const answerLetters = document.getElementById('phrase').getElementsByTagName('ul')[0].getElementsByTagName('li');
    for (let answerLetter of answerLetters) {
      console.log('answerLetter', answerLetter);
      if (answerLetter.textContent === guessLetter) {
        console.log('match');
        answerLetter.classList.remove('hide');
        answerLetter.classList.add('show');
      }
    }
  }
}