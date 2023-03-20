const createButton = document.querySelector('button');
const logsButton = document.querySelector('#toggle-logs');
const logsContainer = document.querySelector('.logs-content');
const rover = document.createElement('div');
rover.classList.add('rover');
const board = document.querySelector('.board');
const history = [];
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
    alert('Only odd numbers are allowed!');
    return;
  }
  if (rows < 0 || cols < 0) {
    alert(`You can't use negative number!`);
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

  boardSize = document.querySelector('.board').getBoundingClientRect();
  horizontalMove = document.querySelector('.square').getBoundingClientRect().width;
  verticalMove = document.querySelector('.square').getBoundingClientRect().height;
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
    console.log(logsButton);
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
      history.push({
        range: moveRange,
        direction: 'to the left',
        fieldNr: toField(),
      });
      createLogs();
      break;
    case 'ArrowRight':
      rover.style.left = parseInt(rover.style.left) + moveRange + 'px';
      if (Math.round(boardSize.right) < Math.round(rover.getBoundingClientRect().right)) {
        alert(`You can't leave board!`);
        rover.style.left = parseInt(rover.style.left) - moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'to the right',
        fieldNr: toField(),
      });
      createLogs();
      break;
    case 'ArrowUp':
      rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
      if (Math.round(boardSize.top) > Math.round(rover.getBoundingClientRect().top)) {
        alert(`You can't leave board!`);
        rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'up',
        fieldNr: toField(),
      });
      createLogs();
      break;
    case 'ArrowDown':
      rover.style.top = parseInt(rover.style.top) + moveRange + 'px';
      if (Math.round(boardSize.bottom) < Math.round(rover.getBoundingClientRect().bottom)) {
        alert(`You can't leave board!`);
        rover.style.top = parseInt(rover.style.top) - moveRange + 'px';
        return;
      }
      history.push({
        range: moveRange,
        direction: 'down',
        fieldNr: toField(),
      });
      createLogs();
      break;
  }
});
