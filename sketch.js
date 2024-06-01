
p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
let FONT = {}
let CELLSIZE
let TILEMAP
let CURSOR
let cellNumber = 16
let WALL_IMG
let FLOOR_IMG
let WALL0_IMG
let WALL1_IMG
let WALL2_IMG
let WALL3_IMG
let WALL4_IMG
let WALL5_IMG

/**
 * Preload function to load all the assets before the game starts
 */
function preload() {
  // FONT['REGULAR'] = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
  FONT['REGULAR'] = loadFont('./assets/fonts/MinecraftRegular.otf')
  FONT['SEMIBOLD'] = loadFont('./assets/fonts/LeagueSpartan-SemiBold.ttf')
  FONT['BOLD'] = loadFont('./assets/fonts/LeagueSpartan-Bold.ttf')
  CURSOR = loadImage('./assets/images/cursor.png')
  TILEMAP = loadImage('./assets/images/tilemap.png')
  WALL_IMG = loadImage('./assets/images/background.png')
  FLOOR_IMG = loadImage('./assets/images/floor.png')
  WALL0_IMG = loadImage('./assets/images/backgroundLOriginal.png')
  WALL1_IMG = loadImage('./assets/images/backgroundLOne.png')
  WALL2_IMG = loadImage('./assets/images/backgroundLTwo.png')
  WALL3_IMG = loadImage('./assets/images/backgroundLThree.png')
  WALL4_IMG = loadImage('./assets/images/backgroundLFour.png')
  WALL5_IMG = loadImage('./assets/images/backgroundLFive.png')
  Sound.setup()
  if (!window.localStorage.getItem("save")) {
    window.localStorage.setItem("save", JSON.stringify([]))
  }
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

  instanceTextBox.add({ text: E['detail'].getName() + " battle", x: 1, y: .2, width: 0, height: .2, textSize: .02 })

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

window.addEventListener("e-player-set-character", (E) => {
  instancePlayer = E['detail']

  if (!instanceBagSystem) {
    instanceBagSystem = new BagSystem(instancePlayer)
  }

  if (!instanceBagDisplay) {
    instanceBagDisplay = new BagDisplay(instancePlayer)
  }
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
  if (instancePlayer.hasPillars()) {
    instancePlayer = CharacterFactory.createCharacter("priest");
    instanceBagSystem = new BagSystem(instancePlayer);
    instanceBagDisplay = new BagDisplay(instancePlayer);
    VictoryDisplay.isRunning = true;
    VMainMenu.setMainMenu();
  }
})

window.addEventListener("e-player-die", (E) => {
  instancePlayer = CharacterFactory.createCharacter("priest");
  instanceBagSystem = new BagSystem(instancePlayer);
  instanceBagDisplay = new BagDisplay(instancePlayer);
  DefeatDisplay.isRunning = true;
  VMainMenu.setMainMenu();
});

window.addEventListener("e-player-battle-win", (E) => {
  instanceTextBox.add({ text: "You have slain the " + E['detail'].getName() + "!" })
});
window.addEventListener("e-player-block", (E) => {
  instanceTextBox.add({ text: instancePlayer.getName() + " has blocked " + E['detail'].getName() + "'s attack for " + E['detail'].getAttack().getDamage() + " damage!", x: 1, y: .2, width: 0, height: .2, textSize: .02 });
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
      width: 0,
      height: .2,
      textSize: .02
    });
  } else {
    instanceTextBox.add({ text: instancePlayer.getName() + " has used a potion and has healed for " + E.detail + " health!" });
  }
});

window.addEventListener("e-miss-attack", (E) => {
  instanceTextBox.add({ text: E['detail'].getName() + " has missed!", x: 1, y: .2, width: 0, height: .2, textSize: .02 });
});
window.addEventListener("e-attack", (E) => {
  let damage = 0;
  if (E.detail.attack === "basic") {
    damage = E.detail.entity.getAttack().getDamage()
  } else {
    damage = E.detail.entity.getSpecialAttack().getDamage()
  }

  if (instanceBattle && instanceBattle.inCombat) {
    instanceTextBox.add({ text: E.detail.entity.getName() + " has used " + E.detail.attack + " attack and dealt " + damage + " damage!" , x: 1, y: .2, width: 0, height: .2, textSize: .02 });
    console.log("working")
  }
});

window.addEventListener("e-special-attack", (E) => {
    if (instancePlayer.getClass() === "Assassin") {
      if (instanceBattle && instanceBattle.inCombat) {
        instanceTextBox.add({
          text: instancePlayer.getName() + " has used quick attack and dealt " + instancePlayer.getSpecialAttack().getDamage() + " damage!",
          x: 1,
          y: .2,
          width: .5,
          height: .2,
          textSize: .02
        });
      } else {
        instanceTextBox.add({ text: instancePlayer.getName() + " has used quick attack and dealt " + instancePlayer.getSpecialAttack().getDamage() + " damage!" });
      }
    } else if (instancePlayer.getClass() === "Warrior") {
        if (instanceBattle && instanceBattle.inCombat) {
          instanceTextBox.add({text: instancePlayer.getName() + " has used crushing blow and dealt " + instancePlayer.getSpecialAttack().getDamage() + " damage!",
            x: 1,
            y: .2,
            width: .5,
            height: .2,
            textSize: .02
          });
        } else {
            instanceTextBox.add({text: instancePlayer.getName() + " has used crushing blow and dealt " + instancePlayer.getSpecialAttack().getDamage() + " damage!"});
        }
    } else if (instancePlayer.getClass() === "Dino") {
      if (instanceBattle && instanceBattle.inCombat) {
        instanceTextBox.add({text: instancePlayer.getName() + " has used bite and dealt " + instancePlayer.getSpecialAttack().getDamage() + " damage!",
          x: 1,
          y: .2,
          width: .5,
          height: .2,
          textSize: .02
        });
      } else {
          instanceTextBox.add({text: instancePlayer.getName() + " has used bite and dealt " + instancePlayer.getSpecialAttack().getDamage() + " damage!"});
      }
  }
})

window.addEventListener("e-priest-heal", (E) => {
    instanceTextBox.add({ text: E.detail.player.getName() + " has healed for " + E.detail.healAmount + " health!", x: 1, y: .2, width: 0, height: .2, textSize: .02});
})

window.addEventListener("e-mob-heal", (E) => {
  console.log("mob heal event")
  instanceTextBox.add({ text: E['detail'].getName() + " has healed for " + E.detail.getHeal().getHealAmount() + " health!", x: 1, y: .2, width: 0, height: .2, textSize: .02 });
})

window.addEventListener("e-player-already-full-health", (E) => {
  if (instanceBattle && instanceBattle.inCombat) {
    instanceTextBox.add({text: "You are already at full health!", x: 1, y: .2, width: .5, height: .2, textSize: .02});
  } else {
    instanceTextBox.add({text: "You are already at full health!"});

  }
})

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
let TILEMAP_WARRIOR
let TILEMAP_PRIEST
let TILEMAP_DINO
let TILEMAP_OGRE
let TILEMAP_SKELETON
let TILEMAP_GREMLIN
let TILEMAP_POTION_HEALTH
let TILEMAP_EXIT
let hasCompleteInitial = false
let IMG_NOISE
/**
 * Setup function to initialize the game
 */
function setup() {
  //=================================================================JS Test==================================================================================
  // Test.animationsTest()
  // Test.assassinTest() // problem
  // Test.attackTest()
  // Test.bagSystemTest()
  // Test.battleSystemTest()
  // Test.characterTest()
  // Test.characterFactoryTest()
  Test.dungeonGeneratorTest()
  // Test.entityTest()
  // Test.entityFactoryTest()
  // Test.factoryTest()
  // Test.framePatternTest()
  // Test.gameLoopTest()
  // Test.healTest()
  // Test.makeAnimationsTest()
  // Test.mobTest()
  // Test.pickupTest()
  // Test.priestTest()
  // Test.spriteTest()
  // Test.warriorTest()
  //=================================================================JS Test==================================================================================
  TILEMAP_ASSASSIN = TILEMAP.get(32 * 16, 2 * 16, 9 * 16, 2 * 16)
  TILEMAP_WARRIOR = TILEMAP.get(32 * 16, 4 * 16, 9 * 16, 2 * 16)
  TILEMAP_PRIEST = TILEMAP.get(32 * 16, 8 * 16, 9 * 16, 2 * 16)
  TILEMAP_DINO = TILEMAP.get(32 * 16, 12 * 16, 9 * 16, 2 * 16)
  TILEMAP_OGRE = TILEMAP.get(23 * 16, 20 * 16, 9 * 16, 2 * 16)
  TILEMAP_SKELETON = TILEMAP.get(23 * 16, 4 * 16, 9 * 16, 2 * 16)
  TILEMAP_GREMLIN = TILEMAP.get(23 * 16, 10 * 16, 9 * 16, 2 * 16)
  TILEMAP_POTION_HEALTH = TILEMAP.get(18 * 16, 13 * 16, 1 * 16, 1 * 16)
  TILEMAP_EXIT = TILEMAP.get(3 * 16, 6 * 16, 1 * 16, 1 * 16)

  

  window.innerHeight <= window.innerWidth
      ? ((W = Math.max(window.innerHeight, 1) * ratio),
          (H = Math.max(window.innerHeight, 1)))
      : ((W = Math.max(window.innerWidth, 1)),
          (H = Math.max(window.innerWidth, 1) / ratio));
  CELLSIZE = floor(W / cellNumber)
  createCanvas(CELLSIZE * cellNumber, CELLSIZE * cellNumber);
  M = CELLSIZE / 16
  textFont(FONT['REGULAR'])
  IMG_NOISE = createGraphics(width, height)
  IMG_NOISE.loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width)*4;
      IMG_NOISE.pixels[index+0] =
      IMG_NOISE.pixels[index+1] = 
      IMG_NOISE.pixels[index+2] = map(noise(x/2,y), 0, 1, 0,40)
      IMG_NOISE.pixels[index+3] = 255;      
    }
  }
  IMG_NOISE.updatePixels();

  setUpMonsterDatabase()
  setUpHeroDatabase()
  setUpPickUpDatabase()

  

  if (!hasCompleteInitial) {
    newGame()
    hasCompleteInitial = true
  }
}

/**
 * Function to start a new game
 */
function newGame() {
  randomSeed(new Date().getTime())

  if (!instanceGameLoop) {
    instanceGameLoop = new GameLoop();
  }
  if (instanceGameLoop) {
    instanceGameLoop.stop()
  }
  instanceFactory = new Factory()


  if (!instancePlayer) {
    let playerImage = createGraphics(50, 50)
    playerImage.background(255, 0, 0)
    instancePlayer = CharacterFactory.createCharacter("priest");
  //   // instancePlayer.addBag(EntityFactory.createEntity("pillar of abstraction"));
  //   // instancePlayer.addBag(EntityFactory.createEntity("pillar of inheritance"));
  //   // instancePlayer.addBag(EntityFactory.createEntity("pillar of polymorphism"));
  //   // instancePlayer.addBag(EntityFactory.createEntity("pillar of encapsulation"));
  }
  //
  // console.log(instanceFactory)
  //
  // // let test = instanceFactory.myDungeon[3][3]
  // // // test.myDungeon = null
  // // test.myEntityMap = null
  //
  // // console.log(test)
  //
  // // console.log(JSON.stringify(test))
  //
  // if (!instanceBagSystem) {
  //   instanceBagSystem = new BagSystem(instancePlayer)
  // }
  //
  // if (!instanceBagDisplay) {
  //   instanceBagDisplay = new BagDisplay(instancePlayer)
  // }


  // frameRate(60)
  // pixelDensity(1)




  tryMove = () => {


    let potentialTargetPos = instancePlayer.getTargetPos().copy()
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
      instancePlayer.setTargetPos(potentialTargetPos)
    } else {
      console.log('colliding')
    }

    instancePlayer.setDirection(newDirection)
    if (instanceFactory.checkDoor(instancePlayer, potentialTargetPos)) {
      instancePlayer.setTargetPos(instancePlayer.getPos())
    }


  }


  instanceGameLoop.setTickFunction(
      (time) => {



        VMainMenu.step(time)
        VPauseMenu.step(time)
        if (instanceBattle && instanceBattle.inCombat && !instanceBattle.outOfText) {
          instanceBattleDisplay.mobClone.step(time);
          instanceBattleDisplay.playerClone.step(time);
        }
        if (instanceTextBox && !instanceTextBox.isEmpty()) {
          instanceTextBox.tickTextBox(time);
        }




        if (!instancePlayer.getIsFrozen() && !VMainMenu.getIsPaused()) {

          let distance = moveTowards(instancePlayer, instancePlayer.getTargetPos(), 1 / 25)
          if (distance <= 0.025 * M) {
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
        image(IMG_NOISE,0,0,width * 2,height * 4)
        noCursor()

        push()

        translate(round(width / 2 - getCellToPos(instancePlayer.getPos().x) - CELLSIZE / 2), round(height / 2 - getCellToPos(instancePlayer.getPos().y) - CELLSIZE / 2));

        instanceFactory.drawDungeon(instancePlayer)
        instanceFactory.draw(instancePlayer)
        instancePlayer.draw()

        pop()


        push()
        fill('red')
        textSize(width / 10);
        text(round(frameRate()), 0, width / 10)

        pop();

        VPauseMenu.draw();
        VMainMenu.draw();

        if(VictoryDisplay.isRunning)VictoryDisplay.draw();
        if(DefeatDisplay.isRunning)DefeatDisplay.draw();

//=======================================================================================================================
        if (instanceBattle && instanceBattle.inCombat) {
            instanceBattleDisplay.displayBattle();
        }
        if (instanceBagDisplay && instanceBagDisplay.getIsPaused()) {
          instanceBagDisplay.draw(instancePlayer);
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

/**
 * Function to handle window resize events
 */
function windowResized() {

  setup()
}


/**
 * Function to handle mouse click events
 */
function mouseClicked() {
  if (instanceBattle && instanceBattle.inCombat && instanceTextBox.isEmpty()) {
    instanceBattle.mouseClicked();
  }
  if (instanceTextBox.isEmpty()) {
    DefeatDisplay.mouseClicked();
  }
  VictoryDisplay.mouseClicked();
  instanceTextBox.nextText();
  VPauseMenu.mouseClicked();
  VMainMenu.mouseClicked();
  

  if (instanceBagDisplay && instanceBagDisplay.getIsPaused()) {
    instanceBagDisplay.mouseClicked()
  }
  if (instanceBagSystem && instanceTextBox.isEmpty() && instanceBagDisplay.getIsPaused()) {
    instanceBagSystem.mouseClicked()
  }
}

/**
 * Function to handle key press events
 */
function keyPressed() {
  if (keyCode === 32) { // space keyba
    instanceTextBox.nextText();
  }
  if (!instancePlayer.getIsFrozen()) {
    if (keyCode === 32) { // space keyba
      if (instancePlayer.getHitPoints() > 0) {
        instanceFactory.interact(instancePlayer)
      }
    }
    if (instanceBagDisplay.getIsPaused() === false) {
      VPauseMenu.keyPressed()

    }
  }
  if (instanceBagDisplay && VPauseMenu.getIsPaused() === false) {
    instanceBagDisplay.keyPressed()
  }
  //text, x, y, width, height, textSize
}


/**
 * Function to convert cell index to position
 * @param {number} theIndex - The index of the cell
 * @returns {number} - The position of the cell
 */
function getCellToPos(theIndex) {
  return CELLSIZE * theIndex
}

/**
 * Function to move a character towards a destination
 * @param {Object} person - The character to move
 * @param {Object} destinationPosition - The destination position
 * @param {number} speed - The speed of the movement
 * @returns {number} - The remaining distance to the destination
 */
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

/**
 * Function to set up the monster database
 */
function setUpMonsterDatabase() {
  window.localStorage.setItem("ogre", JSON.stringify({
    theSize: {x: 1,y: 2},
    theIsCollideable: true,
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16,y: 32},
    theOffset: {x: 0,y: -1.2},
    theName: "Ogre",
    theHitPoints: 1000,
    theAttack: {damage: 100, hitChance: 100},
    theHeal: {healAmount: 10, healChance: 100},
    theSpecialAttack: {damage: 200, hitChance: 100},
  }))
  window.localStorage.setItem("skeleton", JSON.stringify({
    theSize: {x: 1,y: 2},
    theIsCollideable: true,
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16,y: 32},
    theOffset: {x: 0,y: -1.2},
    theName: "Skeleton",
    theHitPoints: 1000,
    theAttack: {damage: 100, hitChance: 100},
    theHeal: {healAmount: 10, healChance: 100},
    theStamina: 10,
    theBag: [],
    theBlockPercentage: 100,
    theSpecialAttack: {damage: 200, hitChance: 100},
  }))
  window.localStorage.setItem("gremlin", JSON.stringify({
    theSize: {x: 1,y: 2},
    theIsCollideable: true,
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16,y: 32},
    theOffset: {x: 0,y: -1.2},
    theName: "Gremlin",
    theHitPoints: 1000,
    theAttack: {damage: 100, hitChance: 100},
    theHeal: {healAmount: 10, healChance: 100},
    theStamina: 10,
    theBag: [],
    theBlockPercentage: 100,
    theSpecialAttack: {damage: 200, hitChance: 100},
  }))
}

/**
 * Function to set up the hero database
 */
function setUpHeroDatabase() {
  window.localStorage.setItem("assassin", JSON.stringify({
    thePos: {x: 6, y: 6},
    theSize: {x: 1, y: 2},
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16, y: 32},
    theOffset: {x: 0, y: -1.2},
    theName: "Assassin",
    theHitPoints: 1,
    theAttack: {damage: 100, hitChance: 100},
    theStamina: 10,
    theBlockPercentage: 0,
    theMaxHitPoints: 1000,
    theSpecialAttack: {damage: 2000, hitChance: 100},
  }))
  window.localStorage.setItem("warrior", JSON.stringify({
    thePos: {x: 6, y: 6},
    theSize: {x: 1, y: 2},
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16, y: 32},
    theOffset: {x: 0, y: -1.2},
    theName: "Warrior",
    theHitPoints: 1000,
    theAttack: {damage: 100, hitChance: 100},
    theStamina: 10,
    theBlockPercentage: 0,
    theMaxHitPoints: 1000,
    theSpecialAttack: {damage: 10000, hitChance: 100},
  }))
  window.localStorage.setItem("priest", JSON.stringify({
    thePos: {x: 6, y: 6},
    theSize: {x: 1, y: 2},
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16, y: 32},
    theOffset: {x: 0, y: -1.2},
    theName: "Priest",
    theHitPoints: 999,
    theAttack: {damage: 100, hitChance: 100},
    theStamina: 10,
    theBlockPercentage: 0,
    theMaxHitPoints: 1000,
    theSpecialAttack: {damage: 200, hitChance: 100},
    theHeal: {healAmount: 50, hitChance: 100},
  }))
  window.localStorage.setItem("dino", JSON.stringify({
    thePos: {x: 6, y: 6},
    theSize: {x: 1, y: 2},
    theHFrames: 9,
    theVFrames: 1,
    theFrame: 0,
    theFrameSize: {x: 16, y: 32},
    theOffset: {x: 0, y: -1.2},
    theName: "Dino",
    theHitPoints: 1,
    theAttack: {damage: 100, hitChance: 100},
    theStamina: 10,
    theBlockPercentage: 0,
    theMaxHitPoints: 1000,
    theSpecialAttack: {damage: 2000, hitChance: 100},
  }))
}

/**
 * Function to set up the pick up database
 */
function setUpPickUpDatabase() {
    window.localStorage.setItem("health potion", JSON.stringify({
      theSize: {x: 1,y: 1},
      theIsCollideable: true,
      theOffset: {x: 0,y: -0.1},
      theName: "Health Potion",
    }))
}

/**
 * Function to save the game state
 * @param {number} theSlot - The slot to save the game state in
 */
function saveGame(theSlot) {
  let saveArray = JSON.parse(window.localStorage.getItem("save"))
  let saveMyDungeon = []
  for (let a = 0; a < instanceFactory.myDungeon.length; a++) {
    saveMyDungeon[a] = []
    for (let b = 0; b < instanceFactory.myDungeon[0].length; b++) {
      if (instanceFactory.myDungeon[a][b]) {
        // console.log(instanceFactory.myDungeon[a][b])

        saveMyDungeon[a][b] = instanceFactory.myDungeon[a][b].cloneForSave()

      } else {
        saveMyDungeon[a][b] = null
      }
    }
  }

  saveArray[theSlot] = 
  { 
    player: {
      name: instancePlayer.getName().toLowerCase(),
      pos: [instancePlayer.getPos().x, instancePlayer.getPos().y],
      bag: JSON.stringify(Array.from(instancePlayer.getBag().entries())),
    },
    factory: {
      dungeon: JSON.stringify(saveMyDungeon),
      dungeonIndex: [instanceFactory.myDungeonIndex.x, instanceFactory.myDungeonIndex.y],
      initialMobCount: instanceFactory.myInitialMobCount,
      mobCount: instanceFactory.myMobCount,
    },
    data: {
      timestamp: Date.now()
    }
  }
  window.localStorage.setItem("save", JSON.stringify(saveArray))
}

/**
 * Function to load the game state
 * @param {number} theSlot - The slot to load the game state from
 * @returns {boolean} - Whether the game state was successfully loaded
 */
function loadGame(theSlot) {
  let saveArray = JSON.parse(window.localStorage.getItem("save"))
  let save = saveArray[theSlot]
  if (!save) {
    return false
  } else {

    instancePlayer = CharacterFactory.createCharacter(save["player"]["name"])
    instancePlayer.setBag(new Map(JSON.parse(save["player"]["bag"])))
    instancePlayer.setPos(createVector(JSON.parse(save["player"]["pos"][0]), JSON.parse(save["player"]["pos"][1])))
    instancePlayer.setTargetPos(instancePlayer.getPos())

    instanceFactory.load(save["factory"])
    instanceBagSystem = new BagSystem(instancePlayer)
    instanceBagDisplay = new BagDisplay(instancePlayer)

    return true
  }

}