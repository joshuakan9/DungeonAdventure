class Character extends Entity {
    myStamina;
    myBag;
    myBlockChance;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theStamina, theBag, theBlockChance }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockChance = theBlockChance;
    }

    hasPillars() {

    }
}