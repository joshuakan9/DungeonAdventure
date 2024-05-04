class Ogre extends Mob {
    myHeal;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHitPoints, theAttack, theHeal }) {
        super({ thePos, theSize, theImage, theIsCollideable, theName: "Ogre", theHitPoints, theAttack })
        this.myHeal = theHeal;
    }


    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    getHeal() {
        return this.myHeal;
    }

}