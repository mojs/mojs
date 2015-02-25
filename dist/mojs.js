var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst, eye, mp, page, pupil, slider;

Burst = require('./burst');

Swirl = require('./Swirl');

Timeline = require('./timeline');

Tween = require('./tween');

Transit = require('./transit');

MotionPath = require('./motion-path');

burst = new Transit({
  x: 300,
  y: 300,
  type: 'circle',
  delay: 3000,
  duration: 2000,
  count: 3,
  isShowInit: true,
  isShowEnd: true,
  isRunLess: true,
  points: 5,
  radius: {
    100: 1
  },
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

eye = document.querySelector('#js-eye');

pupil = document.querySelector('#js-pupil');

page = document.querySelector('#js-page');
