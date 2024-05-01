class Room {

    myNorthDoor;
    mySouthDoor;
    myRightDoor;
    myLeftDoor;
    myTileMap;
    myEntityLocations;
    myDoorLocations;

    constructor() {
        this.myNorthDoor = false;
        this.mySouthDoor = false;
        this.myRightDoor = false;
        this.myLeftDoor = false;
        //this.myTileMap = theTileMap;

        this.myTileMap = [
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□'],
            ['□', '□', '□', '□', '□']
        ]

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