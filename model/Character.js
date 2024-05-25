class Character extends Entity {
    myStamina;
    myBag;
    myBlockPercentage;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBlockPercentage, theMaxHitPoints}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = new Map();
        this.myBlockPercentage = theBlockPercentage;
        this.myMaxHitPoints = theMaxHitPoints;
        this.myIsFrozen = 0;
        this.myTargetPos = thePos.copy();
    }

    setTargetPos(thePos) {
        this.myTargetPos = thePos.copy()
    }

    getTargetPos() {
        return this.myTargetPos
    }

    getMaxHitPoints() {
        return this.myMaxHitPoints;
    }

    getStamina() {
        return this.myStamina;
    }

    getBag() {
        return this.myBag;
    }

    addBag(theItem) {
        const itemName = theItem.getName();

        if (this.myBag.has(itemName)) {
            this.myBag.set(itemName, this.myBag.get(itemName) + 1);
        } else {
            this.myBag.set(itemName, 1);
        }
        console.log(this.myBag);
    }

    removeBag(theItemName) {
        if (this.myBag.get(theItemName) === 1) {
            this.myBag.delete(theItemName);
        } else if (this.myBag.get(theItemName) > 1) {
            this.myBag.set(theItemName, this.myBag.get(theItemName) - 1);
        } else {
            console.log('remove bag failed as there are no more ' + theItemName + 's in the bag');
        }
        console.log(this.myBag);
    }

    getBlockPercentage() {
        return this.myBlockPercentage;
    }

    hasPillars() {
        return this.myBag.has('Pillar of Abstraction') && this.myBag.has('Pillar of Inheritance') && this.myBag.has('Pillar of Polymorphism') && this.myBag.has('Pillar of Encapsulation');
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