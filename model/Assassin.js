class Assassin extends Character() {
    myBasicAttack;
    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance })
        myBasicAttack = new Attack(50, 100);
        mySpecialAttack = new Attack(100, 100);
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        myAttack.setDamage(myAttack.getDamage() + 5);
    }
}