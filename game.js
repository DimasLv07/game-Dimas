
var userClickedPattern = [];
var level = 0
var userClickedPatternLenght = userClickedPattern.length
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false

$(document).on("keypress click", function() {
    if (!started) {
        $("#level-title").html("Level " + level)
        
        nextSequence()
        
        started = true
    }

   
})

function playSound(audio) {
    var sound = new Audio("sounds/" + audio + ".mp3")
    sound.play()
}

$(".btn").on("click keypress",function(e){

    var userChosenClour = e.target.id;
    userClickedPattern.push(userChosenClour)
    console.log(userClickedPattern)

    animatePress(userChosenClour)
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenClour)
});

function nextSequence() {
    
    userClickedPattern = [];
    level += 1;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    var idButton = "#" + randomChosenColour
    var pattern = $(idButton)
    

    showFullPattern()

    return gamePattern
}

function showFullPattern() {
    gamePattern.forEach((randomChosenColour,i) => {
        setTimeout(() => {
            $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
            playSound(randomChosenColour);
        }, i * 500)
    })
}


    


function animatePress(currentColor) {

    

    $("#" + currentColor).addClass("pressed"); setTimeout(() => {
        $(".btn").removeClass("pressed");
    }, 100)
}



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() {
                nextSequence()
            }, 1000)
        } 
        
    } else {
        startOver()
        var soundWrong = new Audio("sounds/wrong.mp3")
            soundWrong.play()
            $("#level-title").html("Game Over, Press Any Key to Restart")
            $("body").addClass("game-over"); setTimeout(function(){
                $("body").removeClass("game-over")
            }, 200)
        console.log("wrong")
    }
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
}
