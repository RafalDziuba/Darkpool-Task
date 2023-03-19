const createButton = document.querySelector('button');
const rover = document.createElement('div');
const board = document.querySelector('.board');
const history = [];
rover.classList.add('rover');
rover.style.position = 'relative';
rover.style.left = 0;
rover.style.top = 0;
const moveRange = 50;
let boardSize;

const createGrid = (rows, cols) => {
  if (board.getBoundingClientRect().width > 0) {
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

  const squares = document.querySelectorAll('.square');
  for (let i = 0; i < squares.length; i++) {
    squares[i].id = i + 1;
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

const toField = () => {
  const roverPosX = rover.getBoundingClientRect().x;
  const roverPosY = rover.getBoundingClientRect().y;
  const fields = document.querySelectorAll('.square');
  for (let i = 0; i < fields.length; i++) {
    if (roverPosX === fields[i].getBoundingClientRect().x && roverPosY === fields[i].getBoundingClientRect().y) {
      return fields[i].id;
    }
  }
};

const createLogs = () => {
  const logsContainer = document.querySelector('.logs');
  logsContainer.innerHTML = '';
  for (let i = 0; i < history.length; i++) {
    const text = document.createElement('p');
    text.textContent = `Łazik wykonał ruch ${history[i].direction} o ${history[i].range} na pole ${history[i].fieldNr}`;
    logsContainer.appendChild(text);
  }
};

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      rover.style.left = parseInt(rover.style.left) - moveRange + 'px';
      if (boardSize.left > rover.getBoundingClientRect().left) {
        alert('nope!');
        rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'w lewo',
        fieldNr: toField(),
      });
      break;
    case 'ArrowRight':
      rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
      if (boardSize.right < rover.getBoundingClientRect().right) {
        alert('nope!');
        rover.style.left = parseInt(rover.style.left) - moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'w prawo',
        fieldNr: toField(),
      });
      break;
    case 'ArrowUp':
      rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
      if (boardSize.top > rover.getBoundingClientRect().top) {
        alert('nope!');
        rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'w górę',
        fieldNr: toField(),
      });
      break;
    case 'ArrowDown':
      rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
      if (boardSize.bottom < rover.getBoundingClientRect().bottom) {
        alert('nope!');
        rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'w dół',
        fieldNr: toField(),
      });
      break;
  }
  createLogs();
});
