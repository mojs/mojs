var Burst, Swirl, Timeline, Transit, Tween, burst;

Burst = require('./burst');

Swirl = require('./Swirl');

Timeline = require('./timeline');

Tween = require('./tween');

Transit = require('./transit');

burst = new Burst({
  x: 300,
  y: 150,
  duration: 1000,
  radius: {
    0: 100
  },
  isSwirl: true,
  angle: 'rand(0,360)',
  isShowEnd: true,
  points: 5,
  stroke: {
    'deeppink': 'orange'
  },
  fill: 'green',
  swirlFrequency: 50,
  strokeWidth: 2,
  type: 'rect',
  childOptions: {
    isSwirl: false,
    fill: ['deeppink', null, 'cyan', 'lime', 'hotpink'],
    points: 3,
    strokeWidth: 0,
    radius: 6
  }
});

document.body.addEventListener('click', function(e) {
  return burst.run({
    x: e.x,
    y: e.y,
    radius: {
      'rand(10,200)': 0
    },
    swirlFrequency: 50
  });
});
