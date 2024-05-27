/**
 * GameLoop class is used to manage the game loop in a game.
 * It provides methods to set the tick and render functions, start and stop the game loop.
 */
class GameLoop {
  /**
   * Constructs a new instance of the GameLoop class.
   */
  constructor() {
    this.myLastFrameTime = 0;
    this.myAccumulatedTime = 0;
    this.myTimeStep = 1000 / 100; // 10 ms every tick

    this.myUpdate = null;
    this.myRender = null;

    this.myFrameId = null;
    this.isRunning = false;
  }

  /**
   * Sets the function to be called on each tick of the game loop.
   * @param {Function} theFunction - The function to be called on each tick.
   */
  setTickFunction(theFunction) {
    this.myUpdate = theFunction
    this.setup()
  }

  /**
   * Sets the function to be called to render the game.
   * @param {Function} theFunction - The function to be called to render the game.
   */
  setRenderFunction(theFunction) {
    this.myRender = theFunction
    this.setup()
  }

  /**
   * Sets up the main game loop.
   */
  setup() {
    this.mainLoop = (timestamp) => {
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
  }

  /**
   * Starts the game loop.
   */
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.myFrameId = requestAnimationFrame(this.mainLoop);
    }
  }

  /**
   * Stops the game loop.
   */
  stop() {
    if (this.myFrameId) {
      cancelAnimationFrame(this.myFrameId);
    }
    this.isRunning = false;
  }
}