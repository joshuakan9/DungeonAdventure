class HealthPotion extends Pickup {
    myHealth;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHitPoints, theAttack, theDirection, theHealth}) {
        super({ thePos, theSize, theImage, theIsCollideable, theName: "Health Potion", theHitPoints, theAttack, theDirection });
        this.myHealth = theHealth;
    }

    use() {

    }
}