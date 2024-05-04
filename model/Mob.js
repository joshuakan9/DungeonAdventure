class Mob extends Entity {
    interact() {
        window.dispatchEvent(new CustomEvent("e-start-battle", {detail: this}))
    }
}