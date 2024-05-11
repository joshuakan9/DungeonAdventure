class Entity extends Sprite {
    myName;
    myHitPoints;
    myAttack;
    myDirection;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theName, theHitPoints, theAttack, theDirection = 'north'}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset })
        this.myName = theName;
        this.myHitPoints = theHitPoints;
        this.myAttack = theAttack;
        this.myDirection = theDirection
    }

    getName() {
        return this.myName;
    }

    getHitPoints() {
        return this.myHitPoints;
    }

    setName(theName) {
        this.myName = theName;
    }

    setHitPoints(theHitPoints) {
        this.myHitPoints = theHitPoints;
    }

    setDirection(theDirection) {
        this.myDirection = theDirection;
        // console.log(this.myDirection)
    }

    getDirection() {
        return this.myDirection
    }

    getAttack() {
        return this.myAttack;
    }
}