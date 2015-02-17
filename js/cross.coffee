# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Cross extends Bit
  type: 'path'
  draw:->
    super
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    x1 = @props.x-radiusX; x2 = @props.x+radiusX
    line1 = "M#{x1},#{@props.y} L#{x2},#{@props.y}"
    y1 = @props.y-radiusY; y2 = @props.y+radiusY
    line2 = "M#{@props.x},#{y1} L#{@props.x},#{y2}"
    d = "#{line1} #{line2}"
    @setAttr d: d

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Cross", [], -> Cross
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Cross
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Cross = Cross

