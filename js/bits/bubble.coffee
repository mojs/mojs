Byte   = require './byte'
Circle = require './circle'
Line = require './line'



class Bubble extends Byte

  vars:->
    @radiusStart = @default prop: 'radiusStart', def: 100
    @radiusEnd   = @default prop: 'radiusEnd',   def: 200

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

    maxRadius = Math.max @radiusEndX, @radiusEndY,@radiusStartX, @radiusStartY

    @size = 2*maxRadius + @lineWidthEnd
    @center = @size/2
    @sizeX = @size; @sizeY = @size
    super
    @circle = new Circle
      ctx: @ctx
      color: @color
      radius: @radiusStart
      # lineWidthEnd: @lineWidthEnd
      position: x: @center, y: @center

    @circle.setProp
      opacity: 1

    # @line = new Line
    #   ctx: @ctx
    #   start:      {x: 0, y: 0}
    #   end:        {x: 40, y: 40}
    #   lineWidth:  @lineWidth
    #   opacity: 1

    # @line.setProp
    #   opacity: 1

  run:->
    @h.size(@oa) and @vars()
    @h.isSizeChange(@oa) and @setElSize()

    @TWEEN.remove @tween1; @TWEEN.remove @tween2; it = @

    from =
      r: @radiusStart
      lineW: @lineWidth
    to =
      r: @radiusEnd
      lineW: @lineWidthEnd

    @tween = new @TWEEN.Tween(from).to(to,@duration*@s)
      .delay(@delay*@s)
      .onUpdate ->
        it.circle.setProp
          radius: @r
          lineWidth: @lineW
        # console.log @lineW
      .easing @TWEEN.Easing[@easings[0]][@easings[1]]
      .start()

    @h.startAnimationLoop()

module.exports = Bubble