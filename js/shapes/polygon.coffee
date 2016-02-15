# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'
h   = require '../h'

class Polygon extends Bit
  shape: 'path'
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
      char = if i is 0 then 'M' else 'L'
      d += "#{char}#{point.x.toFixed(4)},#{point.y.toFixed(4)} "

    @setAttr d: d += 'z'

  getLength:-> @el.getTotalLength()

module.exports = Polygon
