# Cross     = require './cross'
# Circle    = require './circle'
# Polygon   = require './polygon'
# Rect      = require './rect'
# Line      = require './line'
# Bit       = require './bit'
# svg       = document.getElementById 'js-svg'
# div       = document.getElementById 'js-div'
Transit   = require './transit'

rect = new Transit
  type:             'polygon'
  # shiftX:           {200 : 100}
  # x:                0
  stroke:           {"deeppink":"orange"}
  x:                200
  y:                100
  # radius:           75
  points:           6
  # strokeDasharray:  2*75
  strokeWidth:      10
  duration:         2000
  angle:            {0: 360}
  isDrawLess:       true
  delay:            1000
  strokeLinecap:    {'round': 'butt'}
  isRunLess:        true
  onComplete:->
    # console.log 'complete'
    # @run()

rect.run()

# setInterval ->
#   rect.run()
#   console.log rect.TWEEN.getAll()
# , 500


# rect
#   .then deg: 0
#   .then
#     deg:    1000
#     delay:  0
