/**
 * Class representing a Pickup, which is a type of Entity.
 * @extends Entity
 */
class Pickup extends Entity {
    /**
     * Trigger an interaction with the Pickup.
     * If the Pickup is a "Health Potion", it dispatches an "e-pickup" event.
     * If the Pickup is an "Exit", it dispatches an "e-game-over-victory" event.
     */
    interact() {
        if (this.myName === "Health Potion") {
            window.dispatchEvent(new CustomEvent("e-pickup", {detail: this}))
        } else if (this.myName === "Exit") {
            window.dispatchEvent(new CustomEvent("e-game-over-victory", {detail: this}))
        }
    }
}