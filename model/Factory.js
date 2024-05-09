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
        this.myDungeonIndex = createVector(floor(this.myDungeon[0].length / 2), floor(this.myDungeon.length / 2))
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
        let cell = createVector((thePos.x), (thePos.y))
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        console.log(room)
        let tilemap = room.getTileMap()
        if (cell.x < 0 || cell.y < 0 || cell.x >= tilemap[0].length || cell.y >= tilemap.length) {
            return true
        }
        if (tilemap[cell.y][cell.x] == WORLD.WALL_BOTTOM ||
            tilemap[cell.y][cell.x] == WORLD.WALL_LEFT ||
            tilemap[cell.y][cell.x] == WORLD.WALL_RIGHT ||
            tilemap[cell.y][cell.x] == WORLD.WALL_TOP
        ) {
            return true
        }

        // if (this.myEntities[cell.y][cell.x]) {
        //     return this.myEntities[cell.y][cell.x].collide(thePos)
        // }
        
        return false
    }
    draw(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x), round(thePos.y))
        for (let a = cell.y - 8; a < cell.y + 9; a++) {
            if (a < 0 || a >= this.myOverworld.length) {
                continue
            }
            for (let b = cell.x - 8; b < cell.x + 9; b++) {
                if (b < 0 || b >= this.myOverworld[0].length) {
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

    drawOverworld(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x), round(thePos.y))
        push()
        for (let a = cell.y-8; a < cell.y + 9; a++) {
            if (a < 0 || a >= this.myOverworld.length) {
                continue
            }
            for (let b = cell.x - 8; b < cell.x + 9; b++) {
                if (b < 0 || b >= this.myOverworld[0].length) {
                    continue
                }
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
        let cell = createVector(round(thePos.x), round(thePos.y))
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        let tilemap = room.getTileMap()

        push()
        for (let a = cell.y-8; a < cell.y+9; a++) {
            for (let b = cell.x-8; b < cell.x + 9; b++) {
                if (b < 0 || a < 0 || b >= tilemap[0].length || a >= tilemap.length) {
                    continue
                }

                if (tilemap[a][b] == '|') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '_') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '‾') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '⌜') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '⌝') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '⌟') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '⌞') {
                    this.myImage.background('blue')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                } else if (tilemap[a][b] == '□') {
                    this.myImage.background('white')
                    image(this.myImage,getCellToPos(b),getCellToPos(a))
                }

            }
        }
        pop()
    }


}