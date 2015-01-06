# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Byte extends Bit
  defaults:
    radius:       50
    strokeWidth:  2
    strokeColor:  '#ff00ff'
    fill:         'transparent'
    duration:     500
    delay:        0

  constructor:(@o={})-> @vars()
  vars:->

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Byte", [], -> Byte
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Byte
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Byte = Byte

