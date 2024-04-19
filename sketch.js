
let player
function preload() {
}
function setup() {
  createCanvas(512, 512);
  let playerImage = createGraphics(50, 50)
  playerImage.background(255, 0, 0)
  player = new Sprite(createVector(width / 2, height / 2), playerImage, createVector(100, 100))
}

function draw() {
  background(220);
  // circle(width / 2, height / 2, 200)

  let playerCurrentPos = player.getPos()
  if (keyIsDown(68)) { //D right
    player.setPos(createVector(playerCurrentPos.x + 5, playerCurrentPos.y));
  }
  if (keyIsDown(65)) { //A left
    player.setPos(createVector(playerCurrentPos.x - 5, playerCurrentPos.y));
  }
  if (keyIsDown(87)) { //W up
    player.setPos(createVector(playerCurrentPos.x, playerCurrentPos.y - 5));
  }
  if (keyIsDown(83)) { //S down
    player.setPos(createVector(playerCurrentPos.x, playerCurrentPos.y + 5));

  }
  player.draw()
}