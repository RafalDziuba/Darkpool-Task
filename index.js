const history = [];
let boardSize;
const moveRange = 50;
const createButton = document.querySelector('button');
const logsButton = document.querySelector('#toggle-logs');
const logsContainer = document.querySelector('.logs-content');
const board = document.querySelector('.board');
const rover = document.createElement('div');
rover.classList.add('rover');
rover.style.position = 'relative';
rover.style.left = 0;
rover.style.top = 0;

const createGrid = (rows, cols) => {
  if (board.getBoundingClientRect().width > 0) {
    alert('One board is enough!');
    return;
  }
  if (rows % 2 === 0 || cols % 2 === 0) {
    alert('Only odd numbers are allowed!');
    return;
  }
  if (rows < 0 || cols < 0) {
    alert(`You can't use negative number!`);
    return;
  }
  if (rows > 13 || cols > 13) {
    alert('Board is too large! Max amount of cols%rows is 13');
    return;
  }

  board.style.gridTemplateColumns = `repeat(${cols}, ${moveRange}px)`;
  board.style.gridTemplateRows = `repeat(${rows}, ${moveRange}px`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.backgroundColor = (i + j) % 2 === 0 ? '#96a5ab' : '#586c79';
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

  boardSize = board.getBoundingClientRect();
  logsButton.classList.toggle('show');
};

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
  logsContainer.innerHTML = '';
  for (let i = 0; i < history.length; i++) {
    const text = document.createElement('p');
    text.textContent = `The rover moved ${history[i].direction} by ${history[i].range} pixels to field nr ${history[i].fieldNr}`;
    logsContainer.appendChild(text);
  }
};

const updateHistory = (direction) => {
  history.push({
    range: moveRange,
    fieldNr: toField(),
    direction: direction,
  });

  createLogs();
};

createButton.addEventListener('click', () => {
  let cols = document.querySelector('#cols');
  let rows = document.querySelector('#rows');

  createGrid(rows.value, cols.value);
  rows.value = 0;
  cols.value = 0;
});

logsButton.addEventListener('click', () => {
  if (history.length === 0) {
    alert('Make some moves first!');
    return;
  }
  logsContainer.classList.toggle('show');
  if (logsContainer.classList.contains('show')) {
    logsButton.textContent = 'Hide history';
  } else {
    logsButton.textContent = 'Show history';
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      rover.style.left = parseInt(rover.style.left) - moveRange + 'px';
      if (Math.round(boardSize.left) > Math.round(rover.getBoundingClientRect().left)) {
        alert(`You can't leave board!`);
        rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
        return;
      }
      updateHistory('to the left');
      break;
    case 'ArrowRight':
      rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
      if (Math.round(boardSize.right) < Math.round(rover.getBoundingClientRect().right)) {
        alert(`You can't leave board!`);
        rover.style.left = parseInt(rover.style.left) - moveRange + 'px';
        return;
      }
      updateHistory('to the right');
      break;
    case 'ArrowUp':
      rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
      if (Math.round(boardSize.top) > Math.round(rover.getBoundingClientRect().top)) {
        alert(`You can't leave board!`);
        rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
        return;
      }
      updateHistory('up');
      break;
    case 'ArrowDown':
      rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
      if (Math.round(boardSize.bottom) < Math.round(rover.getBoundingClientRect().bottom)) {
        alert(`You can't leave board!`);
        rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
        return;
      }
      updateHistory('down');
      break;
  }
});
