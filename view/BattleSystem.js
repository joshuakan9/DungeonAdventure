class BattleSystem {
    constructor(thePlayer, theMonster) {
        this.player = thePlayer;
        this.monster = theMonster;
        this.turnCounter = 0;
        this.inCombat = true;
        this.stamina = player.getStamina();
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

    }

    determineClass() {
        return player.constructor.name;
    }

    basicAttack() {
        let playerDamage = this.player.basicAttack().getDamage();
        let playerHitPercentage = this.player.basicAttack().getHitPercentage();
        let playerRandom = Math.random() * 100; // random int 0 - 99

        if (playerHitPercentage - playerRandom <= 0) {
            this.monster.setHitPoints(this.monster.getHitPoints - playerDamage);

            let monsterHealPercentage = this.monster.getHeal().getHealPercentage();
            let monsterHealRandom = Math.random() * 100;

            if (monsterHealPercentage - monsterHealRandom <= 0) {
                this.monster.heal();
            }
        }
    }

    specialAttack() {
        if (this.determineClass() === "Priest") {
            this.player.heal();
        } else {
            let playerDamage = this.player.specialAttack().getDamage();
            let playerHitPercentage = this.player.specialAttack().getHitPercentage();
            let playerRandom = Math.random() * 100; // random int 0 - 99

            if (playerHitPercentage - playerRandom <= 0) {
                this.monster.setHitPoints(this.monster.getHitPoints - playerDamage);

                let monsterHealPercentage = this.monster.getHeal().getHealPercentage();
                let monsterHealRandom = Math.random() * 100;

                if (monsterHealPercentage - monsterHealRandom <= 0) {
                    this.monster.heal();
                }
            }
        }
    }

    monsterAttack() {
        let monsterDamage = this.monster.basicAttack().getDamage();
        let monsterHitPercentage = this.monster.basicAttack().getHitPercentage();
        let monsterRandom = Math.random() * 100; // random int 0 - 99

        if (monsterHitPercentage - monsterRandom <= 0) {
            player.setHitPoints(player.getHitPoints - monsterDamage);
        }
    }

    runBattle() {
        this.inCombat = true
        while (this.inCombat) {
            if (this.stamina > 0) {
                if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
                    this.stamina -= 2;
                    player.basicAttack();
                    this.isOutOfBattleCheck();
                } else if (keyIsDown(50)) { //2 button temporary subsitiution key 2 supermove
                    this.stamina -= 6;
                    player.specialAttack();
                    this.isOutOfBattleCheck();
                } else if (keyIsDown(51)) { //3 button temporary subsitiution key 3 heal
                    this.stamina -= 4;
                    player.buff();
                } else if (keyIsDown(52)) { //4 button temporary subsitiution key 4 open bag /use potion

                } else {
                    return
                }
            }

            this.monsterAttack();
            this.isOutOfBattleCheck();

            this.stamina = player.getStamina();
            this.turnCounter++;
        }

    }

}

