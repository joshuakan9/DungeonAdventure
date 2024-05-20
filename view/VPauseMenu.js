class VPauseMenu {
    static myIsPaused = false;
    static mouseClicked() {
        let menuWidth = width * 0.6
        let menuHeight = width * 0.4
        if (
            mouseX >= width / 2 - menuWidth / 2 &&
            mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
            mouseY >= height / 2 - menuHeight / 2 &&
            mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.25 &&
            this.getIsPaused()
        ) {
            this.setIsPaused()
        }
    }
    static keyPressed() {
        if (keyCode === 27 || keyCode === 80) { // escape key or p
            this.myIsPaused = !this.myIsPaused
        }
    }
    static draw() {
        if (this.getIsPaused()) {
            let menuWidth = width * 0.6
            let menuHeight = width * 0.4
            push()
            textFont(FONT["REGULAR"])
            noStroke()
            translate(width / 2 - menuWidth / 2, height / 2 - menuHeight / 2)
            textSize(menuHeight * 0.1)
            fill(0, 0, 0, 100)
            rect(0, 0, menuWidth, menuHeight, 5 * M)
    
            // RESUME
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.25
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0,0 , menuWidth, menuHeight * 0.25, 5 * M)
    
            // OPTIONS
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.25 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.5
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.25, menuWidth, menuHeight * 0.25, 5 * M)
    
            // LOAD
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.5 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.75
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.50, menuWidth, menuHeight * 0.25, 5 * M)
    
            // SAVE
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.75 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.0
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.75, menuWidth, menuHeight * 0.25, 5 * M)
    
            fill(177,188,184)
            textAlign(CENTER,CENTER);
    
            text("Resume", menuWidth / 2, menuHeight * 0.125)
            text("Options", menuWidth / 2, menuHeight * 0.375)
            text("Load", menuWidth / 2, menuHeight * 0.625)
            text("Save", menuWidth / 2, menuHeight * 0.875)
            pop()
          }
    }

    static getIsPaused() {
        return this.myIsPaused;
    }
    static setIsPaused() {
        this.myIsPaused = !this.myIsPaused;
    }
}