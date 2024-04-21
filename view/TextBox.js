class TextBox {

    constructor() {
        this.timeCurrent = 0
        this.timeTarget = 400;
        this.currentTextEnd = 0;
        this.children = []
        this.render = () => {
            if (this.children[0]) {
                text(this.children[0].text.substring(0, this.currentTextEnd), this.children[0].x, this.children[0].y, this.children[0].width)
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

    add(obj = {text, x, y, width}) {
        this.children.push(obj)
    }
}