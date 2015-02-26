# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Zigzag extends Bit
  type: 'polyline'
  draw:->
    super
    return if !@props.points
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    points = ''; stepX = 2*radiusX/@props.points
    stepY  = 2*radiusY/@props.points; strokeWidth = @props['stroke-width']
    
    for i in [0..@props.points]
      iX = i*stepX + strokeWidth; iY = i*stepY + strokeWidth
      startPoints = "#{iX}, #{iY}"
      
      points += if i is @props.points then startPoints
      else "#{startPoints} #{(i+1)*stepX + strokeWidth}, #{iY} "

    @setAttr points: points

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

