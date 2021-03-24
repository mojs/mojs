
h         = require 'src/h'
Bit       = require('./bit').default
Custom    = require('./custom').default
Circle    = require './circle'
Line      = require './line'
Zigzag    = require './zigzag'
Rect      = require './rect'
Polygon   = require './polygon'
Cross     = require './cross'
Curve     = require('./curve').default
Equal     = require './equal'

class BitsMap
  constructor: ()-> this.addShape = h.bind this.addShape, @

  bit:      Bit
  custom:   Custom
  circle:   Circle
  line:     Line
  zigzag:   Zigzag
  rect:     Rect
  polygon:  Polygon
  cross:    Cross
  equal:    Equal
  curve:    Curve
  getShape:(name)-> @[name] or h.error "no \"#{name}\" shape available yet,
      please choose from this list:", [ 'circle', 'line', 'zigzag', 'rect', 'polygon', 'cross', 'equal', 'curve' ]

  ###
    Method to add shape to the map.
    @public
    @param {String} Name of the shape module.
    @param {Object} Shape module class.
  ###
  addShape:(name, Module)-> @[name] = Module

module.exports = new BitsMap
