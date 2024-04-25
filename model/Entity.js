class Entity extends Sprite {
    myName;
    myHitPoints;
    myAttack;
    constructor(theName, theHitPoints, theAttack) {
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

    getDamage() {
        return myAttack.getDamage();
    }
    
    getHitPercentage() {
        return myAttack.getHitPercentage();
    }
}