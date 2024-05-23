const HANDLER_TIME = 100;
const TRANSITION_TRANSPARENCY = 255;
const RATE_OF_TRANSITION = 20;
class TransitionEffect {

    clear() {
        // clears setinterval
        clearInterval(this.interval);
        // sketch line 235 (might change) if statement for transition is done
        this.drawer = null;
    }

    transition() {
        let alpha = 255;
        let rate = RATE_OF_TRANSITION; // how fast the rendering is (based off of background color number line 22)
        this.clear();
        const handler = () => { // anonymous function that is put into the setInterval
            if (alpha < 0) { // the break out case
                this.clear();
                return;
            }
            this.drawer = () => { // draws function draws effect
                fill(0, 0, 0, alpha);
                rect(0, 0, width, height);
            }
            alpha -= rate;
            rate += rate;
        }
        handler();
        this.interval = setInterval(handler, HANDLER_TIME); // handler function and the time it takes for handler to be finished
    }

    drawerStatus() {
        return this.drawer != null
    }
}