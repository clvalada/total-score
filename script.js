const levelText = document.getElementById('level-text');
const startButton = document.getElementById('start-button');
const scoreboard = document.getElementById('scoreboard');
const homeTeamScoreDisplay = document.getElementById('home-team-score');
const awayTeamScoreDisplay = document.getElementById('away-team-score');
const userInputBox = document.getElementById('user-input');
const answerBox = document.getElementById('answer-box');
const feedbackText = document.getElementById('feedback-text');
const nextQuestionButton = document.getElementById('next-question');
const checkAnswerButton = document.getElementById('check-answer'); 
const trophyImage = document.getElementById('trophy-image');
const endGameButtons = document.getElementById('end-game-buttons');
const playAgainButton = document.getElementById('play-again');

let homeTeamScore = 0;
let awayTeamScore = 0;
let questionCounter = 0;
let correctAnswers = 0;

function removeGameEventListeners() {
    nextQuestionButton.removeEventListener('click', showQuestion);
    checkAnswerButton.removeEventListener('click', checkAnswer);
    answerBox.removeEventListener('keypress', handleKeyPress);
}

function startGame() {
    startButton.style.display = 'none';
    scoreboard.style.display = 'block';
    answerBox.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    homeTeamScore = Math.floor(Math.random() * 6);
    awayTeamScore = Math.floor(Math.random() * 6);
    homeTeamScoreDisplay.textContent = homeTeamScore;
    awayTeamScoreDisplay.textContent = awayTeamScore;
}

function checkAnswer(event) {
    event.preventDefault();
    const userAnswer = parseInt(userInputBox.value);
    const totalGoals = homeTeamScore + awayTeamScore;

    console.log("User Answer:", userAnswer);
    console.log("Total Goals:", totalGoals);

    if (userAnswer === totalGoals) {
        feedbackText.textContent = "Correct! The total number of goals scored is " + totalGoals;
        correctAnswers++;
    } else {
        feedbackText.textContent = "Nope. The total number of goals scored is " + totalGoals;
    }

    questionCounter++;

    if (questionCounter === 10) {
        endGame();
    } else {
        nextQuestionButton.style.display = 'block'; 
        feedbackText.style.display = 'block';

        userInputBox.value = '';
    }
}

function endGame() {
    //removeGameEventListeners();
    answerBox.style.display = 'none';
    nextQuestionButton.style.display = 'none';
    scoreboard.style.display = 'none';
    trophyImage.style.display = 'block';

    if (correctAnswers > 6) {
        feedbackText.textContent = "Nice work, Rookie. You can move to the next level";
        endGameButtons.style.display = 'block';
    } else {
        feedbackText.textContent = "Good try, Rookie. You need to get at least 7 questions correctly";
        playAgainButton.style.display = 'block';
    }

    checkAnswerButton.addEventListener('click', checkAnswer); 

    questionCounter = 0;
    correctAnswers = 0;
}

startButton.addEventListener('click', startGame);
nextQuestionButton.addEventListener('click', function() {
    showQuestion();
    answerBox.value = '';
    nextQuestionButton.style.display = 'none'; 
    feedbackText.style.display = 'none'; 
});
checkAnswerButton.addEventListener('click', checkAnswer); 
answerBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer(e);
    }
});
