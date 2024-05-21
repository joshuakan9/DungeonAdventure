class BagSystem {
    myPlayer;
    myBag;
    myHitPoints;

    constructor(thePlayer) {
        this.myPlayer = thePlayer;
        this.myBag = thePlayer.getBag();
        this.myHitPoints = thePlayer.getHitPoints();
    }

    mouseClicked() {
        let menuWidth = width * 0.6
        let menuHeight = width * 0.5
        if (
            mouseX >= width / 2 - menuWidth / 2 &&
            mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
            mouseY >= height / 2 - menuHeight / 2 &&
            mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.2)
        {
            if (this.myPlayer.getBag().has("Health Potion")) {
                if (this.myPlayer.getBag().get("Health Potion") > 0) {
                    this.playerUseHealthPotion();
                    console.log('player used health potion');
                }
            }
        }
    }


    playerUseHealthPotion() {
        let healAmount = floor(random(50,101));
        if (this.myPlayer.getHitPoints() === this.myPlayer.getMaxHitPoints()) {
            console.log("player is already at full health");
            window.dispatchEvent(new Event("e-player-already-full-health"));
            return;
        } else if (this.myPlayer.getHitPoints() + healAmount > this.myPlayer.getMaxHitPoints()) {
            this.myPlayer.setHitPoints(this.myPlayer.getMaxHitPoints());
        } else {
            this.myPlayer.setHitPoints(this.myPlayer.getHitPoints() + healAmount);
        }
        this.myPlayer.removeBag("Health Potion");
        window.dispatchEvent(new CustomEvent("e-player-use-health-potion", {detail: healAmount}));
    }
}