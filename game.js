// created a new array called buttonColours
function goToNewPage()
    {
        var url = document.getElementById('dropdown-list').value;
        if(url != 'none') {
            window.location = url;
        }
    }

    
var buttonColours = ["red", "blue", "green", "yellow","purple","pink","orange","golden"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  document.getElementById("level-title").innerText = "Level 1";
  $(document).ready(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
}
else{
  document.getElementById("level-title").innerText = "Press any key to start";
  $(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
}
// new function is created called nextSequence()
var currenturl = window.location.href;
var spliturl = currenturl.toString().split("/");
var number  = 0;

if(spliturl[spliturl.length-1] == 'easy.html'){
  number = 4;
}
if(spliturl[spliturl.length-1] == 'medium.html'){
  number = 6;
}
if(spliturl[spliturl.length-1] == 'hard.html'){
  number = 8;
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Please wait for 2 seconds 😉");


      setTimeout(function () {
        window.location.reload();
      }, 2000);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * number);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

