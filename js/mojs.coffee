# Cross     = require './cross'
# Circle    = require './circle'
# Polygon   = require './polygon'
# Rect      = require './rect'
# Line      = require './line'
# Bit       = require './bit'
# svg       = document.getElementById 'js-svg'
# div       = document.getElementById 'js-div'
Transit   = require './transit'
Burst     = require './burst'

burst = new Burst
  x:            300
  y:            150
  duration:     600
  # degree:       45
  points:       5
  isDrawLess:   true
  isSwirl:      true
  # onComplete: -> @run()
  randomRadius: .75
  randomAngle:  .3
  childOptions:
    type:         'circle'
    fill:         ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    # stroke:       ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    # strokeWidth:  {2: 0}
    strokeWidth:  0
    # radius:       { 'rand(2, 12)': 0}
    # type:         ['cross', 'polygon', 'line', 'polygon', 'cross']
    # angle:         [{ 0:360 }, {360: 0}, {0: 360}]

# console.log burst.deltas.x

document.body.addEventListener 'click', (e)->
  burst.run()

# rect = new Transit
#   type: 'circle'
#   x: {10: 200}
#   y: 100
#   # delay: 2000
#   isDrawLess: true