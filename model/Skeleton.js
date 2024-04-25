class Skeleton extends Entity {
    myHealChance;

    constructor(theHealChance) {
        this.myHealChance = theHealChance;
    }

    theHealChance() {
        myHitPoints += this.myHeal.healAmount;
    }

    buff() {
        myHeal.setHealAmount(myHeal.getHealAmount() + 25);
    }
}