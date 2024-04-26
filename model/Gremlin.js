class Gremlin extends Entity {
    myHeal;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theHeal }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack })
        this.myHeal = theHeal;
    }

    theHealChance() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    getHeal() {
        return this.myHeal;
    }
}