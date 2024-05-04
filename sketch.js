p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
let textBox
let font
let CELLSIZE
let cellNumber = 15
function preload() {
  font = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
}
let ratio = 1;
let W, H;

let tick
let render
let tryMove

let InstanceGameLoop = null
let InstanceFactory = null
let InstanceTargetPos = null
let InstancePlayer = null
let InstanceBattle = null
let InstanceTextBox = null

window.addEventListener("e-start-battle", (E) => {
  InstanceBattle = new BattleSystem(InstancePlayer, E['detail'])
  console.log(E['detail'])
})

window.addEventListener("e-pickup", (E) => {
  console.log('add item pickup logic later')
  console.log(E['detail'])
})

window.addEventListener("e-player-freeze", (E) => {
  InstancePlayer.setIsFrozen(true)
})

window.addEventListener("e-player-unfreeze", (E) => {
  InstancePlayer.setIsFrozen(false)
})

function setup() {
  window.innerHeight <= window.innerWidth
    ? ((W = Math.max(window.innerHeight, 1) * ratio),
      (H = Math.max(window.innerHeight, 1)))
    : ((W = Math.max(window.innerWidth, 1)),
      (H = Math.max(window.innerWidth, 1) / ratio));
  CELLSIZE = floor(W / cellNumber)
  createCanvas(CELLSIZE * cellNumber, CELLSIZE * cellNumber);
  textFont(font)

  if (!InstanceGameLoop) {
    InstanceGameLoop = new GameLoop();
  }
  if (InstanceGameLoop) {
    InstanceGameLoop.stop()
  }
  if (!InstanceFactory) {
    InstanceFactory = new Factory()
  }
  if (!InstancePlayer) {
    let playerImage = createGraphics(50, 50)
    playerImage.background(255, 0, 0)
    InstancePlayer = new Assassin({
      thePos: createVector((4), (4)),
      theSize: createVector(CELLSIZE, CELLSIZE),
      theImage: playerImage,
      theName: "Tester",
      theHitPoints: 1000,
      theAttack: new Attack(100, 100),
      theStamina: 10,
      theBag: [],
      theBlockPercentage: 100,
      theSpecialAttack: new Attack(200, 100)
    });
    InstanceTargetPos = InstancePlayer.getPos().copy()
  }
  InstancePlayer.setSize(createVector(CELLSIZE, CELLSIZE))



  // frameRate(60)
  // pixelDensity(4)
  let obstacleImage = createGraphics(CELLSIZE, CELLSIZE)
  obstacleImage.background(0, 0, 0)
  // for (let a = 0; a < 10000; a++) {
  //   InstanceFactory.addEntity(new Sprite({ thePos: createVector(getCellToPos(round(random(-100,100))), getCellToPos(4)), theSize: createVector(CELLSIZE,CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))
  // }
  InstanceFactory.addEntity(new Ogre({ thePos: createVector((0), (4)), theSize: createVector(CELLSIZE, CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))
  InstanceFactory.addEntity(new HealthPotion({ thePos: createVector((2), (4)), theSize: createVector(CELLSIZE, CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))






  tryMove = () => {


    let potentialTargetPos = InstanceTargetPos.copy()
    let newDirection = null;
    if(!isPaused) {
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
        potentialTargetPos.add(createVector(1, 0));
        newDirection = 'east'
      } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
        potentialTargetPos.add(createVector(-1, 0));
        newDirection = 'west'
      } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
        potentialTargetPos.add(createVector(0, -1));
        newDirection = 'north'
      } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
        potentialTargetPos.add(createVector(0, 1));
        newDirection = 'south'
      } else {
        return
      }
    }


    if (!InstanceFactory.checkCollision(potentialTargetPos)) {
      InstanceTargetPos = potentialTargetPos

    } else {
      console.log('colliding')
    }
    InstancePlayer.setDirection(newDirection)

  }


  InstanceGameLoop.setTickFunction(
    (time) => {
      // console.log(time)
  
      if (!InstancePlayer.getIsFrozen()) {
        let distance = moveTowards(InstancePlayer, InstanceTargetPos, 1/25)
        if (distance <= 0) {
          tryMove()
        }
      }
    }
  )
  InstanceGameLoop.setRenderFunction(
    () => {
      background(0);
  
      push()
      translate((width / 2 - getCellToPos(InstancePlayer.getPos().x) - CELLSIZE / 2), (height / 2 - getCellToPos(InstancePlayer.getPos().y) - CELLSIZE / 2));
      // drawGridDebug()
  
      // InstanceFactory.drawDungeon(player)
      InstanceFactory.drawOverworld(InstancePlayer)
  
      InstanceFactory.draw(InstancePlayer)
  
      InstancePlayer.draw()
  
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
  )
  InstanceGameLoop.start()


  if (!InstanceTextBox) {
    InstanceTextBox = new TextBox()
    InstanceTextBox.loop.start();
    InstanceTextBox.add({text:"The game is still in development", x:10, y:window.height-100, width:window.width})
    InstanceTextBox.add({text:"Good Luck and Have fun", x:10, y:window.height-100, width:window.width})
    InstanceTextBox.add({text:"Explore the dungeon and find the Keys to OO", x:10, y:window.height-100, width:window.width})
    InstanceTextBox.add({text:"Welcome to the Dungeon traveler", x:10, y:window.height-100, width:window.width})
  
  }

  

}

// function draw() {
//   tick()
//   render()
// }

function windowResized() {

  setup()
}

let isPaused = false;

function mouseClicked() {
  InstanceTextBox.nextText();
  //console.log(textBox);
}

function keyPressed() {
  if (keyCode === 27 || keyCode === 80) { // escape key or p
    console.log(keyCode)
    isPaused = !isPaused
  }

  if (keyCode === 32) { // space key
    InstanceFactory.interact(InstancePlayer)
  }

  if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
    InstanceBattle.turn("move_basic");
    InstanceTextBox.add({test:"reaction text", x:width/2, y:height/2, width:100});
    console.log("this reaches")
    console.log(InstanceTextBox.children)
  } else if (keyIsDown(50)) { //2 button temporary subsitiution key 2 supermove
    InstanceBattle.turn("move_special");
  } else if (keyIsDown(51)) { //3 button temporary subsitiution key 3 heal
    InstanceBattle.turn("move_buff");
  } else if (keyIsDown(52)) { //4 button temporary subsitiution key 4 open bag /use potion
    InstanceBattle.turn("move_bag");
  } else {
    return
  }
}

function drawGridDebug() {

  push()
  strokeWeight(width / 500)
  for (let a = 0; a < cellNumber; a += 1) {

    for (let b = 0; b < cellNumber; b += 1) {
      rect(b * CELLSIZE, a * CELLSIZE, CELLSIZE)
    }
  }
  pop()
}

function getCellToPos(theIndex) {
  return CELLSIZE * theIndex
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