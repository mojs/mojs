var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, burst, path1, path2, path3, paths;

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

burst = new Burst({
  fill: ['deeppink', 'cyan', 'yellow'],
  count: 50,
  degree: 140,
  radius: {
    0: 75
  },
  isSwirl: true,
  duration: 800,
  delay: 'stagger(1000, rand(0,150))',
  childOptions: {
    radius: {
      'rand(2,6)': 0
    }
  }
});

burst = new Stagger({
  els: paths,
  strokeWidth: 5,
  delay: 'stagger(2000, 50)',
  duration: 2000,
  fill: 'transparent',
  strokeDasharray: '200%',
  strokeDashoffset: {
    '200%': '100%'
  },
  isShowEnd: true,
  isShowInit: true,
  angle: {
    0: 360
  },
  easing: 'Sinusoidal.Out'
});
