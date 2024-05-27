/**
 * Animations is a class that manages different animation patterns.
 */
class Animations {
  /**
   * Constructs a new Animations instance.
   *
   * @param {Object} thePatterns - An object containing different animation patterns.
   */
  constructor(thePatterns) {
    this.myPatterns = thePatterns;
    this.myActiveKey = Object.keys(this.myPatterns)[0];
  }

  /**
   * Returns the current frame of the active animation pattern.
   *
   * @returns {Object} The current frame of the active animation pattern.
   */
  getFrame() {
    return this.myPatterns[this.myActiveKey].getFrame();
  }

  /**
   * Starts playing a specific animation pattern from a given start time.
   * If the given animation pattern is already playing, it does nothing.
   *
   * @param {string} theKey - The key of the animation pattern to play.
   * @param {number} theStartTime - The time to start playing the animation pattern from. Defaults to 0.
   */
  play(theKey, theStartTime = 0) {
    // Already playing this one
    if (this.myActiveKey === theKey) {
      return;
    }
    // Switch
    this.myActiveKey = theKey;
    this.myPatterns[this.myActiveKey].myCurentTime = theStartTime;
  }

  /**
   * Advances the current time of the active animation pattern by a given delta.
   *
   * @param {number} theDelta - The amount of time to advance the current time of the active animation pattern by.
   */
  step(theDelta) {
    this.myPatterns[this.myActiveKey].step(theDelta);
  }
}