/**
 * Class representing a Warrior, which is a type of Character.
 * @extends Character
 */
class Warrior extends Character {
    /**
     * @property {Function} mySpecialAttack - The special attack function of the Warrior.
     */

    /**
     * Create a Warrior.
     * @param {Object} param0 - The properties of the Warrior.
     * @param {Object} param0.thePos - The position of the Warrior.
     * @param {Object} param0.theSize - The size of the Warrior.
     * @param {Object} param0.theImage - The image of the Warrior.
     * @param {boolean} param0.theIsCollideable - Whether the Warrior is collideable.
     * @param {number} param0.theHFrames - The horizontal frames of the Warrior.
     * @param {number} param0.theVFrames - The vertical frames of the Warrior.
     * @param {number} param0.theFrame - The frame of the Warrior.
     * @param {Object} param0.theFrameSize - The frame size of the Warrior.
     * @param {Object} param0.theOffset - The offset of the Warrior.
     * @param {Object} param0.theAnimation - The animation of the Warrior.
     * @param {string} param0.theName - The name of the Warrior.
     * @param {number} param0.theHitPoints - The hit points of the Warrior.
     * @param {Function} param0.theAttack - The attack function of the Warrior.
     * @param {number} param0.theStamina - The stamina of the Warrior.
     * @param {Object} param0.theBag - The bag of the Warrior.
     * @param {number} param0.theBlockPercentage - The block percentage of the Warrior.
     * @param {number} param0.theMaxHitPoints - The maximum hit points of the Warrior.
     * @param {Function} param0.theSpecialAttack - The special attack function of the Warrior.
     */
    constructor({thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints, theSpecialAttack}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints})
        this.mySpecialAttack = theSpecialAttack;
    }

    /**
     * Get the special attack function of the Warrior.
     * @returns {Function} The special attack function of the Warrior.
     */
    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    /**
     * Increase the block percentage of the Warrior by 5.
     */
    buff() {
        this.myBlockPercentage += 5;
    }

    /**
     * Get the class of the Warrior.
     * @returns {string} The class of the Warrior.
     */
    getClass() {
        return "Warrior";
    }
}