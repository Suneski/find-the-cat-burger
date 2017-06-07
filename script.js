var grid = document.querySelector(".grid");
var audioOn = document.querySelector("#audio-on");
var audioOff = document.querySelector("#audio-off");

var body = document.querySelector('body');
var difficulty = document.querySelector('#difficulty');
var confirm = document.querySelector('#confirm');
var intro = document.querySelector('#intro');
var yes = document.querySelector("#yes");
var no = document.querySelector("#no");
var initialDecision = document.querySelector("#initial-decision");

var missionAccepted = document.querySelector("#mission-accepted");
var missionRejected = document.querySelector("#mission-rejected");

var proceed = document.querySelector("#proceed");

var ghost = document.querySelector("#ghost");
var burger = document.querySelector("#burger");
var ghostGameOver = document.querySelector("#ghost-game-over");
var burgerCatVictory = document.querySelector("#burger-cat-victory");
var attempts = document.querySelector("#attempts");
var ghostParty = document.querySelector("#ghost-party");
var burgerRain = document.querySelector("#burger-rain");
var pumpkin = document.querySelector('#pumpkin-man');

var spookyMusic = new Audio('audio/spookyMusic.mp4');
var celebrate = new Audio('audio/celebrate.mp4');
var hallelujah = new Audio('audio/hallelujah.m4a');
var tooSexy = new Audio('audio/tooSexy.m4a');
var wompWomp = new Audio('audio/womp-womp.mp4');

var music = [spookyMusic, celebrate, hallelujah, tooSexy, wompWomp];

audioOn.addEventListener('click', function() {

  music.forEach(function(song) {
    song.muted = true;
  });

  audioOn.style.display = "none";
  audioOff.style.display = "block";

});

audioOff.addEventListener('click', function() {

  music.forEach(function(song) {
    song.muted = false;
  });

  audioOn.style.display = "block";
  audioOff.style.display = "none";

});

confirm.addEventListener('click', function() {
  difficulty.style.display = "none";
  intro.style.display = "block";

  audioOn.style.display = "block";

  gridBoxes()
});

initialDecision.addEventListener('click', function(evt) {
  if (evt.target === yes) {
    intro.style.display = "none";
    missionAccepted.style.display = "block";
  }

  if (evt.target === no) {
    intro.style.display = "none";
    missionRejected.style.display = "block";
    spookyMusic.pause();
    wompWomp.play();
  }
});

proceed.addEventListener('click', function() {
  missionAccepted.style.display = "none";
  grid.style.display = "block";
  body.style.backgroundColor = "black";
});

function gridBoxes() {

  var selectDifficulty = document.querySelector("#selectDifficulty").selectedIndex;
  var selectedDifficulty = document.getElementsByTagName("option")[selectDifficulty].value;

  var totalSquares;
  var boxDiv = document.querySelector(".grid div");

  if (selectedDifficulty === "easy") {
    totalSquares = 9;
  }
  if (selectedDifficulty === "medium") {
    totalSquares = 25;
  }
  if (selectedDifficulty === "hard") {
    totalSquares = 100;
  }
  if (selectedDifficulty === "good-luck") {
    totalSquares = 2500;
  }

  for (var i = 0; i < totalSquares; i++) {

    var div = document.createElement('div');
    div.classList.add("box-" + (i+1));

    if (totalSquares === 9) {
      div.style.width = 33.333 + "%";
      div.style.height = 33.333 + "%";
    }
    if (totalSquares === 25) {
      div.style.width = 20 + "%";
      div.style.height = 20 + "%";
    }
    if (totalSquares === 100) {
      div.style.width = 10 + "%";
      div.style.height = 10 + "%";
    }
    if (totalSquares === 2500) {
      div.style.width = 2 + "%";
      div.style.height = 2 + "%";
    }

    grid.appendChild(div);
  }

  console.log(totalSquares);

  var ghostRandomNumber = Math.ceil((Math.random() * totalSquares));

  var burgerRandomNumber = Math.ceil((Math.random() * totalSquares));

  if (ghostRandomNumber === burgerRandomNumber && ghostRandomNumber < totalSquares) {
    burgerRandomNumber = ghostRandomNumber + 1;
  }

  if (ghostRandomNumber === burgerRandomNumber && ghostRandomNumber === totalSquares) {
    burgerRandomNumber = 13;
  }

  console.log("ghost: " + ghostRandomNumber);
  console.log("burger: " + burgerRandomNumber);

  var ghostLocation = document.getElementsByClassName("box-" + ghostRandomNumber)[0].appendChild(ghost);

  var burgerLocation = document.getElementsByClassName("box-" + burgerRandomNumber)[0].appendChild(burger);

  spookyMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  spookyMusic.play();
}

var counter = 5;
attempts.textContent = "Remaining Attempts: " + counter;

grid.addEventListener('click', function(evt) {


  if (evt.target !== burger && evt.target !== ghost) {
    counter -= 1;
    attempts.textContent = "Remaining Attempts: " + counter;
  }

  if (evt.target === burger || evt.target === ghost || counter === 0) {
    attempts.style.display = "none";
  }

  if (counter === 0) {
    spookyMusic.pause();
    tooSexy.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    tooSexy.play();
    setTimeout(function () {
      grid.style.display = "none";
      pumpkin.style.display = "block";
    }, 500);
  }

  if (evt.target === burger) {
    burger.style.opacity = "1";


    setTimeout(function () {
      burgerCatVictory.style.display = "block";
      burger.style.display = "absolute";
      burger.style.width = 800 + "px";
      burger.style.height = 800 + "px";
      burgerLocation = document.getElementsByClassName("box-1")[0].appendChild(burger);
      spookyMusic.pause();
      hallelujah.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      hallelujah.play();
    }, 500);

    setTimeout(function () {
      grid.style.display = "none";
      burgerRain.style.display = "block";
    }, 2000);

    ghost.style.display = "none";
  }

  if (evt.target === ghost) {
    ghost.style.opacity = "1";

    setTimeout(function () {
      ghostGameOver.style.display = "block";
      ghost.style.display = "absolute";
      ghost.style.width = 800 + "px";
      ghost.style.height = 800 + "px";
      ghostLocation = document.getElementsByClassName("box-1")[0].appendChild(ghost);
    }, 500);

    setTimeout(function () {
      grid.style.display = "none";
      ghostParty.style.display = "block";
      spookyMusic.pause();
      celebrate.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      celebrate.play();
    }, 2000);

    burger.style.display = "none";
  }
});
