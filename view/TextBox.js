//These coordinates, parameters size, and text size are based on canvas size.
const TEXT_BOX_X = 1;
const TEXT_BOX_Y = .2;
const TEXT_BOX_SIZE_X = 0;
const TEXT_BOX_SIZE_Y = .2;

const TEXT_SIZE = .02;

const TEXT_SPEED = 10;

class TextBox {
    
// set default
    constructor() {
        this.timeCurrent = 0
        this.timeTarget = TEXT_SPEED;
        this.currentTextEnd = 0;
        this.children = []
        this.render = () => {
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
        this.tick = (delta) => {
            if (this.timeCurrent >= this.timeTarget && this.children[0] && this.currentTextEnd < this.children[0].text.length) {
                if (this.children.length % 2 !== 0) {
                    this.children[0].text = this.children[0].text + " ";
                }
                this.currentTextEnd += 2;
                this.timeCurrent = 0;
            } else {
                this.timeCurrent += delta
            }


        }
        this.loop = new GameLoop()
        this.loop.setTickFunction(this.tick)
        this.loop.setRenderFunction(this.render)
    }

    inTextDialogue() {
        return this.children.length != 0;
    }

    nextText() {
        if (this.inTextDialogue && this.children[0] && this.children[0].text.length == this.currentTextEnd) {

            if (this.children.length > 1) {
                this.inTextDialogue = true;
                this.children.shift();
            } else {
                this.children.shift();
                this.inTextDialogue = false;
            }
            window.dispatchEvent(new Event("e-player-unfreeze"))
            if (this.currentTextEnd >= 0) {
                this.currentTextEnd = 0;
            }
        }


    }



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