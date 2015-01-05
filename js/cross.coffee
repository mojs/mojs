# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Cross extends Bit
  type: 'path'
  draw:->
    super
    x1 = @props.x-@props.radius; x2 = @props.x+@props.radius
    line1 = "M#{x1},#{@props.y} L#{x2},#{@props.y}"
    y1 = @props.y-@props.radius; y2 = @props.y+@props.radius
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

