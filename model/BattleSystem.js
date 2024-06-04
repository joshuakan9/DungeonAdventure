/**
 * BattleSystem is a class that manages the battle system in the game.
 */
class BattleSystem {

    /**
     * Constructs a new BattleSystem instance.
     *
     * @param {Object} thePlayer - The player.
     * @param {Object} themyMob - The myMob.
     * @param {Object} thePillarDrop - The pillar drop.
     */
    constructor(thePlayer, theMob, thePillarDrop) {
        this.myPlayer = thePlayer;
        this.myMob = theMob;
        this.myPillarDropBoolean = thePillarDrop.boolean;
        this.myPillarDropCount = thePillarDrop.count;
        this.myTurnCounter = 0;
        this.myInCombat = true;
        this.myStamina = this.myPlayer.getStamina();
        window.dispatchEvent(new Event("e-player-freeze"))

    }

    getInCombat() {
        return this.myInCombat
    }

    /**
     * Checks if the battle is over.
     */
    isOutOfBattleCheck() {
        if (this.myPlayer.getHitPoints() <= 0 ) {
            window.dispatchEvent(new Event("e-player-die"))
            this.myInCombat = false;
            //window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.myMob}))
            window.dispatchEvent(new Event("e-battle-end"))
        }
        if (this.myMob.getHitPoints() <= 0) {
            console.log("YOU HAVE WON");
            window.dispatchEvent(new CustomEvent("e-player-battle-win", {detail: this.myMob}))

            if (this.myPillarDropBoolean) {
                switch(this.myPillarDropCount) {
                    case 0:
                        this.myPlayer.addBag(EntityFactory.createEntity("pillar of abstraction"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Abstraction"}))
                        break;
                    case 1:
                        this.myPlayer.addBag(EntityFactory.createEntity("pillar of encapsulation"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Encapsulation"}))
                        break;
                    case 2:
                        this.myPlayer.addBag(EntityFactory.createEntity("pillar of inheritance"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Inheritance"}))
                        break;
                    case 3:
                        this.myPlayer.addBag(EntityFactory.createEntity("pillar of polymorphism"));
                        window.dispatchEvent(new CustomEvent("e-pillar-drop", {detail: "Pillar of Polymorphism"}))
                        break;
                }
            }
            this.myInCombat = false;
            window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.myMob}))
            window.dispatchEvent(new Event("e-battle-end"))
        }

    }

    /**
     * Performs a basic attack by the player.
     */
    playerBasicAttack() {
        let playerDamage = this.myPlayer.getAttack().getDamage();
        let playerHitPercentage = this.myPlayer.getAttack().getHitPercentage();
        let playerRandom = Math.random() * 100;

        if (playerRandom < playerHitPercentage) {
            this.myMob.setHitPoints(this.myMob.getHitPoints() - playerDamage);

            if (this.myMob.getHitPoints() <= 0) {
                this.myInCombat = false;
            }
            window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.myPlayer, attack: "basic" }}))

            let myMobHealPercentage = this.myMob.getHeal().getHealPercentage();
            let myMobHealRandom = Math.random() * 100;

            if (myMobHealRandom < myMobHealPercentage && this.myMob.getHitPoints() - playerDamage > 0) {
                console.log("mob healed")
                window.dispatchEvent(new CustomEvent("e-mob-heal", {detail: this.myMob}))
                this.myMob.heal();
            }
        } else {
            console.log("player missed")
            window.dispatchEvent(new CustomEvent("e-miss-attack", {detail: this.myPlayer}))
        }
    }

    /**
     * Performs a special attack by the player.
     */
    playerSpecialAttack() {
        if (this.myPlayer.getClass() === "Priest") {
            let healAmount = this.myPlayer.getHeal().getHealAmount();
            console.log("heal amount = " + healAmount);
            if (this.myPlayer.getHitPoints() + this.myPlayer.getHeal().getHealAmount() > this.myPlayer.getMaxHitPoints()) {
                healAmount = this.myPlayer.getMaxHitPoints() - this.myPlayer.getHitPoints();

                this.myPlayer.setHitPoints(this.myPlayer.getMaxHitPoints());
                window.dispatchEvent(new CustomEvent("e-priest-heal", {detail: {player: this.myPlayer, healAmount: healAmount}}))
            } else {
                this.myPlayer.heal();
                window.dispatchEvent(new CustomEvent("e-priest-heal",  {detail: {player: this.myPlayer, healAmount: healAmount}}))
            }
        } else {
            let playerDamage = this.myPlayer.getSpecialAttack().getDamage();
            let playerHitPercentage = this.myPlayer.getSpecialAttack().getHitPercentage();
            let playerRandom = Math.random() * 100;

            if (playerRandom < playerHitPercentage) {
                this.myMob.setHitPoints(this.myMob.getHitPoints() - playerDamage);

                if (this.myMob.getHitPoints() <= 0) {
                    this.myInCombat = false;
                }
                if (this.myPlayer.getHitPoints() <= 0) {
                    this.myInCombat = false;
                }
                window.dispatchEvent(new CustomEvent("e-special-attack"))

                let myMobHealPercentage = this.myMob.getHeal().getHealPercentage();
                let myMobHealRandom = Math.random() * 100;

                if (myMobHealRandom < myMobHealPercentage && this.myMob.getHitPoints() - playerDamage > 0) {
                    console.log("mob healed")
                    window.dispatchEvent(new CustomEvent("e-mob-heal", {detail: this.myMob}))
                    this.myMob.heal();

                }
            } else {
                console.log("player missed")
                window.dispatchEvent(new CustomEvent("e-miss-attack", {detail: this.myPlayer}))
            }
        }
    }

    /**
     * Performs an attack by the myMob.
     */
    myMobAttack() {
        let myMobBasicDamage = this.myMob.getAttack().getDamage();
        let myMobSpecialDamage = this.myMob.getSpecialAttack().getDamage();
        let myMobHitPercentage = this.myMob.getAttack().getHitPercentage();
        let myMobRandom = Math.random() * 100; // random int 0 - 99

        if (myMobRandom < myMobHitPercentage) {

            let playerBlockPercentage = this.myPlayer.getBlockPercentage();
            console.log("block chance = " + playerBlockPercentage);
            let playerBlockRandom = Math.random() * 100;

            if (playerBlockRandom < playerBlockPercentage) {
                console.log("player blocked");
                window.dispatchEvent(new CustomEvent("e-player-block", {detail: this.myMob}));
            } else {

                let basicOrSpecial = Math.random() * 100;
                if (basicOrSpecial < 75) {
                    this.myPlayer.setHitPoints(this.myPlayer.getHitPoints() - myMobBasicDamage);
                    
                    console.log("player hit by basic");
                    window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.myMob, attack: "basic" }}))
                } else {
                    this.myPlayer.setHitPoints(this.myPlayer.getHitPoints() - myMobSpecialDamage);
                    console.log("player hit by special");
                    window.dispatchEvent(new CustomEvent("e-attack" , {detail:{ entity: this.myMob, attack: "special" }}))
                }
            }
        } else {
            console.log("myMob missed")
            window.dispatchEvent(new CustomEvent("e-miss-attack", {detail: this.myMob}))
        }
    }

    /**
     * Performs a turn in the battle.
     *
     * @param {string} theMove - The move to perform in the turn.
     */
    turn(theMove) {
        if (this.myInCombat) {
            console.log('stamina = ' + this.myStamina);
            if (this.myStamina > 0) {
                if (theMove === 'move_basic') {
                    if (this.myStamina >= 2) {
                        this.myStamina -= 2;
                        this.playerBasicAttack();
                        this.isOutOfBattleCheck();
                        console.log('player used basic attack');
                        console.log('stamina = ' + this.myStamina);
                    } else {
                        console.log("not enough stamina");
                        window.dispatchEvent(new Event("e-not-enough-stamina"));
                    }

                } else if (theMove === 'move_special') {
                    if (this.myStamina >= 6) {
                        if (this.myPlayer.getClass() === "Priest" && this.myPlayer.getHitPoints() === this.myPlayer.getMaxHitPoints()) {
                            console.log("player is already at full health");
                            window.dispatchEvent(new Event("e-player-already-full-health"));
                            return;
                        }
                        this.myStamina -= 6;
                        this.playerSpecialAttack();
                        this.isOutOfBattleCheck();
                        console.log('player used special attack');
                        console.log('stamina = ' + this.myStamina);
                    } else {
                        console.log("not enough stamina");
                        window.dispatchEvent(new Event("e-not-enough-stamina"));
                    }
                } else if (theMove === 'move_buff') {
                    if (this.myStamina >= 4) {
                        this.myStamina -= 4;
                        this.myPlayer.buff();
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
                    console.log(this.myPlayer.getBag());
                    window.dispatchEvent(new Event("e-bag"))
                }

                if (this.myMob.getHitPoints() > 0) {
                    if (this.myStamina === 0) {
                        this.myMobAttack();
                        this.isOutOfBattleCheck();
                        this.myStamina = this.myPlayer.getStamina();
                    }
                }

                console.log('player health = ' + this.myPlayer.getHitPoints())
                console.log('myMob health = ' + this.myMob.getHitPoints())
                this.myTurnCounter++;
            }
        }
    }

    /**
     * Handles the mouse clicked event.
     */
    mouseClicked() {

        let buttonWidth = width/4.1;
        let buttonHeight = height/10.6;
        let rect1X = width/1.985;
        let rect1Y = height - height/5.1;

        // special attack button
        let rect2X = width/1.985;
        let rect2Y = height - height/10.3;

        // buff button
        let rect3X = width - width/4.025;
        let rect3Y = height - height/5.1;

        // bag button
        let rect4X = width - width/4.025;
        let rect4Y = height - height/10.3;

        if (mouseX > rect1X && mouseX < rect1X + buttonWidth && mouseY > rect1Y && mouseY < rect1Y + buttonHeight) {
            instanceBattle.turn("move_basic");
        }

        if (mouseX > rect2X && mouseX < rect2X + buttonWidth && mouseY > rect2Y && mouseY < rect2Y + buttonHeight) {
            instanceBattle.turn("move_special");
        }

        if (mouseX > rect3X && mouseX < rect3X + buttonWidth && mouseY > rect3Y && mouseY < rect3Y + buttonHeight) {
            instanceBattle.turn("move_buff");
        }

        if (mouseX > rect4X && mouseX < rect4X + buttonWidth && mouseY > rect4Y && mouseY < rect4Y + buttonHeight) {
            instanceBattle.turn("move_bag");
        }
    }

}

