/**
 * Heal class is used to manage the healing effect in a game.
 * It provides methods to get and set the heal amount and heal percentage.
 */
class Heal {
    /**
     * Constructs a new instance of the Heal class.
     * @param {number} theHealAmount - The amount of healing.
     * @param {number} theHealPercentage - The percentage of healing.
     */
    constructor(theHealAmount, theHealPercentage) {
        this.myHealPercentage = theHealPercentage;
        this.myHealAmount = theHealAmount;
    }

    /**
     * Gets the heal amount.
     * @return {number} The heal amount.
     */
    getHealAmount() {
        return this.myHealAmount;
    }

    /**
     * Gets the heal percentage.
     * @return {number} The heal percentage.
     */
    getHealPercentage() {
        return this.myHealPercentage;
    }

    /**
     * Sets the heal amount.
     * @param {number} theHealAmount - The new heal amount.
     */
    setHealAmount(theHealAmount) {
        this.myHealAmount = theHealAmount;
    }

    /**
     * Sets the heal percentage.
     * @param {number} theHealPercentage - The new heal percentage.
     */
    setHealPercentage(theHealPercentage) {
        this.myHealPercentage = theHealPercentage;
    }
}