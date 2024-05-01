class TextBox {

    constructor() {
        this.timeCurrent = 0
        this.timeTarget = 400;
        this.currentTextEnd = 0;
        this.children = []
        this.backgroundColor = {x:255,y:0,z:0};
        this.render = () => {
            let current = this.children.length-1;
            if (this.children.length > 0){
                fill('white')
                rect(0, window.height-150,window.width,150)
                fill(0,0,0)
                textSize(20)
                text(this.children[current].text.substring(0, this.currentTextEnd), this.children[current].x, this.children[current].y, this.children[current].width)
            }
        }
        this.tick = (delta) => {
            if (this.timeCurrent >= this.timeTarget) {
                this.currentTextEnd+=5;
                this.timeCurrent = 0;
            } else {
                this.timeCurrent += delta
            }

        }
        this.loop = new GameLoop(this.tick, this.render)
    }

    inTextDialogue() {
        return children.length != 0;
    }

    nextText() {
        if(this.inTextDialogue) {
            if (this.children.length > 0) {
            this.inTextDialogue = true;
            this.children.pop();
            } else {
                console.log("no more dialogue");
                this.inTextDialogue = false;
            }
        }

        if(this.currentTextEnd >= 0) {
            this.currentTextEnd = 0;
        }
    }

    add(obj = {text, x, y, width}) {
        this.children.push(obj)
    }
}