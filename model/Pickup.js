class Pickup extends Entity {
    interact() {
        window.dispatchEvent(new CustomEvent("e-pickup", {detail: this}))
    }
}