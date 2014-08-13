h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'

class Bit
  defaultOptions:
    x:   0
    y:   0
    deg: 0

  constructor:(@o={})-> @vars(); @run?()

  vars:->
    # get CANVAS context
    @TWEEN = TWEEN
    @h     = h
    @ctx   = @o.ctx or @ctx
    @px    = h.pixel
    @DEG = (Math.PI/180)

    @parent = @default prop: 'parent', def: h.body
    @color  = @default prop: 'color' , def: '#222'
    @colorMap   = @default prop: 'colorMap',  def: [@color]

    @colorObj = @h.makeColorObj @color
    # @o = {}

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue
    @render()

  default:(o)->
    prop = o.prop; def = o.def
    @[prop] = if @o[prop]?
      @o[prop]
    else if @[prop]?
      @[prop]
    else if @defaultOptions[prop]?
      @defaultOptions[prop]
    else def

module.exports = Bit


