class HealthPotion extends Entity {
    myHealth;

    constructor(thePos, theSize, theImage, theName, theHitPoints, theAttack ) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack });
        this.myHealth = theHealth;
    }

    use() {

    }
}