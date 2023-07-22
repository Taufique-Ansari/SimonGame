var buttonColor = ["red", "green", "blue", "yellow"];
var started = false;
var level = 0;

var userClickedPattern = [];
var gamePattern = [];

$(document).keypress(function() {
    if(!started){
        $("level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animateBtn(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currLvl){
    if(gamePattern[currLvl] === userClickedPattern[currLvl]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomColor = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomColor];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animateBtn(currColor){
    $("#" + currColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currColor).removeClass("pressed");
    },100)
}

function playSound(name){
    var audio = new Audio("sounds2/"+name+".mp3");
    audio.play();
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}