/** Place your functionality here **/
// console.log("Hello");

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const toggleRulesBtn = document.getElementById('toggle-rules-btn');
    const rulesContent = document.getElementById('rules-content');

    const startScreen = document.getElementById('start-screen');
    const gamePlayScreen = document.getElementById('game-play-screen');
    const endGameScreen = document.getElementById('end-game-screen');

    const startGameBtn = document.getElementById('start-game-btn');
    const replayGameBtn = document.getElementById('replay-game-btn');

    const currentRoundDisplay = document.getElementById('current-round');
    const playerScoreDisplay = document.getElementById('player-score');

    const choiceBtns = document.querySelectorAll('.choice-btn'); // For Rock, Paper, Scissors

    const playerChoiceDisplay = document.getElementById('player-choice-display');
    const computerChoiceDisplay = document.getElementById('computer-choice-display');
    const roundOutcomeMessage = document.getElementById('round-outcome-message');

    const finalOutcomeMessage = document.getElementById('final-outcome-message');
    const finalScoreDisplay = document.getElementById('final-score-display');

    // --- Game State Variables ---
    let playerScore = 0;
    let currentRound = 0;
    const totalRounds = 3;
    const choices = ['rock', 'paper', 'scissors'];

    // --- Event Listeners ---

    // Toggle Rules Visibility
    toggleRulesBtn.addEventListener('click', () => {
        rulesContent.classList.toggle('hidden');
        toggleRulesBtn.textContent = rulesContent.classList.contains('hidden') ? 'Show Rules' : 'Hide Rules';
    });

    // Start Game
    startGameBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        endGameScreen.classList.add('hidden'); // Ensure end screen is hidden if replaying
        gamePlayScreen.classList.remove('hidden');
        resetGame();
        startNewRound();
    });

    // Player Makes a Choice
    choiceBtns.forEach(button => {
        button.addEventListener('click', () => {
            const playerSelection = button.dataset.choice;
            playRound(playerSelection);
        });
    });

    // Replay Game
    replayGameBtn.addEventListener('click', () => {
        endGameScreen.classList.add('hidden');
        gamePlayScreen.classList.remove('hidden'); // Or show startScreen if you prefer
        resetGame();
        startNewRound();
    });

    // --- Game Logic Functions ---

    function resetGame() {
        playerScore = 0;
        currentRound = 0;
        updateScoreBoard();
        roundOutcomeMessage.textContent = 'Waiting for your move...';
        playerChoiceDisplay.textContent = '-';
        computerChoiceDisplay.textContent = '-';
    }

    function startNewRound() {
        currentRound++;
        if (currentRound <= totalRounds) {
            updateScoreBoard();
            roundOutcomeMessage.textContent = `Round ${currentRound}! Choose your weapon!`;
            playerChoiceDisplay.textContent = '-';
            computerChoiceDisplay.textContent = '-';
            // Enable choice buttons if they were disabled
            choiceBtns.forEach(btn => btn.disabled = false);
        } else {
            endGame();
        }
    }

    function updateScoreBoard() {
        currentRoundDisplay.textContent = currentRound;
        playerScoreDisplay.textContent = playerScore;
    }

    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function playRound(playerSelection) {
        if (currentRound > totalRounds) return; // Game already ended

        const computerSelection = getComputerChoice();

        playerChoiceDisplay.textContent = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
        computerChoiceDisplay.textContent = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);

        let roundWinner = ''; // 'player', 'computer', or 'tie'

        if (playerSelection === computerSelection) {
            roundWinner = 'tie';
            roundOutcomeMessage.textContent = "It's a Tie!";
        } else if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            roundWinner = 'player';
            playerScore++;
            roundOutcomeMessage.textContent = `You win this round! ${playerSelection} beats ${computerSelection}.`;
        } else {
            roundWinner = 'computer';
            playerScore--;
            roundOutcomeMessage.textContent = `Computer wins this round! ${computerSelection} beats ${playerSelection}.`;
        }

        updateScoreBoard();

        // Disable choice buttons briefly or until next round to prevent spamming (optional)
        choiceBtns.forEach(btn => btn.disabled = true);

        // Move to the next round or end game after a short delay to show results
        setTimeout(() => {
            if (currentRound >= totalRounds) {
                endGame();
            } else {
                startNewRound();
            }
        }, 1500); // 1.5 seconds delay
    }

    function endGame() {
        gamePlayScreen.classList.add('hidden');
        endGameScreen.classList.remove('hidden');

        finalScoreDisplay.textContent = playerScore;
        if (playerScore > 0) {
            finalOutcomeMessage.textContent = '🎉 Congratulations, You Won! 🎉';
        } else if (playerScore < 0) {
            finalOutcomeMessage.textContent = '😢 Oh no, You Lost! 😢';
        } else {
            finalOutcomeMessage.textContent = '😐 It\'s a Tie Game! 😐';
        }
    }

    // Initialize (optional, if you want a specific screen to show on load other than default HTML)
    // By default, the start screen will show due to HTML structure.
});