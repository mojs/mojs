
var sw = new mojs.Burst({
  left: '50%',  top: '50%',
  duration:     650,
  delay: 'stagger(400, 75)',
  easing:       'ease.out',
  // stroke:       'cyan',
  // fill:         'none',
  radius:       0,
  isShowEnd:    1,
  // angle:        {0: 90},
  isSwirl:      true,
  isShowStart: 1,
  fill: ['#555','#666', '#999', '#c1c1c1', '#f5f5f5' ],
  childOptions: {
    // radius: [{125: 150}, {100: 125}, {75: 100}, {50: 75}, { 25: 50 }],
    radius: {'stagger(125, -25)':'stagger(100, 25)'}
  }
}); //.then({ radius: 0, angle: 0 });
