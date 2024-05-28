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
  chai.assert.equal(assassinTest.getSpecialAttack().getDamage(), 200, "Needs to return the amount of damage for assassinTest: 200");
  chai.assert.equal(assassinTest.getSpecialAttack().getHitPercentage(), 100, "Needs to return the hit percentage for assassinTest: 100");
  assassinTest.buff()
  chai.assert.equal(assassinTest.getSpecialAttack().getDamage(), 115, "After buff() that increases damage, damage for special attack is: 115");
  chai.assert.equal(assassinTest.getAttack().getDamage(), 105, "After buff() that increases damage, damage for basic is: 105");

  }
  attackTest() {
    let attackTester = new Attack(0,0);
    attackTester.setDamage(100);
    attackTester.setHitPercentage(50);
    chai.assert.equal(attackTester.getDamage(), 100, "Needs to return the damage from attackTester: 100");
    chai.assert.equal(attackTester.getHitPercentage(), 50, "Needs to return the hit percentage from attackTester: 50");
    
    
  }
  bagSystemTest() {
    
  }
  battleSystemTest() {

      //let battleTester = new BattleSystem()
    
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
      let healTester = new Heal(0, 0);
      healTester.setHealAmount(100);
      healTester.setHealPercentage(80);
      healTester.getHealAmount()
      healTester.getHealPercentage()
      chai.assert.equal(healTester.getHealAmount(), 100, "Heal amount is set to 100");
      chai.assert.equal(healTester.getHealPercentage(), 80, "Heal percentage is set to 80");

  }
  makeAnimationsTest() {
    
  }
  mobTest() {
    
  }
  pickUpTest() {
    
  }
  priestTest() {
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

    chai.assert.equal(warriorTester.getClass(), "Warrior", "Needs to return the string: Warrior");
    chai.assert.equal(warriorTester.getSpecialAttack().getDamage(), 10000, "Damage for warrior is: 10000");
    chai.assert.equal(warriorTester.getSpecialAttack().getHitPercentage(), 100, "Percentage is: 100");
    warriorTester.buff()
    chai.assert.equal(warriorTester.myBlockPercentage, 5, "Needs to return buff() stats to block percentage: 5");

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
