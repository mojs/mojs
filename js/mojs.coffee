
div = document.querySelector '#js-div'

setTimeout ->
  div.style.width = '50px'
, 5000

# Transit   = require './transit'
Burst     = require './burst'

burst = new Burst
  x:            300
  y:            150
  duration:     600
  degree:       200
  radius: { 25: 150 }
  # degree:       45
  points:       6
  isDrawLess:   true
  isSwirl:      true
  # onComplete: -> @run()
  randomRadius: .5
  randomAngle:  1
  swirlSize:      'rand(3,15)'
  swirlFrequency: ['rand(1,5)']
  childOptions:
    type:         'circle'
    fill:         ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    # stroke:       ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    # strokeWidth:  {2: 0}
    strokeWidth:  0
    radius:       { 'rand(2, 6)': 0}
    # opacity:      { 'rand(.5, 1)': 0 }
    # type:         ['cross', 'polygon', 'line', 'polygon', 'cross']
    # angle:         [{ 0:360 }, {360: 0}, {0: 360}]

document.body.addEventListener 'click', (e)->
  burst.run()
  # burst.run( x: e.x, y: e.y )
