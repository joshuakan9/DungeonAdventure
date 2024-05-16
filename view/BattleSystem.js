
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

        const playerInitialHealth = 1000;
        const mobInitialHealth = this.mob.myHitPoints;
        const playerInitialStamina = this.player.myStamina;
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

                //background of textbox and buttons
                fill('white');
                rect(0, height - height/5, width, height - height/5);
                //buttons
                rect(width/2 + 5, height - height/5 + 5, width/4 - 5, height/10 - 5, 10);
                rect(width/2 + 5, height - height/10 + 5, width/4 - 5, height/10 - 10, 10);
                rect(width - width/4 + 5, height - height/5 + 5, width/4 - 10, height/10 - 5, 10);
                rect(width - width/4 + 5, height - height/10 + 5, width/4 - 10, height/10 - 10, 10);

                fill('black');
                let textWidth1 = textWidth("Basic Attack"); // Get width of text
                text("Basic Attack", width/2 + width/8 - textWidth1/2, height - height/5 + height/20 + 10);

                let textWidth2 = textWidth("Special Attack");
                text("Special Attack", width/2 + width/8 - textWidth2/2, height - height/10 + height/20 + 10);

                let textWidth3 = textWidth("Buff");
                text("Buff", width - width/4 + width/8 - textWidth3/2, height - height/5 + height/20 + 10);

                let textWidth4 = textWidth("Bag");
                text("Bag", width - width/4 + width/8 - textWidth4/2, height - height/10 + height/20 + 10);

                //player spota
                fill(240, 248, 255);
                rect(width/5 - 50, height - height/3 - 50, 50, 50);
                //monster spot
                fill(75, 0, 130);
                rect(width - width/5, height - height/3 - 50, 50, 50);

                // Health bar
                let barWidth = 200; // Width of the bars
                let barHeight = 40; // Height of the bars

                let playerHealthPercentage = this.player.myHitPoints / playerInitialHealth;
                let playerHealthBarWidth = barWidth * playerHealthPercentage;
                let mobHealthPercentage = this.mob.myHitPoints / mobInitialHealth;
                let mobHealthBarWidth = barWidth * mobHealthPercentage;
                let playerStaminaPercentage = this.stamina / playerInitialStamina;
                let playerStaminaBarWidth = barWidth * playerStaminaPercentage;

                // Draw player's health bar
                fill('red');
                rect(width / 5 - barWidth/2 - 100, height - height / 3 + 25, barWidth, barHeight); // Draw the background of the health bar
                fill('green');
                rect(width / 5 - barWidth/2 -  playerHealthBarWidth + 100, height - height / 3 + 25, playerHealthBarWidth, barHeight); // Draw the actual health bar

                // Draw mob's health bar
                fill('red');
                rect(width - width / 5 - barWidth/2 - barWidth + 300, height - height / 3 + 25, barWidth, barHeight); // Draw the background of the health bar
                fill('green');
                rect(width - width / 5 - barWidth/2 - mobHealthBarWidth + 300, height - height / 3 + 25, mobHealthBarWidth, barHeight); // Draw the actual health bar

                // Stamina bar
                fill('red');
                rect(width / 5 - barWidth/2 - 100, height - height / 3 + 75, barWidth, barHeight); // Draw the background of the stamina bar
                fill('yellow');
                rect(width / 5 - barWidth/2 - 100 + (barWidth - playerStaminaBarWidth), height - height / 3 + 75, playerStaminaBarWidth, barHeight); // Draw the actual stamina bar

                // Health numbers
                fill('black');
                // Player's health
                let playerTextWidth = textWidth(this.player.myHitPoints + ' / ' + playerInitialHealth);
                let playerTextX = width / 5 - barWidth + barWidth - 35 - playerTextWidth; // Right-align the text
                text(this.player.myHitPoints + ' / ' + playerInitialHealth, playerTextX, height - height / 3 + 25 + 30);

                // Mob's health
                let mobTextWidth = textWidth(this.mob.myHitPoints + ' / ' + mobInitialHealth);
                let mobTextX = width - width / 5 + barWidth - 35 - mobTextWidth; // Right-align the text
                text(this.mob.myHitPoints + ' / ' + mobInitialHealth, mobTextX, height - height / 3 + 25 + 30);

                // Stamina numbers
                let staminaTextWidth = textWidth(this.stamina + ' / ' + playerInitialStamina);
                let staminaTextX = width / 5 - barWidth + barWidth - 65 - staminaTextWidth; // Right-align the text
                text(this.stamina + ' / ' + playerInitialStamina, staminaTextX, height - height / 3 + 75 + 30);
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
            window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.mob}))
        }
        if (this.mob.getHitPoints() <= 0) {
            this.inCombat = false;
            console.log("YOU HAVE WON");
            window.dispatchEvent(new Event("e-battle-end"))
            window.dispatchEvent(new CustomEvent("e-entity-remove", {detail: this.mob}))
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

