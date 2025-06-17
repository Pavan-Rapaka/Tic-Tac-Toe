const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const winnerMessage = document.getElementById('winner-message');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winnerMessage.textContent = '';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw, winner = '') {
  if (draw) {
    winnerMessage.textContent = `It's a Draw!`;
  } else {
    winnerMessage.textContent = `${winner.toUpperCase()} Wins!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

restartBtn.addEventListener('click', startGame);

startGame(); // Start initially
