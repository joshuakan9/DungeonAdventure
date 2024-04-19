class Sprite {
    myPos;
    myImage;
    mySize;

    constructor(thePos, theSize, theImage) {
        this.myPos = thePos;
        this.myImage = theImage;
        this.mySize = theSize;
    }

    collide() {

    }

    draw() {
        console.log(this.myPos)
        image(this.myImage, this.myPos.x, this.myPos.y, this.mySize.x, this.mySize.y)
    }

    setPos(theVector) {
        this.myPos = theVector
    }
    getPos() {
        return this.myPos
    }
}