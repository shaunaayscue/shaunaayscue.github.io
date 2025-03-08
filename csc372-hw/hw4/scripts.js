const playerImages = document.querySelectorAll("#player-throw img");
const computerImg = document.querySelector("#computer-throw img");
const scoreCount = document.getElementById("score");
const resetBtn = document.getElementById("reset");

for (let index = 0; index < playerImages.length; index++) {
    const element = playerImages[index];
    element.addEventListener("click", onClick);
}

/**
 * Handles click events for player images.
 * @param {Event} event - The click event on the player's image.
 */
function onClick(event) {
    const element = event.currentTarget;
    playerThrow(element.dataset.choice, element);
}

/**
 * Processes the player's throw and the selected image.
 * @param {string} choice - The player's choice (rock, paper, or scissors).
 * @param {HTMLElement} elem - The DOM element representing the choice.
 */
function playerThrow(choice, elem) {

    computerImg.style.border = "none";

    for (let index = 0; index < playerImages.length; index++) {
        playerImages[index].style.border = "none";
    }

    elem.style.border = "3px solid red";

    computerThrow(choice);
}

/**
 * Does the computer's throw and displays the choices.
 * @param {string} playerThrow - The player's choice (rock, paper, or scissors).
 */
function computerThrow(playerThrow) {
    const choices = ["rock", "paper", "scissors"];
    let index = 0;

    let shuffleInterval = setInterval(shuffleComputerImg, 500);

    /** Shuffles the computer's choice. */
    function shuffleComputerImg() {
        computerImg.src = choices[index] + ".PNG";
        index = (index + 1) % choices.length;
    }

    let computerThinking = setTimeout(chosenThrowImage, 3000);

    /** Picks the computer's final throw after shuffling. */
    function chosenThrowImage() {
        clearInterval(shuffleInterval);
        clearTimeout(computerThinking);

        let computerThrow = choices[Math.floor(Math.random() * choices.length)];

        computerImg.src = computerThrow + ".PNG";
        computerImg.style.border = "3px solid blue";

        winnerOutcome(playerThrow, computerThrow);
    }
}

let score = {
    wins: 0,
    losses: 0,
    ties: 0
};

/**
 * Determines the winner of the game based on player and computer choices.
 * @param {string} player - The player's choice (rock, paper, or scissors).
 * @param {string} computer - The computer's choice (rock, paper, or scissors).
 */
function winnerOutcome(player, computer) {
    let result = "";

    if (player === computer) {
        result = "IT'S A TIE!";
        score.ties++;
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        result = "YOU WIN!";
        score.wins++;
    } else {
        result = "COMPUTER WINS!";
        score.losses++;
    }

    document.getElementById("results").textContent = result;
    trackScore();
}

resetBtn.addEventListener("click", resetAll);

/** Resets the game to its initial state, clearing all counters and displays. */
function resetAll() {

    document.getElementById("results").textContent = "";

    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };

    trackScore();

    computerImg.src = "question-mark.PNG";
    computerImg.style.border = "none";

    for (let index = 0; index < playerImages.length; index++) {
        playerImages[index].style.border = "none";
    }
}

/** Updates the displayed score. */
function trackScore() {
    scoreCount.textContent = "Wins: " + score.wins + ", Losses: " + score.losses + ", Ties: " + score.ties;
}



