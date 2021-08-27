let player;
let bgImg;
let playerImg;
let obsImg;
let wordClassifier;
let obstacles = [];

function preload() {
  bgImg = loadImage("background.png");
  playerImg = loadImage("player.png");
  obsImg = loadImage("obstacle.png");
  let options = { probabilityThreshold: 0.85 };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(1050, 520);
  player = new Player();
  wordClassifier.classify(heardWord);
}

function heardWord(error, results) {
  console.log(results[0].label + " " + results[0].confindce);
  if (results[0].label == "up") {
    player.jump();
  }
}

function draw() {
  background(bgImg);
  player.show();
  player.move();

  if (random(1) < 0.01) {
    obstacles.push(new Obstacle());
  }
  for (let obs of obstacles) {
    obs.show();
    obs.move();
    if (player.collided(obs) == true) {
      console.log("GAME-OVER");
      noLoop();
    }
  }
}

function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}
