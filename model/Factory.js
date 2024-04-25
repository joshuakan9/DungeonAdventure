class Factory {
    myEntities;
    myOverworld;
    myImage;
    constructor() {
        this.myEntities = []
        this.myImage = createGraphics(cellSize,cellSize)
        this.myOverworld = [
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','white','white','white'],
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','wall','wall','wall']
        ]
    }
    addEntity(theEntity) {
        this.myEntities.push(theEntity)
    }
    checkCollision(thePos) {
        let cell = createVector(round(thePos.x / cellSize), round(thePos.y / cellSize))
        if (cell.x < 0 || cell.y < 0 || cell.x >= this.myOverworld[0].length || cell.y >= this.myOverworld.length) {
            return true
        }
        if (this.myOverworld[cell.y][cell.x] == 'wall') {
            return true
        }
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

    drawOverworld() {
        push()
        for (let a = 0; a < this.myOverworld.length; a++) {
            for (let b = 0; b < this.myOverworld[a].length; b++) {
                if (this.myOverworld[a][b] != 'wall') {
                    this.myImage.background(this.myOverworld[a][b])
                    image(this.myImage,getCell(b),getCell(a))
                }

            }
        }
        pop()
    }
}