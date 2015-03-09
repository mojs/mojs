var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, path1, path2, path3, paths, stagger;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

Stagger = require('./stagger');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

paths = document.getElementById('js-svg');

path1 = document.getElementById('js-path1');

path2 = document.getElementById('js-path2');

path3 = document.getElementById('js-path3');

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
  }
});
