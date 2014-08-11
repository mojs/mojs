Byte = require './byte'
Line = require './line'


# TODO:
#   add size calc

# OPTIONS
# start: point/obj -> end: point/obj
# delay:   int
# duration:int
# color:   string
# easing1: ease/string
# easing2: ease/string
# lineWidth: int
# lineCap: string(canvas lineCap)
# fade: string(in out inOut)

class BurstLine extends Byte

  vars:->
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 0, y: 0}
    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 1
    @duration = @default prop: 'duration', def: 400
    @delay    = @default prop: 'delay' ,   def: 0
    @easing1  = @default prop: 'easing1' ,  def: 'Linear.None'
    @easing2  = @default prop: 'easing2' ,  def: 'Linear.None'
    @easings1 = @easing1.split '.'
    @easings2 = @easing2.split '.'
    
    # !self size should be before super!
    # @size = 100
    @sizeX = Math.max @end.x, @start.x
    @sizeY = Math.max @end.y, @start.y
    super

    @line = new Line
      start:     @h.clone @start
      end:       @h.clone @end
      lineWidth: @lineWidth
      lineCap:   @lineCap
      ctx:       @ctx
      color:     @color
    @easingFun = @h.bind @easingFun, @

  run:->
    @TWEEN.remove @tween1; @TWEEN.remove @tween2; it = @
    
    from = @h.clone(@start); from.progress = 0
    to   = @h.clone(@end);   to.progress   = 1
    @tween2 = new @TWEEN.Tween(from).to(to, @duration/2*@s)
      .onUpdate -> it.line.setProp start: x: @x, y: @y
      .easing @TWEEN.Easing[@easings2[0]][@easings2[1]]

    from = @h.clone(from)
    to   = @h.clone(to)
    @tween1 = new @TWEEN.Tween(from).to(to, @duration/2*@s)
      .delay(@delay*@s)
      .onUpdate -> it.line.setProp(end: x: @x, y: @y)
      .easing @TWEEN.Easing[@easings1[0]][@easings1[1]]
      .chain(@tween2)
      .start()

    @h.startAnimationLoop()


module.exports = BurstLine