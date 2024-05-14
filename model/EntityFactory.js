class EntityFactory {

    static createEntity(entityType, entityPos) {
        let entity = null;
        switch(entityType) {
            case 'ogre':
                entity = new Assassin({
                    thePos: entityPos,
                    theSize: createVector(CELLSIZE, CELLSIZE * 2),
                    theIsCollideable: true,
                    theImage: TILEMAP_ASSASSIN,
                    theHFrames: 9,
                    theVFrames: 1,
                    theFrame: 0,
                    theFrameSize: createVector(16,32),
                    theOffset: (theCellSize) => createVector(0, -theCellSize * 1.2),
                    theName: "Tester",
                    theHitPoints: 1000,
                    theAttack: new Attack(100, 100),
                    theStamina: 10,
                    theBag: [],
                    theBlockPercentage: 100,
                    theSpecialAttack: new Attack(200, 100),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_HERO_STAND),
                      walk: new FramePattern(ANIM_HERO_WALK)
                    }),
                })
                break;
            case 'skeleton':
                entity = new Skeleton({
                    thePos: entityPos,
                    theSize: createVector(CELLSIZE, CELLSIZE * 2),
                    theImage: TILEMAP_ASSASSIN,
                    theIsCollideable: true,
                    theHitPoints: 100,
                    theAttack: new Attack(100, 100),
                    theHeal: new Heal(10, 100)
                })
                break;
            case 'gremlin':
                entity = new Gremlin({
                    thePos: entityPos,
                    theSize: createVector(CELLSIZE, CELLSIZE * 2),
                    theImage: TILEMAP_ASSASSIN,
                    theIsCollideable: true,
                    theHitPoints: 100,
                    theAttack: new Attack(100, 100),
                    theHeal: new Heal(10, 100)
                })
                break;
            case 'health potion':
                entity = new HealthPotion({
                    thePos: entityPos,
                    theSize: createVector(CELLSIZE, CELLSIZE * 2),
                    theImage: TILEMAP_ASSASSIN,
                    theIsCollideable: true
                });
                break;
            default:
                console.log('unexpected value for monsterType in EntityFactory.createEntity()' + entityType);
        }
        return entity;
    }
}