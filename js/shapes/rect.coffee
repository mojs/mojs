# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Rect extends Bit
  type:   'rect'
  ratio:  1.43
  draw:->
    super
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    @setAttrsIfChanged
      width:  2*radiusX
      height: 2*radiusY
      x:      @props.x - radiusX
      y:      @props.y - radiusY

  getLength:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    2*radiusX + 2*radiusY

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Rect", [], -> Rect
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Rect
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Rect = Rect

