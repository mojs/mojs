var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

burst = new Transit({
  x: 400,
  y: 400,
  type: 'circle',
  el: document.getElementById('js-ellipse'),
  duration: 2000,
  count: 3,
  isShowInit: true,
  isShowEnd: true,
  strokeWidth: 1,
  repeat: 99999,
  stroke: 'deeppink',
  radius: 20,
  radiusY: {
    10: 40
  },
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});
