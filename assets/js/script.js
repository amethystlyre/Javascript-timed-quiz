//initialize questions and answers as JS object

let QAList = {
    "Inside the HTML document, where do you place your JavaScript code?":
        ["Inside the <link> element", "In the <footer> element", "Inside the <script> element", "Inside the <head> element", 2],
    "What operator is used to assign a value to a declared variable?":
        ["Question mark (?)", "Double-equal (==)", "Equal sign (=)", "Colon (:)", 2],
    "A very useful too used during development and debugging for printing content to the debugger is":
        ["Javascript", "Terminal/bash", "For loops", "Console.log", 3],
    "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']":
        ["1", "2", "3", "4", 0],
    "String values must be enclosed within _____ when being assigned to variables":
        ["Quotes", "Curly brackets", "Commas", "Parentheses", 0],
    "Commonly used data types DO NOT include:":
        ["Strings", "Booleans", "Alerts", "Numbers", 2],
    "The condition in an if/else statement is enclosed within ______.":
        ["Quotes", "Curly brackets", "Parentheses", "Square brackets", 2],
    "Arrays in JavaScript can be used to store ______.":
        ["Numbers and strings", "Other arrays", "Booleans", "All of the above", 3]
}
//initialize global variables, default values and counters for later use.
let correctAnswer;
let userAnswer;
let qcount;
let timeLeft;
let timeInterval;
var listenerAdded = false;
var pastHighScores = [];

//Find HTML elements and assign to variables
var introPage = document.querySelector("#intro"); //intro page
var questionPage = document.querySelector("#quiz"); //question and answer page
var endQuiz = document.querySelector("#end-quiz"); //current game score page
var scorePage = document.querySelector("#score-record");//past high score page

//HTML elements in header
var viewHighscores = document.getElementById("scoreboard");
var timerDisplay = document.getElementById("seconds-left");

//HTML elements on intro page
var startGameButton = document.getElementById("start-quiz");

//HTML elements on questions page during quiz
var questionH2 = document.getElementById("question")
var answerUl = document.getElementById("answers")
var result = document.getElementById("result")

//HTML elements on score page after current game
var playerScore = document.getElementById("player-score")
var playerInit = document.getElementById("player-initials")
var submitButton = document.getElementById("submit")

//HTML elements on scoreboard page
var scoresList = document.getElementById("past-scores-list")
var backButton = document.getElementById("back")
var clearScoreList = document.getElementById("clear-score")

//Add listener to links and buttons
viewHighscores.addEventListener("click", displayPastHighscore);
backButton.addEventListener("click", init);
clearScoreList.addEventListener("click", clearPastHighscore);

//initializa game intro page
function init() {
    introPage.style.display = "flex";
    questionPage.style.display = "none";
    scorePage.style.display = "none";
    result.style.display = "none";
    endQuiz.style.display = "none";

    //Listen when the user wants to start game
    startGameButton.addEventListener("click", startGame);

}

//Once game starts
function startGame() {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    endQuiz.style.display = "none";
    timeLeft = 70;
    qcount = 0;
    startTimer(timeLeft);
    renderQsAndAs(QAList, qcount);
    viewHighscores.removeEventListener("click", displayPastHighscore);
}

//Render questions and multiple choice answers on screen
function renderQsAndAs(QAList, qcount) {
    if (qcount < Object.keys(QAList).length && timeLeft > 0) {
        //console.log(`${Object.keys(QAList)[qcount]}: ${Object.values(QAList)[qcount]}`);
        //console.log(typeof Object.keys(QAList).length);
        updateQuestion(Object.keys(QAList)[qcount]);
        updateAnswers(Object.values(QAList)[qcount]);
        correctAnswer = Object.values(QAList)[qcount][4];
        userAnswer = answerUl.addEventListener("click", answerHandler);
    }
    else if (qcount = Object.keys(QAList).length) {
        clearInterval(timeInterval);
        endQuizResult();

    }
    else {
        endQuizResult();
    }

}

//Change the question once user has answered
function updateQuestion(question) {
    questionH2.textContent = question;
}

//Change the multiple choice options once user has answered
function updateAnswers(answers) {
    answerUl.innerHTML = "";
    for (let i = 0; i < (answers.length - 1); i++) {
        var answerOption = document.createElement("li");
        answerOption.textContent = `${i + 1}. ${answers[i]}`;
        answerOption.dataset.number = i;
        answerOption.setAttribute("class", "clickable");
        answerUl.appendChild(answerOption);
    }
}

//function for timer count down method
function startTimer(timeGiven) {

    timeLeft = timeGiven;
    timerDisplay.textContent = displayTimeLeft(timeLeft);

    timeInterval = setInterval(function () {

        timerDisplay.textContent = displayTimeLeft(timeLeft);

        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = displayTimeLeft(timeLeft);

        }
        else {
            timerDisplay.textContent = 0;
            // Stops execution of action at set interval
            clearInterval(timeInterval);
            // Calls endQuiz function
            endQuizResult();
        }
    }, 1000);

    return timeLeft;

}

//Listens to which answer option the user selects on screen
//Check if that is the correct answer and then render the next question on screen
function answerHandler(event) {
    var element = event.target;
    if (element.matches("li")) {
        userAnswer = element.dataset.number;
        checkResult(userAnswer, correctAnswer);
        qcount++;
        renderQsAndAs(QAList, qcount);
    }
}

//A helper function that checks whether the user's answer is correct
//Display the result "Correct!" or "Wrong!" on the page
//If user's answer is incorrect, deduct 10 seconds from time left
function checkResult(userAnswer, correctAnswer) {
    //console.log("correctAnswer:"+correctAnswer);
    //console.log("userAnswer:"+userAnswer);
    if (userAnswer == undefined || userAnswer == null) {
        result.style.display = "none";
    }
    else if (userAnswer == correctAnswer) {
        //console.log("Correct Answer");
        result.textContent = "Correct!";
        result.style.display = "block";
    }
    else {
        result.textContent = "Wrong!";
        result.style.display = "block";
        timeLeft -= 10;
        displayTimeLeft(timeLeft);
    }

}

//Page to save score after end of quiz
function endQuizResult() {
    questionPage.style.display = "none";
    scorePage.style.display = "none";
    endQuiz.style.display = "block";
    viewHighscores.addEventListener("click", displayPastHighscore);

    playerScore.textContent = displayTimeLeft(timeLeft);

    //check for listener added to avoid duplication - code from AskBCS Learning Assistant
    if (!listenerAdded) {
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();
            //check for past highscores saved in local storage
            //Credits to Borislav Hadzhiev from https://bobbyhadz.com/blog/check-if-localstorage-key-exists-using-javascript
            if (localStorage.hasOwnProperty('pastHighScores')) {
                pastHighScores = JSON.parse(localStorage.getItem("pastHighScores"));
            }

            if (playerInit.value != null && playerInit.value != "") {
                var currentScore = {
                    initials: playerInit.value,
                    score: displayTimeLeft(timeLeft)
                }
                pastHighScores.push(currentScore);
                localStorage.setItem("pastHighScores", JSON.stringify(pastHighScores));
            }

            displayPastHighscore()
        });
        listenerAdded = true;
    }
}

//function to display high scores from past games sorted in descending order
function displayPastHighscore() {
    introPage.style.display = "none";
    questionPage.style.display = "none";
    scorePage.style.display = "block";
    endQuiz.style.display = "none";
    scoresList.innerHTML = "";
    pastHighScores = JSON.parse(localStorage.getItem("pastHighScores") ?? []);

    //display score in descending order
    pastHighScores.sort((a, b) => { return b.score - a.score });

    for (let i = 0; i < pastHighScores.length; i++) {
        var pastScore = document.createElement("li");
        pastScore.textContent = `${i+1}. ${pastHighScores[i].initials} - ${pastHighScores[i].score}`
        scoresList.appendChild(pastScore);
    }

}

//function to clear highscore data
function clearPastHighscore() {
    pastHighScores = [];
    localStorage.setItem("pastHighScores", JSON.stringify(pastHighScores));
    scoresList.innerHTML = '';
    displayPastHighscore()
}

//function to display time left as positive value or "0" when the score is negative
function displayTimeLeft(timeLeft) {
    if (timeLeft > 0) {
        timerDisplay.textContent = timeLeft;
    }
    else {
        timeLeft = 0;
        timerDisplay.textContent = timeLeft;
    }
    return timeLeft;
}

//call function to initialize game
init();