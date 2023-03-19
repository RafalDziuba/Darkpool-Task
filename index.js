const createButton = document.querySelector('button');
const rover = document.createElement('div');
const board = document.querySelector('.board');
rover.classList.add('rover');
rover.style.position = 'relative';
rover.style.left = 0;
rover.style.top = 0;
const moveRange = 50;
let boardSize;

const createGrid = (rows, cols) => {
  const square = document.querySelector('.square');
  if (square) {
    alert('One board is enough!');
    return;
  }
  if (rows % 2 === 0 || cols % 2 === 0) {
    alert('Liczba wierszy i kolumn być nieparzysta!');
    return;
  }
  if (rows < 0 || cols < 0) {
    alert('Liczba nie może być ujemna!');
    return;
  }

  board.style.gridTemplateColumns = `repeat(${cols}, ${moveRange}px)`;
  board.style.gridTemplateRows = `repeat(${rows}, ${moveRange}px`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.backgroundColor = (i + j) % 2 === 0 ? '#eeeed2' : '#769656';
      board.appendChild(square);

      if (i === Math.floor(rows / 2) && j === Math.floor(cols / 2)) {
        square.appendChild(rover);
      }
    }
  }

  boardSize = document.querySelector('.board').getBoundingClientRect();
  horizontalMove = document.querySelector('.square').getBoundingClientRect().width;
  verticalMove = document.querySelector('.square').getBoundingClientRect().height;
};

createButton.addEventListener('click', () => {
  let cols = document.querySelector('#cols');
  let rows = document.querySelector('#rows');

  createGrid(rows.value, cols.value);
  rows.value = 0;
  cols.value = 0;
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      rover.style.left = parseInt(rover.style.left) - moveRange + 'px';
      if (boardSize.left > rover.getBoundingClientRect().left) {
        alert('nope!');
        rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
      }
      break;
    case 'ArrowRight':
      rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
      break;
    case 'ArrowUp':
      rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
      break;
    case 'ArrowDown':
      rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
      break;
  }
});
