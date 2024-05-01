class DungeonGenerator {
    myRows;
    myCols;
    myInitialRow;
    myInitialCol;
    myDungeon;

    constructor() {
        this.myRows = 5;
        this.myCols = 5;
        this.myInitialRow = Math.floor(this.myRows / 2);
        this.myInitialCol = Math.floor(this.myCols / 2);
        this.myDungeon = [];
    }

    createInitialDungeon(theRows, theCols) {
        for (let i = 0; i < theRows; i++) {
            let row = [];
            for (let j = 0; j < theCols; j++) {
                row.push('■');
            }
            this.myDungeon.push(row);
        }

        this.myDungeon[this.myInitialRow][this.myInitialCol] = '□';
        console.log(this.myDungeon);
    }

    isWithinBounds(theRow, col) {
        return theRow >= 0 && theRow < this.myRows && col >= 0 && col < this.myCols;
    }

    hasNoValidDirection(row, col) {
        return (
            (row - 1 < 0 || this.myDungeon[row - 1][col] !== '■') &&
            (row + 1 >= this.myRows || this.myDungeon[row + 1][col] !== '■') &&
            (col - 1 < 0 || this.myDungeon[row][col - 1] !== '■') &&
            (col + 1 >= this.myCols || this.myDungeon[row][col + 1] !== '■')
        );
    }


    generate() {
        this.createInitialDungeon(this.myRows, this.myCols);
        while (this.myDungeon[this.myInitialRow + 1][this.myInitialCol] === '■' ||
            this.myDungeon[this.myInitialRow - 1][this.myInitialCol] === '■' ||
            this.myDungeon[this.myInitialRow][this.myInitialCol + 1] === '■' ||
            this.myDungeon[this.myInitialRow][this.myInitialCol - 1] === '■') {
            console.log('restarting from the intial position');
            let totalRooms = 5;
            let rowPos = Math.floor(this.myRows / 2);
            let colPos = Math.floor(this.myCols / 2);

            while (totalRooms > 0) {
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
                if (this.isWithinBounds(newRowPos, newColPos) && this.myDungeon[newRowPos][newColPos] === '■') {
                    rowPos = newRowPos;
                    colPos = newColPos;
                    this.myDungeon[rowPos][colPos] = '□';
                    totalRooms--;
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

function main() {
    let dungeon = new DungeonGenerator();
    dungeon.generate();
}

main();