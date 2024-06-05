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

/**
 * The DefeatDisplay class is responsible for managing and displaying the defeat screen.
 * It provides methods to draw the screen, render characters, and handle mouse clicks.
 */
class DefeatDisplay {
    myIsRunning;
    myGremlinDisplay;
    myOgreDisplay;
    mySkeletonDisplay;

    /**
     * The constructor initializes the defeat screen with entities.
     */
    constructor() {
        this.myIsRunning = false;
        this.myGremlinDisplay = EntityFactory.createEntity("gremlin", createVector(DD_GREMLIN_VECTOR_X, DD_VECTOR_Y));
        this.myOgreDisplay = EntityFactory.createEntity("ogre", createVector(DD_OGRE_VECTOR_X, DD_VECTOR_Y));
        this.mySkeletonDisplay = EntityFactory.createEntity("skeleton", createVector(DD_SKELETON_VECTOR_X, DD_VECTOR_Y));

    }

    /**
     * The draw method is used to draw the defeat screen.
     * It displays a black background, text messages, and entities.
     */
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
        this.myGremlinDisplay.draw();
        this.myOgreDisplay.draw();
        this.mySkeletonDisplay.draw();
        pop()
    }

    /**
     * The characterRendering method is used to update the entities' states.
     * @param {number} theTime - The current time or tick.
     */
    characterRendering(theTime) {
        this.myGremlinDisplay.step(theTime);
        this.myOgreDisplay.step(theTime);
        this.mySkeletonDisplay.step(theTime);
    }

    /**
     * The mouseClicked method is used to handle mouse click events.
     * It checks if the mouse click is within the screen bounds and stops the defeat screen if it is.
     */
    mouseClicked() {
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            this.myIsRunning = false;
            return
        }
    }
}
