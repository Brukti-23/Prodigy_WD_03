const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const cell = event.target;
    if (cell.classList.contains('x') || cell.classList.contains('o') || !gameActive) {
        return;
    }
    cell.classList.add(isXTurn ? 'x' : 'o');
    if (checkWin()) {
        gameActive = false;
        setTimeout(() => alert(`${isXTurn ? 'X' : 'O'} wins!`), 100);
    } else if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        gameActive = false;
        setTimeout(() => alert('Draw!'), 100);
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].classList.contains(isXTurn ? 'x' : 'o') &&
               cells[a].classList.contains(cells[b].classList[1]) &&
               cells[a].classList.contains(cells[c].classList[1]);
    });
}

function restartGame() {
    cells.forEach(cell => cell.classList.remove('x', 'o'));
    isXTurn = true;
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
