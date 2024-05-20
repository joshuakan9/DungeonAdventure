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
            this.playerClone = null;
            this.mobClone = null;
            this.battleloop.stop();
        }
        push()
        fill('gray');
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
        let barWidth = width / 5; // Width of the bars
        let barHeight = 5; // Height of the bars

        let playerHealthPercentage = this.myBattleSystem.player.myHitPoints / this.playerMaxHealth;
        let playerHealthBarWidth = barWidth * playerHealthPercentage;
        let mobHealthPercentage = this.myBattleSystem.mob.myHitPoints / this.mobInitialHealth;
        let mobHealthBarWidth = barWidth * mobHealthPercentage;
        let playerStaminaPercentage = this.myBattleSystem.stamina / this.playerInitialStamina;
        let playerStaminaBarWidth = barWidth * playerStaminaPercentage;
        let barRoundedEdges = 10;

        // Draw player's health bar
        fill('red');
        rect(width / 20, height - height / 2, barWidth, barHeight, barRoundedEdges); // Draw the background of the health bar
        fill('green');
        rect(width / 4 - playerHealthBarWidth, height - height / 2, playerHealthBarWidth, barHeight, barRoundedEdges); // Draw the actual health bar

        // Draw mob's health bar
        fill('red');
        rect(width - width / 4, height - height / 2, barWidth, barHeight, barRoundedEdges); // Draw the background of the health bar
        fill('green');
        rect(width - width / 20 - mobHealthBarWidth, height - height / 2, mobHealthBarWidth, barHeight, barRoundedEdges); // Draw the actual health bar

        // // Stamina bar
        fill('red');
        rect(width / 20, height - height / 2.2, barWidth, barHeight, barRoundedEdges); // Draw the background of the health bar
        fill('yellow');
        rect(width / 4 - playerStaminaBarWidth, height - height / 2.2, playerStaminaBarWidth, barHeight, barRoundedEdges); // Draw the actual health bar

        // Health numbers
        this.drawHealthStaminaNumbers();
        pop()
    }

    drawHealthStaminaNumbers() {
        push()
        textAlign(RIGHT, CENTER);
        fill('black');

        // Player's health
        text(this.myBattleSystem.player.myHitPoints + ' / ' + this.playerMaxHealth, width / 4.7, height - height / 2.1);

        // Mob's health
        text(this.myBattleSystem.mob.myHitPoints + ' / ' + this.mobInitialHealth, width - width / 11.3, height - height / 2.1);

        // Stamina numbers
        text(this.myBattleSystem.stamina + ' / ' + this.playerInitialStamina, width / 5.3, height - height / 2.3);
        pop()
    }



}