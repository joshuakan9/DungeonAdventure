class Warrior extends Character {
    myBasicAttack;
    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance })
        myBasicAttack = new Attack(100, 75);
        mySpecialAttack = new Attack(200, 50);
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        return this.mySpecialAttack;
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        myBlockChance += 5;
    }
}