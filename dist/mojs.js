var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, paths, slider, stagger;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

Stagger = require('./stagger');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

paths = document.getElementById('js-svg');

stagger = new Stagger({
  els: paths,
  strokeWidth: 3,
  delay: 'stagger(2000, 100)',
  duration: 2000,
  isShowEnd: true,
  isShowInit: true,
  easing: 'Sinusoidal.Out',
  strokeDashoffset: {
    '100%': 0
  },
  isRunLess: true
});

slider = document.getElementById('js-slider');

slider.addEventListener('input', function(e) {
  console.log(this.value / 100000);
  return stagger.tween.setProgress(this.value / 100000);
});
