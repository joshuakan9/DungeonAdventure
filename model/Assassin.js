class Assassin extends Character {

    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints, theSpecialAttack }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints});
        this.mySpecialAttack = theSpecialAttack;
    }

    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        this.myAttack.setDamage(this.myAttack.getDamage() + 5);
        this.mySpecialAttack.setDamage(this.myAttack.getDamage() + 10);
    }

    getClass() {
        return "Assassin";
    }
}