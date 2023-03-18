const createButton = document.querySelector('button');
let horizontalMove;
let verticalMove;
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

  const board = document.querySelector('.board');

  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.backgroundColor = (i + j) % 2 === 0 ? '#eeeed2' : '#769656';
      board.appendChild(square);

      if (i === Math.floor(rows / 2) && j === Math.floor(cols / 2)) {
        const rover = document.createElement('div');
        rover.classList.add('rover');
        square.appendChild(rover);
      }
    }
  }
};

createButton.addEventListener('click', () => {
  let cols = document.querySelector('#cols');
  let rows = document.querySelector('#rows');

  createGrid(rows.value, cols.value);
  rows.value = 0;
  cols.value = 0;
});
