class Heal {
    myHealAmount;
    myHealPercentage;

    constructor(theHealAmount, theHealPercentage) {
        this.myHealPercentage = theHealPercentage;
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