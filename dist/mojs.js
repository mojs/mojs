var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

burst = new Transit({
  x: 100,
  y: 100,
  type: 'zigzag',
  duration: 2000,
  count: 3,
  points: 5,
  isShowInit: true,
  isShowEnd: true,
  repeat: 99999,
  stroke: 'deeppink',
  strokeWidth: 2,
  fill: 'transparent',
  radius: 75,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});
