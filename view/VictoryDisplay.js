const VD_PRIEST_VECTOR_X = 4.5;

const VD_WARRIOR_VECTOR_X = 6.5;

const VD_ASSASSIN_VECTOR_X = 8.5;

const VD_DINO_VECTOR_X = 10.5;

const VD_VECTOR_Y_ONE = 9.5;

const VD_SCALE_BY_TWO = 2;
const VD_SCALE_BY_FOUR = 4;
const VD_SCALE_BY_EIGHT = 8;
const VD_SCALE_BY_TWENTY = 20;

const VD_MAIN_TEXT_SIZE = .05;
const VD_SMALL_TEXT_SIZE = .025;

class VictoryDisplay {

    myPriestDisplay;
    myWarriorDisplay;
    myAssassinDisplay;
    myDinoDisplay;

    constructor() {
        this.myIsRunning = false;
        this.myPriestDisplay = CharacterFactory.createCharacter("priest");
        this.myWarriorDisplay = CharacterFactory.createCharacter("warrior");
        this.myAssassinDisplay = CharacterFactory.createCharacter("assassin");
        this.myDinoDisplay = CharacterFactory.createCharacter("dino");

        this.myPriestDisplay.setPos(createVector(VD_PRIEST_VECTOR_X, VD_VECTOR_Y_ONE));
        this.myWarriorDisplay.setPos(createVector(VD_WARRIOR_VECTOR_X, VD_VECTOR_Y_ONE));
        this.myAssassinDisplay.setPos(createVector(VD_ASSASSIN_VECTOR_X, VD_VECTOR_Y_ONE));
        this.myDinoDisplay.setPos(createVector(VD_DINO_VECTOR_X, VD_VECTOR_Y_ONE));
    }


    draw(){
        push()
        fill('black')
        rect(0, 0, width, height)
        fill("white")
        textAlign(CENTER, CENTER);
        textSize(width * VD_MAIN_TEXT_SIZE);
        text("You Have Won!", width/VD_SCALE_BY_TWO - width/VD_SCALE_BY_FOUR, height/VD_SCALE_BY_TWO - height/VD_SCALE_BY_EIGHT, width/VD_SCALE_BY_TWO, height/VD_SCALE_BY_FOUR)
        textSize(width * VD_SMALL_TEXT_SIZE);
        text("Click Screen to Main Menu", width/VD_SCALE_BY_TWO - width/VD_SCALE_BY_FOUR, height/VD_SCALE_BY_TWO + height/VD_SCALE_BY_TWENTY, width/VD_SCALE_BY_TWO, height/VD_SCALE_BY_FOUR)
        this.myPriestDisplay.draw();
        this.myWarriorDisplay.draw();
        this.myAssassinDisplay.draw();
        this.myDinoDisplay.draw();
        pop();
    }

    characterRendering(time) {
        this.myPriestDisplay.step(time);
        this.myWarriorDisplay.step(time);
        this.myAssassinDisplay.step(time);
        this.myDinoDisplay.step(time);
    }

    mouseClicked() {
        if (
            mouseX >= 0 &&
            mouseX <= width &&
            mouseY >= 0 &&
            mouseY <= height
            
        ) {
            
            this.myIsRunning = false;
            return
        }
    }
}