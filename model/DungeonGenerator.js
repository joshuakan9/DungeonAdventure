class DungeonGenerator {

    constructor() {
        const myRows = 5;
        const myCols = 5;
        const myInitialRow = Math.floor(myRows / 2);
        const myInitialCol = Math.floor(myCols / 2);
        var myDungeon = [];
    }

    createInitialDungeon() {
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < myCols; j++) {
                row.push('■');
            }
            this.myDungeon.push(row);
        }

        this.myDungeon[this.myInitialRow][this.myInitialCol] = '□';
        console.log(this.mythis.myDungeon);
    }

    isWithinBounds(theRow, col) {
        return theRow >= 0 && theRow < this.myRows && col >= 0 && col < this.myCols;
    }

    generate() {
        while (this.myDungeon[this.myInitialRow + 1][this.myInitialCol] === '■' ||
            this.myDungeon[this.myInitialRow - 1][this.myInitialCol] === '■' ||
            this.myDungeon[this.myInitialRow][this.myInitialCol + 1] === '■' ||
            this.myDungeon[this.myInitialRow][this.myInitialCol - 1] === '■') {
            console.log('restarting from the intial position');
            let totalRooms = 5;
            let rowPos = Math.floor(rows / 2);
            let colPos = Math.floor(cols / 2);

            while (totalRooms > 0) {
                let direction = Math.floor(Math.random() * 4);
                let newRowPos = rowPos;
                let newColPos = colPos;
                let directionCounter = 0;

                if (direction === 0) {
                    newRowPos = rowPos - 1;
                    console.log('up');
                    directionCounter++;
                } else if (direction === 1) {
                    newRowPos = rowPos + 1;
                    console.log('down');
                    directionCounter++;
                } else if (direction === 2) {
                    newColPos = colPos + 1;
                    console.log('right');
                    directionCounter++;
                } else if (direction === 3) {
                    newColPos = colPos - 1;
                    console.log('left');
                    directionCounter++;
                }

                // check that the new room location is within bounds, and that it is not already a room
                if (isWithinBounds(newRowPos, newColPos) && this.myDungeon[newRowPos][newColPos] === '■') {
                    rowPos = newRowPos;
                    colPos = newColPos;
                    this.myDungeon[rowPos][colPos] = '□';
                    totalRooms--;
                    console.log(this.myDungeon);
                }

                if (directionCounter >= 20) {
                    console.log('no valid direction found, breaking out of the loop.')
                    break;
                }
            }
        }
    }
}