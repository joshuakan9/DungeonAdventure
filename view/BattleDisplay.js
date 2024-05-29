/**
 * The scale of the display.
 * @constant
 */
const DISPLAY_SCALE = 5;

/**
 * The Y position of the floor.
 * @constant
 */
const FLOOR_Y = 3;

/**
 * The amount of wall.
 * @constant
 */
const WALL_AMT = 2;

/**
 * The width scale of the buttons.
 * @constant
 */
const BUTTON_WIDTH_SCALE = 4.1;

/**
 * The height scale of the buttons.
 * @constant
 */
const BUTTON_HEIGHT_SCALE = 10.6;

/**
 * The X position of the first column of buttons.
 * @constant
 */
const FIRST_COLUMN_X = 1.985;

/**
 * The X position of the second column of buttons.
 * @constant
 */
const SECOND_COLUMN_X = 4.025;

/**
 * The Y position of the first row of buttons.
 * @constant
 */
const FIRST_ROW_Y = 5.1;

/**
 * The Y position of the second row of buttons.
 * @constant
 */
const SECOND_ROW_Y = 10.3;

/**
 * The rounding of the button corners.
 * @constant
 */
const BUTTON_ROUNDING = 10;

/**
 * The transparency of the button when not hovered over.
 * @constant
 */
const ORIGIN_TRANSPARENCY = 25;

/**
 * The transparency of the button when hovered over.
 * @constant
 */
const MOUSE_ON_TRANSPARENCY = 100;

/**
 * The scale of the information bars.
 * @constant
 */
const BAR_SCALE = 20;

/**
 * The scale of the health bar.
 * @constant
 */
const HP_BAR_SCALE = 1.75;

/**
 * The scale of the background of the health bar.
 * @constant
 */
const HP_BAR_BG_SCALE = 4;

/**
 * The height scale of the background of the health bar.
 * @constant
 */
const HP_BAR_BG_HEIGHT_SCALE = 1.90;

/**
 * The height scale of the numbers of the health and stamina bar Y.
 * @constant
 */
const HP_NUMBER_HEIGHT_NUM_SCALE = 1.85;

/**
 * The height scale of the numbers of the health bar X.
 * @constant
 */
const HP_PLAYER_NUMBER_WIDTH_NUM_SCALE = 4.7;

/**
 * The height scale of the numbers of the health bar X.
 * @constant
 */
const HP_MOB_NUMBER_WIDTH_NUM_SCALE = 11.3;
/**
 * The height scale of the numbers of the stamina bar X.
 */

const STAMINA_MOB_NUMBER_WIDTH_NUM_SCALE = 5.3;
/**
 * Class representing a BattleDisplay.
 */

class BattleDisplay {
    /**
     * Create a BattleDisplay.
     * @param {Object} theBattleSystem - The battle system for the BattleDisplay.
     */
    constructor(theBattleSystem) {
        this.myBattleSystem = theBattleSystem;
        this.playerMaxHealth = this.myBattleSystem.player.getMaxHitPoints();
        this.mobInitialHealth = this.myBattleSystem.mob.myHitPoints;
        this.playerInitialStamina = this.myBattleSystem.player.myStamina;
        this.createClones();
        this.randomIndexes = [];
        for (let i = 0; i < DISPLAY_SCALE; i++) {
            this.randomIndexes.push(Math.floor(Math.random() * 5))
        }
    }

    /**
     * Display the battle.
     */
    displayBattle(){
        //window.dispatchEvent(new Event("e-transition"))
        push()
        fill('black')
        rect(0, 0, width, height)
        this.drawWall();
        this.drawFloor();
        //image(this.myTILEMAP, 0, (height * 2)/5, 1 * width/, 2 * height/5);
        pop()

        //background of textbox and buttons
        push()
        fill('white');
        noStroke();
        rect(0, height - height/DISPLAY_SCALE, width, height - height/5);
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

    /**
     * Draw the wall.
     */
    drawWall() {
        let WALL_IMG_ARRAY = [
            WALL1_IMG,
            WALL2_IMG,
            WALL3_IMG,
            WALL4_IMG,
            WALL5_IMG,
        ]
        
        image(WALL_IMG, 0, 0, width/WALL_AMT, height/DISPLAY_SCALE);
        image(WALL_IMG, width/WALL_AMT, 0, width/WALL_AMT, height/DISPLAY_SCALE);
        //console.log(1234, WALL1_IMG)
        for (let i = 0; i < DISPLAY_SCALE; i++) {
            let x = Math.floor(Math.random() * WALL_IMG_ARRAY.length);
            if(i % 2 == 0) {
                image(WALL_IMG_ARRAY[this.randomIndexes[i]], (width * i/DISPLAY_SCALE), (height)/DISPLAY_SCALE, width/DISPLAY_SCALE, height/DISPLAY_SCALE);
            } else {
                image(WALL0_IMG, (width * i/DISPLAY_SCALE), (height)/DISPLAY_SCALE, width/DISPLAY_SCALE, height/DISPLAY_SCALE);
            }
        }
    }

    /**
     * Draw the floor.
     */
    drawFloor() {
        for (let i = 0; i < DISPLAY_SCALE; i++) {
            image(FLOOR_IMG, (width * i/DISPLAY_SCALE), (height * 2)/DISPLAY_SCALE, width/DISPLAY_SCALE, height/DISPLAY_SCALE);
        }
        for (let i = 0; i < DISPLAY_SCALE; i++) {
            image(FLOOR_IMG, (width * i/DISPLAY_SCALE), (height * FLOOR_Y)/DISPLAY_SCALE, width/DISPLAY_SCALE, height/DISPLAY_SCALE);
        }
    }

    /**
     * Draw the buttons.
     */
    drawButtons() {
        push()

        //Button Size
        const buttonWidth = width/BUTTON_WIDTH_SCALE;
        const buttonHeight = height/BUTTON_HEIGHT_SCALE;

        // basic attack button X,Y
        const rect1X = width/FIRST_COLUMN_X;
        const rect1Y = height - height/FIRST_ROW_Y;
        // special attack button X,Y
        const rect2X = width/FIRST_COLUMN_X;
        const rect2Y = height - height/SECOND_ROW_Y;
        // buff button X,Y
        const rect3X = width - width/SECOND_COLUMN_X;
        const rect3Y = height - height/FIRST_ROW_Y;
        // bag button X,Y
        const rect4X = width - width/SECOND_COLUMN_X;
        const rect4Y = height - height/SECOND_ROW_Y;

        rect(rect1X, rect1Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        rect(rect2X, rect2Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        rect(rect3X, rect3Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        rect(rect4X, rect4Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);

        textAlign(CENTER, CENTER);
        fill('black');

        text("Basic Attack", rect1X, rect1Y, buttonWidth, buttonHeight);
        switch (this.myBattleSystem.player.getClass()) {
            case 'Assassin':
                text("Quick Attack", rect2X, rect2Y, buttonWidth, buttonHeight);
                break;
            case 'Warrior':
                text("Crushing Blow", rect2X, rect2Y, buttonWidth, buttonHeight);
                break;
            case 'Priest':
                text("Heal", rect2X, rect2Y, buttonWidth, buttonHeight);
                break;
            case 'Dino':
                text("Bite", rect2X, rect2Y, buttonWidth, buttonHeight);
            break;
        }
        text("Buff", rect3X, rect3Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        text("Bag", rect4X, rect4Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);

        // HEALTH POTION / BAG IS EMPTY
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect1X && mouseX < rect1X + buttonWidth && mouseY > rect1Y && mouseY < rect1Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect1X, rect1Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        // PILLAR OF ABSTRACTION
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect2X && mouseX < rect2X + buttonWidth && mouseY > rect2Y && mouseY < rect2Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect2X, rect2Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        // PILLAR OF ENCAPSULATION
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect3X && mouseX < rect3X + buttonWidth && mouseY > rect3Y && mouseY < rect3Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect3X, rect3Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        // PILLAR OF INHERITANCE
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect4X && mouseX < rect4X + buttonWidth && mouseY > rect4Y && mouseY < rect4Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect4X, rect4Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        pop()
    }


    /**
     * Draw the health and stamina bars.
     */
    drawHealthStaminaBars() {
        push()
        // Health bar
        let barWidth = width / DISPLAY_SCALE; // Width of the bars
        let barHeight = BAR_SCALE; // Height of the bars

        let playerHealthPercentage = this.myBattleSystem.player.myHitPoints / this.playerMaxHealth;
        let playerHealthBarWidth = barWidth * playerHealthPercentage;
        let mobHealthPercentage = this.myBattleSystem.mob.myHitPoints / this.mobInitialHealth;
        let mobHealthBarWidth = barWidth * mobHealthPercentage;
        let playerStaminaPercentage = this.myBattleSystem.stamina / this.playerInitialStamina;
        let playerStaminaBarWidth = barWidth * playerStaminaPercentage;

        // Draw player's health bar
        fill('red');
        rect(width / BAR_SCALE, height - height / HP_BAR_SCALE, barWidth, barHeight, BUTTON_ROUNDING); // Draw the background of the health bar
        fill('green');
        rect(width / HP_BAR_BG_SCALE - playerHealthBarWidth, height - height / HP_BAR_SCALE, playerHealthBarWidth, barHeight, BUTTON_ROUNDING); // Draw the actual health bar

        // Draw mob's health bar
        fill('red');
        rect(width - width / HP_BAR_BG_SCALE, height - height / HP_BAR_SCALE, barWidth, barHeight, BUTTON_ROUNDING); // Draw the background of the health bar
        fill('green');
        rect(width - width / BAR_SCALE - mobHealthBarWidth, height - height / HP_BAR_SCALE, mobHealthBarWidth, barHeight, BUTTON_ROUNDING); // Draw the actual health bar

        // // Stamina bar
        fill('red');
        rect(width / BAR_SCALE, height - height / HP_BAR_BG_HEIGHT_SCALE, barWidth, barHeight, BUTTON_ROUNDING); // Draw the background of the health bar
        fill('yellow');
        rect(width / HP_BAR_BG_SCALE - playerStaminaBarWidth, height - height / HP_BAR_BG_HEIGHT_SCALE, playerStaminaBarWidth, barHeight, BUTTON_ROUNDING); // Draw the actual health bar
        pop()
    }

    /**
     * Draw the health and stamina numbers.
     */
    drawHealthStaminaNumbers() {
        push()
        textAlign(RIGHT, CENTER);
        strokeWeight(5);
        fill('white');

        // Player's health
        text(this.myBattleSystem.player.myHitPoints + ' / ' + this.playerMaxHealth, width / HP_PLAYER_NUMBER_WIDTH_NUM_SCALE, height - height / HP_NUMBER_HEIGHT_NUM_SCALE);

        // Mob's health
        text(this.myBattleSystem.mob.myHitPoints + ' / ' + this.mobInitialHealth, width - width / HP_MOB_NUMBER_WIDTH_NUM_SCALE, height - height / HP_NUMBER_HEIGHT_NUM_SCALE);

        // Stamina numbers
        text(this.myBattleSystem.stamina + ' / ' + this.playerInitialStamina, width / STAMINA_MOB_NUMBER_WIDTH_NUM_SCALE, height - height / 2);
        pop()
    }

    /**
     * Create clones.
     */
    createClones() {
        const playerConst = this.myBattleSystem.player.constructor;
        const mobConst = this.myBattleSystem.mob.constructor;
        this.playerClone = new playerConst({
            thePos: createVector((1.5), (8)),
            theSize: createVector(2, 4),
            theImage: this.myBattleSystem.player.myImage,
            theHFrames: 9,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 32),
            theOffset: createVector(0, -1.2),
            theName: "BATTLE_DISPLAY_ONE",
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
            thePos: createVector((12.5), (8)),
            theSize: createVector(2, 4),
            theImage: this.myBattleSystem.mob.myImage,
            theHFrames: 9,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 32),
            theOffset: createVector(0, -1.2),
            theName: "BATTLE_DISPLAY_TWO",
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
    }



}