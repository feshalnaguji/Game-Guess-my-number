'use strict';

// select all the elements
const secretBox = document.querySelector('.number');
const guess = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const message = document.querySelector('.message');
const currentScoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const btnAgain = document.querySelector('.again');

// generate a random number
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// initialize the values
let guessValue;
let currentScore = 20;
let highScore = 0;

// function to display the message
const displayMessage = function (msg) {
  message.textContent = msg;
};

// function when guess is different
const differentGuess = function (guess, secret) {
  guess > secret
    ? displayMessage('📈 Too high!')
    : displayMessage('📉 Too low!');
  if (currentScore > 1) {
    currentScore--;
    currentScoreEl.textContent = currentScore;
  } else {
    displayMessage('💥 You lost the game!');
    currentScoreEl.textContent = 0;
  }
};

// function to change the style
const changeStyle = function (bgColor, width) {
  document.body.style.backgroundColor = bgColor;
  secretBox.style.width = width;
};

// function for game logic/checking guess
function checkGuess() {
  guessValue = Number(guess.value);
  // check if guess value is correct
  if (typeof guessValue !== 'number' || guessValue < 1 || guessValue > 20) {
    displayMessage('Guess value must be between 1 and 20');
  } else if (guessValue != secretNumber) {
    // if guess value is higher than secret number
    differentGuess(guessValue, secretNumber);
  } else {
    displayMessage('🎉 Correct Number!');
    secretBox.textContent = secretNumber;
    highScore = currentScore > highScore ? currentScore : highScore;
    highScoreEl.textContent = highScore;
    changeStyle('#60b347', '30rem');
  }
}

// function to restart the game
const restart = function () {
  // generate a new secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  secretBox.textContent = '?';
  currentScore = 20;
  currentScoreEl.textContent = currentScore;
  displayMessage('Start guessing...');
  guess.value = '';
  changeStyle('#222', '15rem');
};

// Event handlers

// display the guess value when check button is clicked
btnCheck.addEventListener('click', checkGuess);
// start a new game
btnAgain.addEventListener('click', restart);
