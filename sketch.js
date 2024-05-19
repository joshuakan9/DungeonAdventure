
p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
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

let instanceTransition = new TransitionEffect()
let instanceGameLoop = null
let instanceFactory = null
let instanceTargetPos = null
let instancePlayer = null
let instanceBattle = null
let instanceTextBox = null
let instanceBattleDisplay = null


window.addEventListener("e-battle-start", (E) => {
  let entityCount = this.instanceFactory.getEntityCount();

  instanceTextBox.add({text:E['detail'].getName()+" battle"})
  instanceBattle = new BattleSystem(instancePlayer, E['detail'])
  instanceBattleDisplay = new BattleDisplay(instanceBattle);
  BattleDisplay.displayBattle();
  console.log(E['detail'])
})

window.addEventListener("e-battle-end", (E) => {
  window.dispatchEvent(new Event('e-player-unfreeze'))
  console.log('battle end')
})

window.addEventListener("e-textbox-add", (E) => {
  // instanceTextBox.add()
})

window.addEventListener('e-transition', (E) => {
  instanceTransition.transition();
  console.log("here")
})

window.addEventListener("e-pickup", (E) => {
  instanceTextBox.add({text:"Found a " + E['detail'].getName() + "!"})
  window.dispatchEvent(new CustomEvent("e-entity-remove", E))
  // instanceFactory.removeEntity(E['detail'])
})

window.addEventListener("e-entity-remove", (E) => {
  instanceFactory.removeEntity(E['detail'])
})

window.addEventListener("e-player-freeze", (E) => {
  instancePlayer.setIsFrozen(1)
})

window.addEventListener("e-player-unfreeze", (E) => {
  instancePlayer.setIsFrozen(-1)
})

window.addEventListener("e-player-die", (E) => {
    instanceTextBox.add({text:"You died!"})
});

window.addEventListener("e-player-win", (E) => {
    instanceTextBox.add({text:"You win!"})
});

window.addEventListener("e-player-block", (E) => {
    instanceTextBox.add({text:instancePlayer.getName() + " has blocked!", x:1, y:.2, width:.5, height:.2, textSize:.02});
});
window.addEventListener("e-player-heal", (E) => {
    instanceTextBox.add({text:instancePlayer.getName() + " has healed!", x:1, y:.2, width:.5, height:.2, textSize:.02});
});

window.addEventListener("e-player-miss", (E) => {
    instanceTextBox.add({text:instancePlayer.getName() + " has missed!", x:1, y:.2, width:.5, height:.2, textSize:.02});
});
window.addEventListener("e-mob-attack", (E) => {
    instanceTextBox.add({text:E['detail'].getName() + " has attacked!", x:1, y:.2, width:.5, height:.2, textSize:.02});
});

window.addEventListener("e-mob-miss", (E) => {
    instanceTextBox.add({text:E['detail'].getName() + " has missed!", x:1, y:.2, width:.5, height:.2, textSize:.02});
})




let TILEMAP_ASSASSIN
let TILEMAP_OGRE
let TILEMAP_SKELETON
let TILEMAP_GREMLIN
let TILEMAP_POTION_HEALTH
function setup() {
  TILEMAP_ASSASSIN = TILEMAP.get(32*16, 2 * 16, 9* 16, 2 * 16)
  TILEMAP_OGRE = TILEMAP.get(23*16, 10 * 16, 9* 16, 2 * 16)
  TILEMAP_SKELETON = TILEMAP.get(23*16, 4 * 16, 9* 16, 2 * 16)
  TILEMAP_GREMLIN = TILEMAP.get(23*16, 20 * 16, 9* 16, 2 * 16)
  TILEMAP_POTION_HEALTH = TILEMAP.get(18*16, 13 * 16, 1 * 16, 1 * 16)

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
  if (!instanceGameLoop) {
    instanceGameLoop = new GameLoop();
  }
  if (instanceGameLoop) {
    instanceGameLoop.stop()
  }
  if (!instanceFactory) {
    instanceFactory = new Factory()
  }


  if (!instancePlayer) {
    let playerImage = createGraphics(50, 50)
    playerImage.background(255, 0, 0)
    instancePlayer = new Assassin({
      thePos: createVector((6), (6)),
      theSize: createVector(1, 2),
      theImage: TILEMAP_ASSASSIN,
      theHFrames: 9,
      theVFrames: 1,
      theFrame: 0,
      theFrameSize: createVector(16,32),
      theOffset: createVector(0, -1.2),
      theName: "Tester",
      theHitPoints: 1000,
      theAttack: new Attack(100, 100),
      theStamina: 10,
      theBag: [],
      theBlockPercentage: 100,
      theSpecialAttack: new Attack(200, 100),
      theAnimation: new Animations({
        stand: new FramePattern(ANIM_STAND),
        walk: new FramePattern(ANIM_WALK)
      }),
    });
    
    instanceTargetPos = instancePlayer.getPos().copy()
  }
  // instancePlayer.setSize(createVector(CELLSIZE, CELLSIZE * 2))



  // frameRate(60)
  // pixelDensity(4)
  let obstacleImage = createGraphics(CELLSIZE, CELLSIZE)
  obstacleImage.background(0, 0, 0)
  // for (let a = 0; a < 10000; a++) {
  //   instanceFactory.addEntity(new Sprite({ thePos: createVector(getCellToPos(round(random(-100,100))), getCellToPos(4)), theSize: createVector(CELLSIZE,CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))
  // }






  tryMove = () => {


    let potentialTargetPos = instanceTargetPos.copy()
    let newDirection = null;
    if(!IS_PAUSED) {
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
        potentialTargetPos.add(createVector(1, 0));
        newDirection = 'east'
        instancePlayer.playAnimation('walk')
      } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
        potentialTargetPos.add(createVector(-1, 0));
        newDirection = 'west'
        instancePlayer.playAnimation('walk')
      } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
        potentialTargetPos.add(createVector(0, -1));
        newDirection = 'north'
        instancePlayer.playAnimation('walk')
      } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
        potentialTargetPos.add(createVector(0, 1));
        newDirection = 'south'
        instancePlayer.playAnimation('walk')
      } else {
        instancePlayer.playAnimation('stand')
        return
      }
    }


    if (!instanceFactory.checkCollision(instancePlayer, potentialTargetPos)) {
      instanceTargetPos = potentialTargetPos
    } else {
      console.log('colliding')
    }

    instancePlayer.setDirection(newDirection)
    if (instanceFactory.checkDoor(instancePlayer, potentialTargetPos)) {
      instanceTargetPos = instancePlayer.getPos()
    }


  }


  instanceGameLoop.setTickFunction(
    (time) => {
      // console.log(time)
  
      if (!instancePlayer.getIsFrozen()) {

        let distance = moveTowards(instancePlayer, instanceTargetPos, 1/25)
        if (distance <= 0.01) {
          tryMove()
        }
        instancePlayer.step(time)
        instanceFactory.step(time)

      }
    }
  )
  instanceGameLoop.setRenderFunction(
    () => {
      background(0);
  
      push()
      translate(round(width / 2 - getCellToPos(instancePlayer.getPos().x) - CELLSIZE / 2), round(height / 2 - getCellToPos(instancePlayer.getPos().y) - CELLSIZE / 2));
      // drawGridDebug()
  
      // instanceFactory.drawDungeon(instancePlayer)
      // instanceFactory.drawOverworld(instancePlayer)
  

      instanceFactory.drawDungeon(instancePlayer)
      instanceFactory.draw(instancePlayer)
      instancePlayer.draw()

      pop()
  
  
      push()
      fill('red')
      textSize(width / 10);
      text(round(frameRate()), 0, width / 10)
  
      pop()
  
  
      if (IS_PAUSED) {
        push()
        rect(width / 2 - width / 4, height / 2 - width / 4, width / 2)

        fill('red')
        rect(width / 2 - width / 4, height / 2 - width / 4, width / 2, width / 6)
        pop()
      }
      // image(TILEMAP_PLAYER,0,0)
      if(instanceTransition.drawerStatus()) instanceTransition.drawer();
      if(instanceBattle != null && instanceBattle.inCombat) instanceBattle.drawer();
    }
  )
  instanceGameLoop.start()


  if (instanceTextBox) {
    instanceTextBox.loop.stop()
    let newTextBox = new TextBox()
    newTextBox.timeCurrent = instanceTextBox.timeCurrent
    newTextBox.currentTextEnd = instanceTextBox.currentTextEnd
    newTextBox.children = instanceTextBox.children
    instanceTextBox = newTextBox
    instanceTextBox.loop.start()
  }
  if (!instanceTextBox) {
    instanceTextBox = new TextBox()
    instanceTextBox.loop.start();
  
    //instanceTextBox.add({text:"Welcome to the Dungeon traveler", x:null, y:null, width:null, height:null, textSize: null})
    //instanceTextBox.add({text:"The game is still in development", x:null, y:null, width:null, height:null, textSize: null})
    //instanceTextBox.add({text:"Explore the dungeon and find the Keys to OO", x:null, y:null, width:null, height:null, textSize: null})
    //instanceTextBox.add({text:"Good Luck and Have fun", x:null, y:null, width:null, height:null, textSize: null})
  }
  console.log(instanceTextBox.children)

}

// function draw() {
//   tick()
//   render()
// }

function windowResized() {

  setup()
}

let IS_PAUSED = false;

function mouseClicked() {
  instanceTextBox.nextText();
  console.log(instanceTextBox)
  //console.log(textBox);
  console.log(instanceTextBox)
  if (instanceBattle && instanceBattle.inCombat) {
    // basic attack button
    let rect1X = width/2 + 5;
    let rect1Y = height - height/5 + 5;
    let rect1Width = width/4 - 5;
    let rect1Height = height/10 - 5;

// special attack button
    let rect2X = width/2 + 5;
    let rect2Y = height - height/10 + 5;
    let rect2Width = width/4 - 5;
    let rect2Height = height/10 - 10;

// buff button
    let rect3X = width - width/4 + 5;
    let rect3Y = height - height/5 + 5;
    let rect3Width = width/4 - 10;
    let rect3Height = height/10 - 5;

// bag button
    let rect4X = width - width/4 + 5;
    let rect4Y = height - height/10 + 5;
    let rect4Width = width/4 - 10;
    let rect4Height = height/10 - 10;

      if (mouseX > rect1X && mouseX < rect1X + rect1Width && mouseY > rect1Y && mouseY < rect1Y + rect1Height) {
        instanceTextBox.add({text:instancePlayer.getName()+" used basic attack!", x:1, y:.2, width:.5, height:.2, textSize:.02});
        instanceBattle.turn("move_basic");
        console.log(instanceTextBox.children)      
      }

      if (mouseX > rect2X && mouseX < rect2X + rect2Width && mouseY > rect2Y && mouseY < rect2Y + rect2Height) {
        instanceTextBox.add({text:instancePlayer.getName()+" used special attack!", x:1, y:.2, width:.5, height:.2, textSize:.02});
        instanceBattle.turn("move_special");
      }

      if (mouseX > rect3X && mouseX < rect3X + rect3Width && mouseY > rect3Y && mouseY < rect3Y + rect3Height) {
        instanceTextBox.add({text:instancePlayer.getName()+" used buff!", x:1, y:.2, width:.5, height:.2, textSize:.02});
        instanceBattle.turn("move_buff");
      }

      if (mouseX > rect4X && mouseX < rect4X + rect4Width && mouseY > rect4Y && mouseY < rect4Y + rect4Height) {
        instanceTextBox.add({text:"bag", x:1, y:.2, width:.5, height:.2, textSize:.02});
        instanceBattle.turn("move_bag");
      }
    }

}

function keyPressed() {
  if (!instancePlayer.getIsFrozen()) {

  
    if (keyCode === 27 || keyCode === 80) { // escape key or p
      console.log(keyCode)
      IS_PAUSED = !IS_PAUSED
    }
    if (keyCode === 32) { // space key
      instanceFactory.interact(instancePlayer)
    }

  }
 //text, x, y, width, height, textSize
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