/**
 * The time it takes for the handler to finish.
 * @constant
 */
const HANDLER_TIME = 100;

/**
 * The transparency of the transition.
 * @constant
 */
const TRANSITION_TRANSPARENCY = 255;

/**
 * The rate of the transition.
 * @constant
 */
const RATE_OF_TRANSITION = 20;

/**
 * Class representing a TransitionEffect.
 */
class TransitionEffect {
    myDrawer;
    myInterval
    /**
     * Clear the TransitionEffect.
     * This stops the transition and removes the drawing function.
     */
    clear() {
        // clears setmyInterval
        clearInterval(this.myInterval);
        // sketch line 235 (might change) if statement for transition is done
        this.myDrawer = null;
    }

    /**
     * Start a transition.
     * This creates a new transition that gradually decreases in transparency.
     */
    transition() {
        let alpha = 255;
        let rate = RATE_OF_TRANSITION; // how fast the rendering is (based off of background color number line 22)
        this.clear();
        const handler = () => { // anonymous function that is put into the setmyInterval
            if (alpha < 0) { // the break out case
                this.clear();
                return;
            }
            this.myDrawer = () => { // draws function draws effect
                fill(0, 0, 0, alpha);
                rect(0, 0, width, height);
            }
            alpha -= rate;
            rate += rate;
        }
        handler();
        this.myInterval = setInterval(handler, HANDLER_TIME); // handler function and the time it takes for handler to be finished
    }

    /**
     * Check if the TransitionEffect has a drawing function and run it if so.
     */
    draw() {
        if (this.myDrawer)
            this.myDrawer();
    }
}