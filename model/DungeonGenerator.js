class DungeonGenerator {
    myRows;
    myCols;
    myInitialRow;
    myInitialCol;
    myDungeon;
    myRoomCode;
    myNoRoomCode;
    myDungeonFinal;

    constructor() {
        this.myRows = 5;
        this.myCols = 5;
        this.myInitialRow = Math.floor(this.myRows / 2);
        this.myInitialCol = Math.floor(this.myCols / 2);
        this.myDungeon = [];
        this.myRoomCode = '□'
        this.myNoRoomCode = '■'
        this.myDungeonFinal = [];

        this.createInitialDungeon(this.myRows, this.myCols);
        this.generate();
        this.convert();

    }

    getDungeon() {
        return this.myDungeonFinal;
    }

    convert() {

        const roomLayout0 = [
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□']
        ]

        const roomLayout1 = [
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□']
        ]

        const roomLayout2 = [
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□'],
            ['□', '□', '□']
        ]
        
        for (let a = 0; a < this.myDungeon.length; a++) {
            for (let b = 0; b < this.myDungeon[0].length; b++) {
                this.myDungeonFinal[a][b] = null;
                let currentRoom = null;
                if (this.myDungeon[a][b] === this.myRoomCode) {
                    let randomRoom = Math.floor(Math.random() * 3);
                    switch (randomRoom) {
                        case 0:
                            currentRoom = new Room(roomLayout0);
                            break;
                        case 1:
                            currentRoom = new Room(roomLayout1);
                            break;
                        case 2:
                            currentRoom = new Room(roomLayout2);
                            break;
                        default:
                            console.log('error, invalid case while assigning currentRoom');
                    }
                } else {
                    currentRoom = null;
                }
                this.myDungeonFinal[a][b] = currentRoom;
            }
        }
        this.generateDoors();
        for (let a = 0; a < this.myDungeonFinal.length; a++) {
            for (let b = 0; b < this.myDungeonFinal[0].length; b++) {
                if (this.myDungeonFinal[a][b] instanceof Room) {
                    this.myDungeonFinal[a][b].createDoors();
                    console.log(`Room at (${a}, ${b}):`, this.myDungeonFinal[a][b]);
                }
            }
        }
    }
    generateDoors() {
        for (let i = 0; i < this.myDungeonFinal.length; i++) {
            for (let j = 0; j < this.myDungeonFinal[0].length; j++) {
                let room = this.myDungeonFinal[i][j];

                if (room instanceof Room) {
                    // Check if there is a room to the north
                    if (i > 0 && this.myDungeonFinal[i - 1][j] !== null && this.myDungeonFinal[i - 1][j] instanceof Room) {
                        room.setNorthDoor();
                    }
                    // Check if there is a room to the south
                    if (i < this.myDungeonFinal.length - 1 && this.myDungeonFinal[i + 1][j] !== null && this.myDungeonFinal[i + 1][j] instanceof Room) {
                        room.setSouthDoor();
                    }
                    // Check if there is a room to the east
                    if (j < this.myDungeonFinal[0].length - 1 && this.myDungeonFinal[i][j + 1] !== null && this.myDungeonFinal[i][j + 1] instanceof Room) {
                        room.setRightDoor();
                    }
                    // Check if there is a room to the west
                    if (j > 0 && this.myDungeonFinal[i][j - 1] !== null && this.myDungeonFinal[i][j - 1] instanceof Room) {
                        room.setLeftDoor();
                    }
                }
            }
        }
    }



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
        console.log(this.myDungeon);
        console.log(this.myDungeonFinal);
    }

    isWithinBounds(theRow, col) {
        return theRow >= 0 && theRow < this.myRows && col >= 0 && col < this.myCols;
    }

    hasNoValidDirection(row, col) {
        return (
            (row - 1 < 0 || this.myDungeon[row - 1][col] !== this.myNoRoomCode) &&
            (row + 1 >= this.myRows || this.myDungeon[row + 1][col] !== this.myNoRoomCode) &&
            (col - 1 < 0 || this.myDungeon[row][col - 1] !== this.myNoRoomCode) &&
            (col + 1 >= this.myCols || this.myDungeon[row][col + 1] !== this.myNoRoomCode)
        );
    }


    generate() {

        while (this.myDungeon[this.myInitialRow + 1][this.myInitialCol] === this.myNoRoomCode ||
            this.myDungeon[this.myInitialRow - 1][this.myInitialCol] === this.myNoRoomCode ||
            this.myDungeon[this.myInitialRow][this.myInitialCol + 1] === this.myNoRoomCode ||
            this.myDungeon[this.myInitialRow][this.myInitialCol - 1] === this.myNoRoomCode) {
            console.log('restarting from the initial position');
            let maxRoomsInOneDirection = 5;
            let rowPos = Math.floor(this.myRows / 2);   
            let colPos = Math.floor(this.myCols / 2);

            while (maxRoomsInOneDirection > 0) {
                let direction = Math.floor(Math.random() * 4);
                let newRowPos = rowPos;
                let newColPos = colPos;

                if (direction === 0) {
                    newRowPos = rowPos - 1;
                    console.log('up');
                } else if (direction === 1) {
                    newRowPos = rowPos + 1;
                    console.log('down');
                } else if (direction === 2) {
                    newColPos = colPos + 1;
                    console.log('right');
                } else if (direction === 3) {
                    newColPos = colPos - 1;
                    console.log('left');
                }

                // check that the new room location is within bounds, and that it is not already a room
                if (this.isWithinBounds(newRowPos, newColPos) && this.myDungeon[newRowPos][newColPos] === this.myNoRoomCode) {
                    rowPos = newRowPos;
                    colPos = newColPos;
                    this.myDungeon[rowPos][colPos] = this.myRoomCode;
                    maxRoomsInOneDirection--;
                    console.log(this.myDungeon);
                }

                if (this.hasNoValidDirection(rowPos, colPos)) {
                    console.log('no valid direction, break')
                    break;
                }
            }
        }
    }

}

class Room {
    myNorthDoor;
    mySouthDoor;
    myRightDoor;
    myLeftDoor;
    myTileMap;
    myEntityLocations;
    myDoorLocations;
    myEntityMap;

    constructor(theTileMap) {
        this.myNorthDoor = false;
        this.mySouthDoor = false;
        this.myRightDoor = false;
        this.myLeftDoor = false;
        this.myTileMap = theTileMap;

        this.createDoorLocations();
        this.createEntityLocations();
        this.createEntityMap();

        this.createBottomWall();
        this.createTopWall();
        this.createLeftWall();
        this.createRightWall();
        this.createCorners();
    }

    getNorthTeleportLocation() {
        return [this.myDoorLocations[0][0] + 1, this.myDoorLocations[0][1]];
    }

    getSouthTeleportLocation() {
        return [this.myDoorLocations[1][0] - 1, this.myDoorLocations[1][1]];
    }

    getRightTeleportLocation() {
        return [this.myDoorLocations[2][0], this.myDoorLocations[2][1] - 1];
    }

    getLeftTeleportLocation() {
        return [this.myDoorLocations[3][0], this.myDoorLocations[3][1] + 1];
    }

    setNorthDoor() {
        this.myNorthDoor = true;
    }
    setSouthDoor() {
        this.mySouthDoor = true;
    }
    setRightDoor() {
        this.myRightDoor = true;
    }
    setLeftDoor() {
        this.myLeftDoor = true;
    }

    //TODO - I think the else statements are a band-aid fix for something wrong wherever createDoors() is called.
    createDoors() {
        // North door
        if (this.myNorthDoor) {
            this.myTileMap[this.myDoorLocations[0][0]][this.myDoorLocations[0][1]] = '▲';
        } else {
            this.myTileMap[this.myDoorLocations[0][0]][this.myDoorLocations[0][1]] = '‾';
        }

        // South door
        if (this.mySouthDoor) {
            this.myTileMap[this.myDoorLocations[1][0]][this.myDoorLocations[1][1]] = '▼';
        } else {
            this.myTileMap[this.myDoorLocations[1][0]][this.myDoorLocations[1][1]] = '_';
        }

        // Right door
        if (this.myRightDoor) {
            this.myTileMap[this.myDoorLocations[2][0]][this.myDoorLocations[2][1]] = '▶';
        } else {
            this.myTileMap[this.myDoorLocations[2][0]][this.myDoorLocations[2][1]] = '|';
        }

        // Left door
        if (this.myLeftDoor) {
            this.myTileMap[this.myDoorLocations[3][0]][this.myDoorLocations[3][1]] = '◀';
        } else {
            this.myTileMap[this.myDoorLocations[3][0]][this.myDoorLocations[3][1]] = '|';
        }
    }


    createCorners() {
        this.myTileMap[0][0] = '⌜';
        this.myTileMap[0][this.myTileMap[0].length - 1] = '⌝';
        this.myTileMap[this.myTileMap.length - 1][0] = '⌞';
        this.myTileMap[this.myTileMap.length - 1][this.myTileMap[0].length - 1] = '⌟';
    }

    createTopWall() {
        for (let j = 0; j < this.myTileMap[0].length - 1; j++) {
            this.myTileMap[0][j] = '‾';
        }
    }

    createBottomWall() {
        for (let j = 0; j < this.myTileMap[0].length - 1; j++) {
            this.myTileMap[this.myTileMap.length - 1][j] = '_';
        }
    }

    createLeftWall() {
        for (let i = 0; i < this.myTileMap.length; i++) {
            this.myTileMap[i][0] = '|';
        }
    }

    createRightWall() {
        for (let i = 0; i < this.myTileMap.length; i++) {
            this.myTileMap[i][this.myTileMap[0].length - 1] = '|';
        }
    }

    createDoorLocations() {
        this.myDoorLocations = [
            [0, Math.floor(this.myTileMap[0].length / 2)], // north
            [this.myTileMap.length - 1, Math.floor(this.myTileMap[0].length / 2)], // south
            [Math.floor(this.myTileMap.length / 2), this.myTileMap[0].length - 1], // right
            [Math.floor(this.myTileMap.length / 2), 0] // left
        ];
    }

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
                } else {
                    // If no match found, mark '□'
                    row.push('□');
                }
            }
            this.myEntityMap.push(row);
        }
    }

    createEntityLocations() {
        this.myEntityLocations = [];
        for (let i = 1; i < this.myTileMap.length - 1; i++) {
            for (let j = 1; j < this.myTileMap[0].length - 1; j++) {
                if (!(i === this.getNorthTeleportLocation()[0] && j === this.getNorthTeleportLocation()[1] ||
                    i === this.getSouthTeleportLocation()[0] && j === this.getSouthTeleportLocation()[1] ||
                    i === this.getRightTeleportLocation()[0] && j === this.getRightTeleportLocation()[1] ||
                    i === this.getLeftTeleportLocation()[0] && j === this.getLeftTeleportLocation()[1])) {
                    this.myEntityLocations.push([i, j]);
                }
            }
        }
    }
}

d = new DungeonGenerator();
