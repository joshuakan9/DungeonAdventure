class Sprite {
    myPos;
    myImage;
    mySize;
    myIsCollideable;

    constructor({ thePos, theSize, theImage, theIsCollideable }) {
        this.myPos = thePos;
        this.myImage = theImage;
        this.mySize = theSize;
        this.myIsCollideable = theIsCollideable
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
        image(this.myImage, this.myPos.x * CELLSIZE, this.myPos.y * CELLSIZE, this.mySize.x, this.mySize.y)
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