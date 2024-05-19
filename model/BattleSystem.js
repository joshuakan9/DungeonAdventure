
class BattleSystem {
    constructor(thePlayer, theMob) {
        this.player = thePlayer;
        this.mob = theMob;
        console.log("battle started");
        this.turnCounter = 0;
        this.inCombat = true;
        this.stamina = this.player.getStamina();
        // this.random = Math.floor(Math.random() * 100);
        window.dispatchEvent(new Event("e-player-freeze"))

    }
    // Method that will check when the battle is over.
    isOutOfBattleCheck() {
        if (this.player.getHitPoints() <= 0) { //player health
            console.log("YOU HAVE DIED");
            window.dispatchEvent(new Event("e-player-die"))
            this.inCombat = false;
            window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.mob}))

        }
        if (this.mob.getHitPoints() <= 0) {
            console.log("YOU HAVE WON");
            window.dispatchEvent(new Event("e-player-battle-win"))
            this.inCombat = false;
            window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.mob}))
            window.dispatchEvent(new Event("e-player-unfreeze"));
        }

    }

    playerBasicAttack() {
        let playerDamage = this.player.getAttack().getDamage();
        let playerHitPercentage = this.player.getAttack().getHitPercentage();
        let playerRandom = random(0, 100);

        if (playerRandom < playerHitPercentage) {
            this.mob.setHitPoints(this.mob.getHitPoints() - playerDamage);

            let mobHealPercentage = this.mob.getHeal().getHealPercentage();
            let mobHealRandom = random(0, 100);

            if (mobHealRandom < mobHealPercentage) {
                console.log("mob healed")
                this.mob.heal();
            }
        }
    }

    playerSpecialAttack() {
        if (this.player.getClass() === "Priest") {
            this.player.heal();
        } else {
            let playerDamage = this.player.getSpecialAttack().getDamage();
            let playerHitPercentage = this.player.getSpecialAttack().getHitPercentage();
            let playerRandom = random(0, 100);

            if (playerRandom < playerHitPercentage) {
                this.mob.setHitPoints(this.mob.getHitPoints() - playerDamage);

                let mobHealPercentage = this.mob.getHeal().getHealPercentage();
                let mobHealRandom = random(0, 100);

                if (mobHealRandom < mobHealPercentage) {
                    console.log("mob healed")
                    this.mob.heal();
                }
            } else {
                console.log("player missed")
                window.dispatchEvent(new Event("e-player-miss"))
            }
        }
    }

    playerUseHealthPotion() {
        this.player.setHitPoints(this.player.getHitPoints() + 100);
        this.player.removeBag("health potion");
        console.log("player used health potion");
        window.dispatchEvent(new Event("e-player-use-health-potion"))
    }

    mobBasicAttack() {
        let mobDamage = this.mob.getAttack().getDamage();
        let mobHitPercentage = this.mob.getAttack().getHitPercentage();
        let mobRandom = random(0, 100); // random int 0 - 99

        if (mobRandom < mobHitPercentage) {

            let playerBlockPercentage = this.player.getBlockPercentage();
            console.log("block chance = " + playerBlockPercentage);
            let playerBlockRandom = random(0, 100);

            if (playerBlockRandom < playerBlockPercentage) {
                console.log("player blocked");
                window.dispatchEvent(new Event("e-player-block"));
            } else {
                this.player.setHitPoints(this.player.getHitPoints() - mobDamage);
                console.log("player hit");
                window.dispatchEvent(new Event("e-mob-attack"))
            }
        } else {
            console.log("mob missed")
            window.dispatchEvent(new Event("e-mob-miss"))
        }
    }

    turn(theMove) {
        if (this.inCombat) {
            console.log('stamina = ' + this.stamina);
            if (this.stamina > 0) {
                if (theMove === 'move_basic' && this.stamina >= 2) {
                    this.stamina -= 2;
                    this.playerBasicAttack();
                    this.isOutOfBattleCheck();
                    console.log('player used basic attack');
                    console.log('stamina = ' + this.stamina);

                } else if (theMove === 'move_special' && this.stamina >= 6) {
                    this.stamina -= 6;
                    this.playerSpecialAttack();
                    this.isOutOfBattleCheck();
                    console.log('player used special attack');
                    console.log('stamina = ' + this.stamina);

                } else if (theMove === 'move_buff' && this.stamina >= 4) {
                    this.stamina -= 4;
                    this.player.buff();
                    console.log('player used buff');
                    console.log('stamina = ' + this.stamina);

                } else if (theMove === 'move_bag') {

                }
            }

            if (this.stamina === 0) {
                this.mobBasicAttack();
                this.isOutOfBattleCheck();
                this.stamina = this.player.getStamina();
            }

            console.log('player health = ' + this.player.getHitPoints())
            console.log('mob health = ' + this.mob.getHitPoints())
            this.turnCounter++;
        }
    }

}

