# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'
h   = require './h'

class Triangle extends Bit
  type: 'path'
  draw:->
    cnt = 3; step = 360/(cnt); points = []
    for i in [0...cnt]
      points.push h.getRadialPoint
        radius: @props.radius
        angle:  (i*step)
        center: x: @props.x, y: @props.y
    d = ''; len = points.length - 1
    for point, i in points
      nextI = if i < len then i+1 else 0
      space = if i is 0 then '' else ' '
      d += "#{space}M#{points[i].x}, #{points[i].y}
        L#{points[nextI].x}, #{points[nextI].y}"
    @setAttr d:  d
    super


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Triangle", [], -> Triangle
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Triangle
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Triangle = Triangle

