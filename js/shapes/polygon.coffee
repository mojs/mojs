# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'
h   = require '../h'

class Polygon extends Bit
  type:     'polygon'
  draw:->
    # !@isDraw and @drawShape()
    @drawShape()
    super
  drawShape:->
    step = 360/(@props.points); @radialPoints = []
    for i in [0...@props.points]
      @radialPoints.push h.getRadialPoint
        radius: @props.radius
        radiusX: @props.radiusX
        radiusY: @props.radiusY
        angle:  (i*step)
        center: x: @props.x, y: @props.y
    d = ''
    for point, i in @radialPoints
      d += "#{point.x.toFixed(4)},#{point.y.toFixed(4)} "
    @setAttr points:  d

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Polygon", [], -> Polygon
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Polygon
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Polygon = Polygon

