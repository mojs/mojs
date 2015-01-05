# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Rect extends Bit
  type: 'rect'
  draw:->
    console.time 'draw'
    super
    rad2 = 2*@props.radius
    @setAttr
      width:  rad2
      height: rad2
      x:      @props.x - @props.radius
      y:      @props.y - @props.radius
    console.timeEnd 'draw'


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Rect", [], -> Rect
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Rect
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Rect = Rect

