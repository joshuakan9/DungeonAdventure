class Sound {

    static setup() {
        this.mySounds = {
            "S-button-clicked": loadSound('assets/sounds/ui/button-clicked.ogg')
        }
    }


    static play(theSound) {
        this.mySounds[theSound].play()
    }
}