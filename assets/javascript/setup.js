var indexQuestions = 0;
var timer;
var time = questions.length * 15;

var questionsEl = document.getElementById("questions");
var timer = document.getElementById("time");
var choices = document.getElementById("multiple");
var start = document.getElementById("start");
var submit = document.getElementById("submit");
var initials = document.getElementById("initials");
var feedback = document.getElementById("feedback");

function startQuiz() {
    var startScreen = document.getElementById("starting");
    startScreen.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timer = setInterval(clock, 1000)

    timer.textContent = time;

    getQuestions();
}

function getQuestions() {

    var curQuestion = questions[indexQuestions];

    var title = document.getElementById("quesiton-title");
    title.textContent = curQuestion.title;

    choices.innerHTML = "";

    curQuestion.choices.forEach(function(choice,i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice)

        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = clickQuestion;

        choices.appendChild(choiceNode);
    });
};

function clickQuestion() {
    if (this.value !== questions[indexQuestions].answer) {
        time -= 15;

        if (time < 0 ) {
            time = 0;
        }

        timer.textContent = time;

        feedback.textContent = "Incorrect"
    }
    else {
        feedback.textContent = "Correct"
    }

    feedback.setAttribute("class", "feedback");

    setTimeout(function() {
        feedback.setAttribute("class", "feedback hide");
    }, 1000);

    indexQuestions++;

    if (indexQuestions === questions.length) {
        done();
    }
    else {
        getQuestions();
    }
}

function clock() {
    time--;
    timer.textContent = time;

    if (time <= 0) {
        done();
    }
}

function done() {
    clearInterval(timer);

    var endScreen = document.getElementById("done");
    endScreen.remove("class");

    var finalScore = document.getElementById("finalscore");
    finalScore.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function saveScore() {
    var getInitials = initials.value.trim();

    if (getInitials !== "") {
        var getScores =
        JSON.parse(window.localStorage.getItem("getScores")) || [];

        var newScore = {
            score: time,
            getInitials: initials
        }

        getScores.push(newScore);
        window.localStorage.setItem("getScores", JSON.stringify(getScores));

        window.location.href = "highscores.html";
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        saveScore();
    }
}

submit.onClick = saveScore;

start.onclick = startQuiz;

initials.onkeyup = checkEnter;