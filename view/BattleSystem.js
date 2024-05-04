
class BattleSystem {
    constructor(thePlayer, theMonster) {

        this.player = thePlayer;
        this.monster = theMonster;
        console.log("battle started");
        this.turnCounter = 0;
        this.inCombat = true;
        this.stamina = this.player.getStamina();
        this.random = Math.floor(Math.random() * 100);

    }

    // Method that will check when the battle is over.
    isOutOfBattleCheck() {
        if (this.player.getHitPoints() <= 0) { //player health
            this.inCombat = false;
            console.log("YOU HAVE DIED");
        }
        if (this.monster.getHitPoints() <= 0) {
            this.inCombat = false;
            console.log("YOU HAVE WON");
        }
        window.dispatchEvent(new Event("e-battle-end"))
    }

    determineClass() {
        return player.constructor.name;
    }

    playerBasicAttack() {
        let playerDamage = this.player.getAttack().getDamage();
        let playerHitPercentage = this.player.getAttack().getHitPercentage();
        let playerRandom = random(0, 100); // random int 0 - 99

        if (playerRandom < playerHitPercentage) {
            this.monster.setHitPoints(this.monster.getHitPoints() - playerDamage);

            let monsterHealPercentage = this.monster.getHeal().getHealPercentage();
            let monsterHealRandom = random(0, 100);

            if (monsterHealRandom < monsterHealPercentage) {
                console.log("monster healed")
                this.monster.heal();
            }
        }
    }

    playerSpecialAttack() {
        if (this.determineClass() === "Priest") {
            this.player.heal();
        } else {
            let playerDamage = this.player.getSpecialAttack().getDamage();
            let playerHitPercentage = this.player.getSpecialAttack().getHitPercentage();
            let playerRandom = random(0, 100);

            if (playerRandom < playerHitPercentage) {
                this.monster.setHitPoints(this.monster.getHitPoints() - playerDamage);
                console.log(this.monster.getHitPoints())

                let monsterHealPercentage = this.monster.getHeal().getHealPercentage();
                let monsterHealRandom = random(0, 100);

                if (monsterHealRandom < monsterHealPercentage) {
                    console.log("monster healed")
                    this.monster.heal();
                }
            } else {
                console.log("player missed")
            }
        }
    }

    monsterBasicAttack() {
        let monsterDamage = this.monster.getAttack().getDamage();
        let monsterHitPercentage = this.monster.getAttack().getHitPercentage();
        let monsterRandom = random(0, 100); // random int 0 - 99

        if (monsterRandom < monsterHitPercentage) {

            let playerBlockPercentage = this.player.getBlockPercentage();
            console.log("block chance = " + playerBlockPercentage);
            let playerBlockRandom = random(0, 100);

            if (playerBlockRandom < playerBlockPercentage) {
                console.log("player blocked");
            } else {
                this.player.setHitPoints(this.player.getHitPoints() - monsterDamage);
                console.log("player hit");
            }
        } else {
            console.log("monster missed")
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
                this.monsterBasicAttack();
                this.isOutOfBattleCheck();
                this.stamina = this.player.getStamina();
            }

            console.log('player health = ' + this.player.getHitPoints())
            console.log('monster health = ' + this.monster.getHitPoints())
            this.turnCounter++;
        }
    }

}

