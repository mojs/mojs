h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'

class Bit
  oa: {}
  defaultOptions:
    x:   0
    y:   0
    deg: 0

  constructor:(@o={})-> @vars(); @o.isRunLess or @run?()

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

    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 'none'
    @opacity  = @default prop: 'opacity',  def: 1
    @isClearLess  = @default prop: 'isClearLess',  def: false

    @colorObj = @h.makeColorObj @color
    # @o = {}

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue
    @render()

  default:(o)->
    prop = o.prop; def = o.def
    @[prop] = if @oa[prop]?
      @oa[prop]
    else if @o[prop]?
      @o[prop]
    else if @[prop]?
      @[prop]
    else if @defaultOptions[prop]?
      @defaultOptions[prop]
    else def

  defaultPart:(o)->
    @[o.prop] = null
    @default o

module.exports = Bit


