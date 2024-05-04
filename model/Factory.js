class Factory {
    myEntities;
    myOverworld;
    myImage;
    constructor() {

        this.myImage = createGraphics(CELLSIZE,CELLSIZE)
        this.myOverworld = [
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','white','white','white'],
            ['white','white','white','white','white','white','white','wall','wall','wall'],
            ['white','white','white','white','white','white','white','wall','wall','wall']
        ]
        this.myDungeon = new DungeonGenerator().getDungeon()
        this.myDungeonImage = null
        this.myEntities = []
        for (let a = 0; a < this.myOverworld.length; a++) {
            this.myEntities.push([])
        }
    }
    addEntity(theEntity) {
        let thePos = theEntity.getPos()
        let cell = createVector(thePos.x, thePos.y)
        this.myEntities[cell.y][cell.x] = theEntity
    }
    checkCollision(thePos) {
        let cell = createVector(round(thePos.x / CELLSIZE), round(thePos.y / CELLSIZE))
        // if (cell.x < 0 || cell.y < 0 || cell.x >= this.myOverworld[0].length || cell.y >= this.myOverworld.length) {
        //     return true
        // }
        // if (this.myOverworld[cell.y][cell.x] == 'wall') {
        //     return true
        // }

        // if (this.myEntities[cell.y][cell.x]) {
        //     return this.myEntities[cell.y][cell.x].collide(thePos)
        // }
        
        return false
    }
    draw(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x / CELLSIZE), round(thePos.y / CELLSIZE))
        for (let a = cell.y - 9; a < cell.y + 9; a++) {
            for (let b = cell.x - 9; b < cell.x + 9; b++) {
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
        if (Number.isInteger(thePos.x + thePos.y)) {
            let theDirection = thePlayer.getDirection()
            let cell = createVector(thePos.x, thePos.y)


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
                console.log(this.myEntities[cell.y][cell.x])
                console.log(this.myEntities[cell.y][cell.x].interact())
            }
        }
    }

    drawOverworld() {
        push()
        for (let a = 0; a < this.myOverworld.length; a++) {
            for (let b = 0; b < this.myOverworld[a].length; b++) {
                if (this.myOverworld[a][b] != 'wall') {
                    this.myImage.background(this.myOverworld[a][b])
                    image(this.myImage,getCellToPos(b),getCellToPos(a), CELLSIZE, CELLSIZE)
                }

            }
        }
        pop()
    }

    drawDungeon(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x / CELLSIZE), round(thePos.y / CELLSIZE))
        push()
        for (let a = cell.y-9; a < cell.y+9; a++) {
            for (let b = cell.x-9; b < cell.x + 9; b++) {
                if (b < 0 || a < 0 || b >= this.myDungeon[0].length || a >= this.myDungeon.length) {
                    continue
                }
                if (this.myDungeon[a][b] == 'wall') {
                    this.myImage.background('blue')
                    image(this.myImage,getCell(b),getCell(a))
                } else if (this.myDungeon[a][b] == null) {
                    this.myImage.background('black')
                    image(this.myImage,getCell(b),getCell(a))
                } else if (this.myDungeon[a][b] == 'ground') {
                    this.myImage.background('white')
                    image(this.myImage,getCell(b),getCell(a))
                }

            }
        }
        pop()
    }
}