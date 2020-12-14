var quizContainerEl = document.querySelector(".quizContainerEl");
var headerEl = document.querySelector(".headerEl");
quizContainerEl.setAttribute("style", "border: 5px solid blue;");

quizContainerEl.textContent = "";

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
    quizContainerEl.textContent = "";

    for (var i = 0; i < questions.length; i++) {
        var questionBoxEl = document.createElement("div");
        quizContainerEl.append(questionBoxEl)
        questionBoxEl.textContent = questions[i].q;
        var optionButtonsEl = [];
        for (var j = 0; j < questions[i].o.length; j++) {
            optionButtonsEl.push(document.createElement("button"));
            optionButtonsEl[j].textContent = questions[i].o[j];
            optionButtonsEl[j].addEventListener("click",answerCheck);
            quizContainerEl.append(optionButtonsEl[j]);
        }
    }

    var timeLeft = 10;
    var timeInterval = setInterval(function () {

        console.log(timeLeft);
        headerEl.children[1].textContent = timeLeft;
        timeLeft--;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            quizContainerEl.textContent = "Game Over";

        }
    }, 1000)
}
createMainScreen();