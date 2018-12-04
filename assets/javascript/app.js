$(document).ready(function() {

    var quiz = [{
        question: "What is Harry's middle name?",
        choices: ["Albus", "Serius", "James", "Peter"],
        correct: 2,
    }, {
        question: "What is Lord Voldemort’s real name?",
        choices: ["Tom Ravolo Riddle", "Tom Marvin Riddle", "Tom Marvilo Riddle", "Tom Marvolo Riddle"],
        correct: 3

    }, {
        question: "According to the Dursleys, how did Harry’s parents die?",
        choices: ["In a bus crash", "In a car crash", "In a train crash", "In a plane crash"],
        correct: 1

    }, {
        question: "What is Dumbledore’s full name?",
        choices: ["Albus Percival Wulfric Brian Dumbledore", "Albus Brian Percival Wulfric Dumbledore", "Albus Percival Brian Wulfric Dumbledore", "Albus Wulfric Percival Brian Dumbledore"],
        correct: 0

    }, {
        question: "What is the symbol for the Ravenclaw house?",
        choices: ["Raven", "Crow", "Eagle", "Hawk"],
        correct: 2

    }, {
        question: "A person born into a wizarding family who cannot do magic is called…?",
        choices: ["A mudblood", "A squib", "A half-blood", "A muggle"],
        correct: 1

    }, {
        question: "Who put Harry’s name in the Goblet of Fire?",
        choices: ["Barty Crouch, Jr.", "Cornelius Fudge", "Severus Snape", "Peter Pettigrew"],
        correct: 0

    }, {
        question: "When is Harry Potter's birthday?",
        choices: ["31 July 1981", "30 July 1981", "30 July 1980", "31 July 1980"],
        correct: 3
    }];
    var picArray = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8"];
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswers = 0; 
    var count = 30;
    var number = 0;
    var timeRemain;

    $("#startButton").on("click", start) 
    
    function start() {
        $(this).hide();
        count = 30;
        $("#timer").html("Time remaining : " + count + " secs");
        timeRemain = setInterval(timer, 1000);
        questions(number);
        $("#container").show();
    }
    
    function beforestart() {
        $("#container").hide();
    }

    function questions(number) {
        if (number < quiz.length) {
        $("#question").html(quiz[number].question);
        $("#question").append("<br> ");
        var choicesArr = quiz[number].choices;
        $("#choices").text("");
        for (var i = 0; i < choicesArr.length; i++) {
        var buttonChoices = $("<button>");
        buttonChoices.attr("data-ans", i);
        buttonChoices.html(choicesArr[i]);
        $("#choices").append(buttonChoices);
        $("#choices").append("<br>");
        $('#images').hide();
            } 
        } else { 
            result();    
            }
        }

    function timer() {
        count--;
        if (count <= 0) {
        var answer = quiz[number].correct;
        var answerString = quiz[number].choices[answer];
        clearInterval(timeRemain);
        $("#timer").html("Time remaining : " + count + " secs");
        $("#question").text("Out of Time!");
        $("#choices").text("The correct answer was : " + answerString);
        $("#images").show();
        $("#images").html('<img id = "pic"  src = "assets/images/'+ picArray[number] +'.gif">');
        unAnswers++; 
        setTimeout(function() {
            nextQuestions();
        }, 2500)   
        } else {
        $("#timer").html("Time remaining : " + count + " secs");
        }
    };

    function nextQuestions() {
        $('#images').empty();
        number++;
        count = 30;
        timeRemain = setInterval(timer, 1000);
        $("#timer").html("Time remaining : " + count + " secs");
        questions(number);
    }

    function result() {
        $("#timer").hide();
        $("#question").text("All done, here how you did!");
        $("#choices").text("Correct Answers: " + correctAnswers);
        $("#choices").append("<br> Incorrect Answers: " + wrongAnswers);
        $("#choices").append("<br> Unanswers: " + unAnswers);
        var startOver = $("<button>");
            startOver.text("Start Over?");
            $("#startOver").html(startOver);
            $("#startOver").show();
    }

    $("#choices").on("click", "button", function(event) {
        var answer = quiz[number].correct;
        var answerString = quiz[number].choices[answer];
        var userPick = $(this).data("ans");
        if (userPick === answer) {
            $("#question").text("Correct!!!");
            $("#choices").text("The correct answer was : " + answerString);
            $("#images").show();
            $("#images").append('<img id = "pic" src = "assets/images/'+ picArray[number] +'.gif">');
            clearInterval(timeRemain);
            correctAnswers++;
            setTimeout(function() {
                nextQuestions();
            }, 2500)
        } else {
            $("#question").text("Wrong Answer!");
            $("#choices").text("The correct answer was : " + answerString);
            $("#images").show();
            $("#images").append('<img id = "pic"  src = "assets/images/'+ picArray[number] +'.gif">');
            clearInterval(timeRemain);
            wrongAnswers++;
            setTimeout(function() {
                nextQuestions();
            }, 2500)
        } 
    });

    $("#startOver").on("click",function(event) {
        correctAnswers = 0;
        wrongAnswers = 0;
        unAnswers = 0; 
        count = 30;
        number = 0;
        $(this).hide();
        $("#timer").show();
        $("#timer").html("Time remaining : " + count + " secs");
        questions(number);
    });
    beforestart();
});
