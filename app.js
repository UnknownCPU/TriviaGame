function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        var totalTime = 30;
        var timeStop = setInterval(countDown, 1000);
        function countDown() {

            if (totalTime == -1) {


                $("#quiz-time-left").append("<h2>Time's Up!</h2>");
                clearInterval(timeStop);
            }
            else {
                $("#quiz-time-left").html("<h2>Time Remaining: " + totalTime + " Seconds</h2>");
                totalTime--;
                console.log(totalTime);
            }
        };

        showProgress();
    }
};
// var total_seconds =60*10
// var c_minutes = parseInt(total_seconds/60);
// var c_seconds = parseInt(total_secoond%60);
// function CheckTime(){
//     document.getElementById("quiz-time-left").innerHTML
//     ='Time Left: ' + c_minutes + ' minutes ' + c_seconds + ' seconds' ;
//     if(total_seods <=0){
//         setTimeout('document.quiz.submit()',1);
//     } else{
//         total_seconds = total_seconds -1;
//         c_minutes = parseInt(total_seconds/60);
//         c_seconds = parseInt(total_seconds%60);
//       setTimeout("CheckTime()",1000);
// }}

// setTimeout("CheckTime()",1000);        



function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Which one is not an object oriented programming language?", ["Java", "C#", "C++", "C"], "C"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("There are ____ main components of object oriented programming.", ["1", "6", "2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("MVC is a ____.", ["Language", "Library", "Framework", "All"], "Framework")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
