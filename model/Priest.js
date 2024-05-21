class Priest extends Character {
    myHeal;

    constructor ({thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints, theHeal}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints})
        this.myHeal = theHeal;
    }

    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    buff() {
        this.myHeal.setHealAmount(this.myHeal.getHealAmount() + 25);
    }

    getClass() {
        return "Priest";
    }
}