class Test {
    constructor() {
    }
  
    animationTest() {
      chai.assert.equal(1,1);
    }
    assassinTest() {
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
    chai.assert.equal(assassinTest.getSpecialAttack().getDamage(), 200, "Needs to return the string: Assassin");
    chai.assert.equal(assassinTest.getSpecialAttack().getHitPercentage(), 100, "Needs to return the string: Assassin");
    assassinTest.buff()
    chai.assert.equal(assassinTest.getSpecialAttack().getDamage(), 115, "Needs to return the string: Assassin");
    chai.assert.equal(assassinTest.getAttack().getDamage(), 105, "Needs to return the string: Assassin");
  
    }
    attackTest() {
      
    }
    bagSystemTest() {
      
    }
    battleSystemTest() {
      
    }
    characterTest() {
      
    }
    characterFactoryTest() {
      
    }
    dungeonGeneratorTest() {
      
    }
    entityTest() {
      
    }
    entityFactoryTest() {
      
    }
    factoryTest() {
      
    }
    framePatternTest() {
      
    }
    gameLoopTest() {
      
    }
    healTest() {
      
    }
    makeAnimationsTest() {
      
    }
    mobTest() {
      
    }
    pickUpTest() {
      
    }
    priestTest() {
      
    }
    spriteTest() {
  
    }
    utilTest() {
  
    }
    warriorTest() {
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
  
      chai.assert.equal(warriorTester.getClass(), "Warrior", "Needs to return the string: Assassin");
      chai.assert.equal(warriorTester.getSpecialAttack().getDamage(), 10000, "Needs to return the string: Assassin");
      chai.assert.equal(warriorTester.getSpecialAttack().getHitPercentage(), 100, "Needs to return the string: Assassin");
      warriorTester.buff()
      chai.assert.equal(warriorTester.myBlockPercentage, 5, "Needs to return the string: Assassin");
  
    }
    testAll() {
      this.assassinTest();
      this.warriorTest();
      this.utilTest();
      this.spriteTest();
      this.priestTest();
      this.pickUpTest();
      this.mobTest();
      this.makeAnimationsTest();
      this.healTest();
      this.gameLoopTest();
      this.framePatternTest();
      this.factoryTest();
      this.entityFactoryTest();
      this.entityTest();
      this.characterFactoryTest();
      this.dungeonGeneratorTest();
      this.characterTest();
      this.attackTest();
      this.bagSystemTest();
      this.battleSystemTest();
    }
  }
  