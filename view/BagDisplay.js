class BagDisplay {
    myBag;
    myIsPaused
    constructor(thePlayer) {
        this.myBag = thePlayer.getBag();
        this.myIsPaused = false;
    }

    keyPressed() {
        if (keyCode === 66) { // b
            this.setIsPaused();
        }
    }

    mouseClicked() {
        let menuWidth = width * 0.6
        let menuHeight = height * 0.5
        if (
            mouseX >= width / 2 - menuWidth / 2 &&
            mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
            mouseY >= height / 2 - menuHeight / 2 + menuHeight * 1 &&
            mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.2 &&
            this.myIsPaused
        ) {
            console.log('exit')
            this.setIsPaused()
        }
    }
    draw() {
        if (this.getIsPaused()) {
            let menuWidth = width * 0.6
            let menuHeight = width * 0.5
            push()
            textFont(FONT["REGULAR"])
            noStroke()
            translate(width / 2 - menuWidth / 2, height / 2.3 - menuHeight / 2)
            textSize(width / 30)
            fill(0, 0, 0, 100)
            rect(0, 0, menuWidth, menuHeight * 1.2, 5 * M)

            // HEALTH POTION / BAG IS EMPTY
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.2
            ) {
                fill(0, 0, 0, 100)
            }
            rect(0, 0, menuWidth, menuHeight * 0.2, 5 * M)

            // PILLAR OF ABSTRACTION
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.2 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.4
            ) {
                fill(0, 0, 0, 100)
            }
            rect(0, menuHeight * 0.2, menuWidth, menuHeight * 0.2, 5 * M)

            // PILLAR OF ENCAPSULATION
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.4 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.6
            ) {
                fill(0, 0, 0, 100)
            }
            rect(0, menuHeight * 0.40, menuWidth, menuHeight * 0.2, 5 * M)

            // PILLAR OF INHERITANCE
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.6 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.8
            ) {
                fill(0, 0, 0, 100)
            }
            rect(0, menuHeight * 0.6, menuWidth, menuHeight * 0.2, 5 * M)

            // PILLAR OF POLYMORPHISM
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.8 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.0
            ) {
                fill(0, 0, 0, 100)
            }
            rect(0, menuHeight * 0.8, menuWidth, menuHeight * 0.2, 5 * M)

            // EXIT
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 1 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.2
            ) {
                fill(0, 0, 0, 100)
            }
            rect(0, menuHeight * 1, menuWidth, menuHeight * 0.2, 5 * M)


            fill(177, 188, 184)
            textAlign(CENTER, CENTER);

            if (this.myBag.size === 0) {
                text('Bag is empty', menuWidth / 2, menuHeight * 0.1)
            }
            if (this.myBag.has('Health Potion')) {
                text('Health Potions: ' + this.myBag.get('Health Potion'), menuWidth / 2, menuHeight * 0.1)
            }
            if (this.myBag.has('Pillar of Abstraction')) {
                text('Pillar of Abstraction', menuWidth / 2, menuHeight * 0.3)
            }
            if (this.myBag.has('Pillar of Encapsulation')) {
                text('Pillar of Inheritance', menuWidth / 2, menuHeight * 0.5)
            }
            if (this.myBag.has('Pillar of Inheritance')) {
                text('Pillar of Polymorphism', menuWidth / 2, menuHeight * 0.7)
            }
            if (this.myBag.has('Pillar of Polymorphism')) {
                text('Pillar of Encapsulation', menuWidth / 2, menuHeight * 0.9)
            }
            text("Exit", menuWidth / 2, menuHeight * 1.1)
            pop()
        }
    }

    getIsPaused() {
        return this.myIsPaused;
    }
    setIsPaused() {
        this.myIsPaused = !this.myIsPaused;
    }
}