
Bit       = require './bit'
Circle    = require './circle'
Line      = require './line'
Rect      = require './rect'
Triangle  = require './triangle'
h         = require './h'

class BitsMap
  h: h
  map:
    bit:      Bit
    circle:   Circle
    line:     Line
    rect:     Rect
    triangle: Triangle
  getBit:(name)-> @map[name] or @h.error "no \"#{name}\" shape available yet,
      please choose from this list:", @map

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "bitsMap", [], -> new BitsMap
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = new BitsMap
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.bitsMap = new BitsMap

