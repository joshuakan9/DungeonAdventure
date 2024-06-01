class DefeatDisplay {
    constructor() {
        this.isRunning = false;
        this.gremlinDisplay = EntityFactory.createEntity("gremlin", createVector(5.5,9.5));
        this.ogreDisplay = EntityFactory.createEntity("ogre", createVector(7.5,9.5));
        this.skeletonDisplay = EntityFactory.createEntity("skeleton", createVector(9.5,9.5));

    }

    draw(){
        push()
        fill('black')
        rect(0, 0, width, height)
        fill("red")
        textAlign(CENTER, CENTER);
        textSize(width * .05);
        text("You Have Died...", width/2 - width/4, height/2 - height/8, width/2, height/4)
        textSize(width * .025);
        text("Click Screen to Main Menu", width/2 - width/4, height/2 + height/20, width/2, height/4)
        this.gremlinDisplay.draw();
        this.ogreDisplay.draw();
        this.skeletonDisplay.draw();
        pop()
    }

    characterRendering(time) {
        this.gremlinDisplay.step(time);
        this.ogreDisplay.step(time);
        this.skeletonDisplay.step(time);
    }


    mouseClicked() {
        if (
            mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height
        ) { 
            this.isRunning = false;
            return
        }
    }
}
