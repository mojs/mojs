Byte = require './byte'
Line = require './line'


class Burst extends Byte

  vars:->
    @cnt    = @default prop: 'cnt' , def: 4
    @radiusStart = @default prop: 'radiusStart', def: 100
    @radiusEnd   = @default prop: 'radiusEnd',   def: 200
    @lineWidth   = @default prop: 'lineWidth',   def: 1
    @lineCap     = @default prop: 'lineCap',     def: 'none'
    @angle       = @default prop: 'angle',       def: 360
    @duration    = @default prop: 'duration',    def: 400
    @duration1   = @default prop: 'duration1',   def: @duration/2
    @duration2   = @default prop: 'duration2',   def: @duration/2
    @delay       = @default prop: 'delay',       def: 0

    @easing      = @default prop: 'easing',      def: 'Linear.None'
    @easing1     = @default prop: 'easing1',     def: @easing
    @easing2     = @default prop: 'easing2',     def: @easing

    @easings1    = @easing1.split '.'
    @easings2    = @easing2.split '.'

    @initialRotation = @default prop: 'initialRotation', def: 0
    @rotation        = @default prop: 'rotation',        def: 0
    @rotation1       = @defaultPart prop: 'rotation1',       def: @rotation/2
    @rotation2       = @defaultPart prop: 'rotation2',       def: @rotation/2

    @step = (2*Math.PI)/@cnt

    @size = 2*@radiusEnd + 2*@lineWidth; @center = @size/2
    @sizeX = @size; @sizeY = @size

    super

    @lines = []
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

    @TWEEN.remove @tween1; it = @

    from = r: @radiusStart, deg: @rotation1
    to   = r: @radiusEnd,   deg: @rotation1+@rotation2
    @tween2= new @TWEEN.Tween(from).to(to,@duration2*@s)
      # .delay(@delay*@s)
      .onUpdate ->
        it.ctx.clear()
        angle = it.angle
        for line, i in it.lines
          rotation = angle+((it.initialRotation+@deg)*it.DEG)
          x1 = it.center + Math.cos(rotation)*it.radiusEnd
          y1 = it.center + Math.sin(rotation)*it.radiusEnd
          x = it.center + Math.cos(rotation)*@r
          y = it.center + Math.sin(rotation)*@r
          angle += it.step
          line.setProp
            start: {x: x,  y: y}
            end:   {x: x1, y: y1}
      .easing @TWEEN.Easing[@easings2[0]][@easings2[1]]

    from = r: @radiusStart, deg: 0
    to   = r: @radiusEnd,   deg: @rotation1
    @tween1= new @TWEEN.Tween(from).to(to,@duration1*@s)
      # .delay(@delay*@s)
      .onUpdate ->
        it.ctx.clear()
        angle = it.angle
        for line, i in it.lines
          rotation = angle+((it.initialRotation+@deg)*it.DEG)
          x1 = it.center + Math.cos(rotation)*it.radiusStart
          y1 = it.center + Math.sin(rotation)*it.radiusStart
          x = it.center + Math.cos(rotation)*@r
          y = it.center + Math.sin(rotation)*@r
          angle += it.step
          line.setProp
            start: {x: x1, y: y1}
            end:   {x: x, y: y}
      .easing @TWEEN.Easing[@easings1[0]][@easings1[1]]
      .chain(@tween2)
      .start()

    
    @h.startAnimationLoop()


module.exports = Burst