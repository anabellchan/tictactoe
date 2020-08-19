/*----------- App state ----------*/

const messages = document.querySelector('h2');
const squares = Array.from(document.querySelectorAll('#board div'));
const winningVariations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let board;
let turn = 'X';
let win;

initialize();
render();

/* ----------- event listeners ----------*/

document.getElementById('board').addEventListener('click', handleTurn);
document.querySelector('#reset-button').addEventListener('click', resetBoard);


/* ------------ functions ----------*/

function initialize() {
  board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
};

function resetBoard() {
  win = null;
  turn = 'X';
  initialize();
  render();
  console.log(board);
  messages.style.background = 'none';
}

function render() {
  board.forEach((text, index) => {
    squares[index].textContent = text;
  });

  if (win) {
    messages.textContent = win === 'T'
      ? 'It\'s a tie!'
      : `${win} wins the game!`
    messages.style.backgroundColor = 'yellow';
  } else {
    messages.textContent = `Take your turn ${turn}!`;
  }
};

function handleTurn(event) {
  if (win) return;
  let index = squares.findIndex(square => {
    return square === event.target;
  });
  board[index] = turn;
  win = getWinner();
  turn = turn === 'X' ? 'O' : 'X';
  render();
}

function getWinner() {
  let winner = null;
  winningVariations.map((variation) => {
    if (board[variation[0]] && board[variation[0]] === board[variation[1]] && board[variation[0]] === board[variation[2]]) {
      console.log(`there is a winner ${board[variation[0]]}`);
      winner = board[variation[0]];
    }
  });
  return winner ? winner : board.includes('') ? null : 'T';
}

