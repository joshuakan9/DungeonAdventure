class Sound {

    static setup() {
        this.mySounds = {
            "S-button-clicked": loadSound('assets/sounds/ui/button-clicked.ogg'),
            "S-button-hover": loadSound('assets/sounds/ui/button-hover.ogg')
        }
    }


    static play(theSound) {
        this.mySounds[theSound].play()
    }
}