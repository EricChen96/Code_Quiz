var quizContainerEl = document.querySelector(".quizContainerEl");
var headerEl = document.querySelector(".headerEl");
var questionEl = document.querySelector("#questionEl");
var optionsEl = document.querySelector("#options-list");
var questionCount;
var timeLeft;
var score;
var highscores = [];
quizContainerEl.setAttribute("style", "border: 5px solid blue;");
var startButton = document.createElement("button");
var scoreDisplay = document.createElement("h2");
var initialForm = document.createElement("form");
var initialInput = document.createElement("input");

var questions = [
    { q: "The data type to store 'true' or 'false' is: ", o: ["String", "Integer", "Boolean", "Objects"], a: "Boolean" },
    { q: "Array items should be enclosed in: ", o: ["[ ]", "{ }", "\" \"", "Nothing"], a: "[ ]" },
    { q: "To obtain the third item in an array, the correct notation is: ", o: ["array[0]", "array[1]", "array[2]", "array[3]"], a: "array[2]" },
    { q: "To loop through to the final index, what should the condition be in the for loop: ", o: ["i<=array.length", "i<1000", "i<array.length-1", "i<array.length"], a: "i<array.length" }
];

function createMainScreen() {
    quizContainerEl.innerHTML = "";
    startButton.textContent = "START";
    quizContainerEl.append(startButton);
    startButton.addEventListener("click", startGame);
}

function changeTimeleft() {
    headerEl.children[1].textContent = timeLeft;
}

function startGame() {
    quizContainerEl.innerHTML = "";
    questionCount = 0;
    timeLeft = 10;
    loadQuestion(questionCount);
    var timeInterval = setInterval(function () {
        if (timeLeft < 0 || questionCount === questions.length) {
            clearInterval(timeInterval);
            timeLeft = timeLeft < 0 ? 0 : timeLeft;
            changeTimeleft();
            endGame();
        }
        else {
            changeTimeleft();
            timeLeft--;
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
        option.setAttribute("index-number", i);
        optionsEl.append(option);
    }
}

function endGame() {
    quizContainerEl.innerHTML = "";
    score = timeLeft;
    scoreDisplay.textContent = "Your final score is: " + score;

    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("placeholder", "Enter your initials");
    quizContainerEl.append(scoreDisplay);
    quizContainerEl.append(initialForm);
    initialForm.append(initialInput);
}

initialForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialText = initialInput.value.trim();
    if (initialText === "") {
        return;
    }
    var tempScore = { initial: initialText, playerScore: score };
    highscores.push(tempScore);
    storeHighscores();
    initialInput.value = "";
    createMainScreen();
})

function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

optionsEl.addEventListener("click", function (event) {
    var element = event.target;
    if (event.target.textContent === questions[questionCount].a) {
        timeLeft += 10;
        changeTimeleft();
    }
    else {
        timeLeft -= 10;
        changeTimeleft();
    }
    questionCount++;
    if (questionCount === questions.length) {
        endGame()
    }
    else {
        loadQuestion(questionCount);

    }
})

createMainScreen();