//contains quiz section of app
var quizContainerEl = document.querySelector("#quizContainerEl");
//header containing highscore link
var headerEl = document.querySelector("#headerEl");
var highscoresEl = document.querySelector("#highscoreEl");

//Question Game elements
var questionEl = document.querySelector("#questionEl");
var optionsEl = document.querySelector("#options-list");
var message = document.createElement("h3");
message.setAttribute("class","isCorrectMessage");

var questionCount;
var timeLeft;
var score;
var timeInterval;
var highscores = [];
quizContainerEl.setAttribute("style", "border: 5px solid blue;");
//Start Screen elements
var startButton = document.createElement("button");
var gameTitle = document.createElement("h2");
var gameInstructions = document.createElement("h3");
gameTitle.textContent = "CODE QUIZ";
startButton.textContent = "START";
gameInstructions.textContent = "Welcome to Code Quiz. This game tests your Javascript knowledge. Click the correct answer to add time but choose incorrectly and your time would decrease by 10 seconds. Try to answer before the time runs out";
startButton.setAttribute("class", "startButton")
gameTitle.setAttribute("class", "gameTitle");

//End screen elements
var scoreDisplay = document.createElement("h2");
var initialForm = document.createElement("form");
var initialInput = document.createElement("input");
var playAgainButton = document.createElement("button");
playAgainButton.setAttribute("class", "playAgainButton")

//Highscores page elements
var highscoresList = document.createElement("ol");
var highscoresTitle = document.createElement("h2");
var resetHighscoresButton = document.createElement("button");
highscoresList.setAttribute("class", "highscoresList");
playAgainButton.textContent = "Play Again";
highscoresTitle.textContent = "HIGHSCORES";
resetHighscoresButton.textContent = "Reset Highscores";
resetHighscoresButton.setAttribute("class", "resetButton");
highscoresTitle.setAttribute("class", "highscoresTitle");

//question array of objects. q is the question, o are options, 
var questions = [
    { q: "The data type to store 'true' or 'false' is: ", o: ["String", "Integer", "Boolean", "Objects"], a: "Boolean" },
    { q: "Array items should be enclosed in: ", o: ["[ ]", "{ }", "\" \"", "Nothing"], a: "[ ]" },
    { q: "To obtain the third item in an array, the correct notation is: ", o: ["array[0]", "array[1]", "array[2]", "array[3]"], a: "array[2]" },
    { q: "To loop through to the final index, what should the condition be in the for loop: ", o: ["i<=array.length", "i<1000", "i<array.length-1", "i<array.length"], a: "i<array.length"},
    { q: "To close a line of code, you should use: ", o: [";", ".end",":","."], a: ";"}
];

//Creates title page showing title, instructions and start button
function createMainScreen() {
    quizContainerEl.innerHTML = "";
    quizContainerEl.append(gameTitle);
    quizContainerEl.append(gameInstructions);
    quizContainerEl.append(startButton);
}

//Start button action listener
startButton.addEventListener("click", startGame);

//Changes the timer at top right corner
function changeTimeleft() {
    headerEl.children[1].textContent = timeLeft;
}

//Starts the game reseting timeLeft, questionCount, and countdown
function startGame() {
    quizContainerEl.innerHTML = "";
    questionCount = 0;
    timeLeft = 10;
    loadQuestion(questionCount);

    timeInterval = setInterval(function () {
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

//Loads the question according to what count we are on
function loadQuestion(questionCount) {
    quizContainerEl.innerHTML = "";
    quizContainerEl.append(questionEl);
    quizContainerEl.append(optionsEl);
    quizContainerEl.append(message);
    questionEl.textContent = questions[questionCount].q;
    optionsEl.innerHTML = "";
    //Option buttons
    for (var i = 0; i < questions[questionCount].o.length; i++) {
        var option = document.createElement("button");
        option.setAttribute("class", "gameQuestionButtons")
        option.textContent = questions[questionCount].o[i];
        optionsEl.append(option);
    }
}

//If clicking within the optionEl, checks if correct, updates time, and shows message for incorrect or correct
optionsEl.addEventListener("click", function (event) {
    var element = event.target;
    if (event.target.textContent === questions[questionCount].a) {
        timeLeft += 10;
        changeTimeleft();
        showAnswerMessage(true);
    }
    else {
        if (timeLeft <= 10) {
            clearInterval(timeInterval);
            timeLeft = 0;
            changeTimeleft();
        }
        else {
            timeLeft -= 10;
            changeTimeleft();
        }
        showAnswerMessage(false);
    }
    questionCount++;
    if (questionCount === questions.length || timeLeft <= 0) {
        endGame()
    }
    else {
        loadQuestion(questionCount);
    }
})

//Shows a 1 second message according to if user answers correctly of incorrectly
function showAnswerMessage(isCorrect) {
    var isCorrectInterval = 1;
    var solutionInterval = setInterval(function () {
        if(isCorrectInterval > 0 ){
            if (isCorrect) {
                message.textContent = "Correct";
            }
            else if(isCorrect === false){
                message.textContent = "Incorrect";
            }
            isCorrectInterval--;
        }
        else {
            clearInterval(solutionInterval)
            message.textContent = "";
        }
    }, 1000)
}

//Shows ending screen if user reaches end of game or time runs out
function endGame() {
    quizContainerEl.innerHTML = "";
    score = timeLeft;
    scoreDisplay.textContent = "Your final score is: " + score;
    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("placeholder", "Enter your initials");
    quizContainerEl.append(scoreDisplay);
    quizContainerEl.append(initialForm);
    initialForm.append(initialInput);
    quizContainerEl.append(playAgainButton);
}

//Play again button
playAgainButton.addEventListener("click", function () {
    startGame();
})

//If user submits their id, records the score in highscore list 
initialForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialText = initialInput.value.trim();
    if (initialText === "") {
        return;
    }
    var tempScore = { initial: initialText, playerScore: score };
    //if there are 10 highscores stored, it will remove the first one and add new one to end of list
    if (highscores.length < 10 || highscores === null) {
        highscores.push(tempScore);
        storeHighscores();
    }
    else {
        highscores.shift();
        highscores.push(tempScore);
        storeHighscores();
    }
    initialInput.value = "";
})

//stores highscores array in local storage
function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

//if user clicks top left corner on "highscore", it goes to highscores page
highscoresEl.addEventListener("click", function () {
    loadHighscores();
})

//clears interval if user clicked while in quiz and loads list of highscores
function loadHighscores() {
    clearInterval(timeInterval);
    quizContainerEl.innerHTML = "";
    highscoresList.innerHTML = "";

    for (var i = 0; i < highscores.length; i++) {
        var li = document.createElement("li");
        li.textContent = highscores[i].initial + " .......... " + highscores[i].playerScore;
        highscoresList.append(li);
    }
    quizContainerEl.append(highscoresTitle);
    quizContainerEl.append(highscoresList);
    quizContainerEl.append(playAgainButton);
    quizContainerEl.append(resetHighscoresButton);
}

//initialization function for getting highscore information from local storage and storing it in our array
function init() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
}

//Reset highscore array
resetHighscoresButton.addEventListener("click", function () {
    highscores = [];
    storeHighscores();
    loadHighscores();
})

//Calling functions to load game
init();
createMainScreen();