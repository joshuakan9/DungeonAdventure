const Assassin = require("../model/Assassin");
const Character = require("../model/Character");

class BattleSystem {
    constuctor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.turn = 0;
        this.inCombat;
        this.stamina = player.getStamina();
        this.random = Math.floor(Math.random() * 100);

    }

    // Starting the battle
    startBattle() {
        this.inCombat = true;
    }

    // Method that will check when the battle is over.
    isOutOfBattleCheck() {
        if (this.player.getHitPoints() <= 0) { //player health
            this.inCombat = false;
            console.log("YOU HAVE DIED");
        }
        if (this.monster <= 0) {
            this.inCombat = false;
            console.log("YOU HAVE WON");
        }

    }

    determineClass() {
        return heroClass = player.constructor.name;
    }

    basicAttack() {
        let playerDamage = this.player.basicAttack().getDamage();
        let playerHitPercentage = this.player.basicAttack().getHitPercentage();
        let playerRandom = Math.random() * 100; // random int 0 - 99

        if (playerHitPercentage - playerRandom <= 0) {
            monster.setHitPoints(monster.getHitPoints - playerDamage);

            let monsterHealPercentage = this.monster.getHeal().getHealPercentage();
            let monsterHealRandom = Math.random() * 100;

            if (monsterHealPercentage - monsterHealRandom <= 0) {
                monster.heal();
            }
        }
    }

    specialAttack() {
        if (determineClass() === "Priest") {
            this.player.specialAttack
        } else {
            let playerDamage = this.player.specialAttack().getDamage();
            let playerHitPercentage = this.player.specialAttack().getHitPercentage();
            let playerRandom = Math.random() * 100; // random int 0 - 99

            if (playerHitPercentage - playerRandom <= 0) {
                monster.setHitPoints(monster.getHitPoints - playerDamage);

                let monsterHealPercentage = this.monster.getHeal().getHealPercentage();
                let monsterHealRandom = Math.random() * 100;

                if (monsterHealPercentage - monsterHealRandom <= 0) {
                    monster.heal();
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

    turn() {
        this.inCombat = true
        while (this.inCombat) {
            if (stamina > 0) {
                if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
                    stamina -= 2;
                    player.basicAttack();
                    isOutOfBattleCheck();
                } else if (keyIsDown(50)) { //2 button temporary subsitiution key 2 supermove
                    stamina -= 6;
                    player.specialAttack();
                    isOutOfBattleCheck();
                } else if (keyIsDown(51)) { //3 button temporary subsitiution key 3 heal
                    stamina -= 4;
                    player.buff();
                } else if (keyIsDown(52)) { //4 button temporary subsitiution key 4 open bag /use potion

                } else {
                    return
                }
            }

            monsterAttack();
            isOutOfBattleCheck();

            stamina = player.getStamina();
            turn++;
        }

    }

}
const player = new Assassin("Test", 100, 10);
const monster = new Ogre("Brogre", 200, 5);

