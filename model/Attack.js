class Attack {
    myDamage;
    myHitPercentage;

    constructor(theDamage, theHitPercentage) {
        this.myDamage = theDamage;
        this.myHitPercentage = theHitPercentage;
    }

    getDamage() {
        return this.myDamage;
    }

    getHitPercentage() {
        return this.myHitPercentage
    }

    setDamage(theDamage) {
        this.myDamage = theDamage;
    }

    setHitPercentage(theHitPercentage) {
        this.myHitPercentage = theHitPercentage;
    }
}