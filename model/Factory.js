class Factory {
    myEntities;
    myOverworld;
    myImage;
    myMobCount;
    constructor() {

        this.myImage = createGraphics(CELLSIZE, CELLSIZE)
        this.myOverworld = [
            ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'wall', 'wall', 'wall'],
            ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'wall', 'wall', 'wall'],
            ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
            ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'wall', 'wall', 'wall'],
            ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'wall', 'wall', 'wall']
        ]
        this.myDungeonGenerator = new DungeonGenerator();
        this.myDungeon = this.myDungeonGenerator.getDungeon();
        this.myDungeonIndex = createVector(floor(this.myDungeon[0].length / 2), floor(this.myDungeon.length / 2))
        this.myDungeonImage = null
        this.myEntities = []
        this.myMobCount = this.myDungeonGenerator.getTotalMobCount();
        this.myInitialMobCount = this.myMobCount;

        for (let a = 0; a < this.myOverworld.length; a++) {
            this.myEntities.push([])
        }
    }

    getInitialMobCount() {
        return this.myInitialMobCount;
    }

    getMobCount() {
        return this.myMobCount;
    }

    addEntity(theEntity) {
        let thePos = theEntity.getPos()
        let cell = createVector(thePos.x, thePos.y)
        this.myEntities[cell.y][cell.x] = theEntity
        if (theEntity.getName() === 'ogre' || theEntity.getName() === 'skeleton' || theEntity.getName() === 'gremlin') {
            this.myMobCount++;
        }
    }
    removeEntity(theEntity) {
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        room.removeEntity(theEntity.getPos())
        if (theEntity.getName() === 'ogre' || theEntity.getName() === 'skeleton' || theEntity.getName() === 'gremlin') {
            this.myMobCount--;
        }
    }

    checkCollision(thePlayer, thePos) {
        let cell = createVector((thePos.x), (thePos.y))
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]

        let tilemap = room.getTileMap()
        let entityMap = room.getEntityMap()
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


        if (entityMap[cell.y][cell.x]) {
            return entityMap[cell.y][cell.x].collide(thePos)
        }

        return false
    }
    checkDoor(thePlayer, thePos) {
        let cell = createVector((thePos.x), (thePos.y))
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        if (room.getIsCollideDoor([cell.x, cell.y])) {
            window.dispatchEvent(new CustomEvent("e-transition"));
            console.log('collide with door!')
            console.log(this.myDungeonIndex)
            let direction = room.getIsCollideDoor([cell.x, cell.y])
            if (direction == 'north') {
                this.myDungeonIndex.add(createVector(0, -1))
                thePlayer.setPos(createVector(this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getSouthTeleportLocation()[1], this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getSouthTeleportLocation()[0]))
            } else if (direction == 'south') {
                this.myDungeonIndex.add(createVector(0, 1))
                thePlayer.setPos(createVector(this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getNorthTeleportLocation()[1], this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getNorthTeleportLocation()[0]))

            } else if (direction == 'east') {
                this.myDungeonIndex.add(createVector(1, 0))
                thePlayer.setPos(createVector(this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getWestTeleportLocation()[1], this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getWestTeleportLocation()[0]))

            } else if (direction == 'west') {
                this.myDungeonIndex.add(createVector(-1, 0))
                thePlayer.setPos(createVector(this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getEastTeleportLocation()[1], this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x].getEastTeleportLocation()[0]))

            }
            thePlayer.setDirection(null)

            return true
        }
        return false
    }

    step(theDelta) {
        // let thePos = thePlayer.getPos()
        // let cell = createVector(round(thePos.x), round(thePos.y))
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        let entityMap = room.getEntityMap()
        for (let a = 0; a < entityMap.length; a++) {

            for (let b = 0; b < entityMap[0].length; b++) {


                if (entityMap[a][b]) {
                    // console.log(entitymap[a][b])
                    entityMap[a][b].step(theDelta)
                    // this.myEntities[a][b].step()
                }
            }
        }
    }
    draw(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x), round(thePos.y))
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        let entityMap = room.getEntityMap()
        // for (let a = cell.y - 8; a < cell.y + 9; a++) {
        //     if (a < 0 || a >= this.myOverworld.length) {
        //         continue
        //     }
        //     for (let b = cell.x - 8; b < cell.x + 9; b++) {
        //         if (b < 0 || b >= this.myOverworld[0].length) {
        //             continue
        //         }
        //         if (this.myEntities[a][b]) {
        //             this.myEntities[a][b].draw()
        //         }
        //     }
        // }

        for (let a = 0; a < entityMap.length; a++) {

            for (let b = 0; b < entityMap[0].length; b++) {


                if (entityMap[a][b]) {
                    // console.log(entitymap[a][b])
                    entityMap[a][b].draw()

                }
            }
        }

        // for (let a = 0; a < this.myEntities.length; a++) {
        //     this.myEntities[a].draw()
        // }
    }

    interact(thePlayer) {
        let thePos = thePlayer.getPos()
        let room = this.myDungeon[this.myDungeonIndex.y][this.myDungeonIndex.x]
        let entityMap = room.getEntityMap()
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
            if (entityMap[cell.y][cell.x]) {
                console.log(entityMap[cell.y][cell.x])
                console.log(entityMap[cell.y][cell.x].interact())
            }
        }
    }

    drawOverworld(thePlayer) {
        let thePos = thePlayer.getPos()
        let cell = createVector(round(thePos.x), round(thePos.y))
        push()
        for (let a = cell.y - 8; a < cell.y + 9; a++) {
            if (a < 0 || a >= this.myOverworld.length) {
                continue
            }
            for (let b = cell.x - 8; b < cell.x + 9; b++) {
                if (b < 0 || b >= this.myOverworld[0].length) {
                    continue
                }
                if (this.myOverworld[a][b] != 'wall') {
                    this.myImage.background(this.myOverworld[a][b])
                    image(this.myImage, getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)
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
        randomSeed(room.getSeed())
        let tileSeed = []
        for (let a = 0; a < tilemap.length; a++) {
            tileSeed.push([])
            for (let b = 0; b < tilemap[0].length; b++) {
                tileSeed[a][b] = random(-8192, 8192)
            }
        }


        push()

        for (let a = cell.y - 8; a < cell.y + 9; a++) {

            if (a < 0 || a >= tilemap.length) {

                continue
            }
            for (let b = cell.x - 8; b < cell.x + 9; b++) {

                if (b < 0 || b >= tilemap[0].length) {
                    continue
                }
                randomSeed(tileSeed[a][b])

                if (tilemap[a][b] == WORLD.WALL_LEFT) {
                    if (!this.myWallLeftImages) {
                        this.myWallLeftImages = [
                            TILEMAP.get(0 * 16, 13 * 16, 16, 16),
                        ]
                    }
                    image(random(this.myWallLeftImages), getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)
                } else if (tilemap[a][b] == WORLD.WALL_RIGHT) {
                    if (!this.myWallRightImages) {
                        this.myWallRightImages = [
                            TILEMAP.get(1 * 16, 13 * 16, 16, 16),
                        ]
                    }
                    image(random(this.myWallRightImages), getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)
                } else if (tilemap[a][b] == WORLD.WALL_BOTTOM) {
                    if (!this.myWallBottomImages) {
                        this.myWallBottomImages = [
                            TILEMAP.get(2 * 16, 0, 16, 32),
                        ]
                    }
                    image(random(this.myWallBottomImages), getCellToPos(b), getCellToPos(a) - CELLSIZE, CELLSIZE, CELLSIZE * 2)
                } else if (tilemap[a][b] == WORLD.WALL_TOP) {
                    if (!this.myWallBottomImages) {
                        this.myWallBottomImages = [
                            TILEMAP.get(2 * 16, 0, 16, 32),
                        ]
                    }
                    image(random(this.myWallBottomImages), getCellToPos(b), getCellToPos(a) - CELLSIZE, CELLSIZE, CELLSIZE * 2)
                } else if (tilemap[a][b] == WORLD.WALL_TOPLEFTCORNER) {
                    if (!this.myWallTopLeftImages) {
                        this.myWallTopLeftImages = [
                            TILEMAP.get(2 * 16, 12 * 16, 16, 32),
                        ]
                    }
                    image(random(this.myWallTopLeftImages), getCellToPos(b) + CELLSIZE - (5 * M), getCellToPos(a) - CELLSIZE, CELLSIZE, CELLSIZE * 2)
                } else if (tilemap[a][b] == WORLD.WALL_TOPRIGHTCORNER) {
                    if (!this.myWallTopRightImages) {
                        this.myWallTopRightImages = [
                            TILEMAP.get(3 * 16, 12 * 16, 16, 32),
                        ]
                    }
                    image(random(this.myWallTopRightImages), getCellToPos(b) - CELLSIZE + (5 * M), getCellToPos(a) - CELLSIZE, CELLSIZE, CELLSIZE * 2)
                } else if (tilemap[a][b] == WORLD.WALL_BOTTOMRIGHTCORNER) {
                    if (!this.myWallBottomRightImages) {
                        this.myWallBottomRightImages = [
                            TILEMAP.get(3 * 16, 14 * 16, 16, 32),
                        ]
                    }
                    image(random(this.myWallBottomRightImages), getCellToPos(b) - CELLSIZE + (5 * M), getCellToPos(a) - CELLSIZE, CELLSIZE, CELLSIZE * 2)
                } else if (tilemap[a][b] == WORLD.WALL_BOTTOMLEFTCORNER) {
                    if (!this.myWallBottomLeftImages) {
                        this.myWallBottomLeftImages = [
                            TILEMAP.get(2 * 16, 14 * 16, 16, 32),
                        ]
                    }
                    image(random(this.myWallBottomLeftImages), getCellToPos(b) + CELLSIZE - (5 * M), getCellToPos(a) - CELLSIZE, CELLSIZE, CELLSIZE * 2)
                } else if (tilemap[a][b] == WORLD.GROUND) {
                    if (!this.myGroundImages) {
                        this.myGroundImages = [
                            TILEMAP.get(1 * 16, 4 * 16, 16, 16),
                            TILEMAP.get(2 * 16, 4 * 16, 16, 16),
                            TILEMAP.get(3 * 16, 4 * 16, 16, 16),
                            TILEMAP.get(1 * 16, 5 * 16, 16, 16),
                            TILEMAP.get(2 * 16, 5 * 16, 16, 16),
                            TILEMAP.get(3 * 16, 5 * 16, 16, 16),
                            TILEMAP.get(1 * 16, 6 * 16, 16, 16),
                            TILEMAP.get(2 * 16, 6 * 16, 16, 16)
                        ]
                    }
                    image(random(this.myGroundImages), getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)
                }
            }
        }
        pop()
        randomSeed(room.getSeed())
    }
}