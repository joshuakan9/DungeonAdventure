class Test {

    static animationsTest() {
        let animationsTester = new Animations({
            stand: new FramePattern(ANIM_STAND),
            walk: new FramePattern(ANIM_WALK),
        });

        // Test the getFrame method
        chai.assert.equal(animationsTester.getFrame(), ANIM_STAND.frames[0].frame, "Initial frame should be the first frame of ANIM_STAND");

        // Test the play method
        animationsTester.play('walk');
        chai.assert.equal(animationsTester.getFrame(), ANIM_WALK.frames[0].frame, "After play('walk'), frame should be the first frame of ANIM_WALK");

        // Test the step method
        animationsTester.step(100);
        chai.assert.equal(animationsTester.getFrame(), ANIM_WALK.frames[1].frame, "After step(100), frame should be the second frame of ANIM_WALK");
    }
  static assassinTest() {
    let assassinData = JSON.parse(window.localStorage.getItem('assassin'));
    let assassinTest = new Assassin({
        thePos: createVector(assassinData.thePos.x, assassinData.thePos.y),
        theSize: createVector(assassinData.theSize.x, assassinData.theSize.y),
        theImage: TILEMAP_ASSASSIN,
        theHFrames: assassinData.theHFrames,
        theVFrames: assassinData.theVFrames,
        theFrame: assassinData.theFrame,
        theFrameSize: createVector(assassinData.theFrameSize.x, assassinData.theFrameSize.y),
        theOffset: createVector(assassinData.theOffset.x, assassinData.theOffset.y),
        theName: assassinData.theName,
        theHitPoints: assassinData.theHitPoints,
        theAttack: new Attack(assassinData.theAttack.damage, assassinData.theAttack.hitChance),
        theStamina: assassinData.theStamina,
        theBlockPercentage: assassinData.theBlockPercentage,
        theMaxHitPoints: assassinData.theMaxHitPoints,
        theSpecialAttack: new Attack(assassinData.theSpecialAttack.damage, assassinData.theSpecialAttack.hitChance),
        theAnimation: new Animations({
            stand: new FramePattern(ANIM_STAND),
            walk: new FramePattern(ANIM_WALK),
        }),
    });
    
  chai.assert.equal(assassinTest.getClass(), "Assassin", "Needs to return the string: Assassin");
  chai.assert.equal(assassinTest.getSpecialAttack().getDamage(), 200, "Needs to return the amount of damage for assassinTest: 200");
  chai.assert.equal(assassinTest.getSpecialAttack().getHitPercentage(), 100, "Needs to return the hit percentage for assassinTest: 100");
  assassinTest.buff()
  chai.assert.equal(assassinTest.getSpecialAttack().getDamage(), 115, "After buff() that increases damage, damage for special attack is: 115");
  chai.assert.equal(assassinTest.getAttack().getDamage(), 105, "After buff() that increases damage, damage for basic is: 105");

  }
  static attackTest() {
    let attackTester = new Attack(0,0);
    attackTester.setDamage(100);
    attackTester.setHitPercentage(50);
    chai.assert.equal(attackTester.getDamage(), 100, "Needs to return the damage from attackTester: 100");
    chai.assert.equal(attackTester.getHitPercentage(), 50, "Needs to return the hit percentage from attackTester: 50");
    
    
  }
    static bagSystemTest() {
        // Create a player for testing
        let playerTester = new Character({
            thePos: createVector(0, 0),
            theSize: createVector(1, 1),
            theImage: null, // Assuming you have a valid image for the character
            theIsCollideable: true,
            theHFrames: 1,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 16),
            theOffset: createVector(0, 0),
            theAnimation: new Animations({
                stand: new FramePattern(ANIM_STAND),
                walk: new FramePattern(ANIM_WALK),
            }),
            theName: "Test Character",
            theHitPoints: 99,
            theAttack: 10,
            theStamina: 10,
            theBlockPercentage: 0,
            theMaxHitPoints: 100
        });

        // Create an instance of BagSystem for testing
        let bagSystemTester = new BagSystem(playerTester);

        // Test the playerUseHealthPotion method
        playerTester.addBag(EntityFactory.createEntity("health potion", createVector(0,0)));
        bagSystemTester.playerUseHealthPotion();
        chai.assert.equal(playerTester.getHitPoints(), 100, "After using a health potion, player's hit points should be 100");
        chai.assert.isFalse(playerTester.getBag().has("Health Potion"), "After using a health potion, player's bag should not contain a health potion");
    }
    static battleSystemTest() {
        // Create a player and a mob for testing
        let playerTester = CharacterFactory.createCharacter("warrior");

        let mobTester = EntityFactory.createEntity("ogre", createVector(0, 0));

        let pillarDropTester = {
            boolean: false,
            count: 0
        };

        // Create an instance of BattleSystem for testing
        let battleSystemTester = new BattleSystem(playerTester, mobTester, pillarDropTester);

        // Test the constructor
        chai.assert.equal(battleSystemTester.player, playerTester, "Player should be playerTester");
        chai.assert.equal(battleSystemTester.mob, mobTester, "Mob should be mobTester");
        chai.assert.equal(battleSystemTester.pillarDropBoolean, pillarDropTester.boolean, "PillarDropBoolean should be false");
        chai.assert.equal(battleSystemTester.pillarDropCount, pillarDropTester.count, "PillarDropCount should be 0");
        chai.assert.equal(battleSystemTester.outOfText, false, "OutOfText should be false");
        chai.assert.equal(battleSystemTester.turnCounter, 0, "TurnCounter should be 0");
        chai.assert.equal(battleSystemTester.inCombat, true, "InCombat should be true");
        chai.assert.equal(battleSystemTester.stamina, playerTester.getStamina(), "Stamina should be equal to player's stamina");

        // Add more tests as needed to cover other methods and scenarios
    }
    static characterTest() {
        // Create an instance of Character for testing
        let characterTester = new Character({
            thePos: createVector(0, 0),
            theSize: createVector(1, 1),
            theImage: null, // Assuming you have a valid image for the character
            theIsCollideable: true,
            theHFrames: 1,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 16),
            theOffset: createVector(0, 0),
            theAnimation: new Animations({
                stand: new FramePattern(ANIM_STAND),
                walk: new FramePattern(ANIM_WALK),
            }),
            theName: "Test Character",
            theHitPoints: 100,
            theAttack: new Attack(10, 90),
            theStamina: 10,
            theBlockPercentage: 10,
            theMaxHitPoints: 100,
        });

        // Test the getStamina method
        chai.assert.equal(characterTester.getStamina(), 10, "getStamina should return 10");

        // Test the getBlockPercentage method
        chai.assert.equal(characterTester.getBlockPercentage(), 10, "getBlockPercentage should return 10");

        // Test the getMaxHitPoints method
        chai.assert.equal(characterTester.getMaxHitPoints(), 100, "getMaxHitPoints should return 100");

        // Test the getBag method
        chai.assert.deepEqual(characterTester.getBag(), new Map(), "getBag should return an empty Map");

        // Test the addBag method
        characterTester.addBag({getName: () => "Test Item"});
        chai.assert.equal(characterTester.getBag().get("Test Item"), 1, "After addBag, getBag should return a Map with 'Test Item' as key and 1 as value");

        // Test the removeBag method
        characterTester.removeBag("Test Item");
        chai.assert.equal(characterTester.getBag().has("Test Item"), false, "After removeBag, 'Test Item' should not exist in the bag");
    }
    static characterFactoryTest() {
        // Test the createCharacter method with 'assassin' type
        let assassinTester = CharacterFactory.createCharacter('assassin');
        chai.assert.equal(assassinTester.getClass(), "Assassin", "createCharacter('assassin') should return an Assassin");

        // Test the createCharacter method with 'warrior' type
        let warriorTester = CharacterFactory.createCharacter('warrior');
        chai.assert.equal(warriorTester.getClass(), "Warrior", "createCharacter('warrior') should return a Warrior");

        // Test the createCharacter method with 'priest' type
        let priestTester = CharacterFactory.createCharacter('priest');
        chai.assert.equal(priestTester.getClass(), "Priest", "createCharacter('priest') should return a Priest");

        // Test the createCharacter method with an invalid type
        let invalidTester = CharacterFactory.createCharacter('invalid');
        chai.assert.isNull(invalidTester, "createCharacter('invalid') should return null");
    }
  static dungeonGeneratorTest() {
      let dungeonGeneratorTester = new DungeonGenerator();

      chai.assert.isNumber(dungeonGeneratorTester.myRows, "myRows should be a number");
      chai.assert.isNumber(dungeonGeneratorTester.myCols, "myCols should be a number");
      chai.assert.isArray(dungeonGeneratorTester.myDungeon, "myDungeon should be an array");
      chai.assert.isArray(dungeonGeneratorTester.myDungeonFinal, "myDungeonFinal should be an array");
      chai.assert.isNumber(dungeonGeneratorTester.myTotalMobCount, "myTotalMobCount should be a number");

      let roomTester = new Room ([
          ['□','□','□','□','□','□','□'],
          ['□','□','□','□','□','□','□'],
          ['□','□','□','□','□','□','□'],
          ['□','□','□','□','□','□','□'],
          ['□','□','□','□','□','□','□'],
          ['□','□','□','□','□','□','□'],
          ['□','□','□','□','□','□','□']
      ]);

      chai.assert.isArray(roomTester.myTileMap, "myTileMap should be an array");
      chai.assert.isArray(roomTester.myTileMap[0], "myTileMap should be a 2D array");
      chai.assert.equal(roomTester.myTileMap.length, 7, "myTileMap should have 3 rows");
      chai.assert.equal(roomTester.myTileMap[0].length, 7, "myTileMap should have 3 columns");

      let tileMap = roomTester.getTileMap();
      chai.assert.isArray(tileMap, "getTileMap should return an array");
      chai.assert.isArray(tileMap[0], "getTileMap should return a 2D array");
      chai.assert.equal(tileMap.length, 7, "getTileMap should return an array with 3 rows");
      chai.assert.equal(tileMap[0].length, 7, "getTileMap should return an array with 3 columns");

      chai.assert.deepEqual(roomTester.getEntityMap(), [
          ['□','□','□','□','□','□','□'],
          ['□','X','X','□','X','X','□'],
          ['□','X','X','□','X','X','□'],
          ['□','□','□','X','□','□','□'],
          ['□','X','X','□','X','X','□'],
          ['□','X','X','□','X','X','□'],
          ['□','□','□','□','□','□','□']
      ], "getEntityMap should return the entity map");

      chai.assert.deepEqual(roomTester.myDoorLocations, [
          [0, 3], [6, 3], [3, 6], [3, 0]
          ], "myDoorLocations should return the proper door locations");

      roomTester.setLeftDoor()
      roomTester.setRightDoor()
      roomTester.setNorthDoor()
      roomTester.setSouthDoor()
      roomTester.createDoors()
      chai.assert.deepEqual(roomTester.myTileMap, [
          ['⌜','‾','‾','▲','‾','‾','⌝'],
          ['||','□','□','□','□','□','|'],
          ['||','□','□','□','□','□','|'],
          ['◀','□','□','□','□','□','▶'],
          ['||','□','□','□','□','□','|'],
          ['||','□','□','□','□','□','|'],
          ['⌞','_','_','▼','_','_','⌟']
      ], "myTileMap should return the proper tile map");

      let mobCount = roomTester.getMobCount();
      chai.assert.isNumber(mobCount, "getMobCount should return a number");

      chai.assert.deepEqual(roomTester.getNorthTeleportLocation(), [1, 3], "getNorthTeleportLocation should return the north teleport location");
      chai.assert.deepEqual(roomTester.getSouthTeleportLocation(), [5, 3], "getSouthTeleportLocation should return the south teleport location");
      chai.assert.deepEqual(roomTester.getEastTeleportLocation(), [3, 5], "getEastTeleportLocation should return the east teleport location");
      chai.assert.deepEqual(roomTester.getWestTeleportLocation(), [3, 1], "getWestTeleportLocation should return the west teleport location");


  }

    static entityTest() {
        // Create an instance of Entity for testing
        let entityTester = new Entity({
            thePos: createVector(0, 0),
            theSize: createVector(1, 1),
            theImage: null, // Assuming you have a valid image for the entity
            theIsCollideable: true,
            theHFrames: 1,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 16),
            theOffset: createVector(0, 0),
            theAnimation: new Animations({
                stand: new FramePattern(ANIM_STAND),
                walk: new FramePattern(ANIM_WALK),
            }),
            theName: "Test Entity",
            theHitPoints: 100,
            theAttack: 10,
            theDirection: 'north'
        });

        // Test the getName method
        chai.assert.equal(entityTester.getName(), "Test Entity", "getName should return 'Test Entity'");

        // Test the getHitPoints method
        chai.assert.equal(entityTester.getHitPoints(), 100, "getHitPoints should return 100");

        // Test the getAttack method
        chai.assert.equal(entityTester.getAttack(), 10, "getAttack should return 10");

        // Test the getDirection method
        chai.assert.equal(entityTester.getDirection(), 'north', "getDirection should return 'north'");

        // Test the setName method
        entityTester.setName("New Entity");
        chai.assert.equal(entityTester.getName(), "New Entity", "After setName, getName should return 'New Entity'");

        // Test the setHitPoints method
        entityTester.setHitPoints(200);
        chai.assert.equal(entityTester.getHitPoints(), 200, "After setHitPoints, getHitPoints should return 200");

        // Test the setDirection method
        entityTester.setDirection('south');
        chai.assert.equal(entityTester.getDirection(), 'south', "After setDirection, getDirection should return 'south'");
    }
    static entityFactoryTest() {
        // Test the createEntity method with 'ogre' type
        let ogreTester = EntityFactory.createEntity('ogre', {x: 0, y: 0});
        chai.assert.instanceOf(ogreTester, Mob, "createEntity('ogre') should return an instance of Mob");
        chai.assert.equal(ogreTester.getName(), "Ogre", "createEntity('ogre') should return an Ogre");

        // Test the createEntity method with 'skeleton' type
        let skeletonTester = EntityFactory.createEntity('skeleton', {x: 0, y: 0});
        chai.assert.instanceOf(skeletonTester, Mob, "createEntity('skeleton') should return an instance of Mob");
        chai.assert.equal(skeletonTester.getName(), "Skeleton", "createEntity('skeleton') should return a Skeleton");

        // Test the createEntity method with 'gremlin' type
        let gremlinTester = EntityFactory.createEntity('gremlin', {x: 0, y: 0});
        chai.assert.instanceOf(gremlinTester, Mob, "createEntity('gremlin') should return an instance of Mob");
        chai.assert.equal(gremlinTester.getName(), "Gremlin", "createEntity('gremlin') should return a Gremlin");

        // Test the createEntity method with 'health potion' type
        let healthPotionTester = EntityFactory.createEntity('health potion', {x: 0, y: 0});
        chai.assert.instanceOf(healthPotionTester, Pickup, "createEntity('health potion') should return an instance of Pickup");
        chai.assert.equal(healthPotionTester.getName(), "Health Potion", "createEntity('health potion') should return a Health Potion");

        // Test the createEntity method with an invalid type
        let invalidTester = EntityFactory.createEntity('invalid', {x: 0, y: 0});
        chai.assert.isNull(invalidTester, "createEntity('invalid') should return null");
    }
    static factoryTest() {
        // Create an instance of Factory for testing
        let factoryTester = new Factory();

        // Test the getInitialMobCount method
        chai.assert.isNumber(factoryTester.getInitialMobCount(), "getInitialMobCount should return a number");

        // Test the getMobCount method
        chai.assert.isNumber(factoryTester.getMobCount(), "getMobCount should return a number");

        // Test the removeEntity method
        // Assuming you have a valid entity for testing
        let entityTester = EntityFactory.createEntity('ogre', {x: 0, y: 0});
        factoryTester.removeEntity(entityTester);
        chai.assert.isBelow(factoryTester.getMobCount(), factoryTester.getInitialMobCount(), "After removeEntity, getMobCount should be less than getInitialMobCount");

        // Add more tests as needed to cover other methods and scenarios
    }
    static framePatternTest() {
        let framePatternTester = new FramePattern(ANIM_STAND);

        // Test the getFrame method
        chai.assert.equal(framePatternTester.getFrame(), ANIM_STAND.frames[0].frame, "Initial frame should be the first frame of ANIM_STAND");

        // Test the step method
        framePatternTester.step(100);
        chai.assert.equal(framePatternTester.getFrame(), ANIM_STAND.frames[1].frame, "After step(100), frame should be the second frame of ANIM_STAND");
    }
    static gameLoopTest() {
        // Create an instance of GameLoop for testing
        let gameLoopTester = new GameLoop();

        // Test the setTickFunction method
        let tickFunctionCalled = false;
        gameLoopTester.setTickFunction(() => { tickFunctionCalled = true; });
        gameLoopTester.myUpdate();
        chai.assert.isTrue(tickFunctionCalled, "setTickFunction should set the function to be called on each tick");

        // Test the setRenderFunction method
        let renderFunctionCalled = false;
        gameLoopTester.setRenderFunction(() => { renderFunctionCalled = true; });
        gameLoopTester.myRender();
        chai.assert.isTrue(renderFunctionCalled, "setRenderFunction should set the function to be called to render the game");

        // Test the start method
        gameLoopTester.start();
        chai.assert.isTrue(gameLoopTester.isRunning, "After start, isRunning should be true");

        // Test the stop method
        gameLoopTester.stop();
        chai.assert.isFalse(gameLoopTester.isRunning, "After stop, isRunning should be false");
    }
  static healTest() {
      let healTester = new Heal(0, 0);
      healTester.setHealAmount(100);
      healTester.setHealPercentage(80);
      healTester.getHealAmount()
      healTester.getHealPercentage()
      chai.assert.equal(healTester.getHealAmount(), 100, "Heal amount is set to 100");
      chai.assert.equal(healTester.getHealPercentage(), 80, "Heal percentage is set to 80");

  }
    static makeAnimationsTest() {
        // Test makeStandingFrames function
        let standingFrames = makeStandingFrames(0);
        chai.assert.deepEqual(standingFrames, ANIM_STAND, "makeStandingFrames(0) should return ANIM_STAND");

        // Test makeWalkingFrames function
        let walkingFrames = makeWalkingFrames(0);
        chai.assert.deepEqual(walkingFrames, ANIM_WALK, "makeWalkingFrames(0) should return ANIM_WALK");
    }
    static mobTest() {
        // Create a Mob instance for testing
        let mobTester = new Mob({
            thePos: createVector(0, 0),
            theSize: createVector(1, 1),
            theImage: null, // Assuming you have a valid image for the mob
            theIsCollideable: true,
            theHFrames: 1,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 16),
            theOffset: createVector(0, 0),
            theAnimation: new Animations({
                stand: new FramePattern(ANIM_STAND),
                walk: new FramePattern(ANIM_WALK),
            }),
            theName: "Test Mob",
            theHitPoints: 100,
            theAttack: new Attack(10, 90),
            theSpecialAttack: new Attack(20, 80),
            theHeal: new Heal(30, 70)
        });

        // Test the getSpecialAttack method
        chai.assert.equal(mobTester.getSpecialAttack().getDamage(), 20, "getSpecialAttack should return an Attack with damage 20");
        chai.assert.equal(mobTester.getSpecialAttack().getHitPercentage(), 80, "getSpecialAttack should return an Attack with hit percentage 80");

        // Test the getHeal method
        chai.assert.equal(mobTester.getHeal().getHealAmount(), 30, "getHeal should return a Heal with heal amount 30");
        chai.assert.equal(mobTester.getHeal().getHealPercentage(), 70, "getHeal should return a Heal with heal percentage 70");

        // Test the heal method
        mobTester.heal();
        chai.assert.equal(mobTester.getHitPoints(), 130, "After heal, getHitPoints should return 130");
    }
    static pickupTest() {
        // Create a Pickup instance for testing
        let pickupTester = new Pickup({
            thePos: createVector(0, 0),
            theSize: createVector(1, 1),
            theImage: null, // Assuming you have a valid image for the pickup
            theIsCollideable: true,
            theHFrames: 1,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 16),
            theOffset: createVector(0, 0),
            theAnimation: new Animations({
                stand: new FramePattern(ANIM_STAND),
                walk: new FramePattern(ANIM_WALK),
            }),
            theName: "Health Potion",
        });

        // // Test the interact method
        // let eventDispatched = false;
        // window.addEventListener("e-pickup", () => { eventDispatched = true; });
        // pickupTester.interact();
        // chai.assert.isTrue(eventDispatched, "interact should dispatch an 'e-pickup' event when the Pickup is a 'Health Potion'");

        // Test the getName method
        chai.assert.equal(pickupTester.getName(), "Health Potion", "getName should return 'Health Potion'");
    }
  static priestTest() {
      let priestData = JSON.parse(window.localStorage.getItem('priest'));
      let priestTester = new Priest({
          thePos: createVector(priestData.thePos.x, priestData.thePos.y),
          theSize: createVector(priestData.theSize.x, priestData.theSize.y),
          theIsCollideable: priestData.theIsCollideable,
          theImage: TILEMAP_PRIEST,
          theHFrames: priestData.theHFrames,
          theVFrames: priestData.theVFrames,
          theFrame: priestData.theFrame,
          theFrameSize: createVector(priestData.theFrameSize.x, priestData.theFrameSize.y),
          theOffset: createVector(priestData.theOffset.x, priestData.theOffset.y),
          theName: priestData.theName,
          theHitPoints: priestData.theHitPoints,
          theAttack: new Attack(priestData.theAttack.damage, priestData.theAttack.hitChance),
          theStamina: priestData.theStamina,
          theBlockPercentage: priestData.theBlockPercentage,
          theMaxHitPoints: priestData.theMaxHitPoints,
          theSpecialAttack: new Attack(priestData.theSpecialAttack.damage, priestData.theSpecialAttack.hitChance),
          theHeal: new Heal(priestData.theHeal.healAmount, priestData.theHeal.healChance),
          theAnimation: new Animations({
            stand: new FramePattern(ANIM_STAND),
            walk: new FramePattern(ANIM_WALK),
          }),
      })

      chai.assert.equal(priestTester.getClass(), "Priest", "Needs to return the string: Priest");
      chai.assert.equal(priestTester.getAttack().getDamage(), 100, "Damage for Priest is: 100");
      chai.assert.equal(priestTester.getHeal().getHealAmount(), 50, "Heal amount for priest is: 50");
      priestTester.heal()
      chai.assert.equal(priestTester.myHitPoints, 1049, "Healed priestTester by 1049")

      priestTester.buff()
      chai.assert.equal(priestTester.getHeal().getHealAmount(), 75, "Needs to return buff() stats to heal increase by 25: 50 -> 75");
  }
    static spriteTest() {
        // Create an instance of Sprite for testing
        let spriteTester = new Sprite({
            thePos: createVector(0, 0),
            theSize: createVector(1, 1),
            theImage: null, // Assuming you have a valid image for the sprite
            theIsCollideable: true,
            theHFrames: 1,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 16),
            theOffset: createVector(0, 0),
            theAnimation: new Animations({
                stand: new FramePattern(ANIM_STAND),
                walk: new FramePattern(ANIM_WALK),
            }),
        });

        // Test the getPos method
        chai.assert.deepEqual(spriteTester.getPos().x, createVector(0, 0).x, "getPos should return a vector with x=0");
        chai.assert.deepEqual(spriteTester.getPos().y, createVector(0, 0).y, "getPos should return a vector with y=0");


        // Test the getSize method
        chai.assert.deepEqual(spriteTester.getSize().x, createVector(1, 1).x, "getSize should return a vector with x=1");
        chai.assert.deepEqual(spriteTester.getSize().y, createVector(1, 1).y, "getSize should return a vector with y=1");


        // Test the collide method
        // chai.assert.equal(spriteTester.collide(createVector(0, 0)), true, "collide with a vector at the same position should return true");
        chai.assert.equal(spriteTester.collide(createVector(10, 10)), false, "collide with a vector at a different position should return false");

        // Test the setPos method
        spriteTester.setPos(createVector(2, 2));
        chai.assert.deepEqual(spriteTester.getPos().x, createVector(2, 2).x, "After setPos, getPos should return the new x");
        chai.assert.deepEqual(spriteTester.getPos().y, createVector(2, 2).y, "After setPos, getPos should return the new y");

        // Test the setSize method
        spriteTester.setSize(createVector(2, 2));
        chai.assert.deepEqual(spriteTester.getSize().x, createVector(2, 2).x, "After setSize, getSize should return the new size x");
        chai.assert.deepEqual(spriteTester.getSize().y, createVector(2, 2).y, "After setSize, getSize should return the new size y");


        // // Test the getMiddle method
        // spriteTester.setPos(createVector(0, 0));
        // spriteTester.setSize(createVector(2, 2));
        // chai.assert.equal(spriteTester.getMiddle().x, createVector(1, 1).x, "getMiddle should return a vector with x=1");
        // chai.assert.equal(spriteTester.getMiddle().y, createVector(1, 1).y, "getMiddle should return a vector with y=1");
    }
  static warriorTest() {
    let warriorData = JSON.parse(window.localStorage.getItem('warrior'));
    let warriorTester = new Warrior({
      thePos: createVector(warriorData.thePos.x, warriorData.thePos.y),
      theSize: createVector(warriorData.theSize.x, warriorData.theSize.y),
      theIsCollideable: warriorData.theIsCollideable,
      theImage: TILEMAP_WARRIOR,
      theHFrames: warriorData.theHFrames,
      theVFrames: warriorData.theVFrames,
      theFrame: warriorData.theFrame,
      theFrameSize: createVector(warriorData.theFrameSize.x, warriorData.theFrameSize.y),
      theOffset: createVector(warriorData.theOffset.x, warriorData.theOffset.y),
      theName: warriorData.theName,
      theHitPoints: warriorData.theHitPoints,
      theAttack: new Attack(warriorData.theAttack.damage, warriorData.theAttack.hitChance),
      theStamina: warriorData.theStamina,
      theBlockPercentage: warriorData.theBlockPercentage,
      theMaxHitPoints: warriorData.theMaxHitPoints,
      theSpecialAttack: new Attack(warriorData.theSpecialAttack.damage, warriorData.theSpecialAttack.hitChance),
      theAnimation: new Animations({
        stand: new FramePattern(ANIM_STAND),
        walk: new FramePattern(ANIM_WALK),
      }),
    })

    chai.assert.equal(warriorTester.getClass(), "Warrior", "Needs to return the string: Warrior");
    chai.assert.equal(warriorTester.getSpecialAttack().getDamage(), 10000, "Damage for warrior is: 10000");
    chai.assert.equal(warriorTester.getSpecialAttack().getHitPercentage(), 100, "Percentage is: 100");
    warriorTester.buff()
    chai.assert.equal(warriorTester.myBlockPercentage, 5, "Needs to return buff() stats to block percentage: 5");

  }

}
