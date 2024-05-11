class Character extends Entity {
    myStamina;
    myBag;
    myBlockPercentage;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockPercentage = theBlockPercentage;
        this.myIsFrozen = 0;
    }

    getStamina() {
        return this.myStamina;
    }

    getBag() {
        return this.myBag;
    }

    getBlockPercentage() {
        return this.myBlockPercentage;
    }

    hasPillars() {

    }

    setIsFrozen(theNum) {
        this.myIsFrozen += theNum
    }

    getIsFrozen() {
        return this.myIsFrozen > 0
    }


}