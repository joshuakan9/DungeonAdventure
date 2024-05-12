class TransitionEffect {

    constructor() {
        this.loopBackground = new GameLoop();
    }

    transition() {
        this.timeCurrent = 0;
        this.timeTarget = 1;
        this.backgroundColor = 255;
        this.renderBackground = () => {
            if(this.backgroundColor < 1) {
                this.loopBackground.stop();
                return
            }
            fill(this.backgroundColor, this.backgroundColor, this.backgroundColor);
            rect(0, 0, width, height);
        }
        this.tickBackground = (delta) => {
            if (this.timeCurrent >= this.timeTarget && this.backgroundColor > 0) {
                this.backgroundColor -= 2;
                this.timeCurrent = 0;
            } else {
                this.timeCurrent += delta;
            }
        }
        this.loopBackground.setTickFunction(this.tickBackground);
        this.loopBackground.setRenderFunction(this.renderBackground);
        this.loopBackground.start();
    }
    
        
}