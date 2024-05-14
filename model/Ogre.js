class Ogre extends Mob {
    myHeal;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theHitPoints, theAttack, theHeal }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName: "Ogre", theHitPoints, theAttack })
        this.myHeal = theHeal;
    }


    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    getHeal() {
        return this.myHeal;
    }

}