/**
 * Class representing a Priest, which is a type of Character.
 * @extends Character
 */
class Priest extends Character {
    /**
     * @property {Object} myHeal - The healing function of the Priest.
     */

    /**
     * Create a Priest.
     * @param {Object} param0 - The properties of the Priest.
     * @param {Object} param0.thePos - The position of the Priest.
     * @param {Object} param0.theSize - The size of the Priest.
     * @param {Object} param0.theImage - The image of the Priest.
     * @param {boolean} param0.theIsCollideable - Whether the Priest is collideable.
     * @param {number} param0.theHFrames - The horizontal frames of the Priest.
     * @param {number} param0.theVFrames - The vertical frames of the Priest.
     * @param {number} param0.theFrame - The frame of the Priest.
     * @param {Object} param0.theFrameSize - The frame size of the Priest.
     * @param {Object} param0.theOffset - The offset of the Priest.
     * @param {Object} param0.theAnimation - The animation of the Priest.
     * @param {string} param0.theName - The name of the Priest.
     * @param {number} param0.theHitPoints - The hit points of the Priest.
     * @param {Function} param0.theAttack - The attack function of the Priest.
     * @param {number} param0.theStamina - The stamina of the Priest.
     * @param {Object} param0.theBag - The bag of the Priest.
     * @param {number} param0.theBlockPercentage - The block percentage of the Priest.
     * @param {number} param0.theMaxHitPoints - The maximum hit points of the Priest.
     * @param {Object} param0.theHeal - The healing function of the Priest.
     */
    constructor ({thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints, theHeal}) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints})
        this.myHeal = theHeal;
    }

    /**
     * Get the healing function of the Priest.
     * @returns {Object} The healing function of the Priest.
     */
    getHeal() {
        return this.myHeal;
    }

    /**
     * Heal the Priest by the amount specified in the healing function.
     */
    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    /**
     * Increase the healing amount of the Priest by 25.
     */
    buff() {
        this.myHeal.setHealAmount(this.myHeal.getHealAmount() + 25);
    }

    /**
     * Get the class of the Priest.
     * @returns {string} The class of the Priest.
     */
    getClass() {
        return "Priest";
    }
}