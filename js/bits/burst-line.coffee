Byte = require './byte'
Line = require './line'


# TODO:
#   add size calc

class BurstLine extends Byte

  vars:->
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 0, y: 0}
    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 1
    @duration = @default prop: 'duration', def: 0
    @delay    = @default prop: 'delay' ,   def: 0
    @easing   = @default prop: 'easing' ,  def: 'Linear.None'
    @easings  = @easing.split '.'
    
    # !self size should be before super!
    @size = 100; super

    @line = new Line
      lineWidth: @lineWidth
      lineCap:   @lineCap
      ctx:       @ctx

  run:->
    @TWEEN.remove @tween ; it = @
    from = @h.clone(@start); from.progress = 0
    to   = @h.clone(@end);   to.progress   = 100
    @tween = new @TWEEN.Tween(from).to(to, @duration*@s)
      .delay(@delay*@s)
      .onUpdate ->
        it.line.setProp
          end:   x: it.h.slice(2*@x, to.x), y: it.h.slice(2*@y, to.y)
          start: x: 2*(@x-(to.x/2)), y: 2*(@y-(to.y/2))
      .easing @TWEEN.Easing[@easings[0]][@easings[1]]
      .start()
      # .onStart    -> console.time    'len'
      # .onComplete -> console.timeEnd 'len'

    @h.startAnimationLoop()


module.exports = BurstLine