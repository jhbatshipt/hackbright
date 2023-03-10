const ALPHABET = Array.from("abcdefghijklmnopqrstuvwxyz");
const WORDS = [
  "strawberry",
  "orange",
  "apple",
  "banana",
  "pineapple",
  "kiwi",
  "peach",
  "pecan",
  "eggplant",
  "durian",
  "peanut",
  "chocolate",
];

let numWrong = 0;

// Generate a blank space for each letter in the word.
// Correctly guessed letters will "fill in the blank" and appear in the spaces.
// Each space is a div inside the section with id="word-container".
function generateDivsForChars(word) {
  const wordContainer = document.querySelector('#word-container');
  for (const l of word) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('letter-box');
    newDiv.id = l;
    wordContainer.append(newDiv);
  }
}

// Generate a button for each letter in the alphabet.
// The user will click on these buttons to guess a letter in the word.
// The buttons should be appended to the section with id="letter-buttons"
function generateLetterButtons() {
  const letterButtons = document.querySelector('#letter-buttons');
  for (const l of ALPHABET) {
    const newButton = document.createElement('button');
    newButton.innerText = l;
    newButton.id = l;
    letterButtons.append(newButton);
  }
}

// Handle an incorrect guess.
// This is called when a button is clicked but the letter IS NOT in the word.
function handleIncorrectGuess() {
  numWrong++;
  const sharkImg = document.querySelector('#shark-img img');
  sharkImg.src = `/static/images/guess${numWrong}.png`;
}

// Handle a correct guess.
// This is called when a button is clicked and the letter IS in the word.
function handleCorrectGuess(guess) {
  const guessedLetter = document.querySelectorAll(`#word-container #${guess}`);
  for (const l of guessedLetter) {
    l.innerText = guess;
  }
}

// Return true if all the letters in the word have been guessed, false otherwise.
// This is a helper function called to check if the game is over because
// the user has successfully guessed the word.
function isAllLettersGuessed() {
  const wordContainer = document.querySelector('#word-container').children;
  for (const l of wordContainer) {
    if (l.innerText === '') { return false; }
  }
  return true;
}

// Handle ending the game.
// This is called when the user has won or lost the game.
function endGame() {
  const playAgain = document.querySelector('#play-again');
  playAgain.style.display = 'block';
  const letterButtons = document.querySelector('#letter-buttons').children;
  for (const button of letterButtons) {
    button.disabled = true;
  }

  const wordContainer = document.querySelector('#word-container').children;
  for (const l of wordContainer) {
    if (l.innerText === "") {
      l.classList.add('remLet');
      l.innerText = l.id;
    }
  }
}

// An immediate invoked function expression (IIFE) used to kick off the game.
(function startGame() {
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  generateDivsForChars(randomWord);
  generateLetterButtons();

  document.querySelectorAll("#letter-buttons button").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("clicked")
      const clickedButton = e.target;
      const letter = clickedButton.innerText;

      if (!randomWord.includes(letter)) {
        handleIncorrectGuess();
      } else {
        handleCorrectGuess(letter);
      }

      // Disable the button so user doesn't accidentally guess the same letter twice
      clickedButton.disabled = true;

      // Check if game is over
      const allLettersGuessed = isAllLettersGuessed();
      if (numWrong === 5 || allLettersGuessed) {
        document.querySelector("#play-again").innerText =
          numWrong === 5
            ? "The shark got you! Click here to play again."
            : "You won! Click here to play again.";
        endGame();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    const letterButtons = document.querySelector("#letter-buttons");
    const button = letterButtons.children.namedItem(e.key);
    if (button && !button.disabled) {
      button.dispatchEvent(new Event('click'));
    }
  });
})();
