# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Line extends Bit
  draw:->
    super
    @setAttr
      x1:  @props.x - @props.radius
      x2:  @props.x + @props.radius
      y1:  @props.y
      y2:  @props.y

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Line", [], -> Line
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Line
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Line = Line

