class Warrior extends Character {
    myBasicAttack;
    mySpecialAttack;
    
    constructor() {
        myBasicAttack = new Attack(100, 100);
        mySpecialAttack = new Attack(100, 100);
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        return this.mySpecialAttack;
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        return this.mySpecialAttack;
    }

    buff() {
        myBlockChance += 5;
    }
}