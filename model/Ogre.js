class Ogre extends Entity {
    myHeal;
    myBasicAttack;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theHeal}) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack})
        this.myHeal = theHeal;

    }


    heal() {
        myHitPoints += this.myHeal.healAmount;
    }

    getHeal() {
        return this.myHeal;
    }

}