/**
 * EntityFactory is a class that provides a static method to create different types of entities.
 */
class EntityFactory {
    /**
     * createEntity is a static method that creates an entity based on the given entity type and position.
     * It retrieves the entity data from the local storage, creates a new entity with the retrieved data, and returns it.
     *
     * @param {string} entityType - The type of the entity to be created. It can be 'ogre', 'skeleton', 'gremlin', 'health potion', 'pillar of abstraction', 'pillar of encapsulation', 'pillar of inheritance', 'pillar of polymorphism', or 'exit'.
     * @param {Object} entityPos - The position of the entity to be created.
     * @returns {Object} The created entity.
     */
    static createEntity(entityType, entityPos) {
        let entity = null;
        let direction = random(['east', 'west'])
        switch(entityType) {
            case 'ogre':
                let ogreData = JSON.parse(window.localStorage.getItem('ogre'));
                entity = new Mob({
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
                    theDirection: direction
                })
                break;
            case 'skeleton':
                let skeletonData = JSON.parse(window.localStorage.getItem('skeleton'));
                entity = new Mob({
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
                    theDirection: direction
                })
                break;
            case 'gremlin':
                let gremlinData = JSON.parse(window.localStorage.getItem('gremlin'));
                entity = new Mob({
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
                    theDirection: direction
                })
                break;
            case 'health potion':
                let healthPotionData = JSON.parse(window.localStorage.getItem('health potion'));
                entity = new Pickup({
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
                entity = new Pickup({
                    thePos: entityPos,
                    theSize: createVector(1, 1),
                    theIsCollideable: true,
                    theImage: TILEMAP_EXIT,
                    theName: "Exit",
                })
                break;
            default:
                console.log('unexpected value for monsterType in EntityFactory.createEntity()' + entityType);
        }

        return entity;
    }
}