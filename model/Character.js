/**
 * Character is a class that extends Entity. It represents a character in the game.
 */
class Character extends Entity {
    /**
     * The stamina of the character.
     * @type {number}
     */
    myStamina;

    /**
     * The bag of the character.
     * @type {Map}
     */
    myBag;

    /**
     * The block percentage of the character.
     * @type {number}
     */
    myBlockPercentage;

    /**
     * Constructs a new Character instance.
     *
     * @param {Object} params - The parameters for creating a character.
     * @param {Object} params.thePos - The position of the character.
     * @param {Object} params.theSize - The size of the character.
     * @param {Object} params.theImage - The image of the character.
     * @param {boolean} params.theIsCollideable - Whether the character is collideable.
     * @param {number} params.theHFrames - The number of horizontal frames for the character's animation.
     * @param {number} params.theVFrames - The number of vertical frames for the character's animation.
     * @param {Object} params.theFrame - The current frame of the character's animation.
     * @param {Object} params.theFrameSize - The size of each frame in the character's animation.
     * @param {Object} params.theOffset - The offset of the character's animation.
     * @param {Object} params.theAnimation - The animation of the character.
     * @param {string} params.theName - The name of the character.
     * @param {number} params.theHitPoints - The hit points of the character.
     * @param {Object} params.theAttack - The attack of the character.
     * @param {number} params.theStamina - The stamina of the character.
     * @param {number} params.theBlockPercentage - The block percentage of the character.
     * @param {number} params.theMaxHitPoints - The maximum hit points of the character.
     */
    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBlockPercentage, theMaxHitPoints}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack })
        this.myStamina = theStamina;
        this.myBag = new Map();
        this.myBlockPercentage = theBlockPercentage;
        this.myMaxHitPoints = theMaxHitPoints;
        this.myIsFrozen = 0;
        this.myTargetPos = thePos.copy();
    }

    /**
     * Sets the target position of the character.
     *
     * @param {Object} thePos - The new target position of the character.
     */
    setTargetPos(thePos) {
        this.myTargetPos = thePos.copy()
    }

    /**
     * Returns the target position of the character.
     *
     * @returns {Object} The target position of the character.
     */
    getTargetPos() {
        return this.myTargetPos
    }

    /**
     * Returns the maximum hit points of the character.
     *
     * @returns {number} The maximum hit points of the character.
     */
    getMaxHitPoints() {
        return this.myMaxHitPoints;
    }

    /**
     * Returns the stamina of the character.
     *
     * @returns {number} The stamina of the character.
     */
    getStamina() {
        return this.myStamina;
    }

    /**
     * Returns the bag of the character.
     *
     * @returns {Map} The bag of the character.
     */
    getBag() {
        return this.myBag;
    }

    /**
     * Sets the bag of the character.
     *
     * @param {Map} theBag - The new bag of the character.
     */
    setBag(theBag) {
        this.myBag = theBag;
    }

    /**
     * Adds an item to the bag of the character.
     * If the bag already contains the item, it increases the quantity of the item by 1.
     * Otherwise, it adds the item to the bag with a quantity of 1.
     *
     * @param {Object} theItem - The item to add to the bag.
     */
    addBag(theItem) {
        const itemName = theItem.getName();
        if (this.myBag.has(itemName)) {
            this.myBag.set(itemName, this.myBag.get(itemName) + 1);
        } else {
            this.myBag.set(itemName, 1);
        }
        console.log(this.myBag);
    }

    /**
     * Removes an item from the bag of the character.
     * If the bag contains more than one of the item, it decreases the quantity of the item by 1.
     * Otherwise, it removes the item from the bag.
     *
     * @param {string} theItemName - The name of the item to remove from the bag.
     */
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

    /**
     * Returns the block percentage of the character.
     *
     * @returns {number} The block percentage of the character.
     */
    getBlockPercentage() {
        return this.myBlockPercentage;
    }

    /**
     * Checks if the character has all pillars.
     *
     * @returns {boolean} True if the character has all pillars, false otherwise.
     */
    hasPillars() {
        return this.myBag.has('Pillar of Abstraction') && this.myBag.has('Pillar of Inheritance') && this.myBag.has('Pillar of Polymorphism') && this.myBag.has('Pillar of Encapsulation');
    }

    /**
     * Sets the frozen status of the character.
     *
     * @param {number} theNum - The new frozen status of the character.
     */
    setIsFrozen(theNum) {
        this.myIsFrozen += theNum
    }

    /**
     * Returns the frozen status of the character.
     *
     * @returns {boolean} True if the character is frozen, false otherwise.
     */
    getIsFrozen() {
        return this.myIsFrozen > 0
    }
}