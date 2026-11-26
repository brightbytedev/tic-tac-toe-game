
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const drawText = document.getElementById("drawScore");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

let scoreX = 0;
let scoreO = 0;
let draws = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        if (gameState[index] !== "" || !gameActive) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {

            statusText.textContent =
                "Player " + currentPlayer + " Wins! 🎉";

            if (currentPlayer === "X") {
                scoreX++;
                scoreXText.textContent = scoreX;
            } else {
                scoreO++;
                scoreOText.textContent = scoreO;
            }

            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            statusText.textContent = "It's a Draw! 🤝";

            draws++;
            drawText.textContent = draws;

            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        statusText.textContent =
            "Player " + currentPlayer + "'s Turn";
    });
});

function checkWinner() {
    return winningPatterns.some(pattern => {
        return pattern.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

restartButton.addEventListener("click", restartGame);

function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    gameState = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's Turn";
}


// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("App is ready!");
            })
            .catch(error => {
                console.log("Service Worker Error:", error);
            });
    });
}
