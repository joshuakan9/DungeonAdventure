class Ogre extends Entity {
    myHeal;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack }) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theHeal })
        this.myHeal = theHeal;
    }

    heal() {
        myHitPoints += this.myHeal.healAmount;
    }

    getHeal() {
        return this.myHeal;
    }

}