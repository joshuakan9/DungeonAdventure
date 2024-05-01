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
        this.myDungeonFinal = [];
        for (let a = 0; a < this.myRows * this.myRoomSize; a++) {
            this.myDungeonFinal.push([]);
        }
        for (let a = 0; a < this.myDungeon.length; a++) {
            for (let b = 0; b < this.myDungeon[0].length; b++) {
                let currentRoom = null
                if (this.myDungeon[a][b] == this.myRoomCode) {
                    currentRoom = [
                        ['wall','wall','wall', 'ground','wall','wall','wall'],
                        ['wall','ground','ground','ground', 'ground', 'ground', 'wall'],
                        ['wall','ground','ground','ground', 'ground', 'ground', 'wall'],
                        ['ground','ground','ground','ground', 'ground', 'ground', 'ground'],
                        ['wall','ground','ground','ground', 'ground', 'ground', 'wall'],
                        ['wall','ground','ground','ground', 'ground', 'ground', 'wall'],
                        ['wall','wall','wall', 'ground', 'wall','wall','wall']
                    ]
                } else {
                    currentRoom = [
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null]
                    ]
                }

                for (let c = 0; c < currentRoom.length; c++) {
                    for (let d = 0; d < currentRoom[0].length; d++) {
                        this.myDungeonFinal[(a*this.myRoomSize)+c][(b*this.myRoomSize)+d] = currentRoom[c][d]
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