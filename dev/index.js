import mojs from 'src/mojs.babel.js';
import MojsPlayer from '@mojs/player';

// get the current mojs version
document.querySelector('.mojs-version').innerHTML += ' ' + mojs.revision;

// build the tween
// const burst = new mojs.Burst({
//   radius: { 1 : 200 },
//   count: 20,
//   children: {
//     radius: 'rand(20, 10)',
//     delay: 'rand(0, 500)',
//     duration: 2000,
//     opacity: 'rand(0.1, 1)'
//   }
// });

// // build the timeline and add the tween
// const timeline = new mojs.Timeline().add(
//   burst
// );

// // build the player and add the timeline
// new MojsPlayer({
//   add: timeline,
//   isSaveState: true,
//   isPlaying: true,
//   isRepeat: true
// });

// 2) Examples:
const burst = new mojs.Burst({
  shape: 'circle',
  radius: { 0: 360 },
  duration: 2000,
  children : {
    repeat: 999,
    radius: { 30 : 5 },
    // 2.1)
    shape: 'cross',
    stroke: 'teal',
    strokeWidth: { 1: 0 },
    angle: { 360: 0 },
    duration: 2000
  },
  // 2.2)
  count: 20,
}).play();

// 3)
const circle = new mojs.Shape({
  radius: { 0: 360 },
  fill: 'none',
  stroke: 'yellow'
})
const timeline = new mojs.Timeline({
  repeat: 999
})
.add( burst, circle )
// .play();

// 4) Implementing our animations...

// 4.1) Inspecting colors from image:
const orange = "#f59d56";
const green = "#aded94";
const magenta = "#bd81fb";
const red = "#ee695a"

const circlesInput  = [];
const circlesOutput = [];

const arrayMethodsVisualizedTimeline = new mojs.Timeline({
  repeat: 1
})
const parent = document.getElementById("app");
const xDiff = 536 - 22;

const circleOptions = {
  parent, // RTFM!!!
  className: "mojs-marble",
  radius: 16,
  isShowStart: true,
  left: 64,
  top: 100,
  y: 0
}

// PREPARE INPUT BALLS:
for ( let i = 0; i < 4; i++ ){

  Object.assign(circleOptions, {
    x: i * 38,
    opacity: 1,
    fill: i === 4 ? green : orange,
  })
  if ( i === 3 ){
    // console.log(circleOptions);
    Object.assign(circleOptions, {
      x: { [i * 38]: 300 },
      opacity: 1,
      fill: i === 4 ? green : orange,
    })
  }
  circlesInput.push(new mojs.Shape(circleOptions))

}

// PREPARE OUTPUT BALLS:
for ( let i = 0; i < 5; i++ ){

  if ( i === 4 ){

    // console.log({ x: ( i * 38 ) + xDiff, y: ( i * 38 ) + xDiff })
    continue;
    Object.assign(circleOptions, {
      x: { 0 : ( i * 38 ) + xDiff },
      x: ( i * 38 ) + xDiff,
      duration: 3000,
      fill: green,
    })

  } else {

    Object.assign(circleOptions, {
      x: ( i * 38 ) + xDiff,
      opacity: 1,
      fill: i === 4 ? green : orange,
    })

  }

  circlesOutput.push(new mojs.Shape(circleOptions))

}

const pushBallInitial = new mojs.Shape({
  ...circleOptions,
    x: 254,
    duration: 1000,
    opacity: { 1 : 0 },
    fill: green,
    onComplete: ()=>{
      console.log("onComplete()", pushBallInitial, pushBallInitial.x)
    }
});

const pushBall = new mojs.Shape({
  ...circleOptions,
    x: { 254: 666 },
    duration: 3000,
    fill: green,
    onComplete: ()=>{
      pushBall.getProps().el.setAttribute("data-index", 4);
    }
 })

const space4 = 0;
const space5 = 0;
const leftBracket = new mojs.Html({
  el: "#left-bracket",
  x: 22,
  y: 84
})
const rightBracket = new mojs.Html({
  el: "#right-bracket",
  // x: { 478: 512 }, // 512
  x: 188,
  y: 84,
  duration: 3000,
})
const leftBracket2 = new mojs.Html({
  el: "#left-bracket2",
  x: 536,
  y: 84
})
const rightBracket2 = new mojs.Html({
  el: "#right-bracket2",
  // x: 740,
  x: 702,
  x: { 702 : 740},
  y: 84,
  duration: 3000,
})
const rightArrow = new mojs.Html({
  el: "#long-right-arrow",
  scale: 2,
  x: { 460: 0 },
  y: 76,
  duration: 3000,
})
const push = new mojs.Html({
  el: "#push",
  x: 210,
  y: 84,
  duration: 3000,
})

arrayMethodsVisualizedTimeline
.add(circlesInput, circlesOutput)
// .play()

// PLAYER:
// const mojsPlayer = new MojsPlayer({
//   className: "mojs-player",
//   add: arrayMethodsVisualizedTimeline,
//   isPlaying: false
// });

document.body.addEventListener("click", ()=>{
  pushBall.play()
  rightBracket2.play();
  pushBallInitial.play();
})

// reverse()

