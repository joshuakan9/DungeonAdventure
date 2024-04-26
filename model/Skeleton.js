class Skeleton extends Entity {
    myHeal;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theHeal })
    }

    theHealChance() {
        myHitPoints += this.myHeal.healAmount;
    }

    getHeal() {
        return this.myHeal;
    }

}