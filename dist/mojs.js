var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst, eye, page, pupil;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

burst = new Transit({
  x: 300,
  y: 300,
  type: 'equal',
  delay: 1000,
  duration: 2000,
  count: 3,
  isShowInit: true,
  isShowEnd: true,
  strokeWidth: 2,
  stroke: 'deeppink',
  angle: {
    0: 180
  },
  points: 2,
  radius: 50,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});

eye = document.querySelector('#js-eye');

pupil = document.querySelector('#js-pupil');

page = document.querySelector('#js-page');
