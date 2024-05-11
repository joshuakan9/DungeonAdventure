class Assassin extends Character {

    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theSpecialAttack }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage });
        this.mySpecialAttack = theSpecialAttack;
        console.log(this.mySize+"HI")
    }

    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        this.myAttack.setDamage(this.myAttack.getDamage() + 5);
        this.mySpecialAttack.setDamage(this.myAttack.getDamage() + 10);
    }
}