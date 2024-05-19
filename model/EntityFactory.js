class EntityFactory {

    static createEntity(entityType, entityPos) {
        let entity = null;
        switch(entityType) {
            case 'ogre':
                entity = new Ogre({
                    thePos: entityPos,
                    theSize: createVector(1, 2),
                    theIsCollideable: true,
                    theImage: TILEMAP_OGRE,
                    theHFrames: 9,
                    theVFrames: 1,
                    theFrame: 0,
                    theFrameSize: createVector(16,32),
                    theOffset: createVector(0, -1.2),
                    theName: "ogre",
                    theHitPoints: 1000,
                    theAttack: new Attack(100, 100),
                    theHeal: new Heal(10,100),
                    theStamina: 10,
                    theBag: [],
                    theBlockPercentage: 100,
                    theSpecialAttack: new Attack(200, 100),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                    }),
                })
                break;
            case 'skeleton':
                entity = new Skeleton({
                    thePos: entityPos,
                    theSize: createVector(1, 2),
                    theIsCollideable: true,
                    theImage: TILEMAP_SKELETON,
                    theHFrames: 9,
                    theVFrames: 1,
                    theFrame: 0,
                    theFrameSize: createVector(16,32),
                    theOffset: createVector(0, -1.2),
                    theName: "skeleton",
                    theHitPoints: 1000,
                    theAttack: new Attack(100, 100),
                    theHeal: new Heal(10,100),
                    theStamina: 10,
                    theBag: [],
                    theBlockPercentage: 100,
                    theSpecialAttack: new Attack(200, 100),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                    }),
                })
                break;
            case 'gremlin':
                entity = new Gremlin({
                    thePos: entityPos,
                    theSize: createVector(1, 2),
                    theIsCollideable: true,
                    theImage: TILEMAP_GREMLIN,
                    theHFrames: 9,
                    theVFrames: 1,
                    theFrame: 0,
                    theFrameSize: createVector(16,32),
                    theOffset: createVector(0, -1.2),
                    theName: "gremlin",
                    theHitPoints: 1000,
                    theAttack: new Attack(100, 100),
                    theHeal: new Heal(10,100),
                    theStamina: 10,
                    theBag: [],
                    theBlockPercentage: 100,
                    theSpecialAttack: new Attack(200, 100),
                    theAnimation: new Animations({
                        stand: new FramePattern(ANIM_STAND),
                    }),
                })
                break;
            case 'health potion':
                entity = new HealthPotion({
                    thePos: entityPos,
                    theSize: createVector(1, 1),
                    theIsCollideable: true,
                    theImage: TILEMAP_POTION_HEALTH,


                    theOffset: createVector(0, -0.1),
                    theName: "health potion",
                })
                break;
            default:
                console.log('unexpected value for monsterType in EntityFactory.createEntity()' + entityType);
        }

        return entity;
    }
}