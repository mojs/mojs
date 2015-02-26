
Bit       = require './bit'
Circle    = require './circle'
Line      = require './line'
Zigzag    = require './zigzag'
Rect      = require './rect'
Polygon   = require './polygon'
Cross     = require './cross'
Equal     = require './equal'
h         = require '../h'

class BitsMap
  h: h
  map:
    bit:      Bit
    circle:   Circle
    line:     Line
    zigzag:   Zigzag
    rect:     Rect
    polygon:  Polygon
    cross:    Cross
    equal:    Equal
  getBit:(name)-> @map[name] or @h.error "no \"#{name}\" shape available yet,
      please choose from this list:", @map

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "bitsMap", [], -> new BitsMap
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = new BitsMap
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.bitsMap = new BitsMap

