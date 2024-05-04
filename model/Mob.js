class Mob extends Entity {
    interact() {
        window.dispatchEvent(new CustomEvent("e-battle-start", {detail: this}))
    }
}