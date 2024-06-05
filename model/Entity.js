/**
 * Entity class that extends Sprite.
 *
 * @class
 * @extends Sprite
 */
class Entity extends Sprite {
    /**
     * @property {string} myName - The name of the entity.
     * @property {number} myHitPoints - The hit points of the entity.
     * @property {number} myAttack - The attack power of the entity.
     * @property {string} myDirection - The direction of the entity.
     */

    /**
     * @constructor
     * @param {Object} options - The options for creating an entity.
     * @param {string} options.theName - The name of the entity.
     * @param {number} options.theHitPoints - The hit points of the entity.
     * @param {number} options.theAttack - The attack power of the entity.
     * @param {string} [options.theDirection='north'] - The direction of the entity.
     */
    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theDirection = 'north'}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation })
        this.myName = theName;
        this.myHitPoints = theHitPoints;
        this.myAttack = theAttack;
        this.myDirection = theDirection
        this.setDirection(this.myDirection)
    }

    /**
     * Draws the entity on the screen.
     *
     * This method first gets the current frame of the entity's animation. It then translates the drawing context to the entity's position, taking into account the entity's offset.
     * If the entity's last horizontal direction was 'west', it further translates the context and scales it for a mirrored drawing (entity looking to the left).
     * Finally, it draws the entity's image on the screen, using the entity's size and the current frame's position and size.
     */
    draw() {

        let frame = this.myFrameMap.get(this.myFrame)
        push()
        translate(this.myPos.x * CELLSIZE + this.myOffset.x * CELLSIZE, this.myPos.y * CELLSIZE + this.myOffset.y * CELLSIZE)
        if (this.myLastHorzDirection == 'west') {
            translate(1  * CELLSIZE, 0)
            scale(-1, 1)
        }
        image(this.myImage, 0, 0, this.mySize.x * CELLSIZE, this.mySize.y * CELLSIZE, frame.x, frame.y, this.myFrameSize.x, this.myFrameSize.y)
        pop()
    }


    /**
     * Get the name of the entity.
     * @returns {string} The name of the entity.
     */
    getName() {
        return this.myName;
    }

    /**
     * Get the hit points of the entity.
     * @returns {number} The hit points of the entity.
     */
    getHitPoints() {
        return this.myHitPoints;
    }

    /**
     * Set the name of the entity.
     * @param {string} theName - The new name of the entity.
     */
    setName(theName) {
        this.myName = theName;
    }

    /**
     * Set the hit points of the entity.
     * @param {number} theHitPoints - The new hit points of the entity.
     */
    setHitPoints(theHitPoints) {
        this.myHitPoints = theHitPoints;
    }

    /**
     * Set the direction of the entity.
     * @param {string} theDirection - The new direction of the entity.
     */
    setDirection(theDirection) {
        if (theDirection == 'east' || theDirection == 'west') {
            this.myLastHorzDirection = theDirection;
        }
        this.myDirection = theDirection;
    }

    /**
     * Get the direction of the entity.
     * @returns {string} The direction of the entity.
     */
    getDirection() {
        return this.myDirection
    }

    /**
     * Get the attack power of the entity.
     * @returns {number} The attack power of the entity.
     */
    getAttack() {
        return this.myAttack;
    }

    /**
     * Get the maximum hit points of the entity.
     * @returns {number} The maximum hit points of the entity.
     */
    getMaxHitPoints() {
        return this.myMaxHitPoints;
    }
}