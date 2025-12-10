document.getElementById("startGameBtn").addEventListener("click", startGame);

function startGame() {
    const gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = ""; // Clear previous content

    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameOver = false;

    // Status display
    const statusElem = document.createElement('p');
    statusElem.id = 'status';
    statusElem.textContent = `Turn: ${currentPlayer}`;
    gameArea.appendChild(statusElem);

    // Board display
    const boardElem = document.createElement('div');
    boardElem.id = 'board';
    boardElem.style.cssText = "display:grid;grid-template-columns:repeat(3,60px);gap:5px;justify-content:center;margin:5px auto;";
    gameArea.appendChild(boardElem);

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Quit Game";
    resetBtn.style.marginTop = "10px";
    resetBtn.onclick = () => {
        statusElem.textContent = "Game Over!";
        boardElem.innerHTML = "";
        resetBtn.disabled = true;
    };
    gameArea.appendChild(resetBtn);

    function renderBoard() {
        boardElem.innerHTML = '';
        board.forEach((cell, i) => {
            const cellElem = document.createElement('div');
            cellElem.className = 'cell';
            cellElem.textContent = cell;
            cellElem.style.cssText = "width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:2em;background:#eee;cursor:pointer;border:1px solid #ccc;color:black;";
            cellElem.onclick = () => {
                if (currentPlayer === 'X' && !gameOver && !cell) handleMove(i);
            };
            boardElem.appendChild(cellElem);
        });
    }

    function handleMove(i) {
        if (board[i] || gameOver) return;
        board[i] = currentPlayer;
        if (checkWin(currentPlayer)) {
            statusElem.textContent = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (board.every(cell => cell)) {
            statusElem.textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElem.textContent = `Turn: ${currentPlayer}`;
            renderBoard();
            if (currentPlayer === 'O' && !gameOver) {
                setTimeout(computerMove, 500);
            }
        }
        renderBoard();
    }

    function computerMove() {
        const emptyCells = board.map((cell, idx) => cell === '' ? idx : null).filter(idx => idx !== null);
        if (emptyCells.length === 0) return;
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleMove(move);
    }

    function checkWin(player) {
        const wins = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        return wins.some(line => line.every(i => board[i] === player));
    }

    renderBoard();
}