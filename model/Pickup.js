class Pickup extends Entity {
    interact() {
        if (this.myName === "Health Potion") {
            window.dispatchEvent(new CustomEvent("e-pickup", {detail: this}))
        } else if (this.myName === "Exit") {
            window.dispatchEvent(new CustomEvent("e-game-over-victory", {detail: this}))
        }
    }
}