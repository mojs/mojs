h = require '../helpers'
Bit = require './bit'

class Byte extends Bit
  vars:->
    super; @defaultByteVars()
    @s = 1*h.time 1
    @parent = @o.parent or h.body
    @el = @oa.el or @o.el or @el or @createEl()
    @ctx = @o.ctx or @ctx or @el.getContext '2d'

  defaultByteVars:->
    @radius      = @default prop: 'radius',       def: 100
    @radiusX     = @default prop: 'radiusX',      def: @radius
    @radiusY     = @default prop: 'radiusY',      def: @radius

    @radiusEnd   = @default prop: 'radiusEnd',   def: @radius
    @radiusEndX  = @defaultPart prop: 'radiusEndX', def: @radiusEnd
    @radiusEndY  = @defaultPart prop: 'radiusEndY', def: @radiusEnd

    @lineWidth      = @default prop: 'lineWidth',   def: 1
    @lineWidthMiddle= @default prop: 'lineWidthMiddle',def: null
    @lineWidthEnd   = @default prop: 'lineWidthEnd',def: @lineWidth

    @opacity      = @default prop: 'opacity',    def: 1
    @opacityEnd   = @default prop: 'opacityEnd', def: @opacity

    @duration    = @default prop: 'duration',     def: 400
    @delay       = @default prop: 'delay',        def: 0
    @easing      = @defaultPart prop: 'easing',   def: 'Linear.None'
    @easings     = @easing.split '.'

    @colorEnd = @default prop: 'colorEnd',        def: @color
    @colorEnd and (@colorEndObj = h.makeColorObj @colorEnd)
    @colorMap   = @default prop: 'colorMap',  def: [@color]

    @angle        = @default prop: 'angle',       def: 0
    @angleStart   = @default prop: 'angleStart',  def: @angle
    @angleEnd     = @default prop: 'angleEnd',    def: @angleStart

    @degree       = @default prop: 'degree',       def: 360
    @degreeEnd    = @default prop: 'degreeEnd',    def: @degree
    
    @degreeOffset    = @default prop: 'degreeOffset',    def: 0
    @degreeOffsetEnd = @default prop: 'degreeOffsetEnd', def: @degreeOffset

    @degree    = h.slice @degree,    360
    @degreeEnd = h.slice @degreeEnd, 360

    @lineDash     = @default prop: 'lineDash',    def: []
    @lineDashEnd  = @default prop: 'lineDashEnd', def: @lineDash
    @normalizeLineDashes()

    # TWEEN OPTIONS
    @repeat       = @default prop: 'repeat',      def: 0
    @yoyo         = @default prop: 'yoyo',        def: false
    @duration     = @default prop: 'duration',     def: 400
    @delay        = @default prop: 'delay',        def: 0
    @easing       = @defaultPart prop: 'easing',   def: 'Linear.None'
    @easings      = @easing.split '.'

    # CANVAS SIZE
    maxRadius = Math.max @radiusEndX, @radiusEndY, @radiusX, @radiusY
    maxLineWidth = Math.max @lineWidthEnd, @lineWidthMiddle, @lineWidth
    @size = 2*maxRadius + maxLineWidth
    @center = @size/2; @sizeX = @size; @sizeY = @size

  normalizeLineDashes:->
    # line dash arrays should be equal length
    # for animation purposes
    if @lineDash.length < @lineDashEnd.length
      for dash, i in @lineDashEnd
        @lineDash[i] ?= @lineDash[0]
    if @lineDash.length > @lineDashEnd.length
      for dash, i in @lineDash
        @lineDashEnd[i] ?= @lineDashEnd[0]

  createEl:->
    @el = document.createElement('canvas')
    @el.style.position = 'absolute'; @el.style.left = 0; @el.style.top = 0
    @parent.appendChild(@el); @setElSize()

  setElSize:->
    @el.setAttribute 'width',  h.pixel*@sizeX
    @el.setAttribute 'height', h.pixel*@sizeY

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@sizeX}px"
      @el.style.height  = "#{@sizeY}px"
    @el

module.exports = Byte
