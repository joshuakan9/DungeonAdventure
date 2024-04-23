class Entity extends Sprite {
    myName;
    myHitPoints;
    myDamage;

    constructor({thePos, theSize, theImage, theName, theHitPoints, theDamage}) {
        super({thePos, theSize, theImage})
        this.myName = theName;
        this.myHitPoints = theHitPoints;
        this.myDamage = theDamage;
    }

    getName() {
        return this.myName;
    }

    getHitPoints() {
        return this.myHitPoints;
    }

    getDamage() {
        return this.myDamage;
    }

    setName(theName) {
        this.myName = theName;
    }

    setHitPoints(theHitPoints) {
        this.myHitPoints = theHitPoints;
    }

    setDamage(theDamage) {
        this.myDamage = theDamage;
    }

    basicAttack() {

    }

    heal(theHeal) {
        this.myHitPoints += theHeal;
    }
}