/**
 * Function to create standing frames for an animation.
 * @param {number} rootFrame - The root frame number from which the animation frames are calculated. Default is 0.
 * @returns {Object} An object containing the duration of the animation and an array of frames with their respective times and frame numbers.
 */
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

/**
 * Function to create walking frames for an animation.
 * @param {number} rootFrame - The root frame number from which the animation frames are calculated. Default is 0.
 * @returns {Object} An object containing the duration of the animation and an array of frames with their respective times and frame numbers.
 */
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

// Animation for standing
const ANIM_STAND = makeStandingFrames(0);

// Animation for walking
const ANIM_WALK = makeWalkingFrames(0);

// Animation for picking up and down (currently commented out)
// const PICK_UP_DOWN = {
//   duration: 400,
//   frames: [
//     {
//       time: 0,
//       frame: 12
//     }
//   ]
// }