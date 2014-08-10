Byte = require './byte'
Line = require './line'

class BurstLine extends Byte

  vars:->
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 100, y: 100}
    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 1
    @duration = @default prop: 'duration' ,def: 500
    @delay    = @default prop: 'delay' ,   def: 0
    
    # !self size should be before super!
    @size = 100; super

    @line = new Line
      # start:     @start
      lineWidth: @lineWidth
      lineCap:   @lineCap
      ctx:       @ctx

  render:->
    @TWEEN.remove @tween ; it = @
    from = @h.clone(@start); from.progress = 0
    to   = @h.clone(@end);   to.progress   = 100
    console.log from
    @tween = new @TWEEN.Tween(from).to(to, @duration*@s)
      .delay(@delay*@s)
      .onUpdate ->
        if @progress < 50
          it.line.setProp end: x: 2*@x, y: 2*@y
        else it.line.setProp start: x: 2*(@x-(to.x/2)), y: 2*(@y-(to.y/2))
      # .easing @TWEEN.Easing.Bounce.Out
      .start()

    @h.startAnimationLoop()


module.exports = BurstLine