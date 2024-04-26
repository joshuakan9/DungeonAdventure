class Character extends Entity {
    myStamina;
    myBag;
    myBlockPercentage;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockPercentage = theBlockPercentage;
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
}