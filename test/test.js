class Test {
    constructor() {
        chai.assert.equal(width, 'bar', 'foo equal `bar`');
        this.dungeonGeneratorTest()
    }

    dungeonGeneratorTest() {
        let dungeonGenerator;

        beforeEach(function () {
            dungeonGenerator = new DungeonGenerator();
        });

        it('should initialize with correct properties', function () {
            assert.equal(dungeonGenerator.myRows, 7);
            assert.equal(dungeonGenerator.myCols, 7);
            assert.equal(dungeonGenerator.myInitialRow, Math.floor(dungeonGenerator.myRows / 2));
            assert.equal(dungeonGenerator.myInitialCol, Math.floor(dungeonGenerator.myCols / 2));
            assert.equal(dungeonGenerator.myRoomCode, '□');
            assert.equal(dungeonGenerator.myNoRoomCode, '■');
            assert.isArray(dungeonGenerator.myDungeon);
            assert.isArray(dungeonGenerator.myDungeonFinal);
            assert.equal(dungeonGenerator.myTotalMobCount, 0);
        });

        it('should create a valid starting room with specific entities', function () {
            dungeonGenerator.convert();
            let startingRoom = dungeonGenerator.myDungeonFinal[Math.floor(dungeonGenerator.myDungeonFinal.length / 2)][Math.floor(dungeonGenerator.myDungeonFinal[0].length / 2)];
            assert.isNotNull(startingRoom);
            assert.equal(startingRoom.myEntityMap[3][3].type, 'health potion');
            assert.equal(startingRoom.myEntityMap[3][9].type, 'health potion');
            assert.equal(startingRoom.myEntityMap[9][3].type, 'health potion');
            assert.equal(startingRoom.myEntityMap[9][9].type, 'health potion');
            assert.equal(startingRoom.myEntityMap[6][6].type, 'exit');
        });
    }
}