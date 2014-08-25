Byte   = require './byte'
Circle = require './circle'
Line = require './line'

# TODO
# fix safari
# test browsers

class Bubble extends Byte

  vars:->
    @radius      = @default prop: 'radius',      def: 100
    @radiusStart = @default prop: 'radiusStart', def: @radius
    @radiusEnd   = @default prop: 'radiusEnd',   def: @radiusStart

    @radiusStartX  = @defaultPart prop: 'radiusStartX', def: @radiusStart
    @radiusStartY  = @defaultPart prop: 'radiusStartY', def: @radiusStart

    @radiusEndX  = @defaultPart prop: 'radiusEndX', def: @radiusEnd
    @radiusEndY  = @defaultPart prop: 'radiusEndY', def: @radiusEnd

    @lineWidth      = @default prop: 'lineWidth',   def: 1
    @lineWidthMiddle= @default prop: 'lineWidthMiddle',def: null
    @lineWidthEnd   = @default prop: 'lineWidthEnd',def: @lineWidth

    @duration    = @default prop: 'duration',     def: 400
    @delay       = @default prop: 'delay',        def: 0
    @easing      = @defaultPart prop: 'easing',   def: 'Linear.None'
    @easings     = @easing.split '.'
    
    @angle        = @default prop: 'angle',       def: 0
    @angleStart   = @default prop: 'angleStart',  def: @angle
    @angleEnd     = @default prop: 'angleEnd',    def: @angleStart

    @degree       = @default prop: 'degree',       def: 360
    @degreeEnd    = @default prop: 'degreeEnd',    def: @degree
    
    @degreeOffset    = @default prop: 'degreeOffset',    def: 0
    @degreeOffsetEnd = @default prop: 'degreeOffsetEnd', def: @degreeOffset

    @degree    = @h.slice @degree,    360
    @degreeEnd = @h.slice @degreeEnd, 360

    @opacity      = @default prop: 'opacity',    def: 1
    @opacityEnd   = @default prop: 'opacityEnd', def: @opacity

    maxRadius = Math.max @radiusEndX, @radiusEndY, @radiusStartX, @radiusStartY
    maxLineWidth = Math.max @lineWidthEnd, @lineWidthMiddle, @lineWidth

    @lineDash     = @default prop: 'lineDash',    def: []
    @lineDashEnd  = @default prop: 'lineDashEnd', def: @lineDash
    @colorEnd = @default prop: 'colorEnd',        def: @color

    if @lineDash.length < @lineDashEnd.length
      for dash, i in @lineDashEnd
        @lineDash[i] ?= @lineDash[0]
    if @lineDash.length > @lineDashEnd.length
      for dash, i in @lineDash
        @lineDashEnd[i] ?= @lineDashEnd[0]

    @repeat       = @default prop: 'repeat',      def: 0
    @yoyo         = @default prop: 'yoyo',        def: false

    @size = 2*maxRadius + maxLineWidth

    @center = @size/2
    @sizeX = @size; @sizeY = @size
    super

    @circle = new Circle
      ctx: @ctx
      color: @color
      radius: @radiusStart
      parentSize: x: @sizeX, y: @sizeY
      degree: @degree
      degreeOffset: @degreeOffset
      # lineWidthEnd: @lineWidthEnd
      position: x: 2*@center, y: 2*@center
      lineDash: @lineDash
      opacity: @opacity

  run:(@oa={})->
    @h.size(@oa) and @vars()
    @h.isSizeChange(@oa) and @setElSize()

    @TWEEN.remove @tween1; @TWEEN.remove @tween2; it = @

    from =
      rx: @radiusStartX
      ry: @radiusStartY
      lineW:   @lineWidth
      angle:   @angleStart
      degree:  @degree
      degreeOffset: @degreeOffset
      opacity: @opacity
    to =
      rx: @radiusEndX
      ry: @radiusEndY
      lineW:   @lineWidthEnd
      angle:   @angleEnd
      degree:  @degreeEnd
      degreeOffset: @degreeOffsetEnd
      opacity: @opacityEnd

    if @lineDash and @lineDashEnd
      for dash, i in @lineDash
        from["lineDash#{i}"] = dash
      for dash, i in @lineDashEnd
        to["lineDash#{i}"] = dash

    if @color and @colorEnd
      from.r = @colorObj.r
      from.g = @colorObj.g
      from.b = @colorObj.b
      from.a = @colorObj.a
      to.r = @colorEndObj.r
      to.g = @colorEndObj.g
      to.b = @colorEndObj.b
      to.a = @colorEndObj.a

    it.colorObjTween = @h.clone @colorObj
    @tween = new @TWEEN.Tween(from).to(to,@duration*@s)
      .delay(@delay*@s)
      .onUpdate ->
        i = 0; lineDash = []
        if it.lineDash and it.lineDashEnd
          for key, val of @
            if key is 'lineDash0' or key is "lineDash#{i}"
              lineDash.push val
              i++

        it.colorObjTween.r = parseInt(@r,10)
        it.colorObjTween.g = parseInt(@g,10)
        it.colorObjTween.b = parseInt(@b,10)
        it.colorObjTween.a = parseInt(@a,10)
        it.circle.setProp
          radiusX: @rx
          radiusY: @ry
          lineWidth: @lineW
          angle: @angle
          degree: @degree
          degreeOffset: @degreeOffset
          lineDash: lineDash
          colorObj: it.colorObjTween
          opacity: @opacity

        # console.log @lineW
      .easing @TWEEN.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .yoyo(@yoyo)
      .start()

    @h.startAnimationLoop()

module.exports = Bubble