var Burst, MotionPath, Swirl, Timeline, Transit, Tween, burst, path1, path2, path3;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

path1 = document.getElementById('js-path1');

path2 = document.getElementById('js-path2');

path3 = document.getElementById('js-path3');

burst = new Transit({
  x: 600,
  y: 600,
  bit: path1,
  duration: 2000,
  delay: 1000,
  isShowEnd: true,
  stroke: 'cyan',
  fill: 'transparent',
  easing: 'Sinusoidal.Out',
  strokeDasharray: '100%',
  strokeWidth: 15,
  strokeDashoffset: {
    '100%': '0%'
  }
});

burst = new Transit({
  x: 600,
  y: 600,
  bit: path2,
  duration: 2000,
  delay: 1100,
  isShowEnd: true,
  stroke: 'yellow',
  fill: 'transparent',
  easing: 'Sinusoidal.Out',
  strokeDasharray: '100%',
  strokeWidth: 15,
  strokeDashoffset: {
    '100%': '0%'
  }
});

burst = new Transit({
  x: 600,
  y: 600,
  bit: path3,
  duration: 2000,
  delay: 1200,
  isShowEnd: true,
  stroke: 'deeppink',
  fill: 'transparent',
  easing: 'Sinusoidal.Out',
  strokeDasharray: '100%',
  strokeWidth: 15,
  strokeDashoffset: {
    '100%': '0%'
  }
});
