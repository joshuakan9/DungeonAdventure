const DD_GREMLIN_VECTOR_X = 5.5;
const DD_OGRE_VECTOR_X = 7.5;
const DD_SKELETON_VECTOR_X = 9.5;
const DD_VECTOR_Y = 9.5;


const DD_SCALE_BY_TWO = 2;
const DD_SCALE_BY_FOUR = 4;
const DD_SCALE_BY_EIGHT = 8;
const DD_SCALE_BY_TWENTY = 20;

const DD_MAIN_TEXT_SIZE = .05;
const DD_SMALL_TEXT_SIZE = .025;

class DefeatDisplay {
    constructor() {
        this.isRunning = false;
        this.gremlinDisplay = EntityFactory.createEntity("gremlin", createVector(DD_GREMLIN_VECTOR_X, DD_VECTOR_Y));
        this.ogreDisplay = EntityFactory.createEntity("ogre", createVector(DD_OGRE_VECTOR_X, DD_VECTOR_Y));
        this.skeletonDisplay = EntityFactory.createEntity("skeleton", createVector(DD_SKELETON_VECTOR_X, DD_VECTOR_Y));

    }

    draw(){
        push()
        fill('black')
        rect(0, 0, width, height)
        fill("red")
        textAlign(CENTER, CENTER);
        textSize(width * DD_MAIN_TEXT_SIZE);
        text("You Have Died...", width/DD_SCALE_BY_TWO - width/DD_SCALE_BY_FOUR, height/DD_SCALE_BY_TWO - height/DD_SCALE_BY_EIGHT, width/DD_SCALE_BY_TWO, height/4)
        textSize(width * DD_SMALL_TEXT_SIZE);
        text("Click Screen to Main Menu", width/DD_SCALE_BY_TWO - width/DD_SCALE_BY_FOUR, height/DD_SCALE_BY_TWO + height/DD_SCALE_BY_TWENTY, width/DD_SCALE_BY_TWO, height/DD_SCALE_BY_FOUR)
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
