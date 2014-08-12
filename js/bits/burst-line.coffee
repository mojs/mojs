Byte = require './byte'
Line = require './line'


# TODO:
#   fade: 'inOut' fix to 1 in the middle

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
    @duration1= @default prop: 'duration1',def: (@duration/2)
    @duration2= @default prop: 'duration2',def: (@duration/2)
    @delay    = @default prop: 'delay' ,   def: 0
    
    @easing   = @default prop: 'easing' ,  def: 'Linear.None'
    @easing1  = @default prop: 'easing1' , def: @easing
    @easing2  = @default prop: 'easing2' , def: @easing
    @easings1 = @easing1.split '.'
    @easings2 = @easing2.split '.'
    
    @fade  = @default prop: 'fade' ,  def: 'none'
    
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

    if @fade.match /out/i then to.opacity   = 0
    if @fade.match(/in/i) and !@fade.match(/out/i) then to.opacity   = 1
    if @fade? and @fade isnt 'none' then from.opacity = .5
    if @fade is 'inOut' then from.opacity = 1

    @tween2 = new @TWEEN.Tween(from).to(to, @duration2*@s)
      .onUpdate -> it.line.setProp start: {x: @x, y: @y}, opacity: @opacity
      .easing @TWEEN.Easing[@easings2[0]][@easings2[1]]

    from = @h.clone(from)
    to   = @h.clone(to)
    from.opacity = 1; to.opacity = 1
    if @fade.match(/in/i)  then from.opacity = 0
    if @fade.match(/out/i) and !@fade.match(/in/i) then from.opacity = 1
    if @fade.match(/in/i) or @fade.match(/out/i) then to.opacity = .5

    @tween1 = new @TWEEN.Tween(from).to(to, @duration1*@s)
      .delay(@delay*@s)
      .onUpdate -> it.line.setProp end:{x: @x, y: @y}, opacity: @opacity
      .easing @TWEEN.Easing[@easings1[0]][@easings1[1]]
      .chain(@tween2)
      .start()

    @h.startAnimationLoop()


module.exports = BurstLine