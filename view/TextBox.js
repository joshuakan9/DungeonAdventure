/**
 * The X position of the text box.
 * @constant
 */
const TEXT_BOX_X = 1;

/**
 * The Y position of the text box.
 * @constant
 */
const TEXT_BOX_Y = .2;

/**
 * The X size of the text box.
 * @constant
 */
const TEXT_BOX_SIZE_X = 0;

/**
 * The Y size of the text box.
 * @constant
 */
const TEXT_BOX_SIZE_Y = .2;

/**
 * The size of the text.
 * @constant
 */
const TEXT_SIZE = .02;

/**
 * The speed of the text.
 * @constant
 */
const TEXT_SPEED = 10;

/**
 * Class representing a TextBox.
 */
class TextBox {
    myTimeCurrent;
    myTimeTarget;
    myCurrentTextEnd;
    myChildren;
    myLoop;


    /**
     * Create a TextBox and set default values.
     */
    constructor() {
        this.myTimeCurrent = 0
        this.myTimeTarget = TEXT_SPEED;
        this.myCurrentTextEnd = 0;

        this.myChildren = []
        this.render = () => {
            
        }
        this.myLoop = new GameLoop()
        this.myLoop.setTickFunction(this.tick)
        this.myLoop.setRenderFunction(this.render)
    }
    /**
     * Render the TextBox.
     */
    renderTextBox() {
        if (this.myChildren.length > 0) {
            textSize(height * this.myChildren[0].textSize)

            push();
            fill('white')
            noStroke();
            rect(width - width * this.myChildren[0].x,
                height - height * this.myChildren[0].y,
                width - width * this.myChildren[0].width,
                height * this.myChildren[0].height)
            fill('black')

            text(
                this.myChildren[0].text.substring(0, this.myCurrentTextEnd),
                (width - width * this.myChildren[0].x) + width * this.myChildren[0].textSize,
                (height - height * this.myChildren[0].y) + height * this.myChildren[0].textSize,
                width - width * this.myChildren[0].width)
            pop();
        }
    }
    /**
     * Tick the TextBox.
     * @param {number} theDelta - The time since the last tick.
     */
    tickTextBox(theDelta) {

        if (this.myTimeCurrent >= this.myTimeTarget && this.myChildren[0] && this.myCurrentTextEnd < this.myChildren[0].text.length) {
            this.myChildren[0].text = this.myChildren[0].text;
            this.myCurrentTextEnd += 1;

        } else {
            this.myTimeCurrent += theDelta
        }


    }

    /**
     * Check if the TextBox is empty.
     * @returns {boolean} Whether the TextBox is empty.
     */
    isEmpty() {
        return this.myChildren.length === 0;
    }

    /**
     * Move to the next text.
     */
    nextText() {
        // console.log("children amt: " + this.children.length)
        if (this.inTextDialogue && this.myChildren[0] && this.myChildren[0].text.length == this.myCurrentTextEnd) {

            this.myChildren.shift();
            Sound.play("S-textbox-next")
            
            if (this.isEmpty()) {
 
                window.dispatchEvent(new Event("e-no-text"))
            } else {

                window.dispatchEvent(new Event("e-has-text"))
            }
            window.dispatchEvent(new Event("e-player-unfreeze"))
            if (this.myCurrentTextEnd >= 0) {
                this.myCurrentTextEnd = 0;
            }
        }
        // console.log("bool: " + this.isEmpty())
        // console.log("children amt: " + this.children.length)
    }

    /**
     * Add a new text object to the TextBox.
     * @param {Object} theObj - The text object to add.
     */
    add(theObj = {text, x, y, width, height, textSize}) {
        if (theObj.x == null && theObj.y == null && theObj.width == null && theObj.height == null && theObj.textSizing == null) {
            //console.log("This is a default text");
            theObj.x = TEXT_BOX_X;
            theObj.y = TEXT_BOX_Y;
            theObj.width = TEXT_BOX_SIZE_X;
            theObj.height = TEXT_BOX_SIZE_Y;
            theObj.textSize = TEXT_SIZE;
        }
        //console.log(obj)
        this.myChildren.push(theObj)
        this.inTextDialogue = true
        window.dispatchEvent(new Event("e-player-freeze"))
    }
}