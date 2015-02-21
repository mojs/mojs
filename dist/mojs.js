var Burst, Swirl, Timeline, Transit, Tween, burst, eye, page, pupil, slider;

Burst = require('./burst');

Swirl = require('./Swirl');

Timeline = require('./timeline');

Tween = require('./tween');

Transit = require('./transit');

burst = new Burst({
  x: 300,
  y: 300,
  type: 'polygon',
  duration: 500,
  count: 5,
  isRunLess: true,
  isShowInit: true,
  isShowEnd: true,
  points: 5,
  swirlFrequency: 'rand(0,10)',
  swirlSize: 'rand(0,10)',
  delay: 1000,
  opacity: {
    1: 0
  },
  childOptions: {
    radius: 5,
    opacity: [
      {
        1: 0
      }, 1, {
        1: .5
      }
    ]
  }
});

burst.run();

slider = document.getElementById('js-slider');

slider.addEventListener('input', function(e) {
  return burst.tween.setProgress(this.value / 1000);
});

eye = document.querySelector('#js-eye');

pupil = document.querySelector('#js-pupil');

page = document.querySelector('#js-page');
