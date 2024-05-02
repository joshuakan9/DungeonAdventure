class DungeonGenerator {
    myRows;
    myCols;
    myInitialRow;
    myInitialCol;
    myDungeon;
    myRoomCode;
    myNoRoomCode;
    myRoomSize;
    myDungeonFinal;

    constructor() {
        this.myRows = 7;
        this.myCols = 7;
        this.myInitialRow = Math.floor(this.myRows / 2);
        this.myInitialCol = Math.floor(this.myCols / 2);
        this.myDungeon = [];
        this.myRoomCode = '□'
        this.myNoRoomCode = '■'
        this.myRoomSize = 7
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
            ['□', '□', '□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□', '□', '□']
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

        this.myDungeonFinal = [];
        for (let a = 0; a < this.myRows * this.myRoomSize; a++) {
            this.myDungeonFinal.push([]);
        }
        for (let a = 0; a < this.myDungeon.length; a++) {
            for (let b = 0; b < this.myDungeon[0].length; b++) {
                let currentRoom = null
                if (this.myDungeon[a][b] == this.myRoomCode) {
                    let randomRoom = Math.floor(Math.random() * 3);
                    console.log('random room = ' + randomRoom);
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
            }
        }
        this.generateDoors()
    }

    generateDoors() {
        for (let i = 0; i < this.myDungeonFinal.length; i++) {
            for (let j = 0; j < this.myDungeonFinal[0].length; j++) {
                let room = this.myDungeonFinal[i][j];

                if (room instanceof Room) {
                    if (i > 0 && this.myDungeonFinal[i - 1][j] instanceof Room) {
                        room.setNorthDoor();
                        this.myDungeonFinal[i - 1][j].setSouthDoor();
                    }

                    if (i < this.myDungeonFinal.length - 1 && this.myDungeonFinal[i + 1][j] instanceof Room) {
                        room.setSouthDoor();
                        this.myDungeonFinal[i - 1][j].setNorthDoor();
                    }

                    if (j < this.myDungeonFinal[0].length - 1 && this.myDungeonFinal[i][j + 1] instanceof Room) {
                        room.setRightDoor();
                        this.myDungeonFinal[i - 1][j].setLeftDoor();
                    }

                    if (j > 0 && this.myDungeonFinal[i][j - 1] instanceof Room) {
                        room.setLeftDoor();
                        this.myDungeonFinal[i - 1][j].setRightDoor();
                    }
                }
            }
        }
    }

    createInitialDungeon(theRows, theCols) {
        for (let i = 0; i < theRows; i++) {
            let row = [];
            for (let j = 0; j < theCols; j++) {
                row.push(this.myNoRoomCode);
            }
            this.myDungeon.push(row);
        }

        this.myDungeon[this.myInitialRow][this.myInitialCol] = this.myRoomCode;
        console.log(this.myDungeon);
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
            console.log('restarting from the intial position');
            let maxRoomsInOneDirection = 10;
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

    constructor(theTileMap) {
        this.myNorthDoor = false;
        this.mySouthDoor = false;
        this.myRightDoor = false;
        this.myLeftDoor = false;
        this.myTileMap = theTileMap;

        this.myDoorLocations = [
            [0, Math.floor(this.myTileMap[0].length / 2)], // north
            [this.myTileMap.length - 1, Math.floor(this.myTileMap[0].length / 2)], // south
            [Math.floor(this.myTileMap.length / 2), this.myTileMap[0].length - 1], // right
            [Math.floor(this.myTileMap.length / 2), 0] // left
        ];

        this.myEntityLocations = []
        for (let i = 1; i < this.myTileMap.length - 1; i++) {
            for (let j = 1; j < this.myTileMap[0].length - 1; j++) {
                let doorAdjacent = false;
                if (!(i === this.getNorthTeleportLocation()[0] && j === this.getNorthTeleportLocation()[1] ||
                    i === this.getSouthTeleportLocation()[0] && j === this.getSouthTeleportLocation()[1] ||
                    i === this.getRightTeleportLocation()[0] && j === this.getRightTeleportLocation()[1] ||
                    i === this.getLeftTeleportLocation()[0] && j === this.getLeftTeleportLocation()[1])) {
                    this.myEntityLocations.push([i, j]);
                }
            }
        }
        console.log(this.myEntityLocations);
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

    createDoor() {
        if (this.myNorthDoor) {
            console.log(this.myDoorLocations[0])
            this.myTileMap[this.myDoorLocations[0][0]][this.myDoorLocations[0][1]] = 'X';
            console.log(this.myTileMap);
        }
        if (this.mySouthDoor) {
            console.log(this.myDoorLocations[1])
            this.myTileMap[this.myDoorLocations[1][0]][this.myDoorLocations[1][1]] = 'X';
            console.log(this.myTileMap);
        }
        if (this.myRightDoor) {
            console.log(this.myDoorLocations[2])
            this.myTileMap[this.myDoorLocations[2][0]][this.myDoorLocations[2][1]] = 'X';
            console.log(this.myTileMap);
        }
        if (this.myLeftDoor) {
            console.log(this.myDoorLocations[3])
            this.myTileMap[this.myDoorLocations[3][0]][this.myDoorLocations[3][1]] = 'X';
            console.log(this.myTileMap);
        }
    }
}