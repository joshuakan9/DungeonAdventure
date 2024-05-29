/**
 * Class representing a Mob, which is a type of Entity.
 * @extends Entity
 */
class Mob extends Entity {
    /**
     * @property {Function} mySpecialAttack - The special attack function of the Mob.
     * @property {Object} myHeal - The healing function of the Mob.
     */

    /**
     * Create a Mob.
     * @param {Object} param0 - The properties of the Mob.
     * @param {Object} param0.thePos - The position of the Mob.
     * @param {Object} param0.theSize - The size of the Mob.
     * @param {Object} param0.theImage - The image of the Mob.
     * @param {boolean} param0.theIsCollideable - Whether the Mob is collideable.
     * @param {number} param0.theHFrames - The horizontal frames of the Mob.
     * @param {number} param0.theVFrames - The vertical frames of the Mob.
     * @param {number} param0.theFrame - The frame of the Mob.
     * @param {Object} param0.theFrameSize - The frame size of the Mob.
     * @param {Object} param0.theOffset - The offset of the Mob.
     * @param {Object} param0.theAnimation - The animation of the Mob.
     * @param {string} param0.theName - The name of the Mob.
     * @param {number} param0.theHitPoints - The hit points of the Mob.
     * @param {Function} param0.theAttack - The attack function of the Mob.
     * @param {Function} param0.theSpecialAttack - The special attack function of the Mob.
     * @param {Object} param0.theHeal - The healing function of the Mob.
     */
    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName, theHitPoints, theAttack, theSpecialAttack, theHeal, theDirection }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation, theName, theHitPoints, theAttack, theDirection })
        this.mySpecialAttack = theSpecialAttack;
        this.myHeal = theHeal;
    }

    /**
     * Get the special attack function of the Mob.
     * @returns {Function} The special attack function of the Mob.
     */
    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    /**
     * Heal the Mob by the amount specified in the healing function.
     */
    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    /**
     * Get the healing function of the Mob.
     * @returns {Object} The healing function of the Mob.
     */
    getHeal() {
        return this.myHeal;
    }

    /**
     * Trigger an interaction with the Mob, which starts a battle.
     */
    interact() {
        window.dispatchEvent(new CustomEvent("e-battle-start", {detail: this}))
    }
}