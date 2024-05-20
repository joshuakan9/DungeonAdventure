class VMainMenu {
    static myIsPaused = false;
    static mouseClicked() {

    }
    static keyPressed() {

    }
    static draw() {
        push()
        background(0)
        textSize(width / 30)
        textAlign(RIGHT)
        translate(width * 0.95, height * 0.6)
        fill(177,188,184)
        text("New Game", 0, 0)
        text("Load Game", 0, height / 15)
        text("Options", 0, 2 * height / 15)
        text("About", 0, 3 * height / 15)


        textSize(width / 60)
        fill(177,188,184)
        text("Ver. 5/19/2024", 0, height * 0.375)
        pop()
    }

    static getIsPaused() {
        return this.myIsPaused;
    }
    static setIsPaused() {
        this.myIsPaused = !this.myIsPaused;
    }
}