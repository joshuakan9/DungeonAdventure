class Exit extends Entity {
    interact() {
        window.dispatchEvent(new CustomEvent("e-game-over-victory", {detail: this}))
    }
}