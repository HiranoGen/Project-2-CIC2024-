/** Place your functionality here **/
// console.log("Hello");
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    
    const startButton = document.getElementById('start-button');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const replayButton = document.getElementById('replay-button');
    
    const roundCounterDisplay = document.getElementById('round-counter');
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const roundResultDisplay = document.getElementById('round-result');
    
    const playerScoreDisplay = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    
    const finalResultMessage = document.getElementById('final-result-message');
    const finalScoreDisplay = document.getElementById('final-score-display');
    
    const toggleRulesBtn = document.getElementById('toggle-rules-btn');
    const rulesContainer = document.getElementById('rules-container');
    
    // --- Game State Variables ---
    const choices = {
        Rock: "✊",
        Paper: "✋",
        Scissors: "✌️"
    };
    const choiceNames = Object.keys(choices);
    const maxRounds = 3;
    let currentRound = 0;
    let playerScore = 0;
    let computerScore = 0;

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);
    replayButton.addEventListener('click', startGame);

    choiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.disabled) {
                playRound(e.target.dataset.choice);
            }
        });
    });

    toggleRulesBtn.addEventListener('click', () => {
        rulesContainer.classList.toggle('show');
        toggleRulesBtn.textContent = rulesContainer.classList.contains('show') ? 'Hide Rules' : 'Show Rules';
    });

    // --- Game Logic Functions ---
    function startGame() {
        currentRound = 1;
        playerScore = 0;
        computerScore = 0;
        
        updateScoreboard();
        resetRoundUI(`Round ${currentRound}`);
        
        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    }

    function playRound(playerChoice) {
        choiceButtons.forEach(b => b.disabled = true);

        const computerChoice = choiceNames[Math.floor(Math.random() * choiceNames.length)];
        
        playerChoiceDisplay.textContent = choices[playerChoice];
        playerChoiceDisplay.classList.add('revealed');
        
        setTimeout(() => {
            computerChoiceDisplay.textContent = choices[computerChoice];
            computerChoiceDisplay.classList.add('revealed');
            
            let resultText = '';
            if (playerChoice === computerChoice) {
                resultText = "It's a Draw!";
            } else if (
                (playerChoice === 'Rock' && computerChoice === 'Scissors') || 
                (playerChoice === 'Paper' && computerChoice === 'Rock') || 
                (playerChoice === 'Scissors' && computerChoice === 'Paper')
            ) {
                resultText = 'You Win This Round!';
                playerScore++;
            } else {
                resultText = 'Computer Wins!';
                computerScore++;
            }
            roundResultDisplay.textContent = resultText;
            updateScoreboard();

            if (currentRound >= maxRounds) {
                setTimeout(endGame, 2000);
            } else {
                currentRound++;
                setTimeout(() => resetRoundUI(`Round ${currentRound}`), 2000);
            }
        }, 1000);
    }

    function resetRoundUI(roundText) {
        roundCounterDisplay.textContent = roundText;
        playerChoiceDisplay.textContent = '?';
        computerChoiceDisplay.textContent = '?';
        roundResultDisplay.textContent = '';
        playerChoiceDisplay.classList.remove('revealed');
        computerChoiceDisplay.classList.remove('revealed');
        choiceButtons.forEach(b => b.disabled = false);
    }
    
    function updateScoreboard() {
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
    }

    function endGame() {
        if (playerScore > computerScore) {
            finalResultMessage.textContent = 'YOU WON THE GAME!';
            finalResultMessage.style.color = 'var(--primary-cyan)';
        } else if (computerScore > playerScore) {
            finalResultMessage.textContent = 'GAME OVER';
            finalResultMessage.style.color = 'var(--primary-magenta)';
        } else {
            finalResultMessage.textContent = 'IT\'S A TIE!';
            finalResultMessage.style.color = 'var(--text-light)';
        }
        finalScoreDisplay.textContent = `Final Score: You ${playerScore} - ${computerScore} CPU`;
        
        gameScreen.classList.add('hidden');
        endScreen.classList.remove('hidden');
    }
});
