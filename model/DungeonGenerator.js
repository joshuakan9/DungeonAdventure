/**
 * DungeonGenerator class is responsible for generating a dungeon layout.
 * It creates an initial dungeon layout and then generates rooms and doors.
 * It also converts the dungeon layout into a final layout with rooms and entities.
 */
class DungeonGenerator {
    myRows;
    myCols;
    myInitialRow;
    myInitialCol;
    myDungeon;
    myRoomCode;
    myNoRoomCode;
    myDungeonFinal;
    myTotalMobCount;

    /**
     * Constructor for DungeonGenerator class.
     * Initializes properties and calls methods to create and generate the dungeon.
     */
    constructor() {
        this.myRows = 7;
        this.myCols = 7;
        this.myInitialRow = Math.floor(this.myRows / 2);
        this.myInitialCol = Math.floor(this.myCols / 2);
        this.myDungeon = [];
        this.myRoomCode = '□'
        this.myNoRoomCode = '■'
        this.myDungeonFinal = [];
        this.myTotalMobCount = 0;

        this.createInitialDungeon(this.myRows, this.myCols);
        this.generate();
        this.convert();
    }

    /**
     * getTotalMobCount()
     * This method returns the total number of mobs (enemies) in the dungeon.
     * @returns {number} The total number of mobs in the dungeon.
     */
    getTotalMobCount() {
        return this.myTotalMobCount;
    }

    /**
     * getDungeon()
     * This method returns the final layout of the dungeon.
     * @returns {Array} The final layout of the dungeon.
     */
    getDungeon() {
        return this.myDungeonFinal;
    }

    /**
     * convert()
     * This method converts the initial dungeon layout into the final layout. It creates rooms based on templates,
     * sets up the starting room with certain entities (like health potions and an exit), and generates doors between rooms.
     */
    convert() {

        for (let a = 0; a < this.myDungeon.length; a++) {
            for (let b = 0; b < this.myDungeon[0].length; b++) {
                let roomTemplates = [

                    [
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□']
                    ],

                    [
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□']
                    ],

                    [
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□']
                    ],

                    [
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
                        ['□', '□', '□', '□', '□', '□', '□', '□', '□']
                    ]
                ]
                let currentRoom = null;
                if (this.myDungeon[a][b] === this.myRoomCode) {
                    currentRoom = new Room(random(roomTemplates));
                    this.myDungeonFinal[a][b] = currentRoom;

                }
            }
        }

        let startingRoom = [];
        let startingEntityMap = [];
        for (let i = 0; i < 13; i++) {
            startingRoom.push(Array(13).fill('□'));
            startingEntityMap.push(Array(13).fill(null));
        }
        startingEntityMap[3][3] = EntityFactory.createEntity('health potion', createVector(3, 3));
        startingEntityMap[3][9] = EntityFactory.createEntity('health potion', createVector(9, 3));
        startingEntityMap[9][3] = EntityFactory.createEntity('health potion', createVector(3, 9));
        startingEntityMap[9][9] = EntityFactory.createEntity('health potion', createVector(9, 9));
        startingEntityMap[6][6] = EntityFactory.createEntity('exit', createVector(6, 6));

        this.myDungeonFinal[Math.floor(this.myDungeonFinal.length / 2)][Math.floor(this.myDungeonFinal[0].length / 2)] = new Room(startingRoom);

        this.generateDoors();
        for (let a = 0; a < this.myDungeonFinal.length; a++) {
            for (let b = 0; b < this.myDungeonFinal[0].length; b++) {
                if (this.myDungeonFinal[a][b] instanceof Room) {
                    this.myDungeonFinal[a][b].createDoors();

                    if (a === Math.floor(this.myDungeonFinal.length / 2) && b === Math.floor(this.myDungeonFinal[0].length / 2)) {
                        this.myDungeonFinal[a][b].myEntityMap = startingEntityMap;

                    } else {
                        this.myDungeonFinal[a][b].populateEntityMap();
                        this.myTotalMobCount += this.myDungeonFinal[a][b].getMobCount();
                    }
                    //console.log(`Room at (${a}, ${b}):`, this.myDungeonFinal[a][b]);
                }
            }
        }
        console.log('total mob count = ' + this.myTotalMobCount)
    }

    /**
     * generateDoors()
     * This method checks each room in the dungeon and sets doors to adjacent rooms.
     */
    generateDoors() {
        for (let i = 0; i < this.myDungeonFinal.length; i++) {
            for (let j = 0; j < this.myDungeonFinal[0].length; j++) {
                let room = this.myDungeonFinal[i][j];

                if (room instanceof Room) {
                    // Check if there is a room to the north
                    if (i - 1 >= 0 && this.myDungeonFinal[i - 1][j] instanceof Room) {
                        room.setNorthDoor();
                    }
                    // Check if there is a room to the south
                    if (i + 1 < this.myDungeonFinal.length && this.myDungeonFinal[i + 1][j] instanceof Room) {
                        room.setSouthDoor();
                    }
                    // Check if there is a room to the east
                    if (j + 1 < this.myDungeonFinal[0].length && this.myDungeonFinal[i][j + 1] instanceof Room) {
                        room.setRightDoor();
                    }
                    // Check if there is a room to the west
                    if (j - 1 >= 0 && this.myDungeonFinal[i][j - 1] instanceof Room) {
                        room.setLeftDoor();
                    }
                }
            }
        }
    }

    /**
     * createInitialDungeon(theRows, theCols)
     * This method creates the initial dungeon layout with no rooms.
     * @param {number} theRows - The number of rows in the dungeon.
     * @param {number} theCols - The number of columns in the dungeon.
     */
    createInitialDungeon(theRows, theCols) {
        for (let i = 0; i < theRows; i++) {
            let row = [];
            let rowFinal = [];
            for (let j = 0; j < theCols; j++) {
                row.push(this.myNoRoomCode);
                rowFinal.push(null);
            }
            this.myDungeon.push(row);
            this.myDungeonFinal.push(rowFinal);
        }

        this.myDungeon[this.myInitialRow][this.myInitialCol] = this.myRoomCode;
        //console.log(this.myDungeon);
        //console.log(this.myDungeonFinal);
    }

    /**
     * isWithinBounds(theRow, theCol)
     * This method checks if a given position is within the dungeon bounds.
     * @param {number} theRow - The row index to check.
     * @param {number} theCol - The column index to check.
     * @returns {boolean} True if the position is within bounds, false otherwise.
     */
    isWithinBounds(theRow, theCol) {
        return theRow >= 0 && theRow < this.myRows && theCol >= 0 && theCol < this.myCols;
    }

    /**
     * hasNoValidDirection(row, col)
     * This method checks if a room has no valid direction to expand to.
     * @param {number} row - The row index of the room.
     * @param {number} col - The column index of the room.
     * @returns {boolean} True if the room has no valid direction to expand, false otherwise.
     */
    hasNoValidDirection(theRow, theCol) {
        return (
            (theRow - 1 < 0 || this.myDungeon[theRow - 1][theCol] !== this.myNoRoomCode) &&
            (theRow + 1 >= this.myRows || this.myDungeon[theRow + 1][theCol] !== this.myNoRoomCode) &&
            (theCol - 1 < 0 || this.myDungeon[theRow][theCol - 1] !== this.myNoRoomCode) &&
            (theCol + 1 >= this.myCols || this.myDungeon[theRow][theCol + 1] !== this.myNoRoomCode)
        );
    }


    /**
     * generate()
     * This method generates the initial dungeon layout by randomly expanding from the center until no more rooms can be added.
     */
    generate() {

        while (this.myDungeon[this.myInitialRow + 1][this.myInitialCol] === this.myNoRoomCode ||
        this.myDungeon[this.myInitialRow - 1][this.myInitialCol] === this.myNoRoomCode ||
        this.myDungeon[this.myInitialRow][this.myInitialCol + 1] === this.myNoRoomCode ||
        this.myDungeon[this.myInitialRow][this.myInitialCol - 1] === this.myNoRoomCode) {
            //console.log('restarting from the initial position');
            let maxRoomsInOneDirection = 5;
            let rowPos = Math.floor(this.myRows / 2);
            let colPos = Math.floor(this.myCols / 2);

            while (maxRoomsInOneDirection > 0) {
                let direction = Math.floor(random(0, 4));
                let newRowPos = rowPos;
                let newColPos = colPos;

                if (direction === 0) {
                    newRowPos = rowPos - 1;
                    //console.log('up');
                } else if (direction === 1) {
                    newRowPos = rowPos + 1;
                    //console.log('down');
                } else if (direction === 2) {
                    newColPos = colPos + 1;
                    //console.log('right');
                } else if (direction === 3) {
                    newColPos = colPos - 1;
                    //console.log('left');
                }

                // check that the new room location is within bounds, and that it is not already a room
                if (this.isWithinBounds(newRowPos, newColPos) && this.myDungeon[newRowPos][newColPos] === this.myNoRoomCode) {
                    rowPos = newRowPos;
                    colPos = newColPos;
                    this.myDungeon[rowPos][colPos] = this.myRoomCode;
                    maxRoomsInOneDirection--;
                    //console.log(this.myDungeon);
                }

                if (this.hasNoValidDirection(rowPos, colPos)) {
                    //console.log('no valid direction, break')
                    break;
                }
            }
        }
    }
}

/**
 * Room class is responsible for creating a room with doors and entities.
 * It also provides methods to create walls, corners, and door locations.
 */
class Room {
    myNorthDoor;
    mySouthDoor;
    myRightDoor;
    myLeftDoor;
    myTileMap;
    myEntityLocations;
    myDoorLocations;
    myEntityMap;
    myPossibleEntityCount;
    myMobCount

    /**
     * Constructor for Room class.
     * Initializes properties and calls methods to create walls, corners, and door locations.
     * @param {Array} theTileMap - The tile map of the room.
     */
    constructor(theTileMap) {
        this.mySeed = round(random(-8192, 8192))

        this.myNorthDoor = false;
        this.mySouthDoor = false;
        this.myRightDoor = false;
        this.myLeftDoor = false;
        this.myTileMap = theTileMap;
        this.myPossibleEntityCount = 0;
        this.myMobCount = 0;

        this.createDoorLocations();
        this.createEntityLocations();
        this.createEntityMap();

        this.createBottomWall();
        this.createTopWall();
        this.createLeftWall();
        this.createRightWall();
        this.createCorners();
    }

    /**
     * Loads the room from a saved state.
     * @param {Object} theSave - The saved state of the room.
     */
    load(theSave) {
        this.mySeed = theSave["mySeed"]
        this.myNorthDoor = theSave["myNorthDoor"]
        this.mySouthDoor = theSave["mySouthDoor"]
        this.myRightDoor = theSave["myRightDoor"]
        this.myLeftDoor = theSave["myLeftDoor"]
        this.myPossibleEntityCount = theSave["myPossibleEntityCount"]
        this.myMobCount = theSave["myMobCount"]

        let entityMap = theSave["myEntityMap"]
        for (let a = 0; a < entityMap.length; a++) {
            for (let b = 0; b < entityMap[0].length; b++) {
                if (entityMap[a][b]) {
                    entityMap[a][b] = EntityFactory.createEntity(entityMap[a][b], createVector(b,a))
                }

            }
        }
        this.myEntityMap = theSave["myEntityMap"]
        this.createDoors()
    }

    /**
     * Clones the room for saving.
     * @returns {Room} The cloned room.
     */
    cloneForSave() {
        console.log(this)
        let room = new Room(this.myTileMap)

        room.mySeed = this.mySeed
        room.myNorthDoor = this.myNorthDoor
        room.mySouthDoor = this.mySouthDoor
        room.myRightDoor = this.myRightDoor
        room.myLeftDoor = this.myLeftDoor
        room.myPossibleEntityCount = this.myPossibleEntityCount
        room.myMobCount = this.myMobCount

        for (let a = 0; a < this.myEntityMap.length; a++) {
            for (let b = 0; b < this.myEntityMap[0].length; b++) {
                if (this.myEntityMap[a][b]) {
                    room.myEntityMap[a][b] = this.myEntityMap[a][b].getName().toLowerCase()
                } else {
                    room.myEntityMap[a][b] = null
                }
            }
        }
        this.createDoors()
        return room
    }

    /**
     * Removes an entity from the room.
     * @param {Object} theIndex - The index of the entity to remove.
     */
    removeEntity(theIndex) {
        this.myEntityMap[theIndex.y][theIndex.x] = null
    }

    /**
     * Returns the seed of the room.
     * @returns {number} The seed of the room.
     */
    getSeed() {
        return this.mySeed
    }

    /**
     * Checks if a position collides with a door in the room.
     *
     * @param {Array} thePlayerPos - The position of the player.
     * @returns {boolean} True if the position collides with a door in the room, false otherwise.
     */
    getIsCollideDoor(thePlayerPos) {
        let bool = [this.myNorthDoor, this.mySouthDoor, this.myRightDoor, this.myLeftDoor]
        let tile = this.myTileMap[thePlayerPos[1]][thePlayerPos[0]]
        if (tile === '▲') {
            return 'north'
        }
        // South door
        if (tile === '▼') {
            return 'south'
        }

        // Right door
        if (tile === '▶') {
            return 'east'
        }

        // Left door
        if (tile === '◀') {
            return 'west'
        }
        // for (let a = 0; a < this.myDoorLocations.length; a++) {
        //     //console.log(bool[a])
        //     if (thePlayerPos[1] == this.myDoorLocations[a][0] && thePlayerPos[0] == this.myDoorLocations[a][1] && bool[a]) {
        //         return true
        //     }
        // }
        return null
    }

    /**
     * Returns the teleport location of the north door.
     *
     * @returns {Array} The teleport location of the north door.
     */
    getNorthTeleportLocation() {
        return [this.myDoorLocations[0][0] + 1, this.myDoorLocations[0][1]];
    }

    /**
     * Returns the teleport location of the south door.
     *
     * @returns {Array} The teleport location of the south door.
     */
    getSouthTeleportLocation() {
        return [this.myDoorLocations[1][0] - 1, this.myDoorLocations[1][1]];
    }

    /**
     * Returns the teleport location of the east door.
     *
     * @returns {Array} The teleport location of the east door.
     */
    getEastTeleportLocation() {
        return [this.myDoorLocations[2][0], this.myDoorLocations[2][1] - 1];
    }

    /**
     * Returns the teleport location of the west door.
     *
     * @returns {Array} The teleport location of the west door.
     */
    getWestTeleportLocation() {
        return [this.myDoorLocations[3][0], this.myDoorLocations[3][1] + 1];
    }

    /**
     * Sets the north door of the room.
     */
    setNorthDoor() {
        this.myNorthDoor = true;
    }

    /**
     * Sets the south door of the room.
     */
    setSouthDoor() {
        this.mySouthDoor = true;
    }

    /**
     * Sets the right door of the room.
     */
    setRightDoor() {
        this.myRightDoor = true;
    }

    /**
     * Sets the left door of the room.
     */
    setLeftDoor() {
        this.myLeftDoor = true;
    }

    /**
     * Creates doors for the room.
     */
    createDoors() {
        // North door
        if (this.myNorthDoor) {
            this.myTileMap[this.myDoorLocations[0][0]][this.myDoorLocations[0][1]] = '▲';
        }

        // South door
        if (this.mySouthDoor) {
            this.myTileMap[this.myDoorLocations[1][0]][this.myDoorLocations[1][1]] = '▼';
        }

        // Right door
        if (this.myRightDoor) {
            this.myTileMap[this.myDoorLocations[2][0]][this.myDoorLocations[2][1]] = '▶';
        }

        // Left door
        if (this.myLeftDoor) {
            this.myTileMap[this.myDoorLocations[3][0]][this.myDoorLocations[3][1]] = '◀';
        }
    }


    /**
     * Creates corners for the room.
     */
    createCorners() {
        this.myTileMap[0][0] = '⌜';
        this.myTileMap[0][this.myTileMap[0].length - 1] = '⌝';
        this.myTileMap[this.myTileMap.length - 1][0] = '⌞';
        this.myTileMap[this.myTileMap.length - 1][this.myTileMap[0].length - 1] = '⌟';
    }

    /**
     * Creates the top wall of the room.
     */
    createTopWall() {
        for (let j = 0; j < this.myTileMap[0].length - 1; j++) {
            this.myTileMap[0][j] = '‾';
        }
    }

    /**
     * Creates the bottom wall of the room.
     */
    createBottomWall() {
        for (let j = 0; j < this.myTileMap[0].length - 1; j++) {
            this.myTileMap[this.myTileMap.length - 1][j] = '_';
        }
    }

    /**
     * Creates the left wall of the room.
     */
    createLeftWall() {
        for (let i = 0; i < this.myTileMap.length; i++) {
            this.myTileMap[i][0] = WORLD.WALL_LEFT;
        }
    }

    /**
     * Creates the right wall of the room.
     */
    createRightWall() {
        for (let i = 0; i < this.myTileMap.length; i++) {
            this.myTileMap[i][this.myTileMap[0].length - 1] = WORLD.WALL_RIGHT;
        }
    }

    /**
     * Creates door locations for the room.
     */
    createDoorLocations() {
        this.myDoorLocations = [
            [0, Math.floor(this.myTileMap[0].length / 2)], // north
            [this.myTileMap.length - 1, Math.floor(this.myTileMap[0].length / 2)], // south
            [Math.floor(this.myTileMap.length / 2), this.myTileMap[0].length - 1], // right
            [Math.floor(this.myTileMap.length / 2), 0] // left
        ];
    }

    /**
     * Creates an entity map for the room.
     */
    createEntityMap() {
        this.myEntityMap = [];
        for (let i = 0; i < this.myTileMap.length; i++) {
            let row = [];
            for (let j = 0; j < this.myTileMap[0].length; j++) {
                let isEntity = false;
                for (let k = 0; k < this.myEntityLocations.length; k++) {
                    const [x, y] = this.myEntityLocations[k];
                    if (x === i && y === j) {
                        isEntity = true;
                        break;
                    }
                }
                if (isEntity) {
                    // If any coordinate pair matches, mark 'X'
                    row.push('X');
                    this.myPossibleEntityCount++;
                } else {
                    // If no match found, mark '□'
                    row.push('□');
                }
            }
            this.myEntityMap.push(row);
        }
    }

    /**
     * Creates entity locations for the room.
     */
    createEntityLocations() {
        this.myEntityLocations = [];
        for (let i = 1; i < this.myTileMap.length - 1; i++) {
            for (let j = 1; j < this.myTileMap[0].length - 1; j++) {
                if (!(i === this.getNorthTeleportLocation()[0] && j === this.getNorthTeleportLocation()[1] ||
                    i === this.getSouthTeleportLocation()[0] && j === this.getSouthTeleportLocation()[1] ||
                    i === this.getEastTeleportLocation()[0] && j === this.getEastTeleportLocation()[1] ||
                    i === this.getWestTeleportLocation()[0] && j === this.getWestTeleportLocation()[1] ||
                    (i === this.getNorthTeleportLocation()[0] + 1 && j === this.getNorthTeleportLocation()[1]) ||
                    (i === this.getSouthTeleportLocation()[0] - 1 && j === this.getSouthTeleportLocation()[1]) ||
                    (i === this.getEastTeleportLocation()[0] && j === this.getEastTeleportLocation()[1] - 1) ||
                    (i === this.getWestTeleportLocation()[0] && j === this.getWestTeleportLocation()[1] + 1))) {
                    this.myEntityLocations.push([i, j]);
                }
            }
        }
    }

    /**
     * Populates the entity map of the room.
     */
    populateEntityMap() {

        let entityCount = 0;
        let maxEntities = Math.floor(Math.cbrt(this.myPossibleEntityCount));
        let entityChance = 10;
        for (let i = 0; i < this.myEntityMap.length; i++) {
            for (let j = 0; j < this.myEntityMap[0].length; j++) {
                let entity = null;
                if (this.myEntityMap[i][j] === 'X' && random(0, 100) < entityChance && entityCount < maxEntities) {
                    let randomEntity = floor(random(0, 4))
                    // console.log(`Placing entity at (${i}, ${j}), randomEntity = ${randomEntity}`);
                    switch (randomEntity) {
                        case 0:
                            entity = EntityFactory.createEntity('ogre', createVector(j, i));
                            // console.log('ogre created')
                            break;
                        case 1:
                            entity = EntityFactory.createEntity('skeleton', createVector(j, i));
                            // console.log('skeleton created')
                            break;
                        case 2:
                            entity = EntityFactory.createEntity('gremlin', createVector(j, i));
                            // console.log('gremlin created')
                            break;
                        case 3:
                            entity = EntityFactory.createEntity('health potion', createVector(j, i));
                            // console.log('health potion created')
                            break;
                        default:
                            console.log('unexpected value for randomEntity in Room.populateEntityMap()' + randomEntity);
                    }
                    entityCount++;

                    if (randomEntity === 0 || randomEntity === 1 || randomEntity === 2) {
                        this.myMobCount++;
                    }
                }
                this.myEntityMap[i][j] = entity
            }
        }
        // console.log('mob count in this room = ' + this.myMobCount)
    }

    /**
     * Returns the tile map of the room.
     *
     * @returns {Array} The tile map of the room.
     */
    getTileMap() {
        return this.myTileMap;
    }

    /**
     * Returns the entity map of the room.
     *
     * @returns {Array} The entity map of the room.
     */
    getEntityMap() {
        return this.myEntityMap;
    }

    /**
     * Returns the number of mobs in the room.
     *
     * @returns {number} The number of mobs in the room.
     */
    getMobCount() {
        return this.myMobCount;
    }
}