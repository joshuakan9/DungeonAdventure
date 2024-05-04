class TextBox {

    constructor() {
        this.timeCurrent = 0
        this.timeTarget = 10;
        this.currentTextEnd = 0;
        this.children = []
        this.backgroundColor = { x: 255, y: 0, z: 0 };
        this.render = () => {
            if (this.children.length > 0) {
                fill('white')
                rect(0, window.height - 150, window.width, 150)
                fill(0, 0, 0)
                textSize(20)


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

    add(obj = { text, x, y, width }) {
        this.children.push(obj)
        this.inTextDialogue = true
        window.dispatchEvent(new Event("e-player-freeze"))
    }
}