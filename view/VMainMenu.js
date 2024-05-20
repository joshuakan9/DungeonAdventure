class VMainMenu {
    static myIsPaused = false;
    static mouseClicked() {

    }
    static keyPressed() {

    }
    static draw() {
        let textHeight = width /30
        push()
        background(0)
        textSize(width / 30)
        textAlign(RIGHT)
        translate(width * 0.95, height * 0.6)
        // rect(-textWidth("New Game"), -textHeight ,textWidth("New Game"), textHeight)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("New Game") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 - textHeight &&
            mouseY <= height * 0.6 
        ) {
            fill(239,255,255)
        }
        text("New Game", 0, 0)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Load Game") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 1 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 1 * height / 15
        ) {
            fill(239,255,255)
        }
        text("Load Game", 0, height / 15)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Options") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 2 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 2 * height / 15
        ) {
            fill(239,255,255)
        }
        text("Options", 0, 2 * height / 15)


        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("About") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 3 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 3 * height / 15 
        ) {
            fill(239,255,255)
        }
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
