class GameLoop {
  constructor(theTick, theRender) {

    this.myLastFrameTime = 0;
    this.myAccumulatedTime = 0;
    this.myTimeStep = 1000 / 100; // 10 ms every tick

    this.myUpdate = theTick;
    this.myRender = theRender;

    this.myFrameId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp) => {
    if (!this.isRunning) return;

    let deltaTime = timestamp - this.myLastFrameTime;
    this.myLastFrameTime = timestamp;

    // Accumulate all the time since the last frame.
    this.myAccumulatedTime += deltaTime;

    // Fixed time step updates.
    // If there's enough accumulated time to run one or more fixed updates, run them.
    while (this.myAccumulatedTime >= this.myTimeStep) {
      this.myUpdate(this.myTimeStep); // Here, we pass the fixed time step size.
      this.myAccumulatedTime -= this.myTimeStep;
    }

    // Render
    this.myRender();

    this.myFrameId = requestAnimationFrame(this.mainLoop);
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.myFrameId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.myFrameId) {
      cancelAnimationFrame(this.myFrameId);
    }
    this.isRunning = false;
  }

}









