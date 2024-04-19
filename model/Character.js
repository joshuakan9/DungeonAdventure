class Character extends Entity {
    myStamina;
    myBag;
    myBlockChance;

    constructor(theStamina, theBag, theBlockChance) {
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockChance = theBlockChance;
    }

    hasPillars() {

    }
}