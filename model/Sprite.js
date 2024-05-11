class Sprite {
    myPos;
    myImage;
    mySize;
    myIsCollideable;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset }) {
        this.myPos = thePos;
        this.myImage = theImage;
        this.mySize = theSize;
        this.myIsCollideable = theIsCollideable
        this.myHFrames = theHFrames ?? 1
        this.myVFrames = theVFrames ?? 1
        this.myFrame = theFrame ?? 0
        this.myFrameMap = new Map()
        this.myFrameSize = theFrameSize ?? createVector(16,16)
        this.myOffset = theOffset ?? createVector(0,0)
        this.makeFrameMap()
    }

    makeFrameMap() {
        let counter = 0
        for (let a = 0; a < this.myVFrames; a++) {
            for (let b = 0; b < this.myHFrames; b++) {
                this.myFrameMap.set(
                    counter,
                    createVector(b * this.myFrameSize.x, a * this.myFrameSize.y)
                )
                counter++
            }
        }
    }

    collide(thePos) {
        if (!this.myIsCollideable) {
            return false;
        }

        return abs(thePos.x - this.myPos.x) < cellSize / 2 && abs(thePos.y - this.myPos.y) < cellSize / 2

        // let theSpriteSize = theSprite.getSize()
        // let theDistance = abs(dist(this.getMiddle().x, this.getMiddle().y, theSprite.getMiddle().x, theSprite.getMiddle().y))
        // if (theDistance > abs(sqrt((this.mySize.x ^ 2) + (theSpriteSize.x ^ 2)))) {
        //     return false
        // }
        // return true
    }

    draw() {
        let frame = this.myFrameMap.get(this.myFrame)
        image(this.myImage, this.myPos.x * CELLSIZE + this.myOffset.x, this.myPos.y * CELLSIZE + this.myOffset.y, this.mySize.x, this.mySize.y, frame.x, frame.y, this.myFrameSize.x, this.myFrameSize.y)
    }

    setPos(theVector) {
        this.myPos = theVector
    }
    getPos() {
        return this.myPos
    }

    getSize() {
        return this.mySize
    }

    setSize(theSize) {
        this.mySize = theSize;
    }

    getMiddle() {
        return createVector(this.myPos.x + (this.mySize.x / 2), this.myPos.y + (this.mySize.y / 2))
    }

}