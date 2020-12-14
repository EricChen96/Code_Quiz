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
    var questionBoxEl = document.createElement("div");
    quizContainerEl.append(questionBoxEl)
    var questionCount = 0;
    var timeLeft = 10;
    var timeInterval = setInterval(function () {
        headerEl.children[1].textContent = timeLeft;
        questionBoxEl.textContent = questions[questionCount].q;

        var optionButtonsEl = []
        for(var i = 0; i<questions[questionCount].o.length; i++) {
            optionButtonsEl.push(document.createElement("button"));
            optionButtonsEl[i].textContent == questions[questionCount].o[i];
            quizContainerEl.append(optionButtonsEl[i]);
        }
        
        timeLeft--;
        if (timeLeft < 0 || questionCount === questions.length) {
            clearInterval(timeInterval);
            quizContainerEl.textContent = "Game Over";
        }
    }, 1000)
}

function loadQuestion(questionNumber) {

}
        // questionBoxEl.textContent = questions[i].q;
        // var optionButtonsEl[][] = [];
        // for (var j = 0; j < questions[i].o.length; j++) {
        //     optionButtonsEl[i].push(document.createElement("button"));
        //     optionButtonsEl[i][j].textContent = questions[i].o[j];
        //     quizContainerEl.append(optionButtonsEl[j]);
        //     console.log(optionButtonsEl[i][j].textContent);
        //     console.log(questions[i].a);
        //     optionButtonsEl[j].addEventListener("click", function () {
        //         console.log(optionButtonsEl[i][j]);
        //         //     if(optionButtonsEl[j].textContent === questions[i].a){
        //         //         timeLeft += 10;
        //         //     }
        //         //     else {
        //         //         timeLeft -= 10;
        //         //     }
        //     });

        // }


createMainScreen();