const TEXT_SPEED = 10;
const TEXT_SIZE = .4;
const TEXT_Y = 12

class TextBox {
    
// set default
    constructor() {
        this.timeCurrent = 0
        this.timeTarget = TEXT_SPEED;
        this.currentTextEnd = 0;
        this.children = []
        this.render = () => {
            if (this.children.length > 0) {
                fill('white')
                rect(0, this.children[0].y - TEXT_SIZE * height/cellNumber , this.children[0].width, this.children[0].y)
                fill('black')
                textSize(TEXT_SIZE * height/cellNumber)


                text(this.children[0].text.substring(0, this.currentTextEnd), this.children[0].x, this.children[0].y, this.children[0].width)
            }
        }
        this.tick = (delta) => {
            if (this.timeCurrent >= this.timeTarget && this.children[0] && this.currentTextEnd < this.children[0].text.length) {
                this.currentTextEnd += 1;
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
        return children.length != 0;
    }

    nextText() {
        if (this.inTextDialogue && this.children[0] && this.children[0].text.length == this.currentTextEnd) {

            if (this.children.length > 1) {
                this.inTextDialogue = true;
                this.children.shift();
            } else {
                this.children.shift();
                
                console.log("no more dialogue");
                this.inTextDialogue = false;
 
                
            }
            window.dispatchEvent(new Event("e-player-unfreeze"))
            if (this.currentTextEnd >= 0) {
                this.currentTextEnd = 0;
            }
        }


    }



    add(obj = {text, x, y, width}) {
        if (obj.width == null && obj.x == null && obj.y == null) {
            //Spacing for the Text (NOT TEXT_BOX)
            obj.x = TEXT_SIZE * height/cellNumber;
            obj.y = height - (height - (height/cellNumber) * TEXT_Y) + TEXT_SIZE * height/cellNumber;
            obj.width = width;
        }
        console.log(obj)
        this.children.push(obj)
        this.inTextDialogue = true
        window.dispatchEvent(new Event("e-player-freeze"))
    }
}