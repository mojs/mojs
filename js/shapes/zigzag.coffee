# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Zigzag extends Bit
  type: 'path'
  draw:->
    super
    return if !@props.points
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    points = ''; stepX = 2*radiusX/@props.points
    stepY  = 2*radiusY/@props.points; strokeWidth = @props['stroke-width']
    
    for i in [@props.points...0]
      iX = i*stepX + strokeWidth; iY = i*stepY + strokeWidth
      iX2 = (i-1)*stepX + strokeWidth; iY2 = (i-1)*stepY + strokeWidth
      char = if i is @props.points then 'M' else 'L'
      points += "#{char}#{iX},#{iY} l0, -#{stepY} l-#{stepX}, 0"
    @setAttr d: points

  getLength:-> @el.getTotalLength()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Zigzag", [], -> Zigzag
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Zigzag
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Zigzag = Zigzag

