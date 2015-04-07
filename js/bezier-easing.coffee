h = require './h'

class BezierEasing
  constructor:(o)-> return @generate
  generate:(mX1, mY1, mX2, mY2)->
    # params parsing
    if arguments.length < 4
      h.error 'Bezier function expects 4 arguments'
      return
    for i in [0...4]
      arg = arguments[i]
      if (typeof arg isnt "number" or isNaN(arg) or !isFinite(arg))
        h.error 'Bezier function expects 4 arguments'
        return
    if (mX1 < 0 or mX1 > 1 or mX2 < 0 or mX2 > 1)
      h.error 'Bezier x values should be > 0 and < 1'
      return
    ->


bezierEasing = new BezierEasing

module.exports = bezierEasing




