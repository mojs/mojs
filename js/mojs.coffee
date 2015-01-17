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
  x:          100
  y:          100
  duration:   500
  # degree:     8900
  points:     7
  # delay:      1000
  isDrawLess: true
  childOptions:
    fill:         ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    strokeWidth: 0
  #   angle:  { 0: 360 }

document.body.addEventListener 'click', (e)->
  burst.run()

# rec = new Transit
#   type: 'circle'
#   x: {10: 200}
#   y: 100
#   delay: 2000
#   isDrawLess: true