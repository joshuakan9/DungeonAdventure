class Entity extends Sprite {
    myName;
    myHitPoints;
    myAttack;
    myDirection;

    constructor({ thePos, theSize, theImage, theName, theHitPoints, theAttack, theDirection = 'north'}) {
        super({ thePos, theSize, theImage })
        this.myName = theName;
        this.myHitPoints = theHitPoints;
        this.myAttack = theAttack;
        this.myDirection = theDirection
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

    setDirection(theDirection) {
        this.myDirection = theDirection;
        // console.log(this.myDirection)
    }

    getAttack() {
        return this.myAttack;
    }
}