# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Line extends Bit
  draw:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    @setAttr
      x1:  @props.x - radiusX
      x2:  @props.x + radiusX
      y1:  @props.y
      y2:  @props.y
    super

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Line", [], -> Line
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Line
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Line = Line

