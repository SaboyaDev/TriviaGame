// Global Variable Declaration //
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
    score,
    rightAnswer;

// 2D Question Array Bank 
// 1st position--> Question
// 2nd position--> Choice A
// 3rd position--> Choice B
// 4th position--> Choice C
// 5th position--> Correct Answer
//------------------------------------------------------------------------------//
var questionList = [
    ["Who does R2 NOT carry a message for?", "Leia", "Han", "Luke", "B"],
    ["Which of these last names does Leia NOT have a family connection to?", "Fett", "Skywalker", "Amidala", "A"],
    ["Obi-Wan learned to become one with the force from:", "Mace Windu", "Qui-Gon Jinn", "Yoda", "B"],
    ["How tall is Chewbacca?", "6'8", "7'6", "8'11", "C"],
    ["Where did Young Anakin Skywalker Pod-Raced?", "Bothan Spy Classic", "Boonta Eve Classic", "Bantha Poodo Classic", "B"],
    ["What color lasers do Tie Fighters shoot?", "Green", "Red", "Orange", "A"],
    ["Who did Leia kiss first?", "Luke", "Solo", "Chewie", "A"],
    [" Which is Han Solo's trusty blaster?", "D4-66", "BB-88", "DL-44", "C"],
    ["What is the name of Luke’s childhood best friend, who later served alongside him in the Rebellion?", "Biggs Darklighter", "Nien Numb", "Wedge Antilles", "A"],
    ["In how many forms of communication is C-3PO fluent?", "Over 12 million", "Over 6 million", "Over 8 million", "B"],
    ["What rank does Han Solo obtain during the Galactic Civil War?", "General", "Commander", "Admiral", "A",],
    ["How old is Yoda at his time of death?", "800", "700", "900", "C"],
    ["During what circumstance did Lando lost his Millenium Falcon to Han Solo?", "Bet", "Raid", "Battle", "A"],
    ["How old was Padme when she became queen?", "12", "14", "16", "B"],
    ["In which planet was Obi-Wan Kenobi born", "Coruscant", "Alderaan", "Stewjon", "C"],
    ["What color lasers do X-Wings shoot?", "Orange", "Green", "Red", "C"],
    ["Which of these species’ names is NEVER mentioned in the films?", "Ewoks", "Wookies", "Jawas", "A"],
    ["When will Lukes's training be completed according to Yoda", "Discovers the truth about Leia", "Builds a lightsaber", "Faces Darth Vader", "C"]
];

// It goes though the 2D Question Array Bank
//-----------------------------------------------------------------------------//
function renderQuestion() {

    // It evaluates if the timer flag is On and if it has reach the end of the
    // Question Bank.
    if (!timerOn && (pos <= (questionList.length - 1))) {
        console.log(pos + " " + questionList.length);
        $("#qBlock").show();
        $("#answers").hide(); // if the answer section was showin, it hides it
        // Let's the user know in which question they are on
        $("#test_status").text("Question " + (pos + 1) + " of " + questionList.length);
        question = questionList[pos][0];
        chA = questionList[pos][1];
        chB = questionList[pos][2];
        chC = questionList[pos][3];
        $("#question").append("<h2>" + question + "</h2>");
        $("#multipleChoice").append("<input type='checkbox' name='choices' value='A'>" + chA + "<br>");
        $("#multipleChoice").append("<input type='checkbox' name='choices' value='B'>" + chB + "<br>");
        $("#multipleChoice").append("<input type='checkbox' name='choices' value='C'>" + chC + "<br><br>");
        $("#multipleChoice").append("<button id='submit' style='vertical-align:middle'> <span>Submit</span></button>");
        // Starts the counter and calls the Decrement Function
        intervalId = setInterval(decrement, 1000);
        $("#submit").on("click", checkAnswer); // it waits for a click event and stops the timer
        timerOn = true;
        console.log("end of render question");
    }
    // it evaluates if the user has reached the end of the trivia and calls a
    // couple of functions to display the result, clear the result and bring you
    // to the begining with out reloading the page. 
    if (pos === questionList.length) {
        console.log("pos === questionList.length");
        finalResult();
        setTimeout(clear, 1000 * 7);
        setTimeout(restart, 1000 * 7);
    }
}

// Function thats sets up the page and brings you to the begining of the trivia.
//------------------------------------------------------------------------------//
function restart() {
    console.log("restart")
    $("#intro").show();
    $("#qBlock").hide();
    $("#answers").hide();
    $("#results").hide();
    pos = 0;
    correct = 0;
    incorrect = 0; 
    stop();
}

// Rounds the percentage of the score to the nearest 10th and returns the value 
//------------------------------------------------------------------------------//
function roundResult(result, decimals) {
    return Number(Math.round(result + "e" + decimals) + "e-" + decimals);
}

// It Displays the Results Section in the HTML with the final results
//------------------------------------------------------------------------------//
function finalResult() {
    console.log("final result");
    $("#qBlock").hide();
    $("#results").show();
    $("#rights").text(correct);
    $("#wrong").text(incorrect);
    score = ((correct/questionList.length) * 100);
    $("#finalScore").text(roundResult(score, 2) + "%");
    console.log();
}

// Depending on the question it determines the correct answer and stores the
// value into a variable "rightAnswer"
//------------------------------------------------------------------------------//
function correctAnswerVar() {
    console.log("correct Anser Var");
    if (questionList[pos][4] === "A") {
        rightAnswer = questionList[pos][1];
    }
    else if (questionList[pos][4] === "B") {
        rightAnswer = questionList[pos][2];
    }
    else if (questionList[pos][4] === "C") {
        rightAnswer = questionList[pos][3];
    }
}

// Displays a Positive message on the Answers Section on the HTML Doc for
// guessing the correct answer
//------------------------------------------------------------------------------//
function correctAnswer() {
    console.log("correct inside")
    $("#qBlock").hide();
    $("#answers").show();
    $("#answers").append("<h2>Correct</h2>");
    $("#answers").append("<h3>Keep up the Good Work...</h3>");
}

// Lets the user know of the wrong choice on the Answers Section on the HTML Doc
// for guessing the correct answer
//------------------------------------------------------------------------------//
function incorrectAnswer() {
    correctAnswerVar();
    $("#qBlock").hide();
    $("#answers").show();
    $("#answers").append("<h2>InCorrect!</h2>");
    $("#answers").append("<h3>The correct answer is : " + "( " +questionList[pos][4] + " )" + " - " + rightAnswer + "</h3>");
}

// resets timer value and deletes any content created from the previous question
// inside of certain elements
//------------------------------------------------------------------------------//
function clear() {
    timer = 10;
    $("#timer").text("00:10");
    $("#question").empty();
    $("#multipleChoice").empty();
    $("#answers").empty();
    rightAnswer = 0;
}

// it evaluates the users choice on a particular question 
// it calls the correctAnswer() or incorrectAnswer() 
// to let the user name of their choice against the right answer
//------------------------------------------------------------------------------//
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
    setTimeout(clear, 1000 * 2); // it calls the clear() after 2 seconds
    setTimeout(renderQuestion, 1000 * 2); // it calls the renderquestion in 2 sed 
}

// how the timer is display every 1 second and evaluates if time is up
//------------------------------------------------------------------------------//
function decrement() {
    if (timer === 0) {
        stop();
        // alert("Times up!");
        console.log("end of timer");
        incorrectAnswer();
        incorrect++;
        pos++;
        setTimeout(clear, 1000 * 2);
        setTimeout(renderQuestion, 1000 * 2);
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

// it clears the the display timer and turns on the flag of timerOn
//------------------------------------------------------------------------------//
function stop() {
    console.log("stop");
    clearInterval(intervalId);
    timerOn = false;
}

// it waits for a click event and hides the Intro Section after click
// the very first function is called.
//------------------------------------------------------------------------------//
$("#start").on("click", function () {
    $("#intro").hide();
    renderQuestion();
});
