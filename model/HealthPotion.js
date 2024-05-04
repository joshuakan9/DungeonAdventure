class HealthPotion extends Pickup {
    myHealth;

    constructor({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theDirection, theHealth}) {
        super({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theDirection });
        this.myHealth = theHealth;
    }

    use() {

    }
}