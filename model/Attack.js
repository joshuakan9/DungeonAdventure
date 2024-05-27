/**
 * Attack is a class that represents an attack in the game.
 */
class Attack {
    /**
     * The damage of the attack.
     * @type {number}
     */
    myDamage;

    /**
     * The hit percentage of the attack.
     * @type {number}
     */
    myHitPercentage;

    /**
     * Constructs a new Attack instance.
     *
     * @param {number} theDamage - The damage of the attack.
     * @param {number} theHitPercentage - The hit percentage of the attack.
     */
    constructor(theDamage, theHitPercentage) {
        this.myDamage = theDamage;
        this.myHitPercentage = theHitPercentage;
    }

    /**
     * Returns the damage of the attack.
     *
     * @returns {number} The damage of the attack.
     */
    getDamage() {
        return this.myDamage;
    }

    /**
     * Returns the hit percentage of the attack.
     *
     * @returns {number} The hit percentage of the attack.
     */
    getHitPercentage() {
        return this.myHitPercentage;
    }

    /**
     * Sets the damage of the attack.
     *
     * @param {number} theDamage - The new damage of the attack.
     */
    setDamage(theDamage) {
        this.myDamage = theDamage;
    }

    /**
     * Sets the hit percentage of the attack.
     *
     * @param {number} theHitPercentage - The new hit percentage of the attack.
     */
    setHitPercentage(theHitPercentage) {
        this.myHitPercentage = theHitPercentage;
    }
}