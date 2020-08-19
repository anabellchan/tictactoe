/*
3 x 3 grid
Make Your Mark
Take Turns
“X” and “O”
Win Logic: align 3 in a row, in a column, or diagonally
Declare a Tie
The Game is Finished
*/

/* ------constants ----------*/
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

/* ------ app state (variables) ----------*/
let board;
let turn = 'X';
let win;

function initialize() {
  board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  win = null;
  turn = 'X';
  console.log('board reset');
};

initialize();

const squares = Array.from(document.querySelectorAll('#board div'));

// make your mark
function render() {
  board.forEach((mark, index) => {
    // console.log('render', mark);
    squares[index].textContent = mark;
  });

  const messages = document.querySelector('h2');

  if (win) {
    messages.textContent = win === 'T'
      ? 'It\'s a tie!'
      : `${win} wins the game!`
  } else {
    messages.textContent = `Take your turn ${turn}!`;
  }
};

render();


/* ------ cached element references ----------*/

/* ------ event listeners ----------*/
document.getElementById('board').addEventListener('click', handleTurn);
document.querySelector('#restart-button').addEventListener('click', initialize);

/* ------ functions ----------*/
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


