class FrameIndexPattern {
  constructor(theAnimationConfig) {
    this.myCurrentTime = 0;
    this.myAnimationConfig = theAnimationConfig;
    this.myDuration = theAnimationConfig.myDuration ?? 500;
  }

  getFrame() {
    const {frames}  = this.myAnimationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.myCurrentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }

  }

  step(theDelta) {
    this.myCurrentTime += theDelta;
    if (this.myCurrentTime >= this.myDuration) {
      this.myCurrentTime = 0;
    }
  }

}