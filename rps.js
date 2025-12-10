document.getElementById("startGameBtn").addEventListener("click", startGame);

function startGame() {
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = ""; // Clear previous content

  let userScore = 0;
  let compScore = 0;

  // Display for results and score
  const resultDisplay = document.createElement("p");
  const scoreDisplay = document.createElement("p");
  scoreDisplay.textContent = `Score: You ${userScore} - ${compScore} Computer`;
  gameArea.appendChild(resultDisplay);
  gameArea.appendChild(scoreDisplay);

  const buttonsDiv = document.createElement("div");
  gameArea.appendChild(buttonsDiv);

  const moves = ["Rock", "Paper", "Scissors"];

  function updateScore() {
    scoreDisplay.textContent = `Score: You ${userScore} - ${compScore} Computer`;
  }

  function playRound(userNum) {
    const compNum = Math.floor(Math.random() * 3);

    if (userNum === compNum) {
      resultDisplay.textContent = `Tie! Both chose ${moves[userNum]}`;
    } else if ((userNum - compNum + 3) % 3 === 1) {
      resultDisplay.textContent = `You win! ${moves[userNum]} beats ${moves[compNum]}`;
      userScore++;
    } else {
      resultDisplay.textContent = `You lose! ${moves[compNum]} beats ${moves[userNum]}`;
      compScore++;
    }

    updateScore();
  }

  // Create buttons for Rock, Paper, Scissors
  moves.forEach((move, index) => {
  const btn = document.createElement("button");
  btn.textContent = move;
  btn.addEventListener("click", () => {
    btn.classList.add("button-active");
    setTimeout(() => {
      btn.classList.remove("button-active");
    }, 200);
    playRound(index);
  });
  buttonsDiv.appendChild(btn);
});

  // Quit button
  const quitBtn = document.createElement("button");
  quitBtn.textContent = "Quit Game";
  quitBtn.addEventListener("click", () => {
    resultDisplay.textContent = `Game Over! Final Score: You ${userScore} - ${compScore} Computer`;
    buttonsDiv.innerHTML = ""; // removes all game buttons
  });
  buttonsDiv.appendChild(quitBtn);
}
