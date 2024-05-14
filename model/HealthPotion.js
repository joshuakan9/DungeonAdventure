class HealthPotion extends Pickup {
    myHealth;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theHealth}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName: "Health Potion" });
        this.myHealth = theHealth;
    }

    use() {

    }
}