var QAList ={
    "Inside the HTML document, where do you place your JavaScript code?":
    ["Inside the <link> element","In the <footer> element","Inside the <script> element","Inside the <head> element",2],
    "What operator is used to assign a value to a declared variable?":
    ["Question mark (?)","Double-equal (==)","Equal sign (=)","Colon (:)",2],
    "A very useful too used during development and debugging for printing content to the debugger is":
    ["Javascript","Terminal/bash","For loops","Console.log",3],
    "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']":
    ["1","2","3","4",0],
    "String values must be enclosed within _____ when being assigned to variables":
    ["Quotes","Curly brackets","Commas","Parentheses",0],
    "Commonly used data types DO NOT include:":
    ["Strings","Booleans","Alerts","Numbers",2],
    "The condition in an if/else statement is enclosed within ______.":
    ["Quotes","Curly brackets","Parentheses","Square brackets",2],
    "Arrays in JavaScript can be used to store ______.":
    ["Numbers and strings","Other arrays","Booleans","All of the above",3]
}
let correctAnswer;
let userAnswer;

var introPage = document.querySelector("#intro");
var questionPage = document.querySelector("#quiz");
var scorePage = document.querySelector("#score-record");

var startGameButton = document.getElementById("start-quiz");
var viewHighscores = document.getElementById("scoreboard");


var questionH2 = document.getElementById("question")
var answerUl = document.getElementById("answers")
var result = document.getElementById("result")
// var answerOptions = answerUl.querySelectorAll("li")

//init
function init(){
questionPage.style.display = "none";
scorePage.style.display = "none";
result.style.display = "none";
startGameButton.addEventListener("click",startGame);

}

function startGame(){
 //todo
 introPage.style.display = "none";
 questionPage.style.display = "block";
 scorePage.style.display = "none";
 
 updateQuestion(Object.keys(QAList)[0]);
 updateAnswers(Object.values(QAList)[0]);
 correctAnswer = Object.values(QAList)[0][4];
 userAnswer = answerUl.addEventListener("click",answerHandler);
 

}
function renderQsAndAs(QAList){
 for (let i = 0; i<Object.keys(QAList).length;i++){
    updateQuestion(Object.keys(QAList)[i]);
    updateAnswers(Object.values(QAList)[i]);
    correctAnswer = Object.values(QAList)[i][4];
    userAnswer = answerUl.addEventListener("click",answerHandler);
    if (timer()==0){
        break;
        }
    }   
}




function updateQuestion(question){
    questionH2.textContent=question;
}

function updateAnswers(answers){
    for(let i = 0; i<(answers.length-1);i++){
        var answerOption = document.createElement("li");
        answerOption.textContent=`${i+1}. ${answers[i]}`;
        answerOption.dataset.number=i;
        answerUl.appendChild(answerOption);
    }
}


function timer (){
 //todo
 let timeLeft=70;
 return timeLeft
}


function answerHandler(event){
    var element = event.target;
    if (element.matches("li")) {
        userAnswer = element.dataset.number;
        checkResult(userAnswer,correctAnswer);
    }
    else{
        return;
    }
}


function checkResult(userAnswer,correctAnswer){
    console.log("correctAnswer:"+correctAnswer);
    console.log("userAnswer:"+userAnswer);
    if (userAnswer == undefined || userAnswer ==null){
        return result.style.display = "none";
    }
    else if (userAnswer == correctAnswer){
        //console.log("Correct Answer");
        result.textContent = "Correct!";
        result.style.display = "block";        
     }
     else {
        result.textContent = "Wrong!";
        result.style.display = "block";}
    
}


init();