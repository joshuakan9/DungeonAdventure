class Pillar extends Entity {
    myName;

    constructor(theName) {
        myName = theName;
    }

    getName() {
        return this.myName;
    }
}