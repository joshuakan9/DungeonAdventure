class Character extends Entity {
    myStamina;
    myBag;
    myBlockPercentage;

    constructor({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage }) {
        super({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockPercentage = theBlockPercentage;
        this.myIsFrozen = false;
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

    setIsFrozen(theBool) {
        this.myIsFrozen = theBool
    }

    getIsFrozen() {
        return this.myIsFrozen
    }
}