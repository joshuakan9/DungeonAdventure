class Factory {
    myEntities;
    constructor() {
        this.myEntities = []
    }
    addEntity(theEntity) {
        this.myEntities.push(theEntity)
    }
    checkCollision(thePos) {
        for (let a = 0; a < this.myEntities.length; a++) {
            if (this.myEntities[a].collide(thePos)) {
                return true
            }
        }
        return false
    }
    draw() {
        for (let a = 0; a < this.myEntities.length; a++) {
            this.myEntities[a].draw()
        }
    }
}