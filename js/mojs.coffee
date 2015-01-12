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
  type:             'line'
  x:                {200 : 100}
  y:                100
  radius:           75
  strokeDasharray:  2*75
  duration:         1000
  deg:              {0: 60}
  isDrawLess:       true
  # delay:            1000
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
