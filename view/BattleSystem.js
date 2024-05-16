
class BattleSystem {
    constructor(thePlayer, theMob) {
        this.player = thePlayer;
        this.mob = theMob;
        console.log("battle started");
        this.turnCounter = 0;
        this.inCombat = true;
        this.stamina = this.player.getStamina();
        this.random = Math.floor(Math.random() * 100);
        window.dispatchEvent(new Event("e-player-freeze"))

    }

    clear() {
        // clears setinterval
        clearInterval(this.interval);
        // sketch line 235 (might change) if statement for transition is done
        this.drawer = null;
    }

    battleDisplay() {
        console.log(this.mob)
        this.clear();
        const handler = () => { // anonymous function that is put into the setInterval
            if (!this.inCombat) { // the break out case
                console.log("out of combat")
                this.clear();
                return;
            }
            this.drawer = () => { // draws function draws effect
                //console.log("drawing combat")
                fill('black');
                rect(0, 0, width, height);
                fill(92, 64, 51);
                rect(0, (height * 2)/3, width, height/3);

                fill('white');
                rect(0, height - height/5, width, height - height/5);

                //player spot
                fill(240, 248, 255);
                rect(width/5 - 50, height - height/3 - 50, 50, 50);
                //monster spot
                fill(75, 0, 130);
                rect(width - width/5, height - height/3 - 50, 50, 50);

            }
        }
        handler();
        this.interval = setInterval(handler, 100); // handler function and the time it takes for handler to be finished
    }

    drawerStatus() {
        return this.drawer != null
    }

    // Method that will check when the battle is over.
    isOutOfBattleCheck() {
        if (this.player.getHitPoints() <= 0) { //player health
            this.inCombat = false;
            console.log("YOU HAVE DIED");
            window.dispatchEvent(new Event("e-battle-end"))
        }
        if (this.mob.getHitPoints() <= 0) {
            this.inCombat = false;
            console.log("YOU HAVE WON");
            window.dispatchEvent(new Event("e-battle-end"))
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
                console.log(this.mob.getHitPoints())

                let mobHealPercentage = this.mob.getHeal().getHealPercentage();
                let mobHealRandom = random(0, 100);

                if (mobHealRandom < mobHealPercentage) {
                    console.log("mob healed")
                    this.mob.heal();
                }
            } else {
                console.log("player missed")
            }
        }
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
            } else {
                this.player.setHitPoints(this.player.getHitPoints() - mobDamage);
                console.log("player hit");
            }
        } else {
            console.log("mob missed")
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

