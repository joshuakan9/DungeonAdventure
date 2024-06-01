/**
 * VMainMenu class is responsible for handling the main menu of the game.
 * It includes methods for handling mouse clicks, key presses, and drawing the menu.
 * It also manages the current screen of the game.
 */
class VMainMenu {
    static myCurrentScreen = 'main';

    /**
     * Handles mouse click events.
     * Depending on the current screen and the position of the mouse click, it changes the current screen or triggers game actions.
     */
    static mouseClicked() {
        push()
        textSize(width / 30)
        let textHeight = width / 30

        if (this.myCurrentScreen == 'main') {
            if (
                mouseX >= width * 0.95 - textWidth("New Game") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 - textHeight &&
                mouseY <= height * 0.6
                
            ) {
                
                this.myCurrentScreen = 'character'
                return
            }

            if (
                mouseX >= width * 0.95 - textWidth("Load Game") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 + 1 * height / 15 - textHeight &&
                mouseY <= height * 0.6 + 1 * height / 15
            ) {
                this.myCurrentScreen = 'load'
            }
        } else if (this.myCurrentScreen == 'load') {
            if (
                mouseX >= width * 0.15 &&
                mouseX <= width * 0.15 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                loadGame(0)
                this.myCurrentScreen = 'none'
                console.log('save 1')
            }

            if (
                mouseX >= width * 0.4 &&
                mouseX <= width * 0.4 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                loadGame(1)
                this.myCurrentScreen = 'none'
                console.log('save 2')
            }

            if (
                mouseX >= width * 0.65 &&
                mouseX <= width * 0.65 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                loadGame(2)
                this.myCurrentScreen = 'none'
                console.log('save 3')
            }
        } else if (this.myCurrentScreen == 'character') {

            if (
                mouseX >= width * 0.95 - textWidth("Assassin") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 - textHeight &&
                mouseY <= height * 0.6
            ) {
                newGame()
                window.dispatchEvent(new CustomEvent('e-player-set-character', {detail: CharacterFactory.createCharacter('assassin')}))
                this.myCurrentScreen = 'none'
    
            }
    
            if (
                mouseX >= width * 0.95 - textWidth("Warrior") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 + 1 * height / 15 - textHeight &&
                mouseY <= height * 0.6 + 1 * height / 15
            ) {
                newGame()
                window.dispatchEvent(new CustomEvent('e-player-set-character', {detail: CharacterFactory.createCharacter('warrior')}))
                this.myCurrentScreen = 'none'
            }
    
            if (
                mouseX >= width * 0.95 - textWidth("Priest") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 + 2 * height / 15 - textHeight &&
                mouseY <= height * 0.6 + 2 * height / 15
            ) {
                newGame()
                window.dispatchEvent(new CustomEvent('e-player-set-character', {detail: CharacterFactory.createCharacter('priest')}))
                this.myCurrentScreen = 'none'
            }

            if (
                mouseX >= width * 0.95 - textWidth("Dino") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 + 3 * height / 15 - textHeight &&
                mouseY <= height * 0.6 + 3 * height / 15 
            ) {

                newGame()
                window.dispatchEvent(new CustomEvent('e-player-set-character', {detail: CharacterFactory.createCharacter('dino')}))
                this.myCurrentScreen = 'none'
            }
        }

        if (this.myCurrentScreen == 'character' || this.myCurrentScreen == 'load') {
            if (
                mouseX >= width * 0.95 - textWidth("Return to Main Menu") &&
                mouseX <= width * 0.95 &&
                mouseY >= height * 0.6 + 4 * height / 15 - textHeight &&
                mouseY <= height * 0.6 + 4 * height / 15 
            ) {
                this.myCurrentScreen = 'main'
            }
        }
        pop()
    }

    /**
     * Handles key press events.
     * Currently, this method is empty and does not perform any actions.
     */
    static keyPressed() {

    }

    /**
     * Updates the game state.
     * If a character is selected, it updates the character's state.
     * @param {number} theTime - The current time or tick of the game.
     */
    static step(theTime) {

        if (this.myCurrentCharacter) {
            this.myCurrentCharacter.step(theTime)
        }
        if (this.myCharacterSave0) {
            this.myCharacterSave0.step(theTime)
        }
        if (this.myCharacterSave1) {
            this.myCharacterSave1.step(theTime)
        }
        if (this.myCharacterSave2) {
            this.myCharacterSave2.step(theTime)
        }

    }

    /**
     * Draws the character selection screen.
     * It displays the available characters and highlights the currently selected character.
     */
    static drawCharacterSelection() {
        if (!this.myCurrentCharacter) {
            this.myCurrentCharacter = CharacterFactory.createCharacter('assassin')

        }


        let textHeight = width /30
        push()

        for (let a = 5.5; a < 10; a++) {
            for (let b = 5.5; b < 10; b++) {
                image(random(this.myGroundImages), getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)

         
            }
        }

        this.myCurrentCharacter.setPos(createVector(7.5,7.5))
        this.myCurrentCharacter.draw()
        
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
            if (!(this.myCurrentCharacter instanceof Assassin)) {
                this.myCurrentCharacter = CharacterFactory.createCharacter('assassin')
            }
            fill(239,255,255)
        }
        text("Assassin", 0, 0)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Warrior") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 1 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 1 * height / 15
        ) {
            if (!(this.myCurrentCharacter instanceof Warrior)) {
                this.myCurrentCharacter = CharacterFactory.createCharacter('warrior')
            }


            fill(239,255,255)
        }
        text("Warrior", 0, height / 15)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Priest") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 2 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 2 * height / 15
        ) {
            if (!(this.myCurrentCharacter instanceof Priest)) {
                this.myCurrentCharacter = CharacterFactory.createCharacter('priest')
            }
            fill(239,255,255)
        }
        text("Priest", 0, 2 * height / 15)


        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Dino") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 3 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 3 * height / 15 
        ) {
            if (!(this.myCurrentCharacter instanceof Dino)) {
                this.myCurrentCharacter = CharacterFactory.createCharacter('dino')
            }
            fill(239,255,255)
        }
        text("Dino", 0, 3 * height / 15)

        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Return to Main Menu") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 4 * height / 15 - textHeight &&
            mouseY <= height * 0.6 + 4 * height / 15 
        ) {

            fill(239,255,255)
        }
        text("Return to Main Menu", 0, 4 * height / 15)

        pop()
    }

    /**
     * Draws the main menu screen.
     * It displays the available options: New Game, Load Game, Options, and About.
     */
    static drawMainMenu() {
        let textHeight = width /30
        push()

     


        for (let a = 5.5; a < 10; a++) {
            for (let b = 5.5; b < 10; b++) {
                image(random(this.myGroundImages), getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)

         
            }
        }
        image(TILEMAP_EXIT, getCellToPos(7.5), getCellToPos(7.5), CELLSIZE, CELLSIZE)


        textAlign(CENTER)
        // rect(width * 0.95 - textWidth("New Game"), height * 0.6 - textHeight, textWidth("New Game"), width / 30)
        fill(177,188,184)
        textSize(width / 20)
        text("Dungeon Adventure", width / 2, height * 0.2)
        textAlign(RIGHT)
        translate(width * 0.95, height * 0.6)

        

        textSize(width / 30)
        // rect(-textWidth("New Game"), -textHeight ,textWidth("New Game"), textHeight)

        
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

    /**
     * Draws the load game screen.
     * It displays the available saved games.
     */
    static drawLoadScreen() {
        push()

        for (let a = 5.5; a < 10; a++) {
            for (let b = 1.5; b < 14; b++) {
                image(random(this.myGroundImages), getCellToPos(b), getCellToPos(a), CELLSIZE, CELLSIZE)

         
            }
        }
        textFont(FONT["REGULAR"])
        textSize(width / 30)
        noStroke()
        fill(0, 0, 0, 100)
        if (
            mouseX >= width * 0.15 &&
            mouseX <= width * 0.15 + width / 5 &&
            mouseY >= height / 2 - width / 10 &&
            mouseY <= height / 2 - width / 10 + width / 5
        ) {
            fill(0, 0, 0, 125)   
        }
        rect(width * 0.15, height / 2 - width / 10, width / 5, width / 5, 5 * M)

        fill(0, 0, 0, 100)
        if (
            mouseX >= width * 0.4 &&
            mouseX <= width * 0.4 + width / 5 &&
            mouseY >= height / 2 - width / 10 &&
            mouseY <= height / 2 - width / 10 + width / 5
        ) {
            fill(0, 0, 0, 125)   
        }
        rect(width * 0.4, height / 2 - width / 10, width / 5, width / 5, 5 * M)

        fill(0, 0, 0, 100)
        if (
            mouseX >= width * 0.65 &&
            mouseX <= width * 0.65 + width / 5 &&
            mouseY >= height / 2 - width / 10 &&
            mouseY <= height / 2 - width / 10 + width / 5
        ) {
            fill(0, 0, 0, 125)   
        }
        rect(width * 0.65, height / 2 - width / 10, width / 5, width / 5, 5 * M)

        let save = JSON.parse(window.localStorage.getItem("save"))
        fill(177,188,184)
        if (save[0] && save[0]["data"]) {
            let date = new Date(save[0]["data"]['timestamp'])
            push()
            textSize(width / 40)
            text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), width * 0.185, height * 0.675 - width / 20)
            textSize(width / 45)
            let timeString = date.toLocaleTimeString('en-US')
            timeString = timeString.charAt(0) != '0' ? timeString = '0' + timeString : timeString
            text(timeString, width * 0.19, height * 0.675 - width / 35)
            pop()
            if ((this.myCharacterSave0 && this.myCharacterSave0.getName().toLowerCase() != save[0]["player"]["name"]) || !this.myCharacterSave0) {
                this.myCharacterSave0 = CharacterFactory.createCharacter(save[0]["player"]["name"])
                this.myCharacterSave0.setPos(createVector(3.5,7.5))
            }
            this.myCharacterSave0.draw()
        }
        if (save[1] && save[1]["data"]) {
            let date = new Date(save[1]["data"]['timestamp'])
            push()
            textSize(width / 40)
            text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), width * 0.435, height * 0.675 - width / 20)
            textSize(width / 45)
            let timeString = date.toLocaleTimeString('en-US')
            timeString = timeString.charAt(0) != '0' ? timeString = '0' + timeString : timeString
            text(timeString, width * 0.44, height * 0.675 - width / 35)
            pop()
            if ((this.myCharacterSave1 && this.myCharacterSave1.getName().toLowerCase() != save[1]["player"]["name"]) || !this.myCharacterSave1) {
                this.myCharacterSave1 = CharacterFactory.createCharacter(save[1]["player"]["name"])
                this.myCharacterSave1.setPos(createVector(7.5,7.5))
            }
            this.myCharacterSave1.draw()
        }
        if (save[2] && save[2]["data"]) {
            let date = new Date(save[2]["data"]['timestamp'])
            push()
            textSize(width / 40)
            text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), width * 0.685, height * 0.675 - width / 20)
            textSize(width / 45)
            let timeString = date.toLocaleTimeString('en-US')
            timeString = timeString.charAt(0) != '0' ? timeString = '0' + timeString : timeString
            text(timeString, width * 0.69, height * 0.675 - width / 35)
            pop()
            if ((this.myCharacterSave2 && this.myCharacterSave2.getName().toLowerCase() != save[2]["player"]["name"]) || !this.myCharacterSave2) {
                this.myCharacterSave2 = CharacterFactory.createCharacter(save[2]["player"]["name"])
                this.myCharacterSave2.setPos(createVector(11.5,7.5))
            }
            this.myCharacterSave2.draw()
        }
        text("Save 1", width * 0.195, height * 0.675 - width / 10)
        text("Save 2", width * 0.445, height * 0.675 - width / 10)
        text("Save 3", width * 0.695, height * 0.675 - width / 10)

        textAlign(RIGHT)
        translate(width * 0.95, height * 0.6)
        fill(177,188,184)
        if (
            mouseX >= width * 0.95 - textWidth("Return to Main Menu") &&
            mouseX <= width * 0.95 &&
            mouseY >= height * 0.6 + 4 * height / 15 - width / 30 &&
            mouseY <= height * 0.6 + 4 * height / 15 
        ) {
            fill(239,255,255)
        }
        text("Return to Main Menu", 0, 4 * height / 15)
        pop()
    }

    /**
     * Draws the current screen.
     * Depending on the current screen, it calls the appropriate draw method.
     */
    static draw() {
        if (!this.myGroundImages) {
            this.myGroundImages = [
                TILEMAP.get(1 * 16, 4 * 16, 16, 16),
                TILEMAP.get(2 * 16, 4 * 16, 16, 16),
                TILEMAP.get(3 * 16, 4 * 16, 16, 16),
                TILEMAP.get(1 * 16, 5 * 16, 16, 16),
                TILEMAP.get(2 * 16, 5 * 16, 16, 16),
                TILEMAP.get(3 * 16, 5 * 16, 16, 16),
                TILEMAP.get(1 * 16, 6 * 16, 16, 16),
                TILEMAP.get(2 * 16, 6 * 16, 16, 16)
            ]
        }
        if (this.myCurrentScreen != 'none') {

            background(0)
            image(IMG_NOISE,0,0,width * 2,height * 4)
            if (this.myCurrentScreen == 'character') {
                this.drawCharacterSelection()
            } else if (this.myCurrentScreen == 'load') {
                this.drawLoadScreen()
            } else {
                this.drawMainMenu()
            }
            

            push()
            textAlign(RIGHT)

            translate(width * 0.95, height * 0.6)
            textSize(width / 60)
            fill(177,188,184)
            text("Ver. 5/31/2024", 0, height * 0.375)

            // textSize(width / 20)
            // text("Dungeon Adventure", 0, -height / 5)
            pop()
        }
    }

    /**
     * Returns whether the game is paused.
     * The game is considered paused if the current screen is not 'none'.
     * @returns {boolean} - True if the game is paused, false otherwise.
     */
    static getIsPaused() {
        return this.myCurrentScreen != 'none';
    }

    /**
     * Sets the current screen to the main menu.
     */
    static setMainMenu() {
        this.myCurrentScreen = 'main'
    }

}
