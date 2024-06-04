class Sound {

    static setup() {
        this.mySounds = {
            "S-button-clicked": loadSound('assets/sounds/ui/button-clicked.ogg'),
            "S-button-hover": loadSound('assets/sounds/ui/button-hover.ogg'),
            "S-textbox-next": loadSound('assets/sounds/ui/textbox-next.ogg'),
            "S-textbox-typing": loadSound('assets/sounds/ui/textbox-typing.ogg'),
            "S-music-menu": loadSound('assets/sounds/music/menu.wav')

        }
    }


    static play(theSound) {
        this.mySounds[theSound].play()
    }

    static loop(theSound) {
        this.mySounds[theSound].loop()

    }

    static stop(theSound) {
        this.mySounds[theSound].stop()

    }
}