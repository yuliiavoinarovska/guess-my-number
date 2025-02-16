'use strict';
let secretNumber;
let score = 20; // state variable
let highscore = 0; // state variable
let gameActive = true; // variable for controlling the game

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

secretNumber = generateSecretNumber();

const dispalyMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const setScore = function (value) {
  document.querySelector('.score').textContent = value;
};

const setNumber = function (value) {
  document.querySelector('.number').textContent = value;
};

const getGuessValue = function (value) {
  return Number(document.querySelector('.guess').value);
};

const setGuessValue = function (value) {
  document.querySelector('.guess').value = value;
};

const setHighScore = function (value) {
  document.querySelector('.highscore').textContent = value;
};

const setBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

const setNumberWidth = function (width) {
  document.querySelector('.number').style.width = width;
};

// Function to disable input
const disableInput = function () {
  document.querySelector('.guess').setAttribute('readonly', true);
  document.querySelector('.guess').setAttribute('placeholder', 'Try again!');
};

// Function to enable input
const enableInput = function () {
  document.querySelector('.guess').removeAttribute('readonly');
  document.querySelector('.guess').setAttribute('placeholder', '');
};

// Main game logic: Handles user guesses, checks for correct/incorrect answers, updates score and game state
document.querySelector('.check').addEventListener('click', function () {
  if (!gameActive) return; // If the game is over, disable clicking

  const guess = getGuessValue();

  // When there is no input
  if (!guess) {
    dispalyMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    dispalyMessage('🎉 Correct number!');
    setNumber(secretNumber);
    setBackgroundColor('#60b347');
    setNumberWidth('30rem');
    gameActive = false; // Disabling game functionality

    if (score > highscore) {
      highscore = score;
      setHighScore(highscore);
    }

    disableInput();

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      dispalyMessage(guess > secretNumber ? '📈 Too hight' : '📉 Too low');
      score--;
      setScore(score);
    } else {
      dispalyMessage('😾 You lost the game');
      setScore(0);
      disableInput();
      gameActive = false; // Disabling game functionality
    }
  }
});

// Clears the input field when it receives focus (when the user clicks on the field to enter a new number)
document.querySelector('.guess').addEventListener('focus', function () {
  setGuessValue('');
});

// Resets the game when the "Again" button is clicked: resets score, generates a new secret number, and updates the UI for a fresh start
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = generateSecretNumber();
  dispalyMessage('Start guessing...');
  setScore(score);
  setNumber('?');
  setGuessValue('');
  setBackgroundColor('#222');
  setNumberWidth('15rem');
  enableInput();
  gameActive = true; // Restoring game functionality
});
