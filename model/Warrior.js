class Warrior extends Character {

    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theStamina, theBag, theBlockChance, theSpecialAttack }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theStamina, theBag, theBlockChance })
        this.mySpecialAttack = theSpecialAttack;
    }

    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        this.myBlockChance += 5;
    }
}