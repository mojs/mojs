var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, ball, burst, burst2, circle, circleRadius, cyan, delayStart, isRunLess, mainTween, s, slider, yellow;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

Stagger = require('./stagger');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

isRunLess = false;

delayStart = 0;

mainTween = new Tween;

yellow = '#F9DD5E';

cyan = '#11CDC5';

circleRadius = 8;

s = 1;

burst = new Burst({
  x: 100,
  y: 300,
  degree: 180,
  angle: 45,
  radius: {
    10: 25
  },
  type: 'line',
  stroke: yellow,
  strokeWidth: 2,
  delay: (delayStart + 650) * s,
  isRunLess: isRunLess,
  childOptions: {
    radius: {
      7: 0
    }
  }
});

burst2 = new Burst({
  x: 100,
  y: 300,
  degree: 180,
  angle: 45,
  radius: {
    10: 25
  },
  type: 'line',
  stroke: cyan,
  strokeWidth: 2,
  delay: (delayStart + 1950) * s,
  isRunLess: isRunLess,
  childOptions: {
    radius: {
      7: 0
    }
  }
});

circle = new Transit({
  x: 100,
  y: 80,
  type: 'circle',
  radius: 3 * circleRadius,
  fill: 'transparent',
  strokeWidth: 2,
  stroke: '#FC2D79',
  isShowInit: true,
  isShowEnd: true,
  strokeDasharray: '100% 200%',
  strokeDashoffset: {
    '100%': '50%'
  },
  angle: 180,
  delay: (delayStart + 900) * s,
  duration: 300 * s,
  isRunLess: isRunLess
}).then({
  strokeDashoffset: '100%',
  angle: 360,
  delay: 0
});

ball = new Transit({
  type: 'circle',
  stroke: 'white',
  strokeWidth: 2,
  fill: 'transparent',
  radius: circleRadius,
  radiusX: circleRadius / 2,
  radiusY: circleRadius,
  x: 100,
  y: -20,
  isShowInit: true,
  isShowEnd: true,
  shiftY: {
    0: 300
  },
  duration: 600 * s,
  easing: 'Cubic.In',
  delay: delayStart * s,
  isRunLess: isRunLess
}).then({
  shiftY: 305,
  radiusX: 1.5 * circleRadius,
  radiusY: circleRadius / 2,
  easing: 'Cubic.Out',
  duration: 150 * s,
  delay: 0
}).then({
  shiftY: 100,
  radiusX: circleRadius,
  radiusY: circleRadius,
  easing: 'Cubic.Out',
  duration: 600 * s
}).then({
  shiftY: 300,
  radiusX: circleRadius / 2,
  radiusY: circleRadius,
  easing: 'Cubic.In',
  duration: 600 * s,
  delay: 0
}).then({
  shiftY: 305,
  radiusX: 1.5 * circleRadius,
  radiusY: circleRadius / 2,
  easing: 'Cubic.Out',
  duration: 150 * s,
  delay: 0
}).then({
  shiftY: 150,
  radiusX: circleRadius,
  radiusY: circleRadius,
  easing: 'Cubic.Out',
  duration: 600 * s
});

mainTween.add(ball.tween);

mainTween.add(burst.tween);

mainTween.add(circle.tween);

slider = document.getElementById('js-slider');

slider.addEventListener('input', function(e) {
  return mainTween.setProgress(this.value / 100000);
});
