class Sprite {
    myPos;
    myImage;
    mySize;
    myIsCollideable;

    constructor({thePos, theSize, theImage, theIsCollideable}) {
        this.myPos = thePos;
        this.myImage = theImage;
        this.mySize = theSize;
        this.myIsCollideable = theIsCollideable
    }

    collide(theSprite) {
        if (!this.myIsCollideable) {
            return false;
        }

        let theSpriteSize = theSprite.getSize()
        let theDistance = abs(dist(this.getMiddle().x, this.getMiddle().y, theSprite.getMiddle().x, theSprite.getMiddle().y))
        if (theDistance > abs(sqrt((this.mySize.x ^ 2) + (theSpriteSize.x ^ 2)))) {
            return false
        }
        return true
    }

    draw() {
        image(this.myImage, this.myPos.x, this.myPos.y, this.mySize.x, this.mySize.y)
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

    getMiddle() {
        return createVector(this.myPos.x + (this.mySize.x / 2), this.myPos.y + (this.mySize.y / 2))
    }
}