var quizContainerEl = document.querySelector(".quizContainerEl");
var headerEl = document.querySelector(".headerEl");
var questionEl = document.querySelector("#questionEl");
var optionsEl = document.querySelector("#options-list");
var questionCount;
var timeLeft;
var highscore;
quizContainerEl.setAttribute("style", "border: 5px solid blue;");


var questions = [
    { q: "The data type to store 'true' or 'false' is: ", o: ["String", "Integer", "Boolean", "Objects"], a: "Boolean" },
    { q: "Array items should be enclosed in: ", o: ["[ ]", "{ }", "\" \"", "Nothing"], a: "[ ]" },
    { q: "To obtain the third item in an array, the correct notation is: ", o: ["array[0]", "array[1]", "array[2]", "array[3]"], a: "array[2" },
    { q: "To loop through to the final index, what should the condition be in the for loop: ", o: ["i<=array.length", "i<1000", "i<array.length-1", "i<array.length"], a: "i<array.length" }
];

function createMainScreen() {
    var startButton = document.createElement("button");
    startButton.textContent = "START";
    quizContainerEl.append(startButton);
    startButton.addEventListener("click", startGame);
}

function startGame() {
    quizContainerEl.innerHTML = "";
    questionCount = 0;
    timeLeft = 10;
    loadQuestion(questionCount);
    var timeInterval = setInterval(function () {
        headerEl.children[1].textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0 || questionCount == questions.length) {
            clearInterval(timeInterval);
            timeLeft = 0;
            endGame();
        }
    }, 1000)
}


function loadQuestion(questionCount) {
    quizContainerEl.innerHTML = "";
    quizContainerEl.append(questionEl);
    quizContainerEl.append(optionsEl);
    questionEl.textContent = questions[questionCount].q;
    optionsEl.innerHTML = "";
    for (var i = 0; i < questions[questionCount].o.length; i++) {
        var option = document.createElement("button");
        option.textContent = questions[questionCount].o[i];
        option.setAttribute("index-number",i);       
        optionsEl.append(option);
    }
}

function endGame() {
    quizContainerEl.innerHTML = "";
    highscore = timeLeft;
    var scoreDisplay = document.createElement("h2");
    scoreDisplay.textContent = "Your final score is: " + highscore;
    var initialForm = document.createElement("form");
    var initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("placeholder", "Enter your initials");
    quizContainerEl.append(scoreDisplay);
    quizContainerEl.append(initialForm);
    initialForm.append(initialInput);
}

initialForm.addEventListener

optionsEl.addEventListener("click", function(event) {
    var element = event.target;
    if(event.target.textContent === questions[questionCount].a) {
        timeLeft += 10;
    }
    else {
        timeLeft -= 10;
    }
    questionCount++;
    loadQuestion(questionCount);
})

createMainScreen();