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

    /**
     * Create a TextBox and set default values.
     */
    constructor() {
        this.timeCurrent = 0
        this.timeTarget = TEXT_SPEED;
        this.currentTextEnd = 0;
        this.myIsLoopSound = false;
        this.children = []
        this.render = () => {
            
        }
        this.loop = new GameLoop()
        this.loop.setTickFunction(this.tick)
        this.loop.setRenderFunction(this.render)
    }
    /**
     * Render the TextBox.
     */
    renderTextBox() {
        if (this.children.length > 0) {
            textSize(height * this.children[0].textSize)

            push();
            fill('white')
            noStroke();
            rect(width - width * this.children[0].x, 
                height - height * this.children[0].y, 
                width - width * this.children[0].width, 
                height * this.children[0].height)
            fill('black')

            text(
                this.children[0].text.substring(0, this.currentTextEnd), 
                (width - width * this.children[0].x) + width * this.children[0].textSize, 
                (height - height * this.children[0].y) + height * this.children[0].textSize,
                width - width * this.children[0].width)
            pop();
        }
    }
    /**
     * Tick the TextBox.
     * @param {number} delta - The time since the last tick.
     */
    tickTextBox(delta) {

        if (this.timeCurrent >= this.timeTarget && this.children[0] && this.currentTextEnd < this.children[0].text.length) {
            this.children[0].text = this.children[0].text;
            this.currentTextEnd += 1;
            if (!this.myIsLoopSound) {
                Sound.loop("S-textbox-typing")
                this.myIsLoopSound = true;
            }
        } else {
            this.timeCurrent += delta
        }


    }

    /**
     * Check if the TextBox is empty.
     * @returns {boolean} Whether the TextBox is empty.
     */
    isEmpty() {
        return this.children.length === 0;
    }

    /**
     * Move to the next text.
     */
    nextText() {
        // console.log("children amt: " + this.children.length)
        if (this.inTextDialogue && this.children[0] && this.children[0].text.length == this.currentTextEnd) {

            this.children.shift();
            Sound.play("S-textbox-next")
            
            if (this.isEmpty()) {
                // this.myIsLoopSound = false;
                // Sound.stop("S-textbox-typing")
                window.dispatchEvent(new Event("e-no-text"))
            } else {

                window.dispatchEvent(new Event("e-has-text"))
            }
            window.dispatchEvent(new Event("e-player-unfreeze"))
            if (this.currentTextEnd >= 0) {
                this.currentTextEnd = 0;
            }
        }
        // console.log("bool: " + this.isEmpty())
        // console.log("children amt: " + this.children.length)
    }

    /**
     * Add a new text object to the TextBox.
     * @param {Object} obj - The text object to add.
     */
    add(obj = {text, x, y, width, height, textSize}) {
        if (obj.x == null && obj.y == null && obj.width == null && obj.height == null && obj.textSizing == null) {
            //console.log("This is a default text");
            obj.x = TEXT_BOX_X;
            obj.y = TEXT_BOX_Y;
            obj.width = TEXT_BOX_SIZE_X;
            obj.height = TEXT_BOX_SIZE_Y;
            obj.textSize = TEXT_SIZE;
        }
        //console.log(obj)
        this.children.push(obj)
        this.inTextDialogue = true
        window.dispatchEvent(new Event("e-player-freeze"))
    }
}