class Priest extends Character {

    myHeal;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theDamage, theStamina, theBag, theBlockChance })
        myBasicAttack = new Attack(20, 100);
        myHeal = theHeal;
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        myHitPoints += this.myHeal.getHealAmount();
    }

    buff() {
        myHeal.setHealAmount(myHeal.getHealAmount() + 25);
    }
}