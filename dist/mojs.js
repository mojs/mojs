var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst, eye, page, pupil;

Burst = require('./burst');

Swirl = require('./Swirl');

Timeline = require('./timeline');

Tween = require('./tween');

Transit = require('./transit');

MotionPath = require('./motion-path');

burst = new Transit({
  x: 300,
  y: 300,
  type: 'zigzag',
  delay: 1000,
  duration: 2000,
  count: 3,
  isShowInit: true,
  isShowEnd: true,
  strokeWidth: 1,
  stroke: 'deeppink',
  fill: 'transparent',
  points: 5,
  radius: 50,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});

eye = document.querySelector('#js-eye');

pupil = document.querySelector('#js-pupil');

page = document.querySelector('#js-page');
