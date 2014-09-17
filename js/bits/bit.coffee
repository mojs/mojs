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

    @fill         = @default prop: 'fill',    def: 'rgba(0,0,0,0)'
    @fillEnd      = @default prop: 'fillEnd', def: @fill

    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 'round'
    @opacity  = @default prop: 'opacity',  def: 1
    @isClearLess  = @default prop: 'isClearLess',  def: false

    @colorObj = h.makeColorObj @color
    @fillObj  = @h.makeColorObj @fill

  setProp:(props)->
    for propName, propValue of props
      if propValue? then @[propName] = propValue
    @render()

  default:(o)->
    prop = o.prop; def = o.def

    @syntaxSugar
      o: @o
      prop: prop
    
    @syntaxSugar
      o: @oa
      prop: prop
    
    @[prop] = if @oa[prop]?
      @oa[prop]
    else if @o[prop]?
      @o[prop]
    else if @[prop]?
      @[prop]
    else def

  defaultPart:(o)-> @[o.prop] = null; @default o

  syntaxSugar:(o)->
    if o.o[o.prop] and @h.isObj o.o[o.prop]
      if o.o[o.prop]?.end?
        o.o["#{o.prop}End"] = o.o[o.prop].end
        o.o["#{o.prop}"]    = o.o[o.prop].start
      else if !o.o[o.prop].x
        # syntax sugar
        for key, value of o.o[o.prop]
          unless o.prop is 'lineDash' or o.prop is 'lineDashEnd'
            o.o["#{o.prop}End"] = value
            o.o["#{o.prop}"] = if o.prop is 'fill' or o.prop is 'color'
              key
            else parseFloat key
          else
            o.o["#{o.prop}End"] = @stringToArray value
            o.o["#{o.prop}"]    = @stringToArray key
          break

      if o.prop is 'position' and @h.isObj o.o[o.prop].x
        position = {}; positionEnd = {}
        for key, value of o.o[o.prop].x
          position = { x: parseFloat key }
          positionEnd = { x: parseFloat value }
        for key, value of o.o[o.prop].y
          position.y = parseFloat key
          positionEnd.y = parseFloat value

        @position = position; @positionEnd = positionEnd
        @o?.position  = null; @o?.positionEnd  = null
        @oa?.position = null; @oa?.positionEnd = null


  stringToArray:(str)->
    arr = []
    for item, i in str.split ','
      arr.push parseFloat item
    arr


module.exports = Bit


