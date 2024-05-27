/**
 * Class representing a BagDisplay.
 */
class BagDisplay {
    /**
     * @property {Object} myBag - The bag of the BagDisplay.
     * @property {boolean} myIsPaused - Whether the BagDisplay is paused.
     */

    /**
     * Create a BagDisplay.
     */
    constructor() {
        this.myIsPaused = false;
    }

    /**
     * Handle a key press event.
     * If the key code is 66 (b), toggle the paused state.
     */
    keyPressed() {
        if (keyCode === 66) { // b
            this.setIsPaused();
        }
    }

    /**
     * Handle a mouse click event.
     * If the mouse is clicked within a certain area and the BagDisplay is paused, log 'exit' and toggle the paused state.
     */
    mouseClicked() {
        //...
    }

    /**
     * Draw the BagDisplay.
     * If the BagDisplay is paused, draw the bag and its items.
     * @param {Object} thePlayer - The player to get the bag from.
     */
    draw(thePlayer) {
        //...
    }

    /**
     * Get whether the BagDisplay is paused.
     * @returns {boolean} Whether the BagDisplay is paused.
     */
    getIsPaused() {
        return this.myIsPaused;
    }

    /**
     * Toggle the paused state of the BagDisplay.
     */
    setIsPaused() {
        this.myIsPaused = !this.myIsPaused;
    }
}