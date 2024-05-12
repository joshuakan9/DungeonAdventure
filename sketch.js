
p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
let textBox
let font
let CELLSIZE
let TILEMAP
let cellNumber = 15
function preload() {
  font = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
  TILEMAP = loadImage('./assets/images/tilemap.png')
}
let ratio = 1;
let W, H;

let tick
let render
let tryMove
let M

let InstanceTransition = null
let InstanceGameLoop = null
let InstanceFactory = null
let InstanceTargetPos = null
let InstancePlayer = null
let InstanceBattle = null
let InstanceTextBox = null


window.addEventListener("e-battle-start", (E) => {

  InstanceTextBox.add({text:E['detail'].getName()+" battle", x:10, y:window.height-100, width:window.width})

  
  console.log(E['detail'])
})

window.addEventListener("e-battle-end", (E) => {
  window.dispatchEvent(new Event('e-player-unfreeze'))
  console.log('battle end')
})

window.addEventListener("e-textbox-add", (E) => {
  // InstanceTextBox.add()

})

window.addEventListener("e-pickup", (E) => {
  console.log('add item pickup logic later')
  console.log("Found a " + E['detail'].getName() + "!")
  // console.log(E['detail'])
})

window.addEventListener("e-player-freeze", (E) => {
  InstancePlayer.setIsFrozen(1)
})

window.addEventListener("e-player-unfreeze", (E) => {
  InstancePlayer.setIsFrozen(-1)
})
let TILEMAP_ASSASSIN
function setup() {
  TILEMAP_ASSASSIN = TILEMAP.get(32*16, 2 * 16, 9* 16, 2 * 16)
  // randomSeed(0)
  window.innerHeight <= window.innerWidth
    ? ((W = Math.max(window.innerHeight, 1) * ratio),
      (H = Math.max(window.innerHeight, 1)))
    : ((W = Math.max(window.innerWidth, 1)),
      (H = Math.max(window.innerWidth, 1) / ratio));
  CELLSIZE = floor(W / cellNumber)
  createCanvas(CELLSIZE * cellNumber, CELLSIZE * cellNumber);
  M = CELLSIZE / 16
  textFont(font)

  InstanceTransition  = new TransitionEffect();
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
      thePos: createVector((1), (1)),
      theSize: createVector(CELLSIZE, CELLSIZE * 2),
      theImage: TILEMAP_ASSASSIN,
      theHFrames: 9,
      theVFrames: 1,
      theFrame: 0,
      theFrameSize: createVector(16,32),
      theOffset: (theCellSize) => createVector(0, -theCellSize * 1.2),
      theName: "Tester",
      theHitPoints: 1000,
      theAttack: new Attack(100, 100),
      theStamina: 10,
      theBag: [],
      theBlockPercentage: 100,
      theSpecialAttack: new Attack(200, 100),
      theAnimation: new Animations({
        stand: new FrameIndexPattern(ANIM_HERO_STAND),
        walk: new FrameIndexPattern(ANIM_HERO_WALK)
      }),
    });
    
    InstanceTargetPos = InstancePlayer.getPos().copy()
  }
  InstancePlayer.setSize(createVector(CELLSIZE, CELLSIZE * 2))



  // frameRate(60)
  // pixelDensity(4)
  let obstacleImage = createGraphics(CELLSIZE, CELLSIZE)
  obstacleImage.background(0, 0, 0)
  // for (let a = 0; a < 10000; a++) {
  //   InstanceFactory.addEntity(new Sprite({ thePos: createVector(getCellToPos(round(random(-100,100))), getCellToPos(4)), theSize: createVector(CELLSIZE,CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))
  // }
  InstanceFactory.addEntity(new Ogre({
    thePos: createVector((0), (4)),
    theSize: createVector(CELLSIZE, CELLSIZE),
    theImage: obstacleImage,
    theName: "Ogre",
    theHitPoints: 100,
    theAttack: new Attack(100, 100),
    theStamina: 10,
    theBag: [],
    theBlockPercentage: 100,
    theSpecialAttack: new Attack(200, 100),
    theHeal: new Heal(10,100)
  }))
  InstanceFactory.addEntity(new HealthPotion({ thePos: createVector((2), (4)), theSize: createVector(CELLSIZE, CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))






  tryMove = () => {


    let potentialTargetPos = InstanceTargetPos.copy()
    let newDirection = null;
    if(!isPaused) {
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
        potentialTargetPos.add(createVector(1, 0));
        newDirection = 'east'
        InstancePlayer.playAnimation('walk')
      } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
        potentialTargetPos.add(createVector(-1, 0));
        newDirection = 'west'
        InstancePlayer.playAnimation('walk')
      } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
        potentialTargetPos.add(createVector(0, -1));
        newDirection = 'north'
        InstancePlayer.playAnimation('walk')
      } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
        potentialTargetPos.add(createVector(0, 1));
        newDirection = 'south'
        InstancePlayer.playAnimation('walk')
      } else {
        InstancePlayer.playAnimation('stand')
        return
      }
    }


    if (!InstanceFactory.checkCollision(InstancePlayer, potentialTargetPos)) {
      InstanceTargetPos = potentialTargetPos
    } else {
      console.log('colliding')
    }

    InstancePlayer.setDirection(newDirection)
    if (InstanceFactory.checkDoor(InstancePlayer, potentialTargetPos)) {
      InstanceTargetPos = InstancePlayer.getPos()
    }


  }


  InstanceGameLoop.setTickFunction(
    (time) => {
      // console.log(time)
  
      if (!InstancePlayer.getIsFrozen()) {

        let distance = moveTowards(InstancePlayer, InstanceTargetPos, 1/25)
        if (distance <= 0.01) {
          tryMove()
        }
        InstancePlayer.step(time)
      }
    }
  )
  InstanceGameLoop.setRenderFunction(
    () => {
      background(0);
  
      push()
      translate(round(width / 2 - getCellToPos(InstancePlayer.getPos().x) - CELLSIZE / 2), round(height / 2 - getCellToPos(InstancePlayer.getPos().y) - CELLSIZE / 2));
      // drawGridDebug()
  
      // InstanceFactory.drawDungeon(InstancePlayer)
      // InstanceFactory.drawOverworld(InstancePlayer)
  
      InstanceFactory.draw(InstancePlayer)
      InstanceFactory.drawDungeon(InstancePlayer)
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
      // image(TILEMAP_PLAYER,0,0)
    }
  )
  InstanceGameLoop.start()


  if (InstanceTextBox) {
    InstanceTextBox.loop.stop()
    let newTextBox = new TextBox()
    newTextBox.timeCurrent = InstanceTextBox.timeCurrent
    newTextBox.currentTextEnd = InstanceTextBox.currentTextEnd
    newTextBox.children = InstanceTextBox.children
    InstanceTextBox = newTextBox
    InstanceTextBox.loop.start()
  }
  if (!InstanceTextBox) {
    InstanceTextBox = new TextBox()
    InstanceTextBox.loop.start();


    //InstanceTextBox.add({text:"Welcome to the Dungeon traveler", x:null, y:null, width:null, height:null, textSize: null})
    //InstanceTextBox.add({text:"The game is still in development", x:null, y:null, width:null, height:null, textSize: null})
    //InstanceTextBox.add({text:"Explore the dungeon and find the Keys to OO", x:null, y:null, width:null, height:null, textSize: null})
    //InstanceTextBox.add({text:"Good Luck and Have fun", x:null, y:null, width:null, height:null, textSize: null})
  }
  console.log(InstanceTextBox.children)

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
  console.log(InstanceTextBox)
  //console.log(textBox);
}

function keyPressed() {
  if (!InstancePlayer.getIsFrozen()) {

  
    if (keyCode === 27 || keyCode === 80) { // escape key or p
      console.log(keyCode)
      isPaused = !isPaused
    }
    if (keyCode === 32) { // space key
      InstanceFactory.interact(InstancePlayer)
    }

  }
  // Key for testing transitions
  if (keyIsDown(48)) {
    console.log("this works")
    InstanceTransition.transition();
  } 
 
  if (InstanceBattle && InstanceBattle.inCombat) {
    if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
      InstanceBattle.turn("move_basic");
      // InstanceTextBox.add({test:"reaction text", x:width/2, y:height/2, width:100});
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



}

function drawGridDebug() {

  push()
  fill(255)
  strokeWeight(width / 500)
  for (let a = 0; a < cellNumber; a += 1) {

    for (let b = 0; b < cellNumber; b += 1) {
      rect(getCellToPos(b), getCellToPos(a), CELLSIZE)
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