
class BattleSystem {
    constuctor(player, mob) {
        this.player = player;
        this.mob = mob;
        this.turn = 0;
        this.player_Move = true;
        this.mob_Move = true;
        this.inCombat;
        this.stamina = 10;
        this.random = Math.floor(Math.random() * 101);

    }

    // Starting the battle
    startBattle() {
        this.inCombat = true;
    }

    // Method that will check when the battle is over.
    isOutOfBattleCheck() {
        if (this.player <= 0) { //player health
            this.inCombat = false;
            console.log("YOU HAVE DIED");
        }
        if (this.mob <= 0) {
            this.inCombat = false;
            console.log("YOU HAVE WON");
        }

    }

    determineClass() {
        return heroClass = player.constructor.name;
    }

    basicAttack() {
        
    }

    specialAttack() {
        if (determineClass() === "Priest") {
            this.player.specialAttackr
        } else  {
            this.player.specialAttack().getDamage();
        }


        switch(determineClass()) {
            case "Priest":
                this.player.specialAttack();
                break;
            case "Assassin":
                let asssassinDamage = player.specialAttack().getDamage();
                let assassinHitChance = player.
                break;
            case "Warrior":
                this.player.specialAttack();
                let warriorAttack = this.player.specialAttack();
                break;
            default:
                throw Error("invalid class");
        }
    }

    turn(offender, defender, option) {

        this.isOutOfBattleCheck();
        if(this.inCombat == true) {
            if (stamina <= 0)
                if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
                    stamina -= 2;
                    if (this.random <= offender.myAttack) 
                    defender.myHitPoints = defender.myHitPoints - player.basicAttack();
                } else if (keyIsDown(50)) { //2 button temporary subsitiution key 2 supermove
                    stamina -= 6;
                    player.specialAttack();
                } else if (keyIsDown(51)) { //3 button temporary subsitiution key 3 heal
                    stamina -= 4;
                    player.buff();
                } else if (keyIsDown(52)) { //4 button temporary subsitiution key 4 tbd
                    stamina -= 0;
                } else {
                    return
                }

            // Marks the player/mob that took there turn
            if (offender == player) {
                this.player_Move = false;
            } else {
                this.mob_Move = false;
            }

            // Checks to see if both player and mob did there turn if so then turn reset moves
            if (this.player_Move == false && this.mob_Move == false) {
                this.player_Move, this.mob_Move = true;
            }
        } else {
            console.log("Battle has ended")
        }
        
    }

    




}
const player = new Assassin("Test", 100, 10);
const mob = new Ogre("Brogre", 200, 5);


