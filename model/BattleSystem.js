
class BattleSystem {
    constructor(thePlayer, theMob, thePillarDrop) {
        this.player = thePlayer;
        this.mob = theMob;
        this.pillarDropBoolean = thePillarDrop.boolean;
        this.pillarDropCount = thePillarDrop.count;

        console.log("battle started");
        console.log(thePillarDrop.boolean);
        console.log(thePillarDrop.count);
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
            window.dispatchEvent(new Event("e-battle-end"))


        }
        if (this.mob.getHitPoints() <= 0) {
            console.log("YOU HAVE WON");

            if (this.pillarDropBoolean) {
                switch(this.pillarDropCount) {
                    case 0:
                        this.player.addBag(EntityFactory.createEntity("pillar of abstraction"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Abstraction"}))
                        break;
                    case 1:
                        this.player.addBag(EntityFactory.createEntity("pillar of encapsulation"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Encapsulation"}))
                        break;
                    case 2:
                        this.player.addBag(EntityFactory.createEntity("pillar of inheritance"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Inheritance"}))
                        break;
                    case 3:
                        this.player.addBag(EntityFactory.createEntity("pillar of polymorphism"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Polymorphism"}))
                        break;
                }
                window.dispatchEvent(new Event("e-player-battle-win"))

            }

            this.inCombat = false;
            window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.mob}))
            window.dispatchEvent(new Event("e-battle-end"))

        }

    }

    playerBasicAttack() {
        let playerDamage = this.player.getAttack().getDamage();
        let playerHitPercentage = this.player.getAttack().getHitPercentage();
        let playerRandom = random(0, 100);

        if (playerRandom < playerHitPercentage) {
            this.mob.setHitPoints(this.mob.getHitPoints() - playerDamage);
            window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.player, attack: "basic" }}))

            let mobHealPercentage = this.mob.getHeal().getHealPercentage();
            let mobHealRandom = random(0, 100);

            if (mobHealRandom < mobHealPercentage) {
                console.log("mob healed")
                window.dispatchEvent(new CustomEvent("e-mob-heal", {detail: this.mob}))
                this.mob.heal();
            }
        } else {
            console.log("player missed")
            window.dispatchEvent(new CustomEvent("e-miss-attack", {detail: this.player}))
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
                window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.player, attack: "special" }}))

                let mobHealPercentage = this.mob.getHeal().getHealPercentage();
                let mobHealRandom = random(0, 100);

                if (mobHealRandom < mobHealPercentage) {
                    console.log("mob healed")
                    window.dispatchEvent(new CustomEvent("e-mob-heal", {detail: this.mob}))
                    this.mob.heal();

                }
            } else {
                console.log("player missed")
                window.dispatchEvent(new CustomEvent("e-miss-attack", {detail: this.player}))
            }
        }
    }

    playerUseHealthPotion() {
        let healAmount = floor(random(50,101));
        // console.log("health = " + (this.player.getHitPoints() + healAmount));
        // console.log("max health = " + this.player.getMaxHitPoints());
        if (this.player.getHitPoints() === this.player.getMaxHitPoints()) {
            console.log("player is already at full health");
            window.dispatchEvent(new Event("e-player-already-full-health"));
            return;
        } else if (this.player.getHitPoints() + healAmount > this.player.getMaxHitPoints()) {
            this.player.setHitPoints(this.player.getMaxHitPoints());
        } else {
            this.player.setHitPoints(this.player.getHitPoints() + healAmount);
        }
        this.player.removeBag("Health Potion");
        window.dispatchEvent(new CustomEvent("e-player-use-health-potion", {detail: healAmount}));
    }

    mobAttack() {
        let mobBasicDamage = this.mob.getAttack().getDamage();
        let mobSpecialDamage = this.mob.getSpecialAttack().getDamage();
        let mobHitPercentage = this.mob.getAttack().getHitPercentage();
        let mobRandom = random(0, 100); // random int 0 - 99

        if (mobRandom < mobHitPercentage) {

            let playerBlockPercentage = this.player.getBlockPercentage();
            console.log("block chance = " + playerBlockPercentage);
            let playerBlockRandom = random(0, 100);

            if (playerBlockRandom < playerBlockPercentage) {
                console.log("player blocked");
                window.dispatchEvent(new CustomEvent("e-player-block", {detail: this.mob}));
            } else {

                let basicOrSpecial = random(0, 100);
                if (basicOrSpecial < 75) {
                    this.player.setHitPoints(this.player.getHitPoints() - mobBasicDamage);
                    console.log("player hit by basic");
                    window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.mob, attack: "basic" }}))
                } else {
                    this.player.setHitPoints(this.player.getHitPoints() - mobSpecialDamage);
                    console.log("player hit by special");
                    window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.mob, attack: "special" }}))
                }
            }
        } else {
            console.log("mob missed")
            window.dispatchEvent(new CustomEvent("e-miss-attack", {detail: this.mob}))
        }
    }

    turn(theMove) {
        if (this.inCombat) {
            console.log('stamina = ' + this.stamina);
            if (this.stamina > 0) {
                if (theMove === 'move_basic') {
                    if (this.stamina >= 2) {
                        this.stamina -= 2;
                        this.playerBasicAttack();
                        this.isOutOfBattleCheck();
                        console.log('player used basic attack');
                        console.log('stamina = ' + this.stamina);
                    } else {
                        console.log("not enough stamina");
                        window.dispatchEvent(new Event("e-not-enough-stamina"));
                    }

                } else if (theMove === 'move_special') {
                    if (this.stamina >= 6) {
                        this.stamina -= 6;
                        this.playerSpecialAttack();
                        this.isOutOfBattleCheck();
                        console.log('player used special attack');
                        console.log('stamina = ' + this.stamina);
                    } else {
                        console.log("not enough stamina");
                        window.dispatchEvent(new Event("e-not-enough-stamina"));
                    }
                } else if (theMove === 'move_buff') {
                    if (this.stamina >= 4) {
                        this.stamina -= 4;
                        this.player.buff();
                        if (instancePlayer.getClass() === "Assassin") {
                            window.dispatchEvent(new Event("e-assassin-buff"))
                        } else if (instancePlayer.getClass() === "Warrior") {
                            window.dispatchEvent(new Event("e-warrior-buff"))
                        } else if (instancePlayer.getClass() === "Priest") {
                            window.dispatchEvent(new Event("e-priest-buff"))
                        } else {
                            console.log("invalid class at buff");
                        }
                    } else {
                        console.log("not enough stamina");
                        window.dispatchEvent(new Event("e-not-enough-stamina"));
                    }
                } else if (theMove === 'move_bag') {
                    console.log(this.player.getBag());
                    if (this.player.getBag().get("Health Potion") > 0) {
                        this.playerUseHealthPotion();
                        console.log('player used health potion');
                    } else {
                        console.log("no health potions");
                        window.dispatchEvent(new Event("e-no-health-potions"));

                    }
                }

                if (this.stamina === 0) {
                    this.mobAttack();
                    this.isOutOfBattleCheck();
                    this.stamina = this.player.getStamina();
                }

                console.log('player health = ' + this.player.getHitPoints())
                console.log('mob health = ' + this.mob.getHitPoints())
                this.turnCounter++;
            }
        }
    }

}

