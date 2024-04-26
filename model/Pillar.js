class Pillar extends Entity {
    myName;

    constructor(thePos, theSize, theImage, theName, theHitPoints, theAttack) {
        super({ thePos, theSize, theImage, theName, theHitPoints, theAttack});
        this.myName = theName;
    }

    getName() {
        return this.myName;
    }
}