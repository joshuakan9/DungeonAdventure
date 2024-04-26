class Heal {
    myHealAmount;
    myHealChance;

    constructor(theHealAmount, theHealChance) {
        this.myHealChance = theHealChance;
        this.myHealAmount = theHealAmount;
    }

    getHealAmount() {
        return this.myHealAmount;
    }

    getHealPercentage() {
        return this.myHealPercentage;
    }

    setHealAmount(theHealAmount) {
        this.myHealAmount = theHealAmount;
    }

    setHealPercentage(theHealPercentage) {
        this.myHealPercentage = theHealPercentage;
    }
}