class Assassin extends Character {

    mySpecialAttack;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theStamina, theBag, theBlockChance, theSpecialAttack }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theStamina, theBag, theBlockChance });
        this.mySpecialAttack = theSpecialAttack;
    }

    specialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        this.myAttack.setDamage(this.myAttack.getDamage() + 5);
        this.mySpecialAttack.setDamage(this.myAttack.getDamage() + 10);
    }
}