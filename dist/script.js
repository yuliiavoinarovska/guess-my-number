'use strict';
let secretNumber;
let score = 20; // state variable
let highscore = 0; // state variable

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

document.querySelector('.check').addEventListener('click', function () {
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

    if (score > highscore) {
      highscore = score;
      setHighScore(highscore);
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      dispalyMessage(guess > secretNumber ? '📈 Too hight' : '📉 Too low');
      score--;
      setScore(score);
    } else {
      dispalyMessage('😾 You lost the game');
      setScore(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = generateSecretNumber();
  dispalyMessage('Start guessing...');
  setScore(score);
  setNumber('?');
  setGuessValue('');
  setBackgroundColor('#222');
  setNumberWidth('15rem');
});
