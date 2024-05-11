function makeStandingFrames(rootFrame = 0) {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
      {
        time: 100,
        frame: rootFrame+1,
      },
      {
        time: 200,
        frame: rootFrame+2,
      },
      {
        time: 300,
        frame: rootFrame+3,
      }
    ]
  }
}
const makeWalkingFrames = (rootFrame=0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame+4
      },
      {
        time: 100,
        frame: rootFrame+5
      },
      {
        time: 200,
        frame: rootFrame+6
      },
      {
        time: 300,
        frame: rootFrame+7
      }
    ]
  }
}

const ANIM_HERO_STAND = makeStandingFrames(0);

const ANIM_HERO_WALK = makeWalkingFrames(0);

// const PICK_UP_DOWN = {
//   duration: 400,
//   frames: [
//     {
//       time: 0,
//       frame: 12
//     }
//   ]
// }
