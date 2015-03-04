# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Circle extends Bit
  type: 'ellipse'
  draw:->
    rx = if @props.radiusX? then @props.radiusX else @props.radius
    ry = if @props.radiusY? then @props.radiusY else @props.radius
    @setAttrsIfChanged rx: rx, ry: ry, cx: @props.x, cy: @props.y
    super
  getLength:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    2*Math.PI*Math.sqrt((radiusX*radiusX + radiusY*radiusY)/2)


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Circle", [], -> Circle
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Circle
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Circle = Circle

