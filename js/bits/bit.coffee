h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'

class Bit
  oa: {}
  h:  h
  TWEEN: TWEEN
  deg: Math.PI/180
  DEG: Math.PI/180
  px: h.pixel
  parent: h.body

  constructor:(@o={})-> @vars(); @o.isRunLess or @run?()

  vars:->
    # get CANVAS context
    @ctx   = @o.ctx or @ctx
    @px    = h.pixel

    @parent = @default prop: 'parent', def: h.body
    @color  = @default prop: 'color' , def: '#222'
    @colorMap   = @default prop: 'colorMap',  def: [@color]

    @fill         = @default prop: 'fill',    def: '#222'
    @fillEnd      = @default prop: 'fillEnd', def: @fill

    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 'round'
    @opacity  = @default prop: 'opacity',  def: 1
    @isClearLess  = @default prop: 'isClearLess',  def: false

    @colorObj = h.makeColorObj @color
    @fillObj  = @h.makeColorObj @fill
    # @o = {}

  setProp:(props)->
    for propName, propValue of props
      if propValue? then @[propName] = propValue
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


