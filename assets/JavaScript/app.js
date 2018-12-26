

// var timerOn = false;
// var timer = 5;

var pos = 0,
    timer = 10,
    trivia,
    triviaStatus,
    question,
    choice,
    choices,
    chA,
    chB,
    chC,
    chD,
    correct = 0,
    incorrect = 0,
    timerOn = false,
    intervalId,
    correctAnswer;

var questionList = [
    ["Who does R2 NOT carry a message for?", "Leia", "Han", "Luke", "B"],
    ["Which of these last names does Leia NOT have a family connection to?", "Fett", "Skywalker", "Amidala", "A"]
    // ["Obi-Wan learned to become one with the force from:", "Mace Windu", "Qui-Gon Jinn", "Yoda", "B"],
    // ["How tall is Chewbacca?", "6'8", "7'6", "8'11", "C"],
    // ["Where did Young Anakin Skywalker Pod-Raced?", "Bothan Spy Classic", "Boonta Eve Classic", "Bantha Poodo Classic", "B"],
    // ["What color lasers do Tie Fighters shoot?", "Green", "Red", "Orange", "A"],
    // ["Who did Leia kiss first?", "Luke", "Solo", "Chewie", "A"],
    // [" Which is Han Solo's trusty blaster?", "D4-66", "BB-88", "DL-44", "C"],
    // ["What is the name of Luke’s childhood best friend, who later served alongside him in the Rebellion?", "Biggs Darklighter", "Nien Numb", "Wedge Antilles", "A"],
    // ["In how many forms of communication is C-3PO fluent?", "Over 12 million", "Over 6 million", "Over 8 million", "B"],
    // ["What rank does Han Solo obtain during the Galactic Civil War?", "General", "Commander", "Admiral", "A",],
    // ["How old is Yoda at his time of death?", "800", "700", "900", "C"],
    // ["During what circumstance did Lando lost his Millenium Falcon to Han Solo?", "Bet", "Raid", "Battle", "A"],
    // ["How old was Padme when she became queen?", "12", "14", "16", "B"],
    // ["In which planet was Obi-Wan Kenobi born", "Coruscant", "Alderaan", "Stewjon", "C"],
    // ["What color lasers do X-Wings shoot?", "Orange", "Green", "Red", "C"],
    // ["Which of these species’ names is NEVER mentioned in the films?", "Ewoks", "Wookies", "Jawas", "A"],
    // ["When will Lukes's training be completed according to Yoda", "Discovers the truth about Leia", "Builds a lightsaber", "Faces Darth Vader", "C"]
];

function renderQuestion() {
    if (!timerOn && (pos <= (questionList.length - 1))) {
        console.log(pos + " " + questionList.length);
        $("#qBlock").show();
        $("#answers").hide();
        $("#test_status").text("Question " + (pos + 1) + " of " + questionList.length);
        question = questionList[pos][0];
        chA = questionList[pos][1];
        chB = questionList[pos][2];
        chC = questionList[pos][3];
        $("#question").append("<h2>" + question + "</h2>");
        $("#multipleChoice").append("<input type='checkbox' name='choices' value='A'>" + chA + "<br>");
        $("#multipleChoice").append("<input type='checkbox' name='choices' value='B'>" + chB + "<br>");
        $("#multipleChoice").append("<input type='checkbox' name='choices' value='C'>" + chC + "<br><br>");
        $("#multipleChoice").append("<button id='submit'>Submit Answer</button>");
        intervalId = setInterval(decrement, 1000);
        $("#submit").on("click", checkAnswer);
        timerOn = true;
        console.log("why");
    }
    if (pos === questionList.length) {
        console.log("test");
        finalResult();
        setTimeout(clear, 1000 * 5);
        setTimeout(restart, 1000 * 5);
    }
}

function restart() {
    $("#intro").show();
    $("#qBlock").hide();
    $("#answers").hide();
    $("#results").hide();
    pos = 0;
    correct = 0;
    incorrect = 0; 
    stop();
}

function finalResult() {
    console.log("test2");
    $("#qBlock").hide();
    $("#results").show();
    $("#rights").text(correct);
    $("#wrong").text(incorrect);
    $("#finalScore").text(correct/questionList.length);
    
}
function correctAnswerVar() {
    console.log("incorrect");
    if (questionList[pos][4] === "A") {
        correctAnswer = questionList[pos][1];
    }
    else if (questionList[pos][4] === "B") {
        correctAnswer = questionList[pos][2];
    }
    else if (questionList[pos][4] === "C") {
        correctAnswer = questionList[pos][3];
    }
    return correctAnswer;
}

function correctAnswer() {
    console.log("correct inside")
    $("#qBlock").hide();
    $("#answers").show();
    $("#answers").append("<h1>Correct</h1>");
    $("#answers").append("<h2>Keep up the Good Work</h1>");
}

function incorrectAnswer() {
    correctAnswerVar();
    $("#qBlock").hide();
    $("#answers").show();
    $("#answers").append("<h2>InCorrect!</h2>");
    $("#answers").append("<h3>The correct answer is : " + questionList[pos][4] + " " + correctAnswer + "</h3>");
}

function outOfTime() {
    $("#qBlock").hide();
    $("#answers").show();
    $("#answers").append("<p>Out Of Time!</p>");
}

function clear() {
    timer = 10;
    $("#question").empty();
    $("#multipleChoice").empty();
    $("#answers").empty();
    correctAnswer = 0;
}

function checkAnswer() {
    stop();
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    if (choice == questionList[pos][4]) {
        console.log("correct");
        correct++;
        console.log(correct);
        correctAnswer();
    } else {
        incorrect++;
        incorrectAnswer();
    }
    pos++;
    console.log({
        checkAnswer: "checkAnswer",
        correct: correct,
        incorrect: incorrect,
        pos: pos
    });
    setTimeout(clear, 1000 * 3);
    setTimeout(renderQuestion, 1000 * 4);
}

function decrement() {
    if (timer === 0) {
        stop();
        // alert("Times up!");
        console.log("test3");
        incorrectAnswer();
        incorrect++;
        pos++;
        setTimeout(clear, 1000 * 4);
        setTimeout(renderQuestion, 1000 * 4);
        console.log({
            decrement: "Decrement",
            correct: correct,
            incorrect: incorrect,
            pos: pos
        });
    }
    else {
        timer--;
        $("#timer").text("00:" + timer);
        if (timer < 10) {
            $("#timer").text("00:0" + timer);
        }
        console.log("Timer: " + timer);
    }
}

function stop() {
    clearInterval(intervalId);
    timerOn = false;
}

$("#start").on("click", function () {
    $("#intro").hide();
    renderQuestion();
});
