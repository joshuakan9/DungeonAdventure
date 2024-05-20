class Skeleton extends Mob {
    mySpecialAttack;
    myHeal;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theHitPoints, theAttack, theSpecialAttack, theHeal }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName: "Skeleton", theHitPoints, theAttack })
        this.mySpecialAttack = theSpecialAttack;
        this.myHeal = theHeal;
    }
    getSpecialAttack() {
        return this.mySpecialAttack;
    }
    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    getHeal() {
        return this.myHeal;
    }
    
}