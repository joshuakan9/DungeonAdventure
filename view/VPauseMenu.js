class VPauseMenu {
    static myIsPaused = false;
    static tick() {
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
    
    
            // fill('red')
            // rect(0,0 , menuWidth, menuHeight * 0.25)
    
    
            // fill('blue')
            // rect(0, menuHeight * 0.25, menuWidth, menuHeight * 0.25)
    
            // fill('green')
            // rect(0, menuHeight * 0.50, menuWidth, menuHeight * 0.25)
    
            // fill('yellow')
            // rect(0, menuHeight * 0.75, menuWidth, menuHeight * 0.25)
    
            fill(225)
            textAlign(CENTER, CENTER);
    
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
}