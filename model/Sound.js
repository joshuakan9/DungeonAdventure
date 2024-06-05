/**
 * The Sound class is responsible for managing and playing sounds in the application.
 * It provides methods to play, loop, and stop sounds.
 */
class Sound {
    static mySounds;

    /**
     * The setup method is used to initialize the sounds used in the application.
     * It loads the sounds from the assets directory and stores them in the mySounds object.
     */
    static setup() {
        this.mySounds = {
            "S-button-clicked": loadSound('assets/sounds/ui/button-clicked.ogg'),
            "S-button-hover": loadSound('assets/sounds/ui/button-hover.ogg'),
            "S-textbox-next": loadSound('assets/sounds/ui/textbox-next.ogg'),
            "S-textbox-typing": loadSound('assets/sounds/ui/textbox-typing.ogg'),
            "S-music-menu": loadSound('assets/sounds/music/menu.wav')

        }
    }

    /**
     * The play method is used to play a specific sound.
     * @param {string} theSound - The key of the sound to be played.
     */
    static play(theSound) {
        this.mySounds[theSound].play()
    }

    /**
     * The loop method is used to loop a specific sound.
     * @param {string} theSound - The key of the sound to be looped.
     */
    static loop(theSound) {
        this.mySounds[theSound].loop()

    }

    /**
     * The stop method is used to stop a specific sound.
     * @param {string} theSound - The key of the sound to be stopped.
     */
    static stop(theSound) {
        this.mySounds[theSound].stop()

    }
}