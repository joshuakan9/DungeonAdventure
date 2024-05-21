
p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
let FONT = {}
let CELLSIZE
let TILEMAP
let CURSOR
let cellNumber = 16
function preload() {
  // FONT['REGULAR'] = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
  FONT['REGULAR'] = loadFont('./assets/fonts/MinecraftRegular.otf')
  FONT['SEMIBOLD'] = loadFont('./assets/fonts/LeagueSpartan-SemiBold.ttf')
  FONT['BOLD'] = loadFont('./assets/fonts/LeagueSpartan-Bold.ttf')
  CURSOR = loadImage('./assets/images/cursor.png')
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
let instanceTextBox = new TextBox();
let instanceBattleDisplay = null
let instanceBagSystem = null
let instanceBagDisplay = null

let pillarDrop = {
  boolean: false,
  count: -1
};

window.addEventListener("e-battle-start", (E) => {

  instanceTextBox.add({ text: E['detail'].getName() + " battle" })

  let initialMobCount = instanceFactory.getInitialMobCount();
  let currentMobCount = instanceFactory.getMobCount();

  let pillarDropRate = floor(initialMobCount / 4);


  if (initialMobCount < 20) {
    pillarDropRate = pillarDropRate - 1;
  } else if (initialMobCount < 30) {
    pillarDropRate = pillarDropRate - 2;
  } else {
    pillarDropRate = pillarDropRate - 3;
  }
  console.log('initialMobCount = ' + initialMobCount)
  console.log('currentMobCount = ' + currentMobCount)
  console.log('pillarDropRate = ' + pillarDropRate)
  if (pillarDrop.count < 4) {
    if (initialMobCount - currentMobCount === pillarDropRate
        || initialMobCount - currentMobCount === pillarDropRate * 2
        || initialMobCount - currentMobCount === pillarDropRate * 3
        || initialMobCount - currentMobCount === pillarDropRate * 4) {
      pillarDrop.boolean = true;
      pillarDrop.count = pillarDrop.count += 1;
      console.log('pillarDrop.drop = ' + pillarDrop.boolean)
      console.log('pillarDrop.count = ' + pillarDrop.count)
    } else {
      pillarDrop.boolean = false;
      console.log('pillarDrop.drop = ' + pillarDrop.boolean)
    }
  }
  instanceBattle = new BattleSystem(instancePlayer, E['detail'], pillarDrop)
  instanceBattleDisplay = new BattleDisplay(instanceBattle);
  //console.log(E['detail'])
})

window.addEventListener("e-pillar-drop", (E) => {
  console.log("pillar drop event")
  instanceTextBox.add({ text: "You have gained the " + E.detail + "!" });
})

window.addEventListener("e-battle-end", (E) => {
  window.dispatchEvent(new Event('e-player-unfreeze'))
})

window.addEventListener("e-textbox-add", (E) => {
  // instanceTextBox.add()
})

window.addEventListener('e-transition', (E) => {
  instanceTransition.transition();
  console.log("here")
})

window.addEventListener("e-pickup", (E) => {
  instanceTextBox.add({ text: "Found a " + E['detail'].getName() + "!" });
  window.dispatchEvent(new CustomEvent("e-entity-remove", E));
  instancePlayer.addBag(E['detail']);
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

window.addEventListener("e-game-over-victory", (E) => {
  if (instancePlayer.hasPillars())
    instanceTextBox.add({ text: "You have completed the game!" })
})

window.addEventListener("e-player-die", (E) => {
  instanceTextBox.add({ text: "You died!" })
});

window.addEventListener("e-player-battle-win", (E) => {
  instanceTextBox.add({ text: "You have slain the " + E['detail'].getName() + "!" })
});
window.addEventListener("e-player-block", (E) => {
  instanceTextBox.add({ text: instancePlayer.getName() + " has blocked " + E['detail'].getName() + "'s attack for " + E['detail'].getAttack().getDamage() + " damage!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
});
window.addEventListener("e-bag", (E) => {
  instanceBagDisplay.setIsPaused()
  console.log("bag event")
})
window.addEventListener("e-player-use-health-potion", (E) => {
  if (instanceBattle && instanceBattle.inCombat) {
    instanceTextBox.add({
      text: instancePlayer.getName() + " has used a potion and has healed for " + E.detail + " health!",
      x: 1,
      y: .2,
      width: .5,
      height: .2,
      textSize: .02
    });
  } else {
    instanceTextBox.add({ text: instancePlayer.getName() + " has used a potion and has healed for " + E.detail + " health!" });
  }
});

window.addEventListener("e-miss-attack", (E) => {
  instanceTextBox.add({ text: E['detail'].getName() + " has missed!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
});
window.addEventListener("e-attack", (E) => {
  let damage = 0;
  if (E.detail.attack === "basic") {
    damage = E.detail.entity.getAttack().getDamage()
  } else {
    damage = E.detail.entity.getSpecialAttack().getDamage()
  }
  instanceTextBox.add({ text: E.detail.entity.getName() + " has used " + E.detail.attack + " attack and dealt " + damage + " damage!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });

});

window.addEventListener("e-mob-heal", (E) => {
  console.log("mob heal event")
  instanceTextBox.add({ text: E['detail'].getName() + " has healed for " + E.detail.getHeal().getHealAmount() + " health!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
})

window.addEventListener("e-player-already-full-health", (E) => {
  if (instanceBattle && instanceBattle.inCombat) {
    instanceTextBox.add({text: "You are already at full health!", x: 1, y: .2, width: .5, height: .2, textSize: .02});
  } else {
    instanceTextBox.add({text: "You are already at full health!"});

  }
})

// currently not in use
// window.addEventListener("e-no-health-potions", (E) => {
//   if (instanceBattle && instanceBattle.inCombat) {
//     instanceTextBox.add({ text: "You have no health potions!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
//
//   } else {
//     instanceTextBox.add({ text: "You have no health potions!"});
//
//   }
// })

window.addEventListener("e-not-enough-stamina", (E) => {
  instanceTextBox.add({ text: "You do not have enough stamina!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
})

window.addEventListener("e-assassin-buff", (E) => {
  instanceTextBox.add({ text: "You have used buff and increased your basic attack damage by 5 and your special attack damage by 10!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
})

window.addEventListener("e-warrior-buff", (E) => {
  instanceTextBox.add({ text: "You have used buff and increased your block chance by 5%!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
})

window.addEventListener("e-priest-buff", (E) => {
  instanceTextBox.add({ text: "You have used buff and increased your heal amount by 25!", x: 1, y: .2, width: .5, height: .2, textSize: .02 });
})

let TILEMAP_ASSASSIN
let TILEMAP_OGRE
let TILEMAP_SKELETON
let TILEMAP_GREMLIN
let TILEMAP_POTION_HEALTH
let TILEMAP_EXIT

function setup() {
  TILEMAP_ASSASSIN = TILEMAP.get(32 * 16, 2 * 16, 9 * 16, 2 * 16)
  TILEMAP_OGRE = TILEMAP.get(23 * 16, 20 * 16, 9 * 16, 2 * 16)
  TILEMAP_SKELETON = TILEMAP.get(23 * 16, 4 * 16, 9 * 16, 2 * 16)
  TILEMAP_GREMLIN = TILEMAP.get(23 * 16, 10 * 16, 9 * 16, 2 * 16)
  TILEMAP_POTION_HEALTH = TILEMAP.get(18 * 16, 13 * 16, 1 * 16, 1 * 16)
  TILEMAP_EXIT = TILEMAP.get(3 * 16, 6 * 16, 1 * 16, 1 * 16)

  randomSeed(new Date().getTime())

  window.innerHeight <= window.innerWidth
      ? ((W = Math.max(window.innerHeight, 1) * ratio),
          (H = Math.max(window.innerHeight, 1)))
      : ((W = Math.max(window.innerWidth, 1)),
          (H = Math.max(window.innerWidth, 1) / ratio));
  CELLSIZE = floor(W / cellNumber)
  createCanvas(CELLSIZE * cellNumber, CELLSIZE * cellNumber);
  M = CELLSIZE / 16
  textFont(FONT['REGULAR'])
  if (!instanceGameLoop) {
    instanceGameLoop = new GameLoop();
  }
  if (instanceGameLoop) {
    instanceGameLoop.stop()
  }
  if (!instanceFactory) {
    instanceFactory = new Factory()
    mobCount = instanceFactory.getMobCount();
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
      theFrameSize: createVector(16, 32),
      theOffset: createVector(0, -1.2),
      theName: "Tester",
      theHitPoints: 500,
      theAttack: new Attack(100, 100),
      theStamina: 10,
      theBlockPercentage: 0,
      theMaxHitPoints: 1000,
      theSpecialAttack: new Attack(200, 100),
      theAnimation: new Animations({
        stand: new FramePattern(ANIM_STAND),
        walk: new FramePattern(ANIM_WALK)
      }),
    });
    instanceTargetPos = instancePlayer.getPos().copy()
    // instancePlayer.addBag(EntityFactory.createEntity("pillar of abstraction"));
    // instancePlayer.addBag(EntityFactory.createEntity("pillar of inheritance"));
    // instancePlayer.addBag(EntityFactory.createEntity("pillar of polymorphism"));
    // instancePlayer.addBag(EntityFactory.createEntity("pillar of encapsulation"));
  }

  if (!instanceBagDisplay) {
    instanceBagDisplay = new BagDisplay(instancePlayer)
  }

  if (!instanceBagSystem) {
    instanceBagSystem = new BagSystem(instancePlayer)
  }


  // frameRate(60)
  // pixelDensity(1)




  tryMove = () => {


    let potentialTargetPos = instanceTargetPos.copy()
    let newDirection = null;
    if (!VPauseMenu.getIsPaused()) {
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

        if (instanceBattle && instanceBattle.inCombat && !instanceBattle.outOfText) {
          instanceBattleDisplay.mobClone.step(time);
          instanceBattleDisplay.playerClone.step(time);
        }
        if (instanceTextBox && !instanceTextBox.isEmpty()) {
          instanceTextBox.tickTextBox(time);
        }




        if (!instancePlayer.getIsFrozen()) {

          let distance = moveTowards(instancePlayer, instanceTargetPos, 1 / 25)
          if (distance <= 0.01) {
            tryMove()
          }
          if (!VPauseMenu.getIsPaused()) {
            instancePlayer.step(time)
            instanceFactory.step(time)
          }

        }
      }
  )
  instanceGameLoop.setRenderFunction(
      () => {
        background(0);
        noCursor()

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


        VPauseMenu.draw()
        // VMainMenu.draw()

//=======================================================================================================================
        if (instanceBattle && instanceBattle.inCombat && !instanceBattle.outOfText) {
          instanceBattleDisplay.displayBattle()
        }
        if (instanceBagDisplay && instanceBagDisplay.getIsPaused()) {
          instanceBagDisplay.draw()
        }
        if (instanceTextBox && !instanceTextBox.isEmpty()) {
          instanceTextBox.renderTextBox();
        }
//=======================================================================================================================
        if (instanceTransition.drawerStatus()) instanceTransition.drawer();
        image(CURSOR,mouseX,mouseY, 8 * M, 8 * M)
      }
  )
  instanceGameLoop.start()
}

function draw() {

}

function windowResized() {

  setup()
}


function mouseClicked() {
  instanceTextBox.nextText();
  if (instanceBattle && instanceBattle.inCombat && instanceTextBox.isEmpty()) {
    instanceBattle.mouseClicked()
  }
  VPauseMenu.mouseClicked()
  VMainMenu.mouseClicked()
  if (instanceBagDisplay && instanceBagDisplay.getIsPaused()) {
    instanceBagDisplay.mouseClicked()
  }
  if (instanceBagSystem) {
    instanceBagSystem.mouseClicked()
  }
}

function keyPressed() {
  if (!instancePlayer.getIsFrozen()) {

    VPauseMenu.keyPressed()

    if (instanceBagDisplay) {
      instanceBagDisplay.keyPressed()
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