p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
let testClasses
let player
let font
let cellSize
let cellNumber = 15
let targetPos
function preload() {
  font = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
}
let ratio = 1;
let W, H;

let tick
let render
let tryMove

let battleTest
let gameLoop
let FactoryInstance

function setup() {

  if (gameLoop) {
    gameLoop.stop()
  }

  window.innerHeight <= window.innerWidth
    ? ((W = Math.max(window.innerHeight, 1) * ratio),
      (H = Math.max(window.innerHeight, 1)))
    : ((W = Math.max(window.innerWidth, 1)),
      (H = Math.max(window.innerWidth, 1) / ratio));
  cellSize = floor(W / cellNumber)
  createCanvas(W, H);
  // might need to use below instead if glitches occur with current way
  //  createCanvas(cellSize * cellNumber, cellSize * cellNumber);

  textFont(font)

  // frameRate(60)
  // pixelDensity(4)
  let obstacleImage = createGraphics(cellSize, cellSize)
  obstacleImage.background(0, 0, 0)
  FactoryInstance = new Factory()
  FactoryInstance.addEntity(new Sprite({ thePos: createVector(getCell(0), getCell(0)), theSize: createVector(cellSize, cellSize), theImage: obstacleImage, theIsCollideable: true }))
  FactoryInstance.addEntity(new Sprite({ thePos: createVector(getCell(9), getCell(4)), theSize: createVector(cellSize, cellSize), theImage: obstacleImage, theIsCollideable: true }))
  // for (let a = 0; a < 10000; a++) {
  //   FactoryInstance.addEntity(new Sprite({ thePos: createVector(getCell(round(random(-100,100))), getCell(4)), theSize: createVector(cellSize,cellSize), theImage: obstacleImage, theIsCollideable: true }))
  // }
  FactoryInstance.addEntity(new Ogre({ thePos: createVector(getCell(0), getCell(4)), theSize: createVector(cellSize, cellSize), theImage: obstacleImage, theIsCollideable: true }))


  let playerImage = createGraphics(50, 50)
  playerImage.background(255, 0, 0)
  player = new Character({ thePos: createVector(getCell(3), getCell(3)), theSize: createVector(cellSize, cellSize), theImage: playerImage })
  targetPos = player.getPos().copy()

  tryMove = () => {


    let potentialTargetPos = targetPos.copy()
    let newDirection = null;
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
      potentialTargetPos.add(createVector(cellSize, 0));
      newDirection = 'east'
    } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
      potentialTargetPos.add(createVector(-cellSize, 0));
      newDirection = 'west'
    } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
      potentialTargetPos.add(createVector(0, -cellSize));
      newDirection = 'north'
    } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
      potentialTargetPos.add(createVector(0, cellSize));
      newDirection = 'south'
    } else {
      return
    }


    if (!FactoryInstance.checkCollision(potentialTargetPos)) {
      targetPos = potentialTargetPos

    } else {
      console.log('colliding')
    }
    player.setDirection(newDirection)

  }
  tick = (time) => {
    // console.log(time)
    let distance = moveTowards(player, targetPos, cellSize / 17)
    if (distance <= 1) {
      tryMove()
    }

  }
  render = () => {
    background(0);

    push()
    translate(round(width / 2 - player.getPos().x - cellSize / 2), round(height / 2 - player.getPos().y - cellSize / 2));
    // drawGridDebug()

    // circle(width / 2, height / 2, 200)
    FactoryInstance.drawOverworld()
    FactoryInstance.draw(player)

    player.draw()

    pop()


    push()
    fill('red')
    textSize(width / 10);
    text(round(frameRate()), 0, width / 10)

    pop()


    if (isPaused) {
      push()
      rectMode(CENTER)
      rect(width / 2, height / 2, width / 2)
      pop()
    }

  }
  gameLoop = new GameLoop(tick, render)
  gameLoop.start()

  // let textBox = new TextBox()
  // textBox.loop.start()
  // textBox.add({text:"HELLO", x:width/2, y:height/2, width:100})
  testClasses = new Assassin({
    thePos: createVector(getCell(4), getCell(4)),
    theSize: createVector(cellSize, cellSize),
    theImage: playerImage,
    theName: "Tester",
    theHitPoints: 1000,
    theAttack: new Attack(100, 100),
    theStamina: 10,
    theBag: [],
    theBlockPercentage: 100,
    theSpecialAttack: new Attack(200, 100)
  });

  testMob = new Ogre({
    thePos: createVector(getCell(4), getCell(4)),
    theSize: createVector(cellSize, cellSize),
    theImage: playerImage,
    theName: "TesterMob",
    theHitPoints: 1000,
    theAttack: new Attack(100, 100),
    theHeal: new Heal(50, 100)
  });

  battleTest = new BattleSystem(testClasses, testMob);
}

// function draw() {
//   tick()
//   render()
// }

function windowResized() {

  setup()
}

let isPaused = false
function keyPressed() {
  if (keyCode === 27 || keyCode === 80) { // escape key or p
    console.log(keyCode)
    isPaused = !isPaused
  }

  if (keyCode === 32) { // space key
    FactoryInstance.interact(player)
  }

  if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
    battleTest.turn("move_basic");
  } else if (keyIsDown(50)) { //2 button temporary subsitiution key 2 supermove
    battleTest.turn("move_special");
  } else if (keyIsDown(51)) { //3 button temporary subsitiution key 3 heal
    battleTest.turn("move_buff");
  } else if (keyIsDown(52)) { //4 button temporary subsitiution key 4 open bag /use potion
    battleTest.turn("move_bag");
  } else {
    return
  }
}

function drawGridDebug() {

  push()
  strokeWeight(width / 500)
  for (let a = 0; a < cellNumber; a += 1) {

    for (let b = 0; b < cellNumber; b += 1) {
      rect(b * cellSize, a * cellSize, cellSize)
    }
  }
  pop()
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