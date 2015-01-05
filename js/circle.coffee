# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Circle extends Bit
  type: 'ellipse'
  draw:->
    super
    @setAttr
      rx:  @props.radiusX or @props.radius
      ry:  @props.radiusY or @props.radius
      cx:  @props.x
      cy:  @props.y

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Circle", [], -> Circle
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Circle
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Circle = Circle

