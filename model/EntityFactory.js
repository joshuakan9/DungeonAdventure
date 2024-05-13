class EntityFactory {

    static createEntity(entityType, entityPos) {
        let entity = null;
        switch(entityType) {
            case 'ogre':
                entity = new Ogre({
                    thePos: entityPos,
                    theSize: createVector(CELLSIZE, CELLSIZE * 2),
                    theImage: TILEMAP_ASSASSIN,
                    theIsCollideable: true,
                    theHitPoints: 100,
                    theAttack: new Attack(100, 100),
                    theHeal: new Heal(10, 100)
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