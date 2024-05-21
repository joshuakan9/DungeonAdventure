class BattleDisplay {
    constructor(theBattleSystem) {
        this.myBattleSystem = theBattleSystem;
        this.playerMaxHealth = this.myBattleSystem.player.getMaxHitPoints();
        this.mobInitialHealth = this.myBattleSystem.mob.myHitPoints;
        this.playerInitialStamina = this.myBattleSystem.player.myStamina;
        this.createClones();
    }

    displayBattle(){
        //window.dispatchEvent(new Event("e-transition"))
        push()
        fill('gray');
        rect(0, 0, width, height);
        fill(92, 64, 51);
        rect(0, (height * 2)/3, width, height/3);
        pop()

        //background of textbox and buttons
        push()
        fill('white');
        noStroke();
        rect(0, height - height/5, width, height - height/5);
        pop()
        push()

        //buttons
        this.drawButtons()

        // this.drawButtonsText()

        //player spot
        this.playerClone.draw()

        //monster spot
        this.mobClone.draw()

        this.drawHealthStaminaBars()

        // Health numbers
        this.drawHealthStaminaNumbers();
        pop()
    }

    drawButtons() {
        push()
        let buttonWidth = width/4.1;
        let buttonHeight = height/10.6;
        let rectRoundEdges = 10;

        // basic attack button
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

        rect(rect1X, rect1Y, buttonWidth, buttonHeight, rectRoundEdges);
        rect(rect2X, rect2Y, buttonWidth, buttonHeight, rectRoundEdges);
        rect(rect3X, rect3Y, buttonWidth, buttonHeight, rectRoundEdges);
        rect(rect4X, rect4Y, buttonWidth, buttonHeight, rectRoundEdges);

        textAlign(CENTER, CENTER);
        fill('black');

        text("Basic Attack", rect1X, rect1Y, buttonWidth, buttonHeight);
        text("Special Attack", rect2X, rect2Y, buttonWidth, buttonHeight, rectRoundEdges);
        text("Buff", rect3X, rect3Y, buttonWidth, buttonHeight, rectRoundEdges);
        text("Bag", rect4X, rect4Y, buttonWidth, buttonHeight, rectRoundEdges);

        // HEALTH POTION / BAG IS EMPTY
        fill(0, 0, 0, 25)
        if (
            mouseX > rect1X && mouseX < rect1X + buttonWidth && mouseY > rect1Y && mouseY < rect1Y + buttonHeight
        ) {
            fill(0, 0, 0, 100)
        }
        rect(rect1X, rect1Y, buttonWidth, buttonHeight, rectRoundEdges)

        // PILLAR OF ABSTRACTION
        fill(0, 0, 0, 25)
        if (
            mouseX > rect2X && mouseX < rect2X + buttonWidth && mouseY > rect2Y && mouseY < rect2Y + buttonHeight
        ) {
            fill(0, 0, 0, 100)
        }
        rect(rect2X, rect2Y, buttonWidth, buttonHeight, rectRoundEdges)

        // PILLAR OF ENCAPSULATION
        fill(0, 0, 0, 25)
        if (
            mouseX > rect3X && mouseX < rect3X + buttonWidth && mouseY > rect3Y && mouseY < rect3Y + buttonHeight
        ) {
            fill(0, 0, 0, 100)
        }
        rect(rect3X, rect3Y, buttonWidth, buttonHeight, rectRoundEdges)

        // PILLAR OF INHERITANCE
        fill(0, 0, 0, 25)
        if (
            mouseX > rect4X && mouseX < rect4X + buttonWidth && mouseY > rect4Y && mouseY < rect4Y + buttonHeight
        ) {
            fill(0, 0, 0, 100)
        }
        rect(rect4X, rect4Y, buttonWidth, buttonHeight, rectRoundEdges)

        pop()
    }


    drawHealthStaminaBars() {
        push()
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

    createClones() {
        const playerConst = this.myBattleSystem.player.constructor;
        const mobConst = this.myBattleSystem.mob.constructor;
        this.playerClone = new playerConst({
            thePos: createVector((5), (10)),
            theSize: createVector(1, 2),
            theImage: this.myBattleSystem.player.myImage,
            theHFrames: 9,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 32),
            theOffset: createVector(0, -1.2),
            theName: "Tester",
            theHitPoints: 1000,
            theAttack: new Attack(10000, 100),
            theStamina: 10,
            theBlockPercentage: 0,
            theMaxHitPoints: 1000,
            theSpecialAttack: new Attack(200, 100),
            theAnimation: new Animations({
              stand: new FramePattern(ANIM_STAND),
              walk: new FramePattern(ANIM_WALK)
            }),
        })
        this.mobClone = new mobConst ({
            thePos: createVector((10), (10)),
            theSize: createVector(1, 2),
            theImage: this.myBattleSystem.mob.myImage,
            theHFrames: 9,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 32),
            theOffset: createVector(0, -1.2),
            theName: "Tester",
            theHitPoints: 1000,
            theAttack: new Attack(10000, 100),
            theStamina: 10,
            theBlockPercentage: 0,
            theMaxHitPoints: 1000,
            theSpecialAttack: new Attack(200, 100),
            theAnimation: new Animations({
              stand: new FramePattern(ANIM_STAND),
              walk: new FramePattern(ANIM_WALK)
            }),
        })
        // console.log(this.myBattleSystem.player)
        // console.log(this.playerClone)
        // console.log(this.myBattleSystem.mob)
        // console.log(this.mobClone)
    }



}