h = require './h'

class BezierEasing
  constructor:(o)-> return @generate
  generate:(mX1, mY1, mX2, mY2)->
    # params parsing
    if arguments.length < 4
      h.error 'Bezier function expects 4 arguments'
      return
    ->

bezierEasing = new BezierEasing

module.exports = bezierEasing




