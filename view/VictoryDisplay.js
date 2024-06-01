class VictoryDisplay {
    constructor() {
        this.isRunning = false;
        this.priestDisplay = CharacterFactory.createCharacter("priest");
        this.warriorDisplay = CharacterFactory.createCharacter("warrior");
        this.assassinDisplay = CharacterFactory.createCharacter("assassin");
        this.dinoDisplay = CharacterFactory.createCharacter("dino");

        this.priestDisplay.setPos(createVector(4.5,9.5));
        this.warriorDisplay.setPos(createVector(6.5,9.5));
        this.assassinDisplay.setPos(createVector(8.5,9.5));
        this.dinoDisplay.setPos(createVector(10.5,9.5));
    }


    draw(){
        push()
        fill('black')
        rect(0, 0, width, height)
        fill("white")
        textAlign(CENTER, CENTER);
        textSize(width * .05);
        text("You Have Won!", width/2 - width/4, height/2 - height/8, width/2, height/4)
        textSize(width * .025);
        text("Click Screen to Main Menu", width/2 - width/4, height/2 + height/20, width/2, height/4)
        this.priestDisplay.draw();
        this.warriorDisplay.draw();
        this.assassinDisplay.draw();
        this.dinoDisplay.draw();
        pop();
    }

    characterRendering(time) {
        this.priestDisplay.step(time);
        this.warriorDisplay.step(time);
        this.assassinDisplay.step(time);
        this.dinoDisplay.step(time);
    }

    mouseClicked() {
        if (
            mouseX >= 0 &&
            mouseX <= width &&
            mouseY >= 0 &&
            mouseY <= height
            
        ) {
            
            this.isRunning = false;
            return
        }
    }
}