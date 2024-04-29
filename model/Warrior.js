class Warrior extends Character {

    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theSpecialAttack }) {
        super({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage })
        this.mySpecialAttack = theSpecialAttack;
    }

    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        this.myBlockChance += 5;
    }
}