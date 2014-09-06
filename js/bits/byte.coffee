h = require '../helpers'
Bit = require './bit'
Circle    = require './objects/circle'
Rectangle = require './objects/rectangle'
Triangle  = require './objects/triangle'
Star      = require './objects/star'
Cross     = require './objects/cross'
Line      = require './objects/line'
ZigZag    = require './objects/zigzag'

class Byte extends Bit
  shapes:
    circle:    Circle
    rectangle: Rectangle
    triangle:  Triangle
    star:      Star
    cross:     Cross
    line:      Line
    zigzag:    ZigZag

  vars:->
    @isShowStart = @default prop: 'isShowStart',  def: false
    @isShowEnd   = @default prop: 'isShowEnd',    def: false

    @parent = @o.parent or h.body
    @el = @oa.el or @o.el or @el or @createEl()
    @ctx = @o.ctx or @ctx or @el.getContext '2d'

    super; @defaultByteVars()
    @s = 1*h.time 1
    @tweens ?= []

  run:(@oa={})->
    h.size(@oa) and @vars()
    h.isSizeChange(@oa) and @setElSize()

    for tween, i in @tweens
      @TWEEN.remove tween
    @tweens.length = 0

  chain:(@oc={})->
    # h.size(@oc) and @vars()
    # h.isSizeChange(@oc) and @setElSize()

  mixLineDash:(from, to)->
    if @lineDash and @lineDashEnd
      for dash, i in @lineDash
        @from["lineDash#{i}"] = dash
      for dash, i in @lineDashEnd
        @to["lineDash#{i}"] = dash

  mixColor:(from, to)->
    if @color and @colorEnd
      @from.r = @colorObj.r
      @from.g = @colorObj.g
      @from.b = @colorObj.b
      @from.a = @colorObj.a
      @to.r = @colorEndObj.r
      @to.g = @colorEndObj.g
      @to.b = @colorEndObj.b
      @to.a = @colorEndObj.a
    @colorObjTween = h.clone @colorObj

  mixFill:(from, to)->
    if @fill and @fillEnd
      @from.fr = @fillObj.r
      @from.fg = @fillObj.g
      @from.fb = @fillObj.b
      @from.fa = @fillObj.a
      @to.fr = @fillEndObj.r
      @to.fg = @fillEndObj.g
      @to.fb = @fillEndObj.b
      @to.fa = @fillEndObj.a

    @fillObjTween  = h.clone @fillObj

  # METHODS FOR TWEEN UPDATE FUNCTION
  updateColors:(that)->
    @colorObjTween.r = parseInt(that.r,10)
    @colorObjTween.g = parseInt(that.g,10)
    @colorObjTween.b = parseInt(that.b,10)
    @colorObjTween.a = parseFloat(that.a)
    @colorObjTween
  updateFill:(that)->
    @fillObjTween.r = parseInt(that.fr,10)
    @fillObjTween.g = parseInt(that.fg,10)
    @fillObjTween.b = parseInt(that.fb,10)
    @fillObjTween.a = parseFloat(that.fa)
    @fillObjTween
  updateLineDash:(that)->
    i = 0; lineDash = []
    if @lineDash and @lineDashEnd
      for key, val of that
        if key is 'lineDash0' or key is "lineDash#{i}"
          lineDash.push val
          i++
    lineDash
  # METHODS FOR TWEEN UPDATE FUNCTION

  initTween:(o={})->
    from = if o.isChain then @h.clone @lastTween.to else @from
    if o.isChain
      to = @h.clone @lastTween.to
      to.lineWidth = o.options.lineWidthEnd
    to   = if o.isChain then to else @to
    tween = new @TWEEN.Tween(from).to(to,@duration*@s)
      .delay(@delay*@s)
      .easing @TWEEN.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .onStart(=>
        # console.log from, to
        @ctx.clear()
        (!@isShowStart or @isShowEnd) and (@el.style.display = 'block')
        @o.onStart?.call @, arguments
      ).onComplete(=>
        @isShowStart = false
        !@isShowEnd and (@el.style.display = 'none')
        @o.onComplete?.call @, arguments
      ).yoyo(@yoyo)

    tween.isChain = o.isChain

    tween.to = to

    if o.isChain then @lastTween.chain tween
    else tween.start()

    if o.isChain or !@tweens.length
      @tweens.push tween
      @lastTween = tween

    h.startAnimationLoop()
    tween


  defaultByteVars:->
    @radius      = @default prop: 'radius',       def: 100
    @radiusX     = @default prop: 'radiusX',      def: @radius
    @radiusY     = @default prop: 'radiusY',      def: @radius

    @radiusEnd   = @default prop: 'radiusEnd',   def: @radius
    @radiusXEnd  = @defaultPart prop: 'radiusXEnd', def: @radiusEnd
    @radiusYEnd  = @defaultPart prop: 'radiusYEnd', def: @radiusEnd

    @lineWidth      = @default prop: 'lineWidth',   def: 1
    @lineWidthMiddle= @default prop: 'lineWidthMiddle',def: null
    @lineWidthEnd   = @default prop: 'lineWidthEnd',def: @lineWidth

    @lineDashOffset    = @default prop: 'lineDashOffset', def: 0
    @lineDashOffsetEnd = @default prop: 'lineDashOffsetEnd',def: @lineDashOffset

    @lineDash     = @default prop: 'lineDash',    def: []
    @lineDashEnd  = @default prop: 'lineDashEnd', def: @lineDash
    @normalizeLineDashes()

    @opacity      = @default prop: 'opacity',    def: 1
    @opacityEnd   = @default prop: 'opacityEnd', def: @opacity

    @colorEnd  = @default prop: 'colorEnd',        def: @color
    @colorEnd and (@colorEndObj = h.makeColorObj @colorEnd)
    @fillEnd  and (@fillEndObj  = h.makeColorObj @fillEnd)
    @colorMap   = @default prop: 'colorMap',  def: [@color]

    @angle        = @default prop: 'angle',       def: 0
    @angleStart   = @default prop: 'angleStart',  def: @angle
    @angleEnd     = @default prop: 'angleEnd',    def: @angleStart

    @shape        = @default prop: 'shape',       def: 'circle'
    @Shape = @shapes[@shape.toLowerCase()] or Circle

    # TWEEN OPTIONS
    @repeat       = @default prop: 'repeat',      def: 0
    @yoyo         = @default prop: 'yoyo',        def: false
    @duration     = @default prop: 'duration',     def: 400
    @delay        = @default prop: 'delay',        def: 0
    @easing       = @defaultPart prop: 'easing',   def: 'Linear.None'
    @easings      = @easing.split '.'
    abs = Math.abs
    maxEnd = Math.max abs(@radiusXEnd), abs(@radiusYEnd)
    maxStart = Math.max abs(@radiusX), abs(@radiusY)
    @maxRadius    = Math.max maxEnd, maxStart
    @maxLineWidth = Math.max @lineWidthEnd, @lineWidthMiddle, @lineWidth

    @canvasSize()

  canvasSize:(o={})->
    o.plusCoef ?= 0
    o.mulCoef  ?= 1
    # CANVAS SIZE
    @size = ((2*@maxRadius*o.mulCoef) + @maxLineWidth + o.plusCoef)
    # console.log @size
    @center = @size/2; @sizeX = @size; @sizeY = @size
    @centerX = @sizeX/2; @centerY = @sizeY/2
    @setElSize()

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
    !@isShowStart and (@el.style.display = 'none'); @parent.appendChild(@el)

  setElSize:->
    @el.setAttribute 'width',  h.pixel*@sizeX
    @el.setAttribute 'height', h.pixel*@sizeY

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@sizeX}px"
      @el.style.height  = "#{@sizeY}px"
    @el

  setPosition:(x, y=0)->
    @el.style.left = "#{x-@sizeX/2}px"
    @el.style.top  = "#{y-@sizeY/2}px"

module.exports = Byte











