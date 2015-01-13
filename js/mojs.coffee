Cross     = require './cross'
Circle    = require './circle'
Triangle  = require './triangle'
Rect      = require './rect'
Line      = require './line'
Bit       = require './bit'
Transit   = require './transit'
svg       = document.getElementById 'js-svg'
div       = document.getElementById 'js-div'

rect = new Transit
  type:             'triangle'
  # shiftX:           {200 : 100}
  # x:                0
  stroke:           {"deeppink":"orange"}
  x:                200
  y:                100
  # radius:           75
  # points:           3
  # strokeDasharray:  2*75
  strokeWidth:      10
  duration:         2000
  deg:              {0: 360}
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
