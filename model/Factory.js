class Factory {
    myEntities;
    myOverworld;
    myImage;
    constructor() {

        this.myImage = createGraphics(cellSize,cellSize)
        this.myOverworld = [
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','white','white','white'],
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','wall','wall','wall']
        ]
        this.myEntities = []
        for (let a = 0; a < this.myOverworld.length; a++) {
            this.myEntities.push([])
        }
    }
    addEntity(theEntity) {
        let thePos = theEntity.getPos()
        let cell = createVector(round(thePos.x / cellSize), round(thePos.y / cellSize))
        this.myEntities[cell.y][cell.x] = theEntity
    }
    checkCollision(thePos) {
        let cell = createVector(round(thePos.x / cellSize), round(thePos.y / cellSize))
        if (cell.x < 0 || cell.y < 0 || cell.x >= this.myOverworld[0].length || cell.y >= this.myOverworld.length) {
            return true
        }
        if (this.myOverworld[cell.y][cell.x] == 'wall') {
            return true
        }

        if (this.myEntities[cell.y][cell.x]) {
            return this.myEntities[cell.y][cell.x].collide(thePos)
        }
        
        return false
    }
    draw(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x / cellSize), round(thePos.y / cellSize))
        for (let a = cell.y - 8; a < cell.y + 8; a++) {
            for (let b = cell.x - 8; b < cell.x + 8; b++) {
                if (b < 0 || a < 0 || b >= this.myOverworld[0].length || a >= this.myOverworld.length) {
                    continue
                }
                if (this.myEntities[a][b]) {
                    this.myEntities[a][b].draw()
                }
            }
        }
        // for (let a = 0; a < this.myEntities.length; a++) {
        //     this.myEntities[a].draw()
        // }
    }

    interact(thePlayer) {
        let thePos = thePlayer.getPos()
        let theDirection = thePlayer.getDirection()
        let cell = createVector(round(thePos.x / cellSize), round(thePos.y / cellSize))

        if (theDirection == 'north') {
            cell.add(createVector(0, -1))
        } else if (theDirection == 'east') {
            cell.add(createVector(1, 0))
        } else if (theDirection == 'south') {
            cell.add(createVector(0, 1))
        } else if (theDirection == 'west') {
            cell.add(createVector(-1, 0))
        }

        console.log('interact ')
        console.log(theDirection)
        if (this.myEntities[cell.y][cell.x]) {
            console.log(this.myEntities[cell.y][cell.x].interact())
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