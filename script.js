var quizContainerEl = document.querySelector(".quizContainerEl");
var headerEl = document.querySelector(".headerEl");
var questionEl = document.querySelector(".questionEl");
var optionsListEl = document.querySelector(".optionsListEl");
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
    var questionCount = 0;
    var timeLeft = 10;
    loadQuestion(questionCount);
    var timeInterval = setInterval(function () {
        headerEl.children[1].textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timeInterval);
            quizContainerEl.textContent = "Game Over";
        }
    }, 1000)
}


function loadQuestion(questionCount) {
    quizContainerEl.innerHTML = "";
    quizContainerEl.append(questionEl);
    questionEl.textContent = questions[questionCount].q;

    for (var i = 0; i < questions[questionCount].o.length; i++) {
        var option = document.createElement("button");
        questions[questionCount].o[i];

        

        optionsListEl.append(optionButtonsEl[i]);
    }
}


    // optionButtonsEl.addEventListener("click", function () {

    //         if(optionButtonsEl.textContent === questions[i].a){
    //             timeLeft += 10;
    //         }
    //         else {
    //             timeLeft -= 10;
    //         }
    // });



createMainScreen();