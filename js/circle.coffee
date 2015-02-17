# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Circle extends Bit
  type: 'ellipse'
  draw:->
    super
    @setAttr
      rx:  if @props.radiusX? then @props.radiusX else @props.radius
      ry:  if @props.radiusY? then @props.radiusY else @props.radius
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

