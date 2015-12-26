
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
  bit:      Bit
  circle:   Circle
  line:     Line
  zigzag:   Zigzag
  rect:     Rect
  polygon:  Polygon
  cross:    Cross
  equal:    Equal
  getShape:(name)-> @[name] or h.error "no \"#{name}\" shape available yet,
      please choose from this list:", @

module.exports = new BitsMap
