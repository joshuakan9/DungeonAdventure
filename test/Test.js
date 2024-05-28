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
    
  }
  static battleSystemTest() {

      //let battleTester = new BattleSystem()
    
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
    
  }
  static dungeonGeneratorTest() {
    
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
    
  }
  static factoryTest() {
    
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
    
  }
  static pickupTest() {
    
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
        chai.assert.deepEqual(spriteTester.getPos(), createVector(0, 0), "getPos should return a vector with x=0 and y=0");

        // Test the getSize method
        chai.assert.deepEqual(spriteTester.getSize(), createVector(1, 1), "getSize should return a vector with x=1 and y=1");

        // Test the getMiddle method
        chai.assert.deepEqual(spriteTester.getMiddle(), createVector(0.5, 0.5), "getMiddle should return a vector with x=0.5 and y=0.5");

        // Test the collide method
        chai.assert.equal(spriteTester.collide(createVector(0, 0)), true, "collide with a vector at the same position should return true");
        chai.assert.equal(spriteTester.collide(createVector(10, 10)), false, "collide with a vector at a different position should return false");

        // Test the setPos method
        spriteTester.setPos(createVector(2, 2));
        chai.assert.deepEqual(spriteTester.getPos(), createVector(2, 2), "After setPos, getPos should return the new position");

        // Test the setSize method
        spriteTester.setSize(createVector(3, 3));
        chai.assert.deepEqual(spriteTester.getSize(), createVector(3, 3), "After setSize, getSize should return the new size");
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
