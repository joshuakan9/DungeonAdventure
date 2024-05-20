class VMainMenu {
    static myCurrentScreen = 'main';
    static mouseClicked() {
        push()
        textSize(width / 30)
        let textHeight = width / 30
        if (
            mouseX >= width * 0.95 - textWidth("New Game") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 - textHeight &&
            mouseY <= height * 0.6  &&
            this.myCurrentScreen == 'main'
        ) {
            console.log('newgame')
            this.myCurrentScreen = 'character'
            return
        }

        if (
            mouseX >= width * 0.95 - textWidth("Assassin") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 - textHeight &&
            mouseY <= height * 0.6  &&
            this.myCurrentScreen == 'character'
        ) {
            this.myCurrentScreen = 'none'
        }
        pop()
    }
    static keyPressed() {

    }

    static drawCharacterSelection() {
        let textHeight = width /30
        push()
        background(0)
        textSize(width / 30)
        textAlign(RIGHT)
        // rect(width * 0.95 - textWidth("New Game"), height * 0.6 - textHeight, textWidth("New Game"), width / 30)
        translate(width * 0.95, height * 0.6)
        // rect(-textWidth("New Game"), -textHeight ,textWidth("New Game"), textHeight)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Assassin") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 - textHeight &&
            mouseY <= height * 0.6 
        ) {
            fill(239,255,255)
        }
        text("Assassin", 0, 0)

        // fill(177,188,184)
        // if (
        //     mouseX >= width * 0.95 - textWidth("Return to Main Menu") &&
        //     mouseX <= width * 0.95 &&
        //     mouseY >= height * 0.6 + 1 * height / 15 - textHeight &&
        //     mouseY <= height * 0.6 + 1 * height / 15
        // ) {
        //     fill(239,255,255)
        // }
        // text("Return to Main Menu", 0, height / 15)

        // fill(177,188,184)
        // if (
        //     mouseX >= width * 0.95 - textWidth("Options") &&
        //     mouseX <= width * 0.95 &&
        //     mouseY >= height * 0.6 + 2 * height / 15 - textHeight &&
        //     mouseY <= height * 0.6 + 2 * height / 15
        // ) {
        //     fill(239,255,255)
        // }
        // text("Options", 0, 2 * height / 15)


        // fill(177,188,184)
        // if (
        //     mouseX >= width * 0.95 - textWidth("About") &&
        //     mouseX <= width * 0.95 &&
        //     mouseY >= height * 0.6 + 3 * height / 15 - textHeight &&
        //     mouseY <= height * 0.6 + 3 * height / 15 
        // ) {
        //     fill(239,255,255)
        // }
        // text("About", 0, 3 * height / 15)



        pop()
    }

    static drawMainMenu() {
        let textHeight = width /30
        push()
        background(0)
        textSize(width / 30)
        textAlign(RIGHT)
        // rect(width * 0.95 - textWidth("New Game"), height * 0.6 - textHeight, textWidth("New Game"), width / 30)
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



        pop()
    }
    static draw() {
        if (this.myCurrentScreen != 'none') {


            if (this.myCurrentScreen == 'character') {
                this.drawCharacterSelection()
            } else {
                this.drawMainMenu()
            }

            push()
            textAlign(RIGHT)
            translate(width * 0.95, height * 0.6)
            textSize(width / 60)
            fill(177,188,184)
            text("Ver. 5/19/2024", 0, height * 0.375)
            pop()
        }
    }

    static getIsPaused() {
        return this.myIsPaused;
    }
    static setMainMenu() {
        this.myCurrentScreen = 'main'
    }

}
