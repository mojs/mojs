# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'
h   = require './h'

class Triangle extends Bit
  type:     'polygon'
  draw:->
    !@isDraw and @drawShape()
    super
  drawShape:->
    @isDraw = true
    step = 360/(@props.points); @radialPoints = []
    for i in [0...@props.points]
      @radialPoints.push h.getRadialPoint
        radius: @props.radius
        angle:  (i*step) + @props.deg
        center: x: @props.x, y: @props.y
    d = ''
    for point, i in @radialPoints
      d += "#{point.x},#{point.y} "
    @setAttr points:  d

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Triangle", [], -> Triangle
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Triangle
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Triangle = Triangle

