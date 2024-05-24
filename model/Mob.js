class Mob extends Entity {
    mySpecialAttack;
    myHeal;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName, theHitPoints, theAttack, theSpecialAttack, theHeal }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName, theHitPoints, theAttack })
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
    interact() {
        window.dispatchEvent(new CustomEvent("e-battle-start", {detail: this}))
    }
}