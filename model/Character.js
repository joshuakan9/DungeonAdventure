class Character extends Entity {
    myStamina;
    myBag;
    myBlockChance;

    constructor({thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance}) {
        super({thePos, theSize, theImage, theName, theHitPoints, theDamage})
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockChance = theBlockChance;
    }

    hasPillars() {

    }
}