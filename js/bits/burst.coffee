Byte = require './byte'
Line = require './line'


class Burst extends Byte

  vars:->
    @cnt    = @default prop: 'cnt' ,    def: 3
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

    @easings1    =  @easing1.split '.'
    @easings2    =  @easing2.split '.'

    @step = (2*Math.PI)/@cnt

    @size = 2*@radiusEnd + 2*@lineWidth; @center = @size/2
    @sizeX = @size; @sizeY = @size

    super

    @lines = []
    for i in [0...@cnt]
      line = new Line
        ctx: @ctx
        isClearLess: true
        lineWidth: @lineWidth
        lineCap:   @lineCap
      @lines.push line

  run:->
    @TWEEN.remove @tween1; it = @

    @tween2= new @TWEEN.Tween({r:@radiusStart}).to({r:@radiusEnd},@duration2*@s)
      # .delay(@delay*@s)
      .onUpdate ->
        it.ctx.clear()
        angle = it.angle
        for line, i in it.lines
          x1 = it.center + Math.cos(angle)*it.radiusEnd
          y1 = it.center + Math.sin(angle)*it.radiusEnd
          x = it.center + Math.cos(angle)*@r
          y = it.center + Math.sin(angle)*@r
          angle += it.step
          line.setProp
            start: {x: x,  y: y}
            end:   {x: x1, y: y1}
      .easing @TWEEN.Easing[@easings2[0]][@easings2[1]]

    @tween1= new @TWEEN.Tween({r:@radiusStart}).to({r:@radiusEnd},@duration1*@s)
      # .delay(@delay*@s)
      .onUpdate ->
        it.ctx.clear()
        angle = it.angle
        for line, i in it.lines
          x1 = it.center + Math.cos(angle)*it.radiusStart
          y1 = it.center + Math.sin(angle)*it.radiusStart
          x = it.center + Math.cos(angle)*@r
          y = it.center + Math.sin(angle)*@r
          angle += it.step
          line.setProp
            start: {x: x1, y: y1}
            end:   {x: x, y: y}
      .easing @TWEEN.Easing[@easings1[0]][@easings1[1]]
      .chain(@tween2)
      .start()

    
    @h.startAnimationLoop()


module.exports = Burst