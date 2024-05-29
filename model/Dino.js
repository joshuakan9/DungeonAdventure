/**
 * Assassin is a class that extends Character. It represents an assassin character in the game.
 */
class Dino extends Character {

    /**
     * The special attack of the assassin.
     * @type {Object}
     */
    mySpecialAttack;

    /**
     * Constructs a new Assassin instance.
     *
     * @param {Object} params - The parameters for creating an assassin.
     * @param {Object} params.thePos - The position of the assassin.
     * @param {Object} params.theSize - The size of the assassin.
     * @param {Object} params.theImage - The image of the assassin.
     * @param {boolean} params.theIsCollideable - Whether the assassin is collideable.
     * @param {number} params.theHFrames - The number of horizontal frames for the assassin's animation.
     * @param {number} params.theVFrames - The number of vertical frames for the assassin's animation.
     * @param {Object} params.theFrame - The current frame of the assassin's animation.
     * @param {Object} params.theFrameSize - The size of each frame in the assassin's animation.
     * @param {Object} params.theOffset - The offset of the assassin's animation.
     * @param {Object} params.theAnimation - The animation of the assassin.
     * @param {string} params.theName - The name of the assassin.
     * @param {number} params.theHitPoints - The hit points of the assassin.
     * @param {Object} params.theAttack - The attack of the assassin.
     * @param {number} params.theStamina - The stamina of the assassin.
     * @param {Object} params.theBag - The bag of the assassin.
     * @param {number} params.theBlockPercentage - The block percentage of the assassin.
     * @param {number} params.theMaxHitPoints - The maximum hit points of the assassin.
     * @param {Object} params.theSpecialAttack - The special attack of the assassin.
     */
    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints, theSpecialAttack }) {
        super({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset,theAnimation, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theMaxHitPoints});
        this.mySpecialAttack = theSpecialAttack;
    }

    /**
     * Returns the special attack of the assassin.
     *
     * @returns {Object} The special attack of the assassin.
     */
    getSpecialAttack() {
        return this.mySpecialAttack;
    }

    /**
     * Buffs the assassin by increasing the damage of its attack and special attack.
     */
    buff() {
        this.myAttack.setDamage(this.myAttack.getDamage() + 5);
        this.mySpecialAttack.setDamage(this.myAttack.getDamage() + 10);
    }

    /**
     * Returns the class of the assassin.
     *
     * @returns {string} The class of the assassin.
     */
    getClass() {
        return "Dino";
    }
}