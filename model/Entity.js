class Entity extends Sprite {
    myName;
    myHitPoints;
    myAttack;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack }) {
        super({ thePos, theSize, theImage })
        this.myName = theName;
        this.myHitPoints = theHitPoints;
        this.myAttack = theAttack;
    }

    getName() {
        return this.myName;
    }

    getHitPoints() {
        return this.myHitPoints;
    }

    setName(theName) {
        this.myName = theName;
    }

    setHitPoints(theHitPoints) {
        this.myHitPoints = theHitPoints;
    }

    getAttack() {
        return myAttack.getDamage();
    }

    getHitPercentage() {
        return myAttack.getHitPercentage();
    }
}