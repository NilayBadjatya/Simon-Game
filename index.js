var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
document.addEventListener("keydown", function () {
  gamePattern = [];
  level = 0;
  if (!started) {
    nextSequence();
    started = true;
  }
});
for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
  document
    .querySelectorAll(".btn")
    [i].addEventListener("click", function (event) {
      var userChosenColor = event.target.id;
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      document.getElementById(userChosenColor).classList.add("pressed");
      setTimeout(() => {
        document.getElementById(userChosenColor).classList.remove("pressed");
      }, 100);
      checkAnswer(userClickedPattern.length - 1);
      //   console.log(userClickedPattern);
    });
}
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  document.querySelector("h1").innerHTML = "Level " + level;
}
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 100);
    document.querySelector("h1").innerHTML =
      "Game Over, Press Any Key to Restart";
    started = false;
  }
}

/* function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
 */
