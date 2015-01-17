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
  x:            100
  y:            100
  duration:     300
  degree:       30
  points:       5
  isDrawLess:   true
  isRandom:     true
  childOptions:
    type:         'line'
    # fill:         ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    stroke:       ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    strokeWidth:  2
    # radius:       14
    # type:         ['cross', 'polygon', 'line', 'polygon', 'cross']
    # angle:         [{ 0:360 }, {360: 0}, {0: 360}]



document.body.addEventListener 'click', (e)->
  burst.run()

# rec = new Transit
#   type: 'circle'
#   x: {10: 200}
#   y: 100
#   delay: 2000
#   isDrawLess: true