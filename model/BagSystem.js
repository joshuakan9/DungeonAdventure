/**
 * BagSystem is a class that manages the player's bag system in the game.
 */
class BagSystem {
    /**
     * The player.
     * @type {Object}
     */
    myPlayer;

    /**
     * The bag of the player.
     * @type {Object}
     */
    myBag;

    /**
     * The hit points of the player.
     * @type {number}
     */
    myHitPoints;

    /**
     * Constructs a new BagSystem instance.
     *
     * @param {Object} thePlayer - The player.
     */
    constructor(thePlayer) {
        this.myPlayer = thePlayer;
        this.myBag = thePlayer.getBag();
        this.myHitPoints = thePlayer.getHitPoints();
    }

    /**
     * Sets the player.
     *
     * @param {Object} thePlayer - The new player.
     */
    setPlayer(thePlayer) {
        this.myPlayer = thePlayer
    }

    /**
     * Handles the mouse clicked event.
     * If the player has a health potion in the bag and clicks on the health potion in the menu,
     * the player uses the health potion.
     */
    mouseClicked() {
        let menuWidth = width * 0.6
        let menuHeight = width * 0.5
        console.log(this.myPlayer.getBag())
        if (
            mouseX >= width / 2 - menuWidth / 2 &&
            mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
            mouseY >= height / 2.25 - menuHeight / 2 &&
            mouseY <= height / 2.25 - menuHeight / 2 + menuHeight * 0.2)
        {
            if (this.myPlayer.getBag().has("Health Potion")) {
                if (this.myPlayer.getBag().get("Health Potion") > 0) {
                    this.playerUseHealthPotion();
                    console.log('player used health potion');
                }
            }
        }
    }

    /**
     * Makes the player use a health potion.
     * If the player is already at full health, it does nothing.
     * If the player's hit points after using the health potion would exceed the player's maximum hit points,
     * it sets the player's hit points to the player's maximum hit points.
     * Otherwise, it increases the player's hit points by the heal amount.
     * It removes a health potion from the player's bag and dispatches a "e-player-use-health-potion" event.
     */
    playerUseHealthPotion() {
        let healAmount = floor(Math.random()*50 + 50);
        if (this.myPlayer.getHitPoints() === this.myPlayer.getMaxHitPoints()) {
            console.log("player is already at full health");
            window.dispatchEvent(new Event("e-player-already-full-health"));
            return;
        } else if (this.myPlayer.getHitPoints() + healAmount > this.myPlayer.getMaxHitPoints()) {
            healAmount = this.myPlayer.getMaxHitPoints() - this.myPlayer.getHitPoints();
            this.myPlayer.setHitPoints(this.myPlayer.getMaxHitPoints());
        } else {
            this.myPlayer.setHitPoints(this.myPlayer.getHitPoints() + healAmount);
        }
        this.myPlayer.removeBag("Health Potion");
        window.dispatchEvent(new CustomEvent("e-player-use-health-potion", {detail: healAmount}));
    }
}