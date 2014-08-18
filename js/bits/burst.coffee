Byte = require './byte'
Line = require './line'


class Burst extends Byte
  vars:->
    @cnt    = @default prop: 'cnt' , def: 3
    @radiusStart = @default prop: 'radiusStart', def: 100
    @radiusEnd   = @default prop: 'radiusEnd',   def: 200

    @radiusStartX  = @defaultPart prop: 'radiusStartX', def: @radiusStart
    @radiusStartY  = @defaultPart prop: 'radiusStartY', def: @radiusStart

    @radiusEndX  = @defaultPart prop: 'radiusEndX', def: @radiusEnd
    @radiusEndY  = @defaultPart prop: 'radiusEndY', def: @radiusEnd

    @lineWidth      = @default prop: 'lineWidth',   def: 1
    @lineWidthMiddle= @default prop: 'lineWidthMiddle',def: null
    @lineWidthEnd   = @default prop: 'lineWidthEnd',def: @lineWidth

    @lineCap     = @default prop: 'lineCap',     def: 'none'
    @angle       = @default prop: 'angle',       def: 360
    @angle       = if @angle > 360 then 360 else @angle
    @duration    = @default prop: 'duration',    def: 400
    @duration1   = @defaultPart prop: 'duration1',   def: @duration/2
    @duration2   = @defaultPart prop: 'duration2',   def: @duration/2
    
    @delay       = @default prop: 'delay',        def: 0
    @delay1      = @default prop: 'delay1',       def: @delay
    @delay2      = @default prop: 'delay2',       def: 0

    @easing      = @default prop: 'easing',      def: 'Linear.None'
    @easing1     = @defaultPart prop: 'easing1',     def: @easing
    @easing2     = @defaultPart prop: 'easing2',     def: @easing

    @easings1    = @easing1.split '.'
    @easings2    = @easing2.split '.'

    @initialRotation = @default prop: 'initialRotation', def: 0
    @rotation        = @default prop: 'rotation',        def: 0
    @rotation1       = @defaultPart prop: 'rotation1',       def: @rotation/2
    @rotation2       = @defaultPart prop: 'rotation2',       def: @rotation/2

    if !@lineWidthMiddle
      if @lineWidth < @lineWidthEnd
        @lineWidthMiddle = @lineWidth + @lineWidthEnd/2

      if @lineWidth > @lineWidthEnd
        @lineWidthMiddle = @lineWidth - @lineWidthEnd/2

    angleCnt = if @angle % 360 is 0 then @cnt else @cnt-1
    @step = @angle/angleCnt

    maxEndRadius = Math.max @radiusEndX, @radiusEndY
    maxLineWidth = Math.max @lineWidth, @lineWidthMiddle, @lineWidthEnd
    @size = 2*maxEndRadius + maxLineWidth
    @center = @size/2
    @sizeX = @size; @sizeY = @size
    
    super

    @lines ?= []
    @lines.length = 0
    for i in [0...@cnt]
      line = new Line
        ctx: @ctx
        color: @colorMap[i % @colorMap.length]
        isClearLess: true
        lineWidth: @lineWidth
        lineCap:   @lineCap
      @lines.push line

  run:(@oa={})->
    @h.size(@oa) and @vars()
    @h.isSizeChange(@oa) and @setElSize()

    @TWEEN.remove @tween1; @TWEEN.remove @tween2; it = @

    from =
      rx: @radiusStartX
      ry: @radiusStartY
      deg: @rotation1
      lineWidth: @lineWidthMiddle
    to =
      rx: @radiusEndX
      ry: @radiusEndY
      deg: @rotation1+@rotation2
      lineWidth: @lineWidthEnd

    @tween2 = new @TWEEN.Tween(from).to(to,@duration2*@s)
      .delay(@delay2*@s)
      .onUpdate ->
        it.ctx.clear()
        angle = 0
        for line, i in it.lines
          rotation = (angle+it.initialRotation+@deg)*it.DEG
          x1 = it.center + Math.cos(rotation)*it.radiusEndX
          y1 = it.center + Math.sin(rotation)*it.radiusEndY
          x = it.center + Math.cos(rotation)*@rx
          y = it.center + Math.sin(rotation)*@ry
          line.setProp
            start: {x: x,  y: y}
            end:   {x: x1, y: y1}
            lineWidth: @lineWidth
          angle += it.step
      .easing @TWEEN.Easing[@easings2[0]][@easings2[1]]

    from =
      rx: @radiusStartX
      ry: @radiusStartY
      lineWidth: @lineWidth
      deg: 0
    to =
      rx: @radiusEndX
      ry: @radiusEndY
      deg: @rotation1
      lineWidth: @lineWidthMiddle

    @tween1 = new @TWEEN.Tween(from).to(to,@duration1*@s)
      .delay(@delay1*@s)
      .onUpdate ->
        it.ctx.clear()
        angle = 0
        for line, i in it.lines
          rotation = (angle+it.initialRotation+@deg)*it.DEG
          x1 = it.center + Math.cos(rotation)*it.radiusStartX
          y1 = it.center + Math.sin(rotation)*it.radiusStartY
          x = it.center + Math.cos(rotation)*@rx
          y = it.center + Math.sin(rotation)*@ry
          line.setProp
            start: {x: x1, y: y1}
            end:   {x: x, y: y}
            lineWidth: @lineWidth
          angle += it.step
      .easing @TWEEN.Easing[@easings1[0]][@easings1[1]]
      .chain(@tween2)
      .start()
    
    @h.startAnimationLoop()


module.exports = Burst