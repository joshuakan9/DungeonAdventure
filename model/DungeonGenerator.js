const rows = 5;
const cols = 5;
const initialRow = Math.floor(rows / 2);
const initialCol = Math.floor(cols / 2);
var dungeon = [];

function createInitialDungeon() {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push('■');
        }
        dungeon.push(row);
    }

    dungeon[initialRow][initialCol] = '□';
    console.log(dungeon);
}

function isWithinBounds(theRow, col) {
    return theRow >= 0 && theRow < rows && col >= 0 && col < cols;
}

function generate() {

    while (dungeon[initialRow + 1][initialCol] === '■' || dungeon[initialRow - 1][initialCol] === '■' || dungeon[initialRow][initialCol + 1] === '■' || dungeon[initialRow][initialCol - 1] === '■') {
        console.log('restarting from the intial position');
        let totalRooms = 5;
        totalRooms -= 1;
        let rowPos = Math.floor(rows / 2);
        let colPos = Math.floor(cols / 2);

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
            if (isWithinBounds(newRowPos, newColPos) && dungeon[newRowPos][newColPos] === '■') {
                rowPos = newRowPos;
                colPos = newColPos;
                dungeon[rowPos][colPos] = '□';
                totalRooms--;
                console.log(dungeon);
            }
        }
    }
}

createInitialDungeon();
generate();