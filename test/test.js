import { assert } from 'chai';



function animationTest() {
    

}

function assassinTest() {

}

function attackTest() {

}

function bagSystemTest() {

}

function characterTest() {

}

function characterFactoryTest() {
    
}

function dungeonGeneratorTest() {

}

function entityTest() {

}

function entityFactoryTest() {

}

function factoryTest() {}


function framePatternTest() {

}

function gameLoopTest() {

}

function healTest() {

}

function makeAnimationTest() {

}


function mob() {

}

function pickUpTest() {

}

function priestTest() {}{

}

function spriteTest() {
    
}

function warriorTest() {
    let warriorTest = new playerConst({
        thePos: createVector((1.5), (8)),
        theSize: createVector(2, 4),
        theImage: this.myBattleSystem.player.myImage,
        theHFrames: 9,
        theVFrames: 1,
        theFrame: 0,
        theFrameSize: createVector(16, 32),
        theOffset: createVector(0, -1.2),
        theName: "BATTLE_DISPLAY_ONE",
        theHitPoints: 1000,
        theAttack: new Attack(10000, 100),
        theStamina: 10,
        theBlockPercentage: 0,
        theMaxHitPoints: 1000,
        theSpecialAttack: new Attack(200, 100),
        theAnimation: new Animations({
          stand: new FramePattern(ANIM_STAND),
          walk: new FramePattern(ANIM_WALK)
        }),
    })
}

animationTest();
