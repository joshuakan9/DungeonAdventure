/**
 * Class representing a Sprite.
 */
class Sprite {
    myPos;
    myImage;
    mySize;
    myIsCollideable;

    /**
     * Create a Sprite.
     * @param {Object} param0 - The properties of the Sprite.
     * @param {Object} param0.thePos - The position of the Sprite.
     * @param {Object} param0.theSize - The size of the Sprite.
     * @param {Object} param0.theImage - The image of the Sprite.
     * @param {boolean} param0.theIsCollideable - Whether the Sprite is collideable.
     * @param {number} param0.theHFrames - The horizontal frames of the Sprite.
     * @param {number} param0.theVFrames - The vertical frames of the Sprite.
     * @param {number} param0.theFrame - The frame of the Sprite.
     * @param {Object} param0.theFrameSize - The frame size of the Sprite.
     * @param {Object} param0.theOffset - The offset of the Sprite.
     * @param {Object} param0.theAnimation - The animation of the Sprite.
     */
    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation }) {
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
        this.myAnimation = theAnimation ?? null
        this.makeFrameMap()
    }

    /**
     * Create a map of frames for the Sprite.
     */
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

    /**
     * Check if the Sprite collides with a given position.
     * @param {Object} thePos - The position to check for collision.
     * @returns {boolean} Whether the Sprite collides with the given position.
     */
    collide(thePos) {
        if (!this.myIsCollideable) {
            return false;
        }

        return abs(thePos.x - this.myPos.x) < CELLSIZE / 2 && abs(thePos.y - this.myPos.y) < CELLSIZE / 2

        // let theSpriteSize = theSprite.getSize()
        // let theDistance = abs(dist(this.getMiddle().x, this.getMiddle().y, theSprite.getMiddle().x, theSprite.getMiddle().y))
        // if (theDistance > abs(sqrt((this.mySize.x ^ 2) + (theSpriteSize.x ^ 2)))) {
        //     return false
        // }
        // return true
    }

    /**
     * Draw the Sprite.
     */
    draw() {
        let frame = this.myFrameMap.get(this.myFrame)
        image(this.myImage, this.myPos.x * CELLSIZE + this.myOffset.x * CELLSIZE, this.myPos.y * CELLSIZE + this.myOffset.y * CELLSIZE, this.mySize.x * CELLSIZE, this.mySize.y * CELLSIZE, frame.x, frame.y, this.myFrameSize.x, this.myFrameSize.y)
    }

    /**
     * Step the Sprite's animation.
     * @param {number} theDelta - The time since the last frame.
     */
    step(theDelta) {
        if (!this.myAnimation) {
            return
        }
        this.myAnimation.step(theDelta)
        this.myFrame = this.myAnimation.getFrame()
    }

    /**
     * Play an animation for the Sprite.
     * @param {Object} theAnimation - The animation to play.
     * @param {number} theTime - The time to play the animation for.
     */
    playAnimation(theAnimation, theTime) {
        if (this.myAnimation) {
            this.myAnimation.play(theAnimation, theTime)
        }
    }

    /**
     * Set the position of the Sprite.
     * @param {Object} theVector - The new position of the Sprite.
     */
    setPos(theVector) {
        this.myPos = theVector
    }

    /**
     * Get the position of the Sprite.
     * @returns {Object} The position of the Sprite.
     */
    getPos() {
        return this.myPos
    }

    /**
     * Get the size of the Sprite.
     * @returns {Object} The size of the Sprite.
     */
    getSize() {
        return this.mySize
    }

    /**
     * Set the size of the Sprite.
     * @param {Object} theSize - The new size of the Sprite.
     */
    setSize(theSize) {
        this.mySize = theSize;
    }

    /**
     * Get the middle position of the Sprite.
     * @returns {Object} The middle position of the Sprite.
     */
    getMiddle() {
        return createVector(this.myPos.x + ((this.mySize.x * CELLSIZE)/ 2), this.myPos.y + ((this.mySize.y * CELLSIZE) / 2))
    }

    /**
     * Get the image of the Sprite.
     * @returns {Object} The image of the Sprite.
     */
    getImage() {
        return this.myImage;
    }

}