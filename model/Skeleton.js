class Skeleton extends Mob {
    myHeal;

    constructor({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack }) {
        super({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theHeal })
    }

    theHealChance() {
        myHitPoints += this.myHeal.healAmount;
    }

    getHeal() {
        return this.myHeal;
    }

}