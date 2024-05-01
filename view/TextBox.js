class TextBox {

    constructor() {
        this.timeCurrent = 0
        this.timeTarget = 400;
        this.currentTextEnd = 0;
        this.children = []
        this.render = () => {
            if (this.children.length > 0){
                let current = this.children.length-1;
                text(this.children[current].text.substring(0, this.currentTextEnd), this.children[current].x, this.children[current].y, this.children[current].width)
            }
        }
        this.tick = (delta) => {
            if (this.timeCurrent >= this.timeTarget) {
                this.currentTextEnd++;
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
    }

    add(obj = {text, x, y, width}) {
        this.children.push(obj)
    }
}