var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst, mp, slider;

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
  strokeWidth: 1,
  stroke: 'deeppink',
  angle: {
    0: 180
  },
  points: 2,
  radius: 50,
  radiusY: 10,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)'
});

mp = new MotionPath({
  path: 'M0,0 L500,500 L1000, 0',
  el: burst.el,
  duration: 2000,
  delay: 3000,
  isRunLess: true,
  pathEnd: .25,
  fill: {
    container: 'body'
  },
  onChainUpdate: function(p) {
    return burst.tween.setProgress(p);
  }
}).then({
  duration: 2000,
  pathStart: .25,
  pathEnd: .5
}).then({
  duration: 2000,
  pathStart: .5,
  pathEnd: .75
}).then({
  duration: 2000,
  pathStart: .75,
  pathEnd: 1
});

mp.run();

slider = document.getElementById('js-slider');

slider.addEventListener('input', function(e) {
  return burst.tween.setProgress(this.value / 100000);
});
