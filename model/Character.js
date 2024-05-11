class Character extends Entity {
    myStamina;
    myBag;
    myBlockPercentage;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = theBag;
        this.myBlockPercentage = theBlockPercentage;
        this.myIsFrozen = 0;
    }

    getStamina() {
        return this.myStamina;
    }

    getBag() {
        return this.myBag;
    }

    getBlockPercentage() {
        return this.myBlockPercentage;
    }

    hasPillars() {

    }

    setIsFrozen(theNum) {
        this.myIsFrozen += theNum
    }

    getIsFrozen() {
        return this.myIsFrozen > 0
    }

    // draw() {
    //     push()
    //     let frame = this.myFrameMap.get(this.myFrame)
    //     translate(this.myPos.x * CELLSIZE + this.myOffset.x, this.myPos.y * CELLSIZE + this.myOffset.y)
    //     if (this.myDirection == 'west') {
    //         scale(-1,1)
    //         translate(-CELLSIZE,0)
    //     }
    //     image(this.myImage, 0, 0, this.mySize.x, this.mySize.y, frame.x, frame.y, this.myFrameSize.x, this.myFrameSize.y)
    //     pop()
    // }


}