# ignore coffescript sudo code
### istanbul ignore next ###


Bit = require './bit'
# Bit = mojs.Bit
class Line extends Bit
  draw:->
    @setAttr
      x1:           0
      x2:           2*@props.radius
      y1:           @props.radius
      y2:           @props.radius
      stroke:       @props.strokeColor
      strokeWidth:  @props.strokeWidth
      transform:    @props.transform

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Line", [], -> Line
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Line
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Line = Line

