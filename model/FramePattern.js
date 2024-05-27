/**
 * FramePattern class is used to manage animation frames.
 */
class FramePattern {
  /**
   * Constructs a new instance of FramePattern.
   * @param {Object} theAnimationConfig - The configuration for the animation.
   */
  constructor(theAnimationConfig) {
    this.myCurrentTime = 0;
    this.myAnimationConfig = theAnimationConfig;
    this.myDuration = theAnimationConfig.myDuration ?? 500;
  }

  /**
   * Returns the current frame based on the current time.
   * @returns {Object} The current frame.
   */
  getFrame() {
    const {frames}  = this.myAnimationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.myCurrentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
  }

  /**
   * Advances the current time by the given delta.
   * If the current time exceeds the duration, it is reset to 0.
   * @param {number} theDelta - The amount to increase the current time by.
   */
  step(theDelta) {
    this.myCurrentTime += theDelta;
    if (this.myCurrentTime >= this.myDuration) {
      this.myCurrentTime = 0;
    }
  }
}