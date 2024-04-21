
let player
let font
let cellSize
let targetPos
function preload() {
  font = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
}
function setup() {
  createCanvas(512, 512);

  cellSize = width / 16
  textFont(font)

  // frameRate(60)
  // pixelDensity(4)
  let playerImage = createGraphics(50, 50)
  playerImage.background(255, 0, 0)
  player = new Sprite(createVector(getCell(8), getCell(8)), createVector(cellSize, cellSize), playerImage)
  targetPos = player.getPos().copy()
  let gameLoop = new GameLoop(tick, render)
  gameLoop.start()
}

// function draw() {
//   tick()
//   render()
// }

const tick = () => {
  let distance = moveTowards(player, targetPos, 2)
  if (distance <= 1) {
    tryMove()
  }

}

const tryMove = () => {

  let nextPos = targetPos
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
    nextPos.add(createVector(cellSize, 0));
  } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
    nextPos.add(createVector(-cellSize, 0));
  } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
    nextPos.add(createVector(0, -cellSize));
  } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
    nextPos.add(createVector(0, cellSize));
  } else {
    return
  }


  targetPos.set(nextPos)
}
const render = () => {
  background(220);
  
  push()
  translate(width / 2 - player.getPos().x, height / 2 - player.getPos().y);
  drawGridDebug()

  // circle(width / 2, height / 2, 200)

  player.draw()
  pop()


  textSize(32);
  text(round(frameRate()), 0, 32)


}

function drawGridDebug() {
  for (let a = 0; a < height; a += cellSize) {
    for (let b = 0; b < width; b += cellSize) {
      rect(b, a, cellSize)
    }
  }
}

function getCell(theIndex) {
  return cellSize * theIndex
}

function moveTowards(person, destinationPosition, speed) {

  let distance = dist(destinationPosition.x, destinationPosition.y, person.getPos().x, person.getPos().y)

  if (distance <= speed) {
    // If we're close enough, just move directly to the destination
    person.getPos().set(destinationPosition)
  } else {
    // Otherwise, move by the specified speed in the direction of the destination
    let normalized = createVector(destinationPosition.x - person.getPos().x, (destinationPosition.y - person.getPos().y)).normalize()
    person.getPos().add(normalized.x * speed, normalized.y * speed)

    // Recalculate remaining distance after the move
    distance = dist(destinationPosition.x, destinationPosition.y, person.getPos().x, person.getPos().y)
  }

  return distance;
}