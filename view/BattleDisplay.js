class BattleDisplay {
    constructor(theBattleSystem) {
        this.myBattleSystem = theBattleSystem;
        this.playerMaxHealth = this.myBattleSystem.player.getMaxHitPoints();
        this.mobInitialHealth = this.myBattleSystem.mob.myHitPoints;
        this.playerInitialStamina = this.myBattleSystem.player.myStamina;
        this.playerClone = this.myBattleSystem.player;
        this.mobClone = this.myBattleSystem.mob;
        this.playerClone.setPos(createVector(5,10))
        this.mobClone.setPos(createVector(10,10))
        console.log(this.myBattleSystem.player)
        console.log(this.playerClone)
    }
    displayBattle(){


        if (!this.myBattleSystem.inCombat) {
            playerClone = null;
            mobClone = null;
            this.battleloop.stop();
        }
        push()
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

        //player spot
        this.playerClone.draw()

        //monster spot
        this.mobClone.draw()

        // Health bar
        let barWidth = 200; // Width of the bars
        let barHeight = 40; // Height of the bars

        let playerHealthPercentage = this.myBattleSystem.player.myHitPoints / this.playerMaxHealth;
        let playerHealthBarWidth = barWidth * playerHealthPercentage;
        let mobHealthPercentage = this.myBattleSystem.mob.myHitPoints / this.mobInitialHealth;
        let mobHealthBarWidth = barWidth * mobHealthPercentage;
        let playerStaminaPercentage = this.myBattleSystem.stamina / this.playerInitialStamina;
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
        let playerTextWidth = textWidth(this.myBattleSystem.player.myHitPoints + ' / ' + this.playerMaxHealth);
        let playerTextX = width / 5 - barWidth + barWidth - 35 - playerTextWidth; // Right-align the text
        text(this.myBattleSystem.player.myHitPoints + ' / ' + this.playerMaxHealth, playerTextX, height - height / 3 + 25 + 30);

        // Mob's health
        let mobTextWidth = textWidth(this.myBattleSystem.mob.myHitPoints + ' / ' + this.mobInitialHealth);
        let mobTextX = width - width / 5 + barWidth - 35 - mobTextWidth; // Right-align the text
        text(this.myBattleSystem.mob.myHitPoints + ' / ' + this.mobInitialHealth, mobTextX, height - height / 3 + 25 + 30);

        // Stamina numbers
        let staminaTextWidth = textWidth(this.myBattleSystem.stamina + ' / ' + this.playerInitialStamina);
        let staminaTextX = width / 5 - barWidth + barWidth - 65 - staminaTextWidth; // Right-align the text
        text(this.myBattleSystem.stamina + ' / ' + this.playerInitialStamina, staminaTextX, height - height / 3 + 75 + 30);
        
        pop()
    }



}