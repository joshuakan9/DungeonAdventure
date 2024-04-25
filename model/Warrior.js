class Warrior extends Character() {
    myBasicAttack;
    mySpecialAttack;
    
    constructor() {
        myBasicAttack = new Attack(100, 70);
        mySpecialAttack = new Attack(300, 50);
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