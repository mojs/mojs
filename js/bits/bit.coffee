h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'

class Bit
  oa: {}
  h:  h
  TWEEN: TWEEN
  deg: Math.PI/180

  constructor:(@o={})-> @vars(); @o.isRunLess or @run?()

  vars:->
    # get CANVAS context
    @ctx   = @o.ctx or @ctx
    @px    = h.pixel
    @DEG = (Math.PI/180)

    @parent = @default prop: 'parent', def: h.body
    @color  = @default prop: 'color' , def: '#222'
    @colorMap   = @default prop: 'colorMap',  def: [@color]

    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 'round'
    @opacity  = @default prop: 'opacity',  def: 1
    @isClearLess  = @default prop: 'isClearLess',  def: false

    @colorObj = h.makeColorObj @color
    # @o = {}

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue
      # if propName is 'color' then @colorObj = h.makeColorObj @color
    @render()

  default:(o)->
    prop = o.prop; def = o.def
    @[prop] = if @oa[prop]?
      @oa[prop]
    else if @o[prop]?
      @o[prop]
    else if @[prop]?
      @[prop]
    else def

  defaultPart:(o)->
    @[o.prop] = null
    @default o

module.exports = Bit


