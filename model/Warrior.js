class Warrior extends Character {
    myBasicAttack;
    mySpecialAttack;
    
    constructor({myStamina, myBag, myHitChance}) {
        super({myStamina, myBag, myHitChance})
        myBasicAttack = new Attack(100, 75);
        mySpecialAttack = new Attack(200, 50);
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