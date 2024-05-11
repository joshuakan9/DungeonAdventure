class Animations {
  constructor(thePatterns) {
    this.myPatterns = thePatterns;
    this.myActiveKey = Object.keys(this.myPatterns)[0];
  }

  getFrame() {
    return this.myPatterns[this.myActiveKey].getFrame();
  }

  play(theKey, theStartTime = 0) {
    // Already playing this one
    if (this.myActiveKey === theKey) {
      return;
    }
    // Switch
    this.myActiveKey = theKey;
    this.myPatterns[this.myActiveKey].myCurentTime = theStartTime;
  }

  step(theDelta) {
    this.myPatterns[this.myActiveKey].step(theDelta);
  }
}