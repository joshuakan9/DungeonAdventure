class EntityFactory {

    static createEntity(entityType, entityPos) {
        let entity = null;
        switch(entityType) {
            case 'ogre':
                let ogreData = JSON.parse(window.localStorage.getItem('ogre'));
                entity = new Ogre({
                    thePos: entityPos,
                    theSize: createVector(ogreData.theSize.x, ogreData.theSize.y),
                    theIsCollideable: ogreData.theIsCollideable,
                    theImage: TILEMAP_OGRE,
                    theHFrames: ogreData.theHFrames,
                    theVFrames: ogreData.theVFrames,
                    theFrame: ogreData.theFrame,
                    theFrameSize: createVector(ogreData.theFrameSize.x, ogreData.theFrameSize.y),
                    theOffset: createVector(ogreData.theOffset.x, ogreData.theOffset.y),
                    theName: ogreData.theName,
                    theHitPoints: ogreData.theHitPoints,
                    theAttack: new Attack(ogreData.theAttack.damage, ogreData.theAttack.hitChance),
                    theHeal: new Heal(ogreData.theHeal.healAmount, ogreData.theHeal.healChance),
                    theSpecialAttack: new Attack(ogreData.theSpecialAttack.damage, ogreData.theSpecialAttack.hitChance),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                    }),
                })
                break;
            case 'skeleton':
                let skeletonData = JSON.parse(window.localStorage.getItem('skeleton'));
                entity = new Skeleton({
                    thePos: entityPos,
                    theSize: createVector(skeletonData.theSize.x, skeletonData.theSize.y),
                    theIsCollideable: skeletonData.theIsCollideable,
                    theImage: TILEMAP_SKELETON,
                    theHFrames: skeletonData.theHFrames,
                    theVFrames: skeletonData.theVFrames,
                    theFrame: skeletonData.theFrame,
                    theFrameSize: createVector(skeletonData.theFrameSize.x, skeletonData.theFrameSize.y),
                    theOffset: createVector(skeletonData.theOffset.x, skeletonData.theOffset.y),
                    theName: skeletonData.theName,
                    theHitPoints: skeletonData.theHitPoints,
                    theAttack: new Attack(skeletonData.theAttack.damage, skeletonData.theAttack.hitChance),
                    theHeal: new Heal(skeletonData.theHeal.healAmount, skeletonData.theHeal.healChance),
                    theSpecialAttack: new Attack(skeletonData.theSpecialAttack.damage, skeletonData.theSpecialAttack.hitChance),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                    }),
                })
                break;
            case 'gremlin':
                let gremlinData = JSON.parse(window.localStorage.getItem('gremlin'));
                entity = new Gremlin({
                    thePos: entityPos,
                    theSize: createVector(gremlinData.theSize.x, gremlinData.theSize.y),
                    theIsCollideable: gremlinData.theIsCollideable,
                    theImage: TILEMAP_GREMLIN,
                    theHFrames: gremlinData.theHFrames,
                    theVFrames: gremlinData.theVFrames,
                    theFrame: gremlinData.theFrame,
                    theFrameSize: createVector(gremlinData.theFrameSize.x, gremlinData.theFrameSize.y),
                    theOffset: createVector(gremlinData.theOffset.x, gremlinData.theOffset.y),
                    theName: gremlinData.theName,
                    theHitPoints: gremlinData.theHitPoints,
                    theAttack: new Attack(gremlinData.theAttack.damage, gremlinData.theAttack.hitChance),
                    theHeal: new Heal(gremlinData.theHeal.healAmount, gremlinData.theHeal.healChance),
                    theSpecialAttack: new Attack(gremlinData.theSpecialAttack.damage, gremlinData.theSpecialAttack.hitChance),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                    }),
                })
                break;
            case 'health potion':
                let healthPotionData = JSON.parse(window.localStorage.getItem('health potion'));
                entity = new HealthPotion({
                    thePos: entityPos,
                    theSize: createVector(healthPotionData.theSize.x, healthPotionData.theSize.y),
                    theIsCollideable: healthPotionData.theIsCollideable,
                    theImage: TILEMAP_POTION_HEALTH,
                    theOffset: createVector(healthPotionData.theOffset.x, healthPotionData.theOffset.y),
                    theName: healthPotionData.theName,
                })
                break;
            case 'pillar of abstraction':
                entity = new Entity({
                    theImage: TILEMAP_ASSASSIN,
                    theName: "Pillar of Abstraction",
                })
                break;
            case 'pillar of encapsulation':
                entity = new Entity({
                    theImage: TILEMAP_ASSASSIN,
                    theName: "Pillar of Encapsulation",
                })
                break;
            case 'pillar of inheritance':
                entity = new Entity({
                    theImage: TILEMAP_ASSASSIN,
                    theName: "Pillar of Inheritance",
                })
                break;
            case 'pillar of polymorphism':
                entity = new Entity({
                    theImage: TILEMAP_ASSASSIN,
                    theName: "Pillar of Polymorphism",
                })
                break;
            case 'exit':
                entity = new Exit({
                    thePos: entityPos,
                    theSize: createVector(1, 1),
                    theIsCollideable: true,
                    theImage: TILEMAP_EXIT,
                    theHFrames: 1,
                    theVFrames: 1,
                    theFrame: 0,
                    theFrameSize: createVector(16,16),
                    theOffset: createVector(0, 0),
                    theName: "Exit",
                    theHitPoints: 1000,
                    theAttack: new Attack(100, 100),
                })
                break;
            default:
                console.log('unexpected value for monsterType in EntityFactory.createEntity()' + entityType);
        }

        return entity;
    }
}